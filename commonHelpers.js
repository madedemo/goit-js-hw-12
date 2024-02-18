import{a as y,i as p,S as f}from"./assets/vendor-5401a4b0.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const h=document.querySelector(".form"),m=document.querySelector(".gallery"),a=document.querySelector(".loader"),l=document.querySelector(".load-more-btn");let i=1,d="";a.style.display="none";l.style.display="none";h.addEventListener("submit",async r=>{r.preventDefault(),a.style.display="block",d=r.target.elements.input.value,i=1,await u(d,i),r.target.reset()});l.addEventListener("click",async()=>{a.style.display="block",i++,await u(d,i)});async function u(r,s){try{const t=await y.get("https://pixabay.com/api/",{params:{key:"42200022-9c7e7676f0f903944c054771a",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:s}}),{data:n}=t;g(n.hits),n.totalHits<=s*15?(l.style.display="none",p.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})):l.style.display="block",v()}catch(t){console.error("Error fetching photos:",t)}finally{a.style.display="none"}}function g(r){const s=r.map(t=>`
      <a class="gallery-link" href="${t.largeImageURL}">
  <img class="gallery-image" src="${t.webformatURL}" alt="${t.tags}" />
  <div class="img-content">
    <div>
      <h3>Likes</h3>
      <p>${t.likes}</p>
    </div>
    <div>
      <h3>Views</h3>
      <p>${t.views}</p>
    </div>
    <div>
      <h3>Comments</h3>
      <p>${t.comments}</p>
    </div>
    <div>
      <h3>Downloads</h3>
      <p>${t.downloads}</p>
    </div>
  </div>
</a>
    `).join("");m.insertAdjacentHTML("beforeend",s),new f(".gallery-link")}function v(){const r=document.querySelector(".gallery-link").getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
