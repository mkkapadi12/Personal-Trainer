import React, { memo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/**
 * An optimized input component that only re-renders when its specific props change.
 * This is a great example of using React.memo for performance optimization
 * in forms where typing in one field might cause the whole form to re-render.
 */
const OptimizedInput = memo(
  ({ name, label, type, placeholder, icon: Icon, span, register, error }) => {
    // We can add console.log here to demonstrate it only renders when needed
    console.log(`Rendering OptimizedInput for: ${name}`);

    return (
      <div
        className={`flex flex-col gap-1.5 ${span === 2 ? 'md:col-span-2' : ''}`}
      >
        <Label
          htmlFor={name}
          className="text-xs font-semibold tracking-widest text-zinc-400 uppercase"
        >
          {label}
        </Label>

        <div className="relative group">
          {/* Icon */}
          <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#d7fb00] transition-colors duration-200">
            {Icon && <Icon size={16} strokeWidth={1.8} />}
          </span>

          <Input
            id={name}
            type={type}
            placeholder={placeholder}
            {...register}
            className="w-full pl-10 pr-4 py-6! rounded-xl text-sm text-white bg-white/5 border border-white/10 placeholder:text-zinc-600 outline-none focus:border-[#d7fb00]/70 focus:ring-2 focus:ring-[#d7fb00]/20 transition-all duration-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>

        {error && (
          <p className="text-xs text-red-400 mt-0.5 flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
            {error}
          </p>
        )}
      </div>
    );
  },
  // Custom comparison function (optional) to finely control when it updates
  (prevProps, nextProps) => {
    return (
      prevProps.error === nextProps.error &&
      prevProps.register?.value === nextProps.register?.value
    );
  },
);

// Add display name for React DevTools since we are using memo
OptimizedInput.displayName = 'OptimizedInput';

export default OptimizedInput;
