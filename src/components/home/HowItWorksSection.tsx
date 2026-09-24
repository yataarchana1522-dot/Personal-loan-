import React from 'react';
import { 
  SearchCheck, 
  FileEdit, 
  ShieldAlert, 
  Award, 
  Banknote, 
  ArrowRight, 
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenApply: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenApply }) => {
  const steps = [
    {
      number: '01',
      title: 'Check Eligibility & Customize',
      duration: '2 Mins',
      icon: SearchCheck,
      description: 'Enter your basic income, employment profile, and loan requirement to get instant pre-qualification without credit score impact.',
      tag: 'Soft Inquiry',
    },
    {
      number: '02',
      title: 'Digital Application & KYC',
      duration: '5 Mins',
      icon: FileEdit,
      description: 'Complete our secure 4-step online form. Verify identity seamlessly with Aadhaar OTP via DigiLocker and PAN verification.',
      tag: 'Paperless',
    },
    {
      number: '03',
      title: 'Underwriting & Bank Fetch',
      duration: 'Automated',
      icon: ShieldAlert,
      description: 'Our automated algorithms evaluate salary credits and debt service capacity to generate your customized in-principle sanction.',
      tag: 'Real-time',
    },
    {
      number: '04',
      title: 'Sanction Letter & e-Sign',
      duration: 'Same Day',
      icon: Award,
      description: 'Review transparent terms, monthly EMI schedule, and interest rates. Digitally sign the loan agreement with Aadhaar e-Sign.',
      tag: 'Instant Agreement',
    },
    {
      number: '05',
      title: 'Direct Bank Disbursement',
      duration: 'Within 24 Hours',
      icon: Banknote,
      description: 'Approved funds are transferred directly to your designated bank account via NEFT/RTGS with automated e-NACH mandate set up.',
      tag: 'Funds Transferred',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-900 text-white border-b border-slate-800 scroll-mt-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>Fast-Track Borrowing Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            From Application to Disbursement in 5 Steps
          </h2>
          <p className="text-base text-slate-300">
            A frictionless, 100% digital borrowing workflow designed for speed, clarity, and zero bureaucratic friction.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 -translate-y-12 z-0 opacity-40"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.number}
                  className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-blue-500 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Step Header */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 font-mono">
                        {s.number}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                        {s.duration}
                      </span>
                    </div>

                    {/* Icon Bubble */}
                    <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-white mb-2 leading-snug">
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      {s.tag}
                    </span>
                    <CheckCircle className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white">
              Ready to begin your loan application?
            </h4>
            <p className="text-xs text-slate-300">
              Complete your pre-qualification in just 2 minutes with no fee or credit score obligations.
            </p>
          </div>
          <button
            onClick={onOpenApply}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 shrink-0 cursor-pointer active:scale-98"
          >
            <span>Start Digital Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
