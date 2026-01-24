// Main JavaScript for GitHub Pages version
// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Load page manager
    if (typeof pageManager !== 'undefined') {
        // Set up navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageType = link.getAttribute('data-page');
                pageManager.loadPage(pageType);
            });
        });
        
        // Load default page (portfolio)
        pageManager.loadPage('portfolio');
    }
});

// Loading functions
function showLoading(message = 'Analyzing market data...') {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.remove('hidden');
        loading.querySelector('p').textContent = message;
    }
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('hidden');
    }
}

// Error display
function showError(message, container = null) {
    const targetContainer = container || document.getElementById('portfolio-results');
    if (targetContainer) {
        // Check if it's a mock data warning
        if (message.includes('mock data') || message.includes('demo')) {
            targetContainer.innerHTML = `
                <div class="info-message" style="background: var(--warning-bg); border: 1px solid var(--warning); padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <strong>📊 Demo Mode:</strong> ${message}
                    <br><small>This is for testing purposes. In production, real market data will be used.</small>
                </div>
            `;
        } else {
            targetContainer.innerHTML = `
                <div class="error-message">
                    <strong>Error:</strong> ${message}
                    <br><small>Please check your internet connection and try again.</small>
                </div>
            `;
        }
    }
}

// Stock detail modal
function closeStockDetail() {
    const modal = document.getElementById('stock-detail-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Display functions (adapted from original main.js)
function displayPortfolioResults(data, container) {
    const { buy_stocks, sell_stocks, summary, failed_symbols } = data;
    
    let html = '<div class="results">';
    
    // Summary Statistics
    html += `
        <div class="result-section">
            <h3>Portfolio Summary</h3>
            <div class="portfolio-summary">
                <div class="summary-card">
                    <div class="summary-value">${summary.total}</div>
                    <div class="summary-label">Total Analyzed</div>
                </div>
                <div class="summary-card">
                    <div class="summary-value" style="color: var(--success);">${summary.buy_count}</div>
                    <div class="summary-label">BUY Recommendations</div>
                </div>
                <div class="summary-card">
                    <div class="summary-value" style="color: var(--danger);">${summary.sell_count}</div>
                    <div class="summary-label">SELL Recommendations</div>
                </div>
                <div class="summary-card">
                    <div class="summary-value" style="color: var(--warning);">${summary.hold_count}</div>
                    <div class="summary-label">HOLD Recommendations</div>
                </div>
                <div class="summary-card">
                    <div class="summary-value">${summary.avg_score.toFixed(2)}</div>
                    <div class="summary-label">Average Score</div>
                </div>
            </div>
        </div>
    `;
    
    // Top BUY Recommendations
    if (buy_stocks.length > 0) {
        html += `
            <div class="result-section">
                <h3 style="color: var(--success);">Top ${buy_stocks.length} BUY Recommendations</h3>
                <div class="table-wrapper">
                <table class="stocks-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Symbol</th>
                            <th>Price</th>
                            <th>1D %</th>
                            <th>1W %</th>
                            <th>1M %</th>
                            <th>6M %</th>
                            <th>1Y %</th>
                            <th>RSI</th>
                            <th>Tip</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${buy_stocks.map((stock, idx) => `
                                <tr class="stock-row" data-symbol="${stock.symbol}" data-index="${idx}" onclick="showStockDetail('${stock.symbol}', ${idx})">
                                    <td>${idx + 1}</td>
                                    <td data-company="${stock.company}"><strong>${stock.symbol}</strong></td>
                                    <td>$${stock.price.toFixed(2)}</td>
                                    <td class="${stock.change_1d >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_1d >= 0 ? '+' : ''}${stock.change_1d.toFixed(2)}%
                                    </td>
                                    <td class="${stock.change_1w >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_1w >= 0 ? '+' : ''}${stock.change_1w.toFixed(2)}%
                                    </td>
                                    <td class="${stock.change_1m >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_1m >= 0 ? '+' : ''}${stock.change_1m.toFixed(2)}%
                                    </td>
                                    <td class="${stock.change_6m >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_6m >= 0 ? '+' : ''}${stock.change_6m.toFixed(2)}%
                                    </td>
                                    <td class="${(stock.change_1y || 0) >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${(stock.change_1y || 0) >= 0 ? '+' : ''}${(stock.change_1y || 0).toFixed(2)}%
                                    </td>
                                    <td>${stock.rsi.toFixed(2)}</td>
                                    <td><span class="recommendation-badge ${getRecommendationClass(stock.recommendation)}">${stock.recommendation}</span></td>
                                    <td class="score-positive">${stock.score}</td>
                                </tr>
                            `).join('')}
                    </tbody>
                </table>
                </div>
            </div>
        `;
    } else {
        html += '<div class="result-section"><p class="info-text">No BUY recommendations found.</p></div>';
    }
    
    // Top SELL Recommendations
    if (sell_stocks.length > 0) {
        html += `
            <div class="result-section">
                <h3 style="color: var(--danger);">Top ${sell_stocks.length} SELL Recommendations</h3>
                <div class="table-wrapper">
                <table class="stocks-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Symbol</th>
                            <th>Price</th>
                            <th>1D %</th>
                            <th>1W %</th>
                            <th>1M %</th>
                            <th>6M %</th>
                            <th>1Y %</th>
                            <th>RSI</th>
                            <th>Tip</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sell_stocks.map((stock, idx) => `
                                <tr class="stock-row" data-symbol="${stock.symbol}" data-index="${buy_stocks.length + idx}" onclick="showStockDetail('${stock.symbol}', ${buy_stocks.length + idx})">
                                    <td>${idx + 1}</td>
                                    <td data-company="${stock.company}"><strong>${stock.symbol}</strong></td>
                                    <td>$${stock.price.toFixed(2)}</td>
                                    <td class="${stock.change_1d >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_1d >= 0 ? '+' : ''}${stock.change_1d.toFixed(2)}%
                                    </td>
                                    <td class="${stock.change_1w >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_1w >= 0 ? '+' : ''}${stock.change_1w.toFixed(2)}%
                                    </td>
                                    <td class="${stock.change_1m >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_1m >= 0 ? '+' : ''}${stock.change_1m.toFixed(2)}%
                                    </td>
                                    <td class="${stock.change_6m >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_6m >= 0 ? '+' : ''}${stock.change_6m.toFixed(2)}%
                                    </td>
                                    <td class="${(stock.change_1y || 0) >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${(stock.change_1y || 0) >= 0 ? '+' : ''}${(stock.change_1y || 0).toFixed(2)}%
                                    </td>
                                    <td>${stock.rsi.toFixed(2)}</td>
                                    <td><span class="recommendation-badge recommendation-sell">${stock.recommendation}</span></td>
                                    <td class="score-negative">${stock.score}</td>
                                </tr>
                            `).join('')}
                    </tbody>
                </table>
                </div>
            </div>
        `;
    } else {
        html += '<div class="result-section"><p class="info-text">No SELL recommendations found.</p></div>';
    }
    
    // HOLD Recommendations
    if (data.hold_stocks && data.hold_stocks.length > 0) {
        html += `
            <div class="result-section">
                <h3 style="color: var(--warning);">HOLD Recommendations (${data.hold_stocks.length})</h3>
                <div class="table-wrapper">
                <table class="stocks-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Symbol</th>
                            <th>Price</th>
                            <th>1D %</th>
                            <th>1W %</th>
                            <th>1M %</th>
                            <th>6M %</th>
                            <th>1Y %</th>
                            <th>RSI</th>
                            <th>Tip</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.hold_stocks.map((stock, idx) => `
                                <tr class="stock-row" data-symbol="${stock.symbol}" data-index="${buy_stocks.length + sell_stocks.length + idx}" onclick="showStockDetail('${stock.symbol}', ${buy_stocks.length + sell_stocks.length + idx})">
                                    <td>${idx + 1}</td>
                                    <td data-company="${stock.company}"><strong>${stock.symbol}</strong></td>
                                    <td>$${stock.price.toFixed(2)}</td>
                                    <td class="${stock.change_1d >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_1d >= 0 ? '+' : ''}${stock.change_1d.toFixed(2)}%
                                    </td>
                                    <td class="${stock.change_1w >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_1w >= 0 ? '+' : ''}${stock.change_1w.toFixed(2)}%
                                    </td>
                                    <td class="${stock.change_1m >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_1m >= 0 ? '+' : ''}${stock.change_1m.toFixed(2)}%
                                    </td>
                                    <td class="${stock.change_6m >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_6m >= 0 ? '+' : ''}${stock.change_6m.toFixed(2)}%
                                    </td>
                                    <td class="${(stock.change_1y || 0) >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${(stock.change_1y || 0) >= 0 ? '+' : ''}${(stock.change_1y || 0).toFixed(2)}%
                                    </td>
                                    <td>${stock.rsi.toFixed(2)}</td>
                                    <td><span class="recommendation-badge recommendation-hold">${stock.recommendation}</span></td>
                                    <td style="color: var(--warning);">${stock.score}</td>
                                </tr>
                            `).join('')}
                    </tbody>
                </table>
                </div>
            </div>
        `;
    } else {
        html += '<div class="result-section"><p class="info-text">No HOLD recommendations found.</p></div>';
    }
    
    // Store all stocks for detail view
    window.allStocks = [...(buy_stocks || []), ...(sell_stocks || []), ...(data.hold_stocks || [])];
    
    // Failed symbols
    if (failed_symbols && failed_symbols.length > 0) {
        html += `
            <div class="error-message">
                <strong>Failed to analyze:</strong> ${failed_symbols.join(', ')}
            </div>
        `;
    }
    
    html += '</div>';
    container.innerHTML = html;
}

function displayMarketResults(data, container) {
    const { buy_recommendations, total_analyzed, failed_symbols } = data;
    
    let html = '<div class="results">';
    
    html += `
        <div class="result-section">
            <h3>Top ${buy_recommendations.length} BUY Recommendations</h3>
            <p class="info-text">Analyzed ${total_analyzed} stocks</p>
            <div class="table-wrapper">
            <table class="stocks-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>1D %</th>
                        <th>1W %</th>
                        <th>1M %</th>
                        <th>6M %</th>
                        <th>1Y %</th>
                        <th>RSI</th>
                        <th>Tip</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    ${buy_recommendations.map((stock, idx) => `
                            <tr class="stock-row" data-symbol="${stock.symbol}" data-index="${idx}" onclick="showStockDetail('${stock.symbol}', ${idx})">
                                <td>${idx + 1}</td>
                                <td data-company="${stock.company}"><strong>${stock.symbol}</strong></td>
                                <td>$${stock.price.toFixed(2)}</td>
                                <td class="${stock.change_1d >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1d >= 0 ? '+' : ''}${stock.change_1d.toFixed(2)}%
                                </td>
                                <td class="${stock.change_1w >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1w >= 0 ? '+' : ''}${stock.change_1w.toFixed(2)}%
                                </td>
                                <td class="${stock.change_1m >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1m >= 0 ? '+' : ''}${stock.change_1m.toFixed(2)}%
                                </td>
                                <td class="${stock.change_6m >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_6m >= 0 ? '+' : ''}${stock.change_6m.toFixed(2)}%
                                </td>
                                <td class="${(stock.change_1y || 0) >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${(stock.change_1y || 0) >= 0 ? '+' : ''}${(stock.change_1y || 0).toFixed(2)}%
                                </td>
                                <td>${stock.rsi.toFixed(2)}</td>
                                <td><span class="recommendation-badge recommendation-buy">${stock.recommendation}</span></td>
                                <td class="score-positive">${stock.score}</td>
                            </tr>
                        `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    // Store stocks for detail view
    window.allStocks = buy_recommendations || [];
    
    if (failed_symbols && failed_symbols.length > 0) {
        html += `
            <div class="error-message">
                <strong>Failed to analyze:</strong> ${failed_symbols.slice(0, 10).join(', ')}${failed_symbols.length > 10 ? '...' : ''}
            </div>
        `;
    }
    
    html += '</div>';
    container.innerHTML = html;
}

// Stock detail modal
function showStockDetail(symbol, index) {
    const stocks = window.allStocks || [];
    const stock = stocks[index];
    
    if (!stock) return;
    
    const modal = document.getElementById('stock-detail-modal');
    if (modal) {
        modal.style.display = 'block';
    }
    
    const fundamental = stock.fundamental || {};
    
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('modal-title');
    
    modalTitle.textContent = `${symbol} - ${stock.company}`;
    
    modalBody.innerHTML = `
        <div class="analysis-container">
            <div class="analysis-section">
                <h3>Technical Analysis</h3>
                <div class="indicators-grid">
                    <div class="indicator-card">
                        <div class="indicator-label">Current Price</div>
                        <div class="indicator-value">$${stock.price.toFixed(2)}</div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">1D Change</div>
                        <div class="indicator-value ${stock.change_1d >= 0 ? 'score-positive' : 'score-negative'}">
                            ${stock.change_1d >= 0 ? '+' : ''}${stock.change_1d.toFixed(2)}%
                        </div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">1W Change</div>
                        <div class="indicator-value ${stock.change_1w >= 0 ? 'score-positive' : 'score-negative'}">
                            ${stock.change_1w >= 0 ? '+' : ''}${stock.change_1w.toFixed(2)}%
                        </div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">1M Change</div>
                        <div class="indicator-value ${stock.change_1m >= 0 ? 'score-positive' : 'score-negative'}">
                            ${stock.change_1m >= 0 ? '+' : ''}${stock.change_1m.toFixed(2)}%
                        </div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">6M Change</div>
                        <div class="indicator-value ${stock.change_6m >= 0 ? 'score-positive' : 'score-negative'}">
                            ${stock.change_6m >= 0 ? '+' : ''}${stock.change_6m.toFixed(2)}%
                        </div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">1Y Change</div>
                        <div class="indicator-value ${(stock.change_1y || 0) >= 0 ? 'score-positive' : 'score-negative'}">
                            ${(stock.change_1y || 0) >= 0 ? '+' : ''}${(stock.change_1y || 0).toFixed(2)}%
                        </div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">RSI (14)</div>
                        <div class="indicator-value">${stock.rsi.toFixed(2)}</div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">MACD</div>
                        <div class="indicator-value">${stock.macd ? stock.macd.toFixed(2) : 'N/A'}</div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">SMA (20)</div>
                        <div class="indicator-value">${stock.sma_20 ? '$' + stock.sma_20.toFixed(2) : 'N/A'}</div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">SMA (50)</div>
                        <div class="indicator-value">${stock.sma_50 ? '$' + stock.sma_50.toFixed(2) : 'N/A'}</div>
                    </div>
                </div>
                <div style="margin-top: 20px;">
                    <strong>Recommendation:</strong> 
                    <span class="recommendation-badge ${getRecommendationClass(stock.recommendation)}">${stock.recommendation}</span>
                    <strong style="margin-left: 15px;">Score:</strong> 
                    <span class="${stock.score >= 0 ? 'score-positive' : 'score-negative'}">${stock.score}</span>
                </div>
                <h4 style="margin-top: 15px;">Reasoning:</h4>
                <p class="reasoning-text">${stock.reasoning || 'No detailed reasoning available'}</p>
            </div>
        </div>
    `;
}

// Helper functions for styling
function getRecommendationClass(recommendation) {
    if (recommendation.includes('BUY')) return 'recommendation-buy';
    if (recommendation.includes('SELL')) return 'recommendation-sell';
    return 'recommendation-hold';
}

// Form event handlers - Now handled by PageManager.attachEventListeners()
document.addEventListener('DOMContentLoaded', () => {
    // Initialize page manager
    pageManager.loadPage('portfolio');
    
    // Navigation is handled by pageManager.loadPage()
    // Form events are handled by PageManager.attachEventListeners()
});
