import React from 'react';
import { 
  ShieldCheck, 
  FileCheck2, 
  Zap, 
  Percent, 
  Headphones, 
  CheckCircle2, 
  Lock,
  Building2,
  FileSpreadsheet
} from 'lucide-react';
import { ClientConfig } from '../../types/loan';

interface TrustSectionProps {
  clientConfig: ClientConfig;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ clientConfig }) => {
  const trustPillars = [
    {
      icon: Zap,
      title: 'Digital In-Principle Sanction',
      description: 'Algorithmically assessed eligibility in minutes without physical bank branch visits.',
      tag: 'Speed',
    },
    {
      icon: Percent,
      title: 'Clear Transparent Pricing',
      description: 'Zero hidden administrative surcharges. Clear APR, interest rate, and processing fee disclosure upfront.',
      tag: 'Transparency',
    },
    {
      icon: Lock,
      title: 'Bank-Grade Data Privacy',
      description: '256-bit SSL encrypted sessions. Your KYC data is handled strictly under RBI data protection protocols.',
      tag: 'Security',
    },
    {
      icon: Headphones,
      title: 'Dedicated Loan Specialist',
      description: 'A dedicated relationship desk assists you from document verification through to post-disbursement queries.',
      tag: 'Support',
    },
  ];

  return (
    <section className="bg-slate-900 border-b border-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compliance Notice Strip */}
        <div className="mb-10 p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Institutional Lending Network
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                {clientConfig.lendingPartnerDisclosure}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[11px] px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono">
              NBFC Reg: {clientConfig.nbfcRegistrationNo}
            </span>
          </div>
        </div>

        {/* 4 Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.title}
                className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/60 hover:border-slate-600 transition-all hover:-translate-y-0.5 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                    {pillar.tag}
                  </span>
                </div>
                
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Client Audited Metrics Placeholder Strip (Compliant with Prompt Section 7) */}
        <div className="mt-10 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-3">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
              Cumulative Loans Facilitated
            </span>
            <span className="text-xl font-bold text-slate-200 font-mono mt-1 block">
              [CLIENT TO PROVIDE]
            </span>
            <span className="text-[10px] text-slate-500">Subject to statutory audit report</span>
          </div>

          <div className="p-3">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
              Average Disbursal Turnaround
            </span>
            <span className="text-xl font-bold text-emerald-400 font-mono mt-1 block">
              Same-Day to 24 Hours
            </span>
            <span className="text-[10px] text-slate-500">Post digital document verification</span>
          </div>

          <div className="p-3">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
              Customer Satisfaction Score
            </span>
            <span className="text-xl font-bold text-slate-200 font-mono mt-1 block">
              [CLIENT TO PROVIDE]
            </span>
            <span className="text-[10px] text-slate-500">Verified third-party review audit</span>
          </div>
        </div>

      </div>
    </section>
  );
};
