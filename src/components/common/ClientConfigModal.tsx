import React, { useState } from 'react';
import { X, Check, RotateCcw, Building2, Sliders, Shield, AlertCircle } from 'lucide-react';
import { ClientConfig } from '../../types/loan';
import { saveClientConfig, resetClientConfig } from '../../config/clientConfig';

interface ClientConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ClientConfig;
  onUpdateConfig: (newConfig: ClientConfig) => void;
}

export const ClientConfigModal: React.FC<ClientConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
}) => {
  const [formData, setFormData] = useState<ClientConfig>(config);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof ClientConfig, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (parent: 'grievanceOfficer', field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveClientConfig(formData);
    onUpdateConfig(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    const defaultCfg = resetClientConfig();
    setFormData(defaultCfg);
    onUpdateConfig(defaultCfg);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-base font-bold">Client Content & Regulatory Settings</h3>
              <p className="text-xs text-slate-400">
                Easily modify brand details, loan rates, and compliance placeholders
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

        {/* Notice for Client Requirements */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-6 py-3 flex items-start gap-2 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Compliance Note:</strong> Fields containing{' '}
            <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[11px] text-amber-800">
              [CLIENT TO PROVIDE: ...]
            </code>{' '}
            represent regulatory items that will be updated with your audited credentials prior to production deployment.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Company / Brand Name
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Brand Tagline
              </label>
              <input
                type="text"
                value={formData.brandTagline}
                onChange={(e) => handleChange('brandTagline', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                NBFC Registration / License Placeholder
              </label>
              <input
                type="text"
                value={formData.nbfcRegistrationNo}
                onChange={(e) => handleChange('nbfcRegistrationNo', e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Partner Bank / Lending Network Disclosure
              </label>
              <textarea
                rows={2}
                value={formData.lendingPartnerDisclosure}
                onChange={(e) => handleChange('lendingPartnerDisclosure', e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Corporate Registered Office Address
              </label>
              <input
                type="text"
                value={formData.registeredAddress}
                onChange={(e) => handleChange('registeredAddress', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Support Helpline
              </label>
              <input
                type="text"
                value={formData.supportPhone}
                onChange={(e) => handleChange('supportPhone', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Support Email
              </label>
              <input
                type="email"
                value={formData.supportEmail}
                onChange={(e) => handleChange('supportEmail', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Loan Parameter Constraints
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1">Min Loan (₹)</label>
                <input
                  type="number"
                  value={formData.minLoanAmount}
                  onChange={(e) => handleChange('minLoanAmount', Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Max Loan (₹)</label>
                <input
                  type="number"
                  value={formData.maxLoanAmount}
                  onChange={(e) => handleChange('maxLoanAmount', Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Starting Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.minInterestRate}
                  onChange={(e) => handleChange('minInterestRate', Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Max Tenure (Mo)</label>
                <input
                  type="number"
                  value={formData.maxTenureMonths}
                  onChange={(e) => handleChange('maxTenureMonths', Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-xs font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Factory Defaults</span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saveSuccess}
                className={`px-5 py-2 text-xs font-semibold rounded-lg text-white transition-all flex items-center gap-1.5 ${
                  saveSuccess ? 'bg-emerald-600' : 'bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20'
                }`}
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved Successfully</span>
                  </>
                ) : (
                  <span>Apply & Save Changes</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
