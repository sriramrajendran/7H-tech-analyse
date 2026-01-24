// Page Manager - Handles dynamic content loading and default stocks
class PageManager {
    constructor() {
        this.currentPage = 'portfolio';
        this.config = null;
        this.loadConfig();
    }

    async loadConfig() {
        try {
            const response = await fetch('input/config.json');
            this.config = await response.json();
            console.log('Configuration loaded:', this.config);
        } catch (error) {
            console.error('Failed to load configuration:', error);
            // Fallback to hardcoded defaults
            this.config = {
                portfolio: { symbols: ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'AMZN', 'META', 'NFLX'], defaultPeriod: '1y', defaultTopN: 10 },
                watchlist: { symbols: ['SPY', 'QQQ', 'IWM', 'DIA', 'VTI', 'VOO', 'GLD', 'BTC-USD'], defaultPeriod: '6mo', defaultTopN: 3 },
                market: { symbols: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'JPM', 'JNJ', 'V', 'PG', 'UNH', 'HD', 'MA', 'BAC', 'XOM', 'CVX', 'LLY', 'ABBV', 'PFE'], defaultPeriod: '3mo', defaultTopN: 10 },
                etf: { symbols: ['SPY', 'QQQ', 'IWM', 'DIA', 'VTI', 'VOO', 'VUG', 'VTV', 'GLD', 'SLV', 'TLT', 'HYG', 'LQD', 'XLF', 'XLK', 'XLE', 'XLV', 'XLI', 'XLU', 'XLP'], defaultPeriod: '6mo', defaultTopN: 8 }
            };
        }
    }

    getDefaultStocks(pageType) {
        if (!this.config) {
            // Return fallback defaults if config not loaded yet
            return ['AAPL', 'MSFT', 'GOOGL', 'TSLA'];
        }
        return this.config[pageType]?.symbols || ['AAPL', 'MSFT', 'GOOGL', 'TSLA'];
    }

    getDefaultPeriod(pageType) {
        return this.config?.[pageType]?.defaultPeriod || '1y';
    }

    getDefaultTopN(pageType) {
        return this.config?.[pageType]?.defaultTopN || 5;
    }

    loadPage(pageType) {
        this.currentPage = pageType;
        const mainContent = document.getElementById('main-content');
        
        // Update active nav
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.getElementById(`nav-${pageType}`).classList.add('active');

        let content = '';
        
        switch(pageType) {
            case 'portfolio':
                content = this.generatePortfolioContent();
                break;
            case 'watchlist':
                content = this.generateWatchlistContent();
                break;
            case 'market':
                content = this.generateMarketContent();
                break;
            case 'etf':
                content = this.generateETFContent();
                break;
            default:
                content = '<div class="card"><h2>Page not found</h2></div>';
        }
        
        mainContent.innerHTML = content;
        this.attachEventListeners(pageType);
    }
    
    generatePortfolioContent() {
        const defaultStocks = this.getDefaultStocks('portfolio');
        const defaultPeriod = this.getDefaultPeriod('portfolio');
        const defaultTopN = this.getDefaultTopN('portfolio');
        
        return `
            <div class="card">
                <h2>Portfolio Analysis</h2>
                <p>Analyze your portfolio stocks and get BUY/SELL recommendations based on technical indicators.</p>
                
                <form id="portfolio-form">
                    <div class="form-group">
                        <label for="symbols">Stock Symbols (comma or space separated):</label>
                        <textarea id="symbols" name="symbols" rows="2" placeholder="Enter stock symbols separated by commas or spaces...">${defaultStocks.join(', ')}</textarea>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="period">Time Period:</label>
                            <select id="period" name="period">
                                <option value="1mo" ${defaultPeriod === '1mo' ? 'selected' : ''}>1 Month</option>
                                <option value="3mo" ${defaultPeriod === '3mo' ? 'selected' : ''}>3 Months</option>
                                <option value="6mo" ${defaultPeriod === '6mo' ? 'selected' : ''}>6 Months</option>
                                <option value="1y" ${defaultPeriod === '1y' ? 'selected' : ''}>1 Year</option>
                                <option value="2y" ${defaultPeriod === '2y' ? 'selected' : ''}>2 Years</option>
                                <option value="5y" ${defaultPeriod === '5y' ? 'selected' : ''}>5 Years</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="top_n">Top Recommendations:</label>
                            <select id="top_n" name="top_n">
                                <option value="3" ${defaultTopN === 3 ? 'selected' : ''}>Top 3</option>
                                <option value="5" ${defaultTopN === 5 ? 'selected' : ''}>Top 5</option>
                                <option value="10" ${defaultTopN === 10 ? 'selected' : ''}>Top 10</option>
                                <option value="15" ${defaultTopN === 15 ? 'selected' : ''}>Top 15</option>
                                <option value="20" ${defaultTopN === 20 ? 'selected' : ''}>Top 20</option>
                            </select>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Analyze Portfolio</button>
                </form>
            </div>
            
            <div id="portfolio-results" class="results-container"></div>
        `;
    }
    
    generateWatchlistContent() {
        const defaultStocks = this.getDefaultStocks('watchlist');
        const defaultPeriod = this.getDefaultPeriod('watchlist');
        const defaultTopN = this.getDefaultTopN('watchlist');
        
        return `
            <div class="card">
                <h2>Watchlist Analysis</h2>
                <p>Track your watchlist stocks and get investment recommendations.</p>
                
                <form id="watchlist-form">
                    <div class="form-group">
                        <label for="symbols">Watchlist Symbols:</label>
                        <textarea id="symbols" name="symbols" rows="2" placeholder="Enter watchlist symbols...">${defaultStocks.join(', ')}</textarea>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="period">Time Period:</label>
                            <select id="period" name="period">
                                <option value="1mo" ${defaultPeriod === '1mo' ? 'selected' : ''}>1 Month</option>
                                <option value="3mo" ${defaultPeriod === '3mo' ? 'selected' : ''}>3 Months</option>
                                <option value="6mo" ${defaultPeriod === '6mo' ? 'selected' : ''}>6 Months</option>
                                <option value="1y" ${defaultPeriod === '1y' ? 'selected' : ''}>1 Year</option>
                                <option value="2y" ${defaultPeriod === '2y' ? 'selected' : ''}>2 Years</option>
                                <option value="5y" ${defaultPeriod === '5y' ? 'selected' : ''}>5 Years</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="top_n">Top Recommendations:</label>
                            <select id="top_n" name="top_n">
                                <option value="3" ${defaultTopN === 3 ? 'selected' : ''}>Top 3</option>
                                <option value="5" ${defaultTopN === 5 ? 'selected' : ''}>Top 5</option>
                                <option value="10" ${defaultTopN === 10 ? 'selected' : ''}>Top 10</option>
                                <option value="15" ${defaultTopN === 15 ? 'selected' : ''}>Top 15</option>
                                <option value="20" ${defaultTopN === 20 ? 'selected' : ''}>Top 20</option>
                            </select>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Analyze Watchlist</button>
                </form>
            </div>
            
            <div id="watchlist-results" class="results-container"></div>
        `;
    }
    
    generateMarketContent() {
        const defaultStocks = this.getDefaultStocks('market');
        const defaultPeriod = this.getDefaultPeriod('market');
        const defaultTopN = this.getDefaultTopN('market');
        
        return `
            <div class="card">
                <h2>US Market Analysis</h2>
                <p>Get top BUY recommendations from major US stocks.</p>
                
                <form id="market-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="period">Time Period:</label>
                            <select id="period" name="period">
                                <option value="1mo" ${defaultPeriod === '1mo' ? 'selected' : ''}>1 Month</option>
                                <option value="3mo" ${defaultPeriod === '3mo' ? 'selected' : ''}>3 Months</option>
                                <option value="6mo" ${defaultPeriod === '6mo' ? 'selected' : ''}>6 Months</option>
                                <option value="1y" ${defaultPeriod === '1y' ? 'selected' : ''}>1 Year</option>
                                <option value="2y" ${defaultPeriod === '2y' ? 'selected' : ''}>2 Years</option>
                                <option value="5y" ${defaultPeriod === '5y' ? 'selected' : ''}>5 Years</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="top_n">Top Recommendations:</label>
                            <select id="top_n" name="top_n">
                                <option value="5" ${defaultTopN === 5 ? 'selected' : ''}>Top 5</option>
                                <option value="10" ${defaultTopN === 10 ? 'selected' : ''}>Top 10</option>
                                <option value="15" ${defaultTopN === 15 ? 'selected' : ''}>Top 15</option>
                                <option value="20" ${defaultTopN === 20 ? 'selected' : ''}>Top 20</option>
                                <option value="30" ${defaultTopN === 30 ? 'selected' : ''}>Top 30</option>
                            </select>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Analyze US Market</button>
                </form>
            </div>
            
            <div id="market-results" class="results-container"></div>
        `;
    }
    
    generateETFContent() {
        const defaultStocks = this.getDefaultStocks('etf');
        const defaultPeriod = this.getDefaultPeriod('etf');
        const defaultTopN = this.getDefaultTopN('etf');
        
        return `
            <div class="card">
                <h2>ETF/Index Analysis</h2>
                <p>Analyze major ETFs and index funds for investment recommendations.</p>
                
                <form id="etf-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="period">Time Period:</label>
                            <select id="period" name="period">
                                <option value="1mo" ${defaultPeriod === '1mo' ? 'selected' : ''}>1 Month</option>
                                <option value="3mo" ${defaultPeriod === '3mo' ? 'selected' : ''}>3 Months</option>
                                <option value="6mo" ${defaultPeriod === '6mo' ? 'selected' : ''}>6 Months</option>
                                <option value="1y" ${defaultPeriod === '1y' ? 'selected' : ''}>1 Year</option>
                                <option value="2y" ${defaultPeriod === '2y' ? 'selected' : ''}>2 Years</option>
                                <option value="5y" ${defaultPeriod === '5y' ? 'selected' : ''}>5 Years</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="top_n">Top Recommendations:</label>
                            <select id="top_n" name="top_n">
                                <option value="3" ${defaultTopN === 3 ? 'selected' : ''}>Top 3</option>
                                <option value="5" ${defaultTopN === 5 ? 'selected' : ''}>Top 5</option>
                                <option value="8" ${defaultTopN === 8 ? 'selected' : ''}>Top 8</option>
                                <option value="10" ${defaultTopN === 10 ? 'selected' : ''}>Top 10</option>
                                <option value="15" ${defaultTopN === 15 ? 'selected' : ''}>Top 15</option>
                            </select>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Analyze ETFs/Indexes</button>
                </form>
            </div>
            
            <div id="etf-results" class="results-container"></div>
        `;
    }
    
    getImportContent() {
        return `
            <div class="card">
                <h2>Import Portfolio</h2>
                <p class="info-text">Import your portfolio from Robinhood, E-Trade, or other brokerages</p>
                
                <div class="info-text" style="background: var(--warning-bg); border: 1px solid var(--warning); padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <strong>Note:</strong> Portfolio import functionality requires server-side processing and is not available in the GitHub Pages version. 
                    Please use the desktop version for portfolio import features.
                </div>
                
                <form id="import-form" enctype="multipart/form-data" onsubmit="event.preventDefault(); alert('Portfolio import is not available in GitHub Pages version. Please use the desktop version.');">
                    <div class="form-group">
                        <label for="csv-file">Portfolio CSV File</label>
                        <input type="file" id="csv-file" name="file" accept=".csv" disabled>
                        <small class="form-hint">Export your portfolio as CSV from your brokerage</small>
                    </div>
                    <div class="form-group">
                        <label for="broker-select">Brokerage</label>
                        <select id="broker-select" name="broker" disabled>
                            <option value="auto">Auto-detect</option>
                            <option value="robinhood">Robinhood</option>
                            <option value="etrade">E-Trade</option>
                            <option value="fidelity">Fidelity</option>
                            <option value="schwab">Charles Schwab</option>
                            <option value="csv">Generic CSV</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary" disabled>Import Portfolio (Desktop Only)</button>
                </form>
            </div>
        `;
    }
    
    attachEventListeners(pageType) {
        // Remove existing listeners to prevent duplicates
        const existingForm = document.getElementById(`${pageType}-form`);
        if (existingForm) {
            const newForm = existingForm.cloneNode(true);
            existingForm.parentNode.replaceChild(newForm, existingForm);
        }
        
        // Add form submit listener
        const form = document.getElementById(`${pageType}-form`);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(pageType);
            });
        }
    }
    
    handleFormSubmit(pageType) {
        const symbolsInput = document.getElementById('symbols');
        const periodSelect = document.getElementById('period');
        const topNSelect = document.getElementById('top_n');
        
        if (!symbolsInput || !periodSelect || !topNSelect) {
            showError('Form elements not found');
            return;
        }
        
        const symbols = symbolsInput.value.trim();
        const period = periodSelect.value;
        const topN = parseInt(topNSelect.value);
        
        if (!symbols) {
            showError('Please enter at least one stock symbol');
            return;
        }
        
        const symbolArray = symbols.split(/[\s,]+/).filter(s => s.trim()).map(s => s.toUpperCase());
        this.analyzeStocks(symbolArray, period, topN, pageType);
    }
    
    async autoAnalyzePage(pageType) {
        let symbols, period, topN;

        switch(pageType) {
            case 'portfolio':
                symbols = this.getDefaultStocks('portfolio');
                period = this.getDefaultPeriod('portfolio');
                topN = this.getDefaultTopN('portfolio');
                break;
            case 'watchlist':
                symbols = this.getDefaultStocks('watchlist');
                period = this.getDefaultPeriod('watchlist');
                topN = this.getDefaultTopN('watchlist');
                break;
            case 'market':
                symbols = this.getDefaultStocks('market');
                period = this.getDefaultPeriod('market');
                topN = this.getDefaultTopN('market');
                break;
            case 'etf':
                symbols = this.getDefaultStocks('etf');
                period = this.getDefaultPeriod('etf');
                topN = this.getDefaultTopN('etf');
                break;
            default:
                return;
        }

        await this.analyzeStocks(symbols, period, topN, pageType);
    }

    async analyzeStocks(symbols, period, topN, pageType) {
        showLoading();
        
        try {
            const batchAnalyzer = new BatchStockAnalyzer(symbols, period);
            const analysisResults = await batchAnalyzer.analyzeAll();
            
            const results = [];
            const failedSymbols = [];
            let usingMockData = false;
            
            for (const symbol of symbols) {
                if (analysisResults[symbol] && !analysisResults[symbol].error) {
                    const result = analysisResults[symbol];
                    const summary = result.summary;
                    const recommendation = result.recommendation;
                    
                    // Check if using mock data
                    if (summary.fundamental && summary.fundamental.isMockData) {
                        usingMockData = true;
                    }
                    
                    results.push({
                        symbol: symbol,
                        company: summary.company_name || 'N/A',
                        price: summary.current_price || 0,
                        change: summary.price_change_pct || 0,
                        change_1d: summary.price_change_1d_pct || 0,
                        change_1w: summary.price_change_1w_pct || 0,
                        change_1m: summary.price_change_1m_pct || 0,
                        change_6m: summary.price_change_6m_pct || 0,
                        change_1y: summary.price_change_1y_pct || 0,
                        rsi: summary.rsi || 0,
                        macd: summary.macd || 0,
                        sma_20: summary.sma_20 || 0,
                        sma_50: summary.sma_50 || 0,
                        vcp_pattern: summary.vcp_pattern || {},
                        rsi_divergence: summary.rsi_divergence || {},
                        macd_divergence: summary.macd_divergence || {},
                        enhanced_crossovers: summary.enhanced_crossovers || {},
                        breakout_setup: summary.breakout_setup || {},
                        recommendation: recommendation.recommendation,
                        score: recommendation.score,
                        reasoning: recommendation.reasoning,
                        fundamental: summary.fundamental || {}
                    });
                } else {
                    failedSymbols.push(symbol);
                }
            }
            
            if (results.length === 0) {
                showError('No stocks were successfully analyzed. Please check your internet connection and try again.');
                return;
            }
            
            // Show mock data warning if applicable
            if (usingMockData) {
                showError('Using demo data for testing purposes. Real market data will be used in production.', document.getElementById('portfolio-results'));
            }
            
            // Sort by score
            const resultsSorted = results.sort((a, b) => b.score - a.score);
            
            let displayData;
            if (pageType === 'market' || pageType === 'etf') {
                // For market/etf, only show BUY recommendations
                const buyStocks = resultsSorted.filter(r => r.recommendation.includes('BUY'));
                displayData = {
                    buy_recommendations: buyStocks.slice(0, topN),
                    total_analyzed: symbols.length,
                    failed_symbols: failedSymbols
                };
                displayMarketResults(displayData, document.getElementById('portfolio-results'));
            } else {
                // For portfolio/watchlist, show all recommendations
                const buyStocks = resultsSorted.filter(r => r.recommendation.includes('BUY'));
                const sellStocks = resultsSorted.filter(r => r.recommendation.includes('SELL')).sort((a, b) => a.score - b.score);
                const holdStocks = resultsSorted.filter(r => r.recommendation === 'HOLD');
                
                displayData = {
                    buy_stocks: buyStocks.slice(0, topN),
                    sell_stocks: sellStocks.slice(0, topN),
                    hold_stocks: holdStocks,
                    summary: {
                        total: results.length,
                        buy_count: buyStocks.length,
                        sell_count: sellStocks.length,
                        hold_count: holdStocks.length,
                        avg_score: results.reduce((sum, r) => sum + r.score, 0) / results.length,
                        highest: resultsSorted[0],
                        lowest: resultsSorted[resultsSorted.length - 1]
                    },
                    failed_symbols: failedSymbols
                };
                displayPortfolioResults(displayData, document.getElementById('portfolio-results'));
            }
            
        } catch (error) {
            showError('Analysis failed: ' + error.message);
        } finally {
            hideLoading();
        }
    }
}

// Global page manager instance
const pageManager = new PageManager();
