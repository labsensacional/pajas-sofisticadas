import { h as head } from "../../../chunks/index2.js";
import { h as hasFirebaseConfig } from "../../../chunks/client.js";
import "firebase/auth";
import "firebase/firestore";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("x3vgov", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Perfil · Pajas Sofisticadas</title>`);
      });
    });
    $$renderer2.push(`<main class="page svelte-x3vgov"><header class="header svelte-x3vgov"><h1>Perfil</h1> <p>Edita tu nombre de usuario visible en posts no anonimos.</p></header> `);
    if (!hasFirebaseConfig) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="warning svelte-x3vgov">Completa \`.env\` con Firebase.</div>`);
    } else {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<div class="warning svelte-x3vgov">Inicia sesion para editar tu perfil. <a href="/login">Login</a></div>`);
    }
    $$renderer2.push(`<!--]--></main>`);
  });
}
export {
  _page as default
};
