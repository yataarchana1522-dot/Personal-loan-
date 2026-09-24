import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, ShieldCheck, AlertCircle, ArrowRight, UserCheck, FileCheck } from 'lucide-react';
import { formatINR } from '../../utils/emiCalculator';

interface ApplicationTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApply: () => void;
}

export const ApplicationTrackerModal: React.FC<ApplicationTrackerModalProps> = ({
  isOpen,
  onClose,
  onOpenApply,
}) => {
  const [searchRef, setSearchRef] = useState('VF-2026-894211');
  const [hasSearched, setHasSearched] = useState(true);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchRef.trim()) {
      setHasSearched(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-base font-bold">Track Loan Application Status</h3>
              <p className="text-xs text-slate-400">
                Check real-time underwriting progress and sanction status
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value.toUpperCase())}
                placeholder="Enter Reference (e.g. VF-2026-894211)"
                className="w-full pl-10 pr-4 py-2.5 text-sm font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              Track Status
            </button>
          </form>

          {hasSearched ? (
            <div className="space-y-5 animate-in fade-in duration-300">
              {/* Status Header Card */}
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-blue-800 uppercase tracking-wider">
                    Application Reference
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 font-mono mt-0.5">
                    {searchRef || 'VF-2026-894211'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Applicant: <strong className="text-slate-800">Aditya Verma</strong> • ₹7,50,000 / 36 Mo
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  In-Principle Sanctioned
                </span>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-4 pt-1">
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Verification Milestones
                </h5>
                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {/* Step 1 */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shadow">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Application & KYC Submitted</p>
                      <p className="text-xs text-slate-500">Completed digitally via DigiLocker & PAN validation.</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shadow">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Credit Risk & Bureau Underwriting</p>
                      <p className="text-xs text-slate-500">CIBIL score verified (774). Qualified for Tier-1 interest rate of 10.49% p.a.</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs shadow animate-pulse">
                      <Clock className="w-3 h-3" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-blue-700">Digital e-NACH Mandate & Agreement Signing</p>
                      <p className="text-xs text-slate-600">Pending Aadhaar OTP e-Sign of sanction agreement to trigger automated disbursement.</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative opacity-60">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center text-xs">
                      4
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Disbursement to Bank Account</p>
                      <p className="text-xs text-slate-500">Direct NEFT/RTGS transfer within 4 hours of agreement signing.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Relationship Officer Help */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Assigned Loan Manager: <strong>Kavita Sen (Desk #4)</strong></span>
                </div>
                <span className="text-blue-600 font-semibold text-xs">Ext: 804</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500 text-sm">
              <p>Enter your 12-character application reference above to inspect live underwriting details.</p>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                onClose();
                onOpenApply();
              }}
              className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Need a new personal loan?</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
