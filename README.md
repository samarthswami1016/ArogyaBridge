# ArogyaBridge 🏥

**Connecting rural communities to quality healthcare through technology**

ArogyaBridge is a comprehensive healthcare platform designed to bridge the gap between rural communities and quality healthcare services. Built with modern web technologies, it provides AI-powered health assistance, multilingual support, and easy access to nearby healthcare facilities.

## 🌟 Features

### 🤖 AI-Powered Health Assistant
- **Intelligent Symptom Analysis**: Describe symptoms in natural language and get AI-powered medical guidance
- **Voice Input Support**: Use voice commands in Hindi, English, or Marathi
- **Severity Assessment**: Automatic categorization of symptoms (Emergency, High, Medium, Low)
- **Instant Responses**: Get immediate health advice and recommendations

### 🌍 Multilingual Support
- **3 Languages**: English, Hindi (हिंदी), and Marathi (मराठी)
- **Real-time Translation**: Switch languages instantly without page reload
- **Cultural Adaptation**: Content adapted for Indian healthcare context

### 🏥 Healthcare Facility Finder
- **Location-based Search**: Find nearby hospitals, clinics, pharmacies, and diagnostic centers
- **Real-time Information**: Operating hours, contact details, and services offered
- **Navigation Integration**: Direct integration with Google Maps for directions
- **Filter Options**: Search by facility type and services

### 🚑 Emergency First Aid
- **Step-by-step Guides**: Detailed first aid instructions for common emergencies
- **Visual Instructions**: Easy-to-follow emergency procedures
- **Priority-based Organization**: Critical, high, medium, and low priority situations
- **Quick Access**: Instant access to life-saving information

### 📱 Personal Health Management
- **Health History**: Track all your health consultations and AI interactions
- **Profile Management**: Store personal and medical information securely
- **Emergency Contacts**: Quick access to family and healthcare providers
- **Medical Records**: Maintain allergies, medications, and medical conditions

## 🚀 Technology Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Tailwind CSS** for modern, responsive design
- **Vite** for fast development and optimized builds
- **Lucide React** for beautiful, consistent icons

### Backend & Services
- **Supabase** for authentication and database
- **Google Gemini AI** for intelligent health analysis
- **Web Speech API** for voice input functionality
- **Geolocation API** for location-based services

### Internationalization
- **i18next** for robust translation management
- **react-i18next** for React integration
- **JSON-based translations** for easy content management

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Auth/            # Authentication components
│   ├── Navigation.tsx   # Main navigation
│   └── LanguageSwitcher.tsx
├── contexts/            # React contexts
│   ├── AuthContext.tsx  # Authentication state
│   └── LanguageContext.tsx # Language management
├── pages/               # Main application pages
│   ├── Dashboard.tsx    # Main dashboard
│   ├── SymptomsPage.tsx # AI health assistant
│   ├── HistoryPage.tsx  # Health history
│   ├── FirstAidPage.tsx # Emergency first aid
│   ├── ClinicsPage.tsx  # Healthcare finder
│   └── ProfilePage.tsx  # User profile
├── lib/                 # Utilities and configurations
│   └── supabase.ts     # Supabase client
├── types/              # TypeScript type definitions
└── i18n.ts            # Internationalization setup
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account for backend services
- Google Gemini API key for AI functionality

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/samarthswami1016/ArogyaBridge.git
   cd arogyabridge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment

The application is deployed on Netlify and can be accessed at: [ArogyaBridge Live](https://arogyabridge.netlify.app/)

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on every push to main branch

## 🔮 Future Plans

### 🎯 Short-term Goals (Next 3 months)
- [ ] **Telemedicine Integration**: Video consultations with certified doctors
- [ ] **Prescription Management**: Digital prescription storage and reminders
- [ ] **Health Metrics Tracking**: Blood pressure, sugar levels, weight monitoring
- [ ] **Appointment Booking**: Direct booking with healthcare providers
- [ ] **Medicine Reminder**: Smart medication scheduling and alerts

### 🚀 Medium-term Goals (6 months)
- [ ] **Mobile App**: React Native mobile application
- [ ] **Offline Mode**: Core functionality without internet connection
- [ ] **Health Insurance Integration**: Insurance claim assistance
- [ ] **Lab Report Analysis**: AI-powered lab report interpretation
- [ ] **Community Health Forums**: Peer support and health discussions

### 🌟 Long-term Vision (1 year+)
- [ ] **IoT Device Integration**: Connect with health monitoring devices
- [ ] **Blockchain Health Records**: Secure, decentralized health data
- [ ] **AI Diagnostic Imaging**: X-ray and scan analysis capabilities
- [ ] **Government Health Scheme Integration**: Direct access to public health programs
- [ ] **Multi-country Expansion**: Adapt for other developing nations
- [ ] **Advanced Analytics**: Population health insights and trends

### 🔬 Research & Innovation
- [ ] **Machine Learning Models**: Custom health prediction algorithms
- [ ] **Natural Language Processing**: Better understanding of regional languages
- [ ] **Computer Vision**: Symptom detection through image analysis
- [ ] **Predictive Analytics**: Early disease detection and prevention

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) before getting started.

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas for Contribution
- 🌍 **Translations**: Add support for more Indian languages
- 🎨 **UI/UX**: Improve design and user experience
- 🔧 **Features**: Implement new healthcare features
- 🐛 **Bug Fixes**: Help us squash bugs
- 📚 **Documentation**: Improve docs and tutorials
- 🧪 **Testing**: Add comprehensive test coverage

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Healthcare Workers**: Inspired by the dedication of healthcare professionals
- **Rural Communities**: Built for and with feedback from rural healthcare needs
- **Open Source Community**: Thanks to all the amazing open-source projects we use
- **Contributors**: Special thanks to all contributors who make this project better

## 📞 Support

- **Email**: Samarth.works1@gmail.com
- **Issues**: [GitHub Issues](https://github.com/samarthswami1016/ArogyaBridge.git/issues)
- **Discussions**: [GitHub Discussions](https://github.com/samarthswami1016/ArogyaBridge/discussions)

## 🌟 Star History

If you find this project helpful, please consider giving it a star ⭐ on GitHub!

---

**Made with ❤️ for better healthcare accessibility in rural India**