export type TaxYear = '2025/26' | '2026/27';
export type Region = 'England' | 'Scotland' | 'Wales';

export interface CalculationInput {
    taxYear: TaxYear;
    annualRevenue: number;
    annualSalary: number;
    annualDividends: number;
    otherTaxableIncome: number;
    isDirector: boolean;
    hasEmploymentAllowance: boolean;
    employerPensionContribution: number;
    businessExpenses: number;
    studentLoanPlan: 'none' | 'plan1' | 'plan2' | 'plan4' | 'plan5' | 'postgrad';
    isScottish: boolean;
}

export interface TaxBreakdown {
    inputs: CalculationInput;
    results: {
        grossIncome: number;
        taxableIncome: number;
        totalTax: number;
        takeHome: number;
        effectiveTaxRate: number;
        marginalRate: number;
        distributableProfitAfterCT: number;
    };
    deductions: {
        incomeTax: number;
        nicEmployee: number;
        nicEmployer: number;
        corporationTax: number;
        dividendTax: number;
        studentLoan: number;
        totalPersonalTax: number;
        totalCompanyTax: number;
        totalTaxAndNic: number; // Combined personal + company tax paid related to this director
    };
}
