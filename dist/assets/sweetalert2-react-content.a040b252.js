import{e as k,a as m}from"./react-dom.dfd08c0f.js";var h={},_,y=k.exports;_=h.createRoot=y.createRoot,h.hydrateRoot=y.hydrateRoot;/** @preserve
  * package: sweetalert2-react-content v5.0.3
  * file: dist/sweetalert2-react-content.es.js
  * homepage: https://github.com/sweetalert2/sweetalert2-react-content#readme
  * license: MIT
  **/const g=[{key:"title",getter:t=>t.getTitle()},{key:"html",getter:t=>t.getHtmlContainer()},{key:"confirmButtonText",getter:t=>t.getConfirmButton()},{key:"denyButtonText",getter:t=>t.getDenyButton()},{key:"cancelButtonText",getter:t=>t.getCancelButton()},{key:"footer",getter:t=>t.getFooter()},{key:"closeButtonHtml",getter:t=>t.getCloseButton()},{key:"iconHtml",getter:t=>t.getIcon().querySelector(".swal2-icon-content")},{key:"loaderHtml",getter:t=>t.getLoader()}],u=()=>{};function B(t){function l(e){const o={},r={},n=g.map(a=>a.key);return Object.entries(e).forEach(a=>{let[c,i]=a;n.includes(c)&&m.isValidElement(i)?(o[c]=i,r[c]=" "):r[c]=i}),[o,r]}function d(e,o){Object.entries(o).forEach(r=>{let[n,a]=r;const i=g.find(f=>f.key===n).getter(t),s=_(i);s.render(a),e.__roots.push(s)})}function p(e){e.__roots.forEach(o=>{o.unmount()}),e.__roots=[]}return class extends t{static argsToParams(e){if(m.isValidElement(e[0])||m.isValidElement(e[1])){const o={};return["title","html","icon"].forEach((r,n)=>{e[n]!==void 0&&(o[r]=e[n])}),o}else return t.argsToParams(e)}_main(e,o){this.__roots=[],this.__params=Object.assign({},o,e);const[r,n]=l(this.__params),a=n.willOpen||u,c=n.didOpen||u,i=n.didDestroy||u;return super._main(Object.assign({},n,{willOpen:s=>{d(this,r),a(s)},didOpen:s=>{setTimeout(()=>{c(s)})},didDestroy:s=>{i(s),p(this)}}))}update(e){Object.assign(this.__params,e),p(this);const[o,r]=l(this.__params);super.update(r),d(this,o)}}}export{h as c,B as w};
