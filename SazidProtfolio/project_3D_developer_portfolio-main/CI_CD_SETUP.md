# CI/CD Pipeline Documentation

This project includes automated CI/CD workflows using GitHub Actions.

## Workflows

### 1. CI Pipeline (`.github/workflows/ci.yml`)

**Triggers:** Push to `main` or `develop` branches, Pull Requests

**Jobs:**
- **Lint** - ESLint code quality checks
- **Test** - Run test suite with Vitest
- **Build** - Build verification with Vite

**Steps:**
1. Checkout code
2. Setup Node.js environment
3. Install dependencies
4. Run ESLint checks
5. Run tests
6. Build project
7. Upload build artifacts (retained for 5 days)

### 2. Deploy Pipeline (`.github/workflows/deploy.yml`)

**Triggers:** Push to `main` branch only

**Jobs:**
- **Deploy** - Automated deployment to GitHub Pages

**Steps:**
1. Checkout code
2. Setup Node.js environment
3. Install dependencies
4. Run linter (pre-deployment check)
5. Build project
6. Deploy to GitHub Pages using `peaceiris/actions-gh-pages`

## GitHub Pages Setup

To enable GitHub Pages deployment:

1. Go to repository Settings → Pages
2. Set Source to "Deploy from a branch"
3. Select `gh-pages` branch
4. Click Save

The CI/CD pipeline will automatically create the `gh-pages` branch.

## Environment Variables in CI/CD

Add secrets in GitHub repository settings:

1. Go to Settings → Secrets and variables → Actions
2. Create new repository secret
3. Use `${{ secrets.SECRET_NAME }}` in workflow files

### Example: EmailJS Credentials
```yaml
- name: Deploy with EmailJS
  env:
    VITE_EMAILJS_SERVICE_ID: ${{ secrets.EMAILJS_SERVICE_ID }}
    VITE_EMAILJS_PUBLIC_KEY: ${{ secrets.EMAILJS_PUBLIC_KEY }}
```

## Status Badges

Add workflow status badge to README:

```markdown
[![CI](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions)
```

## Troubleshooting

### Build Fails in CI

1. Check workflow logs in GitHub Actions
2. Ensure `.eslintignore` is configured correctly
3. Run locally: `npm run build`
4. Check Node.js version compatibility

### Tests Fail in CI

1. Review test logs
2. Ensure `JSDOM` is configured for browser APIs
3. Run locally: `npm run test`

### Deployment Not Working

1. Verify GitHub Pages settings
2. Check workflow has `GITHUB_TOKEN` permissions
3. Ensure `base` path in `vite.config.js` if deploying to subdirectory

## Workflow File Locations

- `ci.yml` - Code quality and build checks
- `deploy.yml` - Deployment to GitHub Pages

## Local Testing of CI Steps

```bash
# Run ESLint like CI
npm run lint

# Run tests like CI
npm run test

# Build like CI
npm run build

# Preview build
npm run preview
```

## Next Steps

1. Push to `main` branch
2. Navigate to Actions tab to monitor workflows
3. Verify deployment to GitHub Pages
4. Add status badges to README
