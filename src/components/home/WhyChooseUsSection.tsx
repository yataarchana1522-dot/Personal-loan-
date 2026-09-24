import React from 'react';
import { 
  Check, 
  X, 
  ShieldCheck, 
  Zap, 
  HelpCircle, 
  FileCheck2, 
  FileText, 
  Sparkles,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { ClientConfig } from '../../types/loan';

interface WhyChooseUsSectionProps {
  clientConfig: ClientConfig;
  onOpenApply: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({
  clientConfig,
  onOpenApply,
}) => {
  const comparisonRows = [
    {
      feature: 'Application Journey',
      us: '100% Digital & Paperless via Smartphone / Web',
      traditional: 'Physical branch visits, printouts & physical forms',
      advantage: true,
    },
    {
      feature: 'In-Principle Approval Time',
      us: 'Instant (2 to 10 Minutes)',
      traditional: '3 to 7 Working Days',
      advantage: true,
    },
    {
      feature: 'Disbursement Timeline',
      us: 'Same-day to 24 Hours post-verification',
      traditional: '7 to 15 Working Days',
      advantage: true,
    },
    {
      feature: 'Collateral / Security Deposit',
      us: 'Zero Collateral (100% Unsecured)',
      traditional: 'Often demands guarantor or collateral security',
      advantage: true,
    },
    {
      feature: 'Prepayment & Foreclosure Charges',
      us: 'NIL / Zero charges after 12 monthly EMIs',
      traditional: 'Up to 4% - 6% penalty on outstanding principal',
      advantage: true,
    },
    {
      feature: 'Interest Rate Disclosure',
      us: `Transparent from ${clientConfig.minInterestRate}% p.a. (Reducing balance)`,
      traditional: 'Confusing flat rates with hidden compounding',
      advantage: true,
    },
    {
      feature: 'Hidden Fees / Surprises',
      us: 'Zero hidden administrative charges. Clear APR.',
      traditional: 'Multiple legal inspection, documentation & file fees',
      advantage: true,
    },
  ];

  const scheduleOfCharges = [
    {
      title: 'Annual Interest Rate (APR)',
      value: `${clientConfig.minInterestRate}% to ${clientConfig.maxInterestRate}% p.a.`,
      note: 'Reducing balance method based on applicant credit bureau score and income tier.',
    },
    {
      title: 'Processing Fee',
      value: '1.0% to 2.5% of Sanctioned Loan Amount (+ 18% GST)',
      note: 'Deducted upfront from gross loan sanction at disbursal. No advance cash required.',
    },
    {
      title: 'Part-Prepayment Charges',
      value: 'NIL (Zero Penalty)',
      note: 'Allowed after payment of first 6 consecutive monthly installments.',
    },
    {
      title: 'Foreclosure / Full Pre-closure',
      value: 'NIL after 12 EMIs (or max 2% as per RBI norms prior to 12 months)',
      note: 'Freedom to clear outstanding principal whenever you have surplus cash.',
    },
    {
      title: 'Late Payment / Penal Charges',
      value: '2% per month on overdue EMI amount only',
      note: 'Levied solely on overdue amount, not on the entire outstanding principal.',
    },
    {
      title: 'Stamp Duty & Statutory Charges',
      value: 'At Actuals as per respective State Stamp Act',
      note: 'Statutory government fee required for legal enforceability.',
    },
  ];

  return (
    <section id="charges" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Market-Leading Advantages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Borrow with {clientConfig.companyName}
          </h2>
          <p className="text-base text-slate-600">
            Compare our agile digital lending infrastructure against traditional legacy banking hurdles.
          </p>
        </div>

        {/* Feature Comparison Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm mb-16">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900 text-white font-bold">
                <tr>
                  <th className="py-4 px-6 text-xs uppercase tracking-wider text-slate-300">
                    Loan Evaluation Feature
                  </th>
                  <th className="py-4 px-6 bg-blue-700 text-white text-xs uppercase tracking-wider">
                    {clientConfig.companyName} Digital Loan
                  </th>
                  <th className="py-4 px-6 text-xs uppercase tracking-wider text-slate-300">
                    Traditional Bank Branch Loans
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 bg-blue-50/50 font-semibold text-blue-900">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{row.us}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                          <X className="w-3.5 h-3.5" />
                        </div>
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Schedule of Charges & Fee Transparency */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Schedule of Fees, Charges & APR Transparency
              </h3>
              <p className="text-xs text-slate-500">
                Complete clarity with zero unexpected surprises in the fine print.
              </p>
            </div>
            <span className="text-xs px-3 py-1 bg-emerald-50 text-emerald-700 font-semibold rounded-full border border-emerald-200">
              RBI Fair Practice Code Compliant
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scheduleOfCharges.map((c) => (
              <div
                key={c.title}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-blue-300 transition-all"
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {c.title}
                </h4>
                <p className="text-sm font-bold text-slate-900 leading-snug">
                  {c.value}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  {c.note}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
