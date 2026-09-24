import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  User, 
  Briefcase, 
  Coins, 
  FileCheck, 
  ShieldCheck, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  Calendar,
  Building2,
  Lock,
  Download,
  PhoneCall,
  ChevronRight
} from 'lucide-react';
import { ClientConfig, EmploymentType, LoanApplicationData, LoanApplicationSubmissionResult } from '../../types/loan';
import { calculateEmi, formatCompactINR, formatINR } from '../../utils/emiCalculator';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientConfig: ClientConfig;
  initialAmount?: number;
  initialPurpose?: string;
  onViewTracker?: (refNo: string) => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  clientConfig,
  initialAmount = 500000,
  initialPurpose = 'Personal & Family Expenses',
  onViewTracker,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionProgressText, setSubmissionProgressText] = useState<string>('Initiating application...');
  const [submittedData, setSubmittedData] = useState<LoanApplicationSubmissionResult | null>(null);

  // Form State
  const [formData, setFormData] = useState<LoanApplicationData>({
    fullName: '',
    email: '',
    mobile: '',
    dateOfBirth: '1992-05-15',
    panNumber: '',
    pincode: '400051',
    city: 'Mumbai',
    state: 'Maharashtra',
    employmentType: 'salaried',
    employerName: '',
    monthlyNetSalary: 65000,
    existingMonthlyObligations: 5000,
    salaryCreditMode: 'bank_transfer',
    totalWorkExperienceYears: 4,
    loanAmount: initialAmount,
    tenureMonths: 36,
    loanPurpose: initialPurpose,
    agreedToTerms: false,
    consentedToCreditBureauCheck: false,
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialAmount) {
      setFormData((prev) => ({
        ...prev,
        loanAmount: Math.min(clientConfig.maxLoanAmount, Math.max(clientConfig.minLoanAmount, initialAmount)),
      }));
    }
    if (initialPurpose) {
      setFormData((prev) => ({ ...prev, loanPurpose: initialPurpose }));
    }
  }, [initialAmount, initialPurpose, clientConfig]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof LoanApplicationData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Step validation
  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) errs.fullName = 'Full Name as per PAN is required';
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errs.email = 'Please provide a valid email address';
      }
      if (!formData.mobile.trim() || !/^[6-9]\d{9}$/.test(formData.mobile)) {
        errs.mobile = 'Enter a valid 10-digit Indian mobile number';
      }
      if (!formData.panNumber.trim() || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.toUpperCase())) {
        errs.panNumber = 'Valid 10-digit alphanumeric PAN is required (e.g. ABCDE1234F)';
      }
      if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode)) {
        errs.pincode = 'Enter a valid 6-digit postal PIN code';
      }
    }

    if (step === 2) {
      if (!formData.employerName.trim()) {
        errs.employerName = formData.employmentType === 'salaried' ? 'Company / Employer Name is required' : 'Business / Firm Name is required';
      }
      if (formData.monthlyNetSalary < 20000) {
        errs.monthlyNetSalary = 'Minimum monthly net income must be at least ₹20,000';
      }
    }

    if (step === 3) {
      if (formData.loanAmount < clientConfig.minLoanAmount || formData.loanAmount > clientConfig.maxLoanAmount) {
        errs.loanAmount = `Loan amount must be between ${formatINR(clientConfig.minLoanAmount)} and ${formatINR(clientConfig.maxLoanAmount)}`;
      }
      if (!formData.loanPurpose.trim()) {
        errs.loanPurpose = 'Please select or describe loan purpose';
      }
    }

    if (step === 4) {
      if (!formData.agreedToTerms) {
        errs.agreedToTerms = 'You must agree to the product terms & conditions';
      }
      if (!formData.consentedToCreditBureauCheck) {
        errs.consentedToCreditBureauCheck = 'Consent to check credit bureau report is required for underwriting';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Step 5: Final Submission Handler
  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setCurrentStep(5);

    // Progressive simulated KYC & Risk assessment statuses
    setSubmissionProgressText('Validating PAN and KYC records with NSDL...');
    await new Promise((r) => setTimeout(r, 800));

    setSubmissionProgressText('Performing soft credit bureau inquiry & FOIR risk calculation...');
    await new Promise((r) => setTimeout(r, 900));

    setSubmissionProgressText('Generating in-principle sanction terms and application reference...');
    await new Promise((r) => setTimeout(r, 800));

    // Formulate submission response
    const refNumber = `VF-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const calc = calculateEmi(formData.loanAmount, clientConfig.minInterestRate, formData.tenureMonths);

    const result: LoanApplicationSubmissionResult = {
      applicationId: `APP-${Date.now()}`,
      referenceNumber: refNumber,
      applicantName: formData.fullName,
      sanctionedAmount: formData.loanAmount,
      indicativeEmi: calc.monthlyEmi,
      indicativeRate: clientConfig.minInterestRate,
      tenureMonths: formData.tenureMonths,
      status: 'Pre-Approved (In-Principle)',
      submittedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      nextSteps: [
        'Aadhaar OTP e-Sign of Sanction Letter & Key Fact Statement (KFS)',
        'Digital e-NACH auto-debit setup for monthly EMI mandate',
        'Final disbursement transfer directly into your salary account within 24 hours',
      ],
    };

    setSubmittedData(result);
    setIsSubmitting(false);
  };

  // Current calculation for preview
  const liveEmi = calculateEmi(formData.loanAmount, clientConfig.minInterestRate, formData.tenureMonths);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">
                {submittedData ? 'Application Result' : 'Personal Loan Digital Application'}
              </h3>
              <p className="text-xs text-slate-400">
                {submittedData ? 'In-Principle Sanction Summary' : `Step ${currentStep} of 4: Fast & Paperless Process`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step Progress Bar (when not finished) */}
        {!submittedData && (
          <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 shrink-0">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
              <span className={currentStep >= 1 ? 'text-blue-700 font-bold' : ''}>1. Personal</span>
              <span className={currentStep >= 2 ? 'text-blue-700 font-bold' : ''}>2. Income</span>
              <span className={currentStep >= 3 ? 'text-blue-700 font-bold' : ''}>3. Loan Plan</span>
              <span className={currentStep >= 4 ? 'text-blue-700 font-bold' : ''}>4. Review</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(Math.min(4, currentStep) / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Form Body / Content Scrollable Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {/* STEP 1: Personal & KYC Details */}
          {currentStep === 1 && !submittedData && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900">Personal & KYC Details</h4>
                <p className="text-xs text-slate-500">
                  Please enter your identity details exactly as they appear on your government PAN card.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name (as per PAN Card) *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.fullName ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                  }`}
                />
                {errors.fullName && <p className="text-rose-600 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number (linked to Aadhaar) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-semibold">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={formData.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value.replace(/\D/g, ''))}
                      placeholder="9876543210"
                      className={`w-full pl-12 pr-3.5 py-2.5 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.mobile ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {errors.mobile && <p className="text-rose-600 text-xs mt-1">{errors.mobile}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="name@example.com"
                    className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.email ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                    }`}
                  />
                  {errors.email && <p className="text-rose-600 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    PAN Card Number *
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    value={formData.panNumber}
                    onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())}
                    placeholder="ABCDE1234F"
                    className={`w-full px-3.5 py-2.5 text-sm font-mono uppercase border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.panNumber ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                    }`}
                  />
                  {errors.panNumber && <p className="text-rose-600 text-xs mt-1">{errors.panNumber}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current PIN *</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none"
                  />
                  {errors.pincode && <p className="text-rose-600 text-[10px] mt-1">{errors.pincode}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Employment & Income Details */}
          {currentStep === 2 && !submittedData && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900">Employment & Financial Profile</h4>
                <p className="text-xs text-slate-500">
                  Help us evaluate your FOIR borrowing capacity with your employer and income details.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Employment Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'salaried', label: 'Salaried Corporate' },
                    { id: 'self_employed_professional', label: 'Self-Employed' },
                    { id: 'self_employed_business', label: 'Business Owner' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleInputChange('employmentType', t.id as EmploymentType)}
                      className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all text-center ${
                        formData.employmentType === t.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {formData.employmentType === 'salaried' ? 'Employer / Company Name *' : 'Registered Business / Firm Name *'}
                </label>
                <input
                  type="text"
                  value={formData.employerName}
                  onChange={(e) => handleInputChange('employerName', e.target.value)}
                  placeholder="e.g. Infosys Ltd / Tata Consultancy Services"
                  className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.employerName ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                  }`}
                />
                {errors.employerName && <p className="text-rose-600 text-xs mt-1">{errors.employerName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Net Monthly In-Hand Salary (₹) *
                  </label>
                  <input
                    type="number"
                    step={1000}
                    value={formData.monthlyNetSalary}
                    onChange={(e) => handleInputChange('monthlyNetSalary', Number(e.target.value))}
                    className={`w-full px-3.5 py-2.5 text-sm font-semibold border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.monthlyNetSalary ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                    }`}
                  />
                  {errors.monthlyNetSalary && <p className="text-rose-600 text-xs mt-1">{errors.monthlyNetSalary}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Existing Monthly Loan / Card EMIs (₹)
                  </label>
                  <input
                    type="number"
                    step={1000}
                    value={formData.existingMonthlyObligations}
                    onChange={(e) => handleInputChange('existingMonthlyObligations', Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm font-semibold border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-500">Put 0 if you have zero existing loans</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Salary Credit Method
                  </label>
                  <select
                    value={formData.salaryCreditMode}
                    onChange={(e) => handleInputChange('salaryCreditMode', e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:outline-none"
                  >
                    <option value="bank_transfer">Direct Bank Transfer (NEFT/IMPS)</option>
                    <option value="cheque">Company Cheque</option>
                    <option value="cash">Cash in hand</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Total Work Experience (Years)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={formData.totalWorkExperienceYears}
                    onChange={(e) => handleInputChange('totalWorkExperienceYears', Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Loan Requirement */}
          {currentStep === 3 && !submittedData && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900">Loan Amount & Repayment Choice</h4>
                <p className="text-xs text-slate-500">
                  Tailor your preferred loan amount and monthly repayment tenure.
                </p>
              </div>

              {/* Amount slider */}
              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">Required Loan Amount</span>
                  <span className="text-base font-extrabold text-blue-700 font-tabular">
                    {formatINR(formData.loanAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min={clientConfig.minLoanAmount}
                  max={clientConfig.maxLoanAmount}
                  step={25000}
                  value={formData.loanAmount}
                  onChange={(e) => handleInputChange('loanAmount', Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{formatINR(clientConfig.minLoanAmount)}</span>
                  <span>{formatINR(clientConfig.maxLoanAmount)}</span>
                </div>
              </div>

              {/* Tenure Picker */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Repayment Tenure: {formData.tenureMonths} Months ({formData.tenureMonths / 12} Years)
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {[12, 24, 36, 48, 60, 84].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => handleInputChange('tenureMonths', m)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        formData.tenureMonths === m
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {m / 12} Yrs
                    </button>
                  ))}
                </div>
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Purpose of Loan *
                </label>
                <select
                  value={formData.loanPurpose}
                  onChange={(e) => handleInputChange('loanPurpose', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:outline-none"
                >
                  <option value="Personal & Family Expenses">Personal & Family Expenses</option>
                  <option value="Debt Consolidation">Debt Consolidation & Credit Card Clearance</option>
                  <option value="Medical Emergency">Medical Emergency / Healthcare</option>
                  <option value="Home Renovation">Home Renovation / Improvement</option>
                  <option value="Wedding / Family Function">Wedding / Family Function</option>
                  <option value="Higher Education">Higher Education / Skill Certifications</option>
                  <option value="Travel & Vacation">Travel & Relocation</option>
                </select>
              </div>

              {/* Live EMI calculation widget */}
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-blue-800 font-semibold uppercase tracking-wider block">
                    Indicative Monthly Installment
                  </span>
                  <div className="text-xl font-bold text-slate-900 font-tabular mt-0.5">
                    {formatINR(liveEmi.monthlyEmi)}
                    <span className="text-xs text-slate-500 font-normal"> /month</span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    At starting rate of {clientConfig.minInterestRate}% p.a.
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                  Zero Prepayment Penalty
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Declarations */}
          {currentStep === 4 && !submittedData && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900">Review & Confirm Application</h4>
                <p className="text-xs text-slate-500">
                  Verify your details before submitting for digital in-principle approval.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-bold text-slate-900">{formData.fullName} ({formData.mobile})</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">PAN & City:</span>
                  <span className="font-mono font-bold text-slate-900">{formData.panNumber} • {formData.city}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Employer & Net Income:</span>
                  <span className="font-bold text-slate-900">{formData.employerName} • {formatINR(formData.monthlyNetSalary)}/mo</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Loan Requested:</span>
                  <span className="font-extrabold text-blue-700 text-sm font-tabular">{formatINR(formData.loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tenure & Est. EMI:</span>
                  <span className="font-bold text-slate-900">{formData.tenureMonths} Months • {formatINR(liveEmi.monthlyEmi)}/mo</span>
                </div>
              </div>

              {/* Declarations & Regulatory Consents */}
              <div className="space-y-3 pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span>
                    I hereby declare that all information provided is accurate and true to my knowledge. I agree to {clientConfig.companyName}'s Terms of Service and Privacy Policy.
                  </span>
                </label>
                {errors.agreedToTerms && <p className="text-rose-600 text-xs pl-6">{errors.agreedToTerms}</p>}

                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.consentedToCreditBureauCheck}
                    onChange={(e) => handleInputChange('consentedToCreditBureauCheck', e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span>
                    I authorize {clientConfig.companyName} and its partnering RBI-registered NBFCs/Banks to pull my credit information report from CIBIL/Experian/Equifax/CRIF for underwriting this loan application.
                  </span>
                </label>
                {errors.consentedToCreditBureauCheck && (
                  <p className="text-rose-600 text-xs pl-6">{errors.consentedToCreditBureauCheck}</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: Submitting Progress Loader */}
          {currentStep === 5 && isSubmitting && (
            <div className="py-16 text-center space-y-6 animate-in fade-in duration-300">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-blue-600">
                  <Sparkles className="w-8 h-8" />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-slate-900">Underwriting In Progress...</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto font-medium">
                  {submissionProgressText}
                </p>
                <p className="text-[11px] text-slate-400">
                  Please do not refresh or close this browser window.
                </p>
              </div>
            </div>
          )}

          {/* STEP 5 Result: Application Submitted Successfully Screen */}
          {submittedData && (
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
              {/* Success Banner */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-slate-900">
                  Application Submitted Successfully
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your application has been logged into our underwriting engine. Your in-principle sanction is generated below.
                </p>
              </div>

              {/* Sanction Summary Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 space-y-4">
                <div className="flex justify-between items-start pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Application Reference Number
                    </span>
                    <h5 className="text-xl font-bold font-mono text-white mt-0.5">
                      {submittedData.referenceNumber}
                    </h5>
                    <span className="text-[11px] text-slate-400">Submitted on: {submittedData.submittedAt}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {submittedData.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Sanction Amount</span>
                    <span className="text-base font-bold text-white font-tabular">
                      {formatINR(submittedData.sanctionedAmount)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Monthly EMI</span>
                    <span className="text-base font-bold text-white font-tabular">
                      {formatINR(submittedData.indicativeEmi)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Tenure</span>
                    <span className="text-base font-bold text-white">
                      {submittedData.tenureMonths} Mo
                    </span>
                  </div>
                </div>
              </div>

              {/* Next Steps Timeline (As instructed by Section 18) */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  What Happens Next (Within 24 Hours)
                </h5>
                <div className="space-y-2 text-xs">
                  {submittedData.nextSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support & Tracking Notice */}
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Assistance Helpline: <strong>{clientConfig.supportPhone}</strong></span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    if (onViewTracker) onViewTracker(submittedData.referenceNumber);
                  }}
                  className="text-blue-700 font-bold hover:underline"
                >
                  Track Live Status →
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer / Navigation Controls */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between shrink-0">
          {!submittedData ? (
            <>
              {currentStep > 1 && currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Step</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
              )}

              {currentStep < 4 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Proceed to Step {currentStep + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {currentStep === 4 && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-500/25 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Submit Application</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 border border-slate-300 rounded-xl hover:bg-slate-100 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Save Summary</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl"
              >
                Done
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
