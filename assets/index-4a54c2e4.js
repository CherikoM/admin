import{d as T,a2 as d,r as c,c as $,a8 as H,o as A,e as S,K as m,A as j,w as s,h as I,s as u,g as t,F as Q,z as R,v as q,ak as X,i as b,m as J,aa as G,al as Y,a9 as Z,ab as K,_ as ee,L as N,f as te,am as ae,an as le,k as se,l as ne,n as oe,O as re,ao as ce,a7 as E,ap as ie,W as ue}from"./index-4c180a68.js";/* empty css                      */import{u as de}from"./el-popover-757eb6a2.js";import{u as M}from"./product-e9a75ffc.js";const _e={class:"list"},me=T({__name:"index",setup(z){const p=d("attrs",c([])),w=d("showAdd",c(!1)),i=d("form",$({})),e=d("getAttrs",()=>Promise.resolve()),f=d("editIndex",c(-1)),V=(n,o)=>{w.value=!0,console.log(n),n?(Object.assign(i,n,{attrValueList:[...n.attrValueList]}),f.value=o||-1):f.value=-1},l=async n=>{(await X(n)).code===200?(b.success("删除成功"),await e()):b.error("删除失败")};return(n,o)=>{const h=J,v=G,x=Y,B=Z,D=K,k=H("perm");return A(),S("div",_e,[m((A(),j(h,{icon:"Plus",disabled:u(p).length<=0,onClick:o[0]||(o[0]=_=>V())},{default:s(()=>[I(" 添加属性 ")]),_:1},8,["disabled"])),[[k,"btn.Attr.add"]]),t(D,{class:"table",data:u(p)},{default:s(()=>[t(v,{type:"index",label:"序号",align:"center",width:"60px"}),t(v,{prop:"attrName",label:"属性",width:"120px"}),t(v,{prop:"address",label:"属性值"},{default:s(({row:_})=>[(A(!0),S(Q,null,R(_.attrValueList,a=>(A(),j(x,{class:"tag",key:a.id},{default:s(()=>[I(q(a.valueName),1)]),_:2},1024))),128))]),_:1}),t(v,{label:"操作",align:"center",width:"120px"},{default:s(({row:_,$index:a})=>[m(t(h,{plain:"",size:"small",type:"warning",icon:"Edit",onClick:r=>V(_,a)},null,8,["onClick"]),[[k,"btn.Attr.update"]]),t(B,{title:`确定要删除${_.attrName}吗？`,width:"200px",onConfirm:r=>l(_.id)},{reference:s(()=>[m(t(h,{plain:"",size:"small",type:"danger",icon:"Delete"},null,512),[[k,"btn.Attr.remove"]])]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"])])}}});const pe=ee(me,[["__scopeId","data-v-2e780cd0"]]),fe={class:"add"},ve=["onClick"],ge=T({__name:"index",setup(z){const p=M(),w=d("attrs",c([])),i=d("showAdd",c(!1)),e=d("form",$({})),f=d("getAttrs",()=>{}),V=d("editIndex",c(-1)),l=c(-1),n=c(),o=async a=>{(l.value=-1)&&(n.value=void 0,l.value=a,await ae(),n.value.focus())},h=a=>{var C;const r=(C=e.attrValueList[a])==null?void 0:C.valueName;r?e.attrValueList.some((O,y)=>y!==a&&O.valueName==r)?(b.warning("请勿重复属性值"),n.value.focus()):l.value=-1:a===e.attrValueList.length-1?(e.attrValueList.splice(a),l.value=-1):(b.warning("请输入属性值"),n.value.focus())},v=async()=>{l.value===-1&&(e.id&&k(V.value)||!e.id?(e.categoryId=p.attr.select[2],(await le(e)).code===200?(i.value=!1,b.success(e.id?"修改成功":"添加成功"),await f()):b.error((e.id?"修改失败":"添加失败")+"，请重试"),_()):b.error("请修改内容"))},x=()=>{i.value=!1,_()},B=()=>{!e.attrValueList&&(e.attrValueList=[]),e.attrValueList.push({valueName:""}),o(e.attrValueList.length-1)},D=a=>{e.attrValueList.splice(a,1)},k=a=>{if(a<0||!e.id)return!0;{const r=w.value[a];return!(e.attrName===r.attrName&&e.categoryId===r.categoryId&&JSON.stringify(e.attrValueList)===JSON.stringify(r.attrValueList))}},_=()=>{Object.assign(e,{attrName:"",attrValueList:[],categoryId:0,categoryLevel:3,id:void 0})};return(a,r)=>{const C=se,U=ne,O=oe,y=J,F=G,W=K;return m((A(),S("div",fe,[t(O,null,{default:s(()=>[t(U,{label:"属性名"},{default:s(()=>[t(C,{placeholder:"请输入属性名",modelValue:u(e).attrName,"onUpdate:modelValue":r[0]||(r[0]=g=>u(e).attrName=g)},null,8,["modelValue"])]),_:1})]),_:1}),t(y,{icon:"Plus",onClick:B,disabled:!u(e).attrName},{default:s(()=>[I(" 添加属性值 ")]),_:1},8,["disabled"]),t(W,{style:{margin:"10px 0"},data:u(e).attrValueList},{default:s(()=>[t(F,{type:"index",label:"序号",align:"center",width:"60px"}),t(F,{label:"属性值"},{default:s(({row:g,$index:L})=>[m(t(C,{ref:l.value===L?"inputEl":"",placeholder:"请输入属性值",modelValue:g.valueName,"onUpdate:modelValue":P=>g.valueName=P,onBlur:P=>h(L)},null,8,["modelValue","onUpdate:modelValue","onBlur"]),[[N,l.value===L]]),m(te("div",{onClick:P=>o(L)},q(g.valueName),9,ve),[[N,l.value!==L]])]),_:1}),t(F,{label:"操作",align:"center",width:"80px"},{default:s(({$index:g})=>[m(t(y,{plain:"",size:"small",type:"danger",icon:"Delete",onClick:L=>D(g)},null,8,["onClick"]),[[N,g!==l.value]])]),_:1})]),_:1},8,["data"]),t(y,{disabled:l.value!==-1||!u(e).attrValueList||u(e).attrValueList.length<=0,onClick:v},{default:s(()=>[I(" 保存 ")]),_:1},8,["disabled"]),t(y,{onClick:x},{default:s(()=>[I("取消")]),_:1})],512)),[[N,u(i)]])}}}),Le=T({__name:"index",setup(z){const p=M(),w=de();re(async()=>{await l()});const i=c(!1),e=c(-1),f=c([]),V=$({attrName:"",attrValueList:[],categoryId:0,categoryLevel:3}),l=async()=>{f.value=[],p.attr.select[2]&&w.load(async()=>{const o=await ce(p.attr.select);o.code===200?f.value=o.data:b.error(o.message)})},n=async()=>{await l()};return E("attrs",f),E("showAdd",i),E("form",V),E("getAttrs",l),E("editIndex",e),(o,h)=>{const v=ie,x=ue;return A(),S("div",null,[t(v,{select:u(p).attr.select,disabled:i.value,onChange:n},null,8,["select","disabled"]),t(x,{class:"box-card"},{default:s(()=>[m(t(pe,null,null,512),[[N,!i.value]]),m(t(ge,null,null,512),[[N,i.value]])]),_:1})])}}});export{Le as default};
