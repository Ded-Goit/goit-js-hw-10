import"./assets/styles-CdahwYSH.js";import{i as r}from"./assets/vendor-BbbuE1sJ.js";const s=document.querySelector(".form");s.addEventListener("submit",i=>{i.preventDefault();const t=parseInt(s.elements.delay.value),o=s.elements.state.value;new Promise((e,m)=>{setTimeout(()=>{o==="fulfilled"?e(t):m(t)},t)}).then(e=>{r.success({title:"Succes",message:`✅ Fulfilled promise in ${e}ms`})}).catch(e=>{r.error({title:"Error",message:`❌ Rejected promise in ${e}ms`})}),s.reset()});
//# sourceMappingURL=2-snackbar.js.map
