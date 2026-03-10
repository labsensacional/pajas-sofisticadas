import { g as getContext, c as store_get, h as head, u as unsubscribe_stores, e as escape_html } from "../../../../chunks/index2.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/root.js";
import "../../../../chunks/state.svelte.js";
import { h as hasFirebaseConfig } from "../../../../chunks/client.js";
import "firebase/auth";
import "firebase/firestore";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    store_get($$store_subs ??= {}, "$page", page).params.id;
    head("9ra3kn", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html("Post")} · Pajas Sofisticadas</title>`);
      });
    });
    $$renderer2.push(`<main class="page svelte-9ra3kn"><a class="back svelte-9ra3kn" href="/archivo">← Volver</a> `);
    if (!hasFirebaseConfig) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="warning svelte-9ra3kn">Completa \`.env\` con Firebase.</div>`);
    } else {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<p>Cargando...</p>`);
    }
    $$renderer2.push(`<!--]--></main>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
