# ArogyaBridge

![ArogyaBridge Cover](https://via.placeholder.com/800x400?text=ArogyaBridge)

## 1. Project Overview

**ArogyaBridge** is a Progressive Web App (PWA) designed to connect rural communities to quality healthcare through technology. As a medical triage and healthcare companion, it provides users with an AI-powered health assistant, nearby healthcare facility mapping, real-time user profiles, and multi-language support (English, Hindi, Marathi) for wider accessibility.

## 2. Features

- **AI-Powered Health Assistant**: Medical triage chatbot powered by Google Gemini, capable of understanding voice inputs, asking clarifying questions, and suggesting further actions (visit doctor, emergency, rest).
- **Find Nearby Healthcare**: Integrated with OpenStreetMap to seamlessly detect your location and locate clinics, hospitals, and pharmacies nearby with distance and directions.
- **Progressive Web App (PWA)**: Installable on mobile and desktop devices. Offers a seamless, native-like experience complete with offline caching and home screen icons.
- **Real-time User Profiling**: Powered by Supabase Realtime, enabling users to keep track of their medical history, allergies, emergency contacts, and more, synchronized across devices.
- **Secure Authentication**: End-to-end user authentication containing email and strong password validation, managed by Supabase Auth with RLS (Row Level Security).
- **Multi-Language Support**: Complete interface translation support (i18next).

## 3. Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v7
- **Database & Auth**: Supabase (PostgreSQL, Supabase Auth, Realtime)
- **AI Integration**: Google Gemini API (gemini-2.0-flash)
- **Maps API**: OpenStreetMap (Nominatim API)
- **PWA**: vite-plugin-pwa, Workbox
- **Icons**: Lucide React
- **i18n**: react-i18next

## 4. Folder Structure

```
ArogyaBridge/
│
├── public/                 # Static assets (icons, splash screens)
├── src/                    # Main source code
│   ├── components/         # Reusable UI components (Auth, Navigation, etc.)
│   ├── contexts/           # React Contexts (AuthContext, LanguageContext)
│   ├── lib/                # Library configurations (Supabase client)
│   ├── pages/              # Application views (Dashboard, ClinicsPage, SymptomsPage, ProfilePage, etc.)
│   ├── types/              # TypeScript typings
│   ├── App.tsx             # Main App component with lazy loaded routes
│   ├── i18n.ts             # i18next configuration
│   ├── index.css           # Global Tailwind and custom styles
│   ├── main.tsx            # Application entry point & PWA registration
│   └── vite-env.d.ts       # Vite & PWA Environment Types
│
├── .env                    # Environment variables
├── package.json            # Node.js dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration with PWA plugin
```

## 5. Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## 6. Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/arogyabridge.git
   cd arogyabridge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 7. Running Locally

Run the development server locally:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 8. Build Instructions

To build the project for production (which will also generate the PWA service workers):

```bash
npm run build
```

The optimized and minified output will be in the `/dist` directory.

## 9. Deployment

You can deploy the `/dist` folder to any static hosting service like Vercel, Netlify, or Firebase Hosting.

**Vercel / Netlify Deployment Setup**:
1. Connect your GitHub repository.
2. Set the build command to `npm run build`.
3. Set the output directory to `dist`.
4. Ensure all environment variables are added in the deployment settings.

## 10. API Integrations

- **Google Gemini API**: Utilized in `SymptomsPage.tsx` for providing instantaneous AI-based medical triage and symptom checking based on user natural language or voice queries.
- **OpenStreetMap (Nominatim)**: Used in `ClinicsPage.tsx` to search for nearby medical amenities based on the user's geolocation coordinates. No API key is required.
- **Supabase**: Connects via `lib/supabase.ts` for database CRUD operations and real-time user profiles synchronized using Postgres changes.

## 11. Authentication Flow

- Uses **Supabase Auth** with email and password strategy.
- Users can register using the signup form, which implements secure password strength checks and email validation.
- User sessions are persistently maintained within the browser. 
- Protected routes restrict guests from viewing the dashboard, history, or clinic pages without signing in.
- Global authentication state is managed via `AuthContext.tsx`.

## 12. Future Improvements

- **Native Mobile Apps**: Wrap the PWA in Capacitor.js or migrate to React Native for App Store & Google Play distribution.
- **Doctor Appointments**: Add the ability to schedule and book appointments with clinics listed.
- **Video Consultations**: Integrate a telemedicine API (e.g., Twilio Video) for live doctor-patient consultations.
- **Wearable Device Integration**: Pull health metrics (heart rate, SpO2) from fitness trackers (Apple Health / Google Fit).
- **Push Notifications**: Enable notifications to remind users about taking medications or upcoming appointments.