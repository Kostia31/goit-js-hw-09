const t={start:document.querySelector("button[data-start]"),stop:document.querySelector("button[data-stop]"),body:document.body};class o{onChangeBodyColor(){this.idInterval=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`,t.start.disabled=!0}),1e3)}ofChangeBodycolor(){clearInterval(this.idInterval),t.start.disabled=!1}constructor(){this.idInterval="null"}}const e=new o;t.stop.addEventListener("click",e.ofChangeBodycolor.bind(o)),t.start.addEventListener("click",e.onChangeBodyColor.bind(o));
//# sourceMappingURL=01-color-switcher.20884050.js.map