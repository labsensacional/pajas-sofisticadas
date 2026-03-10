import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.BUPpdigB.js",app:"_app/immutable/entry/app.AiJmjs-o.js",imports:["_app/immutable/entry/start.BUPpdigB.js","_app/immutable/chunks/CMeVVVx-.js","_app/immutable/chunks/AjJdyPus.js","_app/immutable/chunks/LM_D7UNa.js","_app/immutable/chunks/DNyW2xq_.js","_app/immutable/entry/app.AiJmjs-o.js","_app/immutable/chunks/AjJdyPus.js","_app/immutable/chunks/BqmKayai.js","_app/immutable/chunks/BOwcQb-m.js","_app/immutable/chunks/B5tnP13W.js","_app/immutable/chunks/DNyW2xq_.js","_app/immutable/chunks/C_lb7y4V.js","_app/immutable/chunks/BMLiWd2N.js","_app/immutable/chunks/LM_D7UNa.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js')),
			__memo(() => import('../server/nodes/4.js')),
			__memo(() => import('../server/nodes/5.js')),
			__memo(() => import('../server/nodes/6.js')),
			__memo(() => import('../server/nodes/7.js')),
			__memo(() => import('../server/nodes/8.js')),
			__memo(() => import('../server/nodes/9.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/archivo",
				pattern: /^\/archivo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/archivo/[id]",
				pattern: /^\/archivo\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/listas",
				pattern: /^\/listas\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/mis-posts",
				pattern: /^\/mis-posts\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/perfil",
				pattern: /^\/perfil\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/publicar",
				pattern: /^\/publicar\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})());
