export const TAX_CONFIG = {
    '2025/26': {
        personalAllowance: 12570,
        personalAllowanceTaperThreshold: 100000,

        incomeTax: {
            england: {
                basicRateLimit: 37700, // Band width (12570 + 37700 = 50270)
                higherRateLimit: 125140, // Threshold
                rates: { basic: 0.20, higher: 0.40, additional: 0.45 }
            },
            scotland: {
                // Updated 2025/26 assumptions (verify with latest budget)
                starter: { threshold: 14876, rate: 0.19 }, // 12571 - 14876
                basic: { threshold: 26561, rate: 0.20 },   // 14877 - 26561
                intermediate: { threshold: 43662, rate: 0.21 }, // 26562 - 43662
                higher: { threshold: 75000, rate: 0.42 }, // 43663 - 75000 
                advanced: { threshold: 125140, rate: 0.45 }, // 75001 - 125140
                top: { rate: 0.48 } // Above 125140
            }
        },

        nic: {
            primaryThreshold: 12570,
            secondaryThreshold: 5000, // Reduced from 9100 for 25/26 per user plan
            upperEarningsLimit: 50270,
            rates: {
                employee: { main: 0.08, additional: 0.02 },
                employer: 0.15
            },
            employmentAllowance: 10500
        },

        corporationTax: {
            smallProfitsThreshold: 50000,
            mainRateThreshold: 250000,
            rates: { small: 0.19, main: 0.25 },
            marginalReliefFraction: 3 / 200
        },

        dividendTax: {
            allowance: 500,
            rates: { basic: 0.0875, higher: 0.3375, additional: 0.3935 }
        }
    },
    // Copy 2025/26 for 2026/27 placeholder to ensure type consistency
    '2026/27': {
        personalAllowance: 12570,
        personalAllowanceTaperThreshold: 100000,

        incomeTax: {
            england: {
                basicRateLimit: 37700,
                higherRateLimit: 125140,
                rates: { basic: 0.20, higher: 0.40, additional: 0.45 }
            },
            scotland: {
                starter: { threshold: 14876, rate: 0.19 },
                basic: { threshold: 26561, rate: 0.20 },
                intermediate: { threshold: 43662, rate: 0.21 },
                higher: { threshold: 75000, rate: 0.42 },
                advanced: { threshold: 125140, rate: 0.45 },
                top: { rate: 0.48 }
            }
        },

        nic: {
            primaryThreshold: 12570,
            secondaryThreshold: 5000,
            upperEarningsLimit: 50270,
            rates: {
                employee: { main: 0.08, additional: 0.02 },
                employer: 0.15
            },
            employmentAllowance: 10500
        },

        corporationTax: {
            smallProfitsThreshold: 50000,
            mainRateThreshold: 250000,
            rates: { small: 0.19, main: 0.25 },
            marginalReliefFraction: 3 / 200
        },

        dividendTax: {
            allowance: 500,
            rates: { basic: 0.0875, higher: 0.3375, additional: 0.3935 }
        }
    }
};
