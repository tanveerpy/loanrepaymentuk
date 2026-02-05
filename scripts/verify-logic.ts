// Basic script to verify tax logic
// Run with: npx tsx scripts/verify-logic.ts

import { calculateTakeHome } from '../src/lib/tax-engine';
import { CalculationInput } from '../src/lib/tax-engine/types';

const BASE_INPUT: CalculationInput = {
    taxYear: '2025/26',
    annualRevenue: 100000,
    annualSalary: 12570,
    annualDividends: 30000,
    otherTaxableIncome: 0,
    isDirector: true,
    hasEmploymentAllowance: true,
    employerPensionContribution: 0,
    businessExpenses: 0,
    studentLoanPlan: 'none',
    isScottish: false
};

console.log("=== VERIFICATION SUITE: 2025/26 ===");

function runTest(name: string, overrides: Partial<CalculationInput>, expected: Partial<{ incomeTax: number, studentLoan: number, dividendTax: number }>) {
    const input = { ...BASE_INPUT, ...overrides };
    const result = calculateTakeHome(input);
    const d = result.deductions;

    console.log(`\nTEST: ${name}`);
    console.log(`Input: Salary £${input.annualSalary}, Divs £${input.annualDividends}, Plan: ${input.studentLoanPlan}`);

    let pass = true;
    if (expected.incomeTax !== undefined) {
        const diff = Math.abs(d.incomeTax - expected.incomeTax);
        if (diff > 1) {
            console.error(`❌ Income Tax: Expected £${expected.incomeTax}, Got £${d.incomeTax}`);
            pass = false;
        } else {
            console.log(`✅ Income Tax: £${d.incomeTax}`);
        }
    }

    if (expected.studentLoan !== undefined) {
        // Allow +/- £1 rounding
        const diff = Math.abs(d.studentLoan - expected.studentLoan);
        if (diff > 1) {
            console.error(`❌ Student Loan: Expected £${expected.studentLoan}, Got £${d.studentLoan}`);
            pass = false;
        } else {
            console.log(`✅ Student Loan: £${d.studentLoan}`);
        }
    }

    if (expected.dividendTax !== undefined) {
        const diff = Math.abs(d.dividendTax - expected.dividendTax);
        if (diff > 1) {
            console.error(`❌ Dividend Tax: Expected £${expected.dividendTax}, Got £${d.dividendTax}`);
            pass = false;
        } else {
            console.log(`✅ Dividend Tax: £${d.dividendTax}`);
        }
    }
}

// 1. Basic No Student Loan
// Salary 12570 (PA) -> Tax 0. 
// Dividends 30000. 
// Taxable: 30000. 
// Allowance 500. Taxable 29500.
// Basic Rate 8.75% of 29500 = 2581.25.
runTest("Basic Director (No SL)", {}, { incomeTax: 0, studentLoan: 0, dividendTax: 2581.25 });

// 2. Plan 1 Student Loan
// Threshold £24,990. Rate 9%.
// Total Income = 12570 + 30000 = 42570.
// Excess = 42570 - 24990 = 17580.
// Repayment = 17580 * 0.09 = 1582.2. Round down to 1582.
runTest("Plan 1 Student Loan", { studentLoanPlan: 'plan1' }, { studentLoan: 1582 });

// 3. Plan 2 Student Loan
// Threshold £27,295. Rate 9%.
// Total Income 42570.
// Excess = 42570 - 27295 = 15275.
// Repayment = 15275 * 0.09 = 1374.75 -> 1374.
runTest("Plan 2 Student Loan", { studentLoanPlan: 'plan2' }, { studentLoan: 1374 });

// 4. Plan 4 (Scotland)
// Threshold £31,395. Rate 9%.
// Total 42570.
// Excess = 42570 - 31395 = 11175.
// Repayment = 11175 * 0.09 = 1005.75 -> 1005.
runTest("Plan 4 Student Loan", { studentLoanPlan: 'plan4' }, { studentLoan: 1005 });

// 5. Postgraduate Loan
// Threshold £21,000. Rate 6%.
// Total 42570.
// Excess = 42570 - 21000 = 21570.
// Repayment = 21570 * 0.06 = 1294.2 -> 1294.
runTest("Postgraduate Loan", { studentLoanPlan: 'postgrad' }, { studentLoan: 1294 });

// 6. Plan 5 (New)
// Threshold £25,000. Rate 9%.
// Excess = 42570 - 25000 = 17570.
// Repayment = 17570 * 0.09 = 1581.3 -> 1581.
runTest("Plan 5 Student Loan", { studentLoanPlan: 'plan5' }, { studentLoan: 1581 });

console.log("\n=== DONE ===");
