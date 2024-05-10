import React from "react";

const DriverIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3.5 w-4 mr-2"
  >
    <path d="M13.7,12.1h2.7c2.7,0,4.9,2.2,4.9,4.9v6" />
    <path d="M2.7,23c0-1.8,0-6,0-6c0-2.7,2.2-4.9,4.9-4.9h2.7" />
    <polyline points="12,22.8 14.3,12.7 12,10.6 9.7,12.7 12,22.8 	" />
    <circle cx="12" cy="5.7" r="4.7" />
  </svg>
);

export default DriverIcon;
