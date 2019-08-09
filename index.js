const fs=require("fs"),transformExpected=expected=>{if(""===expected)return"''";const parse1=expected.replace(/\/\/.*/,"").trim();return"{"===parse1.substr(0,1)?JSON.parse(parse1.replace(/\n/g,"")):parse1.match(/^['"](.*)['"]$/)?parse1.replace(/'(.*)'/,"$1"):eval(parse1)};void 0===global.StoryBookSections&&(global.StoryBookSections=[]),void 0===global.StoryBookSectionCounter&&(global.StoryBookSectionCounter=0);const parseArgs=t=>"function"!=typeof t[1]?t:[t[0],"",t[1]],historyCreator=mainTitle=>{return global.StoryBookSections.push(`### ${mainTitle}


`),(...args)=>{const[testTitle,subtitle,callback]=parseArgs(args);let allHistory=`#### ${testTitle}

`,testCounter=0;global.StoryBookSectionCounter++;const variation=(title,callback)=>{if(!callback)return variation("",t=>t(title));0===testCounter&&(allHistory+=`${subtitle}

`),testCounter++,test(title,()=>{let testHistory=title?`**${title}**
`:"";return testHistory+="```js\n",new Promise(resolve=>{let timeout;const sample=code=>{let[toExpect,expected]=code.replace(/\n/g,"å").replace(/=/,"œ").split("œ").map(t=>t.trim().replace(/å/g,"\n"));toExpect.match(/^[{\[]/)&&(toExpect=toExpect.replace(/\n/g,"")),clearTimeout(timeout),expect(eval(toExpect.replace(/\n/g,"\\n"))).toEqual(transformExpected(expected)),testHistory+=`${code}
`,timeout=setTimeout(()=>{if(testHistory+="```",allHistory+=`${testHistory}
`,0===--testCounter&&(global.StoryBookSections.push(allHistory),0===--global.StoryBookSectionCounter)){const t=fs.readFileSync("README.md","utf8"),e=global.StoryBookSections.join("").replace(/\n/g,"å");let o=t.replace(/\n/g,"å");o.match(new RegExp(`### ${mainTitle}.*å### `))?o=o.replace(new RegExp(`### ${mainTitle}.*å### `),`${e}å### `):o.match(new RegExp(`### ${mainTitle}.*`))?o=o.replace(new RegExp(`### ${mainTitle}.*`),`${e}å`):o+=`${e}å`,fs.writeFileSync("README.md",o.replace(/å/g,"\n"))}resolve()},100)};callback(sample)})})};describe(mainTitle,()=>callback(variation))}};

module.exports = {historyCreator}