import{a1 as t,ag as s}from"./index-4c180a68.js";const l=(e,a)=>t.get(`/admin/product/baseTrademark/${e}/${a}`),d=()=>t.get("/admin/product/baseTrademark/getTrademarkList"),n=e=>e.id?t.put("/admin/product/baseTrademark/update",e):t.post("/admin/product/baseTrademark/save/",e),m=e=>t.delete(`/admin/product/baseTrademark/remove/${e}`),c=(e,a,r)=>t.get(`/admin/product/${e}/${a}?category3Id=${r}`),i=e=>t.get("/admin/product/spuImageList/"+e),S=e=>t.get("/admin/product/spuSaleAttrList/"+e),o=()=>t.get("/admin/product/baseSaleAttrList"),g=e=>t.get("/admin/product/getSpuInfo/"+e),k=e=>t.post(e.id?"/admin/product/updateSpuInfo":"/admin/product/saveSpuInfo",e),T=e=>t.delete("/admin/product/deleteSpu/"+e),u=s("Product",{state:()=>({trademark:{pageNo:1,pageSize:3,allTrademark:[]},attr:{select:[]},spu:{select:[],pageNo:1,pageSize:3,allSPUAttr:[]},sku:{pageNo:1,pageSize:10}}),actions:{async getAllTrademark(){if(!this.trademark.allTrademark||this.trademark.allTrademark.length<=0){const e=await d();if(e.code===200)this.trademark.allTrademark=e.data;else throw e.message}return this.trademark.allTrademark},async getSpuAllAttrs(){if(!this.spu.allSPUAttr||this.spu.allSPUAttr.length<=0){const e=await o();if(e.code===200)this.spu.allSPUAttr=e.data;else throw e.message}return this.spu.allSPUAttr}}}),A=u;export{n as a,l as b,T as c,g as d,k as e,i as f,S as g,c as h,m as r,A as u};
