import { TAX_CONFIG } from './config';
import { CalculationInput } from './types';

export function calculateDividendTax(
    input: CalculationInput,
    taxableIncomeFromSalaryAndOther: number, // Income already used up bands
    dividends: number
) {
    const config = TAX_CONFIG[input.taxYear] || TAX_CONFIG['2025/26'];
    const { dividendTax, incomeTax } = config;
    const bands = incomeTax.england; // Dividends use UK bands even in Scotland usually? No, dividends are UK wide rates but bands depend on income.
    // Actually, Scotland has different bands for non-savings income. Savings/Dividend income uses UK bands (Basic: 37700, Higher: 37701-125140).
    // Yes, dividend tax uses the UK bands and rates, regardless of residence (mostly). The availability of bands is reduced by non-savings income.

    if (dividends <= 0) return 0;

    let tax = 0;
    let remainingDividends = dividends;

    // 1. Dividend Allowance
    const allowance = dividendTax.allowance;
    const taxFreeDividends = Math.min(remainingDividends, allowance);
    remainingDividends -= taxFreeDividends;

    if (remainingDividends <= 0) return 0;

    // 2. Bands
    // We need to know how much Basic/Higher/Additional band is used by other income.
    // "Other income" (Salary) uses bands first.

    // Total Income for band purposes = taxableIncomeFromSalaryAndOther + Dividends
    // Dividends sit "on top" of other income.

    // Current position in bands
    let currentPos = taxableIncomeFromSalaryAndOther;

    // Note: taxableIncomeFromSalaryAndOther is "Net Taxable Income" (after PA).
    // But bands technically apply to taxable income.
    // If PA is not fully used by Salary, does it reduce Dividend tax?
    // Yes, PA covers dividends if not used by salary.
    // But our 'taxableIncomeFromSalaryAndOther' passed in should be the taxable amount.
    // Wait, if Net Taxable Salary is 0, but Salary was < PA, we need to know the *remaining PA*.
    // It's cleaner to handle Total Income and subtract PA globally?
    // Standard method:
    // 1. Calculate Total Net Taxable Income (Salary - PA + Dividends).
    // 2. Bands apply to this Total.
    // 3. Salary uses lowest bands. Dividends use highest.

    // However, verify PA allocation. PA is usually allocated to Salary first (Non-savings).
    // If Salary < PA, remaining PA reduces Dividends.

    // Redesign: We need 'Used PA' and 'Used Bands' from Income Tax module?
    // Or just recalculate here.

    // Let's rely on the orchestrator to pass "Taxable Dividends" and "Starting Band Position".
    // Actually, standard is:
    // Taxable Salary = Max(0, Salary - PA).
    // Taxable Dividends = Max(0, Dividends - Max(0, PA - Salary)).
    // Bands apply to Taxable Income.
    // Salary sits at bottom. Dividends start at Taxable Salary.

    // So `currentPos` should be `Taxable Salary`.

    const basicLimit = bands.basicRateLimit; // 37700
    const higherLimit = bands.higherRateLimit - 12570; // This is tricky. 
    // Config says higherRateLimit is 125140 (Total income).
    // Taxable limit for Higher Rate ends at 125140 - PA?
    // No, 125140 is the threshold where Additional Rate starts.
    // Taxable Income Threshold for Additional = 125140 - PA? 
    // No, tapering PA starts at 100k. 
    // At 125140, PA is usually 0.
    // So Additional Rate starts at 125140 taxable income?

    // Simpler Model:
    // Basic Band: 0 to 37700.
    // Higher Band: 37700 to 125140 (approx). 
    // Additional: > 125140.

    // We will simply iterate the dividends through the bands starting at `currentPos`.

    // Band 1: Basic
    const basicEnd = 37700;
    if (currentPos < basicEnd) {
        const room = basicEnd - currentPos;
        const inBand = Math.min(remainingDividends, room);
        tax += inBand * dividendTax.rates.basic;
        remainingDividends -= inBand;
        currentPos += inBand;
    }

    // Band 2: Higher
    const higherEnd = 125140; // Simplified
    if (remainingDividends > 0 && currentPos < higherEnd) {
        const room = higherEnd - currentPos;
        const inBand = Math.min(remainingDividends, room);
        tax += inBand * dividendTax.rates.higher;
        remainingDividends -= inBand;
        currentPos += inBand;
    }

    // Band 3: Additional
    if (remainingDividends > 0) {
        tax += remainingDividends * dividendTax.rates.additional;
    }

    return tax;
}
