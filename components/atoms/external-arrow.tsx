"use client";

import { SVGProps } from "react";

interface ExternalArrowProps extends SVGProps<SVGSVGElement> {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export default function ExternalArrow({
  className = "",
  width = 6,
  height = 6,
  ...props
}: ExternalArrowProps): JSX.Element {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 6 6"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M1.25215 5.54731L0.622742 4.9179L3.78169 1.75597H1.3834L1.38936 0.890915H5.27615V4.78069H4.40513L4.41109 2.38538L1.25215 5.54731Z"
        fill="currentColor"
      />
    </svg>
  );
}
