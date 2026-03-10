import { h as head, d as attr, e as escape_html, b as ensure_array_like } from "../../../chunks/index2.js";
import { h as hasFirebaseConfig } from "../../../chunks/client.js";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let title = "";
    let summary = "";
    let tried = "";
    let results = "";
    let state = "";
    let context = "";
    let isAnonymous = false;
    let tagsInput = "";
    let images = [];
    head("120u653", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Publicar · Pajas Sofisticadas</title>`);
      });
    });
    $$renderer2.push(`<main class="page svelte-120u653"><header class="header svelte-120u653"><h1>Publicar una experiencia</h1> <p>Formulario MVP (Firestore).</p></header> `);
    if (!hasFirebaseConfig) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="warning svelte-120u653">Completa \`.env\` con las variables de Firebase.</div>`);
    } else {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<div class="warning svelte-120u653">Inicia sesion para publicar. <a href="/login">Ir a login</a></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<form class="form svelte-120u653"><p class="hint svelte-120u653">Campos opcionales salvo titulo y resumen.</p> <label class="svelte-120u653">Titulo <input type="text" placeholder="Titulo libre"${attr("value", title)} class="svelte-120u653"/></label> <label class="svelte-120u653">Resumen <textarea rows="4" placeholder="Resumen corto" class="svelte-120u653">`);
      const $$body = escape_html(summary);
      if ($$body) {
        $$renderer2.push(`${$$body}`);
      }
      $$renderer2.push(`</textarea></label> <label class="svelte-120u653">Que probaste (opcional) <textarea rows="3" placeholder="Tecnica, practica, etc." class="svelte-120u653">`);
      const $$body_1 = escape_html(tried);
      if ($$body_1) {
        $$renderer2.push(`${$$body_1}`);
      }
      $$renderer2.push(`</textarea></label> <label class="svelte-120u653">Resultados (opcional) <textarea rows="3" placeholder="Que paso" class="svelte-120u653">`);
      const $$body_2 = escape_html(results);
      if ($$body_2) {
        $$renderer2.push(`${$$body_2}`);
      }
      $$renderer2.push(`</textarea></label> <label class="svelte-120u653">Estado mental/emocional (opcional) <textarea rows="3" placeholder="Antes/durante/despues" class="svelte-120u653">`);
      const $$body_3 = escape_html(state);
      if ($$body_3) {
        $$renderer2.push(`${$$body_3}`);
      }
      $$renderer2.push(`</textarea></label> <label class="svelte-120u653">Contexto / setup (opcional) <textarea rows="3" placeholder="Lugar, tiempo, materiales" class="svelte-120u653">`);
      const $$body_4 = escape_html(context);
      if ($$body_4) {
        $$renderer2.push(`${$$body_4}`);
      }
      $$renderer2.push(`</textarea></label> <label class="svelte-120u653">Tags (opcional) <input type="text" placeholder="ej: tantra, respiracion, hipnosis"${attr("value", tagsInput)} class="svelte-120u653"/></label> <label class="svelte-120u653">Fotos (opcional) <input type="file" multiple="" accept="image/*" class="svelte-120u653"/></label> `);
      if (images.length) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="images svelte-120u653"><!--[-->`);
        const each_array = ensure_array_like(images);
        for (let index = 0, $$length = each_array.length; index < $$length; index++) {
          let image = each_array[index];
          $$renderer2.push(`<div class="image-card svelte-120u653"><img${attr("src", URL.createObjectURL(image.file))}${attr("alt", image.file.name)} class="svelte-120u653"/> <label class="checkbox svelte-120u653"><input type="checkbox"${attr("checked", image.nsfw, true)} class="svelte-120u653"/> Marcar NSFW</label></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <label class="checkbox svelte-120u653"><input type="checkbox"${attr("checked", isAnonymous, true)} class="svelte-120u653"/> Publicar de forma anonima</label> <button type="submit"${attr("disabled", true, true)} class="svelte-120u653">${escape_html("Guardar post")}</button> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></form>`);
    }
    $$renderer2.push(`<!--]--></main>`);
  });
}
export {
  _page as default
};
