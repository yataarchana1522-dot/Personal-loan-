export interface ClientConfig {
  companyName: string;
  brandTagline: string;
  nbfcRegistrationNo: string;
  lendingPartnerDisclosure: string;
  supportPhone: string;
  supportEmail: string;
  supportHours: string;
  registeredAddress: string;
  minLoanAmount: number;
  maxLoanAmount: number;
  minInterestRate: number;
  maxInterestRate: number;
  minTenureMonths: number;
  maxTenureMonths: number;
  processingFeePercent: number;
  gstPercent: number;
  grievanceOfficer: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface EmiCalculationResult {
  monthlyEmi: number;
  principal: number;
  totalInterest: number;
  totalPayment: number;
  processingFee: number;
  gstAmount: number;
  totalUpfrontCharges: number;
  netDisbursalAmount: number;
  yearlySchedule: AmortizationYear[];
}

export interface AmortizationYear {
  year: number;
  principalPaid: number;
  interestPaid: number;
  totalPaid: number;
  endingBalance: number;
}

export type EmploymentType = 'salaried' | 'self_employed_professional' | 'self_employed_business';

export interface EligibilityInput {
  employmentType: EmploymentType;
  monthlyIncome: number;
  existingEmis: number;
  tenureYears: number;
  interestRate: number;
  creditScoreRange: 'excellent' | 'good' | 'fair' | 'new_to_credit';
}

export interface EligibilityResult {
  isEligible: boolean;
  maxAllowableEmi: number;
  estimatedMaxLoan: number;
  disposableIncome: number;
  foirPercentage: number;
  recommendedTenureMonths: number;
  riskRating: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  messages: string[];
}

export interface LoanApplicationData {
  // Step 1: Personal
  fullName: string;
  email: string;
  mobile: string;
  dateOfBirth: string;
  panNumber: string;
  pincode: string;
  city: string;
  state: string;

  // Step 2: Professional / Income
  employmentType: EmploymentType;
  employerName: string;
  monthlyNetSalary: number;
  existingMonthlyObligations: number;
  salaryCreditMode: 'bank_transfer' | 'cheque' | 'cash';
  totalWorkExperienceYears: number;

  // Step 3: Loan Requirement
  loanAmount: number;
  tenureMonths: number;
  loanPurpose: string;
  
  // Step 4: Declarations
  agreedToTerms: boolean;
  consentedToCreditBureauCheck: boolean;
}

export interface LoanApplicationSubmissionResult {
  applicationId: string;
  referenceNumber: string;
  applicantName: string;
  sanctionedAmount: number;
  indicativeEmi: number;
  indicativeRate: number;
  tenureMonths: number;
  status: 'Pre-Approved (In-Principle)' | 'Under Verification' | 'Sanctioned';
  submittedAt: string;
  nextSteps: string[];
}
