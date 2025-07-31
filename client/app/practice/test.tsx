import { useState, useEffect } from "react"
import { getAllProblems } from "@/lib/problems-data"

export default function PracticePage() {
  const [problems, setProblems] = useState([])
  
  useEffect(() => {
    const allProblems = getAllProblems()
    setProblems(allProblems)
  }, [])

  return (
    <div>
      <h1>Practice Problems</h1>
      <p>Found {problems.length} problems</p>
    </div>
  )
}
