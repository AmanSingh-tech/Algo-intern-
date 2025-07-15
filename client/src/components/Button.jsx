"use client"

const Button = ({
  children,
  variant = "primary",
  size = "default",
  className = "",
  disabled = false,
  onClick,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"

  const variants = {
    primary: "btn-primary",
    secondary: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700",
    outline:
      "border-2 border-blue-300 dark:border-blue-600 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white",
  }

  const sizes = {
    sm: "px-3 py-2 text-sm",
    default: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : ""

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
