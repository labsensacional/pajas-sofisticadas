import { h as head, b as ensure_array_like } from "../../../chunks/index2.js";
import { h as hasFirebaseConfig } from "../../../chunks/client.js";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let tagCounts;
    let posts = [];
    let search = "";
    tagCounts = posts.reduce(
      (acc, post) => {
        if (Array.isArray(post.tags)) {
          post.tags.forEach((tag) => {
            acc[tag] = (acc[tag] ?? 0) + 1;
          });
        }
        return acc;
      },
      {}
    );
    Object.keys(tagCounts).sort();
    posts.filter((post) => {
      const haystack = [
        post.title,
        post.summary,
        post.tried,
        post.results,
        post.state,
        post.context,
        Array.isArray(post.tags) ? post.tags.join(" ") : ""
      ].filter(Boolean).join(" ").toLowerCase();
      const matchesSearch = search.trim() ? haystack.includes(search.trim().toLowerCase()) : true;
      return matchesSearch;
    });
    head("1r1c1kv", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Archivo · Pajas Sofisticadas</title>`);
      });
    });
    $$renderer2.push(`<main class="page svelte-1r1c1kv"><header class="header svelte-1r1c1kv"><h1 class="svelte-1r1c1kv">Archivo</h1> <p class="svelte-1r1c1kv">Explora experiencias recientes.</p></header> `);
    if (!hasFirebaseConfig) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="warning svelte-1r1c1kv">Completa \`.env\` con Firebase.</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="skeletons svelte-1r1c1kv"><!--[-->`);
      const each_array = ensure_array_like(Array(3));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        each_array[$$index];
        $$renderer2.push(`<div class="skeleton-card svelte-1r1c1kv"><div class="skeleton-title svelte-1r1c1kv"></div> <div class="skeleton-thumb svelte-1r1c1kv"></div> <div class="skeleton-line svelte-1r1c1kv"></div> <div class="skeleton-line short svelte-1r1c1kv"></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></main>`);
  });
}
export {
  _page as default
};
