import { Play, Save, Download, Settings } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle } from "../components/Card"
import Button from "../components/Button"

const CodeEditorPage = () => {
  const languages = ["JavaScript", "Python", "Java", "C++", "Go", "Rust"]

  return (
    <div className="max-w-7xl mx-auto h-screen flex flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Code Editor</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Write, test, and debug your code in our integrated development environment.
        </p>
      </div>

      <div className="flex-1 grid lg:grid-cols-3 gap-4">
        {/* Problem Description */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Two Sum</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Problem</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Given an array of integers nums and an integer target, return indices of the two numbers such that
                    they add up to target.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Example</h4>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm font-mono">
                    <div>Input: nums = [2,7,11,15], target = 9</div>
                    <div>Output: [0,1]</div>
                    <div className="text-gray-600 dark:text-gray-400 mt-1">Because nums[0] + nums[1] == 9</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Constraints</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• 2 ≤ nums.length ≤ 10⁴</li>
                    <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
                    <li>• -10⁹ ≤ target ≤ 10⁹</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Code Editor */}
        <div className="lg:col-span-2 flex flex-col">
          {/* Editor Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <select className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Save className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
              <Button>
                <Play className="h-4 w-4 mr-2" />
                Run
              </Button>
            </div>
          </div>

          {/* Code Editor Area */}
          <Card className="flex-1 mb-4">
            <CardContent className="p-0 h-full">
              <textarea
                className="w-full h-full min-h-96 p-4 bg-gray-900 text-green-400 font-mono text-sm resize-none border-0 rounded-3xl focus:outline-none"
                placeholder="// Write your code here..."
                defaultValue={`function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`}
              />
            </CardContent>
          </Card>

          {/* Output Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Output</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
                <div className="text-green-600 dark:text-green-400">✓ Test case 1 passed</div>
                <div className="text-green-600 dark:text-green-400">✓ Test case 2 passed</div>
                <div className="text-green-600 dark:text-green-400">✓ Test case 3 passed</div>
                <div className="mt-2 text-gray-600 dark:text-gray-400">Runtime: 68ms (beats 85.2% of submissions)</div>
                <div className="text-gray-600 dark:text-gray-400">Memory: 42.1MB (beats 91.4% of submissions)</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CodeEditorPage
