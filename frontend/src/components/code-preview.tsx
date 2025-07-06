import { ChevronRight, ChevronDown, File, Folder } from "lucide-react"

export function CodePreview() {
  return (
    <div className="bg-card rounded-lg border border-border h-fit">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-xs text-muted-foreground">App.jsx</span>
      </div>

      <div className="flex">
        <div className="w-48 bg-muted/50 border-r border-border p-2">
          <div className="text-xs text-muted-foreground mb-2">EXPLORER</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-1 text-xs text-foreground">
              <ChevronDown className="w-3 h-3" />
              <Folder className="w-3 h-3" />
              <span>src</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-foreground ml-4">
              <ChevronDown className="w-3 h-3" />
              <Folder className="w-3 h-3" />
              <span>components</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-foreground ml-8">
              <File className="w-3 h-3" />
              <span>DevJSX</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-foreground ml-8">
              <File className="w-3 h-3" />
              <span>Navigation.jsx</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-foreground ml-4">
              <File className="w-3 h-3 text-primary" />
              <span>App</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-foreground ml-4">
              <ChevronRight className="w-3 h-3" />
              <Folder className="w-3 h-3" />
              <span>pages</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-foreground ml-6">
              <File className="w-3 h-3" />
              <span>index.jsx</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-foreground ml-6">
              <File className="w-3 h-3" />
              <span>internship.jsx</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-foreground">
              <File className="w-3 h-3" />
              <span>package.json</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-foreground">
              <File className="w-3 h-3" />
              <span>README.md</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-3">
          <div className="font-mono text-xs text-foreground space-y-1">
            <div>
              <span className="text-blue-400">import</span>{" "}
              <span className="text-yellow-400">{"{ Route }"}</span>{" "}
              <span className="text-blue-400">from</span>{" "}
              <span className="text-green-400">'react-router-dom'</span>
            </div>
            <div>
              <span className="text-blue-400">import</span>{" "}
              <span className="text-yellow-400">{"{ Route }"}</span>{" "}
              <span className="text-blue-400">from</span>{" "}
              <span className="text-green-400">'react-router-dom'</span>
            </div>
            <div className="text-muted-foreground">{"// Starting routes"}</div>
            <div className="ml-4 text-muted-foreground">{"=>"}</div>
            <div>
              <span className="text-purple-400">function</span>{" "}
              <span className="text-yellow-400">trackProgress</span>(
              <span className="text-blue-400">user</span>) {"{"}
            </div>
            <div className="ml-4">
              <span className="text-blue-400">const</span>{" "}
              <span className="text-foreground">context</span> ={" "}
              <span className="text-yellow-400">useContext</span>(
              <span className="text-blue-400">Context</span>)
            </div>
            <div className="ml-4">
              <span className="text-blue-400">const</span>{" "}
              <span className="text-foreground">rating</span> ={" "}
              <span className="text-yellow-400">calculateRating</span>(
              <span className="text-blue-400">contests</span>,{" "}
              <span className="text-blue-400">results</span>)
            </div>
            <div className="ml-4">
              <span className="text-blue-400">return</span> {"{"}{" "}
              <span className="text-foreground">rating</span>,{" "}
              <span className="text-foreground">progress</span> {"}"}
            </div>
            <div>{"}"}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
