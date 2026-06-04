# Quick Reference Guide

## Common Commands

### Development
```bash
npm run dev          # Start dev server (port 5173)
npm run build        # Build for production
npm run preview      # Preview production build
```

### Code Quality
```bash
npm run lint         # Check code quality
npm run lint:fix     # Fix issues automatically
```

### Testing
```bash
npm run test              # Run tests once
npm run test -- --watch   # Watch mode
npm run test:ui          # Interactive UI
npm run test:coverage    # Coverage report
```

---

## Environment Setup

### 1. Create .env.local
```bash
cp .env.example .env.local
```

### 2. Required Variables
```env
VITE_EMAILJS_SERVICE_ID=xxxx
VITE_EMAILJS_TEMPLATE_ID=xxxx
VITE_EMAILJS_PUBLIC_KEY=xxxx
VITE_CONTACT_EMAIL=your@email.com
VITE_RESUME_PATH=/resume.pdf
```

### 3. Get EmailJS Credentials
1. Visit https://www.emailjs.com/
2. Sign up and create account
3. Create email service
4. Create email template
5. Copy credentials to .env.local

---

## Project Structure

```
src/
├── components/          # React components
│   ├── canvas/         # 3D components
│   ├── Contact.jsx
│   ├── Hero.jsx
│   ├── ErrorBoundary.jsx
│   ├── LoadingSpinner.jsx
│   └── index.js        # Component exports
├── constants/
│   └── Constants.js    # Config data
├── hoc/
│   └── SectionWrapper.jsx
├── utils/
│   └── motion.js       # Animation utilities
├── test/
│   ├── setup.js
│   └── Contact.test.jsx
├── styles.js
├── App.jsx
└── main.jsx
```

---

## Git Workflow

### Before Committing
```bash
npm run lint:fix   # Fix linting issues
npm run test       # Run tests
```

### Push to Deploy
```bash
git add .
git commit -m "Your message"
git push origin main  # Triggers GitHub Actions deployment
```

---

## Debugging

### ESLint Issues
```bash
# See issues
npm run lint

# Fix automatically
npm run lint:fix
```

### Build Errors
```bash
# Clear cache
rm -rf node_modules dist

# Reinstall and rebuild
npm install
npm run build
```

### Test Failures
```bash
# Run with details
npm run test -- --reporter=verbose

# Run specific file
npm run test src/test/Contact.test.jsx
```

---

## Common Patterns

### Error Boundary
```javascript
import { ErrorBoundary } from './components';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### Loading Spinner
```javascript
import { LoadingSpinner } from './components';

<LoadingSpinner size="md" />
```

### Form with Validation
See `src/components/Contact.jsx` for complete example.

### Component Export
```javascript
// In components/index.js
export { default as YourComponent } from './YourComponent';

// In App.jsx
import { YourComponent } from './components';
```

---

## Deployment

### GitHub Pages (Automatic)
1. Push to `main` branch
2. GitHub Actions builds and deploys automatically
3. Site available at `https://username.github.io/repo-name`

### Manual Deployment
```bash
# Vercel
npm install -g vercel
vercel

# Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## Resources

| Resource | Link |
|----------|------|
| React Docs | https://react.dev |
| Three.js | https://threejs.org |
| React Three Fiber | https://docs.pmnd.rs/react-three-fiber |
| Tailwind CSS | https://tailwindcss.com |
| ESLint | https://eslint.org |
| Vitest | https://vitest.dev |
| GitHub Actions | https://docs.github.com/actions |

---

## Getting Help

1. Check `IMPLEMENTATION_SUMMARY.md` for feature details
2. Check `ERROR_HANDLING_GUIDE.md` for error patterns
3. Check `TESTING_SETUP.md` for testing examples
4. Check `CI_CD_SETUP.md` for deployment issues
5. Check `ESLINT_SETUP.md` for code quality

---

## File Locations

| Feature | File |
|---------|------|
| ESLint Config | `.eslintrc.cjs` |
| Test Config | `vitest.config.js` |
| CI/CD Workflows | `.github/workflows/` |
| Environment Template | `.env.example` |
| Error Component | `src/components/ErrorBoundary.jsx` |
| Loading Spinner | `src/components/LoadingSpinner.jsx` |

---

## Checklist for New Features

- [ ] Run `npm run lint:fix`
- [ ] Add tests in `src/test/`
- [ ] Update `src/components/index.js` if new component
- [ ] Update component documentation
- [ ] Commit and push to main
- [ ] Verify GitHub Actions pass
- [ ] Check deployment

---

## Performance Tips

1. Use `React.memo()` for expensive components
2. Use lazy loading for routes
3. Optimize 3D models
4. Enable code splitting in build
5. Monitor lighthouse scores

---

**Last Updated:** 2024
