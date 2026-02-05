"use client"

import { useState, useMemo } from 'react';
import { calculateTakeHome } from '@/lib/tax-engine';
import { CalculationInput } from '@/lib/tax-engine/types';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CURRENCY = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });

export function DirectorCalculator() {
    const [input, setInput] = useState<CalculationInput>({
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
    });

    const result = useMemo(() => calculateTakeHome(input), [input]);

    const updateField = (field: keyof CalculationInput, value: number | boolean | string) => {
        setInput(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* LEFT COLUMN: INPUTS */}
            <Card className="lg:col-span-5 shadow-xl shadow-indigo-100/20 border-zinc-200/60 dark:border-zinc-800">
                <CardHeader className="bg-secondary/30 border-b border-border/50">
                    <CardTitle>Configuration</CardTitle>
                    <CardDescription>Enter your limited company details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">

                    <div className="space-y-2">
                        <Label>Tax Year</Label>
                        <Select value={input.taxYear} onValueChange={(v) => updateField('taxYear', v)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2025/26">2025/26</SelectItem>
                                <SelectItem value="2026/27">2026/27 (Preview)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Company Revenue (Excl VAT)</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground">£</span>
                            <Input
                                type="number"
                                value={input.annualRevenue}
                                onChange={(e) => updateField('annualRevenue', Number(e.target.value))}
                                className="pl-7"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-dashed">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Director Salary</Label>
                                <span className="text-xs text-muted-foreground">PA: £12,570</span>
                            </div>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground">£</span>
                                <Input
                                    type="number"
                                    value={input.annualSalary}
                                    onChange={(e) => updateField('annualSalary', Number(e.target.value))}
                                    className="pl-7"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => updateField('annualSalary', 12570)} className="h-7 text-xs">
                                    Optimal (£12,570)
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => updateField('annualSalary', 5000)} className="h-7 text-xs">
                                    Low (£5,000)
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Target Dividends</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground">£</span>
                                <Input
                                    type="number"
                                    value={input.annualDividends}
                                    onChange={(e) => updateField('annualDividends', Number(e.target.value))}
                                    className="pl-7"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-dashed">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Employment Allowance</Label>
                                <p className="text-[0.8rem] text-muted-foreground">Claim £10,500 NIC relief</p>
                            </div>
                            <Switch checked={input.hasEmploymentAllowance} onCheckedChange={(c) => updateField('hasEmploymentAllowance', c)} />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Scottish Taxpayer</Label>
                                <p className="text-[0.8rem] text-muted-foreground">Apply Scottish rates</p>
                            </div>
                            <Switch checked={input.isScottish} onCheckedChange={(c) => updateField('isScottish', c)} />
                        </div>

                        <div className="space-y-2 pt-2">
                            <Label>Student Loan Plan</Label>
                            <Select value={input.studentLoanPlan} onValueChange={(v) => updateField('studentLoanPlan', v)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">No Student Loan</SelectItem>
                                    <SelectItem value="plan1">Plan 1</SelectItem>
                                    <SelectItem value="plan2">Plan 2</SelectItem>
                                    <SelectItem value="plan4">Plan 4</SelectItem>
                                    <SelectItem value="plan5">Plan 5</SelectItem>
                                    <SelectItem value="postgrad">Postgraduate</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                </CardContent>
            </Card>

            {/* RIGHT COLUMN: RESULTS */}
            <div className="lg:col-span-7 space-y-6">

                {/* Main Result Card */}
                <Card className="bg-primary text-primary-foreground shadow-2xl border-none">
                    <CardContent className="p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="space-y-1 text-center md:text-left">
                            <p className="text-primary-foreground/70 font-medium">Estimated Take Home Pay</p>
                            <h2 className="text-5xl font-bold tracking-tight">{CURRENCY.format(result.results.takeHome)}</h2>
                            <p className="text-sm text-primary-foreground/50">
                                Effective Tax Rate: <span className="text-white font-bold">{(result.results.effectiveTaxRate * 100).toFixed(1)}%</span>
                            </p>
                        </div>
                        <div className="text-right space-y-2">
                            <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                                <p className="text-xs uppercase tracking-wider opacity-70">Total Tax Paid</p>
                                <p className="text-xl font-mono font-bold">{CURRENCY.format(result.deductions.totalTaxAndNic)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Breakdown Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Personal Tax</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Row label="Income Tax" value={result.deductions.incomeTax} />
                            <Row label="Employee NIC" value={result.deductions.nicEmployee} />
                            <Row label="Dividend Tax" value={result.deductions.dividendTax} />
                            <Row label="Student Loan" value={result.deductions.studentLoan} />
                            <div className="pt-2 border-t mt-2">
                                <Row label="Total" value={result.deductions.totalPersonalTax} bold />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Company Tax</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Row label="Corporation Tax" value={result.deductions.corporationTax} />
                            <Row label="Employer NIC" value={result.deductions.nicEmployer} />
                            <div className="pt-2 border-t mt-2">
                                <Row label="Total" value={result.deductions.corporationTax + result.deductions.nicEmployer} bold />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="bg-secondary/20 border-dashed">
                    <CardContent className="p-4 flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Company Retained Profit</span>
                        <span className="font-mono font-bold">{CURRENCY.format(result.results.distributableProfitAfterCT)}</span>
                    </CardContent>
                </Card>

            </div>

        </div>
    );
}

function Row({ label, value, bold }: { label: string, value: number, bold?: boolean }) {
    if (value === 0 && !bold) return null;
    return (
        <div className={cn("flex justify-between items-center text-sm", bold && "font-bold text-foreground")}>
            <span className={cn(!bold && "text-muted-foreground")}>{label}</span>
            <span className="font-mono">{CURRENCY.format(value)}</span>
        </div>
    )
}
