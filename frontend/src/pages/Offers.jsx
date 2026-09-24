import React, { useState } from 'react';
import { Tag, Copy, Check, Sparkles, Percent, ShieldCheck } from 'lucide-react';
import { OFFERS } from '../data/mockMovies';
import { useToast } from '../components/Toast';

export const Offers = () => {
  const [copiedCode, setCopiedCode] = useState(null);
  const { showToast } = useToast();

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon ${code} copied! Apply at checkout.`, 'success');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <div>
        <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-wider">
          <Tag className="w-4 h-4" />
          <span>Exclusive Promos</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white font-['Outfit'] tracking-tight mt-1">
          CineBook Discounts & Coupon Codes
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Copy your favorite promo coupon and apply it during seat selection or checkout to claim instant discounts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {OFFERS.map(offer => (
          <div
            key={offer.code}
            className="bg-[#141624] border border-gray-800 hover:border-rose-500/60 rounded-3xl p-6 shadow-xl flex flex-col justify-between group transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  {offer.tag}
                </span>
                <span className="text-xs text-gray-500">{offer.expiry}</span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                {offer.title}
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed">
                {offer.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
              <span className="font-mono text-sm font-bold bg-black/60 px-3.5 py-2 rounded-xl text-rose-400 border border-gray-700">
                {offer.code}
              </span>
              <button
                onClick={() => handleCopy(offer.code)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all"
              >
                {copiedCode === offer.code ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
