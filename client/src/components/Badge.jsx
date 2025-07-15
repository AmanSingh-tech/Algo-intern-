const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-500 text-white",
    secondary: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",
    outline:
      "border-2 border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20",
    success:
      "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800",
    warning:
      "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800",
    error: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800",
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-xl ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
