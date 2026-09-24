import React, { useState } from 'react';
import { getClientConfig } from './config/clientConfig';
import { ClientConfig } from './types/loan';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ClientConfigModal } from './components/common/ClientConfigModal';
import { ApplicationTrackerModal } from './components/common/ApplicationTrackerModal';
import { Hero } from './components/home/Hero';
import { TrustSection } from './components/home/TrustSection';
import { LoanProductsSection } from './components/home/LoanProductsSection';
import { EmiCalculatorSection } from './components/home/EmiCalculatorSection';
import { EligibilitySection } from './components/home/EligibilitySection';
import { DocumentsSection } from './components/home/DocumentsSection';
import { HowItWorksSection } from './components/home/HowItWorksSection';
import { WhyChooseUsSection } from './components/home/WhyChooseUsSection';
import { TestimonialSection } from './components/home/TestimonialSection';
import { FaqSection } from './components/home/FaqSection';
import { ApplicationModal } from './components/application/ApplicationModal';
import { ShieldCheck, PhoneCall, ArrowRight, Sparkles, SlidersHorizontal } from 'lucide-react';
import { formatINR } from './utils/emiCalculator';

export default function App() {
  const [clientConfig, setClientConfig] = useState<ClientConfig>(getClientConfig());
  
  // Modals state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState<boolean>(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);

  // Pre-filled application values
  const [applyAmount, setApplyAmount] = useState<number>(500000);
  const [applyPurpose, setApplyPurpose] = useState<string>('Personal & Family Expenses');

  const handleOpenApply = (amount?: number, purpose?: string) => {
    if (amount) setApplyAmount(amount);
    if (purpose) setApplyPurpose(purpose);
    setIsApplyModalOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Sticky Top Bar & Navigation */}
      <Navbar
        clientConfig={clientConfig}
        onOpenApply={() => handleOpenApply()}
        onOpenTracker={() => setIsTrackerModalOpen(true)}
        onOpenConfig={() => setIsConfigModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          clientConfig={clientConfig}
          onOpenApply={(amount) => handleOpenApply(amount)}
          onScrollToEmi={() => handleScrollToSection('emi-calculator')}
          onScrollToEligibility={() => handleScrollToSection('eligibility')}
        />

        {/* Institutional Trust & Compliance Bar */}
        <TrustSection clientConfig={clientConfig} />

        {/* Loan Product Section */}
        <LoanProductsSection
          clientConfig={clientConfig}
          onOpenApply={(amount, purpose) => handleOpenApply(amount, purpose)}
        />

        {/* Interactive EMI Calculator Section */}
        <EmiCalculatorSection
          clientConfig={clientConfig}
          onOpenApply={(amount) => handleOpenApply(amount)}
        />

        {/* Eligibility & FOIR Pre-Qualification Section */}
        <EligibilitySection
          clientConfig={clientConfig}
          onOpenApply={(amount) => handleOpenApply(amount)}
        />

        {/* Required Documents Section */}
        <DocumentsSection />

        {/* How It Works (5-Step Journey) */}
        <HowItWorksSection onOpenApply={() => handleOpenApply()} />

        {/* Why Choose Us & Schedule of Charges */}
        <WhyChooseUsSection
          clientConfig={clientConfig}
          onOpenApply={() => handleOpenApply()}
        />

        {/* Customer Testimonials Placeholder Section (Strictly no fake reviews) */}
        <TestimonialSection clientConfig={clientConfig} />

        {/* Interactive FAQ Accordion */}
        <FaqSection
          clientConfig={clientConfig}
          onOpenApply={() => handleOpenApply()}
        />

        {/* Final Conversion High-Impact Banner */}
        <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-blue-200 border border-white/20 inline-block">
              Fast-Track Approval
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight max-w-2xl mx-auto">
              Ready to Fulfill Your Personal Ambitions?
            </h2>
            <p className="text-blue-100 text-base max-w-xl mx-auto">
              Apply online in under 5 minutes. Enjoy transparent rates starting from {clientConfig.minInterestRate}% p.a. and same-day direct bank disbursement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => handleOpenApply()}
                className="px-8 py-4 rounded-xl bg-white text-blue-900 font-extrabold text-sm shadow-xl hover:bg-blue-50 transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Apply for Personal Loan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScrollToSection('emi-calculator')}
                className="px-6 py-4 rounded-xl bg-blue-900/60 hover:bg-blue-900 text-white font-semibold text-sm border border-blue-400/30 transition-all cursor-pointer"
              >
                Recalculate EMI
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Institutional Financial Footer */}
      <Footer
        clientConfig={clientConfig}
        onOpenApply={() => handleOpenApply()}
        onOpenTracker={() => setIsTrackerModalOpen(true)}
      />

      {/* Multi-Step Application Modal */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        clientConfig={clientConfig}
        initialAmount={applyAmount}
        initialPurpose={applyPurpose}
        onViewTracker={(refNo) => {
          setIsApplyModalOpen(false);
          setIsTrackerModalOpen(true);
        }}
      />

      {/* Application Status Tracker Modal */}
      <ApplicationTrackerModal
        isOpen={isTrackerModalOpen}
        onClose={() => setIsTrackerModalOpen(false)}
        onOpenApply={() => {
          setIsTrackerModalOpen(false);
          handleOpenApply();
        }}
      />

      {/* Client Content Settings Modal (Allows client to modify copy, limits, NBFC code live) */}
      <ClientConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        config={clientConfig}
        onUpdateConfig={(newCfg) => setClientConfig(newCfg)}
      />

      {/* Floating Bottom-Right Quick Action Button */}
      <aside aria-label="Quick Actions" className="fixed bottom-5 right-5 z-30 flex items-center gap-2">
        <button
          onClick={() => setIsConfigModalOpen(true)}
          title="Client Settings & Requirements"
          aria-label="Client Settings & Requirements"
          className="p-3 bg-slate-900/90 hover:bg-slate-900 text-white rounded-full shadow-lg border border-slate-700 backdrop-blur-sm transition-transform hover:scale-105"
        >
          <SlidersHorizontal className="w-5 h-5 text-blue-400" />
        </button>

        <button
          onClick={() => handleOpenApply()}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-blue-200" />
          <span>Apply Now</span>
        </button>
      </aside>
    </div>
  );
}
