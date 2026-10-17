(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();function AM(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Eh={exports:{}},Zo={};var hv;function wM(){if(hv)return Zo;hv=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var p in l)p!=="key"&&(c[p]=l[p])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:c}}return Zo.Fragment=e,Zo.jsx=i,Zo.jsxs=i,Zo}var dv;function RM(){return dv||(dv=1,Eh.exports=wM()),Eh.exports}var j=RM(),Th={exports:{}},dt={};var pv;function CM(){if(pv)return dt;pv=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),g=Symbol.iterator;function b(S){return S===null||typeof S!="object"?null:(S=g&&S[g]||S["@@iterator"],typeof S=="function"?S:null)}var T={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,M={};function x(S,H,le){this.props=S,this.context=H,this.refs=M,this.updater=le||T}x.prototype.isReactComponent={},x.prototype.setState=function(S,H){if(typeof S!="object"&&typeof S!="function"&&S!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,S,H,"setState")},x.prototype.forceUpdate=function(S){this.updater.enqueueForceUpdate(this,S,"forceUpdate")};function N(){}N.prototype=x.prototype;function z(S,H,le){this.props=S,this.context=H,this.refs=M,this.updater=le||T}var w=z.prototype=new N;w.constructor=z,C(w,x.prototype),w.isPureReactComponent=!0;var G=Array.isArray;function L(){}var I={H:null,A:null,T:null,S:null},A=Object.prototype.hasOwnProperty;function O(S,H,le){var ye=le.ref;return{$$typeof:r,type:S,key:H,ref:ye!==void 0?ye:null,props:le}}function k(S,H){return O(S.type,H,S.props)}function X(S){return typeof S=="object"&&S!==null&&S.$$typeof===r}function K(S){var H={"=":"=0",":":"=2"};return"$"+S.replace(/[=:]/g,function(le){return H[le]})}var V=/\/+/g;function re(S,H){return typeof S=="object"&&S!==null&&S.key!=null?K(""+S.key):H.toString(36)}function Z(S){switch(S.status){case"fulfilled":return S.value;case"rejected":throw S.reason;default:switch(typeof S.status=="string"?S.then(L,L):(S.status="pending",S.then(function(H){S.status==="pending"&&(S.status="fulfilled",S.value=H)},function(H){S.status==="pending"&&(S.status="rejected",S.reason=H)})),S.status){case"fulfilled":return S.value;case"rejected":throw S.reason}}throw S}function P(S,H,le,ye,Te){var $=typeof S;($==="undefined"||$==="boolean")&&(S=null);var ce=!1;if(S===null)ce=!0;else switch($){case"bigint":case"string":case"number":ce=!0;break;case"object":switch(S.$$typeof){case r:case e:ce=!0;break;case v:return ce=S._init,P(ce(S._payload),H,le,ye,Te)}}if(ce)return Te=Te(S),ce=ye===""?"."+re(S,0):ye,G(Te)?(le="",ce!=null&&(le=ce.replace(V,"$&/")+"/"),P(Te,H,le,"",function(Ve){return Ve})):Te!=null&&(X(Te)&&(Te=k(Te,le+(Te.key==null||S&&S.key===Te.key?"":(""+Te.key).replace(V,"$&/")+"/")+ce)),H.push(Te)),1;ce=0;var ve=ye===""?".":ye+":";if(G(S))for(var Ce=0;Ce<S.length;Ce++)ye=S[Ce],$=ve+re(ye,Ce),ce+=P(ye,H,le,$,Te);else if(Ce=b(S),typeof Ce=="function")for(S=Ce.call(S),Ce=0;!(ye=S.next()).done;)ye=ye.value,$=ve+re(ye,Ce++),ce+=P(ye,H,le,$,Te);else if($==="object"){if(typeof S.then=="function")return P(Z(S),H,le,ye,Te);throw H=String(S),Error("Objects are not valid as a React child (found: "+(H==="[object Object]"?"object with keys {"+Object.keys(S).join(", ")+"}":H)+"). If you meant to render a collection of children, use an array instead.")}return ce}function U(S,H,le){if(S==null)return S;var ye=[],Te=0;return P(S,ye,"","",function($){return H.call(le,$,Te++)}),ye}function W(S){if(S._status===-1){var H=S._result;H=H(),H.then(function(le){(S._status===0||S._status===-1)&&(S._status=1,S._result=le)},function(le){(S._status===0||S._status===-1)&&(S._status=2,S._result=le)}),S._status===-1&&(S._status=0,S._result=H)}if(S._status===1)return S._result.default;throw S._result}var se=typeof reportError=="function"?reportError:function(S){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var H=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof S=="object"&&S!==null&&typeof S.message=="string"?String(S.message):String(S),error:S});if(!window.dispatchEvent(H))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",S);return}console.error(S)},B={map:U,forEach:function(S,H,le){U(S,function(){H.apply(this,arguments)},le)},count:function(S){var H=0;return U(S,function(){H++}),H},toArray:function(S){return U(S,function(H){return H})||[]},only:function(S){if(!X(S))throw Error("React.Children.only expected to receive a single React element child.");return S}};return dt.Activity=_,dt.Children=B,dt.Component=x,dt.Fragment=i,dt.Profiler=l,dt.PureComponent=z,dt.StrictMode=s,dt.Suspense=m,dt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=I,dt.__COMPILER_RUNTIME={__proto__:null,c:function(S){return I.H.useMemoCache(S)}},dt.cache=function(S){return function(){return S.apply(null,arguments)}},dt.cacheSignal=function(){return null},dt.cloneElement=function(S,H,le){if(S==null)throw Error("The argument must be a React element, but you passed "+S+".");var ye=C({},S.props),Te=S.key;if(H!=null)for($ in H.key!==void 0&&(Te=""+H.key),H)!A.call(H,$)||$==="key"||$==="__self"||$==="__source"||$==="ref"&&H.ref===void 0||(ye[$]=H[$]);var $=arguments.length-2;if($===1)ye.children=le;else if(1<$){for(var ce=Array($),ve=0;ve<$;ve++)ce[ve]=arguments[ve+2];ye.children=ce}return O(S.type,Te,ye)},dt.createContext=function(S){return S={$$typeof:f,_currentValue:S,_currentValue2:S,_threadCount:0,Provider:null,Consumer:null},S.Provider=S,S.Consumer={$$typeof:c,_context:S},S},dt.createElement=function(S,H,le){var ye,Te={},$=null;if(H!=null)for(ye in H.key!==void 0&&($=""+H.key),H)A.call(H,ye)&&ye!=="key"&&ye!=="__self"&&ye!=="__source"&&(Te[ye]=H[ye]);var ce=arguments.length-2;if(ce===1)Te.children=le;else if(1<ce){for(var ve=Array(ce),Ce=0;Ce<ce;Ce++)ve[Ce]=arguments[Ce+2];Te.children=ve}if(S&&S.defaultProps)for(ye in ce=S.defaultProps,ce)Te[ye]===void 0&&(Te[ye]=ce[ye]);return O(S,$,Te)},dt.createRef=function(){return{current:null}},dt.forwardRef=function(S){return{$$typeof:p,render:S}},dt.isValidElement=X,dt.lazy=function(S){return{$$typeof:v,_payload:{_status:-1,_result:S},_init:W}},dt.memo=function(S,H){return{$$typeof:d,type:S,compare:H===void 0?null:H}},dt.startTransition=function(S){var H=I.T,le={};I.T=le;try{var ye=S(),Te=I.S;Te!==null&&Te(le,ye),typeof ye=="object"&&ye!==null&&typeof ye.then=="function"&&ye.then(L,se)}catch($){se($)}finally{H!==null&&le.types!==null&&(H.types=le.types),I.T=H}},dt.unstable_useCacheRefresh=function(){return I.H.useCacheRefresh()},dt.use=function(S){return I.H.use(S)},dt.useActionState=function(S,H,le){return I.H.useActionState(S,H,le)},dt.useCallback=function(S,H){return I.H.useCallback(S,H)},dt.useContext=function(S){return I.H.useContext(S)},dt.useDebugValue=function(){},dt.useDeferredValue=function(S,H){return I.H.useDeferredValue(S,H)},dt.useEffect=function(S,H){return I.H.useEffect(S,H)},dt.useEffectEvent=function(S){return I.H.useEffectEvent(S)},dt.useId=function(){return I.H.useId()},dt.useImperativeHandle=function(S,H,le){return I.H.useImperativeHandle(S,H,le)},dt.useInsertionEffect=function(S,H){return I.H.useInsertionEffect(S,H)},dt.useLayoutEffect=function(S,H){return I.H.useLayoutEffect(S,H)},dt.useMemo=function(S,H){return I.H.useMemo(S,H)},dt.useOptimistic=function(S,H){return I.H.useOptimistic(S,H)},dt.useReducer=function(S,H,le){return I.H.useReducer(S,H,le)},dt.useRef=function(S){return I.H.useRef(S)},dt.useState=function(S){return I.H.useState(S)},dt.useSyncExternalStore=function(S,H,le){return I.H.useSyncExternalStore(S,H,le)},dt.useTransition=function(){return I.H.useTransition()},dt.version="19.2.8",dt}var mv;function tp(){return mv||(mv=1,Th.exports=CM()),Th.exports}var Pt=tp();const DM=AM(Pt);var Ah={exports:{}},jo={},wh={exports:{}},Rh={};var gv;function NM(){return gv||(gv=1,(function(r){function e(P,U){var W=P.length;P.push(U);e:for(;0<W;){var se=W-1>>>1,B=P[se];if(0<l(B,U))P[se]=U,P[W]=B,W=se;else break e}}function i(P){return P.length===0?null:P[0]}function s(P){if(P.length===0)return null;var U=P[0],W=P.pop();if(W!==U){P[0]=W;e:for(var se=0,B=P.length,S=B>>>1;se<S;){var H=2*(se+1)-1,le=P[H],ye=H+1,Te=P[ye];if(0>l(le,W))ye<B&&0>l(Te,le)?(P[se]=Te,P[ye]=W,se=ye):(P[se]=le,P[H]=W,se=H);else if(ye<B&&0>l(Te,W))P[se]=Te,P[ye]=W,se=ye;else break e}}return U}function l(P,U){var W=P.sortIndex-U.sortIndex;return W!==0?W:P.id-U.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,p=f.now();r.unstable_now=function(){return f.now()-p}}var m=[],d=[],v=1,_=null,g=3,b=!1,T=!1,C=!1,M=!1,x=typeof setTimeout=="function"?setTimeout:null,N=typeof clearTimeout=="function"?clearTimeout:null,z=typeof setImmediate<"u"?setImmediate:null;function w(P){for(var U=i(d);U!==null;){if(U.callback===null)s(d);else if(U.startTime<=P)s(d),U.sortIndex=U.expirationTime,e(m,U);else break;U=i(d)}}function G(P){if(C=!1,w(P),!T)if(i(m)!==null)T=!0,L||(L=!0,K());else{var U=i(d);U!==null&&Z(G,U.startTime-P)}}var L=!1,I=-1,A=5,O=-1;function k(){return M?!0:!(r.unstable_now()-O<A)}function X(){if(M=!1,L){var P=r.unstable_now();O=P;var U=!0;try{e:{T=!1,C&&(C=!1,N(I),I=-1),b=!0;var W=g;try{t:{for(w(P),_=i(m);_!==null&&!(_.expirationTime>P&&k());){var se=_.callback;if(typeof se=="function"){_.callback=null,g=_.priorityLevel;var B=se(_.expirationTime<=P);if(P=r.unstable_now(),typeof B=="function"){_.callback=B,w(P),U=!0;break t}_===i(m)&&s(m),w(P)}else s(m);_=i(m)}if(_!==null)U=!0;else{var S=i(d);S!==null&&Z(G,S.startTime-P),U=!1}}break e}finally{_=null,g=W,b=!1}U=void 0}}finally{U?K():L=!1}}}var K;if(typeof z=="function")K=function(){z(X)};else if(typeof MessageChannel<"u"){var V=new MessageChannel,re=V.port2;V.port1.onmessage=X,K=function(){re.postMessage(null)}}else K=function(){x(X,0)};function Z(P,U){I=x(function(){P(r.unstable_now())},U)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(P){P.callback=null},r.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<P?Math.floor(1e3/P):5},r.unstable_getCurrentPriorityLevel=function(){return g},r.unstable_next=function(P){switch(g){case 1:case 2:case 3:var U=3;break;default:U=g}var W=g;g=U;try{return P()}finally{g=W}},r.unstable_requestPaint=function(){M=!0},r.unstable_runWithPriority=function(P,U){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var W=g;g=P;try{return U()}finally{g=W}},r.unstable_scheduleCallback=function(P,U,W){var se=r.unstable_now();switch(typeof W=="object"&&W!==null?(W=W.delay,W=typeof W=="number"&&0<W?se+W:se):W=se,P){case 1:var B=-1;break;case 2:B=250;break;case 5:B=1073741823;break;case 4:B=1e4;break;default:B=5e3}return B=W+B,P={id:v++,callback:U,priorityLevel:P,startTime:W,expirationTime:B,sortIndex:-1},W>se?(P.sortIndex=W,e(d,P),i(m)===null&&P===i(d)&&(C?(N(I),I=-1):C=!0,Z(G,W-se))):(P.sortIndex=B,e(m,P),T||b||(T=!0,L||(L=!0,K()))),P},r.unstable_shouldYield=k,r.unstable_wrapCallback=function(P){var U=g;return function(){var W=g;g=U;try{return P.apply(this,arguments)}finally{g=W}}}})(Rh)),Rh}var vv;function UM(){return vv||(vv=1,wh.exports=NM()),wh.exports}var Ch={exports:{}},Zn={};var _v;function LM(){if(_v)return Zn;_v=1;var r=tp();function e(m){var d="react.dev/errors/"+m;if(1<arguments.length){d+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)d+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+m+"; visit "+d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,d,v){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:m,containerInfo:d,implementation:v}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(m,d){if(m==="font")return"";if(typeof d=="string")return d==="use-credentials"?d:""}return Zn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Zn.createPortal=function(m,d){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11)throw Error(e(299));return c(m,d,null,v)},Zn.flushSync=function(m){var d=f.T,v=s.p;try{if(f.T=null,s.p=2,m)return m()}finally{f.T=d,s.p=v,s.d.f()}},Zn.preconnect=function(m,d){typeof m=="string"&&(d?(d=d.crossOrigin,d=typeof d=="string"?d==="use-credentials"?d:"":void 0):d=null,s.d.C(m,d))},Zn.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},Zn.preinit=function(m,d){if(typeof m=="string"&&d&&typeof d.as=="string"){var v=d.as,_=p(v,d.crossOrigin),g=typeof d.integrity=="string"?d.integrity:void 0,b=typeof d.fetchPriority=="string"?d.fetchPriority:void 0;v==="style"?s.d.S(m,typeof d.precedence=="string"?d.precedence:void 0,{crossOrigin:_,integrity:g,fetchPriority:b}):v==="script"&&s.d.X(m,{crossOrigin:_,integrity:g,fetchPriority:b,nonce:typeof d.nonce=="string"?d.nonce:void 0})}},Zn.preinitModule=function(m,d){if(typeof m=="string")if(typeof d=="object"&&d!==null){if(d.as==null||d.as==="script"){var v=p(d.as,d.crossOrigin);s.d.M(m,{crossOrigin:v,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0})}}else d==null&&s.d.M(m)},Zn.preload=function(m,d){if(typeof m=="string"&&typeof d=="object"&&d!==null&&typeof d.as=="string"){var v=d.as,_=p(v,d.crossOrigin);s.d.L(m,v,{crossOrigin:_,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0,type:typeof d.type=="string"?d.type:void 0,fetchPriority:typeof d.fetchPriority=="string"?d.fetchPriority:void 0,referrerPolicy:typeof d.referrerPolicy=="string"?d.referrerPolicy:void 0,imageSrcSet:typeof d.imageSrcSet=="string"?d.imageSrcSet:void 0,imageSizes:typeof d.imageSizes=="string"?d.imageSizes:void 0,media:typeof d.media=="string"?d.media:void 0})}},Zn.preloadModule=function(m,d){if(typeof m=="string")if(d){var v=p(d.as,d.crossOrigin);s.d.m(m,{as:typeof d.as=="string"&&d.as!=="script"?d.as:void 0,crossOrigin:v,integrity:typeof d.integrity=="string"?d.integrity:void 0})}else s.d.m(m)},Zn.requestFormReset=function(m){s.d.r(m)},Zn.unstable_batchedUpdates=function(m,d){return m(d)},Zn.useFormState=function(m,d,v){return f.H.useFormState(m,d,v)},Zn.useFormStatus=function(){return f.H.useHostTransitionStatus()},Zn.version="19.2.8",Zn}var xv;function OM(){if(xv)return Ch.exports;xv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Ch.exports=LM(),Ch.exports}var yv;function PM(){if(yv)return jo;yv=1;var r=UM(),e=tp(),i=OM();function s(t){var n="react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function f(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function p(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function m(t){if(c(t)!==t)throw Error(s(188))}function d(t){var n=t.alternate;if(!n){if(n=c(t),n===null)throw Error(s(188));return n!==t?null:t}for(var a=t,o=n;;){var u=a.return;if(u===null)break;var h=u.alternate;if(h===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===h.child){for(h=u.child;h;){if(h===a)return m(u),t;if(h===o)return m(u),n;h=h.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=h;else{for(var y=!1,D=u.child;D;){if(D===a){y=!0,a=u,o=h;break}if(D===o){y=!0,o=u,a=h;break}D=D.sibling}if(!y){for(D=h.child;D;){if(D===a){y=!0,a=h,o=u;break}if(D===o){y=!0,o=h,a=u;break}D=D.sibling}if(!y)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?t:n}function v(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=v(t),n!==null)return n;t=t.sibling}return null}var _=Object.assign,g=Symbol.for("react.element"),b=Symbol.for("react.transitional.element"),T=Symbol.for("react.portal"),C=Symbol.for("react.fragment"),M=Symbol.for("react.strict_mode"),x=Symbol.for("react.profiler"),N=Symbol.for("react.consumer"),z=Symbol.for("react.context"),w=Symbol.for("react.forward_ref"),G=Symbol.for("react.suspense"),L=Symbol.for("react.suspense_list"),I=Symbol.for("react.memo"),A=Symbol.for("react.lazy"),O=Symbol.for("react.activity"),k=Symbol.for("react.memo_cache_sentinel"),X=Symbol.iterator;function K(t){return t===null||typeof t!="object"?null:(t=X&&t[X]||t["@@iterator"],typeof t=="function"?t:null)}var V=Symbol.for("react.client.reference");function re(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===V?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case C:return"Fragment";case x:return"Profiler";case M:return"StrictMode";case G:return"Suspense";case L:return"SuspenseList";case O:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case T:return"Portal";case z:return t.displayName||"Context";case N:return(t._context.displayName||"Context")+".Consumer";case w:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case I:return n=t.displayName||null,n!==null?n:re(t.type)||"Memo";case A:n=t._payload,t=t._init;try{return re(t(n))}catch{}}return null}var Z=Array.isArray,P=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,U=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,W={pending:!1,data:null,method:null,action:null},se=[],B=-1;function S(t){return{current:t}}function H(t){0>B||(t.current=se[B],se[B]=null,B--)}function le(t,n){B++,se[B]=t.current,t.current=n}var ye=S(null),Te=S(null),$=S(null),ce=S(null);function ve(t,n){switch(le($,n),le(Te,t),le(ye,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?Pg(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=Pg(n),t=Ig(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}H(ye),le(ye,t)}function Ce(){H(ye),H(Te),H($)}function Ve(t){t.memoizedState!==null&&le(ce,t);var n=ye.current,a=Ig(n,t.type);n!==a&&(le(Te,t),le(ye,a))}function Ie(t){Te.current===t&&(H(ye),H(Te)),ce.current===t&&(H(ce),Xo._currentValue=W)}var rt,$e;function ke(t){if(rt===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);rt=n&&n[1]||"",$e=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+rt+t+$e}var ot=!1;function lt(t,n){if(!t||ot)return"";ot=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var Ae=function(){throw Error()};if(Object.defineProperty(Ae.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Ae,[])}catch(_e){var ge=_e}Reflect.construct(t,[],Ae)}else{try{Ae.call()}catch(_e){ge=_e}t.call(Ae.prototype)}}else{try{throw Error()}catch(_e){ge=_e}(Ae=t())&&typeof Ae.catch=="function"&&Ae.catch(function(){})}}catch(_e){if(_e&&ge&&typeof _e.stack=="string")return[_e.stack,ge.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=o.DetermineComponentFrameRoot(),y=h[0],D=h[1];if(y&&D){var Y=y.split(`
`),he=D.split(`
`);for(u=o=0;o<Y.length&&!Y[o].includes("DetermineComponentFrameRoot");)o++;for(;u<he.length&&!he[u].includes("DetermineComponentFrameRoot");)u++;if(o===Y.length||u===he.length)for(o=Y.length-1,u=he.length-1;1<=o&&0<=u&&Y[o]!==he[u];)u--;for(;1<=o&&0<=u;o--,u--)if(Y[o]!==he[u]){if(o!==1||u!==1)do if(o--,u--,0>u||Y[o]!==he[u]){var Se=`
`+Y[o].replace(" at new "," at ");return t.displayName&&Se.includes("<anonymous>")&&(Se=Se.replace("<anonymous>",t.displayName)),Se}while(1<=o&&0<=u);break}}}finally{ot=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?ke(a):""}function Tt(t,n){switch(t.tag){case 26:case 27:case 5:return ke(t.type);case 16:return ke("Lazy");case 13:return t.child!==n&&n!==null?ke("Suspense Fallback"):ke("Suspense");case 19:return ke("SuspenseList");case 0:case 15:return lt(t.type,!1);case 11:return lt(t.type.render,!1);case 1:return lt(t.type,!0);case 31:return ke("Activity");default:return""}}function Nt(t){try{var n="",a=null;do n+=Tt(t,a),a=t,t=t.return;while(t);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Ut=Object.prototype.hasOwnProperty,Lt=r.unstable_scheduleCallback,Gt=r.unstable_cancelCallback,en=r.unstable_shouldYield,ee=r.unstable_requestPaint,Ot=r.unstable_now,At=r.unstable_getCurrentPriorityLevel,F=r.unstable_ImmediatePriority,E=r.unstable_UserBlockingPriority,ie=r.unstable_NormalPriority,fe=r.unstable_LowPriority,xe=r.unstable_IdlePriority,be=r.log,Ne=r.unstable_setDisableYieldValue,q=null,oe=null;function De(t){if(typeof be=="function"&&Ne(t),oe&&typeof oe.setStrictMode=="function")try{oe.setStrictMode(q,t)}catch{}}var ze=Math.clz32?Math.clz32:tt,Pe=Math.log,Le=Math.LN2;function tt(t){return t>>>=0,t===0?32:31-(Pe(t)/Le|0)|0}var nt=256,ut=262144,J=4194304;function Ue(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Me(t,n,a){var o=t.pendingLanes;if(o===0)return 0;var u=0,h=t.suspendedLanes,y=t.pingedLanes;t=t.warmLanes;var D=o&134217727;return D!==0?(o=D&~h,o!==0?u=Ue(o):(y&=D,y!==0?u=Ue(y):a||(a=D&~t,a!==0&&(u=Ue(a))))):(D=o&~h,D!==0?u=Ue(D):y!==0?u=Ue(y):a||(a=o&~t,a!==0&&(u=Ue(a)))),u===0?0:n!==0&&n!==u&&(n&h)===0&&(h=u&-u,a=n&-n,h>=a||h===32&&(a&4194048)!==0)?n:u}function Oe(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function Fe(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function we(){var t=J;return J<<=1,(J&62914560)===0&&(J=4194304),t}function Ze(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function We(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function an(t,n,a,o,u,h){var y=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var D=t.entanglements,Y=t.expirationTimes,he=t.hiddenUpdates;for(a=y&~a;0<a;){var Se=31-ze(a),Ae=1<<Se;D[Se]=0,Y[Se]=-1;var ge=he[Se];if(ge!==null)for(he[Se]=null,Se=0;Se<ge.length;Se++){var _e=ge[Se];_e!==null&&(_e.lane&=-536870913)}a&=~Ae}o!==0&&Ht(t,o,0),h!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=h&~(y&~n))}function Ht(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var o=31-ze(n);t.entangledLanes|=n,t.entanglements[o]=t.entanglements[o]|1073741824|a&261930}function kn(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var o=31-ze(a),u=1<<o;u&n|t[o]&n&&(t[o]|=n),a&=~u}}function Ln(t,n){var a=n&-n;return a=(a&42)!==0?1:er(a),(a&(t.suspendedLanes|n))!==0?0:a}function er(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function ht(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function yt(){var t=U.p;return t!==0?t:(t=window.event,t===void 0?32:sv(t.type))}function Re(t,n){var a=U.p;try{return U.p=t,n()}finally{U.p=a}}var Xn=Math.random().toString(36).slice(2),Vt="__reactFiber$"+Xn,dn="__reactProps$"+Xn,Mn="__reactContainer$"+Xn,Wn="__reactEvents$"+Xn,ni="__reactListeners$"+Xn,On="__reactHandles$"+Xn,qn="__reactResources$"+Xn,ii="__reactMarker$"+Xn;function wi(t){delete t[Vt],delete t[dn],delete t[Wn],delete t[ni],delete t[On]}function fa(t){var n=t[Vt];if(n)return n;for(var a=t.parentNode;a;){if(n=a[Mn]||a[Vt]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=kg(t);t!==null;){if(a=t[Vt])return a;t=kg(t)}return n}t=a,a=t.parentNode}return null}function ha(t){if(t=t[Vt]||t[Mn]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function Ss(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function Ha(t){var n=t[qn];return n||(n=t[qn]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function Sn(t){t[ii]=!0}var pl=new Set,R={};function te(t,n){me(t,n),me(t+"Capture",n)}function me(t,n){for(R[t]=n,t=0;t<n.length;t++)pl.add(n[t])}var de=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),pe={},Ge={};function qe(t){return Ut.call(Ge,t)?!0:Ut.call(pe,t)?!1:de.test(t)?Ge[t]=!0:(pe[t]=!0,!1)}function Be(t,n,a){if(qe(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function je(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function Ye(t,n,a,o){if(o===null)t.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+o)}}function it(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function mt(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function et(t,n,a){var o=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,h=o.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return u.call(this)},set:function(y){a=""+y,h.call(this,y)}}),Object.defineProperty(t,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(y){a=""+y},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function zt(t){if(!t._valueTracker){var n=mt(t)?"checked":"value";t._valueTracker=et(t,n,""+t[n])}}function ln(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return t&&(o=mt(t)?t.checked?"true":"false":t.value),t=o,t!==a?(n.setValue(t),!0):!1}function tn(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Wt=/[\n"\\]/g;function qt(t){return t.replace(Wt,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Xe(t,n,a,o,u,h,y,D){t.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?t.type=y:t.removeAttribute("type"),n!=null?y==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+it(n)):t.value!==""+it(n)&&(t.value=""+it(n)):y!=="submit"&&y!=="reset"||t.removeAttribute("value"),n!=null?Mt(t,y,it(n)):a!=null?Mt(t,y,it(a)):o!=null&&t.removeAttribute("value"),u==null&&h!=null&&(t.defaultChecked=!!h),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),D!=null&&typeof D!="function"&&typeof D!="symbol"&&typeof D!="boolean"?t.name=""+it(D):t.removeAttribute("name")}function Yn(t,n,a,o,u,h,y,D){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(t.type=h),n!=null||a!=null){if(!(h!=="submit"&&h!=="reset"||n!=null)){zt(t);return}a=a!=null?""+it(a):"",n=n!=null?""+it(n):a,D||n===t.value||(t.value=n),t.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=D?t.checked:!!o,t.defaultChecked=!!o,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(t.name=y),zt(t)}function Mt(t,n,a){n==="number"&&tn(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function Rn(t,n,a,o){if(t=t.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<t.length;a++)u=n.hasOwnProperty("$"+t[a].value),t[a].selected!==u&&(t[a].selected=u),u&&o&&(t[a].defaultSelected=!0)}else{for(a=""+it(a),n=null,u=0;u<t.length;u++){if(t[u].value===a){t[u].selected=!0,o&&(t[u].defaultSelected=!0);return}n!==null||t[u].disabled||(n=t[u])}n!==null&&(n.selected=!0)}}function hi(t,n,a){if(n!=null&&(n=""+it(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+it(a):""}function Gi(t,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if(Z(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=it(n),t.defaultValue=a,o=t.textContent,o===a&&o!==""&&o!==null&&(t.value=o),zt(t)}function di(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var Yt=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function cn(t,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":o?t.setProperty(n,a):typeof a!="number"||a===0||Yt.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function Hi(t,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&cn(t,u,o)}else for(var h in n)n.hasOwnProperty(h)&&cn(t,h,n[h])}function Xt(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ji=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Va=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function bs(t){return Va.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function da(){}var yu=null;function Mu(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var tr=null,nr=null;function Op(t){var n=ha(t);if(n&&(t=n.stateNode)){var a=t[dn]||null;e:switch(t=n.stateNode,n.type){case"input":if(Xe(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+qt(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==t&&o.form===t.form){var u=o[dn]||null;if(!u)throw Error(s(90));Xe(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===t.form&&ln(o)}break e;case"textarea":hi(t,a.value,a.defaultValue);break e;case"select":n=a.value,n!=null&&Rn(t,!!a.multiple,n,!1)}}}var Su=!1;function Pp(t,n,a){if(Su)return t(n,a);Su=!0;try{var o=t(n);return o}finally{if(Su=!1,(tr!==null||nr!==null)&&(tc(),tr&&(n=tr,t=nr,nr=tr=null,Op(n),t)))for(n=0;n<t.length;n++)Op(t[n])}}function ro(t,n){var a=t.stateNode;if(a===null)return null;var o=a[dn]||null;if(o===null)return null;a=o[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break e;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var pa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),bu=!1;if(pa)try{var oo={};Object.defineProperty(oo,"passive",{get:function(){bu=!0}}),window.addEventListener("test",oo,oo),window.removeEventListener("test",oo,oo)}catch{bu=!1}var ka=null,Eu=null,ml=null;function Ip(){if(ml)return ml;var t,n=Eu,a=n.length,o,u="value"in ka?ka.value:ka.textContent,h=u.length;for(t=0;t<a&&n[t]===u[t];t++);var y=a-t;for(o=1;o<=y&&n[a-o]===u[h-o];o++);return ml=u.slice(t,1<o?1-o:void 0)}function gl(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function vl(){return!0}function zp(){return!1}function ai(t){function n(a,o,u,h,y){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=h,this.target=y,this.currentTarget=null;for(var D in t)t.hasOwnProperty(D)&&(a=t[D],this[D]=a?a(h):h[D]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?vl:zp,this.isPropagationStopped=zp,this}return _(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=vl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=vl)},persist:function(){},isPersistent:vl}),n}var Es={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},_l=ai(Es),lo=_({},Es,{view:0,detail:0}),Ex=ai(lo),Tu,Au,co,xl=_({},lo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ru,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==co&&(co&&t.type==="mousemove"?(Tu=t.screenX-co.screenX,Au=t.screenY-co.screenY):Au=Tu=0,co=t),Tu)},movementY:function(t){return"movementY"in t?t.movementY:Au}}),Bp=ai(xl),Tx=_({},xl,{dataTransfer:0}),Ax=ai(Tx),wx=_({},lo,{relatedTarget:0}),wu=ai(wx),Rx=_({},Es,{animationName:0,elapsedTime:0,pseudoElement:0}),Cx=ai(Rx),Dx=_({},Es,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Nx=ai(Dx),Ux=_({},Es,{data:0}),Fp=ai(Ux),Lx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ox={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Px={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ix(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=Px[t])?!!n[t]:!1}function Ru(){return Ix}var zx=_({},lo,{key:function(t){if(t.key){var n=Lx[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=gl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Ox[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ru,charCode:function(t){return t.type==="keypress"?gl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?gl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Bx=ai(zx),Fx=_({},xl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Gp=ai(Fx),Gx=_({},lo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ru}),Hx=ai(Gx),Vx=_({},Es,{propertyName:0,elapsedTime:0,pseudoElement:0}),kx=ai(Vx),Xx=_({},xl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Wx=ai(Xx),qx=_({},Es,{newState:0,oldState:0}),Yx=ai(qx),Zx=[9,13,27,32],Cu=pa&&"CompositionEvent"in window,uo=null;pa&&"documentMode"in document&&(uo=document.documentMode);var jx=pa&&"TextEvent"in window&&!uo,Hp=pa&&(!Cu||uo&&8<uo&&11>=uo),Vp=" ",kp=!1;function Xp(t,n){switch(t){case"keyup":return Zx.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Wp(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ir=!1;function Kx(t,n){switch(t){case"compositionend":return Wp(n);case"keypress":return n.which!==32?null:(kp=!0,Vp);case"textInput":return t=n.data,t===Vp&&kp?null:t;default:return null}}function Qx(t,n){if(ir)return t==="compositionend"||!Cu&&Xp(t,n)?(t=Ip(),ml=Eu=ka=null,ir=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Hp&&n.locale!=="ko"?null:n.data;default:return null}}var Jx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function qp(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!Jx[t.type]:n==="textarea"}function Yp(t,n,a,o){tr?nr?nr.push(o):nr=[o]:tr=o,n=lc(n,"onChange"),0<n.length&&(a=new _l("onChange","change",null,a,o),t.push({event:a,listeners:n}))}var fo=null,ho=null;function $x(t){Cg(t,0)}function yl(t){var n=Ss(t);if(ln(n))return t}function Zp(t,n){if(t==="change")return n}var jp=!1;if(pa){var Du;if(pa){var Nu="oninput"in document;if(!Nu){var Kp=document.createElement("div");Kp.setAttribute("oninput","return;"),Nu=typeof Kp.oninput=="function"}Du=Nu}else Du=!1;jp=Du&&(!document.documentMode||9<document.documentMode)}function Qp(){fo&&(fo.detachEvent("onpropertychange",Jp),ho=fo=null)}function Jp(t){if(t.propertyName==="value"&&yl(ho)){var n=[];Yp(n,ho,t,Mu(t)),Pp($x,n)}}function ey(t,n,a){t==="focusin"?(Qp(),fo=n,ho=a,fo.attachEvent("onpropertychange",Jp)):t==="focusout"&&Qp()}function ty(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return yl(ho)}function ny(t,n){if(t==="click")return yl(n)}function iy(t,n){if(t==="input"||t==="change")return yl(n)}function ay(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var pi=typeof Object.is=="function"?Object.is:ay;function po(t,n){if(pi(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!Ut.call(n,u)||!pi(t[u],n[u]))return!1}return!0}function $p(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function em(t,n){var a=$p(t);t=0;for(var o;a;){if(a.nodeType===3){if(o=t+a.textContent.length,t<=n&&o>=n)return{node:a,offset:n-t};t=o}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=$p(a)}}function tm(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?tm(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function nm(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=tn(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=tn(t.document)}return n}function Uu(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var sy=pa&&"documentMode"in document&&11>=document.documentMode,ar=null,Lu=null,mo=null,Ou=!1;function im(t,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Ou||ar==null||ar!==tn(o)||(o=ar,"selectionStart"in o&&Uu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),mo&&po(mo,o)||(mo=o,o=lc(Lu,"onSelect"),0<o.length&&(n=new _l("onSelect","select",null,n,a),t.push({event:n,listeners:o}),n.target=ar)))}function Ts(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var sr={animationend:Ts("Animation","AnimationEnd"),animationiteration:Ts("Animation","AnimationIteration"),animationstart:Ts("Animation","AnimationStart"),transitionrun:Ts("Transition","TransitionRun"),transitionstart:Ts("Transition","TransitionStart"),transitioncancel:Ts("Transition","TransitionCancel"),transitionend:Ts("Transition","TransitionEnd")},Pu={},am={};pa&&(am=document.createElement("div").style,"AnimationEvent"in window||(delete sr.animationend.animation,delete sr.animationiteration.animation,delete sr.animationstart.animation),"TransitionEvent"in window||delete sr.transitionend.transition);function As(t){if(Pu[t])return Pu[t];if(!sr[t])return t;var n=sr[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in am)return Pu[t]=n[a];return t}var sm=As("animationend"),rm=As("animationiteration"),om=As("animationstart"),ry=As("transitionrun"),oy=As("transitionstart"),ly=As("transitioncancel"),lm=As("transitionend"),cm=new Map,Iu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Iu.push("scrollEnd");function Vi(t,n){cm.set(t,n),te(n,[t])}var Ml=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Ri=[],rr=0,zu=0;function Sl(){for(var t=rr,n=zu=rr=0;n<t;){var a=Ri[n];Ri[n++]=null;var o=Ri[n];Ri[n++]=null;var u=Ri[n];Ri[n++]=null;var h=Ri[n];if(Ri[n++]=null,o!==null&&u!==null){var y=o.pending;y===null?u.next=u:(u.next=y.next,y.next=u),o.pending=u}h!==0&&um(a,u,h)}}function bl(t,n,a,o){Ri[rr++]=t,Ri[rr++]=n,Ri[rr++]=a,Ri[rr++]=o,zu|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function Bu(t,n,a,o){return bl(t,n,a,o),El(t)}function ws(t,n){return bl(t,null,null,n),El(t)}function um(t,n,a){t.lanes|=a;var o=t.alternate;o!==null&&(o.lanes|=a);for(var u=!1,h=t.return;h!==null;)h.childLanes|=a,o=h.alternate,o!==null&&(o.childLanes|=a),h.tag===22&&(t=h.stateNode,t===null||t._visibility&1||(u=!0)),t=h,h=h.return;return t.tag===3?(h=t.stateNode,u&&n!==null&&(u=31-ze(a),t=h.hiddenUpdates,o=t[u],o===null?t[u]=[n]:o.push(n),n.lane=a|536870912),h):null}function El(t){if(50<zo)throw zo=0,Zf=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var or={};function cy(t,n,a,o){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function mi(t,n,a,o){return new cy(t,n,a,o)}function Fu(t){return t=t.prototype,!(!t||!t.isReactComponent)}function ma(t,n){var a=t.alternate;return a===null?(a=mi(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function fm(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function Tl(t,n,a,o,u,h){var y=0;if(o=t,typeof t=="function")Fu(t)&&(y=1);else if(typeof t=="string")y=pM(t,a,ye.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case O:return t=mi(31,a,n,u),t.elementType=O,t.lanes=h,t;case C:return Rs(a.children,u,h,n);case M:y=8,u|=24;break;case x:return t=mi(12,a,n,u|2),t.elementType=x,t.lanes=h,t;case G:return t=mi(13,a,n,u),t.elementType=G,t.lanes=h,t;case L:return t=mi(19,a,n,u),t.elementType=L,t.lanes=h,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case z:y=10;break e;case N:y=9;break e;case w:y=11;break e;case I:y=14;break e;case A:y=16,o=null;break e}y=29,a=Error(s(130,t===null?"null":typeof t,"")),o=null}return n=mi(y,a,n,u),n.elementType=t,n.type=o,n.lanes=h,n}function Rs(t,n,a,o){return t=mi(7,t,o,n),t.lanes=a,t}function Gu(t,n,a){return t=mi(6,t,null,n),t.lanes=a,t}function hm(t){var n=mi(18,null,null,0);return n.stateNode=t,n}function Hu(t,n,a){return n=mi(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var dm=new WeakMap;function Ci(t,n){if(typeof t=="object"&&t!==null){var a=dm.get(t);return a!==void 0?a:(n={value:t,source:n,stack:Nt(n)},dm.set(t,n),n)}return{value:t,source:n,stack:Nt(n)}}var lr=[],cr=0,Al=null,go=0,Di=[],Ni=0,Xa=null,Ki=1,Qi="";function ga(t,n){lr[cr++]=go,lr[cr++]=Al,Al=t,go=n}function pm(t,n,a){Di[Ni++]=Ki,Di[Ni++]=Qi,Di[Ni++]=Xa,Xa=t;var o=Ki;t=Qi;var u=32-ze(o)-1;o&=~(1<<u),a+=1;var h=32-ze(n)+u;if(30<h){var y=u-u%5;h=(o&(1<<y)-1).toString(32),o>>=y,u-=y,Ki=1<<32-ze(n)+u|a<<u|o,Qi=h+t}else Ki=1<<h|a<<u|o,Qi=t}function Vu(t){t.return!==null&&(ga(t,1),pm(t,1,0))}function ku(t){for(;t===Al;)Al=lr[--cr],lr[cr]=null,go=lr[--cr],lr[cr]=null;for(;t===Xa;)Xa=Di[--Ni],Di[Ni]=null,Qi=Di[--Ni],Di[Ni]=null,Ki=Di[--Ni],Di[Ni]=null}function mm(t,n){Di[Ni++]=Ki,Di[Ni++]=Qi,Di[Ni++]=Xa,Ki=n.id,Qi=n.overflow,Xa=t}var Bn=null,rn=null,Ct=!1,Wa=null,Ui=!1,Xu=Error(s(519));function qa(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw vo(Ci(n,t)),Xu}function gm(t){var n=t.stateNode,a=t.type,o=t.memoizedProps;switch(n[Vt]=t,n[dn]=o,a){case"dialog":bt("cancel",n),bt("close",n);break;case"iframe":case"object":case"embed":bt("load",n);break;case"video":case"audio":for(a=0;a<Fo.length;a++)bt(Fo[a],n);break;case"source":bt("error",n);break;case"img":case"image":case"link":bt("error",n),bt("load",n);break;case"details":bt("toggle",n);break;case"input":bt("invalid",n),Yn(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":bt("invalid",n);break;case"textarea":bt("invalid",n),Gi(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||Lg(n.textContent,a)?(o.popover!=null&&(bt("beforetoggle",n),bt("toggle",n)),o.onScroll!=null&&bt("scroll",n),o.onScrollEnd!=null&&bt("scrollend",n),o.onClick!=null&&(n.onclick=da),n=!0):n=!1,n||qa(t,!0)}function vm(t){for(Bn=t.return;Bn;)switch(Bn.tag){case 5:case 31:case 13:Ui=!1;return;case 27:case 3:Ui=!0;return;default:Bn=Bn.return}}function ur(t){if(t!==Bn)return!1;if(!Ct)return vm(t),Ct=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||ch(t.type,t.memoizedProps)),a=!a),a&&rn&&qa(t),vm(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));rn=Vg(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));rn=Vg(t)}else n===27?(n=rn,rs(t.type)?(t=ph,ph=null,rn=t):rn=n):rn=Bn?Oi(t.stateNode.nextSibling):null;return!0}function Cs(){rn=Bn=null,Ct=!1}function Wu(){var t=Wa;return t!==null&&(li===null?li=t:li.push.apply(li,t),Wa=null),t}function vo(t){Wa===null?Wa=[t]:Wa.push(t)}var qu=S(null),Ds=null,va=null;function Ya(t,n,a){le(qu,n._currentValue),n._currentValue=a}function _a(t){t._currentValue=qu.current,H(qu)}function Yu(t,n,a){for(;t!==null;){var o=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),t===a)break;t=t.return}}function Zu(t,n,a,o){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var h=u.dependencies;if(h!==null){var y=u.child;h=h.firstContext;e:for(;h!==null;){var D=h;h=u;for(var Y=0;Y<n.length;Y++)if(D.context===n[Y]){h.lanes|=a,D=h.alternate,D!==null&&(D.lanes|=a),Yu(h.return,a,t),o||(y=null);break e}h=D.next}}else if(u.tag===18){if(y=u.return,y===null)throw Error(s(341));y.lanes|=a,h=y.alternate,h!==null&&(h.lanes|=a),Yu(y,a,t),y=null}else y=u.child;if(y!==null)y.return=u;else for(y=u;y!==null;){if(y===t){y=null;break}if(u=y.sibling,u!==null){u.return=y.return,y=u;break}y=y.return}u=y}}function fr(t,n,a,o){t=null;for(var u=n,h=!1;u!==null;){if(!h){if((u.flags&524288)!==0)h=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var y=u.alternate;if(y===null)throw Error(s(387));if(y=y.memoizedProps,y!==null){var D=u.type;pi(u.pendingProps.value,y.value)||(t!==null?t.push(D):t=[D])}}else if(u===ce.current){if(y=u.alternate,y===null)throw Error(s(387));y.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(Xo):t=[Xo])}u=u.return}t!==null&&Zu(n,t,a,o),n.flags|=262144}function wl(t){for(t=t.firstContext;t!==null;){if(!pi(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ns(t){Ds=t,va=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Fn(t){return _m(Ds,t)}function Rl(t,n){return Ds===null&&Ns(t),_m(t,n)}function _m(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},va===null){if(t===null)throw Error(s(308));va=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else va=va.next=n;return a}var uy=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,o){t.push(o)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},fy=r.unstable_scheduleCallback,hy=r.unstable_NormalPriority,bn={$$typeof:z,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ju(){return{controller:new uy,data:new Map,refCount:0}}function _o(t){t.refCount--,t.refCount===0&&fy(hy,function(){t.controller.abort()})}var xo=null,Ku=0,hr=0,dr=null;function dy(t,n){if(xo===null){var a=xo=[];Ku=0,hr=eh(),dr={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Ku++,n.then(xm,xm),n}function xm(){if(--Ku===0&&xo!==null){dr!==null&&(dr.status="fulfilled");var t=xo;xo=null,hr=0,dr=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function py(t,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return t.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var ym=P.S;P.S=function(t,n){ig=Ot(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&dy(t,n),ym!==null&&ym(t,n)};var Us=S(null);function Qu(){var t=Us.current;return t!==null?t:nn.pooledCache}function Cl(t,n){n===null?le(Us,Us.current):le(Us,n.pool)}function Mm(){var t=Qu();return t===null?null:{parent:bn._currentValue,pool:t}}var pr=Error(s(460)),Ju=Error(s(474)),Dl=Error(s(542)),Nl={then:function(){}};function Sm(t){return t=t.status,t==="fulfilled"||t==="rejected"}function bm(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(da,da),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Tm(t),t;default:if(typeof n.status=="string")n.then(da,da);else{if(t=nn,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Tm(t),t}throw Os=n,pr}}function Ls(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Os=a,pr):a}}var Os=null;function Em(){if(Os===null)throw Error(s(459));var t=Os;return Os=null,t}function Tm(t){if(t===pr||t===Dl)throw Error(s(483))}var mr=null,yo=0;function Ul(t){var n=yo;return yo+=1,mr===null&&(mr=[]),bm(mr,t,n)}function Mo(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function Ll(t,n){throw n.$$typeof===g?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function Am(t){function n(ae,Q){if(t){var ue=ae.deletions;ue===null?(ae.deletions=[Q],ae.flags|=16):ue.push(Q)}}function a(ae,Q){if(!t)return null;for(;Q!==null;)n(ae,Q),Q=Q.sibling;return null}function o(ae){for(var Q=new Map;ae!==null;)ae.key!==null?Q.set(ae.key,ae):Q.set(ae.index,ae),ae=ae.sibling;return Q}function u(ae,Q){return ae=ma(ae,Q),ae.index=0,ae.sibling=null,ae}function h(ae,Q,ue){return ae.index=ue,t?(ue=ae.alternate,ue!==null?(ue=ue.index,ue<Q?(ae.flags|=67108866,Q):ue):(ae.flags|=67108866,Q)):(ae.flags|=1048576,Q)}function y(ae){return t&&ae.alternate===null&&(ae.flags|=67108866),ae}function D(ae,Q,ue,Ee){return Q===null||Q.tag!==6?(Q=Gu(ue,ae.mode,Ee),Q.return=ae,Q):(Q=u(Q,ue),Q.return=ae,Q)}function Y(ae,Q,ue,Ee){var at=ue.type;return at===C?Se(ae,Q,ue.props.children,Ee,ue.key):Q!==null&&(Q.elementType===at||typeof at=="object"&&at!==null&&at.$$typeof===A&&Ls(at)===Q.type)?(Q=u(Q,ue.props),Mo(Q,ue),Q.return=ae,Q):(Q=Tl(ue.type,ue.key,ue.props,null,ae.mode,Ee),Mo(Q,ue),Q.return=ae,Q)}function he(ae,Q,ue,Ee){return Q===null||Q.tag!==4||Q.stateNode.containerInfo!==ue.containerInfo||Q.stateNode.implementation!==ue.implementation?(Q=Hu(ue,ae.mode,Ee),Q.return=ae,Q):(Q=u(Q,ue.children||[]),Q.return=ae,Q)}function Se(ae,Q,ue,Ee,at){return Q===null||Q.tag!==7?(Q=Rs(ue,ae.mode,Ee,at),Q.return=ae,Q):(Q=u(Q,ue),Q.return=ae,Q)}function Ae(ae,Q,ue){if(typeof Q=="string"&&Q!==""||typeof Q=="number"||typeof Q=="bigint")return Q=Gu(""+Q,ae.mode,ue),Q.return=ae,Q;if(typeof Q=="object"&&Q!==null){switch(Q.$$typeof){case b:return ue=Tl(Q.type,Q.key,Q.props,null,ae.mode,ue),Mo(ue,Q),ue.return=ae,ue;case T:return Q=Hu(Q,ae.mode,ue),Q.return=ae,Q;case A:return Q=Ls(Q),Ae(ae,Q,ue)}if(Z(Q)||K(Q))return Q=Rs(Q,ae.mode,ue,null),Q.return=ae,Q;if(typeof Q.then=="function")return Ae(ae,Ul(Q),ue);if(Q.$$typeof===z)return Ae(ae,Rl(ae,Q),ue);Ll(ae,Q)}return null}function ge(ae,Q,ue,Ee){var at=Q!==null?Q.key:null;if(typeof ue=="string"&&ue!==""||typeof ue=="number"||typeof ue=="bigint")return at!==null?null:D(ae,Q,""+ue,Ee);if(typeof ue=="object"&&ue!==null){switch(ue.$$typeof){case b:return ue.key===at?Y(ae,Q,ue,Ee):null;case T:return ue.key===at?he(ae,Q,ue,Ee):null;case A:return ue=Ls(ue),ge(ae,Q,ue,Ee)}if(Z(ue)||K(ue))return at!==null?null:Se(ae,Q,ue,Ee,null);if(typeof ue.then=="function")return ge(ae,Q,Ul(ue),Ee);if(ue.$$typeof===z)return ge(ae,Q,Rl(ae,ue),Ee);Ll(ae,ue)}return null}function _e(ae,Q,ue,Ee,at){if(typeof Ee=="string"&&Ee!==""||typeof Ee=="number"||typeof Ee=="bigint")return ae=ae.get(ue)||null,D(Q,ae,""+Ee,at);if(typeof Ee=="object"&&Ee!==null){switch(Ee.$$typeof){case b:return ae=ae.get(Ee.key===null?ue:Ee.key)||null,Y(Q,ae,Ee,at);case T:return ae=ae.get(Ee.key===null?ue:Ee.key)||null,he(Q,ae,Ee,at);case A:return Ee=Ls(Ee),_e(ae,Q,ue,Ee,at)}if(Z(Ee)||K(Ee))return ae=ae.get(ue)||null,Se(Q,ae,Ee,at,null);if(typeof Ee.then=="function")return _e(ae,Q,ue,Ul(Ee),at);if(Ee.$$typeof===z)return _e(ae,Q,ue,Rl(Q,Ee),at);Ll(Q,Ee)}return null}function Ke(ae,Q,ue,Ee){for(var at=null,Bt=null,Je=Q,vt=Q=0,Rt=null;Je!==null&&vt<ue.length;vt++){Je.index>vt?(Rt=Je,Je=null):Rt=Je.sibling;var Ft=ge(ae,Je,ue[vt],Ee);if(Ft===null){Je===null&&(Je=Rt);break}t&&Je&&Ft.alternate===null&&n(ae,Je),Q=h(Ft,Q,vt),Bt===null?at=Ft:Bt.sibling=Ft,Bt=Ft,Je=Rt}if(vt===ue.length)return a(ae,Je),Ct&&ga(ae,vt),at;if(Je===null){for(;vt<ue.length;vt++)Je=Ae(ae,ue[vt],Ee),Je!==null&&(Q=h(Je,Q,vt),Bt===null?at=Je:Bt.sibling=Je,Bt=Je);return Ct&&ga(ae,vt),at}for(Je=o(Je);vt<ue.length;vt++)Rt=_e(Je,ae,vt,ue[vt],Ee),Rt!==null&&(t&&Rt.alternate!==null&&Je.delete(Rt.key===null?vt:Rt.key),Q=h(Rt,Q,vt),Bt===null?at=Rt:Bt.sibling=Rt,Bt=Rt);return t&&Je.forEach(function(fs){return n(ae,fs)}),Ct&&ga(ae,vt),at}function ct(ae,Q,ue,Ee){if(ue==null)throw Error(s(151));for(var at=null,Bt=null,Je=Q,vt=Q=0,Rt=null,Ft=ue.next();Je!==null&&!Ft.done;vt++,Ft=ue.next()){Je.index>vt?(Rt=Je,Je=null):Rt=Je.sibling;var fs=ge(ae,Je,Ft.value,Ee);if(fs===null){Je===null&&(Je=Rt);break}t&&Je&&fs.alternate===null&&n(ae,Je),Q=h(fs,Q,vt),Bt===null?at=fs:Bt.sibling=fs,Bt=fs,Je=Rt}if(Ft.done)return a(ae,Je),Ct&&ga(ae,vt),at;if(Je===null){for(;!Ft.done;vt++,Ft=ue.next())Ft=Ae(ae,Ft.value,Ee),Ft!==null&&(Q=h(Ft,Q,vt),Bt===null?at=Ft:Bt.sibling=Ft,Bt=Ft);return Ct&&ga(ae,vt),at}for(Je=o(Je);!Ft.done;vt++,Ft=ue.next())Ft=_e(Je,ae,vt,Ft.value,Ee),Ft!==null&&(t&&Ft.alternate!==null&&Je.delete(Ft.key===null?vt:Ft.key),Q=h(Ft,Q,vt),Bt===null?at=Ft:Bt.sibling=Ft,Bt=Ft);return t&&Je.forEach(function(TM){return n(ae,TM)}),Ct&&ga(ae,vt),at}function $t(ae,Q,ue,Ee){if(typeof ue=="object"&&ue!==null&&ue.type===C&&ue.key===null&&(ue=ue.props.children),typeof ue=="object"&&ue!==null){switch(ue.$$typeof){case b:e:{for(var at=ue.key;Q!==null;){if(Q.key===at){if(at=ue.type,at===C){if(Q.tag===7){a(ae,Q.sibling),Ee=u(Q,ue.props.children),Ee.return=ae,ae=Ee;break e}}else if(Q.elementType===at||typeof at=="object"&&at!==null&&at.$$typeof===A&&Ls(at)===Q.type){a(ae,Q.sibling),Ee=u(Q,ue.props),Mo(Ee,ue),Ee.return=ae,ae=Ee;break e}a(ae,Q);break}else n(ae,Q);Q=Q.sibling}ue.type===C?(Ee=Rs(ue.props.children,ae.mode,Ee,ue.key),Ee.return=ae,ae=Ee):(Ee=Tl(ue.type,ue.key,ue.props,null,ae.mode,Ee),Mo(Ee,ue),Ee.return=ae,ae=Ee)}return y(ae);case T:e:{for(at=ue.key;Q!==null;){if(Q.key===at)if(Q.tag===4&&Q.stateNode.containerInfo===ue.containerInfo&&Q.stateNode.implementation===ue.implementation){a(ae,Q.sibling),Ee=u(Q,ue.children||[]),Ee.return=ae,ae=Ee;break e}else{a(ae,Q);break}else n(ae,Q);Q=Q.sibling}Ee=Hu(ue,ae.mode,Ee),Ee.return=ae,ae=Ee}return y(ae);case A:return ue=Ls(ue),$t(ae,Q,ue,Ee)}if(Z(ue))return Ke(ae,Q,ue,Ee);if(K(ue)){if(at=K(ue),typeof at!="function")throw Error(s(150));return ue=at.call(ue),ct(ae,Q,ue,Ee)}if(typeof ue.then=="function")return $t(ae,Q,Ul(ue),Ee);if(ue.$$typeof===z)return $t(ae,Q,Rl(ae,ue),Ee);Ll(ae,ue)}return typeof ue=="string"&&ue!==""||typeof ue=="number"||typeof ue=="bigint"?(ue=""+ue,Q!==null&&Q.tag===6?(a(ae,Q.sibling),Ee=u(Q,ue),Ee.return=ae,ae=Ee):(a(ae,Q),Ee=Gu(ue,ae.mode,Ee),Ee.return=ae,ae=Ee),y(ae)):a(ae,Q)}return function(ae,Q,ue,Ee){try{yo=0;var at=$t(ae,Q,ue,Ee);return mr=null,at}catch(Je){if(Je===pr||Je===Dl)throw Je;var Bt=mi(29,Je,null,ae.mode);return Bt.lanes=Ee,Bt.return=ae,Bt}}}var Ps=Am(!0),wm=Am(!1),Za=!1;function $u(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ef(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function ja(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Ka(t,n,a){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(kt&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=El(t),um(t,null,a),n}return bl(t,o,n,a),El(t)}function So(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,kn(t,a)}}function tf(t,n){var a=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,h=null;if(a=a.firstBaseUpdate,a!==null){do{var y={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};h===null?u=h=y:h=h.next=y,a=a.next}while(a!==null);h===null?u=h=n:h=h.next=n}else u=h=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:h,shared:o.shared,callbacks:o.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var nf=!1;function bo(){if(nf){var t=dr;if(t!==null)throw t}}function Eo(t,n,a,o){nf=!1;var u=t.updateQueue;Za=!1;var h=u.firstBaseUpdate,y=u.lastBaseUpdate,D=u.shared.pending;if(D!==null){u.shared.pending=null;var Y=D,he=Y.next;Y.next=null,y===null?h=he:y.next=he,y=Y;var Se=t.alternate;Se!==null&&(Se=Se.updateQueue,D=Se.lastBaseUpdate,D!==y&&(D===null?Se.firstBaseUpdate=he:D.next=he,Se.lastBaseUpdate=Y))}if(h!==null){var Ae=u.baseState;y=0,Se=he=Y=null,D=h;do{var ge=D.lane&-536870913,_e=ge!==D.lane;if(_e?(wt&ge)===ge:(o&ge)===ge){ge!==0&&ge===hr&&(nf=!0),Se!==null&&(Se=Se.next={lane:0,tag:D.tag,payload:D.payload,callback:null,next:null});e:{var Ke=t,ct=D;ge=n;var $t=a;switch(ct.tag){case 1:if(Ke=ct.payload,typeof Ke=="function"){Ae=Ke.call($t,Ae,ge);break e}Ae=Ke;break e;case 3:Ke.flags=Ke.flags&-65537|128;case 0:if(Ke=ct.payload,ge=typeof Ke=="function"?Ke.call($t,Ae,ge):Ke,ge==null)break e;Ae=_({},Ae,ge);break e;case 2:Za=!0}}ge=D.callback,ge!==null&&(t.flags|=64,_e&&(t.flags|=8192),_e=u.callbacks,_e===null?u.callbacks=[ge]:_e.push(ge))}else _e={lane:ge,tag:D.tag,payload:D.payload,callback:D.callback,next:null},Se===null?(he=Se=_e,Y=Ae):Se=Se.next=_e,y|=ge;if(D=D.next,D===null){if(D=u.shared.pending,D===null)break;_e=D,D=_e.next,_e.next=null,u.lastBaseUpdate=_e,u.shared.pending=null}}while(!0);Se===null&&(Y=Ae),u.baseState=Y,u.firstBaseUpdate=he,u.lastBaseUpdate=Se,h===null&&(u.shared.lanes=0),ts|=y,t.lanes=y,t.memoizedState=Ae}}function Rm(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function Cm(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)Rm(a[t],n)}var gr=S(null),Ol=S(0);function Dm(t,n){t=wa,le(Ol,t),le(gr,n),wa=t|n.baseLanes}function af(){le(Ol,wa),le(gr,gr.current)}function sf(){wa=Ol.current,H(gr),H(Ol)}var gi=S(null),Li=null;function Qa(t){var n=t.alternate;le(vn,vn.current&1),le(gi,t),Li===null&&(n===null||gr.current!==null||n.memoizedState!==null)&&(Li=t)}function rf(t){le(vn,vn.current),le(gi,t),Li===null&&(Li=t)}function Nm(t){t.tag===22?(le(vn,vn.current),le(gi,t),Li===null&&(Li=t)):Ja()}function Ja(){le(vn,vn.current),le(gi,gi.current)}function vi(t){H(gi),Li===t&&(Li=null),H(vn)}var vn=S(0);function Pl(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||hh(a)||dh(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var xa=0,gt=null,Qt=null,En=null,Il=!1,vr=!1,Is=!1,zl=0,To=0,_r=null,my=0;function pn(){throw Error(s(321))}function of(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!pi(t[a],n[a]))return!1;return!0}function lf(t,n,a,o,u,h){return xa=h,gt=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,P.H=t===null||t.memoizedState===null?p0:bf,Is=!1,h=a(o,u),Is=!1,vr&&(h=Lm(n,a,o,u)),Um(t),h}function Um(t){P.H=Ro;var n=Qt!==null&&Qt.next!==null;if(xa=0,En=Qt=gt=null,Il=!1,To=0,_r=null,n)throw Error(s(300));t===null||Tn||(t=t.dependencies,t!==null&&wl(t)&&(Tn=!0))}function Lm(t,n,a,o){gt=t;var u=0;do{if(vr&&(_r=null),To=0,vr=!1,25<=u)throw Error(s(301));if(u+=1,En=Qt=null,t.updateQueue!=null){var h=t.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}P.H=m0,h=n(a,o)}while(vr);return h}function gy(){var t=P.H,n=t.useState()[0];return n=typeof n.then=="function"?Ao(n):n,t=t.useState()[0],(Qt!==null?Qt.memoizedState:null)!==t&&(gt.flags|=1024),n}function cf(){var t=zl!==0;return zl=0,t}function uf(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function ff(t){if(Il){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}Il=!1}xa=0,En=Qt=gt=null,vr=!1,To=zl=0,_r=null}function $n(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return En===null?gt.memoizedState=En=t:En=En.next=t,En}function _n(){if(Qt===null){var t=gt.alternate;t=t!==null?t.memoizedState:null}else t=Qt.next;var n=En===null?gt.memoizedState:En.next;if(n!==null)En=n,Qt=t;else{if(t===null)throw gt.alternate===null?Error(s(467)):Error(s(310));Qt=t,t={memoizedState:Qt.memoizedState,baseState:Qt.baseState,baseQueue:Qt.baseQueue,queue:Qt.queue,next:null},En===null?gt.memoizedState=En=t:En=En.next=t}return En}function Bl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ao(t){var n=To;return To+=1,_r===null&&(_r=[]),t=bm(_r,t,n),n=gt,(En===null?n.memoizedState:En.next)===null&&(n=n.alternate,P.H=n===null||n.memoizedState===null?p0:bf),t}function Fl(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Ao(t);if(t.$$typeof===z)return Fn(t)}throw Error(s(438,String(t)))}function hf(t){var n=null,a=gt.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=gt.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Bl(),gt.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),o=0;o<t;o++)a[o]=k;return n.index++,a}function ya(t,n){return typeof n=="function"?n(t):n}function Gl(t){var n=_n();return df(n,Qt,t)}function df(t,n,a){var o=t.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=t.baseQueue,h=o.pending;if(h!==null){if(u!==null){var y=u.next;u.next=h.next,h.next=y}n.baseQueue=u=h,o.pending=null}if(h=t.baseState,u===null)t.memoizedState=h;else{n=u.next;var D=y=null,Y=null,he=n,Se=!1;do{var Ae=he.lane&-536870913;if(Ae!==he.lane?(wt&Ae)===Ae:(xa&Ae)===Ae){var ge=he.revertLane;if(ge===0)Y!==null&&(Y=Y.next={lane:0,revertLane:0,gesture:null,action:he.action,hasEagerState:he.hasEagerState,eagerState:he.eagerState,next:null}),Ae===hr&&(Se=!0);else if((xa&ge)===ge){he=he.next,ge===hr&&(Se=!0);continue}else Ae={lane:0,revertLane:he.revertLane,gesture:null,action:he.action,hasEagerState:he.hasEagerState,eagerState:he.eagerState,next:null},Y===null?(D=Y=Ae,y=h):Y=Y.next=Ae,gt.lanes|=ge,ts|=ge;Ae=he.action,Is&&a(h,Ae),h=he.hasEagerState?he.eagerState:a(h,Ae)}else ge={lane:Ae,revertLane:he.revertLane,gesture:he.gesture,action:he.action,hasEagerState:he.hasEagerState,eagerState:he.eagerState,next:null},Y===null?(D=Y=ge,y=h):Y=Y.next=ge,gt.lanes|=Ae,ts|=Ae;he=he.next}while(he!==null&&he!==n);if(Y===null?y=h:Y.next=D,!pi(h,t.memoizedState)&&(Tn=!0,Se&&(a=dr,a!==null)))throw a;t.memoizedState=h,t.baseState=y,t.baseQueue=Y,o.lastRenderedState=h}return u===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function pf(t){var n=_n(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=t;var o=a.dispatch,u=a.pending,h=n.memoizedState;if(u!==null){a.pending=null;var y=u=u.next;do h=t(h,y.action),y=y.next;while(y!==u);pi(h,n.memoizedState)||(Tn=!0),n.memoizedState=h,n.baseQueue===null&&(n.baseState=h),a.lastRenderedState=h}return[h,o]}function Om(t,n,a){var o=gt,u=_n(),h=Ct;if(h){if(a===void 0)throw Error(s(407));a=a()}else a=n();var y=!pi((Qt||u).memoizedState,a);if(y&&(u.memoizedState=a,Tn=!0),u=u.queue,vf(zm.bind(null,o,u,t),[t]),u.getSnapshot!==n||y||En!==null&&En.memoizedState.tag&1){if(o.flags|=2048,xr(9,{destroy:void 0},Im.bind(null,o,u,a,n),null),nn===null)throw Error(s(349));h||(xa&127)!==0||Pm(o,n,a)}return a}function Pm(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=gt.updateQueue,n===null?(n=Bl(),gt.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function Im(t,n,a,o){n.value=a,n.getSnapshot=o,Bm(n)&&Fm(t)}function zm(t,n,a){return a(function(){Bm(n)&&Fm(t)})}function Bm(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!pi(t,a)}catch{return!0}}function Fm(t){var n=ws(t,2);n!==null&&ci(n,t,2)}function mf(t){var n=$n();if(typeof t=="function"){var a=t;if(t=a(),Is){De(!0);try{a()}finally{De(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ya,lastRenderedState:t},n}function Gm(t,n,a,o){return t.baseState=a,df(t,Qt,typeof o=="function"?o:ya)}function vy(t,n,a,o,u){if(kl(t))throw Error(s(485));if(t=n.action,t!==null){var h={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){h.listeners.push(y)}};P.T!==null?a(!0):h.isTransition=!1,o(h),a=n.pending,a===null?(h.next=n.pending=h,Hm(n,h)):(h.next=a.next,n.pending=a.next=h)}}function Hm(t,n){var a=n.action,o=n.payload,u=t.state;if(n.isTransition){var h=P.T,y={};P.T=y;try{var D=a(u,o),Y=P.S;Y!==null&&Y(y,D),Vm(t,n,D)}catch(he){gf(t,n,he)}finally{h!==null&&y.types!==null&&(h.types=y.types),P.T=h}}else try{h=a(u,o),Vm(t,n,h)}catch(he){gf(t,n,he)}}function Vm(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){km(t,n,o)},function(o){return gf(t,n,o)}):km(t,n,a)}function km(t,n,a){n.status="fulfilled",n.value=a,Xm(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,Hm(t,a)))}function gf(t,n,a){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,Xm(n),n=n.next;while(n!==o)}t.action=null}function Xm(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function Wm(t,n){return n}function qm(t,n){if(Ct){var a=nn.formState;if(a!==null){e:{var o=gt;if(Ct){if(rn){t:{for(var u=rn,h=Ui;u.nodeType!==8;){if(!h){u=null;break t}if(u=Oi(u.nextSibling),u===null){u=null;break t}}h=u.data,u=h==="F!"||h==="F"?u:null}if(u){rn=Oi(u.nextSibling),o=u.data==="F!";break e}}qa(o)}o=!1}o&&(n=a[0])}}return a=$n(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Wm,lastRenderedState:n},a.queue=o,a=f0.bind(null,gt,o),o.dispatch=a,o=mf(!1),h=Sf.bind(null,gt,!1,o.queue),o=$n(),u={state:n,dispatch:null,action:t,pending:null},o.queue=u,a=vy.bind(null,gt,u,h,a),u.dispatch=a,o.memoizedState=t,[n,a,!1]}function Ym(t){var n=_n();return Zm(n,Qt,t)}function Zm(t,n,a){if(n=df(t,n,Wm)[0],t=Gl(ya)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=Ao(n)}catch(y){throw y===pr?Dl:y}else o=n;n=_n();var u=n.queue,h=u.dispatch;return a!==n.memoizedState&&(gt.flags|=2048,xr(9,{destroy:void 0},_y.bind(null,u,a),null)),[o,h,t]}function _y(t,n){t.action=n}function jm(t){var n=_n(),a=Qt;if(a!==null)return Zm(n,a,t);_n(),n=n.memoizedState,a=_n();var o=a.queue.dispatch;return a.memoizedState=t,[n,o,!1]}function xr(t,n,a,o){return t={tag:t,create:a,deps:o,inst:n,next:null},n=gt.updateQueue,n===null&&(n=Bl(),gt.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(o=a.next,a.next=t,t.next=o,n.lastEffect=t),t}function Km(){return _n().memoizedState}function Hl(t,n,a,o){var u=$n();gt.flags|=t,u.memoizedState=xr(1|n,{destroy:void 0},a,o===void 0?null:o)}function Vl(t,n,a,o){var u=_n();o=o===void 0?null:o;var h=u.memoizedState.inst;Qt!==null&&o!==null&&of(o,Qt.memoizedState.deps)?u.memoizedState=xr(n,h,a,o):(gt.flags|=t,u.memoizedState=xr(1|n,h,a,o))}function Qm(t,n){Hl(8390656,8,t,n)}function vf(t,n){Vl(2048,8,t,n)}function xy(t){gt.flags|=4;var n=gt.updateQueue;if(n===null)n=Bl(),gt.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function Jm(t){var n=_n().memoizedState;return xy({ref:n,nextImpl:t}),function(){if((kt&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function $m(t,n){return Vl(4,2,t,n)}function e0(t,n){return Vl(4,4,t,n)}function t0(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function n0(t,n,a){a=a!=null?a.concat([t]):null,Vl(4,4,t0.bind(null,n,t),a)}function _f(){}function i0(t,n){var a=_n();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&of(n,o[1])?o[0]:(a.memoizedState=[t,n],t)}function a0(t,n){var a=_n();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&of(n,o[1]))return o[0];if(o=t(),Is){De(!0);try{t()}finally{De(!1)}}return a.memoizedState=[o,n],o}function xf(t,n,a){return a===void 0||(xa&1073741824)!==0&&(wt&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=sg(),gt.lanes|=t,ts|=t,a)}function s0(t,n,a,o){return pi(a,n)?a:gr.current!==null?(t=xf(t,a,o),pi(t,n)||(Tn=!0),t):(xa&42)===0||(xa&1073741824)!==0&&(wt&261930)===0?(Tn=!0,t.memoizedState=a):(t=sg(),gt.lanes|=t,ts|=t,n)}function r0(t,n,a,o,u){var h=U.p;U.p=h!==0&&8>h?h:8;var y=P.T,D={};P.T=D,Sf(t,!1,n,a);try{var Y=u(),he=P.S;if(he!==null&&he(D,Y),Y!==null&&typeof Y=="object"&&typeof Y.then=="function"){var Se=py(Y,o);wo(t,n,Se,yi(t))}else wo(t,n,o,yi(t))}catch(Ae){wo(t,n,{then:function(){},status:"rejected",reason:Ae},yi())}finally{U.p=h,y!==null&&D.types!==null&&(y.types=D.types),P.T=y}}function yy(){}function yf(t,n,a,o){if(t.tag!==5)throw Error(s(476));var u=o0(t).queue;r0(t,u,n,W,a===null?yy:function(){return l0(t),a(o)})}function o0(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:W,baseState:W,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ya,lastRenderedState:W},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ya,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function l0(t){var n=o0(t);n.next===null&&(n=t.alternate.memoizedState),wo(t,n.next.queue,{},yi())}function Mf(){return Fn(Xo)}function c0(){return _n().memoizedState}function u0(){return _n().memoizedState}function My(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=yi();t=ja(a);var o=Ka(n,t,a);o!==null&&(ci(o,n,a),So(o,n,a)),n={cache:ju()},t.payload=n;return}n=n.return}}function Sy(t,n,a){var o=yi();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},kl(t)?h0(n,a):(a=Bu(t,n,a,o),a!==null&&(ci(a,t,o),d0(a,n,o)))}function f0(t,n,a){var o=yi();wo(t,n,a,o)}function wo(t,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(kl(t))h0(n,u);else{var h=t.alternate;if(t.lanes===0&&(h===null||h.lanes===0)&&(h=n.lastRenderedReducer,h!==null))try{var y=n.lastRenderedState,D=h(y,a);if(u.hasEagerState=!0,u.eagerState=D,pi(D,y))return bl(t,n,u,0),nn===null&&Sl(),!1}catch{}if(a=Bu(t,n,u,o),a!==null)return ci(a,t,o),d0(a,n,o),!0}return!1}function Sf(t,n,a,o){if(o={lane:2,revertLane:eh(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},kl(t)){if(n)throw Error(s(479))}else n=Bu(t,a,o,2),n!==null&&ci(n,t,2)}function kl(t){var n=t.alternate;return t===gt||n!==null&&n===gt}function h0(t,n){vr=Il=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function d0(t,n,a){if((a&4194048)!==0){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,kn(t,a)}}var Ro={readContext:Fn,use:Fl,useCallback:pn,useContext:pn,useEffect:pn,useImperativeHandle:pn,useLayoutEffect:pn,useInsertionEffect:pn,useMemo:pn,useReducer:pn,useRef:pn,useState:pn,useDebugValue:pn,useDeferredValue:pn,useTransition:pn,useSyncExternalStore:pn,useId:pn,useHostTransitionStatus:pn,useFormState:pn,useActionState:pn,useOptimistic:pn,useMemoCache:pn,useCacheRefresh:pn};Ro.useEffectEvent=pn;var p0={readContext:Fn,use:Fl,useCallback:function(t,n){return $n().memoizedState=[t,n===void 0?null:n],t},useContext:Fn,useEffect:Qm,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,Hl(4194308,4,t0.bind(null,n,t),a)},useLayoutEffect:function(t,n){return Hl(4194308,4,t,n)},useInsertionEffect:function(t,n){Hl(4,2,t,n)},useMemo:function(t,n){var a=$n();n=n===void 0?null:n;var o=t();if(Is){De(!0);try{t()}finally{De(!1)}}return a.memoizedState=[o,n],o},useReducer:function(t,n,a){var o=$n();if(a!==void 0){var u=a(n);if(Is){De(!0);try{a(n)}finally{De(!1)}}}else u=n;return o.memoizedState=o.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},o.queue=t,t=t.dispatch=Sy.bind(null,gt,t),[o.memoizedState,t]},useRef:function(t){var n=$n();return t={current:t},n.memoizedState=t},useState:function(t){t=mf(t);var n=t.queue,a=f0.bind(null,gt,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:_f,useDeferredValue:function(t,n){var a=$n();return xf(a,t,n)},useTransition:function(){var t=mf(!1);return t=r0.bind(null,gt,t.queue,!0,!1),$n().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var o=gt,u=$n();if(Ct){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),nn===null)throw Error(s(349));(wt&127)!==0||Pm(o,n,a)}u.memoizedState=a;var h={value:a,getSnapshot:n};return u.queue=h,Qm(zm.bind(null,o,h,t),[t]),o.flags|=2048,xr(9,{destroy:void 0},Im.bind(null,o,h,a,n),null),a},useId:function(){var t=$n(),n=nn.identifierPrefix;if(Ct){var a=Qi,o=Ki;a=(o&~(1<<32-ze(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=zl++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=my++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:Mf,useFormState:qm,useActionState:qm,useOptimistic:function(t){var n=$n();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Sf.bind(null,gt,!0,a),a.dispatch=n,[t,n]},useMemoCache:hf,useCacheRefresh:function(){return $n().memoizedState=My.bind(null,gt)},useEffectEvent:function(t){var n=$n(),a={impl:t};return n.memoizedState=a,function(){if((kt&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},bf={readContext:Fn,use:Fl,useCallback:i0,useContext:Fn,useEffect:vf,useImperativeHandle:n0,useInsertionEffect:$m,useLayoutEffect:e0,useMemo:a0,useReducer:Gl,useRef:Km,useState:function(){return Gl(ya)},useDebugValue:_f,useDeferredValue:function(t,n){var a=_n();return s0(a,Qt.memoizedState,t,n)},useTransition:function(){var t=Gl(ya)[0],n=_n().memoizedState;return[typeof t=="boolean"?t:Ao(t),n]},useSyncExternalStore:Om,useId:c0,useHostTransitionStatus:Mf,useFormState:Ym,useActionState:Ym,useOptimistic:function(t,n){var a=_n();return Gm(a,Qt,t,n)},useMemoCache:hf,useCacheRefresh:u0};bf.useEffectEvent=Jm;var m0={readContext:Fn,use:Fl,useCallback:i0,useContext:Fn,useEffect:vf,useImperativeHandle:n0,useInsertionEffect:$m,useLayoutEffect:e0,useMemo:a0,useReducer:pf,useRef:Km,useState:function(){return pf(ya)},useDebugValue:_f,useDeferredValue:function(t,n){var a=_n();return Qt===null?xf(a,t,n):s0(a,Qt.memoizedState,t,n)},useTransition:function(){var t=pf(ya)[0],n=_n().memoizedState;return[typeof t=="boolean"?t:Ao(t),n]},useSyncExternalStore:Om,useId:c0,useHostTransitionStatus:Mf,useFormState:jm,useActionState:jm,useOptimistic:function(t,n){var a=_n();return Qt!==null?Gm(a,Qt,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:hf,useCacheRefresh:u0};m0.useEffectEvent=Jm;function Ef(t,n,a,o){n=t.memoizedState,a=a(o,n),a=a==null?n:_({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var Tf={enqueueSetState:function(t,n,a){t=t._reactInternals;var o=yi(),u=ja(o);u.payload=n,a!=null&&(u.callback=a),n=Ka(t,u,o),n!==null&&(ci(n,t,o),So(n,t,o))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var o=yi(),u=ja(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Ka(t,u,o),n!==null&&(ci(n,t,o),So(n,t,o))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=yi(),o=ja(a);o.tag=2,n!=null&&(o.callback=n),n=Ka(t,o,a),n!==null&&(ci(n,t,a),So(n,t,a))}};function g0(t,n,a,o,u,h,y){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,h,y):n.prototype&&n.prototype.isPureReactComponent?!po(a,o)||!po(u,h):!0}function v0(t,n,a,o){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==t&&Tf.enqueueReplaceState(n,n.state,null)}function zs(t,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(t=t.defaultProps){a===n&&(a=_({},a));for(var u in t)a[u]===void 0&&(a[u]=t[u])}return a}function _0(t){Ml(t)}function x0(t){console.error(t)}function y0(t){Ml(t)}function Xl(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function M0(t,n,a){try{var o=t.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Af(t,n,a){return a=ja(a),a.tag=3,a.payload={element:null},a.callback=function(){Xl(t,n)},a}function S0(t){return t=ja(t),t.tag=3,t}function b0(t,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var h=o.value;t.payload=function(){return u(h)},t.callback=function(){M0(n,a,o)}}var y=a.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(t.callback=function(){M0(n,a,o),typeof u!="function"&&(ns===null?ns=new Set([this]):ns.add(this));var D=o.stack;this.componentDidCatch(o.value,{componentStack:D!==null?D:""})})}function by(t,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&fr(n,a,u,!0),a=gi.current,a!==null){switch(a.tag){case 31:case 13:return Li===null?nc():a.alternate===null&&mn===0&&(mn=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===Nl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),Qf(t,o,u)),!1;case 22:return a.flags|=65536,o===Nl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),Qf(t,o,u)),!1}throw Error(s(435,a.tag))}return Qf(t,o,u),nc(),!1}if(Ct)return n=gi.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==Xu&&(t=Error(s(422),{cause:o}),vo(Ci(t,a)))):(o!==Xu&&(n=Error(s(423),{cause:o}),vo(Ci(n,a))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,o=Ci(o,a),u=Af(t.stateNode,o,u),tf(t,u),mn!==4&&(mn=2)),!1;var h=Error(s(520),{cause:o});if(h=Ci(h,a),Io===null?Io=[h]:Io.push(h),mn!==4&&(mn=2),n===null)return!0;o=Ci(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=u&-u,a.lanes|=t,t=Af(a.stateNode,o,t),tf(a,t),!1;case 1:if(n=a.type,h=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(ns===null||!ns.has(h))))return a.flags|=65536,u&=-u,a.lanes|=u,u=S0(u),b0(u,t,a,o),tf(a,u),!1}a=a.return}while(a!==null);return!1}var wf=Error(s(461)),Tn=!1;function Gn(t,n,a,o){n.child=t===null?wm(n,null,a,o):Ps(n,t.child,a,o)}function E0(t,n,a,o,u){a=a.render;var h=n.ref;if("ref"in o){var y={};for(var D in o)D!=="ref"&&(y[D]=o[D])}else y=o;return Ns(n),o=lf(t,n,a,y,h,u),D=cf(),t!==null&&!Tn?(uf(t,n,u),Ma(t,n,u)):(Ct&&D&&Vu(n),n.flags|=1,Gn(t,n,o,u),n.child)}function T0(t,n,a,o,u){if(t===null){var h=a.type;return typeof h=="function"&&!Fu(h)&&h.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=h,A0(t,n,h,o,u)):(t=Tl(a.type,null,o,n,n.mode,u),t.ref=n.ref,t.return=n,n.child=t)}if(h=t.child,!Pf(t,u)){var y=h.memoizedProps;if(a=a.compare,a=a!==null?a:po,a(y,o)&&t.ref===n.ref)return Ma(t,n,u)}return n.flags|=1,t=ma(h,o),t.ref=n.ref,t.return=n,n.child=t}function A0(t,n,a,o,u){if(t!==null){var h=t.memoizedProps;if(po(h,o)&&t.ref===n.ref)if(Tn=!1,n.pendingProps=o=h,Pf(t,u))(t.flags&131072)!==0&&(Tn=!0);else return n.lanes=t.lanes,Ma(t,n,u)}return Rf(t,n,a,o,u)}function w0(t,n,a,o){var u=o.children,h=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(h=h!==null?h.baseLanes|a:a,t!==null){for(o=n.child=t.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~h}else o=0,n.child=null;return R0(t,n,h,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&Cl(n,h!==null?h.cachePool:null),h!==null?Dm(n,h):af(),Nm(n);else return o=n.lanes=536870912,R0(t,n,h!==null?h.baseLanes|a:a,a,o)}else h!==null?(Cl(n,h.cachePool),Dm(n,h),Ja(),n.memoizedState=null):(t!==null&&Cl(n,null),af(),Ja());return Gn(t,n,u,a),n.child}function Co(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function R0(t,n,a,o,u){var h=Qu();return h=h===null?null:{parent:bn._currentValue,pool:h},n.memoizedState={baseLanes:a,cachePool:h},t!==null&&Cl(n,null),af(),Nm(n),t!==null&&fr(t,n,o,!0),n.childLanes=u,null}function Wl(t,n){return n=Yl({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function C0(t,n,a){return Ps(n,t.child,null,a),t=Wl(n,n.pendingProps),t.flags|=2,vi(n),n.memoizedState=null,t}function Ey(t,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(Ct){if(o.mode==="hidden")return t=Wl(n,o),n.lanes=536870912,Co(null,t);if(rf(n),(t=rn)?(t=Hg(t,Ui),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Xa!==null?{id:Ki,overflow:Qi}:null,retryLane:536870912,hydrationErrors:null},a=hm(t),a.return=n,n.child=a,Bn=n,rn=null)):t=null,t===null)throw qa(n);return n.lanes=536870912,null}return Wl(n,o)}var h=t.memoizedState;if(h!==null){var y=h.dehydrated;if(rf(n),u)if(n.flags&256)n.flags&=-257,n=C0(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(Tn||fr(t,n,a,!1),u=(a&t.childLanes)!==0,Tn||u){if(o=nn,o!==null&&(y=Ln(o,a),y!==0&&y!==h.retryLane))throw h.retryLane=y,ws(t,y),ci(o,t,y),wf;nc(),n=C0(t,n,a)}else t=h.treeContext,rn=Oi(y.nextSibling),Bn=n,Ct=!0,Wa=null,Ui=!1,t!==null&&mm(n,t),n=Wl(n,o),n.flags|=4096;return n}return t=ma(t.child,{mode:o.mode,children:o.children}),t.ref=n.ref,n.child=t,t.return=n,t}function ql(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function Rf(t,n,a,o,u){return Ns(n),a=lf(t,n,a,o,void 0,u),o=cf(),t!==null&&!Tn?(uf(t,n,u),Ma(t,n,u)):(Ct&&o&&Vu(n),n.flags|=1,Gn(t,n,a,u),n.child)}function D0(t,n,a,o,u,h){return Ns(n),n.updateQueue=null,a=Lm(n,o,a,u),Um(t),o=cf(),t!==null&&!Tn?(uf(t,n,h),Ma(t,n,h)):(Ct&&o&&Vu(n),n.flags|=1,Gn(t,n,a,h),n.child)}function N0(t,n,a,o,u){if(Ns(n),n.stateNode===null){var h=or,y=a.contextType;typeof y=="object"&&y!==null&&(h=Fn(y)),h=new a(o,h),n.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=Tf,n.stateNode=h,h._reactInternals=n,h=n.stateNode,h.props=o,h.state=n.memoizedState,h.refs={},$u(n),y=a.contextType,h.context=typeof y=="object"&&y!==null?Fn(y):or,h.state=n.memoizedState,y=a.getDerivedStateFromProps,typeof y=="function"&&(Ef(n,a,y,o),h.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(y=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),y!==h.state&&Tf.enqueueReplaceState(h,h.state,null),Eo(n,o,h,u),bo(),h.state=n.memoizedState),typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(t===null){h=n.stateNode;var D=n.memoizedProps,Y=zs(a,D);h.props=Y;var he=h.context,Se=a.contextType;y=or,typeof Se=="object"&&Se!==null&&(y=Fn(Se));var Ae=a.getDerivedStateFromProps;Se=typeof Ae=="function"||typeof h.getSnapshotBeforeUpdate=="function",D=n.pendingProps!==D,Se||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(D||he!==y)&&v0(n,h,o,y),Za=!1;var ge=n.memoizedState;h.state=ge,Eo(n,o,h,u),bo(),he=n.memoizedState,D||ge!==he||Za?(typeof Ae=="function"&&(Ef(n,a,Ae,o),he=n.memoizedState),(Y=Za||g0(n,a,Y,o,ge,he,y))?(Se||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(n.flags|=4194308)):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=he),h.props=o,h.state=he,h.context=y,o=Y):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{h=n.stateNode,ef(t,n),y=n.memoizedProps,Se=zs(a,y),h.props=Se,Ae=n.pendingProps,ge=h.context,he=a.contextType,Y=or,typeof he=="object"&&he!==null&&(Y=Fn(he)),D=a.getDerivedStateFromProps,(he=typeof D=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(y!==Ae||ge!==Y)&&v0(n,h,o,Y),Za=!1,ge=n.memoizedState,h.state=ge,Eo(n,o,h,u),bo();var _e=n.memoizedState;y!==Ae||ge!==_e||Za||t!==null&&t.dependencies!==null&&wl(t.dependencies)?(typeof D=="function"&&(Ef(n,a,D,o),_e=n.memoizedState),(Se=Za||g0(n,a,Se,o,ge,_e,Y)||t!==null&&t.dependencies!==null&&wl(t.dependencies))?(he||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(o,_e,Y),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(o,_e,Y)),typeof h.componentDidUpdate=="function"&&(n.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof h.componentDidUpdate!="function"||y===t.memoizedProps&&ge===t.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===t.memoizedProps&&ge===t.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=_e),h.props=o,h.state=_e,h.context=Y,o=Se):(typeof h.componentDidUpdate!="function"||y===t.memoizedProps&&ge===t.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===t.memoizedProps&&ge===t.memoizedState||(n.flags|=1024),o=!1)}return h=o,ql(t,n),o=(n.flags&128)!==0,h||o?(h=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:h.render(),n.flags|=1,t!==null&&o?(n.child=Ps(n,t.child,null,u),n.child=Ps(n,null,a,u)):Gn(t,n,a,u),n.memoizedState=h.state,t=n.child):t=Ma(t,n,u),t}function U0(t,n,a,o){return Cs(),n.flags|=256,Gn(t,n,a,o),n.child}var Cf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Df(t){return{baseLanes:t,cachePool:Mm()}}function Nf(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=xi),t}function L0(t,n,a){var o=n.pendingProps,u=!1,h=(n.flags&128)!==0,y;if((y=h)||(y=t!==null&&t.memoizedState===null?!1:(vn.current&2)!==0),y&&(u=!0,n.flags&=-129),y=(n.flags&32)!==0,n.flags&=-33,t===null){if(Ct){if(u?Qa(n):Ja(),(t=rn)?(t=Hg(t,Ui),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Xa!==null?{id:Ki,overflow:Qi}:null,retryLane:536870912,hydrationErrors:null},a=hm(t),a.return=n,n.child=a,Bn=n,rn=null)):t=null,t===null)throw qa(n);return dh(t)?n.lanes=32:n.lanes=536870912,null}var D=o.children;return o=o.fallback,u?(Ja(),u=n.mode,D=Yl({mode:"hidden",children:D},u),o=Rs(o,u,a,null),D.return=n,o.return=n,D.sibling=o,n.child=D,o=n.child,o.memoizedState=Df(a),o.childLanes=Nf(t,y,a),n.memoizedState=Cf,Co(null,o)):(Qa(n),Uf(n,D))}var Y=t.memoizedState;if(Y!==null&&(D=Y.dehydrated,D!==null)){if(h)n.flags&256?(Qa(n),n.flags&=-257,n=Lf(t,n,a)):n.memoizedState!==null?(Ja(),n.child=t.child,n.flags|=128,n=null):(Ja(),D=o.fallback,u=n.mode,o=Yl({mode:"visible",children:o.children},u),D=Rs(D,u,a,null),D.flags|=2,o.return=n,D.return=n,o.sibling=D,n.child=o,Ps(n,t.child,null,a),o=n.child,o.memoizedState=Df(a),o.childLanes=Nf(t,y,a),n.memoizedState=Cf,n=Co(null,o));else if(Qa(n),dh(D)){if(y=D.nextSibling&&D.nextSibling.dataset,y)var he=y.dgst;y=he,o=Error(s(419)),o.stack="",o.digest=y,vo({value:o,source:null,stack:null}),n=Lf(t,n,a)}else if(Tn||fr(t,n,a,!1),y=(a&t.childLanes)!==0,Tn||y){if(y=nn,y!==null&&(o=Ln(y,a),o!==0&&o!==Y.retryLane))throw Y.retryLane=o,ws(t,o),ci(y,t,o),wf;hh(D)||nc(),n=Lf(t,n,a)}else hh(D)?(n.flags|=192,n.child=t.child,n=null):(t=Y.treeContext,rn=Oi(D.nextSibling),Bn=n,Ct=!0,Wa=null,Ui=!1,t!==null&&mm(n,t),n=Uf(n,o.children),n.flags|=4096);return n}return u?(Ja(),D=o.fallback,u=n.mode,Y=t.child,he=Y.sibling,o=ma(Y,{mode:"hidden",children:o.children}),o.subtreeFlags=Y.subtreeFlags&65011712,he!==null?D=ma(he,D):(D=Rs(D,u,a,null),D.flags|=2),D.return=n,o.return=n,o.sibling=D,n.child=o,Co(null,o),o=n.child,D=t.child.memoizedState,D===null?D=Df(a):(u=D.cachePool,u!==null?(Y=bn._currentValue,u=u.parent!==Y?{parent:Y,pool:Y}:u):u=Mm(),D={baseLanes:D.baseLanes|a,cachePool:u}),o.memoizedState=D,o.childLanes=Nf(t,y,a),n.memoizedState=Cf,Co(t.child,o)):(Qa(n),a=t.child,t=a.sibling,a=ma(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,t!==null&&(y=n.deletions,y===null?(n.deletions=[t],n.flags|=16):y.push(t)),n.child=a,n.memoizedState=null,a)}function Uf(t,n){return n=Yl({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function Yl(t,n){return t=mi(22,t,null,n),t.lanes=0,t}function Lf(t,n,a){return Ps(n,t.child,null,a),t=Uf(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function O0(t,n,a){t.lanes|=n;var o=t.alternate;o!==null&&(o.lanes|=n),Yu(t.return,n,a)}function Of(t,n,a,o,u,h){var y=t.memoizedState;y===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:h}:(y.isBackwards=n,y.rendering=null,y.renderingStartTime=0,y.last=o,y.tail=a,y.tailMode=u,y.treeForkCount=h)}function P0(t,n,a){var o=n.pendingProps,u=o.revealOrder,h=o.tail;o=o.children;var y=vn.current,D=(y&2)!==0;if(D?(y=y&1|2,n.flags|=128):y&=1,le(vn,y),Gn(t,n,o,a),o=Ct?go:0,!D&&t!==null&&(t.flags&128)!==0)e:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&O0(t,a,n);else if(t.tag===19)O0(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break e;for(;t.sibling===null;){if(t.return===null||t.return===n)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)t=a.alternate,t!==null&&Pl(t)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),Of(n,!1,u,a,h,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(t=u.alternate,t!==null&&Pl(t)===null){n.child=u;break}t=u.sibling,u.sibling=a,a=u,u=t}Of(n,!0,a,null,h,o);break;case"together":Of(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function Ma(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),ts|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(fr(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,a=ma(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=ma(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function Pf(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&wl(t)))}function Ty(t,n,a){switch(n.tag){case 3:ve(n,n.stateNode.containerInfo),Ya(n,bn,t.memoizedState.cache),Cs();break;case 27:case 5:Ve(n);break;case 4:ve(n,n.stateNode.containerInfo);break;case 10:Ya(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,rf(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Qa(n),n.flags|=128,null):(a&n.child.childLanes)!==0?L0(t,n,a):(Qa(n),t=Ma(t,n,a),t!==null?t.sibling:null);Qa(n);break;case 19:var u=(t.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(fr(t,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return P0(t,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),le(vn,vn.current),o)break;return null;case 22:return n.lanes=0,w0(t,n,a,n.pendingProps);case 24:Ya(n,bn,t.memoizedState.cache)}return Ma(t,n,a)}function I0(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)Tn=!0;else{if(!Pf(t,a)&&(n.flags&128)===0)return Tn=!1,Ty(t,n,a);Tn=(t.flags&131072)!==0}else Tn=!1,Ct&&(n.flags&1048576)!==0&&pm(n,go,n.index);switch(n.lanes=0,n.tag){case 16:e:{var o=n.pendingProps;if(t=Ls(n.elementType),n.type=t,typeof t=="function")Fu(t)?(o=zs(t,o),n.tag=1,n=N0(null,n,t,o,a)):(n.tag=0,n=Rf(null,n,t,o,a));else{if(t!=null){var u=t.$$typeof;if(u===w){n.tag=11,n=E0(null,n,t,o,a);break e}else if(u===I){n.tag=14,n=T0(null,n,t,o,a);break e}}throw n=re(t)||t,Error(s(306,n,""))}}return n;case 0:return Rf(t,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=zs(o,n.pendingProps),N0(t,n,o,u,a);case 3:e:{if(ve(n,n.stateNode.containerInfo),t===null)throw Error(s(387));o=n.pendingProps;var h=n.memoizedState;u=h.element,ef(t,n),Eo(n,o,null,a);var y=n.memoizedState;if(o=y.cache,Ya(n,bn,o),o!==h.cache&&Zu(n,[bn],a,!0),bo(),o=y.element,h.isDehydrated)if(h={element:o,isDehydrated:!1,cache:y.cache},n.updateQueue.baseState=h,n.memoizedState=h,n.flags&256){n=U0(t,n,o,a);break e}else if(o!==u){u=Ci(Error(s(424)),n),vo(u),n=U0(t,n,o,a);break e}else for(t=n.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,rn=Oi(t.firstChild),Bn=n,Ct=!0,Wa=null,Ui=!0,a=wm(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Cs(),o===u){n=Ma(t,n,a);break e}Gn(t,n,o,a)}n=n.child}return n;case 26:return ql(t,n),t===null?(a=Yg(n.type,null,n.pendingProps,null))?n.memoizedState=a:Ct||(a=n.type,t=n.pendingProps,o=cc($.current).createElement(a),o[Vt]=n,o[dn]=t,Hn(o,a,t),Sn(o),n.stateNode=o):n.memoizedState=Yg(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return Ve(n),t===null&&Ct&&(o=n.stateNode=Xg(n.type,n.pendingProps,$.current),Bn=n,Ui=!0,u=rn,rs(n.type)?(ph=u,rn=Oi(o.firstChild)):rn=u),Gn(t,n,n.pendingProps.children,a),ql(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&Ct&&((u=o=rn)&&(o=tM(o,n.type,n.pendingProps,Ui),o!==null?(n.stateNode=o,Bn=n,rn=Oi(o.firstChild),Ui=!1,u=!0):u=!1),u||qa(n)),Ve(n),u=n.type,h=n.pendingProps,y=t!==null?t.memoizedProps:null,o=h.children,ch(u,h)?o=null:y!==null&&ch(u,y)&&(n.flags|=32),n.memoizedState!==null&&(u=lf(t,n,gy,null,null,a),Xo._currentValue=u),ql(t,n),Gn(t,n,o,a),n.child;case 6:return t===null&&Ct&&((t=a=rn)&&(a=nM(a,n.pendingProps,Ui),a!==null?(n.stateNode=a,Bn=n,rn=null,t=!0):t=!1),t||qa(n)),null;case 13:return L0(t,n,a);case 4:return ve(n,n.stateNode.containerInfo),o=n.pendingProps,t===null?n.child=Ps(n,null,o,a):Gn(t,n,o,a),n.child;case 11:return E0(t,n,n.type,n.pendingProps,a);case 7:return Gn(t,n,n.pendingProps,a),n.child;case 8:return Gn(t,n,n.pendingProps.children,a),n.child;case 12:return Gn(t,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Ya(n,n.type,o.value),Gn(t,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,Ns(n),u=Fn(u),o=o(u),n.flags|=1,Gn(t,n,o,a),n.child;case 14:return T0(t,n,n.type,n.pendingProps,a);case 15:return A0(t,n,n.type,n.pendingProps,a);case 19:return P0(t,n,a);case 31:return Ey(t,n,a);case 22:return w0(t,n,a,n.pendingProps);case 24:return Ns(n),o=Fn(bn),t===null?(u=Qu(),u===null&&(u=nn,h=ju(),u.pooledCache=h,h.refCount++,h!==null&&(u.pooledCacheLanes|=a),u=h),n.memoizedState={parent:o,cache:u},$u(n),Ya(n,bn,u)):((t.lanes&a)!==0&&(ef(t,n),Eo(n,null,null,a),bo()),u=t.memoizedState,h=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Ya(n,bn,o)):(o=h.cache,Ya(n,bn,o),o!==u.cache&&Zu(n,[bn],a,!0))),Gn(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function Sa(t){t.flags|=4}function If(t,n,a,o,u){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(cg())t.flags|=8192;else throw Os=Nl,Ju}else t.flags&=-16777217}function z0(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Jg(n))if(cg())t.flags|=8192;else throw Os=Nl,Ju}function Zl(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?we():536870912,t.lanes|=n,br|=n)}function Do(t,n){if(!Ct)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null}}function on(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,o=0;if(n)for(var u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=o,t.childLanes=a,n}function Ay(t,n,a){var o=n.pendingProps;switch(ku(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return on(n),null;case 1:return on(n),null;case 3:return a=n.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),_a(bn),Ce(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(ur(n)?Sa(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Wu())),on(n),null;case 26:var u=n.type,h=n.memoizedState;return t===null?(Sa(n),h!==null?(on(n),z0(n,h)):(on(n),If(n,u,null,o,a))):h?h!==t.memoizedState?(Sa(n),on(n),z0(n,h)):(on(n),n.flags&=-16777217):(t=t.memoizedProps,t!==o&&Sa(n),on(n),If(n,u,t,o,a)),null;case 27:if(Ie(n),a=$.current,u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&Sa(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return on(n),null}t=ye.current,ur(n)?gm(n):(t=Xg(u,o,a),n.stateNode=t,Sa(n))}return on(n),null;case 5:if(Ie(n),u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&Sa(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return on(n),null}if(h=ye.current,ur(n))gm(n);else{var y=cc($.current);switch(h){case 1:h=y.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:h=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":h=y.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":h=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":h=y.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof o.is=="string"?y.createElement("select",{is:o.is}):y.createElement("select"),o.multiple?h.multiple=!0:o.size&&(h.size=o.size);break;default:h=typeof o.is=="string"?y.createElement(u,{is:o.is}):y.createElement(u)}}h[Vt]=n,h[dn]=o;e:for(y=n.child;y!==null;){if(y.tag===5||y.tag===6)h.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===n)break e;for(;y.sibling===null;){if(y.return===null||y.return===n)break e;y=y.return}y.sibling.return=y.return,y=y.sibling}n.stateNode=h;e:switch(Hn(h,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&Sa(n)}}return on(n),If(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==o&&Sa(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(t=$.current,ur(n)){if(t=n.stateNode,a=n.memoizedProps,o=null,u=Bn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}t[Vt]=n,t=!!(t.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||Lg(t.nodeValue,a)),t||qa(n,!0)}else t=cc(t).createTextNode(o),t[Vt]=n,n.stateNode=t}return on(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(o=ur(n),a!==null){if(t===null){if(!o)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[Vt]=n}else Cs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;on(n),t=!1}else a=Wu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(vi(n),n):(vi(n),null);if((n.flags&128)!==0)throw Error(s(558))}return on(n),null;case 13:if(o=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=ur(n),o!==null&&o.dehydrated!==null){if(t===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[Vt]=n}else Cs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;on(n),u=!1}else u=Wu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(vi(n),n):(vi(n),null)}return vi(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,t=t!==null&&t.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),h=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(h=o.memoizedState.cachePool.pool),h!==u&&(o.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),Zl(n,n.updateQueue),on(n),null);case 4:return Ce(),t===null&&ah(n.stateNode.containerInfo),on(n),null;case 10:return _a(n.type),on(n),null;case 19:if(H(vn),o=n.memoizedState,o===null)return on(n),null;if(u=(n.flags&128)!==0,h=o.rendering,h===null)if(u)Do(o,!1);else{if(mn!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(h=Pl(t),h!==null){for(n.flags|=128,Do(o,!1),t=h.updateQueue,n.updateQueue=t,Zl(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)fm(a,t),a=a.sibling;return le(vn,vn.current&1|2),Ct&&ga(n,o.treeForkCount),n.child}t=t.sibling}o.tail!==null&&Ot()>$l&&(n.flags|=128,u=!0,Do(o,!1),n.lanes=4194304)}else{if(!u)if(t=Pl(h),t!==null){if(n.flags|=128,u=!0,t=t.updateQueue,n.updateQueue=t,Zl(n,t),Do(o,!0),o.tail===null&&o.tailMode==="hidden"&&!h.alternate&&!Ct)return on(n),null}else 2*Ot()-o.renderingStartTime>$l&&a!==536870912&&(n.flags|=128,u=!0,Do(o,!1),n.lanes=4194304);o.isBackwards?(h.sibling=n.child,n.child=h):(t=o.last,t!==null?t.sibling=h:n.child=h,o.last=h)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Ot(),t.sibling=null,a=vn.current,le(vn,u?a&1|2:a&1),Ct&&ga(n,o.treeForkCount),t):(on(n),null);case 22:case 23:return vi(n),sf(),o=n.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(on(n),n.subtreeFlags&6&&(n.flags|=8192)):on(n),a=n.updateQueue,a!==null&&Zl(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),t!==null&&H(Us),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),_a(bn),on(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function wy(t,n){switch(ku(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return _a(bn),Ce(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return Ie(n),null;case 31:if(n.memoizedState!==null){if(vi(n),n.alternate===null)throw Error(s(340));Cs()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(vi(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));Cs()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return H(vn),null;case 4:return Ce(),null;case 10:return _a(n.type),null;case 22:case 23:return vi(n),sf(),t!==null&&H(Us),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return _a(bn),null;case 25:return null;default:return null}}function B0(t,n){switch(ku(n),n.tag){case 3:_a(bn),Ce();break;case 26:case 27:case 5:Ie(n);break;case 4:Ce();break;case 31:n.memoizedState!==null&&vi(n);break;case 13:vi(n);break;case 19:H(vn);break;case 10:_a(n.type);break;case 22:case 23:vi(n),sf(),t!==null&&H(Us);break;case 24:_a(bn)}}function No(t,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&t)===t){o=void 0;var h=a.create,y=a.inst;o=h(),y.destroy=o}a=a.next}while(a!==u)}}catch(D){jt(n,n.return,D)}}function $a(t,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var h=u.next;o=h;do{if((o.tag&t)===t){var y=o.inst,D=y.destroy;if(D!==void 0){y.destroy=void 0,u=n;var Y=a,he=D;try{he()}catch(Se){jt(u,Y,Se)}}}o=o.next}while(o!==h)}}catch(Se){jt(n,n.return,Se)}}function F0(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{Cm(n,a)}catch(o){jt(t,t.return,o)}}}function G0(t,n,a){a.props=zs(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(o){jt(t,n,o)}}function Uo(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:o=t.stateNode;break;default:o=t.stateNode}typeof a=="function"?t.refCleanup=a(o):a.current=o}}catch(u){jt(t,n,u)}}function Ji(t,n){var a=t.ref,o=t.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){jt(t,n,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){jt(t,n,u)}else a.current=null}function H0(t){var n=t.type,a=t.memoizedProps,o=t.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break e;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){jt(t,t.return,u)}}function zf(t,n,a){try{var o=t.stateNode;jy(o,t.type,a,n),o[dn]=n}catch(u){jt(t,t.return,u)}}function V0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&rs(t.type)||t.tag===4}function Bf(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||V0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&rs(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Ff(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=da));else if(o!==4&&(o===27&&rs(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for(Ff(t,n,a),t=t.sibling;t!==null;)Ff(t,n,a),t=t.sibling}function jl(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(o!==4&&(o===27&&rs(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(jl(t,n,a),t=t.sibling;t!==null;)jl(t,n,a),t=t.sibling}function k0(t){var n=t.stateNode,a=t.memoizedProps;try{for(var o=t.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Hn(n,o,a),n[Vt]=t,n[dn]=a}catch(h){jt(t,t.return,h)}}var ba=!1,An=!1,Gf=!1,X0=typeof WeakSet=="function"?WeakSet:Set,Pn=null;function Ry(t,n){if(t=t.containerInfo,oh=gc,t=nm(t),Uu(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else e:{a=(a=t.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,h=o.focusNode;o=o.focusOffset;try{a.nodeType,h.nodeType}catch{a=null;break e}var y=0,D=-1,Y=-1,he=0,Se=0,Ae=t,ge=null;t:for(;;){for(var _e;Ae!==a||u!==0&&Ae.nodeType!==3||(D=y+u),Ae!==h||o!==0&&Ae.nodeType!==3||(Y=y+o),Ae.nodeType===3&&(y+=Ae.nodeValue.length),(_e=Ae.firstChild)!==null;)ge=Ae,Ae=_e;for(;;){if(Ae===t)break t;if(ge===a&&++he===u&&(D=y),ge===h&&++Se===o&&(Y=y),(_e=Ae.nextSibling)!==null)break;Ae=ge,ge=Ae.parentNode}Ae=_e}a=D===-1||Y===-1?null:{start:D,end:Y}}else a=null}a=a||{start:0,end:0}}else a=null;for(lh={focusedElem:t,selectionRange:a},gc=!1,Pn=n;Pn!==null;)if(n=Pn,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,Pn=t;else for(;Pn!==null;){switch(n=Pn,h=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)u=t[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&h!==null){t=void 0,a=n,u=h.memoizedProps,h=h.memoizedState,o=a.stateNode;try{var Ke=zs(a.type,u);t=o.getSnapshotBeforeUpdate(Ke,h),o.__reactInternalSnapshotBeforeUpdate=t}catch(ct){jt(a,a.return,ct)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)fh(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":fh(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(s(163))}if(t=n.sibling,t!==null){t.return=n.return,Pn=t;break}Pn=n.return}}function W0(t,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:Ta(t,a),o&4&&No(5,a);break;case 1:if(Ta(t,a),o&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(y){jt(a,a.return,y)}else{var u=zs(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(u,n,t.__reactInternalSnapshotBeforeUpdate)}catch(y){jt(a,a.return,y)}}o&64&&F0(a),o&512&&Uo(a,a.return);break;case 3:if(Ta(t,a),o&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{Cm(t,n)}catch(y){jt(a,a.return,y)}}break;case 27:n===null&&o&4&&k0(a);case 26:case 5:Ta(t,a),n===null&&o&4&&H0(a),o&512&&Uo(a,a.return);break;case 12:Ta(t,a);break;case 31:Ta(t,a),o&4&&Z0(t,a);break;case 13:Ta(t,a),o&4&&j0(t,a),o&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=zy.bind(null,a),iM(t,a))));break;case 22:if(o=a.memoizedState!==null||ba,!o){n=n!==null&&n.memoizedState!==null||An,u=ba;var h=An;ba=o,(An=n)&&!h?Aa(t,a,(a.subtreeFlags&8772)!==0):Ta(t,a),ba=u,An=h}break;case 30:break;default:Ta(t,a)}}function q0(t){var n=t.alternate;n!==null&&(t.alternate=null,q0(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&wi(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var un=null,si=!1;function Ea(t,n,a){for(a=a.child;a!==null;)Y0(t,n,a),a=a.sibling}function Y0(t,n,a){if(oe&&typeof oe.onCommitFiberUnmount=="function")try{oe.onCommitFiberUnmount(q,a)}catch{}switch(a.tag){case 26:An||Ji(a,n),Ea(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:An||Ji(a,n);var o=un,u=si;rs(a.type)&&(un=a.stateNode,si=!1),Ea(t,n,a),Ho(a.stateNode),un=o,si=u;break;case 5:An||Ji(a,n);case 6:if(o=un,u=si,un=null,Ea(t,n,a),un=o,si=u,un!==null)if(si)try{(un.nodeType===9?un.body:un.nodeName==="HTML"?un.ownerDocument.body:un).removeChild(a.stateNode)}catch(h){jt(a,n,h)}else try{un.removeChild(a.stateNode)}catch(h){jt(a,n,h)}break;case 18:un!==null&&(si?(t=un,Fg(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Nr(t)):Fg(un,a.stateNode));break;case 4:o=un,u=si,un=a.stateNode.containerInfo,si=!0,Ea(t,n,a),un=o,si=u;break;case 0:case 11:case 14:case 15:$a(2,a,n),An||$a(4,a,n),Ea(t,n,a);break;case 1:An||(Ji(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&G0(a,n,o)),Ea(t,n,a);break;case 21:Ea(t,n,a);break;case 22:An=(o=An)||a.memoizedState!==null,Ea(t,n,a),An=o;break;default:Ea(t,n,a)}}function Z0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Nr(t)}catch(a){jt(n,n.return,a)}}}function j0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Nr(t)}catch(a){jt(n,n.return,a)}}function Cy(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new X0),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new X0),n;default:throw Error(s(435,t.tag))}}function Kl(t,n){var a=Cy(t);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=By.bind(null,t,o);o.then(u,u)}})}function ri(t,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],h=t,y=n,D=y;e:for(;D!==null;){switch(D.tag){case 27:if(rs(D.type)){un=D.stateNode,si=!1;break e}break;case 5:un=D.stateNode,si=!1;break e;case 3:case 4:un=D.stateNode.containerInfo,si=!0;break e}D=D.return}if(un===null)throw Error(s(160));Y0(h,y,u),un=null,si=!1,h=u.alternate,h!==null&&(h.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)K0(n,t),n=n.sibling}var ki=null;function K0(t,n){var a=t.alternate,o=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:ri(n,t),oi(t),o&4&&($a(3,t,t.return),No(3,t),$a(5,t,t.return));break;case 1:ri(n,t),oi(t),o&512&&(An||a===null||Ji(a,a.return)),o&64&&ba&&(t=t.updateQueue,t!==null&&(o=t.callbacks,o!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=ki;if(ri(n,t),oi(t),o&512&&(An||a===null||Ji(a,a.return)),o&4){var h=a!==null?a.memoizedState:null;if(o=t.memoizedState,a===null)if(o===null)if(t.stateNode===null){e:{o=t.type,a=t.memoizedProps,u=u.ownerDocument||u;t:switch(o){case"title":h=u.getElementsByTagName("title")[0],(!h||h[ii]||h[Vt]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=u.createElement(o),u.head.insertBefore(h,u.querySelector("head > title"))),Hn(h,o,a),h[Vt]=t,Sn(h),o=h;break e;case"link":var y=Kg("link","href",u).get(o+(a.href||""));if(y){for(var D=0;D<y.length;D++)if(h=y[D],h.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&h.getAttribute("rel")===(a.rel==null?null:a.rel)&&h.getAttribute("title")===(a.title==null?null:a.title)&&h.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){y.splice(D,1);break t}}h=u.createElement(o),Hn(h,o,a),u.head.appendChild(h);break;case"meta":if(y=Kg("meta","content",u).get(o+(a.content||""))){for(D=0;D<y.length;D++)if(h=y[D],h.getAttribute("content")===(a.content==null?null:""+a.content)&&h.getAttribute("name")===(a.name==null?null:a.name)&&h.getAttribute("property")===(a.property==null?null:a.property)&&h.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&h.getAttribute("charset")===(a.charSet==null?null:a.charSet)){y.splice(D,1);break t}}h=u.createElement(o),Hn(h,o,a),u.head.appendChild(h);break;default:throw Error(s(468,o))}h[Vt]=t,Sn(h),o=h}t.stateNode=o}else Qg(u,t.type,t.stateNode);else t.stateNode=jg(u,o,t.memoizedProps);else h!==o?(h===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):h.count--,o===null?Qg(u,t.type,t.stateNode):jg(u,o,t.memoizedProps)):o===null&&t.stateNode!==null&&zf(t,t.memoizedProps,a.memoizedProps)}break;case 27:ri(n,t),oi(t),o&512&&(An||a===null||Ji(a,a.return)),a!==null&&o&4&&zf(t,t.memoizedProps,a.memoizedProps);break;case 5:if(ri(n,t),oi(t),o&512&&(An||a===null||Ji(a,a.return)),t.flags&32){u=t.stateNode;try{di(u,"")}catch(Ke){jt(t,t.return,Ke)}}o&4&&t.stateNode!=null&&(u=t.memoizedProps,zf(t,u,a!==null?a.memoizedProps:u)),o&1024&&(Gf=!0);break;case 6:if(ri(n,t),oi(t),o&4){if(t.stateNode===null)throw Error(s(162));o=t.memoizedProps,a=t.stateNode;try{a.nodeValue=o}catch(Ke){jt(t,t.return,Ke)}}break;case 3:if(hc=null,u=ki,ki=uc(n.containerInfo),ri(n,t),ki=u,oi(t),o&4&&a!==null&&a.memoizedState.isDehydrated)try{Nr(n.containerInfo)}catch(Ke){jt(t,t.return,Ke)}Gf&&(Gf=!1,Q0(t));break;case 4:o=ki,ki=uc(t.stateNode.containerInfo),ri(n,t),oi(t),ki=o;break;case 12:ri(n,t),oi(t);break;case 31:ri(n,t),oi(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Kl(t,o)));break;case 13:ri(n,t),oi(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Jl=Ot()),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Kl(t,o)));break;case 22:u=t.memoizedState!==null;var Y=a!==null&&a.memoizedState!==null,he=ba,Se=An;if(ba=he||u,An=Se||Y,ri(n,t),An=Se,ba=he,oi(t),o&8192)e:for(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||Y||ba||An||Bs(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){Y=a=n;try{if(h=Y.stateNode,u)y=h.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{D=Y.stateNode;var Ae=Y.memoizedProps.style,ge=Ae!=null&&Ae.hasOwnProperty("display")?Ae.display:null;D.style.display=ge==null||typeof ge=="boolean"?"":(""+ge).trim()}}catch(Ke){jt(Y,Y.return,Ke)}}}else if(n.tag===6){if(a===null){Y=n;try{Y.stateNode.nodeValue=u?"":Y.memoizedProps}catch(Ke){jt(Y,Y.return,Ke)}}}else if(n.tag===18){if(a===null){Y=n;try{var _e=Y.stateNode;u?Gg(_e,!0):Gg(Y.stateNode,!1)}catch(Ke){jt(Y,Y.return,Ke)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=t.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Kl(t,a))));break;case 19:ri(n,t),oi(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Kl(t,o)));break;case 30:break;case 21:break;default:ri(n,t),oi(t)}}function oi(t){var n=t.flags;if(n&2){try{for(var a,o=t.return;o!==null;){if(V0(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,h=Bf(t);jl(t,h,u);break;case 5:var y=a.stateNode;a.flags&32&&(di(y,""),a.flags&=-33);var D=Bf(t);jl(t,D,y);break;case 3:case 4:var Y=a.stateNode.containerInfo,he=Bf(t);Ff(t,he,Y);break;default:throw Error(s(161))}}catch(Se){jt(t,t.return,Se)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function Q0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;Q0(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function Ta(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)W0(t,n.alternate,n),n=n.sibling}function Bs(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:$a(4,n,n.return),Bs(n);break;case 1:Ji(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&G0(n,n.return,a),Bs(n);break;case 27:Ho(n.stateNode);case 26:case 5:Ji(n,n.return),Bs(n);break;case 22:n.memoizedState===null&&Bs(n);break;case 30:Bs(n);break;default:Bs(n)}t=t.sibling}}function Aa(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=t,h=n,y=h.flags;switch(h.tag){case 0:case 11:case 15:Aa(u,h,a),No(4,h);break;case 1:if(Aa(u,h,a),o=h,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(he){jt(o,o.return,he)}if(o=h,u=o.updateQueue,u!==null){var D=o.stateNode;try{var Y=u.shared.hiddenCallbacks;if(Y!==null)for(u.shared.hiddenCallbacks=null,u=0;u<Y.length;u++)Rm(Y[u],D)}catch(he){jt(o,o.return,he)}}a&&y&64&&F0(h),Uo(h,h.return);break;case 27:k0(h);case 26:case 5:Aa(u,h,a),a&&o===null&&y&4&&H0(h),Uo(h,h.return);break;case 12:Aa(u,h,a);break;case 31:Aa(u,h,a),a&&y&4&&Z0(u,h);break;case 13:Aa(u,h,a),a&&y&4&&j0(u,h);break;case 22:h.memoizedState===null&&Aa(u,h,a),Uo(h,h.return);break;case 30:break;default:Aa(u,h,a)}n=n.sibling}}function Hf(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&_o(a))}function Vf(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&_o(t))}function Xi(t,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)J0(t,n,a,o),n=n.sibling}function J0(t,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Xi(t,n,a,o),u&2048&&No(9,n);break;case 1:Xi(t,n,a,o);break;case 3:Xi(t,n,a,o),u&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&_o(t)));break;case 12:if(u&2048){Xi(t,n,a,o),t=n.stateNode;try{var h=n.memoizedProps,y=h.id,D=h.onPostCommit;typeof D=="function"&&D(y,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(Y){jt(n,n.return,Y)}}else Xi(t,n,a,o);break;case 31:Xi(t,n,a,o);break;case 13:Xi(t,n,a,o);break;case 23:break;case 22:h=n.stateNode,y=n.alternate,n.memoizedState!==null?h._visibility&2?Xi(t,n,a,o):Lo(t,n):h._visibility&2?Xi(t,n,a,o):(h._visibility|=2,yr(t,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Hf(y,n);break;case 24:Xi(t,n,a,o),u&2048&&Vf(n.alternate,n);break;default:Xi(t,n,a,o)}}function yr(t,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var h=t,y=n,D=a,Y=o,he=y.flags;switch(y.tag){case 0:case 11:case 15:yr(h,y,D,Y,u),No(8,y);break;case 23:break;case 22:var Se=y.stateNode;y.memoizedState!==null?Se._visibility&2?yr(h,y,D,Y,u):Lo(h,y):(Se._visibility|=2,yr(h,y,D,Y,u)),u&&he&2048&&Hf(y.alternate,y);break;case 24:yr(h,y,D,Y,u),u&&he&2048&&Vf(y.alternate,y);break;default:yr(h,y,D,Y,u)}n=n.sibling}}function Lo(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,o=n,u=o.flags;switch(o.tag){case 22:Lo(a,o),u&2048&&Hf(o.alternate,o);break;case 24:Lo(a,o),u&2048&&Vf(o.alternate,o);break;default:Lo(a,o)}n=n.sibling}}var Oo=8192;function Mr(t,n,a){if(t.subtreeFlags&Oo)for(t=t.child;t!==null;)$0(t,n,a),t=t.sibling}function $0(t,n,a){switch(t.tag){case 26:Mr(t,n,a),t.flags&Oo&&t.memoizedState!==null&&mM(a,ki,t.memoizedState,t.memoizedProps);break;case 5:Mr(t,n,a);break;case 3:case 4:var o=ki;ki=uc(t.stateNode.containerInfo),Mr(t,n,a),ki=o;break;case 22:t.memoizedState===null&&(o=t.alternate,o!==null&&o.memoizedState!==null?(o=Oo,Oo=16777216,Mr(t,n,a),Oo=o):Mr(t,n,a));break;default:Mr(t,n,a)}}function eg(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function Po(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Pn=o,ng(o,t)}eg(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)tg(t),t=t.sibling}function tg(t){switch(t.tag){case 0:case 11:case 15:Po(t),t.flags&2048&&$a(9,t,t.return);break;case 3:Po(t);break;case 12:Po(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,Ql(t)):Po(t);break;default:Po(t)}}function Ql(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Pn=o,ng(o,t)}eg(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:$a(8,n,n.return),Ql(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Ql(n));break;default:Ql(n)}t=t.sibling}}function ng(t,n){for(;Pn!==null;){var a=Pn;switch(a.tag){case 0:case 11:case 15:$a(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:_o(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,Pn=o;else e:for(a=t;Pn!==null;){o=Pn;var u=o.sibling,h=o.return;if(q0(o),o===a){Pn=null;break e}if(u!==null){u.return=h,Pn=u;break e}Pn=h}}}var Dy={getCacheForType:function(t){var n=Fn(bn),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return Fn(bn).controller.signal}},Ny=typeof WeakMap=="function"?WeakMap:Map,kt=0,nn=null,St=null,wt=0,Zt=0,_i=null,es=!1,Sr=!1,kf=!1,wa=0,mn=0,ts=0,Fs=0,Xf=0,xi=0,br=0,Io=null,li=null,Wf=!1,Jl=0,ig=0,$l=1/0,ec=null,ns=null,Cn=0,is=null,Er=null,Ra=0,qf=0,Yf=null,ag=null,zo=0,Zf=null;function yi(){return(kt&2)!==0&&wt!==0?wt&-wt:P.T!==null?eh():yt()}function sg(){if(xi===0)if((wt&536870912)===0||Ct){var t=ut;ut<<=1,(ut&3932160)===0&&(ut=262144),xi=t}else xi=536870912;return t=gi.current,t!==null&&(t.flags|=32),xi}function ci(t,n,a){(t===nn&&(Zt===2||Zt===9)||t.cancelPendingCommit!==null)&&(Tr(t,0),as(t,wt,xi,!1)),We(t,a),((kt&2)===0||t!==nn)&&(t===nn&&((kt&2)===0&&(Fs|=a),mn===4&&as(t,wt,xi,!1)),$i(t))}function rg(t,n,a){if((kt&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Oe(t,n),u=o?Oy(t,n):Kf(t,n,!0),h=o;do{if(u===0){Sr&&!o&&as(t,n,0,!1);break}else{if(a=t.current.alternate,h&&!Uy(a)){u=Kf(t,n,!1),h=!1;continue}if(u===2){if(h=n,t.errorRecoveryDisabledLanes&h)var y=0;else y=t.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){n=y;e:{var D=t;u=Io;var Y=D.current.memoizedState.isDehydrated;if(Y&&(Tr(D,y).flags|=256),y=Kf(D,y,!1),y!==2){if(kf&&!Y){D.errorRecoveryDisabledLanes|=h,Fs|=h,u=4;break e}h=li,li=u,h!==null&&(li===null?li=h:li.push.apply(li,h))}u=y}if(h=!1,u!==2)continue}}if(u===1){Tr(t,0),as(t,n,0,!0);break}e:{switch(o=t,h=u,h){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:as(o,n,xi,!es);break e;case 2:li=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=Jl+300-Ot(),10<u)){if(as(o,n,xi,!es),Me(o,0,!0)!==0)break e;Ra=n,o.timeoutHandle=zg(og.bind(null,o,a,li,ec,Wf,n,xi,Fs,br,es,h,"Throttled",-0,0),u);break e}og(o,a,li,ec,Wf,n,xi,Fs,br,es,h,null,-0,0)}}break}while(!0);$i(t)}function og(t,n,a,o,u,h,y,D,Y,he,Se,Ae,ge,_e){if(t.timeoutHandle=-1,Ae=n.subtreeFlags,Ae&8192||(Ae&16785408)===16785408){Ae={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:da},$0(n,h,Ae);var Ke=(h&62914560)===h?Jl-Ot():(h&4194048)===h?ig-Ot():0;if(Ke=gM(Ae,Ke),Ke!==null){Ra=h,t.cancelPendingCommit=Ke(mg.bind(null,t,n,h,a,o,u,y,D,Y,Se,Ae,null,ge,_e)),as(t,h,y,!he);return}}mg(t,n,h,a,o,u,y,D,Y)}function Uy(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],h=u.getSnapshot;u=u.value;try{if(!pi(h(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function as(t,n,a,o){n&=~Xf,n&=~Fs,t.suspendedLanes|=n,t.pingedLanes&=~n,o&&(t.warmLanes|=n),o=t.expirationTimes;for(var u=n;0<u;){var h=31-ze(u),y=1<<h;o[h]=-1,u&=~y}a!==0&&Ht(t,a,n)}function tc(){return(kt&6)===0?(Bo(0),!1):!0}function jf(){if(St!==null){if(Zt===0)var t=St.return;else t=St,va=Ds=null,ff(t),mr=null,yo=0,t=St;for(;t!==null;)B0(t.alternate,t),t=t.return;St=null}}function Tr(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,Jy(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),Ra=0,jf(),nn=t,St=a=ma(t.current,null),wt=n,Zt=0,_i=null,es=!1,Sr=Oe(t,n),kf=!1,br=xi=Xf=Fs=ts=mn=0,li=Io=null,Wf=!1,(n&8)!==0&&(n|=n&32);var o=t.entangledLanes;if(o!==0)for(t=t.entanglements,o&=n;0<o;){var u=31-ze(o),h=1<<u;n|=t[u],o&=~h}return wa=n,Sl(),a}function lg(t,n){gt=null,P.H=Ro,n===pr||n===Dl?(n=Em(),Zt=3):n===Ju?(n=Em(),Zt=4):Zt=n===wf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,_i=n,St===null&&(mn=1,Xl(t,Ci(n,t.current)))}function cg(){var t=gi.current;return t===null?!0:(wt&4194048)===wt?Li===null:(wt&62914560)===wt||(wt&536870912)!==0?t===Li:!1}function ug(){var t=P.H;return P.H=Ro,t===null?Ro:t}function fg(){var t=P.A;return P.A=Dy,t}function nc(){mn=4,es||(wt&4194048)!==wt&&gi.current!==null||(Sr=!0),(ts&134217727)===0&&(Fs&134217727)===0||nn===null||as(nn,wt,xi,!1)}function Kf(t,n,a){var o=kt;kt|=2;var u=ug(),h=fg();(nn!==t||wt!==n)&&(ec=null,Tr(t,n)),n=!1;var y=mn;e:do try{if(Zt!==0&&St!==null){var D=St,Y=_i;switch(Zt){case 8:jf(),y=6;break e;case 3:case 2:case 9:case 6:gi.current===null&&(n=!0);var he=Zt;if(Zt=0,_i=null,Ar(t,D,Y,he),a&&Sr){y=0;break e}break;default:he=Zt,Zt=0,_i=null,Ar(t,D,Y,he)}}Ly(),y=mn;break}catch(Se){lg(t,Se)}while(!0);return n&&t.shellSuspendCounter++,va=Ds=null,kt=o,P.H=u,P.A=h,St===null&&(nn=null,wt=0,Sl()),y}function Ly(){for(;St!==null;)hg(St)}function Oy(t,n){var a=kt;kt|=2;var o=ug(),u=fg();nn!==t||wt!==n?(ec=null,$l=Ot()+500,Tr(t,n)):Sr=Oe(t,n);e:do try{if(Zt!==0&&St!==null){n=St;var h=_i;t:switch(Zt){case 1:Zt=0,_i=null,Ar(t,n,h,1);break;case 2:case 9:if(Sm(h)){Zt=0,_i=null,dg(n);break}n=function(){Zt!==2&&Zt!==9||nn!==t||(Zt=7),$i(t)},h.then(n,n);break e;case 3:Zt=7;break e;case 4:Zt=5;break e;case 7:Sm(h)?(Zt=0,_i=null,dg(n)):(Zt=0,_i=null,Ar(t,n,h,7));break;case 5:var y=null;switch(St.tag){case 26:y=St.memoizedState;case 5:case 27:var D=St;if(y?Jg(y):D.stateNode.complete){Zt=0,_i=null;var Y=D.sibling;if(Y!==null)St=Y;else{var he=D.return;he!==null?(St=he,ic(he)):St=null}break t}}Zt=0,_i=null,Ar(t,n,h,5);break;case 6:Zt=0,_i=null,Ar(t,n,h,6);break;case 8:jf(),mn=6;break e;default:throw Error(s(462))}}Py();break}catch(Se){lg(t,Se)}while(!0);return va=Ds=null,P.H=o,P.A=u,kt=a,St!==null?0:(nn=null,wt=0,Sl(),mn)}function Py(){for(;St!==null&&!en();)hg(St)}function hg(t){var n=I0(t.alternate,t,wa);t.memoizedProps=t.pendingProps,n===null?ic(t):St=n}function dg(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=D0(a,n,n.pendingProps,n.type,void 0,wt);break;case 11:n=D0(a,n,n.pendingProps,n.type.render,n.ref,wt);break;case 5:ff(n);default:B0(a,n),n=St=fm(n,wa),n=I0(a,n,wa)}t.memoizedProps=t.pendingProps,n===null?ic(t):St=n}function Ar(t,n,a,o){va=Ds=null,ff(n),mr=null,yo=0;var u=n.return;try{if(by(t,u,n,a,wt)){mn=1,Xl(t,Ci(a,t.current)),St=null;return}}catch(h){if(u!==null)throw St=u,h;mn=1,Xl(t,Ci(a,t.current)),St=null;return}n.flags&32768?(Ct||o===1?t=!0:Sr||(wt&536870912)!==0?t=!1:(es=t=!0,(o===2||o===9||o===3||o===6)&&(o=gi.current,o!==null&&o.tag===13&&(o.flags|=16384))),pg(n,t)):ic(n)}function ic(t){var n=t;do{if((n.flags&32768)!==0){pg(n,es);return}t=n.return;var a=Ay(n.alternate,n,wa);if(a!==null){St=a;return}if(n=n.sibling,n!==null){St=n;return}St=n=t}while(n!==null);mn===0&&(mn=5)}function pg(t,n){do{var a=wy(t.alternate,t);if(a!==null){a.flags&=32767,St=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){St=t;return}St=t=a}while(t!==null);mn=6,St=null}function mg(t,n,a,o,u,h,y,D,Y){t.cancelPendingCommit=null;do ac();while(Cn!==0);if((kt&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));if(h=n.lanes|n.childLanes,h|=zu,an(t,a,h,y,D,Y),t===nn&&(St=nn=null,wt=0),Er=n,is=t,Ra=a,qf=h,Yf=u,ag=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,Fy(ie,function(){return yg(),null})):(t.callbackNode=null,t.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=P.T,P.T=null,u=U.p,U.p=2,y=kt,kt|=4;try{Ry(t,n,a)}finally{kt=y,U.p=u,P.T=o}}Cn=1,gg(),vg(),_g()}}function gg(){if(Cn===1){Cn=0;var t=is,n=Er,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=P.T,P.T=null;var o=U.p;U.p=2;var u=kt;kt|=4;try{K0(n,t);var h=lh,y=nm(t.containerInfo),D=h.focusedElem,Y=h.selectionRange;if(y!==D&&D&&D.ownerDocument&&tm(D.ownerDocument.documentElement,D)){if(Y!==null&&Uu(D)){var he=Y.start,Se=Y.end;if(Se===void 0&&(Se=he),"selectionStart"in D)D.selectionStart=he,D.selectionEnd=Math.min(Se,D.value.length);else{var Ae=D.ownerDocument||document,ge=Ae&&Ae.defaultView||window;if(ge.getSelection){var _e=ge.getSelection(),Ke=D.textContent.length,ct=Math.min(Y.start,Ke),$t=Y.end===void 0?ct:Math.min(Y.end,Ke);!_e.extend&&ct>$t&&(y=$t,$t=ct,ct=y);var ae=em(D,ct),Q=em(D,$t);if(ae&&Q&&(_e.rangeCount!==1||_e.anchorNode!==ae.node||_e.anchorOffset!==ae.offset||_e.focusNode!==Q.node||_e.focusOffset!==Q.offset)){var ue=Ae.createRange();ue.setStart(ae.node,ae.offset),_e.removeAllRanges(),ct>$t?(_e.addRange(ue),_e.extend(Q.node,Q.offset)):(ue.setEnd(Q.node,Q.offset),_e.addRange(ue))}}}}for(Ae=[],_e=D;_e=_e.parentNode;)_e.nodeType===1&&Ae.push({element:_e,left:_e.scrollLeft,top:_e.scrollTop});for(typeof D.focus=="function"&&D.focus(),D=0;D<Ae.length;D++){var Ee=Ae[D];Ee.element.scrollLeft=Ee.left,Ee.element.scrollTop=Ee.top}}gc=!!oh,lh=oh=null}finally{kt=u,U.p=o,P.T=a}}t.current=n,Cn=2}}function vg(){if(Cn===2){Cn=0;var t=is,n=Er,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=P.T,P.T=null;var o=U.p;U.p=2;var u=kt;kt|=4;try{W0(t,n.alternate,n)}finally{kt=u,U.p=o,P.T=a}}Cn=3}}function _g(){if(Cn===4||Cn===3){Cn=0,ee();var t=is,n=Er,a=Ra,o=ag;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?Cn=5:(Cn=0,Er=is=null,xg(t,t.pendingLanes));var u=t.pendingLanes;if(u===0&&(ns=null),ht(a),n=n.stateNode,oe&&typeof oe.onCommitFiberRoot=="function")try{oe.onCommitFiberRoot(q,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=P.T,u=U.p,U.p=2,P.T=null;try{for(var h=t.onRecoverableError,y=0;y<o.length;y++){var D=o[y];h(D.value,{componentStack:D.stack})}}finally{P.T=n,U.p=u}}(Ra&3)!==0&&ac(),$i(t),u=t.pendingLanes,(a&261930)!==0&&(u&42)!==0?t===Zf?zo++:(zo=0,Zf=t):zo=0,Bo(0)}}function xg(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,_o(n)))}function ac(){return gg(),vg(),_g(),yg()}function yg(){if(Cn!==5)return!1;var t=is,n=qf;qf=0;var a=ht(Ra),o=P.T,u=U.p;try{U.p=32>a?32:a,P.T=null,a=Yf,Yf=null;var h=is,y=Ra;if(Cn=0,Er=is=null,Ra=0,(kt&6)!==0)throw Error(s(331));var D=kt;if(kt|=4,tg(h.current),J0(h,h.current,y,a),kt=D,Bo(0,!1),oe&&typeof oe.onPostCommitFiberRoot=="function")try{oe.onPostCommitFiberRoot(q,h)}catch{}return!0}finally{U.p=u,P.T=o,xg(t,n)}}function Mg(t,n,a){n=Ci(a,n),n=Af(t.stateNode,n,2),t=Ka(t,n,2),t!==null&&(We(t,2),$i(t))}function jt(t,n,a){if(t.tag===3)Mg(t,t,a);else for(;n!==null;){if(n.tag===3){Mg(n,t,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(ns===null||!ns.has(o))){t=Ci(a,t),a=S0(2),o=Ka(n,a,2),o!==null&&(b0(a,o,n,t),We(o,2),$i(o));break}}n=n.return}}function Qf(t,n,a){var o=t.pingCache;if(o===null){o=t.pingCache=new Ny;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(kf=!0,u.add(a),t=Iy.bind(null,t,n,a),n.then(t,t))}function Iy(t,n,a){var o=t.pingCache;o!==null&&o.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,nn===t&&(wt&a)===a&&(mn===4||mn===3&&(wt&62914560)===wt&&300>Ot()-Jl?(kt&2)===0&&Tr(t,0):Xf|=a,br===wt&&(br=0)),$i(t)}function Sg(t,n){n===0&&(n=we()),t=ws(t,n),t!==null&&(We(t,n),$i(t))}function zy(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),Sg(t,a)}function By(t,n){var a=0;switch(t.tag){case 31:case 13:var o=t.stateNode,u=t.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),Sg(t,a)}function Fy(t,n){return Lt(t,n)}var sc=null,wr=null,Jf=!1,rc=!1,$f=!1,ss=0;function $i(t){t!==wr&&t.next===null&&(wr===null?sc=wr=t:wr=wr.next=t),rc=!0,Jf||(Jf=!0,Hy())}function Bo(t,n){if(!$f&&rc){$f=!0;do for(var a=!1,o=sc;o!==null;){if(t!==0){var u=o.pendingLanes;if(u===0)var h=0;else{var y=o.suspendedLanes,D=o.pingedLanes;h=(1<<31-ze(42|t)+1)-1,h&=u&~(y&~D),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(a=!0,Ag(o,h))}else h=wt,h=Me(o,o===nn?h:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(h&3)===0||Oe(o,h)||(a=!0,Ag(o,h));o=o.next}while(a);$f=!1}}function Gy(){bg()}function bg(){rc=Jf=!1;var t=0;ss!==0&&Qy()&&(t=ss);for(var n=Ot(),a=null,o=sc;o!==null;){var u=o.next,h=Eg(o,n);h===0?(o.next=null,a===null?sc=u:a.next=u,u===null&&(wr=a)):(a=o,(t!==0||(h&3)!==0)&&(rc=!0)),o=u}Cn!==0&&Cn!==5||Bo(t),ss!==0&&(ss=0)}function Eg(t,n){for(var a=t.suspendedLanes,o=t.pingedLanes,u=t.expirationTimes,h=t.pendingLanes&-62914561;0<h;){var y=31-ze(h),D=1<<y,Y=u[y];Y===-1?((D&a)===0||(D&o)!==0)&&(u[y]=Fe(D,n)):Y<=n&&(t.expiredLanes|=D),h&=~D}if(n=nn,a=wt,a=Me(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,a===0||t===n&&(Zt===2||Zt===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&Gt(o),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Oe(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(o!==null&&Gt(o),ht(a)){case 2:case 8:a=E;break;case 32:a=ie;break;case 268435456:a=xe;break;default:a=ie}return o=Tg.bind(null,t),a=Lt(a,o),t.callbackPriority=n,t.callbackNode=a,n}return o!==null&&o!==null&&Gt(o),t.callbackPriority=2,t.callbackNode=null,2}function Tg(t,n){if(Cn!==0&&Cn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(ac()&&t.callbackNode!==a)return null;var o=wt;return o=Me(t,t===nn?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(rg(t,o,n),Eg(t,Ot()),t.callbackNode!=null&&t.callbackNode===a?Tg.bind(null,t):null)}function Ag(t,n){if(ac())return null;rg(t,n,!0)}function Hy(){$y(function(){(kt&6)!==0?Lt(F,Gy):bg()})}function eh(){if(ss===0){var t=hr;t===0&&(t=nt,nt<<=1,(nt&261888)===0&&(nt=256)),ss=t}return ss}function wg(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:bs(""+t)}function Rg(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function Vy(t,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var h=wg((u[dn]||null).action),y=o.submitter;y&&(n=(n=y[dn]||null)?wg(n.formAction):y.getAttribute("formAction"),n!==null&&(h=n,y=null));var D=new _l("action","action",null,o,u);t.push({event:D,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(ss!==0){var Y=y?Rg(u,y):new FormData(u);yf(a,{pending:!0,data:Y,method:u.method,action:h},null,Y)}}else typeof h=="function"&&(D.preventDefault(),Y=y?Rg(u,y):new FormData(u),yf(a,{pending:!0,data:Y,method:u.method,action:h},h,Y))},currentTarget:u}]})}}for(var th=0;th<Iu.length;th++){var nh=Iu[th],ky=nh.toLowerCase(),Xy=nh[0].toUpperCase()+nh.slice(1);Vi(ky,"on"+Xy)}Vi(sm,"onAnimationEnd"),Vi(rm,"onAnimationIteration"),Vi(om,"onAnimationStart"),Vi("dblclick","onDoubleClick"),Vi("focusin","onFocus"),Vi("focusout","onBlur"),Vi(ry,"onTransitionRun"),Vi(oy,"onTransitionStart"),Vi(ly,"onTransitionCancel"),Vi(lm,"onTransitionEnd"),me("onMouseEnter",["mouseout","mouseover"]),me("onMouseLeave",["mouseout","mouseover"]),me("onPointerEnter",["pointerout","pointerover"]),me("onPointerLeave",["pointerout","pointerover"]),te("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),te("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),te("onBeforeInput",["compositionend","keypress","textInput","paste"]),te("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),te("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),te("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Fo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Wy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Fo));function Cg(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var o=t[a],u=o.event;o=o.listeners;e:{var h=void 0;if(n)for(var y=o.length-1;0<=y;y--){var D=o[y],Y=D.instance,he=D.currentTarget;if(D=D.listener,Y!==h&&u.isPropagationStopped())break e;h=D,u.currentTarget=he;try{h(u)}catch(Se){Ml(Se)}u.currentTarget=null,h=Y}else for(y=0;y<o.length;y++){if(D=o[y],Y=D.instance,he=D.currentTarget,D=D.listener,Y!==h&&u.isPropagationStopped())break e;h=D,u.currentTarget=he;try{h(u)}catch(Se){Ml(Se)}u.currentTarget=null,h=Y}}}}function bt(t,n){var a=n[Wn];a===void 0&&(a=n[Wn]=new Set);var o=t+"__bubble";a.has(o)||(Dg(n,t,2,!1),a.add(o))}function ih(t,n,a){var o=0;n&&(o|=4),Dg(a,t,o,n)}var oc="_reactListening"+Math.random().toString(36).slice(2);function ah(t){if(!t[oc]){t[oc]=!0,pl.forEach(function(a){a!=="selectionchange"&&(Wy.has(a)||ih(a,!1,t),ih(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[oc]||(n[oc]=!0,ih("selectionchange",!1,n))}}function Dg(t,n,a,o){switch(sv(n)){case 2:var u=xM;break;case 8:u=yM;break;default:u=xh}a=u.bind(null,n,a,t),u=void 0,!bu||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?t.addEventListener(n,a,{capture:!0,passive:u}):t.addEventListener(n,a,!0):u!==void 0?t.addEventListener(n,a,{passive:u}):t.addEventListener(n,a,!1)}function sh(t,n,a,o,u){var h=o;if((n&1)===0&&(n&2)===0&&o!==null)e:for(;;){if(o===null)return;var y=o.tag;if(y===3||y===4){var D=o.stateNode.containerInfo;if(D===u)break;if(y===4)for(y=o.return;y!==null;){var Y=y.tag;if((Y===3||Y===4)&&y.stateNode.containerInfo===u)return;y=y.return}for(;D!==null;){if(y=fa(D),y===null)return;if(Y=y.tag,Y===5||Y===6||Y===26||Y===27){o=h=y;continue e}D=D.parentNode}}o=o.return}Pp(function(){var he=h,Se=Mu(a),Ae=[];e:{var ge=cm.get(t);if(ge!==void 0){var _e=_l,Ke=t;switch(t){case"keypress":if(gl(a)===0)break e;case"keydown":case"keyup":_e=Bx;break;case"focusin":Ke="focus",_e=wu;break;case"focusout":Ke="blur",_e=wu;break;case"beforeblur":case"afterblur":_e=wu;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":_e=Bp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":_e=Ax;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":_e=Hx;break;case sm:case rm:case om:_e=Cx;break;case lm:_e=kx;break;case"scroll":case"scrollend":_e=Ex;break;case"wheel":_e=Wx;break;case"copy":case"cut":case"paste":_e=Nx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":_e=Gp;break;case"toggle":case"beforetoggle":_e=Yx}var ct=(n&4)!==0,$t=!ct&&(t==="scroll"||t==="scrollend"),ae=ct?ge!==null?ge+"Capture":null:ge;ct=[];for(var Q=he,ue;Q!==null;){var Ee=Q;if(ue=Ee.stateNode,Ee=Ee.tag,Ee!==5&&Ee!==26&&Ee!==27||ue===null||ae===null||(Ee=ro(Q,ae),Ee!=null&&ct.push(Go(Q,Ee,ue))),$t)break;Q=Q.return}0<ct.length&&(ge=new _e(ge,Ke,null,a,Se),Ae.push({event:ge,listeners:ct}))}}if((n&7)===0){e:{if(ge=t==="mouseover"||t==="pointerover",_e=t==="mouseout"||t==="pointerout",ge&&a!==yu&&(Ke=a.relatedTarget||a.fromElement)&&(fa(Ke)||Ke[Mn]))break e;if((_e||ge)&&(ge=Se.window===Se?Se:(ge=Se.ownerDocument)?ge.defaultView||ge.parentWindow:window,_e?(Ke=a.relatedTarget||a.toElement,_e=he,Ke=Ke?fa(Ke):null,Ke!==null&&($t=c(Ke),ct=Ke.tag,Ke!==$t||ct!==5&&ct!==27&&ct!==6)&&(Ke=null)):(_e=null,Ke=he),_e!==Ke)){if(ct=Bp,Ee="onMouseLeave",ae="onMouseEnter",Q="mouse",(t==="pointerout"||t==="pointerover")&&(ct=Gp,Ee="onPointerLeave",ae="onPointerEnter",Q="pointer"),$t=_e==null?ge:Ss(_e),ue=Ke==null?ge:Ss(Ke),ge=new ct(Ee,Q+"leave",_e,a,Se),ge.target=$t,ge.relatedTarget=ue,Ee=null,fa(Se)===he&&(ct=new ct(ae,Q+"enter",Ke,a,Se),ct.target=ue,ct.relatedTarget=$t,Ee=ct),$t=Ee,_e&&Ke)t:{for(ct=qy,ae=_e,Q=Ke,ue=0,Ee=ae;Ee;Ee=ct(Ee))ue++;Ee=0;for(var at=Q;at;at=ct(at))Ee++;for(;0<ue-Ee;)ae=ct(ae),ue--;for(;0<Ee-ue;)Q=ct(Q),Ee--;for(;ue--;){if(ae===Q||Q!==null&&ae===Q.alternate){ct=ae;break t}ae=ct(ae),Q=ct(Q)}ct=null}else ct=null;_e!==null&&Ng(Ae,ge,_e,ct,!1),Ke!==null&&$t!==null&&Ng(Ae,$t,Ke,ct,!0)}}e:{if(ge=he?Ss(he):window,_e=ge.nodeName&&ge.nodeName.toLowerCase(),_e==="select"||_e==="input"&&ge.type==="file")var Bt=Zp;else if(qp(ge))if(jp)Bt=iy;else{Bt=ty;var Je=ey}else _e=ge.nodeName,!_e||_e.toLowerCase()!=="input"||ge.type!=="checkbox"&&ge.type!=="radio"?he&&Xt(he.elementType)&&(Bt=Zp):Bt=ny;if(Bt&&(Bt=Bt(t,he))){Yp(Ae,Bt,a,Se);break e}Je&&Je(t,ge,he),t==="focusout"&&he&&ge.type==="number"&&he.memoizedProps.value!=null&&Mt(ge,"number",ge.value)}switch(Je=he?Ss(he):window,t){case"focusin":(qp(Je)||Je.contentEditable==="true")&&(ar=Je,Lu=he,mo=null);break;case"focusout":mo=Lu=ar=null;break;case"mousedown":Ou=!0;break;case"contextmenu":case"mouseup":case"dragend":Ou=!1,im(Ae,a,Se);break;case"selectionchange":if(sy)break;case"keydown":case"keyup":im(Ae,a,Se)}var vt;if(Cu)e:{switch(t){case"compositionstart":var Rt="onCompositionStart";break e;case"compositionend":Rt="onCompositionEnd";break e;case"compositionupdate":Rt="onCompositionUpdate";break e}Rt=void 0}else ir?Xp(t,a)&&(Rt="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(Rt="onCompositionStart");Rt&&(Hp&&a.locale!=="ko"&&(ir||Rt!=="onCompositionStart"?Rt==="onCompositionEnd"&&ir&&(vt=Ip()):(ka=Se,Eu="value"in ka?ka.value:ka.textContent,ir=!0)),Je=lc(he,Rt),0<Je.length&&(Rt=new Fp(Rt,t,null,a,Se),Ae.push({event:Rt,listeners:Je}),vt?Rt.data=vt:(vt=Wp(a),vt!==null&&(Rt.data=vt)))),(vt=jx?Kx(t,a):Qx(t,a))&&(Rt=lc(he,"onBeforeInput"),0<Rt.length&&(Je=new Fp("onBeforeInput","beforeinput",null,a,Se),Ae.push({event:Je,listeners:Rt}),Je.data=vt)),Vy(Ae,t,he,a,Se)}Cg(Ae,n)})}function Go(t,n,a){return{instance:t,listener:n,currentTarget:a}}function lc(t,n){for(var a=n+"Capture",o=[];t!==null;){var u=t,h=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||h===null||(u=ro(t,a),u!=null&&o.unshift(Go(t,u,h)),u=ro(t,n),u!=null&&o.push(Go(t,u,h))),t.tag===3)return o;t=t.return}return[]}function qy(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Ng(t,n,a,o,u){for(var h=n._reactName,y=[];a!==null&&a!==o;){var D=a,Y=D.alternate,he=D.stateNode;if(D=D.tag,Y!==null&&Y===o)break;D!==5&&D!==26&&D!==27||he===null||(Y=he,u?(he=ro(a,h),he!=null&&y.unshift(Go(a,he,Y))):u||(he=ro(a,h),he!=null&&y.push(Go(a,he,Y)))),a=a.return}y.length!==0&&t.push({event:n,listeners:y})}var Yy=/\r\n?/g,Zy=/\u0000|\uFFFD/g;function Ug(t){return(typeof t=="string"?t:""+t).replace(Yy,`
`).replace(Zy,"")}function Lg(t,n){return n=Ug(n),Ug(t)===n}function Jt(t,n,a,o,u,h){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||di(t,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&di(t,""+o);break;case"className":je(t,"class",o);break;case"tabIndex":je(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":je(t,a,o);break;case"style":Hi(t,o,h);break;case"data":if(n!=="object"){je(t,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=bs(""+o),t.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(a==="formAction"?(n!=="input"&&Jt(t,n,"name",u.name,u,null),Jt(t,n,"formEncType",u.formEncType,u,null),Jt(t,n,"formMethod",u.formMethod,u,null),Jt(t,n,"formTarget",u.formTarget,u,null)):(Jt(t,n,"encType",u.encType,u,null),Jt(t,n,"method",u.method,u,null),Jt(t,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=bs(""+o),t.setAttribute(a,o);break;case"onClick":o!=null&&(t.onclick=da);break;case"onScroll":o!=null&&bt("scroll",t);break;case"onScrollEnd":o!=null&&bt("scrollend",t);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}a=bs(""+o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""+o):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":o===!0?t.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,o):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(a,o):t.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(a):t.setAttribute(a,o);break;case"popover":bt("beforetoggle",t),bt("toggle",t),Be(t,"popover",o);break;case"xlinkActuate":Ye(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Ye(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Ye(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Ye(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Ye(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Ye(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Ye(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Ye(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Ye(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Be(t,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=ji.get(a)||a,Be(t,a,o))}}function rh(t,n,a,o,u,h){switch(a){case"style":Hi(t,o,h);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"children":typeof o=="string"?di(t,o):(typeof o=="number"||typeof o=="bigint")&&di(t,""+o);break;case"onScroll":o!=null&&bt("scroll",t);break;case"onScrollEnd":o!=null&&bt("scrollend",t);break;case"onClick":o!=null&&(t.onclick=da);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!R.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),h=t[dn]||null,h=h!=null?h[a]:null,typeof h=="function"&&t.removeEventListener(n,h,u),typeof o=="function")){typeof h!="function"&&h!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,o,u);break e}a in t?t[a]=o:o===!0?t.setAttribute(a,""):Be(t,a,o)}}}function Hn(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":bt("error",t),bt("load",t);var o=!1,u=!1,h;for(h in a)if(a.hasOwnProperty(h)){var y=a[h];if(y!=null)switch(h){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Jt(t,n,h,y,a,null)}}u&&Jt(t,n,"srcSet",a.srcSet,a,null),o&&Jt(t,n,"src",a.src,a,null);return;case"input":bt("invalid",t);var D=h=y=u=null,Y=null,he=null;for(o in a)if(a.hasOwnProperty(o)){var Se=a[o];if(Se!=null)switch(o){case"name":u=Se;break;case"type":y=Se;break;case"checked":Y=Se;break;case"defaultChecked":he=Se;break;case"value":h=Se;break;case"defaultValue":D=Se;break;case"children":case"dangerouslySetInnerHTML":if(Se!=null)throw Error(s(137,n));break;default:Jt(t,n,o,Se,a,null)}}Yn(t,h,D,Y,he,y,u,!1);return;case"select":bt("invalid",t),o=y=h=null;for(u in a)if(a.hasOwnProperty(u)&&(D=a[u],D!=null))switch(u){case"value":h=D;break;case"defaultValue":y=D;break;case"multiple":o=D;default:Jt(t,n,u,D,a,null)}n=h,a=y,t.multiple=!!o,n!=null?Rn(t,!!o,n,!1):a!=null&&Rn(t,!!o,a,!0);return;case"textarea":bt("invalid",t),h=u=o=null;for(y in a)if(a.hasOwnProperty(y)&&(D=a[y],D!=null))switch(y){case"value":o=D;break;case"defaultValue":u=D;break;case"children":h=D;break;case"dangerouslySetInnerHTML":if(D!=null)throw Error(s(91));break;default:Jt(t,n,y,D,a,null)}Gi(t,o,u,h);return;case"option":for(Y in a)a.hasOwnProperty(Y)&&(o=a[Y],o!=null)&&(Y==="selected"?t.selected=o&&typeof o!="function"&&typeof o!="symbol":Jt(t,n,Y,o,a,null));return;case"dialog":bt("beforetoggle",t),bt("toggle",t),bt("cancel",t),bt("close",t);break;case"iframe":case"object":bt("load",t);break;case"video":case"audio":for(o=0;o<Fo.length;o++)bt(Fo[o],t);break;case"image":bt("error",t),bt("load",t);break;case"details":bt("toggle",t);break;case"embed":case"source":case"link":bt("error",t),bt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(he in a)if(a.hasOwnProperty(he)&&(o=a[he],o!=null))switch(he){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Jt(t,n,he,o,a,null)}return;default:if(Xt(n)){for(Se in a)a.hasOwnProperty(Se)&&(o=a[Se],o!==void 0&&rh(t,n,Se,o,a,void 0));return}}for(D in a)a.hasOwnProperty(D)&&(o=a[D],o!=null&&Jt(t,n,D,o,a,null))}function jy(t,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,h=null,y=null,D=null,Y=null,he=null,Se=null;for(_e in a){var Ae=a[_e];if(a.hasOwnProperty(_e)&&Ae!=null)switch(_e){case"checked":break;case"value":break;case"defaultValue":Y=Ae;default:o.hasOwnProperty(_e)||Jt(t,n,_e,null,o,Ae)}}for(var ge in o){var _e=o[ge];if(Ae=a[ge],o.hasOwnProperty(ge)&&(_e!=null||Ae!=null))switch(ge){case"type":h=_e;break;case"name":u=_e;break;case"checked":he=_e;break;case"defaultChecked":Se=_e;break;case"value":y=_e;break;case"defaultValue":D=_e;break;case"children":case"dangerouslySetInnerHTML":if(_e!=null)throw Error(s(137,n));break;default:_e!==Ae&&Jt(t,n,ge,_e,o,Ae)}}Xe(t,y,D,Y,he,Se,h,u);return;case"select":_e=y=D=ge=null;for(h in a)if(Y=a[h],a.hasOwnProperty(h)&&Y!=null)switch(h){case"value":break;case"multiple":_e=Y;default:o.hasOwnProperty(h)||Jt(t,n,h,null,o,Y)}for(u in o)if(h=o[u],Y=a[u],o.hasOwnProperty(u)&&(h!=null||Y!=null))switch(u){case"value":ge=h;break;case"defaultValue":D=h;break;case"multiple":y=h;default:h!==Y&&Jt(t,n,u,h,o,Y)}n=D,a=y,o=_e,ge!=null?Rn(t,!!a,ge,!1):!!o!=!!a&&(n!=null?Rn(t,!!a,n,!0):Rn(t,!!a,a?[]:"",!1));return;case"textarea":_e=ge=null;for(D in a)if(u=a[D],a.hasOwnProperty(D)&&u!=null&&!o.hasOwnProperty(D))switch(D){case"value":break;case"children":break;default:Jt(t,n,D,null,o,u)}for(y in o)if(u=o[y],h=a[y],o.hasOwnProperty(y)&&(u!=null||h!=null))switch(y){case"value":ge=u;break;case"defaultValue":_e=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==h&&Jt(t,n,y,u,o,h)}hi(t,ge,_e);return;case"option":for(var Ke in a)ge=a[Ke],a.hasOwnProperty(Ke)&&ge!=null&&!o.hasOwnProperty(Ke)&&(Ke==="selected"?t.selected=!1:Jt(t,n,Ke,null,o,ge));for(Y in o)ge=o[Y],_e=a[Y],o.hasOwnProperty(Y)&&ge!==_e&&(ge!=null||_e!=null)&&(Y==="selected"?t.selected=ge&&typeof ge!="function"&&typeof ge!="symbol":Jt(t,n,Y,ge,o,_e));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ct in a)ge=a[ct],a.hasOwnProperty(ct)&&ge!=null&&!o.hasOwnProperty(ct)&&Jt(t,n,ct,null,o,ge);for(he in o)if(ge=o[he],_e=a[he],o.hasOwnProperty(he)&&ge!==_e&&(ge!=null||_e!=null))switch(he){case"children":case"dangerouslySetInnerHTML":if(ge!=null)throw Error(s(137,n));break;default:Jt(t,n,he,ge,o,_e)}return;default:if(Xt(n)){for(var $t in a)ge=a[$t],a.hasOwnProperty($t)&&ge!==void 0&&!o.hasOwnProperty($t)&&rh(t,n,$t,void 0,o,ge);for(Se in o)ge=o[Se],_e=a[Se],!o.hasOwnProperty(Se)||ge===_e||ge===void 0&&_e===void 0||rh(t,n,Se,ge,o,_e);return}}for(var ae in a)ge=a[ae],a.hasOwnProperty(ae)&&ge!=null&&!o.hasOwnProperty(ae)&&Jt(t,n,ae,null,o,ge);for(Ae in o)ge=o[Ae],_e=a[Ae],!o.hasOwnProperty(Ae)||ge===_e||ge==null&&_e==null||Jt(t,n,Ae,ge,o,_e)}function Og(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Ky(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],h=u.transferSize,y=u.initiatorType,D=u.duration;if(h&&D&&Og(y)){for(y=0,D=u.responseEnd,o+=1;o<a.length;o++){var Y=a[o],he=Y.startTime;if(he>D)break;var Se=Y.transferSize,Ae=Y.initiatorType;Se&&Og(Ae)&&(Y=Y.responseEnd,y+=Se*(Y<D?1:(D-he)/(Y-he)))}if(--o,n+=8*(h+y)/(u.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var oh=null,lh=null;function cc(t){return t.nodeType===9?t:t.ownerDocument}function Pg(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Ig(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function ch(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var uh=null;function Qy(){var t=window.event;return t&&t.type==="popstate"?t===uh?!1:(uh=t,!0):(uh=null,!1)}var zg=typeof setTimeout=="function"?setTimeout:void 0,Jy=typeof clearTimeout=="function"?clearTimeout:void 0,Bg=typeof Promise=="function"?Promise:void 0,$y=typeof queueMicrotask=="function"?queueMicrotask:typeof Bg<"u"?function(t){return Bg.resolve(null).then(t).catch(eM)}:zg;function eM(t){setTimeout(function(){throw t})}function rs(t){return t==="head"}function Fg(t,n){var a=n,o=0;do{var u=a.nextSibling;if(t.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){t.removeChild(u),Nr(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Ho(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Ho(a);for(var h=a.firstChild;h;){var y=h.nextSibling,D=h.nodeName;h[ii]||D==="SCRIPT"||D==="STYLE"||D==="LINK"&&h.rel.toLowerCase()==="stylesheet"||a.removeChild(h),h=y}}else a==="body"&&Ho(t.ownerDocument.body);a=u}while(a);Nr(n)}function Gg(t,n){var a=t;t=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=o}while(a)}function fh(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":fh(a),wi(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function tM(t,n,a,o){for(;t.nodeType===1;){var u=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[ii])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(h=t.getAttribute("rel"),h==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(h!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(h=t.getAttribute("src"),(h!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&h&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var h=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===h)return t}else return t;if(t=Oi(t.nextSibling),t===null)break}return null}function nM(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=Oi(t.nextSibling),t===null))return null;return t}function Hg(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Oi(t.nextSibling),t===null))return null;return t}function hh(t){return t.data==="$?"||t.data==="$~"}function dh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function iM(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function Oi(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var ph=null;function Vg(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return Oi(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function kg(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function Xg(t,n,a){switch(n=cc(a),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function Ho(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);wi(t)}var Pi=new Map,Wg=new Set;function uc(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Ca=U.d;U.d={f:aM,r:sM,D:rM,C:oM,L:lM,m:cM,X:fM,S:uM,M:hM};function aM(){var t=Ca.f(),n=tc();return t||n}function sM(t){var n=ha(t);n!==null&&n.tag===5&&n.type==="form"?l0(n):Ca.r(t)}var Rr=typeof document>"u"?null:document;function qg(t,n,a){var o=Rr;if(o&&typeof n=="string"&&n){var u=qt(n);u='link[rel="'+t+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),Wg.has(u)||(Wg.add(u),t={rel:t,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),Hn(n,"link",t),Sn(n),o.head.appendChild(n)))}}function rM(t){Ca.D(t),qg("dns-prefetch",t,null)}function oM(t,n){Ca.C(t,n),qg("preconnect",t,n)}function lM(t,n,a){Ca.L(t,n,a);var o=Rr;if(o&&t&&n){var u='link[rel="preload"][as="'+qt(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+qt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+qt(a.imageSizes)+'"]')):u+='[href="'+qt(t)+'"]';var h=u;switch(n){case"style":h=Cr(t);break;case"script":h=Dr(t)}Pi.has(h)||(t=_({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),Pi.set(h,t),o.querySelector(u)!==null||n==="style"&&o.querySelector(Vo(h))||n==="script"&&o.querySelector(ko(h))||(n=o.createElement("link"),Hn(n,"link",t),Sn(n),o.head.appendChild(n)))}}function cM(t,n){Ca.m(t,n);var a=Rr;if(a&&t){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+qt(o)+'"][href="'+qt(t)+'"]',h=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=Dr(t)}if(!Pi.has(h)&&(t=_({rel:"modulepreload",href:t},n),Pi.set(h,t),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(ko(h)))return}o=a.createElement("link"),Hn(o,"link",t),Sn(o),a.head.appendChild(o)}}}function uM(t,n,a){Ca.S(t,n,a);var o=Rr;if(o&&t){var u=Ha(o).hoistableStyles,h=Cr(t);n=n||"default";var y=u.get(h);if(!y){var D={loading:0,preload:null};if(y=o.querySelector(Vo(h)))D.loading=5;else{t=_({rel:"stylesheet",href:t,"data-precedence":n},a),(a=Pi.get(h))&&mh(t,a);var Y=y=o.createElement("link");Sn(Y),Hn(Y,"link",t),Y._p=new Promise(function(he,Se){Y.onload=he,Y.onerror=Se}),Y.addEventListener("load",function(){D.loading|=1}),Y.addEventListener("error",function(){D.loading|=2}),D.loading|=4,fc(y,n,o)}y={type:"stylesheet",instance:y,count:1,state:D},u.set(h,y)}}}function fM(t,n){Ca.X(t,n);var a=Rr;if(a&&t){var o=Ha(a).hoistableScripts,u=Dr(t),h=o.get(u);h||(h=a.querySelector(ko(u)),h||(t=_({src:t,async:!0},n),(n=Pi.get(u))&&gh(t,n),h=a.createElement("script"),Sn(h),Hn(h,"link",t),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function hM(t,n){Ca.M(t,n);var a=Rr;if(a&&t){var o=Ha(a).hoistableScripts,u=Dr(t),h=o.get(u);h||(h=a.querySelector(ko(u)),h||(t=_({src:t,async:!0,type:"module"},n),(n=Pi.get(u))&&gh(t,n),h=a.createElement("script"),Sn(h),Hn(h,"link",t),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function Yg(t,n,a,o){var u=(u=$.current)?uc(u):null;if(!u)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=Cr(a.href),a=Ha(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=Cr(a.href);var h=Ha(u).hoistableStyles,y=h.get(t);if(y||(u=u.ownerDocument||u,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(t,y),(h=u.querySelector(Vo(t)))&&!h._p&&(y.instance=h,y.state.loading=5),Pi.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Pi.set(t,a),h||dM(u,t,a,y.state))),n&&o===null)throw Error(s(528,""));return y}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=Dr(a),a=Ha(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function Cr(t){return'href="'+qt(t)+'"'}function Vo(t){return'link[rel="stylesheet"]['+t+"]"}function Zg(t){return _({},t,{"data-precedence":t.precedence,precedence:null})}function dM(t,n,a,o){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=t.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),Hn(n,"link",a),Sn(n),t.head.appendChild(n))}function Dr(t){return'[src="'+qt(t)+'"]'}function ko(t){return"script[async]"+t}function jg(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=t.querySelector('style[data-href~="'+qt(a.href)+'"]');if(o)return n.instance=o,Sn(o),o;var u=_({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),Sn(o),Hn(o,"style",u),fc(o,a.precedence,t),n.instance=o;case"stylesheet":u=Cr(a.href);var h=t.querySelector(Vo(u));if(h)return n.state.loading|=4,n.instance=h,Sn(h),h;o=Zg(a),(u=Pi.get(u))&&mh(o,u),h=(t.ownerDocument||t).createElement("link"),Sn(h);var y=h;return y._p=new Promise(function(D,Y){y.onload=D,y.onerror=Y}),Hn(h,"link",o),n.state.loading|=4,fc(h,a.precedence,t),n.instance=h;case"script":return h=Dr(a.src),(u=t.querySelector(ko(h)))?(n.instance=u,Sn(u),u):(o=a,(u=Pi.get(h))&&(o=_({},a),gh(o,u)),t=t.ownerDocument||t,u=t.createElement("script"),Sn(u),Hn(u,"link",o),t.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,fc(o,a.precedence,t));return n.instance}function fc(t,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,h=u,y=0;y<o.length;y++){var D=o[y];if(D.dataset.precedence===n)h=D;else if(h!==u)break}h?h.parentNode.insertBefore(t,h.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function mh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function gh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var hc=null;function Kg(t,n,a){if(hc===null){var o=new Map,u=hc=new Map;u.set(a,o)}else u=hc,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(t))return o;for(o.set(t,null),a=a.getElementsByTagName(t),u=0;u<a.length;u++){var h=a[u];if(!(h[ii]||h[Vt]||t==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var y=h.getAttribute(n)||"";y=t+y;var D=o.get(y);D?D.push(h):o.set(y,[h])}}return o}function Qg(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function pM(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(t=n.disabled,typeof n.precedence=="string"&&t==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Jg(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function mM(t,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=Cr(o.href),h=n.querySelector(Vo(u));if(h){n=h._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=dc.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=h,Sn(h);return}h=n.ownerDocument||n,o=Zg(o),(u=Pi.get(u))&&mh(o,u),h=h.createElement("link"),Sn(h);var y=h;y._p=new Promise(function(D,Y){y.onload=D,y.onerror=Y}),Hn(h,"link",o),a.instance=h}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=dc.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var vh=0;function gM(t,n){return t.stylesheets&&t.count===0&&mc(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var o=setTimeout(function(){if(t.stylesheets&&mc(t,t.stylesheets),t.unsuspend){var h=t.unsuspend;t.unsuspend=null,h()}},6e4+n);0<t.imgBytes&&vh===0&&(vh=62500*Ky());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&mc(t,t.stylesheets),t.unsuspend)){var h=t.unsuspend;t.unsuspend=null,h()}},(t.imgBytes>vh?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function dc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)mc(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var pc=null;function mc(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,pc=new Map,n.forEach(vM,t),pc=null,dc.call(t))}function vM(t,n){if(!(n.state.loading&4)){var a=pc.get(t);if(a)var o=a.get(null);else{a=new Map,pc.set(t,a);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<u.length;h++){var y=u[h];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(a.set(y.dataset.precedence,y),o=y)}o&&a.set(null,o)}u=n.instance,y=u.getAttribute("data-precedence"),h=a.get(y)||o,h===o&&a.set(null,u),a.set(y,u),this.count++,o=dc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),h?h.parentNode.insertBefore(u,h.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),n.state.loading|=4}}var Xo={$$typeof:z,Provider:null,Consumer:null,_currentValue:W,_currentValue2:W,_threadCount:0};function _M(t,n,a,o,u,h,y,D,Y){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ze(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ze(0),this.hiddenUpdates=Ze(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=h,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=Y,this.incompleteTransitions=new Map}function $g(t,n,a,o,u,h,y,D,Y,he,Se,Ae){return t=new _M(t,n,a,y,Y,he,Se,Ae,D),n=1,h===!0&&(n|=24),h=mi(3,null,null,n),t.current=h,h.stateNode=t,n=ju(),n.refCount++,t.pooledCache=n,n.refCount++,h.memoizedState={element:o,isDehydrated:a,cache:n},$u(h),t}function ev(t){return t?(t=or,t):or}function tv(t,n,a,o,u,h){u=ev(u),o.context===null?o.context=u:o.pendingContext=u,o=ja(n),o.payload={element:a},h=h===void 0?null:h,h!==null&&(o.callback=h),a=Ka(t,o,n),a!==null&&(ci(a,t,n),So(a,t,n))}function nv(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function _h(t,n){nv(t,n),(t=t.alternate)&&nv(t,n)}function iv(t){if(t.tag===13||t.tag===31){var n=ws(t,67108864);n!==null&&ci(n,t,67108864),_h(t,67108864)}}function av(t){if(t.tag===13||t.tag===31){var n=yi();n=er(n);var a=ws(t,n);a!==null&&ci(a,t,n),_h(t,n)}}var gc=!0;function xM(t,n,a,o){var u=P.T;P.T=null;var h=U.p;try{U.p=2,xh(t,n,a,o)}finally{U.p=h,P.T=u}}function yM(t,n,a,o){var u=P.T;P.T=null;var h=U.p;try{U.p=8,xh(t,n,a,o)}finally{U.p=h,P.T=u}}function xh(t,n,a,o){if(gc){var u=yh(o);if(u===null)sh(t,n,o,vc,a),rv(t,o);else if(SM(u,t,n,a,o))o.stopPropagation();else if(rv(t,o),n&4&&-1<MM.indexOf(t)){for(;u!==null;){var h=ha(u);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var y=Ue(h.pendingLanes);if(y!==0){var D=h;for(D.pendingLanes|=2,D.entangledLanes|=2;y;){var Y=1<<31-ze(y);D.entanglements[1]|=Y,y&=~Y}$i(h),(kt&6)===0&&($l=Ot()+500,Bo(0))}}break;case 31:case 13:D=ws(h,2),D!==null&&ci(D,h,2),tc(),_h(h,2)}if(h=yh(o),h===null&&sh(t,n,o,vc,a),h===u)break;u=h}u!==null&&o.stopPropagation()}else sh(t,n,o,null,a)}}function yh(t){return t=Mu(t),Mh(t)}var vc=null;function Mh(t){if(vc=null,t=fa(t),t!==null){var n=c(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=f(n),t!==null)return t;t=null}else if(a===31){if(t=p(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return vc=t,null}function sv(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(At()){case F:return 2;case E:return 8;case ie:case fe:return 32;case xe:return 268435456;default:return 32}default:return 32}}var Sh=!1,os=null,ls=null,cs=null,Wo=new Map,qo=new Map,us=[],MM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function rv(t,n){switch(t){case"focusin":case"focusout":os=null;break;case"dragenter":case"dragleave":ls=null;break;case"mouseover":case"mouseout":cs=null;break;case"pointerover":case"pointerout":Wo.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":qo.delete(n.pointerId)}}function Yo(t,n,a,o,u,h){return t===null||t.nativeEvent!==h?(t={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:h,targetContainers:[u]},n!==null&&(n=ha(n),n!==null&&iv(n)),t):(t.eventSystemFlags|=o,n=t.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),t)}function SM(t,n,a,o,u){switch(n){case"focusin":return os=Yo(os,t,n,a,o,u),!0;case"dragenter":return ls=Yo(ls,t,n,a,o,u),!0;case"mouseover":return cs=Yo(cs,t,n,a,o,u),!0;case"pointerover":var h=u.pointerId;return Wo.set(h,Yo(Wo.get(h)||null,t,n,a,o,u)),!0;case"gotpointercapture":return h=u.pointerId,qo.set(h,Yo(qo.get(h)||null,t,n,a,o,u)),!0}return!1}function ov(t){var n=fa(t.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=f(a),n!==null){t.blockedOn=n,Re(t.priority,function(){av(a)});return}}else if(n===31){if(n=p(a),n!==null){t.blockedOn=n,Re(t.priority,function(){av(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function _c(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=yh(t.nativeEvent);if(a===null){a=t.nativeEvent;var o=new a.constructor(a.type,a);yu=o,a.target.dispatchEvent(o),yu=null}else return n=ha(a),n!==null&&iv(n),t.blockedOn=a,!1;n.shift()}return!0}function lv(t,n,a){_c(t)&&a.delete(n)}function bM(){Sh=!1,os!==null&&_c(os)&&(os=null),ls!==null&&_c(ls)&&(ls=null),cs!==null&&_c(cs)&&(cs=null),Wo.forEach(lv),qo.forEach(lv)}function xc(t,n){t.blockedOn===n&&(t.blockedOn=null,Sh||(Sh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,bM)))}var yc=null;function cv(t){yc!==t&&(yc=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){yc===t&&(yc=null);for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1],u=t[n+2];if(typeof o!="function"){if(Mh(o||a)===null)continue;break}var h=ha(a);h!==null&&(t.splice(n,3),n-=3,yf(h,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function Nr(t){function n(Y){return xc(Y,t)}os!==null&&xc(os,t),ls!==null&&xc(ls,t),cs!==null&&xc(cs,t),Wo.forEach(n),qo.forEach(n);for(var a=0;a<us.length;a++){var o=us[a];o.blockedOn===t&&(o.blockedOn=null)}for(;0<us.length&&(a=us[0],a.blockedOn===null);)ov(a),a.blockedOn===null&&us.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],h=a[o+1],y=u[dn]||null;if(typeof h=="function")y||cv(a);else if(y){var D=null;if(h&&h.hasAttribute("formAction")){if(u=h,y=h[dn]||null)D=y.formAction;else if(Mh(u)!==null)continue}else D=y.action;typeof D=="function"?a[o+1]=D:(a.splice(o,3),o-=3),cv(a)}}}function uv(){function t(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(y){return u=y})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function bh(t){this._internalRoot=t}Mc.prototype.render=bh.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=yi();tv(a,o,t,n,null,null)},Mc.prototype.unmount=bh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;tv(t.current,2,null,t,null,null),tc(),n[Mn]=null}};function Mc(t){this._internalRoot=t}Mc.prototype.unstable_scheduleHydration=function(t){if(t){var n=yt();t={blockedOn:null,target:t,priority:n};for(var a=0;a<us.length&&n!==0&&n<us[a].priority;a++);us.splice(a,0,t),a===0&&ov(t)}};var fv=e.version;if(fv!=="19.2.8")throw Error(s(527,fv,"19.2.8"));U.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=d(n),t=t!==null?v(t):null,t=t===null?null:t.stateNode,t};var EM={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:P,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Sc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Sc.isDisabled&&Sc.supportsFiber)try{q=Sc.inject(EM),oe=Sc}catch{}}return jo.createRoot=function(t,n){if(!l(t))throw Error(s(299));var a=!1,o="",u=_0,h=x0,y=y0;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(h=n.onCaughtError),n.onRecoverableError!==void 0&&(y=n.onRecoverableError)),n=$g(t,1,!1,null,null,a,o,null,u,h,y,uv),t[Mn]=n.current,ah(t),new bh(n)},jo.hydrateRoot=function(t,n,a){if(!l(t))throw Error(s(299));var o=!1,u="",h=_0,y=x0,D=y0,Y=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(h=a.onUncaughtError),a.onCaughtError!==void 0&&(y=a.onCaughtError),a.onRecoverableError!==void 0&&(D=a.onRecoverableError),a.formState!==void 0&&(Y=a.formState)),n=$g(t,1,!0,n,a??null,o,u,Y,h,y,D,uv),n.context=ev(null),a=n.current,o=yi(),o=er(o),u=ja(o),u.callback=null,Ka(a,u,o),a=o,n.current.lanes=a,We(n,a),$i(n),t[Mn]=n.current,ah(t),new Mc(n)},jo.version="19.2.8",jo}var Mv;function IM(){if(Mv)return Ah.exports;Mv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Ah.exports=PM(),Ah.exports}var zM=IM();const np="185",BM=0,Sv=1,FM=2,$c=1,C_=2,il=3,ys=0,fi=1,aa=2,za=0,jr=1,Zr=2,bv=3,Ev=4,GM=5,Ws=100,HM=101,VM=102,kM=103,XM=104,WM=200,qM=201,YM=202,ZM=203,ud=204,fd=205,jM=206,KM=207,QM=208,JM=209,$M=210,eS=211,tS=212,nS=213,iS=214,hd=0,dd=1,pd=2,$r=3,md=4,gd=5,vd=6,_d=7,D_=0,aS=1,sS=2,oa=0,N_=1,U_=2,L_=3,ip=4,O_=5,P_=6,I_=7,z_=300,Ks=301,eo=302,Dh=303,Nh=304,pu=306,xd=1e3,Pa=1001,yd=1002,Vn=1003,rS=1004,bc=1005,Qn=1006,Uh=1007,Ys=1008,Ti=1009,B_=1010,F_=1011,ol=1012,ap=1013,ca=1014,sa=1015,Fa=1016,sp=1017,rp=1018,ll=1020,G_=35902,H_=35899,V_=1021,k_=1022,Zi=1023,Ga=1026,Zs=1027,X_=1028,op=1029,Qs=1030,lp=1031,cp=1033,eu=33776,tu=33777,nu=33778,iu=33779,Md=35840,Sd=35841,bd=35842,Ed=35843,Td=36196,Ad=37492,wd=37496,Rd=37488,Cd=37489,ru=37490,Dd=37491,Nd=37808,Ud=37809,Ld=37810,Od=37811,Pd=37812,Id=37813,zd=37814,Bd=37815,Fd=37816,Gd=37817,Hd=37818,Vd=37819,kd=37820,Xd=37821,Wd=36492,qd=36494,Yd=36495,Zd=36283,jd=36284,ou=36285,Kd=36286,oS=3200,Qd=0,lS=1,_s="",zi="srgb",lu="srgb-linear",cu="linear",Kt="srgb",Ur=7680,Tv=519,cS=512,uS=513,fS=514,up=515,hS=516,dS=517,fp=518,pS=519,Av=35044,wv="300 es",ra=2e3,cl=2001;function mS(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function uu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function gS(){const r=uu("canvas");return r.style.display="block",r}const Rv={};function Cv(...r){const e="THREE."+r.shift();console.log(e,...r)}function W_(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const i=r[1];i&&i.isStackTrace?r[0]+=" "+i.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function ft(...r){r=W_(r);const e="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.warn(i.getError(e)):console.warn(e,...r)}}function It(...r){r=W_(r);const e="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.error(i.getError(e)):console.error(e,...r)}}function Kr(...r){const e=r.join(" ");e in Rv||(Rv[e]=!0,ft(...r))}function vS(r,e,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}const _S={[hd]:dd,[pd]:vd,[md]:_d,[$r]:gd,[dd]:hd,[vd]:pd,[_d]:md,[gd]:$r};class Js{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){const s=this._listeners;if(s===void 0)return;const l=s[e];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const s=i[e.type];if(s!==void 0){e.target=this;const l=s.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,e);e.target=null}}}const jn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Dv=1234567;const Qr=Math.PI/180,ul=180/Math.PI;function io(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(jn[r&255]+jn[r>>8&255]+jn[r>>16&255]+jn[r>>24&255]+"-"+jn[e&255]+jn[e>>8&255]+"-"+jn[e>>16&15|64]+jn[e>>24&255]+"-"+jn[i&63|128]+jn[i>>8&255]+"-"+jn[i>>16&255]+jn[i>>24&255]+jn[s&255]+jn[s>>8&255]+jn[s>>16&255]+jn[s>>24&255]).toLowerCase()}function Et(r,e,i){return Math.max(e,Math.min(i,r))}function hp(r,e){return(r%e+e)%e}function xS(r,e,i,s,l){return s+(r-e)*(l-s)/(i-e)}function yS(r,e,i){return r!==e?(i-r)/(e-r):0}function sl(r,e,i){return(1-i)*r+i*e}function MS(r,e,i,s){return sl(r,e,1-Math.exp(-i*s))}function SS(r,e=1){return e-Math.abs(hp(r,e*2)-e)}function bS(r,e,i){return r<=e?0:r>=i?1:(r=(r-e)/(i-e),r*r*(3-2*r))}function ES(r,e,i){return r<=e?0:r>=i?1:(r=(r-e)/(i-e),r*r*r*(r*(r*6-15)+10))}function TS(r,e){return r+Math.floor(Math.random()*(e-r+1))}function AS(r,e){return r+Math.random()*(e-r)}function wS(r){return r*(.5-Math.random())}function RS(r){r!==void 0&&(Dv=r);let e=Dv+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function CS(r){return r*Qr}function DS(r){return r*ul}function NS(r){return(r&r-1)===0&&r!==0}function US(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function LS(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function OS(r,e,i,s,l){const c=Math.cos,f=Math.sin,p=c(i/2),m=f(i/2),d=c((e+s)/2),v=f((e+s)/2),_=c((e-s)/2),g=f((e-s)/2),b=c((s-e)/2),T=f((s-e)/2);switch(l){case"XYX":r.set(p*v,m*_,m*g,p*d);break;case"YZY":r.set(m*g,p*v,m*_,p*d);break;case"ZXZ":r.set(m*_,m*g,p*v,p*d);break;case"XZX":r.set(p*v,m*T,m*b,p*d);break;case"YXY":r.set(m*b,p*v,m*T,p*d);break;case"ZYZ":r.set(m*T,m*b,p*v,p*d);break;default:ft("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+l)}}function qr(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ei(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const PS={DEG2RAD:Qr,RAD2DEG:ul,generateUUID:io,clamp:Et,euclideanModulo:hp,mapLinear:xS,inverseLerp:yS,lerp:sl,damp:MS,pingpong:SS,smoothstep:bS,smootherstep:ES,randInt:TS,randFloat:AS,randFloatSpread:wS,seededRandom:RS,degToRad:CS,radToDeg:DS,isPowerOfTwo:NS,ceilPowerOfTwo:US,floorPowerOfTwo:LS,setQuaternionFromProperEuler:OS,normalize:ei,denormalize:qr},Cp=class Cp{constructor(e=0,i=0){this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,l=e.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=Et(this.x,e.x,i.x),this.y=Et(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=Et(this.x,e,i),this.y=Et(this.y,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Et(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Et(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-e.x,f=this.y-e.y;return this.x=c*s-f*l+e.x,this.y=c*l+f*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Cp.prototype.isVector2=!0;let xt=Cp;class ao{constructor(e=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=l}static slerpFlat(e,i,s,l,c,f,p){let m=s[l+0],d=s[l+1],v=s[l+2],_=s[l+3],g=c[f+0],b=c[f+1],T=c[f+2],C=c[f+3];if(_!==C||m!==g||d!==b||v!==T){let M=m*g+d*b+v*T+_*C;M<0&&(g=-g,b=-b,T=-T,C=-C,M=-M);let x=1-p;if(M<.9995){const N=Math.acos(M),z=Math.sin(N);x=Math.sin(x*N)/z,p=Math.sin(p*N)/z,m=m*x+g*p,d=d*x+b*p,v=v*x+T*p,_=_*x+C*p}else{m=m*x+g*p,d=d*x+b*p,v=v*x+T*p,_=_*x+C*p;const N=1/Math.sqrt(m*m+d*d+v*v+_*_);m*=N,d*=N,v*=N,_*=N}}e[i]=m,e[i+1]=d,e[i+2]=v,e[i+3]=_}static multiplyQuaternionsFlat(e,i,s,l,c,f){const p=s[l],m=s[l+1],d=s[l+2],v=s[l+3],_=c[f],g=c[f+1],b=c[f+2],T=c[f+3];return e[i]=p*T+v*_+m*b-d*g,e[i+1]=m*T+v*g+d*_-p*b,e[i+2]=d*T+v*b+p*g-m*_,e[i+3]=v*T-p*_-m*g-d*b,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,l){return this._x=e,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,l=e._y,c=e._z,f=e._order,p=Math.cos,m=Math.sin,d=p(s/2),v=p(l/2),_=p(c/2),g=m(s/2),b=m(l/2),T=m(c/2);switch(f){case"XYZ":this._x=g*v*_+d*b*T,this._y=d*b*_-g*v*T,this._z=d*v*T+g*b*_,this._w=d*v*_-g*b*T;break;case"YXZ":this._x=g*v*_+d*b*T,this._y=d*b*_-g*v*T,this._z=d*v*T-g*b*_,this._w=d*v*_+g*b*T;break;case"ZXY":this._x=g*v*_-d*b*T,this._y=d*b*_+g*v*T,this._z=d*v*T+g*b*_,this._w=d*v*_-g*b*T;break;case"ZYX":this._x=g*v*_-d*b*T,this._y=d*b*_+g*v*T,this._z=d*v*T-g*b*_,this._w=d*v*_+g*b*T;break;case"YZX":this._x=g*v*_+d*b*T,this._y=d*b*_+g*v*T,this._z=d*v*T-g*b*_,this._w=d*v*_-g*b*T;break;case"XZY":this._x=g*v*_-d*b*T,this._y=d*b*_-g*v*T,this._z=d*v*T+g*b*_,this._w=d*v*_+g*b*T;break;default:ft("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,l=Math.sin(s);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],l=i[4],c=i[8],f=i[1],p=i[5],m=i[9],d=i[2],v=i[6],_=i[10],g=s+p+_;if(g>0){const b=.5/Math.sqrt(g+1);this._w=.25/b,this._x=(v-m)*b,this._y=(c-d)*b,this._z=(f-l)*b}else if(s>p&&s>_){const b=2*Math.sqrt(1+s-p-_);this._w=(v-m)/b,this._x=.25*b,this._y=(l+f)/b,this._z=(c+d)/b}else if(p>_){const b=2*Math.sqrt(1+p-s-_);this._w=(c-d)/b,this._x=(l+f)/b,this._y=.25*b,this._z=(m+v)/b}else{const b=2*Math.sqrt(1+_-s-p);this._w=(f-l)/b,this._x=(c+d)/b,this._y=(m+v)/b,this._z=.25*b}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Et(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,l=e._y,c=e._z,f=e._w,p=i._x,m=i._y,d=i._z,v=i._w;return this._x=s*v+f*p+l*d-c*m,this._y=l*v+f*m+c*p-s*d,this._z=c*v+f*d+s*m-l*p,this._w=f*v-s*p-l*m-c*d,this._onChangeCallback(),this}slerp(e,i){let s=e._x,l=e._y,c=e._z,f=e._w,p=this.dot(e);p<0&&(s=-s,l=-l,c=-c,f=-f,p=-p);let m=1-i;if(p<.9995){const d=Math.acos(p),v=Math.sin(d);m=Math.sin(m*d)/v,i=Math.sin(i*d)/v,this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this._onChangeCallback()}else this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this.normalize();return this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(e),l*Math.cos(e),c*Math.sin(i),c*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Dp=class Dp{constructor(e=0,i=0,s=0){this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(Nv.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(Nv.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=e.elements,f=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*f,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*f,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*f,this}applyQuaternion(e){const i=this.x,s=this.y,l=this.z,c=e.x,f=e.y,p=e.z,m=e.w,d=2*(f*l-p*s),v=2*(p*i-c*l),_=2*(c*s-f*i);return this.x=i+m*d+f*_-p*v,this.y=s+m*v+p*d-c*_,this.z=l+m*_+c*v-f*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=Et(this.x,e.x,i.x),this.y=Et(this.y,e.y,i.y),this.z=Et(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=Et(this.x,e,i),this.y=Et(this.y,e,i),this.z=Et(this.z,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Et(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,l=e.y,c=e.z,f=i.x,p=i.y,m=i.z;return this.x=l*m-c*p,this.y=c*f-s*m,this.z=s*p-l*f,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return Lh.copy(this).projectOnVector(e),this.sub(Lh)}reflect(e){return this.sub(Lh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Et(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,l=this.z-e.z;return i*i+s*s+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const l=Math.sin(i)*e;return this.x=l*Math.sin(s),this.y=Math.cos(i)*e,this.z=l*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Dp.prototype.isVector3=!0;let ne=Dp;const Lh=new ne,Nv=new ao,Np=class Np{constructor(e,i,s,l,c,f,p,m,d){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,f,p,m,d)}set(e,i,s,l,c,f,p,m,d){const v=this.elements;return v[0]=e,v[1]=l,v[2]=p,v[3]=i,v[4]=c,v[5]=m,v[6]=s,v[7]=f,v[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,f=s[0],p=s[3],m=s[6],d=s[1],v=s[4],_=s[7],g=s[2],b=s[5],T=s[8],C=l[0],M=l[3],x=l[6],N=l[1],z=l[4],w=l[7],G=l[2],L=l[5],I=l[8];return c[0]=f*C+p*N+m*G,c[3]=f*M+p*z+m*L,c[6]=f*x+p*w+m*I,c[1]=d*C+v*N+_*G,c[4]=d*M+v*z+_*L,c[7]=d*x+v*w+_*I,c[2]=g*C+b*N+T*G,c[5]=g*M+b*z+T*L,c[8]=g*x+b*w+T*I,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],p=e[5],m=e[6],d=e[7],v=e[8];return i*f*v-i*p*d-s*c*v+s*p*m+l*c*d-l*f*m}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],p=e[5],m=e[6],d=e[7],v=e[8],_=v*f-p*d,g=p*m-v*c,b=d*c-f*m,T=i*_+s*g+l*b;if(T===0)return this.set(0,0,0,0,0,0,0,0,0);const C=1/T;return e[0]=_*C,e[1]=(l*d-v*s)*C,e[2]=(p*s-l*f)*C,e[3]=g*C,e[4]=(v*i-l*m)*C,e[5]=(l*c-p*i)*C,e[6]=b*C,e[7]=(s*m-d*i)*C,e[8]=(f*i-s*c)*C,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,l,c,f,p){const m=Math.cos(c),d=Math.sin(c);return this.set(s*m,s*d,-s*(m*f+d*p)+f+e,-l*d,l*m,-l*(-d*f+m*p)+p+i,0,0,1),this}scale(e,i){return Kr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Oh.makeScale(e,i)),this}rotate(e){return Kr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Oh.makeRotation(-e)),this}translate(e,i){return Kr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Oh.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Np.prototype.isMatrix3=!0;let pt=Np;const Oh=new pt,Uv=new pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Lv=new pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function IS(){const r={enabled:!0,workingColorSpace:lu,spaces:{},convert:function(l,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===Kt&&(l.r=Ba(l.r),l.g=Ba(l.g),l.b=Ba(l.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===Kt&&(l.r=Jr(l.r),l.g=Jr(l.g),l.b=Jr(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===_s?cu:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,f){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return Kr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return Kr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[lu]:{primaries:e,whitePoint:s,transfer:cu,toXYZ:Uv,fromXYZ:Lv,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:zi},outputColorSpaceConfig:{drawingBufferColorSpace:zi}},[zi]:{primaries:e,whitePoint:s,transfer:Kt,toXYZ:Uv,fromXYZ:Lv,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:zi}}}),r}const Dt=IS();function Ba(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Jr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Lr;class zS{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{Lr===void 0&&(Lr=uu("canvas")),Lr.width=e.width,Lr.height=e.height;const l=Lr.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),s=Lr}return s.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=uu("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const l=s.getImageData(0,0,e.width,e.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=Ba(c[f]/255)*255;return s.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(Ba(i[s]/255)*255):i[s]=Ba(i[s]);return{data:i,width:e.width,height:e.height}}else return ft("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let BS=0;class dp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:BS++}),this.uuid=io(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?e.set(i.displayWidth,i.displayHeight,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,p=l.length;f<p;f++)l[f].isDataTexture?c.push(Ph(l[f].image)):c.push(Ph(l[f]))}else c=Ph(l);s.url=c}return i||(e.images[this.uuid]=s),s}}function Ph(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?zS.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(ft("Texture: Unable to serialize Texture."),{})}let FS=0;const Ih=new ne;class Jn extends Js{constructor(e=Jn.DEFAULT_IMAGE,i=Jn.DEFAULT_MAPPING,s=Pa,l=Pa,c=Qn,f=Ys,p=Zi,m=Ti,d=Jn.DEFAULT_ANISOTROPY,v=_s){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:FS++}),this.uuid=io(),this.name="",this.source=new dp(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=d,this.format=p,this.internalFormat=null,this.type=m,this.offset=new xt(0,0),this.repeat=new xt(1,1),this.center=new xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ih).x}get height(){return this.source.getSize(Ih).y}get depth(){return this.source.getSize(Ih).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const s=e[i];if(s===void 0){ft(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ft(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==z_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case xd:e.x=e.x-Math.floor(e.x);break;case Pa:e.x=e.x<0?0:1;break;case yd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case xd:e.y=e.y-Math.floor(e.y);break;case Pa:e.y=e.y<0?0:1;break;case yd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Jn.DEFAULT_IMAGE=null;Jn.DEFAULT_MAPPING=z_;Jn.DEFAULT_ANISOTROPY=1;const Up=class Up{constructor(e=0,i=0,s=0,l=1){this.x=e,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,l){return this.x=e,this.y=i,this.z=s,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=this.w,f=e.elements;return this.x=f[0]*i+f[4]*s+f[8]*l+f[12]*c,this.y=f[1]*i+f[5]*s+f[9]*l+f[13]*c,this.z=f[2]*i+f[6]*s+f[10]*l+f[14]*c,this.w=f[3]*i+f[7]*s+f[11]*l+f[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,l,c;const m=e.elements,d=m[0],v=m[4],_=m[8],g=m[1],b=m[5],T=m[9],C=m[2],M=m[6],x=m[10];if(Math.abs(v-g)<.01&&Math.abs(_-C)<.01&&Math.abs(T-M)<.01){if(Math.abs(v+g)<.1&&Math.abs(_+C)<.1&&Math.abs(T+M)<.1&&Math.abs(d+b+x-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const z=(d+1)/2,w=(b+1)/2,G=(x+1)/2,L=(v+g)/4,I=(_+C)/4,A=(T+M)/4;return z>w&&z>G?z<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(z),l=L/s,c=I/s):w>G?w<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(w),s=L/l,c=A/l):G<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(G),s=I/c,l=A/c),this.set(s,l,c,i),this}let N=Math.sqrt((M-T)*(M-T)+(_-C)*(_-C)+(g-v)*(g-v));return Math.abs(N)<.001&&(N=1),this.x=(M-T)/N,this.y=(_-C)/N,this.z=(g-v)/N,this.w=Math.acos((d+b+x-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=Et(this.x,e.x,i.x),this.y=Et(this.y,e.y,i.y),this.z=Et(this.z,e.z,i.z),this.w=Et(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=Et(this.x,e,i),this.y=Et(this.y,e,i),this.z=Et(this.z,e,i),this.w=Et(this.w,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Et(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Up.prototype.isVector4=!0;let hn=Up;class GS extends Js{constructor(e=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},s),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=s.depth,this.scissor=new hn(0,0,e,i),this.scissorTest=!1,this.viewport=new hn(0,0,e,i),this.textures=[];const l={width:e,height:i,depth:s.depth},c=new Jn(l),f=s.count;for(let p=0;p<f;p++)this.textures[p]=c.clone(),this.textures[p].isRenderTargetTexture=!0,this.textures[p].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview,this.useArrayDepthTexture=s.useArrayDepthTexture}_setTextureOptions(e={}){const i={minFilter:Qn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new dp(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class la extends GS{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class q_ extends Jn{constructor(e=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=Pa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class HS extends Jn{constructor(e=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=Pa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const du=class du{constructor(e,i,s,l,c,f,p,m,d,v,_,g,b,T,C,M){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,f,p,m,d,v,_,g,b,T,C,M)}set(e,i,s,l,c,f,p,m,d,v,_,g,b,T,C,M){const x=this.elements;return x[0]=e,x[4]=i,x[8]=s,x[12]=l,x[1]=c,x[5]=f,x[9]=p,x[13]=m,x[2]=d,x[6]=v,x[10]=_,x[14]=g,x[3]=b,x[7]=T,x[11]=C,x[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new du().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return this.determinantAffine()===0?(e.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const i=this.elements,s=e.elements,l=1/Or.setFromMatrixColumn(e,0).length(),c=1/Or.setFromMatrixColumn(e,1).length(),f=1/Or.setFromMatrixColumn(e,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*f,i[9]=s[9]*f,i[10]=s[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,l=e.y,c=e.z,f=Math.cos(s),p=Math.sin(s),m=Math.cos(l),d=Math.sin(l),v=Math.cos(c),_=Math.sin(c);if(e.order==="XYZ"){const g=f*v,b=f*_,T=p*v,C=p*_;i[0]=m*v,i[4]=-m*_,i[8]=d,i[1]=b+T*d,i[5]=g-C*d,i[9]=-p*m,i[2]=C-g*d,i[6]=T+b*d,i[10]=f*m}else if(e.order==="YXZ"){const g=m*v,b=m*_,T=d*v,C=d*_;i[0]=g+C*p,i[4]=T*p-b,i[8]=f*d,i[1]=f*_,i[5]=f*v,i[9]=-p,i[2]=b*p-T,i[6]=C+g*p,i[10]=f*m}else if(e.order==="ZXY"){const g=m*v,b=m*_,T=d*v,C=d*_;i[0]=g-C*p,i[4]=-f*_,i[8]=T+b*p,i[1]=b+T*p,i[5]=f*v,i[9]=C-g*p,i[2]=-f*d,i[6]=p,i[10]=f*m}else if(e.order==="ZYX"){const g=f*v,b=f*_,T=p*v,C=p*_;i[0]=m*v,i[4]=T*d-b,i[8]=g*d+C,i[1]=m*_,i[5]=C*d+g,i[9]=b*d-T,i[2]=-d,i[6]=p*m,i[10]=f*m}else if(e.order==="YZX"){const g=f*m,b=f*d,T=p*m,C=p*d;i[0]=m*v,i[4]=C-g*_,i[8]=T*_+b,i[1]=_,i[5]=f*v,i[9]=-p*v,i[2]=-d*v,i[6]=b*_+T,i[10]=g-C*_}else if(e.order==="XZY"){const g=f*m,b=f*d,T=p*m,C=p*d;i[0]=m*v,i[4]=-_,i[8]=d*v,i[1]=g*_+C,i[5]=f*v,i[9]=b*_-T,i[2]=T*_-b,i[6]=p*v,i[10]=C*_+g}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(VS,e,kS)}lookAt(e,i,s){const l=this.elements;return Mi.subVectors(e,i),Mi.lengthSq()===0&&(Mi.z=1),Mi.normalize(),hs.crossVectors(s,Mi),hs.lengthSq()===0&&(Math.abs(s.z)===1?Mi.x+=1e-4:Mi.z+=1e-4,Mi.normalize(),hs.crossVectors(s,Mi)),hs.normalize(),Ec.crossVectors(Mi,hs),l[0]=hs.x,l[4]=Ec.x,l[8]=Mi.x,l[1]=hs.y,l[5]=Ec.y,l[9]=Mi.y,l[2]=hs.z,l[6]=Ec.z,l[10]=Mi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,f=s[0],p=s[4],m=s[8],d=s[12],v=s[1],_=s[5],g=s[9],b=s[13],T=s[2],C=s[6],M=s[10],x=s[14],N=s[3],z=s[7],w=s[11],G=s[15],L=l[0],I=l[4],A=l[8],O=l[12],k=l[1],X=l[5],K=l[9],V=l[13],re=l[2],Z=l[6],P=l[10],U=l[14],W=l[3],se=l[7],B=l[11],S=l[15];return c[0]=f*L+p*k+m*re+d*W,c[4]=f*I+p*X+m*Z+d*se,c[8]=f*A+p*K+m*P+d*B,c[12]=f*O+p*V+m*U+d*S,c[1]=v*L+_*k+g*re+b*W,c[5]=v*I+_*X+g*Z+b*se,c[9]=v*A+_*K+g*P+b*B,c[13]=v*O+_*V+g*U+b*S,c[2]=T*L+C*k+M*re+x*W,c[6]=T*I+C*X+M*Z+x*se,c[10]=T*A+C*K+M*P+x*B,c[14]=T*O+C*V+M*U+x*S,c[3]=N*L+z*k+w*re+G*W,c[7]=N*I+z*X+w*Z+G*se,c[11]=N*A+z*K+w*P+G*B,c[15]=N*O+z*V+w*U+G*S,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],l=e[8],c=e[12],f=e[1],p=e[5],m=e[9],d=e[13],v=e[2],_=e[6],g=e[10],b=e[14],T=e[3],C=e[7],M=e[11],x=e[15],N=m*b-d*g,z=p*b-d*_,w=p*g-m*_,G=f*b-d*v,L=f*g-m*v,I=f*_-p*v;return i*(C*N-M*z+x*w)-s*(T*N-M*G+x*L)+l*(T*z-C*G+x*I)-c*(T*w-C*L+M*I)}determinantAffine(){const e=this.elements,i=e[0],s=e[4],l=e[8],c=e[1],f=e[5],p=e[9],m=e[2],d=e[6],v=e[10];return i*(f*v-p*d)-s*(c*v-p*m)+l*(c*d-f*m)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],p=e[5],m=e[6],d=e[7],v=e[8],_=e[9],g=e[10],b=e[11],T=e[12],C=e[13],M=e[14],x=e[15],N=i*p-s*f,z=i*m-l*f,w=i*d-c*f,G=s*m-l*p,L=s*d-c*p,I=l*d-c*m,A=v*C-_*T,O=v*M-g*T,k=v*x-b*T,X=_*M-g*C,K=_*x-b*C,V=g*x-b*M,re=N*V-z*K+w*X+G*k-L*O+I*A;if(re===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const Z=1/re;return e[0]=(p*V-m*K+d*X)*Z,e[1]=(l*K-s*V-c*X)*Z,e[2]=(C*I-M*L+x*G)*Z,e[3]=(g*L-_*I-b*G)*Z,e[4]=(m*k-f*V-d*O)*Z,e[5]=(i*V-l*k+c*O)*Z,e[6]=(M*w-T*I-x*z)*Z,e[7]=(v*I-g*w+b*z)*Z,e[8]=(f*K-p*k+d*A)*Z,e[9]=(s*k-i*K-c*A)*Z,e[10]=(T*L-C*w+x*N)*Z,e[11]=(_*w-v*L-b*N)*Z,e[12]=(p*O-f*X-m*A)*Z,e[13]=(i*X-s*O+l*A)*Z,e[14]=(C*z-T*G-M*N)*Z,e[15]=(v*G-_*z+g*N)*Z,this}scale(e){const i=this.elements,s=e.x,l=e.y,c=e.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,f=e.x,p=e.y,m=e.z,d=c*f,v=c*p;return this.set(d*f+s,d*p-l*m,d*m+l*p,0,d*p+l*m,v*p+s,v*m-l*f,0,d*m-l*p,v*m+l*f,c*m*m+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,l,c,f){return this.set(1,s,c,0,e,1,f,0,i,l,1,0,0,0,0,1),this}compose(e,i,s){const l=this.elements,c=i._x,f=i._y,p=i._z,m=i._w,d=c+c,v=f+f,_=p+p,g=c*d,b=c*v,T=c*_,C=f*v,M=f*_,x=p*_,N=m*d,z=m*v,w=m*_,G=s.x,L=s.y,I=s.z;return l[0]=(1-(C+x))*G,l[1]=(b+w)*G,l[2]=(T-z)*G,l[3]=0,l[4]=(b-w)*L,l[5]=(1-(g+x))*L,l[6]=(M+N)*L,l[7]=0,l[8]=(T+z)*I,l[9]=(M-N)*I,l[10]=(1-(g+C))*I,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,s){const l=this.elements;e.x=l[12],e.y=l[13],e.z=l[14];const c=this.determinantAffine();if(c===0)return s.set(1,1,1),i.identity(),this;let f=Or.set(l[0],l[1],l[2]).length();const p=Or.set(l[4],l[5],l[6]).length(),m=Or.set(l[8],l[9],l[10]).length();c<0&&(f=-f),Wi.copy(this);const d=1/f,v=1/p,_=1/m;return Wi.elements[0]*=d,Wi.elements[1]*=d,Wi.elements[2]*=d,Wi.elements[4]*=v,Wi.elements[5]*=v,Wi.elements[6]*=v,Wi.elements[8]*=_,Wi.elements[9]*=_,Wi.elements[10]*=_,i.setFromRotationMatrix(Wi),s.x=f,s.y=p,s.z=m,this}makePerspective(e,i,s,l,c,f,p=ra,m=!1){const d=this.elements,v=2*c/(i-e),_=2*c/(s-l),g=(i+e)/(i-e),b=(s+l)/(s-l);let T,C;if(m)T=c/(f-c),C=f*c/(f-c);else if(p===ra)T=-(f+c)/(f-c),C=-2*f*c/(f-c);else if(p===cl)T=-f/(f-c),C=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+p);return d[0]=v,d[4]=0,d[8]=g,d[12]=0,d[1]=0,d[5]=_,d[9]=b,d[13]=0,d[2]=0,d[6]=0,d[10]=T,d[14]=C,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(e,i,s,l,c,f,p=ra,m=!1){const d=this.elements,v=2/(i-e),_=2/(s-l),g=-(i+e)/(i-e),b=-(s+l)/(s-l);let T,C;if(m)T=1/(f-c),C=f/(f-c);else if(p===ra)T=-2/(f-c),C=-(f+c)/(f-c);else if(p===cl)T=-1/(f-c),C=-c/(f-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+p);return d[0]=v,d[4]=0,d[8]=0,d[12]=g,d[1]=0,d[5]=_,d[9]=0,d[13]=b,d[2]=0,d[6]=0,d[10]=T,d[14]=C,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}};du.prototype.isMatrix4=!0;let fn=du;const Or=new ne,Wi=new fn,VS=new ne(0,0,0),kS=new ne(1,1,1),hs=new ne,Ec=new ne,Mi=new ne,Ov=new fn,Pv=new ao;class Ms{constructor(e=0,i=0,s=0,l=Ms.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,l=this._order){return this._x=e,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const l=e.elements,c=l[0],f=l[4],p=l[8],m=l[1],d=l[5],v=l[9],_=l[2],g=l[6],b=l[10];switch(i){case"XYZ":this._y=Math.asin(Et(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-v,b),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(g,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Et(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(p,b),this._z=Math.atan2(m,d)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(Et(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-_,b),this._z=Math.atan2(-f,d)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-Et(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(g,b),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,d));break;case"YZX":this._z=Math.asin(Et(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-v,d),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(p,b));break;case"XZY":this._z=Math.asin(-Et(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(g,d),this._y=Math.atan2(p,c)):(this._x=Math.atan2(-v,b),this._y=0);break;default:ft("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return Ov.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ov,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return Pv.setFromEuler(this),this.setFromQuaternion(Pv,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ms.DEFAULT_ORDER="XYZ";class Y_{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let XS=0;const Iv=new ne,Pr=new ao,Da=new fn,Tc=new ne,Ko=new ne,WS=new ne,qS=new ao,zv=new ne(1,0,0),Bv=new ne(0,1,0),Fv=new ne(0,0,1),Gv={type:"added"},YS={type:"removed"},Ir={type:"childadded",child:null},zh={type:"childremoved",child:null};class zn extends Js{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:XS++}),this.uuid=io(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=zn.DEFAULT_UP.clone();const e=new ne,i=new Ms,s=new ao,l=new ne(1,1,1);function c(){s.setFromEuler(i,!1)}function f(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new fn},normalMatrix:{value:new pt}}),this.matrix=new fn,this.matrixWorld=new fn,this.matrixAutoUpdate=zn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=zn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Y_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return Pr.setFromAxisAngle(e,i),this.quaternion.multiply(Pr),this}rotateOnWorldAxis(e,i){return Pr.setFromAxisAngle(e,i),this.quaternion.premultiply(Pr),this}rotateX(e){return this.rotateOnAxis(zv,e)}rotateY(e){return this.rotateOnAxis(Bv,e)}rotateZ(e){return this.rotateOnAxis(Fv,e)}translateOnAxis(e,i){return Iv.copy(e).applyQuaternion(this.quaternion),this.position.add(Iv.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(zv,e)}translateY(e){return this.translateOnAxis(Bv,e)}translateZ(e){return this.translateOnAxis(Fv,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Da.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?Tc.copy(e):Tc.set(e,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Ko.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Da.lookAt(Ko,Tc,this.up):Da.lookAt(Tc,Ko,this.up),this.quaternion.setFromRotationMatrix(Da),l&&(Da.extractRotation(l.matrixWorld),Pr.setFromRotationMatrix(Da),this.quaternion.premultiply(Pr.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(It("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Gv),Ir.child=e,this.dispatchEvent(Ir),Ir.child=null):It("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(YS),zh.child=e,this.dispatchEvent(zh),zh.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Da.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Da.multiply(e.parent.matrixWorld)),e.applyMatrix4(Da),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Gv),Ir.child=e,this.dispatchEvent(Ir),Ir.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(e,i);if(f!==void 0)return f}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ko,e,WS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ko,qS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const i=e.x,s=e.y,l=e.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*s-c[8]*l,c[13]+=s-c[1]*i-c[5]*s-c[9]*l,c[14]+=l-c[2]*i-c[6]*s-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i,s=!1){const l=this.parent;if(e===!0&&l!==null&&l.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||s)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,s=!0),i===!0){const c=this.children;for(let f=0,p=c.length;f<p;f++)c[f].updateWorldMatrix(!1,!0,s)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),this.static!==!1&&(l.static=this.static),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(p=>({...p,boundingBox:p.boundingBox?p.boundingBox.toJSON():void 0,boundingSphere:p.boundingSphere?p.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(p=>({...p})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(p,m){return p[m.uuid]===void 0&&(p[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(e.geometries,this.geometry);const p=this.geometry.parameters;if(p!==void 0&&p.shapes!==void 0){const m=p.shapes;if(Array.isArray(m))for(let d=0,v=m.length;d<v;d++){const _=m[d];c(e.shapes,_)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const p=[];for(let m=0,d=this.material.length;m<d;m++)p.push(c(e.materials,this.material[m]));l.material=p}else l.material=c(e.materials,this.material);if(this.children.length>0){l.children=[];for(let p=0;p<this.children.length;p++)l.children.push(this.children[p].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let p=0;p<this.animations.length;p++){const m=this.animations[p];l.animations.push(c(e.animations,m))}}if(i){const p=f(e.geometries),m=f(e.materials),d=f(e.textures),v=f(e.images),_=f(e.shapes),g=f(e.skeletons),b=f(e.animations),T=f(e.nodes);p.length>0&&(s.geometries=p),m.length>0&&(s.materials=m),d.length>0&&(s.textures=d),v.length>0&&(s.images=v),_.length>0&&(s.shapes=_),g.length>0&&(s.skeletons=g),b.length>0&&(s.animations=b),T.length>0&&(s.nodes=T)}return s.object=l,s;function f(p){const m=[];for(const d in p){const v=p[d];delete v.metadata,m.push(v)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const l=e.children[s];this.add(l.clone())}return this}}zn.DEFAULT_UP=new ne(0,1,0);zn.DEFAULT_MATRIX_AUTO_UPDATE=!0;zn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class js extends zn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ZS={type:"move"};class Bh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new js,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new js,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ne,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ne),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new js,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ne,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ne,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let l=null,c=null,f=null;const p=this._targetRay,m=this._grip,d=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(d&&e.hand){f=!0;for(const C of e.hand.values()){const M=i.getJointPose(C,s),x=this._getHandJoint(d,C);M!==null&&(x.matrix.fromArray(M.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=M.radius),x.visible=M!==null}const v=d.joints["index-finger-tip"],_=d.joints["thumb-tip"],g=v.position.distanceTo(_.position),b=.02,T=.005;d.inputState.pinching&&g>b+T?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&g<=b-T&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=i.getPose(e.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:e,target:this})));p!==null&&(l=i.getPose(e.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(p.matrix.fromArray(l.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,l.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(l.linearVelocity)):p.hasLinearVelocity=!1,l.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(l.angularVelocity)):p.hasAngularVelocity=!1,this.dispatchEvent(ZS)))}return p!==null&&(p.visible=l!==null),m!==null&&(m.visible=c!==null),d!==null&&(d.visible=f!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new js;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}const Z_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ds={h:0,s:0,l:0},Ac={h:0,s:0,l:0};function Fh(r,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(e-r)*6*i:i<1/2?e:i<2/3?r+(e-r)*6*(2/3-i):r}class Qe{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=zi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Dt.colorSpaceToWorking(this,i),this}setRGB(e,i,s,l=Dt.workingColorSpace){return this.r=e,this.g=i,this.b=s,Dt.colorSpaceToWorking(this,l),this}setHSL(e,i,s,l=Dt.workingColorSpace){if(e=hp(e,1),i=Et(i,0,1),s=Et(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,f=2*s-c;this.r=Fh(f,c,e+1/3),this.g=Fh(f,c,e),this.b=Fh(f,c,e-1/3)}return Dt.colorSpaceToWorking(this,l),this}setStyle(e,i=zi){function s(c){c!==void 0&&parseFloat(c)<1&&ft("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const f=l[1],p=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:ft("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(c,16),i);ft("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=zi){const s=Z_[e.toLowerCase()];return s!==void 0?this.setHex(s,i):ft("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ba(e.r),this.g=Ba(e.g),this.b=Ba(e.b),this}copyLinearToSRGB(e){return this.r=Jr(e.r),this.g=Jr(e.g),this.b=Jr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zi){return Dt.workingToColorSpace(Kn.copy(this),e),Math.round(Et(Kn.r*255,0,255))*65536+Math.round(Et(Kn.g*255,0,255))*256+Math.round(Et(Kn.b*255,0,255))}getHexString(e=zi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=Dt.workingColorSpace){Dt.workingToColorSpace(Kn.copy(this),i);const s=Kn.r,l=Kn.g,c=Kn.b,f=Math.max(s,l,c),p=Math.min(s,l,c);let m,d;const v=(p+f)/2;if(p===f)m=0,d=0;else{const _=f-p;switch(d=v<=.5?_/(f+p):_/(2-f-p),f){case s:m=(l-c)/_+(l<c?6:0);break;case l:m=(c-s)/_+2;break;case c:m=(s-l)/_+4;break}m/=6}return e.h=m,e.s=d,e.l=v,e}getRGB(e,i=Dt.workingColorSpace){return Dt.workingToColorSpace(Kn.copy(this),i),e.r=Kn.r,e.g=Kn.g,e.b=Kn.b,e}getStyle(e=zi){Dt.workingToColorSpace(Kn.copy(this),e);const i=Kn.r,s=Kn.g,l=Kn.b;return e!==zi?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(e,i,s){return this.getHSL(ds),this.setHSL(ds.h+e,ds.s+i,ds.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL(ds),e.getHSL(Ac);const s=sl(ds.h,Ac.h,i),l=sl(ds.s,Ac.s,i),c=sl(ds.l,Ac.l,i);return this.setHSL(s,l,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,l=this.b,c=e.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Kn=new Qe;Qe.NAMES=Z_;class pp{constructor(e,i=25e-5){this.isFogExp2=!0,this.name="",this.color=new Qe(e),this.density=i}clone(){return new pp(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class jS extends zn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ms,this.environmentIntensity=1,this.environmentRotation=new Ms,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const qi=new ne,Na=new ne,Gh=new ne,Ua=new ne,zr=new ne,Br=new ne,Hv=new ne,Hh=new ne,Vh=new ne,kh=new ne,Xh=new hn,Wh=new hn,qh=new hn;class Fi{constructor(e=new ne,i=new ne,s=new ne){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,l){l.subVectors(s,i),qi.subVectors(e,i),l.cross(qi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(e,i,s,l,c){qi.subVectors(l,i),Na.subVectors(s,i),Gh.subVectors(e,i);const f=qi.dot(qi),p=qi.dot(Na),m=qi.dot(Gh),d=Na.dot(Na),v=Na.dot(Gh),_=f*d-p*p;if(_===0)return c.set(0,0,0),null;const g=1/_,b=(d*m-p*v)*g,T=(f*v-p*m)*g;return c.set(1-b-T,T,b)}static containsPoint(e,i,s,l){return this.getBarycoord(e,i,s,l,Ua)===null?!1:Ua.x>=0&&Ua.y>=0&&Ua.x+Ua.y<=1}static getInterpolation(e,i,s,l,c,f,p,m){return this.getBarycoord(e,i,s,l,Ua)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,Ua.x),m.addScaledVector(f,Ua.y),m.addScaledVector(p,Ua.z),m)}static getInterpolatedAttribute(e,i,s,l,c,f){return Xh.setScalar(0),Wh.setScalar(0),qh.setScalar(0),Xh.fromBufferAttribute(e,i),Wh.fromBufferAttribute(e,s),qh.fromBufferAttribute(e,l),f.setScalar(0),f.addScaledVector(Xh,c.x),f.addScaledVector(Wh,c.y),f.addScaledVector(qh,c.z),f}static isFrontFacing(e,i,s,l){return qi.subVectors(s,i),Na.subVectors(e,i),qi.cross(Na).dot(l)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,l){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,s,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return qi.subVectors(this.c,this.b),Na.subVectors(this.a,this.b),qi.cross(Na).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Fi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Fi.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,l,c){return Fi.getInterpolation(e,this.a,this.b,this.c,i,s,l,c)}containsPoint(e){return Fi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Fi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,l=this.b,c=this.c;let f,p;zr.subVectors(l,s),Br.subVectors(c,s),Hh.subVectors(e,s);const m=zr.dot(Hh),d=Br.dot(Hh);if(m<=0&&d<=0)return i.copy(s);Vh.subVectors(e,l);const v=zr.dot(Vh),_=Br.dot(Vh);if(v>=0&&_<=v)return i.copy(l);const g=m*_-v*d;if(g<=0&&m>=0&&v<=0)return f=m/(m-v),i.copy(s).addScaledVector(zr,f);kh.subVectors(e,c);const b=zr.dot(kh),T=Br.dot(kh);if(T>=0&&b<=T)return i.copy(c);const C=b*d-m*T;if(C<=0&&d>=0&&T<=0)return p=d/(d-T),i.copy(s).addScaledVector(Br,p);const M=v*T-b*_;if(M<=0&&_-v>=0&&b-T>=0)return Hv.subVectors(c,l),p=(_-v)/(_-v+(b-T)),i.copy(l).addScaledVector(Hv,p);const x=1/(M+C+g);return f=C*x,p=g*x,i.copy(s).addScaledVector(zr,f).addScaledVector(Br,p)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class hl{constructor(e=new ne(1/0,1/0,1/0),i=new ne(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(Yi.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(Yi.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=Yi.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let f=0,p=c.count;f<p;f++)e.isMesh===!0?e.getVertexPosition(f,Yi):Yi.fromBufferAttribute(c,f),Yi.applyMatrix4(e.matrixWorld),this.expandByPoint(Yi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),wc.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),wc.copy(s.boundingBox)),wc.applyMatrix4(e.matrixWorld),this.union(wc)}const l=e.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yi),Yi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Qo),Rc.subVectors(this.max,Qo),Fr.subVectors(e.a,Qo),Gr.subVectors(e.b,Qo),Hr.subVectors(e.c,Qo),ps.subVectors(Gr,Fr),ms.subVectors(Hr,Gr),Gs.subVectors(Fr,Hr);let i=[0,-ps.z,ps.y,0,-ms.z,ms.y,0,-Gs.z,Gs.y,ps.z,0,-ps.x,ms.z,0,-ms.x,Gs.z,0,-Gs.x,-ps.y,ps.x,0,-ms.y,ms.x,0,-Gs.y,Gs.x,0];return!Yh(i,Fr,Gr,Hr,Rc)||(i=[1,0,0,0,1,0,0,0,1],!Yh(i,Fr,Gr,Hr,Rc))?!1:(Cc.crossVectors(ps,ms),i=[Cc.x,Cc.y,Cc.z],Yh(i,Fr,Gr,Hr,Rc))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(La[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),La[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),La[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),La[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),La[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),La[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),La[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),La[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(La),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const La=[new ne,new ne,new ne,new ne,new ne,new ne,new ne,new ne],Yi=new ne,wc=new hl,Fr=new ne,Gr=new ne,Hr=new ne,ps=new ne,ms=new ne,Gs=new ne,Qo=new ne,Rc=new ne,Cc=new ne,Hs=new ne;function Yh(r,e,i,s,l){for(let c=0,f=r.length-3;c<=f;c+=3){Hs.fromArray(r,c);const p=l.x*Math.abs(Hs.x)+l.y*Math.abs(Hs.y)+l.z*Math.abs(Hs.z),m=e.dot(Hs),d=i.dot(Hs),v=s.dot(Hs);if(Math.max(-Math.max(m,d,v),Math.min(m,d,v))>p)return!1}return!0}const wn=new ne,Dc=new xt;let KS=0;class Ai extends Js{constructor(e,i,s=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:KS++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=Av,this.updateRanges=[],this.gpuType=sa,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[e+l]=i.array[s+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)Dc.fromBufferAttribute(this,i),Dc.applyMatrix3(e),this.setXY(i,Dc.x,Dc.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)wn.fromBufferAttribute(this,i),wn.applyMatrix3(e),this.setXYZ(i,wn.x,wn.y,wn.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)wn.fromBufferAttribute(this,i),wn.applyMatrix4(e),this.setXYZ(i,wn.x,wn.y,wn.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)wn.fromBufferAttribute(this,i),wn.applyNormalMatrix(e),this.setXYZ(i,wn.x,wn.y,wn.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)wn.fromBufferAttribute(this,i),wn.transformDirection(e),this.setXYZ(i,wn.x,wn.y,wn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=qr(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=ei(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=qr(i,this.array)),i}setX(e,i){return this.normalized&&(i=ei(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=qr(i,this.array)),i}setY(e,i){return this.normalized&&(i=ei(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=qr(i,this.array)),i}setZ(e,i){return this.normalized&&(i=ei(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=qr(i,this.array)),i}setW(e,i){return this.normalized&&(i=ei(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=ei(i,this.array),s=ei(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,l){return e*=this.itemSize,this.normalized&&(i=ei(i,this.array),s=ei(s,this.array),l=ei(l,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this}setXYZW(e,i,s,l,c){return e*=this.itemSize,this.normalized&&(i=ei(i,this.array),s=ei(s,this.array),l=ei(l,this.array),c=ei(c,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Av&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class j_ extends Ai{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class K_ extends Ai{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class sn extends Ai{constructor(e,i,s){super(new Float32Array(e),i,s)}}const QS=new hl,Jo=new ne,Zh=new ne;class dl{constructor(e=new ne,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):QS.setFromPoints(e).getCenter(s);let l=0;for(let c=0,f=e.length;c<f;c++)l=Math.max(l,s.distanceToSquared(e[c]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Jo.subVectors(e,this.center);const i=Jo.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(Jo,l/s),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Jo.copy(e.center).add(Zh)),this.expandByPoint(Jo.copy(e.center).sub(Zh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let JS=0;const Ii=new fn,jh=new zn,Vr=new ne,Si=new hl,$o=new hl,In=new ne;class Dn extends Js{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:JS++}),this.uuid=io(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(mS(e)?K_:j_)(e,1):this.index=e,this}setIndirect(e,i=0){return this.indirect=e,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new pt().getNormalMatrix(e);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ii.makeRotationFromQuaternion(e),this.applyMatrix4(Ii),this}rotateX(e){return Ii.makeRotationX(e),this.applyMatrix4(Ii),this}rotateY(e){return Ii.makeRotationY(e),this.applyMatrix4(Ii),this}rotateZ(e){return Ii.makeRotationZ(e),this.applyMatrix4(Ii),this}translate(e,i,s){return Ii.makeTranslation(e,i,s),this.applyMatrix4(Ii),this}scale(e,i,s){return Ii.makeScale(e,i,s),this.applyMatrix4(Ii),this}lookAt(e){return jh.lookAt(e),jh.updateMatrix(),this.applyMatrix4(jh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vr).negate(),this.translate(Vr.x,Vr.y,Vr.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=e.length;l<c;l++){const f=e[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new sn(s,3))}else{const s=Math.min(e.length,i.count);for(let l=0;l<s;l++){const c=e[l];i.setXYZ(l,c.x,c.y,c.z||0)}e.length>i.count&&ft("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hl);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){It("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ne(-1/0,-1/0,-1/0),new ne(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];Si.setFromBufferAttribute(c),this.morphTargetsRelative?(In.addVectors(this.boundingBox.min,Si.min),this.boundingBox.expandByPoint(In),In.addVectors(this.boundingBox.max,Si.max),this.boundingBox.expandByPoint(In)):(this.boundingBox.expandByPoint(Si.min),this.boundingBox.expandByPoint(Si.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&It('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new dl);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){It("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ne,1/0);return}if(e){const s=this.boundingSphere.center;if(Si.setFromBufferAttribute(e),i)for(let c=0,f=i.length;c<f;c++){const p=i[c];$o.setFromBufferAttribute(p),this.morphTargetsRelative?(In.addVectors(Si.min,$o.min),Si.expandByPoint(In),In.addVectors(Si.max,$o.max),Si.expandByPoint(In)):(Si.expandByPoint($o.min),Si.expandByPoint($o.max))}Si.getCenter(s);let l=0;for(let c=0,f=e.count;c<f;c++)In.fromBufferAttribute(e,c),l=Math.max(l,s.distanceToSquared(In));if(i)for(let c=0,f=i.length;c<f;c++){const p=i[c],m=this.morphTargetsRelative;for(let d=0,v=p.count;d<v;d++)In.fromBufferAttribute(p,d),m&&(Vr.fromBufferAttribute(e,d),In.add(Vr)),l=Math.max(l,s.distanceToSquared(In))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&It('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){It("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;let f=this.getAttribute("tangent");(f===void 0||f.count!==s.count)&&(f=new Ai(new Float32Array(4*s.count),4),this.setAttribute("tangent",f));const p=[],m=[];for(let A=0;A<s.count;A++)p[A]=new ne,m[A]=new ne;const d=new ne,v=new ne,_=new ne,g=new xt,b=new xt,T=new xt,C=new ne,M=new ne;function x(A,O,k){d.fromBufferAttribute(s,A),v.fromBufferAttribute(s,O),_.fromBufferAttribute(s,k),g.fromBufferAttribute(c,A),b.fromBufferAttribute(c,O),T.fromBufferAttribute(c,k),v.sub(d),_.sub(d),b.sub(g),T.sub(g);const X=1/(b.x*T.y-T.x*b.y);isFinite(X)&&(C.copy(v).multiplyScalar(T.y).addScaledVector(_,-b.y).multiplyScalar(X),M.copy(_).multiplyScalar(b.x).addScaledVector(v,-T.x).multiplyScalar(X),p[A].add(C),p[O].add(C),p[k].add(C),m[A].add(M),m[O].add(M),m[k].add(M))}let N=this.groups;N.length===0&&(N=[{start:0,count:e.count}]);for(let A=0,O=N.length;A<O;++A){const k=N[A],X=k.start,K=k.count;for(let V=X,re=X+K;V<re;V+=3)x(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const z=new ne,w=new ne,G=new ne,L=new ne;function I(A){G.fromBufferAttribute(l,A),L.copy(G);const O=p[A];z.copy(O),z.sub(G.multiplyScalar(G.dot(O))).normalize(),w.crossVectors(L,O);const X=w.dot(m[A])<0?-1:1;f.setXYZW(A,z.x,z.y,z.z,X)}for(let A=0,O=N.length;A<O;++A){const k=N[A],X=k.start,K=k.count;for(let V=X,re=X+K;V<re;V+=3)I(e.getX(V+0)),I(e.getX(V+1)),I(e.getX(V+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0||s.count!==i.count)s=new Ai(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let g=0,b=s.count;g<b;g++)s.setXYZ(g,0,0,0);const l=new ne,c=new ne,f=new ne,p=new ne,m=new ne,d=new ne,v=new ne,_=new ne;if(e)for(let g=0,b=e.count;g<b;g+=3){const T=e.getX(g+0),C=e.getX(g+1),M=e.getX(g+2);l.fromBufferAttribute(i,T),c.fromBufferAttribute(i,C),f.fromBufferAttribute(i,M),v.subVectors(f,c),_.subVectors(l,c),v.cross(_),p.fromBufferAttribute(s,T),m.fromBufferAttribute(s,C),d.fromBufferAttribute(s,M),p.add(v),m.add(v),d.add(v),s.setXYZ(T,p.x,p.y,p.z),s.setXYZ(C,m.x,m.y,m.z),s.setXYZ(M,d.x,d.y,d.z)}else for(let g=0,b=i.count;g<b;g+=3)l.fromBufferAttribute(i,g+0),c.fromBufferAttribute(i,g+1),f.fromBufferAttribute(i,g+2),v.subVectors(f,c),_.subVectors(l,c),v.cross(_),s.setXYZ(g+0,v.x,v.y,v.z),s.setXYZ(g+1,v.x,v.y,v.z),s.setXYZ(g+2,v.x,v.y,v.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)In.fromBufferAttribute(e,i),In.normalize(),e.setXYZ(i,In.x,In.y,In.z)}toNonIndexed(){function e(p,m){const d=p.array,v=p.itemSize,_=p.normalized,g=new d.constructor(m.length*v);let b=0,T=0;for(let C=0,M=m.length;C<M;C++){p.isInterleavedBufferAttribute?b=m[C]*p.data.stride+p.offset:b=m[C]*v;for(let x=0;x<v;x++)g[T++]=d[b++]}return new Ai(g,v,_)}if(this.index===null)return ft("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Dn,s=this.index.array,l=this.attributes;for(const p in l){const m=l[p],d=e(m,s);i.setAttribute(p,d)}const c=this.morphAttributes;for(const p in c){const m=[],d=c[p];for(let v=0,_=d.length;v<_;v++){const g=d[v],b=e(g,s);m.push(b)}i.morphAttributes[p]=m}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let p=0,m=f.length;p<m;p++){const d=f[p];i.addGroup(d.start,d.count,d.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const d in m)m[d]!==void 0&&(e[d]=m[d]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const d=s[m];e.data.attributes[m]=d.toJSON(e.data)}const l={};let c=!1;for(const m in this.morphAttributes){const d=this.morphAttributes[m],v=[];for(let _=0,g=d.length;_<g;_++){const b=d[_];v.push(b.toJSON(e.data))}v.length>0&&(l[m]=v,c=!0)}c&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(e.data.groups=JSON.parse(JSON.stringify(f)));const p=this.boundingSphere;return p!==null&&(e.data.boundingSphere=p.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const l=e.attributes;for(const d in l){const v=l[d];this.setAttribute(d,v.clone(i))}const c=e.morphAttributes;for(const d in c){const v=[],_=c[d];for(let g=0,b=_.length;g<b;g++)v.push(_[g].clone(i));this.morphAttributes[d]=v}this.morphTargetsRelative=e.morphTargetsRelative;const f=e.groups;for(let d=0,v=f.length;d<v;d++){const _=f[d];this.addGroup(_.start,_.count,_.materialIndex)}const p=e.boundingBox;p!==null&&(this.boundingBox=p.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let $S=0;class $s extends Js{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$S++}),this.uuid=io(),this.name="",this.type="Material",this.blending=jr,this.side=ys,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ud,this.blendDst=fd,this.blendEquation=Ws,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=$r,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ur,this.stencilZFail=Ur,this.stencilZPass=Ur,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){ft(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ft(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector2&&s&&s.isVector2||l&&l.isEuler&&s&&s.isEuler||l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==jr&&(s.blending=this.blending),this.side!==ys&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==ud&&(s.blendSrc=this.blendSrc),this.blendDst!==fd&&(s.blendDst=this.blendDst),this.blendEquation!==Ws&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==$r&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Tv&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ur&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Ur&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Ur&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.allowOverride===!1&&(s.allowOverride=!1),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const f=[];for(const p in c){const m=c[p];delete m.metadata,f.push(m)}return f}if(i){const c=l(e.textures),f=l(e.images);c.length>0&&(s.textures=c),f.length>0&&(s.images=f)}return s}fromJSON(e,i){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=i[e.map]||null),e.matcap!==void 0&&(this.matcap=i[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=i[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=i[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=i[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let s=e.normalScale;Array.isArray(s)===!1&&(s=[s,s]),this.normalScale=new xt().fromArray(s)}return e.displacementMap!==void 0&&(this.displacementMap=i[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=i[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=i[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=i[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=i[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=i[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=i[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=i[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=i[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=i[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=i[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new xt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=i[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=i[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=i[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=i[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=i[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Oa=new ne,Kh=new ne,Nc=new ne,gs=new ne,Qh=new ne,Uc=new ne,Jh=new ne;class mp{constructor(e=new ne,i=new ne(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Oa)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=Oa.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(Oa.copy(this.origin).addScaledVector(this.direction,i),Oa.distanceToSquared(e))}distanceSqToSegment(e,i,s,l){Kh.copy(e).add(i).multiplyScalar(.5),Nc.copy(i).sub(e).normalize(),gs.copy(this.origin).sub(Kh);const c=e.distanceTo(i)*.5,f=-this.direction.dot(Nc),p=gs.dot(this.direction),m=-gs.dot(Nc),d=gs.lengthSq(),v=Math.abs(1-f*f);let _,g,b,T;if(v>0)if(_=f*m-p,g=f*p-m,T=c*v,_>=0)if(g>=-T)if(g<=T){const C=1/v;_*=C,g*=C,b=_*(_+f*g+2*p)+g*(f*_+g+2*m)+d}else g=c,_=Math.max(0,-(f*g+p)),b=-_*_+g*(g+2*m)+d;else g=-c,_=Math.max(0,-(f*g+p)),b=-_*_+g*(g+2*m)+d;else g<=-T?(_=Math.max(0,-(-f*c+p)),g=_>0?-c:Math.min(Math.max(-c,-m),c),b=-_*_+g*(g+2*m)+d):g<=T?(_=0,g=Math.min(Math.max(-c,-m),c),b=g*(g+2*m)+d):(_=Math.max(0,-(f*c+p)),g=_>0?c:Math.min(Math.max(-c,-m),c),b=-_*_+g*(g+2*m)+d);else g=f>0?-c:c,_=Math.max(0,-(f*g+p)),b=-_*_+g*(g+2*m)+d;return s&&s.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(Kh).addScaledVector(Nc,g),b}intersectSphere(e,i){Oa.subVectors(e.center,this.origin);const s=Oa.dot(this.direction),l=Oa.dot(Oa)-s*s,c=e.radius*e.radius;if(l>c)return null;const f=Math.sqrt(c-l),p=s-f,m=s+f;return m<0?null:p<0?this.at(m,i):this.at(p,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,l,c,f,p,m;const d=1/this.direction.x,v=1/this.direction.y,_=1/this.direction.z,g=this.origin;return d>=0?(s=(e.min.x-g.x)*d,l=(e.max.x-g.x)*d):(s=(e.max.x-g.x)*d,l=(e.min.x-g.x)*d),v>=0?(c=(e.min.y-g.y)*v,f=(e.max.y-g.y)*v):(c=(e.max.y-g.y)*v,f=(e.min.y-g.y)*v),s>f||c>l||((c>s||isNaN(s))&&(s=c),(f<l||isNaN(l))&&(l=f),_>=0?(p=(e.min.z-g.z)*_,m=(e.max.z-g.z)*_):(p=(e.max.z-g.z)*_,m=(e.min.z-g.z)*_),s>m||p>l)||((p>s||s!==s)&&(s=p),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(e){return this.intersectBox(e,Oa)!==null}intersectTriangle(e,i,s,l,c){Qh.subVectors(i,e),Uc.subVectors(s,e),Jh.crossVectors(Qh,Uc);let f=this.direction.dot(Jh),p;if(f>0){if(l)return null;p=1}else if(f<0)p=-1,f=-f;else return null;gs.subVectors(this.origin,e);const m=p*this.direction.dot(Uc.crossVectors(gs,Uc));if(m<0)return null;const d=p*this.direction.dot(Qh.cross(gs));if(d<0||m+d>f)return null;const v=-p*gs.dot(Jh);return v<0?null:this.at(v/f,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class fl extends $s{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ms,this.combine=D_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Vv=new fn,Vs=new mp,Lc=new dl,kv=new ne,Oc=new ne,Pc=new ne,Ic=new ne,$h=new ne,zc=new ne,Xv=new ne,Bc=new ne;class yn extends zn{constructor(e=new Dn,i=new fl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}getVertexPosition(e,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,f=s.morphTargetsRelative;i.fromBufferAttribute(l,e);const p=this.morphTargetInfluences;if(c&&p){zc.set(0,0,0);for(let m=0,d=c.length;m<d;m++){const v=p[m],_=c[m];v!==0&&($h.fromBufferAttribute(_,e),f?zc.addScaledVector($h,v):zc.addScaledVector($h.sub(i),v))}i.add(zc)}return i}raycast(e,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Lc.copy(s.boundingSphere),Lc.applyMatrix4(c),Vs.copy(e.ray).recast(e.near),!(Lc.containsPoint(Vs.origin)===!1&&(Vs.intersectSphere(Lc,kv)===null||Vs.origin.distanceToSquared(kv)>(e.far-e.near)**2))&&(Vv.copy(c).invert(),Vs.copy(e.ray).applyMatrix4(Vv),!(s.boundingBox!==null&&Vs.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,Vs)))}_computeIntersections(e,i,s){let l;const c=this.geometry,f=this.material,p=c.index,m=c.attributes.position,d=c.attributes.uv,v=c.attributes.uv1,_=c.attributes.normal,g=c.groups,b=c.drawRange;if(p!==null)if(Array.isArray(f))for(let T=0,C=g.length;T<C;T++){const M=g[T],x=f[M.materialIndex],N=Math.max(M.start,b.start),z=Math.min(p.count,Math.min(M.start+M.count,b.start+b.count));for(let w=N,G=z;w<G;w+=3){const L=p.getX(w),I=p.getX(w+1),A=p.getX(w+2);l=Fc(this,x,e,s,d,v,_,L,I,A),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const T=Math.max(0,b.start),C=Math.min(p.count,b.start+b.count);for(let M=T,x=C;M<x;M+=3){const N=p.getX(M),z=p.getX(M+1),w=p.getX(M+2);l=Fc(this,f,e,s,d,v,_,N,z,w),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let T=0,C=g.length;T<C;T++){const M=g[T],x=f[M.materialIndex],N=Math.max(M.start,b.start),z=Math.min(m.count,Math.min(M.start+M.count,b.start+b.count));for(let w=N,G=z;w<G;w+=3){const L=w,I=w+1,A=w+2;l=Fc(this,x,e,s,d,v,_,L,I,A),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const T=Math.max(0,b.start),C=Math.min(m.count,b.start+b.count);for(let M=T,x=C;M<x;M+=3){const N=M,z=M+1,w=M+2;l=Fc(this,f,e,s,d,v,_,N,z,w),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}}}function eb(r,e,i,s,l,c,f,p){let m;if(e.side===fi?m=s.intersectTriangle(f,c,l,!0,p):m=s.intersectTriangle(l,c,f,e.side===ys,p),m===null)return null;Bc.copy(p),Bc.applyMatrix4(r.matrixWorld);const d=i.ray.origin.distanceTo(Bc);return d<i.near||d>i.far?null:{distance:d,point:Bc.clone(),object:r}}function Fc(r,e,i,s,l,c,f,p,m,d){r.getVertexPosition(p,Oc),r.getVertexPosition(m,Pc),r.getVertexPosition(d,Ic);const v=eb(r,e,i,s,Oc,Pc,Ic,Xv);if(v){const _=new ne;Fi.getBarycoord(Xv,Oc,Pc,Ic,_),l&&(v.uv=Fi.getInterpolatedAttribute(l,p,m,d,_,new xt)),c&&(v.uv1=Fi.getInterpolatedAttribute(c,p,m,d,_,new xt)),f&&(v.normal=Fi.getInterpolatedAttribute(f,p,m,d,_,new ne),v.normal.dot(s.direction)>0&&v.normal.multiplyScalar(-1));const g={a:p,b:m,c:d,normal:new ne,materialIndex:0};Fi.getNormal(Oc,Pc,Ic,g.normal),v.face=g,v.barycoord=_}return v}class tb extends Jn{constructor(e=null,i=1,s=1,l,c,f,p,m,d=Vn,v=Vn,_,g){super(null,f,p,m,d,v,l,c,_,g),this.isDataTexture=!0,this.image={data:e,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ed=new ne,nb=new ne,ib=new pt;class Xs{constructor(e=new ne(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,l){return this.normal.set(e,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const l=ed.subVectors(s,i).cross(nb.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i,s=!0){const l=e.delta(ed),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const f=-(e.start.dot(this.normal)+this.constant)/c;return s===!0&&(f<0||f>1)?null:i.copy(e.start).addScaledVector(l,f)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||ib.getNormalMatrix(e),l=this.coplanarPoint(ed).applyMatrix4(e),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ks=new dl,ab=new xt(.5,.5),Gc=new ne;class gp{constructor(e=new Xs,i=new Xs,s=new Xs,l=new Xs,c=new Xs,f=new Xs){this.planes=[e,i,s,l,c,f]}set(e,i,s,l,c,f){const p=this.planes;return p[0].copy(e),p[1].copy(i),p[2].copy(s),p[3].copy(l),p[4].copy(c),p[5].copy(f),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=ra,s=!1){const l=this.planes,c=e.elements,f=c[0],p=c[1],m=c[2],d=c[3],v=c[4],_=c[5],g=c[6],b=c[7],T=c[8],C=c[9],M=c[10],x=c[11],N=c[12],z=c[13],w=c[14],G=c[15];if(l[0].setComponents(d-f,b-v,x-T,G-N).normalize(),l[1].setComponents(d+f,b+v,x+T,G+N).normalize(),l[2].setComponents(d+p,b+_,x+C,G+z).normalize(),l[3].setComponents(d-p,b-_,x-C,G-z).normalize(),s)l[4].setComponents(m,g,M,w).normalize(),l[5].setComponents(d-m,b-g,x-M,G-w).normalize();else if(l[4].setComponents(d-m,b-g,x-M,G-w).normalize(),i===ra)l[5].setComponents(d+m,b+g,x+M,G+w).normalize();else if(i===cl)l[5].setComponents(m,g,M,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ks.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),ks.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ks)}intersectsSprite(e){ks.center.set(0,0,0);const i=ab.distanceTo(e.center);return ks.radius=.7071067811865476+i,ks.applyMatrix4(e.matrixWorld),this.intersectsSphere(ks)}intersectsSphere(e){const i=this.planes,s=e.center,l=-e.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(Gc.x=l.normal.x>0?e.max.x:e.min.x,Gc.y=l.normal.y>0?e.max.y:e.min.y,Gc.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(Gc)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class mu extends $s{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const fu=new ne,hu=new ne,Wv=new fn,el=new mp,Hc=new dl,td=new ne,qv=new ne;class sb extends zn{constructor(e=new Dn,i=new mu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,s=[0];for(let l=1,c=i.count;l<c;l++)fu.fromBufferAttribute(i,l-1),hu.fromBufferAttribute(i,l),s[l]=s[l-1],s[l]+=fu.distanceTo(hu);e.setAttribute("lineDistance",new sn(s,1))}else ft("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,i){const s=this.geometry,l=this.matrixWorld,c=e.params.Line.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Hc.copy(s.boundingSphere),Hc.applyMatrix4(l),Hc.radius+=c,e.ray.intersectsSphere(Hc)===!1)return;Wv.copy(l).invert(),el.copy(e.ray).applyMatrix4(Wv);const p=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=p*p,d=this.isLineSegments?2:1,v=s.index,g=s.attributes.position;if(v!==null){const b=Math.max(0,f.start),T=Math.min(v.count,f.start+f.count);for(let C=b,M=T-1;C<M;C+=d){const x=v.getX(C),N=v.getX(C+1),z=Vc(this,e,el,m,x,N,C);z&&i.push(z)}if(this.isLineLoop){const C=v.getX(T-1),M=v.getX(b),x=Vc(this,e,el,m,C,M,T-1);x&&i.push(x)}}else{const b=Math.max(0,f.start),T=Math.min(g.count,f.start+f.count);for(let C=b,M=T-1;C<M;C+=d){const x=Vc(this,e,el,m,C,C+1,C);x&&i.push(x)}if(this.isLineLoop){const C=Vc(this,e,el,m,T-1,b,T-1);C&&i.push(C)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}}function Vc(r,e,i,s,l,c,f){const p=r.geometry.attributes.position;if(fu.fromBufferAttribute(p,l),hu.fromBufferAttribute(p,c),i.distanceSqToSegment(fu,hu,td,qv)>s)return;td.applyMatrix4(r.matrixWorld);const d=e.ray.origin.distanceTo(td);if(!(d<e.near||d>e.far))return{distance:d,point:qv.clone().applyMatrix4(r.matrixWorld),index:f,face:null,faceIndex:null,barycoord:null,object:r}}const Yv=new ne,Zv=new ne;class vp extends sb{constructor(e,i){super(e,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,s=[];for(let l=0,c=i.count;l<c;l+=2)Yv.fromBufferAttribute(i,l),Zv.fromBufferAttribute(i,l+1),s[l]=l===0?0:s[l-1],s[l+1]=s[l]+Yv.distanceTo(Zv);e.setAttribute("lineDistance",new sn(s,1))}else ft("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Q_ extends $s{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const jv=new fn,Jd=new mp,kc=new dl,Xc=new ne;class rb extends zn{constructor(e=new Dn,i=new Q_){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,i){const s=this.geometry,l=this.matrixWorld,c=e.params.Points.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),kc.copy(s.boundingSphere),kc.applyMatrix4(l),kc.radius+=c,e.ray.intersectsSphere(kc)===!1)return;jv.copy(l).invert(),Jd.copy(e.ray).applyMatrix4(jv);const p=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=p*p,d=s.index,_=s.attributes.position;if(d!==null){const g=Math.max(0,f.start),b=Math.min(d.count,f.start+f.count);for(let T=g,C=b;T<C;T++){const M=d.getX(T);Xc.fromBufferAttribute(_,M),Kv(Xc,M,m,l,e,i,this)}}else{const g=Math.max(0,f.start),b=Math.min(_.count,f.start+f.count);for(let T=g,C=b;T<C;T++)Xc.fromBufferAttribute(_,T),Kv(Xc,T,m,l,e,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}}function Kv(r,e,i,s,l,c,f){const p=Jd.distanceSqToPoint(r);if(p<i){const m=new ne;Jd.closestPointToPoint(r,m),m.applyMatrix4(s);const d=l.ray.origin.distanceTo(m);if(d<l.near||d>l.far)return;c.push({distance:d,distanceToRay:Math.sqrt(p),point:m,index:e,face:null,faceIndex:null,barycoord:null,object:f})}}class J_ extends Jn{constructor(e=[],i=Ks,s,l,c,f,p,m,d,v){super(e,i,s,l,c,f,p,m,d,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ob extends Jn{constructor(e,i,s,l,c,f,p,m,d){super(e,i,s,l,c,f,p,m,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class to extends Jn{constructor(e,i,s=ca,l,c,f,p=Vn,m=Vn,d,v=Ga,_=1){if(v!==Ga&&v!==Zs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:i,depth:_};super(g,l,c,f,p,m,v,s,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new dp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class lb extends to{constructor(e,i=ca,s=Ks,l,c,f=Vn,p=Vn,m,d=Ga){const v={width:e,height:e,depth:1},_=[v,v,v,v,v,v];super(e,e,i,s,l,c,f,p,m,d),this.image=_,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class $_ extends Jn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Bi extends Dn{constructor(e=1,i=1,s=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:f};const p=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const m=[],d=[],v=[],_=[];let g=0,b=0;T("z","y","x",-1,-1,s,i,e,f,c,0),T("z","y","x",1,-1,s,i,-e,f,c,1),T("x","z","y",1,1,e,s,i,l,f,2),T("x","z","y",1,-1,e,s,-i,l,f,3),T("x","y","z",1,-1,e,i,s,l,c,4),T("x","y","z",-1,-1,e,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new sn(d,3)),this.setAttribute("normal",new sn(v,3)),this.setAttribute("uv",new sn(_,2));function T(C,M,x,N,z,w,G,L,I,A,O){const k=w/I,X=G/A,K=w/2,V=G/2,re=L/2,Z=I+1,P=A+1;let U=0,W=0;const se=new ne;for(let B=0;B<P;B++){const S=B*X-V;for(let H=0;H<Z;H++){const le=H*k-K;se[C]=le*N,se[M]=S*z,se[x]=re,d.push(se.x,se.y,se.z),se[C]=0,se[M]=0,se[x]=L>0?1:-1,v.push(se.x,se.y,se.z),_.push(H/I),_.push(1-B/A),U+=1}}for(let B=0;B<A;B++)for(let S=0;S<I;S++){const H=g+S+Z*B,le=g+S+Z*(B+1),ye=g+(S+1)+Z*(B+1),Te=g+(S+1)+Z*B;m.push(H,le,Te),m.push(le,ye,Te),W+=6}p.addGroup(b,W,O),b+=W,g+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class _p extends Dn{constructor(e=1,i=1,s=1,l=32,c=1,f=!1,p=0,m=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:i,height:s,radialSegments:l,heightSegments:c,openEnded:f,thetaStart:p,thetaLength:m};const d=this;l=Math.floor(l),c=Math.floor(c);const v=[],_=[],g=[],b=[];let T=0;const C=[],M=s/2;let x=0;N(),f===!1&&(e>0&&z(!0),i>0&&z(!1)),this.setIndex(v),this.setAttribute("position",new sn(_,3)),this.setAttribute("normal",new sn(g,3)),this.setAttribute("uv",new sn(b,2));function N(){const w=new ne,G=new ne;let L=0;const I=(i-e)/s;for(let A=0;A<=c;A++){const O=[],k=A/c,X=k*(i-e)+e;for(let K=0;K<=l;K++){const V=K/l,re=V*m+p,Z=Math.sin(re),P=Math.cos(re);G.x=X*Z,G.y=-k*s+M,G.z=X*P,_.push(G.x,G.y,G.z),w.set(Z,I,P).normalize(),g.push(w.x,w.y,w.z),b.push(V,1-k),O.push(T++)}C.push(O)}for(let A=0;A<l;A++)for(let O=0;O<c;O++){const k=C[O][A],X=C[O+1][A],K=C[O+1][A+1],V=C[O][A+1];(e>0||O!==0)&&(v.push(k,X,V),L+=3),(i>0||O!==c-1)&&(v.push(X,K,V),L+=3)}d.addGroup(x,L,0),x+=L}function z(w){const G=T,L=new xt,I=new ne;let A=0;const O=w===!0?e:i,k=w===!0?1:-1;for(let K=1;K<=l;K++)_.push(0,M*k,0),g.push(0,k,0),b.push(.5,.5),T++;const X=T;for(let K=0;K<=l;K++){const re=K/l*m+p,Z=Math.cos(re),P=Math.sin(re);I.x=O*P,I.y=M*k,I.z=O*Z,_.push(I.x,I.y,I.z),g.push(0,k,0),L.x=Z*.5+.5,L.y=P*.5*k+.5,b.push(L.x,L.y),T++}for(let K=0;K<l;K++){const V=G+K,re=X+K;w===!0?v.push(re,re+1,V):v.push(re+1,re,V),A+=3}d.addGroup(x,A,w===!0?1:2),x+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _p(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class xp extends Dn{constructor(e=[],i=[],s=1,l=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:i,radius:s,detail:l};const c=[],f=[];p(l),d(s),v(),this.setAttribute("position",new sn(c,3)),this.setAttribute("normal",new sn(c.slice(),3)),this.setAttribute("uv",new sn(f,2)),l===0?this.computeVertexNormals():this.normalizeNormals();function p(N){const z=new ne,w=new ne,G=new ne;for(let L=0;L<i.length;L+=3)b(i[L+0],z),b(i[L+1],w),b(i[L+2],G),m(z,w,G,N)}function m(N,z,w,G){const L=G+1,I=[];for(let A=0;A<=L;A++){I[A]=[];const O=N.clone().lerp(w,A/L),k=z.clone().lerp(w,A/L),X=L-A;for(let K=0;K<=X;K++)K===0&&A===L?I[A][K]=O:I[A][K]=O.clone().lerp(k,K/X)}for(let A=0;A<L;A++)for(let O=0;O<2*(L-A)-1;O++){const k=Math.floor(O/2);O%2===0?(g(I[A][k+1]),g(I[A+1][k]),g(I[A][k])):(g(I[A][k+1]),g(I[A+1][k+1]),g(I[A+1][k]))}}function d(N){const z=new ne;for(let w=0;w<c.length;w+=3)z.x=c[w+0],z.y=c[w+1],z.z=c[w+2],z.normalize().multiplyScalar(N),c[w+0]=z.x,c[w+1]=z.y,c[w+2]=z.z}function v(){const N=new ne;for(let z=0;z<c.length;z+=3){N.x=c[z+0],N.y=c[z+1],N.z=c[z+2];const w=M(N)/2/Math.PI+.5,G=x(N)/Math.PI+.5;f.push(w,1-G)}T(),_()}function _(){for(let N=0;N<f.length;N+=6){const z=f[N+0],w=f[N+2],G=f[N+4],L=Math.max(z,w,G),I=Math.min(z,w,G);L>.9&&I<.1&&(z<.2&&(f[N+0]+=1),w<.2&&(f[N+2]+=1),G<.2&&(f[N+4]+=1))}}function g(N){c.push(N.x,N.y,N.z)}function b(N,z){const w=N*3;z.x=e[w+0],z.y=e[w+1],z.z=e[w+2]}function T(){const N=new ne,z=new ne,w=new ne,G=new ne,L=new xt,I=new xt,A=new xt;for(let O=0,k=0;O<c.length;O+=9,k+=6){N.set(c[O+0],c[O+1],c[O+2]),z.set(c[O+3],c[O+4],c[O+5]),w.set(c[O+6],c[O+7],c[O+8]),L.set(f[k+0],f[k+1]),I.set(f[k+2],f[k+3]),A.set(f[k+4],f[k+5]),G.copy(N).add(z).add(w).divideScalar(3);const X=M(G);C(L,k+0,N,X),C(I,k+2,z,X),C(A,k+4,w,X)}}function C(N,z,w,G){G<0&&N.x===1&&(f[z]=N.x-1),w.x===0&&w.z===0&&(f[z]=G/2/Math.PI+.5)}function M(N){return Math.atan2(N.z,-N.x)}function x(N){return Math.atan2(-N.y,Math.sqrt(N.x*N.x+N.z*N.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xp(e.vertices,e.indices,e.radius,e.detail)}}const Wc=new ne,qc=new ne,nd=new ne,Yc=new Fi;class cb extends Dn{constructor(e=null,i=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:i},e!==null){const l=Math.pow(10,4),c=Math.cos(Qr*i),f=e.getIndex(),p=e.getAttribute("position"),m=f?f.count:p.count,d=[0,0,0],v=["a","b","c"],_=new Array(3),g={},b=[];for(let T=0;T<m;T+=3){f?(d[0]=f.getX(T),d[1]=f.getX(T+1),d[2]=f.getX(T+2)):(d[0]=T,d[1]=T+1,d[2]=T+2);const{a:C,b:M,c:x}=Yc;if(C.fromBufferAttribute(p,d[0]),M.fromBufferAttribute(p,d[1]),x.fromBufferAttribute(p,d[2]),Yc.getNormal(nd),_[0]=`${Math.round(C.x*l)},${Math.round(C.y*l)},${Math.round(C.z*l)}`,_[1]=`${Math.round(M.x*l)},${Math.round(M.y*l)},${Math.round(M.z*l)}`,_[2]=`${Math.round(x.x*l)},${Math.round(x.y*l)},${Math.round(x.z*l)}`,!(_[0]===_[1]||_[1]===_[2]||_[2]===_[0]))for(let N=0;N<3;N++){const z=(N+1)%3,w=_[N],G=_[z],L=Yc[v[N]],I=Yc[v[z]],A=`${w}_${G}`,O=`${G}_${w}`;O in g&&g[O]?(nd.dot(g[O].normal)<=c&&(b.push(L.x,L.y,L.z),b.push(I.x,I.y,I.z)),g[O]=null):A in g||(g[A]={index0:d[N],index1:d[z],normal:nd.clone()})}}for(const T in g)if(g[T]){const{index0:C,index1:M}=g[T];Wc.fromBufferAttribute(p,C),qc.fromBufferAttribute(p,M),b.push(Wc.x,Wc.y,Wc.z),b.push(qc.x,qc.y,qc.z)}this.setAttribute("position",new sn(b,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class yp extends xp{constructor(e=1,i=0){const s=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],l=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(s,l,e,i),this.type="OctahedronGeometry",this.parameters={radius:e,detail:i}}static fromJSON(e){return new yp(e.radius,e.detail)}}class gu extends Dn{constructor(e=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:l};const c=e/2,f=i/2,p=Math.floor(s),m=Math.floor(l),d=p+1,v=m+1,_=e/p,g=i/m,b=[],T=[],C=[],M=[];for(let x=0;x<v;x++){const N=x*g-f;for(let z=0;z<d;z++){const w=z*_-c;T.push(w,-N,0),C.push(0,0,1),M.push(z/p),M.push(1-x/m)}}for(let x=0;x<m;x++)for(let N=0;N<p;N++){const z=N+d*x,w=N+d*(x+1),G=N+1+d*(x+1),L=N+1+d*x;b.push(z,w,L),b.push(w,G,L)}this.setIndex(b),this.setAttribute("position",new sn(T,3)),this.setAttribute("normal",new sn(C,3)),this.setAttribute("uv",new sn(M,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gu(e.width,e.height,e.widthSegments,e.heightSegments)}}class Mp extends Dn{constructor(e=.5,i=1,s=32,l=1,c=0,f=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:i,thetaSegments:s,phiSegments:l,thetaStart:c,thetaLength:f},s=Math.max(3,s),l=Math.max(1,l);const p=[],m=[],d=[],v=[];let _=e;const g=(i-e)/l,b=new ne,T=new xt;for(let C=0;C<=l;C++){for(let M=0;M<=s;M++){const x=c+M/s*f;b.x=_*Math.cos(x),b.y=_*Math.sin(x),m.push(b.x,b.y,b.z),d.push(0,0,1),T.x=(b.x/i+1)/2,T.y=(b.y/i+1)/2,v.push(T.x,T.y)}_+=g}for(let C=0;C<l;C++){const M=C*(s+1);for(let x=0;x<s;x++){const N=x+M,z=N,w=N+s+1,G=N+s+2,L=N+1;p.push(z,w,L),p.push(w,G,L)}}this.setIndex(p),this.setAttribute("position",new sn(m,3)),this.setAttribute("normal",new sn(d,3)),this.setAttribute("uv",new sn(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mp(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Sp extends Dn{constructor(e=1,i=32,s=16,l=0,c=Math.PI*2,f=0,p=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:i,heightSegments:s,phiStart:l,phiLength:c,thetaStart:f,thetaLength:p},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const m=Math.min(f+p,Math.PI);let d=0;const v=[],_=new ne,g=new ne,b=[],T=[],C=[],M=[];for(let x=0;x<=s;x++){const N=[],z=x/s,w=f+z*p,G=e*Math.cos(w),L=Math.sqrt(e*e-G*G);let I=0;x===0&&f===0?I=.5/i:x===s&&m===Math.PI&&(I=-.5/i);for(let A=0;A<=i;A++){const O=A/i,k=l+O*c;_.x=-L*Math.cos(k),_.y=G,_.z=L*Math.sin(k),T.push(_.x,_.y,_.z),g.copy(_).normalize(),C.push(g.x,g.y,g.z),M.push(O+I,1-z),N.push(d++)}v.push(N)}for(let x=0;x<s;x++)for(let N=0;N<i;N++){const z=v[x][N+1],w=v[x][N],G=v[x+1][N],L=v[x+1][N+1];(x!==0||f>0)&&b.push(z,w,L),(x!==s-1||m<Math.PI)&&b.push(w,G,L)}this.setIndex(b),this.setAttribute("position",new sn(T,3)),this.setAttribute("normal",new sn(C,3)),this.setAttribute("uv",new sn(M,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sp(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function no(r){const e={};for(const i in r){e[i]={};for(const s in r[i]){const l=r[i][s];if(Qv(l))l.isRenderTargetTexture?(ft("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=l.clone();else if(Array.isArray(l))if(Qv(l[0])){const c=[];for(let f=0,p=l.length;f<p;f++)c[f]=l[f].clone();e[i][s]=c}else e[i][s]=l.slice();else e[i][s]=l}}return e}function ti(r){const e={};for(let i=0;i<r.length;i++){const s=no(r[i]);for(const l in s)e[l]=s[l]}return e}function Qv(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function ub(r){const e=[];for(let i=0;i<r.length;i++)e.push(r[i].clone());return e}function ex(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Dt.workingColorSpace}const fb={clone:no,merge:ti};var hb=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,db=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ua extends $s{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hb,this.fragmentShader=db,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=no(e.uniforms),this.uniformsGroups=ub(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(e).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}fromJSON(e,i){if(super.fromJSON(e,i),e.uniforms!==void 0)for(const s in e.uniforms){const l=e.uniforms[s];switch(this.uniforms[s]={},l.type){case"t":this.uniforms[s].value=i[l.value]||null;break;case"c":this.uniforms[s].value=new Qe().setHex(l.value);break;case"v2":this.uniforms[s].value=new xt().fromArray(l.value);break;case"v3":this.uniforms[s].value=new ne().fromArray(l.value);break;case"v4":this.uniforms[s].value=new hn().fromArray(l.value);break;case"m3":this.uniforms[s].value=new pt().fromArray(l.value);break;case"m4":this.uniforms[s].value=new fn().fromArray(l.value);break;default:this.uniforms[s].value=l.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const s in e.extensions)this.extensions[s]=e.extensions[s];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class pb extends ua{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class bi extends $s{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qd,this.normalScale=new xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ms,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class mb extends bi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new xt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Et(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(i){this.ior=(1+.4*i)/(1-.4*i)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Qe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Qe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Qe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class gb extends $s{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=oS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class vb extends $s{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class bp extends zn{constructor(e,i=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=i}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,i){return super.copy(e,i),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const i=super.toJSON(e);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,i}}const id=new fn,Jv=new ne,$v=new ne;class tx{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xt(512,512),this.mapType=Ti,this.map=null,this.mapPass=null,this.matrix=new fn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new gp,this._frameExtents=new xt(1,1),this._viewportCount=1,this._viewports=[new hn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const i=this.camera,s=this.matrix;Jv.setFromMatrixPosition(e.matrixWorld),i.position.copy(Jv),$v.setFromMatrixPosition(e.target.matrixWorld),i.lookAt($v),i.updateMatrixWorld(),id.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(id,i.coordinateSystem,i.reversedDepth),i.coordinateSystem===cl||i.reversedDepth?s.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(id)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Zc=new ne,jc=new ao,ea=new ne;class nx extends zn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new fn,this.projectionMatrix=new fn,this.projectionMatrixInverse=new fn,this.coordinateSystem=ra,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Zc,jc,ea),ea.x===1&&ea.y===1&&ea.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zc,jc,ea.set(1,1,1)).invert()}updateWorldMatrix(e,i,s=!1){super.updateWorldMatrix(e,i,s),this.matrixWorld.decompose(Zc,jc,ea),ea.x===1&&ea.y===1&&ea.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zc,jc,ea.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const vs=new ne,e_=new xt,t_=new xt;class Ei extends nx{constructor(e=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=ul*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Qr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ul*2*Math.atan(Math.tan(Qr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){vs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(vs.x,vs.y).multiplyScalar(-e/vs.z),vs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(vs.x,vs.y).multiplyScalar(-e/vs.z)}getViewSize(e,i){return this.getViewBounds(e,e_,t_),i.subVectors(t_,e_)}setViewOffset(e,i,s,l,c,f){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(Qr*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,d=f.fullHeight;c+=f.offsetX*l/m,i-=f.offsetY*s/d,l*=f.width/m,s*=f.height/d}const p=this.filmOffset;p!==0&&(c+=e*p/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class _b extends tx{constructor(){super(new Ei(90,1,.5,500)),this.isPointLightShadow=!0}}class au extends bp{constructor(e,i,s=0,l=2){super(e,i),this.isPointLight=!0,this.type="PointLight",this.distance=s,this.decay=l,this.shadow=new _b}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,i){return super.copy(e,i),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const i=super.toJSON(e);return i.object.distance=this.distance,i.object.decay=this.decay,i.object.shadow=this.shadow.toJSON(),i}}class Ep extends nx{constructor(e=-1,i=1,s=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-e,f=s+e,p=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=d*this.view.offsetX,f=c+d*this.view.width,p-=v*this.view.offsetY,m=p-v*this.view.height}this.projectionMatrix.makeOrthographic(c,f,p,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class xb extends tx{constructor(){super(new Ep(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class yb extends bp{constructor(e,i){super(e,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(zn.DEFAULT_UP),this.updateMatrix(),this.target=new zn,this.shadow=new xb}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const i=super.toJSON(e);return i.object.shadow=this.shadow.toJSON(),i.object.target=this.target.uuid,i}}class Mb extends bp{constructor(e,i){super(e,i),this.isAmbientLight=!0,this.type="AmbientLight"}}const kr=-90,Xr=1;class Sb extends zn{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Ei(kr,Xr,e,i);l.layers=this.layers,this.add(l);const c=new Ei(kr,Xr,e,i);c.layers=this.layers,this.add(c);const f=new Ei(kr,Xr,e,i);f.layers=this.layers,this.add(f);const p=new Ei(kr,Xr,e,i);p.layers=this.layers,this.add(p);const m=new Ei(kr,Xr,e,i);m.layers=this.layers,this.add(m);const d=new Ei(kr,Xr,e,i);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,l,c,f,p,m]=i;for(const d of i)this.remove(d);if(e===ra)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),p.up.set(0,1,0),p.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===cl)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),p.up.set(0,-1,0),p.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const d of i)this.add(d),d.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,f,p,m,d,v]=this.children,_=e.getRenderTarget(),g=e.getActiveCubeFace(),b=e.getActiveMipmapLevel(),T=e.xr.enabled;e.xr.enabled=!1;const C=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let M=!1;e.isWebGLRenderer===!0?M=e.state.buffers.depth.getReversed():M=e.reversedDepthBuffer,e.setRenderTarget(s,0,l),M&&e.autoClear===!1&&e.clearDepth(),e.render(i,c),e.setRenderTarget(s,1,l),M&&e.autoClear===!1&&e.clearDepth(),e.render(i,f),e.setRenderTarget(s,2,l),M&&e.autoClear===!1&&e.clearDepth(),e.render(i,p),e.setRenderTarget(s,3,l),M&&e.autoClear===!1&&e.clearDepth(),e.render(i,m),e.setRenderTarget(s,4,l),M&&e.autoClear===!1&&e.clearDepth(),e.render(i,d),s.texture.generateMipmaps=C,e.setRenderTarget(s,5,l),M&&e.autoClear===!1&&e.clearDepth(),e.render(i,v),e.setRenderTarget(_,g,b),e.xr.enabled=T,s.texture.needsPMREMUpdate=!0}}class bb extends Ei{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Lp=class Lp{constructor(e,i,s,l){this.elements=[1,0,0,1],e!==void 0&&this.set(e,i,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(e,i=0){for(let s=0;s<4;s++)this.elements[s]=e[s+i];return this}set(e,i,s,l){const c=this.elements;return c[0]=e,c[2]=i,c[1]=s,c[3]=l,this}};Lp.prototype.isMatrix2=!0;let n_=Lp;class Eb extends vp{constructor(e=10,i=10,s=4473924,l=8947848){s=new Qe(s),l=new Qe(l);const c=i/2,f=e/i,p=e/2,m=[],d=[];for(let g=0,b=0,T=-p;g<=i;g++,T+=f){m.push(-p,0,T,p,0,T),m.push(T,0,-p,T,0,p);const C=g===c?s:l;C.toArray(d,b),b+=3,C.toArray(d,b),b+=3,C.toArray(d,b),b+=3,C.toArray(d,b),b+=3}const v=new Dn;v.setAttribute("position",new sn(m,3)),v.setAttribute("color",new sn(d,3));const _=new mu({vertexColors:!0,toneMapped:!1});super(v,_),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}function i_(r,e,i,s){const l=Tb(s);switch(i){case V_:return r*e;case X_:return r*e/l.components*l.byteLength;case op:return r*e/l.components*l.byteLength;case Qs:return r*e*2/l.components*l.byteLength;case lp:return r*e*2/l.components*l.byteLength;case k_:return r*e*3/l.components*l.byteLength;case Zi:return r*e*4/l.components*l.byteLength;case cp:return r*e*4/l.components*l.byteLength;case eu:case tu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case nu:case iu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Sd:case Ed:return Math.max(r,16)*Math.max(e,8)/4;case Md:case bd:return Math.max(r,8)*Math.max(e,8)/2;case Td:case Ad:case Rd:case Cd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case wd:case ru:case Dd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Nd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ud:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Ld:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Od:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Pd:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Id:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case zd:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Bd:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Fd:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Gd:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Hd:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Vd:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case kd:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Xd:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Wd:case qd:case Yd:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Zd:case jd:return Math.ceil(r/4)*Math.ceil(e/4)*8;case ou:case Kd:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function Tb(r){switch(r){case Ti:case B_:return{byteLength:1,components:1};case ol:case F_:case Fa:return{byteLength:2,components:1};case sp:case rp:return{byteLength:2,components:4};case ca:case ap:case sa:return{byteLength:4,components:1};case G_:case H_:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:np}}));typeof window<"u"&&(window.__THREE__?ft("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=np);function ix(){let r=null,e=!1,i=null,s=null;function l(c,f){i(c,f),s=r.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&r!==null&&(s=r.requestAnimationFrame(l),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function Ab(r){const e=new WeakMap;function i(p,m){const d=p.array,v=p.usage,_=d.byteLength,g=r.createBuffer();r.bindBuffer(m,g),r.bufferData(m,d,v),p.onUploadCallback();let b;if(d instanceof Float32Array)b=r.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)b=r.HALF_FLOAT;else if(d instanceof Uint16Array)p.isFloat16BufferAttribute?b=r.HALF_FLOAT:b=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)b=r.SHORT;else if(d instanceof Uint32Array)b=r.UNSIGNED_INT;else if(d instanceof Int32Array)b=r.INT;else if(d instanceof Int8Array)b=r.BYTE;else if(d instanceof Uint8Array)b=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)b=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:b,bytesPerElement:d.BYTES_PER_ELEMENT,version:p.version,size:_}}function s(p,m,d){const v=m.array,_=m.updateRanges;if(r.bindBuffer(d,p),_.length===0)r.bufferSubData(d,0,v);else{_.sort((b,T)=>b.start-T.start);let g=0;for(let b=1;b<_.length;b++){const T=_[g],C=_[b];C.start<=T.start+T.count+1?T.count=Math.max(T.count,C.start+C.count-T.start):(++g,_[g]=C)}_.length=g+1;for(let b=0,T=_.length;b<T;b++){const C=_[b];r.bufferSubData(d,C.start*v.BYTES_PER_ELEMENT,v,C.start,C.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(p){return p.isInterleavedBufferAttribute&&(p=p.data),e.get(p)}function c(p){p.isInterleavedBufferAttribute&&(p=p.data);const m=e.get(p);m&&(r.deleteBuffer(m.buffer),e.delete(p))}function f(p,m){if(p.isInterleavedBufferAttribute&&(p=p.data),p.isGLBufferAttribute){const v=e.get(p);(!v||v.version<p.version)&&e.set(p,{buffer:p.buffer,type:p.type,bytesPerElement:p.elementSize,version:p.version});return}const d=e.get(p);if(d===void 0)e.set(p,i(p,m));else if(d.version<p.version){if(d.size!==p.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(d.buffer,p,m),d.version=p.version}}return{get:l,remove:c,update:f}}var wb=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Rb=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Cb=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Db=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nb=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ub=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lb=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ob=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Pb=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Ib=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zb=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fb=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gb=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hb=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Vb=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,kb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Yb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Zb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,jb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Kb=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Qb=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Jb=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,$b=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,e1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,t1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,n1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,i1="gl_FragColor = linearToOutputTexel( gl_FragColor );",a1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,s1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,r1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,o1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,l1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,c1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,u1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,f1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,h1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,d1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,p1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,m1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,g1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,v1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,x1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,y1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,M1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,S1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,b1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,E1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,T1=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,A1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,w1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,R1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,C1=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,D1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,N1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,U1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,L1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,O1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,P1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,I1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,z1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,B1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,F1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,G1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,H1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,V1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,k1=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,X1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,W1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,q1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Y1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Z1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,j1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,K1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Q1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,J1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,eE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,iE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,aE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,rE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,oE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,uE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,fE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,hE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,dE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,pE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,mE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,gE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,vE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_E=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yE=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ME=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,SE=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,bE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,EE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,TE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,AE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const wE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,RE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,CE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,DE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,NE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,UE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,LE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,OE=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,PE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,IE=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,zE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,BE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,FE=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,GE=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,HE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,VE=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kE=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,XE=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,WE=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,qE=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,YE=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ZE=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,jE=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,KE=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,QE=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,JE=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$E=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,eT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,nT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,iT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,aT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,_t={alphahash_fragment:wb,alphahash_pars_fragment:Rb,alphamap_fragment:Cb,alphamap_pars_fragment:Db,alphatest_fragment:Nb,alphatest_pars_fragment:Ub,aomap_fragment:Lb,aomap_pars_fragment:Ob,batching_pars_vertex:Pb,batching_vertex:Ib,begin_vertex:zb,beginnormal_vertex:Bb,bsdfs:Fb,iridescence_fragment:Gb,bumpmap_pars_fragment:Hb,clipping_planes_fragment:Vb,clipping_planes_pars_fragment:kb,clipping_planes_pars_vertex:Xb,clipping_planes_vertex:Wb,color_fragment:qb,color_pars_fragment:Yb,color_pars_vertex:Zb,color_vertex:jb,common:Kb,cube_uv_reflection_fragment:Qb,defaultnormal_vertex:Jb,displacementmap_pars_vertex:$b,displacementmap_vertex:e1,emissivemap_fragment:t1,emissivemap_pars_fragment:n1,colorspace_fragment:i1,colorspace_pars_fragment:a1,envmap_fragment:s1,envmap_common_pars_fragment:r1,envmap_pars_fragment:o1,envmap_pars_vertex:l1,envmap_physical_pars_fragment:x1,envmap_vertex:c1,fog_vertex:u1,fog_pars_vertex:f1,fog_fragment:h1,fog_pars_fragment:d1,gradientmap_pars_fragment:p1,lightmap_pars_fragment:m1,lights_lambert_fragment:g1,lights_lambert_pars_fragment:v1,lights_pars_begin:_1,lights_toon_fragment:y1,lights_toon_pars_fragment:M1,lights_phong_fragment:S1,lights_phong_pars_fragment:b1,lights_physical_fragment:E1,lights_physical_pars_fragment:T1,lights_fragment_begin:A1,lights_fragment_maps:w1,lights_fragment_end:R1,lightprobes_pars_fragment:C1,logdepthbuf_fragment:D1,logdepthbuf_pars_fragment:N1,logdepthbuf_pars_vertex:U1,logdepthbuf_vertex:L1,map_fragment:O1,map_pars_fragment:P1,map_particle_fragment:I1,map_particle_pars_fragment:z1,metalnessmap_fragment:B1,metalnessmap_pars_fragment:F1,morphinstance_vertex:G1,morphcolor_vertex:H1,morphnormal_vertex:V1,morphtarget_pars_vertex:k1,morphtarget_vertex:X1,normal_fragment_begin:W1,normal_fragment_maps:q1,normal_pars_fragment:Y1,normal_pars_vertex:Z1,normal_vertex:j1,normalmap_pars_fragment:K1,clearcoat_normal_fragment_begin:Q1,clearcoat_normal_fragment_maps:J1,clearcoat_pars_fragment:$1,iridescence_pars_fragment:eE,opaque_fragment:tE,packing:nE,premultiplied_alpha_fragment:iE,project_vertex:aE,dithering_fragment:sE,dithering_pars_fragment:rE,roughnessmap_fragment:oE,roughnessmap_pars_fragment:lE,shadowmap_pars_fragment:cE,shadowmap_pars_vertex:uE,shadowmap_vertex:fE,shadowmask_pars_fragment:hE,skinbase_vertex:dE,skinning_pars_vertex:pE,skinning_vertex:mE,skinnormal_vertex:gE,specularmap_fragment:vE,specularmap_pars_fragment:_E,tonemapping_fragment:xE,tonemapping_pars_fragment:yE,transmission_fragment:ME,transmission_pars_fragment:SE,uv_pars_fragment:bE,uv_pars_vertex:EE,uv_vertex:TE,worldpos_vertex:AE,background_vert:wE,background_frag:RE,backgroundCube_vert:CE,backgroundCube_frag:DE,cube_vert:NE,cube_frag:UE,depth_vert:LE,depth_frag:OE,distance_vert:PE,distance_frag:IE,equirect_vert:zE,equirect_frag:BE,linedashed_vert:FE,linedashed_frag:GE,meshbasic_vert:HE,meshbasic_frag:VE,meshlambert_vert:kE,meshlambert_frag:XE,meshmatcap_vert:WE,meshmatcap_frag:qE,meshnormal_vert:YE,meshnormal_frag:ZE,meshphong_vert:jE,meshphong_frag:KE,meshphysical_vert:QE,meshphysical_frag:JE,meshtoon_vert:$E,meshtoon_frag:eT,points_vert:tT,points_frag:nT,shadow_vert:iT,shadow_frag:aT,sprite_vert:sT,sprite_frag:rT},He={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new pt}},envmap:{envMap:{value:null},envMapRotation:{value:new pt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new pt},normalScale:{value:new xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new ne},probesMax:{value:new ne},probesResolution:{value:new ne}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0},uvTransform:{value:new pt}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}}},ia={basic:{uniforms:ti([He.common,He.specularmap,He.envmap,He.aomap,He.lightmap,He.fog]),vertexShader:_t.meshbasic_vert,fragmentShader:_t.meshbasic_frag},lambert:{uniforms:ti([He.common,He.specularmap,He.envmap,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.fog,He.lights,{emissive:{value:new Qe(0)},envMapIntensity:{value:1}}]),vertexShader:_t.meshlambert_vert,fragmentShader:_t.meshlambert_frag},phong:{uniforms:ti([He.common,He.specularmap,He.envmap,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.fog,He.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:_t.meshphong_vert,fragmentShader:_t.meshphong_frag},standard:{uniforms:ti([He.common,He.envmap,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.roughnessmap,He.metalnessmap,He.fog,He.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:_t.meshphysical_vert,fragmentShader:_t.meshphysical_frag},toon:{uniforms:ti([He.common,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.gradientmap,He.fog,He.lights,{emissive:{value:new Qe(0)}}]),vertexShader:_t.meshtoon_vert,fragmentShader:_t.meshtoon_frag},matcap:{uniforms:ti([He.common,He.bumpmap,He.normalmap,He.displacementmap,He.fog,{matcap:{value:null}}]),vertexShader:_t.meshmatcap_vert,fragmentShader:_t.meshmatcap_frag},points:{uniforms:ti([He.points,He.fog]),vertexShader:_t.points_vert,fragmentShader:_t.points_frag},dashed:{uniforms:ti([He.common,He.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:_t.linedashed_vert,fragmentShader:_t.linedashed_frag},depth:{uniforms:ti([He.common,He.displacementmap]),vertexShader:_t.depth_vert,fragmentShader:_t.depth_frag},normal:{uniforms:ti([He.common,He.bumpmap,He.normalmap,He.displacementmap,{opacity:{value:1}}]),vertexShader:_t.meshnormal_vert,fragmentShader:_t.meshnormal_frag},sprite:{uniforms:ti([He.sprite,He.fog]),vertexShader:_t.sprite_vert,fragmentShader:_t.sprite_frag},background:{uniforms:{uvTransform:{value:new pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:_t.background_vert,fragmentShader:_t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new pt}},vertexShader:_t.backgroundCube_vert,fragmentShader:_t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:_t.cube_vert,fragmentShader:_t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:_t.equirect_vert,fragmentShader:_t.equirect_frag},distance:{uniforms:ti([He.common,He.displacementmap,{referencePosition:{value:new ne},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:_t.distance_vert,fragmentShader:_t.distance_frag},shadow:{uniforms:ti([He.lights,He.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:_t.shadow_vert,fragmentShader:_t.shadow_frag}};ia.physical={uniforms:ti([ia.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new pt},clearcoatNormalScale:{value:new xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new pt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new pt},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new pt},transmissionSamplerSize:{value:new xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new pt},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new pt},anisotropyVector:{value:new xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new pt}}]),vertexShader:_t.meshphysical_vert,fragmentShader:_t.meshphysical_frag};const Kc={r:0,b:0,g:0},oT=new fn,ax=new pt;ax.set(-1,0,0,0,1,0,0,0,1);function lT(r,e,i,s,l,c){const f=new Qe(0);let p=l===!0?0:1,m,d,v=null,_=0,g=null;function b(N){let z=N.isScene===!0?N.background:null;if(z&&z.isTexture){const w=N.backgroundBlurriness>0;z=e.get(z,w)}return z}function T(N){let z=!1;const w=b(N);w===null?M(f,p):w&&w.isColor&&(M(w,1),z=!0);const G=r.xr.getEnvironmentBlendMode();G==="additive"?i.buffers.color.setClear(0,0,0,1,c):G==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(r.autoClear||z)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function C(N,z){const w=b(z);w&&(w.isCubeTexture||w.mapping===pu)?(d===void 0&&(d=new yn(new Bi(1,1,1),new ua({name:"BackgroundCubeMaterial",uniforms:no(ia.backgroundCube.uniforms),vertexShader:ia.backgroundCube.vertexShader,fragmentShader:ia.backgroundCube.fragmentShader,side:fi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(G,L,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),d.material.uniforms.envMap.value=w,d.material.uniforms.backgroundBlurriness.value=z.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=z.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(oT.makeRotationFromEuler(z.backgroundRotation)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(ax),d.material.toneMapped=Dt.getTransfer(w.colorSpace)!==Kt,(v!==w||_!==w.version||g!==r.toneMapping)&&(d.material.needsUpdate=!0,v=w,_=w.version,g=r.toneMapping),d.layers.enableAll(),N.unshift(d,d.geometry,d.material,0,0,null)):w&&w.isTexture&&(m===void 0&&(m=new yn(new gu(2,2),new ua({name:"BackgroundMaterial",uniforms:no(ia.background.uniforms),vertexShader:ia.background.vertexShader,fragmentShader:ia.background.fragmentShader,side:ys,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(m)),m.material.uniforms.t2D.value=w,m.material.uniforms.backgroundIntensity.value=z.backgroundIntensity,m.material.toneMapped=Dt.getTransfer(w.colorSpace)!==Kt,w.matrixAutoUpdate===!0&&w.updateMatrix(),m.material.uniforms.uvTransform.value.copy(w.matrix),(v!==w||_!==w.version||g!==r.toneMapping)&&(m.material.needsUpdate=!0,v=w,_=w.version,g=r.toneMapping),m.layers.enableAll(),N.unshift(m,m.geometry,m.material,0,0,null))}function M(N,z){N.getRGB(Kc,ex(r)),i.buffers.color.setClear(Kc.r,Kc.g,Kc.b,z,c)}function x(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return f},setClearColor:function(N,z=1){f.set(N),p=z,M(f,p)},getClearAlpha:function(){return p},setClearAlpha:function(N){p=N,M(f,p)},render:T,addToRenderList:C,dispose:x}}function cT(r,e){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=g(null);let c=l,f=!1;function p(X,K,V,re,Z){let P=!1;const U=_(X,re,V,K);c!==U&&(c=U,d(c.object)),P=b(X,re,V,Z),P&&T(X,re,V,Z),Z!==null&&e.update(Z,r.ELEMENT_ARRAY_BUFFER),(P||f)&&(f=!1,w(X,K,V,re),Z!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(Z).buffer))}function m(){return r.createVertexArray()}function d(X){return r.bindVertexArray(X)}function v(X){return r.deleteVertexArray(X)}function _(X,K,V,re){const Z=re.wireframe===!0;let P=s[K.id];P===void 0&&(P={},s[K.id]=P);const U=X.isInstancedMesh===!0?X.id:0;let W=P[U];W===void 0&&(W={},P[U]=W);let se=W[V.id];se===void 0&&(se={},W[V.id]=se);let B=se[Z];return B===void 0&&(B=g(m()),se[Z]=B),B}function g(X){const K=[],V=[],re=[];for(let Z=0;Z<i;Z++)K[Z]=0,V[Z]=0,re[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:K,enabledAttributes:V,attributeDivisors:re,object:X,attributes:{},index:null}}function b(X,K,V,re){const Z=c.attributes,P=K.attributes;let U=0;const W=V.getAttributes();for(const se in W)if(W[se].location>=0){const S=Z[se];let H=P[se];if(H===void 0&&(se==="instanceMatrix"&&X.instanceMatrix&&(H=X.instanceMatrix),se==="instanceColor"&&X.instanceColor&&(H=X.instanceColor)),S===void 0||S.attribute!==H||H&&S.data!==H.data)return!0;U++}return c.attributesNum!==U||c.index!==re}function T(X,K,V,re){const Z={},P=K.attributes;let U=0;const W=V.getAttributes();for(const se in W)if(W[se].location>=0){let S=P[se];S===void 0&&(se==="instanceMatrix"&&X.instanceMatrix&&(S=X.instanceMatrix),se==="instanceColor"&&X.instanceColor&&(S=X.instanceColor));const H={};H.attribute=S,S&&S.data&&(H.data=S.data),Z[se]=H,U++}c.attributes=Z,c.attributesNum=U,c.index=re}function C(){const X=c.newAttributes;for(let K=0,V=X.length;K<V;K++)X[K]=0}function M(X){x(X,0)}function x(X,K){const V=c.newAttributes,re=c.enabledAttributes,Z=c.attributeDivisors;V[X]=1,re[X]===0&&(r.enableVertexAttribArray(X),re[X]=1),Z[X]!==K&&(r.vertexAttribDivisor(X,K),Z[X]=K)}function N(){const X=c.newAttributes,K=c.enabledAttributes;for(let V=0,re=K.length;V<re;V++)K[V]!==X[V]&&(r.disableVertexAttribArray(V),K[V]=0)}function z(X,K,V,re,Z,P,U){U===!0?r.vertexAttribIPointer(X,K,V,Z,P):r.vertexAttribPointer(X,K,V,re,Z,P)}function w(X,K,V,re){C();const Z=re.attributes,P=V.getAttributes(),U=K.defaultAttributeValues;for(const W in P){const se=P[W];if(se.location>=0){let B=Z[W];if(B===void 0&&(W==="instanceMatrix"&&X.instanceMatrix&&(B=X.instanceMatrix),W==="instanceColor"&&X.instanceColor&&(B=X.instanceColor)),B!==void 0){const S=B.normalized,H=B.itemSize,le=e.get(B);if(le===void 0)continue;const ye=le.buffer,Te=le.type,$=le.bytesPerElement,ce=Te===r.INT||Te===r.UNSIGNED_INT||B.gpuType===ap;if(B.isInterleavedBufferAttribute){const ve=B.data,Ce=ve.stride,Ve=B.offset;if(ve.isInstancedInterleavedBuffer){for(let Ie=0;Ie<se.locationSize;Ie++)x(se.location+Ie,ve.meshPerAttribute);X.isInstancedMesh!==!0&&re._maxInstanceCount===void 0&&(re._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let Ie=0;Ie<se.locationSize;Ie++)M(se.location+Ie);r.bindBuffer(r.ARRAY_BUFFER,ye);for(let Ie=0;Ie<se.locationSize;Ie++)z(se.location+Ie,H/se.locationSize,Te,S,Ce*$,(Ve+H/se.locationSize*Ie)*$,ce)}else{if(B.isInstancedBufferAttribute){for(let ve=0;ve<se.locationSize;ve++)x(se.location+ve,B.meshPerAttribute);X.isInstancedMesh!==!0&&re._maxInstanceCount===void 0&&(re._maxInstanceCount=B.meshPerAttribute*B.count)}else for(let ve=0;ve<se.locationSize;ve++)M(se.location+ve);r.bindBuffer(r.ARRAY_BUFFER,ye);for(let ve=0;ve<se.locationSize;ve++)z(se.location+ve,H/se.locationSize,Te,S,H*$,H/se.locationSize*ve*$,ce)}}else if(U!==void 0){const S=U[W];if(S!==void 0)switch(S.length){case 2:r.vertexAttrib2fv(se.location,S);break;case 3:r.vertexAttrib3fv(se.location,S);break;case 4:r.vertexAttrib4fv(se.location,S);break;default:r.vertexAttrib1fv(se.location,S)}}}}N()}function G(){O();for(const X in s){const K=s[X];for(const V in K){const re=K[V];for(const Z in re){const P=re[Z];for(const U in P)v(P[U].object),delete P[U];delete re[Z]}}delete s[X]}}function L(X){if(s[X.id]===void 0)return;const K=s[X.id];for(const V in K){const re=K[V];for(const Z in re){const P=re[Z];for(const U in P)v(P[U].object),delete P[U];delete re[Z]}}delete s[X.id]}function I(X){for(const K in s){const V=s[K];for(const re in V){const Z=V[re];if(Z[X.id]===void 0)continue;const P=Z[X.id];for(const U in P)v(P[U].object),delete P[U];delete Z[X.id]}}}function A(X){for(const K in s){const V=s[K],re=X.isInstancedMesh===!0?X.id:0,Z=V[re];if(Z!==void 0){for(const P in Z){const U=Z[P];for(const W in U)v(U[W].object),delete U[W];delete Z[P]}delete V[re],Object.keys(V).length===0&&delete s[K]}}}function O(){k(),f=!0,c!==l&&(c=l,d(c.object))}function k(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:p,reset:O,resetDefaultState:k,dispose:G,releaseStatesOfGeometry:L,releaseStatesOfObject:A,releaseStatesOfProgram:I,initAttributes:C,enableAttribute:M,disableUnusedAttributes:N}}function uT(r,e,i){let s;function l(m){s=m}function c(m,d){r.drawArrays(s,m,d),i.update(d,s,1)}function f(m,d,v){v!==0&&(r.drawArraysInstanced(s,m,d,v),i.update(d,s,v))}function p(m,d,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,d,0,v);let g=0;for(let b=0;b<v;b++)g+=d[b];i.update(g,s,1)}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=p}function fT(r,e,i,s){let l;function c(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");l=r.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(I){return!(I!==Zi&&s.convert(I)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function p(I){const A=I===Fa&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==Ti&&s.convert(I)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==sa&&!A)}function m(I){if(I==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=i.precision!==void 0?i.precision:"highp";const v=m(d);v!==d&&(ft("WebGLRenderer:",d,"not supported, using",v,"instead."),d=v);const _=i.logarithmicDepthBuffer===!0,g=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control");i.reversedDepthBuffer===!0&&g===!1&&ft("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const b=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),T=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),C=r.getParameter(r.MAX_TEXTURE_SIZE),M=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),x=r.getParameter(r.MAX_VERTEX_ATTRIBS),N=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),z=r.getParameter(r.MAX_VARYING_VECTORS),w=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),G=r.getParameter(r.MAX_SAMPLES),L=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:p,precision:d,logarithmicDepthBuffer:_,reversedDepthBuffer:g,maxTextures:b,maxVertexTextures:T,maxTextureSize:C,maxCubemapSize:M,maxAttributes:x,maxVertexUniforms:N,maxVaryings:z,maxFragmentUniforms:w,maxSamples:G,samples:L}}function hT(r){const e=this;let i=null,s=0,l=!1,c=!1;const f=new Xs,p=new pt,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,g){const b=_.length!==0||g||s!==0||l;return l=g,s=_.length,b},this.beginShadows=function(){c=!0,v(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,g){i=v(_,g,0)},this.setState=function(_,g,b){const T=_.clippingPlanes,C=_.clipIntersection,M=_.clipShadows,x=r.get(_);if(!l||T===null||T.length===0||c&&!M)c?v(null):d();else{const N=c?0:s,z=N*4;let w=x.clippingState||null;m.value=w,w=v(T,g,z,b);for(let G=0;G!==z;++G)w[G]=i[G];x.clippingState=w,this.numIntersection=C?this.numPlanes:0,this.numPlanes+=N}};function d(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function v(_,g,b,T){const C=_!==null?_.length:0;let M=null;if(C!==0){if(M=m.value,T!==!0||M===null){const x=b+C*4,N=g.matrixWorldInverse;p.getNormalMatrix(N),(M===null||M.length<x)&&(M=new Float32Array(x));for(let z=0,w=b;z!==C;++z,w+=4)f.copy(_[z]).applyMatrix4(N,p),f.normal.toArray(M,w),M[w+3]=f.constant}m.value=M,m.needsUpdate=!0}return e.numPlanes=C,e.numIntersection=0,M}}const xs=4,a_=[.125,.215,.35,.446,.526,.582],qs=20,dT=256,tl=new Ep,s_=new Qe;let ad=null,sd=0,rd=0,od=!1;const pT=new ne;class r_{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,s=.1,l=100,c={}){const{size:f=256,position:p=pT}=c;ad=this._renderer.getRenderTarget(),sd=this._renderer.getActiveCubeFace(),rd=this._renderer.getActiveMipmapLevel(),od=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,s,l,m,p),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=c_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=l_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ad,sd,rd),this._renderer.xr.enabled=od,e.scissorTest=!1,Wr(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===Ks||e.mapping===eo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ad=this._renderer.getRenderTarget(),sd=this._renderer.getActiveCubeFace(),rd=this._renderer.getActiveMipmapLevel(),od=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Qn,minFilter:Qn,generateMipmaps:!1,type:Fa,format:Zi,colorSpace:lu,depthBuffer:!1},l=o_(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=o_(e,i,s);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=mT(c)),this._blurMaterial=vT(c,e,i),this._ggxMaterial=gT(c,e,i)}return l}_compileMaterial(e){const i=new yn(new Dn,e);this._renderer.compile(i,tl)}_sceneToCubeUV(e,i,s,l,c){const m=new Ei(90,1,i,s),d=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],_=this._renderer,g=_.autoClear,b=_.toneMapping;_.getClearColor(s_),_.toneMapping=oa,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(l),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new yn(new Bi,new fl({name:"PMREM.Background",side:fi,depthWrite:!1,depthTest:!1})));const C=this._backgroundBox,M=C.material;let x=!1;const N=e.background;N?N.isColor&&(M.color.copy(N),e.background=null,x=!0):(M.color.copy(s_),x=!0);for(let z=0;z<6;z++){const w=z%3;w===0?(m.up.set(0,d[z],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+v[z],c.y,c.z)):w===1?(m.up.set(0,0,d[z]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+v[z],c.z)):(m.up.set(0,d[z],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+v[z]));const G=this._cubeSize;Wr(l,w*G,z>2?G:0,G,G),_.setRenderTarget(l),x&&_.render(C,m),_.render(e,m)}_.toneMapping=b,_.autoClear=g,e.background=N}_textureToCubeUV(e,i){const s=this._renderer,l=e.mapping===Ks||e.mapping===eo;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=c_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=l_());const c=l?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=c;const p=c.uniforms;p.envMap.value=e;const m=this._cubeSize;Wr(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(f,tl)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(e,c-1,c);i.autoClear=s}_applyGGXFilter(e,i,s){const l=this._renderer,c=this._pingPongRenderTarget,f=this._ggxMaterial,p=this._lodMeshes[s];p.material=f;const m=f.uniforms,d=s/(this._lodMeshes.length-1),v=i/(this._lodMeshes.length-1),_=Math.sqrt(d*d-v*v),g=0+d*1.25,b=_*g,{_lodMax:T}=this,C=this._sizeLods[s],M=3*C*(s>T-xs?s-T+xs:0),x=4*(this._cubeSize-C);m.envMap.value=e.texture,m.roughness.value=b,m.mipInt.value=T-i,Wr(c,M,x,3*C,2*C),l.setRenderTarget(c),l.render(p,tl),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=T-s,Wr(e,M,x,3*C,2*C),l.setRenderTarget(e),l.render(p,tl)}_blur(e,i,s,l,c){const f=this._pingPongRenderTarget;this._halfBlur(e,f,i,s,l,"latitudinal",c),this._halfBlur(f,e,s,s,l,"longitudinal",c)}_halfBlur(e,i,s,l,c,f,p){const m=this._renderer,d=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&It("blur direction must be either latitudinal or longitudinal!");const v=3,_=this._lodMeshes[l];_.material=d;const g=d.uniforms,b=this._sizeLods[s]-1,T=isFinite(c)?Math.PI/(2*b):2*Math.PI/(2*qs-1),C=c/T,M=isFinite(c)?1+Math.floor(v*C):qs;M>qs&&ft(`sigmaRadians, ${c}, is too large and will clip, as it requested ${M} samples when the maximum is set to ${qs}`);const x=[];let N=0;for(let I=0;I<qs;++I){const A=I/C,O=Math.exp(-A*A/2);x.push(O),I===0?N+=O:I<M&&(N+=2*O)}for(let I=0;I<x.length;I++)x[I]=x[I]/N;g.envMap.value=e.texture,g.samples.value=M,g.weights.value=x,g.latitudinal.value=f==="latitudinal",p&&(g.poleAxis.value=p);const{_lodMax:z}=this;g.dTheta.value=T,g.mipInt.value=z-s;const w=this._sizeLods[l],G=3*w*(l>z-xs?l-z+xs:0),L=4*(this._cubeSize-w);Wr(i,G,L,3*w,2*w),m.setRenderTarget(i),m.render(_,tl)}}function mT(r){const e=[],i=[],s=[];let l=r;const c=r-xs+1+a_.length;for(let f=0;f<c;f++){const p=Math.pow(2,l);e.push(p);let m=1/p;f>r-xs?m=a_[f-r+xs-1]:f===0&&(m=0),i.push(m);const d=1/(p-2),v=-d,_=1+d,g=[v,v,_,v,_,_,v,v,_,_,v,_],b=6,T=6,C=3,M=2,x=1,N=new Float32Array(C*T*b),z=new Float32Array(M*T*b),w=new Float32Array(x*T*b);for(let L=0;L<b;L++){const I=L%3*2/3-1,A=L>2?0:-1,O=[I,A,0,I+2/3,A,0,I+2/3,A+1,0,I,A,0,I+2/3,A+1,0,I,A+1,0];N.set(O,C*T*L),z.set(g,M*T*L);const k=[L,L,L,L,L,L];w.set(k,x*T*L)}const G=new Dn;G.setAttribute("position",new Ai(N,C)),G.setAttribute("uv",new Ai(z,M)),G.setAttribute("faceIndex",new Ai(w,x)),s.push(new yn(G,null)),l>xs&&l--}return{lodMeshes:s,sizeLods:e,sigmas:i}}function o_(r,e,i){const s=new la(r,e,i);return s.texture.mapping=pu,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Wr(r,e,i,s,l){r.viewport.set(e,i,s,l),r.scissor.set(e,i,s,l)}function gT(r,e,i){return new ua({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:dT,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:vu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:za,depthTest:!1,depthWrite:!1})}function vT(r,e,i){const s=new Float32Array(qs),l=new ne(0,1,0);return new ua({name:"SphericalGaussianBlur",defines:{n:qs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:vu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:za,depthTest:!1,depthWrite:!1})}function l_(){return new ua({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:za,depthTest:!1,depthWrite:!1})}function c_(){return new ua({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:za,depthTest:!1,depthWrite:!1})}function vu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class sx extends la{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},l=[s,s,s,s,s,s];this.texture=new J_(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new Bi(5,5,5),c=new ua({name:"CubemapFromEquirect",uniforms:no(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:fi,blending:za});c.uniforms.tEquirect.value=i;const f=new yn(l,c),p=i.minFilter;return i.minFilter===Ys&&(i.minFilter=Qn),new Sb(1,10,this).update(e,f),i.minFilter=p,f.geometry.dispose(),f.material.dispose(),this}clear(e,i=!0,s=!0,l=!0){const c=e.getRenderTarget();for(let f=0;f<6;f++)e.setRenderTarget(this,f),e.clear(i,s,l);e.setRenderTarget(c)}}function _T(r){let e=new WeakMap,i=new WeakMap,s=null;function l(g,b=!1){return g==null?null:b?f(g):c(g)}function c(g){if(g&&g.isTexture){const b=g.mapping;if(b===Dh||b===Nh)if(e.has(g)){const T=e.get(g).texture;return p(T,g.mapping)}else{const T=g.image;if(T&&T.height>0){const C=new sx(T.height);return C.fromEquirectangularTexture(r,g),e.set(g,C),g.addEventListener("dispose",d),p(C.texture,g.mapping)}else return null}}return g}function f(g){if(g&&g.isTexture){const b=g.mapping,T=b===Dh||b===Nh,C=b===Ks||b===eo;if(T||C){let M=i.get(g);const x=M!==void 0?M.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==x)return s===null&&(s=new r_(r)),M=T?s.fromEquirectangular(g,M):s.fromCubemap(g,M),M.texture.pmremVersion=g.pmremVersion,i.set(g,M),M.texture;if(M!==void 0)return M.texture;{const N=g.image;return T&&N&&N.height>0||C&&N&&m(N)?(s===null&&(s=new r_(r)),M=T?s.fromEquirectangular(g):s.fromCubemap(g),M.texture.pmremVersion=g.pmremVersion,i.set(g,M),g.addEventListener("dispose",v),M.texture):null}}}return g}function p(g,b){return b===Dh?g.mapping=Ks:b===Nh&&(g.mapping=eo),g}function m(g){let b=0;const T=6;for(let C=0;C<T;C++)g[C]!==void 0&&b++;return b===T}function d(g){const b=g.target;b.removeEventListener("dispose",d);const T=e.get(b);T!==void 0&&(e.delete(b),T.dispose())}function v(g){const b=g.target;b.removeEventListener("dispose",v);const T=i.get(b);T!==void 0&&(i.delete(b),T.dispose())}function _(){e=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:_}}function xT(r){const e={};function i(s){if(e[s]!==void 0)return e[s];const l=r.getExtension(s);return e[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&Kr("WebGLRenderer: "+s+" extension not supported."),l}}}function yT(r,e,i,s){const l={},c=new WeakMap;function f(_){const g=_.target;g.index!==null&&e.remove(g.index);for(const T in g.attributes)e.remove(g.attributes[T]);g.removeEventListener("dispose",f),delete l[g.id];const b=c.get(g);b&&(e.remove(b),c.delete(g)),s.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,i.memory.geometries--}function p(_,g){return l[g.id]===!0||(g.addEventListener("dispose",f),l[g.id]=!0,i.memory.geometries++),g}function m(_){const g=_.attributes;for(const b in g)e.update(g[b],r.ARRAY_BUFFER)}function d(_){const g=[],b=_.index,T=_.attributes.position;let C=0;if(T===void 0)return;if(b!==null){const N=b.array;C=b.version;for(let z=0,w=N.length;z<w;z+=3){const G=N[z+0],L=N[z+1],I=N[z+2];g.push(G,L,L,I,I,G)}}else{const N=T.array;C=T.version;for(let z=0,w=N.length/3-1;z<w;z+=3){const G=z+0,L=z+1,I=z+2;g.push(G,L,L,I,I,G)}}const M=new(T.count>=65535?K_:j_)(g,1);M.version=C;const x=c.get(_);x&&e.remove(x),c.set(_,M)}function v(_){const g=c.get(_);if(g){const b=_.index;b!==null&&g.version<b.version&&d(_)}else d(_);return c.get(_)}return{get:p,update:m,getWireframeAttribute:v}}function MT(r,e,i){let s;function l(_){s=_}let c,f;function p(_){c=_.type,f=_.bytesPerElement}function m(_,g){r.drawElements(s,g,c,_*f),i.update(g,s,1)}function d(_,g,b){b!==0&&(r.drawElementsInstanced(s,g,c,_*f,b),i.update(g,s,b))}function v(_,g,b){if(b===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,g,0,c,_,0,b);let C=0;for(let M=0;M<b;M++)C+=g[M];i.update(C,s,1)}this.setMode=l,this.setIndex=p,this.render=m,this.renderInstances=d,this.renderMultiDraw=v}function ST(r){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,f,p){switch(i.calls++,f){case r.TRIANGLES:i.triangles+=p*(c/3);break;case r.LINES:i.lines+=p*(c/2);break;case r.LINE_STRIP:i.lines+=p*(c-1);break;case r.LINE_LOOP:i.lines+=p*c;break;case r.POINTS:i.points+=p*c;break;default:It("WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:s}}function bT(r,e,i){const s=new WeakMap,l=new hn;function c(f,p,m){const d=f.morphTargetInfluences,v=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,_=v!==void 0?v.length:0;let g=s.get(p);if(g===void 0||g.count!==_){let k=function(){A.dispose(),s.delete(p),p.removeEventListener("dispose",k)};var b=k;g!==void 0&&g.texture.dispose();const T=p.morphAttributes.position!==void 0,C=p.morphAttributes.normal!==void 0,M=p.morphAttributes.color!==void 0,x=p.morphAttributes.position||[],N=p.morphAttributes.normal||[],z=p.morphAttributes.color||[];let w=0;T===!0&&(w=1),C===!0&&(w=2),M===!0&&(w=3);let G=p.attributes.position.count*w,L=1;G>e.maxTextureSize&&(L=Math.ceil(G/e.maxTextureSize),G=e.maxTextureSize);const I=new Float32Array(G*L*4*_),A=new q_(I,G,L,_);A.type=sa,A.needsUpdate=!0;const O=w*4;for(let X=0;X<_;X++){const K=x[X],V=N[X],re=z[X],Z=G*L*4*X;for(let P=0;P<K.count;P++){const U=P*O;T===!0&&(l.fromBufferAttribute(K,P),I[Z+U+0]=l.x,I[Z+U+1]=l.y,I[Z+U+2]=l.z,I[Z+U+3]=0),C===!0&&(l.fromBufferAttribute(V,P),I[Z+U+4]=l.x,I[Z+U+5]=l.y,I[Z+U+6]=l.z,I[Z+U+7]=0),M===!0&&(l.fromBufferAttribute(re,P),I[Z+U+8]=l.x,I[Z+U+9]=l.y,I[Z+U+10]=l.z,I[Z+U+11]=re.itemSize===4?l.w:1)}}g={count:_,texture:A,size:new xt(G,L)},s.set(p,g),p.addEventListener("dispose",k)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,i);else{let T=0;for(let M=0;M<d.length;M++)T+=d[M];const C=p.morphTargetsRelative?1:1-T;m.getUniforms().setValue(r,"morphTargetBaseInfluence",C),m.getUniforms().setValue(r,"morphTargetInfluences",d)}m.getUniforms().setValue(r,"morphTargetsTexture",g.texture,i),m.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}return{update:c}}function ET(r,e,i,s,l){let c=new WeakMap;function f(d){const v=l.render.frame,_=d.geometry,g=e.get(d,_);if(c.get(g)!==v&&(e.update(g),c.set(g,v)),d.isInstancedMesh&&(d.hasEventListener("dispose",m)===!1&&d.addEventListener("dispose",m),c.get(d)!==v&&(i.update(d.instanceMatrix,r.ARRAY_BUFFER),d.instanceColor!==null&&i.update(d.instanceColor,r.ARRAY_BUFFER),c.set(d,v))),d.isSkinnedMesh){const b=d.skeleton;c.get(b)!==v&&(b.update(),c.set(b,v))}return g}function p(){c=new WeakMap}function m(d){const v=d.target;v.removeEventListener("dispose",m),s.releaseStatesOfObject(v),i.remove(v.instanceMatrix),v.instanceColor!==null&&i.remove(v.instanceColor)}return{update:f,dispose:p}}const TT={[N_]:"LINEAR_TONE_MAPPING",[U_]:"REINHARD_TONE_MAPPING",[L_]:"CINEON_TONE_MAPPING",[ip]:"ACES_FILMIC_TONE_MAPPING",[P_]:"AGX_TONE_MAPPING",[I_]:"NEUTRAL_TONE_MAPPING",[O_]:"CUSTOM_TONE_MAPPING"};function AT(r,e,i,s,l,c){const f=new la(e,i,{type:r,depthBuffer:l,stencilBuffer:c,samples:s?4:0,depthTexture:l?new to(e,i):void 0}),p=new la(e,i,{type:Fa,depthBuffer:!1,stencilBuffer:!1}),m=new Dn;m.setAttribute("position",new sn([-1,3,0,-1,-1,0,3,-1,0],3)),m.setAttribute("uv",new sn([0,2,0,0,2,0],2));const d=new pb({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),v=new yn(m,d),_=new Ep(-1,1,1,-1,0,1);let g=null,b=null,T=!1,C,M=null,x=[],N=!1;this.setSize=function(z,w){f.setSize(z,w),p.setSize(z,w);for(let G=0;G<x.length;G++){const L=x[G];L.setSize&&L.setSize(z,w)}},this.setEffects=function(z){x=z,N=x.length>0&&x[0].isRenderPass===!0;const w=f.width,G=f.height;for(let L=0;L<x.length;L++){const I=x[L];I.setSize&&I.setSize(w,G)}},this.begin=function(z,w){if(T||z.toneMapping===oa&&x.length===0)return!1;if(M=w,w!==null){const G=w.width,L=w.height;(f.width!==G||f.height!==L)&&this.setSize(G,L)}return N===!1&&z.setRenderTarget(f),C=z.toneMapping,z.toneMapping=oa,!0},this.hasRenderPass=function(){return N},this.end=function(z,w){z.toneMapping=C,T=!0;let G=f,L=p;for(let I=0;I<x.length;I++){const A=x[I];if(A.enabled!==!1&&(A.render(z,L,G,w),A.needsSwap!==!1)){const O=G;G=L,L=O}}if(g!==z.outputColorSpace||b!==z.toneMapping){g=z.outputColorSpace,b=z.toneMapping,d.defines={},Dt.getTransfer(g)===Kt&&(d.defines.SRGB_TRANSFER="");const I=TT[b];I&&(d.defines[I]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=G.texture,z.setRenderTarget(M),z.render(v,_),M=null,T=!1},this.isCompositing=function(){return T},this.dispose=function(){f.depthTexture&&f.depthTexture.dispose(),f.dispose(),p.dispose(),m.dispose(),d.dispose()}}const rx=new Jn,$d=new to(1,1),ox=new q_,lx=new HS,cx=new J_,u_=[],f_=[],h_=new Float32Array(16),d_=new Float32Array(9),p_=new Float32Array(4);function so(r,e,i){const s=r[0];if(s<=0||s>0)return r;const l=e*i;let c=u_[l];if(c===void 0&&(c=new Float32Array(l),u_[l]=c),e!==0){s.toArray(c,0);for(let f=1,p=0;f!==e;++f)p+=i,r[f].toArray(c,p)}return c}function Nn(r,e){if(r.length!==e.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==e[i])return!1;return!0}function Un(r,e){for(let i=0,s=e.length;i<s;i++)r[i]=e[i]}function _u(r,e){let i=f_[e];i===void 0&&(i=new Int32Array(e),f_[e]=i);for(let s=0;s!==e;++s)i[s]=r.allocateTextureUnit();return i}function wT(r,e){const i=this.cache;i[0]!==e&&(r.uniform1f(this.addr,e),i[0]=e)}function RT(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Nn(i,e))return;r.uniform2fv(this.addr,e),Un(i,e)}}function CT(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(Nn(i,e))return;r.uniform3fv(this.addr,e),Un(i,e)}}function DT(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Nn(i,e))return;r.uniform4fv(this.addr,e),Un(i,e)}}function NT(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(Nn(i,e))return;r.uniformMatrix2fv(this.addr,!1,e),Un(i,e)}else{if(Nn(i,s))return;p_.set(s),r.uniformMatrix2fv(this.addr,!1,p_),Un(i,s)}}function UT(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(Nn(i,e))return;r.uniformMatrix3fv(this.addr,!1,e),Un(i,e)}else{if(Nn(i,s))return;d_.set(s),r.uniformMatrix3fv(this.addr,!1,d_),Un(i,s)}}function LT(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(Nn(i,e))return;r.uniformMatrix4fv(this.addr,!1,e),Un(i,e)}else{if(Nn(i,s))return;h_.set(s),r.uniformMatrix4fv(this.addr,!1,h_),Un(i,s)}}function OT(r,e){const i=this.cache;i[0]!==e&&(r.uniform1i(this.addr,e),i[0]=e)}function PT(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Nn(i,e))return;r.uniform2iv(this.addr,e),Un(i,e)}}function IT(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Nn(i,e))return;r.uniform3iv(this.addr,e),Un(i,e)}}function zT(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Nn(i,e))return;r.uniform4iv(this.addr,e),Un(i,e)}}function BT(r,e){const i=this.cache;i[0]!==e&&(r.uniform1ui(this.addr,e),i[0]=e)}function FT(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Nn(i,e))return;r.uniform2uiv(this.addr,e),Un(i,e)}}function GT(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Nn(i,e))return;r.uniform3uiv(this.addr,e),Un(i,e)}}function HT(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Nn(i,e))return;r.uniform4uiv(this.addr,e),Un(i,e)}}function VT(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?($d.compareFunction=i.isReversedDepthBuffer()?fp:up,c=$d):c=rx,i.setTexture2D(e||c,l)}function kT(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(e||lx,l)}function XT(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(e||cx,l)}function WT(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(e||ox,l)}function qT(r){switch(r){case 5126:return wT;case 35664:return RT;case 35665:return CT;case 35666:return DT;case 35674:return NT;case 35675:return UT;case 35676:return LT;case 5124:case 35670:return OT;case 35667:case 35671:return PT;case 35668:case 35672:return IT;case 35669:case 35673:return zT;case 5125:return BT;case 36294:return FT;case 36295:return GT;case 36296:return HT;case 35678:case 36198:case 36298:case 36306:case 35682:return VT;case 35679:case 36299:case 36307:return kT;case 35680:case 36300:case 36308:case 36293:return XT;case 36289:case 36303:case 36311:case 36292:return WT}}function YT(r,e){r.uniform1fv(this.addr,e)}function ZT(r,e){const i=so(e,this.size,2);r.uniform2fv(this.addr,i)}function jT(r,e){const i=so(e,this.size,3);r.uniform3fv(this.addr,i)}function KT(r,e){const i=so(e,this.size,4);r.uniform4fv(this.addr,i)}function QT(r,e){const i=so(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function JT(r,e){const i=so(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function $T(r,e){const i=so(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function eA(r,e){r.uniform1iv(this.addr,e)}function tA(r,e){r.uniform2iv(this.addr,e)}function nA(r,e){r.uniform3iv(this.addr,e)}function iA(r,e){r.uniform4iv(this.addr,e)}function aA(r,e){r.uniform1uiv(this.addr,e)}function sA(r,e){r.uniform2uiv(this.addr,e)}function rA(r,e){r.uniform3uiv(this.addr,e)}function oA(r,e){r.uniform4uiv(this.addr,e)}function lA(r,e,i){const s=this.cache,l=e.length,c=_u(i,l);Nn(s,c)||(r.uniform1iv(this.addr,c),Un(s,c));let f;this.type===r.SAMPLER_2D_SHADOW?f=$d:f=rx;for(let p=0;p!==l;++p)i.setTexture2D(e[p]||f,c[p])}function cA(r,e,i){const s=this.cache,l=e.length,c=_u(i,l);Nn(s,c)||(r.uniform1iv(this.addr,c),Un(s,c));for(let f=0;f!==l;++f)i.setTexture3D(e[f]||lx,c[f])}function uA(r,e,i){const s=this.cache,l=e.length,c=_u(i,l);Nn(s,c)||(r.uniform1iv(this.addr,c),Un(s,c));for(let f=0;f!==l;++f)i.setTextureCube(e[f]||cx,c[f])}function fA(r,e,i){const s=this.cache,l=e.length,c=_u(i,l);Nn(s,c)||(r.uniform1iv(this.addr,c),Un(s,c));for(let f=0;f!==l;++f)i.setTexture2DArray(e[f]||ox,c[f])}function hA(r){switch(r){case 5126:return YT;case 35664:return ZT;case 35665:return jT;case 35666:return KT;case 35674:return QT;case 35675:return JT;case 35676:return $T;case 5124:case 35670:return eA;case 35667:case 35671:return tA;case 35668:case 35672:return nA;case 35669:case 35673:return iA;case 5125:return aA;case 36294:return sA;case 36295:return rA;case 36296:return oA;case 35678:case 36198:case 36298:case 36306:case 35682:return lA;case 35679:case 36299:case 36307:return cA;case 35680:case 36300:case 36308:case 36293:return uA;case 36289:case 36303:case 36311:case 36292:return fA}}class dA{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=qT(i.type)}}class pA{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=hA(i.type)}}class mA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const p=l[c];p.setValue(e,i[p.id],s)}}}const ld=/(\w+)(\])?(\[|\.)?/g;function m_(r,e){r.seq.push(e),r.map[e.id]=e}function gA(r,e,i){const s=r.name,l=s.length;for(ld.lastIndex=0;;){const c=ld.exec(s),f=ld.lastIndex;let p=c[1];const m=c[2]==="]",d=c[3];if(m&&(p=p|0),d===void 0||d==="["&&f+2===l){m_(i,d===void 0?new dA(p,r,e):new pA(p,r,e));break}else{let _=i.map[p];_===void 0&&(_=new mA(p),m_(i,_)),i=_}}}class su{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let f=0;f<s;++f){const p=e.getActiveUniform(i,f),m=e.getUniformLocation(i,p.name);gA(p,m,this)}const l=[],c=[];for(const f of this.seq)f.type===e.SAMPLER_2D_SHADOW||f.type===e.SAMPLER_CUBE_SHADOW||f.type===e.SAMPLER_2D_ARRAY_SHADOW?l.push(f):c.push(f);l.length>0&&(this.seq=l.concat(c))}setValue(e,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(e,s,l)}setOptional(e,i,s){const l=i[s];l!==void 0&&this.setValue(e,s,l)}static upload(e,i,s,l){for(let c=0,f=i.length;c!==f;++c){const p=i[c],m=s[p.id];m.needsUpdate!==!1&&p.setValue(e,m.value,l)}}static seqWithValue(e,i){const s=[];for(let l=0,c=e.length;l!==c;++l){const f=e[l];f.id in i&&s.push(f)}return s}}function g_(r,e,i){const s=r.createShader(e);return r.shaderSource(s,i),r.compileShader(s),s}const vA=37297;let _A=0;function xA(r,e){const i=r.split(`
`),s=[],l=Math.max(e-6,0),c=Math.min(e+6,i.length);for(let f=l;f<c;f++){const p=f+1;s.push(`${p===e?">":" "} ${p}: ${i[f]}`)}return s.join(`
`)}const v_=new pt;function yA(r){Dt._getMatrix(v_,Dt.workingColorSpace,r);const e=`mat3( ${v_.elements.map(i=>i.toFixed(4))} )`;switch(Dt.getTransfer(r)){case cu:return[e,"LinearTransferOETF"];case Kt:return[e,"sRGBTransferOETF"];default:return ft("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function __(r,e,i){const s=r.getShaderParameter(e,r.COMPILE_STATUS),c=(r.getShaderInfoLog(e)||"").trim();if(s&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const p=parseInt(f[1]);return i.toUpperCase()+`

`+c+`

`+xA(r.getShaderSource(e),p)}else return c}function MA(r,e){const i=yA(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const SA={[N_]:"Linear",[U_]:"Reinhard",[L_]:"Cineon",[ip]:"ACESFilmic",[P_]:"AgX",[I_]:"Neutral",[O_]:"Custom"};function bA(r,e){const i=SA[e];return i===void 0?(ft("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Qc=new ne;function EA(){Dt.getLuminanceCoefficients(Qc);const r=Qc.x.toFixed(4),e=Qc.y.toFixed(4),i=Qc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function TA(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(al).join(`
`)}function AA(r){const e=[];for(const i in r){const s=r[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function wA(r,e){const i={},s=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(e,l),f=c.name;let p=1;c.type===r.FLOAT_MAT2&&(p=2),c.type===r.FLOAT_MAT3&&(p=3),c.type===r.FLOAT_MAT4&&(p=4),i[f]={type:c.type,location:r.getAttribLocation(e,f),locationSize:p}}return i}function al(r){return r!==""}function x_(r,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function y_(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const RA=/^[ \t]*#include +<([\w\d./]+)>/gm;function ep(r){return r.replace(RA,DA)}const CA=new Map;function DA(r,e){let i=_t[e];if(i===void 0){const s=CA.get(e);if(s!==void 0)i=_t[s],ft('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return ep(i)}const NA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function M_(r){return r.replace(NA,UA)}function UA(r,e,i,s){let l="";for(let c=parseInt(e);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function S_(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const LA={[$c]:"SHADOWMAP_TYPE_PCF",[il]:"SHADOWMAP_TYPE_VSM"};function OA(r){return LA[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const PA={[Ks]:"ENVMAP_TYPE_CUBE",[eo]:"ENVMAP_TYPE_CUBE",[pu]:"ENVMAP_TYPE_CUBE_UV"};function IA(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":PA[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const zA={[eo]:"ENVMAP_MODE_REFRACTION"};function BA(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":zA[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const FA={[D_]:"ENVMAP_BLENDING_MULTIPLY",[aS]:"ENVMAP_BLENDING_MIX",[sS]:"ENVMAP_BLENDING_ADD"};function GA(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":FA[r.combine]||"ENVMAP_BLENDING_NONE"}function HA(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function VA(r,e,i,s){const l=r.getContext(),c=i.defines;let f=i.vertexShader,p=i.fragmentShader;const m=OA(i),d=IA(i),v=BA(i),_=GA(i),g=HA(i),b=TA(i),T=AA(c),C=l.createProgram();let M,x,N=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(M=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(al).join(`
`),M.length>0&&(M+=`
`),x=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(al).join(`
`),x.length>0&&(x+=`
`)):(M=[S_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+v:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(al).join(`
`),x=[S_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+d:"",i.envMap?"#define "+v:"",i.envMap?"#define "+_:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==oa?"#define TONE_MAPPING":"",i.toneMapping!==oa?_t.tonemapping_pars_fragment:"",i.toneMapping!==oa?bA("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",_t.colorspace_pars_fragment,MA("linearToOutputTexel",i.outputColorSpace),EA(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(al).join(`
`)),f=ep(f),f=x_(f,i),f=y_(f,i),p=ep(p),p=x_(p,i),p=y_(p,i),f=M_(f),p=M_(p),i.isRawShaderMaterial!==!0&&(N=`#version 300 es
`,M=[b,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,x=["#define varying in",i.glslVersion===wv?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===wv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const z=N+M+f,w=N+x+p,G=g_(l,l.VERTEX_SHADER,z),L=g_(l,l.FRAGMENT_SHADER,w);l.attachShader(C,G),l.attachShader(C,L),i.index0AttributeName!==void 0?l.bindAttribLocation(C,0,i.index0AttributeName):i.hasPositionAttribute===!0&&l.bindAttribLocation(C,0,"position"),l.linkProgram(C);function I(X){if(r.debug.checkShaderErrors){const K=l.getProgramInfoLog(C)||"",V=l.getShaderInfoLog(G)||"",re=l.getShaderInfoLog(L)||"",Z=K.trim(),P=V.trim(),U=re.trim();let W=!0,se=!0;if(l.getProgramParameter(C,l.LINK_STATUS)===!1)if(W=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,C,G,L);else{const B=__(l,G,"vertex"),S=__(l,L,"fragment");It("WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(C,l.VALIDATE_STATUS)+`

Material Name: `+X.name+`
Material Type: `+X.type+`

Program Info Log: `+Z+`
`+B+`
`+S)}else Z!==""?ft("WebGLProgram: Program Info Log:",Z):(P===""||U==="")&&(se=!1);se&&(X.diagnostics={runnable:W,programLog:Z,vertexShader:{log:P,prefix:M},fragmentShader:{log:U,prefix:x}})}l.deleteShader(G),l.deleteShader(L),A=new su(l,C),O=wA(l,C)}let A;this.getUniforms=function(){return A===void 0&&I(this),A};let O;this.getAttributes=function(){return O===void 0&&I(this),O};let k=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=l.getProgramParameter(C,vA)),k},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(C),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=_A++,this.cacheKey=e,this.usedTimes=1,this.program=C,this.vertexShader=G,this.fragmentShader=L,this}let kA=0;class XA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,i,s){const l=this._getShaderCacheForMaterial(e);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(s)===!1&&(l.add(s),s.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new WA(e),i.set(e,s)),s}}class WA{constructor(e){this.id=kA++,this.code=e,this.usedTimes=0}}function qA(r){return r===Qs||r===ru||r===ou}function YA(r,e,i,s,l,c){const f=new Y_,p=new XA,m=new Set,d=[],v=new Map,_=s.logarithmicDepthBuffer;let g=s.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(A){return m.add(A),A===0?"uv":`uv${A}`}function C(A,O,k,X,K,V){const re=X.fog,Z=K.geometry,P=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?X.environment:null,U=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap,W=e.get(A.envMap||P,U),se=W&&W.mapping===pu?W.image.height:null,B=b[A.type];A.precision!==null&&(g=s.getMaxPrecision(A.precision),g!==A.precision&&ft("WebGLProgram.getParameters:",A.precision,"not supported, using",g,"instead."));const S=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,H=S!==void 0?S.length:0;let le=0;Z.morphAttributes.position!==void 0&&(le=1),Z.morphAttributes.normal!==void 0&&(le=2),Z.morphAttributes.color!==void 0&&(le=3);let ye,Te,$,ce;if(B){const We=ia[B];ye=We.vertexShader,Te=We.fragmentShader}else{ye=A.vertexShader,Te=A.fragmentShader;const We=p.getVertexShaderStage(A),an=p.getFragmentShaderStage(A);p.update(A,We,an),$=We.id,ce=an.id}const ve=r.getRenderTarget(),Ce=r.state.buffers.depth.getReversed(),Ve=K.isInstancedMesh===!0,Ie=K.isBatchedMesh===!0,rt=!!A.map,$e=!!A.matcap,ke=!!W,ot=!!A.aoMap,lt=!!A.lightMap,Tt=!!A.bumpMap&&A.wireframe===!1,Nt=!!A.normalMap,Ut=!!A.displacementMap,Lt=!!A.emissiveMap,Gt=!!A.metalnessMap,en=!!A.roughnessMap,ee=A.anisotropy>0,Ot=A.clearcoat>0,At=A.dispersion>0,F=A.iridescence>0,E=A.sheen>0,ie=A.transmission>0,fe=ee&&!!A.anisotropyMap,xe=Ot&&!!A.clearcoatMap,be=Ot&&!!A.clearcoatNormalMap,Ne=Ot&&!!A.clearcoatRoughnessMap,q=F&&!!A.iridescenceMap,oe=F&&!!A.iridescenceThicknessMap,De=E&&!!A.sheenColorMap,ze=E&&!!A.sheenRoughnessMap,Pe=!!A.specularMap,Le=!!A.specularColorMap,tt=!!A.specularIntensityMap,nt=ie&&!!A.transmissionMap,ut=ie&&!!A.thicknessMap,J=!!A.gradientMap,Ue=!!A.alphaMap,Me=A.alphaTest>0,Oe=!!A.alphaHash,Fe=!!A.extensions;let we=oa;A.toneMapped&&(ve===null||ve.isXRRenderTarget===!0)&&(we=r.toneMapping);const Ze={shaderID:B,shaderType:A.type,shaderName:A.name,vertexShader:ye,fragmentShader:Te,defines:A.defines,customVertexShaderID:$,customFragmentShaderID:ce,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:g,batching:Ie,batchingColor:Ie&&K._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&K.instanceColor!==null,instancingMorph:Ve&&K.morphTexture!==null,outputColorSpace:ve===null?r.outputColorSpace:ve.isXRRenderTarget===!0?ve.texture.colorSpace:Dt.workingColorSpace,alphaToCoverage:!!A.alphaToCoverage,map:rt,matcap:$e,envMap:ke,envMapMode:ke&&W.mapping,envMapCubeUVHeight:se,aoMap:ot,lightMap:lt,bumpMap:Tt,normalMap:Nt,displacementMap:Ut,emissiveMap:Lt,normalMapObjectSpace:Nt&&A.normalMapType===lS,normalMapTangentSpace:Nt&&A.normalMapType===Qd,packedNormalMap:Nt&&A.normalMapType===Qd&&qA(A.normalMap.format),metalnessMap:Gt,roughnessMap:en,anisotropy:ee,anisotropyMap:fe,clearcoat:Ot,clearcoatMap:xe,clearcoatNormalMap:be,clearcoatRoughnessMap:Ne,dispersion:At,iridescence:F,iridescenceMap:q,iridescenceThicknessMap:oe,sheen:E,sheenColorMap:De,sheenRoughnessMap:ze,specularMap:Pe,specularColorMap:Le,specularIntensityMap:tt,transmission:ie,transmissionMap:nt,thicknessMap:ut,gradientMap:J,opaque:A.transparent===!1&&A.blending===jr&&A.alphaToCoverage===!1,alphaMap:Ue,alphaTest:Me,alphaHash:Oe,combine:A.combine,mapUv:rt&&T(A.map.channel),aoMapUv:ot&&T(A.aoMap.channel),lightMapUv:lt&&T(A.lightMap.channel),bumpMapUv:Tt&&T(A.bumpMap.channel),normalMapUv:Nt&&T(A.normalMap.channel),displacementMapUv:Ut&&T(A.displacementMap.channel),emissiveMapUv:Lt&&T(A.emissiveMap.channel),metalnessMapUv:Gt&&T(A.metalnessMap.channel),roughnessMapUv:en&&T(A.roughnessMap.channel),anisotropyMapUv:fe&&T(A.anisotropyMap.channel),clearcoatMapUv:xe&&T(A.clearcoatMap.channel),clearcoatNormalMapUv:be&&T(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ne&&T(A.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&T(A.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&T(A.iridescenceThicknessMap.channel),sheenColorMapUv:De&&T(A.sheenColorMap.channel),sheenRoughnessMapUv:ze&&T(A.sheenRoughnessMap.channel),specularMapUv:Pe&&T(A.specularMap.channel),specularColorMapUv:Le&&T(A.specularColorMap.channel),specularIntensityMapUv:tt&&T(A.specularIntensityMap.channel),transmissionMapUv:nt&&T(A.transmissionMap.channel),thicknessMapUv:ut&&T(A.thicknessMap.channel),alphaMapUv:Ue&&T(A.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(Nt||ee),vertexNormals:!!Z.attributes.normal,vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:K.isPoints===!0&&!!Z.attributes.uv&&(rt||Ue),fog:!!re,useFog:A.fog===!0,fogExp2:!!re&&re.isFogExp2,flatShading:A.wireframe===!1&&(A.flatShading===!0||Z.attributes.normal===void 0&&Nt===!1&&(A.isMeshLambertMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isMeshPhysicalMaterial)),sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:Ce,skinning:K.isSkinnedMesh===!0,hasPositionAttribute:Z.attributes.position!==void 0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:H,morphTextureStride:le,numDirLights:O.directional.length,numPointLights:O.point.length,numSpotLights:O.spot.length,numSpotLightMaps:O.spotLightMap.length,numRectAreaLights:O.rectArea.length,numHemiLights:O.hemi.length,numDirLightShadows:O.directionalShadowMap.length,numPointLightShadows:O.pointShadowMap.length,numSpotLightShadows:O.spotShadowMap.length,numSpotLightShadowsWithMaps:O.numSpotLightShadowsWithMaps,numLightProbes:O.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:A.dithering,shadowMapEnabled:r.shadowMap.enabled&&k.length>0,shadowMapType:r.shadowMap.type,toneMapping:we,decodeVideoTexture:rt&&A.map.isVideoTexture===!0&&Dt.getTransfer(A.map.colorSpace)===Kt,decodeVideoTextureEmissive:Lt&&A.emissiveMap.isVideoTexture===!0&&Dt.getTransfer(A.emissiveMap.colorSpace)===Kt,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===aa,flipSided:A.side===fi,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:Fe&&A.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Fe&&A.extensions.multiDraw===!0||Ie)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return Ze.vertexUv1s=m.has(1),Ze.vertexUv2s=m.has(2),Ze.vertexUv3s=m.has(3),m.clear(),Ze}function M(A){const O=[];if(A.shaderID?O.push(A.shaderID):(O.push(A.customVertexShaderID),O.push(A.customFragmentShaderID)),A.defines!==void 0)for(const k in A.defines)O.push(k),O.push(A.defines[k]);return A.isRawShaderMaterial===!1&&(x(O,A),N(O,A),O.push(r.outputColorSpace)),O.push(A.customProgramCacheKey),O.join()}function x(A,O){A.push(O.precision),A.push(O.outputColorSpace),A.push(O.envMapMode),A.push(O.envMapCubeUVHeight),A.push(O.mapUv),A.push(O.alphaMapUv),A.push(O.lightMapUv),A.push(O.aoMapUv),A.push(O.bumpMapUv),A.push(O.normalMapUv),A.push(O.displacementMapUv),A.push(O.emissiveMapUv),A.push(O.metalnessMapUv),A.push(O.roughnessMapUv),A.push(O.anisotropyMapUv),A.push(O.clearcoatMapUv),A.push(O.clearcoatNormalMapUv),A.push(O.clearcoatRoughnessMapUv),A.push(O.iridescenceMapUv),A.push(O.iridescenceThicknessMapUv),A.push(O.sheenColorMapUv),A.push(O.sheenRoughnessMapUv),A.push(O.specularMapUv),A.push(O.specularColorMapUv),A.push(O.specularIntensityMapUv),A.push(O.transmissionMapUv),A.push(O.thicknessMapUv),A.push(O.combine),A.push(O.fogExp2),A.push(O.sizeAttenuation),A.push(O.morphTargetsCount),A.push(O.morphAttributeCount),A.push(O.numDirLights),A.push(O.numPointLights),A.push(O.numSpotLights),A.push(O.numSpotLightMaps),A.push(O.numHemiLights),A.push(O.numRectAreaLights),A.push(O.numDirLightShadows),A.push(O.numPointLightShadows),A.push(O.numSpotLightShadows),A.push(O.numSpotLightShadowsWithMaps),A.push(O.numLightProbes),A.push(O.shadowMapType),A.push(O.toneMapping),A.push(O.numClippingPlanes),A.push(O.numClipIntersection),A.push(O.depthPacking)}function N(A,O){f.disableAll(),O.instancing&&f.enable(0),O.instancingColor&&f.enable(1),O.instancingMorph&&f.enable(2),O.matcap&&f.enable(3),O.envMap&&f.enable(4),O.normalMapObjectSpace&&f.enable(5),O.normalMapTangentSpace&&f.enable(6),O.clearcoat&&f.enable(7),O.iridescence&&f.enable(8),O.alphaTest&&f.enable(9),O.vertexColors&&f.enable(10),O.vertexAlphas&&f.enable(11),O.vertexUv1s&&f.enable(12),O.vertexUv2s&&f.enable(13),O.vertexUv3s&&f.enable(14),O.vertexTangents&&f.enable(15),O.anisotropy&&f.enable(16),O.alphaHash&&f.enable(17),O.batching&&f.enable(18),O.dispersion&&f.enable(19),O.batchingColor&&f.enable(20),O.gradientMap&&f.enable(21),O.packedNormalMap&&f.enable(22),O.vertexNormals&&f.enable(23),A.push(f.mask),f.disableAll(),O.fog&&f.enable(0),O.useFog&&f.enable(1),O.flatShading&&f.enable(2),O.logarithmicDepthBuffer&&f.enable(3),O.reversedDepthBuffer&&f.enable(4),O.skinning&&f.enable(5),O.morphTargets&&f.enable(6),O.morphNormals&&f.enable(7),O.morphColors&&f.enable(8),O.premultipliedAlpha&&f.enable(9),O.shadowMapEnabled&&f.enable(10),O.doubleSided&&f.enable(11),O.flipSided&&f.enable(12),O.useDepthPacking&&f.enable(13),O.dithering&&f.enable(14),O.transmission&&f.enable(15),O.sheen&&f.enable(16),O.opaque&&f.enable(17),O.pointsUvs&&f.enable(18),O.decodeVideoTexture&&f.enable(19),O.decodeVideoTextureEmissive&&f.enable(20),O.alphaToCoverage&&f.enable(21),O.numLightProbeGrids>0&&f.enable(22),O.hasPositionAttribute&&f.enable(23),A.push(f.mask)}function z(A){const O=b[A.type];let k;if(O){const X=ia[O];k=fb.clone(X.uniforms)}else k=A.uniforms;return k}function w(A,O){let k=v.get(O);return k!==void 0?++k.usedTimes:(k=new VA(r,O,A,l),d.push(k),v.set(O,k)),k}function G(A){if(--A.usedTimes===0){const O=d.indexOf(A);d[O]=d[d.length-1],d.pop(),v.delete(A.cacheKey),A.destroy()}}function L(A){p.remove(A)}function I(){p.dispose()}return{getParameters:C,getProgramCacheKey:M,getUniforms:z,acquireProgram:w,releaseProgram:G,releaseShaderCache:L,programs:d,dispose:I}}function ZA(){let r=new WeakMap;function e(f){return r.has(f)}function i(f){let p=r.get(f);return p===void 0&&(p={},r.set(f,p)),p}function s(f){r.delete(f)}function l(f,p,m){r.get(f)[p]=m}function c(){r=new WeakMap}return{has:e,get:i,remove:s,update:l,dispose:c}}function jA(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function b_(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function E_(){const r=[];let e=0;const i=[],s=[],l=[];function c(){e=0,i.length=0,s.length=0,l.length=0}function f(g){let b=0;return g.isInstancedMesh&&(b+=2),g.isSkinnedMesh&&(b+=1),b}function p(g,b,T,C,M,x){let N=r[e];return N===void 0?(N={id:g.id,object:g,geometry:b,material:T,materialVariant:f(g),groupOrder:C,renderOrder:g.renderOrder,z:M,group:x},r[e]=N):(N.id=g.id,N.object=g,N.geometry=b,N.material=T,N.materialVariant=f(g),N.groupOrder=C,N.renderOrder=g.renderOrder,N.z=M,N.group=x),e++,N}function m(g,b,T,C,M,x){const N=p(g,b,T,C,M,x);T.transmission>0?s.push(N):T.transparent===!0?l.push(N):i.push(N)}function d(g,b,T,C,M,x){const N=p(g,b,T,C,M,x);T.transmission>0?s.unshift(N):T.transparent===!0?l.unshift(N):i.unshift(N)}function v(g,b,T){i.length>1&&i.sort(g||jA),s.length>1&&s.sort(b||b_),l.length>1&&l.sort(b||b_),T&&(i.reverse(),s.reverse(),l.reverse())}function _(){for(let g=e,b=r.length;g<b;g++){const T=r[g];if(T.id===null)break;T.id=null,T.object=null,T.geometry=null,T.material=null,T.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:m,unshift:d,finish:_,sort:v}}function KA(){let r=new WeakMap;function e(s,l){const c=r.get(s);let f;return c===void 0?(f=new E_,r.set(s,[f])):l>=c.length?(f=new E_,c.push(f)):f=c[l],f}function i(){r=new WeakMap}return{get:e,dispose:i}}function QA(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new ne,color:new Qe};break;case"SpotLight":i={position:new ne,direction:new ne,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new ne,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":i={direction:new ne,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":i={color:new Qe,position:new ne,halfWidth:new ne,halfHeight:new ne};break}return r[e.id]=i,i}}}function JA(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=i,i}}}let $A=0;function e2(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function t2(r){const e=new QA,i=JA(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)s.probe.push(new ne);const l=new ne,c=new fn,f=new fn;function p(d){let v=0,_=0,g=0;for(let O=0;O<9;O++)s.probe[O].set(0,0,0);let b=0,T=0,C=0,M=0,x=0,N=0,z=0,w=0,G=0,L=0,I=0;d.sort(e2);for(let O=0,k=d.length;O<k;O++){const X=d[O],K=X.color,V=X.intensity,re=X.distance;let Z=null;if(X.shadow&&X.shadow.map&&(X.shadow.map.texture.format===Qs?Z=X.shadow.map.texture:Z=X.shadow.map.depthTexture||X.shadow.map.texture),X.isAmbientLight)v+=K.r*V,_+=K.g*V,g+=K.b*V;else if(X.isLightProbe){for(let P=0;P<9;P++)s.probe[P].addScaledVector(X.sh.coefficients[P],V);I++}else if(X.isDirectionalLight){const P=e.get(X);if(P.color.copy(X.color).multiplyScalar(X.intensity),X.castShadow){const U=X.shadow,W=i.get(X);W.shadowIntensity=U.intensity,W.shadowBias=U.bias,W.shadowNormalBias=U.normalBias,W.shadowRadius=U.radius,W.shadowMapSize=U.mapSize,s.directionalShadow[b]=W,s.directionalShadowMap[b]=Z,s.directionalShadowMatrix[b]=X.shadow.matrix,N++}s.directional[b]=P,b++}else if(X.isSpotLight){const P=e.get(X);P.position.setFromMatrixPosition(X.matrixWorld),P.color.copy(K).multiplyScalar(V),P.distance=re,P.coneCos=Math.cos(X.angle),P.penumbraCos=Math.cos(X.angle*(1-X.penumbra)),P.decay=X.decay,s.spot[C]=P;const U=X.shadow;if(X.map&&(s.spotLightMap[G]=X.map,G++,U.updateMatrices(X),X.castShadow&&L++),s.spotLightMatrix[C]=U.matrix,X.castShadow){const W=i.get(X);W.shadowIntensity=U.intensity,W.shadowBias=U.bias,W.shadowNormalBias=U.normalBias,W.shadowRadius=U.radius,W.shadowMapSize=U.mapSize,s.spotShadow[C]=W,s.spotShadowMap[C]=Z,w++}C++}else if(X.isRectAreaLight){const P=e.get(X);P.color.copy(K).multiplyScalar(V),P.halfWidth.set(X.width*.5,0,0),P.halfHeight.set(0,X.height*.5,0),s.rectArea[M]=P,M++}else if(X.isPointLight){const P=e.get(X);if(P.color.copy(X.color).multiplyScalar(X.intensity),P.distance=X.distance,P.decay=X.decay,X.castShadow){const U=X.shadow,W=i.get(X);W.shadowIntensity=U.intensity,W.shadowBias=U.bias,W.shadowNormalBias=U.normalBias,W.shadowRadius=U.radius,W.shadowMapSize=U.mapSize,W.shadowCameraNear=U.camera.near,W.shadowCameraFar=U.camera.far,s.pointShadow[T]=W,s.pointShadowMap[T]=Z,s.pointShadowMatrix[T]=X.shadow.matrix,z++}s.point[T]=P,T++}else if(X.isHemisphereLight){const P=e.get(X);P.skyColor.copy(X.color).multiplyScalar(V),P.groundColor.copy(X.groundColor).multiplyScalar(V),s.hemi[x]=P,x++}}M>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=He.LTC_FLOAT_1,s.rectAreaLTC2=He.LTC_FLOAT_2):(s.rectAreaLTC1=He.LTC_HALF_1,s.rectAreaLTC2=He.LTC_HALF_2)),s.ambient[0]=v,s.ambient[1]=_,s.ambient[2]=g;const A=s.hash;(A.directionalLength!==b||A.pointLength!==T||A.spotLength!==C||A.rectAreaLength!==M||A.hemiLength!==x||A.numDirectionalShadows!==N||A.numPointShadows!==z||A.numSpotShadows!==w||A.numSpotMaps!==G||A.numLightProbes!==I)&&(s.directional.length=b,s.spot.length=C,s.rectArea.length=M,s.point.length=T,s.hemi.length=x,s.directionalShadow.length=N,s.directionalShadowMap.length=N,s.pointShadow.length=z,s.pointShadowMap.length=z,s.spotShadow.length=w,s.spotShadowMap.length=w,s.directionalShadowMatrix.length=N,s.pointShadowMatrix.length=z,s.spotLightMatrix.length=w+G-L,s.spotLightMap.length=G,s.numSpotLightShadowsWithMaps=L,s.numLightProbes=I,A.directionalLength=b,A.pointLength=T,A.spotLength=C,A.rectAreaLength=M,A.hemiLength=x,A.numDirectionalShadows=N,A.numPointShadows=z,A.numSpotShadows=w,A.numSpotMaps=G,A.numLightProbes=I,s.version=$A++)}function m(d,v){let _=0,g=0,b=0,T=0,C=0;const M=v.matrixWorldInverse;for(let x=0,N=d.length;x<N;x++){const z=d[x];if(z.isDirectionalLight){const w=s.directional[_];w.direction.setFromMatrixPosition(z.matrixWorld),l.setFromMatrixPosition(z.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(M),_++}else if(z.isSpotLight){const w=s.spot[b];w.position.setFromMatrixPosition(z.matrixWorld),w.position.applyMatrix4(M),w.direction.setFromMatrixPosition(z.matrixWorld),l.setFromMatrixPosition(z.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(M),b++}else if(z.isRectAreaLight){const w=s.rectArea[T];w.position.setFromMatrixPosition(z.matrixWorld),w.position.applyMatrix4(M),f.identity(),c.copy(z.matrixWorld),c.premultiply(M),f.extractRotation(c),w.halfWidth.set(z.width*.5,0,0),w.halfHeight.set(0,z.height*.5,0),w.halfWidth.applyMatrix4(f),w.halfHeight.applyMatrix4(f),T++}else if(z.isPointLight){const w=s.point[g];w.position.setFromMatrixPosition(z.matrixWorld),w.position.applyMatrix4(M),g++}else if(z.isHemisphereLight){const w=s.hemi[C];w.direction.setFromMatrixPosition(z.matrixWorld),w.direction.transformDirection(M),C++}}}return{setup:p,setupView:m,state:s}}function T_(r){const e=new t2(r),i=[],s=[],l=[];function c(g){_.camera=g,i.length=0,s.length=0,l.length=0}function f(g){i.push(g)}function p(g){s.push(g)}function m(g){l.push(g)}function d(){e.setup(i)}function v(g){e.setupView(i,g)}const _={lightsArray:i,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:_,setupLights:d,setupLightsView:v,pushLight:f,pushShadow:p,pushLightProbeGrid:m}}function n2(r){let e=new WeakMap;function i(l,c=0){const f=e.get(l);let p;return f===void 0?(p=new T_(r),e.set(l,[p])):c>=f.length?(p=new T_(r),f.push(p)):p=f[c],p}function s(){e=new WeakMap}return{get:i,dispose:s}}const i2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,a2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,s2=[new ne(1,0,0),new ne(-1,0,0),new ne(0,1,0),new ne(0,-1,0),new ne(0,0,1),new ne(0,0,-1)],r2=[new ne(0,-1,0),new ne(0,-1,0),new ne(0,0,1),new ne(0,0,-1),new ne(0,-1,0),new ne(0,-1,0)],A_=new fn,nl=new ne,cd=new ne;function o2(r,e,i){let s=new gp;const l=new xt,c=new xt,f=new hn,p=new gb,m=new vb,d={},v=i.maxTextureSize,_={[ys]:fi,[fi]:ys,[aa]:aa},g=new ua({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xt},radius:{value:4}},vertexShader:i2,fragmentShader:a2}),b=g.clone();b.defines.HORIZONTAL_PASS=1;const T=new Dn;T.setAttribute("position",new Ai(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const C=new yn(T,g),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$c;let x=this.type;this.render=function(L,I,A){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||L.length===0)return;this.type===C_&&(ft("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=$c);const O=r.getRenderTarget(),k=r.getActiveCubeFace(),X=r.getActiveMipmapLevel(),K=r.state;K.setBlending(za),K.buffers.depth.getReversed()===!0?K.buffers.color.setClear(0,0,0,0):K.buffers.color.setClear(1,1,1,1),K.buffers.depth.setTest(!0),K.setScissorTest(!1);const V=x!==this.type;V&&I.traverse(function(re){re.material&&(Array.isArray(re.material)?re.material.forEach(Z=>Z.needsUpdate=!0):re.material.needsUpdate=!0)});for(let re=0,Z=L.length;re<Z;re++){const P=L[re],U=P.shadow;if(U===void 0){ft("WebGLShadowMap:",P,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;l.copy(U.mapSize);const W=U.getFrameExtents();l.multiply(W),c.copy(U.mapSize),(l.x>v||l.y>v)&&(l.x>v&&(c.x=Math.floor(v/W.x),l.x=c.x*W.x,U.mapSize.x=c.x),l.y>v&&(c.y=Math.floor(v/W.y),l.y=c.y*W.y,U.mapSize.y=c.y));const se=r.state.buffers.depth.getReversed();if(U.camera._reversedDepth=se,U.map===null||V===!0){if(U.map!==null&&(U.map.depthTexture!==null&&(U.map.depthTexture.dispose(),U.map.depthTexture=null),U.map.dispose()),this.type===il){if(P.isPointLight){ft("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}U.map=new la(l.x,l.y,{format:Qs,type:Fa,minFilter:Qn,magFilter:Qn,generateMipmaps:!1}),U.map.texture.name=P.name+".shadowMap",U.map.depthTexture=new to(l.x,l.y,sa),U.map.depthTexture.name=P.name+".shadowMapDepth",U.map.depthTexture.format=Ga,U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Vn,U.map.depthTexture.magFilter=Vn}else P.isPointLight?(U.map=new sx(l.x),U.map.depthTexture=new lb(l.x,ca)):(U.map=new la(l.x,l.y),U.map.depthTexture=new to(l.x,l.y,ca)),U.map.depthTexture.name=P.name+".shadowMap",U.map.depthTexture.format=Ga,this.type===$c?(U.map.depthTexture.compareFunction=se?fp:up,U.map.depthTexture.minFilter=Qn,U.map.depthTexture.magFilter=Qn):(U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Vn,U.map.depthTexture.magFilter=Vn);U.camera.updateProjectionMatrix()}const B=U.map.isWebGLCubeRenderTarget?6:1;for(let S=0;S<B;S++){if(U.map.isWebGLCubeRenderTarget)r.setRenderTarget(U.map,S),r.clear();else{S===0&&(r.setRenderTarget(U.map),r.clear());const H=U.getViewport(S);f.set(c.x*H.x,c.y*H.y,c.x*H.z,c.y*H.w),K.viewport(f)}if(P.isPointLight){const H=U.camera,le=U.matrix,ye=P.distance||H.far;ye!==H.far&&(H.far=ye,H.updateProjectionMatrix()),nl.setFromMatrixPosition(P.matrixWorld),H.position.copy(nl),cd.copy(H.position),cd.add(s2[S]),H.up.copy(r2[S]),H.lookAt(cd),H.updateMatrixWorld(),le.makeTranslation(-nl.x,-nl.y,-nl.z),A_.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),U._frustum.setFromProjectionMatrix(A_,H.coordinateSystem,H.reversedDepth)}else U.updateMatrices(P);s=U.getFrustum(),w(I,A,U.camera,P,this.type)}U.isPointLightShadow!==!0&&this.type===il&&N(U,A),U.needsUpdate=!1}x=this.type,M.needsUpdate=!1,r.setRenderTarget(O,k,X)};function N(L,I){const A=e.update(C);g.defines.VSM_SAMPLES!==L.blurSamples&&(g.defines.VSM_SAMPLES=L.blurSamples,b.defines.VSM_SAMPLES=L.blurSamples,g.needsUpdate=!0,b.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new la(l.x,l.y,{format:Qs,type:Fa})),g.uniforms.shadow_pass.value=L.map.depthTexture,g.uniforms.resolution.value=L.mapSize,g.uniforms.radius.value=L.radius,r.setRenderTarget(L.mapPass),r.clear(),r.renderBufferDirect(I,null,A,g,C,null),b.uniforms.shadow_pass.value=L.mapPass.texture,b.uniforms.resolution.value=L.mapSize,b.uniforms.radius.value=L.radius,r.setRenderTarget(L.map),r.clear(),r.renderBufferDirect(I,null,A,b,C,null)}function z(L,I,A,O){let k=null;const X=A.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(X!==void 0)k=X;else if(k=A.isPointLight===!0?m:p,r.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const K=k.uuid,V=I.uuid;let re=d[K];re===void 0&&(re={},d[K]=re);let Z=re[V];Z===void 0&&(Z=k.clone(),re[V]=Z,I.addEventListener("dispose",G)),k=Z}if(k.visible=I.visible,k.wireframe=I.wireframe,O===il?k.side=I.shadowSide!==null?I.shadowSide:I.side:k.side=I.shadowSide!==null?I.shadowSide:_[I.side],k.alphaMap=I.alphaMap,k.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,k.map=I.map,k.clipShadows=I.clipShadows,k.clippingPlanes=I.clippingPlanes,k.clipIntersection=I.clipIntersection,k.displacementMap=I.displacementMap,k.displacementScale=I.displacementScale,k.displacementBias=I.displacementBias,k.wireframeLinewidth=I.wireframeLinewidth,k.linewidth=I.linewidth,A.isPointLight===!0&&k.isMeshDistanceMaterial===!0){const K=r.properties.get(k);K.light=A}return k}function w(L,I,A,O,k){if(L.visible===!1)return;if(L.layers.test(I.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&k===il)&&(!L.frustumCulled||s.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,L.matrixWorld);const V=e.update(L),re=L.material;if(Array.isArray(re)){const Z=V.groups;for(let P=0,U=Z.length;P<U;P++){const W=Z[P],se=re[W.materialIndex];if(se&&se.visible){const B=z(L,se,O,k);L.onBeforeShadow(r,L,I,A,V,B,W),r.renderBufferDirect(A,null,V,B,L,W),L.onAfterShadow(r,L,I,A,V,B,W)}}}else if(re.visible){const Z=z(L,re,O,k);L.onBeforeShadow(r,L,I,A,V,Z,null),r.renderBufferDirect(A,null,V,Z,L,null),L.onAfterShadow(r,L,I,A,V,Z,null)}}const K=L.children;for(let V=0,re=K.length;V<re;V++)w(K[V],I,A,O,k)}function G(L){L.target.removeEventListener("dispose",G);for(const A in d){const O=d[A],k=L.target.uuid;k in O&&(O[k].dispose(),delete O[k])}}}function l2(r,e){function i(){let J=!1;const Ue=new hn;let Me=null;const Oe=new hn(0,0,0,0);return{setMask:function(Fe){Me!==Fe&&!J&&(r.colorMask(Fe,Fe,Fe,Fe),Me=Fe)},setLocked:function(Fe){J=Fe},setClear:function(Fe,we,Ze,We,an){an===!0&&(Fe*=We,we*=We,Ze*=We),Ue.set(Fe,we,Ze,We),Oe.equals(Ue)===!1&&(r.clearColor(Fe,we,Ze,We),Oe.copy(Ue))},reset:function(){J=!1,Me=null,Oe.set(-1,0,0,0)}}}function s(){let J=!1,Ue=!1,Me=null,Oe=null,Fe=null;return{setReversed:function(we){if(Ue!==we){const Ze=e.get("EXT_clip_control");we?Ze.clipControlEXT(Ze.LOWER_LEFT_EXT,Ze.ZERO_TO_ONE_EXT):Ze.clipControlEXT(Ze.LOWER_LEFT_EXT,Ze.NEGATIVE_ONE_TO_ONE_EXT),Ue=we;const We=Fe;Fe=null,this.setClear(We)}},getReversed:function(){return Ue},setTest:function(we){we?ve(r.DEPTH_TEST):Ce(r.DEPTH_TEST)},setMask:function(we){Me!==we&&!J&&(r.depthMask(we),Me=we)},setFunc:function(we){if(Ue&&(we=_S[we]),Oe!==we){switch(we){case hd:r.depthFunc(r.NEVER);break;case dd:r.depthFunc(r.ALWAYS);break;case pd:r.depthFunc(r.LESS);break;case $r:r.depthFunc(r.LEQUAL);break;case md:r.depthFunc(r.EQUAL);break;case gd:r.depthFunc(r.GEQUAL);break;case vd:r.depthFunc(r.GREATER);break;case _d:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Oe=we}},setLocked:function(we){J=we},setClear:function(we){Fe!==we&&(Fe=we,Ue&&(we=1-we),r.clearDepth(we))},reset:function(){J=!1,Me=null,Oe=null,Fe=null,Ue=!1}}}function l(){let J=!1,Ue=null,Me=null,Oe=null,Fe=null,we=null,Ze=null,We=null,an=null;return{setTest:function(Ht){J||(Ht?ve(r.STENCIL_TEST):Ce(r.STENCIL_TEST))},setMask:function(Ht){Ue!==Ht&&!J&&(r.stencilMask(Ht),Ue=Ht)},setFunc:function(Ht,kn,Ln){(Me!==Ht||Oe!==kn||Fe!==Ln)&&(r.stencilFunc(Ht,kn,Ln),Me=Ht,Oe=kn,Fe=Ln)},setOp:function(Ht,kn,Ln){(we!==Ht||Ze!==kn||We!==Ln)&&(r.stencilOp(Ht,kn,Ln),we=Ht,Ze=kn,We=Ln)},setLocked:function(Ht){J=Ht},setClear:function(Ht){an!==Ht&&(r.clearStencil(Ht),an=Ht)},reset:function(){J=!1,Ue=null,Me=null,Oe=null,Fe=null,we=null,Ze=null,We=null,an=null}}}const c=new i,f=new s,p=new l,m=new WeakMap,d=new WeakMap;let v={},_={},g={},b=new WeakMap,T=[],C=null,M=!1,x=null,N=null,z=null,w=null,G=null,L=null,I=null,A=new Qe(0,0,0),O=0,k=!1,X=null,K=null,V=null,re=null,Z=null;const P=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,W=0;const se=r.getParameter(r.VERSION);se.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(se)[1]),U=W>=1):se.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(se)[1]),U=W>=2);let B=null,S={};const H=r.getParameter(r.SCISSOR_BOX),le=r.getParameter(r.VIEWPORT),ye=new hn().fromArray(H),Te=new hn().fromArray(le);function $(J,Ue,Me,Oe){const Fe=new Uint8Array(4),we=r.createTexture();r.bindTexture(J,we),r.texParameteri(J,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(J,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ze=0;Ze<Me;Ze++)J===r.TEXTURE_3D||J===r.TEXTURE_2D_ARRAY?r.texImage3D(Ue,0,r.RGBA,1,1,Oe,0,r.RGBA,r.UNSIGNED_BYTE,Fe):r.texImage2D(Ue+Ze,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Fe);return we}const ce={};ce[r.TEXTURE_2D]=$(r.TEXTURE_2D,r.TEXTURE_2D,1),ce[r.TEXTURE_CUBE_MAP]=$(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[r.TEXTURE_2D_ARRAY]=$(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ce[r.TEXTURE_3D]=$(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),p.setClear(0),ve(r.DEPTH_TEST),f.setFunc($r),Tt(!1),Nt(Sv),ve(r.CULL_FACE),ot(za);function ve(J){v[J]!==!0&&(r.enable(J),v[J]=!0)}function Ce(J){v[J]!==!1&&(r.disable(J),v[J]=!1)}function Ve(J,Ue){return g[J]!==Ue?(r.bindFramebuffer(J,Ue),g[J]=Ue,J===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=Ue),J===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=Ue),!0):!1}function Ie(J,Ue){let Me=T,Oe=!1;if(J){Me=b.get(Ue),Me===void 0&&(Me=[],b.set(Ue,Me));const Fe=J.textures;if(Me.length!==Fe.length||Me[0]!==r.COLOR_ATTACHMENT0){for(let we=0,Ze=Fe.length;we<Ze;we++)Me[we]=r.COLOR_ATTACHMENT0+we;Me.length=Fe.length,Oe=!0}}else Me[0]!==r.BACK&&(Me[0]=r.BACK,Oe=!0);Oe&&r.drawBuffers(Me)}function rt(J){return C!==J?(r.useProgram(J),C=J,!0):!1}const $e={[Ws]:r.FUNC_ADD,[HM]:r.FUNC_SUBTRACT,[VM]:r.FUNC_REVERSE_SUBTRACT};$e[kM]=r.MIN,$e[XM]=r.MAX;const ke={[WM]:r.ZERO,[qM]:r.ONE,[YM]:r.SRC_COLOR,[ud]:r.SRC_ALPHA,[$M]:r.SRC_ALPHA_SATURATE,[QM]:r.DST_COLOR,[jM]:r.DST_ALPHA,[ZM]:r.ONE_MINUS_SRC_COLOR,[fd]:r.ONE_MINUS_SRC_ALPHA,[JM]:r.ONE_MINUS_DST_COLOR,[KM]:r.ONE_MINUS_DST_ALPHA,[eS]:r.CONSTANT_COLOR,[tS]:r.ONE_MINUS_CONSTANT_COLOR,[nS]:r.CONSTANT_ALPHA,[iS]:r.ONE_MINUS_CONSTANT_ALPHA};function ot(J,Ue,Me,Oe,Fe,we,Ze,We,an,Ht){if(J===za){M===!0&&(Ce(r.BLEND),M=!1);return}if(M===!1&&(ve(r.BLEND),M=!0),J!==GM){if(J!==x||Ht!==k){if((N!==Ws||G!==Ws)&&(r.blendEquation(r.FUNC_ADD),N=Ws,G=Ws),Ht)switch(J){case jr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Zr:r.blendFunc(r.ONE,r.ONE);break;case bv:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ev:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:It("WebGLState: Invalid blending: ",J);break}else switch(J){case jr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Zr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case bv:It("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ev:It("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:It("WebGLState: Invalid blending: ",J);break}z=null,w=null,L=null,I=null,A.set(0,0,0),O=0,x=J,k=Ht}return}Fe=Fe||Ue,we=we||Me,Ze=Ze||Oe,(Ue!==N||Fe!==G)&&(r.blendEquationSeparate($e[Ue],$e[Fe]),N=Ue,G=Fe),(Me!==z||Oe!==w||we!==L||Ze!==I)&&(r.blendFuncSeparate(ke[Me],ke[Oe],ke[we],ke[Ze]),z=Me,w=Oe,L=we,I=Ze),(We.equals(A)===!1||an!==O)&&(r.blendColor(We.r,We.g,We.b,an),A.copy(We),O=an),x=J,k=!1}function lt(J,Ue){J.side===aa?Ce(r.CULL_FACE):ve(r.CULL_FACE);let Me=J.side===fi;Ue&&(Me=!Me),Tt(Me),J.blending===jr&&J.transparent===!1?ot(za):ot(J.blending,J.blendEquation,J.blendSrc,J.blendDst,J.blendEquationAlpha,J.blendSrcAlpha,J.blendDstAlpha,J.blendColor,J.blendAlpha,J.premultipliedAlpha),f.setFunc(J.depthFunc),f.setTest(J.depthTest),f.setMask(J.depthWrite),c.setMask(J.colorWrite);const Oe=J.stencilWrite;p.setTest(Oe),Oe&&(p.setMask(J.stencilWriteMask),p.setFunc(J.stencilFunc,J.stencilRef,J.stencilFuncMask),p.setOp(J.stencilFail,J.stencilZFail,J.stencilZPass)),Lt(J.polygonOffset,J.polygonOffsetFactor,J.polygonOffsetUnits),J.alphaToCoverage===!0?ve(r.SAMPLE_ALPHA_TO_COVERAGE):Ce(r.SAMPLE_ALPHA_TO_COVERAGE)}function Tt(J){X!==J&&(J?r.frontFace(r.CW):r.frontFace(r.CCW),X=J)}function Nt(J){J!==BM?(ve(r.CULL_FACE),J!==K&&(J===Sv?r.cullFace(r.BACK):J===FM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ce(r.CULL_FACE),K=J}function Ut(J){J!==V&&(U&&r.lineWidth(J),V=J)}function Lt(J,Ue,Me){J?(ve(r.POLYGON_OFFSET_FILL),(re!==Ue||Z!==Me)&&(re=Ue,Z=Me,f.getReversed()&&(Ue=-Ue),r.polygonOffset(Ue,Me))):Ce(r.POLYGON_OFFSET_FILL)}function Gt(J){J?ve(r.SCISSOR_TEST):Ce(r.SCISSOR_TEST)}function en(J){J===void 0&&(J=r.TEXTURE0+P-1),B!==J&&(r.activeTexture(J),B=J)}function ee(J,Ue,Me){Me===void 0&&(B===null?Me=r.TEXTURE0+P-1:Me=B);let Oe=S[Me];Oe===void 0&&(Oe={type:void 0,texture:void 0},S[Me]=Oe),(Oe.type!==J||Oe.texture!==Ue)&&(B!==Me&&(r.activeTexture(Me),B=Me),r.bindTexture(J,Ue||ce[J]),Oe.type=J,Oe.texture=Ue)}function Ot(){const J=S[B];J!==void 0&&J.type!==void 0&&(r.bindTexture(J.type,null),J.type=void 0,J.texture=void 0)}function At(){try{r.compressedTexImage2D(...arguments)}catch(J){It("WebGLState:",J)}}function F(){try{r.compressedTexImage3D(...arguments)}catch(J){It("WebGLState:",J)}}function E(){try{r.texSubImage2D(...arguments)}catch(J){It("WebGLState:",J)}}function ie(){try{r.texSubImage3D(...arguments)}catch(J){It("WebGLState:",J)}}function fe(){try{r.compressedTexSubImage2D(...arguments)}catch(J){It("WebGLState:",J)}}function xe(){try{r.compressedTexSubImage3D(...arguments)}catch(J){It("WebGLState:",J)}}function be(){try{r.texStorage2D(...arguments)}catch(J){It("WebGLState:",J)}}function Ne(){try{r.texStorage3D(...arguments)}catch(J){It("WebGLState:",J)}}function q(){try{r.texImage2D(...arguments)}catch(J){It("WebGLState:",J)}}function oe(){try{r.texImage3D(...arguments)}catch(J){It("WebGLState:",J)}}function De(J){return _[J]!==void 0?_[J]:r.getParameter(J)}function ze(J,Ue){_[J]!==Ue&&(r.pixelStorei(J,Ue),_[J]=Ue)}function Pe(J){ye.equals(J)===!1&&(r.scissor(J.x,J.y,J.z,J.w),ye.copy(J))}function Le(J){Te.equals(J)===!1&&(r.viewport(J.x,J.y,J.z,J.w),Te.copy(J))}function tt(J,Ue){let Me=d.get(Ue);Me===void 0&&(Me=new WeakMap,d.set(Ue,Me));let Oe=Me.get(J);Oe===void 0&&(Oe=r.getUniformBlockIndex(Ue,J.name),Me.set(J,Oe))}function nt(J,Ue){const Oe=d.get(Ue).get(J);m.get(Ue)!==Oe&&(r.uniformBlockBinding(Ue,Oe,J.__bindingPointIndex),m.set(Ue,Oe))}function ut(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),v={},_={},B=null,S={},g={},b=new WeakMap,T=[],C=null,M=!1,x=null,N=null,z=null,w=null,G=null,L=null,I=null,A=new Qe(0,0,0),O=0,k=!1,X=null,K=null,V=null,re=null,Z=null,ye.set(0,0,r.canvas.width,r.canvas.height),Te.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),p.reset()}return{buffers:{color:c,depth:f,stencil:p},enable:ve,disable:Ce,bindFramebuffer:Ve,drawBuffers:Ie,useProgram:rt,setBlending:ot,setMaterial:lt,setFlipSided:Tt,setCullFace:Nt,setLineWidth:Ut,setPolygonOffset:Lt,setScissorTest:Gt,activeTexture:en,bindTexture:ee,unbindTexture:Ot,compressedTexImage2D:At,compressedTexImage3D:F,texImage2D:q,texImage3D:oe,pixelStorei:ze,getParameter:De,updateUBOMapping:tt,uniformBlockBinding:nt,texStorage2D:be,texStorage3D:Ne,texSubImage2D:E,texSubImage3D:ie,compressedTexSubImage2D:fe,compressedTexSubImage3D:xe,scissor:Pe,viewport:Le,reset:ut}}function c2(r,e,i,s,l,c,f){const p=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new xt,v=new WeakMap,_=new Set;let g;const b=new WeakMap;let T=!1;try{T=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function C(F,E){return T?new OffscreenCanvas(F,E):uu("canvas")}function M(F,E,ie){let fe=1;const xe=At(F);if((xe.width>ie||xe.height>ie)&&(fe=ie/Math.max(xe.width,xe.height)),fe<1)if(typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&F instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&F instanceof ImageBitmap||typeof VideoFrame<"u"&&F instanceof VideoFrame){const be=Math.floor(fe*xe.width),Ne=Math.floor(fe*xe.height);g===void 0&&(g=C(be,Ne));const q=E?C(be,Ne):g;return q.width=be,q.height=Ne,q.getContext("2d").drawImage(F,0,0,be,Ne),ft("WebGLRenderer: Texture has been resized from ("+xe.width+"x"+xe.height+") to ("+be+"x"+Ne+")."),q}else return"data"in F&&ft("WebGLRenderer: Image in DataTexture is too big ("+xe.width+"x"+xe.height+")."),F;return F}function x(F){return F.generateMipmaps}function N(F){r.generateMipmap(F)}function z(F){return F.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:F.isWebGL3DRenderTarget?r.TEXTURE_3D:F.isWebGLArrayRenderTarget||F.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function w(F,E,ie,fe,xe,be=!1){if(F!==null){if(r[F]!==void 0)return r[F];ft("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+F+"'")}let Ne;fe&&(Ne=e.get("EXT_texture_norm16"),Ne||ft("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=E;if(E===r.RED&&(ie===r.FLOAT&&(q=r.R32F),ie===r.HALF_FLOAT&&(q=r.R16F),ie===r.UNSIGNED_BYTE&&(q=r.R8),ie===r.UNSIGNED_SHORT&&Ne&&(q=Ne.R16_EXT),ie===r.SHORT&&Ne&&(q=Ne.R16_SNORM_EXT)),E===r.RED_INTEGER&&(ie===r.UNSIGNED_BYTE&&(q=r.R8UI),ie===r.UNSIGNED_SHORT&&(q=r.R16UI),ie===r.UNSIGNED_INT&&(q=r.R32UI),ie===r.BYTE&&(q=r.R8I),ie===r.SHORT&&(q=r.R16I),ie===r.INT&&(q=r.R32I)),E===r.RG&&(ie===r.FLOAT&&(q=r.RG32F),ie===r.HALF_FLOAT&&(q=r.RG16F),ie===r.UNSIGNED_BYTE&&(q=r.RG8),ie===r.UNSIGNED_SHORT&&Ne&&(q=Ne.RG16_EXT),ie===r.SHORT&&Ne&&(q=Ne.RG16_SNORM_EXT)),E===r.RG_INTEGER&&(ie===r.UNSIGNED_BYTE&&(q=r.RG8UI),ie===r.UNSIGNED_SHORT&&(q=r.RG16UI),ie===r.UNSIGNED_INT&&(q=r.RG32UI),ie===r.BYTE&&(q=r.RG8I),ie===r.SHORT&&(q=r.RG16I),ie===r.INT&&(q=r.RG32I)),E===r.RGB_INTEGER&&(ie===r.UNSIGNED_BYTE&&(q=r.RGB8UI),ie===r.UNSIGNED_SHORT&&(q=r.RGB16UI),ie===r.UNSIGNED_INT&&(q=r.RGB32UI),ie===r.BYTE&&(q=r.RGB8I),ie===r.SHORT&&(q=r.RGB16I),ie===r.INT&&(q=r.RGB32I)),E===r.RGBA_INTEGER&&(ie===r.UNSIGNED_BYTE&&(q=r.RGBA8UI),ie===r.UNSIGNED_SHORT&&(q=r.RGBA16UI),ie===r.UNSIGNED_INT&&(q=r.RGBA32UI),ie===r.BYTE&&(q=r.RGBA8I),ie===r.SHORT&&(q=r.RGBA16I),ie===r.INT&&(q=r.RGBA32I)),E===r.RGB&&(ie===r.UNSIGNED_SHORT&&Ne&&(q=Ne.RGB16_EXT),ie===r.SHORT&&Ne&&(q=Ne.RGB16_SNORM_EXT),ie===r.UNSIGNED_INT_5_9_9_9_REV&&(q=r.RGB9_E5),ie===r.UNSIGNED_INT_10F_11F_11F_REV&&(q=r.R11F_G11F_B10F)),E===r.RGBA){const oe=be?cu:Dt.getTransfer(xe);ie===r.FLOAT&&(q=r.RGBA32F),ie===r.HALF_FLOAT&&(q=r.RGBA16F),ie===r.UNSIGNED_BYTE&&(q=oe===Kt?r.SRGB8_ALPHA8:r.RGBA8),ie===r.UNSIGNED_SHORT&&Ne&&(q=Ne.RGBA16_EXT),ie===r.SHORT&&Ne&&(q=Ne.RGBA16_SNORM_EXT),ie===r.UNSIGNED_SHORT_4_4_4_4&&(q=r.RGBA4),ie===r.UNSIGNED_SHORT_5_5_5_1&&(q=r.RGB5_A1)}return(q===r.R16F||q===r.R32F||q===r.RG16F||q===r.RG32F||q===r.RGBA16F||q===r.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function G(F,E){let ie;return F?E===null||E===ca||E===ll?ie=r.DEPTH24_STENCIL8:E===sa?ie=r.DEPTH32F_STENCIL8:E===ol&&(ie=r.DEPTH24_STENCIL8,ft("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===ca||E===ll?ie=r.DEPTH_COMPONENT24:E===sa?ie=r.DEPTH_COMPONENT32F:E===ol&&(ie=r.DEPTH_COMPONENT16),ie}function L(F,E){return x(F)===!0||F.isFramebufferTexture&&F.minFilter!==Vn&&F.minFilter!==Qn?Math.log2(Math.max(E.width,E.height))+1:F.mipmaps!==void 0&&F.mipmaps.length>0?F.mipmaps.length:F.isCompressedTexture&&Array.isArray(F.image)?E.mipmaps.length:1}function I(F){const E=F.target;E.removeEventListener("dispose",I),O(E),E.isVideoTexture&&v.delete(E),E.isHTMLTexture&&_.delete(E)}function A(F){const E=F.target;E.removeEventListener("dispose",A),X(E)}function O(F){const E=s.get(F);if(E.__webglInit===void 0)return;const ie=F.source,fe=b.get(ie);if(fe){const xe=fe[E.__cacheKey];xe.usedTimes--,xe.usedTimes===0&&k(F),Object.keys(fe).length===0&&b.delete(ie)}s.remove(F)}function k(F){const E=s.get(F);r.deleteTexture(E.__webglTexture);const ie=F.source,fe=b.get(ie);delete fe[E.__cacheKey],f.memory.textures--}function X(F){const E=s.get(F);if(F.depthTexture&&(F.depthTexture.dispose(),s.remove(F.depthTexture)),F.isWebGLCubeRenderTarget)for(let fe=0;fe<6;fe++){if(Array.isArray(E.__webglFramebuffer[fe]))for(let xe=0;xe<E.__webglFramebuffer[fe].length;xe++)r.deleteFramebuffer(E.__webglFramebuffer[fe][xe]);else r.deleteFramebuffer(E.__webglFramebuffer[fe]);E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer[fe])}else{if(Array.isArray(E.__webglFramebuffer))for(let fe=0;fe<E.__webglFramebuffer.length;fe++)r.deleteFramebuffer(E.__webglFramebuffer[fe]);else r.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&r.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let fe=0;fe<E.__webglColorRenderbuffer.length;fe++)E.__webglColorRenderbuffer[fe]&&r.deleteRenderbuffer(E.__webglColorRenderbuffer[fe]);E.__webglDepthRenderbuffer&&r.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const ie=F.textures;for(let fe=0,xe=ie.length;fe<xe;fe++){const be=s.get(ie[fe]);be.__webglTexture&&(r.deleteTexture(be.__webglTexture),f.memory.textures--),s.remove(ie[fe])}s.remove(F)}let K=0;function V(){K=0}function re(){return K}function Z(F){K=F}function P(){const F=K;return F>=l.maxTextures&&ft("WebGLTextures: Trying to use "+F+" texture units while this GPU supports only "+l.maxTextures),K+=1,F}function U(F){const E=[];return E.push(F.wrapS),E.push(F.wrapT),E.push(F.wrapR||0),E.push(F.magFilter),E.push(F.minFilter),E.push(F.anisotropy),E.push(F.internalFormat),E.push(F.format),E.push(F.type),E.push(F.generateMipmaps),E.push(F.premultiplyAlpha),E.push(F.flipY),E.push(F.unpackAlignment),E.push(F.colorSpace),E.join()}function W(F,E){const ie=s.get(F);if(F.isVideoTexture&&ee(F),F.isRenderTargetTexture===!1&&F.isExternalTexture!==!0&&F.version>0&&ie.__version!==F.version){const fe=F.image;if(fe===null)ft("WebGLRenderer: Texture marked for update but no image data found.");else if(fe.complete===!1)ft("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(ie,F,E);return}}else F.isExternalTexture&&(ie.__webglTexture=F.sourceTexture?F.sourceTexture:null);i.bindTexture(r.TEXTURE_2D,ie.__webglTexture,r.TEXTURE0+E)}function se(F,E){const ie=s.get(F);if(F.isRenderTargetTexture===!1&&F.version>0&&ie.__version!==F.version){Ce(ie,F,E);return}else F.isExternalTexture&&(ie.__webglTexture=F.sourceTexture?F.sourceTexture:null);i.bindTexture(r.TEXTURE_2D_ARRAY,ie.__webglTexture,r.TEXTURE0+E)}function B(F,E){const ie=s.get(F);if(F.isRenderTargetTexture===!1&&F.version>0&&ie.__version!==F.version){Ce(ie,F,E);return}i.bindTexture(r.TEXTURE_3D,ie.__webglTexture,r.TEXTURE0+E)}function S(F,E){const ie=s.get(F);if(F.isCubeDepthTexture!==!0&&F.version>0&&ie.__version!==F.version){Ve(ie,F,E);return}i.bindTexture(r.TEXTURE_CUBE_MAP,ie.__webglTexture,r.TEXTURE0+E)}const H={[xd]:r.REPEAT,[Pa]:r.CLAMP_TO_EDGE,[yd]:r.MIRRORED_REPEAT},le={[Vn]:r.NEAREST,[rS]:r.NEAREST_MIPMAP_NEAREST,[bc]:r.NEAREST_MIPMAP_LINEAR,[Qn]:r.LINEAR,[Uh]:r.LINEAR_MIPMAP_NEAREST,[Ys]:r.LINEAR_MIPMAP_LINEAR},ye={[cS]:r.NEVER,[pS]:r.ALWAYS,[uS]:r.LESS,[up]:r.LEQUAL,[fS]:r.EQUAL,[fp]:r.GEQUAL,[hS]:r.GREATER,[dS]:r.NOTEQUAL};function Te(F,E){if(E.type===sa&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Qn||E.magFilter===Uh||E.magFilter===bc||E.magFilter===Ys||E.minFilter===Qn||E.minFilter===Uh||E.minFilter===bc||E.minFilter===Ys)&&ft("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(F,r.TEXTURE_WRAP_S,H[E.wrapS]),r.texParameteri(F,r.TEXTURE_WRAP_T,H[E.wrapT]),(F===r.TEXTURE_3D||F===r.TEXTURE_2D_ARRAY)&&r.texParameteri(F,r.TEXTURE_WRAP_R,H[E.wrapR]),r.texParameteri(F,r.TEXTURE_MAG_FILTER,le[E.magFilter]),r.texParameteri(F,r.TEXTURE_MIN_FILTER,le[E.minFilter]),E.compareFunction&&(r.texParameteri(F,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(F,r.TEXTURE_COMPARE_FUNC,ye[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Vn||E.minFilter!==bc&&E.minFilter!==Ys||E.type===sa&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||s.get(E).__currentAnisotropy){const ie=e.get("EXT_texture_filter_anisotropic");r.texParameterf(F,ie.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,l.getMaxAnisotropy())),s.get(E).__currentAnisotropy=E.anisotropy}}}function $(F,E){let ie=!1;F.__webglInit===void 0&&(F.__webglInit=!0,E.addEventListener("dispose",I));const fe=E.source;let xe=b.get(fe);xe===void 0&&(xe={},b.set(fe,xe));const be=U(E);if(be!==F.__cacheKey){xe[be]===void 0&&(xe[be]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,ie=!0),xe[be].usedTimes++;const Ne=xe[F.__cacheKey];Ne!==void 0&&(xe[F.__cacheKey].usedTimes--,Ne.usedTimes===0&&k(E)),F.__cacheKey=be,F.__webglTexture=xe[be].texture}return ie}function ce(F,E,ie){return Math.floor(Math.floor(F/ie)/E)}function ve(F,E,ie,fe){const be=F.updateRanges;if(be.length===0)i.texSubImage2D(r.TEXTURE_2D,0,0,0,E.width,E.height,ie,fe,E.data);else{be.sort((ze,Pe)=>ze.start-Pe.start);let Ne=0;for(let ze=1;ze<be.length;ze++){const Pe=be[Ne],Le=be[ze],tt=Pe.start+Pe.count,nt=ce(Le.start,E.width,4),ut=ce(Pe.start,E.width,4);Le.start<=tt+1&&nt===ut&&ce(Le.start+Le.count-1,E.width,4)===nt?Pe.count=Math.max(Pe.count,Le.start+Le.count-Pe.start):(++Ne,be[Ne]=Le)}be.length=Ne+1;const q=i.getParameter(r.UNPACK_ROW_LENGTH),oe=i.getParameter(r.UNPACK_SKIP_PIXELS),De=i.getParameter(r.UNPACK_SKIP_ROWS);i.pixelStorei(r.UNPACK_ROW_LENGTH,E.width);for(let ze=0,Pe=be.length;ze<Pe;ze++){const Le=be[ze],tt=Math.floor(Le.start/4),nt=Math.ceil(Le.count/4),ut=tt%E.width,J=Math.floor(tt/E.width),Ue=nt,Me=1;i.pixelStorei(r.UNPACK_SKIP_PIXELS,ut),i.pixelStorei(r.UNPACK_SKIP_ROWS,J),i.texSubImage2D(r.TEXTURE_2D,0,ut,J,Ue,Me,ie,fe,E.data)}F.clearUpdateRanges(),i.pixelStorei(r.UNPACK_ROW_LENGTH,q),i.pixelStorei(r.UNPACK_SKIP_PIXELS,oe),i.pixelStorei(r.UNPACK_SKIP_ROWS,De)}}function Ce(F,E,ie){let fe=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(fe=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(fe=r.TEXTURE_3D);const xe=$(F,E),be=E.source;i.bindTexture(fe,F.__webglTexture,r.TEXTURE0+ie);const Ne=s.get(be);if(be.version!==Ne.__version||xe===!0){if(i.activeTexture(r.TEXTURE0+ie),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const Me=Dt.getPrimaries(Dt.workingColorSpace),Oe=E.colorSpace===_s?null:Dt.getPrimaries(E.colorSpace),Fe=E.colorSpace===_s||Me===Oe?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe)}i.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment);let oe=M(E.image,!1,l.maxTextureSize);oe=Ot(E,oe);const De=c.convert(E.format,E.colorSpace),ze=c.convert(E.type);let Pe=w(E.internalFormat,De,ze,E.normalized,E.colorSpace,E.isVideoTexture);Te(fe,E);let Le;const tt=E.mipmaps,nt=E.isVideoTexture!==!0,ut=Ne.__version===void 0||xe===!0,J=be.dataReady,Ue=L(E,oe);if(E.isDepthTexture)Pe=G(E.format===Zs,E.type),ut&&(nt?i.texStorage2D(r.TEXTURE_2D,1,Pe,oe.width,oe.height):i.texImage2D(r.TEXTURE_2D,0,Pe,oe.width,oe.height,0,De,ze,null));else if(E.isDataTexture)if(tt.length>0){nt&&ut&&i.texStorage2D(r.TEXTURE_2D,Ue,Pe,tt[0].width,tt[0].height);for(let Me=0,Oe=tt.length;Me<Oe;Me++)Le=tt[Me],nt?J&&i.texSubImage2D(r.TEXTURE_2D,Me,0,0,Le.width,Le.height,De,ze,Le.data):i.texImage2D(r.TEXTURE_2D,Me,Pe,Le.width,Le.height,0,De,ze,Le.data);E.generateMipmaps=!1}else nt?(ut&&i.texStorage2D(r.TEXTURE_2D,Ue,Pe,oe.width,oe.height),J&&ve(E,oe,De,ze)):i.texImage2D(r.TEXTURE_2D,0,Pe,oe.width,oe.height,0,De,ze,oe.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){nt&&ut&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Ue,Pe,tt[0].width,tt[0].height,oe.depth);for(let Me=0,Oe=tt.length;Me<Oe;Me++)if(Le=tt[Me],E.format!==Zi)if(De!==null)if(nt){if(J)if(E.layerUpdates.size>0){const Fe=i_(Le.width,Le.height,E.format,E.type);for(const we of E.layerUpdates){const Ze=Le.data.subarray(we*Fe/Le.data.BYTES_PER_ELEMENT,(we+1)*Fe/Le.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Me,0,0,we,Le.width,Le.height,1,De,Ze)}E.clearLayerUpdates()}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Me,0,0,0,Le.width,Le.height,oe.depth,De,Le.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Me,Pe,Le.width,Le.height,oe.depth,0,Le.data,0,0);else ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else nt?J&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,Me,0,0,0,Le.width,Le.height,oe.depth,De,ze,Le.data):i.texImage3D(r.TEXTURE_2D_ARRAY,Me,Pe,Le.width,Le.height,oe.depth,0,De,ze,Le.data)}else{nt&&ut&&i.texStorage2D(r.TEXTURE_2D,Ue,Pe,tt[0].width,tt[0].height);for(let Me=0,Oe=tt.length;Me<Oe;Me++)Le=tt[Me],E.format!==Zi?De!==null?nt?J&&i.compressedTexSubImage2D(r.TEXTURE_2D,Me,0,0,Le.width,Le.height,De,Le.data):i.compressedTexImage2D(r.TEXTURE_2D,Me,Pe,Le.width,Le.height,0,Le.data):ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):nt?J&&i.texSubImage2D(r.TEXTURE_2D,Me,0,0,Le.width,Le.height,De,ze,Le.data):i.texImage2D(r.TEXTURE_2D,Me,Pe,Le.width,Le.height,0,De,ze,Le.data)}else if(E.isDataArrayTexture)if(nt){if(ut&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Ue,Pe,oe.width,oe.height,oe.depth),J)if(E.layerUpdates.size>0){const Me=i_(oe.width,oe.height,E.format,E.type);for(const Oe of E.layerUpdates){const Fe=oe.data.subarray(Oe*Me/oe.data.BYTES_PER_ELEMENT,(Oe+1)*Me/oe.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Oe,oe.width,oe.height,1,De,ze,Fe)}E.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,De,ze,oe.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,Pe,oe.width,oe.height,oe.depth,0,De,ze,oe.data);else if(E.isData3DTexture)nt?(ut&&i.texStorage3D(r.TEXTURE_3D,Ue,Pe,oe.width,oe.height,oe.depth),J&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,De,ze,oe.data)):i.texImage3D(r.TEXTURE_3D,0,Pe,oe.width,oe.height,oe.depth,0,De,ze,oe.data);else if(E.isFramebufferTexture){if(ut)if(nt)i.texStorage2D(r.TEXTURE_2D,Ue,Pe,oe.width,oe.height);else{let Me=oe.width,Oe=oe.height;for(let Fe=0;Fe<Ue;Fe++)i.texImage2D(r.TEXTURE_2D,Fe,Pe,Me,Oe,0,De,ze,null),Me>>=1,Oe>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in r){const Me=r.canvas;if(Me.hasAttribute("layoutsubtree")||Me.setAttribute("layoutsubtree","true"),oe.parentNode!==Me){Me.appendChild(oe),_.add(E),Me.onpaint=Oe=>{const Fe=Oe.changedElements;for(const we of _)Fe.includes(we.image)&&(we.needsUpdate=!0)},Me.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,oe);else{const Fe=r.RGBA,we=r.RGBA,Ze=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,Fe,we,Ze,oe)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(tt.length>0){if(nt&&ut){const Me=At(tt[0]);i.texStorage2D(r.TEXTURE_2D,Ue,Pe,Me.width,Me.height)}for(let Me=0,Oe=tt.length;Me<Oe;Me++)Le=tt[Me],nt?J&&i.texSubImage2D(r.TEXTURE_2D,Me,0,0,De,ze,Le):i.texImage2D(r.TEXTURE_2D,Me,Pe,De,ze,Le);E.generateMipmaps=!1}else if(nt){if(ut){const Me=At(oe);i.texStorage2D(r.TEXTURE_2D,Ue,Pe,Me.width,Me.height)}J&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,De,ze,oe)}else i.texImage2D(r.TEXTURE_2D,0,Pe,De,ze,oe);x(E)&&N(fe),Ne.__version=be.version,E.onUpdate&&E.onUpdate(E)}F.__version=E.version}function Ve(F,E,ie){if(E.image.length!==6)return;const fe=$(F,E),xe=E.source;i.bindTexture(r.TEXTURE_CUBE_MAP,F.__webglTexture,r.TEXTURE0+ie);const be=s.get(xe);if(xe.version!==be.__version||fe===!0){i.activeTexture(r.TEXTURE0+ie);const Ne=Dt.getPrimaries(Dt.workingColorSpace),q=E.colorSpace===_s?null:Dt.getPrimaries(E.colorSpace),oe=E.colorSpace===_s||Ne===q?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);const De=E.isCompressedTexture||E.image[0].isCompressedTexture,ze=E.image[0]&&E.image[0].isDataTexture,Pe=[];for(let we=0;we<6;we++)!De&&!ze?Pe[we]=M(E.image[we],!0,l.maxCubemapSize):Pe[we]=ze?E.image[we].image:E.image[we],Pe[we]=Ot(E,Pe[we]);const Le=Pe[0],tt=c.convert(E.format,E.colorSpace),nt=c.convert(E.type),ut=w(E.internalFormat,tt,nt,E.normalized,E.colorSpace),J=E.isVideoTexture!==!0,Ue=be.__version===void 0||fe===!0,Me=xe.dataReady;let Oe=L(E,Le);Te(r.TEXTURE_CUBE_MAP,E);let Fe;if(De){J&&Ue&&i.texStorage2D(r.TEXTURE_CUBE_MAP,Oe,ut,Le.width,Le.height);for(let we=0;we<6;we++){Fe=Pe[we].mipmaps;for(let Ze=0;Ze<Fe.length;Ze++){const We=Fe[Ze];E.format!==Zi?tt!==null?J?Me&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,Ze,0,0,We.width,We.height,tt,We.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,Ze,ut,We.width,We.height,0,We.data):ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):J?Me&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,Ze,0,0,We.width,We.height,tt,nt,We.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,Ze,ut,We.width,We.height,0,tt,nt,We.data)}}}else{if(Fe=E.mipmaps,J&&Ue){Fe.length>0&&Oe++;const we=At(Pe[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,Oe,ut,we.width,we.height)}for(let we=0;we<6;we++)if(ze){J?Me&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,Pe[we].width,Pe[we].height,tt,nt,Pe[we].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,ut,Pe[we].width,Pe[we].height,0,tt,nt,Pe[we].data);for(let Ze=0;Ze<Fe.length;Ze++){const an=Fe[Ze].image[we].image;J?Me&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,Ze+1,0,0,an.width,an.height,tt,nt,an.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,Ze+1,ut,an.width,an.height,0,tt,nt,an.data)}}else{J?Me&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,tt,nt,Pe[we]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,ut,tt,nt,Pe[we]);for(let Ze=0;Ze<Fe.length;Ze++){const We=Fe[Ze];J?Me&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,Ze+1,0,0,tt,nt,We.image[we]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,Ze+1,ut,tt,nt,We.image[we])}}}x(E)&&N(r.TEXTURE_CUBE_MAP),be.__version=xe.version,E.onUpdate&&E.onUpdate(E)}F.__version=E.version}function Ie(F,E,ie,fe,xe,be){const Ne=c.convert(ie.format,ie.colorSpace),q=c.convert(ie.type),oe=w(ie.internalFormat,Ne,q,ie.normalized,ie.colorSpace),De=s.get(E),ze=s.get(ie);if(ze.__renderTarget=E,!De.__hasExternalTextures){const Pe=Math.max(1,E.width>>be),Le=Math.max(1,E.height>>be);xe===r.TEXTURE_3D||xe===r.TEXTURE_2D_ARRAY?i.texImage3D(xe,be,oe,Pe,Le,E.depth,0,Ne,q,null):i.texImage2D(xe,be,oe,Pe,Le,0,Ne,q,null)}i.bindFramebuffer(r.FRAMEBUFFER,F),en(E)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,fe,xe,ze.__webglTexture,0,Gt(E)):(xe===r.TEXTURE_2D||xe>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&xe<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,fe,xe,ze.__webglTexture,be),i.bindFramebuffer(r.FRAMEBUFFER,null)}function rt(F,E,ie){if(r.bindRenderbuffer(r.RENDERBUFFER,F),E.depthBuffer){const fe=E.depthTexture,xe=fe&&fe.isDepthTexture?fe.type:null,be=G(E.stencilBuffer,xe),Ne=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;en(E)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Gt(E),be,E.width,E.height):ie?r.renderbufferStorageMultisample(r.RENDERBUFFER,Gt(E),be,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,be,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ne,r.RENDERBUFFER,F)}else{const fe=E.textures;for(let xe=0;xe<fe.length;xe++){const be=fe[xe],Ne=c.convert(be.format,be.colorSpace),q=c.convert(be.type),oe=w(be.internalFormat,Ne,q,be.normalized,be.colorSpace);en(E)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Gt(E),oe,E.width,E.height):ie?r.renderbufferStorageMultisample(r.RENDERBUFFER,Gt(E),oe,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,oe,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function $e(F,E,ie){const fe=E.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(r.FRAMEBUFFER,F),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const xe=s.get(E.depthTexture);if(xe.__renderTarget=E,(!xe.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),fe){if(xe.__webglInit===void 0&&(xe.__webglInit=!0,E.depthTexture.addEventListener("dispose",I)),xe.__webglTexture===void 0){xe.__webglTexture=r.createTexture(),i.bindTexture(r.TEXTURE_CUBE_MAP,xe.__webglTexture),Te(r.TEXTURE_CUBE_MAP,E.depthTexture);const De=c.convert(E.depthTexture.format),ze=c.convert(E.depthTexture.type);let Pe;E.depthTexture.format===Ga?Pe=r.DEPTH_COMPONENT24:E.depthTexture.format===Zs&&(Pe=r.DEPTH24_STENCIL8);for(let Le=0;Le<6;Le++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,Pe,E.width,E.height,0,De,ze,null)}}else W(E.depthTexture,0);const be=xe.__webglTexture,Ne=Gt(E),q=fe?r.TEXTURE_CUBE_MAP_POSITIVE_X+ie:r.TEXTURE_2D,oe=E.depthTexture.format===Zs?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(E.depthTexture.format===Ga)en(E)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,oe,q,be,0,Ne):r.framebufferTexture2D(r.FRAMEBUFFER,oe,q,be,0);else if(E.depthTexture.format===Zs)en(E)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,oe,q,be,0,Ne):r.framebufferTexture2D(r.FRAMEBUFFER,oe,q,be,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ke(F){const E=s.get(F),ie=F.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==F.depthTexture){const fe=F.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),fe){const xe=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,fe.removeEventListener("dispose",xe)};fe.addEventListener("dispose",xe),E.__depthDisposeCallback=xe}E.__boundDepthTexture=fe}if(F.depthTexture&&!E.__autoAllocateDepthBuffer)if(ie)for(let fe=0;fe<6;fe++)$e(E.__webglFramebuffer[fe],F,fe);else{const fe=F.texture.mipmaps;fe&&fe.length>0?$e(E.__webglFramebuffer[0],F,0):$e(E.__webglFramebuffer,F,0)}else if(ie){E.__webglDepthbuffer=[];for(let fe=0;fe<6;fe++)if(i.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[fe]),E.__webglDepthbuffer[fe]===void 0)E.__webglDepthbuffer[fe]=r.createRenderbuffer(),rt(E.__webglDepthbuffer[fe],F,!1);else{const xe=F.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,be=E.__webglDepthbuffer[fe];r.bindRenderbuffer(r.RENDERBUFFER,be),r.framebufferRenderbuffer(r.FRAMEBUFFER,xe,r.RENDERBUFFER,be)}}else{const fe=F.texture.mipmaps;if(fe&&fe.length>0?i.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[0]):i.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),rt(E.__webglDepthbuffer,F,!1);else{const xe=F.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,be=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,be),r.framebufferRenderbuffer(r.FRAMEBUFFER,xe,r.RENDERBUFFER,be)}}i.bindFramebuffer(r.FRAMEBUFFER,null)}function ot(F,E,ie){const fe=s.get(F);E!==void 0&&Ie(fe.__webglFramebuffer,F,F.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),ie!==void 0&&ke(F)}function lt(F){const E=F.texture,ie=s.get(F),fe=s.get(E);F.addEventListener("dispose",A);const xe=F.textures,be=F.isWebGLCubeRenderTarget===!0,Ne=xe.length>1;if(Ne||(fe.__webglTexture===void 0&&(fe.__webglTexture=r.createTexture()),fe.__version=E.version,f.memory.textures++),be){ie.__webglFramebuffer=[];for(let q=0;q<6;q++)if(E.mipmaps&&E.mipmaps.length>0){ie.__webglFramebuffer[q]=[];for(let oe=0;oe<E.mipmaps.length;oe++)ie.__webglFramebuffer[q][oe]=r.createFramebuffer()}else ie.__webglFramebuffer[q]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){ie.__webglFramebuffer=[];for(let q=0;q<E.mipmaps.length;q++)ie.__webglFramebuffer[q]=r.createFramebuffer()}else ie.__webglFramebuffer=r.createFramebuffer();if(Ne)for(let q=0,oe=xe.length;q<oe;q++){const De=s.get(xe[q]);De.__webglTexture===void 0&&(De.__webglTexture=r.createTexture(),f.memory.textures++)}if(F.samples>0&&en(F)===!1){ie.__webglMultisampledFramebuffer=r.createFramebuffer(),ie.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,ie.__webglMultisampledFramebuffer);for(let q=0;q<xe.length;q++){const oe=xe[q];ie.__webglColorRenderbuffer[q]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,ie.__webglColorRenderbuffer[q]);const De=c.convert(oe.format,oe.colorSpace),ze=c.convert(oe.type),Pe=w(oe.internalFormat,De,ze,oe.normalized,oe.colorSpace,F.isXRRenderTarget===!0),Le=Gt(F);r.renderbufferStorageMultisample(r.RENDERBUFFER,Le,Pe,F.width,F.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+q,r.RENDERBUFFER,ie.__webglColorRenderbuffer[q])}r.bindRenderbuffer(r.RENDERBUFFER,null),F.depthBuffer&&(ie.__webglDepthRenderbuffer=r.createRenderbuffer(),rt(ie.__webglDepthRenderbuffer,F,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(be){i.bindTexture(r.TEXTURE_CUBE_MAP,fe.__webglTexture),Te(r.TEXTURE_CUBE_MAP,E);for(let q=0;q<6;q++)if(E.mipmaps&&E.mipmaps.length>0)for(let oe=0;oe<E.mipmaps.length;oe++)Ie(ie.__webglFramebuffer[q][oe],F,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+q,oe);else Ie(ie.__webglFramebuffer[q],F,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);x(E)&&N(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Ne){for(let q=0,oe=xe.length;q<oe;q++){const De=xe[q],ze=s.get(De);let Pe=r.TEXTURE_2D;(F.isWebGL3DRenderTarget||F.isWebGLArrayRenderTarget)&&(Pe=F.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Pe,ze.__webglTexture),Te(Pe,De),Ie(ie.__webglFramebuffer,F,De,r.COLOR_ATTACHMENT0+q,Pe,0),x(De)&&N(Pe)}i.unbindTexture()}else{let q=r.TEXTURE_2D;if((F.isWebGL3DRenderTarget||F.isWebGLArrayRenderTarget)&&(q=F.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(q,fe.__webglTexture),Te(q,E),E.mipmaps&&E.mipmaps.length>0)for(let oe=0;oe<E.mipmaps.length;oe++)Ie(ie.__webglFramebuffer[oe],F,E,r.COLOR_ATTACHMENT0,q,oe);else Ie(ie.__webglFramebuffer,F,E,r.COLOR_ATTACHMENT0,q,0);x(E)&&N(q),i.unbindTexture()}F.depthBuffer&&ke(F)}function Tt(F){const E=F.textures;for(let ie=0,fe=E.length;ie<fe;ie++){const xe=E[ie];if(x(xe)){const be=z(F),Ne=s.get(xe).__webglTexture;i.bindTexture(be,Ne),N(be),i.unbindTexture()}}}const Nt=[],Ut=[];function Lt(F){if(F.samples>0){if(en(F)===!1){const E=F.textures,ie=F.width,fe=F.height;let xe=r.COLOR_BUFFER_BIT;const be=F.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ne=s.get(F),q=E.length>1;if(q)for(let De=0;De<E.length;De++)i.bindFramebuffer(r.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,Ne.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer);const oe=F.texture.mipmaps;oe&&oe.length>0?i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ne.__webglFramebuffer[0]):i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ne.__webglFramebuffer);for(let De=0;De<E.length;De++){if(F.resolveDepthBuffer&&(F.depthBuffer&&(xe|=r.DEPTH_BUFFER_BIT),F.stencilBuffer&&F.resolveStencilBuffer&&(xe|=r.STENCIL_BUFFER_BIT)),q){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ne.__webglColorRenderbuffer[De]);const ze=s.get(E[De]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ze,0)}r.blitFramebuffer(0,0,ie,fe,0,0,ie,fe,xe,r.NEAREST),m===!0&&(Nt.length=0,Ut.length=0,Nt.push(r.COLOR_ATTACHMENT0+De),F.depthBuffer&&F.resolveDepthBuffer===!1&&(Nt.push(be),Ut.push(be),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Ut)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Nt))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),q)for(let De=0;De<E.length;De++){i.bindFramebuffer(r.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.RENDERBUFFER,Ne.__webglColorRenderbuffer[De]);const ze=s.get(E[De]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,Ne.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.TEXTURE_2D,ze,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer)}else if(F.depthBuffer&&F.resolveDepthBuffer===!1&&m){const E=F.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}}function Gt(F){return Math.min(l.maxSamples,F.samples)}function en(F){const E=s.get(F);return F.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function ee(F){const E=f.render.frame;v.get(F)!==E&&(v.set(F,E),F.update())}function Ot(F,E){const ie=F.colorSpace,fe=F.format,xe=F.type;return F.isCompressedTexture===!0||F.isVideoTexture===!0||ie!==lu&&ie!==_s&&(Dt.getTransfer(ie)===Kt?(fe!==Zi||xe!==Ti)&&ft("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):It("WebGLTextures: Unsupported texture color space:",ie)),E}function At(F){return typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement?(d.width=F.naturalWidth||F.width,d.height=F.naturalHeight||F.height):typeof VideoFrame<"u"&&F instanceof VideoFrame?(d.width=F.displayWidth,d.height=F.displayHeight):(d.width=F.width,d.height=F.height),d}this.allocateTextureUnit=P,this.resetTextureUnits=V,this.getTextureUnits=re,this.setTextureUnits=Z,this.setTexture2D=W,this.setTexture2DArray=se,this.setTexture3D=B,this.setTextureCube=S,this.rebindTextures=ot,this.setupRenderTarget=lt,this.updateRenderTargetMipmap=Tt,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=Ie,this.useMultisampledRTT=en,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function u2(r,e){function i(s,l=_s){let c;const f=Dt.getTransfer(l);if(s===Ti)return r.UNSIGNED_BYTE;if(s===sp)return r.UNSIGNED_SHORT_4_4_4_4;if(s===rp)return r.UNSIGNED_SHORT_5_5_5_1;if(s===G_)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===H_)return r.UNSIGNED_INT_10F_11F_11F_REV;if(s===B_)return r.BYTE;if(s===F_)return r.SHORT;if(s===ol)return r.UNSIGNED_SHORT;if(s===ap)return r.INT;if(s===ca)return r.UNSIGNED_INT;if(s===sa)return r.FLOAT;if(s===Fa)return r.HALF_FLOAT;if(s===V_)return r.ALPHA;if(s===k_)return r.RGB;if(s===Zi)return r.RGBA;if(s===Ga)return r.DEPTH_COMPONENT;if(s===Zs)return r.DEPTH_STENCIL;if(s===X_)return r.RED;if(s===op)return r.RED_INTEGER;if(s===Qs)return r.RG;if(s===lp)return r.RG_INTEGER;if(s===cp)return r.RGBA_INTEGER;if(s===eu||s===tu||s===nu||s===iu)if(f===Kt)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===eu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===tu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===nu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===iu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===eu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===tu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===nu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===iu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Md||s===Sd||s===bd||s===Ed)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===Md)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Sd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===bd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Ed)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Td||s===Ad||s===wd||s===Rd||s===Cd||s===ru||s===Dd)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(s===Td||s===Ad)return f===Kt?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===wd)return f===Kt?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(s===Rd)return c.COMPRESSED_R11_EAC;if(s===Cd)return c.COMPRESSED_SIGNED_R11_EAC;if(s===ru)return c.COMPRESSED_RG11_EAC;if(s===Dd)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===Nd||s===Ud||s===Ld||s===Od||s===Pd||s===Id||s===zd||s===Bd||s===Fd||s===Gd||s===Hd||s===Vd||s===kd||s===Xd)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(s===Nd)return f===Kt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Ud)return f===Kt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Ld)return f===Kt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Od)return f===Kt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Pd)return f===Kt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Id)return f===Kt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===zd)return f===Kt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Bd)return f===Kt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Fd)return f===Kt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Gd)return f===Kt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Hd)return f===Kt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Vd)return f===Kt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===kd)return f===Kt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Xd)return f===Kt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Wd||s===qd||s===Yd)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(s===Wd)return f===Kt?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===qd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Yd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Zd||s===jd||s===ou||s===Kd)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(s===Zd)return c.COMPRESSED_RED_RGTC1_EXT;if(s===jd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===ou)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Kd)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===ll?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const f2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,h2=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class d2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const s=new $_(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new ua({vertexShader:f2,fragmentShader:h2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new yn(new gu(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class p2 extends Js{constructor(e,i){super();const s=this;let l=null,c=1,f=null,p="local-floor",m=1,d=null,v=null,_=null,g=null,b=null,T=null;const C=typeof XRWebGLBinding<"u",M=new d2,x={},N=i.getContextAttributes();let z=null,w=null;const G=[],L=[],I=new xt;let A=null;const O=new Ei;O.viewport=new hn;const k=new Ei;k.viewport=new hn;const X=[O,k],K=new bb;let V=null,re=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ce=G[$];return ce===void 0&&(ce=new Bh,G[$]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function($){let ce=G[$];return ce===void 0&&(ce=new Bh,G[$]=ce),ce.getGripSpace()},this.getHand=function($){let ce=G[$];return ce===void 0&&(ce=new Bh,G[$]=ce),ce.getHandSpace()};function Z($){const ce=L.indexOf($.inputSource);if(ce===-1)return;const ve=G[ce];ve!==void 0&&(ve.update($.inputSource,$.frame,d||f),ve.dispatchEvent({type:$.type,data:$.inputSource}))}function P(){l.removeEventListener("select",Z),l.removeEventListener("selectstart",Z),l.removeEventListener("selectend",Z),l.removeEventListener("squeeze",Z),l.removeEventListener("squeezestart",Z),l.removeEventListener("squeezeend",Z),l.removeEventListener("end",P),l.removeEventListener("inputsourceschange",U);for(let $=0;$<G.length;$++){const ce=L[$];ce!==null&&(L[$]=null,G[$].disconnect(ce))}V=null,re=null,M.reset();for(const $ in x)delete x[$];e.setRenderTarget(z),b=null,g=null,_=null,l=null,w=null,Te.stop(),s.isPresenting=!1,e.setPixelRatio(A),e.setSize(I.width,I.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){c=$,s.isPresenting===!0&&ft("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){p=$,s.isPresenting===!0&&ft("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||f},this.setReferenceSpace=function($){d=$},this.getBaseLayer=function(){return g!==null?g:b},this.getBinding=function(){return _===null&&C&&(_=new XRWebGLBinding(l,i)),_},this.getFrame=function(){return T},this.getSession=function(){return l},this.setSession=async function($){if(l=$,l!==null){if(z=e.getRenderTarget(),l.addEventListener("select",Z),l.addEventListener("selectstart",Z),l.addEventListener("selectend",Z),l.addEventListener("squeeze",Z),l.addEventListener("squeezestart",Z),l.addEventListener("squeezeend",Z),l.addEventListener("end",P),l.addEventListener("inputsourceschange",U),N.xrCompatible!==!0&&await i.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(I),C&&"createProjectionLayer"in XRWebGLBinding.prototype){let ve=null,Ce=null,Ve=null;N.depth&&(Ve=N.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,ve=N.stencil?Zs:Ga,Ce=N.stencil?ll:ca);const Ie={colorFormat:i.RGBA8,depthFormat:Ve,scaleFactor:c};_=this.getBinding(),g=_.createProjectionLayer(Ie),l.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),w=new la(g.textureWidth,g.textureHeight,{format:Zi,type:Ti,depthTexture:new to(g.textureWidth,g.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,ve),stencilBuffer:N.stencil,colorSpace:e.outputColorSpace,samples:N.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const ve={antialias:N.antialias,alpha:!0,depth:N.depth,stencil:N.stencil,framebufferScaleFactor:c};b=new XRWebGLLayer(l,i,ve),l.updateRenderState({baseLayer:b}),e.setPixelRatio(1),e.setSize(b.framebufferWidth,b.framebufferHeight,!1),w=new la(b.framebufferWidth,b.framebufferHeight,{format:Zi,type:Ti,colorSpace:e.outputColorSpace,stencilBuffer:N.stencil,resolveDepthBuffer:b.ignoreDepthValues===!1,resolveStencilBuffer:b.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(m),d=null,f=await l.requestReferenceSpace(p),Te.setContext(l),Te.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function U($){for(let ce=0;ce<$.removed.length;ce++){const ve=$.removed[ce],Ce=L.indexOf(ve);Ce>=0&&(L[Ce]=null,G[Ce].disconnect(ve))}for(let ce=0;ce<$.added.length;ce++){const ve=$.added[ce];let Ce=L.indexOf(ve);if(Ce===-1){for(let Ie=0;Ie<G.length;Ie++)if(Ie>=L.length){L.push(ve),Ce=Ie;break}else if(L[Ie]===null){L[Ie]=ve,Ce=Ie;break}if(Ce===-1)break}const Ve=G[Ce];Ve&&Ve.connect(ve)}}const W=new ne,se=new ne;function B($,ce,ve){W.setFromMatrixPosition(ce.matrixWorld),se.setFromMatrixPosition(ve.matrixWorld);const Ce=W.distanceTo(se),Ve=ce.projectionMatrix.elements,Ie=ve.projectionMatrix.elements,rt=Ve[14]/(Ve[10]-1),$e=Ve[14]/(Ve[10]+1),ke=(Ve[9]+1)/Ve[5],ot=(Ve[9]-1)/Ve[5],lt=(Ve[8]-1)/Ve[0],Tt=(Ie[8]+1)/Ie[0],Nt=rt*lt,Ut=rt*Tt,Lt=Ce/(-lt+Tt),Gt=Lt*-lt;if(ce.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Gt),$.translateZ(Lt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ve[10]===-1)$.projectionMatrix.copy(ce.projectionMatrix),$.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const en=rt+Lt,ee=$e+Lt,Ot=Nt-Gt,At=Ut+(Ce-Gt),F=ke*$e/ee*en,E=ot*$e/ee*en;$.projectionMatrix.makePerspective(Ot,At,F,E,en,ee),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function S($,ce){ce===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ce.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(l===null)return;let ce=$.near,ve=$.far;M.texture!==null&&(M.depthNear>0&&(ce=M.depthNear),M.depthFar>0&&(ve=M.depthFar)),K.near=k.near=O.near=ce,K.far=k.far=O.far=ve,(V!==K.near||re!==K.far)&&(l.updateRenderState({depthNear:K.near,depthFar:K.far}),V=K.near,re=K.far),K.layers.mask=$.layers.mask|6,O.layers.mask=K.layers.mask&-5,k.layers.mask=K.layers.mask&-3;const Ce=$.parent,Ve=K.cameras;S(K,Ce);for(let Ie=0;Ie<Ve.length;Ie++)S(Ve[Ie],Ce);Ve.length===2?B(K,O,k):K.projectionMatrix.copy(O.projectionMatrix),H($,K,Ce)};function H($,ce,ve){ve===null?$.matrix.copy(ce.matrixWorld):($.matrix.copy(ve.matrixWorld),$.matrix.invert(),$.matrix.multiply(ce.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ce.projectionMatrix),$.projectionMatrixInverse.copy(ce.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=ul*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return K},this.getFoveation=function(){if(!(g===null&&b===null))return m},this.setFoveation=function($){m=$,g!==null&&(g.fixedFoveation=$),b!==null&&b.fixedFoveation!==void 0&&(b.fixedFoveation=$)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(K)},this.getCameraTexture=function($){return x[$]};let le=null;function ye($,ce){if(v=ce.getViewerPose(d||f),T=ce,v!==null){const ve=v.views;b!==null&&(e.setRenderTargetFramebuffer(w,b.framebuffer),e.setRenderTarget(w));let Ce=!1;ve.length!==K.cameras.length&&(K.cameras.length=0,Ce=!0);for(let $e=0;$e<ve.length;$e++){const ke=ve[$e];let ot=null;if(b!==null)ot=b.getViewport(ke);else{const Tt=_.getViewSubImage(g,ke);ot=Tt.viewport,$e===0&&(e.setRenderTargetTextures(w,Tt.colorTexture,Tt.depthStencilTexture),e.setRenderTarget(w))}let lt=X[$e];lt===void 0&&(lt=new Ei,lt.layers.enable($e),lt.viewport=new hn,X[$e]=lt),lt.matrix.fromArray(ke.transform.matrix),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale),lt.projectionMatrix.fromArray(ke.projectionMatrix),lt.projectionMatrixInverse.copy(lt.projectionMatrix).invert(),lt.viewport.set(ot.x,ot.y,ot.width,ot.height),$e===0&&(K.matrix.copy(lt.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale)),Ce===!0&&K.cameras.push(lt)}const Ve=l.enabledFeatures;if(Ve&&Ve.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&C){_=s.getBinding();const $e=_.getDepthInformation(ve[0]);$e&&$e.isValid&&$e.texture&&M.init($e,l.renderState)}if(Ve&&Ve.includes("camera-access")&&C){e.state.unbindTexture(),_=s.getBinding();for(let $e=0;$e<ve.length;$e++){const ke=ve[$e].camera;if(ke){let ot=x[ke];ot||(ot=new $_,x[ke]=ot);const lt=_.getCameraImage(ke);ot.sourceTexture=lt}}}}for(let ve=0;ve<G.length;ve++){const Ce=L[ve],Ve=G[ve];Ce!==null&&Ve!==void 0&&Ve.update(Ce,ce,d||f)}le&&le($,ce),ce.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:ce}),T=null}const Te=new ix;Te.setAnimationLoop(ye),this.setAnimationLoop=function($){le=$},this.dispose=function(){}}}const m2=new fn,ux=new pt;ux.set(-1,0,0,0,1,0,0,0,1);function g2(r,e){function i(M,x){M.matrixAutoUpdate===!0&&M.updateMatrix(),x.value.copy(M.matrix)}function s(M,x){x.color.getRGB(M.fogColor.value,ex(r)),x.isFog?(M.fogNear.value=x.near,M.fogFar.value=x.far):x.isFogExp2&&(M.fogDensity.value=x.density)}function l(M,x,N,z,w){x.isNodeMaterial?x.uniformsNeedUpdate=!1:x.isMeshBasicMaterial?c(M,x):x.isMeshLambertMaterial?(c(M,x),x.envMap&&(M.envMapIntensity.value=x.envMapIntensity)):x.isMeshToonMaterial?(c(M,x),_(M,x)):x.isMeshPhongMaterial?(c(M,x),v(M,x),x.envMap&&(M.envMapIntensity.value=x.envMapIntensity)):x.isMeshStandardMaterial?(c(M,x),g(M,x),x.isMeshPhysicalMaterial&&b(M,x,w)):x.isMeshMatcapMaterial?(c(M,x),T(M,x)):x.isMeshDepthMaterial?c(M,x):x.isMeshDistanceMaterial?(c(M,x),C(M,x)):x.isMeshNormalMaterial?c(M,x):x.isLineBasicMaterial?(f(M,x),x.isLineDashedMaterial&&p(M,x)):x.isPointsMaterial?m(M,x,N,z):x.isSpriteMaterial?d(M,x):x.isShadowMaterial?(M.color.value.copy(x.color),M.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function c(M,x){M.opacity.value=x.opacity,x.color&&M.diffuse.value.copy(x.color),x.emissive&&M.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(M.map.value=x.map,i(x.map,M.mapTransform)),x.alphaMap&&(M.alphaMap.value=x.alphaMap,i(x.alphaMap,M.alphaMapTransform)),x.bumpMap&&(M.bumpMap.value=x.bumpMap,i(x.bumpMap,M.bumpMapTransform),M.bumpScale.value=x.bumpScale,x.side===fi&&(M.bumpScale.value*=-1)),x.normalMap&&(M.normalMap.value=x.normalMap,i(x.normalMap,M.normalMapTransform),M.normalScale.value.copy(x.normalScale),x.side===fi&&M.normalScale.value.negate()),x.displacementMap&&(M.displacementMap.value=x.displacementMap,i(x.displacementMap,M.displacementMapTransform),M.displacementScale.value=x.displacementScale,M.displacementBias.value=x.displacementBias),x.emissiveMap&&(M.emissiveMap.value=x.emissiveMap,i(x.emissiveMap,M.emissiveMapTransform)),x.specularMap&&(M.specularMap.value=x.specularMap,i(x.specularMap,M.specularMapTransform)),x.alphaTest>0&&(M.alphaTest.value=x.alphaTest);const N=e.get(x),z=N.envMap,w=N.envMapRotation;z&&(M.envMap.value=z,M.envMapRotation.value.setFromMatrix4(m2.makeRotationFromEuler(w)).transpose(),z.isCubeTexture&&z.isRenderTargetTexture===!1&&M.envMapRotation.value.premultiply(ux),M.reflectivity.value=x.reflectivity,M.ior.value=x.ior,M.refractionRatio.value=x.refractionRatio),x.lightMap&&(M.lightMap.value=x.lightMap,M.lightMapIntensity.value=x.lightMapIntensity,i(x.lightMap,M.lightMapTransform)),x.aoMap&&(M.aoMap.value=x.aoMap,M.aoMapIntensity.value=x.aoMapIntensity,i(x.aoMap,M.aoMapTransform))}function f(M,x){M.diffuse.value.copy(x.color),M.opacity.value=x.opacity,x.map&&(M.map.value=x.map,i(x.map,M.mapTransform))}function p(M,x){M.dashSize.value=x.dashSize,M.totalSize.value=x.dashSize+x.gapSize,M.scale.value=x.scale}function m(M,x,N,z){M.diffuse.value.copy(x.color),M.opacity.value=x.opacity,M.size.value=x.size*N,M.scale.value=z*.5,x.map&&(M.map.value=x.map,i(x.map,M.uvTransform)),x.alphaMap&&(M.alphaMap.value=x.alphaMap,i(x.alphaMap,M.alphaMapTransform)),x.alphaTest>0&&(M.alphaTest.value=x.alphaTest)}function d(M,x){M.diffuse.value.copy(x.color),M.opacity.value=x.opacity,M.rotation.value=x.rotation,x.map&&(M.map.value=x.map,i(x.map,M.mapTransform)),x.alphaMap&&(M.alphaMap.value=x.alphaMap,i(x.alphaMap,M.alphaMapTransform)),x.alphaTest>0&&(M.alphaTest.value=x.alphaTest)}function v(M,x){M.specular.value.copy(x.specular),M.shininess.value=Math.max(x.shininess,1e-4)}function _(M,x){x.gradientMap&&(M.gradientMap.value=x.gradientMap)}function g(M,x){M.metalness.value=x.metalness,x.metalnessMap&&(M.metalnessMap.value=x.metalnessMap,i(x.metalnessMap,M.metalnessMapTransform)),M.roughness.value=x.roughness,x.roughnessMap&&(M.roughnessMap.value=x.roughnessMap,i(x.roughnessMap,M.roughnessMapTransform)),x.envMap&&(M.envMapIntensity.value=x.envMapIntensity)}function b(M,x,N){M.ior.value=x.ior,x.sheen>0&&(M.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),M.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(M.sheenColorMap.value=x.sheenColorMap,i(x.sheenColorMap,M.sheenColorMapTransform)),x.sheenRoughnessMap&&(M.sheenRoughnessMap.value=x.sheenRoughnessMap,i(x.sheenRoughnessMap,M.sheenRoughnessMapTransform))),x.clearcoat>0&&(M.clearcoat.value=x.clearcoat,M.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(M.clearcoatMap.value=x.clearcoatMap,i(x.clearcoatMap,M.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,i(x.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(M.clearcoatNormalMap.value=x.clearcoatNormalMap,i(x.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===fi&&M.clearcoatNormalScale.value.negate())),x.dispersion>0&&(M.dispersion.value=x.dispersion),x.iridescence>0&&(M.iridescence.value=x.iridescence,M.iridescenceIOR.value=x.iridescenceIOR,M.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(M.iridescenceMap.value=x.iridescenceMap,i(x.iridescenceMap,M.iridescenceMapTransform)),x.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=x.iridescenceThicknessMap,i(x.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),x.transmission>0&&(M.transmission.value=x.transmission,M.transmissionSamplerMap.value=N.texture,M.transmissionSamplerSize.value.set(N.width,N.height),x.transmissionMap&&(M.transmissionMap.value=x.transmissionMap,i(x.transmissionMap,M.transmissionMapTransform)),M.thickness.value=x.thickness,x.thicknessMap&&(M.thicknessMap.value=x.thicknessMap,i(x.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=x.attenuationDistance,M.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(M.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(M.anisotropyMap.value=x.anisotropyMap,i(x.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=x.specularIntensity,M.specularColor.value.copy(x.specularColor),x.specularColorMap&&(M.specularColorMap.value=x.specularColorMap,i(x.specularColorMap,M.specularColorMapTransform)),x.specularIntensityMap&&(M.specularIntensityMap.value=x.specularIntensityMap,i(x.specularIntensityMap,M.specularIntensityMapTransform))}function T(M,x){x.matcap&&(M.matcap.value=x.matcap)}function C(M,x){const N=e.get(x).light;M.referencePosition.value.setFromMatrixPosition(N.matrixWorld),M.nearDistance.value=N.shadow.camera.near,M.farDistance.value=N.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function v2(r,e,i,s){let l={},c={},f=[];const p=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(w,G){const L=G.program;s.uniformBlockBinding(w,L)}function d(w,G){let L=l[w.id];L===void 0&&(M(w),L=v(w),l[w.id]=L,w.addEventListener("dispose",N));const I=G.program;s.updateUBOMapping(w,I);const A=e.render.frame;c[w.id]!==A&&(g(w),c[w.id]=A)}function v(w){const G=_();w.__bindingPointIndex=G;const L=r.createBuffer(),I=w.__size,A=w.usage;return r.bindBuffer(r.UNIFORM_BUFFER,L),r.bufferData(r.UNIFORM_BUFFER,I,A),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,G,L),L}function _(){for(let w=0;w<p;w++)if(f.indexOf(w)===-1)return f.push(w),w;return It("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(w){const G=l[w.id],L=w.uniforms,I=w.__cache;r.bindBuffer(r.UNIFORM_BUFFER,G);for(let A=0,O=L.length;A<O;A++){const k=L[A];if(Array.isArray(k))for(let X=0,K=k.length;X<K;X++)b(k[X],A,X,I);else b(k,A,0,I)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function b(w,G,L,I){if(C(w,G,L,I)===!0){const A=w.__offset,O=w.value;if(Array.isArray(O)){let k=0;for(let X=0;X<O.length;X++){const K=O[X],V=x(K);T(K,w.__data,k),typeof K!="number"&&typeof K!="boolean"&&!K.isMatrix3&&!ArrayBuffer.isView(K)&&(k+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else T(O,w.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,A,w.__data)}}function T(w,G,L){typeof w=="number"||typeof w=="boolean"?G[0]=w:w.isMatrix3?(G[0]=w.elements[0],G[1]=w.elements[1],G[2]=w.elements[2],G[3]=0,G[4]=w.elements[3],G[5]=w.elements[4],G[6]=w.elements[5],G[7]=0,G[8]=w.elements[6],G[9]=w.elements[7],G[10]=w.elements[8],G[11]=0):ArrayBuffer.isView(w)?G.set(new w.constructor(w.buffer,w.byteOffset,G.length)):w.toArray(G,L)}function C(w,G,L,I){const A=w.value,O=G+"_"+L;if(I[O]===void 0)return typeof A=="number"||typeof A=="boolean"?I[O]=A:ArrayBuffer.isView(A)?I[O]=A.slice():I[O]=A.clone(),!0;{const k=I[O];if(typeof A=="number"||typeof A=="boolean"){if(k!==A)return I[O]=A,!0}else{if(ArrayBuffer.isView(A))return!0;if(k.equals(A)===!1)return k.copy(A),!0}}return!1}function M(w){const G=w.uniforms;let L=0;const I=16;for(let O=0,k=G.length;O<k;O++){const X=Array.isArray(G[O])?G[O]:[G[O]];for(let K=0,V=X.length;K<V;K++){const re=X[K],Z=Array.isArray(re.value)?re.value:[re.value];for(let P=0,U=Z.length;P<U;P++){const W=Z[P],se=x(W),B=L%I,S=B%se.boundary,H=B+S;L+=S,H!==0&&I-H<se.storage&&(L+=I-H),re.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),re.__offset=L,L+=se.storage}}}const A=L%I;return A>0&&(L+=I-A),w.__size=L,w.__cache={},this}function x(w){const G={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(G.boundary=4,G.storage=4):w.isVector2?(G.boundary=8,G.storage=8):w.isVector3||w.isColor?(G.boundary=16,G.storage=12):w.isVector4?(G.boundary=16,G.storage=16):w.isMatrix3?(G.boundary=48,G.storage=48):w.isMatrix4?(G.boundary=64,G.storage=64):w.isTexture?ft("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(w)?(G.boundary=16,G.storage=w.byteLength):ft("WebGLRenderer: Unsupported uniform value type.",w),G}function N(w){const G=w.target;G.removeEventListener("dispose",N);const L=f.indexOf(G.__bindingPointIndex);f.splice(L,1),r.deleteBuffer(l[G.id]),delete l[G.id],delete c[G.id]}function z(){for(const w in l)r.deleteBuffer(l[w]);f=[],l={},c={}}return{bind:m,update:d,dispose:z}}const _2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ta=null;function x2(){return ta===null&&(ta=new tb(_2,16,16,Qs,Fa),ta.name="DFG_LUT",ta.minFilter=Qn,ta.magFilter=Qn,ta.wrapS=Pa,ta.wrapT=Pa,ta.generateMipmaps=!1,ta.needsUpdate=!0),ta}class y2{constructor(e={}){const{canvas:i=gS(),context:s=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:p=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:d=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:g=!1,outputBufferType:b=Ti}=e;this.isWebGLRenderer=!0;let T;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");T=s.getContextAttributes().alpha}else T=f;const C=b,M=new Set([cp,lp,op]),x=new Set([Ti,ca,ol,ll,sp,rp]),N=new Uint32Array(4),z=new Int32Array(4),w=new ne;let G=null,L=null;const I=[],A=[];let O=null;this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=oa,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const k=this;let X=!1,K=null,V=null,re=null,Z=null;this._outputColorSpace=zi;let P=0,U=0,W=null,se=-1,B=null;const S=new hn,H=new hn;let le=null;const ye=new Qe(0);let Te=0,$=i.width,ce=i.height,ve=1,Ce=null,Ve=null;const Ie=new hn(0,0,$,ce),rt=new hn(0,0,$,ce);let $e=!1;const ke=new gp;let ot=!1,lt=!1;const Tt=new fn,Nt=new ne,Ut=new hn,Lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function en(){return W===null?ve:1}let ee=s;function Ot(R,te){return i.getContext(R,te)}try{const R={alpha:!0,depth:l,stencil:c,antialias:p,premultipliedAlpha:m,preserveDrawingBuffer:d,powerPreference:v,failIfMajorPerformanceCaveat:_};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${np}`),i.addEventListener("webglcontextlost",an,!1),i.addEventListener("webglcontextrestored",Ht,!1),i.addEventListener("webglcontextcreationerror",kn,!1),ee===null){const te="webgl2";if(ee=Ot(te,R),ee===null)throw Ot(te)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(R){throw It("WebGLRenderer: "+R.message),R}let At,F,E,ie,fe,xe,be,Ne,q,oe,De,ze,Pe,Le,tt,nt,ut,J,Ue,Me,Oe,Fe,we;function Ze(){At=new xT(ee),At.init(),Oe=new u2(ee,At),F=new fT(ee,At,e,Oe),E=new l2(ee,At),F.reversedDepthBuffer&&g&&E.buffers.depth.setReversed(!0),V=ee.createFramebuffer(),re=ee.createFramebuffer(),Z=ee.createFramebuffer(),ie=new ST(ee),fe=new ZA,xe=new c2(ee,At,E,fe,F,Oe,ie),be=new _T(k),Ne=new Ab(ee),Fe=new cT(ee,Ne),q=new yT(ee,Ne,ie,Fe),oe=new ET(ee,q,Ne,Fe,ie),J=new bT(ee,F,xe),tt=new hT(fe),De=new YA(k,be,At,F,Fe,tt),ze=new g2(k,fe),Pe=new KA,Le=new n2(At),ut=new lT(k,be,E,oe,T,m),nt=new o2(k,oe,F),we=new v2(ee,ie,F,E),Ue=new uT(ee,At,ie),Me=new MT(ee,At,ie),ie.programs=De.programs,k.capabilities=F,k.extensions=At,k.properties=fe,k.renderLists=Pe,k.shadowMap=nt,k.state=E,k.info=ie}Ze(),C!==Ti&&(O=new AT(C,i.width,i.height,p,l,c));const We=new p2(k,ee);this.xr=We,this.getContext=function(){return ee},this.getContextAttributes=function(){return ee.getContextAttributes()},this.forceContextLoss=function(){const R=At.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=At.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return ve},this.setPixelRatio=function(R){R!==void 0&&(ve=R,this.setSize($,ce,!1))},this.getSize=function(R){return R.set($,ce)},this.setSize=function(R,te,me=!0){if(We.isPresenting){ft("WebGLRenderer: Can't change size while VR device is presenting.");return}$=R,ce=te,i.width=Math.floor(R*ve),i.height=Math.floor(te*ve),me===!0&&(i.style.width=R+"px",i.style.height=te+"px"),O!==null&&O.setSize(i.width,i.height),this.setViewport(0,0,R,te)},this.getDrawingBufferSize=function(R){return R.set($*ve,ce*ve).floor()},this.setDrawingBufferSize=function(R,te,me){$=R,ce=te,ve=me,i.width=Math.floor(R*me),i.height=Math.floor(te*me),this.setViewport(0,0,R,te)},this.setEffects=function(R){if(C===Ti){It("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let te=0;te<R.length;te++)if(R[te].isOutputPass===!0){ft("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}O.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(S)},this.getViewport=function(R){return R.copy(Ie)},this.setViewport=function(R,te,me,de){R.isVector4?Ie.set(R.x,R.y,R.z,R.w):Ie.set(R,te,me,de),E.viewport(S.copy(Ie).multiplyScalar(ve).round())},this.getScissor=function(R){return R.copy(rt)},this.setScissor=function(R,te,me,de){R.isVector4?rt.set(R.x,R.y,R.z,R.w):rt.set(R,te,me,de),E.scissor(H.copy(rt).multiplyScalar(ve).round())},this.getScissorTest=function(){return $e},this.setScissorTest=function(R){E.setScissorTest($e=R)},this.setOpaqueSort=function(R){Ce=R},this.setTransparentSort=function(R){Ve=R},this.getClearColor=function(R){return R.copy(ut.getClearColor())},this.setClearColor=function(){ut.setClearColor(...arguments)},this.getClearAlpha=function(){return ut.getClearAlpha()},this.setClearAlpha=function(){ut.setClearAlpha(...arguments)},this.clear=function(R=!0,te=!0,me=!0){let de=0;if(R){let pe=!1;if(W!==null){const Ge=W.texture.format;pe=M.has(Ge)}if(pe){const Ge=W.texture.type,qe=x.has(Ge),Be=ut.getClearColor(),je=ut.getClearAlpha(),Ye=Be.r,it=Be.g,mt=Be.b;qe?(N[0]=Ye,N[1]=it,N[2]=mt,N[3]=je,ee.clearBufferuiv(ee.COLOR,0,N)):(z[0]=Ye,z[1]=it,z[2]=mt,z[3]=je,ee.clearBufferiv(ee.COLOR,0,z))}else de|=ee.COLOR_BUFFER_BIT}te&&(de|=ee.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),me&&(de|=ee.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),de!==0&&ee.clear(de)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),K=R},this.dispose=function(){i.removeEventListener("webglcontextlost",an,!1),i.removeEventListener("webglcontextrestored",Ht,!1),i.removeEventListener("webglcontextcreationerror",kn,!1),ut.dispose(),Pe.dispose(),Le.dispose(),fe.dispose(),be.dispose(),oe.dispose(),Fe.dispose(),we.dispose(),De.dispose(),We.dispose(),We.removeEventListener("sessionstart",Vt),We.removeEventListener("sessionend",dn),Mn.stop()};function an(R){R.preventDefault(),Cv("WebGLRenderer: Context Lost."),X=!0}function Ht(){Cv("WebGLRenderer: Context Restored."),X=!1;const R=ie.autoReset,te=nt.enabled,me=nt.autoUpdate,de=nt.needsUpdate,pe=nt.type;Ze(),ie.autoReset=R,nt.enabled=te,nt.autoUpdate=me,nt.needsUpdate=de,nt.type=pe}function kn(R){It("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Ln(R){const te=R.target;te.removeEventListener("dispose",Ln),er(te)}function er(R){ht(R),fe.remove(R)}function ht(R){const te=fe.get(R).programs;te!==void 0&&(te.forEach(function(me){De.releaseProgram(me)}),R.isShaderMaterial&&De.releaseShaderCache(R))}this.renderBufferDirect=function(R,te,me,de,pe,Ge){te===null&&(te=Lt);const qe=pe.isMesh&&pe.matrixWorld.determinantAffine()<0,Be=Ha(R,te,me,de,pe);E.setMaterial(de,qe);let je=me.index,Ye=1;if(de.wireframe===!0){if(je=q.getWireframeAttribute(me),je===void 0)return;Ye=2}const it=me.drawRange,mt=me.attributes.position;let et=it.start*Ye,zt=(it.start+it.count)*Ye;Ge!==null&&(et=Math.max(et,Ge.start*Ye),zt=Math.min(zt,(Ge.start+Ge.count)*Ye)),je!==null?(et=Math.max(et,0),zt=Math.min(zt,je.count)):mt!=null&&(et=Math.max(et,0),zt=Math.min(zt,mt.count));const ln=zt-et;if(ln<0||ln===1/0)return;Fe.setup(pe,de,Be,me,je);let tn,Wt=Ue;if(je!==null&&(tn=Ne.get(je),Wt=Me,Wt.setIndex(tn)),pe.isMesh)de.wireframe===!0?(E.setLineWidth(de.wireframeLinewidth*en()),Wt.setMode(ee.LINES)):Wt.setMode(ee.TRIANGLES);else if(pe.isLine){let qt=de.linewidth;qt===void 0&&(qt=1),E.setLineWidth(qt*en()),pe.isLineSegments?Wt.setMode(ee.LINES):pe.isLineLoop?Wt.setMode(ee.LINE_LOOP):Wt.setMode(ee.LINE_STRIP)}else pe.isPoints?Wt.setMode(ee.POINTS):pe.isSprite&&Wt.setMode(ee.TRIANGLES);if(pe.isBatchedMesh)if(At.get("WEBGL_multi_draw"))Wt.renderMultiDraw(pe._multiDrawStarts,pe._multiDrawCounts,pe._multiDrawCount);else{const qt=pe._multiDrawStarts,Xe=pe._multiDrawCounts,Yn=pe._multiDrawCount,Mt=je?Ne.get(je).bytesPerElement:1,Rn=fe.get(de).currentProgram.getUniforms();for(let hi=0;hi<Yn;hi++)Rn.setValue(ee,"_gl_DrawID",hi),Wt.render(qt[hi]/Mt,Xe[hi])}else if(pe.isInstancedMesh)Wt.renderInstances(et,ln,pe.count);else if(me.isInstancedBufferGeometry){const qt=me._maxInstanceCount!==void 0?me._maxInstanceCount:1/0,Xe=Math.min(me.instanceCount,qt);Wt.renderInstances(et,ln,Xe)}else Wt.render(et,ln)};function yt(R,te,me){R.transparent===!0&&R.side===aa&&R.forceSinglePass===!1?(R.side=fi,R.needsUpdate=!0,wi(R,te,me),R.side=ys,R.needsUpdate=!0,wi(R,te,me),R.side=aa):wi(R,te,me)}this.compile=function(R,te,me=null){me===null&&(me=R),L=Le.get(me),L.init(te),A.push(L),me.traverseVisible(function(pe){pe.isLight&&pe.layers.test(te.layers)&&(L.pushLight(pe),pe.castShadow&&L.pushShadow(pe))}),R!==me&&R.traverseVisible(function(pe){pe.isLight&&pe.layers.test(te.layers)&&(L.pushLight(pe),pe.castShadow&&L.pushShadow(pe))}),L.setupLights();const de=new Set;return R.traverse(function(pe){if(!(pe.isMesh||pe.isPoints||pe.isLine||pe.isSprite))return;const Ge=pe.material;if(Ge)if(Array.isArray(Ge))for(let qe=0;qe<Ge.length;qe++){const Be=Ge[qe];yt(Be,me,pe),de.add(Be)}else yt(Ge,me,pe),de.add(Ge)}),L=A.pop(),de},this.compileAsync=function(R,te,me=null){const de=this.compile(R,te,me);return new Promise(pe=>{function Ge(){if(de.forEach(function(qe){fe.get(qe).currentProgram.isReady()&&de.delete(qe)}),de.size===0){pe(R);return}setTimeout(Ge,10)}At.get("KHR_parallel_shader_compile")!==null?Ge():setTimeout(Ge,10)})};let Re=null;function Xn(R){Re&&Re(R)}function Vt(){Mn.stop()}function dn(){Mn.start()}const Mn=new ix;Mn.setAnimationLoop(Xn),typeof self<"u"&&Mn.setContext(self),this.setAnimationLoop=function(R){Re=R,We.setAnimationLoop(R),R===null?Mn.stop():Mn.start()},We.addEventListener("sessionstart",Vt),We.addEventListener("sessionend",dn),this.render=function(R,te){if(te!==void 0&&te.isCamera!==!0){It("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(X===!0)return;K!==null&&K.renderStart(R,te);const me=We.enabled===!0&&We.isPresenting===!0,de=O!==null&&(W===null||me)&&O.begin(k,W);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),te.parent===null&&te.matrixWorldAutoUpdate===!0&&te.updateMatrixWorld(),We.enabled===!0&&We.isPresenting===!0&&(O===null||O.isCompositing()===!1)&&(We.cameraAutoUpdate===!0&&We.updateCamera(te),te=We.getCamera()),R.isScene===!0&&R.onBeforeRender(k,R,te,W),L=Le.get(R,A.length),L.init(te),L.state.textureUnits=xe.getTextureUnits(),A.push(L),Tt.multiplyMatrices(te.projectionMatrix,te.matrixWorldInverse),ke.setFromProjectionMatrix(Tt,ra,te.reversedDepth),lt=this.localClippingEnabled,ot=tt.init(this.clippingPlanes,lt),G=Pe.get(R,I.length),G.init(),I.push(G),We.enabled===!0&&We.isPresenting===!0){const qe=k.xr.getDepthSensingMesh();qe!==null&&Wn(qe,te,-1/0,k.sortObjects)}Wn(R,te,0,k.sortObjects),G.finish(),k.sortObjects===!0&&G.sort(Ce,Ve,te.reversedDepth),Gt=We.enabled===!1||We.isPresenting===!1||We.hasDepthSensing()===!1,Gt&&ut.addToRenderList(G,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ot===!0&&tt.beginShadows();const pe=L.state.shadowsArray;if(nt.render(pe,R,te),ot===!0&&tt.endShadows(),(de&&O.hasRenderPass())===!1){const qe=G.opaque,Be=G.transmissive;if(L.setupLights(),te.isArrayCamera){const je=te.cameras;if(Be.length>0)for(let Ye=0,it=je.length;Ye<it;Ye++){const mt=je[Ye];On(qe,Be,R,mt)}Gt&&ut.render(R);for(let Ye=0,it=je.length;Ye<it;Ye++){const mt=je[Ye];ni(G,R,mt,mt.viewport)}}else Be.length>0&&On(qe,Be,R,te),Gt&&ut.render(R),ni(G,R,te)}W!==null&&U===0&&(xe.updateMultisampleRenderTarget(W),xe.updateRenderTargetMipmap(W)),de&&O.end(k),R.isScene===!0&&R.onAfterRender(k,R,te),Fe.resetDefaultState(),se=-1,B=null,A.pop(),A.length>0?(L=A[A.length-1],xe.setTextureUnits(L.state.textureUnits),ot===!0&&tt.setGlobalState(k.clippingPlanes,L.state.camera)):L=null,I.pop(),I.length>0?G=I[I.length-1]:G=null,K!==null&&K.renderEnd()};function Wn(R,te,me,de){if(R.visible===!1)return;if(R.layers.test(te.layers)){if(R.isGroup)me=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(te);else if(R.isLightProbeGrid)L.pushLightProbeGrid(R);else if(R.isLight)L.pushLight(R),R.castShadow&&L.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||ke.intersectsSprite(R)){de&&Ut.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Tt);const qe=oe.update(R),Be=R.material;Be.visible&&G.push(R,qe,Be,me,Ut.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||ke.intersectsObject(R))){const qe=oe.update(R),Be=R.material;if(de&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Ut.copy(R.boundingSphere.center)):(qe.boundingSphere===null&&qe.computeBoundingSphere(),Ut.copy(qe.boundingSphere.center)),Ut.applyMatrix4(R.matrixWorld).applyMatrix4(Tt)),Array.isArray(Be)){const je=qe.groups;for(let Ye=0,it=je.length;Ye<it;Ye++){const mt=je[Ye],et=Be[mt.materialIndex];et&&et.visible&&G.push(R,qe,et,me,Ut.z,mt)}}else Be.visible&&G.push(R,qe,Be,me,Ut.z,null)}}const Ge=R.children;for(let qe=0,Be=Ge.length;qe<Be;qe++)Wn(Ge[qe],te,me,de)}function ni(R,te,me,de){const{opaque:pe,transmissive:Ge,transparent:qe}=R;L.setupLightsView(me),ot===!0&&tt.setGlobalState(k.clippingPlanes,me),de&&E.viewport(S.copy(de)),pe.length>0&&qn(pe,te,me),Ge.length>0&&qn(Ge,te,me),qe.length>0&&qn(qe,te,me),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function On(R,te,me,de){if((me.isScene===!0?me.overrideMaterial:null)!==null)return;if(L.state.transmissionRenderTarget[de.id]===void 0){const et=At.has("EXT_color_buffer_half_float")||At.has("EXT_color_buffer_float");L.state.transmissionRenderTarget[de.id]=new la(1,1,{generateMipmaps:!0,type:et?Fa:Ti,minFilter:Ys,samples:Math.max(4,F.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Dt.workingColorSpace})}const Ge=L.state.transmissionRenderTarget[de.id],qe=de.viewport||S;Ge.setSize(qe.z*k.transmissionResolutionScale,qe.w*k.transmissionResolutionScale);const Be=k.getRenderTarget(),je=k.getActiveCubeFace(),Ye=k.getActiveMipmapLevel();k.setRenderTarget(Ge),k.getClearColor(ye),Te=k.getClearAlpha(),Te<1&&k.setClearColor(16777215,.5),k.clear(),Gt&&ut.render(me);const it=k.toneMapping;k.toneMapping=oa;const mt=de.viewport;if(de.viewport!==void 0&&(de.viewport=void 0),L.setupLightsView(de),ot===!0&&tt.setGlobalState(k.clippingPlanes,de),qn(R,me,de),xe.updateMultisampleRenderTarget(Ge),xe.updateRenderTargetMipmap(Ge),At.has("WEBGL_multisampled_render_to_texture")===!1){let et=!1;for(let zt=0,ln=te.length;zt<ln;zt++){const tn=te[zt],{object:Wt,geometry:qt,material:Xe,group:Yn}=tn;if(Xe.side===aa&&Wt.layers.test(de.layers)){const Mt=Xe.side;Xe.side=fi,Xe.needsUpdate=!0,ii(Wt,me,de,qt,Xe,Yn),Xe.side=Mt,Xe.needsUpdate=!0,et=!0}}et===!0&&(xe.updateMultisampleRenderTarget(Ge),xe.updateRenderTargetMipmap(Ge))}k.setRenderTarget(Be,je,Ye),k.setClearColor(ye,Te),mt!==void 0&&(de.viewport=mt),k.toneMapping=it}function qn(R,te,me){const de=te.isScene===!0?te.overrideMaterial:null;for(let pe=0,Ge=R.length;pe<Ge;pe++){const qe=R[pe],{object:Be,geometry:je,group:Ye}=qe;let it=qe.material;it.allowOverride===!0&&de!==null&&(it=de),Be.layers.test(me.layers)&&ii(Be,te,me,je,it,Ye)}}function ii(R,te,me,de,pe,Ge){R.onBeforeRender(k,te,me,de,pe,Ge),R.modelViewMatrix.multiplyMatrices(me.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),pe.onBeforeRender(k,te,me,de,R,Ge),pe.transparent===!0&&pe.side===aa&&pe.forceSinglePass===!1?(pe.side=fi,pe.needsUpdate=!0,k.renderBufferDirect(me,te,de,pe,R,Ge),pe.side=ys,pe.needsUpdate=!0,k.renderBufferDirect(me,te,de,pe,R,Ge),pe.side=aa):k.renderBufferDirect(me,te,de,pe,R,Ge),R.onAfterRender(k,te,me,de,pe,Ge)}function wi(R,te,me){te.isScene!==!0&&(te=Lt);const de=fe.get(R),pe=L.state.lights,Ge=L.state.shadowsArray,qe=pe.state.version,Be=De.getParameters(R,pe.state,Ge,te,me,L.state.lightProbeGridArray),je=De.getProgramCacheKey(Be);let Ye=de.programs;de.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?te.environment:null,de.fog=te.fog;const it=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;de.envMap=be.get(R.envMap||de.environment,it),de.envMapRotation=de.environment!==null&&R.envMap===null?te.environmentRotation:R.envMapRotation,Ye===void 0&&(R.addEventListener("dispose",Ln),Ye=new Map,de.programs=Ye);let mt=Ye.get(je);if(mt!==void 0){if(de.currentProgram===mt&&de.lightsStateVersion===qe)return ha(R,Be),mt}else Be.uniforms=De.getUniforms(R),K!==null&&R.isNodeMaterial&&K.build(R,me,Be),R.onBeforeCompile(Be,k),mt=De.acquireProgram(Be,je),Ye.set(je,mt),de.uniforms=Be.uniforms;const et=de.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(et.clippingPlanes=tt.uniform),ha(R,Be),de.needsLights=pl(R),de.lightsStateVersion=qe,de.needsLights&&(et.ambientLightColor.value=pe.state.ambient,et.lightProbe.value=pe.state.probe,et.directionalLights.value=pe.state.directional,et.directionalLightShadows.value=pe.state.directionalShadow,et.spotLights.value=pe.state.spot,et.spotLightShadows.value=pe.state.spotShadow,et.rectAreaLights.value=pe.state.rectArea,et.ltc_1.value=pe.state.rectAreaLTC1,et.ltc_2.value=pe.state.rectAreaLTC2,et.pointLights.value=pe.state.point,et.pointLightShadows.value=pe.state.pointShadow,et.hemisphereLights.value=pe.state.hemi,et.directionalShadowMatrix.value=pe.state.directionalShadowMatrix,et.spotLightMatrix.value=pe.state.spotLightMatrix,et.spotLightMap.value=pe.state.spotLightMap,et.pointShadowMatrix.value=pe.state.pointShadowMatrix),de.lightProbeGrid=L.state.lightProbeGridArray.length>0,de.currentProgram=mt,de.uniformsList=null,mt}function fa(R){if(R.uniformsList===null){const te=R.currentProgram.getUniforms();R.uniformsList=su.seqWithValue(te.seq,R.uniforms)}return R.uniformsList}function ha(R,te){const me=fe.get(R);me.outputColorSpace=te.outputColorSpace,me.batching=te.batching,me.batchingColor=te.batchingColor,me.instancing=te.instancing,me.instancingColor=te.instancingColor,me.instancingMorph=te.instancingMorph,me.skinning=te.skinning,me.morphTargets=te.morphTargets,me.morphNormals=te.morphNormals,me.morphColors=te.morphColors,me.morphTargetsCount=te.morphTargetsCount,me.numClippingPlanes=te.numClippingPlanes,me.numIntersection=te.numClipIntersection,me.vertexAlphas=te.vertexAlphas,me.vertexTangents=te.vertexTangents,me.toneMapping=te.toneMapping}function Ss(R,te){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;w.setFromMatrixPosition(te.matrixWorld);for(let me=0,de=R.length;me<de;me++){const pe=R[me];if(pe.texture!==null&&pe.boundingBox.containsPoint(w))return pe}return null}function Ha(R,te,me,de,pe){te.isScene!==!0&&(te=Lt),xe.resetTextureUnits();const Ge=te.fog,qe=de.isMeshStandardMaterial||de.isMeshLambertMaterial||de.isMeshPhongMaterial?te.environment:null,Be=W===null?k.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:Dt.workingColorSpace,je=de.isMeshStandardMaterial||de.isMeshLambertMaterial&&!de.envMap||de.isMeshPhongMaterial&&!de.envMap,Ye=be.get(de.envMap||qe,je),it=de.vertexColors===!0&&!!me.attributes.color&&me.attributes.color.itemSize===4,mt=!!me.attributes.tangent&&(!!de.normalMap||de.anisotropy>0),et=!!me.morphAttributes.position,zt=!!me.morphAttributes.normal,ln=!!me.morphAttributes.color;let tn=oa;de.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(tn=k.toneMapping);const Wt=me.morphAttributes.position||me.morphAttributes.normal||me.morphAttributes.color,qt=Wt!==void 0?Wt.length:0,Xe=fe.get(de),Yn=L.state.lights;if(ot===!0&&(lt===!0||R!==B)){const Xt=R===B&&de.id===se;tt.setState(de,R,Xt)}let Mt=!1;de.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==Yn.state.version||Xe.outputColorSpace!==Be||pe.isBatchedMesh&&Xe.batching===!1||!pe.isBatchedMesh&&Xe.batching===!0||pe.isBatchedMesh&&Xe.batchingColor===!0&&pe.colorTexture===null||pe.isBatchedMesh&&Xe.batchingColor===!1&&pe.colorTexture!==null||pe.isInstancedMesh&&Xe.instancing===!1||!pe.isInstancedMesh&&Xe.instancing===!0||pe.isSkinnedMesh&&Xe.skinning===!1||!pe.isSkinnedMesh&&Xe.skinning===!0||pe.isInstancedMesh&&Xe.instancingColor===!0&&pe.instanceColor===null||pe.isInstancedMesh&&Xe.instancingColor===!1&&pe.instanceColor!==null||pe.isInstancedMesh&&Xe.instancingMorph===!0&&pe.morphTexture===null||pe.isInstancedMesh&&Xe.instancingMorph===!1&&pe.morphTexture!==null||Xe.envMap!==Ye||de.fog===!0&&Xe.fog!==Ge||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==tt.numPlanes||Xe.numIntersection!==tt.numIntersection)||Xe.vertexAlphas!==it||Xe.vertexTangents!==mt||Xe.morphTargets!==et||Xe.morphNormals!==zt||Xe.morphColors!==ln||Xe.toneMapping!==tn||Xe.morphTargetsCount!==qt||!!Xe.lightProbeGrid!=L.state.lightProbeGridArray.length>0)&&(Mt=!0):(Mt=!0,Xe.__version=de.version);let Rn=Xe.currentProgram;Mt===!0&&(Rn=wi(de,te,pe),K&&de.isNodeMaterial&&K.onUpdateProgram(de,Rn,Xe));let hi=!1,Gi=!1,di=!1;const Yt=Rn.getUniforms(),cn=Xe.uniforms;if(E.useProgram(Rn.program)&&(hi=!0,Gi=!0,di=!0),de.id!==se&&(se=de.id,Gi=!0),Xe.needsLights){const Xt=Ss(L.state.lightProbeGridArray,pe);Xe.lightProbeGrid!==Xt&&(Xe.lightProbeGrid=Xt,Gi=!0)}if(hi||B!==R){E.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),Yt.setValue(ee,"projectionMatrix",R.projectionMatrix),Yt.setValue(ee,"viewMatrix",R.matrixWorldInverse);const ji=Yt.map.cameraPosition;ji!==void 0&&ji.setValue(ee,Nt.setFromMatrixPosition(R.matrixWorld)),F.logarithmicDepthBuffer&&Yt.setValue(ee,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(de.isMeshPhongMaterial||de.isMeshToonMaterial||de.isMeshLambertMaterial||de.isMeshBasicMaterial||de.isMeshStandardMaterial||de.isShaderMaterial)&&Yt.setValue(ee,"isOrthographic",R.isOrthographicCamera===!0),B!==R&&(B=R,Gi=!0,di=!0)}if(Xe.needsLights&&(Yn.state.directionalShadowMap.length>0&&Yt.setValue(ee,"directionalShadowMap",Yn.state.directionalShadowMap,xe),Yn.state.spotShadowMap.length>0&&Yt.setValue(ee,"spotShadowMap",Yn.state.spotShadowMap,xe),Yn.state.pointShadowMap.length>0&&Yt.setValue(ee,"pointShadowMap",Yn.state.pointShadowMap,xe)),pe.isSkinnedMesh){Yt.setOptional(ee,pe,"bindMatrix"),Yt.setOptional(ee,pe,"bindMatrixInverse");const Xt=pe.skeleton;Xt&&(Xt.boneTexture===null&&Xt.computeBoneTexture(),Yt.setValue(ee,"boneTexture",Xt.boneTexture,xe))}pe.isBatchedMesh&&(Yt.setOptional(ee,pe,"batchingTexture"),Yt.setValue(ee,"batchingTexture",pe._matricesTexture,xe),Yt.setOptional(ee,pe,"batchingIdTexture"),Yt.setValue(ee,"batchingIdTexture",pe._indirectTexture,xe),Yt.setOptional(ee,pe,"batchingColorTexture"),pe._colorsTexture!==null&&Yt.setValue(ee,"batchingColorTexture",pe._colorsTexture,xe));const Hi=me.morphAttributes;if((Hi.position!==void 0||Hi.normal!==void 0||Hi.color!==void 0)&&J.update(pe,me,Rn),(Gi||Xe.receiveShadow!==pe.receiveShadow)&&(Xe.receiveShadow=pe.receiveShadow,Yt.setValue(ee,"receiveShadow",pe.receiveShadow)),(de.isMeshStandardMaterial||de.isMeshLambertMaterial||de.isMeshPhongMaterial)&&de.envMap===null&&te.environment!==null&&(cn.envMapIntensity.value=te.environmentIntensity),cn.dfgLUT!==void 0&&(cn.dfgLUT.value=x2()),Gi){if(Yt.setValue(ee,"toneMappingExposure",k.toneMappingExposure),Xe.needsLights&&Sn(cn,di),Ge&&de.fog===!0&&ze.refreshFogUniforms(cn,Ge),ze.refreshMaterialUniforms(cn,de,ve,ce,L.state.transmissionRenderTarget[R.id]),Xe.needsLights&&Xe.lightProbeGrid){const Xt=Xe.lightProbeGrid;cn.probesSH.value=Xt.texture,cn.probesMin.value.copy(Xt.boundingBox.min),cn.probesMax.value.copy(Xt.boundingBox.max),cn.probesResolution.value.copy(Xt.resolution)}su.upload(ee,fa(Xe),cn,xe)}if(de.isShaderMaterial&&de.uniformsNeedUpdate===!0&&(su.upload(ee,fa(Xe),cn,xe),de.uniformsNeedUpdate=!1),de.isSpriteMaterial&&Yt.setValue(ee,"center",pe.center),Yt.setValue(ee,"modelViewMatrix",pe.modelViewMatrix),Yt.setValue(ee,"normalMatrix",pe.normalMatrix),Yt.setValue(ee,"modelMatrix",pe.matrixWorld),de.uniformsGroups!==void 0){const Xt=de.uniformsGroups;for(let ji=0,Va=Xt.length;ji<Va;ji++){const bs=Xt[ji];we.update(bs,Rn),we.bind(bs,Rn)}}return Rn}function Sn(R,te){R.ambientLightColor.needsUpdate=te,R.lightProbe.needsUpdate=te,R.directionalLights.needsUpdate=te,R.directionalLightShadows.needsUpdate=te,R.pointLights.needsUpdate=te,R.pointLightShadows.needsUpdate=te,R.spotLights.needsUpdate=te,R.spotLightShadows.needsUpdate=te,R.rectAreaLights.needsUpdate=te,R.hemisphereLights.needsUpdate=te}function pl(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return W},this.setRenderTargetTextures=function(R,te,me){const de=fe.get(R);de.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,de.__autoAllocateDepthBuffer===!1&&(de.__useRenderToTexture=!1),fe.get(R.texture).__webglTexture=te,fe.get(R.depthTexture).__webglTexture=de.__autoAllocateDepthBuffer?void 0:me,de.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,te){const me=fe.get(R);me.__webglFramebuffer=te,me.__useDefaultFramebuffer=te===void 0},this.setRenderTarget=function(R,te=0,me=0){W=R,P=te,U=me;let de=null,pe=!1,Ge=!1;if(R){const Be=fe.get(R);if(Be.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(ee.FRAMEBUFFER,Be.__webglFramebuffer),S.copy(R.viewport),H.copy(R.scissor),le=R.scissorTest,E.viewport(S),E.scissor(H),E.setScissorTest(le),se=-1;return}else if(Be.__webglFramebuffer===void 0)xe.setupRenderTarget(R);else if(Be.__hasExternalTextures)xe.rebindTextures(R,fe.get(R.texture).__webglTexture,fe.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const it=R.depthTexture;if(Be.__boundDepthTexture!==it){if(it!==null&&fe.has(it)&&(R.width!==it.image.width||R.height!==it.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");xe.setupDepthRenderbuffer(R)}}const je=R.texture;(je.isData3DTexture||je.isDataArrayTexture||je.isCompressedArrayTexture)&&(Ge=!0);const Ye=fe.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Ye[te])?de=Ye[te][me]:de=Ye[te],pe=!0):R.samples>0&&xe.useMultisampledRTT(R)===!1?de=fe.get(R).__webglMultisampledFramebuffer:Array.isArray(Ye)?de=Ye[me]:de=Ye,S.copy(R.viewport),H.copy(R.scissor),le=R.scissorTest}else S.copy(Ie).multiplyScalar(ve).floor(),H.copy(rt).multiplyScalar(ve).floor(),le=$e;if(me!==0&&(de=V),E.bindFramebuffer(ee.FRAMEBUFFER,de)&&E.drawBuffers(R,de),E.viewport(S),E.scissor(H),E.setScissorTest(le),pe){const Be=fe.get(R.texture);ee.framebufferTexture2D(ee.FRAMEBUFFER,ee.COLOR_ATTACHMENT0,ee.TEXTURE_CUBE_MAP_POSITIVE_X+te,Be.__webglTexture,me)}else if(Ge){const Be=te;for(let je=0;je<R.textures.length;je++){const Ye=fe.get(R.textures[je]);ee.framebufferTextureLayer(ee.FRAMEBUFFER,ee.COLOR_ATTACHMENT0+je,Ye.__webglTexture,me,Be)}}else if(R!==null&&me!==0){const Be=fe.get(R.texture);ee.framebufferTexture2D(ee.FRAMEBUFFER,ee.COLOR_ATTACHMENT0,ee.TEXTURE_2D,Be.__webglTexture,me)}se=-1},this.readRenderTargetPixels=function(R,te,me,de,pe,Ge,qe,Be=0){if(!(R&&R.isWebGLRenderTarget)){It("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let je=fe.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&qe!==void 0&&(je=je[qe]),je){E.bindFramebuffer(ee.FRAMEBUFFER,je);try{const Ye=R.textures[Be],it=Ye.format,mt=Ye.type;if(R.textures.length>1&&ee.readBuffer(ee.COLOR_ATTACHMENT0+Be),!F.textureFormatReadable(it)){It("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!F.textureTypeReadable(mt)){It("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}te>=0&&te<=R.width-de&&me>=0&&me<=R.height-pe&&ee.readPixels(te,me,de,pe,Oe.convert(it),Oe.convert(mt),Ge)}finally{const Ye=W!==null?fe.get(W).__webglFramebuffer:null;E.bindFramebuffer(ee.FRAMEBUFFER,Ye)}}},this.readRenderTargetPixelsAsync=async function(R,te,me,de,pe,Ge,qe,Be=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let je=fe.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&qe!==void 0&&(je=je[qe]),je)if(te>=0&&te<=R.width-de&&me>=0&&me<=R.height-pe){E.bindFramebuffer(ee.FRAMEBUFFER,je);const Ye=R.textures[Be],it=Ye.format,mt=Ye.type;if(R.textures.length>1&&ee.readBuffer(ee.COLOR_ATTACHMENT0+Be),!F.textureFormatReadable(it))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!F.textureTypeReadable(mt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const et=ee.createBuffer();ee.bindBuffer(ee.PIXEL_PACK_BUFFER,et),ee.bufferData(ee.PIXEL_PACK_BUFFER,Ge.byteLength,ee.STREAM_READ),ee.readPixels(te,me,de,pe,Oe.convert(it),Oe.convert(mt),0);const zt=W!==null?fe.get(W).__webglFramebuffer:null;E.bindFramebuffer(ee.FRAMEBUFFER,zt);const ln=ee.fenceSync(ee.SYNC_GPU_COMMANDS_COMPLETE,0);return ee.flush(),await vS(ee,ln,4),ee.bindBuffer(ee.PIXEL_PACK_BUFFER,et),ee.getBufferSubData(ee.PIXEL_PACK_BUFFER,0,Ge),ee.deleteBuffer(et),ee.deleteSync(ln),Ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,te=null,me=0){const de=Math.pow(2,-me),pe=Math.floor(R.image.width*de),Ge=Math.floor(R.image.height*de),qe=te!==null?te.x:0,Be=te!==null?te.y:0;xe.setTexture2D(R,0),ee.copyTexSubImage2D(ee.TEXTURE_2D,me,0,0,qe,Be,pe,Ge),E.unbindTexture()},this.copyTextureToTexture=function(R,te,me=null,de=null,pe=0,Ge=0){let qe,Be,je,Ye,it,mt,et,zt,ln;const tn=R.isCompressedTexture?R.mipmaps[Ge]:R.image;if(me!==null)qe=me.max.x-me.min.x,Be=me.max.y-me.min.y,je=me.isBox3?me.max.z-me.min.z:1,Ye=me.min.x,it=me.min.y,mt=me.isBox3?me.min.z:0;else{const cn=Math.pow(2,-pe);qe=Math.floor(tn.width*cn),Be=Math.floor(tn.height*cn),R.isDataArrayTexture?je=tn.depth:R.isData3DTexture?je=Math.floor(tn.depth*cn):je=1,Ye=0,it=0,mt=0}de!==null?(et=de.x,zt=de.y,ln=de.z):(et=0,zt=0,ln=0);const Wt=Oe.convert(te.format),qt=Oe.convert(te.type);let Xe;te.isData3DTexture?(xe.setTexture3D(te,0),Xe=ee.TEXTURE_3D):te.isDataArrayTexture||te.isCompressedArrayTexture?(xe.setTexture2DArray(te,0),Xe=ee.TEXTURE_2D_ARRAY):(xe.setTexture2D(te,0),Xe=ee.TEXTURE_2D),E.activeTexture(ee.TEXTURE0),E.pixelStorei(ee.UNPACK_FLIP_Y_WEBGL,te.flipY),E.pixelStorei(ee.UNPACK_PREMULTIPLY_ALPHA_WEBGL,te.premultiplyAlpha),E.pixelStorei(ee.UNPACK_ALIGNMENT,te.unpackAlignment);const Yn=E.getParameter(ee.UNPACK_ROW_LENGTH),Mt=E.getParameter(ee.UNPACK_IMAGE_HEIGHT),Rn=E.getParameter(ee.UNPACK_SKIP_PIXELS),hi=E.getParameter(ee.UNPACK_SKIP_ROWS),Gi=E.getParameter(ee.UNPACK_SKIP_IMAGES);E.pixelStorei(ee.UNPACK_ROW_LENGTH,tn.width),E.pixelStorei(ee.UNPACK_IMAGE_HEIGHT,tn.height),E.pixelStorei(ee.UNPACK_SKIP_PIXELS,Ye),E.pixelStorei(ee.UNPACK_SKIP_ROWS,it),E.pixelStorei(ee.UNPACK_SKIP_IMAGES,mt);const di=R.isDataArrayTexture||R.isData3DTexture,Yt=te.isDataArrayTexture||te.isData3DTexture;if(R.isDepthTexture){const cn=fe.get(R),Hi=fe.get(te),Xt=fe.get(cn.__renderTarget),ji=fe.get(Hi.__renderTarget);E.bindFramebuffer(ee.READ_FRAMEBUFFER,Xt.__webglFramebuffer),E.bindFramebuffer(ee.DRAW_FRAMEBUFFER,ji.__webglFramebuffer);for(let Va=0;Va<je;Va++)di&&(ee.framebufferTextureLayer(ee.READ_FRAMEBUFFER,ee.COLOR_ATTACHMENT0,fe.get(R).__webglTexture,pe,mt+Va),ee.framebufferTextureLayer(ee.DRAW_FRAMEBUFFER,ee.COLOR_ATTACHMENT0,fe.get(te).__webglTexture,Ge,ln+Va)),ee.blitFramebuffer(Ye,it,qe,Be,et,zt,qe,Be,ee.DEPTH_BUFFER_BIT,ee.NEAREST);E.bindFramebuffer(ee.READ_FRAMEBUFFER,null),E.bindFramebuffer(ee.DRAW_FRAMEBUFFER,null)}else if(pe!==0||R.isRenderTargetTexture||fe.has(R)){const cn=fe.get(R),Hi=fe.get(te);E.bindFramebuffer(ee.READ_FRAMEBUFFER,re),E.bindFramebuffer(ee.DRAW_FRAMEBUFFER,Z);for(let Xt=0;Xt<je;Xt++)di?ee.framebufferTextureLayer(ee.READ_FRAMEBUFFER,ee.COLOR_ATTACHMENT0,cn.__webglTexture,pe,mt+Xt):ee.framebufferTexture2D(ee.READ_FRAMEBUFFER,ee.COLOR_ATTACHMENT0,ee.TEXTURE_2D,cn.__webglTexture,pe),Yt?ee.framebufferTextureLayer(ee.DRAW_FRAMEBUFFER,ee.COLOR_ATTACHMENT0,Hi.__webglTexture,Ge,ln+Xt):ee.framebufferTexture2D(ee.DRAW_FRAMEBUFFER,ee.COLOR_ATTACHMENT0,ee.TEXTURE_2D,Hi.__webglTexture,Ge),pe!==0?ee.blitFramebuffer(Ye,it,qe,Be,et,zt,qe,Be,ee.COLOR_BUFFER_BIT,ee.NEAREST):Yt?ee.copyTexSubImage3D(Xe,Ge,et,zt,ln+Xt,Ye,it,qe,Be):ee.copyTexSubImage2D(Xe,Ge,et,zt,Ye,it,qe,Be);E.bindFramebuffer(ee.READ_FRAMEBUFFER,null),E.bindFramebuffer(ee.DRAW_FRAMEBUFFER,null)}else Yt?R.isDataTexture||R.isData3DTexture?ee.texSubImage3D(Xe,Ge,et,zt,ln,qe,Be,je,Wt,qt,tn.data):te.isCompressedArrayTexture?ee.compressedTexSubImage3D(Xe,Ge,et,zt,ln,qe,Be,je,Wt,tn.data):ee.texSubImage3D(Xe,Ge,et,zt,ln,qe,Be,je,Wt,qt,tn):R.isDataTexture?ee.texSubImage2D(ee.TEXTURE_2D,Ge,et,zt,qe,Be,Wt,qt,tn.data):R.isCompressedTexture?ee.compressedTexSubImage2D(ee.TEXTURE_2D,Ge,et,zt,tn.width,tn.height,Wt,tn.data):ee.texSubImage2D(ee.TEXTURE_2D,Ge,et,zt,qe,Be,Wt,qt,tn);E.pixelStorei(ee.UNPACK_ROW_LENGTH,Yn),E.pixelStorei(ee.UNPACK_IMAGE_HEIGHT,Mt),E.pixelStorei(ee.UNPACK_SKIP_PIXELS,Rn),E.pixelStorei(ee.UNPACK_SKIP_ROWS,hi),E.pixelStorei(ee.UNPACK_SKIP_IMAGES,Gi),Ge===0&&te.generateMipmaps&&ee.generateMipmap(Xe),E.unbindTexture()},this.initRenderTarget=function(R){fe.get(R).__webglFramebuffer===void 0&&xe.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?xe.setTextureCube(R,0):R.isData3DTexture?xe.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?xe.setTexture2DArray(R,0):xe.setTexture2D(R,0),E.unbindTexture()},this.resetState=function(){P=0,U=0,W=null,E.reset(),Fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ra}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=Dt._getDrawingBufferColorSpace(e),i.unpackColorSpace=Dt._getUnpackColorSpace()}}var Tp={};(function r(e,i,s,l){var c=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),f=typeof Path2D=="function"&&typeof DOMMatrix=="function",p=(function(){if(!e.OffscreenCanvas)return!1;try{var B=new OffscreenCanvas(1,1),S=B.getContext("2d");S.fillRect(0,0,1,1);var H=B.transferToImageBitmap();S.createPattern(H,"no-repeat")}catch{return!1}return!0})();function m(){}function d(B){var S=i.exports.Promise,H=S!==void 0?S:e.Promise;return typeof H=="function"?new H(B):(B(m,m),null)}var v=(function(B,S){return{transform:function(H){if(B)return H;if(S.has(H))return S.get(H);var le=new OffscreenCanvas(H.width,H.height),ye=le.getContext("2d");return ye.drawImage(H,0,0),S.set(H,le),le},clear:function(){S.clear()}}})(p,new Map),_=(function(){var B=Math.floor(16.666666666666668),S,H,le={},ye=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(S=function(Te){var $=Math.random();return le[$]=requestAnimationFrame(function ce(ve){ye===ve||ye+B-1<ve?(ye=ve,delete le[$],Te()):le[$]=requestAnimationFrame(ce)}),$},H=function(Te){le[Te]&&cancelAnimationFrame(le[Te])}):(S=function(Te){return setTimeout(Te,B)},H=function(Te){return clearTimeout(Te)}),{frame:S,cancel:H}})(),g=(function(){var B,S,H={};function le(ye){function Te($,ce){ye.postMessage({options:$||{},callback:ce})}ye.init=function(ce){var ve=ce.transferControlToOffscreen();ye.postMessage({canvas:ve},[ve])},ye.fire=function(ce,ve,Ce){if(S)return Te(ce,null),S;var Ve=Math.random().toString(36).slice(2);return S=d(function(Ie){function rt($e){$e.data.callback===Ve&&(delete H[Ve],ye.removeEventListener("message",rt),S=null,v.clear(),Ce(),Ie())}ye.addEventListener("message",rt),Te(ce,Ve),H[Ve]=rt.bind(null,{data:{callback:Ve}})}),S},ye.reset=function(){ye.postMessage({reset:!0});for(var ce in H)H[ce](),delete H[ce]}}return function(){if(B)return B;if(!s&&c){var ye=["var CONFETTI, SIZE = {}, module = {};","("+r.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{B=new Worker(URL.createObjectURL(new Blob([ye])))}catch(Te){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",Te),null}le(B)}return B}})(),b={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function T(B,S){return S?S(B):B}function C(B){return B!=null}function M(B,S,H){return T(B&&C(B[S])?B[S]:b[S],H)}function x(B){return B<0?0:Math.floor(B)}function N(B,S){return Math.floor(Math.random()*(S-B))+B}function z(B){return parseInt(B,16)}function w(B){return B.map(G)}function G(B){var S=String(B).replace(/[^0-9a-f]/gi,"");return S.length<6&&(S=S[0]+S[0]+S[1]+S[1]+S[2]+S[2]),{r:z(S.substring(0,2)),g:z(S.substring(2,4)),b:z(S.substring(4,6))}}function L(B){var S=M(B,"origin",Object);return S.x=M(S,"x",Number),S.y=M(S,"y",Number),S}function I(B){B.width=document.documentElement.clientWidth,B.height=document.documentElement.clientHeight}function A(B){var S=B.getBoundingClientRect();B.width=S.width,B.height=S.height}function O(B){var S=document.createElement("canvas");return S.style.position="fixed",S.style.top="0px",S.style.left="0px",S.style.pointerEvents="none",S.style.zIndex=B,S}function k(B,S,H,le,ye,Te,$,ce,ve){B.save(),B.translate(S,H),B.rotate(Te),B.scale(le,ye),B.arc(0,0,1,$,ce,ve),B.restore()}function X(B){var S=B.angle*(Math.PI/180),H=B.spread*(Math.PI/180);return{x:B.x,y:B.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:B.startVelocity*.5+Math.random()*B.startVelocity,angle2D:-S+(.5*H-Math.random()*H),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:B.color,shape:B.shape,tick:0,totalTicks:B.ticks,decay:B.decay,drift:B.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:B.gravity*3,ovalScalar:.6,scalar:B.scalar,flat:B.flat}}function K(B,S){S.x+=Math.cos(S.angle2D)*S.velocity+S.drift,S.y+=Math.sin(S.angle2D)*S.velocity+S.gravity,S.velocity*=S.decay,S.flat?(S.wobble=0,S.wobbleX=S.x+10*S.scalar,S.wobbleY=S.y+10*S.scalar,S.tiltSin=0,S.tiltCos=0,S.random=1):(S.wobble+=S.wobbleSpeed,S.wobbleX=S.x+10*S.scalar*Math.cos(S.wobble),S.wobbleY=S.y+10*S.scalar*Math.sin(S.wobble),S.tiltAngle+=.1,S.tiltSin=Math.sin(S.tiltAngle),S.tiltCos=Math.cos(S.tiltAngle),S.random=Math.random()+2);var H=S.tick++/S.totalTicks,le=S.x+S.random*S.tiltCos,ye=S.y+S.random*S.tiltSin,Te=S.wobbleX+S.random*S.tiltCos,$=S.wobbleY+S.random*S.tiltSin;if(B.fillStyle="rgba("+S.color.r+", "+S.color.g+", "+S.color.b+", "+(1-H)+")",B.beginPath(),f&&S.shape.type==="path"&&typeof S.shape.path=="string"&&Array.isArray(S.shape.matrix))B.fill(U(S.shape.path,S.shape.matrix,S.x,S.y,Math.abs(Te-le)*.1,Math.abs($-ye)*.1,Math.PI/10*S.wobble));else if(S.shape.type==="bitmap"){var ce=Math.PI/10*S.wobble,ve=Math.abs(Te-le)*.1,Ce=Math.abs($-ye)*.1,Ve=S.shape.bitmap.width*S.scalar,Ie=S.shape.bitmap.height*S.scalar,rt=new DOMMatrix([Math.cos(ce)*ve,Math.sin(ce)*ve,-Math.sin(ce)*Ce,Math.cos(ce)*Ce,S.x,S.y]);rt.multiplySelf(new DOMMatrix(S.shape.matrix));var $e=B.createPattern(v.transform(S.shape.bitmap),"no-repeat");$e.setTransform(rt),B.globalAlpha=1-H,B.fillStyle=$e,B.fillRect(S.x-Ve/2,S.y-Ie/2,Ve,Ie),B.globalAlpha=1}else if(S.shape==="circle")B.ellipse?B.ellipse(S.x,S.y,Math.abs(Te-le)*S.ovalScalar,Math.abs($-ye)*S.ovalScalar,Math.PI/10*S.wobble,0,2*Math.PI):k(B,S.x,S.y,Math.abs(Te-le)*S.ovalScalar,Math.abs($-ye)*S.ovalScalar,Math.PI/10*S.wobble,0,2*Math.PI);else if(S.shape==="star")for(var ke=Math.PI/2*3,ot=4*S.scalar,lt=8*S.scalar,Tt=S.x,Nt=S.y,Ut=5,Lt=Math.PI/Ut;Ut--;)Tt=S.x+Math.cos(ke)*lt,Nt=S.y+Math.sin(ke)*lt,B.lineTo(Tt,Nt),ke+=Lt,Tt=S.x+Math.cos(ke)*ot,Nt=S.y+Math.sin(ke)*ot,B.lineTo(Tt,Nt),ke+=Lt;else B.moveTo(Math.floor(S.x),Math.floor(S.y)),B.lineTo(Math.floor(S.wobbleX),Math.floor(ye)),B.lineTo(Math.floor(Te),Math.floor($)),B.lineTo(Math.floor(le),Math.floor(S.wobbleY));return B.closePath(),B.fill(),S.tick<S.totalTicks}function V(B,S,H,le,ye){var Te=S.slice(),$=B.getContext("2d"),ce,ve,Ce=d(function(Ve){function Ie(){ce=ve=null,$.clearRect(0,0,le.width,le.height),v.clear(),ye(),Ve()}function rt(){s&&!(le.width===l.width&&le.height===l.height)&&(le.width=B.width=l.width,le.height=B.height=l.height),!le.width&&!le.height&&(H(B),le.width=B.width,le.height=B.height),$.clearRect(0,0,le.width,le.height),Te=Te.filter(function($e){return K($,$e)}),Te.length?ce=_.frame(rt):Ie()}ce=_.frame(rt),ve=Ie});return{addFettis:function(Ve){return Te=Te.concat(Ve),Ce},canvas:B,promise:Ce,reset:function(){ce&&_.cancel(ce),ve&&ve()}}}function re(B,S){var H=!B,le=!!M(S||{},"resize"),ye=!1,Te=M(S,"disableForReducedMotion",Boolean),$=c&&!!M(S||{},"useWorker"),ce=$?g():null,ve=H?I:A,Ce=B&&ce?!!B.__confetti_initialized:!1,Ve=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,Ie;function rt(ke,ot,lt){for(var Tt=M(ke,"particleCount",x),Nt=M(ke,"angle",Number),Ut=M(ke,"spread",Number),Lt=M(ke,"startVelocity",Number),Gt=M(ke,"decay",Number),en=M(ke,"gravity",Number),ee=M(ke,"drift",Number),Ot=M(ke,"colors",w),At=M(ke,"ticks",Number),F=M(ke,"shapes"),E=M(ke,"scalar"),ie=!!M(ke,"flat"),fe=L(ke),xe=Tt,be=[],Ne=B.width*fe.x,q=B.height*fe.y;xe--;)be.push(X({x:Ne,y:q,angle:Nt,spread:Ut,startVelocity:Lt,color:Ot[xe%Ot.length],shape:F[N(0,F.length)],ticks:At,decay:Gt,gravity:en,drift:ee,scalar:E,flat:ie}));return Ie?Ie.addFettis(be):(Ie=V(B,be,ve,ot,lt),Ie.promise)}function $e(ke){var ot=Te||M(ke,"disableForReducedMotion",Boolean),lt=M(ke,"zIndex",Number);if(ot&&Ve)return d(function(Lt){Lt()});H&&Ie?B=Ie.canvas:H&&!B&&(B=O(lt),document.body.appendChild(B)),le&&!Ce&&ve(B);var Tt={width:B.width,height:B.height};ce&&!Ce&&ce.init(B),Ce=!0,ce&&(B.__confetti_initialized=!0);function Nt(){if(ce){var Lt={getBoundingClientRect:function(){if(!H)return B.getBoundingClientRect()}};ve(Lt),ce.postMessage({resize:{width:Lt.width,height:Lt.height}});return}Tt.width=Tt.height=null}function Ut(){Ie=null,le&&(ye=!1,e.removeEventListener("resize",Nt)),H&&B&&(document.body.contains(B)&&document.body.removeChild(B),B=null,Ce=!1)}return le&&!ye&&(ye=!0,e.addEventListener("resize",Nt,!1)),ce?ce.fire(ke,Tt,Ut):rt(ke,Tt,Ut)}return $e.reset=function(){ce&&ce.reset(),Ie&&Ie.reset()},$e}var Z;function P(){return Z||(Z=re(null,{useWorker:!0,resize:!0})),Z}function U(B,S,H,le,ye,Te,$){var ce=new Path2D(B),ve=new Path2D;ve.addPath(ce,new DOMMatrix(S));var Ce=new Path2D;return Ce.addPath(ve,new DOMMatrix([Math.cos($)*ye,Math.sin($)*ye,-Math.sin($)*Te,Math.cos($)*Te,H,le])),Ce}function W(B){if(!f)throw new Error("path confetti are not supported in this browser");var S,H;typeof B=="string"?S=B:(S=B.path,H=B.matrix);var le=new Path2D(S),ye=document.createElement("canvas"),Te=ye.getContext("2d");if(!H){for(var $=1e3,ce=$,ve=$,Ce=0,Ve=0,Ie,rt,$e=0;$e<$;$e+=2)for(var ke=0;ke<$;ke+=2)Te.isPointInPath(le,$e,ke,"nonzero")&&(ce=Math.min(ce,$e),ve=Math.min(ve,ke),Ce=Math.max(Ce,$e),Ve=Math.max(Ve,ke));Ie=Ce-ce,rt=Ve-ve;var ot=10,lt=Math.min(ot/Ie,ot/rt);H=[lt,0,0,lt,-Math.round(Ie/2+ce)*lt,-Math.round(rt/2+ve)*lt]}return{type:"path",path:S,matrix:H}}function se(B){var S,H=1,le="#000000",ye='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof B=="string"?S=B:(S=B.text,H="scalar"in B?B.scalar:H,ye="fontFamily"in B?B.fontFamily:ye,le="color"in B?B.color:le);var Te=10*H,$=""+Te+"px "+ye,ce=new OffscreenCanvas(Te,Te),ve=ce.getContext("2d");ve.font=$;var Ce=ve.measureText(S),Ve=Math.ceil(Ce.actualBoundingBoxRight+Ce.actualBoundingBoxLeft),Ie=Math.ceil(Ce.actualBoundingBoxAscent+Ce.actualBoundingBoxDescent),rt=2,$e=Ce.actualBoundingBoxLeft+rt,ke=Ce.actualBoundingBoxAscent+rt;Ve+=rt+rt,Ie+=rt+rt,ce=new OffscreenCanvas(Ve,Ie),ve=ce.getContext("2d"),ve.font=$,ve.fillStyle=le,ve.fillText(S,$e,ke);var ot=1/H;return{type:"bitmap",bitmap:ce.transferToImageBitmap(),matrix:[ot,0,0,ot,-Ve*ot/2,-Ie*ot/2]}}i.exports=function(){return P().apply(this,arguments)},i.exports.reset=function(){P().reset()},i.exports.create=re,i.exports.shapeFromPath=W,i.exports.shapeFromText=se})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),Tp,!1);const M2=Tp.exports;Tp.exports.create;const na=28,Jc=40,ui=-16,st={cyan:"#00f0ff",magenta:"#ff007f",yellow:"#ffe600",green:"#00ff66",orange:"#ff6600",purple:"#9d00ff",red:"#ff2222",blue:"#0066ff",gold:"#ffd700"};function Yr(r,e,i,s,l,c=1,f=100,p=2.2,m=1,d=1.2){return{id:r,x:e,y:i,z:0,width:p,height:m,depth:d,type:s,health:c,maxHealth:c,color:l,points:f}}const Ia=[{id:1,name:"STAGE 1: NEON HORIZON",subtitle:"ネオンの地平線 - 爆裂チェーン反応",themeColor:st.cyan,gridColor:"#002244",skyColor:"#030814",blocks:(()=>{const r=[];for(let p=0;p<6;p++)for(let m=0;m<9;m++){const d=-10+m*2.5,v=14-p*1.4;let _="normal",g=st.cyan,b=1,T=100;if(p===1&&(m===2||m===6)||p===4&&m===4)_="tnt",g=st.red,T=250;else if(p===2&&(m===1||m===7))_="lightning",g=st.yellow,T=200;else if(p===0&&(m===3||m===5))_="gift",g=st.gold,T=300;else if(p===3&&(m===3||m===4||m===5))_="tough",g=st.purple,b=2,T=200;else{const C=[st.magenta,st.cyan,st.green,st.orange,st.blue,st.magenta];g=C[p%C.length]}r.push(Yr(`s1_${p}_${m}`,d,v,_,g,b,T))}return r})()},{id:2,name:"STAGE 2: CYBER MATRIX",subtitle:"電子迷宮 - 電撃連鎖とプリズム分裂",themeColor:st.magenta,gridColor:"#330033",skyColor:"#0a0212",blocks:(()=>{const r=[];let i=0;for(let s=-6;s<=6;s++){const l=6-Math.abs(s);for(let c=-l;c<=l;c+=2){const f=c*2.2,p=8+s*1.3;let m="normal",d=st.magenta,v=1,_=150;s===0&&c===0?(m="prism",d=st.cyan,v=1,_=500):Math.abs(s)===2&&Math.abs(c)===2?(m="lightning",d=st.yellow,_=250):Math.abs(s)+Math.abs(c)===6?(m="tough",d=st.purple,v=3,_=300):Math.abs(s)===3&&c===0?(m="gift",d=st.gold,_=400):s%2===0?d=st.orange:d=st.green,r.push(Yr(`s2_${i++}`,f,p,m,d,v,_))}}return r})()},{id:3,name:"STAGE 3: QUANTUM VORTEX",subtitle:"重力渦動 - 異次元ブラックホール",themeColor:st.purple,gridColor:"#1a0033",skyColor:"#050110",blocks:(()=>{const r=[];let e=0;return[{radius:2.5,count:6,type:"vortex",color:st.purple,health:1},{radius:5.5,count:12,type:"tough",color:st.blue,health:2},{radius:8.5,count:18,type:"normal",color:st.cyan,health:1},{radius:11.5,count:24,type:"normal",color:st.magenta,health:1}].forEach((s,l)=>{for(let c=0;c<s.count;c++){const f=c/s.count*Math.PI*2,p=Math.cos(f)*s.radius,m=9+Math.sin(f)*(s.radius*.75);let d=s.type,v=s.color,_=s.health,g=200*(l+1);l===2&&c%4===0?(d="tnt",v=st.red):l===3&&c%6===0?(d="gift",v=st.gold):l===1&&c%3===0&&(d="prism",v=st.cyan),r.push(Yr(`s3_${e++}`,p,m,d,v,_,g))}}),r})()},{id:4,name:"STAGE 4: THE TITAN CORE",subtitle:"最終防衛線 - 超巨大コアの撃破",themeColor:st.red,gridColor:"#330000",skyColor:"#120000",boss:{name:"TITAN-X CORE",maxHealth:50,health:50},blocks:(()=>{const r=[];let e=0;r.push({id:"boss_core",x:0,y:11,z:0,width:5.5,height:3.5,depth:2,type:"boss",health:50,maxHealth:50,color:st.red,points:1e4});for(let i=0;i<3;i++){const s=6.5+i*2.8,l=8+i*4;for(let c=0;c<l;c++){const f=c/l*Math.PI*2,p=Math.cos(f)*s,m=11+Math.sin(f)*(s*.7);let d="tough",v=st.orange,_=3;i===2?(d=c%2===0?"tnt":"lightning",v=c%2===0?st.red:st.yellow,_=1):i===1&&c%4===0&&(d="gift",v=st.gold,_=1),r.push(Yr(`s4_${e++}`,p,m,d,v,_,300))}}return r})()},{id:5,name:"STAGE 5: SUPERNOVA HYPERDRIVE",subtitle:"無限フィーバー空間 - 超絶光速カタルシス",themeColor:st.gold,gridColor:"#332200",skyColor:"#100a00",blocks:(()=>{const r=[];let e=0;const i=8,s=11,l=-12,c=16,f=2.4,p=1.3;for(let m=0;m<i;m++)for(let d=0;d<s;d++){const v=l+d*f,_=c-m*p;let g="normal",b=st.gold,T=1,C=250;const M=Math.random();M<.15?(g="tnt",b=st.red):M<.28?(g="lightning",b=st.yellow):M<.4?(g="prism",b=st.cyan):M<.52?(g="gift",b=st.gold):M<.7?(g="tough",b=st.magenta,T=2):b=st.green,r.push(Yr(`s5_${e++}`,v,_,g,b,T,C))}return r})()}];function fx(r){const e=5+r,i=[];let s=0;const l=7+r%3,c=9+r%4,f=-(c*1.2),p=15,m=2.4,d=1.3;for(let v=0;v<l;v++)for(let _=0;_<c;_++){const g=f+_*m,b=p-v*d;let T="normal",C=st.cyan,M=1+(v>4?1:0),x=200+r*50;const N=Math.sin(r*99+v*13+_*37);if(N>.6)T="tnt",C=st.red;else if(N>.35)T="lightning",C=st.yellow;else if(N<-.6)T="gift",C=st.gold;else if(N<-.35)T="prism",C=st.magenta;else{const z=[st.cyan,st.green,st.orange,st.purple,st.magenta];C=z[Math.abs(Math.floor(N*10))%z.length]}i.push(Yr(`inf_${e}_${s++}`,g,b,T,C,M,x))}return{id:e,name:`STAGE ${e}: HYPER RUN`,subtitle:`無限領域 レベル ${e}`,themeColor:st.cyan,gridColor:"#001a33",skyColor:"#020b18",blocks:i}}function S2(r,e){const i=e.width/2,s=e.height/2,l=e.depth/2,c=Math.max(e.x-i,Math.min(r.x,e.x+i)),f=Math.max(e.y-s,Math.min(r.y,e.y+s)),p=Math.max(e.z-l,Math.min(r.z,e.z+l)),m=r.x-c,d=r.y-f,v=r.z-p,_=m*m+d*d+v*v;if(_<r.radius*r.radius){const g=Math.sqrt(_);let b=0,T=0,C=0;if(g>1e-4)b=m/g,T=d/g,C=v/g;else{const M=i-Math.abs(r.x-e.x),x=s-Math.abs(r.y-e.y),N=l-Math.abs(r.z-e.z);M<x&&M<N?b=r.x>e.x?1:-1:x<N?T=r.y>e.y?1:-1:C=r.z>e.z?1:-1}return{hit:!0,normalX:b,normalY:T,normalZ:C,penetration:r.radius-g}}return{hit:!1,normalX:0,normalY:0,normalZ:0,penetration:0}}function b2(r,e,i,s=1.6,l=1,c=0){const f=i/2+r.radius,p=l/2+r.radius,m=s/2+r.radius,d=r.x-e,v=r.y-ui,_=r.z;if(Math.abs(d)<=f&&Math.abs(v)<=p&&Math.abs(_)<=m&&r.vy<0){const T=Math.max(-1,Math.min(1,(r.x-e)/(i/2)))*1.15,C=Math.sqrt(r.vx*r.vx+r.vy*r.vy),M=Math.max(r.baseSpeed,C),x=c*.15;let N=M*Math.sin(T)+x,z=Math.abs(M*Math.cos(T));z<M*.3&&(z=M*.3);const w=Math.sqrt(N*N+z*z);return N=N/w*M,z=z/w*M,{hit:!0,newVx:N,newVy:z}}return{hit:!1,newVx:r.vx,newVy:r.vy}}function E2(r,e=0,i=0,s=14){const l=[];for(let f=0;f<s;f++){const p=(Math.random()-.5)*r.width,m=(Math.random()-.5)*r.height,d=(Math.random()-.5)*r.depth,v=Math.random()*Math.PI*2,_=(Math.random()-.3)*Math.PI,g=8+Math.random()*16,b=Math.cos(v)*Math.cos(_)*g+e*.2,T=Math.sin(_)*g+Math.abs(i)*.2+2,C=Math.sin(v)*Math.cos(_)*g*.8;l.push({x:r.x+p,y:r.y+m,z:r.z+d,vx:b,vy:T,vz:C,rx:Math.random()*Math.PI*2,ry:Math.random()*Math.PI*2,rz:Math.random()*Math.PI*2,vrx:(Math.random()-.5)*15,vry:(Math.random()-.5)*15,vrz:(Math.random()-.5)*15,size:.45*(.6+Math.random()*.8),color:r.color,life:1,maxLife:1+Math.random()*.5,type:Math.random()>.4?"box":"tetra"})}return l}function T2(r,e){const f=[];for(let p=0;p<r.length;p++){const m=r[p];m.life-=e/m.maxLife,m.life>0&&(m.vy+=-35*e,m.vx*=.985,m.vy*=.985,m.vz*=.985,m.x+=m.vx*e,m.y+=m.vy*e,m.z+=m.vz*e,m.rx+=m.vrx*e,m.ry+=m.vry*e,m.rz+=m.vrz*e,m.y<-22&&(m.y=-22,m.vy=-m.vy*.55,m.vx*=.8,m.vz*=.8),f.push(m))}return f}function A2(){const r=[{type:"multiball",weight:25},{type:"fireball",weight:15},{type:"lasers",weight:20},{type:"wide_paddle",weight:15},{type:"shield",weight:12},{type:"magnet",weight:10},{type:"titan_ball",weight:10},{type:"slow_motion",weight:8},{type:"super_laser",weight:6}],e=r.reduce((s,l)=>s+l.weight,0);let i=Math.random()*e;for(const s of r){if(i<s.weight)return s.type;i-=s.weight}return"multiball"}const w_={multiball:{name:"マルチボール x3",color:"#00f0ff",duration:0,icon:"Zap"},fireball:{name:"メガ・ファイアボール",color:"#ff3300",duration:12,icon:"Flame"},lasers:{name:"レーザーキャノン",color:"#00ff66",duration:15,icon:"Crosshair"},wide_paddle:{name:"ワイドパドル",color:"#ffe600",duration:16,icon:"Maximize2"},magnet:{name:"マグネットキャッチ",color:"#9d00ff",duration:14,icon:"Magnet"},shield:{name:"セーフティシールド",color:"#00ccff",duration:20,icon:"Shield"},slow_motion:{name:"タイムワープ (減速)",color:"#3399ff",duration:10,icon:"Clock"},titan_ball:{name:"タイタン重力弾",color:"#ff00aa",duration:14,icon:"Disc"},super_laser:{name:"ハイパーバスター砲",color:"#ffff00",duration:8,icon:"Radio"}};class w2{constructor(){this.ctx=null,this.isMuted=!1,this.masterGain=null,this.feverOsc=null,this.feverGain=null,this.isInitialized=!1,this.comboScale=[261.63,293.66,329.63,392,440,523.25,587.33,659.25,783.99,880,1046.5,1174.66,1318.51,1567.98,1760,2093]}init(){if(this.isInitialized&&this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}try{const e=window.AudioContext||window.webkitAudioContext;this.ctx=new e,this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(.3,this.ctx.currentTime),this.masterGain.connect(this.ctx.destination),this.isInitialized=!0}catch{console.warn("Web Audio API not supported")}}setMuted(e){this.isMuted=e,this.masterGain&&this.ctx&&this.masterGain.gain.setValueAtTime(e?0:.3,this.ctx.currentTime)}getMuted(){return this.isMuted}playPaddleHit(e=0){if(this.isMuted||!this.ctx||!this.masterGain)return;this.init();const i=this.ctx.currentTime,s=this.ctx.createOscillator(),l=this.ctx.createGain();s.type="sine";const c=180+Math.min(e*10,200);s.frequency.setValueAtTime(c,i),s.frequency.exponentialRampToValueAtTime(40,i+.12),l.gain.setValueAtTime(.4,i),l.gain.exponentialRampToValueAtTime(.001,i+.12),s.connect(l),l.connect(this.masterGain),s.start(i),s.stop(i+.12)}playWallHit(){if(this.isMuted||!this.ctx||!this.masterGain)return;this.init();const e=this.ctx.currentTime,i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="triangle",i.frequency.setValueAtTime(440,e),i.frequency.exponentialRampToValueAtTime(120,e+.06),s.gain.setValueAtTime(.15,e),s.gain.exponentialRampToValueAtTime(.001,e+.06),i.connect(s),s.connect(this.masterGain),i.start(e),i.stop(e+.06)}playBlockBreak(e=1,i=!1){if(this.isMuted||!this.ctx||!this.masterGain)return;this.init();const s=this.ctx.currentTime,l=Math.min(e,this.comboScale.length-1),c=this.comboScale[l],f=this.ctx.createOscillator(),p=this.ctx.createGain();f.type=i?"sawtooth":"triangle",f.frequency.setValueAtTime(c,s),f.frequency.exponentialRampToValueAtTime(c*1.5,s+.05),f.frequency.exponentialRampToValueAtTime(c,s+.18),p.gain.setValueAtTime(.3,s),p.gain.exponentialRampToValueAtTime(.001,s+.22),f.connect(p),p.connect(this.masterGain),f.start(s),f.stop(s+.22);const m=this.ctx.createOscillator(),d=this.ctx.createGain();m.type="sine",m.frequency.setValueAtTime(c*2,s),m.frequency.exponentialRampToValueAtTime(c*3.5,s+.1),d.gain.setValueAtTime(.15,s),d.gain.exponentialRampToValueAtTime(.001,s+.15),m.connect(d),d.connect(this.masterGain),m.start(s),m.stop(s+.15)}playExplosion(){if(this.isMuted||!this.ctx||!this.masterGain)return;this.init();const e=this.ctx.currentTime,i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="sawtooth",i.frequency.setValueAtTime(140,e),i.frequency.exponentialRampToValueAtTime(25,e+.45),s.gain.setValueAtTime(.6,e),s.gain.exponentialRampToValueAtTime(.001,e+.5),i.connect(s),s.connect(this.masterGain),i.start(e),i.stop(e+.5),this.playNoise(.35,.4)}playLightning(){if(this.isMuted||!this.ctx||!this.masterGain)return;this.init();const e=this.ctx.currentTime,i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="sawtooth",i.frequency.setValueAtTime(800,e),i.frequency.linearRampToValueAtTime(200,e+.05),i.frequency.linearRampToValueAtTime(1200,e+.1),i.frequency.exponentialRampToValueAtTime(80,e+.25),s.gain.setValueAtTime(.35,e),s.gain.exponentialRampToValueAtTime(.001,e+.25),i.connect(s),s.connect(this.masterGain),i.start(e),i.stop(e+.25)}playLaser(){if(this.isMuted||!this.ctx||!this.masterGain)return;this.init();const e=this.ctx.currentTime,i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="sawtooth",i.frequency.setValueAtTime(950,e),i.frequency.exponentialRampToValueAtTime(150,e+.12),s.gain.setValueAtTime(.2,e),s.gain.exponentialRampToValueAtTime(.001,e+.12),i.connect(s),s.connect(this.masterGain),i.start(e),i.stop(e+.12)}playPowerUpCollect(){if(this.isMuted||!this.ctx||!this.masterGain)return;this.init();const e=this.ctx.currentTime;[523.25,659.25,783.99,1046.5].forEach((s,l)=>{if(!this.ctx||!this.masterGain)return;const c=e+l*.06,f=this.ctx.createOscillator(),p=this.ctx.createGain();f.type="sine",f.frequency.setValueAtTime(s,c),p.gain.setValueAtTime(.25,c),p.gain.exponentialRampToValueAtTime(.001,c+.2),f.connect(p),p.connect(this.masterGain),f.start(c),f.stop(c+.2)})}playBallLost(){if(this.isMuted||!this.ctx||!this.masterGain)return;this.init();const e=this.ctx.currentTime,i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="sawtooth",i.frequency.setValueAtTime(300,e),i.frequency.exponentialRampToValueAtTime(60,e+.4),s.gain.setValueAtTime(.3,e),s.gain.exponentialRampToValueAtTime(.001,e+.4),i.connect(s),s.connect(this.masterGain),i.start(e),i.stop(e+.4)}playStageClear(){if(this.isMuted||!this.ctx||!this.masterGain)return;this.init();const e=this.ctx.currentTime;[{notes:[392,523.25,659.25],time:0,dur:.18},{notes:[440,587.33,698.46],time:.2,dur:.18},{notes:[523.25,659.25,783.99],time:.4,dur:.22},{notes:[659.25,783.99,1046.5],time:.65,dur:.6}].forEach(s=>{s.notes.forEach(l=>{if(!this.ctx||!this.masterGain)return;const c=e+s.time,f=this.ctx.createOscillator(),p=this.ctx.createGain();f.type="triangle",f.frequency.setValueAtTime(l,c),p.gain.setValueAtTime(.2,c),p.gain.exponentialRampToValueAtTime(.001,c+s.dur),f.connect(p),p.connect(this.masterGain),f.start(c),f.stop(c+s.dur)})})}playFeverStart(){if(this.isMuted||!this.ctx||!this.masterGain)return;this.init();const e=this.ctx.currentTime,i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="sawtooth",i.frequency.setValueAtTime(200,e),i.frequency.exponentialRampToValueAtTime(1200,e+.35),s.gain.setValueAtTime(.4,e),s.gain.exponentialRampToValueAtTime(.01,e+.4),i.connect(s),s.connect(this.masterGain),i.start(e),i.stop(e+.4)}playNoise(e,i){if(!this.ctx||!this.masterGain)return;const s=this.ctx.sampleRate*i,l=this.ctx.createBuffer(1,s,this.ctx.sampleRate),c=l.getChannelData(0);for(let d=0;d<s;d++)c[d]=Math.random()*2-1;const f=this.ctx.createBufferSource();f.buffer=l;const p=this.ctx.createBiquadFilter();p.type="lowpass",p.frequency.setValueAtTime(800,this.ctx.currentTime),p.frequency.exponentialRampToValueAtTime(50,this.ctx.currentTime+i);const m=this.ctx.createGain();m.gain.setValueAtTime(e,this.ctx.currentTime),m.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+i),f.connect(p),p.connect(m),m.connect(this.masterGain),f.start(),f.stop(this.ctx.currentTime+i)}}const xn=new w2;class R2{constructor(e){this.shockwaveMeshes=[],this.laserMeshes=[],this.lightningLines=[],this.maxParticles=3e3,this.activeParticleCount=0,this.scene=e,this.particlePositions=new Float32Array(this.maxParticles*3),this.particleColors=new Float32Array(this.maxParticles*3),this.particleSizes=new Float32Array(this.maxParticles),this.particleAlphas=new Float32Array(this.maxParticles),this.particleVelocities=new Float32Array(this.maxParticles*3),this.particleLives=new Float32Array(this.maxParticles),this.particleMaxLives=new Float32Array(this.maxParticles),this.particleGeo=new Dn,this.particleGeo.setAttribute("position",new Ai(this.particlePositions,3)),this.particleGeo.setAttribute("color",new Ai(this.particleColors,3)),this.particleGeo.setAttribute("size",new Ai(this.particleSizes,1));const i=document.createElement("canvas");i.width=64,i.height=64;const s=i.getContext("2d");if(s){const f=s.createRadialGradient(32,32,0,32,32,32);f.addColorStop(0,"rgba(255, 255, 255, 1)"),f.addColorStop(.3,"rgba(255, 255, 255, 0.8)"),f.addColorStop(.7,"rgba(255, 255, 255, 0.2)"),f.addColorStop(1,"rgba(255, 255, 255, 0)"),s.fillStyle=f,s.fillRect(0,0,64,64)}const l=new ob(i),c=new Q_({size:.6,vertexColors:!0,map:l,transparent:!0,blending:Zr,depthWrite:!1});this.particlePoints=new rb(this.particleGeo,c),this.scene.add(this.particlePoints)}spawnSparks(e,i,s,l,c=20,f=1,p=.8){const m=new Qe(l);for(let d=0;d<c&&!(this.activeParticleCount>=this.maxParticles);d++){const v=this.activeParticleCount;this.particlePositions[v*3]=e,this.particlePositions[v*3+1]=i,this.particlePositions[v*3+2]=s,this.particleColors[v*3]=m.r,this.particleColors[v*3+1]=m.g,this.particleColors[v*3+2]=m.b;const _=Math.random()*Math.PI*2,g=(Math.random()-.5)*Math.PI,b=(3+Math.random()*12)*f;this.particleVelocities[v*3]=Math.cos(_)*Math.cos(g)*b,this.particleVelocities[v*3+1]=Math.sin(g)*b+1.5,this.particleVelocities[v*3+2]=Math.sin(_)*Math.cos(g)*b,this.particleSizes[v]=(.3+Math.random()*.5)*p,this.particleLives[v]=1,this.particleMaxLives[v]=.4+Math.random()*.6,this.activeParticleCount++}}spawnShockwave(e,i,s,l,c=8,f=.45){const p=new Mp(.2,.6,32),m=new fl({color:new Qe(l),side:aa,transparent:!0,opacity:.9,blending:Zr,depthWrite:!1}),d=new yn(p,m);d.position.set(e,i,s),this.scene.add(d),this.shockwaveMeshes.push({mesh:d,data:{x:e,y:i,z:s,radius:.2,maxRadius:c,color:l,life:f,maxLife:f}})}spawnLightningArc(e,i,s="#ffee00",l=8){const c=[],f=new ne().subVectors(i,e),p=f.length();f.normalize();let m=e.clone();c.push(m.clone());for(let b=1;b<l;b++){const T=b/l,C=new ne().addVectors(e,f.clone().multiplyScalar(p*T)),M=.6;C.x+=(Math.random()-.5)*M,C.y+=(Math.random()-.5)*M,C.z+=(Math.random()-.5)*M,c.push(C)}c.push(i.clone());const d=[];for(let b=0;b<c.length-1;b++)d.push(c[b],c[b+1]);const v=new Dn().setFromPoints(d),_=new mu({color:new Qe(s),linewidth:2,transparent:!0,opacity:1,blending:Zr}),g=new vp(v,_);this.scene.add(g),this.lightningLines.push(g),setTimeout(()=>{this.scene.remove(g),v.dispose(),_.dispose();const b=this.lightningLines.indexOf(g);b!==-1&&this.lightningLines.splice(b,1)},120)}spawnLaserMesh(e){const i=new _p(.12,.12,2.2,8);i.rotateX(Math.PI/2);const s=new fl({color:new Qe(e.color),transparent:!0,opacity:.95,blending:Zr}),l=new yn(i,s);l.position.set(e.x,e.y,e.z);const c=new au(e.color,1.2,4);c.position.set(0,0,0),l.add(c),this.scene.add(l),this.laserMeshes.push({mesh:l,light:c,data:e})}update(e){for(let l=0;l<this.activeParticleCount;l++){if(this.particleLives[l]-=e/this.particleMaxLives[l],this.particleLives[l]<=0){const c=this.activeParticleCount-1;l!==c&&(this.particlePositions[l*3]=this.particlePositions[c*3],this.particlePositions[l*3+1]=this.particlePositions[c*3+1],this.particlePositions[l*3+2]=this.particlePositions[c*3+2],this.particleColors[l*3]=this.particleColors[c*3],this.particleColors[l*3+1]=this.particleColors[c*3+1],this.particleColors[l*3+2]=this.particleColors[c*3+2],this.particleVelocities[l*3]=this.particleVelocities[c*3],this.particleVelocities[l*3+1]=this.particleVelocities[c*3+1],this.particleVelocities[l*3+2]=this.particleVelocities[c*3+2],this.particleSizes[l]=this.particleSizes[c],this.particleLives[l]=this.particleLives[c],this.particleMaxLives[l]=this.particleMaxLives[c]),this.activeParticleCount--,l--;continue}this.particleVelocities[l*3+1]+=-12*e,this.particleVelocities[l*3]*=.98,this.particleVelocities[l*3+1]*=.98,this.particleVelocities[l*3+2]*=.98,this.particlePositions[l*3]+=this.particleVelocities[l*3]*e,this.particlePositions[l*3+1]+=this.particleVelocities[l*3+1]*e,this.particlePositions[l*3+2]+=this.particleVelocities[l*3+2]*e}this.particleGeo.attributes.position.needsUpdate=!0,this.particleGeo.attributes.color.needsUpdate=!0,this.particleGeo.attributes.size.needsUpdate=!0,this.particleGeo.setDrawRange(0,this.activeParticleCount);for(let l=this.shockwaveMeshes.length-1;l>=0;l--){const c=this.shockwaveMeshes[l];c.data.life-=e;const f=1-c.data.life/c.data.maxLife;if(c.data.life<=0)this.scene.remove(c.mesh),c.mesh.geometry.dispose(),c.mesh.material.dispose(),this.shockwaveMeshes.splice(l,1);else{const p=c.data.maxRadius*f;c.mesh.scale.set(p,p,p),c.mesh.material.opacity=Math.max(0,1-f)}}for(let l=this.laserMeshes.length-1;l>=0;l--){const c=this.laserMeshes[l];c.data.y+=c.data.vy*e,c.mesh.position.set(c.data.x,c.data.y,c.data.z),c.data.y>22&&(this.scene.remove(c.mesh),c.mesh.geometry.dispose(),c.mesh.material.dispose(),this.laserMeshes.splice(l,1))}}removeLaserMesh(e){const i=this.laserMeshes.findIndex(s=>s.data.id===e.id);if(i!==-1){const s=this.laserMeshes[i];this.scene.remove(s.mesh),s.mesh.geometry.dispose(),s.mesh.material.dispose(),this.laserMeshes.splice(i,1)}}dispose(){this.scene.remove(this.particlePoints),this.particleGeo.dispose(),this.particlePoints.material.dispose(),this.shockwaveMeshes.forEach(e=>{this.scene.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose()}),this.shockwaveMeshes=[],this.laserMeshes.forEach(e=>{this.scene.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose()}),this.laserMeshes=[],this.lightningLines.forEach(e=>{this.scene.remove(e),e.geometry.dispose(),e.material.dispose()}),this.lightningLines=[]}}const C2=({stageNumber:r,stageKey:e,cameraMode:i,onStatsUpdate:s,onStatusChange:l,gameStatus:c,isPaused:f,onActivePowerUpsChange:p,setStageNumber:m})=>{const d=Pt.useRef(null),v=Pt.useRef(c),_=Pt.useRef("start"),g=Pt.useRef(f),b=Pt.useRef(i),T=Pt.useRef(s),C=Pt.useRef(l),M=Pt.useRef(p);Pt.useEffect(()=>{_.current=v.current,v.current=c},[c]),Pt.useEffect(()=>{g.current=f},[f]),Pt.useEffect(()=>{b.current=i},[i]),Pt.useEffect(()=>{T.current=s,C.current=l,M.current=p},[s,l,p]);const x=Pt.useRef({stats:{score:0,highScore:parseInt(localStorage.getItem("cyberbreak_high_score")||"0",10),combo:0,maxCombo:0,feverGauge:0,isFever:!1,feverTimeLeft:0,blocksDestroyed:0,ballsLaunched:0,powerUpsCollected:0,stage:r,lives:3,maxLives:3},balls:[],blocks:[],droppedPowerUps:[],activePowerUps:[],shards:[],lasers:[],floatingTexts:[],paddleX:0,paddleVx:0,paddleWidth:5.5,basePaddleWidth:5.5,keys:{},mouseTargetX:null,currentStageConfig:Ia[0],shakeIntensity:0,shakeDecay:8,timeScale:1,lastLaserShot:0,bossAngle:0}),N=Pt.useRef(null),z=V=>{let re;V<=Ia.length?re=JSON.parse(JSON.stringify(Ia[V-1])):re=fx(V-Ia.length),x.current.currentStageConfig=re,x.current.blocks=re.blocks;const Z=x.current.stats,P=_.current,U=Z.stage===V;if(Z.blocksDestroyed=0,Z.combo=0,Z.feverGauge=0,Z.isFever=!1,Z.feverTimeLeft=0,P==="start"||P==="game_over"?(Z.score=0,Z.maxCombo=0,Z.ballsLaunched=0,Z.powerUpsCollected=0,Z.lives=Z.maxLives):U&&(Z.lives=Z.maxLives),Z.stage=V,x.current.activePowerUps=[],x.current.droppedPowerUps=[],x.current.lasers=[],x.current.timeScale=1,G(),N.current){const{scene:W,blockMeshes:se}=N.current;se.forEach(B=>{W.remove(B),B.geometry.dispose(),B.material.dispose()}),se.clear(),re.blocks.forEach(B=>{const S=w(B);W.add(S),se.set(B.id,S)})}},w=V=>{const re=new Bi(V.width,V.height,V.depth);let Z;V.type==="boss"?Z=new bi({color:new Qe(V.color),emissive:new Qe("#ff0033"),emissiveIntensity:.6,roughness:.2,metalness:.8}):V.type==="tnt"?Z=new bi({color:new Qe("#ff2200"),emissive:new Qe("#ff4400"),emissiveIntensity:.7,roughness:.3,metalness:.5}):V.type==="lightning"?Z=new bi({color:new Qe("#ffee00"),emissive:new Qe("#ffcc00"),emissiveIntensity:.8,roughness:.1,metalness:.6}):V.type==="prism"?Z=new mb({color:new Qe("#00ffff"),emissive:new Qe("#0088ff"),emissiveIntensity:.5,roughness:.1,transmission:.8,thickness:1.2}):V.type==="gift"?Z=new bi({color:new Qe("#ffd700"),emissive:new Qe("#ffaa00"),emissiveIntensity:.7,roughness:.2,metalness:.9}):V.type==="vortex"?Z=new bi({color:new Qe("#9d00ff"),emissive:new Qe("#5500aa"),emissiveIntensity:.9,roughness:.2}):Z=new bi({color:new Qe(V.color),emissive:new Qe(V.color),emissiveIntensity:.4,roughness:.3,metalness:.4});const P=new yn(re,Z);P.position.set(V.x,V.y,V.z),P.castShadow=!0,P.receiveShadow=!0;const U=new cb(re),W=new mu({color:new Qe(V.color),linewidth:1.5,transparent:!0,opacity:.8}),se=new vp(U,W);return P.add(se),P},G=()=>{x.current.balls=[{id:`ball_${Date.now()}_0`,x:x.current.paddleX,y:ui+1.6,z:0,vx:0,vy:0,vz:0,radius:.65,speed:19,baseSpeed:19,isFireball:!1,isTitan:!1,stuckToPaddle:!0,stuckOffsetX:0,trailColor:"#00f0ff"}]},L=()=>{let V=!1;x.current.balls.forEach(re=>{if(re.stuckToPaddle){re.stuckToPaddle=!1;const Z=(Math.random()-.5)*.4;re.vx=re.speed*Math.sin(Z),re.vy=re.speed*Math.cos(Z),V=!0}}),V&&(xn.playPaddleHit(0),x.current.stats.ballsLaunched++)},I=V=>{x.current.shakeIntensity=Math.min(x.current.shakeIntensity+V,2.5)};Pt.useEffect(()=>{const V=d.current;if(!V)return;const re=V.clientWidth||window.innerWidth,Z=V.clientHeight||window.innerHeight,P=new jS;P.background=new Qe("#030712"),P.fog=new pp("#030712",.015);const U=new Ei(55,re/Z,.1,1e3);U.position.set(0,-22,28),U.lookAt(0,0,0);const W=new y2({antialias:!0,powerPreference:"high-performance"});W.setSize(re,Z),W.setPixelRatio(Math.min(window.devicePixelRatio,2)),W.shadowMap.enabled=!0,W.shadowMap.type=C_,W.toneMapping=ip,W.toneMappingExposure=1.25,V.appendChild(W.domElement);const se=new Mb("#223355",.8);P.add(se);const B=new yb("#ffffff",1.4);B.position.set(10,20,25),B.castShadow=!0,B.shadow.mapSize.width=1024,B.shadow.mapSize.height=1024,P.add(B);const S=new Eb(60,40,"#00f0ff","#002244");S.position.set(0,0,-2.5),S.rotation.x=Math.PI/2,P.add(S);const H=new js,le=new bi({color:"#00ffff",emissive:"#0088cc",emissiveIntensity:.6,roughness:.2,metalness:.8}),ye=new Bi(.8,Jc,1.8),Te=new yn(ye,le);Te.position.set(-14.4,0,0),H.add(Te);const $=new yn(ye,le);$.position.set(na/2+.4,0,0),H.add($);const ce=new Bi(na+1.6,.8,1.8),ve=new yn(ce,le);ve.position.set(0,Jc/2+.4,0),H.add(ve),P.add(H);const Ce=new js,Ve=new Bi(1,1,1.6),Ie=new bi({color:"#ffffff",emissive:"#00f0ff",emissiveIntensity:.7,roughness:.2,metalness:.9}),rt=new yn(Ve,Ie);rt.castShadow=!0,rt.receiveShadow=!0,Ce.add(rt);const $e=new Bi(1.02,1.05,1.65),ke=new fl({color:"#00ffff",wireframe:!0}),ot=new yn($e,ke);Ce.add(ot);const lt=new au("#00f0ff",2,6);lt.position.set(0,-.6,0),Ce.add(lt),Ce.position.set(0,ui,0),P.add(Ce);const Tt=new Bi(na+1.2,.4,1.2),Nt=new bi({color:"#00f0ff",emissive:"#00ccff",emissiveIntensity:1,transparent:!0,opacity:0}),Ut=new yn(Tt,Nt);Ut.position.set(0,ui-2.5,0),P.add(Ut);const Lt=new R2(P);N.current={scene:P,camera:U,renderer:W,fxManager:Lt,paddleMesh:Ce,shieldMesh:Ut,blockMeshes:new Map,ballMeshes:new Map,powerUpMeshes:new Map,shardMeshes:[],gridHelper:S,arenaWalls:H,ambientLight:se,dirLight:B},z(r);const Gt=be=>{xn.init(),x.current.keys[be.code]=!0,be.code==="Space"&&(be.preventDefault(),L(),E()),(be.code==="ShiftLeft"||be.code==="ShiftRight")&&(x.current.timeScale=.35)},en=be=>{x.current.keys[be.code]=!1,(be.code==="ShiftLeft"||be.code==="ShiftRight")&&(x.current.timeScale=1)},ee=be=>{const Ne=V.getBoundingClientRect(),oe=(be.clientX-Ne.left)/Ne.width*2-1,De=na/2-x.current.paddleWidth/2;x.current.mouseTargetX=Math.max(-De,Math.min(De,oe*(na/2)))},Ot=be=>{if(be.touches.length>0){const Ne=V.getBoundingClientRect(),oe=(be.touches[0].clientX-Ne.left)/Ne.width*2-1,De=na/2-x.current.paddleWidth/2;x.current.mouseTargetX=Math.max(-De,Math.min(De,oe*(na/2)))}},At=()=>{xn.init(),L(),E()};window.addEventListener("keydown",Gt),window.addEventListener("keyup",en),V.addEventListener("mousemove",ee),V.addEventListener("touchmove",Ot,{passive:!0}),V.addEventListener("click",At);const F=()=>{if(!V||!N.current)return;const be=V.clientWidth,Ne=V.clientHeight;N.current.camera.aspect=be/Ne,N.current.camera.updateProjectionMatrix(),N.current.renderer.setSize(be,Ne)};window.addEventListener("resize",F);const E=()=>{const be=x.current;if(!be.activePowerUps.some(ze=>ze.type==="lasers"||ze.type==="super_laser"))return;const q=performance.now();if(q-be.lastLaserShot<150)return;be.lastLaserShot=q,xn.playLaser();const oe=be.activePowerUps.some(ze=>ze.type==="super_laser"),De=be.paddleWidth;oe?[-De*.4,0,De*.4].forEach(ze=>{const Pe={id:`laser_${Date.now()}_${Math.random()}`,x:be.paddleX+ze,y:ui+1.2,z:0,vy:42,life:1,color:"#ffff00"};be.lasers.push(Pe),N.current?.fxManager.spawnLaserMesh(Pe)}):[-De*.35,De*.35].forEach(ze=>{const Pe={id:`laser_${Date.now()}_${Math.random()}`,x:be.paddleX+ze,y:ui+1.2,z:0,vy:38,life:1,color:"#00ff66"};be.lasers.push(Pe),N.current?.fxManager.spawnLaserMesh(Pe)})};let ie,fe=performance.now();const xe=be=>{ie=requestAnimationFrame(xe);const Ne=Math.min((be-fe)/1e3,.05);fe=be;const q=x.current,oe=N.current;if(!oe)return;const De=g.current,ze=v.current,Pe=b.current;if(De||ze!=="playing"){oe.renderer.render(oe.scene,oe.camera);return}const Le=Ne*q.timeScale;if(q.shakeIntensity>0&&(q.shakeIntensity=Math.max(0,q.shakeIntensity-Le*q.shakeDecay)),q.stats.isFever){if(q.stats.feverTimeLeft-=Le,q.stats.feverTimeLeft<=0)q.stats.isFever=!1,q.stats.feverGauge=0;else if(Math.random()<.15){const ht=(Math.random()-.5)*na,yt=Math.random()*15;oe.fxManager.spawnSparks(ht,yt,0,"#ffd700",12,1.2)}}for(let ht=q.activePowerUps.length-1;ht>=0;ht--){const yt=q.activePowerUps[ht];yt.duration-=Le,yt.duration<=0&&q.activePowerUps.splice(ht,1)}M.current([...q.activePowerUps]);const nt=q.activePowerUps.some(ht=>ht.type==="wide_paddle")?q.basePaddleWidth*1.6:q.basePaddleWidth;q.paddleWidth+=(nt-q.paddleWidth)*.15,oe.paddleMesh.scale.x=q.paddleWidth;const ut=q.activePowerUps.some(ht=>ht.type==="shield"),J=oe.shieldMesh.material;J.opacity=PS.lerp(J.opacity,ut?.75:0,.1);let Ue=q.paddleX;const Me=34;(q.keys.ArrowLeft||q.keys.KeyA)&&(Ue-=Me*Le,q.mouseTargetX=null),(q.keys.ArrowRight||q.keys.KeyD)&&(Ue+=Me*Le,q.mouseTargetX=null),q.mouseTargetX!==null&&(Ue=q.mouseTargetX);const Oe=na/2-q.paddleWidth/2;Ue=Math.max(-Oe,Math.min(Oe,Ue));const Fe=q.paddleX;q.paddleX+=(Ue-q.paddleX)*.35,q.paddleVx=(q.paddleX-Fe)/Math.max(Le,.001),oe.paddleMesh.position.x=q.paddleX,oe.paddleMesh.rotation.z=-q.paddleVx*.005,(q.keys.Space||q.keys.KeyF)&&q.activePowerUps.some(ht=>ht.type==="lasers"||ht.type==="super_laser")&&E(),q.bossAngle+=Le*.8;const we=q.blocks.find(ht=>ht.type==="boss");if(we){we.x=Math.sin(q.bossAngle)*6;const ht=oe.blockMeshes.get(we.id);ht&&(ht.position.x=we.x,ht.rotation.y=q.bossAngle*.5)}for(let ht=q.lasers.length-1;ht>=0;ht--){const yt=q.lasers[ht];let Re=!1;for(let Xn=q.blocks.length-1;Xn>=0;Xn--){const Vt=q.blocks[Xn],dn=Vt.width/2+.3,Mn=Vt.height/2+.8;if(Math.abs(yt.x-Vt.x)<dn&&Math.abs(yt.y-Vt.y)<Mn){Re=!0,k(Vt,1,0,15),oe.fxManager.spawnSparks(yt.x,yt.y,0,yt.color,12,1.2);break}}(Re||yt.y>Jc/2)&&(oe.fxManager.removeLaserMesh(yt),q.lasers.splice(ht,1))}const Ze=q.stats.isFever||q.activePowerUps.some(ht=>ht.type==="fireball"),We=q.activePowerUps.some(ht=>ht.type==="titan_ball"),an=q.activePowerUps.some(ht=>ht.type==="slow_motion"),Ht=q.activePowerUps.some(ht=>ht.type==="magnet"),kn=2,Ln=Le/kn;for(let ht=0;ht<kn;ht++)for(let yt=q.balls.length-1;yt>=0;yt--){const Re=q.balls[yt];Re.isFireball=Ze,Re.isTitan=We,Re.radius=We?1.1:Ze?.85:.65;const Xn=an?Re.baseSpeed*.65:q.stats.isFever?Re.baseSpeed*1.3:Re.baseSpeed;if(Re.stuckToPaddle){Re.x=q.paddleX+(Re.stuckOffsetX||0),Re.y=ui+1.6,Re.vx=0,Re.vy=0;continue}Math.abs(Re.vy)<3.5&&Math.abs(Re.vx)>5&&(Re.vy=(Re.vy<0?-1:1)*4),q.blocks.filter(Wn=>Wn.type==="vortex").forEach(Wn=>{const ni=Wn.x-Re.x,On=Wn.y-Re.y,qn=Math.sqrt(ni*ni+On*On);if(qn<12&&qn>.5){const ii=18/(qn*qn)*Ln;Re.vx+=ni/qn*ii,Re.vy+=On/qn*ii}}),Re.x+=Re.vx*Ln,Re.y+=Re.vy*Ln,Re.z+=Re.vz*Ln;const Vt=na/2-Re.radius,dn=Jc/2-Re.radius;Re.x<-Vt&&(Re.x=-Vt,Re.vx=Math.abs(Re.vx),xn.playWallHit(),oe.fxManager.spawnSparks(Re.x,Re.y,0,"#00ffff",8),I(.08)),Re.x>Vt&&(Re.x=Vt,Re.vx=-Math.abs(Re.vx),xn.playWallHit(),oe.fxManager.spawnSparks(Re.x,Re.y,0,"#00ffff",8),I(.08)),Re.y>dn&&(Re.y=dn,Re.vy=-Math.abs(Re.vy),xn.playWallHit(),oe.fxManager.spawnSparks(Re.x,Re.y,0,"#00ffff",8),I(.1)),ut&&Re.y<ui-1.8&&Re.vy<0&&(Re.y=ui-1.8,Re.vy=Math.abs(Re.vy),xn.playPaddleHit(2),oe.fxManager.spawnShockwave(Re.x,Re.y,0,"#00ffff",6),I(.2));const Mn=b2(Re,q.paddleX,q.paddleWidth,1.6,1,q.paddleVx);Mn.hit&&(Ht&&q.balls.length===1?(Re.stuckToPaddle=!0,Re.stuckOffsetX=Re.x-q.paddleX,xn.playPowerUpCollect()):(Re.vx=Mn.newVx,Re.vy=Mn.newVy,q.stats.combo=0,xn.playPaddleHit(q.stats.combo),oe.fxManager.spawnShockwave(Re.x,Re.y,0,"#00f0ff",4),oe.fxManager.spawnSparks(Re.x,Re.y,0,"#ffffff",14,1.2),I(.15)));for(let Wn=q.blocks.length-1;Wn>=0;Wn--){const ni=q.blocks[Wn],On=S2(Re,ni);if(On.hit){const qn=Re.isTitan?3:1;k(ni,qn,Re.vx,Re.vy),Re.isFireball?(oe.fxManager.spawnShockwave(ni.x,ni.y,0,"#ff3300",5),I(.3)):(Math.abs(On.normalX)>.001&&(Re.vx=Math.sign(On.normalX)*Math.abs(Re.vx)),Math.abs(On.normalY)>.001&&(Re.vy=Math.sign(On.normalY)*Math.abs(Re.vy)),Re.x+=On.normalX*On.penetration,Re.y+=On.normalY*On.penetration),oe.fxManager.spawnSparks(Re.x,Re.y,0,Re.isFireball?"#ff5500":ni.color,Re.isTitan?24:14,1.2);const ii=Math.max(Xn,Math.sqrt(Re.vx*Re.vx+Re.vy*Re.vy)),wi=Math.sqrt(Re.vx*Re.vx+Re.vy*Re.vy);wi>.001&&(Re.vx=Re.vx/wi*ii,Re.vy=Re.vy/wi*ii);break}}Re.y<ui-6&&(q.balls.splice(yt,1),oe.fxManager.spawnShockwave(Re.x,Re.y,0,"#ff0033",7),xn.playBallLost(),q.balls.length===0&&(q.stats.lives--,q.stats.combo=0,I(.6),q.stats.lives<=0?C.current("game_over"):G()))}q.shards=T2(q.shards,Le);for(let ht=q.droppedPowerUps.length-1;ht>=0;ht--){const yt=q.droppedPowerUps[ht];yt.y-=yt.vy*Le,yt.rotation+=Le*3;const Re=q.paddleWidth/2+1.2;if(Math.abs(yt.x-q.paddleX)<Re&&Math.abs(yt.y-ui)<1.4){K(yt.type),xn.playPowerUpCollect(),oe.fxManager.spawnShockwave(yt.x,yt.y,0,yt.color,5),oe.fxManager.spawnSparks(yt.x,yt.y,0,yt.color,20,1.4),I(.2),q.stats.powerUpsCollected++,q.droppedPowerUps.splice(ht,1);continue}yt.y<ui-6&&q.droppedPowerUps.splice(ht,1)}A(oe,q),oe.fxManager.update(Le),O(oe.camera,Pe,q),q.blocks.filter(ht=>ht.type!=="indestructible").length===0&&v.current==="playing"&&(C.current("stage_clear"),xn.playStageClear(),M2({particleCount:120,spread:80,origin:{y:.6},colors:["#00f0ff","#ff007f","#ffe600","#00ff66"]})),T.current({...q.stats}),oe.renderer.render(oe.scene,oe.camera)};return ie=requestAnimationFrame(xe),()=>{cancelAnimationFrame(ie),window.removeEventListener("keydown",Gt),window.removeEventListener("keyup",en),V.removeEventListener("mousemove",ee),V.removeEventListener("touchmove",Ot),V.removeEventListener("click",At),window.removeEventListener("resize",F),N.current?.fxManager.dispose(),N.current?.renderer.dispose(),V.contains(W.domElement)&&V.removeChild(W.domElement)}},[]);const A=(V,re)=>{const Z=new Set(re.balls.map(U=>U.id));V.ballMeshes.forEach((U,W)=>{Z.has(W)||(V.scene.remove(U.mesh),U.mesh.geometry.dispose(),U.mesh.material.dispose(),V.ballMeshes.delete(W))}),re.balls.forEach(U=>{let W=V.ballMeshes.get(U.id);if(!W){const B=new Sp(1,24,24),S=new bi({color:"#ffffff",emissive:"#00f0ff",emissiveIntensity:1,roughness:.1,metalness:.9}),H=new yn(B,S);H.castShadow=!0;const le=new au("#00f0ff",2,8);H.add(le),V.scene.add(H),W={mesh:H,light:le,trail:[]},V.ballMeshes.set(U.id,W)}W.mesh.position.set(U.x,U.y,U.z),W.mesh.scale.set(U.radius,U.radius,U.radius);const se=W.mesh.material;U.isFireball?(se.emissive.set("#ff3300"),W.light.color.set("#ff4400"),V.fxManager.spawnSparks(U.x,U.y,0,"#ff3300",2,.4,.4)):U.isTitan?(se.emissive.set("#ff00aa"),W.light.color.set("#ff00aa")):(se.emissive.set(U.trailColor),W.light.color.set(U.trailColor))});const P=new Set(re.droppedPowerUps.map(U=>U.id));for(V.powerUpMeshes.forEach((U,W)=>{P.has(W)||(V.scene.remove(U),V.powerUpMeshes.delete(W))}),re.droppedPowerUps.forEach(U=>{let W=V.powerUpMeshes.get(U.id);if(!W){W=new js;const se=new yp(.8),B=new bi({color:new Qe(U.color),emissive:new Qe(U.color),emissiveIntensity:.8,roughness:.2,metalness:.8}),S=new yn(se,B);W.add(S);const H=new au(U.color,1.5,4);W.add(H),V.scene.add(W),V.powerUpMeshes.set(U.id,W)}W.position.set(U.x,U.y,U.z),W.rotation.y=U.rotation,W.rotation.x=U.rotation*.7});V.shardMeshes.length<re.shards.length;){const U=new Bi(1,1,1),W=new bi({roughness:.3,metalness:.4}),se=new yn(U,W);se.castShadow=!0,V.scene.add(se),V.shardMeshes.push(se)}for(let U=0;U<V.shardMeshes.length;U++){const W=V.shardMeshes[U];if(U<re.shards.length){const se=re.shards[U];W.visible=!0,W.position.set(se.x,se.y,se.z),W.rotation.set(se.rx,se.ry,se.rz),W.scale.set(se.size*se.life,se.size*se.life,se.size*se.life);const B=W.material;B.color.set(se.color),B.emissive.set(se.color),B.emissiveIntensity=.5*se.life}else W.visible=!1}},O=(V,re,Z)=>{let P=0,U=0,W=30,se=0,B=0,S=0;const H=Z.balls[0];switch(re){case"action":H?(P=H.x*.35,U=-18+H.y*.2,se=H.x*.15,B=H.y*.5):(P=Z.paddleX*.25,U=-20,se=0,B=0),W=28;break;case"paddle":P=Z.paddleX,U=ui-4.5,W=4.5,se=H?H.x*.4:Z.paddleX,B=12,S=0;break;case"top":P=0,U=0,W=44,se=0,B=0,S=0;break;case"iso":P=14,U=-22,W=24,se=0,B=2,S=0;break}const le=Z.shakeIntensity,ye=(Math.random()-.5)*le*1.5,Te=(Math.random()-.5)*le*1.5,$=(Math.random()-.5)*le*.8;V.position.x+=(P+ye-V.position.x)*.1,V.position.y+=(U+Te-V.position.y)*.1,V.position.z+=(W+$-V.position.z)*.1,V.lookAt(se,B,S)},k=(V,re=1,Z=0,P=0)=>{const U=x.current,W=N.current;if(!W)return;V.health-=re,U.stats.combo++,U.stats.combo>U.stats.maxCombo&&(U.stats.maxCombo=U.stats.combo);const se=Math.min(1+U.stats.combo*.2,5),B=Math.round(V.points*se);if(U.stats.score+=B,U.stats.score>U.stats.highScore&&(U.stats.highScore=U.stats.score,localStorage.setItem("cyberbreak_high_score",U.stats.score.toString())),U.stats.isFever||(U.stats.feverGauge=Math.min(100,U.stats.feverGauge+(V.type==="tnt"?12:5)),U.stats.feverGauge>=100&&(U.stats.isFever=!0,U.stats.feverTimeLeft=10,xn.playFeverStart(),W.fxManager.spawnShockwave(0,0,0,"#ffd700",16,.8),I(.8))),xn.playBlockBreak(U.stats.combo,V.type!=="normal"),V.health<=0)U.stats.blocksDestroyed++,X(V,Z,P);else{const S=W.blockMeshes.get(V.id);if(S){const H=S.material;H.emissiveIntensity=1.5,setTimeout(()=>{H&&(H.emissiveIntensity=.4)},80)}}},X=(V,re=0,Z=0)=>{const P=x.current,U=N.current;if(!U)return;const W=U.blockMeshes.get(V.id);W&&(U.scene.remove(W),W.geometry.dispose(),W.material.dispose(),U.blockMeshes.delete(V.id));const se=P.blocks.findIndex(B=>B.id===V.id);if(se!==-1&&P.blocks.splice(se,1),P.shards.length<150){const B=E2(V,re,Z,V.type==="boss"?36:14);P.shards.push(...B)}if(V.type==="tnt"){xn.playExplosion(),U.fxManager.spawnShockwave(V.x,V.y,0,"#ff3300",12,.5),U.fxManager.spawnSparks(V.x,V.y,0,"#ff5500",40,2),I(.7);const B=6.5;P.blocks.forEach(S=>{const H=S.x-V.x,le=S.y-V.y;Math.sqrt(H*H+le*le)<=B&&k(S,2,H*3,le*3)})}else if(V.type==="lightning")xn.playLightning(),U.fxManager.spawnShockwave(V.x,V.y,0,"#ffee00",8),I(.4),[...P.blocks].map(S=>({block:S,dist:Math.hypot(S.x-V.x,S.y-V.y)})).filter(S=>S.dist>.1&&S.dist<10).sort((S,H)=>S.dist-H.dist).slice(0,4).forEach(S=>{U.fxManager.spawnLightningArc(new ne(V.x,V.y,0),new ne(S.block.x,S.block.y,0),"#ffee00"),k(S.block,2,0,0)});else if(V.type==="prism")[...P.balls].forEach(S=>{if(P.balls.length<16){const H={...S,id:`ball_${Date.now()}_${Math.random()}`,vx:S.vx*Math.cos(.4)-S.vy*Math.sin(.4),vy:S.vx*Math.sin(.4)+S.vy*Math.cos(.4),trailColor:"#ff00cc"};P.balls.push(H)}}),U.fxManager.spawnShockwave(V.x,V.y,0,"#00ffff",9),xn.playPowerUpCollect();else if(V.type==="gift"||Math.random()<.22){const B=A2(),S=w_[B];P.droppedPowerUps.push({id:`drop_${Date.now()}_${Math.random()}`,x:V.x,y:V.y,z:0,type:B,color:S.color,vy:7.5,rotation:0})}},K=V=>{const re=x.current,Z=w_[V];if(V==="multiball"){const U=re.balls[0]||{id:"base",x:re.paddleX,y:ui+2,z:0,vx:0,vy:18,vz:0,radius:.65,speed:19,baseSpeed:19,isFireball:!1,isTitan:!1,trailColor:"#00f0ff"};[-.4,.4,.8].forEach(W=>{if(re.balls.length<20){const se=U.speed;re.balls.push({...U,id:`ball_${Date.now()}_${Math.random()}`,stuckToPaddle:!1,vx:se*Math.sin(W),vy:Math.abs(se*Math.cos(W)),trailColor:"#00f0ff"})}});return}const P=re.activePowerUps.find(U=>U.type===V);P?P.duration=Z.duration:re.activePowerUps.push({type:V,duration:Z.duration,maxDuration:Z.duration,name:Z.name,color:Z.color,icon:Z.icon})};return Pt.useEffect(()=>{z(r)},[r,e]),j.jsx("div",{ref:d,id:"game-canvas-container",className:"relative w-full h-full cursor-crosshair overflow-hidden select-none"})};const D2=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),N2=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,i,s)=>s?s.toUpperCase():i.toLowerCase()),R_=r=>{const e=N2(r);return e.charAt(0).toUpperCase()+e.slice(1)},hx=(...r)=>r.filter((e,i,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===i).join(" ").trim(),U2=r=>{for(const e in r)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};var L2={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const O2=Pt.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:i=2,absoluteStrokeWidth:s,className:l="",children:c,iconNode:f,...p},m)=>Pt.createElement("svg",{ref:m,...L2,width:e,height:e,stroke:r,strokeWidth:s?Number(i)*24/Number(e):i,className:hx("lucide",l),...!c&&!U2(p)&&{"aria-hidden":"true"},...p},[...f.map(([d,v])=>Pt.createElement(d,v)),...Array.isArray(c)?c:[c]]));const gn=(r,e)=>{const i=Pt.forwardRef(({className:s,...l},c)=>Pt.createElement(O2,{ref:c,iconNode:e,className:hx(`lucide-${D2(R_(r))}`,`lucide-${r}`,s),...l}));return i.displayName=R_(r),i};const P2=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],I2=gn("arrow-right",P2);const z2=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],dx=gn("award",z2);const B2=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],F2=gn("circle-question-mark",B2);const G2=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],px=gn("clock",G2);const H2=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"22",x2:"18",y1:"12",y2:"12",key:"l9bcsi"}],["line",{x1:"6",x2:"2",y1:"12",y2:"12",key:"13hhkx"}],["line",{x1:"12",x2:"12",y1:"6",y2:"2",key:"10w3f3"}],["line",{x1:"12",x2:"12",y1:"22",y2:"18",key:"15g9kq"}]],mx=gn("crosshair",H2);const V2=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],gx=gn("disc",V2);const k2=[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",key:"1slcih"}]],vx=gn("flame",k2);const X2=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]],W2=gn("heart",X2);const q2=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],Ap=gn("house",q2);const Y2=[["path",{d:"M10 8h.01",key:"1r9ogq"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M14 8h.01",key:"1primd"}],["path",{d:"M16 12h.01",key:"1l6xoz"}],["path",{d:"M18 8h.01",key:"emo2bl"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M7 16h10",key:"wp8him"}],["path",{d:"M8 12h.01",key:"czm47f"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}]],Z2=gn("keyboard",Y2);const j2=[["path",{d:"m12 15 4 4",key:"lnac28"}],["path",{d:"M2.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.029-6.029a1 1 0 1 1 3 3l-6.029 6.029a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.365-6.367A1 1 0 0 0 8.716 4.282z",key:"nlhkjb"}],["path",{d:"m5 8 4 4",key:"j6kj7e"}]],_x=gn("magnet",j2);const K2=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],xx=gn("maximize-2",K2);const Q2=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]],J2=gn("pause",Q2);const $2=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],wp=gn("play",$2);const e3=[["path",{d:"M16.247 7.761a6 6 0 0 1 0 8.478",key:"1fwjs5"}],["path",{d:"M19.075 4.933a10 10 0 0 1 0 14.134",key:"ehdyv1"}],["path",{d:"M4.925 19.067a10 10 0 0 1 0-14.134",key:"1q22gi"}],["path",{d:"M7.753 16.239a6 6 0 0 1 0-8.478",key:"r2q7qm"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],yx=gn("radio",e3);const t3=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],Rp=gn("rotate-ccw",t3);const n3=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],Mx=gn("shield",n3);const i3=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],rl=gn("sparkles",i3);const a3=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]],Sx=gn("volume-2",a3);const s3=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]],bx=gn("volume-x",s3);const r3=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],o3=gn("x",r3);const l3=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],xu=gn("zap",l3),c3={multiball:j.jsx(xu,{className:"w-4 h-4"}),fireball:j.jsx(vx,{className:"w-4 h-4 text-orange-400"}),lasers:j.jsx(mx,{className:"w-4 h-4 text-emerald-400"}),wide_paddle:j.jsx(xx,{className:"w-4 h-4 text-yellow-400"}),magnet:j.jsx(_x,{className:"w-4 h-4 text-purple-400"}),shield:j.jsx(Mx,{className:"w-4 h-4 text-cyan-400"}),slow_motion:j.jsx(px,{className:"w-4 h-4 text-blue-400"}),titan_ball:j.jsx(gx,{className:"w-4 h-4 text-pink-400"}),super_laser:j.jsx(yx,{className:"w-4 h-4 text-yellow-300 animate-pulse"})},u3=({stats:r,activePowerUps:e,cameraMode:i,onCameraChange:s,isPaused:l,onTogglePause:c,isMuted:f,onToggleMute:p,stageName:m,totalBlocks:d,remainingBlocks:v})=>{const _=d>0?Math.min(100,Math.round((d-v)/d*100)):0;return j.jsxs("div",{id:"game-hud-overlay",className:"absolute inset-0 pointer-events-none flex flex-col justify-between p-4 md:p-6 select-none font-mono",children:[j.jsxs("div",{className:"flex items-start justify-between gap-4 w-full",children:[j.jsxs("div",{className:"flex flex-col gap-1 pointer-events-auto",children:[j.jsxs("div",{className:"flex items-center gap-2",children:[j.jsx("span",{className:"text-xs tracking-widest text-cyan-400/80 uppercase font-bold",children:"SCORE"}),j.jsx("span",{className:"text-2xl md:text-3xl font-black tracking-wider text-white drop-shadow-[0_0_12px_rgba(0,240,255,0.8)]",children:r.score.toLocaleString()})]}),j.jsxs("div",{className:"flex items-center gap-2 text-xs text-slate-400",children:[j.jsx("span",{children:"HIGH:"}),j.jsx("span",{className:"text-amber-400 font-bold tracking-wider",children:r.highScore.toLocaleString()})]})]}),j.jsx("div",{className:"flex flex-col items-center pointer-events-auto",children:j.jsxs("div",{className:"bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 rounded-xl px-4 py-1.5 shadow-[0_0_15px_rgba(0,240,255,0.15)] flex flex-col items-center",children:[j.jsx("span",{className:"text-xs md:text-sm font-black tracking-widest text-cyan-300 uppercase",children:m}),j.jsxs("div",{className:"flex items-center gap-2 w-32 md:w-44 mt-1",children:[j.jsx("div",{className:"w-full bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-700",children:j.jsx("div",{className:"h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300",style:{width:`${_}%`}})}),j.jsxs("span",{className:"text-[10px] text-slate-300 font-bold",children:[_,"%"]})]})]})}),j.jsxs("div",{className:"flex items-center gap-3 pointer-events-auto",children:[j.jsx("div",{className:"flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md border border-red-500/30 rounded-xl px-3 py-2 shadow-[0_0_10px_rgba(255,0,80,0.2)]",children:Array.from({length:r.maxLives}).map((g,b)=>j.jsx(W2,{className:`w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ${b<r.lives?"text-red-500 fill-red-500 filter drop-shadow-[0_0_6px_rgba(255,0,80,0.8)] scale-100":"text-slate-700 fill-slate-800 scale-90 opacity-40"}`},b))}),j.jsx("button",{id:"btn-hud-mute",onClick:p,className:"p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-all shadow-lg hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] cursor-pointer",title:f?"Unmute":"Mute",children:f?j.jsx(bx,{className:"w-4 h-4 text-red-400"}):j.jsx(Sx,{className:"w-4 h-4 text-cyan-400"})}),j.jsx("button",{id:"btn-hud-pause",onClick:c,className:"p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-all shadow-lg hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] cursor-pointer",title:l?"Resume":"Pause",children:l?j.jsx(wp,{className:"w-4 h-4 text-emerald-400"}):j.jsx(J2,{className:"w-4 h-4"})})]})]}),j.jsxs("div",{className:"flex flex-col items-center justify-center my-auto pointer-events-none",children:[r.ballsLaunched===0&&j.jsx("div",{className:"animate-pulse bg-cyan-950/80 border border-cyan-400/80 px-4 py-2 rounded-2xl backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.4)] text-center mb-4",children:j.jsx("span",{className:"text-xs md:text-sm font-bold text-cyan-300 tracking-wider",children:"[SPACE] または 画面タップ / クリック でボール発射！"})}),r.combo>1&&j.jsxs("div",{className:"animate-bounce flex flex-col items-center",children:[j.jsxs("div",{className:"text-3xl md:text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(255,200,0,0.9)]",children:[r.combo," COMBO!"]}),j.jsxs("span",{className:"text-xs md:text-sm text-yellow-300 font-bold tracking-widest uppercase mt-0.5",children:["+",Math.round((Math.min(1+r.combo*.2,5)-1)*100),"% SCORE BONUS"]})]}),r.isFever&&j.jsxs("div",{className:"animate-pulse flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-pink-500/30 to-purple-500/20 border border-amber-400/80 px-6 py-2 rounded-2xl backdrop-blur-lg shadow-[0_0_30px_rgba(255,200,0,0.6)] mt-2",children:[j.jsx(rl,{className:"w-5 h-5 text-yellow-300 animate-spin"}),j.jsxs("span",{className:"text-base md:text-xl font-black text-amber-300 tracking-widest",children:["FEVER OVERDRIVE (",Math.ceil(r.feverTimeLeft),"s)"]}),j.jsx(rl,{className:"w-5 h-5 text-yellow-300 animate-spin"})]})]}),j.jsxs("div",{className:"flex flex-col md:flex-row items-end md:items-center justify-between gap-4 w-full",children:[j.jsxs("div",{className:"flex flex-col gap-1 w-full max-w-xs pointer-events-auto bg-slate-900/80 backdrop-blur-md border border-slate-700/80 p-2.5 rounded-xl shadow-lg",children:[j.jsxs("div",{className:"flex justify-between items-center text-xs",children:[j.jsxs("span",{className:"flex items-center gap-1 text-amber-400 font-bold tracking-wider",children:[j.jsx(rl,{className:"w-3.5 h-3.5 text-amber-300"}),"FEVER GAUGE"]}),j.jsx("span",{className:"text-slate-300 font-bold",children:r.isFever?"MAX ACTIVE":`${Math.round(r.feverGauge)}%`})]}),j.jsx("div",{className:"w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700",children:j.jsx("div",{className:`h-full transition-all duration-200 ${r.isFever?"bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 animate-pulse":"bg-gradient-to-r from-amber-500 to-yellow-400"}`,style:{width:`${r.isFever?100:r.feverGauge}%`}})})]}),j.jsx("div",{className:"flex items-center gap-2 flex-wrap justify-center pointer-events-auto",children:e.map(g=>j.jsxs("div",{className:"flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700 px-3 py-1.5 rounded-xl shadow-lg text-xs",style:{borderColor:`${g.color}80`},children:[c3[g.type]||j.jsx(xu,{className:"w-4 h-4"}),j.jsx("span",{className:"text-white font-medium",children:g.name}),j.jsxs("span",{className:"text-xs font-bold text-cyan-400 ml-1",children:[Math.ceil(g.duration),"s"]})]},g.type))}),j.jsx("div",{className:"flex items-center gap-1 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 p-1 rounded-xl pointer-events-auto shadow-lg",children:["action","paddle","top","iso"].map(g=>{const b={action:"ACTION",paddle:"PADDLE",top:"TOP 2D",iso:"ISOMETRIC"},T=i===g;return j.jsx("button",{id:`btn-cam-${g}`,onClick:()=>s(g),className:`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${T?"bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,240,255,0.6)]":"text-slate-400 hover:text-white hover:bg-slate-800"}`,children:b[g]},g)})})]})]})},f3=({onStartGame:r,highScore:e,onOpenGuide:i})=>j.jsx("div",{id:"start-screen-overlay",className:"absolute inset-0 z-30 flex items-center justify-center bg-slate-950/80 backdrop-blur-xl p-4 font-mono text-white select-none overflow-y-auto",children:j.jsxs("div",{className:"max-w-xl w-full flex flex-col items-center text-center p-6 md:p-8 bg-slate-900/90 border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.2)]",children:[j.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-xs font-bold tracking-widest uppercase mb-4",children:[j.jsx(xu,{className:"w-3.5 h-3.5 text-cyan-400 animate-pulse"}),"Next-Gen 3D Physics & Neon FX"]}),j.jsx("h1",{className:"text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-300 drop-shadow-[0_0_25px_rgba(0,240,255,0.8)]",children:"CYBER BREAK 3D"}),j.jsx("p",{className:"text-sm md:text-base text-slate-300 mt-2 max-w-md font-sans",children:"超ド派手な物理破片エフェクト・爆発連鎖・レーザー兵装を搭載した爽快3Dブロック崩し"}),j.jsxs("div",{className:"flex items-center gap-2 bg-slate-800/80 border border-amber-500/30 px-4 py-2 rounded-xl mt-4 mb-6 shadow-inner",children:[j.jsx(dx,{className:"w-4 h-4 text-amber-400"}),j.jsx("span",{className:"text-xs text-slate-400 uppercase",children:"HIGH SCORE:"}),j.jsx("span",{className:"text-lg font-black text-amber-300 tracking-wider",children:e.toLocaleString()})]}),j.jsxs("div",{className:"w-full mb-6 text-left",children:[j.jsx("span",{className:"text-xs text-cyan-400 font-bold tracking-widest uppercase mb-2 block",children:"SELECT STAGE / ステージ選択"}),j.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2.5",children:Ia.map(s=>j.jsxs("button",{id:`btn-select-stage-${s.id}`,onClick:()=>r(s.id),className:"flex flex-col p-3 rounded-xl bg-slate-800/60 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-400 text-left transition-all hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] cursor-pointer group",children:[j.jsxs("div",{className:"flex items-center justify-between w-full",children:[j.jsxs("span",{className:"text-xs font-black text-cyan-300 group-hover:text-cyan-200",children:["STAGE ",s.id]}),j.jsxs("span",{className:"text-[10px] text-slate-400",children:[s.blocks.length," BLOCKS"]})]}),j.jsx("span",{className:"text-sm font-bold text-white mt-0.5 truncate",children:s.name.split(": ")[1]||s.name}),j.jsx("span",{className:"text-[11px] text-slate-400 truncate mt-0.5 font-sans",children:s.subtitle})]},s.id))})]}),j.jsxs("div",{className:"flex flex-col sm:flex-row items-center gap-3 w-full",children:[j.jsxs("button",{id:"btn-start-game",onClick:()=>r(1),className:"flex-1 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-base tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.6)] hover:shadow-[0_0_30px_rgba(0,240,255,0.9)] transition-all transform hover:-translate-y-0.5 cursor-pointer",children:[j.jsx(wp,{className:"w-5 h-5 fill-slate-950"}),"GAME START (STAGE 1)"]}),j.jsxs("button",{id:"btn-open-guide",onClick:i,className:"py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-slate-400 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer",children:[j.jsx(F2,{className:"w-4 h-4 text-cyan-400"}),"遊び方"]})]}),j.jsxs("div",{className:"mt-5 text-[11px] text-slate-400 flex items-center justify-center gap-4 flex-wrap",children:[j.jsx("span",{children:"🎮 マウス/タッチ移動でパドル操作"}),j.jsx("span",{children:"⚡ スペース / クリックで発射 & レーザー"}),j.jsx("span",{children:"⏱ Shiftでスローモーション"})]})]})}),h3=({stats:r,onRestart:e,onReturnToTitle:i})=>{const s=r.score>=r.highScore&&r.score>0;return j.jsx("div",{id:"game-over-modal",className:"absolute inset-0 z-40 flex items-center justify-center bg-slate-950/85 backdrop-blur-xl p-4 font-mono text-white select-none animate-fade-in",children:j.jsxs("div",{className:"max-w-md w-full flex flex-col items-center text-center p-6 md:p-8 bg-slate-900/95 border border-red-500/50 rounded-2xl shadow-[0_0_50px_rgba(255,0,80,0.3)]",children:[j.jsx("h2",{className:"text-3xl md:text-4xl font-black text-red-500 tracking-wider drop-shadow-[0_0_15px_rgba(255,0,80,0.8)]",children:"GAME OVER"}),j.jsx("p",{className:"text-xs text-slate-400 mt-1 uppercase tracking-widest",children:"シールド消滅・全ボール喪失"}),s&&j.jsxs("div",{className:"flex items-center gap-1.5 px-4 py-1.5 bg-amber-500/20 border border-amber-400 rounded-full text-amber-300 text-xs font-bold my-4 animate-bounce",children:[j.jsx(dx,{className:"w-4 h-4 text-amber-400"}),"NEW HIGH SCORE!"]}),j.jsxs("div",{className:"w-full bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 my-5 space-y-2.5 text-left text-sm",children:[j.jsxs("div",{className:"flex justify-between items-center pb-2 border-b border-slate-700",children:[j.jsx("span",{className:"text-slate-400",children:"FINAL SCORE:"}),j.jsx("span",{className:"text-xl font-black text-cyan-400",children:r.score.toLocaleString()})]}),j.jsxs("div",{className:"flex justify-between items-center text-xs",children:[j.jsx("span",{className:"text-slate-400",children:"MAX COMBO:"}),j.jsxs("span",{className:"text-yellow-400 font-bold",children:[r.maxCombo," HITS"]})]}),j.jsxs("div",{className:"flex justify-between items-center text-xs",children:[j.jsx("span",{className:"text-slate-400",children:"BLOCKS DESTROYED:"}),j.jsx("span",{className:"text-emerald-400 font-bold",children:r.blocksDestroyed})]}),j.jsxs("div",{className:"flex justify-between items-center text-xs",children:[j.jsx("span",{className:"text-slate-400",children:"POWER-UPS COLLECTED:"}),j.jsx("span",{className:"text-purple-400 font-bold",children:r.powerUpsCollected})]})]}),j.jsxs("div",{className:"flex items-center gap-3 w-full",children:[j.jsxs("button",{id:"btn-gameover-restart",onClick:e,className:"flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,0,80,0.5)] transition-all cursor-pointer",children:[j.jsx(Rp,{className:"w-4 h-4"}),"RETRY"]}),j.jsxs("button",{id:"btn-gameover-title",onClick:i,className:"py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer",children:[j.jsx(Ap,{className:"w-4 h-4"}),"TITLE"]})]})]})})},d3=({stageNumber:r,stats:e,onNextStage:i,onRestartStage:s,onReturnToTitle:l,isLastStage:c})=>{const p=e.maxCombo>=15||e.score>2e4?{rank:"S",color:"text-amber-300 drop-shadow-[0_0_15px_rgba(255,215,0,0.9)]"}:e.maxCombo>=8||e.score>1e4?{rank:"A",color:"text-cyan-300 drop-shadow-[0_0_15px_rgba(0,240,255,0.9)]"}:{rank:"B",color:"text-emerald-300"};return j.jsx("div",{id:"stage-clear-modal",className:"absolute inset-0 z-40 flex items-center justify-center bg-slate-950/85 backdrop-blur-xl p-4 font-mono text-white select-none animate-fade-in",children:j.jsxs("div",{className:"max-w-md w-full flex flex-col items-center text-center p-6 md:p-8 bg-slate-900/95 border border-emerald-500/50 rounded-2xl shadow-[0_0_60px_rgba(0,255,100,0.3)]",children:[j.jsxs("div",{className:"flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-400 rounded-full text-emerald-300 text-xs font-bold mb-3",children:[j.jsx(rl,{className:"w-3.5 h-3.5"}),"STAGE ",r," COMPLETE"]}),j.jsx("h2",{className:"text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-yellow-300 drop-shadow-[0_0_20px_rgba(0,255,150,0.8)]",children:c?"ALL STAGES CLEARED!":"VICTORY!"}),j.jsx("p",{className:"text-xs text-slate-300 mt-1 uppercase tracking-widest",children:"ミッション達成・全ターゲット殲滅"}),j.jsxs("div",{className:"my-4 flex flex-col items-center",children:[j.jsx("span",{className:"text-[10px] text-slate-400 uppercase tracking-widest",children:"CLEAR RANK"}),j.jsx("div",{className:`text-6xl font-black ${p.color}`,children:p.rank})]}),j.jsxs("div",{className:"w-full bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 mb-6 space-y-2 text-left text-xs",children:[j.jsxs("div",{className:"flex justify-between items-center text-sm pb-1.5 border-b border-slate-700",children:[j.jsx("span",{className:"text-slate-400",children:"TOTAL SCORE:"}),j.jsx("span",{className:"text-lg font-black text-cyan-400",children:e.score.toLocaleString()})]}),j.jsxs("div",{className:"flex justify-between items-center",children:[j.jsx("span",{className:"text-slate-400",children:"STAGE MAX COMBO:"}),j.jsxs("span",{className:"text-yellow-400 font-bold",children:[e.maxCombo," HITS"]})]}),j.jsxs("div",{className:"flex justify-between items-center",children:[j.jsx("span",{className:"text-slate-400",children:"REMAINING LIVES:"}),j.jsxs("span",{className:"text-red-400 font-bold",children:[e.lives," / ",e.maxLives]})]})]}),j.jsxs("div",{className:"flex flex-col gap-2.5 w-full",children:[j.jsxs("button",{id:"btn-stageclear-next",onClick:i,className:"w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,100,0.6)] transition-all cursor-pointer",children:[c?"ENDLESS HYPER MODE":"NEXT STAGE",j.jsx(I2,{className:"w-4 h-4"})]}),j.jsxs("div",{className:"flex items-center gap-2 w-full",children:[j.jsxs("button",{id:"btn-stageclear-replay",onClick:s,className:"flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer",children:[j.jsx(Rp,{className:"w-3.5 h-3.5"}),"REPLAY"]}),j.jsxs("button",{id:"btn-stageclear-title",onClick:l,className:"flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer",children:[j.jsx(Ap,{className:"w-3.5 h-3.5"}),"TITLE"]})]})]})]})})},p3=({onResume:r,onRestart:e,onReturnToTitle:i,isMuted:s,onToggleMute:l})=>j.jsx("div",{id:"pause-modal",className:"absolute inset-0 z-40 flex items-center justify-center bg-slate-950/80 backdrop-blur-xl p-4 font-mono text-white select-none animate-fade-in",children:j.jsxs("div",{className:"max-w-sm w-full flex flex-col items-center text-center p-6 md:p-8 bg-slate-900/95 border border-cyan-500/40 rounded-2xl shadow-[0_0_40px_rgba(0,240,255,0.2)]",children:[j.jsx("h2",{className:"text-2xl font-black text-cyan-400 tracking-widest uppercase mb-1",children:"PAUSED"}),j.jsx("p",{className:"text-xs text-slate-400 mb-6",children:"一時停止中"}),j.jsxs("div",{className:"flex flex-col gap-3 w-full",children:[j.jsxs("button",{id:"btn-pause-resume",onClick:r,className:"w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all cursor-pointer",children:[j.jsx(wp,{className:"w-4 h-4 fill-slate-950"}),"RESUME (再開)"]}),j.jsxs("button",{id:"btn-pause-restart",onClick:e,className:"w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer",children:[j.jsx(Rp,{className:"w-4 h-4 text-cyan-400"}),"RESTART STAGE (リスタート)"]}),j.jsx("button",{id:"btn-pause-mute",onClick:l,className:"w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer",children:s?j.jsxs(j.Fragment,{children:[j.jsx(bx,{className:"w-4 h-4 text-red-400"}),"UNMUTE SOUND (消音解除)"]}):j.jsxs(j.Fragment,{children:[j.jsx(Sx,{className:"w-4 h-4 text-cyan-400"}),"MUTE SOUND (ミュート)"]})}),j.jsxs("button",{id:"btn-pause-title",onClick:i,className:"w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer",children:[j.jsx(Ap,{className:"w-4 h-4"}),"TITLE MENU (タイトルへ戻る)"]})]})]})}),m3=({onClose:r})=>{const e=[{icon:j.jsx(xu,{className:"w-5 h-5 text-cyan-400"}),name:"マルチボール (Multi-Ball)",desc:"ボールが瞬時に3個に分裂。乱れ飛ぶボールで一網打尽！",color:"border-cyan-500/30 bg-cyan-950/20"},{icon:j.jsx(vx,{className:"w-5 h-5 text-orange-400"}),name:"メガ・ファイアボール (Fireball)",desc:"ブロックを反射せずに突き破り炎上粉砕する貫通メガ弾！",color:"border-orange-500/30 bg-orange-950/20"},{icon:j.jsx(mx,{className:"w-5 h-5 text-emerald-400"}),name:"レーザーキャノン (Laser Turrets)",desc:"パドルに2門の光子レーザーを装備。スペースキー/タップで連射！",color:"border-emerald-500/30 bg-emerald-950/20"},{icon:j.jsx(yx,{className:"w-5 h-5 text-yellow-300 animate-pulse"}),name:"ハイパーバスター砲 (Hyper Buster)",desc:"広域殲滅トリプルレーザーを発射してブロックを一掃！",color:"border-yellow-500/30 bg-yellow-950/20"},{icon:j.jsx(gx,{className:"w-5 h-5 text-pink-400"}),name:"タイタン重力弾 (Titan Ball)",desc:"巨大化した超質量ボールが周囲に衝撃波を放ちブロックを粉砕！",color:"border-pink-500/30 bg-pink-950/20"},{icon:j.jsx(xx,{className:"w-5 h-5 text-yellow-400"}),name:"ワイドパドル (Wide Paddle)",desc:"パドルの横幅が大幅拡大し、ボールの取りこぼしを完全防止！",color:"border-yellow-500/30 bg-yellow-950/20"},{icon:j.jsx(Mx,{className:"w-5 h-5 text-cyan-400"}),name:"セーフティシールド (Laser Net)",desc:"画面最下部にセーフティバリアを展開し、落下ボールを自動跳ね返し！",color:"border-cyan-500/30 bg-cyan-950/20"},{icon:j.jsx(_x,{className:"w-5 h-5 text-purple-400"}),name:"マグネットキャッチ (Magnetic Paddle)",desc:"パドルでボールをキャッチして好きな角度へ狙い撃ち！",color:"border-purple-500/30 bg-purple-950/20"},{icon:j.jsx(px,{className:"w-5 h-5 text-blue-400"}),name:"タイムワープ (Slow Motion)",desc:"ゲームスピードが減速し、精密なコントロールが可能に！",color:"border-blue-500/30 bg-blue-950/20"}],i=[{name:"TNT爆弾ブロック (赤)",desc:"爆発半径内の周辺ブロックを物理衝撃波で巻き込んで一斉破壊！"},{name:"ライトニング電撃ブロック (黄)",desc:"放電アークが近くの複数のブロックに連鎖して一撃破壊！"},{name:"プリズム分裂ブロック (水色)",desc:"通過したボールがその場で倍に増殖！"},{name:"重力渦ブロック (紫)",desc:"強力なブラックホール引力でボールと破片を引き寄せる！"}];return j.jsx("div",{id:"controls-guide-modal",className:"absolute inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4 font-mono text-white select-none overflow-y-auto",children:j.jsxs("div",{className:"max-w-2xl w-full flex flex-col p-6 md:p-8 bg-slate-900/95 border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.2)] max-h-[90vh] overflow-y-auto",children:[j.jsxs("div",{className:"flex items-center justify-between pb-4 border-b border-slate-700/80",children:[j.jsxs("div",{className:"flex items-center gap-2",children:[j.jsx(rl,{className:"w-5 h-5 text-cyan-400"}),j.jsx("h2",{className:"text-xl md:text-2xl font-black text-cyan-300 tracking-wider",children:"遊び方 & パワーアップ図鑑"})]}),j.jsx("button",{id:"btn-close-guide",onClick:r,className:"p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 hover:text-white cursor-pointer",children:j.jsx(o3,{className:"w-5 h-5"})})]}),j.jsxs("div",{className:"my-5",children:[j.jsxs("h3",{className:"text-sm font-black text-yellow-400 uppercase tracking-widest mb-3 flex items-center gap-2",children:[j.jsx(Z2,{className:"w-4 h-4"})," 操作方法"]}),j.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs",children:[j.jsxs("div",{className:"p-3 rounded-xl bg-slate-800/80 border border-slate-700",children:[j.jsx("span",{className:"text-cyan-300 font-bold block mb-1",children:"パドル移動"}),j.jsx("span",{className:"text-slate-300",children:"マウス移動 / スマホ画面ドラッグ / [A/D]キー または [←/→]キー"})]}),j.jsxs("div",{className:"p-3 rounded-xl bg-slate-800/80 border border-slate-700",children:[j.jsx("span",{className:"text-cyan-300 font-bold block mb-1",children:"ボール発射 / レーザー連射"}),j.jsx("span",{className:"text-slate-300",children:"[Space]キー / 画面クリック / 画面タップ"})]}),j.jsxs("div",{className:"p-3 rounded-xl bg-slate-800/80 border border-slate-700",children:[j.jsx("span",{className:"text-cyan-300 font-bold block mb-1",children:"スローモーション (Bullet Time)"}),j.jsx("span",{className:"text-slate-300",children:"[Shift]キー押し続けで一時減速"})]}),j.jsxs("div",{className:"p-3 rounded-xl bg-slate-800/80 border border-slate-700",children:[j.jsx("span",{className:"text-cyan-300 font-bold block mb-1",children:"視点カメラ切り替え"}),j.jsx("span",{className:"text-slate-300",children:"画面右下のボタンで [Action / Paddle / 2D Top / Iso] を即座に変更"})]})]})]}),j.jsxs("div",{className:"mb-5",children:[j.jsx("h3",{className:"text-sm font-black text-pink-400 uppercase tracking-widest mb-3",children:"特殊ギミックブロック"}),j.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs",children:i.map((s,l)=>j.jsxs("div",{className:"p-3 rounded-xl bg-slate-800/60 border border-slate-700/80",children:[j.jsx("div",{className:"font-bold text-slate-100 mb-1",children:s.name}),j.jsx("div",{className:"text-slate-400 font-sans",children:s.desc})]},l))})]}),j.jsxs("div",{className:"mb-4",children:[j.jsx("h3",{className:"text-sm font-black text-cyan-400 uppercase tracking-widest mb-3",children:"ドロップカプセル & パワーアップ"}),j.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs",children:e.map((s,l)=>j.jsxs("div",{className:`p-3 rounded-xl border flex items-start gap-3 ${s.color}`,children:[j.jsx("div",{className:"mt-0.5",children:s.icon}),j.jsxs("div",{children:[j.jsx("div",{className:"font-bold text-white mb-0.5",children:s.name}),j.jsx("div",{className:"text-slate-300 font-sans text-[11px] leading-relaxed",children:s.desc})]})]},l))})]}),j.jsx("button",{onClick:r,className:"w-full mt-3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold text-sm cursor-pointer",children:"閉じる (CLOSE)"})]})})};function g3(){const[r,e]=Pt.useState(1),[i,s]=Pt.useState(0),[l,c]=Pt.useState("action"),[f,p]=Pt.useState("start"),[m,d]=Pt.useState(!1),[v,_]=Pt.useState(!1),[g,b]=Pt.useState(!1),[T,C]=Pt.useState([]),[M,x]=Pt.useState({score:0,highScore:parseInt(localStorage.getItem("cyberbreak_high_score")||"0",10),combo:0,maxCombo:0,feverGauge:0,isFever:!1,feverTimeLeft:0,blocksDestroyed:0,ballsLaunched:0,powerUpsCollected:0,stage:1,lives:3,maxLives:3}),N=DM.useMemo(()=>r<=Ia.length?Ia[r-1]:fx(r-Ia.length),[r]),z=N.name;Pt.useEffect(()=>{const k=()=>{xn.init()};return window.addEventListener("pointerdown",k,{once:!0}),window.addEventListener("keydown",k,{once:!0}),()=>{window.removeEventListener("pointerdown",k),window.removeEventListener("keydown",k)}},[]);const w=()=>{const k=!v;_(k),xn.setMuted(k)},G=k=>{e(k),s(X=>X+1),p("playing"),d(!1),xn.init(),x(X=>({...X,score:0,combo:0,maxCombo:0,feverGauge:0,isFever:!1,blocksDestroyed:0,lives:3,stage:k}))},L=()=>{p("playing"),d(!1),s(k=>k+1),x(k=>({...k,lives:3,combo:0,feverGauge:0,isFever:!1,blocksDestroyed:0}))},I=()=>{const k=r+1;e(k),s(X=>X+1),p("playing"),d(!1)},A=()=>{p("start"),d(!1)},O=()=>{f==="playing"&&d(k=>!k)};return Pt.useEffect(()=>{const k=X=>{if((X.code==="KeyP"||X.code==="Escape")&&f==="playing"&&d(K=>!K),X.code==="KeyC"){const K=["action","paddle","top","iso"];c(V=>{const re=(K.indexOf(V)+1)%K.length;return K[re]})}};return window.addEventListener("keydown",k),()=>window.removeEventListener("keydown",k)},[f]),j.jsxs("div",{className:"relative w-screen h-screen overflow-hidden bg-slate-950 text-white select-none",children:[j.jsx(C2,{stageNumber:r,stageKey:`${r}_${i}`,cameraMode:l,onStatsUpdate:x,onStatusChange:p,gameStatus:f,isPaused:m||f!=="playing",onActivePowerUpsChange:C,setStageNumber:e}),f==="playing"&&j.jsx(u3,{stats:M,activePowerUps:T,cameraMode:l,onCameraChange:c,isPaused:m,onTogglePause:O,isMuted:v,onToggleMute:w,stageName:z,totalBlocks:N.blocks.length,remainingBlocks:Math.max(0,N.blocks.length-M.blocksDestroyed)}),f==="start"&&j.jsx(f3,{onStartGame:G,highScore:M.highScore,onOpenGuide:()=>b(!0)}),f==="game_over"&&j.jsx(h3,{stats:M,onRestart:L,onReturnToTitle:A}),f==="stage_clear"&&j.jsx(d3,{stageNumber:r,stats:M,onNextStage:I,onRestartStage:L,onReturnToTitle:A,isLastStage:r>=Ia.length}),m&&f==="playing"&&j.jsx(p3,{onResume:()=>d(!1),onRestart:L,onReturnToTitle:A,isMuted:v,onToggleMute:w}),g&&j.jsx(m3,{onClose:()=>b(!1)})]})}zM.createRoot(document.getElementById("root")).render(j.jsx(Pt.StrictMode,{children:j.jsx(g3,{})}));
