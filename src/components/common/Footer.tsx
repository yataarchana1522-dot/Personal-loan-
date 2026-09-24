import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, ExternalLink, HelpCircle, FileText, Lock } from 'lucide-react';
import { ClientConfig } from '../../types/loan';
import { formatINR } from '../../utils/emiCalculator';

interface FooterProps {
  clientConfig: ClientConfig;
  onOpenApply: () => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({ clientConfig, onOpenApply, onOpenTracker }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1 & 2: Brand Overview & Regulatory Standing */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                {clientConfig.companyName}
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              {clientConfig.companyName} provides transparent, collateral-free personal loans engineered for salaried and self-employed professionals across India with zero hidden charges.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center text-slate-300 font-semibold gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Regulatory & Licensing Disclosure</span>
              </div>
              <p className="text-slate-400 font-mono text-[11px] leading-normal break-all">
                {clientConfig.nbfcRegistrationNo}
              </p>
              <p className="text-slate-400 font-mono text-[11px] leading-normal">
                {clientConfig.lendingPartnerDisclosure}
              </p>
            </div>
          </div>

          {/* Col 3: Loan Products */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider text-slate-200">
              Loan Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#loan-products" className="hover:text-white transition-colors">
                  Salaried Personal Loan
                </a>
              </li>
              <li>
                <a href="#loan-products" className="hover:text-white transition-colors">
                  Debt Consolidation Loan
                </a>
              </li>
              <li>
                <a href="#loan-products" className="hover:text-white transition-colors">
                  Home Renovation Loan
                </a>
              </li>
              <li>
                <a href="#loan-products" className="hover:text-white transition-colors">
                  Medical Emergency Loan
                </a>
              </li>
              <li>
                <a href="#loan-products" className="hover:text-white transition-colors">
                  Wedding & Event Loan
                </a>
              </li>
              <li>
                <a href="#loan-products" className="hover:text-white transition-colors">
                  Education & Travel Loan
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Calculators & Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider text-slate-200">
              Tools & Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#emi-calculator" className="hover:text-white transition-colors">
                  Personal Loan EMI Calculator
                </a>
              </li>
              <li>
                <a href="#eligibility" className="hover:text-white transition-colors">
                  Eligibility & FOIR Checker
                </a>
              </li>
              <li>
                <a href="#documents" className="hover:text-white transition-colors">
                  Documentation Checklist
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  5-Step Digital Journey
                </a>
              </li>
              <li>
                <button onClick={onOpenTracker} className="hover:text-white transition-colors text-left">
                  Check Loan Application Status
                </button>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Grievance Details */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider text-slate-200">
              Helpdesk & Grievance
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">{clientConfig.supportPhone}</span>
                  <span className="text-xs text-slate-400">{clientConfig.supportHours}</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${clientConfig.supportEmail}`} className="text-slate-300 hover:text-white">
                  {clientConfig.supportEmail}
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{clientConfig.registeredAddress}</span>
              </li>
              <li className="pt-2 border-t border-slate-800 text-xs text-slate-400">
                <strong className="text-slate-300 block">Grievance Redressal Officer:</strong>
                <span>{clientConfig.grievanceOfficer.name}</span>
                <span className="block">{clientConfig.grievanceOfficer.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Representative Example & APR Transparency Disclosure */}
        <div className="py-8 border-b border-slate-800/80 space-y-4 text-xs leading-relaxed text-slate-400">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h5 className="text-slate-200 font-semibold mb-1 flex items-center gap-1.5 text-xs">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              Statutory Representative Loan Example (As per RBI Transparency Guidelines):
            </h5>
            <p>
              For a representative loan of <strong>₹5,00,000</strong> borrowed at an annual interest rate of <strong>10.49% p.a.</strong> for a tenure of <strong>36 months (3 years)</strong>:
              Monthly EMI will be <strong>₹16,249</strong>. Total interest payable across 36 months will be <strong>₹84,964</strong>.
              Processing fee at 1.5% is <strong>₹7,500</strong> (+ 18% GST of ₹1,350 = ₹8,850).
              Total loan cost including principal, interest, and processing fee will be <strong>₹5,93,814</strong>.
              Actual APR ranges between <strong>10.49% to 22.0% p.a.</strong> depending on applicant credit score, employer categorization, income, and risk assessment.
            </p>
          </div>

          <p className="text-[11px] text-slate-400">
            <strong>Disclaimer:</strong> Approval of loan application and final interest rate offered is at the sole discretion of the partnering lending institutions / banks and based on credit bureau check, KYC validation, and internal risk underwriting policies. We do not charge any advance cash fees for loan processing. Beware of fraudulent calls demanding fee transfers to personal accounts.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} {clientConfig.companyName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-xs">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Terms & Conditions</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Fair Practice Code</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">RBI Sachet Portal</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Site Map</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
