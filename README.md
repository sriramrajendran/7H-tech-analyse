# 📈 BeaconOfTech Tech hub & Analytics Platform

![BeaconOfTech ](doc/readme.png)

A **comprehensive static web application** by **BeaconOfTech** for digital innovation updates and AI-powered stock analysis that runs entirely on GitHub Pages. Explore tech blogs, tutorials, projects, and analyze stocks with technical indicators to get BUY/SELL/HOLD recommendations - all in your browser with no backend required.

## 👨‍💻 **Author**

**Sriramprabhu Rajendran**

## 🌐 **Live Demo**

**Live Demo:** `https://[your-username].github.io/7h-stock-analysis`

## ✨ **Features**

### **Technical Analysis**
- **RSI (Relative Strength Index)** - Momentum indicator
- **MACD (Moving Average Convergence Divergence)** - Trend following
- **Simple Moving Averages (SMA 20, 50, 200)** - Support/resistance levels
- **Bollinger Bands** - Volatility channels
- **Stochastic Oscillator** - Overbought/oversold signals

### **Analysis Modes**
- **Portfolio Analysis** - Analyze custom stock lists
- **Watchlist Analysis** - Track your favorite stocks  
- **Market Analysis** - Top US stock recommendations
- **ETF Analysis** - Major ETF and index analysis

### **Smart Recommendations**
- **Scoring System:** STRONG BUY → BUY → HOLD → SELL → STRONG SELL
- **Detailed Reasoning:** Understand why each recommendation was made
- **Real-time Data:** Using Yahoo Finance API

### **User Experience**
- **Beautiful Modern UI:** Responsive design with smooth animations
- **Real-time Results:** Instant analysis via client-side processing
- **Detailed Stock Views:** Click any stock for comprehensive analysis
- **Mobile Friendly:** Works on desktop, tablet, and mobile

## 🚀 **Quick Start**

### **Using the Live Version**
1. Visit the GitHub Pages URL
2. Select an analysis type from the sidebar
3. View auto-loaded default stocks or enter your own symbols
4. Click "Analyze" to get recommendations

### **Local Development**
```bash
# Clone the repository
git clone https://github.com/[your-username]/7h-stock-analysis.git
cd 7h-stock-analysis

# Kill any existing processes on ports 8000 and 8001
lsof -ti:8000 | xargs kill -9 2>/dev/null || true
lsof -ti:8001 | xargs kill -9 2>/dev/null || true

# Serve locally (any static server)
python3 -m http.server 8000
# or
npx serve .

# Open http://localhost:8000
```

### **Running Tests**
```bash
# Kill any existing processes on port 8001
lsof -ti:8001 | xargs kill -9 2>/dev/null || true

# Serve test runner
python3 -m http.server 8001 --directory tests

# Open http://localhost:8001
# Click "Run All Tests" to verify functionality
```

## 📊 **How to Use**

### **Portfolio Analysis**
1. Click **Portfolio** in the sidebar
2. Edit stock symbols (default: AAPL, MSFT, GOOGL, etc.)
3. Select time period and number of recommendations
4. Click **Analyze Portfolio**
5. View BUY/SELL/HOLD recommendations with scores

### **Market Analysis**
1. Click **Market** in the sidebar
2. Select time period and top N recommendations
3. Click **Analyze US Market**
4. View top BUY recommendations from major US stocks

### **ETF Analysis**
1. Click **ETFs/Indexes** in the sidebar
2. Select time period and recommendations count
3. Click **Analyze ETFs/Indexes**
4. View top ETF recommendations

## 🎯 **Understanding Recommendations**

### **Scoring System**
- **Score ≥ 5:** STRONG BUY 🟢
- **Score 2-4:** BUY 🟢  
- **Score -1 to 1:** HOLD 🟡
- **Score -4 to -2:** SELL 🔴
- **Score ≤ -5:** STRONG SELL 🔴

### **Key Indicators**
- **RSI:** Momentum (oversold < 30, overbought > 70)
- **MACD:** Trend following indicator
- **Moving Averages:** Support/resistance levels
- **Bollinger Bands:** Volatility channels

## 🌐 **GitHub Pages Deployment**

### **Automatic Deployment (Recommended)**
The site automatically deploys to GitHub Pages when you push to the `main` branch:

1. **Push changes to main:**
   ```bash
   git add .
   git commit -m "Update GitHub Pages version"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` and `/ (root)`
   - Save

3. **Live site:** `https://[username].github.io/7h-stock-analysis`

### **Local Development**
```bash
# Serve locally for testing
python3 -m http.server 8000
# Open http://localhost:8000
```

### **Configuration**
The application uses a centralized JSON configuration file:

**`input/config.json`** contains:
- **Stock lists** - Portfolio, watchlist, market, and ETF symbols
- **UI themes** - Colors, responsive breakpoints, animations
- **API settings** - Yahoo Finance endpoints, timeouts, retry logic
- **Analysis parameters** - Technical indicator periods, recommendation thresholds

### **Customizing Configuration**
Edit `input/config.json` to:
- Add/remove stock symbols
- Adjust analysis parameters
- Modify UI themes
- Change API settings

Example configuration section:
```json
{
  "portfolio": {
    "symbols": ["AAPL", "MSFT", "GOOGL"],
    "defaultPeriod": "1y",
    "defaultTopN": 5
  },
  "ui": {
    "theme": {
      "primary": "#667eea",
      "secondary": "#764ba2"
    }
  }
}
```

## 🧪 **Testing**

### **Unit Tests**
Comprehensive test suite for critical components:

```bash
# Open test runner in browser
python3 -m http.server 8000
# Navigate to http://localhost:8000/tests/test-runner.html
```

### **Test Coverage**
- ✅ **StockAnalyzer Class** - Core analysis engine, technical indicators, recommendations
- ✅ **PageManager Class** - Page management, form handling, symbol parsing  
- ✅ **Main GitHub App** - UI utilities, error handling, loading states
- ✅ **Integration Tests** - End-to-end workflows, API integration
- ✅ **Performance Tests** - Large dataset handling, response times

### **Running Tests**
1. **Browser Testing** - Open `tests/test-runner.html`
2. **Individual Test Suites** - Run specific component tests
3. **Continuous Integration** - Tests run automatically on GitHub Actions

### **Test Categories**
- **Unit Tests** - Individual function testing
- **Integration Tests** - Component interaction testing
- **Performance Tests** - Large dataset validation
- **Error Handling** - Edge cases and failure scenarios

## 📁 **Project Structure**

```
beaconoftech-stock-analysis/
├── index.html                 # Main entry point
├── assets/                    # Static assets
│   ├── css/
│   │   └── style.css         # Styling
│   └── js/
│       ├── stock-analyzer.js  # Core analysis engine
│       ├── pages.js           # Page management
│       └── main-github.js     # Main application logic
├── tests/                     # Test suite
│   ├── test-runner.html       # Browser test runner
│   ├── stock-analyzer.test.js # StockAnalyzer tests
│   ├── pages.test.js          # PageManager tests
│   ├── main-github.test.js    # Main app tests
│   └── README.md             # Test documentation
├── input/                     # Configuration files
│   └── config.json           # JSON configuration (stocks, themes, API settings)
├── .github/
│   └── workflows/
│       └── deploy.yml         # CI/CD pipeline
├── doc/
│   ├── spec.md               # Project specifications
│   └── readme.png            # Branding image
├── .nojekyll                  # GitHub Pages optimization
└── README.md                 # This file
```

## ⚠️ **Important Notes**

**Disclaimer:** This tool is for educational purposes only. Stock recommendations are based solely on technical analysis and should not be considered as financial advice. Always do your own research and consult with a financial advisor before making investment decisions.

**Data Sources:**
- Uses Yahoo Finance API (free tier)
- Real-time data may have 15-20 minute delays
- Rate limiting may apply with excessive requests

**Browser Security:**
- All analysis runs client-side in your browser
- No data sent to external servers (except Yahoo Finance API)
- Your stock symbols and analysis remain private

## 🚨 **Limitations**

The following features are not available in the GitHub Pages version:
- ❌ **Persistent Storage** - No database for saving data
- ❌ **Automated Alerts** - Requires backend services
- ❌ **Advanced Pattern Detection** - Complex algorithms need more processing power

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make changes to frontend code only
4. Test locally with `python3 -m http.server 8000`
5. Submit a pull request`

## 📞 **Support**

- **GitHub Issues:** Report bugs or request features
- **Documentation:** This README covers all usage information
- **Live Demo:** Try the GitHub Pages version instantly


---

## 📜 **License**

This project is provided as-is for educational purposes.

**🚀 Ready to explore tech and analyze stocks with BeaconOfTech?** Visit the GitHub Pages site or run locally to start your journey today!
