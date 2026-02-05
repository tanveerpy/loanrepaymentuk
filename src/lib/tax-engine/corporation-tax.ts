import { TAX_CONFIG } from './config';
import { CalculationInput } from './types';

export function calculateCorporationTax(input: CalculationInput, employerNic: number) {
    const config = TAX_CONFIG[input.taxYear] || TAX_CONFIG['2025/26'];
    const { corporationTax: ct } = config;

    // Taxable Profit = Revenue - Expenses - Salary - Employer NIC - Pension
    const expenses = input.businessExpenses + input.annualSalary + employerNic + input.employerPensionContribution;
    const taxableProfit = Math.max(0, input.annualRevenue - expenses);

    let tax = 0;

    if (taxableProfit <= ct.smallProfitsThreshold) {
        // Small Profits Rate (19%)
        tax = taxableProfit * ct.rates.small;
    } else if (taxableProfit >= ct.mainRateThreshold) {
        // Main Rate (25%)
        tax = taxableProfit * ct.rates.main;
    } else {
        // Marginal Relief
        // Formula: (Profit * MainRate) - MarginalRelief
        // Relief = (UpperLimit - Profit) * Fraction
        const taxAtMainRate = taxableProfit * ct.rates.main;
        const relief = (ct.mainRateThreshold - taxableProfit) * ct.marginalReliefFraction;
        tax = taxAtMainRate - relief;
    }

    return {
        corporationTax: tax,
        taxableProfit,
        distributableProfit: taxableProfit - tax
    };
}
