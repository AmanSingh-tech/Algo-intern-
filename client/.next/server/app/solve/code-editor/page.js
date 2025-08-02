(()=>{var e={};e.id=92,e.ids=[92],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},13924:(e,s,t)=>{Promise.resolve().then(t.bind(t,61915))},13943:(e,s,t)=>{"use strict";t.d(s,{A:()=>r});let r=(0,t(62688).A)("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]])},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},29187:(e,s,t)=>{"use strict";t.r(s),t.d(s,{GlobalError:()=>i.a,__next_app__:()=>u,pages:()=>d,routeModule:()=>p,tree:()=>c});var r=t(65239),a=t(48088),n=t(88170),i=t.n(n),l=t(30893),o={};for(let e in l)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);t.d(s,o);let c={children:["",{children:["solve",{children:["code-editor",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,67895)),"/home/pendulum/algo-task/client/app/solve/code-editor/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,58014)),"/home/pendulum/algo-task/client/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,57398,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(t.t.bind(t,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(t.t.bind(t,65284,23)),"next/dist/client/components/unauthorized-error"]}]}.children,d=["/home/pendulum/algo-task/client/app/solve/code-editor/page.tsx"],u={require:t,loadChunk:()=>Promise.resolve()},p=new r.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/solve/code-editor/page",pathname:"/solve/code-editor",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30128:(e,s,t)=>{"use strict";t.d(s,{A:()=>r});let r=(0,t(62688).A)("MemoryStick",[["path",{d:"M6 19v-3",key:"1nvgqn"}],["path",{d:"M10 19v-3",key:"iu8nkm"}],["path",{d:"M14 19v-3",key:"kcehxu"}],["path",{d:"M18 19v-3",key:"1vh91z"}],["path",{d:"M8 11V9",key:"63erz4"}],["path",{d:"M16 11V9",key:"fru6f3"}],["path",{d:"M12 11V9",key:"ha00sb"}],["path",{d:"M2 15h20",key:"16ne18"}],["path",{d:"M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.1a2 2 0 0 0 0-3.837Z",key:"lhddv3"}]])},33873:e=>{"use strict";e.exports=require("path")},35071:(e,s,t)=>{"use strict";t.d(s,{A:()=>r});let r=(0,t(62688).A)("CircleX",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]])},41862:(e,s,t)=>{"use strict";t.d(s,{A:()=>r});let r=(0,t(62688).A)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},59556:(e,s,t)=>{"use strict";t.d(s,{Ai:()=>l,Bx:()=>u,DY:()=>n,Ee:()=>p,Lx:()=>a,RS:()=>m,TK:()=>i,VM:()=>c,Yx:()=>o,hY:()=>h,q6:()=>d});let r=process.env.NEXT_PUBLIC_BACKEND_URL||"http://localhost:8000";async function a(e,s){return(await fetch(`${r}/new/user/signin`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:s})})).json()}async function n(e){return(await fetch(`${r}/new/user/signup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function i(){return(await fetch(`${r}/new/problems/getAllProblems`,{method:"GET",headers:{"Content-Type":"application/json"}})).json()}async function l(e){return(await fetch(`${r}/new/problems/getProblem/${e}`,{method:"GET",headers:{"Content-Type":"application/json"}})).json()}async function o(e){return(await fetch(`${r}/new/problems/createProblem`,{method:"POST",headers:{"Content-Type":"application/json",usertoken:`Bearer ${e.token}`},body:JSON.stringify({title:e.title,description:e.description,difficulty:e.difficulty,tags:e.tags,testCases:e.testCases})})).json()}async function c(e){return(await fetch(`${r}/new/user/profile`,{method:"GET",headers:{"Content-Type":"application/json",usertoken:`Bearer ${e}`}})).json()}async function d(e){return(await fetch(`${r}/new/evaluation/submit`,{method:"POST",headers:{"Content-Type":"application/json",usertoken:`Bearer ${e.token}`},body:JSON.stringify({problemId:e.problemId,code:e.code,language:e.language})})).json()}async function u(e){return(await fetch(`${r}/new/evaluation/run`,{method:"POST",headers:{"Content-Type":"application/json",usertoken:`Bearer ${e.token}`},body:JSON.stringify({problemId:e.problemId,code:e.code,language:e.language})})).json()}async function p(){return(await fetch(`${r}/new/user/leaderboard`,{method:"GET",headers:{"Content-Type":"application/json"}})).json()}async function m(){return(await fetch(`${r}/new/user/leaderboard-stats`,{method:"GET",headers:{"Content-Type":"application/json"}})).json()}async function h(e){return(await fetch(`${r}/new/user/submissions`,{method:"GET",headers:{"Content-Type":"application/json",usertoken:`Bearer ${e}`}})).json()}},61915:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>T});var r=t(60687),a=t(43210),n=t(16189),i=t(77349),l=t(35979),o=t(46428),c=t(55192),d=t(24934),u=t(63974),p=t(15616),m=t(59821),h=t(41862),x=t(35071),f=t(48730),y=t(30128),g=t(62688);let b=(0,g.A)("CodeXml",[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]]);var j=t(5336),v=t(13943),w=t(97840);let N=(0,g.A)("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]),k=(0,g.A)("Terminal",[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]]);var $=t(59556);function C(){let e=(0,n.useSearchParams)().get("problemId"),[s,t]=(0,a.useState)(null),[g,C]=(0,a.useState)(!0),[T,S]=(0,a.useState)(null),[A,P]=(0,a.useState)("cpp"),[E,M]=(0,a.useState)(""),[_,q]=(0,a.useState)("Ready to run your code..."),[z,R]=(0,a.useState)(!1),[O,B]=(0,a.useState)(!1),[D,G]=(0,a.useState)(null),I=(e,s)=>{let t=e.title.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g,"_").replace(/^_+|_+$/g,""),r={cpp:`#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

/*
Problem: ${e.title}
Difficulty: ${e.difficulty}

Description:
${e.description.split("\n")[0]}...
*/

class Solution {
public:
    // Write your solution here
    void ${t}() {
        
    }
};

int main() {
    Solution solution;
    solution.${t}();
    
    return 0;
}`,python:`"""
Problem: ${e.title}
Difficulty: ${e.difficulty}

Description:
${e.description.split("\n")[0]}...
"""

class Solution:
    def ${t}(self):
        # Write your solution here
        pass

# Test case
solution = Solution()
solution.${t}()`,java:`/*
Problem: ${e.title}
Difficulty: ${e.difficulty}

Description:
${e.description.split("\n")[0]}...
*/

class Solution {
    public void ${t}() {
        // Write your solution here
        
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        solution.${t}();
    }
}`,javascript:`/*
Problem: ${e.title}
Difficulty: ${e.difficulty}

Description:
${e.description.split("\n")[0]}...
*/

function ${t}() {
    // Write your solution here
    
}

// Test case
${t}();`};return r[s]||r.cpp},L=async()=>{if(!E.trim()){q("❌ Error: Please write some code first!");return}R(!0),q("\uD83D\uDD04 Running code..."),G(null);try{let s;if(e)s=await (0,$.Bx)({problemId:e,code:E,language:A,token:"demo-token"});else{q("❌ Error: No problem context available for testing");return}if(s.success)q(`✅ All Test Cases Passed!

Total Test Cases: ${s.totalTestCases}
Execution completed successfully!`),G({success:!0,totalTests:s.totalTestCases,passedTests:s.totalTestCases});else{let e="❌ Execution Failed!\n\n";3===s.errorcode?e+=`Compilation Error:
${s.err}`:4===s.errorcode?(e+=`Test Case Failed (${s.failedTestCase}/${s.totalTestCases}):

`,e+=`Input: ${s.testcase}
`,e+=`Expected: ${s.expected}
`,e+=`Got: ${s.received}`,G({success:!1,totalTests:s.totalTestCases,passedTests:s.failedTestCase-1,failedTest:s.failedTestCase})):e+=s.msg||s.error||"Unknown error occurred",q(e)}}catch(e){q(`❌ Network Error!

${e.message}`)}finally{R(!1)}},F=async()=>{if(!e){q("❌ Cannot submit: No problem context available");return}if(!E.trim()){q("❌ Cannot submit: Please write some code first!");return}B(!0),q("\uD83D\uDCE4 Submitting solution...");try{let s=await (0,$.q6)({problemId:e,code:E,language:A,token:"demo-token"});s.success?q(`🎉 Submission Successful!

${s.msg}`):q(`❌ Submission Failed!

${s.msg||"Unknown error"}`)}catch(e){q(`❌ Submission Error!

${e.message}`)}finally{B(!1)}};return g?(0,r.jsxs)("div",{className:"flex h-screen bg-gray-900",children:[(0,r.jsx)(i.AppSidebar,{}),(0,r.jsxs)(l.SidebarInset,{className:"flex-1 flex flex-col bg-gray-900",children:[(0,r.jsx)(o.Header,{}),(0,r.jsx)("div",{className:"flex-1 flex items-center justify-center",children:(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)(h.A,{className:"w-12 h-12 animate-spin mx-auto mb-4 text-blue-400"}),(0,r.jsx)("p",{className:"text-lg text-gray-300",children:"Loading problem..."})]})})]})]}):T||!s?(0,r.jsxs)("div",{className:"flex h-screen bg-gray-900",children:[(0,r.jsx)(i.AppSidebar,{}),(0,r.jsxs)(l.SidebarInset,{className:"flex-1 flex flex-col bg-gray-900",children:[(0,r.jsx)(o.Header,{}),(0,r.jsx)("div",{className:"flex-1 flex items-center justify-center",children:(0,r.jsxs)(c.Zp,{className:"w-full max-w-md bg-gray-800 border-gray-700",children:[(0,r.jsx)(c.aR,{children:(0,r.jsxs)(c.ZB,{className:"text-red-400 flex items-center gap-2",children:[(0,r.jsx)(x.A,{className:"w-5 h-5"}),"Error"]})}),(0,r.jsxs)(c.Wu,{children:[(0,r.jsx)("p",{className:"text-gray-300 mb-4",children:T||"Problem not found"}),(0,r.jsx)(d.$,{onClick:()=>window.location.reload(),children:"Try Again"})]})]})})]})]}):(0,r.jsxs)("div",{className:"flex h-screen bg-gray-900",children:[(0,r.jsx)(i.AppSidebar,{}),(0,r.jsxs)(l.SidebarInset,{className:"flex-1 flex flex-col bg-gray-900",children:[(0,r.jsx)(o.Header,{}),(0,r.jsx)("div",{className:"border-b bg-gray-900 p-4",children:(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"flex items-center gap-4",children:[(0,r.jsx)("h1",{className:"text-2xl font-bold text-white",children:s.title}),(0,r.jsx)(m.E,{className:`${(e=>{switch(e){case"Easy":return"text-green-600 bg-green-50 border-green-200";case"Medium":return"text-yellow-600 bg-yellow-50 border-yellow-200";case"Hard":return"text-red-600 bg-red-50 border-red-200";default:return"text-gray-600 bg-gray-50 border-gray-200"}})(s.difficulty)} border`,children:s.difficulty})]}),(0,r.jsxs)("div",{className:"flex items-center gap-4 text-sm text-gray-300",children:[(0,r.jsxs)("div",{className:"flex items-center gap-1",children:[(0,r.jsx)(f.A,{className:"w-4 h-4"}),(0,r.jsx)("span",{children:s.timeLimit||"1s"})]}),(0,r.jsxs)("div",{className:"flex items-center gap-1",children:[(0,r.jsx)(y.A,{className:"w-4 h-4"}),(0,r.jsx)("span",{children:s.memoryLimit||"256MB"})]})]})]})}),(0,r.jsxs)("main",{className:"flex-1 flex overflow-hidden bg-gray-900",children:[(0,r.jsxs)("div",{className:"w-1/2 border-r flex flex-col bg-gray-900",children:[(0,r.jsx)("div",{className:"p-4 border-b bg-gray-800",children:(0,r.jsx)("h2",{className:"text-lg font-semibold text-white",children:"Problem Description"})}),(0,r.jsx)("div",{className:"flex-1 overflow-auto p-4",children:(0,r.jsxs)("div",{className:"prose max-w-none",children:[(0,r.jsx)("div",{className:"whitespace-pre-wrap text-gray-300 mb-6",children:s.description}),s.inputtype&&(0,r.jsxs)("div",{className:"mb-6",children:[(0,r.jsx)("h3",{className:"text-lg font-semibold mb-3 text-white",children:"Examples"}),(0,r.jsx)("div",{className:"bg-gray-800 p-4 rounded-lg",children:(0,r.jsx)("pre",{className:"text-sm text-gray-300",children:s.inputtype})})]}),s.constraints&&(0,r.jsxs)("div",{className:"mb-6",children:[(0,r.jsx)("h3",{className:"text-lg font-semibold mb-3 text-white",children:"Constraints"}),(0,r.jsx)("div",{className:"text-sm text-gray-300 whitespace-pre-wrap",children:s.constraints})]})]})})]}),(0,r.jsxs)("div",{className:"w-1/2 flex flex-col bg-gray-900",children:[(0,r.jsx)("div",{className:"p-4 border-b bg-gray-800",children:(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"flex items-center gap-3",children:[(0,r.jsx)(b,{className:"w-5 h-5 text-white"}),(0,r.jsx)("h2",{className:"text-lg font-semibold text-white",children:"Code Editor"}),D&&(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[D.success?(0,r.jsx)(j.A,{className:"w-4 h-4 text-green-500"}):(0,r.jsx)(x.A,{className:"w-4 h-4 text-red-500"}),(0,r.jsxs)("span",{className:"text-sm text-gray-300",children:[D.passedTests,"/",D.totalTests," tests passed"]})]})]}),(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsxs)(u.l6,{value:A,onValueChange:P,children:[(0,r.jsx)(u.bq,{className:"w-32",children:(0,r.jsx)(u.yv,{})}),(0,r.jsxs)(u.gC,{children:[(0,r.jsx)(u.eb,{value:"cpp",children:"C++"}),(0,r.jsx)(u.eb,{value:"python",children:"Python"}),(0,r.jsx)(u.eb,{value:"java",children:"Java"}),(0,r.jsx)(u.eb,{value:"javascript",children:"JavaScript"})]})]}),(0,r.jsxs)(d.$,{variant:"outline",size:"sm",onClick:()=>{s&&(M(I(s,A)),q("Ready to run your code..."),G(null))},children:[(0,r.jsx)(v.A,{className:"w-4 h-4 mr-1"}),"Reset"]}),(0,r.jsx)(d.$,{variant:"outline",size:"sm",onClick:L,disabled:z,children:z?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(h.A,{className:"w-4 h-4 mr-1 animate-spin"}),"Running..."]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(w.A,{className:"w-4 h-4 mr-1"}),"Run"]})}),(0,r.jsx)(d.$,{size:"sm",onClick:F,disabled:O,children:O?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(h.A,{className:"w-4 h-4 mr-1 animate-spin"}),"Submitting..."]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(N,{className:"w-4 h-4 mr-1"}),"Submit"]})})]})]})}),(0,r.jsx)("div",{className:"flex-1 bg-gray-900",children:(0,r.jsx)(p.T,{value:E,onChange:e=>M(e.target.value),className:"w-full h-full bg-gray-900 text-green-400 font-mono text-sm resize-none border-0 focus-visible:ring-0 p-4",placeholder:"Write your solution here...",style:{fontFamily:'Monaco, Menlo, "Ubuntu Mono", monospace'}})}),(0,r.jsxs)("div",{className:"h-48 border-t bg-gray-900",children:[(0,r.jsx)("div",{className:"p-3 border-b bg-gray-800",children:(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsx)(k,{className:"w-4 h-4 text-white"}),(0,r.jsx)("h3",{className:"font-semibold text-white",children:"Output"})]})}),(0,r.jsx)("div",{className:"p-4 h-40 overflow-auto",children:(0,r.jsx)("pre",{className:"text-sm font-mono whitespace-pre-wrap text-gray-300",children:_})})]})]})]})]})]})}function T(){return(0,r.jsx)(a.Suspense,{fallback:(0,r.jsx)("div",{className:"flex items-center justify-center h-screen",children:"Loading..."}),children:(0,r.jsx)(C,{})})}},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},67895:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>r});let r=(0,t(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/pendulum/algo-task/client/app/solve/code-editor/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/pendulum/algo-task/client/app/solve/code-editor/page.tsx","default")},89956:(e,s,t)=>{Promise.resolve().then(t.bind(t,67895))},97840:(e,s,t)=>{"use strict";t.d(s,{A:()=>r});let r=(0,t(62688).A)("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]])}};var s=require("../../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),r=s.X(0,[124,801,497,6,773],()=>t(29187));module.exports=r})();