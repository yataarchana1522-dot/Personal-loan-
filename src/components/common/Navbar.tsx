import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  PhoneCall, 
  SlidersHorizontal, 
  Menu, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Search,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { ClientConfig } from '../../types/loan';

interface NavbarProps {
  clientConfig: ClientConfig;
  onOpenApply: (prefilledAmount?: number, purpose?: string) => void;
  onOpenTracker: () => void;
  onOpenConfig: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  clientConfig,
  onOpenApply,
  onOpenTracker,
  onOpenConfig,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Personal Loan', href: '#loan-products' },
    { label: 'EMI Calculator', href: '#emi-calculator' },
    { label: 'Eligibility', href: '#eligibility' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Charges & APR', href: '#charges' },
    { label: 'FAQs', href: '#faqs' },
  ];

  return (
    <>
      {/* Top Regulatory & Support Announcement Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-2 text-center sm:text-left">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/80">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              100% Digital & Secure
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">
              Starting at 10.49% p.a. • Zero Prepayment Penalty on select tenures
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href={`tel:${clientConfig.supportPhone}`} 
              className="flex items-center hover:text-white transition-colors text-slate-300"
            >
              <PhoneCall className="w-3.5 h-3.5 mr-1 text-blue-400" />
              <span className="font-medium">{clientConfig.supportPhone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenConfig}
              title="Client Settings & Requirements"
              className="flex items-center text-slate-400 hover:text-blue-300 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3 h-3 mr-1" />
              <span>Client Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3' 
            : 'bg-white border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  {clientConfig.companyName}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                Financial Services
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenTracker}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-200"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Track Application</span>
            </button>

            <button
              onClick={() => onOpenApply()}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-600/25 transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/35 active:scale-98 flex items-center gap-2"
            >
              <span>Apply for Loan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => onOpenApply()}
              className="sm:hidden px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg shadow"
            >
              Apply
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1 py-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTracker();
                }}
                className="w-full py-2.5 px-4 text-sm font-medium text-slate-700 border border-slate-300 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span>Track Existing Application</span>
              </button>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApply();
                }}
                className="w-full py-3 px-4 text-sm font-semibold bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-600/30"
              >
                <span>Apply for Personal Loan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
