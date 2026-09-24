import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  FileText, 
  Calculator, 
  ShieldCheck,
  PhoneCall,
  ArrowRight
} from 'lucide-react';
import { ClientConfig } from '../../types/loan';

interface FaqSectionProps {
  clientConfig: ClientConfig;
  onOpenApply: () => void;
}

interface FaqItem {
  id: string;
  category: 'general' | 'eligibility' | 'emi' | 'repayment';
  question: string;
  answer: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ clientConfig, onOpenApply }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string>('faq-1');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      category: 'general',
      question: `What is a Personal Loan from ${clientConfig.companyName}?`,
      answer: `A Personal Loan is an unsecured (collateral-free) multi-purpose loan designed to fulfill immediate financial requirements such as medical emergencies, home renovation, wedding expenses, debt consolidation, or higher education. Funds are disbursed directly to your verified bank account with a fixed repayment tenure from 12 to 84 months.`,
    },
    {
      id: 'faq-2',
      category: 'eligibility',
      question: 'Who is eligible to apply for a personal loan?',
      answer: `Any Indian resident aged between 21 and 58 years with a minimum regular net monthly income of ₹25,000 (in Tier-1 metro cities) or ₹20,000 (other locations). Salaried employees need at least 1 year of total work experience with at least 6 months in their current organization. A healthy CIBIL / credit bureau score (preferably 700+) qualifies you for lowest interest rates.`,
    },
    {
      id: 'faq-3',
      category: 'emi',
      question: 'How is the monthly EMI calculated?',
      answer: `EMIs are calculated using the standard reducing-balance amortization formula: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1], where P is Principal, R is monthly interest rate, and N is tenure in months. With each monthly payment, the principal component increases while the interest portion progressively decreases. You can use our interactive EMI calculator above to view exact monthly outgoes.`,
    },
    {
      id: 'faq-4',
      category: 'repayment',
      question: 'Can I prepay or foreclose my personal loan early? Are there penalties?',
      answer: `Yes, you can foreclose or part-prepay your loan. Under our transparent lending terms, there are ZERO (NIL) preclosure penalties after completion of 12 consecutive monthly EMIs. For part-prepayments, you can deposit surplus funds after 6 EMIs to reduce either your remaining tenure or your monthly installment.`,
    },
    {
      id: 'faq-5',
      category: 'eligibility',
      question: 'What documents are required to complete the digital application?',
      answer: `Because our process is 100% digital, physical document pickup is not required. You only need: (1) PAN Card, (2) Aadhaar Card for DigiLocker OTP e-KYC, (3) Latest 3 months salary slips, and (4) Latest 6 months bank account statement (either uploaded as PDF or validated via Net Banking / Account Aggregator).`,
    },
    {
      id: 'faq-6',
      category: 'general',
      question: 'What happens immediately after submitting an online application?',
      answer: `Once submitted, you receive an instant in-principle approval decision with a unique application tracking reference (e.g. VF-2026-894211). Our underwriting engine verifies your bank statement and KYC in real time. A dedicated loan officer reaches out if additional clarity is needed, followed by instant digital agreement e-Signing and direct NEFT/RTGS bank disbursal within 24 hours.`,
    },
    {
      id: 'faq-7',
      category: 'repayment',
      question: 'How do I pay my monthly EMIs?',
      answer: `Repayments are completely automated via National Automated Clearing House (e-NACH) or National Payments Corporation of India (NPCI) mandate set up on your primary salary bank account during the digital signing stage. Your monthly installment is automatically debited on your chosen preferred date (e.g. 5th of every calendar month).`,
    },
    {
      id: 'faq-8',
      category: 'emi',
      question: 'Are there any hidden charges or upfront fees?',
      answer: `No. We maintain strict transparency in compliance with the RBI Fair Practice Code. We never collect upfront cash fees or advance security deposits. The processing fee (1.0% - 2.5% + GST) is clearly disclosed upfront in your sanction letter and deducted directly from the gross disbursement amount.`,
    },
  ];

  const filteredFaqs = faqs.filter((f) => {
    const matchesCat = activeCategory === 'all' || f.category === activeCategory;
    const matchesSearch =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="faqs" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600">
            Everything you need to know about loan eligibility, interest calculations, tenure, and post-sanction disbursements.
          </p>
        </div>

        {/* Search bar & Category filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic (e.g., foreclosure, CIBIL, EMI, documents)..."
              className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-xs"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'general', label: 'About Personal Loans' },
              { id: 'eligibility', label: 'Eligibility & KYC' },
              { id: 'emi', label: 'EMI & Interest Rates' },
              { id: 'repayment', label: 'Repayment & Prepayment' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? '' : faq.id)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.question}
                    </span>
                    <div className={`p-1 rounded-full bg-slate-100 text-slate-600 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
              No questions matching "{searchQuery}". Try a different keyword or contact our support team.
            </div>
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Have a unique query or specific scenario?
              </h4>
              <p className="text-xs text-slate-500">
                Call our financial advisory desk at <strong>{clientConfig.supportPhone}</strong> ({clientConfig.supportHours})
              </p>
            </div>
          </div>

          <button
            onClick={onOpenApply}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 shrink-0"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
