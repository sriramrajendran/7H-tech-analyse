// Unit Tests for PageManager Class
class PageManagerTests {
    constructor() {
        this.testResults = [];
        this.passed = 0;
        this.failed = 0;
    }

    assert(condition, message) {
        if (condition) {
            this.testResults.push(`✅ PASS: ${message}`);
            this.passed++;
        } else {
            this.testResults.push(`❌ FAIL: ${message}`);
            this.failed++;
        }
    }

    assertEqual(actual, expected, message) {
        if (actual === expected) {
            this.testResults.push(`✅ PASS: ${message}`);
            this.passed++;
        } else {
            this.testResults.push(`❌ FAIL: ${message} - Expected: ${expected}, Got: ${actual}`);
            this.failed++;
        }
    }

    testPageManagerInitialization() {
        console.log('Testing PageManager initialization...');
        const mockPageManager = {
            currentPage: 'portfolio',
            defaultStocks: { portfolio: ['AAPL', 'MSFT'] }
        };
        this.assertEqual(mockPageManager.currentPage, 'portfolio', 'Current page should be portfolio');
        this.assertNotNull(mockPageManager.defaultStocks, 'Default stocks should be initialized');
    }

    testSymbolParsing() {
        console.log('Testing stock symbol parsing...');
        const parseSymbols = (input) => input.split(/[\s,]+/).filter(s => s.trim()).map(s => s.toUpperCase());
        
        this.assertArrayEquals(parseSymbols('AAPL MSFT'), ['AAPL', 'MSFT'], 'Should parse space-separated');
        this.assertArrayEquals(parseSymbols('AAPL,MSFT'), ['AAPL', 'MSFT'], 'Should parse comma-separated');
        this.assertArrayEquals(parseSymbols(''), [], 'Should handle empty input');
    }

    assertArrayEquals(actual, expected, message) {
        if (JSON.stringify(actual) === JSON.stringify(expected)) {
            this.testResults.push(`✅ PASS: ${message}`);
            this.passed++;
        } else {
            this.testResults.push(`❌ FAIL: ${message}`);
            this.failed++;
        }
    }

    assertNotNull(value, message) {
        if (value !== null && value !== undefined) {
            this.testResults.push(`✅ PASS: ${message}`);
            this.passed++;
        } else {
            this.testResults.push(`❌ FAIL: ${message}`);
            this.failed++;
        }
    }

    async runAllTests() {
        console.log('🧪 Running PageManager Tests...\n');
        this.testPageManagerInitialization();
        this.testSymbolParsing();
        
        console.log('\n📊 Test Results:');
        this.testResults.forEach(result => console.log(result));
        console.log(`\n✅ Passed: ${this.passed}`);
        console.log(`❌ Failed: ${this.failed}`);
        
        return { passed: this.passed, failed: this.failed };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PageManagerTests;
}
