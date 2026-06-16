import React from "react";
import { ImSpinner9 } from "react-icons/im";

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  fullWidth,
  icon: Icon,
  variant = "primary",
  loading = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-lg font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 whitespace-nowrap cursor-pointer";

  const sizeStyles = small
    ? "text-xs md:text-sm px-3 py-1.5"
    : "text-sm md:text-base px-4 py-2 md:px-6 md:py-3";

  const widthStyles = fullWidth ? "w-full" : "w-auto";

  const variants = {
    primary: outline
      ? "border-2 border-primary text-primary hover:bg-primary hover:text-white"
      : "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20 border-2 border-transparent",

    secondary: outline
      ? "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white"
      : "bg-secondary text-white hover:bg-secondary/90 shadow-md shadow-secondary/20 border-2 border-transparent",

    accent: outline
      ? "border-2 border-accent text-accent hover:bg-accent hover:text-black"
      : "bg-accent text-black hover:bg-accent/90 shadow-md shadow-accent/20 border-2 border-transparent",

    blackOutline:
      "border-2 border-black text-black hover:bg-black hover:text-white",

    ghost:
      "bg-base-200 text-primary hover:bg-base-300 border-2 border-transparent",

    error: "bg-error text-white hover:bg-error/90 border-2 border-transparent",
  };

  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${sizeStyles}
        ${widthStyles}
        ${variants[variant] || variants.primary}
      `}
    >
      {loading && <ImSpinner9 className="animate-spin w-4 h-4 md:w-5 md:h-5" />}
      {!loading && Icon && <Icon className="w-4 h-4 md:w-5 md:h-5" />}

      <span>{label}</span>
    </button>
  );
};

export default Button;