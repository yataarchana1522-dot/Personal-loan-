import { EligibilityInput, EligibilityResult } from '../types/loan';

/**
 * Evaluates personal loan borrowing eligibility using standard banking FOIR guidelines.
 * Standard maximum Fixed Obligation to Income Ratio is 50% for standard incomes,
 * and up to 60% for higher income earners (>= 1 Lakh/mo).
 */
export function evaluateEligibility(input: EligibilityInput): EligibilityResult {
  const { monthlyIncome, existingEmis, tenureYears, interestRate } = input;
  const messages: string[] = [];

  if (monthlyIncome < 20000) {
    return {
      isEligible: false,
      maxAllowableEmi: 0,
      estimatedMaxLoan: 0,
      disposableIncome: 0,
      foirPercentage: 0,
      recommendedTenureMonths: tenureYears * 12,
      riskRating: 'High Risk',
      messages: [
        'Minimum net monthly income required for personal loan is ₹20,000.',
        'Consider applying with an earning co-applicant or guarantor.',
      ],
    };
  }

  // Allowable FOIR: 50% for income < 1Lakh, 60% for income >= 1Lakh
  const maxFoirRatio = monthlyIncome >= 100000 ? 0.60 : 0.50;
  const maxTotalEmi = monthlyIncome * maxFoirRatio;
  const maxAllowableEmi = Math.max(0, maxTotalEmi - existingEmis);
  const currentFoir = Math.min(100, Math.round(((existingEmis + maxAllowableEmi) / monthlyIncome) * 100));
  const disposableIncome = Math.max(0, monthlyIncome - existingEmis);

  if (existingEmis >= monthlyIncome * 0.5) {
    return {
      isEligible: false,
      maxAllowableEmi: 0,
      estimatedMaxLoan: 0,
      disposableIncome,
      foirPercentage: Math.round((existingEmis / monthlyIncome) * 100),
      recommendedTenureMonths: tenureYears * 12,
      riskRating: 'High Risk',
      messages: [
        'Existing loan EMIs exceed 50% of your net monthly income.',
        'We recommend consolidating or closing existing smaller debts to increase your borrowing capacity.',
      ],
    };
  }

  // Calculate Present Value of Annuity for max allowable EMI
  const tenureMonths = tenureYears * 12;
  const monthlyRate = interestRate / 12 / 100;
  
  // PV = EMI * ((1 - (1+r)^-n) / r)
  const estimatedMaxLoan = maxAllowableEmi > 0
    ? Math.round(maxAllowableEmi * ((1 - Math.pow(1 + monthlyRate, -tenureMonths)) / monthlyRate))
    : 0;

  // Capped to reasonable limits
  const sanitizedMaxLoan = Math.min(4000000, Math.max(50000, Math.floor(estimatedMaxLoan / 10000) * 10000));

  let riskRating: 'Low Risk' | 'Moderate Risk' | 'High Risk' = 'Low Risk';
  if (input.creditScoreRange === 'fair' || currentFoir > 45) {
    riskRating = 'Moderate Risk';
  } else if (input.creditScoreRange === 'new_to_credit') {
    riskRating = 'Moderate Risk';
  }

  messages.push(`Eligible for an estimated loan of up to ₹${sanitizedMaxLoan.toLocaleString('en-IN')}.`);
  if (riskRating === 'Low Risk') {
    messages.push('Favorable profile with high approval probability at lowest interest tier.');
  } else {
    messages.push('A higher tenure may further reduce your monthly EMI burden.');
  }

  return {
    isEligible: sanitizedMaxLoan >= 50000,
    maxAllowableEmi: Math.round(maxAllowableEmi),
    estimatedMaxLoan: sanitizedMaxLoan,
    disposableIncome,
    foirPercentage: currentFoir,
    recommendedTenureMonths: tenureMonths,
    riskRating,
    messages,
  };
}
