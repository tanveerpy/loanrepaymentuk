import { DirectorCalculator } from '@/components/calculator/DirectorCalculator';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, BookOpen, AlertCircle, TrendingUp, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: "Director Salary vs Dividend Calculator UK 2025/26 - Compare Your Take-Home Pay",
  description: "Calculate the optimal salary and dividend mix for your limited company. Updated for 2025/26 tax year with NI, corporation tax and dividend allowance. Compare scenarios and plan for the 2026 dividend tax rise.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary/20">

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="container mx-auto px-4 relative z-10 space-y-8 text-center max-w-4xl">

            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-primary text-primary-foreground hover:bg-primary/80 shadow-lg shadow-indigo-500/20">
              Updated for 2025/26 & 2026/27 Forecasts
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 leading-[1.1]">
              Director Salary vs Dividend <br />
              <span className="text-primary font-serif italic">Optimization Calculator</span>
            </h1>

            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl leading-relaxed">
              Find your optimal tax-efficient mix. Our engine handles Corporation Tax Marginal Relief, Student Loan nuances, and the specific Director's NIC rules that generic calculators miss.
            </p>
          </div>
        </section>

        {/* CALCULATOR APP SECTION */}
        <section id="calculator" className="container mx-auto px-4 -mt-20 relative z-20 mb-24 scroll-mt-24">
          <DirectorCalculator />
        </section>

        {/* CONTENT SECTION 1: HOW IT WORKS */}
        <section className="container mx-auto px-4 py-16 max-w-4xl prose prose-slate dark:prose-invert">
          <h2>How the Calculator Works</h2>
          <p>
            Unlike simple "flat rate" tools, this calculator runs a full tax simulation for Limited Company Directors.
          </p>
          <div className="grid md:grid-cols-3 gap-8 not-prose my-8">
            <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-green-500" /> 1. Define Inputs</h3>
              <p className="text-sm text-muted-foreground">Select your region (Scotland/UK), Tax Year, and Profit level. Configure Student Loans and potential Pension contributions.</p>
            </div>
            <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-blue-500" /> 2. Engine Run</h3>
              <p className="text-sm text-muted-foreground">We deduct expenses, Calculate Corporation Tax (with Marginal Relief), and apply the specific Director's NIC Annual Earnings Period.</p>
            </div>
            <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-purple-500" /> 3. Optimize</h3>
              <p className="text-sm text-muted-foreground">See your exact Take-Home Pay, Effective Tax Rate, and see how much the visible "Dividend Tax" is actually costing you.</p>
              <p className="text-xs text-slate-400 mt-2">The most accurate <strong>salary and dividends tax calculator UK</strong> for the 2025/26 tax year.</p>
            </div>
          </div>
        </section>

        {/* CONTENT SECTION 2: WHY SALARY VS DIVIDENDS */}
        <section className="bg-muted/30 py-16 border-y border-border/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Why Salary vs Dividends?</h2>

            <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Personal Allowance & Dividend Allowance</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every UK individual has a <strong className="text-foreground">Personal Allowance of £12,570</strong> (frozen until 2028).
                    Additionally, you get a tax-free <strong className="text-foreground">Dividend Allowance of £500</strong>.
                    <br /><br />
                    The most efficient strategy typically involves paying a salary up to the relevant National Insurance threshold to secure your "stamp" for State Pension, without paying unnecessary Employer NICs.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Director's NICs</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Directors are subject to an <strong>Annual Earnings Period</strong> for Class 1 National Insurance.
                    <br /><br />
                    For 2025/26, the <strong>Employer (Secondary) Threshold</strong> has dropped to £5,000.
                    This means salaries above £5,000 now attract 15% Employer NICs unless you are eligible for the Employment Allowance. This drastically changes the "Optimal Salary" math compared to last year.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <h3 className="text-amber-600 dark:text-amber-400 font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" /> Upcoming Changes in 2026
                </h3>
                <p className="text-amber-900/80 dark:text-amber-200/80">
                  The Autumn Budget announced a <strong>2 percentage point increase</strong> in Dividend Tax rates from April 2026.
                  Basic rate moves to 10.75% and Higher rate to 35.75%. Use our calculator to toggle to "2026/27" and see the impact on your future take-home pay.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT SECTION 3: OPTIMAL STRATEGIES */}
        <section className="container mx-auto px-4 py-16 max-w-4xl space-y-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Optimal Salary Strategies for 2025/26</h2>
            <div className="grid gap-6">
              <StrategicCard
                title="£12,570 Salary (Standard)"
                verdict="Best for Multi-Employee Companies"
                desc="If you can claim the Employment Allowance (EA), this remains the gold standard. You use your full Personal Allowance tax-free, and the EA wipes out the Employer NIC bill."
              />
              <StrategicCard
                title="£9,100 Salary"
                verdict="Obsolete?"
                desc="Previously popular to avoid NICs. However, with the Secondary Threshold dropping to £5,000, this middle-ground offers fewer advantages in 2025/26."
              />
              <StrategicCard
                title="£5,000 Salary"
                verdict="Best for Sole Directors"
                desc="If you are a sole director (cannot claim EA), paying £12,570 now costs you ~£1,135 in Employer NIC. Lowering salary to £5,000 avoids this tax, but leaves Personal Allowance unused (wasted) if you don't have other income."
              />
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline" asChild>
                <Link href="/guides/optimal-salary-2025-26">Read the Full Optimal Salary Guide <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CONTENT SECTION 4: FAQ */}
        <section className="bg-card border-y py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <FAQItem
                q="Do directors pay National Insurance on dividends?"
                a="No. Dividends are exempt from National Insurance. This is one of the primary tax advantages of operating through a limited company vs being a sole trader."
              />
              <FAQItem
                q="Can I pay myself dividends even if the company has no profits?"
                a="No. You can only pay dividends from 'distributable profits' (accumulated profit after tax). If you pay dividends when the company is in a loss, it is illegal (ultra vires) and may be reclassified as a Director's Loan."
              />
              <FAQItem
                q="How do student loans affect my take-home pay?"
                a="Dividends count as 'unearned income' for Student Loans. If your total income (Salary + Dividends) exceeds the threshold (e.g., £27,295 for Plan 2), you pay 9% on the excess via Self Assessment."
              />
              <FAQItem
                q="What is the dividend allowance?"
                a="For the 2025/26 tax year, the first £500 of dividend income is tax-free. This has been reduced significantly from previous years (£2,000)."
              />
            </div>
          </div>
        </section>

        {/* CONTENT SECTION 5: ABOUT CONTENT */}
        <section className="container mx-auto px-4 py-16 max-w-4xl text-center space-y-6">
          <h2 className="text-2xl font-bold">About This Tool</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This calculator provides estimates based on specific tax legislation for the UK.
            Rates are sourced directly from <a href="https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026" className="underline underline-offset-4 hover:text-primary">HMRC Guidance 2025/26</a>.
          </p>
          <div className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
            <strong>Disclaimer:</strong> This tool acts as an estimator for planning purposes. It does not constitute financial advice. Company tax scenarios can be complex (e.g. R&D claims, complicated share structures). Always Consult a Qualified Accountant.
          </div>
        </section>

      </main>
    </div>
  );
}

function StrategicCard({ title, verdict, desc }: { title: string, verdict: string, desc: string }) {
  return (
    <div className="grid md:grid-cols-[200px_1fr] gap-4 p-6 border rounded-xl bg-card hover:bg-muted/50 transition-colors">
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="inline-block mt-2 px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-md">
          {verdict}
        </div>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

function FAQItem({ q, a }: { q: string, a: string }) {
  return (
    <div className="space-y-2 border-b pb-4 last:border-0">
      <h3 className="font-semibold text-lg">{q}</h3>
      <p className="text-muted-foreground leading-relaxed">{a}</p>
    </div>
  )
}
