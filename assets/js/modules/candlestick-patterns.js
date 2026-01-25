class CandlestickPatternsModule {
    constructor() {
        this.patterns = this.initializePatterns();
    }

    initializePatterns() {
        return {
            bullish: [
                {
                    id: 'hammer',
                    name: 'Hammer',
                    type: 'Bullish Reversal',
                    reliability: 'High',
                    description: 'A single candlestick pattern with a small body at the top and a long lower shadow (at least twice the body length). Indicates potential reversal from downtrend.',
                    signals: [
                        'Small real body at upper end of range',
                        'Long lower shadow (2-3x body length)',
                        'Little or no upper shadow',
                        'Appears after a downtrend'
                    ],
                    tradingStrategy: 'Enter long position after confirmation candle closes above hammer high. Stop loss below hammer low. Target previous resistance levels.',
                    svg: this.generateHammerSVG()
                },
                {
                    id: 'inverted-hammer',
                    name: 'Inverted Hammer',
                    type: 'Bullish Reversal',
                    reliability: 'Medium-High',
                    description: 'A single candlestick with a small body at the bottom and a long upper shadow. Signals potential reversal when found at the bottom of a downtrend.',
                    signals: [
                        'Small real body at lower end of range',
                        'Long upper shadow (2-3x body length)',
                        'Little or no lower shadow',
                        'Requires bullish confirmation'
                    ],
                    tradingStrategy: 'Wait for bullish confirmation candle. Enter long when next candle closes above inverted hammer high. Stop loss below the low.',
                    svg: this.generateInvertedHammerSVG()
                },
                {
                    id: 'bullish-engulfing',
                    name: 'Bullish Engulfing',
                    type: 'Bullish Reversal',
                    reliability: 'High',
                    description: 'A two-candle pattern where a large bullish candle completely engulfs the previous bearish candle. Strong reversal signal.',
                    signals: [
                        'First candle is bearish',
                        'Second candle is bullish and larger',
                        'Second candle body engulfs first',
                        'Appears after downtrend'
                    ],
                    tradingStrategy: 'Enter long after engulfing candle closes. Stop loss below the low of the pattern. Target equals pattern height projected upward.',
                    svg: this.generateBullishEngulfingSVG()
                },
                {
                    id: 'morning-star',
                    name: 'Morning Star',
                    type: 'Bullish Reversal',
                    reliability: 'High',
                    description: 'A three-candle pattern signaling the end of a downtrend. Consists of a bearish candle, a small-bodied candle, and a bullish candle.',
                    signals: [
                        'First candle: Long bearish',
                        'Second candle: Small body (star)',
                        'Third candle: Long bullish',
                        'Third closes above first midpoint'
                    ],
                    tradingStrategy: 'Enter long after third candle confirms. Stop loss below star candle low. Target previous resistance or measured move.',
                    svg: this.generateMorningStarSVG()
                },
                {
                    id: 'piercing-line',
                    name: 'Piercing Line',
                    type: 'Bullish Reversal',
                    reliability: 'Medium-High',
                    description: 'A two-candle pattern where a bullish candle opens below the previous bearish close and closes above its midpoint.',
                    signals: [
                        'First candle is bearish',
                        'Second opens below first close',
                        'Second closes above first midpoint',
                        'Strong buying pressure'
                    ],
                    tradingStrategy: 'Enter long after pattern completes. Stop loss below second candle low. Target previous swing high.',
                    svg: this.generatePiercingLineSVG()
                },
                {
                    id: 'three-white-soldiers',
                    name: 'Three White Soldiers',
                    type: 'Bullish Reversal',
                    reliability: 'High',
                    description: 'Three consecutive long bullish candles with higher closes, indicating strong buying momentum.',
                    signals: [
                        'Three consecutive bullish candles',
                        'Each opens within previous body',
                        'Each closes near its high',
                        'Progressive upward movement'
                    ],
                    tradingStrategy: 'Enter on pullback after pattern. Stop loss below first candle low. Watch for overbought conditions.',
                    svg: this.generateThreeWhiteSoldiersSVG()
                },
                {
                    id: 'bullish-harami',
                    name: 'Bullish Harami',
                    type: 'Bullish Reversal',
                    reliability: 'Medium',
                    description: 'A two-candle pattern where a small bullish candle is contained within the previous large bearish candle.',
                    signals: [
                        'First candle is large bearish',
                        'Second candle is small bullish',
                        'Second contained within first',
                        'Indicates trend exhaustion'
                    ],
                    tradingStrategy: 'Wait for confirmation. Enter long when price breaks above pattern high. Stop loss below pattern low.',
                    svg: this.generateBullishHaramiSVG()
                },
                {
                    id: 'tweezer-bottom',
                    name: 'Tweezer Bottom',
                    type: 'Bullish Reversal',
                    reliability: 'Medium',
                    description: 'Two or more candles with matching lows, indicating strong support and potential reversal.',
                    signals: [
                        'Two consecutive candles',
                        'Matching or near-matching lows',
                        'First candle bearish, second bullish',
                        'Shows support level'
                    ],
                    tradingStrategy: 'Enter after bullish confirmation. Stop loss below tweezer lows. Target previous resistance.',
                    svg: this.generateTweezerBottomSVG()
                }
            ],
            bearish: [
                {
                    id: 'shooting-star',
                    name: 'Shooting Star',
                    type: 'Bearish Reversal',
                    reliability: 'High',
                    description: 'A single candlestick with a small body at the bottom and a long upper shadow. Indicates potential reversal from uptrend.',
                    signals: [
                        'Small real body at lower end',
                        'Long upper shadow (2-3x body)',
                        'Little or no lower shadow',
                        'Appears after uptrend'
                    ],
                    tradingStrategy: 'Enter short after confirmation candle closes below shooting star low. Stop loss above high. Target support levels.',
                    svg: this.generateShootingStarSVG()
                },
                {
                    id: 'hanging-man',
                    name: 'Hanging Man',
                    type: 'Bearish Reversal',
                    reliability: 'Medium-High',
                    description: 'Similar to hammer but appears at top of uptrend. Small body at top with long lower shadow signals potential reversal.',
                    signals: [
                        'Small body at upper range',
                        'Long lower shadow',
                        'Appears after uptrend',
                        'Requires bearish confirmation'
                    ],
                    tradingStrategy: 'Wait for bearish confirmation. Enter short when next candle closes below hanging man low. Stop loss above high.',
                    svg: this.generateHangingManSVG()
                },
                {
                    id: 'bearish-engulfing',
                    name: 'Bearish Engulfing',
                    type: 'Bearish Reversal',
                    reliability: 'High',
                    description: 'A two-candle pattern where a large bearish candle completely engulfs the previous bullish candle.',
                    signals: [
                        'First candle is bullish',
                        'Second candle is bearish and larger',
                        'Second body engulfs first',
                        'Appears after uptrend'
                    ],
                    tradingStrategy: 'Enter short after engulfing candle closes. Stop loss above pattern high. Target equals pattern height projected down.',
                    svg: this.generateBearishEngulfingSVG()
                },
                {
                    id: 'evening-star',
                    name: 'Evening Star',
                    type: 'Bearish Reversal',
                    reliability: 'High',
                    description: 'A three-candle pattern signaling the end of an uptrend. Consists of a bullish candle, a small-bodied candle, and a bearish candle.',
                    signals: [
                        'First candle: Long bullish',
                        'Second candle: Small body (star)',
                        'Third candle: Long bearish',
                        'Third closes below first midpoint'
                    ],
                    tradingStrategy: 'Enter short after third candle confirms. Stop loss above star candle high. Target previous support levels.',
                    svg: this.generateEveningStarSVG()
                },
                {
                    id: 'dark-cloud-cover',
                    name: 'Dark Cloud Cover',
                    type: 'Bearish Reversal',
                    reliability: 'Medium-High',
                    description: 'A two-candle pattern where a bearish candle opens above the previous bullish close and closes below its midpoint.',
                    signals: [
                        'First candle is bullish',
                        'Second opens above first close',
                        'Second closes below first midpoint',
                        'Strong selling pressure'
                    ],
                    tradingStrategy: 'Enter short after pattern completes. Stop loss above second candle high. Target previous swing low.',
                    svg: this.generateDarkCloudCoverSVG()
                },
                {
                    id: 'three-black-crows',
                    name: 'Three Black Crows',
                    type: 'Bearish Reversal',
                    reliability: 'High',
                    description: 'Three consecutive long bearish candles with lower closes, indicating strong selling momentum.',
                    signals: [
                        'Three consecutive bearish candles',
                        'Each opens within previous body',
                        'Each closes near its low',
                        'Progressive downward movement'
                    ],
                    tradingStrategy: 'Enter on bounce after pattern. Stop loss above first candle high. Watch for oversold conditions.',
                    svg: this.generateThreeBlackCrowsSVG()
                },
                {
                    id: 'bearish-harami',
                    name: 'Bearish Harami',
                    type: 'Bearish Reversal',
                    reliability: 'Medium',
                    description: 'A two-candle pattern where a small bearish candle is contained within the previous large bullish candle.',
                    signals: [
                        'First candle is large bullish',
                        'Second candle is small bearish',
                        'Second contained within first',
                        'Indicates trend exhaustion'
                    ],
                    tradingStrategy: 'Wait for confirmation. Enter short when price breaks below pattern low. Stop loss above pattern high.',
                    svg: this.generateBearishHaramiSVG()
                },
                {
                    id: 'tweezer-top',
                    name: 'Tweezer Top',
                    type: 'Bearish Reversal',
                    reliability: 'Medium',
                    description: 'Two or more candles with matching highs, indicating strong resistance and potential reversal.',
                    signals: [
                        'Two consecutive candles',
                        'Matching or near-matching highs',
                        'First candle bullish, second bearish',
                        'Shows resistance level'
                    ],
                    tradingStrategy: 'Enter after bearish confirmation. Stop loss above tweezer highs. Target previous support.',
                    svg: this.generateTweezerTopSVG()
                }
            ],
            continuation: [
                {
                    id: 'rising-three-methods',
                    name: 'Rising Three Methods',
                    type: 'Bullish Continuation',
                    reliability: 'Medium-High',
                    description: 'A five-candle pattern showing a brief consolidation within an uptrend before continuation.',
                    signals: [
                        'Long bullish candle',
                        'Three small bearish candles',
                        'Fifth candle long bullish',
                        'Consolidation within first candle range'
                    ],
                    tradingStrategy: 'Enter long on fifth candle close. Stop loss below consolidation low. Target measured move from first candle.',
                    svg: this.generateRisingThreeMethodsSVG()
                },
                {
                    id: 'falling-three-methods',
                    name: 'Falling Three Methods',
                    type: 'Bearish Continuation',
                    reliability: 'Medium-High',
                    description: 'A five-candle pattern showing a brief consolidation within a downtrend before continuation.',
                    signals: [
                        'Long bearish candle',
                        'Three small bullish candles',
                        'Fifth candle long bearish',
                        'Consolidation within first candle range'
                    ],
                    tradingStrategy: 'Enter short on fifth candle close. Stop loss above consolidation high. Target measured move from first candle.',
                    svg: this.generateFallingThreeMethodsSVG()
                },
                {
                    id: 'upside-tasuki-gap',
                    name: 'Upside Tasuki Gap',
                    type: 'Bullish Continuation',
                    reliability: 'Medium',
                    description: 'A three-candle pattern with a gap up followed by a bearish candle that closes within the gap.',
                    signals: [
                        'Two bullish candles with gap',
                        'Third candle bearish',
                        'Third closes within gap',
                        'Uptrend continuation signal'
                    ],
                    tradingStrategy: 'Enter long after pattern completes. Stop loss below third candle low. Target continuation of uptrend.',
                    svg: this.generateUpsideTasukiGapSVG()
                },
                {
                    id: 'downside-tasuki-gap',
                    name: 'Downside Tasuki Gap',
                    type: 'Bearish Continuation',
                    reliability: 'Medium',
                    description: 'A three-candle pattern with a gap down followed by a bullish candle that closes within the gap.',
                    signals: [
                        'Two bearish candles with gap',
                        'Third candle bullish',
                        'Third closes within gap',
                        'Downtrend continuation signal'
                    ],
                    tradingStrategy: 'Enter short after pattern completes. Stop loss above third candle high. Target continuation of downtrend.',
                    svg: this.generateDownsideTasukiGapSVG()
                }
            ],
            neutral: [
                {
                    id: 'doji',
                    name: 'Doji',
                    type: 'Neutral/Reversal',
                    reliability: 'Medium',
                    description: 'A single candle where open and close are virtually equal, indicating indecision in the market.',
                    signals: [
                        'Open equals close (or very close)',
                        'Can have upper and lower shadows',
                        'Indicates market indecision',
                        'Context determines direction'
                    ],
                    tradingStrategy: 'Wait for confirmation candle. Trade in direction of confirmation. Stop loss beyond doji range.',
                    svg: this.generateDojiSVG()
                },
                {
                    id: 'spinning-top',
                    name: 'Spinning Top',
                    type: 'Neutral',
                    reliability: 'Low-Medium',
                    description: 'A candle with a small body and long shadows on both sides, showing indecision and potential reversal.',
                    signals: [
                        'Small real body',
                        'Long upper and lower shadows',
                        'Shows indecision',
                        'Can signal trend change'
                    ],
                    tradingStrategy: 'Wait for directional confirmation. Trade breakout direction. Use tight stops.',
                    svg: this.generateSpinningTopSVG()
                },
                {
                    id: 'high-wave',
                    name: 'High Wave',
                    type: 'Neutral',
                    reliability: 'Medium',
                    description: 'Similar to spinning top but with extremely long shadows, indicating high volatility and uncertainty.',
                    signals: [
                        'Very small body',
                        'Extremely long shadows',
                        'High volatility',
                        'Major indecision'
                    ],
                    tradingStrategy: 'Avoid trading until clear direction emerges. Wait for strong confirmation candle.',
                    svg: this.generateHighWaveSVG()
                }
            ]
        };
    }

    generateHammerSVG() {
        return `
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="40" y="40" width="20" height="15" fill="#10b981" opacity="0.9"/>
                <line x1="50" y1="55" x2="50" y2="130" stroke="#10b981" stroke-width="3"/>
                <text x="50" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Hammer</text>
            </svg>
        `;
    }

    generateInvertedHammerSVG() {
        return `
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="40" y="95" width="20" height="15" fill="#10b981" opacity="0.9"/>
                <line x1="50" y1="20" x2="50" y2="95" stroke="#10b981" stroke-width="3"/>
                <text x="50" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Inv. Hammer</text>
            </svg>
        `;
    }

    generateBullishEngulfingSVG() {
        return `
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="60" width="15" height="30" fill="#ef4444" opacity="0.9"/>
                <line x1="32.5" y1="50" x2="32.5" y2="100" stroke="#ef4444" stroke-width="2"/>
                <rect x="60" y="40" width="15" height="60" fill="#10b981" opacity="0.9"/>
                <line x1="67.5" y1="30" x2="67.5" y2="110" stroke="#10b981" stroke-width="2"/>
                <text x="50" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Bull Engulf</text>
            </svg>
        `;
    }

    generateMorningStarSVG() {
        return `
            <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="40" width="20" height="50" fill="#ef4444" opacity="0.9"/>
                <line x1="30" y1="30" x2="30" y2="100" stroke="#ef4444" stroke-width="2"/>
                <rect x="65" y="75" width="20" height="15" fill="#94a3b8" opacity="0.9"/>
                <line x1="75" y1="65" x2="75" y2="100" stroke="#94a3b8" stroke-width="2"/>
                <rect x="110" y="40" width="20" height="50" fill="#10b981" opacity="0.9"/>
                <line x1="120" y1="30" x2="120" y2="100" stroke="#10b981" stroke-width="2"/>
                <text x="75" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Morning Star</text>
            </svg>
        `;
    }

    generatePiercingLineSVG() {
        return `
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="40" width="15" height="50" fill="#ef4444" opacity="0.9"/>
                <line x1="32.5" y1="30" x2="32.5" y2="100" stroke="#ef4444" stroke-width="2"/>
                <rect x="60" y="55" width="15" height="45" fill="#10b981" opacity="0.9"/>
                <line x1="67.5" y1="45" x2="67.5" y2="110" stroke="#10b981" stroke-width="2"/>
                <text x="50" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Piercing</text>
            </svg>
        `;
    }

    generateThreeWhiteSoldiersSVG() {
        return `
            <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="70" width="20" height="40" fill="#10b981" opacity="0.9"/>
                <line x1="25" y1="60" x2="25" y2="115" stroke="#10b981" stroke-width="2"/>
                <rect x="55" y="50" width="20" height="40" fill="#10b981" opacity="0.9"/>
                <line x1="65" y1="40" x2="65" y2="95" stroke="#10b981" stroke-width="2"/>
                <rect x="95" y="30" width="20" height="40" fill="#10b981" opacity="0.9"/>
                <line x1="105" y1="20" x2="105" y2="75" stroke="#10b981" stroke-width="2"/>
                <text x="75" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">3 White Soldiers</text>
            </svg>
        `;
    }

    generateBullishHaramiSVG() {
        return `
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="30" y="30" width="20" height="70" fill="#ef4444" opacity="0.9"/>
                <line x1="40" y1="20" x2="40" y2="110" stroke="#ef4444" stroke-width="2"/>
                <rect x="55" y="60" width="15" height="20" fill="#10b981" opacity="0.9"/>
                <line x1="62.5" y1="50" x2="62.5" y2="85" stroke="#10b981" stroke-width="2"/>
                <text x="50" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Bull Harami</text>
            </svg>
        `;
    }

    generateTweezerBottomSVG() {
        return `
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="50" width="15" height="50" fill="#ef4444" opacity="0.9"/>
                <line x1="32.5" y1="40" x2="32.5" y2="110" stroke="#ef4444" stroke-width="2"/>
                <rect x="60" y="60" width="15" height="40" fill="#10b981" opacity="0.9"/>
                <line x1="67.5" y1="50" x2="67.5" y2="110" stroke="#10b981" stroke-width="2"/>
                <line x1="20" y1="110" x2="80" y2="110" stroke="#3b82f6" stroke-width="2" stroke-dasharray="3,3"/>
                <text x="50" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Tweezer Bot</text>
            </svg>
        `;
    }

    generateShootingStarSVG() {
        return `
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="40" y="95" width="20" height="15" fill="#ef4444" opacity="0.9"/>
                <line x1="50" y1="20" x2="50" y2="95" stroke="#ef4444" stroke-width="3"/>
                <text x="50" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Shooting Star</text>
            </svg>
        `;
    }

    generateHangingManSVG() {
        return `
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="40" y="40" width="20" height="15" fill="#ef4444" opacity="0.9"/>
                <line x1="50" y1="55" x2="50" y2="130" stroke="#ef4444" stroke-width="3"/>
                <text x="50" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Hanging Man</text>
            </svg>
        `;
    }

    generateBearishEngulfingSVG() {
        return `
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="60" width="15" height="30" fill="#10b981" opacity="0.9"/>
                <line x1="32.5" y1="50" x2="32.5" y2="100" stroke="#10b981" stroke-width="2"/>
                <rect x="60" y="40" width="15" height="60" fill="#ef4444" opacity="0.9"/>
                <line x1="67.5" y1="30" x2="67.5" y2="110" stroke="#ef4444" stroke-width="2"/>
                <text x="50" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Bear Engulf</text>
            </svg>
        `;
    }

    generateEveningStarSVG() {
        return `
            <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="50" width="20" height="50" fill="#10b981" opacity="0.9"/>
                <line x1="30" y1="40" x2="30" y2="110" stroke="#10b981" stroke-width="2"/>
                <rect x="65" y="35" width="20" height="15" fill="#94a3b8" opacity="0.9"/>
                <line x1="75" y1="25" x2="75" y2="60" stroke="#94a3b8" stroke-width="2"/>
                <rect x="110" y="50" width="20" height="50" fill="#ef4444" opacity="0.9"/>
                <line x1="120" y1="40" x2="120" y2="110" stroke="#ef4444" stroke-width="2"/>
                <text x="75" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Evening Star</text>
            </svg>
        `;
    }

    generateDarkCloudCoverSVG() {
        return `
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="60" width="15" height="50" fill="#10b981" opacity="0.9"/>
                <line x1="32.5" y1="50" x2="32.5" y2="120" stroke="#10b981" stroke-width="2"/>
                <rect x="60" y="45" width="15" height="45" fill="#ef4444" opacity="0.9"/>
                <line x1="67.5" y1="35" x2="67.5" y2="100" stroke="#ef4444" stroke-width="2"/>
                <text x="50" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Dark Cloud</text>
            </svg>
        `;
    }

    generateThreeBlackCrowsSVG() {
        return `
            <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="30" width="20" height="40" fill="#ef4444" opacity="0.9"/>
                <line x1="25" y1="20" x2="25" y2="75" stroke="#ef4444" stroke-width="2"/>
                <rect x="55" y="50" width="20" height="40" fill="#ef4444" opacity="0.9"/>
                <line x1="65" y1="40" x2="65" y2="95" stroke="#ef4444" stroke-width="2"/>
                <rect x="95" y="70" width="20" height="40" fill="#ef4444" opacity="0.9"/>
                <line x1="105" y1="60" x2="105" y2="115" stroke="#ef4444" stroke-width="2"/>
                <text x="75" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">3 Black Crows</text>
            </svg>
        `;
    }

    generateBearishHaramiSVG() {
        return `
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="30" y="30" width="20" height="70" fill="#10b981" opacity="0.9"/>
                <line x1="40" y1="20" x2="40" y2="110" stroke="#10b981" stroke-width="2"/>
                <rect x="55" y="60" width="15" height="20" fill="#ef4444" opacity="0.9"/>
                <line x1="62.5" y1="50" x2="62.5" y2="85" stroke="#ef4444" stroke-width="2"/>
                <text x="50" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Bear Harami</text>
            </svg>
        `;
    }

    generateTweezerTopSVG() {
        return `
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="60" width="15" height="40" fill="#10b981" opacity="0.9"/>
                <line x1="32.5" y1="40" x2="32.5" y2="110" stroke="#10b981" stroke-width="2"/>
                <rect x="60" y="50" width="15" height="50" fill="#ef4444" opacity="0.9"/>
                <line x1="67.5" y1="40" x2="67.5" y2="110" stroke="#ef4444" stroke-width="2"/>
                <line x1="20" y1="40" x2="80" y2="40" stroke="#3b82f6" stroke-width="2" stroke-dasharray="3,3"/>
                <text x="50" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Tweezer Top</text>
            </svg>
        `;
    }

    generateRisingThreeMethodsSVG() {
        return `
            <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="50" width="20" height="60" fill="#10b981" opacity="0.9"/>
                <line x1="30" y1="40" x2="30" y2="120" stroke="#10b981" stroke-width="2"/>
                <rect x="60" y="75" width="15" height="20" fill="#ef4444" opacity="0.8"/>
                <rect x="90" y="70" width="15" height="25" fill="#ef4444" opacity="0.8"/>
                <rect x="120" y="72" width="15" height="23" fill="#ef4444" opacity="0.8"/>
                <rect x="155" y="45" width="20" height="65" fill="#10b981" opacity="0.9"/>
                <line x1="165" y1="35" x2="165" y2="120" stroke="#10b981" stroke-width="2"/>
                <text x="100" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Rising 3 Methods</text>
            </svg>
        `;
    }

    generateFallingThreeMethodsSVG() {
        return `
            <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="30" width="20" height="60" fill="#ef4444" opacity="0.9"/>
                <line x1="30" y1="20" x2="30" y2="100" stroke="#ef4444" stroke-width="2"/>
                <rect x="60" y="55" width="15" height="20" fill="#10b981" opacity="0.8"/>
                <rect x="90" y="50" width="15" height="25" fill="#10b981" opacity="0.8"/>
                <rect x="120" y="52" width="15" height="23" fill="#10b981" opacity="0.8"/>
                <rect x="155" y="40" width="20" height="65" fill="#ef4444" opacity="0.9"/>
                <line x1="165" y1="30" x2="165" y2="115" stroke="#ef4444" stroke-width="2"/>
                <text x="100" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Falling 3 Methods</text>
            </svg>
        `;
    }

    generateUpsideTasukiGapSVG() {
        return `
            <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="70" width="20" height="40" fill="#10b981" opacity="0.9"/>
                <line x1="30" y1="60" x2="30" y2="115" stroke="#10b981" stroke-width="2"/>
                <rect x="65" y="40" width="20" height="35" fill="#10b981" opacity="0.9"/>
                <line x1="75" y1="30" x2="75" y2="80" stroke="#10b981" stroke-width="2"/>
                <rect x="110" y="55" width="20" height="30" fill="#ef4444" opacity="0.9"/>
                <line x1="120" y1="45" x2="120" y2="90" stroke="#ef4444" stroke-width="2"/>
                <text x="75" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Upside Tasuki</text>
            </svg>
        `;
    }

    generateDownsideTasukiGapSVG() {
        return `
            <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="30" width="20" height="40" fill="#ef4444" opacity="0.9"/>
                <line x1="30" y1="20" x2="30" y2="75" stroke="#ef4444" stroke-width="2"/>
                <rect x="65" y="60" width="20" height="35" fill="#ef4444" opacity="0.9"/>
                <line x1="75" y1="50" x2="75" y2="100" stroke="#ef4444" stroke-width="2"/>
                <rect x="110" y="50" width="20" height="30" fill="#10b981" opacity="0.9"/>
                <line x1="120" y1="40" x2="120" y2="85" stroke="#10b981" stroke-width="2"/>
                <text x="75" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Downside Tasuki</text>
            </svg>
        `;
    }

    generateDojiSVG() {
        return `
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                <line x1="50" y1="30" x2="50" y2="110" stroke="#94a3b8" stroke-width="3"/>
                <line x1="45" y1="70" x2="55" y2="70" stroke="#94a3b8" stroke-width="4"/>
                <text x="50" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Doji</text>
            </svg>
        `;
    }

    generateSpinningTopSVG() {
        return `
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="42" y="65" width="16" height="20" fill="#3b82f6" opacity="0.9"/>
                <line x1="50" y1="30" x2="50" y2="110" stroke="#3b82f6" stroke-width="3"/>
                <text x="50" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Spinning Top</text>
            </svg>
        `;
    }

    generateHighWaveSVG() {
        return `
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="44" y="68" width="12" height="14" fill="#3b82f6" opacity="0.9"/>
                <line x1="50" y1="20" x2="50" y2="120" stroke="#3b82f6" stroke-width="3"/>
                <text x="50" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">High Wave</text>
            </svg>
        `;
    }

    generateCandlestickPatternsContent() {
        return `
            <div class="candlestick-patterns-page">
                <div class="page-header">
                    <div class="header-content-wrapper">
                        <div class="header-icon-wrapper">
                            <i data-lucide="candlestick-chart" class="header-icon"></i>
                        </div>
                        <div>
                            <h2>Candlestick Patterns</h2>
                            <p>Master candlestick patterns to identify price action signals and market sentiment</p>
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
                    <button class="filter-btn" data-filter="continuation">
                        <i data-lucide="arrow-right"></i>
                        Continuation
                    </button>
                    <button class="filter-btn" data-filter="neutral">
                        <i data-lucide="minus"></i>
                        Neutral
                    </button>
                </div>

                ${this.generatePatternSection('bullish', 'Bullish Candlestick Patterns', 'Patterns indicating potential upward price movement')}
                ${this.generatePatternSection('bearish', 'Bearish Candlestick Patterns', 'Patterns indicating potential downward price movement')}
                ${this.generatePatternSection('continuation', 'Continuation Patterns', 'Patterns indicating trend continuation')}
                ${this.generatePatternSection('neutral', 'Neutral Patterns', 'Patterns indicating market indecision')}
            </div>
        `;
    }

    generatePatternSection(category, title, description) {
        const patterns = this.patterns[category];
        const categoryClass = category === 'bullish' ? 'success' : 
                             category === 'bearish' ? 'danger' : 
                             category === 'continuation' ? 'info' : 'warning';
        
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
        const categoryClass = category === 'bullish' ? 'success' : 
                             category === 'bearish' ? 'danger' : 
                             category === 'continuation' ? 'info' : 'warning';
        const reliabilityColor = pattern.reliability === 'High' ? 'success' : 
                                 pattern.reliability === 'Medium-High' ? 'warning' : 
                                 pattern.reliability === 'Medium' ? 'info' : 'warning';
        
        return `
            <div class="pattern-card" data-pattern-id="${pattern.id}">
                <div class="pattern-visual">
                    ${pattern.svg}
                </div>
                <div class="pattern-info">
                    <div class="pattern-header">
                        <h4 class="pattern-name">${pattern.name}</h4>
                        <span class="pattern-badge ${categoryClass}">${pattern.type}</span>
                    </div>
                    <div class="pattern-reliability">
                        <span class="reliability-label">Reliability:</span>
                        <span class="reliability-value ${reliabilityColor}">${pattern.reliability}</span>
                    </div>
                    <p class="pattern-description">${pattern.description}</p>
                    <div class="pattern-details">
                        <h5>Key Signals:</h5>
                        <ul class="pattern-signals">
                            ${pattern.signals.map(signal => `<li>${signal}</li>`).join('')}
                        </ul>
                        <h5>Trading Strategy:</h5>
                        <p class="pattern-strategy">${pattern.tradingStrategy}</p>
                    </div>
                </div>
            </div>
        `;
    }

    initializeFilters() {
        const filterButtons = document.querySelectorAll('.patterns-filter .filter-btn');
        const patternSections = document.querySelectorAll('.pattern-section');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                patternSections.forEach(section => {
                    if (filter === 'all') {
                        section.style.display = 'block';
                    } else {
                        const category = section.getAttribute('data-category');
                        section.style.display = category === filter ? 'block' : 'none';
                    }
                });
            });
        });
    }
}

if (typeof window !== 'undefined') {
    window.CandlestickPatternsModule = CandlestickPatternsModule;
}
