import{u as j,r as Q,a as X,b as Y}from"./product-e9a75ffc.js";import{d as q,a2 as p,r as s,c as S,a3 as Z,a8 as ee,o as b,A as V,w as l,K as C,h as P,g as a,s as o,i as k,m as L,aa as ae,ah as A,a9 as oe,ab as te,ac as le,W as re,_ as G,y as ne,e as K,f as se,ad as ie,k as ce,l as de,C as me,ai as pe,n as ue,a4 as _e,V as ge,O as fe,aj as ve,a7 as E}from"./index-4c180a68.js";/* empty css                      */import{u as be}from"./el-popover-757eb6a2.js";import{g as ke}from"./getIndex-0f002f63.js";/* empty css                   *//* empty css                   */import{b as xe,o as Ue}from"./imgUpload-bbe67234.js";const we=q({__name:"index",setup(B){const t=j(),c=p("trademarks",s([])),v=p("dialogVisible",s(!1)),x=p("currentTM",s(-1)),e=p("getTrademark",()=>{}),_=p("total",s(0)),U=p("form",S({})),w=(i,r)=>{v.value=!0,x.value=r||-1,i&&N(i)},g=async i=>{const r=await Q(i);r.code===200?(k.success("删除成功"),c.value.length<=1?t.trademark.pageNo--:await e()):k.error(r.data)},h=Z(()=>c.value.map(i=>i.logoUrl)),N=i=>{U.tmName=i.tmName,U.logoUrl=i.logoUrl,U.id=i.id};return(i,r)=>{const u=L,y=ae,z=A,I=oe,M=te,f=le,d=re,m=ee("perm");return b(),V(d,{class:"box-card"},{default:l(()=>[C((b(),V(u,{icon:"Plus",onClick:r[0]||(r[0]=()=>w())},{default:l(()=>[P(" 添加品牌 ")]),_:1})),[[m,"btn.Trademark.add"]]),a(M,{class:"table",data:o(c)},{default:l(()=>[a(y,{label:"序号",width:"60px",align:"center",type:"index",index:o(ke)(o(t).trademark.pageNo,o(t).trademark.pageSize)},null,8,["index"]),a(y,{label:"名称",prop:"tmName"}),a(y,{label:"logo",width:"130px",align:"center"},{default:l(({row:n,$index:T})=>[a(z,{src:n.logoUrl||"",width:"100px",height:"100px","preview-src-list":h.value,"initial-index":T,"hide-on-click-modal":!0,"preview-teleported":!0},null,8,["src","preview-src-list","initial-index"])]),_:1}),a(y,{label:"操作",width:"120px",align:"center"},{default:l(({row:n,$index:T})=>[C(a(u,{plain:"",size:"small",type:"warning",icon:"Edit",onClick:$=>w(n,T)},null,8,["onClick"]),[[m,"btn.Trademark.update"]]),a(I,{title:`确定要删除${n.tmName}吗？`,width:"200px",onConfirm:$=>g(n.id)},{reference:l(()=>[C(a(u,{plain:"",size:"small",type:"danger",icon:"Delete"},null,512),[[m,"btn.Trademark.remove"]])]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"]),a(f,{"current-page":o(t).trademark.pageNo,"onUpdate:currentPage":r[1]||(r[1]=n=>o(t).trademark.pageNo=n),"page-size":o(t).trademark.pageSize,"onUpdate:pageSize":r[2]||(r[2]=n=>o(t).trademark.pageSize=n),"page-sizes":[3,5,7,9],small:!0,layout:"total, sizes, ->, prev, pager, next, jumper",total:o(_)},null,8,["current-page","page-size","total"])]),_:1})}}});const ye=G(we,[["__scopeId","data-v-27a6ebb8"]]),Ee={class:"dialog-footer"},Ne=q({__name:"index",setup(B){const t=p("trademarks",s([])),c=p("dialogVisible",s(!1)),v=p("currentTM",s(-1)),x=p("getTrademark",()=>{}),e=p("form",S({})),_=s(),w=S({tmName:[{required:!0,message:"请输入品牌名",trigger:"blur"}],logoUrl:[{required:!0,validator:(f,d,m)=>{d?m():m(new Error("请上传品牌logo"))}}]}),g=()=>{c.value=!1,N()},h=async()=>{var f,d;if(((f=t.value[v.value])==null?void 0:f.tmName)===e.tmName&&((d=t.value[v.value])==null?void 0:d.logoUrl)===e.logoUrl){k.error("请修改后再作确认");return}try{await _.value.validate();const m=await X(e);if(m.code===200){const n=e.id?"修改":"添加";k.success(n+"成功"),c.value=!1,await x(),N()}else k.error(m.data)}catch{k.error("请检查输入")}},N=()=>{e.id=void 0,e.tmName="",e.logoUrl=""},i=()=>{e.id&&N(),_.value.clearValidate(),M()},r=s(),u=s(!1),y=()=>{u.value=!0},z=f=>{e.logoUrl=f.data,_.value.clearValidate("logoUrl"),u.value=!1},I=()=>{u.value=!1},M=()=>{r.value.abort(),u.value=!1};return(f,d)=>{const m=ce,n=de,T=A,$=ne("Plus"),O=me,R=pe,W=ue,F=L,H=_e,J=ge;return b(),K("div",null,[a(H,{modelValue:o(c),"onUpdate:modelValue":d[1]||(d[1]=D=>ie(c)?c.value=D:null),onClosed:i,title:`${o(e).id?"修改":"添加"}品牌`,width:"60%"},{footer:l(()=>[se("span",Ee,[a(F,{plain:"",onClick:g,type:"info"},{default:l(()=>[P("取消")]),_:1}),a(F,{plain:"",onClick:h,type:"primary",disabled:u.value},{default:l(()=>[P(" 确定 ")]),_:1},8,["disabled"])])]),default:l(()=>[a(W,{ref_key:"formEl",ref:_,model:o(e),rules:w,class:"form","label-width":"100px"},{default:l(()=>[a(n,{label:"品牌名",prop:"tmName"},{default:l(()=>[a(m,{modelValue:o(e).tmName,"onUpdate:modelValue":d[0]||(d[0]=D=>o(e).tmName=D),modelModifiers:{trim:!0},placeholder:"请输入品牌名"},null,8,["modelValue"])]),_:1}),a(n,{label:"品牌logo",prop:"logoUrl"},{default:l(()=>[C((b(),V(R,{ref_key:"uploadEl",ref:r,class:"avatar-uploader",action:"/api/admin/product/fileUpload","show-file-list":!1,"before-upload":o(xe)(y),"on-success":z,"on-error":o(Ue)(I)},{default:l(()=>[o(e).logoUrl?(b(),V(T,{key:0,src:o(e).logoUrl,width:"150px",height:"150px"},null,8,["src"])):(b(),V(O,{key:1,class:"avatar-uploader-icon"},{default:l(()=>[a($)]),_:1}))]),_:1},8,["before-upload","on-error"])),[[J,u.value]])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue","title"])])}}});const Te=G(Ne,[["__scopeId","data-v-08cc1f70"]]),De=q({__name:"index",setup(B){const t=j(),c=be(),v=s([]),x=s(0),e=async()=>{c.load(async()=>{const g=await Y(t.trademark.pageNo,t.trademark.pageSize);g.code===200?(v.value=g.data.records,x.value=g.data.total):k.error("获取品牌失败，请稍后重试")})},_=s(!1),U=s(-1),w=S({tmName:"",logoUrl:""});return fe(async()=>{await e()}),ve(()=>[t.trademark.pageNo,t.trademark.pageSize],e),E("trademarks",v),E("dialogVisible",_),E("currentTM",U),E("getTrademark",e),E("total",x),E("form",w),(g,h)=>(b(),K("div",null,[a(ye),a(Te)]))}});export{De as default};
