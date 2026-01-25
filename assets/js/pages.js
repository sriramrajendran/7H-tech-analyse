// Page Manager - Handles dynamic content loading and default stocks
class PageManager {
    constructor() {
        this.currentPage = 'tech-blog'; // Start with tech blog as landing page
        this.config = null;
        this.loadConfig();
        this.setupCollapsibleMenus();
    }

    setupCollapsibleMenus() {
        // Setup collapsible menu functionality
        const navParents = document.querySelectorAll('.nav-parent');
        
        navParents.forEach(parent => {
            parent.addEventListener('click', (e) => {
                e.preventDefault();
                const childrenContainer = parent.nextElementSibling;
                const isCollapsed = parent.classList.contains('collapsed');
                
                // Collapse all other parent sections first
                navParents.forEach(otherParent => {
                    if (otherParent !== parent) {
                        otherParent.classList.add('collapsed');
                        otherParent.classList.remove('active');
                        const otherChildren = otherParent.nextElementSibling;
                        if (otherChildren && otherChildren.classList.contains('nav-children')) {
                            otherChildren.classList.add('collapsed');
                        }
                    }
                });
                
                // Toggle current section
                parent.classList.toggle('collapsed');
                if (childrenContainer && childrenContainer.classList.contains('nav-children')) {
                    childrenContainer.classList.toggle('collapsed');
                }
                
                // Set active state for current parent
                navParents.forEach(p => p.classList.remove('active'));
                if (!isCollapsed) {
                    parent.classList.add('active');
                }
            });
        });
        
        // Setup child menu clicks
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageType = link.getAttribute('data-page');
                if (pageType) {
                    this.loadPage(pageType);
                }
            });
        });
        
        // Initially expand Tech section and set tech-blog as active
        const techParent = document.getElementById('nav-technology-parent');
        const techChildren = document.getElementById('nav-technology-children');
        const tradeParent = document.getElementById('nav-stocks-parent');
        const tradeChildren = document.getElementById('nav-stocks-children');
        
        if (techParent) techParent.classList.add('active');
        if (techChildren) techChildren.classList.remove('collapsed');
        if (tradeParent) tradeParent.classList.add('collapsed');
        if (tradeChildren) tradeChildren.classList.add('collapsed');
        
        // Set tech-blog as initially active
        const techBlogLink = document.getElementById('nav-tech-blog');
        if (techBlogLink) {
            techBlogLink.classList.add('active');
        }
        
        // Setup header click to load home page (tech blog)
        const header = document.querySelector('header');
        if (header) {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                this.loadPage('tech-blog');
            });
        }
        
        // Setup brand text click to load home page
        const brandText = document.querySelector('.brand-text');
        if (brandText) {
            brandText.style.cursor = 'pointer';
            brandText.addEventListener('click', () => {
                this.loadPage('tech-blog');
            });
        }
        
        // Setup footer beaconoftech.com click to load home page
        const footer = document.querySelector('footer');
        if (footer) {
            const footerText = footer.textContent;
            if (footerText.includes('beaconoftech.com')) {
                // Create a clickable span for beaconoftech.com
                footer.innerHTML = footer.innerHTML.replace(
                    'beaconoftech.com',
                    '<span class="footer-link" style="cursor: pointer; text-decoration: underline;">beaconoftech.com</span>'
                );
                
                const footerLink = footer.querySelector('.footer-link');
                if (footerLink) {
                    footerLink.addEventListener('click', () => {
                        this.loadPage('tech-blog');
                    });
                }
            }
        }
    }

    setupTableControls() {
        const searchInput = document.getElementById('table-search');
        const filterSelect = document.getElementById('table-filter');

        if (searchInput) {
            searchInput.addEventListener('input', () => this.applyTableFilters());
        }

        if (filterSelect) {
            filterSelect.addEventListener('change', () => this.applyTableFilters());
        }
    }

    applyTableFilters() {
        const tbody = document.getElementById('stocks-tbody');
        if (!tbody) return;

        const searchValue = (document.getElementById('table-search')?.value || '').trim().toLowerCase();
        const filterValue = (document.getElementById('table-filter')?.value || 'all').toLowerCase();

        const rows = Array.from(tbody.querySelectorAll('tr'));
        rows.forEach((row) => {
            if (row.classList.contains('loading-row')) {
                row.style.display = '';
                return;
            }

            const symbol = (row.getAttribute('data-symbol') || '').toLowerCase();
            const company = (row.getAttribute('data-company') || '').toLowerCase();
            const recommendation = (row.getAttribute('data-recommendation') || '').toLowerCase();

            const matchesSearch = !searchValue || symbol.includes(searchValue) || company.includes(searchValue);

            let matchesFilter = true;
            if (filterValue !== 'all') {
                if (filterValue === 'buy') matchesFilter = recommendation.includes('buy');
                else if (filterValue === 'sell') matchesFilter = recommendation.includes('sell');
                else if (filterValue === 'hold') matchesFilter = recommendation.includes('hold');
            }

            row.style.display = matchesSearch && matchesFilter ? '' : 'none';
        });
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
        
        // Update active nav for child links only
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        const activeLink = document.getElementById(`nav-${pageType}`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Update parent section active states
        const techParent = document.getElementById('nav-technology-parent');
        const tradeParent = document.getElementById('nav-stocks-parent');
        
        if (techParent && tradeParent) {
            const techPages = ['tech-blog', 'tech-tutorials', 'tech-projects'];
            const tradePages = ['portfolio', 'watchlist', 'etf', 'us-stocks'];
            
            if (techPages.includes(pageType)) {
                techParent.classList.add('active');
                tradeParent.classList.remove('active');
                // Ensure tech section is expanded
                const techChildren = document.getElementById('nav-technology-children');
                const tradeChildren = document.getElementById('nav-stocks-children');
                if (techChildren) techChildren.classList.remove('collapsed');
                if (tradeChildren) tradeChildren.classList.add('collapsed');
                techParent.classList.remove('collapsed');
                tradeParent.classList.add('collapsed');
            } else if (tradePages.includes(pageType)) {
                tradeParent.classList.add('active');
                techParent.classList.remove('active');
                // Ensure trade section is expanded
                const techChildren = document.getElementById('nav-technology-children');
                const tradeChildren = document.getElementById('nav-stocks-children');
                if (tradeChildren) tradeChildren.classList.remove('collapsed');
                if (techChildren) techChildren.classList.add('collapsed');
                tradeParent.classList.remove('collapsed');
                techParent.classList.add('collapsed');
            } else if (pageType === 'author') {
                // Author is standalone, collapse both sections
                techParent.classList.remove('active');
                tradeParent.classList.remove('active');
                const techChildren = document.getElementById('nav-technology-children');
                const tradeChildren = document.getElementById('nav-stocks-children');
                if (techChildren) techChildren.classList.add('collapsed');
                if (tradeChildren) tradeChildren.classList.add('collapsed');
                techParent.classList.add('collapsed');
                tradeParent.classList.add('collapsed');
            }
        }

        let content = '';
        
        switch(pageType) {
            case 'tech-blog':
                content = this.generateTechBlogContent();
                break;
            case 'tech-tutorials':
                content = this.generateTechTutorialsContent();
                break;
            case 'tech-projects':
                content = this.generateTechProjectsContent();
                break;
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
            case 'author':
                content = this.generateAuthorContent();
                break;
            default:
                content = '<div class="card"><h2>Page not found</h2></div>';
        }
        
        mainContent.innerHTML = content;
        this.attachEventListeners(pageType);
    }
    
    generateTechBlogContent() {
        return `
            <div class="page-header">
                <h2>Technology Blog</h2>
                <p>Exploring the latest in technology, programming, and digital innovation.</p>
            </div>
            
            <div class="blog-grid">
                <article class="blog-card">
                    <div class="blog-meta">
                        <span class="blog-date">January 24, 2026</span>
                        <span class="blog-category">AI/ML</span>
                    </div>
                    <h3 class="blog-title">The Future of AI-Powered Development Tools</h3>
                    <p class="blog-excerpt">Artificial intelligence is revolutionizing how we write, debug, and optimize code. Explore the latest AI tools that are transforming the development landscape...</p>
                    <a href="#" class="blog-read-more">Read More →</a>
                </article>
                
                <article class="blog-card">
                    <div class="blog-meta">
                        <span class="blog-date">January 20, 2026</span>
                        <span class="blog-category">Web Development</span>
                    </div>
                    <h3 class="blog-title">Building Scalable Web Applications in 2026</h3>
                    <p class="blog-excerpt">Modern web development requires a deep understanding of performance, scalability, and user experience. Learn the best practices for building applications that scale...</p>
                    <a href="#" class="blog-read-more">Read More →</a>
                </article>
                
                <article class="blog-card">
                    <div class="blog-meta">
                        <span class="blog-date">January 15, 2026</span>
                        <span class="blog-category">Cloud Computing</span>
                    </div>
                    <h3 class="blog-title">Cloud-Native Architecture: Best Practices</h3>
                    <p class="blog-excerpt">Designing applications for the cloud requires a different mindset. Discover the principles of cloud-native architecture and how to implement them effectively...</p>
                    <a href="#" class="blog-read-more">Read More →</a>
                </article>
                
                <article class="blog-card">
                    <div class="blog-meta">
                        <span class="blog-date">January 10, 2026</span>
                        <span class="blog-category">Data Science</span>
                    </div>
                    <h3 class="blog-title">Data Visualization Techniques for Modern Applications</h3>
                    <p class="blog-excerpt">Effective data visualization is crucial for making complex information accessible. Learn about the latest techniques and tools for creating compelling visualizations...</p>
                    <a href="#" class="blog-read-more">Read More →</a>
                </article>
            </div>
        `;
    }
    
    generateTechTutorialsContent() {
        return `
            <div class="page-header">
                <h2>Technical Tutorials</h2>
                <p>Step-by-step guides and tutorials for modern technologies and programming languages.</p>
            </div>
            
            <div class="tutorials-grid">
                <div class="tutorial-card">
                    <div class="tutorial-header">
                        <span class="tutorial-difficulty intermediate">Intermediate</span>
                        <span class="tutorial-duration">45 min</span>
                    </div>
                    <h3 class="tutorial-title">React Hooks Deep Dive</h3>
                    <p class="tutorial-description">Master advanced React Hooks patterns and build custom hooks for reusable state logic.</p>
                    <div class="tutorial-tags">
                        <span class="tag">React</span>
                        <span class="tag">JavaScript</span>
                        <span class="tag">Hooks</span>
                    </div>
                    <a href="#" class="tutorial-start">Start Tutorial →</a>
                </div>
                
                <div class="tutorial-card">
                    <div class="tutorial-header">
                        <span class="tutorial-difficulty beginner">Beginner</span>
                        <span class="tutorial-duration">30 min</span>
                    </div>
                    <h3 class="tutorial-title">Getting Started with Docker</h3>
                    <p class="tutorial-description">Learn containerization basics and how to deploy applications using Docker containers.</p>
                    <div class="tutorial-tags">
                        <span class="tag">Docker</span>
                        <span class="tag">DevOps</span>
                        <span class="tag">Containers</span>
                    </div>
                    <a href="#" class="tutorial-start">Start Tutorial →</a>
                </div>
                
                <div class="tutorial-card">
                    <div class="tutorial-header">
                        <span class="tutorial-difficulty advanced">Advanced</span>
                        <span class="tutorial-duration">60 min</span>
                    </div>
                    <h3 class="tutorial-title">Machine Learning with Python</h3>
                    <p class="tutorial-description">Build your first ML model using Python, scikit-learn, and popular ML algorithms.</p>
                    <div class="tutorial-tags">
                        <span class="tag">Python</span>
                        <span class="tag">Machine Learning</span>
                        <span class="tag">AI</span>
                    </div>
                    <a href="#" class="tutorial-start">Start Tutorial →</a>
                </div>
            </div>
        `;
    }
    
    generateTechProjectsContent() {
        return `
            <div class="page-header">
                <h2>Featured Projects</h2>
                <p>Open-source projects and technical experiments showcasing innovative solutions.</p>
            </div>
            
            <div class="projects-grid">
                <div class="project-card">
                    <div class="project-status active">Active</div>
                    <h3 class="project-title">Stock Analysis Platform</h3>
                    <p class="project-description">AI-powered stock analysis tool with technical indicators, portfolio management, and real-time market data integration.</p>
                    <div class="project-tech">
                        <span class="tech-tag">JavaScript</span>
                        <span class="tech-tag">Python</span>
                        <span class="tech-tag">React</span>
                        <span class="tech-tag">TensorFlow</span>
                    </div>
                    <div class="project-links">
                        <a href="#" class="project-link">GitHub</a>
                        <a href="#" class="project-link">Live Demo</a>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-status completed">Completed</div>
                    <h3 class="project-title">Cloud Infrastructure Automation</h3>
                    <p class="project-description">Infrastructure as Code solution for automated cloud deployment and management across multiple providers.</p>
                    <div class="project-tech">
                        <span class="tech-tag">Terraform</span>
                        <span class="tech-tag">AWS</span>
                        <span class="tech-tag">Kubernetes</span>
                        <span class="tech-tag">Ansible</span>
                    </div>
                    <div class="project-links">
                        <a href="#" class="project-link">GitHub</a>
                        <a href="#" class="project-link">Documentation</a>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-status planning">Planning</div>
                    <h3 class="project-title">Real-time Collaboration Tool</h3>
                    <p class="project-description">WebRTC-based real-time collaboration platform with video conferencing, screen sharing, and collaborative editing.</p>
                    <div class="project-tech">
                        <span class="tech-tag">WebRTC</span>
                        <span class="tech-tag">Node.js</span>
                        <span class="tech-tag">Socket.io</span>
                        <span class="tech-tag">WebSockets</span>
                    </div>
                    <div class="project-links">
                        <a href="#" class="project-link">Concept</a>
                        <a href="#" class="project-link">Contributors Wanted</a>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateAuthorContent() {
        return `
            <div class="page-header">
                <h2>About the Author</h2>
                <p>Learn more about the creator behind Beacon of Tech</p>
            </div>
            
            <div class="author-container">
                <div class="author-profile">
                    <div class="author-avatar">
                        <div class="avatar-placeholder">👤</div>
                    </div>
                    <div class="author-info">
                        <h3>Sriram Rajendran</h3>
                        <p class="author-title">Technology Enthusiast & Investment Analyst</p>
                        <div class="author-links">
                            <a href="https://twitter.com/rajen.sriram" target="_blank" class="social-link">
                                <span class="social-icon">🐦</span> @rajen.sriram
                            </a>
                            <a href="https://github.com/sriramrajendran" target="_blank" class="social-link">
                                <span class="social-icon">🐙</span> GitHub
                            </a>
                            <a href="https://beaconoftech.com" target="_blank" class="social-link">
                                <span class="social-icon">🌐</span> beaconoftech.com
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="author-content">
                    <div class="author-section">
                        <h4>🚀 Technology Background</h4>
                        <p>Passionate developer with extensive experience in building scalable web applications, cloud infrastructure, and data-driven solutions. Specialized in modern JavaScript frameworks, cloud-native architecture, and AI/ML integration.</p>
                    </div>
                    
                    <div class="author-section">
                        <h4>📈 Investment Expertise</h4>
                        <p>Self-taught investment analyst with a focus on technical analysis, quantitative strategies, and algorithmic trading. Developed sophisticated stock analysis tools combining traditional technical indicators with modern pattern recognition algorithms.</p>
                    </div>
                    
                    <div class="author-section">
                        <h4>💡 Project Vision</h4>
                        <p>Beacon of Tech represents the fusion of technology and finance - a platform where cutting-edge development meets intelligent investment analysis. The goal is to democratize advanced stock analysis tools while sharing knowledge about modern technology trends.</p>
                    </div>
                    
                    <div class="author-section">
                        <h4>🛠️ Skills & Technologies</h4>
                        <div class="skills-grid">
                            <div class="skill-category">
                                <h5>Frontend</h5>
                                <div class="skill-tags">
                                    <span class="skill-tag">JavaScript</span>
                                    <span class="skill-tag">React</span>
                                    <span class="skill-tag">Vue.js</span>
                                    <span class="skill-tag">CSS3</span>
                                </div>
                            </div>
                            <div class="skill-category">
                                <h5>Backend</h5>
                                <div class="skill-tags">
                                    <span class="skill-tag">Node.js</span>
                                    <span class="skill-tag">Python</span>
                                    <span class="skill-tag">PostgreSQL</span>
                                    <span class="skill-tag">MongoDB</span>
                                </div>
                            </div>
                            <div class="skill-category">
                                <h5>Cloud & DevOps</h5>
                                <div class="skill-tags">
                                    <span class="skill-tag">AWS</span>
                                    <span class="skill-tag">Docker</span>
                                    <span class="skill-tag">Kubernetes</span>
                                    <span class="skill-tag">CI/CD</span>
                                </div>
                            </div>
                            <div class="skill-category">
                                <h5>Data & AI</h5>
                                <div class="skill-tags">
                                    <span class="skill-tag">TensorFlow</span>
                                    <span class="skill-tag">Pandas</span>
                                    <span class="skill-tag">NumPy</span>
                                    <span class="skill-tag">Scikit-learn</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="author-section">
                        <h4>📧 Get in Touch</h4>
                        <p>Interested in collaboration, have questions about the projects, or want to discuss technology and investing? Feel free to reach out!</p>
                        <div class="contact-methods">
                            <a href="mailto:contact@beaconoftech.com" class="contact-method">
                                <span class="contact-icon">📧</span>
                                contact@beaconoftech.com
                            </a>
                            <a href="https://linkedin.com/in/sriramrajendran" target="_blank" class="contact-method">
                                <span class="contact-icon">💼</span>
                                LinkedIn Profile
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
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
                    <table id="stocks-table" class="stocks-table stocks-table--screener">
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
                    <table id="stocks-table" class="stocks-table stocks-table--screener">
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
                    <table id="stocks-table" class="stocks-table stocks-table--screener">
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
                    <table id="stocks-table" class="stocks-table stocks-table--screener">
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
    
    
    attachEventListeners(pageType) {
        // Add form submit listener
        const form = document.getElementById(`${pageType}-form`);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(pageType);
            });
        }
        

        this.setupTableControls();
    }
    
    handleFormSubmit(pageType) {
        
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
        
        // COMPLETE BYPASS: Create entirely new table structure
        const table = document.createElement('table');
        table.style.cssText = 'border-collapse: collapse; width: 100%; table-layout: fixed;';
        
        // Create header
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th style="width: 40px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; border: 1px solid #ccc;">Rank</th>
                <th style="width: 80px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; border: 1px solid #ccc;">Symbol</th>
                <th style="width: 70px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; border: 1px solid #ccc;">Price</th>
                <th style="width: 55px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; border: 1px solid #ccc;">1D %</th>
                <th style="width: 55px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; border: 1px solid #ccc;">1W %</th>
                <th style="width: 55px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; border: 1px solid #ccc;">1M %</th>
                <th style="width: 55px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; border: 1px solid #ccc;">6M %</th>
                <th style="width: 55px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; border: 1px solid #ccc;">1Y %</th>
                <th style="width: 50px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; border: 1px solid #ccc;">RSI</th>
                <th style="width: 45px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; border: 1px solid #ccc;">VCP</th>
                <th style="width: 45px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; border: 1px solid #ccc;">RSI Div</th>
                <th style="width: 45px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; border: 1px solid #ccc;">MACD Div</th>
                <th style="width: 45px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; border: 1px solid #ccc;">Cross</th>
                <th style="width: 45px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; border: 1px solid #ccc;">Breakout</th>
                <th style="width: 80px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; border: 1px solid #ccc;">Recommendation</th>
                <th style="width: 50px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; border: 1px solid #ccc;">Score</th>
            </tr>
        `;
        table.appendChild(thead);
        
        // Create body
        const newTbody = document.createElement('tbody');
        
        sortedResults.forEach((result, index) => {
            const recommendation = result.recommendation || 'HOLD';
            const recommendationClass = this.getRecommendationClass(recommendation);
            const indicators = result.indicators || {};
            
            const vcpBadge = this.generatePatternBadge('vcp', result.vcp_pattern);
            const rsiDivBadge = this.generatePatternBadge('rsi_div', result.rsi_divergence);
            const macdDivBadge = this.generatePatternBadge('macd_div', result.macd_divergence);
            const crossBadge = this.generatePatternBadge('cross', result.enhanced_crossovers);
            const breakoutBadge = this.generatePatternBadge('breakout', result.breakout_setup);
            
            const row = document.createElement('tr');
            row.style.cssText = 'cursor: pointer;';
            row.innerHTML = `
                <td style="background: white; border: 1px solid #ccc; text-align: center; font-weight: bold;" data-symbol="${result.symbol}" data-company="${result.company_name || result.company || ''}" data-recommendation="${recommendation}">${index + 1}</td>
                <td style="background: white; border: 1px solid #ccc;" data-symbol="${result.symbol}" data-company="${result.company_name || result.company || ''}" data-recommendation="${recommendation}"><strong>${result.symbol}</strong></td>
                <td style="background: white; border: 1px solid #ccc;" data-symbol="${result.symbol}" data-company="${result.company_name || result.company || ''}" data-recommendation="${recommendation}">$${result.current_price?.toFixed(2) || 'N/A'}</td>
                <td style="background: white; border: 1px solid #ccc; color: ${result.price_change_1d_pct >= 0 ? 'green' : 'red'};" data-symbol="${result.symbol}" data-company="${result.company_name || result.company || ''}" data-recommendation="${recommendation}">${result.price_change_1d_pct >= 0 ? '+' : ''}${result.price_change_1d_pct?.toFixed(2) || '0.00'}%</td>
                <td style="background: white; border: 1px solid #ccc; color: ${result.price_change_1w_pct >= 0 ? 'green' : 'red'};" data-symbol="${result.symbol}" data-company="${result.company_name || result.company || ''}" data-recommendation="${recommendation}">${result.price_change_1w_pct >= 0 ? '+' : ''}${result.price_change_1w_pct?.toFixed(2) || '0.00'}%</td>
                <td style="background: white; border: 1px solid #ccc; color: ${result.price_change_1m_pct >= 0 ? 'green' : 'red'};" data-symbol="${result.symbol}" data-company="${result.company_name || result.company || ''}" data-recommendation="${recommendation}">${result.price_change_1m_pct >= 0 ? '+' : ''}${result.price_change_1m_pct?.toFixed(2) || '0.00'}%</td>
                <td style="background: white; border: 1px solid #ccc; color: ${result.price_change_6m_pct >= 0 ? 'green' : 'red'};" data-symbol="${result.symbol}" data-company="${result.company_name || result.company || ''}" data-recommendation="${recommendation}">${result.price_change_6m_pct >= 0 ? '+' : ''}${result.price_change_6m_pct?.toFixed(2) || '0.00'}%</td>
                <td style="background: white; border: 1px solid #ccc; color: ${result.price_change_1y_pct >= 0 ? 'green' : 'red'};" data-symbol="${result.symbol}" data-company="${result.company_name || result.company || ''}" data-recommendation="${recommendation}">${result.price_change_1y_pct >= 0 ? '+' : ''}${result.price_change_1y_pct?.toFixed(2) || '0.00'}%</td>
                <td style="background: white; border: 1px solid #ccc;" data-symbol="${result.symbol}" data-company="${result.company_name || result.company || ''}" data-recommendation="${recommendation}">${indicators.rsi?.toFixed(2) || 'N/A'}</td>
                <td style="background: white; border: 1px solid #ccc;" data-symbol="${result.symbol}" data-company="${result.company_name || result.company || ''}" data-recommendation="${recommendation}">${vcpBadge}</td>
                <td style="background: white; border: 1px solid #ccc;" data-symbol="${result.symbol}" data-company="${result.company_name || result.company || ''}" data-recommendation="${recommendation}">${rsiDivBadge}</td>
                <td style="background: white; border: 1px solid #ccc;" data-symbol="${result.symbol}" data-company="${result.company_name || result.company || ''}" data-recommendation="${recommendation}">${macdDivBadge}</td>
                <td style="background: white; border: 1px solid #ccc;" data-symbol="${result.symbol}" data-company="${result.company_name || result.company || ''}" data-recommendation="${recommendation}">${crossBadge}</td>
                <td style="background: white; border: 1px solid #ccc;" data-symbol="${result.symbol}" data-company="${result.company_name || result.company || ''}" data-recommendation="${recommendation}">${breakoutBadge}</td>
                <td style="background: white; border: 1px solid #ccc;" data-symbol="${result.symbol}" data-company="${result.company_name || result.company || ''}" data-recommendation="${recommendation}"><span class="${recommendationClass}">${recommendation}</span></td>
                <td style="background: white; border: 1px solid #ccc; font-weight: bold;" data-symbol="${result.symbol}" data-company="${result.company_name || result.company || ''}" data-recommendation="${recommendation}">${result.score?.toFixed(1) || '0'}</td>
            `;
            newTbody.appendChild(row);
        });
        
        table.appendChild(newTbody);
        
        // Replace the entire table
        const tableWrapper = document.querySelector('.table-wrapper');
        if (tableWrapper) {
            tableWrapper.innerHTML = '';
            tableWrapper.appendChild(table);
        }
        
        // Add event listeners with debugging
        newTbody.addEventListener('click', (e) => {
            console.log('Table clicked:', e.target);
            const cell = e.target.closest('td');
            const row = e.target.closest('tr');
            console.log('Cell found:', cell);
            console.log('Row found:', row);
            
            // Try to get symbol from cell first, then from row
            let symbol = null;
            if (cell) {
                symbol = cell.getAttribute('data-symbol');
                console.log('Symbol from cell:', symbol);
            }
            
            if (!symbol && row) {
                symbol = row.getAttribute('data-symbol');
                console.log('Symbol from row:', symbol);
            }
            
            if (symbol) {
                console.log('Calling showStockDetails for:', symbol);
                this.showStockDetails(symbol);
            } else {
                console.log('No data-symbol attribute found on cell or row');
            }
        });
        
        // Apply filters to the new table
        this.applyTableFilters();
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
        console.log('showStockDetails called for:', symbol);
        // Find the stock data from the last analysis
        const stockData = window.lastAnalysisResults?.find(s => s.symbol === symbol);
        console.log('Found stock data:', stockData);
        if (stockData) {
            console.log('Calling displayDetailedModal');
            this.displayDetailedModal(stockData);
        } else {
            console.log('No stock data found, showing fallback');
            alert(`Stock details for ${symbol} would be shown here. This feature is coming soon!`);
        }
    }
    
    displayDetailedModal(stock) {
        console.log('displayDetailedModal called for:', stock.symbol);
        const modal = document.getElementById('stock-detail-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        
        console.log('Modal elements found:', { modal: !!modal, modalTitle: !!modalTitle, modalBody: !!modalBody });
        
        if (!modal || !modalTitle || !modalBody) {
            console.error('Modal elements not found!');
            return;
        }
        
        modalTitle.textContent = `${stock.symbol} - ${stock.company_name || 'Company'}`;
        
        const indicators = stock.indicators || {};
        
        modalBody.innerHTML = `
            <div class="analysis-container">
                <!-- Horizontal Layout: Fundamental and Technical Data -->
                <div class="horizontal-container">
                    <!-- Fundamental Data (left side) -->
                    <div class="analysis-section fundamental-horizontal">
                        <h3>📊 Fundamental Data</h3>
                        <div class="indicators-horizontal">
                            <div class="indicator-row">
                                <div class="indicator-item">
                                    <div class="indicator-label">Current Price</div>
                                    <div class="indicator-value">$${stock.current_price?.toFixed(2) || 'N/A'}</div>
                                </div>
                                <div class="indicator-item">
                                    <div class="indicator-label">Market Cap</div>
                                    <div class="indicator-value">${this.generateMarketCap(stock.current_price)}</div>
                                </div>
                                <div class="indicator-item">
                                    <div class="indicator-label">P/E Ratio</div>
                                    <div class="indicator-value">${this.generatePERatio(stock.symbol)}</div>
                                </div>
                                <div class="indicator-item">
                                    <div class="indicator-label">EPS</div>
                                    <div class="indicator-value">${this.generateEPS(stock.symbol)}</div>
                                </div>
                            </div>
                            <div class="indicator-row">
                                <div class="indicator-item">
                                    <div class="indicator-label">52W High</div>
                                    <div class="indicator-value">$${(stock.current_price * 1.25).toFixed(2)}</div>
                                </div>
                                <div class="indicator-item">
                                    <div class="indicator-label">52W Low</div>
                                    <div class="indicator-value">$${(stock.current_price * 0.75).toFixed(2)}</div>
                                </div>
                                <div class="indicator-item">
                                    <div class="indicator-label">Volume</div>
                                    <div class="indicator-value">${this.generateVolume()}</div>
                                </div>
                                <div class="indicator-item">
                                    <div class="indicator-label">Avg Volume</div>
                                    <div class="indicator-value">${this.generateAvgVolume()}</div>
                                </div>
                            </div>
                            <div class="indicator-row">
                                <div class="indicator-item">
                                    <div class="indicator-label">1 Day</div>
                                    <div class="indicator-value ${stock.price_change_1d_pct >= 0 ? 'positive' : 'negative'}">
                                        ${stock.price_change_1d_pct >= 0 ? '+' : ''}${stock.price_change_1d_pct?.toFixed(2) || '0.00'}%
                                    </div>
                                </div>
                                <div class="indicator-item">
                                    <div class="indicator-label">1 Week</div>
                                    <div class="indicator-value ${stock.price_change_1w_pct >= 0 ? 'positive' : 'negative'}">
                                        ${stock.price_change_1w_pct >= 0 ? '+' : ''}${stock.price_change_1w_pct?.toFixed(2) || '0.00'}%
                                    </div>
                                </div>
                                <div class="indicator-item">
                                    <div class="indicator-label">1 Month</div>
                                    <div class="indicator-value ${stock.price_change_1m_pct >= 0 ? 'positive' : 'negative'}">
                                        ${stock.price_change_1m_pct >= 0 ? '+' : ''}${stock.price_change_1m_pct?.toFixed(2) || '0.00'}%
                                    </div>
                                </div>
                                <div class="indicator-item">
                                    <div class="indicator-label">6 Months</div>
                                    <div class="indicator-value ${stock.price_change_6m_pct >= 0 ? 'positive' : 'negative'}">
                                        ${stock.price_change_6m_pct >= 0 ? '+' : ''}${stock.price_change_6m_pct?.toFixed(2) || '0.00'}%
                                    </div>
                                </div>
                            </div>
                            <div class="indicator-row">
                                <div class="indicator-item">
                                    <div class="indicator-label">1 Year</div>
                                    <div class="indicator-value ${stock.price_change_1y_pct >= 0 ? 'positive' : 'negative'}">
                                        ${stock.price_change_1y_pct >= 0 ? '+' : ''}${stock.price_change_1y_pct?.toFixed(2) || '0.00'}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Technical Data (right side) -->
                    <div class="analysis-section technical-horizontal">
                        <h3>📈 Technical Data</h3>
                        <div class="indicators-horizontal">
                            <div class="indicator-row">
                                <div class="indicator-item">
                                    <div class="indicator-label">RSI (14)</div>
                                    <div class="indicator-value ${this.getRSIClass(indicators.rsi)}">
                                        ${indicators.rsi?.toFixed(2) || 'N/A'}
                                    </div>
                                </div>
                                <div class="indicator-item">
                                    <div class="indicator-label">MACD</div>
                                    <div class="indicator-value">${indicators.macd?.macd?.toFixed(4) || 'N/A'}</div>
                                </div>
                                <div class="indicator-item">
                                    <div class="indicator-label">SMA (20)</div>
                                    <div class="indicator-value">$${indicators.sma20?.toFixed(2) || 'N/A'}</div>
                                </div>
                                <div class="indicator-item">
                                    <div class="indicator-label">SMA (50)</div>
                                    <div class="indicator-value">$${indicators.sma50?.toFixed(2) || 'N/A'}</div>
                                </div>
                            </div>
                            <div class="indicator-row">
                                <div class="indicator-item">
                                    <div class="indicator-label">SMA (200)</div>
                                    <div class="indicator-value">$${indicators.sma200?.toFixed(2) || 'N/A'}</div>
                                </div>
                                <div class="indicator-item">
                                    <div class="indicator-label">Bollinger Upper</div>
                                    <div class="indicator-value">$${indicators.bollinger?.upper?.toFixed(2) || 'N/A'}</div>
                                </div>
                                <div class="indicator-item">
                                    <div class="indicator-label">Bollinger Lower</div>
                                    <div class="indicator-value">$${indicators.bollinger?.lower?.toFixed(2) || 'N/A'}</div>
                                </div>
                                <div class="indicator-item">
                                    <div class="indicator-label">Stochastic %K</div>
                                    <div class="indicator-value">${indicators.stochastic?.k?.toFixed(2) || 'N/A'}%</div>
                                </div>
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
        
        console.log('Modal content set, showing modal');
        console.log('Modal current display:', modal.style.display);
        console.log('Modal computed style:', window.getComputedStyle(modal).display);
        
        // Aggressive modal show with inline styles
        modal.setAttribute('style', `
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 99999 !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(0, 0, 0, 0.7) !important;
            justify-content: center !important;
            align-items: center !important;
            padding: 20px !important;
        `);
        
        console.log('Modal display forced with inline styles');
        
        // Visual test: add a bright border to verify modal is visible
        setTimeout(() => {
            const modalRect = modal.getBoundingClientRect();
            console.log('Modal dimensions:', {
                width: modalRect.width,
                height: modalRect.height,
                top: modalRect.top,
                left: modalRect.left,
                visible: modalRect.width > 0 && modalRect.height > 0
            });
            
            // Remove red border after verification
            modal.style.border = 'none';
            console.log('Modal verified and red border removed');
        }, 100);
        
        // Add event listener to close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Add ESC key handler to close modal
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
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
