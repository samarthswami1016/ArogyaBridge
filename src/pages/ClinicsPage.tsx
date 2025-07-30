import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Star, Navigation, Clock, Filter, Search, Map } from 'lucide-react';

interface Clinic {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'pharmacy' | 'diagnostic';
  address: string;
  phone?: string;
  rating?: number;
  distance?: number;
  isOpen: boolean;
  openHours: string;
  services: string[];
  latitude: number;
  longitude: number;
}

const ClinicsPage: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const clinicTypes = [
    { id: 'all', name: t('clinics.types.all'), icon: '🏥', color: 'bg-blue-100 text-blue-700' },
    { id: 'hospital', name: t('clinics.types.hospital'), icon: '🏥', color: 'bg-red-100 text-red-700' },
    { id: 'clinic', name: t('clinics.types.clinic'), icon: '🩺', color: 'bg-green-100 text-green-700' },
    { id: 'pharmacy', name: t('clinics.types.pharmacy'), icon: '💊', color: 'bg-purple-100 text-purple-700' },
    { id: 'diagnostic', name: t('clinics.types.diagnostic'), icon: '🔬', color: 'bg-orange-100 text-orange-700' }
  ];

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          loadNearbyClinicsMock(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Load mock data without location
          loadNearbyClinicsMock(28.6139, 77.2090); // Default to Delhi
        }
      );
    } else {
      loadNearbyClinicsMock(28.6139, 77.2090);
    }
  }, []);

  const loadNearbyClinicsMock = (lat: number, lng: number) => {
    // Mock data - replace with actual Google Maps API call
    const mockClinics: Clinic[] = [
      {
        id: '1',
        name: t('clinics.mockData.cityHospital.name'),
        type: 'hospital',
        address: t('clinics.mockData.cityHospital.address'),
        phone: '+91-120-4567890',
        rating: 4.5,
        distance: 1.2,
        isOpen: true,
        openHours: t('clinics.mockData.cityHospital.hours'),
        services: t('clinics.mockData.cityHospital.services', { returnObjects: true }) as string[],
        latitude: lat + 0.01,
        longitude: lng + 0.01
      },
      {
        id: '2',
        name: t('clinics.mockData.drSharmaClinic.name'),
        type: 'clinic',
        address: t('clinics.mockData.drSharmaClinic.address'),
        phone: '+91-120-9876543',
        rating: 4.2,
        distance: 0.8,
        isOpen: true,
        openHours: t('clinics.mockData.drSharmaClinic.hours'),
        services: t('clinics.mockData.drSharmaClinic.services', { returnObjects: true }) as string[],
        latitude: lat - 0.005,
        longitude: lng + 0.008
      },
      {
        id: '3',
        name: t('clinics.mockData.apolloPharmacy.name'),
        type: 'pharmacy',
        address: t('clinics.mockData.apolloPharmacy.address'),
        phone: '+91-11-2345678',
        rating: 4.0,
        distance: 2.1,
        isOpen: true,
        openHours: t('clinics.mockData.apolloPharmacy.hours'),
        services: t('clinics.mockData.apolloPharmacy.services', { returnObjects: true }) as string[],
        latitude: lat + 0.02,
        longitude: lng - 0.01
      },
      {
        id: '4',
        name: t('clinics.mockData.lifeCareDiagnostic.name'),
        type: 'diagnostic',
        address: t('clinics.mockData.lifeCareDiagnostic.address'),
        phone: '+91-11-8765432',
        rating: 4.3,
        distance: 3.5,
        isOpen: false,
        openHours: t('clinics.mockData.lifeCareDiagnostic.hours'),
        services: t('clinics.mockData.lifeCareDiagnostic.services', { returnObjects: true }) as string[],
        latitude: lat - 0.03,
        longitude: lng + 0.02
      },
      {
        id: '5',
        name: t('clinics.mockData.maxHospital.name'),
        type: 'hospital',
        address: t('clinics.mockData.maxHospital.address'),
        phone: '+91-11-2626262',
        rating: 4.7,
        distance: 5.2,
        isOpen: true,
        openHours: t('clinics.mockData.maxHospital.hours'),
        services: t('clinics.mockData.maxHospital.services', { returnObjects: true }) as string[],
        latitude: lat + 0.05,
        longitude: lng - 0.03
      },
      {
        id: '6',
        name: t('clinics.mockData.careClinic.name'),
        type: 'clinic',
        address: t('clinics.mockData.careClinic.address'),
        phone: '+91-11-4567890',
        rating: 3.8,
        distance: 1.9,
        isOpen: true,
        openHours: t('clinics.mockData.careClinic.hours'),
        services: t('clinics.mockData.careClinic.services', { returnObjects: true }) as string[],
        latitude: lat - 0.02,
        longitude: lng - 0.015
      }
    ];

    setClinics(mockClinics);
    setFilteredClinics(mockClinics);
    setLoading(false);
  };

  useEffect(() => {
    let filtered = clinics;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(clinic => clinic.type === selectedType);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(clinic =>
        clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort by distance
    filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0));

    setFilteredClinics(filtered);
  }, [clinics, selectedType, searchTerm]);

  const getTypeIcon = (type: string) => {
    const typeData = clinicTypes.find(t => t.id === type);
    return typeData?.icon || '🏥';
  };

  const getTypeColor = (type: string) => {
    const typeData = clinicTypes.find(t => t.id === type);
    return typeData?.color || 'bg-gray-100 text-gray-700';
  };

  const openInMaps = (clinic: Clinic) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${clinic.latitude},${clinic.longitude}`;
    window.open(url, '_blank');
  };

  const callClinic = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('clinics.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{t('clinics.title')}</h1>
                <p className="text-sm text-gray-600">{t('clinics.subtitle')}</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {filteredClinics.length} {t('clinics.results')}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border-b border-gray-100 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('clinics.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <div className="flex space-x-2 overflow-x-auto">
            {clinicTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap border ${
                  selectedType === type.id
                    ? type.color + ' border-current'
                    : 'text-gray-600 hover:bg-gray-100 border-gray-200'
                }`}
              >
                <span>{type.icon}</span>
                <span>{type.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Clinics List */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 py-6 h-full">
          {filteredClinics.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <MapPin className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('clinics.noResults')}</h3>
              <p className="text-gray-600">{t('clinics.noResultsDesc')}</p>
            </div>
          ) : (
            <div className="space-y-4 h-full overflow-y-auto hide-scrollbar scroll-smooth">
              {filteredClinics.map((clinic, index) => (
                <div
                  key={clinic.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="text-2xl">{getTypeIcon(clinic.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{clinic.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(clinic.type)}`}>
                            {clinicTypes.find(t => t.id === clinic.type)?.name}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          {clinic.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span>{clinic.rating}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            <Navigation className="h-4 w-4" />
                            <span>{clinic.distance} km</span>
                          </div>
                          <div className={`flex items-center space-x-1 ${clinic.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                            <Clock className="h-4 w-4" />
                            <span>{clinic.isOpen ? t('clinics.open') : t('clinics.closed')}</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-2">{clinic.address}</p>
                        <p className="text-xs text-gray-500 mb-3">{clinic.openHours}</p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {clinic.services.slice(0, 3).map((service, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {service}
                            </span>
                          ))}
                          {clinic.services.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              +{clinic.services.length - 3} {t('clinics.more')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => openInMaps(clinic)}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Map className="h-4 w-4" />
                      <span>{t('clinics.direction')}</span>
                    </button>
                    
                    {clinic.phone && (
                      <button
                        onClick={() => callClinic(clinic.phone!)}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span>{t('clinics.call')}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicsPage;