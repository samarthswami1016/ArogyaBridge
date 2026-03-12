import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Star, Navigation, Search, Map as MapIcon } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Clinic {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'pharmacy' | 'diagnostic';
  address: string;
  phone?: string;
  rating?: number;
  distance: number;
  isOpen: boolean;
  openHours: string;
  services: string[];
  latitude: number;
  longitude: number;
}

// ── Vanilla Leaflet Map (no react-leaflet to avoid React 18 context crash) ──
const LeafletMap: React.FC<{ userLoc: [number, number]; clinics: Clinic[] }> = ({ userLoc, clinics }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Fix default marker icon paths broken by bundlers
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    const map = L.map(mapRef.current, { zoomControl: true }).setView(userLoc, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // User marker (blue dot)
    const userIcon = L.divIcon({
      className: '',
      html: '<div style="width:14px;height:14px;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 0 6px rgba(0,0,0,.4)"></div>',
      iconAnchor: [7, 7],
    });
    L.marker(userLoc, { icon: userIcon }).addTo(map).bindPopup('<b>📍 You are here</b>');

    mapInstanceRef.current = map;
    return () => { map.remove(); mapInstanceRef.current = null; };
  }, []);

  // Add / refresh clinic markers whenever filteredClinics changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove old clinic markers (keep user marker)
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        const pos = (layer as L.Marker).getLatLng();
        if (pos.lat !== userLoc[0] || pos.lng !== userLoc[1]) {
          map.removeLayer(layer);
        }
      }
    });

    clinics.forEach((clinic) => {
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:12px;height:12px;background:${clinic.type === 'hospital' ? '#ef4444' : clinic.type === 'pharmacy' ? '#8b5cf6' : '#10b981'};border:2px solid white;border-radius:50%;box-shadow:0 0 4px rgba(0,0,0,.3)"></div>`,
        iconAnchor: [6, 6],
      });
      L.marker([clinic.latitude, clinic.longitude], { icon })
        .addTo(map)
        .bindPopup(`<b>${clinic.name}</b><br/>${clinic.type} · ${clinic.distance} km`);
    });
  }, [clinics, userLoc]);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
};

// ────────────────────────────────────────────────────────────────────────────
const ClinicsPage: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [loadingMsg, setLoadingMsg] = useState<string | null>('Getting location...');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [userLoc, setUserLoc] = useState<[number, number] | null>(null);

  const { t } = useTranslation();

  const clinicTypes = [
    { id: 'all', name: t('clinics.types.all', 'All'), icon: '🏥', color: 'bg-blue-100 text-blue-700' },
    { id: 'hospital', name: t('clinics.types.hospital', 'Hospitals'), icon: '🏥', color: 'bg-red-100 text-red-700' },
    { id: 'clinic', name: t('clinics.types.clinic', 'Clinics'), icon: '🩺', color: 'bg-green-100 text-green-700' },
    { id: 'pharmacy', name: t('clinics.types.pharmacy', 'Pharmacies'), icon: '💊', color: 'bg-purple-100 text-purple-700' },
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLoc([lat, lng]);
          fetchClinics(lat, lng);
        },
        (error) => {
          console.error('Error getting location:', error);
          setErrorMsg('Location permission required to find nearby healthcare services. Please allow location access and refresh the page.');
          setLoadingMsg(null);
        }
      );
    } else {
      setErrorMsg('Geolocation is not supported by your browser.');
      setLoadingMsg(null);
    }
  }, []);

  const haversineDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return parseFloat((R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1));
  };

  const fetchWithTimeout = async (url: string, ms = 10000): Promise<Response> => {
    const ctrl = new AbortController();
    const id = setTimeout(() => ctrl.abort(), ms);
    try {
      return await fetch(url, { signal: ctrl.signal });
    } finally {
      clearTimeout(id);
    }
  };

  const tryOverpass = async (lat: number, lng: number): Promise<Clinic[]> => {
    const query = `[out:json][timeout:10];(node["amenity"~"hospital|clinic|pharmacy"](around:5000,${lat},${lng});way["amenity"~"hospital|clinic|pharmacy"](around:5000,${lat},${lng}););out center;`;
    const res = await fetchWithTimeout(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
      12000
    );
    if (!res.ok) throw new Error(`Overpass ${res.status}`);
    const data = await res.json();
    const items: Clinic[] = [];
    for (const item of (data.elements || [])) {
      const tags = item.tags;
      if (!tags?.amenity) continue;
      const pLat: number = item.lat ?? item.center?.lat;
      const pLng: number = item.lon ?? item.center?.lon;
      if (!pLat || !pLng) continue;
      const t = tags.amenity.toLowerCase();
      const type: Clinic['type'] = t.includes('hospital') ? 'hospital' : t.includes('pharmacy') ? 'pharmacy' : 'clinic';
      items.push({
        id: item.id.toString(),
        name: tags.name || `${type.charAt(0).toUpperCase() + type.slice(1)} (Unnamed)`,
        type,
        address: tags['addr:full'] || tags['addr:street'] || 'Address unavailable',
        phone: tags.phone || tags['contact:phone'],
        distance: haversineDistance(lat, lng, pLat, pLng),
        isOpen: true,
        openHours: tags.opening_hours || 'Contact to check',
        services: type === 'hospital' ? ['Emergency', 'OPD'] : ['Consultation'],
        latitude: pLat,
        longitude: pLng,
      });
    }
    return items;
  };

  const tryNominatim = async (lat: number, lng: number): Promise<Clinic[]> => {
    const types = ['hospital', 'clinic', 'pharmacy'];
    const all: Clinic[] = [];
    for (const type of types) {
      try {
        const res = await fetchWithTimeout(
          `https://nominatim.openstreetmap.org/search?format=json&q=${type}&lat=${lat}&lon=${lng}&limit=6&bounded=1&viewbox=${lng - 0.07},${lat + 0.07},${lng + 0.07},${lat - 0.07}`,
          8000
        );
        if (!res.ok) continue;
        const data = await res.json();
        for (const item of data) {
          const pLat = parseFloat(item.lat);
          const pLng = parseFloat(item.lon);
          const dist = haversineDistance(lat, lng, pLat, pLng);
          if (dist > 5) continue;
          all.push({
            id: `nom-${item.place_id}`,
            name: item.name || item.display_name.split(',')[0],
            type: type as any,
            address: item.display_name,
            distance: dist,
            isOpen: true,
            openHours: 'Contact to check',
            services: type === 'hospital' ? ['Emergency', 'OPD'] : ['Consultation'],
            latitude: pLat,
            longitude: pLng,
          });
        }
      } catch (_) { /* ignore per-type errors */ }
    }
    return all;
  };

  const fetchClinics = async (lat: number, lng: number) => {
    setLoadingMsg('Searching nearby clinics...');
    try {
      const results = await tryOverpass(lat, lng);
      if (results.length > 0) {
        const sorted = results.sort((a, b) => a.distance - b.distance);
        setClinics(sorted);
        setFilteredClinics(sorted);
        setLoadingMsg(null);
        return;
      }
      throw new Error('Empty Overpass result');
    } catch (e) {
      console.warn('Overpass failed, falling back to Nominatim:', e);
      setLoadingMsg('Trying alternative search...');
      try {
        const fallback = await tryNominatim(lat, lng);
        if (fallback.length > 0) {
          const sorted = fallback.sort((a, b) => a.distance - b.distance);
          setClinics(sorted);
          setFilteredClinics(sorted);
          setLoadingMsg(null);
        } else {
          setErrorMsg('No clinics found within 5km of your location.');
          setLoadingMsg(null);
        }
      } catch (e2) {
        console.error('Both APIs failed:', e2);
        setErrorMsg('Unable to load nearby clinics. Please check your internet connection and try again.');
        setLoadingMsg(null);
      }
    }
  };

  useEffect(() => {
    let filtered = clinics;
    if (selectedType !== 'all') filtered = filtered.filter(c => c.type === selectedType);
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredClinics(filtered);
  }, [clinics, selectedType, searchTerm]);

  const getTypeIcon = (type: string) => clinicTypes.find(t => t.id === type)?.icon || '🏥';
  const getTypeColor = (type: string) => clinicTypes.find(t => t.id === type)?.color || 'bg-gray-100 text-gray-700';
  const openInMaps = (clinic: Clinic) =>
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${clinic.latitude},${clinic.longitude}`, '_blank');
  const callClinic = (phone: string) => window.open(`tel:${phone}`, '_self');

  if (loadingMsg) {
    return (
      <div className="h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">{loadingMsg}</p>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white shadow-lg rounded-xl max-w-sm border border-orange-100">
          <MapPin className="h-16 w-16 text-orange-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Notice</h3>
          <p className="text-gray-600">{errorMsg}</p>
          <button
            onClick={() => { setErrorMsg(null); setLoadingMsg('Getting location...'); window.location.reload(); }}
            className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 flex-shrink-0">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{t('clinics.title', 'Nearby Clinics')}</h1>
                <p className="text-sm text-gray-600">{t('clinics.subtitle', 'Healthcare facilities near you')}</p>
              </div>
            </div>
            <div className="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
              {filteredClinics.length} Found
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white border-b border-gray-100 flex-shrink-0">
        <div className="max-w-6xl mx-auto px-4 py-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('clinics.searchPlaceholder', 'Search clinics...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-1">
            {clinicTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap border ${selectedType === type.id
                  ? type.color + ' border-current shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 border-gray-200'}`}
              >
                <span>{type.icon}</span>
                <span>{type.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map + List */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Vanilla Leaflet Map */}
        <div className="h-64 lg:h-full relative border-r border-gray-200">
          {userLoc && <LeafletMap userLoc={userLoc} clinics={filteredClinics} />}
        </div>

        {/* Right: List */}
        <div className="h-[calc(100vh-16rem)] lg:h-full overflow-y-auto bg-gray-50/50 p-4 pb-24 lg:pb-4">
          <div className="space-y-4 max-w-xl mx-auto">
            {filteredClinics.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <MapPin className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No clinics match your search.</p>
              </div>
            ) : filteredClinics.map((clinic, index) => (
              <div
                key={clinic.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start space-x-3 mb-3">
                  <div className="text-3xl mt-1">{getTypeIcon(clinic.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 leading-tight">{clinic.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getTypeColor(clinic.type)}`}>
                        {clinicTypes.find(t => t.id === clinic.type)?.name}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 mb-3">
                      {clinic.rating && (
                        <span className="flex items-center space-x-1 text-sm text-gray-600">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-semibold">{clinic.rating}</span>
                        </span>
                      )}
                      <span className="flex items-center space-x-1 text-sm font-semibold text-blue-700">
                        <Navigation className="h-4 w-4" />
                        <span>{clinic.distance} km</span>
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 flex items-start gap-1">
                      <MapPin className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
                      {clinic.address}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {clinic.services.map((s, i) => (
                        <span key={i} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-100 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => openInMaps(clinic)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <MapIcon className="h-4 w-4" />
                    <span>{t('clinics.direction', 'Directions')}</span>
                  </button>
                  <button
                    onClick={() => clinic.phone ? callClinic(clinic.phone) : alert('Phone not available')}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 font-medium rounded-lg transition-colors ${clinic.phone ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  >
                    <Phone className="h-4 w-4" />
                    <span>{t('clinics.call', 'Call')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicsPage;