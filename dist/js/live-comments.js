$(document).ready(function(){let a=JSON.parse(localStorage.getItem("commentIds")||"[]"),r=(e,t)=>(e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e);const c=(e,t)=>e.classList.add(t),s=(e,t)=>e.classList.remove(t);$(".answer-wrap").each(function(){var e=this.getAttribute("data-id");a.includes(e)&&(c(this,"already-typed"),s(this.closest(".siblings-wrap"),"line-hider"))}),$(".answer-wrap:not(.typing, .just-typed, .already-typed)").one("inview",(e,t)=>{const i=e.target.closest(".siblings-wrap"),o=e.target;var e=o.getAttribute("data-id");t&&!a.includes(e)&&(a.push(e),localStorage.setItem("commentIds",JSON.stringify(a)),t=r(1200,4700),e=r(3600,9500),setTimeout(()=>{c(o,"typing"),s(i,"line-hider")},t),setTimeout(()=>{c(o,"just-typed"),s(o,"typing")},t+e))});let n=JSON.parse(localStorage.getItem("emojiCounters")||"[]");const i=(e,t)=>{e=e.querySelector(t).classList;e.contains("active")||e.add("active")},l=(document.querySelectorAll(".emoji-box.active").forEach(t=>{n.forEach(e=>{t.getAttribute("data-emoji-id")===e.id&&(t.querySelector(".emoji-box__like-count").innerHTML=e.count,e.count<5?i(t,".like-ico"):(i(t,".like-ico"),i(t,".heart-ico"),i(t,".wow-ico")))})}),(e,t,i,o)=>{{var a=e;const r=a.target.querySelector(t).classList;r.contains("active")?(r.remove("active"),setTimeout(()=>{r.add("active")},100)):r.add("active")}a=i,e.target.querySelector(".emoji-box__like-count").innerHTML=parseInt(a+1);t={id:o,count:i};n.some(function(e){return e.id===o})?n.forEach(function(e){e.id===o&&(e.count=i,localStorage.setItem("emojiCounters",JSON.stringify(n)))}):(n.push(t),localStorage.setItem("emojiCounters",JSON.stringify(n)))});let u=!0;$(".emoji-box.active").on("inview",(t,i)=>{const o=t.target.getAttribute("data-emoji-id");let a=parseInt(t.target.querySelector(".emoji-box__like-count").innerHTML);if(a=a||0,i&&u){i=r(550,2555);let e=r(1,3);setTimeout(()=>{switch(e){case 1:l(t,".like-ico",a,o);break;case 2:l(t,".heart-ico",a,o);break;case 3:l(t,".wow-ico",a,o)}u=!1,setTimeout(()=>{u=!0},1e4)},i)}})});