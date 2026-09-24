import { AmortizationYear, EmiCalculationResult } from '../types/loan';

/**
 * Calculates monthly EMI using standard formula:
 * EMI = P * R * (1+R)^N / ((1+R)^N - 1)
 *
 * @param principal Principal loan amount in INR
 * @param annualRatePercentage Annual interest rate in percent (e.g. 10.49 for 10.49%)
 * @param tenureMonths Number of months
 * @param processingFeePercent Processing fee percentage (e.g. 1.5)
 * @param gstPercent GST percentage (default 18%)
 */
export function calculateEmi(
  principal: number,
  annualRatePercentage: number,
  tenureMonths: number,
  processingFeePercent: number = 1.5,
  gstPercent: number = 18
): EmiCalculationResult {
  if (principal <= 0 || annualRatePercentage <= 0 || tenureMonths <= 0) {
    return {
      monthlyEmi: 0,
      principal,
      totalInterest: 0,
      totalPayment: principal,
      processingFee: 0,
      gstAmount: 0,
      totalUpfrontCharges: 0,
      netDisbursalAmount: principal,
      yearlySchedule: [],
    };
  }

  const monthlyRate = annualRatePercentage / 12 / 100;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const monthlyEmi = (principal * monthlyRate * factor) / (factor - 1);

  const roundedMonthlyEmi = Math.round(monthlyEmi);
  const totalPayment = roundedMonthlyEmi * tenureMonths;
  const totalInterest = Math.max(0, totalPayment - principal);

  const processingFee = Math.round((principal * processingFeePercent) / 100);
  const gstAmount = Math.round((processingFee * gstPercent) / 100);
  const totalUpfrontCharges = processingFee + gstAmount;
  const netDisbursalAmount = principal - totalUpfrontCharges;

  // Generate Year-wise Amortization schedule
  const yearlySchedule = generateYearlyAmortization(
    principal,
    monthlyRate,
    roundedMonthlyEmi,
    tenureMonths
  );

  return {
    monthlyEmi: roundedMonthlyEmi,
    principal,
    totalInterest,
    totalPayment,
    processingFee,
    gstAmount,
    totalUpfrontCharges,
    netDisbursalAmount,
    yearlySchedule,
  };
}

/**
 * Generates yearly amortization breakdown
 */
function generateYearlyAmortization(
  principal: number,
  monthlyRate: number,
  monthlyEmi: number,
  totalMonths: number
): AmortizationYear[] {
  const schedule: AmortizationYear[] = [];
  let remainingBalance = principal;
  let currentMonth = 1;
  const totalYears = Math.ceil(totalMonths / 12);

  for (let year = 1; year <= totalYears; year++) {
    let yearPrincipal = 0;
    let yearInterest = 0;

    for (let m = 0; m < 12 && currentMonth <= totalMonths; m++) {
      const monthInterest = remainingBalance * monthlyRate;
      let monthPrincipal = monthlyEmi - monthInterest;

      if (monthPrincipal > remainingBalance || currentMonth === totalMonths) {
        monthPrincipal = remainingBalance;
      }

      yearInterest += monthInterest;
      yearPrincipal += monthPrincipal;
      remainingBalance = Math.max(0, remainingBalance - monthPrincipal);
      currentMonth++;
    }

    schedule.push({
      year,
      principalPaid: Math.round(yearPrincipal),
      interestPaid: Math.round(yearInterest),
      totalPaid: Math.round(yearPrincipal + yearInterest),
      endingBalance: Math.round(remainingBalance),
    });

    if (remainingBalance <= 0) break;
  }

  return schedule;
}

/**
 * Formats a number to Indian Rupees (INR) format: e.g. ₹ 10,00,000
 */
export function formatINR(value: number): string {
  if (isNaN(value)) return '₹0';
  return '₹' + Math.round(value).toLocaleString('en-IN');
}

/**
 * Formats a number compactly (e.g. ₹5 Lakh, ₹25 Lakh, ₹1.2 Cr)
 */
export function formatCompactINR(value: number): string {
  if (isNaN(value) || value === 0) return '₹0';
  if (value >= 10000000) {
    const cr = (value / 10000000).toFixed(value % 10000000 === 0 ? 0 : 2);
    return `₹${cr} Cr`;
  }
  if (value >= 100000) {
    const lakh = (value / 100000).toFixed(value % 100000 === 0 ? 0 : 2);
    return `₹${lakh} Lakh`;
  }
  return formatINR(value);
}
