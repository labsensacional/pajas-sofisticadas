import { h as head } from "../../../chunks/index2.js";
import { h as hasFirebaseConfig } from "../../../chunks/client.js";
import "firebase/auth";
import "firebase/firestore";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("1viukbl", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Mis listas · Pajas Sofisticadas</title>`);
      });
    });
    $$renderer2.push(`<main class="page svelte-1viukbl"><header class="header svelte-1viukbl"><h1>Mis listas</h1> <p>Tu archivo personal de guardados y practicas.</p></header> `);
    if (!hasFirebaseConfig) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="warning svelte-1viukbl">Completa \`.env\` con Firebase.</div>`);
    } else {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<div class="warning svelte-1viukbl">Inicia sesion para ver tus listas. <a href="/login">Login</a></div>`);
    }
    $$renderer2.push(`<!--]--></main>`);
  });
}
export {
  _page as default
};
