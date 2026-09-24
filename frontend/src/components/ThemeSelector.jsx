import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeSelector = ({ compact = false }) => {
  const { currentTheme, activeTheme, changeTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        title="Change Color Theme"
        aria-label="Change Color Theme"
        className={`flex items-center gap-2 rounded-xl transition-all duration-300 border ${
          isOpen
            ? 'bg-white/15 border-rose-500/50 shadow-md ring-1 ring-rose-500/30'
            : 'bg-[#181a28]/90 hover:bg-[#202334] border-gray-700/80 hover:border-gray-600'
        } ${
          compact
            ? 'w-full px-3 py-2.5 justify-between'
            : 'px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs'
        }`}
      >
        <div className="flex items-center gap-2">
          {/* Palette Icon with animated glow */}
          <div 
            className="w-6 h-6 rounded-lg flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:rotate-12"
            style={{
              background: `linear-gradient(135deg, ${activeTheme.colors.primary}, ${activeTheme.colors.secondary})`
            }}
          >
            <Palette className="w-3.5 h-3.5" />
          </div>

          <span className={`font-semibold text-gray-200 ${compact ? 'text-xs sm:text-sm' : 'hidden xl:inline-block text-xs'}`}>
            {activeTheme.name}
          </span>
        </div>

        {/* Mini 3-dot color preview indicator */}
        <div className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-full border border-white/5">
          <span 
            className="w-2 h-2 rounded-full ring-1 ring-black/40 shadow-xs"
            style={{ backgroundColor: activeTheme.colors.primary }}
          />
          <span 
            className="w-2 h-2 rounded-full ring-1 ring-black/40 shadow-xs"
            style={{ backgroundColor: activeTheme.colors.secondary }}
          />
          <span 
            className="w-2 h-2 rounded-full ring-1 ring-black/40 shadow-xs"
            style={{ backgroundColor: activeTheme.colors.accent }}
          />
        </div>
      </button>

      {/* Floating Theme Selection Popover */}
      {isOpen && (
        <div className={`absolute z-50 mt-2 bg-[#12141f]/95 backdrop-blur-xl border border-gray-700/80 rounded-2xl shadow-2xl p-3 animate-in fade-in zoom-in-95 duration-200 max-w-[calc(100vw-24px)] ${
          compact ? 'left-0 right-0 w-full' : 'right-0 w-72 sm:w-80'
        }`}>
          {/* Popover Header */}
          <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-gray-800/80 px-1">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Color Themes
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-medium">
              6 Palettes
            </span>
          </div>

          {/* Theme Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[340px] overflow-y-auto pr-0.5">
            {themes.map((theme) => {
              const isSelected = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    changeTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`group relative flex flex-col p-2.5 rounded-xl text-left transition-all duration-200 border ${
                    isSelected
                      ? 'bg-white/10 border-rose-500/80 shadow-md ring-1 ring-rose-500/40'
                      : 'bg-white/[0.02] hover:bg-white/[0.07] border-white/[0.06] hover:border-white/20'
                  }`}
                >
                  {/* Top row: Color Swatches & Checkmark */}
                  <div className="flex items-center justify-between w-full mb-1.5">
                    {/* Swatch Pill */}
                    <div className="flex items-center gap-1 bg-black/50 px-1.5 py-1 rounded-full border border-white/10 shadow-inner">
                      <span
                        className="w-2.5 h-2.5 rounded-full ring-1 ring-black/50"
                        style={{ backgroundColor: theme.colors.primary }}
                        title={`Primary: ${theme.primaryLabel}`}
                      />
                      <span
                        className="w-2.5 h-2.5 rounded-full ring-1 ring-black/50"
                        style={{ backgroundColor: theme.colors.secondary }}
                        title={`Secondary: ${theme.secondaryLabel}`}
                      />
                      <span
                        className="w-2.5 h-2.5 rounded-full ring-1 ring-black/50"
                        style={{ backgroundColor: theme.colors.accent }}
                        title={`Accent: ${theme.accentLabel}`}
                      />
                    </div>

                    {isSelected && (
                      <div 
                        className="w-4 h-4 rounded-full flex items-center justify-center text-white shadow-xs"
                        style={{ backgroundColor: theme.colors.primary }}
                      >
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Theme Info */}
                  <div className="font-bold text-xs text-white group-hover:text-rose-300 transition-colors">
                    {theme.name}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5 truncate leading-tight">
                    {theme.description}
                  </div>

                  {/* Bottom preview gradient stripe */}
                  <div 
                    className="w-full h-1 rounded-full mt-2 opacity-80 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary}, ${theme.colors.accent})`
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
