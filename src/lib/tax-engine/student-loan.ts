import { CalculationInput } from './types';

// Thresholds for 2025/26 (Approx based on current data, update if Budget changes)
const SL_THRESHOLDS_2025 = {
    plan1: 24990,
    plan2: 27295,
    plan4: 31395, // Scotland
    plan5: 25000,
    postgrad: 21000,
};

// Rates
const SL_RATES = {
    plan1: 0.09,
    plan2: 0.09,
    plan4: 0.09,
    plan5: 0.09,
    postgrad: 0.06,
};

export function calculateStudentLoan(
    totalIncome: number, // Salary + Dividends + Other (Generally unearned income > 2000 counts, simplified here to include all for worst case planning)
    plan: CalculationInput['studentLoanPlan']
): number {
    if (plan === 'none') return 0;

    const threshold = SL_THRESHOLDS_2025[plan];
    const rate = SL_RATES[plan];

    if (totalIncome <= threshold) return 0;

    const repayment = (totalIncome - threshold) * rate;
    return Math.floor(repayment); // HMRC usually rounds down to pound
}
