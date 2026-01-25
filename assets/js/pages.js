// Page Manager - Handles dynamic content loading and default stocks
class PageManager {
    constructor() {
        this.currentPage = 'portfolio';
        this.config = null;
        this.loadConfig();
    }

    async loadConfig() {
        try {
            // Detect environment and load appropriate config
            const isLocal = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1' || 
                           window.location.hostname.startsWith('192.168.') ||
                           window.location.hostname.startsWith('10.');
            
            const configFileName = isLocal ? 'config.local.json' : 'config.github.json';
            console.log(`Loading ${isLocal ? 'local' : 'GitHub Pages'} configuration...`);
            
            const response = await fetch(`input/${configFileName}`);
            if (!response.ok) {
                throw new Error(`Failed to load ${configFileName}: ${response.status}`);
            }
            
            this.config = await response.json();
            console.log(`Configuration loaded for ${this.config.environment}:`, this.config);
            
            // Update API strategy based on config
            if (window.stockAnalyzer) {
                window.stockAnalyzer.updateAPIConfig(this.config.api);
            }
            
            // Show configuration status to user
            if (this.config.api?.fallback?.useMockData) {
                console.log(' Mock data enabled - using demo data for testing');
            } else {
                console.log(' Live data enabled - attempting to fetch real market data');
            }
            
        } catch (error) {
            console.error('Failed to load configuration:', error);
            console.log(' Using fallback configuration with mock data...');
            
            // Fallback to hardcoded defaults with mock data
            this.config = {
                environment: 'fallback',
                portfolio: { symbols: ['AAPL', 'MSFT', 'GOOGL', 'TSLA'], defaultPeriod: '1y', defaultTopN: 5 },
                watchlist: { symbols: ['SPY', 'QQQ', 'IWM'], defaultPeriod: '6mo', defaultTopN: 3 },
                market: { symbols: ['AAPL', 'MSFT', 'GOOGL', 'AMZN'], defaultPeriod: '3mo', defaultTopN: 10 },
                etf: { symbols: ['SPY', 'QQQ', 'IWM', 'DIA'], defaultPeriod: '6mo', defaultTopN: 8 },
                api: { 
                    strategy: 'mock',
                    fallback: { useMockData: true }
                }
            };
            
            // Update API config for fallback
            if (window.stockAnalyzer) {
                window.stockAnalyzer.updateAPIConfig(this.config.api);
            }
        }
    }

    getDefaultStocks(pageType) {
        if (!this.config) {
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
            case 'us-stocks':
                content = this.generateUSStocksContent();
                break;
            case 'etf':
                content = this.generateETFContent();
                break;
            case 'import':
                content = this.generateImportContent();
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
            <div class="page-header">
                <h2>Portfolio Analysis</h2>
                <p>Analyze your portfolio stocks with detailed technical indicators and recommendations.</p>
                
                <form id="portfolio-form">
                    <div class="controls-row">
                        <div class="form-group">
                            <label for="symbols">Stock Symbols:</label>
                            <textarea id="symbols" rows="2" placeholder="Enter symbols...">${defaultStocks.join(', ')}</textarea>
                        </div>
                        
                        <div class="form-group">
                            <label for="period">Period:</label>
                            <select id="period">
                                <option value="1mo" ${defaultPeriod === '1mo' ? 'selected' : ''}>1 Month</option>
                                <option value="3mo" ${defaultPeriod === '3mo' ? 'selected' : ''}>3 Months</option>
                                <option value="6mo" ${defaultPeriod === '6mo' ? 'selected' : ''}>6 Months</option>
                                <option value="1y" ${defaultPeriod === '1y' ? 'selected' : ''}>1 Year</option>
                                <option value="2y" ${defaultPeriod === '2y' ? 'selected' : ''}>2 Years</option>
                                <option value="5y" ${defaultPeriod === '5y' ? 'selected' : ''}>5 Years</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="top_n">Top N:</label>
                            <select id="top_n">
                                <option value="3" ${defaultTopN === 3 ? 'selected' : ''}>Top 3</option>
                                <option value="5" ${defaultTopN === 5 ? 'selected' : ''}>Top 5</option>
                                <option value="10" ${defaultTopN === 10 ? 'selected' : ''}>Top 10</option>
                                <option value="15" ${defaultTopN === 15 ? 'selected' : ''}>Top 15</option>
                                <option value="20" ${defaultTopN === 20 ? 'selected' : ''}>Top 20</option>
                            </select>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">Analyze</button>
                    </div>
                </form>
            </div>
            
            <div class="table-container">
                <div class="table-controls">
                    <input type="text" id="table-search" placeholder="Search stocks..." class="search-input">
                    <select id="table-filter" class="filter-select">
                        <option value="all">All Stocks</option>
                        <option value="buy">Buy Recommendations</option>
                        <option value="sell">Sell Recommendations</option>
                        <option value="hold">Hold</option>
                    </select>
                </div>
                
                <div class="table-wrapper">
                    <table id="stocks-table" class="stocks-table">
                    <thead>
                        <tr>
                            <th data-sort="rank">Rank ↕</th>
                            <th data-sort="symbol">Symbol ↕</th>
                            <th data-sort="price">Price ↕</th>
                            <th data-sort="change_1d">1D % ↕</th>
                            <th data-sort="change_1w">1W % ↕</th>
                            <th data-sort="change_1m">1M % ↕</th>
                            <th data-sort="change_6m">6M % ↕</th>
                            <th data-sort="change_1y">1Y % ↕</th>
                            <th data-sort="rsi">RSI ↕</th>
                            <th>VCP</th>
                            <th>RSI Div</th>
                            <th>MACD Div</th>
                            <th>Cross</th>
                            <th>Breakout</th>
                            <th data-sort="recommendation">Recommendation ↕</th>
                            <th data-sort="score">Score ↕</th>
                        </tr>
                    </thead>
                    <tbody id="stocks-tbody">
                        <tr><td colspan="16" class="loading-cell">Click "Analyze" to load stock data...</td></tr>
                    </tbody>
                </table>
                </div>
            </div>
        `;
    }
    
    generateWatchlistContent() {
        const defaultStocks = this.getDefaultStocks('watchlist');
        const defaultPeriod = this.getDefaultPeriod('watchlist');
        const defaultTopN = this.getDefaultTopN('watchlist');
        
        return `
            <div class="page-header">
                <h2>Watchlist Analysis</h2>
                <p>Track your watchlist stocks and get investment recommendations.</p>
                
                <form id="watchlist-form">
                    <div class="controls-row">
                        <div class="form-group">
                            <label for="symbols">Watchlist Symbols:</label>
                            <textarea id="symbols" rows="2" placeholder="Enter watchlist symbols...">${defaultStocks.join(', ')}</textarea>
                        </div>
                        
                        <div class="form-group">
                            <label for="period">Period:</label>
                            <select id="period">
                                <option value="1mo" ${defaultPeriod === '1mo' ? 'selected' : ''}>1 Month</option>
                                <option value="3mo" ${defaultPeriod === '3mo' ? 'selected' : ''}>3 Months</option>
                                <option value="6mo" ${defaultPeriod === '6mo' ? 'selected' : ''}>6 Months</option>
                                <option value="1y" ${defaultPeriod === '1y' ? 'selected' : ''}>1 Year</option>
                                <option value="2y" ${defaultPeriod === '2y' ? 'selected' : ''}>2 Years</option>
                                <option value="5y" ${defaultPeriod === '5y' ? 'selected' : ''}>5 Years</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="top_n">Top N:</label>
                            <select id="top_n">
                                <option value="3" ${defaultTopN === 3 ? 'selected' : ''}>Top 3</option>
                                <option value="5" ${defaultTopN === 5 ? 'selected' : ''}>Top 5</option>
                                <option value="10" ${defaultTopN === 10 ? 'selected' : ''}>Top 10</option>
                                <option value="15" ${defaultTopN === 15 ? 'selected' : ''}>Top 15</option>
                                <option value="20" ${defaultTopN === 20 ? 'selected' : ''}>Top 20</option>
                            </select>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">Analyze Watchlist</button>
                    </div>
                </form>
            </div>
            
            <div class="table-container">
                <div class="table-controls">
                    <input type="text" id="table-search" placeholder="Search stocks..." class="search-input">
                    <select id="table-filter" class="filter-select">
                        <option value="all">All Stocks</option>
                        <option value="buy">Buy Recommendations</option>
                        <option value="sell">Sell Recommendations</option>
                        <option value="hold">Hold</option>
                    </select>
                </div>
                
                <div class="table-wrapper">
                    <table id="stocks-table" class="stocks-table">
                    <thead>
                        <tr>
                            <th data-sort="rank">Rank ↕</th>
                            <th data-sort="symbol">Symbol ↕</th>
                            <th data-sort="price">Price ↕</th>
                            <th data-sort="change_1d">1D % ↕</th>
                            <th data-sort="change_1w">1W % ↕</th>
                            <th data-sort="change_1m">1M % ↕</th>
                            <th data-sort="change_6m">6M % ↕</th>
                            <th data-sort="change_1y">1Y % ↕</th>
                            <th data-sort="rsi">RSI ↕</th>
                            <th>VCP</th>
                            <th>RSI Div</th>
                            <th>MACD Div</th>
                            <th>Cross</th>
                            <th>Breakout</th>
                            <th data-sort="recommendation">Recommendation ↕</th>
                            <th data-sort="score">Score ↕</th>
                        </tr>
                    </thead>
                    <tbody id="stocks-tbody">
                        <tr><td colspan="16" class="loading-cell">Click "Analyze Watchlist" to load data...</td></tr>
                    </tbody>
                </table>
                </div>
            </div>
        `;
    }
    
    generateUSStocksContent() {
        const defaultStocks = this.getDefaultStocks('market');
        const defaultPeriod = this.getDefaultPeriod('market');
        const defaultTopN = this.getDefaultTopN('market');
        
        return `
            <div class="page-header">
                <h2>US Stocks Analysis</h2>
                <p>Get top BUY recommendations from major US stocks with detailed technical analysis.</p>
                
                <form id="us-stocks-form">
                    <div class="controls-row">
                        <div class="form-group">
                            <label for="period">Period:</label>
                            <select id="period">
                                <option value="1mo" ${defaultPeriod === '1mo' ? 'selected' : ''}>1 Month</option>
                                <option value="3mo" ${defaultPeriod === '3mo' ? 'selected' : ''}>3 Months</option>
                                <option value="6mo" ${defaultPeriod === '6mo' ? 'selected' : ''}>6 Months</option>
                                <option value="1y" ${defaultPeriod === '1y' ? 'selected' : ''}>1 Year</option>
                                <option value="2y" ${defaultPeriod === '2y' ? 'selected' : ''}>2 Years</option>
                                <option value="5y" ${defaultPeriod === '5y' ? 'selected' : ''}>5 Years</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="top_n">Top N:</label>
                            <select id="top_n">
                                <option value="5" ${defaultTopN === 5 ? 'selected' : ''}>Top 5</option>
                                <option value="10" ${defaultTopN === 10 ? 'selected' : ''}>Top 10</option>
                                <option value="15" ${defaultTopN === 15 ? 'selected' : ''}>Top 15</option>
                                <option value="20" ${defaultTopN === 20 ? 'selected' : ''}>Top 20</option>
                                <option value="30" ${defaultTopN === 30 ? 'selected' : ''}>Top 30</option>
                            </select>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">Analyze US Stocks</button>
                    </div>
                </form>
            </div>
            
            <div class="table-container">
                <div class="table-controls">
                    <input type="text" id="table-search" placeholder="Search stocks..." class="search-input">
                    <select id="table-filter" class="filter-select">
                        <option value="all">All Stocks</option>
                        <option value="buy">Buy Recommendations</option>
                        <option value="sell">Sell Recommendations</option>
                        <option value="hold">Hold</option>
                    </select>
                </div>
                
                <div class="table-wrapper">
                    <table id="stocks-table" class="stocks-table">
                    <thead>
                        <tr>
                            <th data-sort="rank">Rank ↕</th>
                            <th data-sort="symbol">Symbol ↕</th>
                            <th data-sort="price">Price ↕</th>
                            <th data-sort="change_1d">1D % ↕</th>
                            <th data-sort="change_1w">1W % ↕</th>
                            <th data-sort="change_1m">1M % ↕</th>
                            <th data-sort="change_6m">6M % ↕</th>
                            <th data-sort="change_1y">1Y % ↕</th>
                            <th data-sort="rsi">RSI ↕</th>
                            <th>VCP</th>
                            <th>RSI Div</th>
                            <th>MACD Div</th>
                            <th>Cross</th>
                            <th>Breakout</th>
                            <th data-sort="recommendation">Recommendation ↕</th>
                            <th data-sort="score">Score ↕</th>
                        </tr>
                    </thead>
                    <tbody id="stocks-tbody">
                        <tr><td colspan="16" class="loading-cell">Click "Analyze US Stocks" to load data...</td></tr>
                    </tbody>
                </table>
                </div>
            </div>
        `;
    }
    
    generateETFContent() {
        const defaultStocks = this.getDefaultStocks('etf');
        const defaultPeriod = this.getDefaultPeriod('etf');
        const defaultTopN = this.getDefaultTopN('etf');
        
        return `
            <div class="page-header">
                <h2>ETF/Index Analysis</h2>
                <p>Analyze major ETFs and index funds for investment recommendations.</p>
                
                <form id="etf-form">
                    <div class="controls-row">
                        <div class="form-group">
                            <label for="period">Period:</label>
                            <select id="period">
                                <option value="1mo" ${defaultPeriod === '1mo' ? 'selected' : ''}>1 Month</option>
                                <option value="3mo" ${defaultPeriod === '3mo' ? 'selected' : ''}>3 Months</option>
                                <option value="6mo" ${defaultPeriod === '6mo' ? 'selected' : ''}>6 Months</option>
                                <option value="1y" ${defaultPeriod === '1y' ? 'selected' : ''}>1 Year</option>
                                <option value="2y" ${defaultPeriod === '2y' ? 'selected' : ''}>2 Years</option>
                                <option value="5y" ${defaultPeriod === '5y' ? 'selected' : ''}>5 Years</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="top_n">Top N:</label>
                            <select id="top_n">
                                <option value="3" ${defaultTopN === 3 ? 'selected' : ''}>Top 3</option>
                                <option value="5" ${defaultTopN === 5 ? 'selected' : ''}>Top 5</option>
                                <option value="8" ${defaultTopN === 8 ? 'selected' : ''}>Top 8</option>
                                <option value="10" ${defaultTopN === 10 ? 'selected' : ''}>Top 10</option>
                                <option value="15" ${defaultTopN === 15 ? 'selected' : ''}>Top 15</option>
                            </select>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">Analyze ETFs</button>
                    </div>
                </form>
            </div>
            
            <div class="table-container">
                <div class="table-controls">
                    <input type="text" id="table-search" placeholder="Search ETFs..." class="search-input">
                    <select id="table-filter" class="filter-select">
                        <option value="all">All ETFs</option>
                        <option value="buy">Buy Recommendations</option>
                        <option value="sell">Sell Recommendations</option>
                        <option value="hold">Hold</option>
                    </select>
                </div>
                
                <div class="table-wrapper">
                    <table id="stocks-table" class="stocks-table">
                    <thead>
                        <tr>
                            <th data-sort="rank">Rank ↕</th>
                            <th data-sort="symbol">Symbol ↕</th>
                            <th data-sort="price">Price ↕</th>
                            <th data-sort="change_1d">1D % ↕</th>
                            <th data-sort="change_1w">1W % ↕</th>
                            <th data-sort="change_1m">1M % ↕</th>
                            <th data-sort="change_6m">6M % ↕</th>
                            <th data-sort="change_1y">1Y % ↕</th>
                            <th data-sort="rsi">RSI ↕</th>
                            <th>VCP</th>
                            <th>RSI Div</th>
                            <th>MACD Div</th>
                            <th>Cross</th>
                            <th>Breakout</th>
                            <th data-sort="recommendation">Recommendation ↕</th>
                            <th data-sort="score">Score ↕</th>
                        </tr>
                    </thead>
                    <tbody id="stocks-tbody">
                        <tr><td colspan="16" class="loading-cell">Click "Analyze ETFs" to load data...</td></tr>
                    </tbody>
                </table>
                </div>
            </div>
        `;
    }
    
    generateImportContent() {
        return `
            <div class="page-header">
                <h2>Import Portfolio</h2>
                <p>Import your portfolio from a brokerage CSV file to analyze your holdings.</p>
                
                <form id="import-form">
                    <div class="controls-row">
                        <div class="form-group">
                            <label for="csv-file">CSV File:</label>
                            <input type="file" id="csv-file" accept=".csv" required>
                            <div class="form-hint">Supported formats: Robinhood, E-Trade, Schwab, Fidelity</div>
                        </div>
                        
                        <div class="form-group">
                            <label for="brokerage">Brokerage:</label>
                            <select id="brokerage">
                                <option value="auto">Auto-detect</option>
                                <option value="robinhood">Robinhood</option>
                                <option value="etrade">E-Trade</option>
                                <option value="schwab">Schwab</option>
                                <option value="fidelity">Fidelity</option>
                                <option value="vanguard">Vanguard</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="controls-row">
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="save-portfolio" checked>
                                Save portfolio to local storage
                            </label>
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="update-watchlist">
                                Add symbols to watchlist
                            </label>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">Import Portfolio</button>
                    </div>
                </form>
            </div>
            
            <div id="import-results" style="display: none;">
                <!-- Results will be displayed here -->
            </div>
        `;
    }
    
    attachEventListeners(pageType) {
        // Add form submit listener
        const form = document.getElementById(`${pageType}-form`);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(pageType);
            });
        }
        
        // Special handling for import page
        if (pageType === 'import') {
            const fileInput = document.getElementById('csv-file');
            if (fileInput) {
                fileInput.addEventListener('change', (e) => {
                    this.handleFileSelect(e);
                });
            }
        }
    }
    
    handleFormSubmit(pageType) {
        if (pageType === 'import') {
            this.handleImportSubmit();
            return;
        }
        
        const symbolsInput = document.getElementById('symbols');
        const periodSelect = document.getElementById('period');
        const topNSelect = document.getElementById('top_n');
        
        // For US Stocks and ETF pages, symbols come from config
        let symbols = '';
        if (pageType === 'us-stocks' || pageType === 'etf') {
            symbols = this.getDefaultStocks(pageType === 'us-stocks' ? 'market' : 'etf').join(', ');
        } else if (symbolsInput) {
            symbols = symbolsInput.value.trim();
        }
        
        if (!symbols) {
            showError('Please enter stock symbols');
            return;
        }
        
        const period = periodSelect ? periodSelect.value : '1y';
        const topN = topNSelect ? parseInt(topNSelect.value) : 5;
        
        const symbolArray = symbols.split(/[\s,]+/).filter(s => s.trim()).map(s => s.toUpperCase());
        this.analyzeStocks(symbolArray, period, topN, pageType);
    }
    
    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            // Basic file validation
            if (!file.name.toLowerCase().endsWith('.csv')) {
                showError('Please select a CSV file');
                return;
            }
            
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                showError('File size too large. Please select a smaller file.');
                return;
            }
            
            console.log('File selected:', file.name, 'Size:', file.size);
        }
    }
    
    handleImportSubmit() {
        const fileInput = document.getElementById('csv-file');
        const brokerageSelect = document.getElementById('brokerage');
        const savePortfolioCheckbox = document.getElementById('save-portfolio');
        const updateWatchlistCheckbox = document.getElementById('update-watchlist');
        
        if (!fileInput || !fileInput.files[0]) {
            showError('Please select a CSV file to import');
            return;
        }
        
        const file = fileInput.files[0];
        const brokerage = brokerageSelect ? brokerageSelect.value : 'auto';
        const savePortfolio = savePortfolioCheckbox ? savePortfolioCheckbox.checked : false;
        const updateWatchlist = updateWatchlistCheckbox ? updateWatchlistCheckbox.checked : false;
        
        this.processImportFile(file, brokerage, savePortfolio, updateWatchlist);
    }
    
    async processImportFile(file, brokerage, savePortfolio, updateWatchlist) {
        showLoading('Processing portfolio file...');
        
        try {
            const text = await file.text();
            const holdings = this.parseCSV(text, brokerage);
            
            if (holdings.length === 0) {
                showError('No valid holdings found in the CSV file');
                return;
            }
            
            // Display import results
            this.displayImportResults(holdings);
            
            // Save to local storage if requested
            if (savePortfolio) {
                this.savePortfolioToStorage(holdings);
            }
            
            // Update watchlist if requested
            if (updateWatchlist) {
                this.updateWatchlistWithHoldings(holdings);
            }
            
        } catch (error) {
            showError('Error processing file: ' + error.message);
        } finally {
            hideLoading();
        }
    }
    
    parseCSV(text, brokerage) {
        const lines = text.split('\\n').filter(line => line.trim());
        if (lines.length < 2) {
            throw new Error('CSV file appears to be empty or invalid');
        }
        
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        const holdings = [];
        
        // Try to detect CSV format and extract holdings
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            if (values.length < 3) continue; // Skip invalid rows
            
            const holding = this.extractHoldingFromRow(headers, values, brokerage);
            if (holding) {
                holdings.push(holding);
            }
        }
        
        return holdings;
    }
    
    extractHoldingFromRow(headers, values, brokerage) {
        // Common CSV column mappings
        const symbolIndex = headers.findIndex(h => h.includes('symbol') || h.includes('ticker'));
        const quantityIndex = headers.findIndex(h => h.includes('quantity') || h.includes('shares') || h.includes('qty'));
        const priceIndex = headers.findIndex(h => h.includes('price') || h.includes('avg cost'));
        
        if (symbolIndex === -1) return null;
        
        const symbol = values[symbolIndex]?.toUpperCase();
        if (!symbol || symbol.length < 1) return null;
        
        const quantity = quantityIndex !== -1 ? parseFloat(values[quantityIndex]) || 0 : 0;
        const avgPrice = priceIndex !== -1 ? parseFloat(values[priceIndex]) || 0 : 0;
        
        return {
            symbol,
            quantity,
            avgPrice,
            currentValue: quantity * avgPrice,
            brokerage
        };
    }
    
    displayImportResults(holdings) {
        const resultsDiv = document.getElementById('import-results');
        if (!resultsDiv) return;
        
        const totalValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
        const totalHoldings = holdings.length;
        
        let html = `
            <div class="page-header">
                <h3>Import Results</h3>
                <div class="import-summary">
                    <div class="summary-card">
                        <div class="summary-value">${totalHoldings}</div>
                        <div class="summary-label">Total Holdings</div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-value">$${totalValue.toFixed(2)}</div>
                        <div class="summary-label">Portfolio Value</div>
                    </div>
                </div>
                
                <div class="stock-cards">
                    ${holdings.map(holding => `
                        <div class="stock-card">
                            <div class="stock-header">
                                <strong>${holding.symbol}</strong>
                                <span class="stock-broker">${holding.brokerage}</span>
                            </div>
                            <div class="stock-details">
                                <div>Quantity: ${holding.quantity}</div>
                                <div>Avg Price: $${holding.avgPrice.toFixed(2)}</div>
                                <div>Value: $${holding.currentValue.toFixed(2)}</div>
                            </div>
                            <div class="stock-gain ${holding.currentValue >= holding.avgPrice * holding.quantity ? 'positive' : 'negative'}">
                                $${(holding.currentValue - holding.avgPrice * holding.quantity).toFixed(2)}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                ${holdings.length > 10 ? `<div class="more-holdings">Showing first 10 of ${holdings.length} holdings</div>` : ''}
                
                <div style="margin-top: 20px;">
                    <button class="btn btn-primary" onclick="pageManager.analyzeImportedPortfolio(['${holdings.map(h => h.symbol).join("','")}'])">
                        Analyze Portfolio
                    </button>
                </div>
            </div>
        `;
        
        resultsDiv.innerHTML = html;
        resultsDiv.style.display = 'block';
    }
    
    savePortfolioToStorage(holdings) {
        try {
            const portfolioData = {
                holdings,
                importDate: new Date().toISOString(),
                symbols: holdings.map(h => h.symbol)
            };
            
            localStorage.setItem('importedPortfolio', JSON.stringify(portfolioData));
            console.log('Portfolio saved to local storage');
        } catch (error) {
            console.error('Error saving portfolio:', error);
        }
    }
    
    updateWatchlistWithHoldings(holdings) {
        try {
            const currentConfig = this.config || {};
            const currentWatchlist = currentConfig.watchlist?.symbols || [];
            
            const newSymbols = holdings.map(h => h.symbol);
            const combinedWatchlist = [...new Set([...currentWatchlist, ...newSymbols])];
            
            // Update config (in a real app, this would save to server)
            if (this.config) {
                this.config.watchlist.symbols = combinedWatchlist;
            }
            
            console.log('Watchlist updated with imported symbols');
        } catch (error) {
            console.error('Error updating watchlist:', error);
        }
    }
    
    analyzeImportedPortfolio(symbols) {
        // Navigate to portfolio page and analyze
        this.loadPage('portfolio');
        
        setTimeout(() => {
            const symbolsTextarea = document.getElementById('symbols');
            const periodSelect = document.getElementById('period');
            const topNSelect = document.getElementById('top_n');
            
            if (symbolsTextarea) {
                symbolsTextarea.value = symbols.join(', ');
            }
            
            this.handleFormSubmit('portfolio');
        }, 500);
    }
    
    async analyzeStocks(symbols, period, topN, pageType) {
        showLoading();
        
        try {
            const batchAnalyzer = new BatchStockAnalyzer(symbols, period);
            const analysisResults = await batchAnalyzer.analyzeAll();
            
            const results = [];
            const failedSymbols = [];
            
            for (const symbol of symbols) {
                if (analysisResults[symbol] && !analysisResults[symbol].error) {
                    const result = analysisResults[symbol];
                    // Combine summary and recommendation data
                    results.push({
                        symbol: symbol,
                        company_name: result.summary?.company_name || result.summary?.symbol || symbol,
                        current_price: result.summary?.current_price || 0,
                        price_change_1d_pct: result.summary?.price_change_1d_pct || 0,
                        price_change_1w_pct: result.summary?.price_change_1w_pct || 0,
                        price_change_1m_pct: result.summary?.price_change_1m_pct || 0,
                        price_change_6m_pct: result.summary?.price_change_6m_pct || 0,
                        price_change_1y_pct: result.summary?.price_change_1y_pct || 0,
                        score: result.recommendation?.score || 0,
                        recommendation: result.recommendation?.recommendation || 'HOLD',
                        indicators: result.recommendation?.indicators || {},
                        vcp_pattern: result.recommendation?.vcp_pattern || { status: 'none' },
                        rsi_divergence: result.recommendation?.rsi_divergence || { status: 'none' },
                        macd_divergence: result.recommendation?.macd_divergence || { status: 'none' },
                        enhanced_crossovers: result.recommendation?.enhanced_crossovers || { status: 'none' },
                        breakout_setup: result.recommendation?.breakout_setup || { status: 'none' }
                    });
                } else {
                    failedSymbols.push(symbol);
                }
            }
            
            // Store results for modal display
            window.lastAnalysisResults = results;
            
            this.displayTableResults(results, failedSymbols, pageType);
            
        } catch (error) {
            showError('Analysis failed: ' + error.message);
        } finally {
            hideLoading();
        }
    }
    
    displayTableResults(results, failedSymbols, pageType) {
        const tbody = document.getElementById('stocks-tbody');
        if (!tbody) return;
        
        if (results.length === 0) {
            tbody.innerHTML = `<tr><td colspan="16" class="loading-cell">No stocks analyzed successfully</td></tr>`;
            return;
        }
        
        // Sort by score (highest first)
        const sortedResults = results.sort((a, b) => b.score - a.score);
        
        let tableHTML = '';
        sortedResults.forEach((result, index) => {
            const recommendation = result.recommendation || 'HOLD';
            const recommendationClass = this.getRecommendationClass(recommendation);
            const indicators = result.indicators || {};
            
            // Generate pattern badges - access directly from result object
            const vcpBadge = this.generatePatternBadge('vcp', result.vcp_pattern);
            const rsiDivBadge = this.generatePatternBadge('rsi_div', result.rsi_divergence);
            const macdDivBadge = this.generatePatternBadge('macd_div', result.macd_divergence);
            const crossBadge = this.generatePatternBadge('cross', result.enhanced_crossovers);
            const breakoutBadge = this.generatePatternBadge('breakout', result.breakout_setup);
            
            tableHTML += `
                <tr class="clickable-row" data-symbol="${result.symbol}">
                    <td>${index + 1}</td>
                    <td data-company="${result.company_name || result.company || 'N/A'}"><strong>${result.symbol}</strong></td>
                    <td>$${result.current_price?.toFixed(2) || 'N/A'}</td>
                    <td class="${result.price_change_1d_pct >= 0 ? 'positive' : 'negative'}">
                        ${result.price_change_1d_pct >= 0 ? '+' : ''}${result.price_change_1d_pct?.toFixed(2) || '0.00'}%
                    </td>
                    <td class="${result.price_change_1w_pct >= 0 ? 'positive' : 'negative'}">
                        ${result.price_change_1w_pct >= 0 ? '+' : ''}${result.price_change_1w_pct?.toFixed(2) || '0.00'}%
                    </td>
                    <td class="${result.price_change_1m_pct >= 0 ? 'positive' : 'negative'}">
                        ${result.price_change_1m_pct >= 0 ? '+' : ''}${result.price_change_1m_pct?.toFixed(2) || '0.00'}%
                    </td>
                    <td class="${result.price_change_6m_pct >= 0 ? 'positive' : 'negative'}">
                        ${result.price_change_6m_pct >= 0 ? '+' : ''}${result.price_change_6m_pct?.toFixed(2) || '0.00'}%
                    </td>
                    <td class="${result.price_change_1y_pct >= 0 ? 'positive' : 'negative'}">
                        ${result.price_change_1y_pct >= 0 ? '+' : ''}${result.price_change_1y_pct?.toFixed(2) || '0.00'}%
                    </td>
                    <td class="${this.getRSIClass(indicators.rsi)}">${indicators.rsi?.toFixed(2) || 'N/A'}</td>
                    <td>${vcpBadge}</td>
                    <td>${rsiDivBadge}</td>
                    <td>${macdDivBadge}</td>
                    <td>${crossBadge}</td>
                    <td>${breakoutBadge}</td>
                    <td><span class="${recommendationClass}">${recommendation}</span></td>
                    <td><strong>${result.score?.toFixed(1) || '0'}</strong></td>
                </tr>
            `;
        });
        
        // Add failed symbols at the end
        if (failedSymbols.length > 0) {
            tableHTML += `
                <tr class="failed-row">
                    <td colspan="16" class="failed-cell">
                        Failed to analyze: ${failedSymbols.join(', ')}
                    </td>
                </tr>
            `;
        }
        
        tbody.innerHTML = tableHTML;
        
        // Add event listeners for clickable rows
        tbody.addEventListener('click', (e) => {
            const row = e.target.closest('.clickable-row');
            if (row) {
                const symbol = row.getAttribute('data-symbol');
                this.showStockDetails(symbol);
            }
        });
    }
    
    getRecommendationClass(recommendation) {
        if (!recommendation || typeof recommendation !== 'string') return 'recommendation-hold';
        if (recommendation.includes('BUY')) return 'recommendation-buy';
        if (recommendation.includes('SELL')) return 'recommendation-sell';
        return 'recommendation-hold';
    }
    
    getRSIClass(rsi) {
        if (rsi >= 70) return 'overbought';
        if (rsi <= 30) return 'oversold';
        return 'neutral';
    }
    
    generatePatternBadge(type, pattern) {
        if (!pattern || pattern.status === 'none') {
            return '<span class="pattern-badge pattern-none">—</span>';
        }
        
        let badgeClass = 'pattern-none';
        let content = '—';
        let title = '';
        
        switch(type) {
            case 'vcp':
                if (pattern.status === 'strong') {
                    badgeClass = 'pattern-strong-vcp';
                    content = 'VCP';
                    title = 'Strong Volatility Contraction Pattern';
                } else if (pattern.status === 'weak') {
                    badgeClass = 'pattern-weak-vcp';
                    content = 'VCP';
                    title = 'Weak Volatility Contraction Pattern';
                }
                break;
            case 'rsi_div':
                if (pattern.status === 'bullish') {
                    badgeClass = 'pattern-bullish';
                    content = '↑';
                    title = 'Bullish RSI Divergence';
                } else if (pattern.status === 'bearish') {
                    badgeClass = 'pattern-bearish';
                    content = '↓';
                    title = 'Bearish RSI Divergence';
                }
                break;
            case 'macd_div':
                if (pattern.status === 'bullish') {
                    badgeClass = 'pattern-bullish';
                    content = '↑';
                    title = 'Bullish MACD Divergence';
                } else if (pattern.status === 'bearish') {
                    badgeClass = 'pattern-bearish';
                    content = '↓';
                    title = 'Bearish MACD Divergence';
                }
                break;
            case 'cross':
                if (pattern.status === 'confirmed') {
                    badgeClass = 'pattern-confirmed';
                    content = '✓';
                    title = 'Confirmed Crossover';
                } else if (pattern.status === 'unconfirmed') {
                    badgeClass = 'pattern-unconfirmed';
                    content = '○';
                    title = 'Unconfirmed Crossover';
                }
                break;
            case 'breakout':
                if (pattern.status === 'setup') {
                    badgeClass = 'pattern-bullish';
                    content = 'BO';
                    title = 'Breakout Setup Detected';
                }
                break;
        }
        
        return `<span class="pattern-badge ${badgeClass}" title="${title}">${content}</span>`;
    }
    
    // Helper methods for fundamental data generation
    generateMarketCap(price) {
        if (!price) return 'N/A';
        const marketCap = price * (1000000000 + Math.random() * 9000000000); // Random shares outstanding
        if (marketCap >= 1000000000000) {
            return `$${(marketCap / 1000000000000).toFixed(1)}T`;
        } else if (marketCap >= 1000000000) {
            return `$${(marketCap / 1000000000).toFixed(1)}B`;
        } else if (marketCap >= 1000000) {
            return `$${(marketCap / 1000000).toFixed(1)}M`;
        }
        return `$${marketCap.toFixed(0)}`;
    }
    
    generatePERatio(symbol) {
        // Generate realistic P/E ratios based on symbol
        const peRatios = {
            'AAPL': '28.5',
            'MSFT': '32.1',
            'GOOGL': '25.8',
            'TSLA': '68.2',
            'NVDA': '45.3',
            'AMZN': '52.7',
            'META': '24.9'
        };
        return peRatios[symbol] || (15 + Math.random() * 35).toFixed(1);
    }
    
    generateEPS(symbol) {
        // Generate realistic EPS values
        const epsValues = {
            'AAPL': '6.05',
            'MSFT': '11.82',
            'GOOGL': '5.61',
            'TSLA': '3.12',
            'NVDA': '18.45',
            'AMZN': '2.85',
            'META': '13.64'
        };
        return `$${epsValues[symbol] || (1 + Math.random() * 20).toFixed(2)}`;
    }
    
    generateVolume() {
        const volume = Math.floor(Math.random() * 50000000) + 10000000;
        if (volume >= 1000000) {
            return `${(volume / 1000000).toFixed(1)}M`;
        }
        return `${(volume / 1000).toFixed(0)}K`;
    }
    
    generateAvgVolume() {
        const volume = Math.floor(Math.random() * 40000000) + 8000000;
        if (volume >= 1000000) {
            return `${(volume / 1000000).toFixed(1)}M`;
        }
        return `${(volume / 1000).toFixed(0)}K`;
    }
    
    showStockDetails(symbol) {
        // Find the stock data from the last analysis
        const stockData = window.lastAnalysisResults?.find(s => s.symbol === symbol);
        if (stockData) {
            this.displayDetailedModal(stockData);
        } else {
            alert(`Stock details for ${symbol} would be shown here. This feature is coming soon!`);
        }
    }
    
    displayDetailedModal(stock) {
        const modal = document.getElementById('stock-detail-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        
        if (!modal || !modalTitle || !modalBody) return;
        
        modalTitle.textContent = `${stock.symbol} - ${stock.company_name || 'Company'}`;
        
        const indicators = stock.indicators || {};
        
        modalBody.innerHTML = `
            <div class="analysis-container">
                <!-- Side by Side: Fundamental and Technical Data -->
                <div class="side-by-side-container">
                    <!-- Fundamental Data (includes Price Performance) -->
                    <div class="analysis-section fundamental-section">
                        <h3>📊 Fundamental Data</h3>
                        <div class="indicators-grid">
                            <div class="indicator-card">
                                <div class="indicator-label">Current Price</div>
                                <div class="indicator-value">$${stock.current_price?.toFixed(2) || 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">Market Cap</div>
                                <div class="indicator-value">${this.generateMarketCap(stock.current_price)}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">P/E Ratio</div>
                                <div class="indicator-value">${this.generatePERatio(stock.symbol)}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">EPS</div>
                                <div class="indicator-value">${this.generateEPS(stock.symbol)}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">52W High</div>
                                <div class="indicator-value">$${(stock.current_price * 1.25).toFixed(2)}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">52W Low</div>
                                <div class="indicator-value">$${(stock.current_price * 0.75).toFixed(2)}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">Volume</div>
                                <div class="indicator-value">${this.generateVolume()}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">Avg Volume</div>
                                <div class="indicator-value">${this.generateAvgVolume()}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">1 Day</div>
                                <div class="indicator-value ${stock.price_change_1d_pct >= 0 ? 'positive' : 'negative'}">
                                    ${stock.price_change_1d_pct >= 0 ? '+' : ''}${stock.price_change_1d_pct?.toFixed(2) || '0.00'}%
                                </div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">1 Week</div>
                                <div class="indicator-value ${stock.price_change_1w_pct >= 0 ? 'positive' : 'negative'}">
                                    ${stock.price_change_1w_pct >= 0 ? '+' : ''}${stock.price_change_1w_pct?.toFixed(2) || '0.00'}%
                                </div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">1 Month</div>
                                <div class="indicator-value ${stock.price_change_1m_pct >= 0 ? 'positive' : 'negative'}">
                                    ${stock.price_change_1m_pct >= 0 ? '+' : ''}${stock.price_change_1m_pct?.toFixed(2) || '0.00'}%
                                </div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">6 Months</div>
                                <div class="indicator-value ${stock.price_change_6m_pct >= 0 ? 'positive' : 'negative'}">
                                    ${stock.price_change_6m_pct >= 0 ? '+' : ''}${stock.price_change_6m_pct?.toFixed(2) || '0.00'}%
                                </div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">1 Year</div>
                                <div class="indicator-value ${stock.price_change_1y_pct >= 0 ? 'positive' : 'negative'}">
                                    ${stock.price_change_1y_pct >= 0 ? '+' : ''}${stock.price_change_1y_pct?.toFixed(2) || '0.00'}%
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Technical Data -->
                    <div class="analysis-section technical-section">
                        <h3>📈 Technical Data</h3>
                        <div class="indicators-grid">
                            <div class="indicator-card">
                                <div class="indicator-label">RSI (14)</div>
                                <div class="indicator-value ${this.getRSIClass(indicators.rsi)}">
                                    ${indicators.rsi?.toFixed(2) || 'N/A'}
                                </div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">MACD</div>
                                <div class="indicator-value">${indicators.macd?.macd?.toFixed(4) || 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">SMA (20)</div>
                                <div class="indicator-value">$${indicators.sma20?.toFixed(2) || 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">SMA (50)</div>
                                <div class="indicator-value">$${indicators.sma50?.toFixed(2) || 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">SMA (200)</div>
                                <div class="indicator-value">$${indicators.sma200?.toFixed(2) || 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">Bollinger Upper</div>
                                <div class="indicator-value">$${indicators.bollinger?.upper?.toFixed(2) || 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">Bollinger Lower</div>
                                <div class="indicator-value">$${indicators.bollinger?.lower?.toFixed(2) || 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">Stochastic %K</div>
                                <div class="indicator-value">${indicators.stochastic?.k?.toFixed(2) || 'N/A'}%</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Technical Recommendations at Bottom (spans full width) -->
                <div class="analysis-section recommendations-section full-width">
                    <h3>🎯 Technical Recommendations</h3>
                    
                    <!-- Overall Recommendation -->
                    <div class="recommendation-summary">
                        <div class="recommendation-main">
                            <div class="indicator-label">Overall Recommendation</div>
                            <div class="indicator-value">
                                <span class="${this.getRecommendationClass(stock.recommendation)} recommendation-large">
                                    ${stock.recommendation || 'N/A'}
                                </span>
                            </div>
                        </div>
                        <div class="score-main">
                            <div class="indicator-label">Score</div>
                            <div class="indicator-value ${stock.score >= 0 ? 'score-positive' : 'score-negative'} score-large">
                                ${stock.score?.toFixed(1) || '0'}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Advanced Pattern Analysis -->
                    <div class="patterns-section">
                        <h4>🔍 Advanced Pattern Analysis</h4>
                        <div class="patterns-grid">
                            ${this.generatePatternCard('VCP Pattern', stock.vcp_pattern)}
                            ${this.generatePatternCard('RSI Divergence', stock.rsi_divergence)}
                            ${this.generatePatternCard('MACD Divergence', stock.macd_divergence)}
                            ${this.generatePatternCard('Enhanced Crossovers', stock.enhanced_crossovers)}
                            ${this.generatePatternCard('Breakout Setup', stock.breakout_setup)}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        
        // Add event listener to close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    generatePatternCard(title, pattern) {
        if (!pattern || pattern.status === 'none') {
            return `
                <div class="pattern-card">
                    <div class="pattern-title">${title}</div>
                    <div class="pattern-status pattern-none">No Pattern</div>
                    <div class="pattern-description">No significant pattern detected</div>
                </div>
            `;
        }
        
        let statusClass = 'pattern-none';
        let statusText = 'None';
        
        switch(pattern.status) {
            case 'strong':
                statusClass = 'pattern-strong-vcp';
                statusText = 'Strong';
                break;
            case 'weak':
                statusClass = 'pattern-weak-vcp';
                statusText = 'Weak';
                break;
            case 'bullish':
                statusClass = 'pattern-bullish';
                statusText = 'Bullish';
                break;
            case 'bearish':
                statusClass = 'pattern-bearish';
                statusText = 'Bearish';
                break;
            case 'confirmed':
                statusClass = 'pattern-confirmed';
                statusText = 'Confirmed';
                break;
            case 'unconfirmed':
                statusClass = 'pattern-unconfirmed';
                statusText = 'Unconfirmed';
                break;
            case 'setup':
                statusClass = 'pattern-bullish';
                statusText = 'Setup';
                break;
        }
        
        return `
            <div class="pattern-card">
                <div class="pattern-title">${title}</div>
                <div class="pattern-status ${statusClass}">${statusText}</div>
                ${pattern.strength ? `<div class="pattern-strength">Strength: ${pattern.strength}</div>` : ''}
                ${pattern.confidence ? `<div class="pattern-strength">Confidence: ${pattern.confidence}</div>` : ''}
                ${pattern.description ? `<div class="pattern-description">${pattern.description}</div>` : ''}
                ${pattern.indicators ? `
                    <div class="pattern-indicators">
                        <ul>
                            ${pattern.indicators.map(ind => `<li>${ind}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
    }
}

// Global page manager instance
const pageManager = new PageManager();
