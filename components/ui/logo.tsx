"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LogoDark from "@/public/logo-dark.svg";
import LogoLight from "@/public/logo-light.svg";
import { useTheme } from "next-themes";

const Logo = () => {
  const { theme, systemTheme } = useTheme();

  const [curentLogo, setCurentLogo] = useState(LogoLight);

  const logoSrc = () => {
    const activeTheme = theme !== "system" ? theme : systemTheme;
    setCurentLogo(activeTheme === "dark" ? LogoLight : LogoDark);
  };

  useEffect(() => {
    logoSrc();
  }, [theme, systemTheme]);

  return (
    <>
      <Image src={curentLogo?.src} layout="fill" alt="Logo" className="py-1" />
    </>
  );
};

export default Logo;
