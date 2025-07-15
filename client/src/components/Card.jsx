const Card = ({ children, className = "", hover = false }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-3xl ${
        hover ? "feature-card hover:border-blue-300 dark:hover:border-blue-600" : ""
      } ${className}`}
    >
      {children}
    </div>
  )
}

const CardHeader = ({ children, className = "" }) => {
  return <div className={`p-6 ${className}`}>{children}</div>
}

const CardContent = ({ children, className = "" }) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>
}

const CardTitle = ({ children, className = "" }) => {
  return <h3 className={`text-gray-900 dark:text-white text-xl font-bold mb-2 ${className}`}>{children}</h3>
}

const CardDescription = ({ children, className = "" }) => {
  return <p className={`text-gray-600 dark:text-gray-400 text-base ${className}`}>{children}</p>
}

export { Card, CardHeader, CardContent, CardTitle, CardDescription }
