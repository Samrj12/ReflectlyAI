import React, { forwardRef, useState, useEffect } from "react";

export const ProgressCircle = forwardRef(
  (
    {
      value = 0,
      max = 100,
      radius = 32,
      strokeWidth = 6,
      showAnimation = true,
      variant,
      className,
      children,
      animationDuration = 1000, // in ms
      ...props
    },
    ref
  ) => {
    const [animatedValue, setAnimatedValue] = useState(0);

    // Animate from 0 to target value
    useEffect(() => {
      let start = null;
      let rafId;

      const step = (timestamp) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;

        const percent = Math.min(elapsed / animationDuration, 1);
        setAnimatedValue(value * percent);

        if (elapsed < animationDuration) {
          rafId = requestAnimationFrame(step);
        } else {
          setAnimatedValue(value); 
        }
      };

      rafId = requestAnimationFrame(step);

      return () => cancelAnimationFrame(rafId);
    }, [value, animationDuration]);

    const safeValue = Math.min(max, Math.max(animatedValue, 0));
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const offset = circumference - (safeValue / max) * circumference;

    return (
      <div
        className="relative"
        role="progressbar"
        aria-label="Progress circle"
        aria-valuenow={animatedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        data-max={max}
        data-value={safeValue ?? null}
      >
        <svg
          ref={ref}
          width={radius * 2}
          height={radius * 2}
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          className="-rotate-90 transform"
          {...props}
        >
          <circle
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            className="transition-colors ease-linear stroke-lime-950"
          />
          {safeValue >= 0 && (
            <circle
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={offset}
              fill="transparent"
              className={`transition-colors ease-linear stroke-lime-400 ${
                showAnimation
                  ? "transform-gpu transition-all duration-300 ease-in-out"
                  : ""
              }`}
            />
          )}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lime-400 font-light tracking-tight text-xl sm:text-2xl md:text-3xl md:leading-[4rem] mx-auto ">
            {Math.round(safeValue)}%
          </span>
        </div>
      </div>
    );
  }
);

ProgressCircle.displayName = "ProgressCircle";
