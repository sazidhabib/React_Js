# Error Handling & Loading States

This guide explains the error handling and loading state patterns in the project.

## Error Boundary

### What is an Error Boundary?

An Error Boundary is a React component that catches errors anywhere in the child component tree, logs those errors, and displays a fallback UI instead of crashing the entire app.

### Using Error Boundary

```javascript
import { ErrorBoundary } from './components';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### Features

- ✅ Catches errors in child components
- ✅ Displays user-friendly error message
- ✅ Shows error details in development mode
- ✅ Provides "Try Again" button to recover
- ✅ Logs errors to console

### Error Boundary Component

Location: `src/components/ErrorBoundary.jsx`

**Features:**
- Error recovery with "Try Again" button
- Development-mode error details
- Graceful UI fallback

### When to Use

- Wrapping entire app in `App.jsx`
- Wrapping 3D canvas components
- Wrapping pages or route sections

## Loading States

### LoadingSpinner Component

Location: `src/components/LoadingSpinner.jsx`

### Usage

```javascript
import { LoadingSpinner } from './components';

// Default size: md
<LoadingSpinner />

// Custom sizes: sm, md, lg
<LoadingSpinner size="lg" />
```

### Sizes

- **sm** - Small spinner (24px)
- **md** - Medium spinner (48px)
- **lg** - Large spinner (64px)

### Example: Contact Form with Loading State

```javascript
<button type='submit' disabled={loading}>
  {loading ? (
    <>
      <LoadingSpinner size="sm" />
      Sending...
    </>
  ) : (
    'Send'
  )}
</button>
```

## Contact Form Error Handling

### Features

- ✅ Input validation
- ✅ Email format validation
- ✅ Success message feedback
- ✅ Error message display
- ✅ Loading state during submission
- ✅ Form field disabling during submission
- ✅ Auto-clear success message after 5 seconds

### Form Submission States

**Idle:**
```javascript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [submitted, setSubmitted] = useState(false);
```

**Validating:**
- All fields checked for empty values
- Email validation with regex
- Error message set if validation fails

**Submitting:**
- Loading spinner shown
- Form fields disabled
- Submit button disabled

**Success:**
- Success message displayed
- Form cleared
- Message auto-removes after 5 seconds

**Error:**
- Error message displayed with details
- User can retry

### Validation Rules

1. **Name:** Must not be empty
2. **Email:** Must match email format
3. **Message:** Must not be empty

## Best Practices

### Error Boundaries

✅ DO:
- Wrap high-level components
- Wrap route sections
- Wrap 3D canvas components

❌ DON'T:
- Try to catch errors in event handlers
- Use for expected errors (use try-catch)
- Wrap every single component

### Loading States

✅ DO:
- Show spinner during async operations
- Disable form inputs while loading
- Provide feedback to user

❌ DON'T:
- Show too many spinners
- Make users wait without feedback
- Use spinners for instant operations

## Examples

### Async Operation with Error Handling

```javascript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const handleSubmit = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Operation failed');
    }
    // Handle success
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### 3D Component with Error Boundary

```javascript
<ErrorBoundary>
  <Canvas>
    <Suspense fallback={<LoadingSpinner />}>
      <YourModel />
    </Suspense>
  </Canvas>
</ErrorBoundary>
```

## Testing Error States

See `src/test/Contact.test.jsx` for testing error scenarios.

## Monitoring & Debugging

### Console Logs

Errors are logged to console:
```javascript
console.error('Error caught by boundary:', error, errorInfo);
```

### Development Tools

- React DevTools - Inspect component tree
- Network tab - Debug API calls
- Console - View error details
