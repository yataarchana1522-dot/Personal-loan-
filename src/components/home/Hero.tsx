import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Percent, 
  CheckCircle, 
  TrendingUp, 
  Sparkles, 
  FileCheck2,
  ChevronRight,
  Zap,
  Lock
} from 'lucide-react';
import { ClientConfig } from '../../types/loan';
import { calculateEmi, formatINR, formatCompactINR } from '../../utils/emiCalculator';

interface HeroProps {
  clientConfig: ClientConfig;
  onOpenApply: (prefilledAmount?: number) => void;
  onScrollToEmi: () => void;
  onScrollToEligibility: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  clientConfig,
  onOpenApply,
  onScrollToEmi,
  onScrollToEligibility,
}) => {
  // Quick interactive hero simulation state
  const [heroAmount, setHeroAmount] = useState<number>(500000);
  const [heroTenure, setHeroTenure] = useState<number>(36);

  const heroEmi = calculateEmi(heroAmount, clientConfig.minInterestRate, heroTenure);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Subtle Ambient Glow Grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/20 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & Conversion CTAs */}
          <div className="lg:col-span-7 space-y-7">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/80 text-blue-300 text-xs font-semibold tracking-wide">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping"></span>
              <span>100% Digital • Paperless Approval</span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400 font-medium">Funds in as fast as 24 Hrs</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
                Personal Loans, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                  Made Simple.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
                Empower life’s key milestones with collateral-free personal loans from{' '}
                <strong className="text-white font-semibold">{formatINR(clientConfig.minLoanAmount)}</strong> to{' '}
                <strong className="text-white font-semibold">{formatINR(clientConfig.maxLoanAmount)}</strong>. 
                Transparent interest rates starting at{' '}
                <span className="text-emerald-400 font-semibold">{clientConfig.minInterestRate}% p.a.</span> with zero hidden charges.
              </p>
            </div>

            {/* Value Highlights Grid */}
            <div className="grid grid-cols-3 gap-3 max-w-lg pt-1">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
                <span className="text-[11px] text-slate-400 block font-medium">Interest Rate</span>
                <span className="text-lg sm:text-xl font-bold text-white font-tabular">
                  {clientConfig.minInterestRate}% <span className="text-xs text-slate-400 font-normal">p.a.</span>
                </span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">Reducing balance</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
                <span className="text-[11px] text-slate-400 block font-medium">Loan Amount</span>
                <span className="text-lg sm:text-xl font-bold text-white font-tabular">
                  Up to {formatCompactINR(clientConfig.maxLoanAmount)}
                </span>
                <span className="text-[10px] text-blue-300 block mt-0.5">Collateral-free</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
                <span className="text-[11px] text-slate-400 block font-medium">Tenure Flexibility</span>
                <span className="text-lg sm:text-xl font-bold text-white font-tabular">
                  12 - 84 <span className="text-xs text-slate-400 font-normal">Mo</span>
                </span>
                <span className="text-[10px] text-sky-300 block mt-0.5">Customizable EMIs</span>
              </div>
            </div>

            {/* Strategic CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => onOpenApply(heroAmount)}
                className="group px-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-xl shadow-blue-600/30 transition-all duration-200 hover:shadow-2xl hover:shadow-blue-500/40 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Apply for a Loan</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onScrollToEligibility}
                className="px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-base border border-slate-700/80 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Check Eligibility</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={onScrollToEmi}
                className="text-xs font-semibold text-slate-400 hover:text-white transition-colors py-2 px-3 text-center sm:text-left flex items-center justify-center sm:justify-start gap-1"
              >
                <span>Calculate Detailed EMI</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Trust Assurance Strip */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Hidden Preclosure Charges</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>256-bit Bank Grade Security</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Instant In-Principle Sanction</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Interactive Fintech Loan Simulator Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Decorative Card Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-lg opacity-35"></div>

              {/* Real-time Interactive Simulator Card */}
              <div className="relative rounded-2xl bg-slate-900/90 border border-slate-700/80 p-6 shadow-2xl backdrop-blur-xl space-y-5">
                
                {/* Card Top Title Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Instant Loan Simulator</h3>
                      <p className="text-[11px] text-slate-400">Live preview based on 10.49% p.a.</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                    Real-time
                  </span>
                </div>

                {/* Amount Slider Control */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Required Loan Amount</span>
                    <span className="text-base font-bold text-white font-tabular">
                      {formatINR(heroAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50000}
                    max={3000000}
                    step={25000}
                    value={heroAmount}
                    onChange={(e) => setHeroAmount(Number(e.target.value))}
                    className="w-full"
                    aria-label="Loan Amount Slider"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>₹50,000</span>
                    <span>₹15 Lakh</span>
                    <span>₹30 Lakh</span>
                  </div>
                </div>

                {/* Tenure Selector */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Repayment Tenure</span>
                    <span className="text-sm font-bold text-white">
                      {heroTenure} Months ({heroTenure / 12} Yrs)
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[12, 24, 36, 60].map((months) => (
                      <button
                        key={months}
                        type="button"
                        onClick={() => setHeroTenure(months)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                          heroTenure === months
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {months / 12} Yrs
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculated Result Highlight Box */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-950/60 to-slate-950 border border-blue-800/40 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                        Estimated Monthly EMI
                      </span>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white font-tabular mt-0.5">
                        {formatINR(heroEmi.monthlyEmi)}
                        <span className="text-xs text-slate-400 font-normal"> /month</span>
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      <span className="text-slate-400 block text-[10px]">Total Interest</span>
                      <span className="text-amber-300 font-semibold font-tabular">
                        {formatINR(heroEmi.totalInterest)}
                      </span>
                    </div>
                  </div>

                  {/* Visual Proportion Bar */}
                  <div className="space-y-1">
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden flex">
                      <div 
                        className="bg-blue-500 h-full transition-all duration-300"
                        style={{ width: `${Math.round((heroAmount / heroEmi.totalPayment) * 100)}%` }}
                        title="Principal"
                      />
                      <div 
                        className="bg-amber-400 h-full transition-all duration-300"
                        style={{ width: `${Math.round((heroEmi.totalInterest / heroEmi.totalPayment) * 100)}%` }}
                        title="Interest"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"></span>
                        Principal: {Math.round((heroAmount / heroEmi.totalPayment) * 100)}%
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
                        Interest: {Math.round((heroEmi.totalInterest / heroEmi.totalPayment) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Action */}
                <button
                  onClick={() => onOpenApply(heroAmount)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Apply with {formatINR(heroAmount)} Loan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-[11px] text-slate-400">
                  Instant eligibility pre-check takes only 2 minutes • No impact on credit score
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
