import { ClientConfig } from '../types/loan';

export const DEFAULT_CLIENT_CONFIG: ClientConfig = {
  companyName: 'VedaFinance',
  brandTagline: 'Personal Loans, Made Simple.',
  nbfcRegistrationNo: '[CLIENT TO PROVIDE: RBI / NBFC Registration Certificate No.]',
  lendingPartnerDisclosure: '[CLIENT TO PROVIDE: Scheduled Commercial Bank & Regulated NBFC Lending Partner Network]',
  supportPhone: '+91 1800-209-4455',
  supportEmail: 'support@vedafinance.com',
  supportHours: 'Mon - Sat: 9:00 AM - 7:00 PM IST',
  registeredAddress: '[CLIENT TO PROVIDE: Corporate Registered Office Address, BKC, Mumbai 400051]',
  minLoanAmount: 50000,
  maxLoanAmount: 4000000,
  minInterestRate: 10.49,
  maxInterestRate: 22.0,
  minTenureMonths: 12,
  maxTenureMonths: 84,
  processingFeePercent: 1.5,
  gstPercent: 18,
  grievanceOfficer: {
    name: '[CLIENT TO PROVIDE: Grievance Redressal Officer Name]',
    email: 'grievance@vedafinance.com',
    phone: '+91 1800-209-4456',
  },
};

const STORAGE_KEY = 'vedafinance_client_config';

export function getClientConfig(): ClientConfig {
  if (typeof window === 'undefined') return DEFAULT_CLIENT_CONFIG;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_CLIENT_CONFIG, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Failed to load client config from localStorage', e);
  }
  return DEFAULT_CLIENT_CONFIG;
}

export function saveClientConfig(config: ClientConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save client config to localStorage', e);
  }
}

export function resetClientConfig(): ClientConfig {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return DEFAULT_CLIENT_CONFIG;
}
