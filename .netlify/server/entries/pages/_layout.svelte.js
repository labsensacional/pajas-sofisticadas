import { s as slot } from "../../chunks/index2.js";
import "firebase/auth";
import "../../chunks/client.js";
import "firebase/firestore";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="gate svelte-12qhfyh"><div class="card svelte-12qhfyh"><p class="eyebrow svelte-12qhfyh">Acceso +18</p> <h2>Este archivo contiene contenido adulto.</h2> <p>Confirma que tienes 18+ para continuar.</p> <div class="actions svelte-12qhfyh"><button class="primary svelte-12qhfyh">Soy mayor de 18</button> <a class="exit svelte-12qhfyh" href="https://www.google.com" rel="noreferrer">Salir</a></div></div></div>`);
    }
    $$renderer2.push(`<!--]--> <header class="topbar svelte-12qhfyh"><a class="brand svelte-12qhfyh" href="/">Pajas Sofisticadas</a> <nav class="svelte-12qhfyh"><a href="/archivo" class="svelte-12qhfyh">Archivo</a> `);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<a href="/login" class="svelte-12qhfyh">Login</a>`);
    }
    $$renderer2.push(`<!--]--></nav></header> <!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _layout as default
};
