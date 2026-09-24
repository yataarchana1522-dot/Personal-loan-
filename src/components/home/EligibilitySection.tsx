import React, { useState, useMemo } from 'react';
import { 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Building, 
  CreditCard, 
  Briefcase, 
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { ClientConfig, EligibilityInput, EmploymentType } from '../../types/loan';
import { evaluateEligibility } from '../../utils/eligibilityCalculator';
import { formatINR, formatCompactINR } from '../../utils/emiCalculator';

interface EligibilitySectionProps {
  clientConfig: ClientConfig;
  onOpenApply: (amount?: number) => void;
}

export const EligibilitySection: React.FC<EligibilitySectionProps> = ({
  clientConfig,
  onOpenApply,
}) => {
  // Interactive Eligibility Evaluator inputs
  const [employmentType, setEmploymentType] = useState<EmploymentType>('salaried');
  const [monthlyIncome, setMonthlyIncome] = useState<number>(65000);
  const [existingEmis, setExistingEmis] = useState<number>(10000);
  const [tenureYears, setTenureYears] = useState<number>(4);
  const [creditScoreRange, setCreditScoreRange] = useState<'excellent' | 'good' | 'fair' | 'new_to_credit'>('good');

  const evalInput: EligibilityInput = {
    employmentType,
    monthlyIncome,
    existingEmis,
    tenureYears,
    interestRate: clientConfig.minInterestRate,
    creditScoreRange,
  };

  const evaluation = useMemo(() => evaluateEligibility(evalInput), [evalInput]);

  const criteriaCards = [
    {
      title: 'Applicant Age',
      value: '21 to 58 Years',
      detail: 'Applicant must be at least 21 years old at application and below 58 years at loan maturity.',
      tag: 'Age Limit',
    },
    {
      title: 'Net Monthly Income',
      value: '₹25,000+ (Metros) / ₹20,000+ (Others)',
      detail: 'Consistent monthly salary directly credited to a bank account via NEFT/IMPS.',
      tag: 'Minimum Salary',
    },
    {
      title: 'Employment Experience',
      value: 'Min 1 Year Total Experience',
      detail: 'At least 6 months with current organization/employer for salaried profiles.',
      tag: 'Job Stability',
    },
    {
      title: 'Credit / CIBIL Score',
      value: '700+ Score Recommended',
      detail: 'Applicants with no adverse write-offs or 90+ DPD defaults qualify for lowest rate slabs.',
      tag: 'Credit History',
    },
    {
      title: 'Residential Status',
      value: 'Indian Citizen / Resident',
      detail: 'Resident of India residing in serviceable tier 1, 2, or 3 cities.',
      tag: 'Citizenship',
    },
    {
      title: 'Banking Discipline',
      value: 'Clear 6-Month Bank Track',
      detail: 'Zero inward clearing cheque bounces and healthy average quarterly bank balance.',
      tag: 'Banking',
    },
  ];

  return (
    <section id="eligibility" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Clear Pre-Qualification Rules</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Personal Loan Eligibility Criteria
          </h2>
          <p className="text-base text-slate-600">
            Transparent underwriting standards with no surprises. Review the basic qualification rules below or use our interactive FOIR capacity calculator.
          </p>
        </div>

        {/* Criteria Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {criteriaCards.map((c) => (
            <div
              key={c.title}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {c.tag}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-700">{c.title}</h3>
              <p className="text-lg font-bold text-slate-900">{c.value}</p>
              <p className="text-xs text-slate-500 leading-relaxed pt-1">{c.detail}</p>
            </div>
          ))}
        </div>

        {/* Interactive Instant Eligibility Calculator */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-10">
          <div className="max-w-3xl mx-auto text-center mb-8 space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Interactive FOIR Estimator
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Estimate Your Maximum Loan Sanction
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Banks follow the Fixed Obligation to Income Ratio (FOIR). Input your net monthly salary and existing EMIs to view your borrowing capacity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Form Inputs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Employment Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Employment Profile
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'salaried', label: 'Salaried' },
                    { id: 'self_employed_professional', label: 'Self-Employed' },
                    { id: 'self_employed_business', label: 'Business Owner' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setEmploymentType(t.id as EmploymentType)}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all text-center ${
                        employmentType === t.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Income Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">Net Monthly In-Hand Salary</span>
                  <span className="font-bold text-blue-600 font-tabular text-sm">
                    {formatINR(monthlyIncome)}
                  </span>
                </div>
                <input
                  type="range"
                  min={20000}
                  max={300000}
                  step={5000}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>₹20,000</span>
                  <span>₹1,50,000</span>
                  <span>₹3,00,000+</span>
                </div>
              </div>

              {/* Existing EMIs Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">Existing Monthly Loan / Card EMIs</span>
                  <span className="font-bold text-slate-900 font-tabular text-sm">
                    {formatINR(existingEmis)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={Math.max(10000, monthlyIncome * 0.8)}
                  step={2000}
                  value={existingEmis}
                  onChange={(e) => setExistingEmis(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>₹0 (None)</span>
                  <span>Max Allowable: ~50% of Income</span>
                </div>
              </div>

              {/* Tenure Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Desired Repayment Horizon: {tenureYears} Years ({tenureYears * 12} Months)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[2, 3, 4, 5, 6].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setTenureYears(yr)}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                        tenureYears === yr
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {yr} Yrs
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Estimated Eligibility Result Box */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    Pre-Qualification Status
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    evaluation.isEligible 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                      : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}>
                    {evaluation.isEligible ? 'High Eligibility' : 'Attention Required'}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-slate-400 block font-medium">
                    Estimated Max Borrowing Capacity
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white font-tabular mt-1">
                    {evaluation.isEligible ? formatINR(evaluation.estimatedMaxLoan) : '₹0'}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Based on {clientConfig.minInterestRate}% p.a. over {tenureYears} years
                  </p>
                </div>

                <div className="space-y-2 p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Max Allowable New EMI:</span>
                    <span className="font-bold text-white font-tabular">{formatINR(evaluation.maxAllowableEmi)}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>FOIR Utilization:</span>
                    <span className="font-bold text-blue-400 font-tabular">{evaluation.foirPercentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Disposable Net Income:</span>
                    <span className="font-bold text-emerald-400 font-tabular">{formatINR(evaluation.disposableIncome)}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  {evaluation.messages.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onOpenApply(evaluation.estimatedMaxLoan)}
                  disabled={!evaluation.isEligible}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                    evaluation.isEligible
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 cursor-pointer active:scale-98'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span>Proceed with Pre-Qualified Loan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
