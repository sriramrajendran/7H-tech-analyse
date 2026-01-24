# Test Suite for 7H Stock Analyzer

This directory contains unit tests for the critical JavaScript components of the GitHub Pages version.

## Test Structure

```
tests/
├── README.md              # This file
├── stock-analyzer.test.js # Tests for core analysis engine
├── pages.test.js          # Tests for page management
├── main-github.test.js    # Tests for main application logic
└── test-runner.html       # Browser-based test runner
```

## Running Tests

### Browser Testing (Recommended)
1. Open `tests/test-runner.html` in your browser
2. All tests will run automatically
3. View results in the browser console

### Local Development
```bash
# Serve the project and navigate to tests
python3 -m http.server 8000
# Open http://localhost:8000/tests/test-runner.html
```

## Test Coverage

### StockAnalyzer Class (`stock-analyzer.test.js`)
- ✅ Data fetching with fallback mechanisms
- ✅ Technical indicator calculations (RSI, MACD, SMA, etc.)
- ✅ Recommendation engine logic
- ✅ Mock data generation
- ✅ Error handling

### PageManager Class (`pages.test.js`)
- ✅ Page loading and navigation
- ✅ Default stock configurations
- ✅ Form handling
- ✅ Analysis workflow

### Main Application (`main-github.test.js`)
- ✅ UI event handlers
- ✅ Error display functionality
- ✅ Modal interactions
- ✅ Data formatting

## Test Categories

### Unit Tests
- Individual function testing
- Edge case validation
- Error condition handling

### Integration Tests
- Component interaction testing
- End-to-end workflow validation
- API integration testing

### Performance Tests
- Large dataset handling
- Memory usage validation
- Response time testing

## Adding New Tests

1. Create test functions following the naming convention: `test_[functionality]`
2. Use descriptive test names
3. Test both success and failure scenarios
4. Include edge cases and boundary conditions
5. Add assertions for expected behavior

## Continuous Integration

Tests run automatically on GitHub Actions to prevent regressions during deployment.
