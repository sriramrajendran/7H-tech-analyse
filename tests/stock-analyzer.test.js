// Unit Tests for StockAnalyzer Class
class StockAnalyzerTests {
    constructor() {
        this.testResults = [];
        this.passed = 0;
        this.failed = 0;
    }

    // Test utility functions
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

    assertNotNull(value, message) {
        if (value !== null && value !== undefined) {
            this.testResults.push(`✅ PASS: ${message}`);
            this.passed++;
        } else {
            this.testResults.push(`❌ FAIL: ${message} - Value is null or undefined`);
            this.failed++;
        }
    }

    // Test StockAnalyzer initialization
    testStockAnalyzerInitialization() {
        console.log('Testing StockAnalyzer initialization...');
        
        const analyzer = new StockAnalyzer('AAPL', '1y');
        this.assertEqual(analyzer.symbol, 'AAPL', 'Symbol should be set correctly');
        this.assertEqual(analyzer.period, '1y', 'Period should be set correctly');
        this.assertEqual(analyzer.data, null, 'Data should be null initially');
    }

    // Test RSI calculation
    testRSICalculation() {
        console.log('Testing RSI calculation...');
        
        const analyzer = new StockAnalyzer('TEST');
        
        // Mock data with known RSI values
        analyzer.data = {
            close: [44, 44.34, 44.09, 44.15, 43.61, 44.33, 44.83, 45.85, 46.08, 45.89, 46.03, 45.61, 46.28, 46.28, 46.00]
        };
        
        const rsi = analyzer.calculateRSI(14);
        this.assertNotNull(rsi, 'RSI should not be null');
        this.assert(rsi >= 0 && rsi <= 100, 'RSI should be between 0 and 100');
    }

    // Test SMA calculation
    testSMACalculation() {
        console.log('Testing SMA calculation...');
        
        const analyzer = new StockAnalyzer('TEST');
        
        // Mock data
        analyzer.data = {
            close: [10, 20, 30, 40, 50]
        };
        
        const sma3 = analyzer.calculateSMA(3);
        this.assertEqual(sma3, 40, '3-period SMA should be 40');
        
        const sma5 = analyzer.calculateSMA(5);
        this.assertEqual(sma5, 30, '5-period SMA should be 30');
    }

    // Test MACD calculation
    testMACDCalculation() {
        console.log('Testing MACD calculation...');
        
        const analyzer = new StockAnalyzer('TEST');
        
        // Mock data
        analyzer.data = {
            close: [100, 102, 104, 103, 105, 107, 106, 108, 110, 109, 111, 113, 112, 114, 116, 115, 117, 119, 118, 120, 122, 121, 123, 125, 124, 126]
        };
        
        const macd = analyzer.calculateMACD();
        this.assertNotNull(macd, 'MACD should not be null');
        this.assertNotNull(macd.macd, 'MACD value should not be null');
    }

    // Test Bollinger Bands calculation
    testBollingerBandsCalculation() {
        console.log('Testing Bollinger Bands calculation...');
        
        const analyzer = new StockAnalyzer('TEST');
        
        // Mock data
        analyzer.data = {
            close: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
        };
        
        const bb = analyzer.calculateBollingerBands(20, 2);
        this.assertNotNull(bb, 'Bollinger Bands should not be null');
        this.assertNotNull(bb.upper, 'Upper band should not be null');
        this.assertNotNull(bb.middle, 'Middle band should not be null');
        this.assertNotNull(bb.lower, 'Lower band should not be null');
        this.assert(bb.upper > bb.middle && bb.middle > bb.lower, 'Upper > Middle > Lower bands');
    }

    // Test Stochastic calculation
    testStochasticCalculation() {
        console.log('Testing Stochastic calculation...');
        
        const analyzer = new StockAnalyzer('TEST');
        
        // Mock data
        analyzer.data = {
            close: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
            high: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
            low: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
        };
        
        const stoch = analyzer.calculateStochastic(14);
        this.assertNotNull(stoch, 'Stochastic should not be null');
        this.assertNotNull(stoch.k, 'Stochastic K should not be null');
        this.assert(stoch.k >= 0 && stoch.k <= 100, 'Stochastic K should be between 0 and 100');
    }

    // Test recommendation engine
    testRecommendationEngine() {
        console.log('Testing recommendation engine...');
        
        const analyzer = new StockAnalyzer('TEST');
        
        // Mock data for strong buy scenario
        analyzer.data = {
            meta: { currentPrice: 100, previousClose: 95 }
        };
        
        // Mock indicators that would trigger strong buy
        const mockIndicators = {
            rsi: 25, // Oversold
            macd: { macd: 2 }, // Bullish
            bollinger: { lower: 98, upper: 102 }, // Near lower band
            sma20: 98, sma50: 95, sma200: 90 // Price above all MAs
        };
        
        const recommendation = analyzer.getRecommendation();
        this.assertNotNull(recommendation, 'Recommendation should not be null');
        this.assertNotNull(recommendation.recommendation, 'Recommendation type should not be null');
        this.assertNotNull(recommendation.score, 'Recommendation score should not be null');
        this.assertNotNull(recommendation.reasoning, 'Recommendation reasoning should not be null');
    }

    // Test mock data generation
    testMockDataGeneration() {
        console.log('Testing mock data generation...');
        
        const analyzer = new StockAnalyzer('TEST', '1mo');
        const mockData = analyzer.generateMockData();
        
        this.assertNotNull(mockData, 'Mock data should not be null');
        this.assertNotNull(mockData.chart, 'Mock data should have chart object');
        this.assertNotNull(mockData.chart.result, 'Mock data should have result array');
        this.assert(mockData.chart.result.length > 0, 'Mock data should have at least one result');
        
        const result = mockData.chart.result[0];
        this.assertNotNull(result.timestamp, 'Mock data should have timestamps');
        this.assertNotNull(result.indicators, 'Mock data should have indicators');
        this.assertNotNull(result.meta, 'Mock data should have metadata');
        this.assertEqual(result.meta.symbol, 'TEST', 'Mock data should have correct symbol');
    }

    // Test data processing
    testDataProcessing() {
        console.log('Testing data processing...');
        
        const analyzer = new StockAnalyzer('TEST');
        
        const mockData = {
            chart: {
                result: [{
                    timestamp: [1609459200, 1609545600],
                    indicators: {
                        quote: [{
                            close: [100, 101],
                            high: [102, 103],
                            low: [98, 99],
                            volume: [1000000, 1100000]
                        }]
                    },
                    meta: {
                        symbol: 'TEST',
                        currency: 'USD',
                        regularMarketPrice: 101,
                        chartPreviousClose: 100,
                        longName: 'Test Corporation'
                    }
                }]
            }
        };
        
        const result = analyzer.processData(mockData);
        this.assert(result, 'Data processing should return true');
        this.assertNotNull(analyzer.data, 'Analyzer data should not be null');
        this.assertEqual(analyzer.data.meta.symbol, 'TEST', 'Symbol should be set correctly');
        this.assertEqual(analyzer.data.meta.currentPrice, 101, 'Current price should be set correctly');
    }

    // Test error handling
    testErrorHandling() {
        console.log('Testing error handling...');
        
        const analyzer = new StockAnalyzer('INVALID');
        
        // Test with invalid data
        const invalidData = { chart: { result: [] } };
        
        try {
            analyzer.processData(invalidData);
            this.assert(false, 'Should throw error for invalid data');
        } catch (error) {
            this.assert(true, 'Should throw error for invalid data');
        }
        
        // Test RSI with insufficient data
        analyzer.data = { close: [1, 2] }; // Less than 14 periods
        const rsi = analyzer.calculateRSI(14);
        this.assertEqual(rsi, null, 'RSI should return null with insufficient data');
    }

    // Run all tests
    async runAllTests() {
        console.log('🧪 Running StockAnalyzer Tests...\n');
        
        this.testStockAnalyzerInitialization();
        this.testRSICalculation();
        this.testSMACalculation();
        this.testMACDCalculation();
        this.testBollingerBandsCalculation();
        this.testStochasticCalculation();
        this.testRecommendationEngine();
        this.testMockDataGeneration();
        this.testDataProcessing();
        this.testErrorHandling();
        
        console.log('\n📊 Test Results:');
        this.testResults.forEach(result => console.log(result));
        console.log(`\n✅ Passed: ${this.passed}`);
        console.log(`❌ Failed: ${this.failed}`);
        console.log(`📈 Success Rate: ${((this.passed / (this.passed + this.failed)) * 100).toFixed(1)}%`);
        
        return {
            passed: this.passed,
            failed: this.failed,
            total: this.passed + this.failed,
            successRate: (this.passed / (this.passed + this.failed)) * 100
        };
    }
}

// Export for use in test runner
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StockAnalyzerTests;
}
