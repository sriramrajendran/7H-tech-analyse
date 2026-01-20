# 📈 7H Stock Analyzer

![7H Stock Analyzer](doc/readme.png)

A Python application that provides AI-powered stock recommendations based on technical analysis parameters. The system analyzes multiple technical indicators including RSI, MACD, Moving Averages, Bollinger Bands, and more to generate buy/sell/hold recommendations.

## Features

- **Technical Indicators Analysis:**
  - RSI (Relative Strength Index)
  - MACD (Moving Average Convergence Divergence)
  - Simple Moving Averages (SMA 20, 50, 200)
  - Exponential Moving Averages (EMA 12, 26)
  - Bollinger Bands
  - Stochastic Oscillator
  - Average True Range (ATR)
  - On-Balance Volume (OBV)

- **Recommendation Engine:**
  - Generates BUY/SELL/HOLD recommendations based on multiple indicators
  - Scoring system that weighs different technical signals
  - Detailed reasoning for each recommendation

- **Multiple Analysis Modes:**
  - Single stock analysis
  - Portfolio analysis with top BUY/SELL recommendations
  - **Beautiful web interface** with real-time analysis

## Installation

1. **Navigate to the project directory:**
   ```bash
   cd ~/workspace/7H-tech-analyse
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Quick Start

### 🚀 Start the Web Application

1. **Start the Flask server:**
   ```bash
   lsof -ti:80 | xargs kill
   python3 app.py
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:80
   ```

3. **Stop the server:** Press `Ctrl+C` in the terminal

### 📊 Using the Web Interface

#### Single Stock Analysis

1. Click on the **"Single Stock"** tab
2. Enter a stock symbol (e.g., `AAPL`, `MSFT`, `GOOGL`)
3. Select a time period (default: 1 Year)
4. Click **"Analyze Stock"**
5. View detailed technical indicators and recommendations

#### Portfolio Analysis

1. Click on the **"Portfolio Analysis"** tab
2. Enter multiple stock symbols (comma or space separated):
   ```
   AAPL, MSFT, GOOGL, TSLA, NVDA, AMZN, META, NFLX
   ```
3. Select time period and number of top recommendations
4. Click **"Analyze Portfolio"**
5. View:
   - **Top BUY Recommendations** (sorted by score)
   - **Top SELL Recommendations** (sorted by score)
   - Portfolio summary statistics

### 🎨 Web App Features

- **Beautiful Modern UI**: Gradient background, smooth animations
- **Real-time Analysis**: Results appear instantly via AJAX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Color-coded Recommendations**: 
  - 🟢 Green for BUY
  - 🔴 Red for SELL
  - 🟡 Yellow for HOLD
- **Detailed Indicators**: RSI, MACD, Moving Averages, Bollinger Bands
- **Portfolio Insights**: Compare multiple stocks at once

## Recommendation Scoring System

The recommendation engine uses a scoring system:

- **Score ≥ 5:** STRONG BUY
- **Score 2-4:** BUY
- **Score -1 to 1:** HOLD
- **Score -4 to -2:** SELL
- **Score ≤ -5:** STRONG SELL

### Scoring Factors

- **RSI:** +2 (oversold), -2 (overbought), +1 (neutral-bullish), -1 (neutral-bearish)
- **MACD:** +2 (bullish crossover), -2 (bearish crossover)
- **Moving Averages:** +1 per MA above price, -2 if below all MAs
- **Golden/Death Cross:** +1 (golden), -1 (death)
- **Bollinger Bands:** +1 (near lower), -1 (near upper)
- **Stochastic:** +1 (oversold), -1 (overbought)
- **Price Momentum:** +1 (strong positive), -1 (strong negative)

## Project Structure

```
7H-Stock-Analyzer/
├── app.py               # Flask web application
├── stock_analyzer.py    # Core analysis engine
├── requirements.txt     # Python dependencies
├── templates/           # HTML templates
│   ├── base.html
│   └── index.html
├── static/              # Static files
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── doc/
│   └── readme.png      # Branding image
└── README.md           # This file
```

## Dependencies

- **yfinance:** Yahoo Finance data fetching
- **pandas:** Data manipulation
- **numpy:** Numerical operations
- **ta:** Technical analysis library
- **flask:** Web framework for browser interface

## Important Notes

⚠️ **Disclaimer:** This tool is for educational and informational purposes only. Stock recommendations are based solely on technical analysis and should not be considered as financial advice. Always do your own research and consult with a financial advisor before making investment decisions.

- Stock data is fetched from Yahoo Finance (free, but may have rate limits)
- Requires internet connection
- Historical data availability depends on the stock exchange
- Technical analysis is just one aspect of stock evaluation

## Tips

- Use the portfolio analysis for comparing multiple stocks
- Higher scores = Better BUY opportunities
- Lower (negative) scores = Consider SELL
- Check the reasoning for each recommendation

## Troubleshooting

**Issue:** "No data found for [SYMBOL]"
- Verify the stock symbol is correct
- Check if the stock is listed on a supported exchange
- Ensure you have an internet connection

**Issue:** "Limited data" warning
- Try selecting a shorter period in the web interface
- Some stocks may have limited trading history

**Issue:** Import errors
- Make sure all dependencies are installed: `pip install -r requirements.txt`
- Ensure you're using Python 3.7 or higher

**Issue:** Flask app won't start
- Check if port 80 is already in use (the app uses port 80)
- Try: `python3 app.py` (not `python app.py`)
- Ensure Flask is installed: `pip install flask`
- On macOS/Linux, you may need to use `sudo` to run on port 80, or change the port in `app.py` to 5000

## Future Enhancements

Potential features to add:
- Support for more technical indicators
- Backtesting capabilities
- Email/SMS alerts
- Database storage for historical analysis
- Integration with trading APIs
- Chart visualizations
- Export results to CSV/PDF

## License

This project is provided as-is for educational purposes.

## Contributing

Feel free to fork, modify, and improve this project according to your needs!
