const q=document.querySelector(".js_searchBtn"),p=document.querySelector(".js_searchInput"),s=document.querySelector(".js_resultsUl"),c=document.querySelector(".js_favoritesUl"),S=document.querySelector(".js_favoritesRemoveAll");let a=[],i=[];function L(){_(),h(i),$()}function l(t){return i.findIndex(e=>e.id===t)}function x(t){return l(t.id)!==-1}function F(t){i.push(t)}function u(t){const e=l(t);e!==-1&&i.splice(e,1)}function I(t){l(t.id)===-1?F(t):u(t.id)}function _(){const t=localStorage.getItem("favs");t!==null&&(i=JSON.parse(t))}function w(){if(i.length===0)localStorage.removeItem("favs");else{const t=JSON.stringify(i);localStorage.setItem("favs",t)}}function T(t){fetch(`//api.tvmaze.com/search/shows?q=${t}`).then(e=>e.json()).then(e=>{a=e.map(n=>({id:n.show.id,name:n.show.name,image:n.show.image?n.show.image.medium:"https://placehold.co/210x295/e0fbfc/5f9ea0/?text=TV"})),m(a)}).catch(e=>console.error(e))}function f(){w(),h(i),m(a)}function E(t,e){const n=document.createElement("li");return n.classList.add(`js_${e}Li`,`${e}__item`),e==="results"&&x(t)&&n.classList.add("results__item--favorite"),n.dataset.id=t.id,n}function b(t,e){const n=document.createElement("img");return n.classList.add(`${e}__img`),n.src=t.image,n.alt=`Portada de ${t.name}`,n}function C(t,e){const n=document.createElement("p");n.classList.add(`${e}__text`);const o=document.createTextNode(t.name);return n.appendChild(o),n}function Z(){const t=document.createElement("button");return t.classList.add("favorites__btn"),t.ariaLabel="Eliminar de favoritos",t.innerHTML=`
    <svg
      class="icon-heart"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor">
      <path
        d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>
    </svg>

    <svg
      class="icon-broken"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor">
      <path
        d="M481-83Q347-218 267.5-301t-121-138q-41.5-55-54-94T80-620q0-92 64-156t156-64q45 0 87 16.5t75 47.5l-62 216h120l-34 335 114-375H480l71-212q25-14 52.5-21t56.5-7q92 0 156 64t64 156q0 48-13 88t-55 95.5q-42 55.5-121 138T481-83Zm-71-186 21-211H294l75-263q-16-8-33.5-12.5T300-760q-58 0-99 41t-41 99q0 31 11.5 62t40 70.5q28.5 39.5 77 92T410-269Zm188-48q111-113 156.5-180T800-620q0-58-41-99t-99-41q-11 0-22 1.5t-22 5.5l-24 73h116L598-317Zm110-363ZM294-480Z"/>
    </svg> `,t}function v(t,e){const n=E(t,e),o=b(t,e),r=C(t,e);return n.append(o,r),n}function j(t){const e=v(t,"results");s.appendChild(e)}function m(t){s.innerHTML="",t.forEach(e=>{j(e)})}function k(t){const e=v(t,"favorites"),n=Z();e.appendChild(n),c.appendChild(e)}function h(t){c.innerHTML="",t.forEach(e=>{k(e)})}function A(t){t.preventDefault();const e=p.value.trim();T(e)}function d(t){const e=t.target.closest("li");if(!e)return;const n=parseInt(e.dataset.id);if(e.closest(".favorites")){if(!t.target.closest(".favorites__btn"))return;u(n)}else{const r=a.find(g=>g.id===n);I(r)}f()}function B(){i=[],f()}function $(){q.addEventListener("click",A),s.addEventListener("click",d),c.addEventListener("click",d),S.addEventListener("click",B)}L();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
