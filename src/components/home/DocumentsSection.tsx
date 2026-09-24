import React, { useState } from 'react';
import { 
  FileText, 
  CreditCard, 
  Building2, 
  FileSpreadsheet, 
  ShieldCheck, 
  Info,
  Check,
  Lock,
  Download
} from 'lucide-react';

export const DocumentsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'salaried' | 'self_employed'>('salaried');

  const salariedDocs = [
    {
      category: 'Identity Proof',
      icon: CreditCard,
      items: ['PAN Card (Mandatory for KYC)', 'Aadhaar Card / Passport / Voter ID Card'],
      detail: 'Digital verification via DigiLocker OTP or clear scanned PDF copy.',
    },
    {
      category: 'Current Address Proof',
      icon: Building2,
      items: ['Aadhaar Card with updated address', 'Utility Bill (Electricity, Gas, Broadband) not older than 2 months', 'Valid Rent Agreement'],
      detail: 'Must match applicant current physical residential address.',
    },
    {
      category: 'Income Proof',
      icon: FileSpreadsheet,
      items: ['Latest 3 months salary slips with employer letterhead', 'Form 16 / Annual Tax Filing (ITR) for recent financial year'],
      detail: 'Must reflect gross compensation, statutory deductions, and net credit.',
    },
    {
      category: 'Bank Account Statements',
      icon: FileText,
      items: ['Latest 6 months main salary bank account statement in PDF', 'Net Banking / Account Aggregator direct fetch (Instant)'],
      detail: 'Reflecting direct employer salary credits and clean banking track.',
    },
    {
      category: 'Employment Proof',
      icon: ShieldCheck,
      items: ['Official corporate email ID verification (OTP)', 'Company ID card or Appointment Letter'],
      detail: 'Validates active employment status and organization categorization.',
    },
  ];

  const selfEmployedDocs = [
    {
      category: 'Identity & Age Proof',
      icon: CreditCard,
      items: ['PAN Card (Proprietor / Partner / Director)', 'Aadhaar Card / Valid Passport'],
      detail: 'Government photo identification with date of birth verification.',
    },
    {
      category: 'Business Proof & Vintage',
      icon: Building2,
      items: ['GST Registration Certificate', 'Shop & Establishment License / Udyam MSME Registration', 'Partnership Deed / MOA & AOA'],
      detail: 'Demonstrating minimum 2 years continuous business operations.',
    },
    {
      category: 'Financial Statements & ITR',
      icon: FileSpreadsheet,
      items: ['Last 2 years Income Tax Returns (ITR) with Computation of Income', 'Audited Balance Sheet and Profit & Loss Statement (CA certified)'],
      detail: 'Validating business profitability and debt servicing capability.',
    },
    {
      category: 'Current / Operative Bank Statements',
      icon: FileText,
      items: ['Latest 6 to 12 months operative business current account statements', 'Latest 6 months savings account statement of proprietor'],
      detail: 'Verification of business cashflow throughput and banking discipline.',
    },
  ];

  const currentDocs = activeTab === 'salaried' ? salariedDocs : selfEmployedDocs;

  return (
    <section id="documents" className="py-20 bg-white border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>100% Digital Document Submission</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Documentation Checklist
          </h2>
          <p className="text-base text-slate-600">
            Keep soft copies of these documents ready for instant e-KYC. Zero physical paperwork required.
          </p>

          {/* Profile Switcher Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 mt-4">
            <button
              onClick={() => setActiveTab('salaried')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'salaried'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Salaried Individuals
            </button>
            <button
              onClick={() => setActiveTab('self_employed')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'self_employed'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Self-Employed / Business
            </button>
          </div>
        </div>

        {/* Documents Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentDocs.map((doc, idx) => {
            const Icon = doc.icon;
            return (
              <div
                key={doc.category}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                      Doc 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-3">
                    {doc.category}
                  </h3>

                  <ul className="space-y-2 text-xs text-slate-700 mb-4">
                    {doc.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 italic">
                  {doc.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer as required by Section 11 of Prompt */}
        <div className="mt-10 p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-3 text-xs text-slate-700">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900">Important Advisory:</strong>{' '}
            Documents required may vary based on applicant profile, loan amount sanction, risk tier, and underwriting policy of the partnered lending institution. DigiLocker and Account Aggregator consent allows instantaneous verification without manual uploads.
          </div>
        </div>

      </div>
    </section>
  );
};
