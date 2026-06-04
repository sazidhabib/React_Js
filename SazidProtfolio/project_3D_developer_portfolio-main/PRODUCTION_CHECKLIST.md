# Production Checklist

Use this checklist to ensure your project is production-ready before deploying.

## Before First Deployment

### Code Quality
- [ ] Run `npm run lint` - No errors or critical warnings
- [ ] Run `npm run lint:fix` - Fix all auto-fixable issues
- [ ] Review any remaining warnings
- [ ] Remove commented-out code
- [ ] Remove console.logs (except warnings/errors)

### Testing
- [ ] Run `npm run test` - All tests pass
- [ ] Add tests for new components
- [ ] Generate coverage report: `npm run test:coverage`
- [ ] Review coverage report
- [ ] Aim for 80%+ coverage on critical paths

### Build
- [ ] Run `npm run build` - No errors
- [ ] Check dist/ folder is created
- [ ] Run `npm run preview` - No build errors
- [ ] Test in preview mode

### Environment Variables
- [ ] Copy `.env.example` to `.env.local`
- [ ] Fill in all required variables:
  - [ ] VITE_EMAILJS_SERVICE_ID
  - [ ] VITE_EMAILJS_TEMPLATE_ID
  - [ ] VITE_EMAILJS_PUBLIC_KEY
  - [ ] VITE_CONTACT_EMAIL
  - [ ] VITE_RESUME_PATH

### Documentation
- [ ] Update README.md with your info
- [ ] Add your name and social links
- [ ] Verify all links work
- [ ] Update project description
- [ ] Add any custom setup instructions

### Dependencies
- [ ] Run `npm audit` - Review security issues
- [ ] Update dependencies if needed: `npm update`
- [ ] Test thoroughly after updates
- [ ] Update package.json versions as needed

---

## Git & GitHub Setup

- [ ] Initialize git repo (if not done): `git init`
- [ ] Add all files: `git add .`
- [ ] Create initial commit: `git commit -m "Initial commit"`
- [ ] Create GitHub repository
- [ ] Add remote: `git remote add origin [url]`
- [ ] Push to GitHub: `git push -u origin main`

### GitHub Pages Configuration
- [ ] Go to repository Settings → Pages
- [ ] Select branch: `gh-pages`
- [ ] Verify GitHub Pages URL
- [ ] Update social links with live URL

### GitHub Actions
- [ ] Verify CI/CD workflows in `.github/workflows/`
- [ ] Check workflow status in Actions tab
- [ ] Verify lint runs successfully
- [ ] Verify tests run successfully
- [ ] Verify build completes successfully
- [ ] Verify deploy completes successfully

---

## Content Review

### Personal Information
- [ ] Update your name in Hero.jsx
- [ ] Update tagline/description
- [ ] Add your resume to public/ folder
- [ ] Update resume path in .env.local
- [ ] Update contact email in .env.local

### Skills Section
- [ ] Update skills in Constants.js
- [ ] Add relevant technologies
- [ ] Add any missing skills
- [ ] Verify all skill logos load

### Experience Section
- [ ] Add your work experience
- [ ] Add company information
- [ ] Add dates and descriptions
- [ ] Verify formatting

### Projects Section
- [ ] Add your portfolio projects
- [ ] Add project descriptions
- [ ] Add project links (GitHub, live demo)
- [ ] Add project images/thumbnails
- [ ] Verify all links work

### Contact Section
- [ ] Verify contact email is correct
- [ ] Test contact form submission
- [ ] Verify EmailJS is configured
- [ ] Test email delivery

---

## Performance Optimization

- [ ] Enable compression in Vite
- [ ] Check bundle size: `npm run build`
- [ ] Review performance in browser DevTools
- [ ] Test on mobile device
- [ ] Check lighthouse scores
- [ ] Optimize images if needed
- [ ] Test 3D components performance

---

## Accessibility & SEO

- [ ] Add meta tags in index.html
- [ ] Add og:image for social sharing
- [ ] Verify heading hierarchy (h1, h2, h3...)
- [ ] Check alt text on images
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Add robots.txt (optional)
- [ ] Add sitemap.xml (optional)

---

## Browser Compatibility

Test on these browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Security

- [ ] No sensitive data in code
- [ ] No API keys in version control
- [ ] .env files in .gitignore
- [ ] HTTPS enabled on live site
- [ ] No security warnings in console
- [ ] Run npm audit: `npm audit`

---

## Final Review

### Desktop
- [ ] All sections visible and aligned
- [ ] All animations working
- [ ] All links functional
- [ ] Contact form working
- [ ] 3D elements rendering

### Mobile
- [ ] Responsive design working
- [ ] Touch interactions working
- [ ] Navigation working
- [ ] Forms usable on mobile
- [ ] Performance acceptable

### Errors
- [ ] No JavaScript errors in console
- [ ] No missing assets
- [ ] No 404 errors
- [ ] No CORS issues
- [ ] No security warnings

---

## Deployment

- [ ] All checks above completed ✅
- [ ] Final commit pushed to main
- [ ] GitHub Actions workflows pass
- [ ] Site deployed to GitHub Pages
- [ ] Live URL verified working
- [ ] All pages loading correctly
- [ ] All links functional

---

## Post-Deployment

- [ ] Share your portfolio link
- [ ] Add to GitHub profile
- [ ] Submit to dev communities
- [ ] Share on social media
- [ ] Monitor GitHub Actions
- [ ] Monitor error logs
- [ ] Collect feedback
- [ ] Plan future improvements

---

## Maintenance

### Weekly
- [ ] Check for error messages
- [ ] Monitor GitHub Stars

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Run security audit: `npm audit`
- [ ] Review performance metrics

### Quarterly
- [ ] Update portfolio projects
- [ ] Add new skills/technologies
- [ ] Review and refresh content
- [ ] Update resume if needed

---

## Quick Deploy Verification

```bash
# Run this before final deploy
npm run lint:fix    # Fix linting
npm run test        # Run tests
npm run build       # Build production
npm run preview     # Preview build
```

All should complete without errors! ✅

---

## Common Issues & Solutions

### Build Fails
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Linting Errors
```bash
npm run lint:fix
git add .
git commit -m "Fix linting issues"
```

### Tests Fail
```bash
npm run test -- --reporter=verbose
# Review test output
npm run test:coverage
```

### Deploy Not Working
1. Check GitHub Actions log
2. Verify branch is `main`
3. Check `.env.local` has correct values
4. Verify GitHub Pages settings

---

## Status Check

| Item | Status |
|------|--------|
| Code Quality | [ ] ✅ |
| Tests | [ ] ✅ |
| Build | [ ] ✅ |
| Environment | [ ] ✅ |
| Documentation | [ ] ✅ |
| Content | [ ] ✅ |
| Performance | [ ] ✅ |
| Accessibility | [ ] ✅ |
| Security | [ ] ✅ |
| Deployment | [ ] ✅ |

---

**Ready to Deploy?** When all items are checked ✅, you're ready to go live! 🚀
