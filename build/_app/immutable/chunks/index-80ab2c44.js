function w(){}const dt=t=>t;function ht(t,e){for(const n in e)t[n]=e[n];return t}function mt(t){return t&&typeof t=="object"&&typeof t.then=="function"}function Y(t){return t()}function K(){return Object.create(null)}function v(t){t.forEach(Y)}function F(t){return typeof t=="function"}function Jt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let N;function Kt(t,e){return N||(N=document.createElement("a")),N.href=e,t===N.href}function pt(t){return Object.keys(t).length===0}function yt(t,...e){if(t==null)return w;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Qt(t,e,n){t.$$.on_destroy.push(yt(e,n))}function Ut(t,e,n,i){if(t){const r=Z(t,e,n,i);return t[0](r)}}function Z(t,e,n,i){return t[1]&&i?ht(n.ctx.slice(),t[1](i(e))):n.ctx}function Vt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const l=[],s=Math.max(e.dirty.length,r.length);for(let o=0;o<s;o+=1)l[o]=e.dirty[o]|r[o];return l}return e.dirty|r}return e.dirty}function Xt(t,e,n,i,r,l){if(r){const s=Z(e,n,i,l);t.p(s,r)}}function Yt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Zt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function te(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function ee(t){return t==null?"":t}function ne(t,e,n){return t.set(n),e}function ie(t){return t&&F(t.destroy)?t.destroy:w}const tt=typeof window!="undefined";let gt=tt?()=>window.performance.now():()=>Date.now(),G=tt?t=>requestAnimationFrame(t):w;const $=new Set;function et(t){$.forEach(e=>{e.c(t)||($.delete(e),e.f())}),$.size!==0&&G(et)}function bt(t){let e;return $.size===0&&G(et),{promise:new Promise(n=>{$.add(e={c:t,f:n})}),abort(){$.delete(e)}}}let O=!1;function xt(){O=!0}function $t(){O=!1}function wt(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function vt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let u=0;u<e.length;u++){const _=e[u];_.claim_order!==void 0&&c.push(_)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let c=0;c<e.length;c++){const u=e[c].claim_order,_=(r>0&&e[n[r]].claim_order<=u?r+1:wt(1,r,a=>e[n[a]].claim_order,u))-1;i[c]=n[_]+1;const f=_+1;n[f]=c,r=Math.max(f,r)}const l=[],s=[];let o=e.length-1;for(let c=n[r]+1;c!=0;c=i[c-1]){for(l.push(e[c-1]);o>=c;o--)s.push(e[o]);o--}for(;o>=0;o--)s.push(e[o]);l.reverse(),s.sort((c,u)=>c.claim_order-u.claim_order);for(let c=0,u=0;c<s.length;c++){for(;u<l.length&&s[c].claim_order>=l[u].claim_order;)u++;const _=u<l.length?l[u]:null;t.insertBefore(s[c],_)}}function kt(t,e){t.appendChild(e)}function nt(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Et(t){const e=I("style");return At(nt(t),e),e.sheet}function At(t,e){kt(t.head||t,e)}function Tt(t,e){if(O){for(vt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Nt(t,e,n){t.insertBefore(e,n||null)}function jt(t,e,n){O&&!n?Tt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function M(t){t.parentNode.removeChild(t)}function re(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function I(t){return document.createElement(t)}function it(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function W(t){return document.createTextNode(t)}function se(){return W(" ")}function ce(){return W("")}function le(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function oe(t){return function(e){return e.preventDefault(),t.call(this,e)}}function ue(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function rt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function ae(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set?t[i]=e[i]:rt(t,i,e[i])}function fe(t,e){for(const n in e)rt(t,n,e[n])}function _e(t){return t===""?null:+t}function Ct(t){return Array.from(t.childNodes)}function st(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function ct(t,e,n,i,r=!1){st(t);const l=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const o=t[s];if(e(o)){const c=n(o);return c===void 0?t.splice(s,1):t[s]=c,r||(t.claim_info.last_index=s),o}}for(let s=t.claim_info.last_index-1;s>=0;s--){const o=t[s];if(e(o)){const c=n(o);return c===void 0?t.splice(s,1):t[s]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,o}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function lt(t,e,n,i){return ct(t,r=>r.nodeName===e,r=>{const l=[];for(let s=0;s<r.attributes.length;s++){const o=r.attributes[s];n[o.name]||l.push(o.name)}l.forEach(s=>r.removeAttribute(s))},()=>i(e))}function de(t,e,n){return lt(t,e,n,I)}function he(t,e,n){return lt(t,e,n,it)}function St(t,e){return ct(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>W(e),!0)}function me(t){return St(t," ")}function Q(t,e,n){for(let i=n;i<t.length;i+=1){const r=t[i];if(r.nodeType===8&&r.textContent.trim()===e)return i}return t.length}function pe(t,e){const n=Q(t,"HTML_TAG_START",0),i=Q(t,"HTML_TAG_END",n);if(n===i)return new U(void 0,e);st(t);const r=t.splice(n,i-n+1);M(r[0]),M(r[r.length-1]);const l=r.slice(1,r.length-1);for(const s of l)s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new U(l,e)}function ye(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function ge(t,e){t.value=e==null?"":e}function be(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function ot(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}function xe(t,e=document.body){return Array.from(e.querySelectorAll(t))}class Mt{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=it(n.nodeName):this.e=I(n.nodeName),this.t=n,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)Nt(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(M)}}class U extends Mt{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)jt(this.t,this.n[n],e)}}const D=new Map;let P=0;function Dt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Pt(t,e){const n={stylesheet:Et(e),rules:{}};return D.set(t,n),n}function V(t,e,n,i,r,l,s,o=0){const c=16.666/i;let u=`{
`;for(let y=0;y<=1;y+=c){const x=e+(n-e)*l(y);u+=y*100+`%{${s(x,1-x)}}
`}const _=u+`100% {${s(n,1-n)}}
}`,f=`__svelte_${Dt(_)}_${o}`,a=nt(t),{stylesheet:d,rules:h}=D.get(a)||Pt(a,t);h[f]||(h[f]=!0,d.insertRule(`@keyframes ${f} ${_}`,d.cssRules.length));const b=t.style.animation||"";return t.style.animation=`${b?`${b}, `:""}${f} ${i}ms linear ${r}ms 1 both`,P+=1,f}function Ht(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?l=>l.indexOf(e)<0:l=>l.indexOf("__svelte")===-1),r=n.length-i.length;r&&(t.style.animation=i.join(", "),P-=r,P||Ot())}function Ot(){G(()=>{P||(D.forEach(t=>{const{stylesheet:e}=t;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.rules={}}),D.clear())})}let A;function m(t){A=t}function g(){if(!A)throw new Error("Function called outside component initialization");return A}function $e(t){g().$$.on_mount.push(t)}function we(t){g().$$.after_update.push(t)}function ve(t){g().$$.on_destroy.push(t)}function ke(){const t=g();return(e,n,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[e];if(r){const l=ot(e,n,{cancelable:i});return r.slice().forEach(s=>{s.call(t,l)}),!l.defaultPrevented}return!0}}function Ee(t,e){return g().$$.context.set(t,e),e}function Ae(t){return g().$$.context.get(t)}function Te(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const E=[],X=[],C=[],B=[],ut=Promise.resolve();let z=!1;function at(){z||(z=!0,ut.then(J))}function Ne(){return at(),ut}function H(t){C.push(t)}function je(t){B.push(t)}const q=new Set;let j=0;function J(){const t=A;do{for(;j<E.length;){const e=E[j];j++,m(e),Rt(e.$$)}for(m(null),E.length=0,j=0;X.length;)X.pop()();for(let e=0;e<C.length;e+=1){const n=C[e];q.has(n)||(q.add(n),n())}C.length=0}while(E.length);for(;B.length;)B.pop()();z=!1,q.clear(),m(t)}function Rt(t){if(t.fragment!==null){t.update(),v(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(H)}}let k;function qt(){return k||(k=Promise.resolve(),k.then(()=>{k=null})),k}function L(t,e,n){t.dispatchEvent(ot(`${e?"intro":"outro"}${n}`))}const S=new Set;let p;function Lt(){p={r:0,c:[],p}}function Bt(){p.r||v(p.c),p=p.p}function ft(t,e){t&&t.i&&(S.delete(t),t.i(e))}function zt(t,e,n,i){if(t&&t.o){if(S.has(t))return;S.add(t),p.c.push(()=>{S.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Ft={duration:0};function Ce(t,e,n,i){let r=e(t,n),l=i?0:1,s=null,o=null,c=null;function u(){c&&Ht(t,c)}function _(a,d){const h=a.b-l;return d*=Math.abs(h),{a:l,b:a.b,d:h,duration:d,start:a.start,end:a.start+d,group:a.group}}function f(a){const{delay:d=0,duration:h=300,easing:b=dt,tick:y=w,css:x}=r||Ft,R={start:gt()+d,b:a};a||(R.group=p,p.r+=1),s||o?o=R:(x&&(u(),c=V(t,l,a,h,d,b,x)),a&&y(0,1),s=_(R,h),H(()=>L(t,a,"start")),bt(T=>{if(o&&T>o.start&&(s=_(o,h),o=null,L(t,s.b,"start"),x&&(u(),c=V(t,l,s.b,s.duration,0,b,r.css))),s){if(T>=s.end)y(l=s.b,1-l),L(t,s.b,"end"),o||(s.b?u():--s.group.r||v(s.group.c)),s=null;else if(T>=s.start){const _t=T-s.start;l=s.a+s.d*b(_t/s.duration),y(l,1-l)}}return!!(s||o)}))}return{run(a){F(r)?qt().then(()=>{r=r(),f(a)}):f(a)},end(){u(),s=o=null}}}function Se(t,e){const n=e.token={};function i(r,l,s,o){if(e.token!==n)return;e.resolved=o;let c=e.ctx;s!==void 0&&(c=c.slice(),c[s]=o);const u=r&&(e.current=r)(c);let _=!1;e.block&&(e.blocks?e.blocks.forEach((f,a)=>{a!==l&&f&&(Lt(),zt(f,1,1,()=>{e.blocks[a]===f&&(e.blocks[a]=null)}),Bt())}):e.block.d(1),u.c(),ft(u,1),u.m(e.mount(),e.anchor),_=!0),e.block=u,e.blocks&&(e.blocks[l]=u),_&&J()}if(mt(t)){const r=g();if(t.then(l=>{m(r),i(e.then,1,e.value,l),m(null)},l=>{if(m(r),i(e.catch,2,e.error,l),m(null),!e.hasCatch)throw l}),e.current!==e.pending)return i(e.pending,0),!0}else{if(e.current!==e.then)return i(e.then,1,e.value,t),!0;e.resolved=t}}function Me(t,e,n){const i=e.slice(),{resolved:r}=t;t.current===t.then&&(i[t.value]=r),t.current===t.catch&&(i[t.error]=r),t.block.p(i,n)}const De=typeof window!="undefined"?window:typeof globalThis!="undefined"?globalThis:global;function Pe(t,e){const n={},i={},r={$$scope:1};let l=t.length;for(;l--;){const s=t[l],o=e[l];if(o){for(const c in s)c in o||(i[c]=1);for(const c in o)r[c]||(n[c]=o[c],r[c]=1);t[l]=o}else for(const c in s)r[c]=1}for(const s in i)s in n||(n[s]=void 0);return n}function He(t){return typeof t=="object"&&t!==null?t:{}}function Oe(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Re(t){t&&t.c()}function qe(t,e){t&&t.l(e)}function Gt(t,e,n,i){const{fragment:r,on_mount:l,on_destroy:s,after_update:o}=t.$$;r&&r.m(e,n),i||H(()=>{const c=l.map(Y).filter(F);s?s.push(...c):v(c),t.$$.on_mount=[]}),o.forEach(H)}function It(t,e){const n=t.$$;n.fragment!==null&&(v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Wt(t,e){t.$$.dirty[0]===-1&&(E.push(t),at(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Le(t,e,n,i,r,l,s,o=[-1]){const c=A;m(t);const u=t.$$={fragment:null,ctx:null,props:l,update:w,not_equal:r,bound:K(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:K(),dirty:o,skip_bound:!1,root:e.target||c.$$.root};s&&s(u.root);let _=!1;if(u.ctx=n?n(t,e.props||{},(f,a,...d)=>{const h=d.length?d[0]:a;return u.ctx&&r(u.ctx[f],u.ctx[f]=h)&&(!u.skip_bound&&u.bound[f]&&u.bound[f](h),_&&Wt(t,f)),a}):[],u.update(),_=!0,v(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){xt();const f=Ct(e.target);u.fragment&&u.fragment.l(f),f.forEach(M)}else u.fragment&&u.fragment.c();e.intro&&ft(t.$$.fragment),Gt(t,e.target,e.anchor,e.customElement),$t(),J()}m(c)}class Be{$destroy(){It(this,1),this.$destroy=w}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!pt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{je as $,He as A,It as B,ht as C,Ne as D,w as E,Ut as F,Xt as G,Yt as H,Vt as I,Tt as J,Ae as K,le as L,v as M,ve as N,De as O,te as P,Qt as Q,Zt as R,Be as S,ie as T,F as U,Te as V,oe as W,ue as X,g as Y,X as Z,Oe as _,Ct as a,ae as a0,ke as a1,ne as a2,yt as a3,it as a4,he as a5,fe as a6,re as a7,_e as a8,ge as a9,Kt as aa,U as ab,pe as ac,xe as ad,ee as ae,dt as af,H as ag,Ce as ah,Se as ai,Me as aj,rt as b,de as c,M as d,I as e,be as f,jt as g,St as h,Le as i,ye as j,se as k,ce as l,me as m,Lt as n,zt as o,Bt as p,ft as q,Ee as r,Jt as s,W as t,we as u,$e as v,Re as w,qe as x,Gt as y,Pe as z};
