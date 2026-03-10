import { h as head } from "../../../chunks/index2.js";
import { h as hasFirebaseConfig } from "../../../chunks/client.js";
import "firebase/auth";
import "firebase/firestore";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("1lmfblq", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Mis posts · Pajas Sofisticadas</title>`);
      });
    });
    $$renderer2.push(`<main class="page svelte-1lmfblq"><header class="header svelte-1lmfblq"><h1>Mis posts</h1> <p>Posts no anonimos publicados con tu usuario.</p></header> `);
    if (!hasFirebaseConfig) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="warning svelte-1lmfblq">Completa \`.env\` con Firebase.</div>`);
    } else {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<div class="warning svelte-1lmfblq">Inicia sesion para ver tus posts. <a href="/login">Login</a></div>`);
    }
    $$renderer2.push(`<!--]--></main>`);
  });
}
export {
  _page as default
};
