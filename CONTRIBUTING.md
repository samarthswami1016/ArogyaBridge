# Contributing to ArogyaBridge 🤝

Thank you for your interest in contributing to ArogyaBridge! We're excited to have you join our mission to improve healthcare accessibility in rural communities.

## 🌟 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- **Be respectful**: Treat all community members with respect and kindness
- **Be inclusive**: Welcome newcomers and help them get started
- **Be constructive**: Provide helpful feedback and suggestions
- **Be patient**: Remember that everyone has different skill levels and backgrounds

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git for version control
- Basic knowledge of React, TypeScript, and Tailwind CSS
- Understanding of healthcare domain (helpful but not required)

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/samarthswami1016/ArogyaBridge.git
   cd arogyabridge
   ```

2. **Set up the development environment**
   ```bash
   # Install dependencies
   npm install
   
   # Copy environment variables
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🎯 Ways to Contribute

### 🐛 Bug Reports
Found a bug? Help us fix it!

**Before submitting:**
- Check if the issue already exists in [GitHub Issues](https://github.com/yourusername/arogyabridge/issues)
- Try to reproduce the bug in the latest version

**When submitting:**
- Use a clear, descriptive title
- Describe the expected vs actual behavior
- Include steps to reproduce
- Add screenshots if applicable
- Mention your browser/device information

### 💡 Feature Requests
Have an idea for a new feature?

**Before submitting:**
- Check existing issues and discussions
- Consider if it aligns with our mission of rural healthcare

**When submitting:**
- Explain the problem your feature would solve
- Describe your proposed solution
- Consider alternative solutions
- Think about potential challenges

### 🌍 Translation Contributions
Help make ArogyaBridge accessible to more communities!

**Current languages:** English, Hindi, Marathi
**Needed languages:** Bengali, Tamil, Telugu, Gujarati, Punjabi, and more

**How to contribute translations:**
1. Check `public/locales/` for existing translations
2. Create a new language folder (e.g., `public/locales/bn/`)
3. Copy `translation.json` from an existing language
4. Translate all strings while maintaining context
5. Test the translations in the application

### 🎨 Design Contributions
Improve the user experience and visual design!

**Areas for improvement:**
- Mobile responsiveness
- Accessibility (WCAG compliance)
- User interface components
- User experience flows
- Visual design consistency

### 🔧 Code Contributions
Help us build new features and fix bugs!

**Areas for contribution:**
- Frontend components (React/TypeScript)
- AI integration improvements
- Performance optimizations
- Accessibility enhancements
- Test coverage improvements

## 📝 Development Guidelines

### Code Style
We use ESLint and Prettier for code formatting:
```bash
# Check linting
npm run lint

# Format code
npm run format
```

### Commit Messages
Use conventional commit format:
```
type(scope): description

feat(symptoms): add voice input for symptom description
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
style(ui): improve button hover states
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Branch Naming
Use descriptive branch names:
```
feature/voice-input-symptoms
fix/login-redirect-bug
docs/update-contributing-guide
style/improve-mobile-layout
```

### Pull Request Process

1. **Before submitting:**
   - Ensure your code follows our style guidelines
   - Add tests for new features
   - Update documentation if needed
   - Test your changes thoroughly

2. **Pull Request template:**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Style/UI improvement

   ## Testing
   - [ ] Tested locally
   - [ ] Added/updated tests
   - [ ] Tested on mobile devices

   ## Screenshots (if applicable)
   Add screenshots of UI changes

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Documentation updated
   - [ ] No breaking changes
   ```

3. **Review process:**
   - Maintainers will review your PR
   - Address feedback promptly
   - Keep discussions constructive
   - Be patient during the review process

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests
- Write unit tests for utility functions
- Add integration tests for components
- Include accessibility tests
- Test multilingual functionality

## 📚 Documentation

### Types of Documentation
- **Code comments**: Explain complex logic
- **README updates**: Keep installation and usage current
- **API documentation**: Document new endpoints
- **User guides**: Help users understand features

### Documentation Style
- Use clear, simple language
- Include code examples
- Add screenshots for UI features
- Consider non-technical users

## 🌍 Internationalization (i18n)

### Adding New Languages
1. Create language folder: `public/locales/[language-code]/`
2. Copy `translation.json` from existing language
3. Translate all keys while preserving structure
4. Add language to `src/contexts/LanguageContext.tsx`
5. Test thoroughly with the new language

### Translation Guidelines
- Maintain cultural context
- Use appropriate medical terminology
- Consider regional variations
- Test with native speakers when possible

## 🚀 Release Process

### Version Numbering
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Translation files complete
- [ ] Performance tested
- [ ] Accessibility verified
- [ ] Mobile responsiveness confirmed

## 🏆 Recognition

### Contributors
All contributors are recognized in:
- README.md contributors section
- GitHub contributors page
- Release notes for significant contributions

### Maintainer Path
Active contributors may be invited to become maintainers:
- Consistent, quality contributions
- Good understanding of project goals
- Helpful in community discussions
- Demonstrates leadership qualities

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Email**: maintainers@arogyabridge.com

### Mentorship
New contributors can request mentorship:
- Pair programming sessions
- Code review guidance
- Project architecture explanations
- Career development advice

## 🎉 Thank You!

Every contribution, no matter how small, makes a difference in improving healthcare accessibility. Thank you for being part of the ArogyaBridge community!

---

**Questions?** Don't hesitate to ask in [GitHub Discussions](https://github.com/samarthswami1016/ArogyaBridge/discussions) or reach out to the maintainers.