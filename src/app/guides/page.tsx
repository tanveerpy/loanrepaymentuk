import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { ArrowRight, BookOpen, TrendingUp, ShieldAlert, Coins } from 'lucide-react';

const GUIDES = [
    // Core Strategy
    {
        slug: 'optimal-salary-2025-26',
        title: 'Optimal Director Salary 2025/26',
        desc: 'The definitive guide: £12,570 vs £5,000 vs £9,100 strategies.',
        date: 'April 2025'
    },
    {
        slug: 'dividend-tax-rates-2025-26',
        title: 'Dividend Tax Rates 2025/26',
        desc: 'Current rates, the £500 allowance, and the 2026 tax hike forecast.',
        date: 'April 2025'
    },
    {
        slug: 'pension-contributions-ltd-company',
        title: 'Pension vs Dividends',
        desc: 'Why Employer Pension Contributions are the ultimate tax hack.',
        date: 'April 2025'
    },
    // Scenarios
    {
        slug: 'salary-vs-dividend-40k-profit',
        title: 'Case Study: £40k Profit',
        desc: 'Why Limited Companies still beat Sole Traders at lower levels.',
        date: 'April 2025'
    },
    {
        slug: 'salary-vs-dividend-60k-profit',
        title: 'Case Study: £60k Profit',
        desc: 'Navigating the Marginal Relief Corporation Tax band (26.5%).',
        date: 'April 2025'
    },
    {
        slug: 'salary-vs-dividend-100k-profit',
        title: 'Case Study: £100k Profit',
        desc: 'How to avoid the 60% Personal Allowance Trap.',
        date: 'April 2025'
    },
    {
        slug: 'salary-vs-dividend-150k-profit',
        title: 'Case Study: £150k Profit',
        desc: 'Additional Rate Tax planning for high earners.',
        date: 'April 2025'
    },
    // Technical & Niches
    {
        slug: 'director-nic-explained',
        title: 'Director National Insurance',
        desc: 'Annual Earnings Period vs Table Method explained.',
        date: 'April 2025'
    },
    {
        slug: 'student-loans-and-dividends',
        title: 'Student Loans & Dividends',
        desc: 'The hidden 9% tax on your investment income.',
        date: 'April 2025'
    },
    {
        slug: 'employment-allowance',
        title: 'Employment Allowance Guide',
        desc: 'How to claim the £10,500 allowance (Spouse Strategy).',
        date: 'April 2025'
    },
    {
        slug: 'scottish-tax-bands-2025-26',
        title: 'Scottish Tax Bands',
        desc: 'Does living in Scotland affect your Dividend Tax?',
        date: 'April 2025'
    },
    {
        slug: 'can-i-pay-dividends-loss',
        title: 'Dividends & Company Losses',
        desc: 'The rules on Distributable Reserves.',
        date: 'April 2025'
    },
    // Compliance (New)
    {
        slug: 'section-455-directors-loan-tax',
        title: 'Section 455 Tax',
        desc: 'The 33.75% penalty on overdrawn director loan accounts.',
        date: 'April 2025'
    },
    {
        slug: 'ir35-basics-for-directors',
        title: 'IR35 Basics',
        desc: 'Inside vs Outside: Impact on your salary strategy.',
        date: 'April 2025'
    },
    {
        slug: 'vat-registration-threshold',
        title: 'VAT for Directors',
        desc: 'Registering, Flat Rate Scheme, and MTD.',
        date: 'April 2025'
    },
    {
        slug: 'closing-limited-company-mvl',
        title: 'Closing a Company (MVL)',
        desc: 'Extracting cash at 10% tax via Business Asset Disposal Relief.',
        date: 'April 2025'
    },
    {
        slug: 'corporation-tax-guide',
        title: 'Corporation Tax Guide',
        desc: 'Small Profits Rate (19%) vs Main Rate (25%).',
        date: 'April 2025'
    },
    {
        slug: 'how-it-works',
        title: 'How the Calculator Works',
        desc: 'Transparency on our logic, assumptions, and formulas.',
        date: 'April 2025'
    }
];

export default function GuidesIndex() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-5xl">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Tax Guides & Resources</h1>
                <p className="text-xl text-muted-foreground">Expert insights for UK Limited Company Directors (2025/26).</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {GUIDES.map(guide => (
                    <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group h-full">
                        <Card className="h-full flex flex-col transition-all hover:shadow-lg hover:border-purple-500/30">
                            <CardHeader>
                                <div className="text-xs text-purple-600 font-semibold mb-2 uppercase tracking-wide">{guide.date}</div>
                                <CardTitle className="group-hover:text-purple-700 transition-colors leading-tight">{guide.title}</CardTitle>
                                <CardDescription className="text-sm mt-2 line-clamp-2">{guide.desc}</CardDescription>
                            </CardHeader>
                            <CardContent className="mt-auto pt-0">
                                <div className="flex items-center text-sm font-medium text-purple-600">
                                    Read Guide <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
