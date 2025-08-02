"use client"

import { useState, useEffect } from "react"
import { getProblem } from "@/lib/api"

export default function TestApiDebugPage() {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const testApiCall = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    
    try {
      console.log('Starting API test...')
      const response = await getProblem('c5885c5a-ee04-4405-911d-47708324e9c1')
      console.log('API Response:', response)
      setResult(response)
    } catch (err: any) {
      console.error('API Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Test direct fetch
  const testDirectFetch = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    
    try {
      console.log('Testing direct fetch...')
      const response = await fetch('http://localhost:8000/api/problem/c5885c5a-ee04-4405-911d-47708324e9c1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      console.log('Direct fetch response status:', response.status)
      console.log('Direct fetch response ok:', response.ok)
      
      const data = await response.json()
      console.log('Direct fetch data:', data)
      setResult(data)
    } catch (err: any) {
      console.error('Direct fetch error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">API Debug Test</h1>
      
      <div className="space-y-4 mb-8">
        <button 
          onClick={testApiCall}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mr-4"
        >
          {loading ? 'Testing...' : 'Test getProblem API'}
        </button>
        
        <button 
          onClick={testDirectFetch}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          {loading ? 'Testing...' : 'Test Direct Fetch'}
        </button>
      </div>

      {error && (
        <div className="bg-red-600 p-4 rounded mb-4">
          <h3 className="font-bold">Error:</h3>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="font-bold mb-2">Result:</h3>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
