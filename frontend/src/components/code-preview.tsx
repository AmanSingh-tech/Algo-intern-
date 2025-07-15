import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Play, Copy, Heart } from "lucide-react"

export function CodePreview() {
  const codeExample = `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-navy-900 mb-3 sm:mb-4">
          Code Like a{" "}
          <span className="bg-gradient-to-r from-turquoise-500 to-coral-500 bg-clip-text text-transparent">Pro</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-navy-700 max-w-2xl mx-auto">
          Practice with real-world problems and get instant feedback on your solutions
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="bg-gradient-to-br from-navy-900 to-navy-800 border-2 border-navy-700 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
          <CardHeader className="p-4 sm:p-6 lg:p-8 bg-navy-800/50 border-b border-navy-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl font-black text-white mb-2">
                  Two Sum Problem
                </CardTitle>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-turquoise-500 text-white font-semibold px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs">
                    Easy
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-coral-400 text-coral-400 font-semibold px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs"
                  >
                    Array
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-turquoise-400 text-turquoise-400 font-semibold px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs"
                  >
                    Hash Map
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-navy-600 text-navy-300 hover:bg-navy-700 hover:text-white px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm bg-transparent"
                >
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Copy
                </Button>
                <Button
                  size="sm"
                  className="bg-turquoise-500 hover:bg-turquoise-600 text-white font-semibold px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm"
                >
                  <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Run
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative">
              {/* Line Numbers */}
              <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-navy-900/50 border-r border-navy-700 flex flex-col text-navy-500 text-xs sm:text-sm font-mono">
                {Array.from({ length: 14 }, (_, i) => (
                  <div key={i + 1} className="px-1 sm:px-2 py-1 text-right leading-6">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Code Content */}
              <div className="pl-8 sm:pl-12 p-4 sm:p-6 lg:p-8">
                <pre className="text-xs sm:text-sm lg:text-base font-mono text-white leading-6 overflow-x-auto">
                  <code className="language-javascript">
                    <span className="text-coral-400">function</span> <span className="text-turquoise-400">twoSum</span>
                    <span className="text-white">(</span>
                    <span className="text-navy-300">nums</span>
                    <span className="text-white">, </span>
                    <span className="text-navy-300">target</span>
                    <span className="text-white">) {"{"}</span>
                    {"\n"}
                    {"    "}
                    <span className="text-coral-400">const</span> <span className="text-navy-300">map</span>
                    <span className="text-white"> = </span>
                    <span className="text-coral-400">new</span> <span className="text-turquoise-400">Map</span>
                    <span className="text-white">();</span>
                    {"\n"}
                    {"\n"}
                    {"    "}
                    <span className="text-coral-400">for</span> <span className="text-white">(</span>
                    <span className="text-coral-400">let</span> <span className="text-navy-300">i</span>
                    <span className="text-white"> = </span>
                    <span className="text-yellow-400">0</span>
                    <span className="text-white">; </span>
                    <span className="text-navy-300">i</span>
                    <span className="text-white"> {"<"} </span>
                    <span className="text-navy-300">nums</span>
                    <span className="text-white">.</span>
                    <span className="text-turquoise-400">length</span>
                    <span className="text-white">; </span>
                    <span className="text-navy-300">i</span>
                    <span className="text-white">++) {"{"}</span>
                    {"\n"}
                    {"        "}
                    <span className="text-coral-400">const</span> <span className="text-navy-300">complement</span>
                    <span className="text-white"> = </span>
                    <span className="text-navy-300">target</span>
                    <span className="text-white"> - </span>
                    <span className="text-navy-300">nums</span>
                    <span className="text-white">[</span>
                    <span className="text-navy-300">i</span>
                    <span className="text-white">];</span>
                    {"\n"}
                    {"\n"}
                    {"        "}
                    <span className="text-coral-400">if</span> <span className="text-white">(</span>
                    <span className="text-navy-300">map</span>
                    <span className="text-white">.</span>
                    <span className="text-turquoise-400">has</span>
                    <span className="text-white">(</span>
                    <span className="text-navy-300">complement</span>
                    <span className="text-white">)) {"{"}</span>
                    {"\n"}
                    {"            "}
                    <span className="text-coral-400">return</span> <span className="text-white">[</span>
                    <span className="text-navy-300">map</span>
                    <span className="text-white">.</span>
                    <span className="text-turquoise-400">get</span>
                    <span className="text-white">(</span>
                    <span className="text-navy-300">complement</span>
                    <span className="text-white">), </span>
                    <span className="text-navy-300">i</span>
                    <span className="text-white">];</span>
                    {"\n"}
                    {"        "}
                    <span className="text-white">{"}"}</span>
                    {"\n"}
                    {"\n"}
                    {"        "}
                    <span className="text-navy-300">map</span>
                    <span className="text-white">.</span>
                    <span className="text-turquoise-400">set</span>
                    <span className="text-white">(</span>
                    <span className="text-navy-300">nums</span>
                    <span className="text-white">[</span>
                    <span className="text-navy-300">i</span>
                    <span className="text-white">], </span>
                    <span className="text-navy-300">i</span>
                    <span className="text-white">);</span>
                    {"\n"}
                    {"    "}
                    <span className="text-white">{"}"}</span>
                    {"\n"}
                    {"\n"}
                    {"    "}
                    <span className="text-coral-400">return</span> <span className="text-white">[];</span>
                    {"\n"}
                    <span className="text-white">{"}"}</span>
                  </code>
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Problem Stats */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-turquoise-50 border-2 border-turquoise-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-xl lg:text-2xl font-black text-turquoise-600 mb-1">1.2M</div>
            <div className="text-xs sm:text-sm text-turquoise-700 font-medium">Solved</div>
          </Card>
          <Card className="bg-coral-50 border-2 border-coral-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-xl lg:text-2xl font-black text-coral-600 mb-1">89%</div>
            <div className="text-xs sm:text-sm text-coral-700 font-medium">Success Rate</div>
          </Card>
          <Card className="bg-navy-50 border-2 border-navy-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-xl lg:text-2xl font-black text-navy-600 mb-1">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1" />
              4.8
            </div>
            <div className="text-xs sm:text-sm text-navy-700 font-medium">Rating</div>
          </Card>
          <Card className="bg-cream-200 border-2 border-cream-300 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-xl lg:text-2xl font-black text-navy-700 mb-1">O(n)</div>
            <div className="text-xs sm:text-sm text-navy-600 font-medium">Time</div>
          </Card>
        </div>
      </div>
    </section>
  )
}
