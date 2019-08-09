const fs=require("fs"),transformExpected=expected=>{if(""===expected)return"''";const parse1=expected.replace(/\/\/.*/,"").trim();return"{"===parse1.substr(0,1)?JSON.parse(parse1.replace(/\n/g,"")):parse1.match(/^['"](.*)['"]$/)?parse1.replace(/'(.*)'/,"$1"):eval(parse1)};void 0===global.StoryBookSections&&(global.StoryBookSections=[]),void 0===global.StoryBookSectionCounter&&(global.StoryBookSectionCounter=0);const parseArgs=e=>"function"!=typeof e[1]?e:[e[0],"",e[1]],storyCreator=mainTitle=>{return global.StoryBookSections.push(`### ${mainTitle}


`),(...args)=>{const[testTitle,subtitle,callback]=parseArgs(args);let allHistory=`#### ${testTitle}

`,testCounter=0;global.StoryBookSectionCounter++;const variation=(title,callback)=>{if(!callback)return variation("",e=>e(title));0===testCounter&&(allHistory+=`${subtitle}

`),testCounter++,test(title,()=>{let testHistory=title?`**${title}**
`:"";return testHistory+="```js\n",new Promise(resolve=>{let timeout;const sample=code=>{if("string"!=typeof code||!code.replace(/\n/g,"å").match(/=/))return expect(code);let[toExpect,expected]=code.replace(/\n/g,"å").replace(/=/,"œ").split("œ").map(e=>e.trim().replace(/å/g,"\n"));toExpect.match(/^[{\[]/)&&(toExpect=toExpect.replace(/\n/g,"")),clearTimeout(timeout),expect(eval(toExpect.replace(/\n/g,"\\n"))).toEqual(transformExpected(expected)),testHistory+=`${code}
`,timeout=setTimeout(()=>{if(testHistory+="```",allHistory+=`${testHistory}
`,0===--testCounter&&(global.StoryBookSections.push(allHistory),0===--global.StoryBookSectionCounter)){const e=fs.readFileSync("README.md","utf8"),t=global.StoryBookSections.join("").replace(/\n/g,"å");let o=e.replace(/\n/g,"å");o.match(new RegExp(`### ${mainTitle}.*å### `))?o=o.replace(new RegExp(`### ${mainTitle}.*å### `),`${t}å### `):o.match(new RegExp(`### ${mainTitle}.*`))?o=o.replace(new RegExp(`### ${mainTitle}.*`),`${t}å`):o+=`${t}å`,fs.writeFileSync("README.md",o.replace(/å/g,"\n"))}resolve()},100)};callback(sample)})})};describe(mainTitle,()=>callback(variation))}};

module.exports = {storyCreator}