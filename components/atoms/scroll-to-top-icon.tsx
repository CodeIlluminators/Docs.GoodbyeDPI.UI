"use client";

import { SVGProps } from "react";

interface ScrollToTopIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export default function ScrollToTopIcon({
  className = "",
  width = 14,
  height = 14,
  ...props
}: ScrollToTopIconProps): JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      shapeRendering="geometricPrecision"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M16 12l-4-4-4 4"></path>
      <path d="M12 16V8"></path>
    </svg>
  );
}
