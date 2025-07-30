import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Phone, Mail, Calendar, Heart, Shield, Edit, Save, X, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserProfile {
  full_name: string;
  email: string;
  phone?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  blood_group?: string;
  emergency_contacts: EmergencyContact[];
  medical_conditions: string[];
  allergies: string[];
  medications: string[];
}

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    full_name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    age: undefined,
    gender: undefined,
    blood_group: '',
    emergency_contacts: [],
    medical_conditions: [],
    allergies: [],
    medications: []
  });

  const [newEmergencyContact, setNewEmergencyContact] = useState({
    name: '',
    relationship: '',
    phone: ''
  });
  const [newCondition, setNewCondition] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [newMedication, setNewMedication] = useState('');

  useEffect(() => {
    const mockProfile: UserProfile = {
      full_name: user?.user_metadata?.full_name || t('common.user'),
      email: user?.email || '',
      phone: '+91 98765 43210',
      age: 35,
      gender: 'male',
      blood_group: 'O+',
      emergency_contacts: [
        { id: '1', name: 'Ram Sharma', relationship: t('profile.relationships.0'), phone: '+91 98765 43211' },
        { id: '2', name: 'Dr. Agarwal', relationship: t('profile.relationships.5'), phone: '+91 98765 43212' }
      ],
      medical_conditions: ['Hypertension', 'Diabetes Type 2'],
      allergies: ['Penicillin', 'Peanuts'],
      medications: ['Metformin 500mg', 'Lisinopril 10mg']
    };
    setProfile(mockProfile);
  }, [user, t]);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSave = () => {
    console.log('Saving profile:', profile);
    setIsEditing(false);
  };

  const addEmergencyContact = () => {
    if (newEmergencyContact.name && newEmergencyContact.phone) {
      const contact: EmergencyContact = {
        id: Date.now().toString(),
        ...newEmergencyContact
      };
      setProfile(prev => ({
        ...prev,
        emergency_contacts: [...prev.emergency_contacts, contact]
      }));
      setNewEmergencyContact({ name: '', relationship: '', phone: '' });
    }
  };

  const removeEmergencyContact = (id: string) => {
    setProfile(prev => ({
      ...prev,
      emergency_contacts: prev.emergency_contacts.filter(contact => contact.id !== id)
    }));
  };

  const addMedicalItem = (type: 'medical_conditions' | 'allergies' | 'medications', value: string) => {
    if (value.trim()) {
      setProfile(prev => ({
        ...prev,
        [type]: [...prev[type], value.trim()]
      }));
      if (type === 'medical_conditions') setNewCondition('');
      if (type === 'allergies') setNewAllergy('');
      if (type === 'medications') setNewMedication('');
    }
  };

  const removeMedicalItem = (type: 'medical_conditions' | 'allergies' | 'medications', index: number) => {
    setProfile(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{t('profile.title')}</h1>
                <p className="text-sm text-gray-600">{t('profile.subtitle')}</p>
              </div>
            </div>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isEditing 
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
              <span>{isEditing ? t('profile.save') : t('profile.edit')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-purple-600" />
              {t('profile.personalInfo')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.fullName')}</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.full_name}
                    onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profile.full_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.email')}</label>
                <p className="text-gray-900 py-2 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {profile.email}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.phone')}</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone || ''}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-2 flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {profile.phone || t('profile.add')}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.age')}</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profile.age || ''}
                    onChange={(e) => setProfile(prev => ({ ...prev, age: parseInt(e.target.value) || undefined }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {profile.age ? `${profile.age} ${t('profile.years')}` : t('profile.add')}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.gender')}</label>
                {isEditing ? (
                  <select
                    value={profile.gender || ''}
                    onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">{t('profile.add')}</option>
                    <option value="male">{t('profile.genders.male')}</option>
                    <option value="female">{t('profile.genders.female')}</option>
                    <option value="other">{t('profile.genders.other')}</option>
                  </select>
                ) : (
                  <p className="text-gray-900 py-2">
                    {profile.gender ? t(`profile.genders.${profile.gender}`) : t('profile.add')}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.bloodGroup')}</label>
                {isEditing ? (
                  <select
                    value={profile.blood_group || ''}
                    onChange={(e) => setProfile(prev => ({ ...prev, blood_group: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">{t('profile.add')}</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-900 py-2 flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-red-500" />
                    {profile.blood_group || t('profile.add')}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-red-600" />
              {t('profile.emergencyContacts')}
            </h2>

            <div className="space-y-3 mb-4">
              {profile.emergency_contacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                  <div>
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.relationship} • {contact.phone}</p>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => removeEmergencyContact(contact.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-3">{t('profile.newContact')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder={t('profile.name')}
                    value={newEmergencyContact.name}
                    onChange={(e) => setNewEmergencyContact(prev => ({ ...prev, name: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <select
                    value={newEmergencyContact.relationship}
                    onChange={(e) => setNewEmergencyContact(prev => ({ ...prev, relationship: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">{t('profile.selectRelationship')}</option>
                    {t('profile.relationships', { returnObjects: true }).map((rel: string) => (
                      <option key={rel} value={rel}>{rel}</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder={t('profile.phone')}
                    value={newEmergencyContact.phone}
                    onChange={(e) => setNewEmergencyContact(prev => ({ ...prev, phone: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={addEmergencyContact}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>{t('profile.add')}</span>
                </button>
              </div>
            )}
          </div>

          {/* Medical Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Medical Conditions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">{t('profile.medicalConditions')}</h3>
              <div className="space-y-2 mb-3">
                {profile.medical_conditions.map((condition, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-orange-50 rounded border border-orange-100">
                    <span className="text-sm text-gray-900">{condition}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeMedicalItem('medical_conditions', index)}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder={t('profile.newCondition')}
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => addMedicalItem('medical_conditions', newCondition)}
                    className="px-3 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Allergies */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">{t('profile.allergies')}</h3>
              <div className="space-y-2 mb-3">
                {profile.allergies.map((allergy, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded border border-red-100">
                    <span className="text-sm text-gray-900">{allergy}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeMedicalItem('allergies', index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder={t('profile.newAllergy')}
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => addMedicalItem('allergies', newAllergy)}
                    className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Medications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">{t('profile.medications')}</h3>
              <div className="space-y-2 mb-3">
                {profile.medications.map((medication, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded border border-blue-100">
                    <span className="text-sm text-gray-900">{medication}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeMedicalItem('medications', index)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder={t('profile.newMedication')}
                    value={newMedication}
                    onChange={(e) => setNewMedication(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => addMedicalItem('medications', newMedication)}
                    className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;