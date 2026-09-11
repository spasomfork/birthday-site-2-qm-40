import React from 'react';
import { X, Globe, Check, AlertCircle, Phone, FileText } from 'lucide-react';

interface VisaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VisaModal: React.FC<VisaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-amber-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900">
              Cyprus Visa & Entry Information
            </h3>
            <p className="text-xs text-gray-500 font-medium">Official guidelines for Queen Molly's 40th Birthday guests</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-gray-700 max-h-[70vh] overflow-y-auto pr-2">
          {/* Quick breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-900 flex items-center gap-1.5 text-sm mb-1">
                <Check className="w-4 h-4 text-emerald-600" />
                Visa Exempt Travelers
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                EU, UK, USA, and Canadian passport holders do not require an entry visa for tourist stays up to 90 days. Passports must have at least 3 months validity beyond intended departure.
              </p>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-200">
              <h4 className="font-semibold text-amber-900 flex items-center gap-1.5 text-sm mb-1">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Visa Required (e.g. Nigeria)
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed">
                Nigerian and other third-country nationals require a valid Cyprus National Visa OR a multi-entry Schengen Visa (Type C) already utilized at least once in the Schengen zone.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-600" />
              Required Documentation for Cyprus Visa
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-600 list-disc list-inside">
              <li>International passport with minimum 6 months validity & 2 blank pages</li>
              <li>Completed & signed Republic of Cyprus visa application form</li>
              <li>Two recent passport-sized photographs (white background)</li>
              <li>Confirmed flight reservation showing arrival at Larnaca (LCA) or Paphos (PFO)</li>
              <li>Official Event Invitation Letter from Queen Molly / Du Coeur Eventz</li>
              <li>Alion Beach Hotel confirmed room booking voucher</li>
              <li>Proof of financial solvency (Recent 3-6 months bank statements)</li>
              <li>Travel medical insurance coverage of at least €30,000</li>
            </ul>
          </div>

          {/* Dedicated Visa Concierge Contact */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs uppercase font-semibold text-amber-700 tracking-wider">Dedicated Visa Concierge</span>
                <h5 className="font-bold text-gray-900 text-sm">Mrs. Grace Sterling</h5>
                <p className="text-xs text-gray-600">Company: Horizon Concierge (Cyprus & Schengen Visa Assistance)</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <a
                    href="tel:+447700900891"
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-white border border-gray-300 rounded font-medium text-gray-800 hover:text-amber-600"
                  >
                    Call: +44 7700 900891
                  </a>
                  <a
                    href="https://wa.me/447700900891?text=Hello%20Mrs.%20Sterling%2C%20I%20need%20assistance%20with%20Cyprus%20Visa%20for%20QM%4040"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-emerald-600 text-white rounded font-medium hover:bg-emerald-700"
                  >
                    WhatsApp Chat
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-900 text-white text-xs font-semibold rounded-md hover:bg-gray-800 transition-colors"
          >
            Got it, Close
          </button>
        </div>
      </div>
    </div>
  );
};
