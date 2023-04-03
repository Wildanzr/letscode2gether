import{r as s}from"./react-dom.59e1c638.js";function j(){return j=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},j.apply(this,arguments)}var S;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(S||(S={}));var z=function(e){return e},F="beforeunload",ne="popstate";function ae(e){e===void 0&&(e={});var t=e,n=t.window,a=n===void 0?document.defaultView:n,r=a.history;function l(){var c=a.location,f=c.pathname,g=c.search,y=c.hash,x=r.state||{};return[x.idx,z({pathname:f,search:g,hash:y,state:x.usr||null,key:x.key||"default"})]}var o=null;function i(){if(o)v.call(o),o=null;else{var c=S.Pop,f=l(),g=f[0],y=f[1];if(v.length){if(g!=null){var x=h-g;x&&(o={action:c,location:y,retry:function(){O(x*-1)}},O(x))}}else W(c)}}a.addEventListener(ne,i);var u=S.Pop,p=l(),h=p[0],d=p[1],m=G(),v=G();h==null&&(h=0,r.replaceState(j({},r.state,{idx:h}),""));function E(c){return typeof c=="string"?c:T(c)}function k(c,f){return f===void 0&&(f=null),z(j({pathname:d.pathname,hash:"",search:""},typeof c=="string"?R(c):c,{state:f,key:re()}))}function K(c,f){return[{usr:c.state,key:c.key,idx:f},E(c)]}function U(c,f,g){return!v.length||(v.call({action:c,location:f,retry:g}),!1)}function W(c){u=c;var f=l();h=f[0],d=f[1],m.call({action:u,location:d})}function D(c,f){var g=S.Push,y=k(c,f);function x(){D(c,f)}if(U(g,y,x)){var b=K(y,h+1),M=b[0],$=b[1];try{r.pushState(M,"",$)}catch{a.location.assign($)}W(g)}}function I(c,f){var g=S.Replace,y=k(c,f);function x(){I(c,f)}if(U(g,y,x)){var b=K(y,h),M=b[0],$=b[1];r.replaceState(M,"",$),W(g)}}function O(c){r.go(c)}var te={get action(){return u},get location(){return d},createHref:E,push:D,replace:I,go:O,back:function(){O(-1)},forward:function(){O(1)},listen:function(f){return m.push(f)},block:function(f){var g=v.push(f);return v.length===1&&a.addEventListener(F,A),function(){g(),v.length||a.removeEventListener(F,A)}}};return te}function A(e){e.preventDefault(),e.returnValue=""}function G(){var e=[];return{get length(){return e.length},push:function(n){return e.push(n),function(){e=e.filter(function(a){return a!==n})}},call:function(n){e.forEach(function(a){return a&&a(n)})}}}function re(){return Math.random().toString(36).substr(2,8)}function T(e){var t=e.pathname,n=t===void 0?"/":t,a=e.search,r=a===void 0?"":a,l=e.hash,o=l===void 0?"":l;return r&&r!=="?"&&(n+=r.charAt(0)==="?"?r:"?"+r),o&&o!=="#"&&(n+=o.charAt(0)==="#"?o:"#"+o),n}function R(e){var t={};if(e){var n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));var a=e.indexOf("?");a>=0&&(t.search=e.substr(a),e=e.substr(0,a)),e&&(t.pathname=e)}return t}/**
 * React Router v6.2.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function P(e,t){if(!e)throw new Error(t)}const V=s.exports.createContext(null),J=s.exports.createContext(null),w=s.exports.createContext({outlet:null,matches:[]});function le(e){return ce(e.context)}function oe(e){P(!1)}function ie(e){let{basename:t="/",children:n=null,location:a,navigationType:r=S.Pop,navigator:l,static:o=!1}=e;B()&&P(!1);let i=Le(t),u=s.exports.useMemo(()=>({basename:i,navigator:l,static:o}),[i,l,o]);typeof a=="string"&&(a=R(a));let{pathname:p="/",search:h="",hash:d="",state:m=null,key:v="default"}=a,E=s.exports.useMemo(()=>{let k=ee(p,i);return k==null?null:{pathname:k,search:h,hash:d,state:m,key:v}},[i,p,h,d,m,v]);return E==null?null:s.exports.createElement(V.Provider,{value:u},s.exports.createElement(J.Provider,{children:n,value:{location:E,navigationType:r}}))}function Ve(e){let{children:t,location:n}=e;return fe(_(t),n)}function se(e){B()||P(!1);let{basename:t,navigator:n}=s.exports.useContext(V),{hash:a,pathname:r,search:l}=X(e),o=r;if(t!=="/"){let i=Be(e),u=i!=null&&i.endsWith("/");o=r==="/"?t+(u?"/":""):C([t,r])}return n.createHref({pathname:o,search:l,hash:a})}function B(){return s.exports.useContext(J)!=null}function L(){return B()||P(!1),s.exports.useContext(J).location}function Q(){B()||P(!1);let{basename:e,navigator:t}=s.exports.useContext(V),{matches:n}=s.exports.useContext(w),{pathname:a}=L(),r=JSON.stringify(n.map(i=>i.pathnameBase)),l=s.exports.useRef(!1);return s.exports.useEffect(()=>{l.current=!0}),s.exports.useCallback(function(i,u){if(u===void 0&&(u={}),!l.current)return;if(typeof i=="number"){t.go(i);return}let p=Z(i,JSON.parse(r),a);e!=="/"&&(p.pathname=C([e,p.pathname])),(u.replace?t.replace:t.push)(p,u.state)},[e,t,r,a])}const ue=s.exports.createContext(null);function ce(e){let t=s.exports.useContext(w).outlet;return t&&s.exports.createElement(ue.Provider,{value:e},t)}function Je(){let{matches:e}=s.exports.useContext(w),t=e[e.length-1];return t?t.params:{}}function X(e){let{matches:t}=s.exports.useContext(w),{pathname:n}=L(),a=JSON.stringify(t.map(r=>r.pathnameBase));return s.exports.useMemo(()=>Z(e,JSON.parse(a),n),[e,a,n])}function fe(e,t){B()||P(!1);let{matches:n}=s.exports.useContext(w),a=n[n.length-1],r=a?a.params:{};a&&a.pathname;let l=a?a.pathnameBase:"/";a&&a.route;let o=L(),i;if(t){var u;let m=typeof t=="string"?R(t):t;l==="/"||((u=m.pathname)==null?void 0:u.startsWith(l))||P(!1),i=m}else i=o;let p=i.pathname||"/",h=l==="/"?p:p.slice(l.length)||"/",d=he(e,{pathname:h});return Re(d&&d.map(m=>Object.assign({},m,{params:Object.assign({},r,m.params),pathname:C([l,m.pathname]),pathnameBase:m.pathnameBase==="/"?l:C([l,m.pathnameBase])})),n)}function _(e){let t=[];return s.exports.Children.forEach(e,n=>{if(!s.exports.isValidElement(n))return;if(n.type===s.exports.Fragment){t.push.apply(t,_(n.props.children));return}n.type!==oe&&P(!1);let a={caseSensitive:n.props.caseSensitive,element:n.props.element,index:n.props.index,path:n.props.path};n.props.children&&(a.children=_(n.props.children)),t.push(a)}),t}function he(e,t,n){n===void 0&&(n="/");let a=typeof t=="string"?R(t):t,r=ee(a.pathname||"/",n);if(r==null)return null;let l=Y(e);pe(l);let o=null;for(let i=0;o==null&&i<l.length;++i)o=Se(l[i],r);return o}function Y(e,t,n,a){return t===void 0&&(t=[]),n===void 0&&(n=[]),a===void 0&&(a=""),e.forEach((r,l)=>{let o={relativePath:r.path||"",caseSensitive:r.caseSensitive===!0,childrenIndex:l,route:r};o.relativePath.startsWith("/")&&(o.relativePath.startsWith(a)||P(!1),o.relativePath=o.relativePath.slice(a.length));let i=C([a,o.relativePath]),u=n.concat(o);r.children&&r.children.length>0&&(r.index===!0&&P(!1),Y(r.children,t,u,i)),!(r.path==null&&!r.index)&&t.push({path:i,score:ye(i,r.index),routesMeta:u})}),t}function pe(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Ce(t.routesMeta.map(a=>a.childrenIndex),n.routesMeta.map(a=>a.childrenIndex)))}const me=/^:\w+$/,de=3,ve=2,ge=1,xe=10,Pe=-2,q=e=>e==="*";function ye(e,t){let n=e.split("/"),a=n.length;return n.some(q)&&(a+=Pe),t&&(a+=ve),n.filter(r=>!q(r)).reduce((r,l)=>r+(me.test(l)?de:l===""?ge:xe),a)}function Ce(e,t){return e.length===t.length&&e.slice(0,-1).every((a,r)=>a===t[r])?e[e.length-1]-t[t.length-1]:0}function Se(e,t){let{routesMeta:n}=e,a={},r="/",l=[];for(let o=0;o<n.length;++o){let i=n[o],u=o===n.length-1,p=r==="/"?t:t.slice(r.length)||"/",h=be({path:i.relativePath,caseSensitive:i.caseSensitive,end:u},p);if(!h)return null;Object.assign(a,h.params);let d=i.route;l.push({params:a,pathname:C([r,h.pathname]),pathnameBase:C([r,h.pathnameBase]),route:d}),h.pathnameBase!=="/"&&(r=C([r,h.pathnameBase]))}return l}function Re(e,t){return t===void 0&&(t=[]),e==null?null:e.reduceRight((n,a,r)=>s.exports.createElement(w.Provider,{children:a.route.element!==void 0?a.route.element:s.exports.createElement(le,null),value:{outlet:n,matches:t.concat(e.slice(0,r+1))}}),null)}function be(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,a]=we(e.path,e.caseSensitive,e.end),r=t.match(n);if(!r)return null;let l=r[0],o=l.replace(/(.)\/+$/,"$1"),i=r.slice(1);return{params:a.reduce((p,h,d)=>{if(h==="*"){let m=i[d]||"";o=l.slice(0,l.length-m.length).replace(/(.)\/+$/,"$1")}return p[h]=Ee(i[d]||""),p},{}),pathname:l,pathnameBase:o,pattern:e}}function we(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0);let a=[],r="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^$?{}|()[\]]/g,"\\$&").replace(/:(\w+)/g,(o,i)=>(a.push(i),"([^\\/]+)"));return e.endsWith("*")?(a.push("*"),r+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r+=n?"\\/*$":"(?:\\b|\\/|$)",[new RegExp(r,t?void 0:"i"),a]}function Ee(e,t){try{return decodeURIComponent(e)}catch{return e}}function ke(e,t){t===void 0&&(t="/");let{pathname:n,search:a="",hash:r=""}=typeof e=="string"?R(e):e;return{pathname:n?n.startsWith("/")?n:Oe(n,t):t,search:$e(a),hash:je(r)}}function Oe(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function Z(e,t,n){let a=typeof e=="string"?R(e):e,r=e===""||a.pathname===""?"/":a.pathname,l;if(r==null)l=n;else{let i=t.length-1;if(r.startsWith("..")){let u=r.split("/");for(;u[0]==="..";)u.shift(),i-=1;a.pathname=u.join("/")}l=i>=0?t[i]:"/"}let o=ke(a,l);return r&&r!=="/"&&r.endsWith("/")&&!o.pathname.endsWith("/")&&(o.pathname+="/"),o}function Be(e){return e===""||e.pathname===""?"/":typeof e=="string"?R(e).pathname:e.pathname}function ee(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=e.charAt(t.length);return n&&n!=="/"?null:e.slice(t.length)||"/"}const C=e=>e.join("/").replace(/\/\/+/g,"/"),Le=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),$e=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,je=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;/**
 * React Router DOM v6.2.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function H(){return H=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},H.apply(this,arguments)}function We(e,t){if(e==null)return{};var n={},a=Object.keys(e),r,l;for(l=0;l<a.length;l++)r=a[l],!(t.indexOf(r)>=0)&&(n[r]=e[r]);return n}const Me=["onClick","reloadDocument","replace","state","target","to"];function Ke(e){let{basename:t,children:n,window:a}=e,r=s.exports.useRef();r.current==null&&(r.current=ae({window:a}));let l=r.current,[o,i]=s.exports.useState({action:l.action,location:l.location});return s.exports.useLayoutEffect(()=>l.listen(i),[l]),s.exports.createElement(ie,{basename:t,children:n,location:o.location,navigationType:o.action,navigator:l})}function Ne(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}const Ue=s.exports.forwardRef(function(t,n){let{onClick:a,reloadDocument:r,replace:l=!1,state:o,target:i,to:u}=t,p=We(t,Me),h=se(u),d=Te(u,{replace:l,state:o,target:i});function m(v){a&&a(v),!v.defaultPrevented&&!r&&d(v)}return s.exports.createElement("a",H({},p,{href:h,onClick:m,ref:n,target:i}))});function Te(e,t){let{target:n,replace:a,state:r}=t===void 0?{}:t,l=Q(),o=L(),i=X(e);return s.exports.useCallback(u=>{if(u.button===0&&(!n||n==="_self")&&!Ne(u)){u.preventDefault();let p=!!a||T(o)===T(i);l(e,{replace:p,state:r})}},[o,l,i,a,r,n,e])}function De(e){let t=s.exports.useRef(N(e)),n=L(),a=s.exports.useMemo(()=>{let o=N(n.search);for(let i of t.current.keys())o.has(i)||t.current.getAll(i).forEach(u=>{o.append(i,u)});return o},[n.search]),r=Q(),l=s.exports.useCallback((o,i)=>{r("?"+N(o),i)},[r]);return[a,l]}function N(e){return e===void 0&&(e=""),new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let a=e[n];return t.concat(Array.isArray(a)?a.map(r=>[n,r]):[[n,a]])},[]))}export{Ke as B,Ue as L,V as N,Ve as R,j as _,Q as a,Je as b,De as c,oe as d,L as u};
