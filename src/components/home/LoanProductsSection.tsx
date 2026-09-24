import React, { useState } from 'react';
import { 
  Briefcase, 
  HeartPulse, 
  Home, 
  RotateCcw, 
  Sparkles, 
  GraduationCap, 
  ArrowRight, 
  Check, 
  Info,
  Calendar,
  Percent,
  Wallet
} from 'lucide-react';
import { ClientConfig } from '../../types/loan';
import { formatCompactINR, formatINR } from '../../utils/emiCalculator';

interface LoanProductsSectionProps {
  clientConfig: ClientConfig;
  onOpenApply: (amount?: number, purpose?: string) => void;
}

interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  icon: any;
  maxAmount: number;
  startingRate: number;
  tenureRange: string;
  processingFee: string;
  idealFor: string;
  highlights: string[];
}

export const LoanProductsSection: React.FC<LoanProductsSectionProps> = ({
  clientConfig,
  onOpenApply,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const products: ProductItem[] = [
    {
      id: 'salaried',
      name: 'Salaried Executive Loan',
      tagline: 'Collateral-free personal financing with immediate sanction for corporate employees.',
      badge: 'Most Popular',
      icon: Briefcase,
      maxAmount: clientConfig.maxLoanAmount,
      startingRate: clientConfig.minInterestRate,
      tenureRange: '12 to 84 Months',
      processingFee: '1.0% - 2.0% + GST',
      idealFor: 'Employees in private/public sector with min salary ₹25,000/mo',
      highlights: [
        'Instant digital sanction based on salary account statements',
        'Special rate concessions for Category A & Super-A employers',
        'Part-prepayment permitted after 6 monthly EMIs',
      ],
    },
    {
      id: 'debt_consolidation',
      name: 'Debt Consolidation Loan',
      tagline: 'Combine multiple credit card dues and high-interest loans into one simple, lower monthly EMI.',
      badge: 'Save on Interest',
      icon: RotateCcw,
      maxAmount: 3000000,
      startingRate: 10.99,
      tenureRange: '12 to 60 Months',
      processingFee: '1.5% + GST',
      idealFor: 'Individuals managing multiple credit balances and looking to optimize cashflow',
      highlights: [
        'Save up to 40% on overall interest outgo compared to credit cards',
        'Single monthly payment date to streamline financial budgeting',
        'Direct clearing of existing lender dues available on request',
      ],
    },
    {
      id: 'medical_emergency',
      name: 'Medical & Healthcare Loan',
      tagline: 'Urgent medical assistance financing with prioritized expedited same-day disbursement.',
      badge: 'Fast-Track',
      icon: HeartPulse,
      maxAmount: 2000000,
      startingRate: 10.49,
      tenureRange: '12 to 48 Months',
      processingFee: '1.0% + GST',
      idealFor: 'Hospitalization, elective surgeries, treatments, and post-operative care',
      highlights: [
        'Priority documentation processing with 4-hour in-principle approval',
        'Direct hospital billing desk disbursement option available',
        'Minimal paperwork for immediate relief and peace of mind',
      ],
    },
    {
      id: 'home_renovation',
      name: 'Home Improvement & Decor',
      tagline: 'Upgrade your living space, modular kitchen, electrical fittings, and furnishings.',
      icon: Home,
      maxAmount: 2500000,
      startingRate: 11.25,
      tenureRange: '12 to 60 Months',
      processingFee: '1.5% + GST',
      idealFor: 'Homeowners and long-term tenants enhancing their residence',
      highlights: [
        'No mortgage or property valuation report needed',
        'Flexible tranche withdrawal to pay contractors as work progresses',
        'Repayment tenures tailored to align with annual festival bonuses',
      ],
    },
    {
      id: 'wedding_events',
      name: 'Wedding & Family Events',
      tagline: 'Celebrate your special moments with complete peace of mind and generous financing.',
      icon: Sparkles,
      maxAmount: 2500000,
      startingRate: 11.49,
      tenureRange: '12 to 60 Months',
      processingFee: '1.5% + GST',
      idealFor: 'Bridal expenses, venue bookings, catering, and event logistics',
      highlights: [
        'High sanction limits to comfortably cover unexpected event outlays',
        'Transparent repayment schedule with predictable fixed monthly EMIs',
        'Co-applicant facility to enhance maximum loan eligibility limit',
      ],
    },
    {
      id: 'education_travel',
      name: 'Education & Global Travel',
      tagline: 'Fund executive management certifications, foreign university preparatory fees, or dream getaways.',
      icon: GraduationCap,
      maxAmount: 2000000,
      startingRate: 10.99,
      tenureRange: '12 to 48 Months',
      processingFee: '1.25% + GST',
      idealFor: 'Mid-career professionals upskilling or planned sabbatical vacations',
      highlights: [
        'Covers course fees, airfares, visa processing, and living expenses',
        'Fast online processing without collateral pledge requirements',
        'Pre-closure flexibility without lock-in after 12 months',
      ],
    },
  ];

  return (
    <section id="loan-products" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <span>Tailored Loan Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Personal Loans for Every Milestone
          </h2>
          <p className="text-base text-slate-600">
            Compare our transparent, collateral-free borrowing products. Each is designed with fixed EMIs, competitive interest rates, and flexible pre-closure options.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    {item.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div className="p-6 pt-5 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {item.tagline}
                      </p>
                    </div>

                    {/* Key Metrics Table */}
                    <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <div>
                        <span className="text-slate-500 block text-[11px]">Starting Rate</span>
                        <span className="font-bold text-slate-900 text-sm font-tabular">
                          {item.startingRate}% <span className="text-[10px] text-slate-500 font-normal">p.a.</span>
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Max Limit</span>
                        <span className="font-bold text-slate-900 text-sm font-tabular">
                          {formatCompactINR(item.maxAmount)}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Tenure</span>
                        <span className="font-semibold text-slate-800">{item.tenureRange}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Processing Fee</span>
                        <span className="font-semibold text-slate-800">{item.processingFee}</span>
                      </div>
                    </div>

                    {/* Bullet Highlights */}
                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                        Key Features
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {item.highlights.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-6 pt-3 bg-slate-50/50 border-t border-slate-100">
                  <button
                    onClick={() => onOpenApply(Math.min(500000, item.maxAmount), item.name)}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-blue-600 hover:text-white border border-slate-200 text-slate-800 font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 cursor-pointer"
                  >
                    <span>Apply for {item.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
