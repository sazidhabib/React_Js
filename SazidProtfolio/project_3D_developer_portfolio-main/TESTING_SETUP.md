# Testing Setup Guide

This project uses **Vitest** for unit and component testing.

## Configuration Files

- `vitest.config.js` - Vitest configuration
- `src/test/setup.js` - Test environment setup
- `src/test/` - Test files directory

## Scripts

- `npm run test` - Run all tests
- `npm run test:ui` - Run tests with interactive UI
- `npm run test:coverage` - Generate coverage reports

## Writing Tests

### Basic Test Structure

```javascript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from '../components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('expected text')).toBeInTheDocument();
  });

  it('handles user interaction', () => {
    render(<MyComponent />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
```

### Testing Libraries Included

- `@testing-library/react` - React component testing utilities
- `@testing-library/jest-dom` - DOM matchers
- `@testing-library/user-event` - User interaction simulation
- `jsdom` - DOM implementation for Node.js

## Test Coverage

Generate coverage report:
```bash
npm run test:coverage
```

Coverage is excluded for:
- `node_modules/`
- `src/test/`

## Best Practices

1. **Test behavior, not implementation**
   - ✅ Test user interactions and results
   - ❌ Don't test internal state directly

2. **Use semantic queries**
   - `getByRole()` - Accessible query
   - `getByText()` - For text content
   - `getByLabelText()` - For form fields

3. **Avoid testing implementation details**
   - Don't mock components unless necessary
   - Test the public API

4. **Keep tests simple and focused**
   - One assertion per test when possible
   - Use descriptive test names

## Running Tests

```bash
# Run all tests once
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run specific test file
npm run test src/test/Contact.test.jsx

# Generate coverage
npm run test:coverage

# Interactive UI
npm run test:ui
```

## Example Tests

See `src/test/Contact.test.jsx` for example test structure.
