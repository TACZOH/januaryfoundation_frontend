import{S as Z,i as ee,s as te,w as _,k as D,e as ie,x as v,m as E,c as se,a as ne,d as j,b as ae,y,g as X,J as Y,q as w,o as T,B as $}from"../../chunks/index-80ab2c44.js";import{a as M,c as S,H as oe,F as fe,s as O}from"../../chunks/menuSubitems-d774bbe4.js";import{p as re,S as le}from"../../chunks/SvelteSeo-09bc5979.js";import{F as me}from"../../chunks/Form-f831674d.js";import"../../chunks/singletons-aff50adf.js";import"../../chunks/index-bb389ea6.js";function ue(l){let f,m,n,t,o,u,d,r,g;return f=new le({props:{title:"Institution Grant",description:"Institution Grant Application",keywords:"institution, grant, application",openGraph:{title:"Institution Grant",description:"Institution Grant Application",type:"website"}}}),t=new oe({props:{logo:l[0],nav:l[2]}}),u=new me({props:{type:ce}}),r=new fe({props:{logo:l[0],footerNav:l[3],socialMedia:l[1]}}),{c(){_(f.$$.fragment),m=D(),n=ie("div"),_(t.$$.fragment),o=D(),_(u.$$.fragment),d=D(),_(r.$$.fragment),this.h()},l(i){v(f.$$.fragment,i),m=E(i),n=se(i,"DIV",{class:!0});var a=ne(n);v(t.$$.fragment,a),o=E(a),v(u.$$.fragment,a),d=E(a),v(r.$$.fragment,a),a.forEach(j),this.h()},h(){ae(n,"class","bg-white overflow-hidden shadow divide-y divide-gray-200")},m(i,a){y(f,i,a),X(i,m,a),X(i,n,a),y(t,n,null),Y(n,o),y(u,n,null),Y(n,d),y(r,n,null),g=!0},p(i,[a]){const h={};a&1&&(h.logo=i[0]),a&4&&(h.nav=i[2]),t.$set(h);const p={};a&1&&(p.logo=i[0]),a&8&&(p.footerNav=i[3]),a&2&&(p.socialMedia=i[1]),r.$set(p)},i(i){g||(w(f.$$.fragment,i),w(t.$$.fragment,i),w(u.$$.fragment,i),w(r.$$.fragment,i),g=!0)},o(i){T(f.$$.fragment,i),T(t.$$.fragment,i),T(u.$$.fragment,i),T(r.$$.fragment,i),g=!1},d(i){$(f,i),i&&j(m),i&&j(n),$(t),$(u),$(r)}}}const ye=async()=>{var o,u,d,r,g;const l=await re.home(),f=await M.get(`${S.ENDPOINT_URL}global`),m=await M.get(`${S.ENDPOINT_URL}header`),n=await M.get(`${S.ENDPOINT_URL}footer`),t=f.data.logo.url;return l?{props:{page:l,keywords:(u=(o=l==null?void 0:l.SEO)==null?void 0:o.keywords)==null?void 0:u.join(", "),logo:t,navData:(d=m==null?void 0:m.data)==null?void 0:d.nav,footer:(r=n==null?void 0:n.data)==null?void 0:r.footer,socialMedia:(g=n==null?void 0:n.data)==null?void 0:g.social_media}}:{status:500}},ce="institution";function de(l,f,m){var g,i,a,h,p,G,x,A,H,L,P,R,U,q,B,C,F,J,V,z,K,Q,W;let{logo:n}=f,{navData:t}=f,{footer:o}=f,{socialMedia:u}=f;O("Individual").forEach(e=>{}),O("Business").forEach(e=>{}),O("Institution").forEach(e=>{});let d=[];for(let e=0;e<t.length;e++){let b=[];for(let s=0;s<t[e].subitems.length;s++){const I=((a=(i=(g=t[e])==null?void 0:g.subitems[s])==null?void 0:i.description)==null?void 0:a.split(`
`))||[];let c=null;t[e].subitems[s].feesType==="individual"&&(c=1),t[e].subitems[s].feesType==="raffle"&&(c=5),t[e].subitems[s].feesType==="business"&&(c=10),t[e].subitems[s].feesType==="institution"&&(c=100),t[e].subitems[s].feesType==="nomination"&&(c=10);let N={text:((p=(h=t[e])==null?void 0:h.subitems[s])==null?void 0:p.text)||"",link:((x=(G=t[e])==null?void 0:G.subitems[s])==null?void 0:x.link)||"",description:I,icon:((H=(A=t[e])==null?void 0:A.subitems[s])==null?void 0:H.iconName)||"",fee:c};b=[...b,N]}const k={text:t[e].text||"",link:t[e].link||"",subitems:b};d=[...d,k]}let r=[];for(let e=0;e<o.length;e++){let b=[];for(let s=0;s<o[e].subitems.length;s++){const I=((R=(P=(L=o[e])==null?void 0:L.subitems[s])==null?void 0:P.description)==null?void 0:R.split(`
`))||[];let c=1;((U=t[e].subitems[s])==null?void 0:U.feesType)==="individual"&&(c=1),((q=t[e].subitems[s])==null?void 0:q.feesType)==="raffle"&&(c=5),((B=t[e].subitems[s])==null?void 0:B.feesType)==="business"&&(c=10),((C=t[e].subitems[s])==null?void 0:C.feesType)==="institution"&&(c=100),((F=t[e].subitems[s])==null?void 0:F.feesType)==="nomination"&&(c=10);let N={text:((V=(J=o[e])==null?void 0:J.subitems[s])==null?void 0:V.text)||"",link:((K=(z=o[e])==null?void 0:z.subitems[s])==null?void 0:K.link)||"",description:I,icon:((W=(Q=o[e])==null?void 0:Q.subitems[s])==null?void 0:W.iconName)||"",fee:c};b=[...b,N]}const k={text:o[e].text||"",link:o[e].link||"",subitems:b};r=[...r,k]}return l.$$set=e=>{"logo"in e&&m(0,n=e.logo),"navData"in e&&m(4,t=e.navData),"footer"in e&&m(5,o=e.footer),"socialMedia"in e&&m(1,u=e.socialMedia)},[n,u,d,r,t,o]}class we extends Z{constructor(f){super(),ee(this,f,de,ue,te,{logo:0,navData:4,footer:5,socialMedia:1})}}export{we as default,ye as load};
