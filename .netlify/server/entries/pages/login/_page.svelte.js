import { h as head, e as escape_html, d as attr } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
import { h as hasFirebaseConfig } from "../../../chunks/client.js";
import "firebase/auth";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let email = "";
    let password = "";
    head("1x05zx6", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Login · Pajas Sofisticadas</title>`);
      });
    });
    $$renderer2.push(`<main class="page svelte-1x05zx6"><header class="header"><h1>${escape_html("Ingresar")}</h1> <p>Acceso al archivo.</p></header> `);
    if (!hasFirebaseConfig) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="warning svelte-1x05zx6"><p>Firebase no esta configurado. Completa las variables en \`.env\`.</p></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <form class="form svelte-1x05zx6"><label class="svelte-1x05zx6">Email <input type="email"${attr("value", email)} required="" class="svelte-1x05zx6"/></label> <label class="svelte-1x05zx6">Contrasena <input type="password"${attr("value", password)} required="" class="svelte-1x05zx6"/></label> <button type="submit"${attr("disabled", !hasFirebaseConfig, true)} class="svelte-1x05zx6">${escape_html("Ingresar")}</button> <button type="button" class="google svelte-1x05zx6"${attr("disabled", !hasFirebaseConfig, true)}>Entrar con Google</button> <div class="links svelte-1x05zx6"><button type="button" class="link svelte-1x05zx6">${escape_html("Crear cuenta")}</button> <button type="button" class="link svelte-1x05zx6"${attr("disabled", !email, true)}>Olvide mi contrasena</button></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></form></main>`);
  });
}
export {
  _page as default
};
