var Tc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dh=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let i=r.charCodeAt(n);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(i=65536+((i&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},om=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const i=r[t++];if(i<128)e[n++]=String.fromCharCode(i);else if(i>191&&i<224){const s=r[t++];e[n++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=r[t++],o=r[t++],u=r[t++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|u&63)-65536;e[n++]=String.fromCharCode(55296+(c>>10)),e[n++]=String.fromCharCode(56320+(c&1023))}else{const s=r[t++],o=r[t++];e[n++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},fh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let i=0;i<r.length;i+=3){const s=r[i],o=i+1<r.length,u=o?r[i+1]:0,c=i+2<r.length,h=c?r[i+2]:0,f=s>>2,m=(s&3)<<4|u>>4;let _=(u&15)<<2|h>>6,b=h&63;c||(b=64,o||(_=64)),n.push(t[f],t[m],t[_],t[b])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(dh(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):om(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let i=0;i<r.length;){const s=t[r.charAt(i++)],u=i<r.length?t[r.charAt(i)]:0;++i;const h=i<r.length?t[r.charAt(i)]:64;++i;const m=i<r.length?t[r.charAt(i)]:64;if(++i,s==null||u==null||h==null||m==null)throw new am;const _=s<<2|u>>4;if(n.push(_),h!==64){const b=u<<4&240|h>>2;if(n.push(b),m!==64){const C=h<<6&192|m;n.push(C)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class am extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const um=function(r){const e=dh(r);return fh.encodeByteArray(e,!0)},ss=function(r){return um(r).replace(/\./g,"")},ph=function(r){try{return fh.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lm=()=>cm().__FIREBASE_DEFAULTS__,hm=()=>{if(typeof process>"u"||typeof Tc>"u")return;const r=Tc.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},dm=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&ph(r[1]);return e&&JSON.parse(e)},ws=()=>{try{return lm()||hm()||dm()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},mh=r=>{var e,t;return(t=(e=ws())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[r]},gh=r=>{const e=mh(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},_h=()=>{var r;return(r=ws())===null||r===void 0?void 0:r.config},yh=r=>{var e;return(e=ws())===null||e===void 0?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fm{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ih(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",i=r.iat||0,s=r.sub||r.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},r);return[ss(JSON.stringify(t)),ss(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ge(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function pm(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ge())}function mm(){var r;const e=(r=ws())===null||r===void 0?void 0:r.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function gm(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function _m(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function ym(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Im(){const r=ge();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function Th(){return!mm()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Eh(){try{return typeof indexedDB=="object"}catch{return!1}}function Tm(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Em="FirebaseError";class tt extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=Em,Object.setPrototypeOf(this,tt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ni.prototype.create)}}class ni{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?vm(s,n):"Error",u=`${this.serviceName}: ${o} (${i}).`;return new tt(i,u,n)}}function vm(r,e){return r.replace(wm,(t,n)=>{const i=e[n];return i!=null?String(i):`<${n}?>`})}const wm=/\{\$([^}]+)}/g;function Am(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function os(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const i of t){if(!n.includes(i))return!1;const s=r[i],o=e[i];if(Ec(s)&&Ec(o)){if(!os(s,o))return!1}else if(s!==o)return!1}for(const i of n)if(!t.includes(i))return!1;return!0}function Ec(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ri(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function Sr(r){const e={};return r.replace(/^\?/,"").split("&").forEach(n=>{if(n){const[i,s]=n.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Cr(r){const e=r.indexOf("?");if(!e)return"";const t=r.indexOf("#",e);return r.substring(e,t>0?t:void 0)}function Rm(r,e){const t=new bm(r,e);return t.subscribe.bind(t)}class bm{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let i;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");Pm(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:n},i.next===void 0&&(i.next=vo),i.error===void 0&&(i.error=vo),i.complete===void 0&&(i.complete=vo);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Pm(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function vo(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function re(r){return r&&r._delegate?r._delegate:r}class Ft{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sm{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new fm;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&n.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Dm(e))try{this.getOrInitializeService({instanceIdentifier:Jt})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});n.resolve(s)}catch{}}}}clearInstance(e=Jt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Jt){return this.instances.has(e)}getOptions(e=Jt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[s,o]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(s);n===u&&o.resolve(i)}return i}onInit(e,t){var n;const i=this.normalizeInstanceIdentifier(t),s=(n=this.onInitCallbacks.get(i))!==null&&n!==void 0?n:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const i of n)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Cm(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Jt){return this.component?this.component.multipleInstances?e:Jt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Cm(r){return r===Jt?void 0:r}function Dm(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vm{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Sm(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var H;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(H||(H={}));const km={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},Nm=H.INFO,xm={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},Om=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),i=xm[e];if(i)console[i](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class la{constructor(e){this.name=e,this._logLevel=Nm,this._logHandler=Om,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in H))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?km[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...e),this._logHandler(this,H.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...e),this._logHandler(this,H.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,H.INFO,...e),this._logHandler(this,H.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,H.WARN,...e),this._logHandler(this,H.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...e),this._logHandler(this,H.ERROR,...e)}}const Mm=(r,e)=>e.some(t=>r instanceof t);let vc,wc;function Lm(){return vc||(vc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Fm(){return wc||(wc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const vh=new WeakMap,Oo=new WeakMap,wh=new WeakMap,wo=new WeakMap,ha=new WeakMap;function Um(r){const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("success",s),r.removeEventListener("error",o)},s=()=>{t(xt(r.result)),i()},o=()=>{n(r.error),i()};r.addEventListener("success",s),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&vh.set(t,r)}).catch(()=>{}),ha.set(e,r),e}function Bm(r){if(Oo.has(r))return;const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("complete",s),r.removeEventListener("error",o),r.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),i()};r.addEventListener("complete",s),r.addEventListener("error",o),r.addEventListener("abort",o)});Oo.set(r,e)}let Mo={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return Oo.get(r);if(e==="objectStoreNames")return r.objectStoreNames||wh.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return xt(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function qm(r){Mo=r(Mo)}function jm(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(Ao(this),e,...t);return wh.set(n,e.sort?e.sort():[e]),xt(n)}:Fm().includes(r)?function(...e){return r.apply(Ao(this),e),xt(vh.get(this))}:function(...e){return xt(r.apply(Ao(this),e))}}function $m(r){return typeof r=="function"?jm(r):(r instanceof IDBTransaction&&Bm(r),Mm(r,Lm())?new Proxy(r,Mo):r)}function xt(r){if(r instanceof IDBRequest)return Um(r);if(wo.has(r))return wo.get(r);const e=$m(r);return e!==r&&(wo.set(r,e),ha.set(e,r)),e}const Ao=r=>ha.get(r);function zm(r,e,{blocked:t,upgrade:n,blocking:i,terminated:s}={}){const o=indexedDB.open(r,e),u=xt(o);return n&&o.addEventListener("upgradeneeded",c=>{n(xt(o.result),c.oldVersion,c.newVersion,xt(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),u.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),u}const Gm=["get","getKey","getAll","getAllKeys","count"],Km=["put","add","delete","clear"],Ro=new Map;function Ac(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(Ro.get(e))return Ro.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,i=Km.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(i||Gm.includes(t)))return;const s=async function(o,...u){const c=this.transaction(o,i?"readwrite":"readonly");let h=c.store;return n&&(h=h.index(u.shift())),(await Promise.all([h[t](...u),i&&c.done]))[0]};return Ro.set(e,s),s}qm(r=>({...r,get:(e,t,n)=>Ac(e,t)||r.get(e,t,n),has:(e,t)=>!!Ac(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wm{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Hm(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function Hm(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Lo="@firebase/app",Rc="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht=new la("@firebase/app"),Qm="@firebase/app-compat",Jm="@firebase/analytics-compat",Ym="@firebase/analytics",Xm="@firebase/app-check-compat",Zm="@firebase/app-check",eg="@firebase/auth",tg="@firebase/auth-compat",ng="@firebase/database",rg="@firebase/data-connect",ig="@firebase/database-compat",sg="@firebase/functions",og="@firebase/functions-compat",ag="@firebase/installations",ug="@firebase/installations-compat",cg="@firebase/messaging",lg="@firebase/messaging-compat",hg="@firebase/performance",dg="@firebase/performance-compat",fg="@firebase/remote-config",pg="@firebase/remote-config-compat",mg="@firebase/storage",gg="@firebase/storage-compat",_g="@firebase/firestore",yg="@firebase/vertexai-preview",Ig="@firebase/firestore-compat",Tg="firebase",Eg="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fo="[DEFAULT]",vg={[Lo]:"fire-core",[Qm]:"fire-core-compat",[Ym]:"fire-analytics",[Jm]:"fire-analytics-compat",[Zm]:"fire-app-check",[Xm]:"fire-app-check-compat",[eg]:"fire-auth",[tg]:"fire-auth-compat",[ng]:"fire-rtdb",[rg]:"fire-data-connect",[ig]:"fire-rtdb-compat",[sg]:"fire-fn",[og]:"fire-fn-compat",[ag]:"fire-iid",[ug]:"fire-iid-compat",[cg]:"fire-fcm",[lg]:"fire-fcm-compat",[hg]:"fire-perf",[dg]:"fire-perf-compat",[fg]:"fire-rc",[pg]:"fire-rc-compat",[mg]:"fire-gcs",[gg]:"fire-gcs-compat",[_g]:"fire-fst",[Ig]:"fire-fst-compat",[yg]:"fire-vertex","fire-js":"fire-js",[Tg]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Br=new Map,wg=new Map,Uo=new Map;function bc(r,e){try{r.container.addComponent(e)}catch(t){ht.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function on(r){const e=r.name;if(Uo.has(e))return ht.debug(`There were multiple attempts to register component ${e}.`),!1;Uo.set(e,r);for(const t of Br.values())bc(t,r);for(const t of wg.values())bc(t,r);return!0}function As(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function Ke(r){return r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ag={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ot=new ni("app","Firebase",Ag);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rg{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Ft("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ot.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tn=Eg;function Ah(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n=Object.assign({name:Fo,automaticDataCollectionEnabled:!1},e),i=n.name;if(typeof i!="string"||!i)throw Ot.create("bad-app-name",{appName:String(i)});if(t||(t=_h()),!t)throw Ot.create("no-options");const s=Br.get(i);if(s){if(os(t,s.options)&&os(n,s.config))return s;throw Ot.create("duplicate-app",{appName:i})}const o=new Vm(i);for(const c of Uo.values())o.addComponent(c);const u=new Rg(t,n,o);return Br.set(i,u),u}function da(r=Fo){const e=Br.get(r);if(!e&&r===Fo&&_h())return Ah();if(!e)throw Ot.create("no-app",{appName:r});return e}function Pc(){return Array.from(Br.values())}function Xe(r,e,t){var n;let i=(n=vg[r])!==null&&n!==void 0?n:r;t&&(i+=`-${t}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const u=[`Unable to register library "${i}" with version "${e}":`];s&&u.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&u.push("and"),o&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ht.warn(u.join(" "));return}on(new Ft(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bg="firebase-heartbeat-database",Pg=1,qr="firebase-heartbeat-store";let bo=null;function Rh(){return bo||(bo=zm(bg,Pg,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(qr)}catch(t){console.warn(t)}}}}).catch(r=>{throw Ot.create("idb-open",{originalErrorMessage:r.message})})),bo}async function Sg(r){try{const t=(await Rh()).transaction(qr),n=await t.objectStore(qr).get(bh(r));return await t.done,n}catch(e){if(e instanceof tt)ht.warn(e.message);else{const t=Ot.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ht.warn(t.message)}}}async function Sc(r,e){try{const n=(await Rh()).transaction(qr,"readwrite");await n.objectStore(qr).put(e,bh(r)),await n.done}catch(t){if(t instanceof tt)ht.warn(t.message);else{const n=Ot.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});ht.warn(n.message)}}}function bh(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cg=1024,Dg=720*60*60*1e3;class Vg{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Ng(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Cc();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const u=new Date(o.date).valueOf();return Date.now()-u<=Dg}),this._storage.overwrite(this._heartbeatsCache))}catch(n){ht.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Cc(),{heartbeatsToSend:n,unsentEntries:i}=kg(this._heartbeatsCache.heartbeats),s=ss(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return ht.warn(t),""}}}function Cc(){return new Date().toISOString().substring(0,10)}function kg(r,e=Cg){const t=[];let n=r.slice();for(const i of r){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Dc(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Dc(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class Ng{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Eh()?Tm().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Sg(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Sc(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Sc(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Dc(r){return ss(JSON.stringify({version:2,heartbeats:r})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xg(r){on(new Ft("platform-logger",e=>new Wm(e),"PRIVATE")),on(new Ft("heartbeat",e=>new Vg(e),"PRIVATE")),Xe(Lo,Rc,r),Xe(Lo,Rc,"esm2017"),Xe("fire-js","")}xg("");function fa(r,e){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(r);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(r,n[i])&&(t[n[i]]=r[n[i]]);return t}function Ph(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Og=Ph,Sh=new ni("auth","Firebase",Ph());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const as=new la("@firebase/auth");function Mg(r,...e){as.logLevel<=H.WARN&&as.warn(`Auth (${Tn}): ${r}`,...e)}function Ki(r,...e){as.logLevel<=H.ERROR&&as.error(`Auth (${Tn}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ze(r,...e){throw ma(r,...e)}function We(r,...e){return ma(r,...e)}function pa(r,e,t){const n=Object.assign(Object.assign({},Og()),{[e]:t});return new ni("auth","Firebase",n).create(e,{appName:r.name})}function ct(r){return pa(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Lg(r,e,t){const n=t;if(!(e instanceof n))throw n.name!==e.constructor.name&&ze(r,"argument-error"),pa(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ma(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return Sh.create(r,...e)}function $(r,e,...t){if(!r)throw ma(e,...t)}function st(r){const e="INTERNAL ASSERTION FAILED: "+r;throw Ki(e),new Error(e)}function dt(r,e){r||st(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bo(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.href)||""}function Fg(){return Vc()==="http:"||Vc()==="https:"}function Vc(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ug(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Fg()||_m()||"connection"in navigator)?navigator.onLine:!0}function Bg(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(e,t){this.shortDelay=e,this.longDelay=t,dt(t>e,"Short delay should be less than long delay!"),this.isMobile=pm()||ym()}get(){return Ug()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ga(r,e){dt(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ch{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;st("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;st("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;st("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qg={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jg=new ii(3e4,6e4);function pt(r,e){return r.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:r.tenantId}):e}async function mt(r,e,t,n,i={}){return Dh(r,i,async()=>{let s={},o={};n&&(e==="GET"?o=n:s={body:JSON.stringify(n)});const u=ri(Object.assign({key:r.config.apiKey},o)).slice(1),c=await r._getAdditionalHeaders();c["Content-Type"]="application/json",r.languageCode&&(c["X-Firebase-Locale"]=r.languageCode);const h=Object.assign({method:e,headers:c},s);return gm()||(h.referrerPolicy="no-referrer"),Ch.fetch()(Vh(r,r.config.apiHost,t,u),h)})}async function Dh(r,e,t){r._canInitEmulator=!1;const n=Object.assign(Object.assign({},qg),e);try{const i=new zg(r),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Mi(r,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const u=s.ok?o.errorMessage:o.error.message,[c,h]=u.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Mi(r,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Mi(r,"email-already-in-use",o);if(c==="USER_DISABLED")throw Mi(r,"user-disabled",o);const f=n[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw pa(r,f,h);ze(r,f)}}catch(i){if(i instanceof tt)throw i;ze(r,"network-request-failed",{message:String(i)})}}async function si(r,e,t,n,i={}){const s=await mt(r,e,t,n,i);return"mfaPendingCredential"in s&&ze(r,"multi-factor-auth-required",{_serverResponse:s}),s}function Vh(r,e,t,n){const i=`${e}${t}?${n}`;return r.config.emulator?ga(r.config,i):`${r.config.apiScheme}://${i}`}function $g(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class zg{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(We(this.auth,"network-request-failed")),jg.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Mi(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const i=We(r,e,n);return i.customData._tokenResponse=t,i}function kc(r){return r!==void 0&&r.enterprise!==void 0}class Gg{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return $g(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function Kg(r,e){return mt(r,"GET","/v2/recaptchaConfig",pt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wg(r,e){return mt(r,"POST","/v1/accounts:delete",e)}async function kh(r,e){return mt(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xr(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Hg(r,e=!1){const t=re(r),n=await t.getIdToken(e),i=_a(n);$(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:n,authTime:xr(Po(i.auth_time)),issuedAtTime:xr(Po(i.iat)),expirationTime:xr(Po(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Po(r){return Number(r)*1e3}function _a(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return Ki("JWT malformed, contained fewer than 3 sections"),null;try{const i=ph(t);return i?JSON.parse(i):(Ki("Failed to decode base64 JWT payload"),null)}catch(i){return Ki("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Nc(r){const e=_a(r);return $(e,"internal-error"),$(typeof e.exp<"u","internal-error"),$(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jr(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof tt&&Qg(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function Qg({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jg{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=xr(this.lastLoginAt),this.creationTime=xr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function us(r){var e;const t=r.auth,n=await r.getIdToken(),i=await jr(r,kh(t,{idToken:n}));$(i==null?void 0:i.users.length,t,"internal-error");const s=i.users[0];r._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Nh(s.providerUserInfo):[],u=Xg(r.providerData,o),c=r.isAnonymous,h=!(r.email&&s.passwordHash)&&!(u!=null&&u.length),f=c?h:!1,m={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:u,metadata:new qo(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(r,m)}async function Yg(r){const e=re(r);await us(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Xg(r,e){return[...r.filter(n=>!e.some(i=>i.providerId===n.providerId)),...e]}function Nh(r){return r.map(e=>{var{providerId:t}=e,n=fa(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zg(r,e){const t=await Dh(r,{},async()=>{const n=ri({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=r.config,o=Vh(r,i,"/v1/token",`key=${s}`),u=await r._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",Ch.fetch()(o,{method:"POST",headers:u,body:n})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function e_(r,e){return mt(r,"POST","/v2/accounts:revokeToken",pt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){$(e.idToken,"internal-error"),$(typeof e.idToken<"u","internal-error"),$(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Nc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){$(e.length!==0,"internal-error");const t=Nc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:($(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:i,expiresIn:s}=await Zg(e,t);this.updateTokensAndExpiration(n,i,Number(s))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:i,expirationTime:s}=t,o=new Un;return n&&($(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),i&&($(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&($(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Un,this.toJSON())}_performRefresh(){return st("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function At(r,e){$(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class ot{constructor(e){var{uid:t,auth:n,stsTokenManager:i}=e,s=fa(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Jg(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new qo(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await jr(this,this.stsTokenManager.getToken(this.auth,e));return $(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Hg(this,e)}reload(){return Yg(this)}_assign(e){this!==e&&($(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ot(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){$(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await us(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ke(this.auth.app))return Promise.reject(ct(this.auth));const e=await this.getIdToken();return await jr(this,Wg(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,i,s,o,u,c,h,f;const m=(n=t.displayName)!==null&&n!==void 0?n:void 0,_=(i=t.email)!==null&&i!==void 0?i:void 0,b=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,C=(o=t.photoURL)!==null&&o!==void 0?o:void 0,k=(u=t.tenantId)!==null&&u!==void 0?u:void 0,D=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,j=(h=t.createdAt)!==null&&h!==void 0?h:void 0,B=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:L,emailVerified:q,isAnonymous:J,providerData:K,stsTokenManager:T}=t;$(L&&T,e,"internal-error");const g=Un.fromJSON(this.name,T);$(typeof L=="string",e,"internal-error"),At(m,e.name),At(_,e.name),$(typeof q=="boolean",e,"internal-error"),$(typeof J=="boolean",e,"internal-error"),At(b,e.name),At(C,e.name),At(k,e.name),At(D,e.name),At(j,e.name),At(B,e.name);const I=new ot({uid:L,auth:e,email:_,emailVerified:q,displayName:m,isAnonymous:J,photoURL:C,phoneNumber:b,tenantId:k,stsTokenManager:g,createdAt:j,lastLoginAt:B});return K&&Array.isArray(K)&&(I.providerData=K.map(E=>Object.assign({},E))),D&&(I._redirectEventId=D),I}static async _fromIdTokenResponse(e,t,n=!1){const i=new Un;i.updateFromServerResponse(t);const s=new ot({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:n});return await us(s),s}static async _fromGetAccountInfoResponse(e,t,n){const i=t.users[0];$(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Nh(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),u=new Un;u.updateFromIdToken(n);const c=new ot({uid:i.localId,auth:e,stsTokenManager:u,isAnonymous:o}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new qo(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(c,h),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xc=new Map;function at(r){dt(r instanceof Function,"Expected a class definition");let e=xc.get(r);return e?(dt(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,xc.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}xh.type="NONE";const Oc=xh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wi(r,e,t){return`firebase:${r}:${e}:${t}`}class Bn{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:i,name:s}=this.auth;this.fullUserKey=Wi(this.userKey,i.apiKey,s),this.fullPersistenceKey=Wi("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?ot._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new Bn(at(Oc),e,n);const i=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let s=i[0]||at(Oc);const o=Wi(n,e.config.apiKey,e.name);let u=null;for(const h of t)try{const f=await h._get(o);if(f){const m=ot._fromJSON(e,f);h!==s&&(u=m),s=h;break}}catch{}const c=i.filter(h=>h._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new Bn(s,e,n):(s=c[0],u&&await s._set(o,u.toJSON()),await Promise.all(t.map(async h=>{if(h!==s)try{await h._remove(o)}catch{}})),new Bn(s,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mc(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Fh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Oh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Bh(e))return"Blackberry";if(qh(e))return"Webos";if(Mh(e))return"Safari";if((e.includes("chrome/")||Lh(e))&&!e.includes("edge/"))return"Chrome";if(Uh(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function Oh(r=ge()){return/firefox\//i.test(r)}function Mh(r=ge()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Lh(r=ge()){return/crios\//i.test(r)}function Fh(r=ge()){return/iemobile/i.test(r)}function Uh(r=ge()){return/android/i.test(r)}function Bh(r=ge()){return/blackberry/i.test(r)}function qh(r=ge()){return/webos/i.test(r)}function ya(r=ge()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function t_(r=ge()){var e;return ya(r)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function n_(){return Im()&&document.documentMode===10}function jh(r=ge()){return ya(r)||Uh(r)||qh(r)||Bh(r)||/windows phone/i.test(r)||Fh(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $h(r,e=[]){let t;switch(r){case"Browser":t=Mc(ge());break;case"Worker":t=`${Mc(ge())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Tn}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=s=>new Promise((o,u)=>{try{const c=e(s);o(c)}catch(c){u(c)}});n.onAbort=t,this.queue.push(n);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function i_(r,e={}){return mt(r,"GET","/v2/passwordPolicy",pt(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s_=6;class o_{constructor(e){var t,n,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:s_,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(n=e.allowedNonAlphanumericCharacters)===null||n===void 0?void 0:n.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,i,s,o,u;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(n=c.meetsMaxPasswordLength)!==null&&n!==void 0?n:!0),c.isValid&&(c.isValid=(i=c.containsLowercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(s=c.containsUppercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(u=c.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),c}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let i=0;i<e.length;i++)n=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a_{constructor(e,t,n,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Lc(this),this.idTokenSubscription=new Lc(this),this.beforeStateQueue=new r_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Sh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=at(t)),this._initializationPromise=this.queue(async()=>{var n,i;if(!this._deleted&&(this.persistenceManager=await Bn.create(this,e),!this._deleted)){if(!((n=this._popupRedirectResolver)===null||n===void 0)&&n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await kh(this,{idToken:e}),n=await ot._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Ke(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(u,u))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,u=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===u)&&(c!=null&&c.user)&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return $(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await us(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Bg()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ke(this.app))return Promise.reject(ct(this));const t=e?re(e):null;return t&&$(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&$(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ke(this.app)?Promise.reject(ct(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ke(this.app)?Promise.reject(ct(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(at(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await i_(this),t=new o_(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ni("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await e_(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&at(e)||this._popupRedirectResolver;$(t,this,"argument-error"),this.redirectPersistenceManager=await Bn.create(this,[at(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if($(u,this,"internal-error"),u.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,n,i);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return $(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=$h(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Mg(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function gt(r){return re(r)}class Lc{constructor(e){this.auth=e,this.observer=null,this.addObserver=Rm(t=>this.observer=t)}get next(){return $(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rs={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function u_(r){Rs=r}function zh(r){return Rs.loadJS(r)}function c_(){return Rs.recaptchaEnterpriseScript}function l_(){return Rs.gapiScript}function h_(r){return`__${r}${Math.floor(Math.random()*1e6)}`}const d_="recaptcha-enterprise",f_="NO_RECAPTCHA";class p_{constructor(e){this.type=d_,this.auth=gt(e)}async verify(e="verify",t=!1){async function n(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,u)=>{Kg(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{const h=new Gg(c);return s.tenantId==null?s._agentRecaptchaConfig=h:s._tenantRecaptchaConfigs[s.tenantId]=h,o(h.siteKey)}}).catch(c=>{u(c)})})}function i(s,o,u){const c=window.grecaptcha;kc(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(h=>{o(h)}).catch(()=>{o(f_)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{n(this.auth).then(u=>{if(!t&&kc(window.grecaptcha))i(u,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=c_();c.length!==0&&(c+=u),zh(c).then(()=>{i(u,s,o)}).catch(h=>{o(h)})}}).catch(u=>{o(u)})})}}async function Fc(r,e,t,n=!1){const i=new p_(r);let s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}const o=Object.assign({},e);return n?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function cs(r,e,t,n){var i;if(!((i=r._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await Fc(r,e,t,t==="getOobCode");return n(r,s)}else return n(r,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Fc(r,e,t,t==="getOobCode");return n(r,o)}else return Promise.reject(s)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m_(r,e){const t=As(r,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(os(s,e??{}))return i;ze(i,"already-initialized")}return t.initialize({options:e})}function g_(r,e){const t=(e==null?void 0:e.persistence)||[],n=(Array.isArray(t)?t:[t]).map(at);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}function __(r,e,t){const n=gt(r);$(n._canInitEmulator,n,"emulator-config-failed"),$(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const i=!1,s=Gh(e),{host:o,port:u}=y_(e),c=u===null?"":`:${u}`;n.config.emulator={url:`${s}//${o}${c}/`},n.settings.appVerificationDisabledForTesting=!0,n.emulatorConfig=Object.freeze({host:o,port:u,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),I_()}function Gh(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function y_(r){const e=Gh(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(n);if(i){const s=i[1];return{host:s,port:Uc(n.substr(s.length+1))}}else{const[s,o]=n.split(":");return{host:s,port:Uc(o)}}}function Uc(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function I_(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ia{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return st("not implemented")}_getIdTokenResponse(e){return st("not implemented")}_linkToIdToken(e,t){return st("not implemented")}_getReauthenticationResolver(e){return st("not implemented")}}async function T_(r,e){return mt(r,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function E_(r,e){return si(r,"POST","/v1/accounts:signInWithPassword",pt(r,e))}async function v_(r,e){return mt(r,"POST","/v1/accounts:sendOobCode",pt(r,e))}async function w_(r,e){return v_(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function A_(r,e){return si(r,"POST","/v1/accounts:signInWithEmailLink",pt(r,e))}async function R_(r,e){return si(r,"POST","/v1/accounts:signInWithEmailLink",pt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $r extends Ia{constructor(e,t,n,i=null){super("password",n),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new $r(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new $r(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return cs(e,t,"signInWithPassword",E_);case"emailLink":return A_(e,{email:this._email,oobCode:this._password});default:ze(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return cs(e,n,"signUpPassword",T_);case"emailLink":return R_(e,{idToken:t,email:this._email,oobCode:this._password});default:ze(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qn(r,e){return si(r,"POST","/v1/accounts:signInWithIdp",pt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b_="http://localhost";class an extends Ia{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new an(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ze("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:i}=t,s=fa(t,["providerId","signInMethod"]);if(!n||!i)return null;const o=new an(n,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return qn(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,qn(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,qn(e,t)}buildRequest(){const e={requestUri:b_,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ri(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P_(r){switch(r){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function S_(r){const e=Sr(Cr(r)).link,t=e?Sr(Cr(e)).deep_link_id:null,n=Sr(Cr(r)).deep_link_id;return(n?Sr(Cr(n)).link:null)||n||t||e||r}class Ta{constructor(e){var t,n,i,s,o,u;const c=Sr(Cr(e)),h=(t=c.apiKey)!==null&&t!==void 0?t:null,f=(n=c.oobCode)!==null&&n!==void 0?n:null,m=P_((i=c.mode)!==null&&i!==void 0?i:null);$(h&&f&&m,"argument-error"),this.apiKey=h,this.operation=m,this.code=f,this.continueUrl=(s=c.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(u=c.tenantId)!==null&&u!==void 0?u:null}static parseLink(e){const t=S_(e);try{return new Ta(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(){this.providerId=Xn.PROVIDER_ID}static credential(e,t){return $r._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=Ta.parseLink(t);return $(n,"argument-error"),$r._fromEmailAndCode(e,n.code,n.tenantId)}}Xn.PROVIDER_ID="password";Xn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Xn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ea{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi extends Ea{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt extends oi{constructor(){super("facebook.com")}static credential(e){return an._fromParams({providerId:Pt.PROVIDER_ID,signInMethod:Pt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Pt.credentialFromTaggedObject(e)}static credentialFromError(e){return Pt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Pt.credential(e.oauthAccessToken)}catch{return null}}}Pt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Pt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St extends oi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return an._fromParams({providerId:St.PROVIDER_ID,signInMethod:St.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return St.credentialFromTaggedObject(e)}static credentialFromError(e){return St.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return St.credential(t,n)}catch{return null}}}St.GOOGLE_SIGN_IN_METHOD="google.com";St.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct extends oi{constructor(){super("github.com")}static credential(e){return an._fromParams({providerId:Ct.PROVIDER_ID,signInMethod:Ct.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ct.credentialFromTaggedObject(e)}static credentialFromError(e){return Ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ct.credential(e.oauthAccessToken)}catch{return null}}}Ct.GITHUB_SIGN_IN_METHOD="github.com";Ct.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt extends oi{constructor(){super("twitter.com")}static credential(e,t){return an._fromParams({providerId:Dt.PROVIDER_ID,signInMethod:Dt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Dt.credentialFromTaggedObject(e)}static credentialFromError(e){return Dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Dt.credential(t,n)}catch{return null}}}Dt.TWITTER_SIGN_IN_METHOD="twitter.com";Dt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function C_(r,e){return si(r,"POST","/v1/accounts:signUp",pt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,i=!1){const s=await ot._fromIdTokenResponse(e,n,i),o=Bc(n);return new un({user:s,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const i=Bc(n);return new un({user:e,providerId:i,_tokenResponse:n,operationType:t})}}function Bc(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls extends tt{constructor(e,t,n,i){var s;super(t.code,t.message),this.operationType=n,this.user=i,Object.setPrototypeOf(this,ls.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,i){return new ls(e,t,n,i)}}function Kh(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?ls._fromErrorAndOperation(r,s,e,n):s})}async function D_(r,e,t=!1){const n=await jr(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return un._forOperation(r,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function V_(r,e,t=!1){const{auth:n}=r;if(Ke(n.app))return Promise.reject(ct(n));const i="reauthenticate";try{const s=await jr(r,Kh(n,i,e,r),t);$(s.idToken,n,"internal-error");const o=_a(s.idToken);$(o,n,"internal-error");const{sub:u}=o;return $(r.uid===u,n,"user-mismatch"),un._forOperation(r,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&ze(n,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wh(r,e,t=!1){if(Ke(r.app))return Promise.reject(ct(r));const n="signIn",i=await Kh(r,n,e),s=await un._fromIdTokenResponse(r,n,i);return t||await r._updateCurrentUser(s.user),s}async function k_(r,e){return Wh(gt(r),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hh(r){const e=gt(r);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function kw(r,e,t){const n=gt(r);await cs(n,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",w_)}async function Nw(r,e,t){if(Ke(r.app))return Promise.reject(ct(r));const n=gt(r),o=await cs(n,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",C_).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&Hh(r),c}),u=await un._fromIdTokenResponse(n,"signIn",o);return await n._updateCurrentUser(u.user),u}function xw(r,e,t){return Ke(r.app)?Promise.reject(ct(r)):k_(re(r),Xn.credential(e,t)).catch(async n=>{throw n.code==="auth/password-does-not-meet-requirements"&&Hh(r),n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N_(r,e){return re(r).setPersistence(e)}function x_(r,e,t,n){return re(r).onIdTokenChanged(e,t,n)}function O_(r,e,t){return re(r).beforeAuthStateChanged(e,t)}function Ow(r,e,t,n){return re(r).onAuthStateChanged(e,t,n)}function Mw(r){return re(r).signOut()}const hs="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qh{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(hs,"1"),this.storage.removeItem(hs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M_=1e3,L_=10;class Jh extends Qh{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=jh(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),i=this.localCache[t];n!==i&&e(t,i,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,u,c)=>{this.notifyListeners(o,c)});return}const n=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},s=this.storage.getItem(n);n_()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,L_):i()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},M_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Jh.type="LOCAL";const Yh=Jh;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh extends Qh{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Xh.type="SESSION";const Zh=Xh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F_(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const n=new bs(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:i});const u=Array.from(o).map(async h=>h(t.origin,s)),c=await F_(u);t.ports[0].postMessage({status:"done",eventId:n,eventType:i,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}bs.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function va(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U_{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((u,c)=>{const h=va("",20);i.port1.start();const f=setTimeout(()=>{c(new Error("unsupported_event"))},n);o={messageChannel:i,onMessage(m){const _=m;if(_.data.eventId===h)switch(_.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),u(_.data.response);break;default:clearTimeout(f),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ze(){return window}function B_(r){Ze().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ed(){return typeof Ze().WorkerGlobalScope<"u"&&typeof Ze().importScripts=="function"}async function q_(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function j_(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)===null||r===void 0?void 0:r.controller)||null}function $_(){return ed()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const td="firebaseLocalStorageDb",z_=1,ds="firebaseLocalStorage",nd="fbase_key";class ai{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ps(r,e){return r.transaction([ds],e?"readwrite":"readonly").objectStore(ds)}function G_(){const r=indexedDB.deleteDatabase(td);return new ai(r).toPromise()}function jo(){const r=indexedDB.open(td,z_);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(ds,{keyPath:nd})}catch(i){t(i)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(ds)?e(n):(n.close(),await G_(),e(await jo()))})})}async function qc(r,e,t){const n=Ps(r,!0).put({[nd]:e,value:t});return new ai(n).toPromise()}async function K_(r,e){const t=Ps(r,!1).get(e),n=await new ai(t).toPromise();return n===void 0?null:n.value}function jc(r,e){const t=Ps(r,!0).delete(e);return new ai(t).toPromise()}const W_=800,H_=3;class rd{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await jo(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>H_)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ed()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=bs._getInstance($_()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await q_(),!this.activeServiceWorker)return;this.sender=new U_(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&!((e=n[0])===null||e===void 0)&&e.fulfilled&&!((t=n[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||j_()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await jo();return await qc(e,hs,"1"),await jc(e,hs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>qc(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>K_(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>jc(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Ps(i,!1).getAll();return new ai(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)n.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!n.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),W_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}rd.type="LOCAL";const Q_=rd;new ii(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function id(r,e){return e?at(e):($(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa extends Ia{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return qn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return qn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return qn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function J_(r){return Wh(r.auth,new wa(r),r.bypassAuthState)}function Y_(r){const{auth:e,user:t}=r;return $(t,e,"internal-error"),V_(t,new wa(r),r.bypassAuthState)}async function X_(r){const{auth:e,user:t}=r;return $(t,e,"internal-error"),D_(t,new wa(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sd{constructor(e,t,n,i,s=!1){this.auth=e,this.resolver=n,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:i,tenantId:s,error:o,type:u}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:n,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return J_;case"linkViaPopup":case"linkViaRedirect":return X_;case"reauthViaPopup":case"reauthViaRedirect":return Y_;default:ze(this.auth,"internal-error")}}resolve(e){dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z_=new ii(2e3,1e4);async function Lw(r,e,t){if(Ke(r.app))return Promise.reject(We(r,"operation-not-supported-in-this-environment"));const n=gt(r);Lg(r,e,Ea);const i=id(n,t);return new nn(n,"signInViaPopup",e,i).executeNotNull()}class nn extends sd{constructor(e,t,n,i,s){super(e,t,i,s),this.provider=n,this.authWindow=null,this.pollId=null,nn.currentPopupAction&&nn.currentPopupAction.cancel(),nn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return $(e,this.auth,"internal-error"),e}async onExecution(){dt(this.filter.length===1,"Popup operations only handle one event");const e=va();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(We(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(We(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,nn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if(!((n=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||n===void 0)&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(We(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Z_.get())};e()}}nn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ey="pendingRedirect",Hi=new Map;class ty extends sd{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Hi.get(this.auth._key());if(!e){try{const n=await ny(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}Hi.set(this.auth._key(),e)}return this.bypassAuthState||Hi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function ny(r,e){const t=sy(e),n=iy(r);if(!await n._isAvailable())return!1;const i=await n._get(t)==="true";return await n._remove(t),i}function ry(r,e){Hi.set(r._key(),e)}function iy(r){return at(r._redirectPersistence)}function sy(r){return Wi(ey,r.config.apiKey,r.name)}async function oy(r,e,t=!1){if(Ke(r.app))return Promise.reject(ct(r));const n=gt(r),i=id(n,e),o=await new ty(n,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ay=600*1e3;class uy{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!cy(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!od(e)){const i=((n=e.error.code)===null||n===void 0?void 0:n.split("auth/")[1])||"internal-error";t.onError(We(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ay&&this.cachedEventUids.clear(),this.cachedEventUids.has($c(e))}saveEventToCache(e){this.cachedEventUids.add($c(e)),this.lastProcessedEventTime=Date.now()}}function $c(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function od({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function cy(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return od(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ly(r,e={}){return mt(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hy=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,dy=/^https?/;async function fy(r){if(r.config.emulator)return;const{authorizedDomains:e}=await ly(r);for(const t of e)try{if(py(t))return}catch{}ze(r,"unauthorized-domain")}function py(r){const e=Bo(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const o=new URL(r);return o.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!dy.test(t))return!1;if(hy.test(r))return n===r;const i=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const my=new ii(3e4,6e4);function zc(){const r=Ze().___jsl;if(r!=null&&r.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function gy(r){return new Promise((e,t)=>{var n,i,s;function o(){zc(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{zc(),t(We(r,"network-request-failed"))},timeout:my.get()})}if(!((i=(n=Ze().gapi)===null||n===void 0?void 0:n.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=Ze().gapi)===null||s===void 0)&&s.load)o();else{const u=h_("iframefcb");return Ze()[u]=()=>{gapi.load?o():t(We(r,"network-request-failed"))},zh(`${l_()}?onload=${u}`).catch(c=>t(c))}}).catch(e=>{throw Qi=null,e})}let Qi=null;function _y(r){return Qi=Qi||gy(r),Qi}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yy=new ii(5e3,15e3),Iy="__/auth/iframe",Ty="emulator/auth/iframe",Ey={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},vy=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function wy(r){const e=r.config;$(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?ga(e,Ty):`https://${r.config.authDomain}/${Iy}`,n={apiKey:e.apiKey,appName:r.name,v:Tn},i=vy.get(r.config.apiHost);i&&(n.eid=i);const s=r._getFrameworks();return s.length&&(n.fw=s.join(",")),`${t}?${ri(n).slice(1)}`}async function Ay(r){const e=await _y(r),t=Ze().gapi;return $(t,r,"internal-error"),e.open({where:document.body,url:wy(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Ey,dontclear:!0},n=>new Promise(async(i,s)=>{await n.restyle({setHideOnLeave:!1});const o=We(r,"network-request-failed"),u=Ze().setTimeout(()=>{s(o)},yy.get());function c(){Ze().clearTimeout(u),i(n)}n.ping(c).then(c,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ry={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},by=500,Py=600,Sy="_blank",Cy="http://localhost";class Gc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Dy(r,e,t,n=by,i=Py){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let u="";const c=Object.assign(Object.assign({},Ry),{width:n.toString(),height:i.toString(),top:s,left:o}),h=ge().toLowerCase();t&&(u=Lh(h)?Sy:t),Oh(h)&&(e=e||Cy,c.scrollbars="yes");const f=Object.entries(c).reduce((_,[b,C])=>`${_}${b}=${C},`,"");if(t_(h)&&u!=="_self")return Vy(e||"",u),new Gc(null);const m=window.open(e||"",u,f);$(m,r,"popup-blocked");try{m.focus()}catch{}return new Gc(m)}function Vy(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ky="__/auth/handler",Ny="emulator/auth/handler",xy=encodeURIComponent("fac");async function Kc(r,e,t,n,i,s){$(r.config.authDomain,r,"auth-domain-config-required"),$(r.config.apiKey,r,"invalid-api-key");const o={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:Tn,eventId:i};if(e instanceof Ea){e.setDefaultLanguage(r.languageCode),o.providerId=e.providerId||"",Am(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))o[f]=m}if(e instanceof oi){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(o.scopes=f.join(","))}r.tenantId&&(o.tid=r.tenantId);const u=o;for(const f of Object.keys(u))u[f]===void 0&&delete u[f];const c=await r._getAppCheckToken(),h=c?`#${xy}=${encodeURIComponent(c)}`:"";return`${Oy(r)}?${ri(u).slice(1)}${h}`}function Oy({config:r}){return r.emulator?ga(r,Ny):`https://${r.authDomain}/${ky}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const So="webStorageSupport";class My{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Zh,this._completeRedirectFn=oy,this._overrideRedirectResult=ry}async _openPopup(e,t,n,i){var s;dt((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await Kc(e,t,n,Bo(),i);return Dy(e,o,va())}async _openRedirect(e,t,n,i){await this._originValidation(e);const s=await Kc(e,t,n,Bo(),i);return B_(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(dt(s,"If manager is not set, promise should be"),s)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await Ay(e),n=new uy(e);return t.register("authEvent",i=>($(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:n.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(So,{type:So},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[So];o!==void 0&&t(!!o),ze(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=fy(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return jh()||Mh()||ya()}}const Ly=My;var Wc="@firebase/auth",Hc="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fy{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){$(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uy(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function By(r){on(new Ft("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:u}=n.options;$(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const c={apiKey:o,authDomain:u,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:$h(r)},h=new a_(n,i,s,c);return g_(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),on(new Ft("auth-internal",e=>{const t=gt(e.getProvider("auth").getImmediate());return(n=>new Fy(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Xe(Wc,Hc,Uy(r)),Xe(Wc,Hc,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qy=300,jy=yh("authIdTokenMaxAge")||qy;let Qc=null;const $y=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>jy)return;const i=t==null?void 0:t.token;Qc!==i&&(Qc=i,await fetch(r,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function zy(r=da()){const e=As(r,"auth");if(e.isInitialized())return e.getImmediate();const t=m_(r,{popupRedirectResolver:Ly,persistence:[Q_,Yh,Zh]}),n=yh("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(n,location.origin);if(location.origin===s.origin){const o=$y(s.toString());O_(t,o,()=>o(t.currentUser)),x_(t,u=>o(u))}}const i=mh("auth");return i&&__(t,`http://${i}`),t}function Gy(){var r,e;return(e=(r=document.getElementsByTagName("head"))===null||r===void 0?void 0:r[0])!==null&&e!==void 0?e:document}u_({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=i=>{const s=We("internal-error");s.customData=i,t(s)},n.type="text/javascript",n.charset="UTF-8",Gy().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});By("Browser");var Ky="firebase",Wy="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Xe(Ky,Wy,"app");var Jc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var rn,ad;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,g){function I(){}I.prototype=g.prototype,T.D=g.prototype,T.prototype=new I,T.prototype.constructor=T,T.C=function(E,v,R){for(var y=Array(arguments.length-2),nt=2;nt<arguments.length;nt++)y[nt-2]=arguments[nt];return g.prototype[v].apply(E,y)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(n,t),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(T,g,I){I||(I=0);var E=Array(16);if(typeof g=="string")for(var v=0;16>v;++v)E[v]=g.charCodeAt(I++)|g.charCodeAt(I++)<<8|g.charCodeAt(I++)<<16|g.charCodeAt(I++)<<24;else for(v=0;16>v;++v)E[v]=g[I++]|g[I++]<<8|g[I++]<<16|g[I++]<<24;g=T.g[0],I=T.g[1],v=T.g[2];var R=T.g[3],y=g+(R^I&(v^R))+E[0]+3614090360&4294967295;g=I+(y<<7&4294967295|y>>>25),y=R+(v^g&(I^v))+E[1]+3905402710&4294967295,R=g+(y<<12&4294967295|y>>>20),y=v+(I^R&(g^I))+E[2]+606105819&4294967295,v=R+(y<<17&4294967295|y>>>15),y=I+(g^v&(R^g))+E[3]+3250441966&4294967295,I=v+(y<<22&4294967295|y>>>10),y=g+(R^I&(v^R))+E[4]+4118548399&4294967295,g=I+(y<<7&4294967295|y>>>25),y=R+(v^g&(I^v))+E[5]+1200080426&4294967295,R=g+(y<<12&4294967295|y>>>20),y=v+(I^R&(g^I))+E[6]+2821735955&4294967295,v=R+(y<<17&4294967295|y>>>15),y=I+(g^v&(R^g))+E[7]+4249261313&4294967295,I=v+(y<<22&4294967295|y>>>10),y=g+(R^I&(v^R))+E[8]+1770035416&4294967295,g=I+(y<<7&4294967295|y>>>25),y=R+(v^g&(I^v))+E[9]+2336552879&4294967295,R=g+(y<<12&4294967295|y>>>20),y=v+(I^R&(g^I))+E[10]+4294925233&4294967295,v=R+(y<<17&4294967295|y>>>15),y=I+(g^v&(R^g))+E[11]+2304563134&4294967295,I=v+(y<<22&4294967295|y>>>10),y=g+(R^I&(v^R))+E[12]+1804603682&4294967295,g=I+(y<<7&4294967295|y>>>25),y=R+(v^g&(I^v))+E[13]+4254626195&4294967295,R=g+(y<<12&4294967295|y>>>20),y=v+(I^R&(g^I))+E[14]+2792965006&4294967295,v=R+(y<<17&4294967295|y>>>15),y=I+(g^v&(R^g))+E[15]+1236535329&4294967295,I=v+(y<<22&4294967295|y>>>10),y=g+(v^R&(I^v))+E[1]+4129170786&4294967295,g=I+(y<<5&4294967295|y>>>27),y=R+(I^v&(g^I))+E[6]+3225465664&4294967295,R=g+(y<<9&4294967295|y>>>23),y=v+(g^I&(R^g))+E[11]+643717713&4294967295,v=R+(y<<14&4294967295|y>>>18),y=I+(R^g&(v^R))+E[0]+3921069994&4294967295,I=v+(y<<20&4294967295|y>>>12),y=g+(v^R&(I^v))+E[5]+3593408605&4294967295,g=I+(y<<5&4294967295|y>>>27),y=R+(I^v&(g^I))+E[10]+38016083&4294967295,R=g+(y<<9&4294967295|y>>>23),y=v+(g^I&(R^g))+E[15]+3634488961&4294967295,v=R+(y<<14&4294967295|y>>>18),y=I+(R^g&(v^R))+E[4]+3889429448&4294967295,I=v+(y<<20&4294967295|y>>>12),y=g+(v^R&(I^v))+E[9]+568446438&4294967295,g=I+(y<<5&4294967295|y>>>27),y=R+(I^v&(g^I))+E[14]+3275163606&4294967295,R=g+(y<<9&4294967295|y>>>23),y=v+(g^I&(R^g))+E[3]+4107603335&4294967295,v=R+(y<<14&4294967295|y>>>18),y=I+(R^g&(v^R))+E[8]+1163531501&4294967295,I=v+(y<<20&4294967295|y>>>12),y=g+(v^R&(I^v))+E[13]+2850285829&4294967295,g=I+(y<<5&4294967295|y>>>27),y=R+(I^v&(g^I))+E[2]+4243563512&4294967295,R=g+(y<<9&4294967295|y>>>23),y=v+(g^I&(R^g))+E[7]+1735328473&4294967295,v=R+(y<<14&4294967295|y>>>18),y=I+(R^g&(v^R))+E[12]+2368359562&4294967295,I=v+(y<<20&4294967295|y>>>12),y=g+(I^v^R)+E[5]+4294588738&4294967295,g=I+(y<<4&4294967295|y>>>28),y=R+(g^I^v)+E[8]+2272392833&4294967295,R=g+(y<<11&4294967295|y>>>21),y=v+(R^g^I)+E[11]+1839030562&4294967295,v=R+(y<<16&4294967295|y>>>16),y=I+(v^R^g)+E[14]+4259657740&4294967295,I=v+(y<<23&4294967295|y>>>9),y=g+(I^v^R)+E[1]+2763975236&4294967295,g=I+(y<<4&4294967295|y>>>28),y=R+(g^I^v)+E[4]+1272893353&4294967295,R=g+(y<<11&4294967295|y>>>21),y=v+(R^g^I)+E[7]+4139469664&4294967295,v=R+(y<<16&4294967295|y>>>16),y=I+(v^R^g)+E[10]+3200236656&4294967295,I=v+(y<<23&4294967295|y>>>9),y=g+(I^v^R)+E[13]+681279174&4294967295,g=I+(y<<4&4294967295|y>>>28),y=R+(g^I^v)+E[0]+3936430074&4294967295,R=g+(y<<11&4294967295|y>>>21),y=v+(R^g^I)+E[3]+3572445317&4294967295,v=R+(y<<16&4294967295|y>>>16),y=I+(v^R^g)+E[6]+76029189&4294967295,I=v+(y<<23&4294967295|y>>>9),y=g+(I^v^R)+E[9]+3654602809&4294967295,g=I+(y<<4&4294967295|y>>>28),y=R+(g^I^v)+E[12]+3873151461&4294967295,R=g+(y<<11&4294967295|y>>>21),y=v+(R^g^I)+E[15]+530742520&4294967295,v=R+(y<<16&4294967295|y>>>16),y=I+(v^R^g)+E[2]+3299628645&4294967295,I=v+(y<<23&4294967295|y>>>9),y=g+(v^(I|~R))+E[0]+4096336452&4294967295,g=I+(y<<6&4294967295|y>>>26),y=R+(I^(g|~v))+E[7]+1126891415&4294967295,R=g+(y<<10&4294967295|y>>>22),y=v+(g^(R|~I))+E[14]+2878612391&4294967295,v=R+(y<<15&4294967295|y>>>17),y=I+(R^(v|~g))+E[5]+4237533241&4294967295,I=v+(y<<21&4294967295|y>>>11),y=g+(v^(I|~R))+E[12]+1700485571&4294967295,g=I+(y<<6&4294967295|y>>>26),y=R+(I^(g|~v))+E[3]+2399980690&4294967295,R=g+(y<<10&4294967295|y>>>22),y=v+(g^(R|~I))+E[10]+4293915773&4294967295,v=R+(y<<15&4294967295|y>>>17),y=I+(R^(v|~g))+E[1]+2240044497&4294967295,I=v+(y<<21&4294967295|y>>>11),y=g+(v^(I|~R))+E[8]+1873313359&4294967295,g=I+(y<<6&4294967295|y>>>26),y=R+(I^(g|~v))+E[15]+4264355552&4294967295,R=g+(y<<10&4294967295|y>>>22),y=v+(g^(R|~I))+E[6]+2734768916&4294967295,v=R+(y<<15&4294967295|y>>>17),y=I+(R^(v|~g))+E[13]+1309151649&4294967295,I=v+(y<<21&4294967295|y>>>11),y=g+(v^(I|~R))+E[4]+4149444226&4294967295,g=I+(y<<6&4294967295|y>>>26),y=R+(I^(g|~v))+E[11]+3174756917&4294967295,R=g+(y<<10&4294967295|y>>>22),y=v+(g^(R|~I))+E[2]+718787259&4294967295,v=R+(y<<15&4294967295|y>>>17),y=I+(R^(v|~g))+E[9]+3951481745&4294967295,T.g[0]=T.g[0]+g&4294967295,T.g[1]=T.g[1]+(v+(y<<21&4294967295|y>>>11))&4294967295,T.g[2]=T.g[2]+v&4294967295,T.g[3]=T.g[3]+R&4294967295}n.prototype.u=function(T,g){g===void 0&&(g=T.length);for(var I=g-this.blockSize,E=this.B,v=this.h,R=0;R<g;){if(v==0)for(;R<=I;)i(this,T,R),R+=this.blockSize;if(typeof T=="string"){for(;R<g;)if(E[v++]=T.charCodeAt(R++),v==this.blockSize){i(this,E),v=0;break}}else for(;R<g;)if(E[v++]=T[R++],v==this.blockSize){i(this,E),v=0;break}}this.h=v,this.o+=g},n.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var g=1;g<T.length-8;++g)T[g]=0;var I=8*this.o;for(g=T.length-8;g<T.length;++g)T[g]=I&255,I/=256;for(this.u(T),T=Array(16),g=I=0;4>g;++g)for(var E=0;32>E;E+=8)T[I++]=this.g[g]>>>E&255;return T};function s(T,g){var I=u;return Object.prototype.hasOwnProperty.call(I,T)?I[T]:I[T]=g(T)}function o(T,g){this.h=g;for(var I=[],E=!0,v=T.length-1;0<=v;v--){var R=T[v]|0;E&&R==g||(I[v]=R,E=!1)}this.g=I}var u={};function c(T){return-128<=T&&128>T?s(T,function(g){return new o([g|0],0>g?-1:0)}):new o([T|0],0>T?-1:0)}function h(T){if(isNaN(T)||!isFinite(T))return m;if(0>T)return D(h(-T));for(var g=[],I=1,E=0;T>=I;E++)g[E]=T/I|0,I*=4294967296;return new o(g,0)}function f(T,g){if(T.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(T.charAt(0)=="-")return D(f(T.substring(1),g));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var I=h(Math.pow(g,8)),E=m,v=0;v<T.length;v+=8){var R=Math.min(8,T.length-v),y=parseInt(T.substring(v,v+R),g);8>R?(R=h(Math.pow(g,R)),E=E.j(R).add(h(y))):(E=E.j(I),E=E.add(h(y)))}return E}var m=c(0),_=c(1),b=c(16777216);r=o.prototype,r.m=function(){if(k(this))return-D(this).m();for(var T=0,g=1,I=0;I<this.g.length;I++){var E=this.i(I);T+=(0<=E?E:4294967296+E)*g,g*=4294967296}return T},r.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(C(this))return"0";if(k(this))return"-"+D(this).toString(T);for(var g=h(Math.pow(T,6)),I=this,E="";;){var v=q(I,g).g;I=j(I,v.j(g));var R=((0<I.g.length?I.g[0]:I.h)>>>0).toString(T);if(I=v,C(I))return R+E;for(;6>R.length;)R="0"+R;E=R+E}},r.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function C(T){if(T.h!=0)return!1;for(var g=0;g<T.g.length;g++)if(T.g[g]!=0)return!1;return!0}function k(T){return T.h==-1}r.l=function(T){return T=j(this,T),k(T)?-1:C(T)?0:1};function D(T){for(var g=T.g.length,I=[],E=0;E<g;E++)I[E]=~T.g[E];return new o(I,~T.h).add(_)}r.abs=function(){return k(this)?D(this):this},r.add=function(T){for(var g=Math.max(this.g.length,T.g.length),I=[],E=0,v=0;v<=g;v++){var R=E+(this.i(v)&65535)+(T.i(v)&65535),y=(R>>>16)+(this.i(v)>>>16)+(T.i(v)>>>16);E=y>>>16,R&=65535,y&=65535,I[v]=y<<16|R}return new o(I,I[I.length-1]&-2147483648?-1:0)};function j(T,g){return T.add(D(g))}r.j=function(T){if(C(this)||C(T))return m;if(k(this))return k(T)?D(this).j(D(T)):D(D(this).j(T));if(k(T))return D(this.j(D(T)));if(0>this.l(b)&&0>T.l(b))return h(this.m()*T.m());for(var g=this.g.length+T.g.length,I=[],E=0;E<2*g;E++)I[E]=0;for(E=0;E<this.g.length;E++)for(var v=0;v<T.g.length;v++){var R=this.i(E)>>>16,y=this.i(E)&65535,nt=T.i(v)>>>16,ir=T.i(v)&65535;I[2*E+2*v]+=y*ir,B(I,2*E+2*v),I[2*E+2*v+1]+=R*ir,B(I,2*E+2*v+1),I[2*E+2*v+1]+=y*nt,B(I,2*E+2*v+1),I[2*E+2*v+2]+=R*nt,B(I,2*E+2*v+2)}for(E=0;E<g;E++)I[E]=I[2*E+1]<<16|I[2*E];for(E=g;E<2*g;E++)I[E]=0;return new o(I,0)};function B(T,g){for(;(T[g]&65535)!=T[g];)T[g+1]+=T[g]>>>16,T[g]&=65535,g++}function L(T,g){this.g=T,this.h=g}function q(T,g){if(C(g))throw Error("division by zero");if(C(T))return new L(m,m);if(k(T))return g=q(D(T),g),new L(D(g.g),D(g.h));if(k(g))return g=q(T,D(g)),new L(D(g.g),g.h);if(30<T.g.length){if(k(T)||k(g))throw Error("slowDivide_ only works with positive integers.");for(var I=_,E=g;0>=E.l(T);)I=J(I),E=J(E);var v=K(I,1),R=K(E,1);for(E=K(E,2),I=K(I,2);!C(E);){var y=R.add(E);0>=y.l(T)&&(v=v.add(I),R=y),E=K(E,1),I=K(I,1)}return g=j(T,v.j(g)),new L(v,g)}for(v=m;0<=T.l(g);){for(I=Math.max(1,Math.floor(T.m()/g.m())),E=Math.ceil(Math.log(I)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),R=h(I),y=R.j(g);k(y)||0<y.l(T);)I-=E,R=h(I),y=R.j(g);C(R)&&(R=_),v=v.add(R),T=j(T,y)}return new L(v,T)}r.A=function(T){return q(this,T).h},r.and=function(T){for(var g=Math.max(this.g.length,T.g.length),I=[],E=0;E<g;E++)I[E]=this.i(E)&T.i(E);return new o(I,this.h&T.h)},r.or=function(T){for(var g=Math.max(this.g.length,T.g.length),I=[],E=0;E<g;E++)I[E]=this.i(E)|T.i(E);return new o(I,this.h|T.h)},r.xor=function(T){for(var g=Math.max(this.g.length,T.g.length),I=[],E=0;E<g;E++)I[E]=this.i(E)^T.i(E);return new o(I,this.h^T.h)};function J(T){for(var g=T.g.length+1,I=[],E=0;E<g;E++)I[E]=T.i(E)<<1|T.i(E-1)>>>31;return new o(I,T.h)}function K(T,g){var I=g>>5;g%=32;for(var E=T.g.length-I,v=[],R=0;R<E;R++)v[R]=0<g?T.i(R+I)>>>g|T.i(R+I+1)<<32-g:T.i(R+I);return new o(v,T.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,ad=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,rn=o}).apply(typeof Jc<"u"?Jc:typeof self<"u"?self:typeof window<"u"?window:{});var Li=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ud,Dr,cd,Ji,$o,ld,hd,dd;(function(){var r,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,l,d){return a==Array.prototype||a==Object.prototype||(a[l]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Li=="object"&&Li];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function i(a,l){if(l)e:{var d=n;a=a.split(".");for(var p=0;p<a.length-1;p++){var w=a[p];if(!(w in d))break e;d=d[w]}a=a[a.length-1],p=d[a],l=l(p),l!=p&&l!=null&&e(d,a,{configurable:!0,writable:!0,value:l})}}function s(a,l){a instanceof String&&(a+="");var d=0,p=!1,w={next:function(){if(!p&&d<a.length){var P=d++;return{value:l(P,a[P]),done:!1}}return p=!0,{done:!0,value:void 0}}};return w[Symbol.iterator]=function(){return w},w}i("Array.prototype.values",function(a){return a||function(){return s(this,function(l,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},u=this||self;function c(a){var l=typeof a;return l=l!="object"?l:a?Array.isArray(a)?"array":l:"null",l=="array"||l=="object"&&typeof a.length=="number"}function h(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function f(a,l,d){return a.call.apply(a.bind,arguments)}function m(a,l,d){if(!a)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var w=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(w,p),a.apply(l,w)}}return function(){return a.apply(l,arguments)}}function _(a,l,d){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,_.apply(null,arguments)}function b(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),a.apply(this,p)}}function C(a,l){function d(){}d.prototype=l.prototype,a.aa=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(p,w,P){for(var x=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)x[ne-2]=arguments[ne];return l.prototype[w].apply(p,x)}}function k(a){const l=a.length;if(0<l){const d=Array(l);for(let p=0;p<l;p++)d[p]=a[p];return d}return[]}function D(a,l){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(c(p)){const w=a.length||0,P=p.length||0;a.length=w+P;for(let x=0;x<P;x++)a[w+x]=p[x]}else a.push(p)}}class j{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function B(a){return/^[\s\xa0]*$/.test(a)}function L(){var a=u.navigator;return a&&(a=a.userAgent)?a:""}function q(a){return q[" "](a),a}q[" "]=function(){};var J=L().indexOf("Gecko")!=-1&&!(L().toLowerCase().indexOf("webkit")!=-1&&L().indexOf("Edge")==-1)&&!(L().indexOf("Trident")!=-1||L().indexOf("MSIE")!=-1)&&L().indexOf("Edge")==-1;function K(a,l,d){for(const p in a)l.call(d,a[p],p,a)}function T(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function g(a){const l={};for(const d in a)l[d]=a[d];return l}const I="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(a,l){let d,p;for(let w=1;w<arguments.length;w++){p=arguments[w];for(d in p)a[d]=p[d];for(let P=0;P<I.length;P++)d=I[P],Object.prototype.hasOwnProperty.call(p,d)&&(a[d]=p[d])}}function v(a){var l=1;a=a.split(":");const d=[];for(;0<l&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function R(a){u.setTimeout(()=>{throw a},0)}function y(){var a=Ys;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class nt{constructor(){this.h=this.g=null}add(l,d){const p=ir.get();p.set(l,d),this.h?this.h.next=p:this.g=p,this.h=p}}var ir=new j(()=>new Rp,a=>a.reset());class Rp{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let sr,or=!1,Ys=new nt,Tu=()=>{const a=u.Promise.resolve(void 0);sr=()=>{a.then(bp)}};var bp=()=>{for(var a;a=y();){try{a.h.call(a.g)}catch(d){R(d)}var l=ir;l.j(a),100>l.h&&(l.h++,a.next=l.g,l.g=a)}or=!1};function Tt(){this.s=this.s,this.C=this.C}Tt.prototype.s=!1,Tt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Tt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ae(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}Ae.prototype.h=function(){this.defaultPrevented=!0};var Pp=(function(){if(!u.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};u.addEventListener("test",d,l),u.removeEventListener("test",d,l)}catch{}return a})();function ar(a,l){if(Ae.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,p=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget){if(J){e:{try{q(l.nodeName);var w=!0;break e}catch{}w=!1}w||(l=null)}}else d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement);this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Sp[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&ar.aa.h.call(this)}}C(ar,Ae);var Sp={2:"touch",3:"pen",4:"mouse"};ar.prototype.h=function(){ar.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var _i="closure_listenable_"+(1e6*Math.random()|0),Cp=0;function Dp(a,l,d,p,w){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!p,this.ha=w,this.key=++Cp,this.da=this.fa=!1}function yi(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Ii(a){this.src=a,this.g={},this.h=0}Ii.prototype.add=function(a,l,d,p,w){var P=a.toString();a=this.g[P],a||(a=this.g[P]=[],this.h++);var x=Zs(a,l,p,w);return-1<x?(l=a[x],d||(l.fa=!1)):(l=new Dp(l,this.src,P,!!p,w),l.fa=d,a.push(l)),l};function Xs(a,l){var d=l.type;if(d in a.g){var p=a.g[d],w=Array.prototype.indexOf.call(p,l,void 0),P;(P=0<=w)&&Array.prototype.splice.call(p,w,1),P&&(yi(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function Zs(a,l,d,p){for(var w=0;w<a.length;++w){var P=a[w];if(!P.da&&P.listener==l&&P.capture==!!d&&P.ha==p)return w}return-1}var eo="closure_lm_"+(1e6*Math.random()|0),to={};function Eu(a,l,d,p,w){if(Array.isArray(l)){for(var P=0;P<l.length;P++)Eu(a,l[P],d,p,w);return null}return d=Au(d),a&&a[_i]?a.K(l,d,h(p)?!!p.capture:!1,w):Vp(a,l,d,!1,p,w)}function Vp(a,l,d,p,w,P){if(!l)throw Error("Invalid event type");var x=h(w)?!!w.capture:!!w,ne=ro(a);if(ne||(a[eo]=ne=new Ii(a)),d=ne.add(l,d,p,x,P),d.proxy)return d;if(p=kp(),d.proxy=p,p.src=a,p.listener=d,a.addEventListener)Pp||(w=x),w===void 0&&(w=!1),a.addEventListener(l.toString(),p,w);else if(a.attachEvent)a.attachEvent(wu(l.toString()),p);else if(a.addListener&&a.removeListener)a.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function kp(){function a(d){return l.call(a.src,a.listener,d)}const l=Np;return a}function vu(a,l,d,p,w){if(Array.isArray(l))for(var P=0;P<l.length;P++)vu(a,l[P],d,p,w);else p=h(p)?!!p.capture:!!p,d=Au(d),a&&a[_i]?(a=a.i,l=String(l).toString(),l in a.g&&(P=a.g[l],d=Zs(P,d,p,w),-1<d&&(yi(P[d]),Array.prototype.splice.call(P,d,1),P.length==0&&(delete a.g[l],a.h--)))):a&&(a=ro(a))&&(l=a.g[l.toString()],a=-1,l&&(a=Zs(l,d,p,w)),(d=-1<a?l[a]:null)&&no(d))}function no(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[_i])Xs(l.i,a);else{var d=a.type,p=a.proxy;l.removeEventListener?l.removeEventListener(d,p,a.capture):l.detachEvent?l.detachEvent(wu(d),p):l.addListener&&l.removeListener&&l.removeListener(p),(d=ro(l))?(Xs(d,a),d.h==0&&(d.src=null,l[eo]=null)):yi(a)}}}function wu(a){return a in to?to[a]:to[a]="on"+a}function Np(a,l){if(a.da)a=!0;else{l=new ar(l,this);var d=a.listener,p=a.ha||a.src;a.fa&&no(a),a=d.call(p,l)}return a}function ro(a){return a=a[eo],a instanceof Ii?a:null}var io="__closure_events_fn_"+(1e9*Math.random()>>>0);function Au(a){return typeof a=="function"?a:(a[io]||(a[io]=function(l){return a.handleEvent(l)}),a[io])}function Re(){Tt.call(this),this.i=new Ii(this),this.M=this,this.F=null}C(Re,Tt),Re.prototype[_i]=!0,Re.prototype.removeEventListener=function(a,l,d,p){vu(this,a,l,d,p)};function De(a,l){var d,p=a.F;if(p)for(d=[];p;p=p.F)d.push(p);if(a=a.M,p=l.type||l,typeof l=="string")l=new Ae(l,a);else if(l instanceof Ae)l.target=l.target||a;else{var w=l;l=new Ae(p,a),E(l,w)}if(w=!0,d)for(var P=d.length-1;0<=P;P--){var x=l.g=d[P];w=Ti(x,p,!0,l)&&w}if(x=l.g=a,w=Ti(x,p,!0,l)&&w,w=Ti(x,p,!1,l)&&w,d)for(P=0;P<d.length;P++)x=l.g=d[P],w=Ti(x,p,!1,l)&&w}Re.prototype.N=function(){if(Re.aa.N.call(this),this.i){var a=this.i,l;for(l in a.g){for(var d=a.g[l],p=0;p<d.length;p++)yi(d[p]);delete a.g[l],a.h--}}this.F=null},Re.prototype.K=function(a,l,d,p){return this.i.add(String(a),l,!1,d,p)},Re.prototype.L=function(a,l,d,p){return this.i.add(String(a),l,!0,d,p)};function Ti(a,l,d,p){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();for(var w=!0,P=0;P<l.length;++P){var x=l[P];if(x&&!x.da&&x.capture==d){var ne=x.listener,Te=x.ha||x.src;x.fa&&Xs(a.i,x),w=ne.call(Te,p)!==!1&&w}}return w&&!p.defaultPrevented}function Ru(a,l,d){if(typeof a=="function")d&&(a=_(a,d));else if(a&&typeof a.handleEvent=="function")a=_(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:u.setTimeout(a,l||0)}function bu(a){a.g=Ru(()=>{a.g=null,a.i&&(a.i=!1,bu(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class xp extends Tt{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:bu(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ur(a){Tt.call(this),this.h=a,this.g={}}C(ur,Tt);var Pu=[];function Su(a){K(a.g,function(l,d){this.g.hasOwnProperty(d)&&no(l)},a),a.g={}}ur.prototype.N=function(){ur.aa.N.call(this),Su(this)},ur.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var so=u.JSON.stringify,Op=u.JSON.parse,Mp=class{stringify(a){return u.JSON.stringify(a,void 0)}parse(a){return u.JSON.parse(a,void 0)}};function oo(){}oo.prototype.h=null;function Cu(a){return a.h||(a.h=a.i())}function Du(){}var cr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ao(){Ae.call(this,"d")}C(ao,Ae);function uo(){Ae.call(this,"c")}C(uo,Ae);var Gt={},Vu=null;function Ei(){return Vu=Vu||new Re}Gt.La="serverreachability";function ku(a){Ae.call(this,Gt.La,a)}C(ku,Ae);function lr(a){const l=Ei();De(l,new ku(l))}Gt.STAT_EVENT="statevent";function Nu(a,l){Ae.call(this,Gt.STAT_EVENT,a),this.stat=l}C(Nu,Ae);function Ve(a){const l=Ei();De(l,new Nu(l,a))}Gt.Ma="timingevent";function xu(a,l){Ae.call(this,Gt.Ma,a),this.size=l}C(xu,Ae);function hr(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){a()},l)}function dr(){this.g=!0}dr.prototype.xa=function(){this.g=!1};function Lp(a,l,d,p,w,P){a.info(function(){if(a.g)if(P)for(var x="",ne=P.split("&"),Te=0;Te<ne.length;Te++){var Z=ne[Te].split("=");if(1<Z.length){var be=Z[0];Z=Z[1];var Pe=be.split("_");x=2<=Pe.length&&Pe[1]=="type"?x+(be+"="+Z+"&"):x+(be+"=redacted&")}}else x=null;else x=P;return"XMLHTTP REQ ("+p+") [attempt "+w+"]: "+l+`
`+d+`
`+x})}function Fp(a,l,d,p,w,P,x){a.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+w+"]: "+l+`
`+d+`
`+P+" "+x})}function Rn(a,l,d,p){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+Bp(a,d)+(p?" "+p:"")})}function Up(a,l){a.info(function(){return"TIMEOUT: "+l})}dr.prototype.info=function(){};function Bp(a,l){if(!a.g)return l;if(!l)return null;try{var d=JSON.parse(l);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var p=d[a];if(!(2>p.length)){var w=p[1];if(Array.isArray(w)&&!(1>w.length)){var P=w[0];if(P!="noop"&&P!="stop"&&P!="close")for(var x=1;x<w.length;x++)w[x]=""}}}}return so(d)}catch{return l}}var vi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Ou={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},co;function wi(){}C(wi,oo),wi.prototype.g=function(){return new XMLHttpRequest},wi.prototype.i=function(){return{}},co=new wi;function Et(a,l,d,p){this.j=a,this.i=l,this.l=d,this.R=p||1,this.U=new ur(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Mu}function Mu(){this.i=null,this.g="",this.h=!1}var Lu={},lo={};function ho(a,l,d){a.L=1,a.v=Pi(rt(l)),a.m=d,a.P=!0,Fu(a,null)}function Fu(a,l){a.F=Date.now(),Ai(a),a.A=rt(a.v);var d=a.A,p=a.R;Array.isArray(p)||(p=[String(p)]),Xu(d.i,"t",p),a.C=0,d=a.j.J,a.h=new Mu,a.g=gc(a.j,d?l:null,!a.m),0<a.O&&(a.M=new xp(_(a.Y,a,a.g),a.O)),l=a.U,d=a.g,p=a.ca;var w="readystatechange";Array.isArray(w)||(w&&(Pu[0]=w.toString()),w=Pu);for(var P=0;P<w.length;P++){var x=Eu(d,w[P],p||l.handleEvent,!1,l.h||l);if(!x)break;l.g[x.key]=x}l=a.H?g(a.H):{},a.m?(a.u||(a.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,l)):(a.u="GET",a.g.ea(a.A,a.u,null,l)),lr(),Lp(a.i,a.u,a.A,a.l,a.R,a.m)}Et.prototype.ca=function(a){a=a.target;const l=this.M;l&&it(a)==3?l.j():this.Y(a)},Et.prototype.Y=function(a){try{if(a==this.g)e:{const Pe=it(this.g);var l=this.g.Ba();const Sn=this.g.Z();if(!(3>Pe)&&(Pe!=3||this.g&&(this.h.h||this.g.oa()||sc(this.g)))){this.J||Pe!=4||l==7||(l==8||0>=Sn?lr(3):lr(2)),fo(this);var d=this.g.Z();this.X=d;t:if(Uu(this)){var p=sc(this.g);a="";var w=p.length,P=it(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Kt(this),fr(this);var x="";break t}this.h.i=new u.TextDecoder}for(l=0;l<w;l++)this.h.h=!0,a+=this.h.i.decode(p[l],{stream:!(P&&l==w-1)});p.length=0,this.h.g+=a,this.C=0,x=this.h.g}else x=this.g.oa();if(this.o=d==200,Fp(this.i,this.u,this.A,this.l,this.R,Pe,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ne,Te=this.g;if((ne=Te.g?Te.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!B(ne)){var Z=ne;break t}}Z=null}if(d=Z)Rn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,po(this,d);else{this.o=!1,this.s=3,Ve(12),Kt(this),fr(this);break e}}if(this.P){d=!0;let Ge;for(;!this.J&&this.C<x.length;)if(Ge=qp(this,x),Ge==lo){Pe==4&&(this.s=4,Ve(14),d=!1),Rn(this.i,this.l,null,"[Incomplete Response]");break}else if(Ge==Lu){this.s=4,Ve(15),Rn(this.i,this.l,x,"[Invalid Chunk]"),d=!1;break}else Rn(this.i,this.l,Ge,null),po(this,Ge);if(Uu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Pe!=4||x.length!=0||this.h.h||(this.s=1,Ve(16),d=!1),this.o=this.o&&d,!d)Rn(this.i,this.l,x,"[Invalid Chunked Response]"),Kt(this),fr(this);else if(0<x.length&&!this.W){this.W=!0;var be=this.j;be.g==this&&be.ba&&!be.M&&(be.j.info("Great, no buffering proxy detected. Bytes received: "+x.length),To(be),be.M=!0,Ve(11))}}else Rn(this.i,this.l,x,null),po(this,x);Pe==4&&Kt(this),this.o&&!this.J&&(Pe==4?dc(this.j,this):(this.o=!1,Ai(this)))}else im(this.g),d==400&&0<x.indexOf("Unknown SID")?(this.s=3,Ve(12)):(this.s=0,Ve(13)),Kt(this),fr(this)}}}catch{}finally{}};function Uu(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function qp(a,l){var d=a.C,p=l.indexOf(`
`,d);return p==-1?lo:(d=Number(l.substring(d,p)),isNaN(d)?Lu:(p+=1,p+d>l.length?lo:(l=l.slice(p,p+d),a.C=p+d,l)))}Et.prototype.cancel=function(){this.J=!0,Kt(this)};function Ai(a){a.S=Date.now()+a.I,Bu(a,a.I)}function Bu(a,l){if(a.B!=null)throw Error("WatchDog timer not null");a.B=hr(_(a.ba,a),l)}function fo(a){a.B&&(u.clearTimeout(a.B),a.B=null)}Et.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Up(this.i,this.A),this.L!=2&&(lr(),Ve(17)),Kt(this),this.s=2,fr(this)):Bu(this,this.S-a)};function fr(a){a.j.G==0||a.J||dc(a.j,a)}function Kt(a){fo(a);var l=a.M;l&&typeof l.ma=="function"&&l.ma(),a.M=null,Su(a.U),a.g&&(l=a.g,a.g=null,l.abort(),l.ma())}function po(a,l){try{var d=a.j;if(d.G!=0&&(d.g==a||mo(d.h,a))){if(!a.K&&mo(d.h,a)&&d.G==3){try{var p=d.Da.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var w=p;if(w[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)Ni(d),Vi(d);else break e;Io(d),Ve(18)}}else d.za=w[1],0<d.za-d.T&&37500>w[2]&&d.F&&d.v==0&&!d.C&&(d.C=hr(_(d.Za,d),6e3));if(1>=$u(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Ht(d,11)}else if((a.K||d.g==a)&&Ni(d),!B(l))for(w=d.Da.g.parse(l),l=0;l<w.length;l++){let Z=w[l];if(d.T=Z[0],Z=Z[1],d.G==2)if(Z[0]=="c"){d.K=Z[1],d.ia=Z[2];const be=Z[3];be!=null&&(d.la=be,d.j.info("VER="+d.la));const Pe=Z[4];Pe!=null&&(d.Aa=Pe,d.j.info("SVER="+d.Aa));const Sn=Z[5];Sn!=null&&typeof Sn=="number"&&0<Sn&&(p=1.5*Sn,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const Ge=a.g;if(Ge){const Oi=Ge.g?Ge.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Oi){var P=p.h;P.g||Oi.indexOf("spdy")==-1&&Oi.indexOf("quic")==-1&&Oi.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(go(P,P.h),P.h=null))}if(p.D){const Eo=Ge.g?Ge.g.getResponseHeader("X-HTTP-Session-Id"):null;Eo&&(p.ya=Eo,ie(p.I,p.D,Eo))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var x=a;if(p.qa=mc(p,p.J?p.ia:null,p.W),x.K){zu(p.h,x);var ne=x,Te=p.L;Te&&(ne.I=Te),ne.B&&(fo(ne),Ai(ne)),p.g=x}else lc(p);0<d.i.length&&ki(d)}else Z[0]!="stop"&&Z[0]!="close"||Ht(d,7);else d.G==3&&(Z[0]=="stop"||Z[0]=="close"?Z[0]=="stop"?Ht(d,7):yo(d):Z[0]!="noop"&&d.l&&d.l.ta(Z),d.v=0)}}lr(4)}catch{}}var jp=class{constructor(a,l){this.g=a,this.map=l}};function qu(a){this.l=a||10,u.PerformanceNavigationTiming?(a=u.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ju(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function $u(a){return a.h?1:a.g?a.g.size:0}function mo(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function go(a,l){a.g?a.g.add(l):a.h=l}function zu(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}qu.prototype.cancel=function(){if(this.i=Gu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Gu(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.D);return l}return k(a.i)}function $p(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(c(a)){for(var l=[],d=a.length,p=0;p<d;p++)l.push(a[p]);return l}l=[],d=0;for(p in a)l[d++]=a[p];return l}function zp(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(c(a)||typeof a=="string"){var l=[];a=a.length;for(var d=0;d<a;d++)l.push(d);return l}l=[],d=0;for(const p in a)l[d++]=p;return l}}}function Ku(a,l){if(a.forEach&&typeof a.forEach=="function")a.forEach(l,void 0);else if(c(a)||typeof a=="string")Array.prototype.forEach.call(a,l,void 0);else for(var d=zp(a),p=$p(a),w=p.length,P=0;P<w;P++)l.call(void 0,p[P],d&&d[P],a)}var Wu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Gp(a,l){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var p=a[d].indexOf("="),w=null;if(0<=p){var P=a[d].substring(0,p);w=a[d].substring(p+1)}else P=a[d];l(P,w?decodeURIComponent(w.replace(/\+/g," ")):"")}}}function Wt(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Wt){this.h=a.h,Ri(this,a.j),this.o=a.o,this.g=a.g,bi(this,a.s),this.l=a.l;var l=a.i,d=new gr;d.i=l.i,l.g&&(d.g=new Map(l.g),d.h=l.h),Hu(this,d),this.m=a.m}else a&&(l=String(a).match(Wu))?(this.h=!1,Ri(this,l[1]||"",!0),this.o=pr(l[2]||""),this.g=pr(l[3]||"",!0),bi(this,l[4]),this.l=pr(l[5]||"",!0),Hu(this,l[6]||"",!0),this.m=pr(l[7]||"")):(this.h=!1,this.i=new gr(null,this.h))}Wt.prototype.toString=function(){var a=[],l=this.j;l&&a.push(mr(l,Qu,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(mr(l,Qu,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(mr(d,d.charAt(0)=="/"?Hp:Wp,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",mr(d,Jp)),a.join("")};function rt(a){return new Wt(a)}function Ri(a,l,d){a.j=d?pr(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function bi(a,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);a.s=l}else a.s=null}function Hu(a,l,d){l instanceof gr?(a.i=l,Yp(a.i,a.h)):(d||(l=mr(l,Qp)),a.i=new gr(l,a.h))}function ie(a,l,d){a.i.set(l,d)}function Pi(a){return ie(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function pr(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function mr(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,Kp),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Kp(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Qu=/[#\/\?@]/g,Wp=/[#\?:]/g,Hp=/[#\?]/g,Qp=/[#\?@]/g,Jp=/#/g;function gr(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function vt(a){a.g||(a.g=new Map,a.h=0,a.i&&Gp(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=gr.prototype,r.add=function(a,l){vt(this),this.i=null,a=bn(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function Ju(a,l){vt(a),l=bn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function Yu(a,l){return vt(a),l=bn(a,l),a.g.has(l)}r.forEach=function(a,l){vt(this),this.g.forEach(function(d,p){d.forEach(function(w){a.call(l,w,p,this)},this)},this)},r.na=function(){vt(this);const a=Array.from(this.g.values()),l=Array.from(this.g.keys()),d=[];for(let p=0;p<l.length;p++){const w=a[p];for(let P=0;P<w.length;P++)d.push(l[p])}return d},r.V=function(a){vt(this);let l=[];if(typeof a=="string")Yu(this,a)&&(l=l.concat(this.g.get(bn(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)l=l.concat(a[d])}return l},r.set=function(a,l){return vt(this),this.i=null,a=bn(this,a),Yu(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},r.get=function(a,l){return a?(a=this.V(a),0<a.length?String(a[0]):l):l};function Xu(a,l,d){Ju(a,l),0<d.length&&(a.i=null,a.g.set(bn(a,l),k(d)),a.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(var d=0;d<l.length;d++){var p=l[d];const P=encodeURIComponent(String(p)),x=this.V(p);for(p=0;p<x.length;p++){var w=P;x[p]!==""&&(w+="="+encodeURIComponent(String(x[p]))),a.push(w)}}return this.i=a.join("&")};function bn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function Yp(a,l){l&&!a.j&&(vt(a),a.i=null,a.g.forEach(function(d,p){var w=p.toLowerCase();p!=w&&(Ju(this,p),Xu(this,w,d))},a)),a.j=l}function Xp(a,l){const d=new dr;if(u.Image){const p=new Image;p.onload=b(wt,d,"TestLoadImage: loaded",!0,l,p),p.onerror=b(wt,d,"TestLoadImage: error",!1,l,p),p.onabort=b(wt,d,"TestLoadImage: abort",!1,l,p),p.ontimeout=b(wt,d,"TestLoadImage: timeout",!1,l,p),u.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=a}else l(!1)}function Zp(a,l){const d=new dr,p=new AbortController,w=setTimeout(()=>{p.abort(),wt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:p.signal}).then(P=>{clearTimeout(w),P.ok?wt(d,"TestPingServer: ok",!0,l):wt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(w),wt(d,"TestPingServer: error",!1,l)})}function wt(a,l,d,p,w){try{w&&(w.onload=null,w.onerror=null,w.onabort=null,w.ontimeout=null),p(d)}catch{}}function em(){this.g=new Mp}function tm(a,l,d){const p=d||"";try{Ku(a,function(w,P){let x=w;h(w)&&(x=so(w)),l.push(p+P+"="+encodeURIComponent(x))})}catch(w){throw l.push(p+"type="+encodeURIComponent("_badmap")),w}}function Si(a){this.l=a.Ub||null,this.j=a.eb||!1}C(Si,oo),Si.prototype.g=function(){return new Ci(this.l,this.j)},Si.prototype.i=(function(a){return function(){return a}})({});function Ci(a,l){Re.call(this),this.D=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(Ci,Re),r=Ci.prototype,r.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=l,this.readyState=1,yr(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(l.body=a),(this.D||u).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,_r(this)),this.readyState=0},r.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,yr(this)),this.g&&(this.readyState=3,yr(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Zu(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Zu(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}r.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?_r(this):yr(this),this.readyState==3&&Zu(this)}},r.Ra=function(a){this.g&&(this.response=this.responseText=a,_r(this))},r.Qa=function(a){this.g&&(this.response=a,_r(this))},r.ga=function(){this.g&&_r(this)};function _r(a){a.readyState=4,a.l=null,a.j=null,a.v=null,yr(a)}r.setRequestHeader=function(a,l){this.u.append(a,l)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function yr(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Ci.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function ec(a){let l="";return K(a,function(d,p){l+=p,l+=":",l+=d,l+=`\r
`}),l}function _o(a,l,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=ec(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):ie(a,l,d))}function le(a){Re.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(le,Re);var nm=/^https?$/i,rm=["POST","PUT"];r=le.prototype,r.Ha=function(a){this.J=a},r.ea=function(a,l,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():co.g(),this.v=this.o?Cu(this.o):Cu(co),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(P){tc(this,P);return}if(a=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var w in p)d.set(w,p[w]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const P of p.keys())d.set(P,p.get(P));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(P=>P.toLowerCase()=="content-type"),w=u.FormData&&a instanceof u.FormData,!(0<=Array.prototype.indexOf.call(rm,l,void 0))||p||w||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,x]of d)this.g.setRequestHeader(P,x);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{ic(this),this.u=!0,this.g.send(a),this.u=!1}catch(P){tc(this,P)}};function tc(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.m=5,nc(a),Di(a)}function nc(a){a.A||(a.A=!0,De(a,"complete"),De(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,De(this,"complete"),De(this,"abort"),Di(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Di(this,!0)),le.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?rc(this):this.bb())},r.bb=function(){rc(this)};function rc(a){if(a.h&&typeof o<"u"&&(!a.v[1]||it(a)!=4||a.Z()!=2)){if(a.u&&it(a)==4)Ru(a.Ea,0,a);else if(De(a,"readystatechange"),it(a)==4){a.h=!1;try{const x=a.Z();e:switch(x){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var p;if(p=x===0){var w=String(a.D).match(Wu)[1]||null;!w&&u.self&&u.self.location&&(w=u.self.location.protocol.slice(0,-1)),p=!nm.test(w?w.toLowerCase():"")}d=p}if(d)De(a,"complete"),De(a,"success");else{a.m=6;try{var P=2<it(a)?a.g.statusText:""}catch{P=""}a.l=P+" ["+a.Z()+"]",nc(a)}}finally{Di(a)}}}}function Di(a,l){if(a.g){ic(a);const d=a.g,p=a.v[0]?()=>{}:null;a.g=null,a.v=null,l||De(a,"ready");try{d.onreadystatechange=p}catch{}}}function ic(a){a.I&&(u.clearTimeout(a.I),a.I=null)}r.isActive=function(){return!!this.g};function it(a){return a.g?a.g.readyState:0}r.Z=function(){try{return 2<it(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),Op(l)}};function sc(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function im(a){const l={};a=(a.g&&2<=it(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<a.length;p++){if(B(a[p]))continue;var d=v(a[p]);const w=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const P=l[w]||[];l[w]=P,P.push(d)}T(l,function(p){return p.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ir(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function oc(a){this.Aa=0,this.i=[],this.j=new dr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ir("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ir("baseRetryDelayMs",5e3,a),this.cb=Ir("retryDelaySeedMs",1e4,a),this.Wa=Ir("forwardChannelMaxRetries",2,a),this.wa=Ir("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new qu(a&&a.concurrentRequestLimit),this.Da=new em,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=oc.prototype,r.la=8,r.G=1,r.connect=function(a,l,d,p){Ve(0),this.W=a,this.H=l||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=mc(this,null,this.W),ki(this)};function yo(a){if(ac(a),a.G==3){var l=a.U++,d=rt(a.I);if(ie(d,"SID",a.K),ie(d,"RID",l),ie(d,"TYPE","terminate"),Tr(a,d),l=new Et(a,a.j,l),l.L=2,l.v=Pi(rt(d)),d=!1,u.navigator&&u.navigator.sendBeacon)try{d=u.navigator.sendBeacon(l.v.toString(),"")}catch{}!d&&u.Image&&(new Image().src=l.v,d=!0),d||(l.g=gc(l.j,null),l.g.ea(l.v)),l.F=Date.now(),Ai(l)}pc(a)}function Vi(a){a.g&&(To(a),a.g.cancel(),a.g=null)}function ac(a){Vi(a),a.u&&(u.clearTimeout(a.u),a.u=null),Ni(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&u.clearTimeout(a.s),a.s=null)}function ki(a){if(!ju(a.h)&&!a.s){a.s=!0;var l=a.Ga;sr||Tu(),or||(sr(),or=!0),Ys.add(l,a),a.B=0}}function sm(a,l){return $u(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=l.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=hr(_(a.Ga,a,l),fc(a,a.B)),a.B++,!0)}r.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const w=new Et(this,this.j,a);let P=this.o;if(this.S&&(P?(P=g(P),E(P,this.S)):P=this.S),this.m!==null||this.O||(w.H=P,P=null),this.P)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,4096<l){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=cc(this,w,l),d=rt(this.I),ie(d,"RID",a),ie(d,"CVER",22),this.D&&ie(d,"X-HTTP-Session-Id",this.D),Tr(this,d),P&&(this.O?l="headers="+encodeURIComponent(String(ec(P)))+"&"+l:this.m&&_o(d,this.m,P)),go(this.h,w),this.Ua&&ie(d,"TYPE","init"),this.P?(ie(d,"$req",l),ie(d,"SID","null"),w.T=!0,ho(w,d,null)):ho(w,d,l),this.G=2}}else this.G==3&&(a?uc(this,a):this.i.length==0||ju(this.h)||uc(this))};function uc(a,l){var d;l?d=l.l:d=a.U++;const p=rt(a.I);ie(p,"SID",a.K),ie(p,"RID",d),ie(p,"AID",a.T),Tr(a,p),a.m&&a.o&&_o(p,a.m,a.o),d=new Et(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),l&&(a.i=l.D.concat(a.i)),l=cc(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),go(a.h,d),ho(d,p,l)}function Tr(a,l){a.H&&K(a.H,function(d,p){ie(l,p,d)}),a.l&&Ku({},function(d,p){ie(l,p,d)})}function cc(a,l,d){d=Math.min(a.i.length,d);var p=a.l?_(a.l.Na,a.l,a):null;e:{var w=a.i;let P=-1;for(;;){const x=["count="+d];P==-1?0<d?(P=w[0].g,x.push("ofs="+P)):P=0:x.push("ofs="+P);let ne=!0;for(let Te=0;Te<d;Te++){let Z=w[Te].g;const be=w[Te].map;if(Z-=P,0>Z)P=Math.max(0,w[Te].g-100),ne=!1;else try{tm(be,x,"req"+Z+"_")}catch{p&&p(be)}}if(ne){p=x.join("&");break e}}}return a=a.i.splice(0,d),l.D=a,p}function lc(a){if(!a.g&&!a.u){a.Y=1;var l=a.Fa;sr||Tu(),or||(sr(),or=!0),Ys.add(l,a),a.v=0}}function Io(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=hr(_(a.Fa,a),fc(a,a.v)),a.v++,!0)}r.Fa=function(){if(this.u=null,hc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=hr(_(this.ab,this),a)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ve(10),Vi(this),hc(this))};function To(a){a.A!=null&&(u.clearTimeout(a.A),a.A=null)}function hc(a){a.g=new Et(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var l=rt(a.qa);ie(l,"RID","rpc"),ie(l,"SID",a.K),ie(l,"AID",a.T),ie(l,"CI",a.F?"0":"1"),!a.F&&a.ja&&ie(l,"TO",a.ja),ie(l,"TYPE","xmlhttp"),Tr(a,l),a.m&&a.o&&_o(l,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=Pi(rt(l)),d.m=null,d.P=!0,Fu(d,a)}r.Za=function(){this.C!=null&&(this.C=null,Vi(this),Io(this),Ve(19))};function Ni(a){a.C!=null&&(u.clearTimeout(a.C),a.C=null)}function dc(a,l){var d=null;if(a.g==l){Ni(a),To(a),a.g=null;var p=2}else if(mo(a.h,l))d=l.D,zu(a.h,l),p=1;else return;if(a.G!=0){if(l.o)if(p==1){d=l.m?l.m.length:0,l=Date.now()-l.F;var w=a.B;p=Ei(),De(p,new xu(p,d)),ki(a)}else lc(a);else if(w=l.s,w==3||w==0&&0<l.X||!(p==1&&sm(a,l)||p==2&&Io(a)))switch(d&&0<d.length&&(l=a.h,l.i=l.i.concat(d)),w){case 1:Ht(a,5);break;case 4:Ht(a,10);break;case 3:Ht(a,6);break;default:Ht(a,2)}}}function fc(a,l){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*l}function Ht(a,l){if(a.j.info("Error code "+l),l==2){var d=_(a.fb,a),p=a.Xa;const w=!p;p=new Wt(p||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||Ri(p,"https"),Pi(p),w?Xp(p.toString(),d):Zp(p.toString(),d)}else Ve(2);a.G=0,a.l&&a.l.sa(l),pc(a),ac(a)}r.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Ve(2)):(this.j.info("Failed to ping google.com"),Ve(1))};function pc(a){if(a.G=0,a.ka=[],a.l){const l=Gu(a.h);(l.length!=0||a.i.length!=0)&&(D(a.ka,l),D(a.ka,a.i),a.h.i.length=0,k(a.i),a.i.length=0),a.l.ra()}}function mc(a,l,d){var p=d instanceof Wt?rt(d):new Wt(d);if(p.g!="")l&&(p.g=l+"."+p.g),bi(p,p.s);else{var w=u.location;p=w.protocol,l=l?l+"."+w.hostname:w.hostname,w=+w.port;var P=new Wt(null);p&&Ri(P,p),l&&(P.g=l),w&&bi(P,w),d&&(P.l=d),p=P}return d=a.D,l=a.ya,d&&l&&ie(p,d,l),ie(p,"VER",a.la),Tr(a,p),p}function gc(a,l,d){if(l&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Ca&&!a.pa?new le(new Si({eb:d})):new le(a.pa),l.Ha(a.J),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function _c(){}r=_c.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function xi(){}xi.prototype.g=function(a,l){return new Le(a,l)};function Le(a,l){Re.call(this),this.g=new oc(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(a?a["X-WebChannel-Client-Profile"]=l.va:a={"X-WebChannel-Client-Profile":l.va}),this.g.S=a,(a=l&&l.Sb)&&!B(a)&&(this.g.m=a),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!B(l)&&(this.g.D=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new Pn(this)}C(Le,Re),Le.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Le.prototype.close=function(){yo(this.g)},Le.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=so(a),a=d);l.i.push(new jp(l.Ya++,a)),l.G==3&&ki(l)},Le.prototype.N=function(){this.g.l=null,delete this.j,yo(this.g),delete this.g,Le.aa.N.call(this)};function yc(a){ao.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const d in l){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}C(yc,ao);function Ic(){uo.call(this),this.status=1}C(Ic,uo);function Pn(a){this.g=a}C(Pn,_c),Pn.prototype.ua=function(){De(this.g,"a")},Pn.prototype.ta=function(a){De(this.g,new yc(a))},Pn.prototype.sa=function(a){De(this.g,new Ic)},Pn.prototype.ra=function(){De(this.g,"b")},xi.prototype.createWebChannel=xi.prototype.g,Le.prototype.send=Le.prototype.o,Le.prototype.open=Le.prototype.m,Le.prototype.close=Le.prototype.close,dd=function(){return new xi},hd=function(){return Ei()},ld=Gt,$o={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},vi.NO_ERROR=0,vi.TIMEOUT=8,vi.HTTP_ERROR=6,Ji=vi,Ou.COMPLETE="complete",cd=Ou,Du.EventType=cr,cr.OPEN="a",cr.CLOSE="b",cr.ERROR="c",cr.MESSAGE="d",Re.prototype.listen=Re.prototype.K,Dr=Du,le.prototype.listenOnce=le.prototype.L,le.prototype.getLastError=le.prototype.Ka,le.prototype.getLastErrorCode=le.prototype.Ba,le.prototype.getStatus=le.prototype.Z,le.prototype.getResponseJson=le.prototype.Oa,le.prototype.getResponseText=le.prototype.oa,le.prototype.send=le.prototype.ea,le.prototype.setWithCredentials=le.prototype.Ha,ud=le}).apply(typeof Li<"u"?Li:typeof self<"u"?self:typeof window<"u"?window:{});const Yc="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ee.UNAUTHENTICATED=new Ee(null),Ee.GOOGLE_CREDENTIALS=new Ee("google-credentials-uid"),Ee.FIRST_PARTY=new Ee("first-party-uid"),Ee.MOCK_USER=new Ee("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zn="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cn=new la("@firebase/firestore");function Nn(){return cn.logLevel}function V(r,...e){if(cn.logLevel<=H.DEBUG){const t=e.map(Aa);cn.debug(`Firestore (${Zn}): ${r}`,...t)}}function Ne(r,...e){if(cn.logLevel<=H.ERROR){const t=e.map(Aa);cn.error(`Firestore (${Zn}): ${r}`,...t)}}function ln(r,...e){if(cn.logLevel<=H.WARN){const t=e.map(Aa);cn.warn(`Firestore (${Zn}): ${r}`,...t)}}function Aa(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(t){return JSON.stringify(t)})(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(r="Unexpected state"){const e=`FIRESTORE (${Zn}) INTERNAL ASSERTION FAILED: `+r;throw Ne(e),new Error(e)}function F(r,e){r||M()}function z(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends tt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Hy{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Ee.UNAUTHENTICATED)))}shutdown(){}}class Qy{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class Jy{constructor(e){this.t=e,this.currentUser=Ee.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){F(this.o===void 0);let n=this.i;const i=c=>this.i!==n?(n=this.i,t(c)):Promise.resolve();let s=new He;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new He,e.enqueueRetryable((()=>i(this.currentUser)))};const o=()=>{const c=s;e.enqueueRetryable((async()=>{await c.promise,await i(this.currentUser)}))},u=c=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((c=>u(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?u(c):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new He)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((n=>this.i!==e?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(F(typeof n.accessToken=="string"),new fd(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return F(e===null||typeof e=="string"),new Ee(e)}}class Yy{constructor(e,t,n){this.l=e,this.h=t,this.P=n,this.type="FirstParty",this.user=Ee.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Xy{constructor(e,t,n){this.l=e,this.h=t,this.P=n}getToken(){return Promise.resolve(new Yy(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable((()=>t(Ee.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Zy{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class eI{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){F(this.o===void 0);const n=s=>{s.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,V("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable((()=>n(s)))};const i=s=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit((s=>i(s))),setTimeout((()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(F(typeof t.token=="string"),this.R=t.token,new Zy(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tI(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let n="";for(;n.length<20;){const i=tI(40);for(let s=0;s<i.length;++s)n.length<20&&i[s]<t&&(n+=e.charAt(i[s]%e.length))}return n}}function G(r,e){return r<e?-1:r>e?1:0}function zn(r,e,t){return r.length===e.length&&r.every(((n,i)=>t(n,e[i])))}function md(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new N(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new N(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new N(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new N(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ce.fromMillis(Date.now())}static fromDate(e){return ce.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new ce(t,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?G(this.nanoseconds,e.nanoseconds):G(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(e){this.timestamp=e}static fromTimestamp(e){return new U(e)}static min(){return new U(new ce(0,0))}static max(){return new U(new ce(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{constructor(e,t,n){t===void 0?t=0:t>e.length&&M(),n===void 0?n=e.length-t:n>e.length-t&&M(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return zr.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof zr?e.forEach((n=>{t.push(n)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let i=0;i<n;i++){const s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class X extends zr{construct(e,t,n){return new X(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new N(S.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((i=>i.length>0)))}return new X(t)}static emptyPath(){return new X([])}}const nI=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ue extends zr{construct(e,t,n){return new ue(e,t,n)}static isValidIdentifier(e){return nI.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ue.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ue(["__name__"])}static fromServerFormat(e){const t=[];let n="",i=0;const s=()=>{if(n.length===0)throw new N(S.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;i<e.length;){const u=e[i];if(u==="\\"){if(i+1===e.length)throw new N(S.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new N(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=c,i+=2}else u==="`"?(o=!o,i++):u!=="."||o?(n+=u,i++):(s(),i++)}if(s(),o)throw new N(S.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ue(t)}static emptyPath(){return new ue([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e){this.path=e}static fromPath(e){return new O(X.fromString(e))}static fromName(e){return new O(X.fromString(e).popFirst(5))}static empty(){return new O(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&X.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return X.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new O(new X(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fs{constructor(e,t,n,i){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=i}}function zo(r){return r.fields.find((e=>e.kind===2))}function Yt(r){return r.fields.filter((e=>e.kind!==2))}fs.UNKNOWN_ID=-1;class Yi{constructor(e,t){this.fieldPath=e,this.kind=t}}class Gr{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Gr(0,Be.min())}}function rI(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,i=U.fromTimestamp(n===1e9?new ce(t+1,0):new ce(t,n));return new Be(i,O.empty(),e)}function gd(r){return new Be(r.readTime,r.key,-1)}class Be{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Be(U.min(),O.empty(),-1)}static max(){return new Be(U.max(),O.empty(),-1)}}function Ra(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=O.comparator(r.documentKey,e.documentKey),t!==0?t:G(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _d="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class yd{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function En(r){if(r.code!==S.FAILED_PRECONDITION||r.message!==_d)throw r;V("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&M(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new A(((n,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(n,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(n,i)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof A?t:A.resolve(t)}catch(t){return A.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):A.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):A.reject(t)}static resolve(e){return new A(((t,n)=>{t(e)}))}static reject(e){return new A(((t,n)=>{n(e)}))}static waitFor(e){return new A(((t,n)=>{let i=0,s=0,o=!1;e.forEach((u=>{++i,u.next((()=>{++s,o&&s===i&&t()}),(c=>n(c)))})),o=!0,s===i&&t()}))}static or(e){let t=A.resolve(!1);for(const n of e)t=t.next((i=>i?A.resolve(i):n()));return t}static forEach(e,t){const n=[];return e.forEach(((i,s)=>{n.push(t.call(this,i,s))})),this.waitFor(n)}static mapArray(e,t){return new A(((n,i)=>{const s=e.length,o=new Array(s);let u=0;for(let c=0;c<s;c++){const h=c;t(e[h]).next((f=>{o[h]=f,++u,u===s&&n(o)}),(f=>i(f)))}}))}static doWhile(e,t){return new A(((n,i)=>{const s=()=>{e()===!0?t().next((()=>{s()}),i):n()};s()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new He,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new Or(e,t.error)):this.V.resolve()},this.transaction.onerror=n=>{const i=ba(n.target.error);this.V.reject(new Or(e,i))}}static open(e,t,n,i){try{return new Ss(t,e.transaction(i,n))}catch(s){throw new Or(t,s)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(V("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new sI(t)}}class Mt{constructor(e,t,n){this.name=e,this.version=t,this.p=n,Mt.S(ge())===12.2&&Ne("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return V("SimpleDb","Removing database:",e),Xt(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!Eh())return!1;if(Mt.v())return!0;const e=ge(),t=Mt.S(e),n=0<t&&t<10,i=Id(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||s)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,t){return e.store(t)}static S(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}async M(e){return this.db||(V("SimpleDb","Opening database:",this.name),this.db=await new Promise(((t,n)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;t(o)},i.onblocked=()=>{n(new Or(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?n(new N(S.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new N(S.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new Or(e,o))},i.onupgradeneeded=s=>{V("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.p.O(o,i.transaction,s.oldVersion,this.version).next((()=>{V("SimpleDb","Database upgrade to version "+this.version+" complete")}))}}))),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,i){const s=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.M(e);const u=Ss.open(this.db,e,s?"readonly":"readwrite",n),c=i(u).next((h=>(u.g(),h))).catch((h=>(u.abort(h),A.reject(h)))).toPromise();return c.catch((()=>{})),await u.m,c}catch(u){const c=u,h=c.name!=="FirebaseError"&&o<3;if(V("SimpleDb","Transaction failed with error:",c.message,"Retrying:",h),this.close(),!h)return Promise.reject(c)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Id(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class iI{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return Xt(this.B.delete())}}class Or extends N{constructor(e,t){super(S.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function $t(r){return r.name==="IndexedDbTransactionError"}class sI{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(V("SimpleDb","PUT",this.store.name,e,t),n=this.store.put(t,e)):(V("SimpleDb","PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),Xt(n)}add(e){return V("SimpleDb","ADD",this.store.name,e,e),Xt(this.store.add(e))}get(e){return Xt(this.store.get(e)).next((t=>(t===void 0&&(t=null),V("SimpleDb","GET",this.store.name,e,t),t)))}delete(e){return V("SimpleDb","DELETE",this.store.name,e),Xt(this.store.delete(e))}count(){return V("SimpleDb","COUNT",this.store.name),Xt(this.store.count())}U(e,t){const n=this.options(e,t),i=n.index?this.store.index(n.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(n.range);return new A(((o,u)=>{s.onerror=c=>{u(c.target.error)},s.onsuccess=c=>{o(c.target.result)}}))}{const s=this.cursor(n),o=[];return this.W(s,((u,c)=>{o.push(c)})).next((()=>o))}}G(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new A(((i,s)=>{n.onerror=o=>{s(o.target.error)},n.onsuccess=o=>{i(o.target.result)}}))}j(e,t){V("SimpleDb","DELETE ALL",this.store.name);const n=this.options(e,t);n.H=!1;const i=this.cursor(n);return this.W(i,((s,o,u)=>u.delete()))}J(e,t){let n;t?n=e:(n={},t=e);const i=this.cursor(n);return this.W(i,t)}Y(e){const t=this.cursor({});return new A(((n,i)=>{t.onerror=s=>{const o=ba(s.target.error);i(o)},t.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next((u=>{u?o.continue():n()})):n()}}))}W(e,t){const n=[];return new A(((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const u=o.target.result;if(!u)return void i();const c=new iI(u),h=t(u.primaryKey,u.value,c);if(h instanceof A){const f=h.catch((m=>(c.done(),A.reject(m))));n.push(f)}c.isDone?i():c.K===null?u.continue():u.continue(c.K)}})).next((()=>A.waitFor(n)))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.H?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Xt(r){return new A(((e,t)=>{r.onsuccess=n=>{const i=n.target.result;e(i)},r.onerror=n=>{const i=ba(n.target.error);t(i)}}))}let Xc=!1;function ba(r){const e=Mt.S(ge());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new N("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Xc||(Xc=!0,setTimeout((()=>{throw n}),0)),n}}return r}class oI{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){V("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{V("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){$t(t)?V("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await En(t)}await this.X(6e4)}))}}class aI{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.te(t,e)))}te(e,t){const n=new Set;let i=t,s=!0;return A.doWhile((()=>s===!0&&i>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((o=>{if(o!==null&&!n.has(o))return V("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,i).next((u=>{i-=u,n.add(o)}));s=!1})))).next((()=>t-i))}ne(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((i=>this.localStore.localDocuments.getNextDocuments(e,t,i,n).next((s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next((()=>this.re(i,s))).next((u=>(V("IndexBackfiller",`Updating offset: ${u}`),this.localStore.indexManager.updateCollectionGroup(e,t,u)))).next((()=>o.size))}))))}re(e,t){let n=e;return t.changes.forEach(((i,s)=>{const o=gd(s);Ra(o,n)>0&&(n=o)})),new Be(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ie(n),this.se=n=>t.writeSequenceNumber(n))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}je.oe=-1;function ui(r){return r==null}function Kr(r){return r===0&&1/r==-1/0}function uI(r){return typeof r=="number"&&Number.isInteger(r)&&!Kr(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=Zc(e)),e=cI(r.get(t),e);return Zc(e)}function cI(r,e){let t=e;const n=r.length;for(let i=0;i<n;i++){const s=r.charAt(i);switch(s){case"\0":t+="";break;case"":t+="";break;default:t+=s}}return t}function Zc(r){return r+""}function Qe(r){const e=r.length;if(F(e>=2),e===2)return F(r.charAt(0)===""&&r.charAt(1)===""),X.emptyPath();const t=e-2,n=[];let i="";for(let s=0;s<e;){const o=r.indexOf("",s);switch((o<0||o>t)&&M(),r.charAt(o+1)){case"":const u=r.substring(s,o);let c;i.length===0?c=u:(i+=u,c=i,i=""),n.push(c);break;case"":i+=r.substring(s,o),i+="\0";break;case"":i+=r.substring(s,o+1);break;default:M()}s=o+2}return new X(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const el=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xi(r,e){return[r,xe(e)]}function Td(r,e,t){return[r,xe(e),t]}const lI={},hI=["prefixPath","collectionGroup","readTime","documentId"],dI=["prefixPath","collectionGroup","documentId"],fI=["collectionGroup","readTime","prefixPath","documentId"],pI=["canonicalId","targetId"],mI=["targetId","path"],gI=["path","targetId"],_I=["collectionId","parent"],yI=["indexId","uid"],II=["uid","sequenceNumber"],TI=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],EI=["indexId","uid","orderedDocumentKey"],vI=["userId","collectionPath","documentId"],wI=["userId","collectionPath","largestBatchId"],AI=["userId","collectionGroup","largestBatchId"],Ed=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],RI=[...Ed,"documentOverlays"],vd=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],wd=vd,Pa=[...wd,"indexConfiguration","indexState","indexEntries"],bI=Pa,PI=[...Pa,"globals"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Go extends yd{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}}function _e(r,e){const t=z(r);return Mt.F(t._e,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tl(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function vn(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function Ad(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e,t){this.comparator=e,this.root=t||ve.EMPTY}insert(e,t){return new ae(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ve.BLACK,null,null))}remove(e){return new ae(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ve.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(e,n.key);if(i===0)return t+n.left.size;i<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Fi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Fi(this.root,e,this.comparator,!1)}getReverseIterator(){return new Fi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Fi(this.root,e,this.comparator,!0)}}class Fi{constructor(e,t,n,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ve{constructor(e,t,n,i,s){this.key=e,this.value=t,this.color=n??ve.RED,this.left=i??ve.EMPTY,this.right=s??ve.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,i,s){return new ve(e??this.key,t??this.value,n??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let i=this;const s=n(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,n),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return ve.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return ve.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ve.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ve.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw M();const e=this.left.check();if(e!==this.right.check())throw M();return e+(this.isRed()?0:1)}}ve.EMPTY=null,ve.RED=!0,ve.BLACK=!1;ve.EMPTY=new class{constructor(){this.size=0}get key(){throw M()}get value(){throw M()}get color(){throw M()}get left(){throw M()}get right(){throw M()}copy(e,t,n,i,s){return this}insert(e,t,n){return new ve(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(e){this.comparator=e,this.data=new ae(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new nl(this.data.getIterator())}getIteratorFrom(e){return new nl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((n=>{t=t.add(n)})),t}isEqual(e){if(!(e instanceof te)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=n.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new te(this.comparator);return t.data=e,t}}class nl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Cn(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(e){this.fields=e,e.sort(ue.comparator)}static empty(){return new Me([])}unionWith(e){let t=new te(ue.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Me(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return zn(this.fields,e.fields,((t,n)=>t.isEqual(n)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Rd("Invalid base64 string: "+s):s}})(e);return new me(t)}static fromUint8Array(e){const t=(function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s})(e);return new me(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const n=new Uint8Array(t.length);for(let i=0;i<t.length;i++)n[i]=t.charCodeAt(i);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return G(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}me.EMPTY_BYTE_STRING=new me("");const SI=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ft(r){if(F(!!r),typeof r=="string"){let e=0;const t=SI.exec(r);if(F(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:se(r.seconds),nanos:se(r.nanos)}}function se(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Ut(r){return typeof r=="string"?me.fromBase64String(r):me.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cs(r){var e,t;return((t=(((e=r==null?void 0:r.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Sa(r){const e=r.mapValue.fields.__previous_value__;return Cs(e)?Sa(e):e}function Wr(r){const e=ft(r.mapValue.fields.__local_write_time__.timestampValue);return new ce(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CI{constructor(e,t,n,i,s,o,u,c,h){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=u,this.longPollingOptions=c,this.useFetchStreams=h}}class hn{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new hn("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof hn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nt={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},Zi={nullValue:"NULL_VALUE"};function dn(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Cs(r)?4:bd(r)?9007199254740991:Ds(r)?10:11:M()}function et(r,e){if(r===e)return!0;const t=dn(r);if(t!==dn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return Wr(r).isEqual(Wr(e));case 3:return(function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=ft(i.timestampValue),u=ft(s.timestampValue);return o.seconds===u.seconds&&o.nanos===u.nanos})(r,e);case 5:return r.stringValue===e.stringValue;case 6:return(function(i,s){return Ut(i.bytesValue).isEqual(Ut(s.bytesValue))})(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return(function(i,s){return se(i.geoPointValue.latitude)===se(s.geoPointValue.latitude)&&se(i.geoPointValue.longitude)===se(s.geoPointValue.longitude)})(r,e);case 2:return(function(i,s){if("integerValue"in i&&"integerValue"in s)return se(i.integerValue)===se(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=se(i.doubleValue),u=se(s.doubleValue);return o===u?Kr(o)===Kr(u):isNaN(o)&&isNaN(u)}return!1})(r,e);case 9:return zn(r.arrayValue.values||[],e.arrayValue.values||[],et);case 10:case 11:return(function(i,s){const o=i.mapValue.fields||{},u=s.mapValue.fields||{};if(tl(o)!==tl(u))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(u[c]===void 0||!et(o[c],u[c])))return!1;return!0})(r,e);default:return M()}}function Hr(r,e){return(r.values||[]).find((t=>et(t,e)))!==void 0}function Bt(r,e){if(r===e)return 0;const t=dn(r),n=dn(e);if(t!==n)return G(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return G(r.booleanValue,e.booleanValue);case 2:return(function(s,o){const u=se(s.integerValue||s.doubleValue),c=se(o.integerValue||o.doubleValue);return u<c?-1:u>c?1:u===c?0:isNaN(u)?isNaN(c)?0:-1:1})(r,e);case 3:return rl(r.timestampValue,e.timestampValue);case 4:return rl(Wr(r),Wr(e));case 5:return G(r.stringValue,e.stringValue);case 6:return(function(s,o){const u=Ut(s),c=Ut(o);return u.compareTo(c)})(r.bytesValue,e.bytesValue);case 7:return(function(s,o){const u=s.split("/"),c=o.split("/");for(let h=0;h<u.length&&h<c.length;h++){const f=G(u[h],c[h]);if(f!==0)return f}return G(u.length,c.length)})(r.referenceValue,e.referenceValue);case 8:return(function(s,o){const u=G(se(s.latitude),se(o.latitude));return u!==0?u:G(se(s.longitude),se(o.longitude))})(r.geoPointValue,e.geoPointValue);case 9:return il(r.arrayValue,e.arrayValue);case 10:return(function(s,o){var u,c,h,f;const m=s.fields||{},_=o.fields||{},b=(u=m.value)===null||u===void 0?void 0:u.arrayValue,C=(c=_.value)===null||c===void 0?void 0:c.arrayValue,k=G(((h=b==null?void 0:b.values)===null||h===void 0?void 0:h.length)||0,((f=C==null?void 0:C.values)===null||f===void 0?void 0:f.length)||0);return k!==0?k:il(b,C)})(r.mapValue,e.mapValue);case 11:return(function(s,o){if(s===Nt.mapValue&&o===Nt.mapValue)return 0;if(s===Nt.mapValue)return 1;if(o===Nt.mapValue)return-1;const u=s.fields||{},c=Object.keys(u),h=o.fields||{},f=Object.keys(h);c.sort(),f.sort();for(let m=0;m<c.length&&m<f.length;++m){const _=G(c[m],f[m]);if(_!==0)return _;const b=Bt(u[c[m]],h[f[m]]);if(b!==0)return b}return G(c.length,f.length)})(r.mapValue,e.mapValue);default:throw M()}}function rl(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return G(r,e);const t=ft(r),n=ft(e),i=G(t.seconds,n.seconds);return i!==0?i:G(t.nanos,n.nanos)}function il(r,e){const t=r.values||[],n=e.values||[];for(let i=0;i<t.length&&i<n.length;++i){const s=Bt(t[i],n[i]);if(s)return s}return G(t.length,n.length)}function Gn(r){return Ko(r)}function Ko(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(t){const n=ft(t);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(t){return Ut(t).toBase64()})(r.bytesValue):"referenceValue"in r?(function(t){return O.fromName(t).toString()})(r.referenceValue):"geoPointValue"in r?(function(t){return`geo(${t.latitude},${t.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(t){let n="[",i=!0;for(const s of t.values||[])i?i=!1:n+=",",n+=Ko(s);return n+"]"})(r.arrayValue):"mapValue"in r?(function(t){const n=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of n)s?s=!1:i+=",",i+=`${o}:${Ko(t.fields[o])}`;return i+"}"})(r.mapValue):M()}function fn(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function Wo(r){return!!r&&"integerValue"in r}function Qr(r){return!!r&&"arrayValue"in r}function sl(r){return!!r&&"nullValue"in r}function ol(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function es(r){return!!r&&"mapValue"in r}function Ds(r){var e,t;return((t=(((e=r==null?void 0:r.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Mr(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const e={mapValue:{fields:{}}};return vn(r.mapValue.fields,((t,n)=>e.mapValue.fields[t]=Mr(n))),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Mr(r.arrayValue.values[t]);return e}return Object.assign({},r)}function bd(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const Pd={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function DI(r){return"nullValue"in r?Zi:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?fn(hn.empty(),O.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?Ds(r)?Pd:{mapValue:{}}:M()}function VI(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?fn(hn.empty(),O.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Pd:"mapValue"in r?Ds(r)?{mapValue:{}}:Nt:M()}function al(r,e){const t=Bt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function ul(r,e){const t=Bt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(e){this.value=e}static empty(){return new we({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!es(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Mr(t)}setAll(e){let t=ue.emptyPath(),n={},i=[];e.forEach(((o,u)=>{if(!t.isImmediateParentOf(u)){const c=this.getFieldsMap(t);this.applyChanges(c,n,i),n={},i=[],t=u.popLast()}o?n[u.lastSegment()]=Mr(o):i.push(u.lastSegment())}));const s=this.getFieldsMap(t);this.applyChanges(s,n,i)}delete(e){const t=this.field(e.popLast());es(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return et(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let i=t.mapValue.fields[e.get(n)];es(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,n){vn(t,((i,s)=>e[i]=s));for(const i of n)delete e[i]}clone(){return new we(Mr(this.value))}}function Sd(r){const e=[];return vn(r.fields,((t,n)=>{const i=new ue([t]);if(es(n)){const s=Sd(n.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)})),new Me(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(e,t,n,i,s,o,u){this.key=e,this.documentType=t,this.version=n,this.readTime=i,this.createTime=s,this.data=o,this.documentState=u}static newInvalidDocument(e){return new oe(e,0,U.min(),U.min(),U.min(),we.empty(),0)}static newFoundDocument(e,t,n,i){return new oe(e,1,t,U.min(),n,i,0)}static newNoDocument(e,t){return new oe(e,2,t,U.min(),U.min(),we.empty(),0)}static newUnknownDocument(e,t){return new oe(e,3,t,U.min(),U.min(),we.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=we.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=we.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof oe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new oe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e,t){this.position=e,this.inclusive=t}}function cl(r,e,t){let n=0;for(let i=0;i<r.position.length;i++){const s=e[i],o=r.position[i];if(s.field.isKeyField()?n=O.comparator(O.fromName(o.referenceValue),t.key):n=Bt(o,t.data.field(s.field)),s.dir==="desc"&&(n*=-1),n!==0)break}return n}function ll(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!et(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jr{constructor(e,t="asc"){this.field=e,this.dir=t}}function kI(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cd{}class Q extends Cd{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new NI(e,t,n):t==="array-contains"?new MI(e,n):t==="in"?new Od(e,n):t==="not-in"?new LI(e,n):t==="array-contains-any"?new FI(e,n):new Q(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new xI(e,n):new OI(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Bt(t,this.value)):t!==null&&dn(this.value)===dn(t)&&this.matchesComparison(Bt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return M()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ee extends Cd{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new ee(e,t)}matches(e){return Kn(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Kn(r){return r.op==="and"}function Ho(r){return r.op==="or"}function Ca(r){return Dd(r)&&Kn(r)}function Dd(r){for(const e of r.filters)if(e instanceof ee)return!1;return!0}function Qo(r){if(r instanceof Q)return r.field.canonicalString()+r.op.toString()+Gn(r.value);if(Ca(r))return r.filters.map((e=>Qo(e))).join(",");{const e=r.filters.map((t=>Qo(t))).join(",");return`${r.op}(${e})`}}function Vd(r,e){return r instanceof Q?(function(n,i){return i instanceof Q&&n.op===i.op&&n.field.isEqual(i.field)&&et(n.value,i.value)})(r,e):r instanceof ee?(function(n,i){return i instanceof ee&&n.op===i.op&&n.filters.length===i.filters.length?n.filters.reduce(((s,o,u)=>s&&Vd(o,i.filters[u])),!0):!1})(r,e):void M()}function kd(r,e){const t=r.filters.concat(e);return ee.create(t,r.op)}function Nd(r){return r instanceof Q?(function(t){return`${t.field.canonicalString()} ${t.op} ${Gn(t.value)}`})(r):r instanceof ee?(function(t){return t.op.toString()+" {"+t.getFilters().map(Nd).join(" ,")+"}"})(r):"Filter"}class NI extends Q{constructor(e,t,n){super(e,t,n),this.key=O.fromName(n.referenceValue)}matches(e){const t=O.comparator(e.key,this.key);return this.matchesComparison(t)}}class xI extends Q{constructor(e,t){super(e,"in",t),this.keys=xd("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class OI extends Q{constructor(e,t){super(e,"not-in",t),this.keys=xd("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function xd(r,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map((n=>O.fromName(n.referenceValue)))}class MI extends Q{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Qr(t)&&Hr(t.arrayValue,this.value)}}class Od extends Q{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Hr(this.value.arrayValue,t)}}class LI extends Q{constructor(e,t){super(e,"not-in",t)}matches(e){if(Hr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Hr(this.value.arrayValue,t)}}class FI extends Q{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Qr(t)||!t.arrayValue.values)&&t.arrayValue.values.some((n=>Hr(this.value.arrayValue,n)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UI{constructor(e,t=null,n=[],i=[],s=null,o=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=i,this.limit=s,this.startAt=o,this.endAt=u,this.ue=null}}function Jo(r,e=null,t=[],n=[],i=null,s=null,o=null){return new UI(r,e,t,n,i,s,o)}function pn(r){const e=z(r);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((n=>Qo(n))).join(","),t+="|ob:",t+=e.orderBy.map((n=>(function(s){return s.field.canonicalString()+s.dir})(n))).join(","),ui(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((n=>Gn(n))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((n=>Gn(n))).join(",")),e.ue=t}return e.ue}function ci(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!kI(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!Vd(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!ll(r.startAt,e.startAt)&&ll(r.endAt,e.endAt)}function ps(r){return O.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function ms(r,e){return r.filters.filter((t=>t instanceof Q&&t.field.isEqual(e)))}function hl(r,e,t){let n=Zi,i=!0;for(const s of ms(r,e)){let o=Zi,u=!0;switch(s.op){case"<":case"<=":o=DI(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,u=!1;break;case"!=":case"not-in":o=Zi}al({value:n,inclusive:i},{value:o,inclusive:u})<0&&(n=o,i=u)}if(t!==null){for(let s=0;s<r.orderBy.length;++s)if(r.orderBy[s].field.isEqual(e)){const o=t.position[s];al({value:n,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(n=o,i=t.inclusive);break}}return{value:n,inclusive:i}}function dl(r,e,t){let n=Nt,i=!0;for(const s of ms(r,e)){let o=Nt,u=!0;switch(s.op){case">=":case">":o=VI(s.value),u=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,u=!1;break;case"!=":case"not-in":o=Nt}ul({value:n,inclusive:i},{value:o,inclusive:u})>0&&(n=o,i=u)}if(t!==null){for(let s=0;s<r.orderBy.length;++s)if(r.orderBy[s].field.isEqual(e)){const o=t.position[s];ul({value:n,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(n=o,i=t.inclusive);break}}return{value:n,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(e,t=null,n=[],i=[],s=null,o="F",u=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=i,this.limit=s,this.limitType=o,this.startAt=u,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function BI(r,e,t,n,i,s,o,u){return new wn(r,e,t,n,i,s,o,u)}function Vs(r){return new wn(r)}function fl(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Da(r){return r.collectionGroup!==null}function jn(r){const e=z(r);if(e.ce===null){e.ce=[];const t=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let u=new te(ue.comparator);return o.filters.forEach((c=>{c.getFlattenedFilters().forEach((h=>{h.isInequality()&&(u=u.add(h.field))}))})),u})(e).forEach((s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new Jr(s,n))})),t.has(ue.keyField().canonicalString())||e.ce.push(new Jr(ue.keyField(),n))}return e.ce}function $e(r){const e=z(r);return e.le||(e.le=qI(e,jn(r))),e.le}function qI(r,e){if(r.limitType==="F")return Jo(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map((i=>{const s=i.dir==="desc"?"asc":"desc";return new Jr(i.field,s)}));const t=r.endAt?new qt(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new qt(r.startAt.position,r.startAt.inclusive):null;return Jo(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function Yo(r,e){const t=r.filters.concat([e]);return new wn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function gs(r,e,t){return new wn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function ks(r,e){return ci($e(r),$e(e))&&r.limitType===e.limitType}function Md(r){return`${pn($e(r))}|lt:${r.limitType}`}function xn(r){return`Query(target=${(function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map((i=>Nd(i))).join(", ")}]`),ui(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map((i=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(i))).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map((i=>Gn(i))).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map((i=>Gn(i))).join(",")),`Target(${n})`})($e(r))}; limitType=${r.limitType})`}function li(r,e){return e.isFoundDocument()&&(function(n,i){const s=i.key.path;return n.collectionGroup!==null?i.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(s):O.isDocumentKey(n.path)?n.path.isEqual(s):n.path.isImmediateParentOf(s)})(r,e)&&(function(n,i){for(const s of jn(n))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0})(r,e)&&(function(n,i){for(const s of n.filters)if(!s.matches(i))return!1;return!0})(r,e)&&(function(n,i){return!(n.startAt&&!(function(o,u,c){const h=cl(o,u,c);return o.inclusive?h<=0:h<0})(n.startAt,jn(n),i)||n.endAt&&!(function(o,u,c){const h=cl(o,u,c);return o.inclusive?h>=0:h>0})(n.endAt,jn(n),i))})(r,e)}function jI(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Ld(r){return(e,t)=>{let n=!1;for(const i of jn(r)){const s=$I(i,e,t);if(s!==0)return s;n=n||i.field.isKeyField()}return 0}}function $I(r,e,t){const n=r.field.isKeyField()?O.comparator(e.key,t.key):(function(s,o,u){const c=o.data.field(s),h=u.data.field(s);return c!==null&&h!==null?Bt(c,h):M()})(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return M()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[i,s]of n)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),i=this.inner[n];if(i===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],e))return n.length===1?delete this.inner[t]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(e){vn(this.inner,((t,n)=>{for(const[i,s]of n)e(i,s)}))}isEmpty(){return Ad(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zI=new ae(O.comparator);function Fe(){return zI}const Fd=new ae(O.comparator);function Vr(...r){let e=Fd;for(const t of r)e=e.insert(t.key,t);return e}function Ud(r){let e=Fd;return r.forEach(((t,n)=>e=e.insert(t,n.overlayedDocument))),e}function Je(){return Lr()}function Bd(){return Lr()}function Lr(){return new zt((r=>r.toString()),((r,e)=>r.isEqual(e)))}const GI=new ae(O.comparator),KI=new te(O.comparator);function W(...r){let e=KI;for(const t of r)e=e.add(t);return e}const WI=new te(G);function HI(){return WI}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Va(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Kr(e)?"-0":e}}function qd(r){return{integerValue:""+r}}function QI(r,e){return uI(e)?qd(e):Va(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns{constructor(){this._=void 0}}function JI(r,e,t){return r instanceof Wn?(function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Cs(s)&&(s=Sa(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}})(t,e):r instanceof Hn?$d(r,e):r instanceof Qn?zd(r,e):(function(i,s){const o=jd(i,s),u=pl(o)+pl(i.Pe);return Wo(o)&&Wo(i.Pe)?qd(u):Va(i.serializer,u)})(r,e)}function YI(r,e,t){return r instanceof Hn?$d(r,e):r instanceof Qn?zd(r,e):t}function jd(r,e){return r instanceof Yr?(function(n){return Wo(n)||(function(s){return!!s&&"doubleValue"in s})(n)})(e)?e:{integerValue:0}:null}class Wn extends Ns{}class Hn extends Ns{constructor(e){super(),this.elements=e}}function $d(r,e){const t=Gd(e);for(const n of r.elements)t.some((i=>et(i,n)))||t.push(n);return{arrayValue:{values:t}}}class Qn extends Ns{constructor(e){super(),this.elements=e}}function zd(r,e){let t=Gd(e);for(const n of r.elements)t=t.filter((i=>!et(i,n)));return{arrayValue:{values:t}}}class Yr extends Ns{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function pl(r){return se(r.integerValue||r.doubleValue)}function Gd(r){return Qr(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kd{constructor(e,t){this.field=e,this.transform=t}}function XI(r,e){return r.field.isEqual(e.field)&&(function(n,i){return n instanceof Hn&&i instanceof Hn||n instanceof Qn&&i instanceof Qn?zn(n.elements,i.elements,et):n instanceof Yr&&i instanceof Yr?et(n.Pe,i.Pe):n instanceof Wn&&i instanceof Wn})(r.transform,e.transform)}class ZI{constructor(e,t){this.version=e,this.transformResults=t}}class fe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new fe}static exists(e){return new fe(void 0,e)}static updateTime(e){return new fe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ts(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class xs{}function Wd(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new hi(r.key,fe.none()):new er(r.key,r.data,fe.none());{const t=r.data,n=we.empty();let i=new te(ue.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?n.delete(s):n.set(s,o),i=i.add(s)}return new _t(r.key,n,new Me(i.toArray()),fe.none())}}function eT(r,e,t){r instanceof er?(function(i,s,o){const u=i.value.clone(),c=gl(i.fieldTransforms,s,o.transformResults);u.setAll(c),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(r,e,t):r instanceof _t?(function(i,s,o){if(!ts(i.precondition,s))return void s.convertToUnknownDocument(o.version);const u=gl(i.fieldTransforms,s,o.transformResults),c=s.data;c.setAll(Hd(i)),c.setAll(u),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(r,e,t):(function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function Fr(r,e,t,n){return r instanceof er?(function(s,o,u,c){if(!ts(s.precondition,o))return u;const h=s.value.clone(),f=_l(s.fieldTransforms,c,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(r,e,t,n):r instanceof _t?(function(s,o,u,c){if(!ts(s.precondition,o))return u;const h=_l(s.fieldTransforms,c,o),f=o.data;return f.setAll(Hd(s)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),u===null?null:u.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map((m=>m.field)))})(r,e,t,n):(function(s,o,u){return ts(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):u})(r,e,t)}function tT(r,e){let t=null;for(const n of r.fieldTransforms){const i=e.data.field(n.field),s=jd(n.transform,i||null);s!=null&&(t===null&&(t=we.empty()),t.set(n.field,s))}return t||null}function ml(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!(function(n,i){return n===void 0&&i===void 0||!(!n||!i)&&zn(n,i,((s,o)=>XI(s,o)))})(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class er extends xs{constructor(e,t,n,i=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class _t extends xs{constructor(e,t,n,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Hd(r){const e=new Map;return r.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}})),e}function gl(r,e,t){const n=new Map;F(r.length===t.length);for(let i=0;i<t.length;i++){const s=r[i],o=s.transform,u=e.data.field(s.field);n.set(s.field,YI(o,u,t[i]))}return n}function _l(r,e,t){const n=new Map;for(const i of r){const s=i.transform,o=t.data.field(i.field);n.set(i.field,JI(s,o,e))}return n}class hi extends xs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ka extends xs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Na{constructor(e,t,n,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&eT(s,e,n[i])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Fr(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Fr(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Bd();return this.mutations.forEach((i=>{const s=e.get(i.key),o=s.overlayedDocument;let u=this.applyToLocalView(o,s.mutatedFields);u=t.has(i.key)?null:u;const c=Wd(o,u);c!==null&&n.set(i.key,c),o.isValidDocument()||o.convertToNoDocument(U.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),W())}isEqual(e){return this.batchId===e.batchId&&zn(this.mutations,e.mutations,((t,n)=>ml(t,n)))&&zn(this.baseMutations,e.baseMutations,((t,n)=>ml(t,n)))}}class xa{constructor(e,t,n,i){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=i}static from(e,t,n){F(e.mutations.length===n.length);let i=(function(){return GI})();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,n[o].version);return new xa(e,t,n,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nT{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pe,Y;function Qd(r){switch(r){default:return M();case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0}}function Jd(r){if(r===void 0)return Ne("GRPC error has no .code"),S.UNKNOWN;switch(r){case pe.OK:return S.OK;case pe.CANCELLED:return S.CANCELLED;case pe.UNKNOWN:return S.UNKNOWN;case pe.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case pe.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case pe.INTERNAL:return S.INTERNAL;case pe.UNAVAILABLE:return S.UNAVAILABLE;case pe.UNAUTHENTICATED:return S.UNAUTHENTICATED;case pe.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case pe.NOT_FOUND:return S.NOT_FOUND;case pe.ALREADY_EXISTS:return S.ALREADY_EXISTS;case pe.PERMISSION_DENIED:return S.PERMISSION_DENIED;case pe.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case pe.ABORTED:return S.ABORTED;case pe.OUT_OF_RANGE:return S.OUT_OF_RANGE;case pe.UNIMPLEMENTED:return S.UNIMPLEMENTED;case pe.DATA_LOSS:return S.DATA_LOSS;default:return M()}}(Y=pe||(pe={}))[Y.OK=0]="OK",Y[Y.CANCELLED=1]="CANCELLED",Y[Y.UNKNOWN=2]="UNKNOWN",Y[Y.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Y[Y.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Y[Y.NOT_FOUND=5]="NOT_FOUND",Y[Y.ALREADY_EXISTS=6]="ALREADY_EXISTS",Y[Y.PERMISSION_DENIED=7]="PERMISSION_DENIED",Y[Y.UNAUTHENTICATED=16]="UNAUTHENTICATED",Y[Y.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Y[Y.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Y[Y.ABORTED=10]="ABORTED",Y[Y.OUT_OF_RANGE=11]="OUT_OF_RANGE",Y[Y.UNIMPLEMENTED=12]="UNIMPLEMENTED",Y[Y.INTERNAL=13]="INTERNAL",Y[Y.UNAVAILABLE=14]="UNAVAILABLE",Y[Y.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rT(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iT=new rn([4294967295,4294967295],0);function yl(r){const e=rT().encode(r),t=new ad;return t.update(e),new Uint8Array(t.digest())}function Il(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new rn([t,n],0),new rn([i,s],0)]}class Ma{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new kr(`Invalid padding: ${t}`);if(n<0)throw new kr(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new kr(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new kr(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=rn.fromNumber(this.Ie)}Ee(e,t,n){let i=e.add(t.multiply(rn.fromNumber(n)));return i.compare(iT)===1&&(i=new rn([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=yl(e),[n,i]=Il(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(n,i,s);if(!this.de(o))return!1}return!0}static create(e,t,n){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new Ma(s,i,t);return n.forEach((u=>o.insert(u))),o}insert(e){if(this.Ie===0)return;const t=yl(e),[n,i]=Il(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(n,i,s);this.Ae(o)}}Ae(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class kr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{constructor(e,t,n,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const i=new Map;return i.set(e,di.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Os(U.min(),i,new ae(G),Fe(),W())}}class di{constructor(e,t,n,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new di(n,t,W(),W(),W())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(e,t,n,i){this.Re=e,this.removedTargetIds=t,this.key=n,this.Ve=i}}class Yd{constructor(e,t){this.targetId=e,this.me=t}}class Xd{constructor(e,t,n=me.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=i}}class Tl{constructor(){this.fe=0,this.ge=vl(),this.pe=me.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=W(),t=W(),n=W();return this.ge.forEach(((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:n=n.add(i);break;default:M()}})),new di(this.pe,this.ye,e,t,n)}Ce(){this.we=!1,this.ge=vl()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,F(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class sT{constructor(e){this.Le=e,this.Be=new Map,this.ke=Fe(),this.qe=El(),this.Qe=new ae(G)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,(t=>{const n=this.Ge(t);switch(e.state){case 0:this.ze(t)&&n.De(e.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(e.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(n.Ne(),n.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),n.De(e.resumeToken));break;default:M()}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach(((n,i)=>{this.ze(i)&&t(i)}))}He(e){const t=e.targetId,n=e.me.count,i=this.Je(t);if(i){const s=i.target;if(ps(s))if(n===0){const o=new O(s.path);this.Ue(t,o,oe.newNoDocument(o,U.min()))}else F(n===1);else{const o=this.Ye(t);if(o!==n){const u=this.Ze(e),c=u?this.Xe(u,e,o):1;if(c!==0){this.je(t);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,h)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:i=0},hashCount:s=0}=t;let o,u;try{o=Ut(n).toUint8Array()}catch(c){if(c instanceof Rd)return ln("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{u=new Ma(o,i,s)}catch(c){return ln(c instanceof kr?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return u.Ie===0?null:u}Xe(e,t,n){return t.me.count===n-this.nt(e,t.targetId)?0:2}nt(e,t){const n=this.Le.getRemoteKeysForTarget(t);let i=0;return n.forEach((s=>{const o=this.Le.tt(),u=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(u)||(this.Ue(t,s,null),i++)})),i}rt(e){const t=new Map;this.Be.forEach(((s,o)=>{const u=this.Je(o);if(u){if(s.current&&ps(u.target)){const c=new O(u.target.path);this.ke.get(c)!==null||this.it(o,c)||this.Ue(o,c,oe.newNoDocument(c,e))}s.be&&(t.set(o,s.ve()),s.Ce())}}));let n=W();this.qe.forEach(((s,o)=>{let u=!0;o.forEachWhile((c=>{const h=this.Je(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)})),u&&(n=n.add(s))})),this.ke.forEach(((s,o)=>o.setReadTime(e)));const i=new Os(e,t,this.Qe,this.ke,n);return this.ke=Fe(),this.qe=El(),this.Qe=new ae(G),i}$e(e,t){if(!this.ze(e))return;const n=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,n),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,n){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),n&&(this.ke=this.ke.insert(t,n))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new Tl,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new te(G),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||V("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Tl),this.Le.getRemoteKeysForTarget(e).forEach((t=>{this.Ue(e,t,null)}))}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function El(){return new ae(O.comparator)}function vl(){return new ae(O.comparator)}const oT={asc:"ASCENDING",desc:"DESCENDING"},aT={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},uT={and:"AND",or:"OR"};class cT{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Xo(r,e){return r.useProto3Json||ui(e)?e:{value:e}}function Jn(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Zd(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function lT(r,e){return Jn(r,e.toTimestamp())}function Ie(r){return F(!!r),U.fromTimestamp((function(t){const n=ft(t);return new ce(n.seconds,n.nanos)})(r))}function La(r,e){return Zo(r,e).canonicalString()}function Zo(r,e){const t=(function(i){return new X(["projects",i.projectId,"databases",i.database])})(r).child("documents");return e===void 0?t:t.child(e)}function ef(r){const e=X.fromString(r);return F(lf(e)),e}function Xr(r,e){return La(r.databaseId,e.path)}function lt(r,e){const t=ef(e);if(t.get(1)!==r.databaseId.projectId)throw new N(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new N(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new O(rf(t))}function tf(r,e){return La(r.databaseId,e)}function nf(r){const e=ef(r);return e.length===4?X.emptyPath():rf(e)}function ea(r){return new X(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function rf(r){return F(r.length>4&&r.get(4)==="documents"),r.popFirst(5)}function wl(r,e,t){return{name:Xr(r,e),fields:t.value.mapValue.fields}}function hT(r,e,t){const n=lt(r,e.name),i=Ie(e.updateTime),s=e.createTime?Ie(e.createTime):U.min(),o=new we({mapValue:{fields:e.fields}}),u=oe.newFoundDocument(n,i,s,o);return t&&u.setHasCommittedMutations(),t?u.setHasCommittedMutations():u}function dT(r,e){return"found"in e?(function(n,i){F(!!i.found),i.found.name,i.found.updateTime;const s=lt(n,i.found.name),o=Ie(i.found.updateTime),u=i.found.createTime?Ie(i.found.createTime):U.min(),c=new we({mapValue:{fields:i.found.fields}});return oe.newFoundDocument(s,o,u,c)})(r,e):"missing"in e?(function(n,i){F(!!i.missing),F(!!i.readTime);const s=lt(n,i.missing),o=Ie(i.readTime);return oe.newNoDocument(s,o)})(r,e):M()}function fT(r,e){let t;if("targetChange"in e){e.targetChange;const n=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:M()})(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=(function(h,f){return h.useProto3Json?(F(f===void 0||typeof f=="string"),me.fromBase64String(f||"")):(F(f===void 0||f instanceof Buffer||f instanceof Uint8Array),me.fromUint8Array(f||new Uint8Array))})(r,e.targetChange.resumeToken),o=e.targetChange.cause,u=o&&(function(h){const f=h.code===void 0?S.UNKNOWN:Jd(h.code);return new N(f,h.message||"")})(o);t=new Xd(n,i,s,u||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const i=lt(r,n.document.name),s=Ie(n.document.updateTime),o=n.document.createTime?Ie(n.document.createTime):U.min(),u=new we({mapValue:{fields:n.document.fields}}),c=oe.newFoundDocument(i,s,o,u),h=n.targetIds||[],f=n.removedTargetIds||[];t=new ns(h,f,c.key,c)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const i=lt(r,n.document),s=n.readTime?Ie(n.readTime):U.min(),o=oe.newNoDocument(i,s),u=n.removedTargetIds||[];t=new ns([],u,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const i=lt(r,n.document),s=n.removedTargetIds||[];t=new ns([],s,i,null)}else{if(!("filter"in e))return M();{e.filter;const n=e.filter;n.targetId;const{count:i=0,unchangedNames:s}=n,o=new nT(i,s),u=n.targetId;t=new Yd(u,o)}}return t}function Zr(r,e){let t;if(e instanceof er)t={update:wl(r,e.key,e.value)};else if(e instanceof hi)t={delete:Xr(r,e.key)};else if(e instanceof _t)t={update:wl(r,e.key,e.data),updateMask:IT(e.fieldMask)};else{if(!(e instanceof ka))return M();t={verify:Xr(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((n=>(function(s,o){const u=o.transform;if(u instanceof Wn)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof Hn)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof Qn)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Yr)return{fieldPath:o.field.canonicalString(),increment:u.Pe};throw M()})(0,n)))),e.precondition.isNone||(t.currentDocument=(function(i,s){return s.updateTime!==void 0?{updateTime:lT(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:M()})(r,e.precondition)),t}function ta(r,e){const t=e.currentDocument?(function(s){return s.updateTime!==void 0?fe.updateTime(Ie(s.updateTime)):s.exists!==void 0?fe.exists(s.exists):fe.none()})(e.currentDocument):fe.none(),n=e.updateTransforms?e.updateTransforms.map((i=>(function(o,u){let c=null;if("setToServerValue"in u)F(u.setToServerValue==="REQUEST_TIME"),c=new Wn;else if("appendMissingElements"in u){const f=u.appendMissingElements.values||[];c=new Hn(f)}else if("removeAllFromArray"in u){const f=u.removeAllFromArray.values||[];c=new Qn(f)}else"increment"in u?c=new Yr(o,u.increment):M();const h=ue.fromServerFormat(u.fieldPath);return new Kd(h,c)})(r,i))):[];if(e.update){e.update.name;const i=lt(r,e.update.name),s=new we({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=(function(c){const h=c.fieldPaths||[];return new Me(h.map((f=>ue.fromServerFormat(f))))})(e.updateMask);return new _t(i,s,o,t,n)}return new er(i,s,t,n)}if(e.delete){const i=lt(r,e.delete);return new hi(i,t)}if(e.verify){const i=lt(r,e.verify);return new ka(i,t)}return M()}function pT(r,e){return r&&r.length>0?(F(e!==void 0),r.map((t=>(function(i,s){let o=i.updateTime?Ie(i.updateTime):Ie(s);return o.isEqual(U.min())&&(o=Ie(s)),new ZI(o,i.transformResults||[])})(t,e)))):[]}function sf(r,e){return{documents:[tf(r,e.path)]}}function of(r,e){const t={structuredQuery:{}},n=e.path;let i;e.collectionGroup!==null?(i=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=tf(r,i);const s=(function(h){if(h.length!==0)return cf(ee.create(h,"and"))})(e.filters);s&&(t.structuredQuery.where=s);const o=(function(h){if(h.length!==0)return h.map((f=>(function(_){return{field:On(_.field),direction:gT(_.dir)}})(f)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const u=Xo(r,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{_t:t,parent:i}}function af(r){let e=nf(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let i=null;if(n>0){F(n===1);const f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];t.where&&(s=(function(m){const _=uf(m);return _ instanceof ee&&Ca(_)?_.getFilters():[_]})(t.where));let o=[];t.orderBy&&(o=(function(m){return m.map((_=>(function(C){return new Jr(Mn(C.field),(function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(C.direction))})(_)))})(t.orderBy));let u=null;t.limit&&(u=(function(m){let _;return _=typeof m=="object"?m.value:m,ui(_)?null:_})(t.limit));let c=null;t.startAt&&(c=(function(m){const _=!!m.before,b=m.values||[];return new qt(b,_)})(t.startAt));let h=null;return t.endAt&&(h=(function(m){const _=!m.before,b=m.values||[];return new qt(b,_)})(t.endAt)),BI(e,i,o,s,u,"F",c,h)}function mT(r,e){const t=(function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M()}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function uf(r){return r.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=Mn(t.unaryFilter.field);return Q.create(n,"==",{doubleValue:NaN});case"IS_NULL":const i=Mn(t.unaryFilter.field);return Q.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Mn(t.unaryFilter.field);return Q.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Mn(t.unaryFilter.field);return Q.create(o,"!=",{nullValue:"NULL_VALUE"});default:return M()}})(r):r.fieldFilter!==void 0?(function(t){return Q.create(Mn(t.fieldFilter.field),(function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return M()}})(t.fieldFilter.op),t.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(t){return ee.create(t.compositeFilter.filters.map((n=>uf(n))),(function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return M()}})(t.compositeFilter.op))})(r):M()}function gT(r){return oT[r]}function _T(r){return aT[r]}function yT(r){return uT[r]}function On(r){return{fieldPath:r.canonicalString()}}function Mn(r){return ue.fromServerFormat(r.fieldPath)}function cf(r){return r instanceof Q?(function(t){if(t.op==="=="){if(ol(t.value))return{unaryFilter:{field:On(t.field),op:"IS_NAN"}};if(sl(t.value))return{unaryFilter:{field:On(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(ol(t.value))return{unaryFilter:{field:On(t.field),op:"IS_NOT_NAN"}};if(sl(t.value))return{unaryFilter:{field:On(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:On(t.field),op:_T(t.op),value:t.value}}})(r):r instanceof ee?(function(t){const n=t.getFilters().map((i=>cf(i)));return n.length===1?n[0]:{compositeFilter:{op:yT(t.op),filters:n}}})(r):M()}function IT(r){const e=[];return r.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function lf(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e,t,n,i,s=U.min(),o=U.min(),u=me.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=u,this.expectedCount=c}withSequenceNumber(e){return new ut(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new ut(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new ut(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new ut(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hf{constructor(e){this.ct=e}}function TT(r,e){let t;if(e.document)t=hT(r.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=O.fromSegments(e.noDocument.path),i=gn(e.noDocument.readTime);t=oe.newNoDocument(n,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return M();{const n=O.fromSegments(e.unknownDocument.path),i=gn(e.unknownDocument.version);t=oe.newUnknownDocument(n,i)}}return e.readTime&&t.setReadTime((function(i){const s=new ce(i[0],i[1]);return U.fromTimestamp(s)})(e.readTime)),t}function Al(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:_s(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=(function(s,o){return{name:Xr(s,o.key),fields:o.data.value.mapValue.fields,updateTime:Jn(s,o.version.toTimestamp()),createTime:Jn(s,o.createTime.toTimestamp())}})(r.ct,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:mn(e.version)};else{if(!e.isUnknownDocument())return M();n.unknownDocument={path:t.path.toArray(),version:mn(e.version)}}return n}function _s(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function mn(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function gn(r){const e=new ce(r.seconds,r.nanoseconds);return U.fromTimestamp(e)}function Zt(r,e){const t=(e.baseMutations||[]).map((s=>ta(r.ct,s)));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const u=e.mutations[s+1];o.updateTransforms=u.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const n=e.mutations.map((s=>ta(r.ct,s))),i=ce.fromMillis(e.localWriteTimeMs);return new Na(e.batchId,i,t,n)}function Nr(r){const e=gn(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?gn(r.lastLimboFreeSnapshotVersion):U.min();let n;return n=(function(s){return s.documents!==void 0})(r.query)?(function(s){return F(s.documents.length===1),$e(Vs(nf(s.documents[0])))})(r.query):(function(s){return $e(af(s))})(r.query),new ut(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,me.fromBase64String(r.resumeToken))}function df(r,e){const t=mn(e.snapshotVersion),n=mn(e.lastLimboFreeSnapshotVersion);let i;i=ps(e.target)?sf(r.ct,e.target):of(r.ct,e.target)._t;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:pn(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:i}}function ff(r){const e=af({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?gs(e,e.limit,"L"):e}function Co(r,e){return new Oa(e.largestBatchId,ta(r.ct,e.overlayMutation))}function Rl(r,e){const t=e.path.lastSegment();return[r,xe(e.path.popLast()),t]}function bl(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:mn(n.readTime),documentKey:xe(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ET{getBundleMetadata(e,t){return Pl(e).get(t).next((n=>{if(n)return(function(s){return{id:s.bundleId,createTime:gn(s.createTime),version:s.version}})(n)}))}saveBundleMetadata(e,t){return Pl(e).put((function(i){return{bundleId:i.id,createTime:mn(Ie(i.createTime)),version:i.version}})(t))}getNamedQuery(e,t){return Sl(e).get(t).next((n=>{if(n)return(function(s){return{name:s.name,query:ff(s.bundledQuery),readTime:gn(s.readTime)}})(n)}))}saveNamedQuery(e,t){return Sl(e).put((function(i){return{name:i.name,readTime:mn(Ie(i.readTime)),bundledQuery:i.bundledQuery}})(t))}}function Pl(r){return _e(r,"bundles")}function Sl(r){return _e(r,"namedQueries")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){const n=t.uid||"";return new Ms(e,n)}getOverlay(e,t){return Er(e).get(Rl(this.userId,t)).next((n=>n?Co(this.serializer,n):null))}getOverlays(e,t){const n=Je();return A.forEach(t,(i=>this.getOverlay(e,i).next((s=>{s!==null&&n.set(i,s)})))).next((()=>n))}saveOverlays(e,t,n){const i=[];return n.forEach(((s,o)=>{const u=new Oa(t,o);i.push(this.ht(e,u))})),A.waitFor(i)}removeOverlaysForBatchId(e,t,n){const i=new Set;t.forEach((o=>i.add(xe(o.getCollectionPath()))));const s=[];return i.forEach((o=>{const u=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);s.push(Er(e).j("collectionPathOverlayIndex",u))})),A.waitFor(s)}getOverlaysForCollection(e,t,n){const i=Je(),s=xe(t),o=IDBKeyRange.bound([this.userId,s,n],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Er(e).U("collectionPathOverlayIndex",o).next((u=>{for(const c of u){const h=Co(this.serializer,c);i.set(h.getKey(),h)}return i}))}getOverlaysForCollectionGroup(e,t,n,i){const s=Je();let o;const u=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Er(e).J({index:"collectionGroupOverlayIndex",range:u},((c,h,f)=>{const m=Co(this.serializer,h);s.size()<i||m.largestBatchId===o?(s.set(m.getKey(),m),o=m.largestBatchId):f.done()})).next((()=>s))}ht(e,t){return Er(e).put((function(i,s,o){const[u,c,h]=Rl(s,o.mutation.key);return{userId:s,collectionPath:c,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Zr(i.ct,o.mutation)}})(this.serializer,this.userId,t))}}function Er(r){return _e(r,"documentOverlays")}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vT{Pt(e){return _e(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next((t=>{const n=t==null?void 0:t.value;return n?me.fromUint8Array(n):me.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.Pt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(se(e.integerValue));else if("doubleValue"in e){const n=se(e.doubleValue);isNaN(n)?this.dt(t,13):(this.dt(t,15),Kr(n)?t.At(0):t.At(n))}else if("timestampValue"in e){let n=e.timestampValue;this.dt(t,20),typeof n=="string"&&(n=ft(n)),t.Rt(`${n.seconds||""}`),t.At(n.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(Ut(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.dt(t,45),t.At(n.latitude||0),t.At(n.longitude||0)}else"mapValue"in e?bd(e)?this.dt(t,Number.MAX_SAFE_INTEGER):Ds(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):M()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){const n=e.fields||{};this.dt(t,55);for(const i of Object.keys(n))this.Vt(i,t),this.Tt(n[i],t)}wt(e,t){var n,i;const s=e.fields||{};this.dt(t,53);const o="value",u=((i=(n=s[o].arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.length)||0;this.dt(t,15),t.At(se(u)),this.Vt(o,t),this.Tt(s[o],t)}bt(e,t){const n=e.values||[];this.dt(t,50);for(const i of n)this.Tt(i,t)}yt(e,t){this.dt(t,37),O.fromName(e).path.forEach((n=>{this.dt(t,60),this.Dt(n,t)}))}dt(e,t){e.At(t)}ft(e){e.At(2)}}en.vt=new en;function wT(r){if(r===0)return 8;let e=0;return r>>4==0&&(e+=4,r<<=4),r>>6==0&&(e+=2,r<<=2),r>>7==0&&(e+=1),e}function Cl(r){const e=64-(function(n){let i=0;for(let s=0;s<8;++s){const o=wT(255&n[s]);if(i+=o,o!==8)break}return i})(r);return Math.ceil(e/8)}class AT{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ft(n.value),n=t.next();this.Mt()}xt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ot(n.value),n=t.next();this.Nt()}Lt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ft(n);else if(n<2048)this.Ft(960|n>>>6),this.Ft(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ft(480|n>>>12),this.Ft(128|63&n>>>6),this.Ft(128|63&n);else{const i=t.codePointAt(0);this.Ft(240|i>>>18),this.Ft(128|63&i>>>12),this.Ft(128|63&i>>>6),this.Ft(128|63&i)}}this.Mt()}Bt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ot(n);else if(n<2048)this.Ot(960|n>>>6),this.Ot(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ot(480|n>>>12),this.Ot(128|63&n>>>6),this.Ot(128|63&n);else{const i=t.codePointAt(0);this.Ot(240|i>>>18),this.Ot(128|63&i>>>12),this.Ot(128|63&i>>>6),this.Ot(128|63&i)}}this.Nt()}kt(e){const t=this.qt(e),n=Cl(t);this.Qt(1+n),this.buffer[this.position++]=255&n;for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=255&t[i]}Kt(e){const t=this.qt(e),n=Cl(t);this.Qt(1+n),this.buffer[this.position++]=~(255&n);for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const t=(function(s){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)})(e),n=(128&t[0])!=0;t[0]^=n?255:128;for(let i=1;i<t.length;++i)t[i]^=n?255:0;return t}Ft(e){const t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(t)}Ot(e){const t=255&e;t===0?(this.Gt(0),this.Gt(255)):t===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const i=new Uint8Array(n);i.set(this.buffer),this.buffer=i}}class RT{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class bT{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class vr{constructor(){this.jt=new AT,this.Ht=new RT(this.jt),this.Jt=new bT(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(e,t,n,i){this.indexId=e,this.documentKey=t,this.arrayValue=n,this.directionalValue=i}Zt(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.directionalValue,0),t!==e?n.set([0],this.directionalValue.length):++n[n.length-1],new tn(this.indexId,this.documentKey,this.arrayValue,n)}}function Rt(r,e){let t=r.indexId-e.indexId;return t!==0?t:(t=Dl(r.arrayValue,e.arrayValue),t!==0?t:(t=Dl(r.directionalValue,e.directionalValue),t!==0?t:O.comparator(r.documentKey,e.documentKey)))}function Dl(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl{constructor(e){this.Xt=new te(((t,n)=>ue.comparator(t.field,n.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const t of e.filters){const n=t;n.isInequality()?this.Xt=this.Xt.add(n):this.tn.push(n)}}get nn(){return this.Xt.size>1}rn(e){if(F(e.collectionGroup===this.collectionId),this.nn)return!1;const t=zo(e);if(t!==void 0&&!this.sn(t))return!1;const n=Yt(e);let i=new Set,s=0,o=0;for(;s<n.length&&this.sn(n[s]);++s)i=i.add(n[s].fieldPath.canonicalString());if(s===n.length)return!0;if(this.Xt.size>0){const u=this.Xt.getIterator().getNext();if(!i.has(u.field.canonicalString())){const c=n[s];if(!this.on(u,c)||!this._n(this.en[o++],c))return!1}++s}for(;s<n.length;++s){const u=n[s];if(o>=this.en.length||!this._n(this.en[o++],u))return!1}return!0}an(){if(this.nn)return null;let e=new te(ue.comparator);const t=[];for(const n of this.tn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new Yi(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new Yi(n.field,0))}for(const n of this.en)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new Yi(n.field,n.dir==="asc"?0:1)));return new fs(fs.UNKNOWN_ID,this.collectionId,t,Gr.empty())}sn(e){for(const t of this.tn)if(this.on(t,e))return!0;return!1}on(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}_n(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pf(r){var e,t;if(F(r instanceof Q||r instanceof ee),r instanceof Q){if(r instanceof Od){const i=((t=(e=r.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map((s=>Q.create(r.field,"==",s))))||[];return ee.create(i,"or")}return r}const n=r.filters.map((i=>pf(i)));return ee.create(n,r.op)}function PT(r){if(r.getFilters().length===0)return[];const e=ia(pf(r));return F(mf(e)),na(e)||ra(e)?[e]:e.getFilters()}function na(r){return r instanceof Q}function ra(r){return r instanceof ee&&Ca(r)}function mf(r){return na(r)||ra(r)||(function(t){if(t instanceof ee&&Ho(t)){for(const n of t.getFilters())if(!na(n)&&!ra(n))return!1;return!0}return!1})(r)}function ia(r){if(F(r instanceof Q||r instanceof ee),r instanceof Q)return r;if(r.filters.length===1)return ia(r.filters[0]);const e=r.filters.map((n=>ia(n)));let t=ee.create(e,r.op);return t=ys(t),mf(t)?t:(F(t instanceof ee),F(Kn(t)),F(t.filters.length>1),t.filters.reduce(((n,i)=>Fa(n,i))))}function Fa(r,e){let t;return F(r instanceof Q||r instanceof ee),F(e instanceof Q||e instanceof ee),t=r instanceof Q?e instanceof Q?(function(i,s){return ee.create([i,s],"and")})(r,e):kl(r,e):e instanceof Q?kl(e,r):(function(i,s){if(F(i.filters.length>0&&s.filters.length>0),Kn(i)&&Kn(s))return kd(i,s.getFilters());const o=Ho(i)?i:s,u=Ho(i)?s:i,c=o.filters.map((h=>Fa(h,u)));return ee.create(c,"or")})(r,e),ys(t)}function kl(r,e){if(Kn(e))return kd(e,r.getFilters());{const t=e.filters.map((n=>Fa(r,n)));return ee.create(t,"or")}}function ys(r){if(F(r instanceof Q||r instanceof ee),r instanceof Q)return r;const e=r.getFilters();if(e.length===1)return ys(e[0]);if(Dd(r))return r;const t=e.map((i=>ys(i))),n=[];return t.forEach((i=>{i instanceof Q?n.push(i):i instanceof ee&&(i.op===r.op?n.push(...i.filters):n.push(i))})),n.length===1?n[0]:ee.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ST{constructor(){this.un=new Ua}addToCollectionParentIndex(e,t){return this.un.add(t),A.resolve()}getCollectionParents(e,t){return A.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return A.resolve()}deleteFieldIndex(e,t){return A.resolve()}deleteAllFieldIndexes(e){return A.resolve()}createTargetIndexes(e,t){return A.resolve()}getDocumentsMatchingTarget(e,t){return A.resolve(null)}getIndexType(e,t){return A.resolve(0)}getFieldIndexes(e,t){return A.resolve([])}getNextCollectionGroupToUpdate(e){return A.resolve(null)}getMinOffset(e,t){return A.resolve(Be.min())}getMinOffsetFromCollectionGroup(e,t){return A.resolve(Be.min())}updateCollectionGroup(e,t,n){return A.resolve()}updateIndexEntries(e,t){return A.resolve()}}class Ua{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t]||new te(X.comparator),s=!i.has(n);return this.index[t]=i.add(n),s}has(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t];return i&&i.has(n)}getEntries(e){return(this.index[e]||new te(X.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ui=new Uint8Array(0);class CT{constructor(e,t){this.databaseId=t,this.cn=new Ua,this.ln=new zt((n=>pn(n)),((n,i)=>ci(n,i))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.cn.has(t)){const n=t.lastSegment(),i=t.popLast();e.addOnCommittedListener((()=>{this.cn.add(t)}));const s={collectionId:n,parent:xe(i)};return Nl(e).put(s)}return A.resolve()}getCollectionParents(e,t){const n=[],i=IDBKeyRange.bound([t,""],[md(t),""],!1,!0);return Nl(e).U(i).next((s=>{for(const o of s){if(o.collectionId!==t)break;n.push(Qe(o.parent))}return n}))}addFieldIndex(e,t){const n=wr(e),i=(function(u){return{indexId:u.indexId,collectionGroup:u.collectionGroup,fields:u.fields.map((c=>[c.fieldPath.canonicalString(),c.kind]))}})(t);delete i.indexId;const s=n.add(i);if(t.indexState){const o=Vn(e);return s.next((u=>{o.put(bl(u,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return s.next()}deleteFieldIndex(e,t){const n=wr(e),i=Vn(e),s=Dn(e);return n.delete(t.indexId).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=wr(e),n=Dn(e),i=Vn(e);return t.j().next((()=>n.j())).next((()=>i.j()))}createTargetIndexes(e,t){return A.forEach(this.hn(t),(n=>this.getIndexType(e,n).next((i=>{if(i===0||i===1){const s=new Vl(n).an();if(s!=null)return this.addFieldIndex(e,s)}}))))}getDocumentsMatchingTarget(e,t){const n=Dn(e);let i=!0;const s=new Map;return A.forEach(this.hn(t),(o=>this.Pn(e,o).next((u=>{i&&(i=!!u),s.set(o,u)})))).next((()=>{if(i){let o=W();const u=[];return A.forEach(s,((c,h)=>{V("IndexedDbIndexManager",`Using index ${(function(L){return`id=${L.indexId}|cg=${L.collectionGroup}|f=${L.fields.map((q=>`${q.fieldPath}:${q.kind}`)).join(",")}`})(c)} to execute ${pn(t)}`);const f=(function(L,q){const J=zo(q);if(J===void 0)return null;for(const K of ms(L,J.fieldPath))switch(K.op){case"array-contains-any":return K.value.arrayValue.values||[];case"array-contains":return[K.value]}return null})(h,c),m=(function(L,q){const J=new Map;for(const K of Yt(q))for(const T of ms(L,K.fieldPath))switch(T.op){case"==":case"in":J.set(K.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return J.set(K.fieldPath.canonicalString(),T.value),Array.from(J.values())}return null})(h,c),_=(function(L,q){const J=[];let K=!0;for(const T of Yt(q)){const g=T.kind===0?hl(L,T.fieldPath,L.startAt):dl(L,T.fieldPath,L.startAt);J.push(g.value),K&&(K=g.inclusive)}return new qt(J,K)})(h,c),b=(function(L,q){const J=[];let K=!0;for(const T of Yt(q)){const g=T.kind===0?dl(L,T.fieldPath,L.endAt):hl(L,T.fieldPath,L.endAt);J.push(g.value),K&&(K=g.inclusive)}return new qt(J,K)})(h,c),C=this.In(c,h,_),k=this.In(c,h,b),D=this.Tn(c,h,m),j=this.En(c.indexId,f,C,_.inclusive,k,b.inclusive,D);return A.forEach(j,(B=>n.G(B,t.limit).next((L=>{L.forEach((q=>{const J=O.fromSegments(q.documentKey);o.has(J)||(o=o.add(J),u.push(J))}))}))))})).next((()=>u))}return A.resolve(null)}))}hn(e){let t=this.ln.get(e);return t||(e.filters.length===0?t=[e]:t=PT(ee.create(e.filters,"and")).map((n=>Jo(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt))),this.ln.set(e,t),t)}En(e,t,n,i,s,o,u){const c=(t!=null?t.length:1)*Math.max(n.length,s.length),h=c/(t!=null?t.length:1),f=[];for(let m=0;m<c;++m){const _=t?this.dn(t[m/h]):Ui,b=this.An(e,_,n[m%h],i),C=this.Rn(e,_,s[m%h],o),k=u.map((D=>this.An(e,_,D,!0)));f.push(...this.createRange(b,C,k))}return f}An(e,t,n,i){const s=new tn(e,O.empty(),t,n);return i?s:s.Zt()}Rn(e,t,n,i){const s=new tn(e,O.empty(),t,n);return i?s.Zt():s}Pn(e,t){const n=new Vl(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next((s=>{let o=null;for(const u of s)n.rn(u)&&(!o||u.fields.length>o.fields.length)&&(o=u);return o}))}getIndexType(e,t){let n=2;const i=this.hn(t);return A.forEach(i,(s=>this.Pn(e,s).next((o=>{o?n!==0&&o.fields.length<(function(c){let h=new te(ue.comparator),f=!1;for(const m of c.filters)for(const _ of m.getFlattenedFilters())_.field.isKeyField()||(_.op==="array-contains"||_.op==="array-contains-any"?f=!0:h=h.add(_.field));for(const m of c.orderBy)m.field.isKeyField()||(h=h.add(m.field));return h.size+(f?1:0)})(s)&&(n=1):n=0})))).next((()=>(function(o){return o.limit!==null})(t)&&i.length>1&&n===2?1:n))}Vn(e,t){const n=new vr;for(const i of Yt(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const o=n.Yt(i.kind);en.vt.It(s,o)}return n.zt()}dn(e){const t=new vr;return en.vt.It(e,t.Yt(0)),t.zt()}mn(e,t){const n=new vr;return en.vt.It(fn(this.databaseId,t),n.Yt((function(s){const o=Yt(s);return o.length===0?0:o[o.length-1].kind})(e))),n.zt()}Tn(e,t,n){if(n===null)return[];let i=[];i.push(new vr);let s=0;for(const o of Yt(e)){const u=n[s++];for(const c of i)if(this.fn(t,o.fieldPath)&&Qr(u))i=this.gn(i,o,u);else{const h=c.Yt(o.kind);en.vt.It(u,h)}}return this.pn(i)}In(e,t,n){return this.Tn(e,t,n.position)}pn(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].zt();return t}gn(e,t,n){const i=[...e],s=[];for(const o of n.arrayValue.values||[])for(const u of i){const c=new vr;c.seed(u.zt()),en.vt.It(o,c.Yt(t.kind)),s.push(c)}return s}fn(e,t){return!!e.filters.find((n=>n instanceof Q&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in")))}getFieldIndexes(e,t){const n=wr(e),i=Vn(e);return(t?n.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):n.U()).next((s=>{const o=[];return A.forEach(s,(u=>i.get([u.indexId,this.uid]).next((c=>{o.push((function(f,m){const _=m?new Gr(m.sequenceNumber,new Be(gn(m.readTime),new O(Qe(m.documentKey)),m.largestBatchId)):Gr.empty(),b=f.fields.map((([C,k])=>new Yi(ue.fromServerFormat(C),k)));return new fs(f.indexId,f.collectionGroup,b,_)})(u,c))})))).next((()=>o))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((n,i)=>{const s=n.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:G(n.collectionGroup,i.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,n){const i=wr(e),s=Vn(e);return this.yn(e).next((o=>i.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next((u=>A.forEach(u,(c=>s.put(bl(c.indexId,this.uid,o,n))))))))}updateIndexEntries(e,t){const n=new Map;return A.forEach(t,((i,s)=>{const o=n.get(i.collectionGroup);return(o?A.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next((u=>(n.set(i.collectionGroup,u),A.forEach(u,(c=>this.wn(e,i,c).next((h=>{const f=this.Sn(s,c);return h.isEqual(f)?A.resolve():this.bn(e,s,c,h,f)})))))))}))}Dn(e,t,n,i){return Dn(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.mn(n,t.key),documentKey:t.key.path.toArray()})}vn(e,t,n,i){return Dn(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.mn(n,t.key),t.key.path.toArray()])}wn(e,t,n){const i=Dn(e);let s=new te(Rt);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([n.indexId,this.uid,this.mn(n,t)])},((o,u)=>{s=s.add(new tn(n.indexId,t,u.arrayValue,u.directionalValue))})).next((()=>s))}Sn(e,t){let n=new te(Rt);const i=this.Vn(t,e);if(i==null)return n;const s=zo(t);if(s!=null){const o=e.data.field(s.fieldPath);if(Qr(o))for(const u of o.arrayValue.values||[])n=n.add(new tn(t.indexId,e.key,this.dn(u),i))}else n=n.add(new tn(t.indexId,e.key,Ui,i));return n}bn(e,t,n,i,s){V("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const o=[];return(function(c,h,f,m,_){const b=c.getIterator(),C=h.getIterator();let k=Cn(b),D=Cn(C);for(;k||D;){let j=!1,B=!1;if(k&&D){const L=f(k,D);L<0?B=!0:L>0&&(j=!0)}else k!=null?B=!0:j=!0;j?(m(D),D=Cn(C)):B?(_(k),k=Cn(b)):(k=Cn(b),D=Cn(C))}})(i,s,Rt,(u=>{o.push(this.Dn(e,t,n,u))}),(u=>{o.push(this.vn(e,t,n,u))})),A.waitFor(o)}yn(e){let t=1;return Vn(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((n,i,s)=>{s.done(),t=i.sequenceNumber+1})).next((()=>t))}createRange(e,t,n){n=n.sort(((o,u)=>Rt(o,u))).filter(((o,u,c)=>!u||Rt(o,c[u-1])!==0));const i=[];i.push(e);for(const o of n){const u=Rt(o,e),c=Rt(o,t);if(u===0)i[0]=e.Zt();else if(u>0&&c<0)i.push(o),i.push(o.Zt());else if(c>0)break}i.push(t);const s=[];for(let o=0;o<i.length;o+=2){if(this.Cn(i[o],i[o+1]))return[];const u=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,Ui,[]],c=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,Ui,[]];s.push(IDBKeyRange.bound(u,c))}return s}Cn(e,t){return Rt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(xl)}getMinOffset(e,t){return A.mapArray(this.hn(t),(n=>this.Pn(e,n).next((i=>i||M())))).next(xl)}}function Nl(r){return _e(r,"collectionParents")}function Dn(r){return _e(r,"indexEntries")}function wr(r){return _e(r,"indexConfiguration")}function Vn(r){return _e(r,"indexState")}function xl(r){F(r.length!==0);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const i=r[n].indexState.offset;Ra(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new Be(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ol={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class Oe{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new Oe(e,Oe.DEFAULT_COLLECTION_PERCENTILE,Oe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gf(r,e,t){const n=r.store("mutations"),i=r.store("documentMutations"),s=[],o=IDBKeyRange.only(t.batchId);let u=0;const c=n.J({range:o},((f,m,_)=>(u++,_.delete())));s.push(c.next((()=>{F(u===1)})));const h=[];for(const f of t.mutations){const m=Td(e,f.key.path,t.batchId);s.push(i.delete(m)),h.push(f.key)}return A.waitFor(s).next((()=>h))}function Is(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw M();e=r.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Oe.DEFAULT_COLLECTION_PERCENTILE=10,Oe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Oe.DEFAULT=new Oe(41943040,Oe.DEFAULT_COLLECTION_PERCENTILE,Oe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Oe.DISABLED=new Oe(-1,0,0);class Ls{constructor(e,t,n,i){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=i,this.Fn={}}static lt(e,t,n,i){F(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new Ls(s,t,n,i)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return bt(e).J({index:"userMutationsIndex",range:n},((i,s,o)=>{t=!1,o.done()})).next((()=>t))}addMutationBatch(e,t,n,i){const s=Ln(e),o=bt(e);return o.add({}).next((u=>{F(typeof u=="number");const c=new Na(u,t,n,i),h=(function(b,C,k){const D=k.baseMutations.map((B=>Zr(b.ct,B))),j=k.mutations.map((B=>Zr(b.ct,B)));return{userId:C,batchId:k.batchId,localWriteTimeMs:k.localWriteTime.toMillis(),baseMutations:D,mutations:j}})(this.serializer,this.userId,c),f=[];let m=new te(((_,b)=>G(_.canonicalString(),b.canonicalString())));for(const _ of i){const b=Td(this.userId,_.key.path,u);m=m.add(_.key.path.popLast()),f.push(o.put(h)),f.push(s.put(b,lI))}return m.forEach((_=>{f.push(this.indexManager.addToCollectionParentIndex(e,_))})),e.addOnCommittedListener((()=>{this.Fn[u]=c.keys()})),A.waitFor(f).next((()=>c))}))}lookupMutationBatch(e,t){return bt(e).get(t).next((n=>n?(F(n.userId===this.userId),Zt(this.serializer,n)):null))}Mn(e,t){return this.Fn[t]?A.resolve(this.Fn[t]):this.lookupMutationBatch(e,t).next((n=>{if(n){const i=n.keys();return this.Fn[t]=i,i}return null}))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=IDBKeyRange.lowerBound([this.userId,n]);let s=null;return bt(e).J({index:"userMutationsIndex",range:i},((o,u,c)=>{u.userId===this.userId&&(F(u.batchId>=n),s=Zt(this.serializer,u)),c.done()})).next((()=>s))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return bt(e).J({index:"userMutationsIndex",range:t,reverse:!0},((i,s,o)=>{n=s.batchId,o.done()})).next((()=>n))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return bt(e).U("userMutationsIndex",t).next((n=>n.map((i=>Zt(this.serializer,i)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=Xi(this.userId,t.path),i=IDBKeyRange.lowerBound(n),s=[];return Ln(e).J({range:i},((o,u,c)=>{const[h,f,m]=o,_=Qe(f);if(h===this.userId&&t.path.isEqual(_))return bt(e).get(m).next((b=>{if(!b)throw M();F(b.userId===this.userId),s.push(Zt(this.serializer,b))}));c.done()})).next((()=>s))}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new te(G);const i=[];return t.forEach((s=>{const o=Xi(this.userId,s.path),u=IDBKeyRange.lowerBound(o),c=Ln(e).J({range:u},((h,f,m)=>{const[_,b,C]=h,k=Qe(b);_===this.userId&&s.path.isEqual(k)?n=n.add(C):m.done()}));i.push(c)})),A.waitFor(i).next((()=>this.xn(e,n)))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1,s=Xi(this.userId,n),o=IDBKeyRange.lowerBound(s);let u=new te(G);return Ln(e).J({range:o},((c,h,f)=>{const[m,_,b]=c,C=Qe(_);m===this.userId&&n.isPrefixOf(C)?C.length===i&&(u=u.add(b)):f.done()})).next((()=>this.xn(e,u)))}xn(e,t){const n=[],i=[];return t.forEach((s=>{i.push(bt(e).get(s).next((o=>{if(o===null)throw M();F(o.userId===this.userId),n.push(Zt(this.serializer,o))})))})),A.waitFor(i).next((()=>n))}removeMutationBatch(e,t){return gf(e._e,this.userId,t).next((n=>(e.addOnCommittedListener((()=>{this.On(t.batchId)})),A.forEach(n,(i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return A.resolve();const n=IDBKeyRange.lowerBound((function(o){return[o]})(this.userId)),i=[];return Ln(e).J({range:n},((s,o,u)=>{if(s[0]===this.userId){const c=Qe(s[1]);i.push(c)}else u.done()})).next((()=>{F(i.length===0)}))}))}containsKey(e,t){return _f(e,this.userId,t)}Nn(e){return yf(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""}))}}function _f(r,e,t){const n=Xi(e,t.path),i=n[1],s=IDBKeyRange.lowerBound(n);let o=!1;return Ln(r).J({range:s,H:!0},((u,c,h)=>{const[f,m,_]=u;f===e&&m===i&&(o=!0),h.done()})).next((()=>o))}function bt(r){return _e(r,"mutations")}function Ln(r){return _e(r,"documentMutations")}function yf(r){return _e(r,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new _n(0)}static kn(){return new _n(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DT{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.qn(e).next((t=>{const n=new _n(t.highestTargetId);return t.highestTargetId=n.next(),this.Qn(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.qn(e).next((t=>U.fromTimestamp(new ce(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.qn(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,n){return this.qn(e).next((i=>(i.highestListenSequenceNumber=t,n&&(i.lastRemoteSnapshotVersion=n.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.Qn(e,i))))}addTargetData(e,t){return this.Kn(e,t).next((()=>this.qn(e).next((n=>(n.targetCount+=1,this.$n(t,n),this.Qn(e,n))))))}updateTargetData(e,t){return this.Kn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>kn(e).delete(t.targetId))).next((()=>this.qn(e))).next((n=>(F(n.targetCount>0),n.targetCount-=1,this.Qn(e,n))))}removeTargets(e,t,n){let i=0;const s=[];return kn(e).J(((o,u)=>{const c=Nr(u);c.sequenceNumber<=t&&n.get(c.targetId)===null&&(i++,s.push(this.removeTargetData(e,c)))})).next((()=>A.waitFor(s))).next((()=>i))}forEachTarget(e,t){return kn(e).J(((n,i)=>{const s=Nr(i);t(s)}))}qn(e){return Ml(e).get("targetGlobalKey").next((t=>(F(t!==null),t)))}Qn(e,t){return Ml(e).put("targetGlobalKey",t)}Kn(e,t){return kn(e).put(df(this.serializer,t))}$n(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.qn(e).next((t=>t.targetCount))}getTargetData(e,t){const n=pn(t),i=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let s=null;return kn(e).J({range:i,index:"queryTargetsIndex"},((o,u,c)=>{const h=Nr(u);ci(t,h.target)&&(s=h,c.done())})).next((()=>s))}addMatchingKeys(e,t,n){const i=[],s=Vt(e);return t.forEach((o=>{const u=xe(o.path);i.push(s.put({targetId:n,path:u})),i.push(this.referenceDelegate.addReference(e,n,o))})),A.waitFor(i)}removeMatchingKeys(e,t,n){const i=Vt(e);return A.forEach(t,(s=>{const o=xe(s.path);return A.waitFor([i.delete([n,o]),this.referenceDelegate.removeReference(e,n,s)])}))}removeMatchingKeysForTargetId(e,t){const n=Vt(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(i)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),i=Vt(e);let s=W();return i.J({range:n,H:!0},((o,u,c)=>{const h=Qe(o[1]),f=new O(h);s=s.add(f)})).next((()=>s))}containsKey(e,t){const n=xe(t.path),i=IDBKeyRange.bound([n],[md(n)],!1,!0);let s=0;return Vt(e).J({index:"documentTargetsIndex",H:!0,range:i},(([o,u],c,h)=>{o!==0&&(s++,h.done())})).next((()=>s>0))}ot(e,t){return kn(e).get(t).next((n=>n?Nr(n):null))}}function kn(r){return _e(r,"targets")}function Ml(r){return _e(r,"targetGlobal")}function Vt(r){return _e(r,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ll([r,e],[t,n]){const i=G(r,t);return i===0?G(e,n):i}class VT{constructor(e){this.Un=e,this.buffer=new te(Ll),this.Wn=0}Gn(){return++this.Wn}zn(e){const t=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();Ll(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class kT{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){V("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){$t(t)?V("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await En(t)}await this.Hn(3e5)}))}}class NT{constructor(e,t){this.Jn=e,this.params=t}calculateTargetCount(e,t){return this.Jn.Yn(e).next((n=>Math.floor(t/100*n)))}nthSequenceNumber(e,t){if(t===0)return A.resolve(je.oe);const n=new VT(t);return this.Jn.forEachTarget(e,(i=>n.zn(i.sequenceNumber))).next((()=>this.Jn.Zn(e,(i=>n.zn(i))))).next((()=>n.maxValue))}removeTargets(e,t,n){return this.Jn.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(Ol)):this.getCacheSize(e).next((n=>n<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ol):this.Xn(e,t)))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,t){let n,i,s,o,u,c,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((m=>(m>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),i=this.params.maximumSequenceNumbersToCollect):i=m,o=Date.now(),this.nthSequenceNumber(e,i)))).next((m=>(n=m,u=Date.now(),this.removeTargets(e,n,t)))).next((m=>(s=m,c=Date.now(),this.removeOrphanedDocuments(e,n)))).next((m=>(h=Date.now(),Nn()<=H.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${i} in `+(u-o)+`ms
	Removed ${s} targets in `+(c-u)+`ms
	Removed ${m} documents in `+(h-c)+`ms
Total Duration: ${h-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:m}))))}}function xT(r,e){return new NT(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OT{constructor(e,t){this.db=e,this.garbageCollector=xT(this,t)}Yn(e){const t=this.er(e);return this.db.getTargetCache().getTargetCount(e).next((n=>t.next((i=>n+i))))}er(e){let t=0;return this.Zn(e,(n=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Zn(e,t){return this.tr(e,((n,i)=>t(i)))}addReference(e,t,n){return Bi(e,n)}removeReference(e,t,n){return Bi(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return Bi(e,t)}nr(e,t){return(function(i,s){let o=!1;return yf(i).Y((u=>_f(i,u,s).next((c=>(c&&(o=!0),A.resolve(!c)))))).next((()=>o))})(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.tr(e,((o,u)=>{if(u<=t){const c=this.nr(e,o).next((h=>{if(!h)return s++,n.getEntry(e,o).next((()=>(n.removeEntry(o,U.min()),Vt(e).delete((function(m){return[0,xe(m.path)]})(o)))))}));i.push(c)}})).next((()=>A.waitFor(i))).next((()=>n.apply(e))).next((()=>s))}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return Bi(e,t)}tr(e,t){const n=Vt(e);let i,s=je.oe;return n.J({index:"documentTargetsIndex"},(([o,u],{path:c,sequenceNumber:h})=>{o===0?(s!==je.oe&&t(new O(Qe(i)),s),s=h,i=c):s=je.oe})).next((()=>{s!==je.oe&&t(new O(Qe(i)),s)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Bi(r,e){return Vt(r).put((function(n,i){return{targetId:0,path:xe(n.path),sequenceNumber:i}})(e,r.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class If{constructor(){this.changes=new zt((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,oe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?A.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MT{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return Qt(e).put(n)}removeEntry(e,t,n){return Qt(e).delete((function(s,o){const u=s.path.toArray();return[u.slice(0,u.length-2),u[u.length-2],_s(o),u[u.length-1]]})(t,n))}updateMetadata(e,t){return this.getMetadata(e).next((n=>(n.byteSize+=t,this.rr(e,n))))}getEntry(e,t){let n=oe.newInvalidDocument(t);return Qt(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Ar(t))},((i,s)=>{n=this.ir(t,s)})).next((()=>n))}sr(e,t){let n={size:0,document:oe.newInvalidDocument(t)};return Qt(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Ar(t))},((i,s)=>{n={document:this.ir(t,s),size:Is(s)}})).next((()=>n))}getEntries(e,t){let n=Fe();return this._r(e,t,((i,s)=>{const o=this.ir(i,s);n=n.insert(i,o)})).next((()=>n))}ar(e,t){let n=Fe(),i=new ae(O.comparator);return this._r(e,t,((s,o)=>{const u=this.ir(s,o);n=n.insert(s,u),i=i.insert(s,Is(o))})).next((()=>({documents:n,ur:i})))}_r(e,t,n){if(t.isEmpty())return A.resolve();let i=new te(Bl);t.forEach((c=>i=i.add(c)));const s=IDBKeyRange.bound(Ar(i.first()),Ar(i.last())),o=i.getIterator();let u=o.getNext();return Qt(e).J({index:"documentKeyIndex",range:s},((c,h,f)=>{const m=O.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;u&&Bl(u,m)<0;)n(u,null),u=o.getNext();u&&u.isEqual(m)&&(n(u,h),u=o.hasNext()?o.getNext():null),u?f.$(Ar(u)):f.done()})).next((()=>{for(;u;)n(u,null),u=o.hasNext()?o.getNext():null}))}getDocumentsMatchingQuery(e,t,n,i,s){const o=t.path,u=[o.popLast().toArray(),o.lastSegment(),_s(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],c=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Qt(e).U(IDBKeyRange.bound(u,c,!0)).next((h=>{s==null||s.incrementDocumentReadCount(h.length);let f=Fe();for(const m of h){const _=this.ir(O.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);_.isFoundDocument()&&(li(t,_)||i.has(_.key))&&(f=f.insert(_.key,_))}return f}))}getAllFromCollectionGroup(e,t,n,i){let s=Fe();const o=Ul(t,n),u=Ul(t,Be.max());return Qt(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,u,!0)},((c,h,f)=>{const m=this.ir(O.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);s=s.insert(m.key,m),s.size===i&&f.done()})).next((()=>s))}newChangeBuffer(e){return new LT(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return Fl(e).get("remoteDocumentGlobalKey").next((t=>(F(!!t),t)))}rr(e,t){return Fl(e).put("remoteDocumentGlobalKey",t)}ir(e,t){if(t){const n=TT(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(U.min())))return n}return oe.newInvalidDocument(e)}}function Tf(r){return new MT(r)}class LT extends If{constructor(e,t){super(),this.cr=e,this.trackRemovals=t,this.lr=new zt((n=>n.toString()),((n,i)=>n.isEqual(i)))}applyChanges(e){const t=[];let n=0,i=new te(((s,o)=>G(s.canonicalString(),o.canonicalString())));return this.changes.forEach(((s,o)=>{const u=this.lr.get(s);if(t.push(this.cr.removeEntry(e,s,u.readTime)),o.isValidDocument()){const c=Al(this.cr.serializer,o);i=i.add(s.path.popLast());const h=Is(c);n+=h-u.size,t.push(this.cr.addEntry(e,s,c))}else if(n-=u.size,this.trackRemovals){const c=Al(this.cr.serializer,o.convertToNoDocument(U.min()));t.push(this.cr.addEntry(e,s,c))}})),i.forEach((s=>{t.push(this.cr.indexManager.addToCollectionParentIndex(e,s))})),t.push(this.cr.updateMetadata(e,n)),A.waitFor(t)}getFromCache(e,t){return this.cr.sr(e,t).next((n=>(this.lr.set(t,{size:n.size,readTime:n.document.readTime}),n.document)))}getAllFromCache(e,t){return this.cr.ar(e,t).next((({documents:n,ur:i})=>(i.forEach(((s,o)=>{this.lr.set(s,{size:o,readTime:n.get(s).readTime})})),n)))}}function Fl(r){return _e(r,"remoteDocumentGlobal")}function Qt(r){return _e(r,"remoteDocumentsV14")}function Ar(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function Ul(r,e){const t=e.documentKey.path.toArray();return[r,_s(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function Bl(r,e){const t=r.path.toArray(),n=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<n.length-2;++s)if(i=G(t[s],n[s]),i)return i;return i=G(t.length,n.length),i||(i=G(t[t.length-2],n[n.length-2]),i||G(t[t.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FT{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{constructor(e,t,n,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=i}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((i=>(n=i,this.remoteDocumentCache.getEntry(e,t)))).next((i=>(n!==null&&Fr(n.mutation,i,Me.empty(),ce.now()),i)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.getLocalViewOfDocuments(e,n,W()).next((()=>n))))}getLocalViewOfDocuments(e,t,n=W()){const i=Je();return this.populateOverlays(e,i,t).next((()=>this.computeViews(e,t,i,n).next((s=>{let o=Vr();return s.forEach(((u,c)=>{o=o.insert(u,c.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const n=Je();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,W())))}populateOverlays(e,t,n){const i=[];return n.forEach((s=>{t.has(s)||i.push(s)})),this.documentOverlayCache.getOverlays(e,i).next((s=>{s.forEach(((o,u)=>{t.set(o,u)}))}))}computeViews(e,t,n,i){let s=Fe();const o=Lr(),u=(function(){return Lr()})();return t.forEach(((c,h)=>{const f=n.get(h.key);i.has(h.key)&&(f===void 0||f.mutation instanceof _t)?s=s.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),Fr(f.mutation,h,f.mutation.getFieldMask(),ce.now())):o.set(h.key,Me.empty())})),this.recalculateAndSaveOverlays(e,s).next((c=>(c.forEach(((h,f)=>o.set(h,f))),t.forEach(((h,f)=>{var m;return u.set(h,new FT(f,(m=o.get(h))!==null&&m!==void 0?m:null))})),u)))}recalculateAndSaveOverlays(e,t){const n=Lr();let i=new ae(((o,u)=>o-u)),s=W();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const u of o)u.keys().forEach((c=>{const h=t.get(c);if(h===null)return;let f=n.get(c)||Me.empty();f=u.applyToLocalView(h,f),n.set(c,f);const m=(i.get(u.batchId)||W()).add(c);i=i.insert(u.batchId,m)}))})).next((()=>{const o=[],u=i.getReverseIterator();for(;u.hasNext();){const c=u.getNext(),h=c.key,f=c.value,m=Bd();f.forEach((_=>{if(!s.has(_)){const b=Wd(t.get(_),n.get(_));b!==null&&m.set(_,b),s=s.add(_)}})),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return A.waitFor(o)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.recalculateAndSaveOverlays(e,n)))}getDocumentsMatchingQuery(e,t,n,i){return(function(o){return O.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Da(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,i):this.getDocumentsMatchingCollectionQuery(e,t,n,i)}getNextDocuments(e,t,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,i).next((s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,i-s.size):A.resolve(Je());let u=-1,c=s;return o.next((h=>A.forEach(h,((f,m)=>(u<m.largestBatchId&&(u=m.largestBatchId),s.get(f)?A.resolve():this.remoteDocumentCache.getEntry(e,f).next((_=>{c=c.insert(f,_)}))))).next((()=>this.populateOverlays(e,h,s))).next((()=>this.computeViews(e,c,h,W()))).next((f=>({batchId:u,changes:Ud(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new O(t)).next((n=>{let i=Vr();return n.isFoundDocument()&&(i=i.insert(n.key,n)),i}))}getDocumentsMatchingCollectionGroupQuery(e,t,n,i){const s=t.collectionGroup;let o=Vr();return this.indexManager.getCollectionParents(e,s).next((u=>A.forEach(u,(c=>{const h=(function(m,_){return new wn(_,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)})(t,c.child(s));return this.getDocumentsMatchingCollectionQuery(e,h,n,i).next((f=>{f.forEach(((m,_)=>{o=o.insert(m,_)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,n,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next((o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,i)))).next((o=>{s.forEach(((c,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,oe.newInvalidDocument(f)))}));let u=Vr();return o.forEach(((c,h)=>{const f=s.get(c);f!==void 0&&Fr(f.mutation,h,Me.empty(),ce.now()),li(t,h)&&(u=u.insert(c,h))})),u}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UT{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return A.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,(function(i){return{id:i.id,version:i.version,createTime:Ie(i.createTime)}})(t)),A.resolve()}getNamedQuery(e,t){return A.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,(function(i){return{name:i.name,query:ff(i.bundledQuery),readTime:Ie(i.readTime)}})(t)),A.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BT{constructor(){this.overlays=new ae(O.comparator),this.Ir=new Map}getOverlay(e,t){return A.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Je();return A.forEach(t,(i=>this.getOverlay(e,i).next((s=>{s!==null&&n.set(i,s)})))).next((()=>n))}saveOverlays(e,t,n){return n.forEach(((i,s)=>{this.ht(e,t,s)})),A.resolve()}removeOverlaysForBatchId(e,t,n){const i=this.Ir.get(n);return i!==void 0&&(i.forEach((s=>this.overlays=this.overlays.remove(s))),this.Ir.delete(n)),A.resolve()}getOverlaysForCollection(e,t,n){const i=Je(),s=t.length+1,o=new O(t.child("")),u=this.overlays.getIteratorFrom(o);for(;u.hasNext();){const c=u.getNext().value,h=c.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===s&&c.largestBatchId>n&&i.set(c.getKey(),c)}return A.resolve(i)}getOverlaysForCollectionGroup(e,t,n,i){let s=new ae(((h,f)=>h-f));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>n){let f=s.get(h.largestBatchId);f===null&&(f=Je(),s=s.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const u=Je(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((h,f)=>u.set(h,f))),!(u.size()>=i)););return A.resolve(u)}ht(e,t,n){const i=this.overlays.get(n.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(n.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new Oa(t,n));let s=this.Ir.get(t);s===void 0&&(s=W(),this.Ir.set(t,s)),this.Ir.set(t,s.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qT{constructor(){this.sessionToken=me.EMPTY_BYTE_STRING}getSessionToken(e){return A.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,A.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba{constructor(){this.Tr=new te(ye.Er),this.dr=new te(ye.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const n=new ye(e,t);this.Tr=this.Tr.add(n),this.dr=this.dr.add(n)}Rr(e,t){e.forEach((n=>this.addReference(n,t)))}removeReference(e,t){this.Vr(new ye(e,t))}mr(e,t){e.forEach((n=>this.removeReference(n,t)))}gr(e){const t=new O(new X([])),n=new ye(t,e),i=new ye(t,e+1),s=[];return this.dr.forEachInRange([n,i],(o=>{this.Vr(o),s.push(o.key)})),s}pr(){this.Tr.forEach((e=>this.Vr(e)))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new O(new X([])),n=new ye(t,e),i=new ye(t,e+1);let s=W();return this.dr.forEachInRange([n,i],(o=>{s=s.add(o.key)})),s}containsKey(e){const t=new ye(e,0),n=this.Tr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class ye{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return O.comparator(e.key,t.key)||G(e.wr,t.wr)}static Ar(e,t){return G(e.wr,t.wr)||O.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jT{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new te(ye.Er)}checkEmpty(e){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Na(s,t,n,i);this.mutationQueue.push(o);for(const u of i)this.br=this.br.add(new ye(u.key,s)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return A.resolve(o)}lookupMutationBatch(e,t){return A.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=this.vr(n),s=i<0?0:i;return A.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new ye(t,0),i=new ye(t,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([n,i],(o=>{const u=this.Dr(o.wr);s.push(u)})),A.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new te(G);return t.forEach((i=>{const s=new ye(i,0),o=new ye(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],(u=>{n=n.add(u.wr)}))})),A.resolve(this.Cr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1;let s=n;O.isDocumentKey(s)||(s=s.child(""));const o=new ye(new O(s),0);let u=new te(G);return this.br.forEachWhile((c=>{const h=c.key.path;return!!n.isPrefixOf(h)&&(h.length===i&&(u=u.add(c.wr)),!0)}),o),A.resolve(this.Cr(u))}Cr(e){const t=[];return e.forEach((n=>{const i=this.Dr(n);i!==null&&t.push(i)})),t}removeMutationBatch(e,t){F(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let n=this.br;return A.forEach(t.mutations,(i=>{const s=new ye(i.key,t.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)})).next((()=>{this.br=n}))}On(e){}containsKey(e,t){const n=new ye(t,0),i=this.br.firstAfterOrEqual(n);return A.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,A.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $T{constructor(e){this.Mr=e,this.docs=(function(){return new ae(O.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,i=this.docs.get(n),s=i?i.size:0,o=this.Mr(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return A.resolve(n?n.document.mutableCopy():oe.newInvalidDocument(t))}getEntries(e,t){let n=Fe();return t.forEach((i=>{const s=this.docs.get(i);n=n.insert(i,s?s.document.mutableCopy():oe.newInvalidDocument(i))})),A.resolve(n)}getDocumentsMatchingQuery(e,t,n,i){let s=Fe();const o=t.path,u=new O(o.child("")),c=this.docs.getIteratorFrom(u);for(;c.hasNext();){const{key:h,value:{document:f}}=c.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Ra(gd(f),n)<=0||(i.has(f.key)||li(t,f))&&(s=s.insert(f.key,f.mutableCopy()))}return A.resolve(s)}getAllFromCollectionGroup(e,t,n,i){M()}Or(e,t){return A.forEach(this.docs,(n=>t(n)))}newChangeBuffer(e){return new zT(this)}getSize(e){return A.resolve(this.size)}}class zT extends If{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach(((n,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(n)})),A.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GT{constructor(e){this.persistence=e,this.Nr=new zt((t=>pn(t)),ci),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Ba,this.targetCount=0,this.kr=_n.Bn()}forEachTarget(e,t){return this.Nr.forEach(((n,i)=>t(i))),A.resolve()}getLastRemoteSnapshotVersion(e){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return A.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Lr&&(this.Lr=t),A.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new _n(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,A.resolve()}updateTargetData(e,t){return this.Kn(t),A.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,A.resolve()}removeTargets(e,t,n){let i=0;const s=[];return this.Nr.forEach(((o,u)=>{u.sequenceNumber<=t&&n.get(u.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,u.targetId)),i++)})),A.waitFor(s).next((()=>i))}getTargetCount(e){return A.resolve(this.targetCount)}getTargetData(e,t){const n=this.Nr.get(t)||null;return A.resolve(n)}addMatchingKeys(e,t,n){return this.Br.Rr(t,n),A.resolve()}removeMatchingKeys(e,t,n){this.Br.mr(t,n);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach((o=>{s.push(i.markPotentiallyOrphaned(e,o))})),A.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),A.resolve()}getMatchingKeysForTargetId(e,t){const n=this.Br.yr(t);return A.resolve(n)}containsKey(e,t){return A.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vf{constructor(e,t){this.qr={},this.overlays={},this.Qr=new je(0),this.Kr=!1,this.Kr=!0,this.$r=new qT,this.referenceDelegate=e(this),this.Ur=new GT(this),this.indexManager=new ST,this.remoteDocumentCache=(function(i){return new $T(i)})((n=>this.referenceDelegate.Wr(n))),this.serializer=new hf(t),this.Gr=new UT(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new BT,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.qr[e.toKey()];return n||(n=new jT(t,this.referenceDelegate),this.qr[e.toKey()]=n),n}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,n){V("MemoryPersistence","Starting transaction:",e);const i=new KT(this.Qr.next());return this.referenceDelegate.zr(),n(i).next((s=>this.referenceDelegate.jr(i).next((()=>s)))).toPromise().then((s=>(i.raiseOnCommittedEvent(),s)))}Hr(e,t){return A.or(Object.values(this.qr).map((n=>()=>n.containsKey(e,t))))}}class KT extends yd{constructor(e){super(),this.currentSequenceNumber=e}}class Fs{constructor(e){this.persistence=e,this.Jr=new Ba,this.Yr=null}static Zr(e){return new Fs(e)}get Xr(){if(this.Yr)return this.Yr;throw M()}addReference(e,t,n){return this.Jr.addReference(n,t),this.Xr.delete(n.toString()),A.resolve()}removeReference(e,t,n){return this.Jr.removeReference(n,t),this.Xr.add(n.toString()),A.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),A.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach((i=>this.Xr.add(i.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((i=>{i.forEach((s=>this.Xr.add(s.toString())))})).next((()=>n.removeTargetData(e,t)))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.Xr,(n=>{const i=O.fromPath(n);return this.ei(e,i).next((s=>{s||t.removeEntry(i,U.min())}))})).next((()=>(this.Yr=null,t.apply(e))))}updateLimboDocument(e,t){return this.ei(e,t).next((n=>{n?this.Xr.delete(t.toString()):this.Xr.add(t.toString())}))}Wr(e){return 0}ei(e,t){return A.or([()=>A.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WT{constructor(e){this.serializer=e}O(e,t,n,i){const s=new Ss("createOrUpgrade",t);n<1&&i>=1&&((function(c){c.createObjectStore("owner")})(e),(function(c){c.createObjectStore("mutationQueues",{keyPath:"userId"}),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",el,{unique:!0}),c.createObjectStore("documentMutations")})(e),ql(e),(function(c){c.createObjectStore("remoteDocuments")})(e));let o=A.resolve();return n<3&&i>=3&&(n!==0&&((function(c){c.deleteObjectStore("targetDocuments"),c.deleteObjectStore("targets"),c.deleteObjectStore("targetGlobal")})(e),ql(e)),o=o.next((()=>(function(c){const h=c.store("targetGlobal"),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:U.min().toTimestamp(),targetCount:0};return h.put("targetGlobalKey",f)})(s)))),n<4&&i>=4&&(n!==0&&(o=o.next((()=>(function(c,h){return h.store("mutations").U().next((f=>{c.deleteObjectStore("mutations"),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",el,{unique:!0});const m=h.store("mutations"),_=f.map((b=>m.put(b)));return A.waitFor(_)}))})(e,s)))),o=o.next((()=>{(function(c){c.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)}))),n<5&&i>=5&&(o=o.next((()=>this.ni(s)))),n<6&&i>=6&&(o=o.next((()=>((function(c){c.createObjectStore("remoteDocumentGlobal")})(e),this.ri(s))))),n<7&&i>=7&&(o=o.next((()=>this.ii(s)))),n<8&&i>=8&&(o=o.next((()=>this.si(e,s)))),n<9&&i>=9&&(o=o.next((()=>{(function(c){c.objectStoreNames.contains("remoteDocumentChanges")&&c.deleteObjectStore("remoteDocumentChanges")})(e)}))),n<10&&i>=10&&(o=o.next((()=>this.oi(s)))),n<11&&i>=11&&(o=o.next((()=>{(function(c){c.createObjectStore("bundles",{keyPath:"bundleId"})})(e),(function(c){c.createObjectStore("namedQueries",{keyPath:"name"})})(e)}))),n<12&&i>=12&&(o=o.next((()=>{(function(c){const h=c.createObjectStore("documentOverlays",{keyPath:vI});h.createIndex("collectionPathOverlayIndex",wI,{unique:!1}),h.createIndex("collectionGroupOverlayIndex",AI,{unique:!1})})(e)}))),n<13&&i>=13&&(o=o.next((()=>(function(c){const h=c.createObjectStore("remoteDocumentsV14",{keyPath:hI});h.createIndex("documentKeyIndex",dI),h.createIndex("collectionGroupIndex",fI)})(e))).next((()=>this._i(e,s))).next((()=>e.deleteObjectStore("remoteDocuments")))),n<14&&i>=14&&(o=o.next((()=>this.ai(e,s)))),n<15&&i>=15&&(o=o.next((()=>(function(c){c.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),c.createObjectStore("indexState",{keyPath:yI}).createIndex("sequenceNumberIndex",II,{unique:!1}),c.createObjectStore("indexEntries",{keyPath:TI}).createIndex("documentKeyIndex",EI,{unique:!1})})(e)))),n<16&&i>=16&&(o=o.next((()=>{t.objectStore("indexState").clear()})).next((()=>{t.objectStore("indexEntries").clear()}))),n<17&&i>=17&&(o=o.next((()=>{(function(c){c.createObjectStore("globals",{keyPath:"name"})})(e)}))),o}ri(e){let t=0;return e.store("remoteDocuments").J(((n,i)=>{t+=Is(i)})).next((()=>{const n={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",n)}))}ni(e){const t=e.store("mutationQueues"),n=e.store("mutations");return t.U().next((i=>A.forEach(i,(s=>{const o=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return n.U("userMutationsIndex",o).next((u=>A.forEach(u,(c=>{F(c.userId===s.userId);const h=Zt(this.serializer,c);return gf(e,s.userId,h).next((()=>{}))}))))}))))}ii(e){const t=e.store("targetDocuments"),n=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next((i=>{const s=[];return n.J(((o,u)=>{const c=new X(o),h=(function(m){return[0,xe(m)]})(c);s.push(t.get(h).next((f=>f?A.resolve():(m=>t.put({targetId:0,path:xe(m),sequenceNumber:i.highestListenSequenceNumber}))(c))))})).next((()=>A.waitFor(s)))}))}si(e,t){e.createObjectStore("collectionParents",{keyPath:_I});const n=t.store("collectionParents"),i=new Ua,s=o=>{if(i.add(o)){const u=o.lastSegment(),c=o.popLast();return n.put({collectionId:u,parent:xe(c)})}};return t.store("remoteDocuments").J({H:!0},((o,u)=>{const c=new X(o);return s(c.popLast())})).next((()=>t.store("documentMutations").J({H:!0},(([o,u,c],h)=>{const f=Qe(u);return s(f.popLast())}))))}oi(e){const t=e.store("targets");return t.J(((n,i)=>{const s=Nr(i),o=df(this.serializer,s);return t.put(o)}))}_i(e,t){const n=t.store("remoteDocuments"),i=[];return n.J(((s,o)=>{const u=t.store("remoteDocumentsV14"),c=(function(m){return m.document?new O(X.fromString(m.document.name).popFirst(5)):m.noDocument?O.fromSegments(m.noDocument.path):m.unknownDocument?O.fromSegments(m.unknownDocument.path):M()})(o).path.toArray(),h={prefixPath:c.slice(0,c.length-2),collectionGroup:c[c.length-2],documentId:c[c.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(u.put(h))})).next((()=>A.waitFor(i)))}ai(e,t){const n=t.store("mutations"),i=Tf(this.serializer),s=new vf(Fs.Zr,this.serializer.ct);return n.U().next((o=>{const u=new Map;return o.forEach((c=>{var h;let f=(h=u.get(c.userId))!==null&&h!==void 0?h:W();Zt(this.serializer,c).keys().forEach((m=>f=f.add(m))),u.set(c.userId,f)})),A.forEach(u,((c,h)=>{const f=new Ee(h),m=Ms.lt(this.serializer,f),_=s.getIndexManager(f),b=Ls.lt(f,this.serializer,_,s.referenceDelegate);return new Ef(i,b,m,_).recalculateAndSaveOverlaysForDocumentKeys(new Go(t,je.oe),c).next()}))}))}}function ql(r){r.createObjectStore("targetDocuments",{keyPath:mI}).createIndex("documentTargetsIndex",gI,{unique:!0}),r.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",pI,{unique:!0}),r.createObjectStore("targetGlobal")}const Do="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class qa{constructor(e,t,n,i,s,o,u,c,h,f,m=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.ui=s,this.window=o,this.document=u,this.ci=h,this.li=f,this.hi=m,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=_=>Promise.resolve(),!qa.D())throw new N(S.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new OT(this,i),this.Ai=t+"main",this.serializer=new hf(c),this.Ri=new Mt(this.Ai,this.hi,new WT(this.serializer)),this.$r=new vT,this.Ur=new DT(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Tf(this.serializer),this.Gr=new ET,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,f===!1&&Ne("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new N(S.FAILED_PRECONDITION,Do);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.Ur.getHighestSequenceNumber(e)))})).then((e=>{this.Qr=new je(e,this.ci)})).then((()=>{this.Kr=!0})).catch((e=>(this.Ri&&this.Ri.close(),Promise.reject(e))))}yi(e){return this.di=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget((async()=>{this.started&&await this.mi()})))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>qi(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.wi(e).next((t=>{t||(this.isPrimary=!1,this.ui.enqueueRetryable((()=>this.di(!1))))}))})).next((()=>this.Si(e))).next((t=>this.isPrimary&&!t?this.bi(e).next((()=>!1)):!!t&&this.Di(e).next((()=>!0)))))).catch((e=>{if($t(e))return V("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return V("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.ui.enqueueRetryable((()=>this.di(e))),this.isPrimary=e}))}wi(e){return Rr(e).get("owner").next((t=>A.resolve(this.vi(t))))}Ci(e){return qi(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const n=_e(t,"clientMetadata");return n.U().next((i=>{const s=this.xi(i,18e5),o=i.filter((u=>s.indexOf(u)===-1));return A.forEach(o,(u=>n.delete(u.clientId))).next((()=>o))}))})).catch((()=>[]));if(this.Vi)for(const t of e)this.Vi.removeItem(this.Oi(t.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.mi().then((()=>this.Fi())).then((()=>this.pi()))))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?A.resolve(!0):Rr(e).get("owner").next((t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)){if(this.vi(t)&&this.networkEnabled)return!0;if(!this.vi(t)){if(!t.allowTabSynchronization)throw new N(S.FAILED_PRECONDITION,Do);return!1}}return!(!this.networkEnabled||!this.inForeground)||qi(e).U().next((n=>this.xi(n,5e3).find((i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,u=this.networkEnabled===i.networkEnabled;if(s||o&&u)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&V("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],(e=>{const t=new Go(e,je.oe);return this.bi(t).next((()=>this.Ci(t)))})),this.Ri.close(),this.qi()}xi(e,t){return e.filter((n=>this.Mi(n.updateTimeMs,t)&&!this.Ni(n.clientId)))}Qi(){return this.runTransaction("getActiveClients","readonly",(e=>qi(e).U().next((t=>this.xi(t,18e5).map((n=>n.clientId))))))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,t){return Ls.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new CT(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return Ms.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,t,n){V("IndexedDbPersistence","Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=(function(c){return c===17?PI:c===16?bI:c===15?Pa:c===14?wd:c===13?vd:c===12?RI:c===11?Ed:void M()})(this.hi);let o;return this.Ri.runTransaction(e,i,s,(u=>(o=new Go(u,this.Qr?this.Qr.next():je.oe),t==="readwrite-primary"?this.wi(o).next((c=>!!c||this.Si(o))).next((c=>{if(!c)throw Ne(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable((()=>this.di(!1))),new N(S.FAILED_PRECONDITION,_d);return n(o)})).next((c=>this.Di(o).next((()=>c)))):this.Ki(o).next((()=>n(o)))))).then((u=>(o.raiseOnCommittedEvent(),u)))}Ki(e){return Rr(e).get("owner").next((t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)&&!this.vi(t)&&!(this.li||this.allowTabSynchronization&&t.allowTabSynchronization))throw new N(S.FAILED_PRECONDITION,Do)}))}Di(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Rr(e).put("owner",t)}static D(){return Mt.D()}bi(e){const t=Rr(e);return t.get("owner").next((n=>this.vi(n)?(V("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):A.resolve()))}Mi(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(Ne(`Detected an update time that is in the future: ${e} > ${n}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.mi())))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const t=/(?:Version|Mobile)\/1[456]/;Th()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var t;try{const n=((t=this.Vi)===null||t===void 0?void 0:t.getItem(this.Oi(e)))!==null;return V("IndexedDbPersistence",`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return Ne("IndexedDbPersistence","Failed to get zombied client id.",n),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){Ne("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Rr(r){return _e(r,"owner")}function qi(r){return _e(r,"clientMetadata")}function HT(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{constructor(e,t,n,i){this.targetId=e,this.fromCache=t,this.$i=n,this.Ui=i}static Wi(e,t){let n=W(),i=W();for(const s of t.docChanges)switch(s.type){case 0:n=n.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new ja(e,t.fromCache,n,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QT{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=(function(){return Th()?8:Id(ge())>0?6:4})()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,n,i){const s={result:null};return this.Yi(e,t).next((o=>{s.result=o})).next((()=>{if(!s.result)return this.Zi(e,t,i,n).next((o=>{s.result=o}))})).next((()=>{if(s.result)return;const o=new QT;return this.Xi(e,t,o).next((u=>{if(s.result=u,this.zi)return this.es(e,t,o,u.size)}))})).next((()=>s.result))}es(e,t,n,i){return n.documentReadCount<this.ji?(Nn()<=H.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",xn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),A.resolve()):(Nn()<=H.DEBUG&&V("QueryEngine","Query:",xn(t),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.Hi*i?(Nn()<=H.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",xn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,$e(t))):A.resolve())}Yi(e,t){if(fl(t))return A.resolve(null);let n=$e(t);return this.indexManager.getIndexType(e,n).next((i=>i===0?null:(t.limit!==null&&i===1&&(t=gs(t,null,"F"),n=$e(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next((s=>{const o=W(...s);return this.Ji.getDocuments(e,o).next((u=>this.indexManager.getMinOffset(e,n).next((c=>{const h=this.ts(t,u);return this.ns(t,h,o,c.readTime)?this.Yi(e,gs(t,null,"F")):this.rs(e,h,t,c)}))))})))))}Zi(e,t,n,i){return fl(t)||i.isEqual(U.min())?A.resolve(null):this.Ji.getDocuments(e,n).next((s=>{const o=this.ts(t,s);return this.ns(t,o,n,i)?A.resolve(null):(Nn()<=H.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),xn(t)),this.rs(e,o,t,rI(i,-1)).next((u=>u)))}))}ts(e,t){let n=new te(Ld(e));return t.forEach(((i,s)=>{li(e,s)&&(n=n.add(s))})),n}ns(e,t,n,i){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,t,n){return Nn()<=H.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",xn(t)),this.Ji.getDocumentsMatchingQuery(e,t,Be.min(),n)}rs(e,t,n,i){return this.Ji.getDocumentsMatchingQuery(e,n,i).next((s=>(t.forEach((o=>{s=s.insert(o.key,o)})),s)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JT{constructor(e,t,n,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new ae(G),this._s=new zt((s=>pn(s)),ci),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(n)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Ef(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.os)))}}function Af(r,e,t,n){return new JT(r,e,t,n)}async function Rf(r,e){const t=z(r);return await t.persistence.runTransaction("Handle user change","readonly",(n=>{let i;return t.mutationQueue.getAllMutationBatches(n).next((s=>(i=s,t.ls(e),t.mutationQueue.getAllMutationBatches(n)))).next((s=>{const o=[],u=[];let c=W();for(const h of i){o.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}for(const h of s){u.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}return t.localDocuments.getDocuments(n,c).next((h=>({hs:h,removedBatchIds:o,addedBatchIds:u})))}))}))}function YT(r,e){const t=z(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const i=e.batch.keys(),s=t.cs.newChangeBuffer({trackRemovals:!0});return(function(u,c,h,f){const m=h.batch,_=m.keys();let b=A.resolve();return _.forEach((C=>{b=b.next((()=>f.getEntry(c,C))).next((k=>{const D=h.docVersions.get(C);F(D!==null),k.version.compareTo(D)<0&&(m.applyToRemoteDocument(k,h),k.isValidDocument()&&(k.setReadTime(h.commitVersion),f.addEntry(k)))}))})),b.next((()=>u.mutationQueue.removeMutationBatch(c,m)))})(t,n,e,s).next((()=>s.apply(n))).next((()=>t.mutationQueue.performConsistencyCheck(n))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(n,i,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(u){let c=W();for(let h=0;h<u.mutationResults.length;++h)u.mutationResults[h].transformResults.length>0&&(c=c.add(u.batch.mutations[h].key));return c})(e)))).next((()=>t.localDocuments.getDocuments(n,i)))}))}function bf(r){const e=z(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Ur.getLastRemoteSnapshotVersion(t)))}function XT(r,e){const t=z(r),n=e.snapshotVersion;let i=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(s=>{const o=t.cs.newChangeBuffer({trackRemovals:!0});i=t.os;const u=[];e.targetChanges.forEach(((f,m)=>{const _=i.get(m);if(!_)return;u.push(t.Ur.removeMatchingKeys(s,f.removedDocuments,m).next((()=>t.Ur.addMatchingKeys(s,f.addedDocuments,m))));let b=_.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(m)!==null?b=b.withResumeToken(me.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):f.resumeToken.approximateByteSize()>0&&(b=b.withResumeToken(f.resumeToken,n)),i=i.insert(m,b),(function(k,D,j){return k.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=3e8?!0:j.addedDocuments.size+j.modifiedDocuments.size+j.removedDocuments.size>0})(_,b,f)&&u.push(t.Ur.updateTargetData(s,b))}));let c=Fe(),h=W();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(s,f))})),u.push(ZT(s,o,e.documentUpdates).next((f=>{c=f.Ps,h=f.Is}))),!n.isEqual(U.min())){const f=t.Ur.getLastRemoteSnapshotVersion(s).next((m=>t.Ur.setTargetsMetadata(s,s.currentSequenceNumber,n)));u.push(f)}return A.waitFor(u).next((()=>o.apply(s))).next((()=>t.localDocuments.getLocalViewOfDocuments(s,c,h))).next((()=>c))})).then((s=>(t.os=i,s)))}function ZT(r,e,t){let n=W(),i=W();return t.forEach((s=>n=n.add(s))),e.getEntries(r,n).next((s=>{let o=Fe();return t.forEach(((u,c)=>{const h=s.get(u);c.isFoundDocument()!==h.isFoundDocument()&&(i=i.add(u)),c.isNoDocument()&&c.version.isEqual(U.min())?(e.removeEntry(u,c.readTime),o=o.insert(u,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),o=o.insert(u,c)):V("LocalStore","Ignoring outdated watch update for ",u,". Current version:",h.version," Watch version:",c.version)})),{Ps:o,Is:i}}))}function eE(r,e){const t=z(r);return t.persistence.runTransaction("Get next mutation batch","readonly",(n=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e))))}function tE(r,e){const t=z(r);return t.persistence.runTransaction("Allocate target","readwrite",(n=>{let i;return t.Ur.getTargetData(n,e).next((s=>s?(i=s,A.resolve(i)):t.Ur.allocateTargetId(n).next((o=>(i=new ut(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.Ur.addTargetData(n,i).next((()=>i)))))))})).then((n=>{const i=t.os.get(n.targetId);return(i===null||n.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.os=t.os.insert(n.targetId,n),t._s.set(e,n.targetId)),n}))}async function sa(r,e,t){const n=z(r),i=n.os.get(e),s=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",s,(o=>n.persistence.referenceDelegate.removeTarget(o,i)))}catch(o){if(!$t(o))throw o;V("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}n.os=n.os.remove(e),n._s.delete(i.target)}function jl(r,e,t){const n=z(r);let i=U.min(),s=W();return n.persistence.runTransaction("Execute query","readwrite",(o=>(function(c,h,f){const m=z(c),_=m._s.get(f);return _!==void 0?A.resolve(m.os.get(_)):m.Ur.getTargetData(h,f)})(n,o,$e(e)).next((u=>{if(u)return i=u.lastLimboFreeSnapshotVersion,n.Ur.getMatchingKeysForTargetId(o,u.targetId).next((c=>{s=c}))})).next((()=>n.ss.getDocumentsMatchingQuery(o,e,t?i:U.min(),t?s:W()))).next((u=>(nE(n,jI(e),u),{documents:u,Ts:s})))))}function nE(r,e,t){let n=r.us.get(e)||U.min();t.forEach(((i,s)=>{s.readTime.compareTo(n)>0&&(n=s.readTime)})),r.us.set(e,n)}class $l{constructor(){this.activeTargetIds=HI()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Pf{constructor(){this.so=new $l,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,n){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new $l,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rE{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zl{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){V("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){V("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ji=null;function Vo(){return ji===null?ji=(function(){return 268435456+Math.round(2147483648*Math.random())})():ji++,"0x"+ji.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sE{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Se="WebChannelConnection";class oE extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const n=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=n+"://"+t.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(t,n,i,s,o){const u=Vo(),c=this.xo(t,n.toUriEncodedString());V("RestConnection",`Sending RPC '${t}' ${u}:`,c,i);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,s,o),this.No(t,c,h,i).then((f=>(V("RestConnection",`Received RPC '${t}' ${u}: `,f),f)),(f=>{throw ln("RestConnection",`RPC '${t}' ${u} failed with error: `,f,"url: ",c,"request:",i),f}))}Lo(t,n,i,s,o,u){return this.Mo(t,n,i,s,o)}Oo(t,n,i){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Zn})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach(((s,o)=>t[o]=s)),i&&i.headers.forEach(((s,o)=>t[o]=s))}xo(t,n){const i=iE[t];return`${this.Do}/v1/${n}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,n,i){const s=Vo();return new Promise(((o,u)=>{const c=new ud;c.setWithCredentials(!0),c.listenOnce(cd.COMPLETE,(()=>{try{switch(c.getLastErrorCode()){case Ji.NO_ERROR:const f=c.getResponseJson();V(Se,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(f)),o(f);break;case Ji.TIMEOUT:V(Se,`RPC '${e}' ${s} timed out`),u(new N(S.DEADLINE_EXCEEDED,"Request time out"));break;case Ji.HTTP_ERROR:const m=c.getStatus();if(V(Se,`RPC '${e}' ${s} failed with status:`,m,"response text:",c.getResponseText()),m>0){let _=c.getResponseJson();Array.isArray(_)&&(_=_[0]);const b=_==null?void 0:_.error;if(b&&b.status&&b.message){const C=(function(D){const j=D.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(j)>=0?j:S.UNKNOWN})(b.status);u(new N(C,b.message))}else u(new N(S.UNKNOWN,"Server responded with status "+c.getStatus()))}else u(new N(S.UNAVAILABLE,"Connection failed."));break;default:M()}}finally{V(Se,`RPC '${e}' ${s} completed.`)}}));const h=JSON.stringify(i);V(Se,`RPC '${e}' ${s} sending request:`,i),c.send(t,"POST",h,n,15)}))}Bo(e,t,n){const i=Vo(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=dd(),u=hd(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,t,n),c.encodeInitMessageHeaders=!0;const f=s.join("");V(Se,`Creating RPC '${e}' stream ${i}: ${f}`,c);const m=o.createWebChannel(f,c);let _=!1,b=!1;const C=new sE({Io:D=>{b?V(Se,`Not sending because RPC '${e}' stream ${i} is closed:`,D):(_||(V(Se,`Opening RPC '${e}' stream ${i} transport.`),m.open(),_=!0),V(Se,`RPC '${e}' stream ${i} sending:`,D),m.send(D))},To:()=>m.close()}),k=(D,j,B)=>{D.listen(j,(L=>{try{B(L)}catch(q){setTimeout((()=>{throw q}),0)}}))};return k(m,Dr.EventType.OPEN,(()=>{b||(V(Se,`RPC '${e}' stream ${i} transport opened.`),C.yo())})),k(m,Dr.EventType.CLOSE,(()=>{b||(b=!0,V(Se,`RPC '${e}' stream ${i} transport closed`),C.So())})),k(m,Dr.EventType.ERROR,(D=>{b||(b=!0,ln(Se,`RPC '${e}' stream ${i} transport errored:`,D),C.So(new N(S.UNAVAILABLE,"The operation could not be completed")))})),k(m,Dr.EventType.MESSAGE,(D=>{var j;if(!b){const B=D.data[0];F(!!B);const L=B,q=L.error||((j=L[0])===null||j===void 0?void 0:j.error);if(q){V(Se,`RPC '${e}' stream ${i} received error:`,q);const J=q.status;let K=(function(I){const E=pe[I];if(E!==void 0)return Jd(E)})(J),T=q.message;K===void 0&&(K=S.INTERNAL,T="Unknown error status: "+J+" with message "+q.message),b=!0,C.So(new N(K,T)),m.close()}else V(Se,`RPC '${e}' stream ${i} received:`,B),C.bo(B)}})),k(u,ld.STAT_EVENT,(D=>{D.stat===$o.PROXY?V(Se,`RPC '${e}' stream ${i} detected buffering proxy`):D.stat===$o.NOPROXY&&V(Se,`RPC '${e}' stream ${i} detected no buffering proxy`)})),setTimeout((()=>{C.wo()}),0),C}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aE(){return typeof window<"u"?window:null}function rs(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Us(r){return new cT(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $a{constructor(e,t,n=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=t,this.ko=n,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),n=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-n);i>0&&V("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,(()=>(this.Uo=Date.now(),e()))),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sf{constructor(e,t,n,i,s,o,u,c){this.ui=e,this.Ho=n,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=u,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new $a(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,(()=>this.__())))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===S.RESOURCE_EXHAUSTED?(Ne(t.toString()),Ne("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,i])=>{this.Yo===t&&this.P_(n,i)}),(n=>{e((()=>{const i=new N(S.UNKNOWN,"Fetching auth token failed: "+n.message);return this.I_(i)}))}))}P_(e,t){const n=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo((()=>{n((()=>this.listener.Eo()))})),this.stream.Ro((()=>{n((()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,(()=>(this.r_()&&(this.state=3),Promise.resolve()))),this.listener.Ro())))})),this.stream.mo((i=>{n((()=>this.I_(i)))})),this.stream.onMessage((i=>{n((()=>++this.e_==1?this.E_(i):this.onNext(i)))}))}i_(){this.state=5,this.t_.Go((async()=>{this.state=0,this.start()}))}I_(e){return V("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget((()=>this.Yo===e?t():(V("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class uE extends Sf{constructor(e,t,n,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,i,o),this.serializer=s}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=fT(this.serializer,e),n=(function(s){if(!("targetChange"in s))return U.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?U.min():o.readTime?Ie(o.readTime):U.min()})(e);return this.listener.d_(t,n)}A_(e){const t={};t.database=ea(this.serializer),t.addTarget=(function(s,o){let u;const c=o.target;if(u=ps(c)?{documents:sf(s,c)}:{query:of(s,c)._t},u.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){u.resumeToken=Zd(s,o.resumeToken);const h=Xo(s,o.expectedCount);h!==null&&(u.expectedCount=h)}else if(o.snapshotVersion.compareTo(U.min())>0){u.readTime=Jn(s,o.snapshotVersion.toTimestamp());const h=Xo(s,o.expectedCount);h!==null&&(u.expectedCount=h)}return u})(this.serializer,e);const n=mT(this.serializer,e);n&&(t.labels=n),this.a_(t)}R_(e){const t={};t.database=ea(this.serializer),t.removeTarget=e,this.a_(t)}}class cE extends Sf{constructor(e,t,n,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return F(!!e.streamToken),this.lastStreamToken=e.streamToken,F(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){F(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=pT(e.writeResults,e.commitTime),n=Ie(e.commitTime);return this.listener.g_(n,t)}p_(){const e={};e.database=ea(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map((n=>Zr(this.serializer,n)))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lE extends class{}{constructor(e,t,n,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new N(S.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,n,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,o])=>this.connection.Mo(e,Zo(t,n),i,s,o))).catch((s=>{throw s.name==="FirebaseError"?(s.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new N(S.UNKNOWN,s.toString())}))}Lo(e,t,n,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,u])=>this.connection.Lo(e,Zo(t,n),i,o,u,s))).catch((o=>{throw o.name==="FirebaseError"?(o.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new N(S.UNKNOWN,o.toString())}))}terminate(){this.y_=!0,this.connection.terminate()}}class hE{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve()))))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Ne(t),this.D_=!1):V("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dE{constructor(e,t,n,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o((o=>{n.enqueueAndForget((async()=>{An(this)&&(V("RemoteStore","Restarting streams for network reachability change."),await(async function(c){const h=z(c);h.L_.add(4),await fi(h),h.q_.set("Unknown"),h.L_.delete(4),await Bs(h)})(this))}))})),this.q_=new hE(n,i)}}async function Bs(r){if(An(r))for(const e of r.B_)await e(!0)}async function fi(r){for(const e of r.B_)await e(!1)}function Cf(r,e){const t=z(r);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),Wa(t)?Ka(t):tr(t).r_()&&Ga(t,e))}function za(r,e){const t=z(r),n=tr(t);t.N_.delete(e),n.r_()&&Df(t,e),t.N_.size===0&&(n.r_()?n.o_():An(t)&&t.q_.set("Unknown"))}function Ga(r,e){if(r.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(U.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}tr(r).A_(e)}function Df(r,e){r.Q_.xe(e),tr(r).R_(e)}function Ka(r){r.Q_=new sT({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>r.N_.get(e)||null,tt:()=>r.datastore.serializer.databaseId}),tr(r).start(),r.q_.v_()}function Wa(r){return An(r)&&!tr(r).n_()&&r.N_.size>0}function An(r){return z(r).L_.size===0}function Vf(r){r.Q_=void 0}async function fE(r){r.q_.set("Online")}async function pE(r){r.N_.forEach(((e,t)=>{Ga(r,e)}))}async function mE(r,e){Vf(r),Wa(r)?(r.q_.M_(e),Ka(r)):r.q_.set("Unknown")}async function gE(r,e,t){if(r.q_.set("Online"),e instanceof Xd&&e.state===2&&e.cause)try{await(async function(i,s){const o=s.cause;for(const u of s.targetIds)i.N_.has(u)&&(await i.remoteSyncer.rejectListen(u,o),i.N_.delete(u),i.Q_.removeTarget(u))})(r,e)}catch(n){V("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Ts(r,n)}else if(e instanceof ns?r.Q_.Ke(e):e instanceof Yd?r.Q_.He(e):r.Q_.We(e),!t.isEqual(U.min()))try{const n=await bf(r.localStore);t.compareTo(n)>=0&&await(function(s,o){const u=s.Q_.rt(o);return u.targetChanges.forEach(((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const f=s.N_.get(h);f&&s.N_.set(h,f.withResumeToken(c.resumeToken,o))}})),u.targetMismatches.forEach(((c,h)=>{const f=s.N_.get(c);if(!f)return;s.N_.set(c,f.withResumeToken(me.EMPTY_BYTE_STRING,f.snapshotVersion)),Df(s,c);const m=new ut(f.target,c,h,f.sequenceNumber);Ga(s,m)})),s.remoteSyncer.applyRemoteEvent(u)})(r,t)}catch(n){V("RemoteStore","Failed to raise snapshot:",n),await Ts(r,n)}}async function Ts(r,e,t){if(!$t(e))throw e;r.L_.add(1),await fi(r),r.q_.set("Offline"),t||(t=()=>bf(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{V("RemoteStore","Retrying IndexedDB access"),await t(),r.L_.delete(1),await Bs(r)}))}function kf(r,e){return e().catch((t=>Ts(r,t,e)))}async function pi(r){const e=z(r),t=jt(e);let n=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;_E(e);)try{const i=await eE(e.localStore,n);if(i===null){e.O_.length===0&&t.o_();break}n=i.batchId,yE(e,i)}catch(i){await Ts(e,i)}Nf(e)&&xf(e)}function _E(r){return An(r)&&r.O_.length<10}function yE(r,e){r.O_.push(e);const t=jt(r);t.r_()&&t.V_&&t.m_(e.mutations)}function Nf(r){return An(r)&&!jt(r).n_()&&r.O_.length>0}function xf(r){jt(r).start()}async function IE(r){jt(r).p_()}async function TE(r){const e=jt(r);for(const t of r.O_)e.m_(t.mutations)}async function EE(r,e,t){const n=r.O_.shift(),i=xa.from(n,e,t);await kf(r,(()=>r.remoteSyncer.applySuccessfulWrite(i))),await pi(r)}async function vE(r,e){e&&jt(r).V_&&await(async function(n,i){if((function(o){return Qd(o)&&o!==S.ABORTED})(i.code)){const s=n.O_.shift();jt(n).s_(),await kf(n,(()=>n.remoteSyncer.rejectFailedWrite(s.batchId,i))),await pi(n)}})(r,e),Nf(r)&&xf(r)}async function Gl(r,e){const t=z(r);t.asyncQueue.verifyOperationInProgress(),V("RemoteStore","RemoteStore received new credentials");const n=An(t);t.L_.add(3),await fi(t),n&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Bs(t)}async function wE(r,e){const t=z(r);e?(t.L_.delete(2),await Bs(t)):e||(t.L_.add(2),await fi(t),t.q_.set("Unknown"))}function tr(r){return r.K_||(r.K_=(function(t,n,i){const s=z(t);return s.w_(),new uE(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(r.datastore,r.asyncQueue,{Eo:fE.bind(null,r),Ro:pE.bind(null,r),mo:mE.bind(null,r),d_:gE.bind(null,r)}),r.B_.push((async e=>{e?(r.K_.s_(),Wa(r)?Ka(r):r.q_.set("Unknown")):(await r.K_.stop(),Vf(r))}))),r.K_}function jt(r){return r.U_||(r.U_=(function(t,n,i){const s=z(t);return s.w_(),new cE(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(r.datastore,r.asyncQueue,{Eo:()=>Promise.resolve(),Ro:IE.bind(null,r),mo:vE.bind(null,r),f_:TE.bind(null,r),g_:EE.bind(null,r)}),r.B_.push((async e=>{e?(r.U_.s_(),await pi(r)):(await r.U_.stop(),r.O_.length>0&&(V("RemoteStore",`Stopping write stream with ${r.O_.length} pending writes`),r.O_=[]))}))),r.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha{constructor(e,t,n,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=i,this.removalCallback=s,this.deferred=new He,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,i,s){const o=Date.now()+n,u=new Ha(e,t,o,i,s);return u.start(n),u}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(S.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Qa(r,e){if(Ne("AsyncQueue",`${e}: ${r}`),$t(r))return new N(S.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e){this.comparator=e?(t,n)=>e(t,n)||O.comparator(t.key,n.key):(t,n)=>O.comparator(t.key,n.key),this.keyedMap=Vr(),this.sortedSet=new ae(this.comparator)}static emptySet(e){return new $n(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof $n)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=n.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new $n;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kl{constructor(){this.W_=new ae(O.comparator)}track(e){const t=e.doc.key,n=this.W_.get(t);n?e.type!==0&&n.type===3?this.W_=this.W_.insert(t,e):e.type===3&&n.type!==1?this.W_=this.W_.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.W_=this.W_.remove(t):e.type===1&&n.type===2?this.W_=this.W_.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):M():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal(((t,n)=>{e.push(n)})),e}}class Yn{constructor(e,t,n,i,s,o,u,c,h){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=u,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,t,n,i,s){const o=[];return t.forEach((u=>{o.push({type:0,doc:u})})),new Yn(e,t,$n.emptySet(t),o,n,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ks(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==n[i].type||!t[i].doc.isEqual(n[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AE{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some((e=>e.J_()))}}class RE{constructor(){this.queries=Wl(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,n){const i=z(t),s=i.queries;i.queries=Wl(),s.forEach(((o,u)=>{for(const c of u.j_)c.onError(n)}))})(this,new N(S.ABORTED,"Firestore shutting down"))}}function Wl(){return new zt((r=>Md(r)),ks)}async function Of(r,e){const t=z(r);let n=3;const i=e.query;let s=t.queries.get(i);s?!s.H_()&&e.J_()&&(n=2):(s=new AE,n=e.J_()?0:1);try{switch(n){case 0:s.z_=await t.onListen(i,!0);break;case 1:s.z_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const u=Qa(o,`Initialization of query '${xn(e.query)}' failed`);return void e.onError(u)}t.queries.set(i,s),s.j_.push(e),e.Z_(t.onlineState),s.z_&&e.X_(s.z_)&&Ja(t)}async function Mf(r,e){const t=z(r),n=e.query;let i=3;const s=t.queries.get(n);if(s){const o=s.j_.indexOf(e);o>=0&&(s.j_.splice(o,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function bE(r,e){const t=z(r);let n=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const u of o.j_)u.X_(i)&&(n=!0);o.z_=i}}n&&Ja(t)}function PE(r,e,t){const n=z(r),i=n.queries.get(e);if(i)for(const s of i.j_)s.onError(t);n.queries.delete(e)}function Ja(r){r.Y_.forEach((e=>{e.next()}))}var oa,Hl;(Hl=oa||(oa={})).ea="default",Hl.Cache="cache";class Lf{constructor(e,t,n){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=n||{}}X_(e){if(!this.options.includeMetadataChanges){const n=[];for(const i of e.docChanges)i.type!==3&&n.push(i);e=new Yn(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const n=t!=="Offline";return(!this.options._a||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=Yn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==oa.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ff{constructor(e){this.key=e}}class Uf{constructor(e){this.key=e}}class SE{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=W(),this.mutatedKeys=W(),this.Aa=Ld(e),this.Ra=new $n(this.Aa)}get Va(){return this.Ta}ma(e,t){const n=t?t.fa:new Kl,i=t?t.Ra:this.Ra;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,u=!1;const c=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,h=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal(((f,m)=>{const _=i.get(f),b=li(this.query,m)?m:null,C=!!_&&this.mutatedKeys.has(_.key),k=!!b&&(b.hasLocalMutations||this.mutatedKeys.has(b.key)&&b.hasCommittedMutations);let D=!1;_&&b?_.data.isEqual(b.data)?C!==k&&(n.track({type:3,doc:b}),D=!0):this.ga(_,b)||(n.track({type:2,doc:b}),D=!0,(c&&this.Aa(b,c)>0||h&&this.Aa(b,h)<0)&&(u=!0)):!_&&b?(n.track({type:0,doc:b}),D=!0):_&&!b&&(n.track({type:1,doc:_}),D=!0,(c||h)&&(u=!0)),D&&(b?(o=o.add(b),s=k?s.add(f):s.delete(f)):(o=o.delete(f),s=s.delete(f)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),s=s.delete(f.key),n.track({type:1,doc:f})}return{Ra:o,fa:n,ns:u,mutatedKeys:s}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort(((f,m)=>(function(b,C){const k=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M()}};return k(b)-k(C)})(f.type,m.type)||this.Aa(f.doc,m.doc))),this.pa(n),i=i!=null&&i;const u=t&&!i?this.ya():[],c=this.da.size===0&&this.current&&!i?1:0,h=c!==this.Ea;return this.Ea=c,o.length!==0||h?{snapshot:new Yn(this.query,e.Ra,s,o,e.mutatedKeys,c===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),wa:u}:{wa:u}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Kl,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach((t=>this.Ta=this.Ta.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ta=this.Ta.delete(t))),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=W(),this.Ra.forEach((n=>{this.Sa(n.key)&&(this.da=this.da.add(n.key))}));const t=[];return e.forEach((n=>{this.da.has(n)||t.push(new Uf(n))})),this.da.forEach((n=>{e.has(n)||t.push(new Ff(n))})),t}ba(e){this.Ta=e.Ts,this.da=W();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return Yn.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class CE{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class DE{constructor(e){this.key=e,this.va=!1}}class VE{constructor(e,t,n,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new zt((u=>Md(u)),ks),this.Ma=new Map,this.xa=new Set,this.Oa=new ae(O.comparator),this.Na=new Map,this.La=new Ba,this.Ba={},this.ka=new Map,this.qa=_n.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function kE(r,e,t=!0){const n=Gf(r);let i;const s=n.Fa.get(e);return s?(n.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await Bf(n,e,t,!0),i}async function NE(r,e){const t=Gf(r);await Bf(t,e,!0,!1)}async function Bf(r,e,t,n){const i=await tE(r.localStore,$e(e)),s=i.targetId,o=r.sharedClientState.addLocalQueryTarget(s,t);let u;return n&&(u=await xE(r,e,s,o==="current",i.resumeToken)),r.isPrimaryClient&&t&&Cf(r.remoteStore,i),u}async function xE(r,e,t,n,i){r.Ka=(m,_,b)=>(async function(k,D,j,B){let L=D.view.ma(j);L.ns&&(L=await jl(k.localStore,D.query,!1).then((({documents:T})=>D.view.ma(T,L))));const q=B&&B.targetChanges.get(D.targetId),J=B&&B.targetMismatches.get(D.targetId)!=null,K=D.view.applyChanges(L,k.isPrimaryClient,q,J);return Jl(k,D.targetId,K.wa),K.snapshot})(r,m,_,b);const s=await jl(r.localStore,e,!0),o=new SE(e,s.Ts),u=o.ma(s.documents),c=di.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",i),h=o.applyChanges(u,r.isPrimaryClient,c);Jl(r,t,h.wa);const f=new CE(e,t,o);return r.Fa.set(e,f),r.Ma.has(t)?r.Ma.get(t).push(e):r.Ma.set(t,[e]),h.snapshot}async function OE(r,e,t){const n=z(r),i=n.Fa.get(e),s=n.Ma.get(i.targetId);if(s.length>1)return n.Ma.set(i.targetId,s.filter((o=>!ks(o,e)))),void n.Fa.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(i.targetId),n.sharedClientState.isActiveQueryTarget(i.targetId)||await sa(n.localStore,i.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(i.targetId),t&&za(n.remoteStore,i.targetId),aa(n,i.targetId)})).catch(En)):(aa(n,i.targetId),await sa(n.localStore,i.targetId,!0))}async function ME(r,e){const t=z(r),n=t.Fa.get(e),i=t.Ma.get(n.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),za(t.remoteStore,n.targetId))}async function LE(r,e,t){const n=Kf(r);try{const i=await(function(o,u){const c=z(o),h=ce.now(),f=u.reduce(((b,C)=>b.add(C.key)),W());let m,_;return c.persistence.runTransaction("Locally write mutations","readwrite",(b=>{let C=Fe(),k=W();return c.cs.getEntries(b,f).next((D=>{C=D,C.forEach(((j,B)=>{B.isValidDocument()||(k=k.add(j))}))})).next((()=>c.localDocuments.getOverlayedDocuments(b,C))).next((D=>{m=D;const j=[];for(const B of u){const L=tT(B,m.get(B.key).overlayedDocument);L!=null&&j.push(new _t(B.key,L,Sd(L.value.mapValue),fe.exists(!0)))}return c.mutationQueue.addMutationBatch(b,h,j,u)})).next((D=>{_=D;const j=D.applyToLocalDocumentSet(m,k);return c.documentOverlayCache.saveOverlays(b,D.batchId,j)}))})).then((()=>({batchId:_.batchId,changes:Ud(m)})))})(n.localStore,e);n.sharedClientState.addPendingMutation(i.batchId),(function(o,u,c){let h=o.Ba[o.currentUser.toKey()];h||(h=new ae(G)),h=h.insert(u,c),o.Ba[o.currentUser.toKey()]=h})(n,i.batchId,t),await mi(n,i.changes),await pi(n.remoteStore)}catch(i){const s=Qa(i,"Failed to persist write");t.reject(s)}}async function qf(r,e){const t=z(r);try{const n=await XT(t.localStore,e);e.targetChanges.forEach(((i,s)=>{const o=t.Na.get(s);o&&(F(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?F(o.va):i.removedDocuments.size>0&&(F(o.va),o.va=!1))})),await mi(t,n,e)}catch(n){await En(n)}}function Ql(r,e,t){const n=z(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const i=[];n.Fa.forEach(((s,o)=>{const u=o.view.Z_(e);u.snapshot&&i.push(u.snapshot)})),(function(o,u){const c=z(o);c.onlineState=u;let h=!1;c.queries.forEach(((f,m)=>{for(const _ of m.j_)_.Z_(u)&&(h=!0)})),h&&Ja(c)})(n.eventManager,e),i.length&&n.Ca.d_(i),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function FE(r,e,t){const n=z(r);n.sharedClientState.updateQueryState(e,"rejected",t);const i=n.Na.get(e),s=i&&i.key;if(s){let o=new ae(O.comparator);o=o.insert(s,oe.newNoDocument(s,U.min()));const u=W().add(s),c=new Os(U.min(),new Map,new ae(G),o,u);await qf(n,c),n.Oa=n.Oa.remove(s),n.Na.delete(e),Ya(n)}else await sa(n.localStore,e,!1).then((()=>aa(n,e,t))).catch(En)}async function UE(r,e){const t=z(r),n=e.batch.batchId;try{const i=await YT(t.localStore,e);$f(t,n,null),jf(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await mi(t,i)}catch(i){await En(i)}}async function BE(r,e,t){const n=z(r);try{const i=await(function(o,u){const c=z(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return c.mutationQueue.lookupMutationBatch(h,u).next((m=>(F(m!==null),f=m.keys(),c.mutationQueue.removeMutationBatch(h,m)))).next((()=>c.mutationQueue.performConsistencyCheck(h))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(h,f,u))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>c.localDocuments.getDocuments(h,f)))}))})(n.localStore,e);$f(n,e,t),jf(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await mi(n,i)}catch(i){await En(i)}}function jf(r,e){(r.ka.get(e)||[]).forEach((t=>{t.resolve()})),r.ka.delete(e)}function $f(r,e,t){const n=z(r);let i=n.Ba[n.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),n.Ba[n.currentUser.toKey()]=i}}function aa(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Ma.get(e))r.Fa.delete(n),t&&r.Ca.$a(n,t);r.Ma.delete(e),r.isPrimaryClient&&r.La.gr(e).forEach((n=>{r.La.containsKey(n)||zf(r,n)}))}function zf(r,e){r.xa.delete(e.path.canonicalString());const t=r.Oa.get(e);t!==null&&(za(r.remoteStore,t),r.Oa=r.Oa.remove(e),r.Na.delete(t),Ya(r))}function Jl(r,e,t){for(const n of t)n instanceof Ff?(r.La.addReference(n.key,e),qE(r,n)):n instanceof Uf?(V("SyncEngine","Document no longer in limbo: "+n.key),r.La.removeReference(n.key,e),r.La.containsKey(n.key)||zf(r,n.key)):M()}function qE(r,e){const t=e.key,n=t.path.canonicalString();r.Oa.get(t)||r.xa.has(n)||(V("SyncEngine","New document in limbo: "+t),r.xa.add(n),Ya(r))}function Ya(r){for(;r.xa.size>0&&r.Oa.size<r.maxConcurrentLimboResolutions;){const e=r.xa.values().next().value;r.xa.delete(e);const t=new O(X.fromString(e)),n=r.qa.next();r.Na.set(n,new DE(t)),r.Oa=r.Oa.insert(t,n),Cf(r.remoteStore,new ut($e(Vs(t.path)),n,"TargetPurposeLimboResolution",je.oe))}}async function mi(r,e,t){const n=z(r),i=[],s=[],o=[];n.Fa.isEmpty()||(n.Fa.forEach(((u,c)=>{o.push(n.Ka(c,e,t).then((h=>{var f;if((h||t)&&n.isPrimaryClient){const m=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(c.targetId))===null||f===void 0?void 0:f.current;n.sharedClientState.updateQueryState(c.targetId,m?"current":"not-current")}if(h){i.push(h);const m=ja.Wi(c.targetId,h);s.push(m)}})))})),await Promise.all(o),n.Ca.d_(i),await(async function(c,h){const f=z(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(m=>A.forEach(h,(_=>A.forEach(_.$i,(b=>f.persistence.referenceDelegate.addReference(m,_.targetId,b))).next((()=>A.forEach(_.Ui,(b=>f.persistence.referenceDelegate.removeReference(m,_.targetId,b)))))))))}catch(m){if(!$t(m))throw m;V("LocalStore","Failed to update sequence numbers: "+m)}for(const m of h){const _=m.targetId;if(!m.fromCache){const b=f.os.get(_),C=b.snapshotVersion,k=b.withLastLimboFreeSnapshotVersion(C);f.os=f.os.insert(_,k)}}})(n.localStore,s))}async function jE(r,e){const t=z(r);if(!t.currentUser.isEqual(e)){V("SyncEngine","User change. New user:",e.toKey());const n=await Rf(t.localStore,e);t.currentUser=e,(function(s,o){s.ka.forEach((u=>{u.forEach((c=>{c.reject(new N(S.CANCELLED,o))}))})),s.ka.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await mi(t,n.hs)}}function $E(r,e){const t=z(r),n=t.Na.get(e);if(n&&n.va)return W().add(n.key);{let i=W();const s=t.Ma.get(e);if(!s)return i;for(const o of s){const u=t.Fa.get(o);i=i.unionWith(u.view.Va)}return i}}function Gf(r){const e=z(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=qf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=$E.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=FE.bind(null,e),e.Ca.d_=bE.bind(null,e.eventManager),e.Ca.$a=PE.bind(null,e.eventManager),e}function Kf(r){const e=z(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=UE.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=BE.bind(null,e),e}class ei{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Us(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return Af(this.persistence,new wf,e.initialUser,this.serializer)}Ga(e){return new vf(Fs.Zr,this.serializer)}Wa(e){return new Pf}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ei.provider={build:()=>new ei};class zE extends ei{constructor(e,t,n){super(),this.Ja=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await Kf(this.Ja.syncEngine),await pi(this.Ja.remoteStore),await this.persistence.yi((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}za(e){return Af(this.persistence,new wf,e.initialUser,this.serializer)}ja(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new kT(n,e.asyncQueue,t)}Ha(e,t){const n=new aI(t,this.persistence);return new oI(e.asyncQueue,n)}Ga(e){const t=HT(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?Oe.withCacheSize(this.cacheSizeBytes):Oe.DEFAULT;return new qa(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,aE(),rs(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new Pf}}class Es{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Ql(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=jE.bind(null,this.syncEngine),await wE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new RE})()}createDatastore(e){const t=Us(e.databaseInfo.databaseId),n=(function(s){return new oE(s)})(e.databaseInfo);return(function(s,o,u,c){return new lE(s,o,u,c)})(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return(function(n,i,s,o,u){return new dE(n,i,s,o,u)})(this.localStore,this.datastore,e.asyncQueue,(t=>Ql(this.syncEngine,t,0)),(function(){return zl.D()?new zl:new rE})())}createSyncEngine(e,t){return(function(i,s,o,u,c,h,f){const m=new VE(i,s,o,u,c,h);return f&&(m.Qa=!0),m})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(i){const s=z(i);V("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await fi(s),s.k_.shutdown(),s.q_.set("Unknown")})(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Es.provider={build:()=>new Es};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wf{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Ne("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GE{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new N(S.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await(async function(i,s){const o=z(i),u={documents:s.map((m=>Xr(o.serializer,m)))},c=await o.Lo("BatchGetDocuments",o.serializer.databaseId,X.emptyPath(),u,s.length),h=new Map;c.forEach((m=>{const _=dT(o.serializer,m);h.set(_.key.toString(),_)}));const f=[];return s.forEach((m=>{const _=h.get(m.toString());F(!!_),f.push(_)})),f})(this.datastore,e);return t.forEach((n=>this.recordVersion(n))),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(n){this.lastTransactionError=n}this.writtenDocs.add(e.toString())}delete(e){this.write(new hi(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach((t=>{e.delete(t.key.toString())})),e.forEach(((t,n)=>{const i=O.fromPath(n);this.mutations.push(new ka(i,this.precondition(i)))})),await(async function(n,i){const s=z(n),o={writes:i.map((u=>Zr(s.serializer,u)))};await s.Mo("Commit",s.serializer.databaseId,X.emptyPath(),o)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw M();t=U.min()}const n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new N(S.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(U.min())?fe.exists(!1):fe.updateTime(t):fe.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(U.min()))throw new N(S.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return fe.updateTime(t)}return fe.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KE{constructor(e,t,n,i,s){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=i,this.deferred=s,this._u=n.maxAttempts,this.t_=new $a(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go((async()=>{const e=new GE(this.datastore),t=this.cu(e);t&&t.then((n=>{this.asyncQueue.enqueueAndForget((()=>e.commit().then((()=>{this.deferred.resolve(n)})).catch((i=>{this.lu(i)}))))})).catch((n=>{this.lu(n)}))}))}cu(e){try{const t=this.updateFunction(e);return!ui(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}lu(e){this._u>0&&this.hu(e)?(this._u-=1,this.asyncQueue.enqueueAndForget((()=>(this.uu(),Promise.resolve())))):this.deferred.reject(e)}hu(e){if(e.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!Qd(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WE{constructor(e,t,n,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=i,this.user=Ee.UNAUTHENTICATED,this.clientId=pd.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,(async o=>{V("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(n,(o=>(V("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new He;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Qa(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function ko(r,e){r.asyncQueue.verifyOperationInProgress(),V("FirestoreClient","Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener((async i=>{n.isEqual(i)||(await Rf(e.localStore,i),n=i)})),e.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=e}async function Yl(r,e){r.asyncQueue.verifyOperationInProgress();const t=await HE(r);V("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener((n=>Gl(e.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,i)=>Gl(e.remoteStore,i))),r._onlineComponents=e}async function HE(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){V("FirestoreClient","Using user provided OfflineComponentProvider");try{await ko(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(i){return i.name==="FirebaseError"?i.code===S.FAILED_PRECONDITION||i.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11})(t))throw t;ln("Error using user provided cache. Falling back to memory cache: "+t),await ko(r,new ei)}}else V("FirestoreClient","Using default OfflineComponentProvider"),await ko(r,new ei);return r._offlineComponents}async function Xa(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(V("FirestoreClient","Using user provided OnlineComponentProvider"),await Yl(r,r._uninitializedComponentsProvider._online)):(V("FirestoreClient","Using default OnlineComponentProvider"),await Yl(r,new Es))),r._onlineComponents}function QE(r){return Xa(r).then((e=>e.syncEngine))}function JE(r){return Xa(r).then((e=>e.datastore))}async function Hf(r){const e=await Xa(r),t=e.eventManager;return t.onListen=kE.bind(null,e.syncEngine),t.onUnlisten=OE.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=NE.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=ME.bind(null,e.syncEngine),t}function YE(r,e,t={}){const n=new He;return r.asyncQueue.enqueueAndForget((async()=>(function(s,o,u,c,h){const f=new Wf({next:_=>{f.Za(),o.enqueueAndForget((()=>Mf(s,m)));const b=_.docs.has(u);!b&&_.fromCache?h.reject(new N(S.UNAVAILABLE,"Failed to get document because the client is offline.")):b&&_.fromCache&&c&&c.source==="server"?h.reject(new N(S.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(_)},error:_=>h.reject(_)}),m=new Lf(Vs(u.path),f,{includeMetadataChanges:!0,_a:!0});return Of(s,m)})(await Hf(r),r.asyncQueue,e,t,n))),n.promise}function XE(r,e,t={}){const n=new He;return r.asyncQueue.enqueueAndForget((async()=>(function(s,o,u,c,h){const f=new Wf({next:_=>{f.Za(),o.enqueueAndForget((()=>Mf(s,m))),_.fromCache&&c.source==="server"?h.reject(new N(S.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(_)},error:_=>h.reject(_)}),m=new Lf(u,f,{includeMetadataChanges:!0,_a:!0});return Of(s,m)})(await Hf(r),r.asyncQueue,e,t,n))),n.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qf(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xl=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jf(r,e,t){if(!t)throw new N(S.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function ZE(r,e,t,n){if(e===!0&&n===!0)throw new N(S.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function Zl(r){if(!O.isDocumentKey(r))throw new N(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function eh(r){if(O.isDocumentKey(r))throw new N(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function qs(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=(function(n){return n.constructor?n.constructor.name:null})(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":M()}function qe(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new N(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=qs(r);throw new N(S.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class th{constructor(e){var t,n;if(e.host===void 0){if(e.ssl!==void 0)throw new N(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new N(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}ZE("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Qf((n=e.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),(function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new N(S.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new N(S.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new N(S.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(n,i){return n.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class js{constructor(e,t,n,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new th({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new N(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new th(e),e.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new Hy;switch(n.type){case"firstParty":return new Xy(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new N(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const n=Xl.get(t);n&&(V("ComponentProvider","Removing Datastore"),Xl.delete(t),n.terminate())})(this),Promise.resolve()}}function ev(r,e,t,n={}){var i;const s=(r=qe(r,js))._getSettings(),o=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&ln("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),r._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),n.mockUserToken){let u,c;if(typeof n.mockUserToken=="string")u=n.mockUserToken,c=Ee.MOCK_USER;else{u=Ih(n.mockUserToken,(i=r._app)===null||i===void 0?void 0:i.options.projectId);const h=n.mockUserToken.sub||n.mockUserToken.user_id;if(!h)throw new N(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new Ee(h)}r._authCredentials=new Qy(new fd(u,c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new yt(this.firestore,e,this._query)}}class Ce{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Lt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ce(this.firestore,e,this._key)}}class Lt extends yt{constructor(e,t,n){super(e,t,Vs(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ce(this.firestore,null,new O(e))}withConverter(e){return new Lt(this.firestore,e,this._path)}}function qw(r,e,...t){if(r=re(r),Jf("collection","path",e),r instanceof js){const n=X.fromString(e,...t);return eh(n),new Lt(r,null,n)}{if(!(r instanceof Ce||r instanceof Lt))throw new N(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(e,...t));return eh(n),new Lt(r.firestore,null,n)}}function tv(r,e,...t){if(r=re(r),arguments.length===1&&(e=pd.newId()),Jf("doc","path",e),r instanceof js){const n=X.fromString(e,...t);return Zl(n),new Ce(r,null,new O(n))}{if(!(r instanceof Ce||r instanceof Lt))throw new N(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(e,...t));return Zl(n),new Ce(r.firestore,r instanceof Lt?r.converter:null,new O(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nh{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new $a(this,"async_queue_retry"),this.Vu=()=>{const n=rs();n&&V("AsyncQueue","Visibility state changed to "+n.visibilityState),this.t_.jo()},this.mu=e;const t=rs();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=rs();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise((()=>{}));const t=new He;return this.gu((()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Pu.push(e),this.pu())))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!$t(e))throw e;V("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go((()=>this.pu()))}}gu(e){const t=this.mu.then((()=>(this.du=!0,e().catch((n=>{this.Eu=n,this.du=!1;const i=(function(o){let u=o.message||"";return o.stack&&(u=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),u})(n);throw Ne("INTERNAL UNHANDLED ERROR: ",i),n})).then((n=>(this.du=!1,n))))));return this.mu=t,t}enqueueAfterDelay(e,t,n){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const i=Ha.createAndSchedule(this,e,t,n,(s=>this.yu(s)));return this.Tu.push(i),i}fu(){this.Eu&&M()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then((()=>{this.Tu.sort(((t,n)=>t.targetTimeMs-n.targetTimeMs));for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()}))}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class It extends js{constructor(e,t,n,i){super(e,t,n,i),this.type="firestore",this._queue=new nh,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new nh(e),this._firestoreClient=void 0,await e}}}function nv(r,e){const t=typeof r=="object"?r:da(),n=typeof r=="string"?r:"(default)",i=As(t,"firestore").getImmediate({identifier:n});if(!i._initialized){const s=gh("firestore");s&&ev(i,...s)}return i}function $s(r){if(r._terminated)throw new N(S.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Yf(r),r._firestoreClient}function Yf(r){var e,t,n;const i=r._freezeSettings(),s=(function(u,c,h,f){return new CI(u,c,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Qf(f.experimentalLongPollingOptions),f.useFetchStreams)})(r._databaseId,((e=r._app)===null||e===void 0?void 0:e.options.appId)||"",r._persistenceKey,i);r._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((n=i.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),r._firestoreClient=new WE(r._authCredentials,r._appCheckCredentials,r._queue,s,r._componentsProvider&&(function(u){const c=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(c),_online:c}})(r._componentsProvider))}function rv(r,e){ln("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=r._freezeSettings();return iv(r,Es.provider,{build:n=>new zE(n,t.cacheSizeBytes,void 0)}),Promise.resolve()}function iv(r,e,t){if((r=qe(r,It))._firestoreClient||r._terminated)throw new N(S.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(r._componentsProvider||r._getSettings().localCache)throw new N(S.FAILED_PRECONDITION,"SDK cache is already specified.");r._componentsProvider={_online:e,_offline:t},Yf(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new yn(me.fromBase64String(e))}catch(t){throw new N(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new yn(me.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new N(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ue(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function jw(){return new nr("__name__")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Za{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new N(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new N(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return G(this._lat,e._lat)||G(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(n,i){if(n.length!==i.length)return!1;for(let s=0;s<n.length;++s)if(n[s]!==i[s])return!1;return!0})(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sv=/^__.*__$/;class ov{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new _t(e,this.data,this.fieldMask,t,this.fieldTransforms):new er(e,this.data,t,this.fieldTransforms)}}class Xf{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new _t(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Zf(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M()}}class tu{constructor(e,t,n,i,s,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new tu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:n,xu:!1});return i.Ou(e),i}Nu(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:n,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return vs(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Zf(this.Cu)&&sv.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class av{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Us(e)}Qu(e,t,n,i=!1){return new tu({Cu:e,methodName:t,qu:n,path:ue.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function rr(r){const e=r._freezeSettings(),t=Us(r._databaseId);return new av(r._databaseId,!!e.ignoreUndefinedProperties,t)}function nu(r,e,t,n,i,s={}){const o=r.Qu(s.merge||s.mergeFields?2:0,e,t,i);iu("Data must be an object, but it was:",o,n);const u=rp(n,o);let c,h;if(s.merge)c=new Me(o.fieldMask),h=o.fieldTransforms;else if(s.mergeFields){const f=[];for(const m of s.mergeFields){const _=ua(e,m,t);if(!o.contains(_))throw new N(S.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);sp(f,_)||f.push(_)}c=new Me(f),h=o.fieldTransforms.filter((m=>c.covers(m.field)))}else c=null,h=o.fieldTransforms;return new ov(new we(u),c,h)}class Gs extends zs{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Gs}}class ru extends zs{_toFieldTransform(e){return new Kd(e.path,new Wn)}isEqual(e){return e instanceof ru}}function ep(r,e,t,n){const i=r.Qu(1,e,t);iu("Data must be an object, but it was:",i,n);const s=[],o=we.empty();vn(n,((c,h)=>{const f=su(e,c,t);h=re(h);const m=i.Nu(f);if(h instanceof Gs)s.push(f);else{const _=gi(h,m);_!=null&&(s.push(f),o.set(f,_))}}));const u=new Me(s);return new Xf(o,u,i.fieldTransforms)}function tp(r,e,t,n,i,s){const o=r.Qu(1,e,t),u=[ua(e,n,t)],c=[i];if(s.length%2!=0)throw new N(S.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<s.length;_+=2)u.push(ua(e,s[_])),c.push(s[_+1]);const h=[],f=we.empty();for(let _=u.length-1;_>=0;--_)if(!sp(h,u[_])){const b=u[_];let C=c[_];C=re(C);const k=o.Nu(b);if(C instanceof Gs)h.push(b);else{const D=gi(C,k);D!=null&&(h.push(b),f.set(b,D))}}const m=new Me(h);return new Xf(f,m,o.fieldTransforms)}function np(r,e,t,n=!1){return gi(t,r.Qu(n?4:3,e))}function gi(r,e){if(ip(r=re(r)))return iu("Unsupported field value:",e,r),rp(r,e);if(r instanceof zs)return(function(n,i){if(!Zf(i.Cu))throw i.Bu(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${n._methodName}() is not currently supported inside arrays`);const s=n._toFieldTransform(i);s&&i.fieldTransforms.push(s)})(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return(function(n,i){const s=[];let o=0;for(const u of n){let c=gi(u,i.Lu(o));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),o++}return{arrayValue:{values:s}}})(r,e)}return(function(n,i){if((n=re(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return QI(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const s=ce.fromDate(n);return{timestampValue:Jn(i.serializer,s)}}if(n instanceof ce){const s=new ce(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Jn(i.serializer,s)}}if(n instanceof Za)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof yn)return{bytesValue:Zd(i.serializer,n._byteString)};if(n instanceof Ce){const s=i.databaseId,o=n.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:La(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof eu)return(function(o,u){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map((c=>{if(typeof c!="number")throw u.Bu("VectorValues must only contain numeric values.");return Va(u.serializer,c)}))}}}}}})(n,i);throw i.Bu(`Unsupported field value: ${qs(n)}`)})(r,e)}function rp(r,e){const t={};return Ad(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):vn(r,((n,i)=>{const s=gi(i,e.Mu(n));s!=null&&(t[n]=s)})),{mapValue:{fields:t}}}function ip(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof ce||r instanceof Za||r instanceof yn||r instanceof Ce||r instanceof zs||r instanceof eu)}function iu(r,e,t){if(!ip(t)||!(function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)})(t)){const n=qs(t);throw n==="an object"?e.Bu(r+" a custom object"):e.Bu(r+" "+n)}}function ua(r,e,t){if((e=re(e))instanceof nr)return e._internalPath;if(typeof e=="string")return su(r,e);throw vs("Field path arguments must be of type string or ",r,!1,void 0,t)}const uv=new RegExp("[~\\*/\\[\\]]");function su(r,e,t){if(e.search(uv)>=0)throw vs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new nr(...e.split("."))._internalPath}catch{throw vs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function vs(r,e,t,n,i){const s=n&&!n.isEmpty(),o=i!==void 0;let u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${n}`),o&&(c+=` in document ${i}`),c+=")"),new N(S.INVALID_ARGUMENT,u+r+c)}function sp(r,e){return r.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti{constructor(e,t,n,i,s){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Ce(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new cv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Ks("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class cv extends ti{data(){return super.data()}}function Ks(r,e){return typeof e=="string"?su(r,e):e instanceof nr?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lv(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new N(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ou{}class Ws extends ou{}function $w(r,e,...t){let n=[];e instanceof ou&&n.push(e),n=n.concat(t),(function(s){const o=s.filter((c=>c instanceof au)).length,u=s.filter((c=>c instanceof Hs)).length;if(o>1||o>0&&u>0)throw new N(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const i of n)r=i._apply(r);return r}class Hs extends Ws{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new Hs(e,t,n)}_apply(e){const t=this._parse(e);return op(e._query,t),new yt(e.firestore,e.converter,Yo(e._query,t))}_parse(e){const t=rr(e.firestore);return(function(s,o,u,c,h,f,m){let _;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new N(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){ih(m,f);const b=[];for(const C of m)b.push(rh(c,s,C));_={arrayValue:{values:b}}}else _=rh(c,s,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||ih(m,f),_=np(u,o,m,f==="in"||f==="not-in");return Q.create(h,f,_)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function zw(r,e,t){const n=e,i=Ks("where",r);return Hs._create(i,n,t)}class au extends ou{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new au(e,t)}_parse(e){const t=this._queryConstraints.map((n=>n._parse(e))).filter((n=>n.getFilters().length>0));return t.length===1?t[0]:ee.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(i,s){let o=i;const u=s.getFlattenedFilters();for(const c of u)op(o,c),o=Yo(o,c)})(e._query,t),new yt(e.firestore,e.converter,Yo(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class uu extends Ws{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new uu(e,t)}_apply(e){const t=(function(i,s,o){if(i.startAt!==null)throw new N(S.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new N(S.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Jr(s,o)})(e._query,this._field,this._direction);return new yt(e.firestore,e.converter,(function(i,s){const o=i.explicitOrderBy.concat([s]);return new wn(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)})(e._query,t))}}function Gw(r,e="asc"){const t=e,n=Ks("orderBy",r);return uu._create(n,t)}class cu extends Ws{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new cu(e,t,n)}_apply(e){return new yt(e.firestore,e.converter,gs(e._query,this._limit,this._limitType))}}function Kw(r){return cu._create("limit",r,"F")}class lu extends Ws{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new lu(e,t,n)}_apply(e){const t=hv(e,this.type,this._docOrFields,this._inclusive);return new yt(e.firestore,e.converter,(function(i,s){return new wn(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,s,i.endAt)})(e._query,t))}}function Ww(...r){return lu._create("startAfter",r,!1)}function hv(r,e,t,n){if(t[0]=re(t[0]),t[0]instanceof ti)return(function(s,o,u,c,h){if(!c)throw new N(S.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${u}().`);const f=[];for(const m of jn(s))if(m.field.isKeyField())f.push(fn(o,c.key));else{const _=c.data.field(m.field);if(Cs(_))throw new N(S.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+m.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(_===null){const b=m.field.canonicalString();throw new N(S.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${b}' (used as the orderBy) does not exist.`)}f.push(_)}return new qt(f,h)})(r._query,r.firestore._databaseId,e,t[0]._document,n);{const i=rr(r.firestore);return(function(o,u,c,h,f,m){const _=o.explicitOrderBy;if(f.length>_.length)throw new N(S.INVALID_ARGUMENT,`Too many arguments provided to ${h}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const b=[];for(let C=0;C<f.length;C++){const k=f[C];if(_[C].field.isKeyField()){if(typeof k!="string")throw new N(S.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${h}(), but got a ${typeof k}`);if(!Da(o)&&k.indexOf("/")!==-1)throw new N(S.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${h}() must be a plain document ID, but '${k}' contains a slash.`);const D=o.path.child(X.fromString(k));if(!O.isDocumentKey(D))throw new N(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${h}() must result in a valid document path, but '${D}' is not because it contains an odd number of segments.`);const j=new O(D);b.push(fn(u,j))}else{const D=np(c,h,k);b.push(D)}}return new qt(b,m)})(r._query,r.firestore._databaseId,i,e,t,n)}}function rh(r,e,t){if(typeof(t=re(t))=="string"){if(t==="")throw new N(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Da(e)&&t.indexOf("/")!==-1)throw new N(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(X.fromString(t));if(!O.isDocumentKey(n))throw new N(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return fn(r,new O(n))}if(t instanceof Ce)return fn(r,t._key);throw new N(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${qs(t)}.`)}function ih(r,e){if(!Array.isArray(r)||r.length===0)throw new N(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function op(r,e){const t=(function(i,s){for(const o of i)for(const u of o.getFlattenedFilters())if(s.indexOf(u.op)>=0)return u.op;return null})(r.filters,(function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new N(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new N(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class ap{convertValue(e,t="none"){switch(dn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return se(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Ut(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw M()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return vn(e,((i,s)=>{n[i]=this.convertValue(s,t)})),n}convertVectorValue(e){var t,n,i;const s=(i=(n=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.map((o=>se(o.doubleValue)));return new eu(s)}convertGeoPoint(e){return new Za(se(e.latitude),se(e.longitude))}convertArray(e,t){return(e.values||[]).map((n=>this.convertValue(n,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Sa(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Wr(e));default:return null}}convertTimestamp(e){const t=ft(e);return new ce(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=X.fromString(e);F(lf(n));const i=new hn(n.get(1),n.get(3)),s=new O(n.popFirst(5));return i.isEqual(t)||Ne(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hu(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}class dv extends ap{constructor(e){super(),this.firestore=e}convertBytes(e){return new yn(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ce(this.firestore,null,t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class du extends ti{constructor(e,t,n,i,s,o){super(e,t,n,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new is(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Ks("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class is extends du{data(e={}){return super.data(e)}}class fv{constructor(e,t,n,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Fn(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new is(this._firestore,this._userDataWriter,n.key,n,new Fn(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new N(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map((u=>{const c=new is(i._firestore,i._userDataWriter,u.doc.key,u.doc,new Fn(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);return u.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}}))}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter((u=>s||u.type!==3)).map((u=>{const c=new is(i._firestore,i._userDataWriter,u.doc.key,u.doc,new Fn(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);let h=-1,f=-1;return u.type!==0&&(h=o.indexOf(u.doc.key),o=o.delete(u.doc.key)),u.type!==1&&(o=o.add(u.doc),f=o.indexOf(u.doc.key)),{type:pv(u.type),doc:c,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function pv(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hw(r){r=qe(r,Ce);const e=qe(r.firestore,It);return YE($s(e),r._key).then((t=>mv(e,r,t)))}class fu extends ap{constructor(e){super(),this.firestore=e}convertBytes(e){return new yn(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ce(this.firestore,null,t)}}function Qw(r){r=qe(r,yt);const e=qe(r.firestore,It),t=$s(e),n=new fu(e);return lv(r._query),XE(t,r._query).then((i=>new fv(e,n,r,i)))}function Jw(r,e,t){r=qe(r,Ce);const n=qe(r.firestore,It),i=hu(r.converter,e,t);return Qs(n,[nu(rr(n),"setDoc",r._key,i,r.converter!==null,t).toMutation(r._key,fe.none())])}function Yw(r,e,t,...n){r=qe(r,Ce);const i=qe(r.firestore,It),s=rr(i);let o;return o=typeof(e=re(e))=="string"||e instanceof nr?tp(s,"updateDoc",r._key,e,t,n):ep(s,"updateDoc",r._key,e),Qs(i,[o.toMutation(r._key,fe.exists(!0))])}function Xw(r){return Qs(qe(r.firestore,It),[new hi(r._key,fe.none())])}function Zw(r,e){const t=qe(r.firestore,It),n=tv(r),i=hu(r.converter,e);return Qs(t,[nu(rr(r.firestore),"addDoc",n._key,i,r.converter!==null,{}).toMutation(n._key,fe.exists(!1))]).then((()=>n))}function Qs(r,e){return(function(n,i){const s=new He;return n.asyncQueue.enqueueAndForget((async()=>LE(await QE(n),i,s))),s.promise})($s(r),e)}function mv(r,e,t){const n=t.docs.get(e._key),i=new fu(r);return new du(r,i,e._key,n,new Fn(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gv={maxAttempts:5};function br(r,e){if((r=re(r)).firestore!==e)throw new N(S.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _v extends class{constructor(t,n){this._firestore=t,this._transaction=n,this._dataReader=rr(t)}get(t){const n=br(t,this._firestore),i=new dv(this._firestore);return this._transaction.lookup([n._key]).then((s=>{if(!s||s.length!==1)return M();const o=s[0];if(o.isFoundDocument())return new ti(this._firestore,i,o.key,o,n.converter);if(o.isNoDocument())return new ti(this._firestore,i,n._key,null,n.converter);throw M()}))}set(t,n,i){const s=br(t,this._firestore),o=hu(s.converter,n,i),u=nu(this._dataReader,"Transaction.set",s._key,o,s.converter!==null,i);return this._transaction.set(s._key,u),this}update(t,n,i,...s){const o=br(t,this._firestore);let u;return u=typeof(n=re(n))=="string"||n instanceof nr?tp(this._dataReader,"Transaction.update",o._key,n,i,s):ep(this._dataReader,"Transaction.update",o._key,n),this._transaction.update(o._key,u),this}delete(t){const n=br(t,this._firestore);return this._transaction.delete(n._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=br(e,this._firestore),n=new fu(this._firestore);return super.get(e).then((i=>new du(this._firestore,n,t._key,i._document,new Fn(!1,!1),t.converter)))}}function tA(r,e,t){r=qe(r,It);const n=Object.assign(Object.assign({},gv),t);return(function(s){if(s.maxAttempts<1)throw new N(S.INVALID_ARGUMENT,"Max attempts must be at least 1")})(n),(function(s,o,u){const c=new He;return s.asyncQueue.enqueueAndForget((async()=>{const h=await JE(s);new KE(s.asyncQueue,h,u,o,c).au()})),c.promise})($s(r),(i=>e(new _v(r,i))),n)}function nA(){return new ru("serverTimestamp")}(function(e,t=!0){(function(i){Zn=i})(Tn),on(new Ft("firestore",((n,{instanceIdentifier:i,options:s})=>{const o=n.getProvider("app").getImmediate(),u=new It(new Jy(n.getProvider("auth-internal")),new eI(n.getProvider("app-check-internal")),(function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new N(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new hn(h.options.projectId,f)})(o,i),o);return s=Object.assign({useFetchStreams:t},s),u._setSettings(s),u}),"PUBLIC").setMultipleInstances(!0)),Xe(Yc,"4.7.3",e),Xe(Yc,"4.7.3","esm2017")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const up="firebasestorage.googleapis.com",cp="storageBucket",yv=120*1e3,Iv=600*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de extends tt{constructor(e,t,n=0){super(No(e),`Firebase Storage: ${t} (${No(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,de.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return No(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var he;(function(r){r.UNKNOWN="unknown",r.OBJECT_NOT_FOUND="object-not-found",r.BUCKET_NOT_FOUND="bucket-not-found",r.PROJECT_NOT_FOUND="project-not-found",r.QUOTA_EXCEEDED="quota-exceeded",r.UNAUTHENTICATED="unauthenticated",r.UNAUTHORIZED="unauthorized",r.UNAUTHORIZED_APP="unauthorized-app",r.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",r.INVALID_CHECKSUM="invalid-checksum",r.CANCELED="canceled",r.INVALID_EVENT_NAME="invalid-event-name",r.INVALID_URL="invalid-url",r.INVALID_DEFAULT_BUCKET="invalid-default-bucket",r.NO_DEFAULT_BUCKET="no-default-bucket",r.CANNOT_SLICE_BLOB="cannot-slice-blob",r.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",r.NO_DOWNLOAD_URL="no-download-url",r.INVALID_ARGUMENT="invalid-argument",r.INVALID_ARGUMENT_COUNT="invalid-argument-count",r.APP_DELETED="app-deleted",r.INVALID_ROOT_OPERATION="invalid-root-operation",r.INVALID_FORMAT="invalid-format",r.INTERNAL_ERROR="internal-error",r.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(he||(he={}));function No(r){return"storage/"+r}function pu(){const r="An unknown error occurred, please check the error payload for server response.";return new de(he.UNKNOWN,r)}function Tv(r){return new de(he.OBJECT_NOT_FOUND,"Object '"+r+"' does not exist.")}function Ev(r){return new de(he.QUOTA_EXCEEDED,"Quota for bucket '"+r+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function vv(){const r="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new de(he.UNAUTHENTICATED,r)}function wv(){return new de(he.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function Av(r){return new de(he.UNAUTHORIZED,"User does not have permission to access '"+r+"'.")}function Rv(){return new de(he.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function bv(){return new de(he.CANCELED,"User canceled the upload/download.")}function Pv(r){return new de(he.INVALID_URL,"Invalid URL '"+r+"'.")}function Sv(r){return new de(he.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+r+"'.")}function Cv(){return new de(he.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+cp+"' property when initializing the app?")}function Dv(){return new de(he.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function Vv(){return new de(he.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function kv(r){return new de(he.UNSUPPORTED_ENVIRONMENT,`${r} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function ca(r){return new de(he.INVALID_ARGUMENT,r)}function lp(){return new de(he.APP_DELETED,"The Firebase app was deleted.")}function Nv(r){return new de(he.INVALID_ROOT_OPERATION,"The operation '"+r+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Ur(r,e){return new de(he.INVALID_FORMAT,"String does not match format '"+r+"': "+e)}function Pr(r){throw new de(he.INTERNAL_ERROR,"Internal error: "+r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=Ue.makeFromUrl(e,t)}catch{return new Ue(e,"")}if(n.path==="")return n;throw Sv(e)}static makeFromUrl(e,t){let n=null;const i="([A-Za-z0-9.\\-_]+)";function s(q){q.path.charAt(q.path.length-1)==="/"&&(q.path_=q.path_.slice(0,-1))}const o="(/(.*))?$",u=new RegExp("^gs://"+i+o,"i"),c={bucket:1,path:3};function h(q){q.path_=decodeURIComponent(q.path)}const f="v[A-Za-z0-9_]+",m=t.replace(/[.]/g,"\\."),_="(/([^?#]*).*)?$",b=new RegExp(`^https?://${m}/${f}/b/${i}/o${_}`,"i"),C={bucket:1,path:3},k=t===up?"(?:storage.googleapis.com|storage.cloud.google.com)":t,D="([^?#]*)",j=new RegExp(`^https?://${k}/${i}/${D}`,"i"),L=[{regex:u,indices:c,postModify:s},{regex:b,indices:C,postModify:h},{regex:j,indices:{bucket:1,path:2},postModify:h}];for(let q=0;q<L.length;q++){const J=L[q],K=J.regex.exec(e);if(K){const T=K[J.indices.bucket];let g=K[J.indices.path];g||(g=""),n=new Ue(T,g),J.postModify(n);break}}if(n==null)throw Pv(e);return n}}class xv{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ov(r,e,t){let n=1,i=null,s=null,o=!1,u=0;function c(){return u===2}let h=!1;function f(...D){h||(h=!0,e.apply(null,D))}function m(D){i=setTimeout(()=>{i=null,r(b,c())},D)}function _(){s&&clearTimeout(s)}function b(D,...j){if(h){_();return}if(D){_(),f.call(null,D,...j);return}if(c()||o){_(),f.call(null,D,...j);return}n<64&&(n*=2);let L;u===1?(u=2,L=0):L=(n+Math.random())*1e3,m(L)}let C=!1;function k(D){C||(C=!0,_(),!h&&(i!==null?(D||(u=2),clearTimeout(i),m(0)):D||(u=1)))}return m(0),s=setTimeout(()=>{o=!0,k(!0)},t),k}function Mv(r){r(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lv(r){return r!==void 0}function Fv(r){return typeof r=="object"&&!Array.isArray(r)}function mu(r){return typeof r=="string"||r instanceof String}function sh(r){return gu()&&r instanceof Blob}function gu(){return typeof Blob<"u"}function oh(r,e,t,n){if(n<e)throw ca(`Invalid value for '${r}'. Expected ${e} or greater.`);if(n>t)throw ca(`Invalid value for '${r}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Js(r,e,t){let n=e;return t==null&&(n=`https://${e}`),`${t}://${n}/v0${r}`}function hp(r){const e=encodeURIComponent;let t="?";for(const n in r)if(r.hasOwnProperty(n)){const i=e(n)+"="+e(r[n]);t=t+i+"&"}return t=t.slice(0,-1),t}var sn;(function(r){r[r.NO_ERROR=0]="NO_ERROR",r[r.NETWORK_ERROR=1]="NETWORK_ERROR",r[r.ABORT=2]="ABORT"})(sn||(sn={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uv(r,e){const t=r>=500&&r<600,i=[408,429].indexOf(r)!==-1,s=e.indexOf(r)!==-1;return t||i||s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bv{constructor(e,t,n,i,s,o,u,c,h,f,m,_=!0){this.url_=e,this.method_=t,this.headers_=n,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=u,this.errorCallback_=c,this.timeout_=h,this.progressCallback_=f,this.connectionFactory_=m,this.retry=_,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((b,C)=>{this.resolve_=b,this.reject_=C,this.start_()})}start_(){const e=(n,i)=>{if(i){n(!1,new $i(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=u=>{const c=u.loaded,h=u.lengthComputable?u.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,h)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const u=s.getErrorCode()===sn.NO_ERROR,c=s.getStatus();if(!u||Uv(c,this.additionalRetryCodes_)&&this.retry){const f=s.getErrorCode()===sn.ABORT;n(!1,new $i(!1,null,f));return}const h=this.successCodes_.indexOf(c)!==-1;n(!0,new $i(h,s))})},t=(n,i)=>{const s=this.resolve_,o=this.reject_,u=i.connection;if(i.wasSuccessCode)try{const c=this.callback_(u,u.getResponse());Lv(c)?s(c):s()}catch(c){o(c)}else if(u!==null){const c=pu();c.serverResponse=u.getErrorText(),this.errorCallback_?o(this.errorCallback_(u,c)):o(c)}else if(i.canceled){const c=this.appDelete_?lp():bv();o(c)}else{const c=Rv();o(c)}};this.canceled_?t(!1,new $i(!1,null,!0)):this.backoffId_=Ov(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&Mv(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class $i{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}function qv(r,e){e!==null&&e.length>0&&(r.Authorization="Firebase "+e)}function jv(r,e){r["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function $v(r,e){e&&(r["X-Firebase-GMPID"]=e)}function zv(r,e){e!==null&&(r["X-Firebase-AppCheck"]=e)}function Gv(r,e,t,n,i,s,o=!0){const u=hp(r.urlParams),c=r.url+u,h=Object.assign({},r.headers);return $v(h,e),qv(h,t),jv(h,s),zv(h,n),new Bv(c,r.method,h,r.body,r.successCodes,r.additionalRetryCodes,r.handler,r.errorHandler,r.timeout,r.progressCallback,i,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kv(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Wv(...r){const e=Kv();if(e!==void 0){const t=new e;for(let n=0;n<r.length;n++)t.append(r[n]);return t.getBlob()}else{if(gu())return new Blob(r);throw new de(he.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function Hv(r,e,t){return r.webkitSlice?r.webkitSlice(e,t):r.mozSlice?r.mozSlice(e,t):r.slice?r.slice(e,t):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qv(r){if(typeof atob>"u")throw kv("base-64");return atob(r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ye={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class xo{constructor(e,t){this.data=e,this.contentType=t||null}}function Jv(r,e){switch(r){case Ye.RAW:return new xo(dp(e));case Ye.BASE64:case Ye.BASE64URL:return new xo(fp(r,e));case Ye.DATA_URL:return new xo(Xv(e),Zv(e))}throw pu()}function dp(r){const e=[];for(let t=0;t<r.length;t++){let n=r.charCodeAt(t);if(n<=127)e.push(n);else if(n<=2047)e.push(192|n>>6,128|n&63);else if((n&64512)===55296)if(!(t<r.length-1&&(r.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const s=n,o=r.charCodeAt(++t);n=65536|(s&1023)<<10|o&1023,e.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|n&63)}else(n&64512)===56320?e.push(239,191,189):e.push(224|n>>12,128|n>>6&63,128|n&63)}return new Uint8Array(e)}function Yv(r){let e;try{e=decodeURIComponent(r)}catch{throw Ur(Ye.DATA_URL,"Malformed data URL.")}return dp(e)}function fp(r,e){switch(r){case Ye.BASE64:{const i=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(i||s)throw Ur(r,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case Ye.BASE64URL:{const i=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(i||s)throw Ur(r,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=Qv(e)}catch(i){throw i.message.includes("polyfill")?i:Ur(r,"Invalid character found")}const n=new Uint8Array(t.length);for(let i=0;i<t.length;i++)n[i]=t.charCodeAt(i);return n}class pp{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw Ur(Ye.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=t[1]||null;n!=null&&(this.base64=ew(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=e.substring(e.indexOf(",")+1)}}function Xv(r){const e=new pp(r);return e.base64?fp(Ye.BASE64,e.rest):Yv(e.rest)}function Zv(r){return new pp(r).contentType}function ew(r,e){return r.length>=e.length?r.substring(r.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(e,t){let n=0,i="";sh(e)?(this.data_=e,n=e.size,i=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),n=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),n=e.length),this.size_=n,this.type_=i}size(){return this.size_}type(){return this.type_}slice(e,t){if(sh(this.data_)){const n=this.data_,i=Hv(n,e,t);return i===null?null:new kt(i)}else{const n=new Uint8Array(this.data_.buffer,e,t-e);return new kt(n,!0)}}static getBlob(...e){if(gu()){const t=e.map(n=>n instanceof kt?n.data_:n);return new kt(Wv.apply(null,t))}else{const t=e.map(o=>mu(o)?Jv(Ye.RAW,o).data:o.data_);let n=0;t.forEach(o=>{n+=o.byteLength});const i=new Uint8Array(n);let s=0;return t.forEach(o=>{for(let u=0;u<o.length;u++)i[s++]=o[u]}),new kt(i,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mp(r){let e;try{e=JSON.parse(r)}catch{return null}return Fv(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tw(r){if(r.length===0)return null;const e=r.lastIndexOf("/");return e===-1?"":r.slice(0,e)}function nw(r,e){const t=e.split("/").filter(n=>n.length>0).join("/");return r.length===0?t:r+"/"+t}function gp(r){const e=r.lastIndexOf("/",r.length-2);return e===-1?r:r.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rw(r,e){return e}class ke{constructor(e,t,n,i){this.server=e,this.local=t||e,this.writable=!!n,this.xform=i||rw}}let zi=null;function iw(r){return!mu(r)||r.length<2?r:gp(r)}function _p(){if(zi)return zi;const r=[];r.push(new ke("bucket")),r.push(new ke("generation")),r.push(new ke("metageneration")),r.push(new ke("name","fullPath",!0));function e(s,o){return iw(o)}const t=new ke("name");t.xform=e,r.push(t);function n(s,o){return o!==void 0?Number(o):o}const i=new ke("size");return i.xform=n,r.push(i),r.push(new ke("timeCreated")),r.push(new ke("updated")),r.push(new ke("md5Hash",null,!0)),r.push(new ke("cacheControl",null,!0)),r.push(new ke("contentDisposition",null,!0)),r.push(new ke("contentEncoding",null,!0)),r.push(new ke("contentLanguage",null,!0)),r.push(new ke("contentType",null,!0)),r.push(new ke("metadata","customMetadata",!0)),zi=r,zi}function sw(r,e){function t(){const n=r.bucket,i=r.fullPath,s=new Ue(n,i);return e._makeStorageReference(s)}Object.defineProperty(r,"ref",{get:t})}function ow(r,e,t){const n={};n.type="file";const i=t.length;for(let s=0;s<i;s++){const o=t[s];n[o.local]=o.xform(n,e[o.server])}return sw(n,r),n}function yp(r,e,t){const n=mp(e);return n===null?null:ow(r,n,t)}function aw(r,e,t,n){const i=mp(e);if(i===null||!mu(i.downloadTokens))return null;const s=i.downloadTokens;if(s.length===0)return null;const o=encodeURIComponent;return s.split(",").map(h=>{const f=r.bucket,m=r.fullPath,_="/b/"+o(f)+"/o/"+o(m),b=Js(_,t,n),C=hp({alt:"media",token:h});return b+C})[0]}function uw(r,e){const t={},n=e.length;for(let i=0;i<n;i++){const s=e[i];s.writable&&(t[s.server]=r[s.local])}return JSON.stringify(t)}class _u{constructor(e,t,n,i){this.url=e,this.method=t,this.handler=n,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ip(r){if(!r)throw pu()}function cw(r,e){function t(n,i){const s=yp(r,i,e);return Ip(s!==null),s}return t}function lw(r,e){function t(n,i){const s=yp(r,i,e);return Ip(s!==null),aw(s,i,r.host,r._protocol)}return t}function Tp(r){function e(t,n){let i;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?i=wv():i=vv():t.getStatus()===402?i=Ev(r.bucket):t.getStatus()===403?i=Av(r.path):i=n,i.status=t.getStatus(),i.serverResponse=n.serverResponse,i}return e}function Ep(r){const e=Tp(r);function t(n,i){let s=e(n,i);return n.getStatus()===404&&(s=Tv(r.path)),s.serverResponse=i.serverResponse,s}return t}function hw(r,e,t){const n=e.fullServerUrl(),i=Js(n,r.host,r._protocol),s="GET",o=r.maxOperationRetryTime,u=new _u(i,s,lw(r,t),o);return u.errorHandler=Ep(e),u}function dw(r,e){const t=e.fullServerUrl(),n=Js(t,r.host,r._protocol),i="DELETE",s=r.maxOperationRetryTime;function o(c,h){}const u=new _u(n,i,o,s);return u.successCodes=[200,204],u.errorHandler=Ep(e),u}function fw(r,e){return r&&r.contentType||e&&e.type()||"application/octet-stream"}function pw(r,e,t){const n=Object.assign({},t);return n.fullPath=r.path,n.size=e.size(),n.contentType||(n.contentType=fw(null,e)),n}function mw(r,e,t,n,i){const s=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function u(){let L="";for(let q=0;q<2;q++)L=L+Math.random().toString().slice(2);return L}const c=u();o["Content-Type"]="multipart/related; boundary="+c;const h=pw(e,n,i),f=uw(h,t),m="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+c+`\r
Content-Type: `+h.contentType+`\r
\r
`,_=`\r
--`+c+"--",b=kt.getBlob(m,n,_);if(b===null)throw Dv();const C={name:h.fullPath},k=Js(s,r.host,r._protocol),D="POST",j=r.maxUploadRetryTime,B=new _u(k,D,cw(r,t),j);return B.urlParams=C,B.headers=o,B.body=b.uploadData(),B.errorHandler=Tp(e),B}class gw{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=sn.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=sn.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=sn.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,n,i){if(this.sent_)throw Pr("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(const s in i)i.hasOwnProperty(s)&&this.xhr_.setRequestHeader(s,i[s].toString());return n!==void 0?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Pr("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Pr("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Pr("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Pr("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class _w extends gw{initXhr(){this.xhr_.responseType="text"}}function yu(){return new _w}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{constructor(e,t){this._service=e,t instanceof Ue?this._location=t:this._location=Ue.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new In(e,t)}get root(){const e=new Ue(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return gp(this._location.path)}get storage(){return this._service}get parent(){const e=tw(this._location.path);if(e===null)return null;const t=new Ue(this._location.bucket,e);return new In(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw Nv(e)}}function yw(r,e,t){r._throwIfRoot("uploadBytes");const n=mw(r.storage,r._location,_p(),new kt(e,!0),t);return r.storage.makeRequestWithTokens(n,yu).then(i=>({metadata:i,ref:r}))}function Iw(r){r._throwIfRoot("getDownloadURL");const e=hw(r.storage,r._location,_p());return r.storage.makeRequestWithTokens(e,yu).then(t=>{if(t===null)throw Vv();return t})}function Tw(r){r._throwIfRoot("deleteObject");const e=dw(r.storage,r._location);return r.storage.makeRequestWithTokens(e,yu)}function Ew(r,e){const t=nw(r._location.path,e),n=new Ue(r._location.bucket,t);return new In(r.storage,n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vw(r){return/^[A-Za-z]+:\/\//.test(r)}function ww(r,e){return new In(r,e)}function vp(r,e){if(r instanceof Iu){const t=r;if(t._bucket==null)throw Cv();const n=new In(t,t._bucket);return e!=null?vp(n,e):n}else return e!==void 0?Ew(r,e):r}function Aw(r,e){if(e&&vw(e)){if(r instanceof Iu)return ww(r,e);throw ca("To use ref(service, url), the first argument must be a Storage instance.")}else return vp(r,e)}function ah(r,e){const t=e==null?void 0:e[cp];return t==null?null:Ue.makeFromBucketSpec(t,r)}function Rw(r,e,t,n={}){r.host=`${e}:${t}`,r._protocol="http";const{mockUserToken:i}=n;i&&(r._overrideAuthToken=typeof i=="string"?i:Ih(i,r.app.options.projectId))}class Iu{constructor(e,t,n,i,s){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=i,this._firebaseVersion=s,this._bucket=null,this._host=up,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=yv,this._maxUploadRetryTime=Iv,this._requests=new Set,i!=null?this._bucket=Ue.makeFromBucketSpec(i,this._host):this._bucket=ah(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Ue.makeFromBucketSpec(this._url,e):this._bucket=ah(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){oh("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){oh("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new In(this,e)}_makeRequest(e,t,n,i,s=!0){if(this._deleted)return new xv(lp());{const o=Gv(e,this._appId,n,i,t,this._firebaseVersion,s);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[n,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,i).getPromise()}}const uh="@firebase/storage",ch="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wp="storage";function rA(r,e,t){return r=re(r),yw(r,e,t)}function iA(r){return r=re(r),Iw(r)}function sA(r){return r=re(r),Tw(r)}function oA(r,e){return r=re(r),Aw(r,e)}function bw(r=da(),e){r=re(r);const n=As(r,wp).getImmediate({identifier:e}),i=gh("storage");return i&&Pw(n,...i),n}function Pw(r,e,t,n={}){Rw(r,e,t,n)}function Sw(r,{instanceIdentifier:e}){const t=r.getProvider("app").getImmediate(),n=r.getProvider("auth-internal"),i=r.getProvider("app-check-internal");return new Iu(t,n,i,e,Tn)}function Cw(){on(new Ft(wp,Sw,"PUBLIC").setMultipleInstances(!0)),Xe(uh,ch,""),Xe(uh,ch,"esm2017")}Cw();const Ap={apiKey:"AIzaSyAF9HiAoAcodlKc44zFo9-7deniT7jV-LY",authDomain:"social-network-1773170117.firebaseapp.com",projectId:"social-network-1773170117",storageBucket:"social-network-1773170117.firebasestorage.app",messagingSenderId:"82293689339",appId:"1:82293689339:web:7f67c345d36c8c04fb595e"},Dw=Object.values(Ap).every(Boolean);let Gi=null,lh=null,hh=null,Vw=null;Dw&&(Gi=Pc().length?Pc()[0]:Ah(Ap),lh=zy(Gi),N_(lh,Yh).catch(()=>{}),hh=nv(Gi),rv(hh).catch(()=>{}),Vw=bw(Gi));export{kw as A,xw as B,Nw as C,Mw as D,St as G,lh as a,jw as b,qw as c,hh as d,Gw as e,Hw as f,Qw as g,Dw as h,tv as i,nA as j,Vw as k,iA as l,Kw as m,Ww as n,Ow as o,Yw as p,$w as q,oA as r,Jw as s,tA as t,rA as u,sA as v,zw as w,Xw as x,Zw as y,Lw as z};
