const t={btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]"),bodyRef:document.body};t.btnStart.addEventListener("click",(()=>{timerId=setInterval((()=>{t.bodyRef.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`,t.btnStart.hasAttribute("disabled")||t.btnStart.setAttribute("disabled","true")}),1e3)})),t.btnStop.addEventListener("click",(function(){clearInterval(timerId),t.btnStart.hasAttribute("disabled")&&t.btnStart.removeAttribute("disabled");console.log(`Interval with id ${timerId} has stopped!`)}));
//# sourceMappingURL=01-color-switcher.bbc7836d.js.map