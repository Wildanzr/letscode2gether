import{m}from"./index.962d4939.js";import"./react-dom.a797eb2f.js";import"./sweetalert2-react-content.d5a9fa88.js";import"./axios.679bc935.js";import"./react-router-dom.d3afe7ef.js";import"./sweetalert2.c11858c1.js";import"./react-icons.c971bcff.js";import"./framer-motion.dbe5447e.js";import"./antd.19edc8ef.js";import"./react-draggable.60cabf8b.js";/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.34.0(9d278685b078158491964f8fd7ac9628fffa0f30)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/var p=Object.defineProperty,c=Object.getOwnPropertyDescriptor,l=Object.getOwnPropertyNames,d=Object.prototype.hasOwnProperty,r=(t,e,o,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of l(e))!d.call(t,n)&&n!==o&&p(t,n,{get:()=>e[n],enumerable:!(i=c(e,n))||i.enumerable});return t},s=(t,e,o)=>(r(t,e,"default"),o&&r(o,e,"default")),a={};s(a,m);var N={comments:{blockComment:["<!--","-->"]},brackets:[["<",">"]],autoClosingPairs:[{open:"<",close:">"},{open:"'",close:"'"},{open:'"',close:'"'}],surroundingPairs:[{open:"<",close:">"},{open:"'",close:"'"},{open:'"',close:'"'}],onEnterRules:[{beforeText:new RegExp("<([_:\\w][_:\\w-.\\d]*)([^/>]*(?!/)>)[^<]*$","i"),afterText:/^<\/([_:\w][_:\w-.\d]*)\s*>$/i,action:{indentAction:a.languages.IndentAction.IndentOutdent}},{beforeText:new RegExp("<(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$","i"),action:{indentAction:a.languages.IndentAction.Indent}}]},O={defaultToken:"",tokenPostfix:".xml",ignoreCase:!0,qualifiedName:/(?:[\w\.\-]+:)?[\w\.\-]+/,tokenizer:{root:[[/[^<&]+/,""],{include:"@whitespace"},[/(<)(@qualifiedName)/,[{token:"delimiter"},{token:"tag",next:"@tag"}]],[/(<\/)(@qualifiedName)(\s*)(>)/,[{token:"delimiter"},{token:"tag"},"",{token:"delimiter"}]],[/(<\?)(@qualifiedName)/,[{token:"delimiter"},{token:"metatag",next:"@tag"}]],[/(<\!)(@qualifiedName)/,[{token:"delimiter"},{token:"metatag",next:"@tag"}]],[/<\!\[CDATA\[/,{token:"delimiter.cdata",next:"@cdata"}],[/&\w+;/,"string.escape"]],cdata:[[/[^\]]+/,""],[/\]\]>/,{token:"delimiter.cdata",next:"@pop"}],[/\]/,""]],tag:[[/[ \t\r\n]+/,""],[/(@qualifiedName)(\s*=\s*)("[^"]*"|'[^']*')/,["attribute.name","","attribute.value"]],[/(@qualifiedName)(\s*=\s*)("[^">?\/]*|'[^'>?\/]*)(?=[\?\/]\>)/,["attribute.name","","attribute.value"]],[/(@qualifiedName)(\s*=\s*)("[^">]*|'[^'>]*)/,["attribute.name","","attribute.value"]],[/@qualifiedName/,"attribute.name"],[/\?>/,{token:"delimiter",next:"@pop"}],[/(\/)(>)/,[{token:"tag"},{token:"delimiter",next:"@pop"}]],[/>/,{token:"delimiter",next:"@pop"}]],whitespace:[[/[ \t\r\n]+/,""],[/<!--/,{token:"comment",next:"@comment"}]],comment:[[/[^<\-]+/,"comment.content"],[/-->/,{token:"comment",next:"@pop"}],[/<!--/,"comment.content.invalid"],[/[<\-]/,"comment.content"]]}};export{N as conf,O as language};
