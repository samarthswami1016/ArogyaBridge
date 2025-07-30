export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  blood_group?: string;
  emergency_contact?: string;
  created_at: string;
}

export interface SymptomRecord {
  id: string;
  user_id: string;
  symptoms: string;
  ai_response: string;
  severity: 'low' | 'medium' | 'high' | 'emergency';
  created_at: string;
}

export interface FirstAidTip {
  id: string;
  title: string;
  description: string;
  steps: string[];
  category: string;
  priority: 'low' | 'medium' | 'high';
  language: 'en' | 'hi' | 'mr';
}

export interface HealthcareProvider {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'pharmacy' | 'diagnostic';
  address: string;
  phone?: string;
  latitude: number;
  longitude: number;
  rating?: number;
  distance?: number;
}

export interface Language {
  code: 'en' | 'hi' | 'mr';
  name: string;
  nativeName: string;
}