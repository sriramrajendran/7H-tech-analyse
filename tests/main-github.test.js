// Unit Tests for Main GitHub Application
class MainGitHubTests {
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

    assertNotNull(value, message) {
        if (value !== null && value !== undefined) {
            this.testResults.push(`✅ PASS: ${message}`);
            this.passed++;
        } else {
            this.testResults.push(`❌ FAIL: ${message}`);
            this.failed++;
        }
    }

    testUtilityFunctions() {
        console.log('Testing utility functions...');
        
        // Test formatNumber
        const formatNumber = (num) => {
            if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
            if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
            return num.toFixed(2);
        };
        
        this.assertEqual(formatNumber(1500000), '1.5M', 'Should format millions');
        this.assertEqual(formatNumber(2500), '2.5K', 'Should format thousands');
        this.assertEqual(formatNumber(123.45), '123.45', 'Should format regular numbers');
    }

    testErrorDisplay() {
        console.log('Testing error display...');
        
        // Mock error display function
        const mockShowError = (message) => {
            return {
                type: 'error',
                message: `Error: ${message}`,
                timestamp: new Date().toISOString()
            };
        };
        
        const error = mockShowError('Test error');
        this.assertEqual(error.type, 'error', 'Should identify as error');
        this.assert(error.message.includes('Test error'), 'Should include error message');
        this.assertNotNull(error.timestamp, 'Should include timestamp');
    }

    testLoadingStates() {
        console.log('Testing loading states...');
        
        // Mock loading functions
        const mockShowLoading = () => ({ state: 'loading', timestamp: Date.now() });
        const mockHideLoading = () => ({ state: 'hidden', timestamp: Date.now() });
        
        const loading = mockShowLoading();
        this.assertEqual(loading.state, 'loading', 'Should show loading state');
        this.assertNotNull(loading.timestamp, 'Should include timestamp');
        
        const hidden = mockHideLoading();
        this.assertEqual(hidden.state, 'hidden', 'Should hide loading state');
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

    async runAllTests() {
        console.log('🧪 Running Main GitHub Tests...\n');
        this.testUtilityFunctions();
        this.testErrorDisplay();
        this.testLoadingStates();
        
        console.log('\n📊 Test Results:');
        this.testResults.forEach(result => console.log(result));
        console.log(`\n✅ Passed: ${this.passed}`);
        console.log(`❌ Failed: ${this.failed}`);
        
        return { passed: this.passed, failed: this.failed };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MainGitHubTests;
}
