# ESLint Configuration

This project uses ESLint to maintain code quality and consistency.

## Configuration Files

- `.eslintrc.cjs` - Main ESLint configuration
- `.eslintignore` - Files and directories to exclude from linting

## Scripts

- `npm run lint` - Check for linting issues
- `npm run lint:fix` - Automatically fix linting issues

## Rules Enforced

- ✅ React best practices
- ✅ React Hooks rules
- ✅ Consistent code style
- ✅ No unused variables (warnings)
- ✅ Equality checks (===, !==)
- ✅ Consistent semicolons

## Fixing Common Issues

### Unused Variables

Prefix with underscore to intentionally mark as unused:
```javascript
const handleUnusedParam = (_e) => {
  // Use other logic
};
```

### Missing Semicolons

```bash
npm run lint:fix
```

### React Hooks

Ensure proper dependency arrays:
```javascript
useEffect(() => {
  // Effect code
}, [dependency]);
```

## IDE Integration

### VS Code

Install the ESLint extension:
```
dbaeumer.vscode-eslint
```

The extension will automatically show linting errors in the editor.
