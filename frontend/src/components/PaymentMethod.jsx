import React, { useState } from 'react';
import { Smartphone, CreditCard, Landmark, Wallet, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';

export const PaymentMethod = ({ onSelectMethod, selectedMethod, onPaymentSubmit, isProcessing }) => {
  const [upiOption, setUpiOption] = useState('gpay');
  const [upiId, setUpiId] = useState('user@okaxis');
  const [cardData, setCardData] = useState({
    number: '4532 •••• •••• 8821',
    name: 'Nethaji R',
    expiry: '12/28',
    cvv: '890'
  });
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  const methods = [
    { id: 'UPI', label: 'UPI / Instant Pay', icon: Smartphone, subtitle: 'Google Pay, PhonePe, Paytm, BHIM' },
    { id: 'Credit Card', label: 'Credit Card', icon: CreditCard, subtitle: 'Visa, MasterCard, RuPay' },
    { id: 'Debit Card', label: 'Debit Card', icon: CreditCard, subtitle: 'All major Indian & international banks' },
    { id: 'Net Banking', label: 'Net Banking', icon: Landmark, subtitle: 'All Indian major banks supported' },
    { id: 'CineWallet', label: 'CineWallet', icon: Wallet, subtitle: 'Available balance: ₹1,500' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onPaymentSubmit({
      method: selectedMethod,
      details: selectedMethod === 'UPI' ? { upiOption, upiId } : selectedMethod.includes('Card') ? cardData : { bank: selectedBank }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Options Selection Cards */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
          Select Payment Method
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {methods.map(method => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            return (
              <div
                key={method.id}
                onClick={() => onSelectMethod(method.id)}
                className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-rose-500 bg-rose-500/10 shadow-lg shadow-rose-950/40 text-white'
                    : 'border-gray-800 bg-[#151724] hover:border-gray-700 hover:bg-[#1b1e2e] text-gray-300'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-rose-500 text-white' : 'bg-[#202334] text-gray-400'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate flex items-center justify-between">
                    <span>{method.label}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />}
                  </div>
                  <div className="text-xs text-gray-400 truncate mt-0.5">{method.subtitle}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulated Sub-form for Selected Payment Method */}
      <div className="p-5 rounded-2xl bg-[#141624] border border-gray-800 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800/80 pb-3">
          <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-rose-500" />
            <span>{selectedMethod} Details</span>
          </div>
          <span className="text-[11px] text-amber-400 font-medium px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
            Simulated Sandbox
          </span>
        </div>

        {/* UPI Details */}
        {selectedMethod === 'UPI' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {['Google Pay', 'PhonePe', 'Paytm'].map(app => (
                <button
                  type="button"
                  key={app}
                  onClick={() => setUpiOption(app.toLowerCase())}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    upiOption === app.toLowerCase()
                      ? 'border-rose-500 bg-rose-500/20 text-white'
                      : 'border-gray-800 bg-[#1b1e2e] text-gray-400 hover:text-white'
                  }`}
                >
                  {app}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                UPI ID / VPA
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="mobileNumber@upi"
                className="w-full bg-[#1b1e2e] border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>
        )}

        {/* Card Details */}
        {(selectedMethod === 'Credit Card' || selectedMethod === 'Debit Card') && (
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 mb-1">Card Number</label>
              <input
                type="text"
                value={cardData.number}
                onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                className="w-full bg-[#1b1e2e] border border-gray-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1">Expiry</label>
                <input
                  type="text"
                  value={cardData.expiry}
                  onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                  placeholder="MM/YY"
                  className="w-full bg-[#1b1e2e] border border-gray-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1">CVV</label>
                <input
                  type="password"
                  maxLength={3}
                  value={cardData.cvv}
                  onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                  className="w-full bg-[#1b1e2e] border border-gray-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[11px] font-semibold text-gray-400 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  value={cardData.name}
                  onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                  className="w-full bg-[#1b1e2e] border border-gray-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Net Banking */}
        {selectedMethod === 'Net Banking' && (
          <div className="space-y-3">
            <label className="block text-[11px] font-semibold text-gray-400 mb-1">Choose Bank</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['HDFC Bank', 'ICICI Bank', 'SBI Bank', 'Axis Bank'].map(bank => (
                <button
                  type="button"
                  key={bank}
                  onClick={() => setSelectedBank(bank)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    selectedBank === bank
                      ? 'border-rose-500 bg-rose-500/20 text-white'
                      : 'border-gray-800 bg-[#1b1e2e] text-gray-400 hover:text-white'
                  }`}
                >
                  {bank}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CineWallet */}
        {selectedMethod === 'CineWallet' && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/30 border border-emerald-600/30 text-emerald-300 text-xs">
            <span>CineWallet instant deduction will be applied automatically.</span>
            <span className="font-bold text-emerald-400">Balance: ₹1,500</span>
          </div>
        )}
      </div>

      {/* Pay CTA */}
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-base shadow-xl shadow-rose-600/30 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95 transition-all"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Processing Simulated Payment...</span>
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            <span>Confirm & Pay Securely</span>
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>256-bit SSL encrypted cinema gateway simulation. No real money charged.</span>
      </div>
    </form>
  );
};
