const e=document.getElementById("input-email"),t=document.getElementById("input-password"),o=document.getElementById("btn-login"),n=document.getElementById("alert");document.getElementById("btn-adm");const a=document.getElementById("input-token-vip"),s={"X-Parse-Application-Id":"EtXU3jV6pXkDHC5aRDi2ewMJbq3giWgbfBSeIlNq","X-Parse-REST-API-Key":"4P3E1V7SmTX23TsXSEHyo8N7Q8aVgK9H47uGTWYr","X-Parse-Revocable-Session":"1","Content-Type":"application/json"};document.addEventListener("DOMContentLoaded",()=>{localStorage.clear(),history.pushState(null,null,location.href)});const l=async(e,t,o,l,r)=>{let i=await fetch(`https://parseapi.back4app.com//classes/UserVip/${e}`,{method:"GET",headers:{...s}});if(i.ok){let e=await i.json();e.tokenVip===a.value?(localStorage.setItem("usernameOne",t),localStorage.setItem("usernameTwo",e.usernameTwo),localStorage.setItem("usernameThree",e.usernameThree),localStorage.setItem("iconUserOne",o),localStorage.setItem("iconUserTwo",e.iconUserTwo.url),localStorage.setItem("iconUserThree",e.iconUserThree.url),localStorage.setItem("userVipId",e.objectId),localStorage.setItem("userId",r),localStorage.setItem("sessionToken",l),window.location.href="iconVips.html"):n.textContent="TOKEN INVÁLIDO"}else n.textContent="falha no login do usuarioVIP: "+await i.text()};o.addEventListener("click",async()=>{let o={username:e.value,password:t.value};try{let e=await fetch("https://parseapi.back4app.com/Login",{method:"POST",headers:s,body:JSON.stringify(o)});if(e.ok){let t=await e.json();if(t.UserVip){if(t.UserVip){let e=t.UserVip.objectId;l(e,t.username,t.icon.url,t.sessionToken,t.objectId)}}else localStorage.setItem("username",t.username),localStorage.setItem("userId",t.objectId),localStorage.setItem("sessionToken",t.sessionToken),localStorage.setItem("iconUser",t.icon.url),n.textContent="",window.location.href="icon.html"}else n.textContent="falha no login: Essa conta não existe."}catch(e){n.textContent=e}});
//# sourceMappingURL=index.680e5a5d.js.map
