class PatternsModule {
    constructor() {
        this.patterns = this.initializePatterns();
    }

    initializePatterns() {
        return {
            bullish: [
                {
                    id: 'head-shoulders-inverse',
                    name: 'Inverse Head and Shoulders',
                    type: 'Bullish Reversal',
                    reliability: 'High',
                    description: 'A bullish reversal pattern that forms after a downtrend. It consists of three troughs with the middle trough (head) being the deepest, and two shallower troughs (shoulders) on either side.',
                    signals: [
                        'Forms at the end of a downtrend',
                        'Three consecutive troughs with middle one lowest',
                        'Breakout above neckline confirms pattern',
                        'Volume typically increases on breakout'
                    ],
                    tradingStrategy: 'Enter long position when price breaks above the neckline with increased volume. Set stop loss below the right shoulder. Target is the distance from head to neckline projected upward.',
                    svg: this.generateInverseHeadShouldersSVG()
                },
                {
                    id: 'double-bottom',
                    name: 'Double Bottom',
                    type: 'Bullish Reversal',
                    reliability: 'High',
                    description: 'A bullish reversal pattern characterized by two consecutive troughs at approximately the same price level, resembling the letter "W".',
                    signals: [
                        'Two distinct lows at similar price levels',
                        'Peak between the two bottoms',
                        'Breakout above resistance confirms pattern',
                        'Second bottom often has lower volume'
                    ],
                    tradingStrategy: 'Enter when price breaks above the peak between the two bottoms. Stop loss below the second bottom. Target equals the height of the pattern added to breakout point.',
                    svg: this.generateDoubleBottomSVG()
                },
                {
                    id: 'cup-handle',
                    name: 'Cup and Handle',
                    type: 'Bullish Continuation',
                    reliability: 'High',
                    description: 'A bullish continuation pattern that resembles a teacup. The cup is a rounded bottom, and the handle is a slight downward drift after the cup formation.',
                    signals: [
                        'U-shaped cup formation (not V-shaped)',
                        'Handle forms in upper third of cup',
                        'Handle should drift downward or sideways',
                        'Breakout above handle resistance'
                    ],
                    tradingStrategy: 'Buy when price breaks above the handle resistance. Stop loss at the bottom of the handle. Target is the depth of the cup added to the breakout point.',
                    svg: this.generateCupHandleSVG()
                },
                {
                    id: 'ascending-triangle',
                    name: 'Ascending Triangle',
                    type: 'Bullish Continuation',
                    reliability: 'Medium-High',
                    description: 'A bullish continuation pattern with a flat upper resistance line and rising lower support line, indicating accumulation.',
                    signals: [
                        'Horizontal resistance at the top',
                        'Rising support line at the bottom',
                        'At least two touches on each line',
                        'Breakout typically occurs upward'
                    ],
                    tradingStrategy: 'Enter long when price breaks above resistance with volume. Stop loss below the most recent swing low. Target is the height of the triangle at its widest point.',
                    svg: this.generateAscendingTriangleSVG()
                },
                {
                    id: 'bullish-flag',
                    name: 'Bullish Flag',
                    type: 'Bullish Continuation',
                    reliability: 'Medium',
                    description: 'A short-term continuation pattern that resembles a flag on a pole. Forms after a strong upward move (flagpole) followed by a consolidation (flag).',
                    signals: [
                        'Sharp upward move (flagpole)',
                        'Rectangular consolidation sloping slightly down',
                        'Typically lasts 1-3 weeks',
                        'Breakout resumes uptrend'
                    ],
                    tradingStrategy: 'Buy on breakout above flag resistance. Stop loss below flag support. Target equals flagpole height added to breakout point.',
                    svg: this.generateBullishFlagSVG()
                },
                {
                    id: 'morning-star',
                    name: 'Morning Star',
                    type: 'Bullish Reversal',
                    reliability: 'High',
                    description: 'A three-candle bullish reversal pattern that appears at the bottom of a downtrend, signaling a potential trend reversal.',
                    signals: [
                        'First candle: Long bearish candle',
                        'Second candle: Small-bodied candle (star)',
                        'Third candle: Long bullish candle',
                        'Third candle closes above midpoint of first'
                    ],
                    tradingStrategy: 'Enter long after the third candle confirms. Stop loss below the star candle. Target previous resistance levels.',
                    svg: this.generateMorningStarSVG()
                }
            ],
            bearish: [
                {
                    id: 'head-shoulders',
                    name: 'Head and Shoulders',
                    type: 'Bearish Reversal',
                    reliability: 'High',
                    description: 'A bearish reversal pattern that forms after an uptrend. It consists of three peaks with the middle peak (head) being the highest, and two lower peaks (shoulders) on either side.',
                    signals: [
                        'Forms at the end of an uptrend',
                        'Three consecutive peaks with middle one highest',
                        'Breakdown below neckline confirms pattern',
                        'Volume increases on breakdown'
                    ],
                    tradingStrategy: 'Enter short when price breaks below neckline with volume. Stop loss above right shoulder. Target is the distance from head to neckline projected downward.',
                    svg: this.generateHeadShouldersSVG()
                },
                {
                    id: 'double-top',
                    name: 'Double Top',
                    type: 'Bearish Reversal',
                    reliability: 'High',
                    description: 'A bearish reversal pattern characterized by two consecutive peaks at approximately the same price level, resembling the letter "M".',
                    signals: [
                        'Two distinct highs at similar price levels',
                        'Trough between the two tops',
                        'Breakdown below support confirms pattern',
                        'Second top often has lower volume'
                    ],
                    tradingStrategy: 'Enter short when price breaks below the trough between tops. Stop loss above the second top. Target equals the height of the pattern subtracted from breakdown point.',
                    svg: this.generateDoubleTopSVG()
                },
                {
                    id: 'descending-triangle',
                    name: 'Descending Triangle',
                    type: 'Bearish Continuation',
                    reliability: 'Medium-High',
                    description: 'A bearish continuation pattern with a flat lower support line and descending upper resistance line, indicating distribution.',
                    signals: [
                        'Horizontal support at the bottom',
                        'Descending resistance line at the top',
                        'At least two touches on each line',
                        'Breakdown typically occurs downward'
                    ],
                    tradingStrategy: 'Enter short when price breaks below support with volume. Stop loss above the most recent swing high. Target is the height of the triangle at its widest point.',
                    svg: this.generateDescendingTriangleSVG()
                },
                {
                    id: 'bearish-flag',
                    name: 'Bearish Flag',
                    type: 'Bearish Continuation',
                    reliability: 'Medium',
                    description: 'A short-term continuation pattern that forms after a strong downward move (flagpole) followed by a consolidation (flag).',
                    signals: [
                        'Sharp downward move (flagpole)',
                        'Rectangular consolidation sloping slightly up',
                        'Typically lasts 1-3 weeks',
                        'Breakdown resumes downtrend'
                    ],
                    tradingStrategy: 'Sell on breakdown below flag support. Stop loss above flag resistance. Target equals flagpole height subtracted from breakdown point.',
                    svg: this.generateBearishFlagSVG()
                },
                {
                    id: 'evening-star',
                    name: 'Evening Star',
                    type: 'Bearish Reversal',
                    reliability: 'High',
                    description: 'A three-candle bearish reversal pattern that appears at the top of an uptrend, signaling a potential trend reversal.',
                    signals: [
                        'First candle: Long bullish candle',
                        'Second candle: Small-bodied candle (star)',
                        'Third candle: Long bearish candle',
                        'Third candle closes below midpoint of first'
                    ],
                    tradingStrategy: 'Enter short after the third candle confirms. Stop loss above the star candle. Target previous support levels.',
                    svg: this.generateEveningStarSVG()
                },
                {
                    id: 'rising-wedge',
                    name: 'Rising Wedge',
                    type: 'Bearish Reversal',
                    reliability: 'Medium',
                    description: 'A bearish pattern where both support and resistance lines slope upward, but converge, indicating weakening momentum.',
                    signals: [
                        'Both trendlines slope upward',
                        'Lines converge (narrowing pattern)',
                        'Volume typically decreases',
                        'Breakdown below support line'
                    ],
                    tradingStrategy: 'Short when price breaks below support line. Stop loss above recent high. Target is measured move equal to the widest part of the wedge.',
                    svg: this.generateRisingWedgeSVG()
                }
            ],
            neutral: [
                {
                    id: 'symmetrical-triangle',
                    name: 'Symmetrical Triangle',
                    type: 'Neutral Continuation',
                    reliability: 'Medium',
                    description: 'A continuation pattern where price converges between a descending resistance line and an ascending support line, indicating consolidation.',
                    signals: [
                        'Lower highs and higher lows',
                        'Converging trendlines',
                        'Decreasing volume during formation',
                        'Breakout can be in either direction'
                    ],
                    tradingStrategy: 'Wait for breakout direction. Enter in breakout direction with volume confirmation. Stop loss on opposite side of triangle. Target equals the height of the triangle.',
                    svg: this.generateSymmetricalTriangleSVG()
                },
                {
                    id: 'rectangle',
                    name: 'Rectangle',
                    type: 'Neutral Continuation',
                    reliability: 'Medium',
                    description: 'A consolidation pattern with horizontal support and resistance lines, indicating a trading range before continuation.',
                    signals: [
                        'Horizontal support and resistance',
                        'Price bounces between levels',
                        'At least two touches on each level',
                        'Breakout determines direction'
                    ],
                    tradingStrategy: 'Trade the range or wait for breakout. On breakout, enter in direction of break. Stop loss inside rectangle. Target equals rectangle height.',
                    svg: this.generateRectangleSVG()
                },
                {
                    id: 'pennant',
                    name: 'Pennant',
                    type: 'Neutral Continuation',
                    reliability: 'Medium',
                    description: 'A short-term continuation pattern that forms after a strong move, characterized by converging trendlines forming a small symmetrical triangle.',
                    signals: [
                        'Forms after strong directional move',
                        'Small symmetrical triangle shape',
                        'Typically lasts 1-3 weeks',
                        'Breakout usually continues prior trend'
                    ],
                    tradingStrategy: 'Enter in direction of prior trend on breakout. Stop loss on opposite side of pennant. Target equals the flagpole length.',
                    svg: this.generatePennantSVG()
                }
            ]
        };
    }

    generateInverseHeadShouldersSVG() {
        return `
            <svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bullishGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.2" />
                        <stop offset="100%" style="stop-color:#10b981;stop-opacity:0.05" />
                    </linearGradient>
                </defs>
                <line x1="20" y1="80" x2="280" y2="80" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5,5"/>
                <text x="285" y="83" fill="#94a3b8" font-size="10">Neckline</text>
                <path d="M 20,60 L 60,100 L 100,80 L 140,120 L 180,80 L 220,100 L 260,40" 
                      fill="none" stroke="#10b981" stroke-width="2.5"/>
                <path d="M 20,60 L 60,100 L 100,80 L 140,120 L 180,80 L 220,100 L 260,40 L 260,150 L 20,150 Z" 
                      fill="url(#bullishGradient)" opacity="0.3"/>
                <circle cx="60" cy="100" r="4" fill="#10b981"/>
                <circle cx="140" cy="120" r="4" fill="#10b981"/>
                <circle cx="220" cy="100" r="4" fill="#10b981"/>
                <text x="50" y="135" fill="#10b981" font-size="11" font-weight="600">LS</text>
                <text x="130" y="145" fill="#10b981" font-size="11" font-weight="600">Head</text>
                <text x="210" y="135" fill="#10b981" font-size="11" font-weight="600">RS</text>
                <path d="M 260,40 L 270,35 M 260,40 L 270,45" stroke="#10b981" stroke-width="2" fill="none"/>
            </svg>
        `;
    }

    generateDoubleBottomSVG() {
        return `
            <svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bullishGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.2" />
                        <stop offset="100%" style="stop-color:#10b981;stop-opacity:0.05" />
                    </linearGradient>
                </defs>
                <line x1="20" y1="70" x2="280" y2="70" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5,5"/>
                <path d="M 20,50 L 70,110 L 120,70 L 170,110 L 220,40" 
                      fill="none" stroke="#10b981" stroke-width="2.5"/>
                <path d="M 20,50 L 70,110 L 120,70 L 170,110 L 220,40 L 220,150 L 20,150 Z" 
                      fill="url(#bullishGradient2)" opacity="0.3"/>
                <circle cx="70" cy="110" r="4" fill="#10b981"/>
                <circle cx="170" cy="110" r="4" fill="#10b981"/>
                <text x="60" y="130" fill="#10b981" font-size="11" font-weight="600">Bottom 1</text>
                <text x="155" y="130" fill="#10b981" font-size="11" font-weight="600">Bottom 2</text>
                <path d="M 220,40 L 230,35 M 220,40 L 230,45" stroke="#10b981" stroke-width="2" fill="none"/>
            </svg>
        `;
    }

    generateCupHandleSVG() {
        return `
            <svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bullishGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.2" />
                        <stop offset="100%" style="stop-color:#10b981;stop-opacity:0.05" />
                    </linearGradient>
                </defs>
                <path d="M 20,40 Q 80,120 140,40 L 180,50 L 200,60 L 240,30" 
                      fill="none" stroke="#10b981" stroke-width="2.5"/>
                <path d="M 20,40 Q 80,120 140,40 L 180,50 L 200,60 L 240,30 L 240,150 L 20,150 Z" 
                      fill="url(#bullishGradient3)" opacity="0.3"/>
                <text x="60" y="135" fill="#10b981" font-size="11" font-weight="600">Cup</text>
                <text x="175" y="75" fill="#10b981" font-size="11" font-weight="600">Handle</text>
                <path d="M 240,30 L 250,25 M 240,30 L 250,35" stroke="#10b981" stroke-width="2" fill="none"/>
            </svg>
        `;
    }

    generateAscendingTriangleSVG() {
        return `
            <svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bullishGradient4" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.2" />
                        <stop offset="100%" style="stop-color:#10b981;stop-opacity:0.05" />
                    </linearGradient>
                </defs>
                <line x1="20" y1="50" x2="200" y2="50" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,5"/>
                <line x1="20" y1="120" x2="200" y2="50" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,5"/>
                <path d="M 30,110 L 50,60 L 70,100 L 90,65 L 110,90 L 130,60 L 150,80 L 170,55 L 200,50 L 240,30" 
                      fill="none" stroke="#10b981" stroke-width="2.5"/>
                <path d="M 30,110 L 50,60 L 70,100 L 90,65 L 110,90 L 130,60 L 150,80 L 170,55 L 200,50 L 240,30 L 240,150 L 30,150 Z" 
                      fill="url(#bullishGradient4)" opacity="0.3"/>
                <path d="M 240,30 L 250,25 M 240,30 L 250,35" stroke="#10b981" stroke-width="2" fill="none"/>
            </svg>
        `;
    }

    generateBullishFlagSVG() {
        return `
            <svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bullishGradient5" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.2" />
                        <stop offset="100%" style="stop-color:#10b981;stop-opacity:0.05" />
                    </linearGradient>
                </defs>
                <path d="M 20,120 L 80,40 L 100,55 L 120,50 L 140,65 L 160,60 L 180,75 L 200,70 L 240,30" 
                      fill="none" stroke="#10b981" stroke-width="2.5"/>
                <line x1="100" y1="55" x2="200" y2="70" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
                <line x1="100" y1="75" x2="200" y2="90" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
                <text x="130" y="95" fill="#10b981" font-size="11" font-weight="600">Flag</text>
                <text x="35" y="85" fill="#10b981" font-size="11" font-weight="600">Pole</text>
                <path d="M 240,30 L 250,25 M 240,30 L 250,35" stroke="#10b981" stroke-width="2" fill="none"/>
            </svg>
        `;
    }

    generateMorningStarSVG() {
        return `
            <svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="60" y="40" width="30" height="60" fill="#ef4444" opacity="0.8"/>
                <line x1="75" y1="30" x2="75" y2="110" stroke="#ef4444" stroke-width="2"/>
                <rect x="135" y="85" width="30" height="20" fill="#94a3b8" opacity="0.8"/>
                <line x1="150" y1="75" x2="150" y2="115" stroke="#94a3b8" stroke-width="2"/>
                <rect x="210" y="50" width="30" height="60" fill="#10b981" opacity="0.8"/>
                <line x1="225" y1="40" x2="225" y2="120" stroke="#10b981" stroke-width="2"/>
                <text x="55" y="140" fill="#94a3b8" font-size="10" font-weight="600">Bearish</text>
                <text x="140" y="140" fill="#94a3b8" font-size="10" font-weight="600">Star</text>
                <text x="205" y="140" fill="#94a3b8" font-size="10" font-weight="600">Bullish</text>
            </svg>
        `;
    }

    generateHeadShouldersSVG() {
        return `
            <svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bearishGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#ef4444;stop-opacity:0.05" />
                        <stop offset="100%" style="stop-color:#ef4444;stop-opacity:0.2" />
                    </linearGradient>
                </defs>
                <line x1="20" y1="80" x2="280" y2="80" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5,5"/>
                <path d="M 20,100 L 60,40 L 100,80 L 140,20 L 180,80 L 220,40 L 260,120" 
                      fill="none" stroke="#ef4444" stroke-width="2.5"/>
                <path d="M 20,100 L 60,40 L 100,80 L 140,20 L 180,80 L 220,40 L 260,120 L 260,0 L 20,0 Z" 
                      fill="url(#bearishGradient)" opacity="0.3"/>
                <circle cx="60" cy="40" r="4" fill="#ef4444"/>
                <circle cx="140" cy="20" r="4" fill="#ef4444"/>
                <circle cx="220" cy="40" r="4" fill="#ef4444"/>
                <text x="50" y="30" fill="#ef4444" font-size="11" font-weight="600">LS</text>
                <text x="130" y="15" fill="#ef4444" font-size="11" font-weight="600">Head</text>
                <text x="210" y="30" fill="#ef4444" font-size="11" font-weight="600">RS</text>
                <path d="M 260,120 L 270,125 M 260,120 L 270,115" stroke="#ef4444" stroke-width="2" fill="none"/>
            </svg>
        `;
    }

    generateDoubleTopSVG() {
        return `
            <svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bearishGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#ef4444;stop-opacity:0.05" />
                        <stop offset="100%" style="stop-color:#ef4444;stop-opacity:0.2" />
                    </linearGradient>
                </defs>
                <line x1="20" y1="80" x2="280" y2="80" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5,5"/>
                <path d="M 20,100 L 70,30 L 120,80 L 170,30 L 220,120" 
                      fill="none" stroke="#ef4444" stroke-width="2.5"/>
                <path d="M 20,100 L 70,30 L 120,80 L 170,30 L 220,120 L 220,0 L 20,0 Z" 
                      fill="url(#bearishGradient2)" opacity="0.3"/>
                <circle cx="70" cy="30" r="4" fill="#ef4444"/>
                <circle cx="170" cy="30" r="4" fill="#ef4444"/>
                <text x="60" y="20" fill="#ef4444" font-size="11" font-weight="600">Top 1</text>
                <text x="160" y="20" fill="#ef4444" font-size="11" font-weight="600">Top 2</text>
                <path d="M 220,120 L 230,125 M 220,120 L 230,115" stroke="#ef4444" stroke-width="2" fill="none"/>
            </svg>
        `;
    }

    generateDescendingTriangleSVG() {
        return `
            <svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bearishGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#ef4444;stop-opacity:0.05" />
                        <stop offset="100%" style="stop-color:#ef4444;stop-opacity:0.2" />
                    </linearGradient>
                </defs>
                <line x1="20" y1="100" x2="200" y2="100" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,5"/>
                <line x1="20" y1="30" x2="200" y2="100" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,5"/>
                <path d="M 30,40 L 50,90 L 70,50 L 90,85 L 110,60 L 130,90 L 150,70 L 170,95 L 200,100 L 240,130" 
                      fill="none" stroke="#ef4444" stroke-width="2.5"/>
                <path d="M 30,40 L 50,90 L 70,50 L 90,85 L 110,60 L 130,90 L 150,70 L 170,95 L 200,100 L 240,130 L 240,0 L 30,0 Z" 
                      fill="url(#bearishGradient3)" opacity="0.3"/>
                <path d="M 240,130 L 250,135 M 240,130 L 250,125" stroke="#ef4444" stroke-width="2" fill="none"/>
            </svg>
        `;
    }

    generateBearishFlagSVG() {
        return `
            <svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bearishGradient4" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#ef4444;stop-opacity:0.05" />
                        <stop offset="100%" style="stop-color:#ef4444;stop-opacity:0.2" />
                    </linearGradient>
                </defs>
                <path d="M 20,30 L 80,110 L 100,95 L 120,100 L 140,85 L 160,90 L 180,75 L 200,80 L 240,130" 
                      fill="none" stroke="#ef4444" stroke-width="2.5"/>
                <line x1="100" y1="75" x2="200" y2="60" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
                <line x1="100" y1="95" x2="200" y2="80" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
                <text x="130" y="70" fill="#ef4444" font-size="11" font-weight="600">Flag</text>
                <text x="35" y="75" fill="#ef4444" font-size="11" font-weight="600">Pole</text>
                <path d="M 240,130 L 250,135 M 240,130 L 250,125" stroke="#ef4444" stroke-width="2" fill="none"/>
            </svg>
        `;
    }

    generateEveningStarSVG() {
        return `
            <svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="60" y="50" width="30" height="60" fill="#10b981" opacity="0.8"/>
                <line x1="75" y1="40" x2="75" y2="120" stroke="#10b981" stroke-width="2"/>
                <rect x="135" y="45" width="30" height="20" fill="#94a3b8" opacity="0.8"/>
                <line x1="150" y1="35" x2="150" y2="75" stroke="#94a3b8" stroke-width="2"/>
                <rect x="210" y="40" width="30" height="60" fill="#ef4444" opacity="0.8"/>
                <line x1="225" y1="30" x2="225" y2="110" stroke="#ef4444" stroke-width="2"/>
                <text x="55" y="140" fill="#94a3b8" font-size="10" font-weight="600">Bullish</text>
                <text x="140" y="140" fill="#94a3b8" font-size="10" font-weight="600">Star</text>
                <text x="200" y="140" fill="#94a3b8" font-size="10" font-weight="600">Bearish</text>
            </svg>
        `;
    }

    generateRisingWedgeSVG() {
        return `
            <svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bearishGradient5" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#ef4444;stop-opacity:0.05" />
                        <stop offset="100%" style="stop-color:#ef4444;stop-opacity:0.2" />
                    </linearGradient>
                </defs>
                <line x1="20" y1="100" x2="200" y2="40" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,5"/>
                <line x1="20" y1="60" x2="200" y2="30" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,5"/>
                <path d="M 30,90 L 50,50 L 70,80 L 90,45 L 110,70 L 130,42 L 150,60 L 170,40 L 200,50 L 240,130" 
                      fill="none" stroke="#ef4444" stroke-width="2.5"/>
                <path d="M 240,130 L 250,135 M 240,130 L 250,125" stroke="#ef4444" stroke-width="2" fill="none"/>
            </svg>
        `;
    }

    generateSymmetricalTriangleSVG() {
        return `
            <svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                <line x1="20" y1="30" x2="200" y2="75" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,5"/>
                <line x1="20" y1="120" x2="200" y2="75" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,5"/>
                <path d="M 30,40 L 50,110 L 70,50 L 90,100 L 110,60 L 130,90 L 150,70 L 170,80 L 200,75" 
                      fill="none" stroke="#3b82f6" stroke-width="2.5"/>
                <circle cx="200" cy="75" r="4" fill="#3b82f6"/>
                <text x="210" y="80" fill="#3b82f6" font-size="11" font-weight="600">Breakout</text>
            </svg>
        `;
    }

    generateRectangleSVG() {
        return `
            <svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                <line x1="20" y1="50" x2="220" y2="50" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,5"/>
                <line x1="20" y1="100" x2="220" y2="100" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,5"/>
                <path d="M 30,90 L 50,60 L 70,90 L 90,55 L 110,95 L 130,60 L 150,90 L 170,55 L 190,95 L 210,60" 
                      fill="none" stroke="#3b82f6" stroke-width="2.5"/>
                <text x="230" y="55" fill="#94a3b8" font-size="10" font-weight="600">Resistance</text>
                <text x="230" y="105" fill="#94a3b8" font-size="10" font-weight="600">Support</text>
            </svg>
        `;
    }

    generatePennantSVG() {
        return `
            <svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                <line x1="100" y1="40" x2="200" y2="75" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
                <line x1="100" y1="110" x2="200" y2="75" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
                <path d="M 20,120 L 100,40 L 120,100 L 140,50 L 160,90 L 180,60 L 200,75" 
                      fill="none" stroke="#3b82f6" stroke-width="2.5"/>
                <text x="35" y="135" fill="#3b82f6" font-size="11" font-weight="600">Pole</text>
                <text x="135" y="135" fill="#3b82f6" font-size="11" font-weight="600">Pennant</text>
            </svg>
        `;
    }

    generatePatternsContent() {
        return `
            <div class="patterns-page">
                <div class="page-header">
                    <div class="header-content-wrapper">
                        <div class="header-icon-wrapper">
                            <i data-lucide="trending-up" class="header-icon"></i>
                        </div>
                        <div>
                            <h2>Technical Analysis Patterns</h2>
                            <p>Master chart patterns to identify trading opportunities and market trends</p>
                        </div>
                    </div>
                </div>

                <div class="patterns-filter">
                    <button class="filter-btn active" data-filter="all">
                        <i data-lucide="layout-grid"></i>
                        All Patterns
                    </button>
                    <button class="filter-btn" data-filter="bullish">
                        <i data-lucide="trending-up"></i>
                        Bullish
                    </button>
                    <button class="filter-btn" data-filter="bearish">
                        <i data-lucide="trending-down"></i>
                        Bearish
                    </button>
                    <button class="filter-btn" data-filter="neutral">
                        <i data-lucide="minus"></i>
                        Neutral
                    </button>
                </div>

                ${this.generatePatternSection('bullish', 'Bullish Patterns', 'Patterns indicating potential upward price movement')}
                ${this.generatePatternSection('bearish', 'Bearish Patterns', 'Patterns indicating potential downward price movement')}
                ${this.generatePatternSection('neutral', 'Neutral Patterns', 'Patterns indicating consolidation before continuation')}
            </div>
        `;
    }

    generatePatternSection(category, title, description) {
        const patterns = this.patterns[category];
        const categoryClass = category === 'bullish' ? 'success' : category === 'bearish' ? 'danger' : 'info';
        
        return `
            <div class="pattern-section" data-category="${category}">
                <div class="section-header">
                    <h3 class="section-title ${categoryClass}">${title}</h3>
                    <p class="section-description">${description}</p>
                </div>
                <div class="patterns-grid">
                    ${patterns.map(pattern => this.generatePatternCard(pattern, category)).join('')}
                </div>
            </div>
        `;
    }

    generatePatternCard(pattern, category) {
        const categoryClass = category === 'bullish' ? 'success' : category === 'bearish' ? 'danger' : 'info';
        const reliabilityColor = pattern.reliability === 'High' ? 'success' : 
                                 pattern.reliability === 'Medium-High' ? 'warning' : 'info';
        
        return `
            <div class="pattern-card" data-pattern-id="${pattern.id}">
                <div class="pattern-visual">
                    ${pattern.svg}
                </div>
                <div class="pattern-content">
                    <div class="pattern-header">
                        <h4 class="pattern-name">${pattern.name}</h4>
                        <span class="pattern-badge ${categoryClass}">${pattern.type}</span>
                    </div>
                    <div class="pattern-reliability">
                        <span class="reliability-label">Reliability:</span>
                        <span class="reliability-value ${reliabilityColor}">${pattern.reliability}</span>
                    </div>
                    <p class="pattern-description">${pattern.description}</p>
                    <button class="btn-details" onclick="window.patternsModule.showPatternDetails('${pattern.id}', '${category}')">
                        <i data-lucide="info"></i>
                        View Details
                    </button>
                </div>
            </div>
        `;
    }

    showPatternDetails(patternId, category) {
        const pattern = this.patterns[category].find(p => p.id === patternId);
        if (!pattern) return;

        const categoryClass = category === 'bullish' ? 'success' : category === 'bearish' ? 'danger' : 'info';
        const reliabilityClass = pattern.reliability === 'High' ? 'success' : 
                                 pattern.reliability === 'Medium-High' ? 'warning' : 'warning';
        
        const modalContent = `
            <div class="pattern-modal-content">
                <div class="modal-visual-large">
                    ${pattern.svg}
                </div>
                <div class="modal-details">
                    <div class="modal-header-section">
                        <h3>${pattern.name}</h3>
                        <span class="pattern-badge ${categoryClass}">${pattern.type}</span>
                    </div>
                    
                    <div class="detail-section">
                        <h4><i data-lucide="info"></i> Description</h4>
                        <p>${pattern.description}</p>
                    </div>

                    <div class="detail-section">
                        <h4><i data-lucide="check-circle"></i> Key Signals</h4>
                        <ul class="signals-list">
                            ${pattern.signals.map(signal => `<li>${signal}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="detail-section">
                        <h4><i data-lucide="target"></i> Trading Strategy</h4>
                        <p class="strategy-text">${pattern.tradingStrategy}</p>
                    </div>

                    <div class="reliability-section">
                        <span class="reliability-label">Pattern Reliability:</span>
                        <span class="reliability-badge ${reliabilityClass}">
                            ${pattern.reliability}
                        </span>
                    </div>
                </div>
            </div>
        `;

        const modal = document.getElementById('stock-detail-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        
        if (modal && modalTitle && modalBody) {
            modalTitle.textContent = 'Pattern Details';
            modalBody.innerHTML = modalContent;
            modal.style.display = 'flex';
            
            // Simple scroll lock using only overflow hidden
            document.body.classList.add('modal-open');
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }

    attachEventListeners() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                const sections = document.querySelectorAll('.pattern-section');
                
                sections.forEach(section => {
                    if (filter === 'all' || section.getAttribute('data-category') === filter) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Export the class
window.PatternsModule = PatternsModule;

// Create a global instance that will be set by PageManager
window.patternsModule = null;
