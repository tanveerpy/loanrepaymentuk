import { TAX_CONFIG } from './config';
import { CalculationInput } from './types';

export function calculateNic(input: CalculationInput) {
    const config = TAX_CONFIG[input.taxYear] || TAX_CONFIG['2025/26'];
    const { nic } = config;

    const salary = input.annualSalary;

    // 1. Employee NIC (Class 1 Primary)
    // Directors use annual earnings period standardly or cumulatively. For annual projection, result is same.
    let employeeNic = 0;

    if (salary > nic.primaryThreshold) {
        const atMainRate = Math.min(salary, nic.upperEarningsLimit) - nic.primaryThreshold;
        employeeNic += atMainRate * nic.rates.employee.main;

        if (salary > nic.upperEarningsLimit) {
            const atAdditional = salary - nic.upperEarningsLimit;
            employeeNic += atAdditional * nic.rates.employee.additional;
        }
    }

    // 2. Employer NIC (Class 1 Secondary)
    let employerNic = 0;
    if (salary > nic.secondaryThreshold) {
        const taxableSalary = salary - nic.secondaryThreshold;
        employerNic = taxableSalary * nic.rates.employer;
    }

    // 3. Employment Allowance
    if (input.hasEmploymentAllowance) {
        // Allowance reduces Employer NIC, cannot go below 0
        employerNic = Math.max(0, employerNic - nic.employmentAllowance);
    }

    return {
        employee: employeeNic,
        employer: employerNic
    };
}
