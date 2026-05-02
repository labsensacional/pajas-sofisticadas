import { redirect } from '@sveltejs/kit';

export function load({ params, url }) {
  const suffix = params.path ? `/${params.path}` : '';
  throw redirect(307, `/practicas${suffix}${url.search}`);
}
