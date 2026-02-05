import { TAX_CONFIG } from './config';
import { CalculationInput } from './types';

export function calculateIncomeTax(input: CalculationInput, taxableIncome: number) {
    const config = TAX_CONFIG['2025/26']; // Default to 2025/26 for now, can be dynamic

    // 1. Personal Allowance Taper
    let adjustedPersonalAllowance = config.personalAllowance;
    if (taxableIncome > config.personalAllowanceTaperThreshold) {
        const reduction = (taxableIncome - config.personalAllowanceTaperThreshold) / 2;
        adjustedPersonalAllowance = Math.max(0, adjustedPersonalAllowance - reduction);
    }

    // 2. Taxable Income Calculation
    const netTaxableIncome = Math.max(0, taxableIncome - adjustedPersonalAllowance);

    // 3. Apply Bands
    // For simplicity, implementing England/Wales first. Scotland logic can be added if isScottish is true.

    let tax = 0;
    const bands = config.incomeTax.england;

    // Basic Rate Band (Starts at PA, width is basicRateLimit)
    const basicBandWidth = bands.basicRateLimit;
    const higherBandThreshold = bands.higherRateLimit; // 125140 usually (Additional rate start)

    // Note: Hiearchy is Basic -> Higher -> Additional
    // The thresholds are typically defined as:
    // Basic: 0 to 37700 (above PA)
    // Higher: 37701 to 125140 (Total income, so band width is 125140 - 50270)

    // Effective Upper Limit of Basic Band = PA + 37700
    const basicRateUpper = adjustedPersonalAllowance + bands.basicRateLimit;

    // Amount in Basic Band
    const inBasic = Math.min(netTaxableIncome, basicBandWidth);
    tax += inBasic * bands.rates.basic;

    // Amount in Higher Band
    // Starts after Basic Band, goes up to Additional Threshold (125140)
    // But wait, the 125140 is a fixed threshold for Additional Rate, regardless of PA? 
    // Yes, Additional Rate usually starts at fixed £125,140.
    // Higher Band covers the gap.

    const additionalThreshold = bands.higherRateLimit;

    let inHigher = 0;
    let inAdditional = 0;

    if (taxableIncome > basicRateUpper) {
        // Income above basic band
        const remaining = taxableIncome - basicRateUpper;

        // How much space in Higher Band?
        // Higher band ends at 125140.
        // Space = 125140 - basicRateUpper
        const higherBandSpace = Math.max(0, additionalThreshold - basicRateUpper);

        inHigher = Math.min(remaining, higherBandSpace);
        tax += inHigher * bands.rates.higher;

        if (remaining > higherBandSpace) {
            inAdditional = remaining - higherBandSpace;
            tax += inAdditional * bands.rates.additional;
        }
    }

    return {
        tax,
        adjustedPersonalAllowance,
        breakdown: { basic: inBasic, higher: inHigher, additional: inAdditional }
    };
}
