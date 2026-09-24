import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  Table, 
  PieChart, 
  HelpCircle, 
  Sliders, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Download
} from 'lucide-react';
import { ClientConfig } from '../../types/loan';
import { calculateEmi, formatINR, formatCompactINR } from '../../utils/emiCalculator';

interface EmiCalculatorSectionProps {
  clientConfig: ClientConfig;
  onOpenApply: (amount: number, purpose?: string) => void;
}

export const EmiCalculatorSection: React.FC<EmiCalculatorSectionProps> = ({
  clientConfig,
  onOpenApply,
}) => {
  // Input states
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(10.49);
  const [tenureMonths, setTenureMonths] = useState<number>(36);
  const [tenureUnit, setTenureUnit] = useState<'months' | 'years'>('months');
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Dynamic calculation
  const result = useMemo(() => {
    return calculateEmi(loanAmount, interestRate, tenureMonths, clientConfig.processingFeePercent, clientConfig.gstPercent);
  }, [loanAmount, interestRate, tenureMonths, clientConfig.processingFeePercent, clientConfig.gstPercent]);

  // Donut chart calculations
  const total = result.totalPayment;
  const principalPercent = total > 0 ? (result.principal / total) * 100 : 100;
  const interestPercent = total > 0 ? (result.totalInterest / total) * 100 : 0;

  // SVG Donut geometry
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const principalStrokeDashoffset = 0;
  const interestStrokeDashoffset = circumference - (circumference * interestPercent) / 100;

  const handleTenureChange = (val: number, unit: 'months' | 'years') => {
    if (unit === 'years') {
      setTenureMonths(val * 12);
    } else {
      setTenureMonths(val);
    }
  };

  return (
    <section id="emi-calculator" className="py-20 bg-white border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Financial Planning</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Personal Loan EMI Calculator
          </h2>
          <p className="text-base text-slate-600">
            Calculate exact monthly installments, total interest, and net disbursals based on reducing balance interest. Adjust loan amount, rate, and tenure below.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-slate-50/70 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Controls Column (Sliders + Direct Inputs) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Slider 1: Loan Amount */}
              <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <label className="text-sm font-bold text-slate-800">
                    Required Loan Amount
                  </label>
                  <div className="flex items-center space-x-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-xs font-semibold">₹</span>
                    <input
                      type="number"
                      min={clientConfig.minLoanAmount}
                      max={clientConfig.maxLoanAmount}
                      step={10000}
                      value={loanAmount}
                      onChange={(e) => {
                        const val = Math.max(0, Math.min(clientConfig.maxLoanAmount, Number(e.target.value)));
                        setLoanAmount(val);
                      }}
                      className="w-28 text-right text-sm font-bold text-slate-900 bg-transparent focus:outline-none font-tabular"
                    />
                  </div>
                </div>

                <input
                  type="range"
                  min={clientConfig.minLoanAmount}
                  max={clientConfig.maxLoanAmount}
                  step={25000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full"
                  aria-label="Loan Amount Slider"
                />

                <div className="flex justify-between items-center text-xs text-slate-500 font-medium pt-1">
                  <span>Min: {formatINR(clientConfig.minLoanAmount)}</span>
                  <div className="flex gap-1.5">
                    {[200000, 500000, 1000000, 2000000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setLoanAmount(preset)}
                        className="px-2 py-0.5 rounded text-[11px] bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-600 font-medium transition-colors"
                      >
                        {formatCompactINR(preset)}
                      </button>
                    ))}
                  </div>
                  <span>Max: {formatCompactINR(clientConfig.maxLoanAmount)}</span>
                </div>
              </div>

              {/* Slider 2: Interest Rate */}
              <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <div>
                    <label className="text-sm font-bold text-slate-800 block">
                      Annual Interest Rate
                    </label>
                    <span className="text-xs text-slate-500">Reducing balance rate per annum</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                    <input
                      type="number"
                      step="0.01"
                      min={clientConfig.minInterestRate}
                      max={clientConfig.maxInterestRate}
                      value={interestRate}
                      onChange={(e) => {
                        const val = Math.max(8.0, Math.min(30.0, Number(e.target.value)));
                        setInterestRate(val);
                      }}
                      className="w-16 text-right text-sm font-bold text-slate-900 bg-transparent focus:outline-none font-tabular"
                    />
                    <span className="text-slate-600 text-xs font-semibold">% p.a.</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={clientConfig.minInterestRate}
                  max={clientConfig.maxInterestRate}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full"
                  aria-label="Interest Rate Slider"
                />

                <div className="flex justify-between items-center text-xs text-slate-500 font-medium pt-1">
                  <span>Prime: {clientConfig.minInterestRate}% p.a.</span>
                  <div className="flex gap-1.5">
                    {[10.49, 12.5, 14.0, 16.5].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setInterestRate(preset)}
                        className="px-2 py-0.5 rounded text-[11px] bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-600 font-medium transition-colors"
                      >
                        {preset}%
                      </button>
                    ))}
                  </div>
                  <span>Max: {clientConfig.maxInterestRate}% p.a.</span>
                </div>
              </div>

              {/* Slider 3: Loan Tenure */}
              <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-bold text-slate-800">
                      Loan Tenure
                    </label>
                    <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100 text-xs">
                      <button
                        type="button"
                        onClick={() => setTenureUnit('months')}
                        className={`px-2.5 py-0.5 rounded-md font-semibold transition-colors ${
                          tenureUnit === 'months' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
                        }`}
                      >
                        Months
                      </button>
                      <button
                        type="button"
                        onClick={() => setTenureUnit('years')}
                        className={`px-2.5 py-0.5 rounded-md font-semibold transition-colors ${
                          tenureUnit === 'years' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
                        }`}
                      >
                        Years
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                    <input
                      type="number"
                      min={12}
                      max={clientConfig.maxTenureMonths}
                      value={tenureUnit === 'years' ? Math.round((tenureMonths / 12) * 10) / 10 : tenureMonths}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        handleTenureChange(val, tenureUnit);
                      }}
                      className="w-16 text-right text-sm font-bold text-slate-900 bg-transparent focus:outline-none font-tabular"
                    />
                    <span className="text-slate-600 text-xs font-semibold">
                      {tenureUnit === 'years' ? 'Years' : 'Months'}
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min={12}
                  max={clientConfig.maxTenureMonths}
                  step={6}
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Number(e.target.value))}
                  className="w-full"
                  aria-label="Tenure Slider"
                />

                <div className="flex justify-between items-center text-xs text-slate-500 font-medium pt-1">
                  <span>1 Year (12 Mo)</span>
                  <div className="flex gap-1.5">
                    {[12, 24, 36, 48, 60].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setTenureMonths(m)}
                        className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                          tenureMonths === m
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {m / 12} Yrs
                      </button>
                    ))}
                  </div>
                  <span>7 Years (84 Mo)</span>
                </div>
              </div>

            </div>

            {/* Right Output & Visualization Column */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Primary EMI Summary Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-7 rounded-3xl shadow-xl border border-slate-800 space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Monthly Payable Installment
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-white font-tabular mt-1">
                      {formatINR(result.monthlyEmi)}
                      <span className="text-xs text-slate-400 font-normal"> /mo</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>

                {/* Donut Chart & Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  
                  {/* SVG Donut Chart */}
                  <div className="sm:col-span-5 flex justify-center">
                    <div className="relative w-36 h-36">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                        {/* Background circle */}
                        <circle
                          cx="80"
                          cy="80"
                          r={radius}
                          stroke="#1E293B"
                          strokeWidth="18"
                          fill="transparent"
                        />
                        {/* Principal stroke */}
                        <circle
                          cx="80"
                          cy="80"
                          r={radius}
                          stroke="#2563EB"
                          strokeWidth="18"
                          strokeDasharray={circumference}
                          strokeDashoffset={principalStrokeDashoffset}
                          fill="transparent"
                          strokeLinecap="round"
                        />
                        {/* Interest stroke */}
                        <circle
                          cx="80"
                          cy="80"
                          r={radius}
                          stroke="#F59E0B"
                          strokeWidth="18"
                          strokeDasharray={`${(circumference * interestPercent) / 100} ${circumference}`}
                          strokeDashoffset={-((circumference * principalPercent) / 100)}
                          fill="transparent"
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Center info */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] text-slate-400 font-medium uppercase">Tenure</span>
                        <span className="text-xs font-bold text-white">
                          {(tenureMonths / 12).toFixed(tenureMonths % 12 === 0 ? 0 : 1)} Yrs
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Legend & Amounts */}
                  <div className="sm:col-span-7 space-y-3 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-md bg-blue-600 shrink-0"></span>
                        <span className="text-slate-300">Principal Loan:</span>
                      </div>
                      <span className="font-bold text-white font-tabular">{formatINR(result.principal)}</span>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-md bg-amber-500 shrink-0"></span>
                        <span className="text-slate-300">Total Interest:</span>
                      </div>
                      <span className="font-bold text-amber-400 font-tabular">{formatINR(result.totalInterest)}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-slate-400 font-medium">Total Amount Payable:</span>
                      <span className="font-extrabold text-white text-sm font-tabular">{formatINR(result.totalPayment)}</span>
                    </div>
                  </div>
                </div>

                {/* Additional Fee Disclosures */}
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs space-y-1.5 text-slate-300">
                  <div className="flex justify-between">
                    <span>Est. Processing Fee ({clientConfig.processingFeePercent}% + 18% GST):</span>
                    <span className="font-medium text-slate-200 font-tabular">{formatINR(result.totalUpfrontCharges)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Net Disbursed to Bank Account:</span>
                    <span className="font-medium text-emerald-400 font-tabular">{formatINR(result.netDisbursalAmount)}</span>
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={() => onOpenApply(loanAmount)}
                  className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Apply Now with {formatINR(result.monthlyEmi)} EMI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Toggle Amortization Schedule */}
              <div className="text-center">
                <button
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors py-2 px-4 rounded-lg bg-blue-50 hover:bg-blue-100"
                >
                  <Table className="w-4 h-4" />
                  <span>{showAmortization ? 'Hide Year-wise Amortization Schedule' : 'View Year-wise Amortization Table'}</span>
                  {showAmortization ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

            </div>

          </div>

          {/* Year-by-Year Amortization Schedule Table */}
          {showAmortization && (
            <div className="mt-10 pt-8 border-t border-slate-200 animate-in fade-in duration-300 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Yearly Loan Amortization Schedule
                  </h4>
                  <p className="text-xs text-slate-500">
                    Breakdown of principal repayment, interest component, and closing balance for each year.
                  </p>
                </div>
                <div className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                  Principal: <strong className="text-slate-800">{formatINR(result.principal)}</strong> • Tenure: <strong className="text-slate-800">{tenureMonths} Mo</strong>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Year</th>
                      <th className="py-3 px-4">Principal Paid (A)</th>
                      <th className="py-3 px-4">Interest Paid (B)</th>
                      <th className="py-3 px-4">Total Paid (A + B)</th>
                      <th className="py-3 px-4">Ending Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-tabular">
                    {result.yearlySchedule.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-800">
                          Year {row.year}
                        </td>
                        <td className="py-3 px-4 text-blue-700 font-medium">
                          {formatINR(row.principalPaid)}
                        </td>
                        <td className="py-3 px-4 text-amber-700 font-medium">
                          {formatINR(row.interestPaid)}
                        </td>
                        <td className="py-3 px-4 text-slate-900 font-semibold">
                          {formatINR(row.totalPaid)}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {formatINR(row.endingBalance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50 font-bold text-slate-900 border-t border-slate-200">
                    <tr>
                      <td className="py-3 px-4">Total</td>
                      <td className="py-3 px-4 text-blue-700">{formatINR(result.principal)}</td>
                      <td className="py-3 px-4 text-amber-700">{formatINR(result.totalInterest)}</td>
                      <td className="py-3 px-4">{formatINR(result.totalPayment)}</td>
                      <td className="py-3 px-4 text-emerald-600">₹0 (Paid Off)</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
