webpackJsonp([20,16],{74:function(a,e,t){"use strict";function n(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(e,"__esModule",{value:!0});var r=t(11),o=n(r),i=t(119),l=n(i),f=t(12),d=n(f),s=t(4),g=n(s),c=[],u=function(a,e){var t,n={dynamicNavbar:!0,domCache:!0,linksView:void 0,reloadPages:!1,uniqueHistory:o["default"].uniqueHistory,uniqueHistoryIgnoreGetParameters:o["default"].uniqueHistoryIgnoreGetParameters,allowDuplicateUrls:o["default"].allowDuplicateUrls,swipeBackPage:o["default"].swipeBackPage,swipeBackPageAnimateShadow:o["default"].swipeBackPageAnimateShadow,swipeBackPageAnimateOpacity:o["default"].swipeBackPageAnimateOpacity,swipeBackPageActiveArea:o["default"].swipeBackPageActiveArea,swipeBackPageThreshold:o["default"].swipeBackPageThreshold,animatePages:o["default"].animatePages,preloadPreviousPage:o["default"].preloadPreviousPage};e=e||{},e.dynamicNavbar&&o["default"].material&&(e.dynamicNavbar=!1);for(var r in n)"undefined"==typeof e[r]&&(e[r]=n[r]);var i=this;i.params=e,i.selector=a;var f=(0,g["default"])(a);i.container=f[0],"string"!=typeof a&&(a=(f.attr("id")?"#"+f.attr("id"):"")+(f.attr("class")?"."+f.attr("class").replace(/ /g,".").replace(".active",""):""),i.selector=a),i.main=f.hasClass(o["default"].viewMainClass),i.contentCache={},i.pagesCache={},f[0].f7View=i,i.pagesContainer=f.find(".pages")[0],i.initialPages=[],i.initialPagesUrl=[],i.initialNavbars=[];var s=f.find(".page");for(t=0;t<s.length;t++)i.initialPages.push(s[t]),i.initialPagesUrl.push("#"+s.eq(t).attr("data-page"));if(i.params.dynamicNavbar){var u=f.find(".navbar-inner");for(t=0;t<u.length;t++)i.initialNavbars.push(u[t])}i.allowPageChange=!0;var p=document.location.href;i.history=[];var v,h,m=p;return i.activePage||(v=(0,g["default"])(i.pagesContainer).find(".page-on-center"),0===v.length&&(v=(0,g["default"])(i.pagesContainer).find(".page:not(.cached)"),v=v.eq(v.length-1)),v.length>0&&(h=v[0].f7PageData)),v?(i.url=f.attr("data-url")||i.params.url||"#"+v.attr("data-page"),i.pagesCache[i.url]=v.attr("data-page")):i.url=f.attr("data-url")||i.params.url||m,h&&(h.view=i,h.url=i.url,i.params.dynamicNavbar&&!h.navbarInnerContainer&&(h.navbarInnerContainer=i.initialNavbars[i.initialPages.indexOf(h.container)]),i.activePage=h,v[0].f7PageData=h),i.url&&i.history.push(i.url),c.push(i),i.router={load:function(a){return l["default"].load(i,a)},back:function(a){return l["default"].back(i,a)},loadPage:function(a){if(a=a||{},"string"==typeof a){var e=a;a={},e&&0===e.indexOf("#")&&i.params.domCache?a.pageName=e.split("#")[1]:a.url=e}return l["default"].load(i,a)},loadContent:function(a){return l["default"].load(i,{content:a})},reloadPage:function(a){return l["default"].load(i,{url:a,reload:!0})},reloadContent:function(a){return l["default"].load(i,{content:a,reload:!0})},reloadPreviousPage:function(a){return l["default"].load(i,{url:a,reloadPrevious:!0,reload:!0})},reloadPreviousContent:function(a){return l["default"].load(i,{content:a,reloadPrevious:!0,reload:!0})},refreshPage:function(){var a={url:i.url,reload:!0,ignoreCache:!0};return a.url&&0===a.url.indexOf("#")&&(i.params.domCache&&i.pagesCache[a.url]?(a.pageName=i.pagesCache[a.url],a.url=void 0,delete a.url):i.contentCache[a.url]&&(a.content=i.contentCache[a.url],a.url=void 0,delete a.url)),l["default"].load(i,a)},refreshPreviousPage:function(){var a={url:i.history[i.history.length-2],reload:!0,reloadPrevious:!0,ignoreCache:!0};return a.url&&0===a.url.indexOf("#")&&i.params.domCache&&i.pagesCache[a.url]&&(a.pageName=i.pagesCache[a.url],a.url=void 0,delete a.url),l["default"].load(i,a)}},i.loadPage=i.router.loadPage,i.loadContent=i.router.loadContent,i.reloadPage=i.router.reloadPage,i.reloadContent=i.router.reloadContent,i.reloadPreviousPage=i.router.reloadPreviousPage,i.reloadPreviousContent=i.router.reloadPreviousContent,i.refreshPage=i.router.refreshPage,i.refreshPreviousPage=i.router.refreshPreviousPage,i.back=i.router.back,i.hideNavbar=function(){return d["default"].hideNavbar(f.find(".navbar"))},i.showNavbar=function(){return d["default"].showNavbar(f.find(".navbar"))},i.hideToolbar=function(){return d["default"].hideToolbar(f.find(".toolbar"))},i.showToolbar=function(){return d["default"].showToolbar(f.find(".toolbar"))},i.destroy=function(){i=void 0},i};u.views=c,u.addView=function(a,e){return new u(a,e)},u.getCurrentView=function(a){var e=(0,g["default"])(".popover.modal-in .view"),t=(0,g["default"])(".popup.modal-in .view"),n=(0,g["default"])(".panel.active .view"),r=(0,g["default"])(".views"),o=r.children(".view");if(o.length>1&&o.hasClass("tab")&&(o=r.children(".view.active")),e.length>0&&e[0].f7View)return e[0].f7View;if(t.length>0&&t[0].f7View)return t[0].f7View;if(n.length>0&&n[0].f7View)return n[0].f7View;if(o.length>0){if(1===o.length&&o[0].f7View)return o[0].f7View;if(o.length>1){for(var i=[],l=0;l<o.length;l++)o[l].f7View&&i.push(o[l].f7View);if(i.length>0&&"undefined"!=typeof a)return i[a];if(i.length>1)return i;if(1===i.length)return i[0];return}}},e["default"]=u},118:function(a,e,t){"use strict";function n(a){return a&&a.__esModule?a:{"default":a}}function r(a){var e=a.replace(/^./,function(a){return a.toUpperCase()});d["onPage"+e]=function(e,t){return d.onPage(a,e,t)}}Object.defineProperty(e,"__esModule",{value:!0});var o=t(141),i=n(o),l=t(4),f=n(l),d={};d.pageCallbacks={},d.onPage=function(a,e,t){if(e&&e.split(" ").length>1){for(var n=e.split(" "),r=[],o=0;o<n.length;o++)r.push(d.onPage(a,n[o],t));return r.remove=function(){for(var a=0;a<r.length;a++)r[a].remove()},r.trigger=function(){for(var a=0;a<r.length;a++)r[a].trigger()},r}var i=d.pageCallbacks[a][e];return i||(i=d.pageCallbacks[a][e]=[]),d.pageCallbacks[a][e].push(t),{remove:function(){for(var a,e=0;e<i.length;e++)i[e].toString()===t.toString()&&(a=e);"undefined"!=typeof a&&i.splice(a,1)},trigger:t}};for(var s="beforeInit init reinit beforeAnimation afterAnimation back afterBack beforeRemove".split(" "),g=0;g<s.length;g++)d.pageCallbacks[s[g]]={},r(s[g]);d.triggerPageCallbacks=function(a,e,t){var n=d.pageCallbacks[a]["*"];if(n)for(var r=0;r<n.length;r++)n[r](t);var o=d.pageCallbacks[a][e];if(o&&0!==o.length)for(var i=0;i<o.length;i++)o[i](t)},d.pageInitCallback=function(a,e){var t=e.pageContainer;if(!t.f7PageInitialized||!a||a.params.domCache){var n=e.query;n||(n=e.url&&e.url.indexOf("?")>0?i["default"].parseUrlQuery(e.url||""):t.f7PageData&&t.f7PageData.query?t.f7PageData.query:{});var r={container:t,url:e.url,query:n,name:(0,f["default"])(t).attr("data-page"),view:a,from:e.position,context:e.context,navbarInnerContainer:e.navbarInnerContainer,fromPage:e.fromPage};if(e.fromPage&&!e.fromPage.navbarInnerContainer&&e.oldNavbarInnerContainer&&(e.fromPage.navbarInnerContainer=e.oldNavbarInnerContainer),t.f7PageInitialized&&(a&&a.params.domCache||!a&&(0,f["default"])(t).parents(".popup, .popover, .login-screen, .modal, .actions-modal, .picker-modal").length>0))return d.reinitPage(t),d.triggerPageCallbacks("reinit",r.name,r),void(0,f["default"])(r.container).trigger("pageReinit",{page:r});t.f7PageInitialized=!0,t.f7PageData=r,!a||e.preloadOnly||e.reloadPrevious||((0,f["default"])(a.container).attr("data-page",r.name),a.activePage=r),d.triggerPageCallbacks("beforeInit",r.name,r),(0,f["default"])(r.container).trigger("pageBeforeInit",{page:r}),d.initPage(t),d.triggerPageCallbacks("init",r.name,r),(0,f["default"])(r.container).trigger("pageInit",{page:r})}},d.pageRemoveCallback=function(a,e,t){var n;e.f7PageData&&(n=e.f7PageData.context);var r={container:e,name:(0,f["default"])(e).attr("data-page"),view:a,url:e.f7PageData&&e.f7PageData.url,query:e.f7PageData&&e.f7PageData.query,navbarInnerContainer:e.f7PageData&&e.f7PageData.navbarInnerContainer,from:t,context:n};d.triggerPageCallbacks("beforeRemove",r.name,r),(0,f["default"])(r.container).trigger("pageBeforeRemove",{page:r})},d.pageBackCallback=function(a,e,t){var n,r=t.pageContainer;r.f7PageData&&(n=r.f7PageData.context);var o={container:r,name:(0,f["default"])(r).attr("data-page"),url:r.f7PageData&&r.f7PageData.url,query:r.f7PageData&&r.f7PageData.query,view:e,from:t.position,context:n,navbarInnerContainer:r.f7PageData&&r.f7PageData.navbarInnerContainer,swipeBack:t.swipeBack};"after"===a&&(d.triggerPageCallbacks("afterBack",o.name,o),(0,f["default"])(r).trigger("pageAfterBack",{page:o})),"before"===a&&(d.triggerPageCallbacks("back",o.name,o),(0,f["default"])(o.container).trigger("pageBack",{page:o}))},d.pageAnimCallback=function(a,e,t){var n,r=t.pageContainer;r.f7PageData&&(n=r.f7PageData.context);var o=t.query;o||(o=t.url&&t.url.indexOf("?")>0?i["default"].parseUrlQuery(t.url||""):r.f7PageData&&r.f7PageData.query?r.f7PageData.query:{});var l={container:r,url:t.url,query:o,name:(0,f["default"])(r).attr("data-page"),view:e,from:t.position,context:n,swipeBack:t.swipeBack,navbarInnerContainer:r.f7PageData&&r.f7PageData.navbarInnerContainer,fromPage:t.fromPage},s=t.oldPage,g=t.newPage;if(r.f7PageData=l,"after"===a&&(d.triggerPageCallbacks("afterAnimation",l.name,l),(0,f["default"])(l.container).trigger("pageAfterAnimation",{page:l})),"before"===a){(0,f["default"])(e.container).attr("data-page",l.name),e&&(e.activePage=l),g.hasClass("no-navbar")&&!s.hasClass("no-navbar")&&e.hideNavbar(),g.hasClass("no-navbar")||!s.hasClass("no-navbar")&&!s.hasClass("no-navbar-by-scroll")||e.showNavbar(),g.hasClass("no-toolbar")&&!s.hasClass("no-toolbar")&&e.hideToolbar(),g.hasClass("no-toolbar")||!s.hasClass("no-toolbar")&&!s.hasClass("no-toolbar-by-scroll")||e.showToolbar();var c;g.hasClass("no-tabbar")&&!s.hasClass("no-tabbar")&&(c=(0,f["default"])(e.container).find(".tabbar"),0===c.length&&(c=(0,f["default"])(e.container).parents(".views").find(".tabbar"))),g.hasClass("no-tabbar")||!s.hasClass("no-tabbar")&&!s.hasClass("no-tabbar-by-scroll")||(c=(0,f["default"])(e.container).find(".tabbar"),0===c.length&&(c=(0,f["default"])(e.container).parents(".views").find(".tabbar"))),s.removeClass("no-navbar-by-scroll no-toolbar-by-scroll"),d.triggerPageCallbacks("beforeAnimation",l.name,l),(0,f["default"])(l.container).trigger("pageBeforeAnimation",{page:l})}},d.initPage=function(a){a=(0,f["default"])(a),0===a.length},d.reinitPage=function(a){a=(0,f["default"])(a),0===a.length},d.initPageWithCallback=function(a){a=(0,f["default"])(a);var e=a.parents(".view");if(0!==e.length){var t=e[0].f7View||void 0,n=t&&t.url?t.url:void 0;e&&a.attr("data-page")&&e.attr("data-page",a.attr("data-page")),d.pageInitCallback(t,{pageContainer:a[0],url:n,position:"center"})}},e["default"]=d},119:function(a,e,t){"use strict";function n(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(e,"__esModule",{value:!0});var r=t(4),o=n(r),i=t(11),l=n(i),f=t(92),d=n(f),s=t(12),g=n(s),c=t(118),u=n(c),p=g["default"].sizeNavbar,v={temporaryDom:document.createElement("div"),findElement:function(a,e,t,n){e=(0,o["default"])(e),n&&(a+=":not(.cached)");var r=e.find(a);return r.length>1&&("string"==typeof t.selector&&(r=e.find(t.selector+" "+a)),r.length>1&&(r=e.find("."+l["default"].viewMainClass+" "+a))),1===r.length?r:(n||(r=v.findElement(a,e,t,!0)),r&&1===r.length?r:void 0)},animatePages:function(a,e,t,n){var r="page-on-center page-on-right page-on-left";"to-left"===t&&(a.removeClass(r).addClass("page-from-center-to-left"),e.removeClass(r).addClass("page-from-right-to-center")),"to-right"===t&&(a.removeClass(r).addClass("page-from-left-to-center"),e.removeClass(r).addClass("page-from-center-to-right"))},prepareNavbar:function(a,e,t){(0,o["default"])(a).find(".sliding").each(function(){var a=(0,o["default"])(this),e="right"===t?this.f7NavbarRightOffset:this.f7NavbarLeftOffset;l["default"].animateNavBackIcon&&a.hasClass("left")&&a.find(".back .icon").length>0&&a.find(".back .icon").transform("translate3d("+-e+"px,0,0)"),a.transform("translate3d("+e+"px,0,0)")})},animateNavbars:function(a,e,t,n){var r="navbar-on-right navbar-on-center navbar-on-left";"to-left"===t&&(e.removeClass(r).addClass("navbar-from-right-to-center"),e.find(".sliding").each(function(){var a=(0,o["default"])(this);a.transform("translate3d(0px,0,0)"),l["default"].animateNavBackIcon&&a.hasClass("left")&&a.find(".back .icon").length>0&&a.find(".back .icon").transform("translate3d(0px,0,0)")}),a.removeClass(r).addClass("navbar-from-center-to-left"),a.find(".sliding").each(function(){var a,t=(0,o["default"])(this);l["default"].animateNavBackIcon&&(t.hasClass("center")&&e.find(".sliding.left .back .icon").length>0&&(a=e.find(".sliding.left .back span"),a.length>0&&(this.f7NavbarLeftOffset+=a[0].offsetLeft)),t.hasClass("left")&&t.find(".back .icon").length>0&&t.find(".back .icon").transform("translate3d("+-this.f7NavbarLeftOffset+"px,0,0)")),t.transform("translate3d("+this.f7NavbarLeftOffset+"px,0,0)")})),"to-right"===t&&(a.removeClass(r).addClass("navbar-from-left-to-center"),a.find(".sliding").each(function(){var a=(0,o["default"])(this);a.transform("translate3d(0px,0,0)"),l["default"].animateNavBackIcon&&a.hasClass("left")&&a.find(".back .icon").length>0&&a.find(".back .icon").transform("translate3d(0px,0,0)")}),e.removeClass(r).addClass("navbar-from-center-to-right"),e.find(".sliding").each(function(){var a=(0,o["default"])(this);l["default"].animateNavBackIcon&&a.hasClass("left")&&a.find(".back .icon").length>0&&a.find(".back .icon").transform("translate3d("+-this.f7NavbarRightOffset+"px,0,0)"),a.transform("translate3d("+this.f7NavbarRightOffset+"px,0,0)")}))},preroute:function(a,e){return!!(l["default"].preroute&&l["default"].preroute(a,e)===!1||a&&a.params.preroute&&a.params.preroute(a,e)===!1)},template7Render:function(a,e){var t,n,r=e.url,i=e.content,l=e.content,f=e.context,s=e.contextName,g=e.template;e.pageName;if("string"==typeof i?r?d["default"].template7Cache[r]&&!e.ignoreCache?n=d["default"].cache[r]:(n=d["default"].compile(i),d["default"].cache[r]=n):n=d["default"].compile(i):g&&(n=g),f)t=f;else{if(s)if(s.indexOf(".")>=0){for(var c=s.split("."),u=d["default"].data[c[0]],p=1;p<c.length;p++)c[p]&&(u=u[c[p]]);t=u}else t=d["default"].data[s];if(!t&&r&&(t=d["default"].data["url:"+r]),!t&&"string"==typeof i&&!g){var v=i.match(/(data-page=["'][^"^']*["'])/);if(v){var h=v[0].split("data-page=")[1].replace(/['"]/g,"");h&&(t=d["default"].data["page:"+h])}}if(!t&&g&&d["default"].templates)for(var m in d["default"].templates)d["default"].templates[m]===g&&(t=d["default"].data[m]);t||(t={})}if(n&&t){if("function"==typeof t&&(t=t()),r){var b=o["default"].parseUrlQuery(r);t.url_query={};for(var C in b)t.url_query[C]=b[C]}l=n(t)}return{content:l,context:t}}};v._load=function(a,e){function t(){a.allowPageChange=!0,n.removeClass("page-from-right-to-center page-on-right page-on-left").addClass("page-on-center"),r.removeClass("page-from-center-to-left page-on-center page-on-right").addClass("page-on-left"),m&&(c.removeClass("navbar-from-right-to-center navbar-on-left navbar-on-right").addClass("navbar-on-center"),s.removeClass("navbar-from-center-to-left navbar-on-center navbar-on-right").addClass("navbar-on-left")),u["default"].pageAnimCallback("after",a,{pageContainer:n[0],url:C,position:"right",oldPage:r,newPage:n,query:e.query,fromPage:r&&r.length&&r[0].f7PageData}),a.params.swipeBackPage||a.params.preloadPreviousPage||(r.addClass("cached"),m&&s.addClass("cached")),a.params.uniqueHistory&&a.refreshPreviousPage()}e=e||{};var n,r,i,f,s,c,h,m,b,C=e.url,P=e.content,y={content:e.content},w=e.template,k=e.pageName,N=(0,o["default"])(a.container),D=(0,o["default"])(a.pagesContainer),x=e.animatePages,O="undefined"==typeof C&&P||w;if("undefined"==typeof x&&(x=a.params.animatePages),(l["default"].template7Pages&&"string"==typeof P||w)&&(y=v.template7Render(a,e),y.content&&!P&&(P=y.content)),v.temporaryDom.innerHTML="",!k)if("string"==typeof P||C&&"string"==typeof P)v.temporaryDom.innerHTML=y.content;else if("length"in P&&P.length>1)for(var I=0;I<P.length;I++)(0,o["default"])(v.temporaryDom).append(P[I]);else(0,o["default"])(v.temporaryDom).append(P);if(b=e.reload&&(e.reloadPrevious?"left":"center"),n=k?D.find('.page[data-page="'+k+'"]'):v.findElement(".page",v.temporaryDom,a),!n||0===n.length||k&&a.activePage&&a.activePage.name===k)return void(a.allowPageChange=!0);if(n.addClass(e.reload?"page-on-"+b:"page-on-right"),i=D.children(".page:not(.cached)"),e.reload&&e.reloadPrevious&&1===i.length)return void(a.allowPageChange=!0);if(e.reload)r=i.eq(i.length-1);else{if(i.length>1)for(f=0;f<i.length-1;f++)(0,o["default"])(i[f]).addClass("cached");r=D.children(".page:not(.cached)")}if(n.removeClass("cached"),a.params.dynamicNavbar)if(m=!0,c=k?N.find('.navbar-inner[data-page="'+k+'"]'):v.findElement(".navbar-inner",v.temporaryDom,a),c&&0!==c.length||(m=!1),h=N.find(".navbar"),e.reload)s=h.find(".navbar-inner:not(.cached):last-child");else if(s=h.find(".navbar-inner:not(.cached)"),s.length>0){for(f=0;f<s.length-1;f++)(0,o["default"])(s[f]).addClass("cached");s=h.find(".navbar-inner:not(.cached)")}if(m&&(c.addClass(e.reload?"navbar-on-"+b:"navbar-on-right"),c.removeClass("cached"),n[0].f7RelatedNavbar=c[0],c[0].f7RelatedPage=n[0]),!C){var B=k||n.attr("data-page");C=O?"#"+l["default"].dynamicPageUrl.replace(/{{name}}/g,B).replace(/{{index}}/g,a.history.length-(e.reload?1:0)):"#"+B,k&&(a.pagesCache[C]=k)}if(a.url=C,e.reload){var q=a.history[a.history.length-(e.reloadPrevious?2:1)];q&&0===q.indexOf("#")&&q in a.contentCache&&q!==C&&a.history.indexOf(q)===-1&&(a.contentCache[q]=null,delete a.contentCache[q]),a.history[a.history.length-(e.reloadPrevious?2:1)]=C}else a.history.push(C);e.reloadPrevious?(r=r.prev(".page"),n.insertBefore(r),m&&(s=s.prev(".navbar-inner"),c.insertAfter(s))):(D.append(n[0]),m&&h.append(c[0])),e.reload&&(a.initialPages.indexOf(r[0])>=0?(r.addClass("cached"),m&&s.addClass("cached")):(r.remove(),m&&s.remove())),u["default"].pageInitCallback(a,{pageContainer:n[0],url:C,position:e.reload?b:"right",navbarInnerContainer:m?c&&c[0]:void 0,oldNavbarInnerContainer:m?s&&s[0]:void 0,context:y.context,query:e.query,fromPage:r&&r.length&&r[0].f7PageData,reload:e.reload,reloadPrevious:e.reloadPrevious}),m&&g["default"].navbarInitCallback(a,n[0],h[0],c[0],C,e.reload?b:"right");var R=function(e){var t=(0,o["default"])(this),n=t.attr("href"),r="a"===t[0].nodeName.toLowerCase(),i=t.dataset();r&&e.preventDefault();var f=i.template;if(t.hasClass("back")||f){var s;if(f)n=void 0;else if(0===n.indexOf("#")&&"#"!==n&&(s=n.split("#")[1]),"#"===n&&!t.hasClass("back"))return;var g;"undefined"!=typeof i.animatePages?g=i.animatePages:(t.hasClass("with-animation")&&(g=!0),t.hasClass("no-animation")&&(g=!1));var c={animatePages:g,ignoreCache:i.ignoreCache,force:i.force,reload:i.reload,reloadPrevious:i.reloadPrevious,pageName:s,pushState:i.pushState,url:n};if(l["default"].template7Pages){c.contextName=i.contextName;var u=i.context;u&&(c.context=JSON.parse(u))}f&&f in d["default"].templates&&(c.template=d["default"].templates[f]),t.hasClass("back")&&a.router.back(c)}};if(c&&c.length>0&&(p(c[0]),c.on("click",".back",R)),n.on("click",".back",R),e.reload)return void(a.allowPageChange=!0);m&&x&&v.prepareNavbar(c,s,"right");n[0].clientLeft;return u["default"].pageAnimCallback("before",a,{pageContainer:n[0],url:C,position:"right",oldPage:r,newPage:n,query:e.query,fromPage:r&&r.length&&r[0].f7PageData}),x?(l["default"].material&&l["default"].materialPageLoadDelay?setTimeout(function(){v.animatePages(r,n,"to-left",a)},l["default"].materialPageLoadDelay):v.animatePages(r,n,"to-left",a),m&&setTimeout(function(){v.animateNavbars(s,c,"to-left",a)},0),n.animationEnd(function(a){t()})):(m&&c.find(".sliding, .sliding .back .icon").transform(""),t()),[c&&c[0],n[0]]},v.load=function(a,e){function t(t){return e.content=t,v._load(a,e)}if(v.preroute(a,e))return!1;e=e||{};var n=e.url,r=e.content,i=e.pageName;i&&i.indexOf("?")>0&&(e.query=o["default"].parseUrlQuery(i),e.pageName=i=i.split("?")[0]);var l=e.template;return a.params.reloadPages===!0&&(e.reload=!0),!!a.allowPageChange&&(!(n&&a.url===n&&!e.reload&&!a.params.allowDuplicateUrls)&&(a.allowPageChange=!1,r||i?t(r):l?v._load(a,e):e.url&&"#"!==e.url?void 0:void(a.allowPageChange=!0)))},v._back=function(a,e){function t(){u["default"].pageBackCallback("after",a,{pageContainer:f[0],url:b,position:"center",oldPage:f,newPage:d}),u["default"].pageAnimCallback("after",a,{pageContainer:d[0],url:b,position:"left",oldPage:f,newPage:d,query:e.query,fromPage:f&&f.length&&f[0].f7PageData}),v.afterBack(a,f[0],d[0])}function n(){u["default"].pageBackCallback("before",a,{pageContainer:f[0],url:b,position:"center",oldPage:f,newPage:d}),u["default"].pageAnimCallback("before",a,{pageContainer:d[0],url:b,position:"left",oldPage:f,newPage:d,query:e.query,fromPage:f&&f.length&&f[0].f7PageData}),w?(v.animatePages(d,f,"to-right",a),m&&setTimeout(function(){v.animateNavbars(c,s,"to-right",a)},0),d.animationEnd(function(){t()})):(m&&c.find(".sliding, .sliding .back .icon").transform(""),t())}function r(){if(v.temporaryDom.innerHTML="","string"==typeof C||b&&"string"==typeof C)v.temporaryDom.innerHTML=P.content;else if("length"in C&&C.length>1)for(var e=0;e<C.length;e++)(0,o["default"])(v.temporaryDom).append(C[e]);else(0,o["default"])(v.temporaryDom).append(C);d=v.findElement(".page",v.temporaryDom,a),a.params.dynamicNavbar&&(c=v.findElement(".navbar-inner",v.temporaryDom,a))}function i(){if(!d||0===d.length)return void(a.allowPageChange=!0);if(a.params.dynamicNavbar&&(m=!(!c||0===c.length)),d.addClass("page-on-left").removeClass("cached"),m&&(p=x.find(".navbar"),h=x.find(".navbar-inner:not(.cached)"),c.addClass("navbar-on-left").removeClass("cached")),N){var t,r;if(t=(0,o["default"])(I[I.length-2]),m&&(r=(0,o["default"])(t[0]&&t[0].f7RelatedNavbar||h[h.length-2])),a.initialPages.indexOf(t[0])>=0)t.length&&t[0]!==d[0]&&t.addClass("cached"),m&&r.length&&r[0]!==c[0]&&r.addClass("cached");else{var i=m&&r.length;t.length?(u["default"].pageRemoveCallback(a,t[0],"right"),i&&g["default"].navbarRemoveCallback(a,t[0],p[0],r[0]),t.remove(),i&&r.remove()):i&&(g["default"].navbarRemoveCallback(a,t[0],p[0],r[0]),r.remove())}I=O.children(".page:not(.cached)"),m&&(h=x.find(".navbar-inner:not(.cached)")),a.history.indexOf(b)>=0?a.history=a.history.slice(0,a.history.indexOf(b)+2):a.history[[a.history.length-2]]?a.history[a.history.length-2]=b:a.history.unshift(b)}if(f=(0,o["default"])(I[I.length-1]),f[0]===d[0]&&(f=O.children(".page.page-on-center"),0===f.length&&a.activePage&&(f=(0,o["default"])(a.activePage.container))),m&&!s&&(s=(0,o["default"])(h[h.length-1]),s[0]===c[0]&&(s=p.children(".navbar-inner.navbar-on-center:not(.cached)")),0===s.length&&(s=p.children('.navbar-inner[data-page="'+f.attr("data-page")+'"]')),0!==s.length&&c[0]!==s[0]||(m=!1)),m&&(B&&c.insertBefore(s),c[0].f7RelatedPage=d[0],d[0].f7RelatedNavbar=c[0]),B&&d.insertBefore(f),u["default"].pageInitCallback(a,{pageContainer:d[0],url:b,position:"left",navbarInnerContainer:m?c[0]:void 0,oldNavbarInnerContainer:m?s&&s[0]:void 0,context:P.context,query:e.query,fromPage:f&&f.length&&f[0].f7PageData,preloadOnly:k}),m&&g["default"].navbarInitCallback(a,d[0],p[0],c[0],b,"right"),m&&c.hasClass("navbar-on-left")&&w&&v.prepareNavbar(c,s,"left"),k)return void(a.allowPageChange=!0);a.url=b;d[0].clientLeft;n()}e=e||{};var f,d,s,c,p,h,m,b=e.url,C=e.content,P={content:e.content},y=e.template,w=e.animatePages,k=e.preloadOnly,N=e.force,D=e.pageName,x=(0,o["default"])(a.container),O=(0,o["default"])(a.pagesContainer),I=O.children(".page:not(.cached)"),B=!0;return"undefined"==typeof w&&(w=a.params.animatePages),(l["default"].template7Pages&&"string"==typeof C||y)&&(P=v.template7Render(a,e),P.content&&!C&&(C=P.content)),I.length>1&&!N?k?void(a.allowPageChange=!0):(a.url=a.history[a.history.length-2],b=a.url,d=(0,o["default"])(I[I.length-2]),f=(0,o["default"])(I[I.length-1]),a.params.dynamicNavbar&&(m=!0,h=x.find(".navbar-inner:not(.cached)"),c=(0,o["default"])(h[0]),s=(0,o["default"])(h[1]),0!==c.length&&0!==s.length&&s[0]!==c[0]||(m=!1)),B=!1,void i()):N?b&&b===a.url||D&&a.activePage&&a.activePage.name===D?void(a.allowPageChange=!0):C?(r(),void i()):D?(D&&(b="#"+D),d=(0,o["default"])(x).find('.page[data-page="'+D+'"]'),d[0].f7PageData&&d[0].f7PageData.url&&(b=d[0].f7PageData.url),a.params.dynamicNavbar&&(c=(0,o["default"])(x).find('.navbar-inner[data-page="'+D+'"]'),0===c.length&&d[0].f7RelatedNavbar&&(c=(0,o["default"])(d[0].f7RelatedNavbar)),0===c.length&&d[0].f7PageData&&(c=(0,o["default"])(d[0].f7PageData.navbarInnerContainer))),void i()):void(a.allowPageChange=!0):(k||(a.url=a.history[a.history.length-2],b=a.url),C?(r(),void i()):D?(d=(0,o["default"])(x).find('.page[data-page="'+D+'"]'),a.params.dynamicNavbar&&(c=(0,o["default"])(x).find('.navbar-inner[data-page="'+D+'"]'),0===c.length&&d[0].f7RelatedNavbar&&(c=(0,o["default"])(d[0].f7RelatedNavbar)),0===c.length&&d[0].f7PageData&&(c=(0,o["default"])(d[0].f7PageData.navbarInnerContainer))),void i()):void(a.allowPageChange=!0))},v.back=function(a,e){function t(t){e.content=t,v._back(a,e)}if(v.preroute(a,e))return!1;e=e||{};var n=e.url,r=e.content,i=e.pageName;i&&i.indexOf("?")>0&&(e.query=o["default"].parseUrlQuery(i),e.pageName=i=i.split("?")[0]);var l=e.force;if(!a.allowPageChange)return!1;a.allowPageChange=!1;var f=(0,o["default"])(a.pagesContainer).find(".page:not(.cached)");if(f.length>1)return void v._back(a,e);if(l){if(!n&&r)return void t(r);if(!n&&i)return i&&(n="#"+i),void t()}else{if(n=e.url=a.history[a.history.length-2],!n)return void(a.allowPageChange=!0);if(0===n.indexOf("#")&&a.contentCache[n])return void t(a.contentCache[n]);if(0===n.indexOf("#"))return i||(e.pageName=n.split("#")[1]),void t()}a.allowPageChange=!0},v.afterBack=function(a,e,t){e=(0,o["default"])(e),t=(0,o["default"])(t),a.initialPages.indexOf(e[0])>=0?e.removeClass("page-from-center-to-right").addClass("cached"):(u["default"].pageRemoveCallback(a,e[0],"right"),e.trigger("pageBeforeRemove",{view:a,page:e[0]}),e.remove()),t.removeClass("page-from-left-to-center page-on-left").addClass("page-on-center"),a.allowPageChange=!0,a.history.pop();var n;if(a.params.dynamicNavbar){var r=(0,o["default"])(a.container).find(".navbar-inner:not(.cached)"),i=(0,o["default"])(e[0].f7RelatedNavbar||r[1]);a.initialNavbars.indexOf(i[0])>=0?i.removeClass("navbar-from-center-to-right").addClass("cached"):(g["default"].navbarRemoveCallback(a,e[0],void 0,i[0]),i.remove()),n=(0,o["default"])(r[0]).removeClass("navbar-on-left navbar-from-left-to-center").addClass("navbar-on-center")}if((0,o["default"])(a.container).find(".page.cached").each(function(){var e=(0,o["default"])(this),t=(e.index(),e[0].f7PageData&&e[0].f7PageData.url);t&&a.history.indexOf(t)<0&&a.initialPages.indexOf(this)<0&&(u["default"].pageRemoveCallback(a,e[0],"right"),e[0].f7RelatedNavbar&&a.params.dynamicNavbar&&g["default"].navbarRemoveCallback(a,e[0],void 0,e[0].f7RelatedNavbar),e.remove(),e[0].f7RelatedNavbar&&a.params.dynamicNavbar&&(0,o["default"])(e[0].f7RelatedNavbar).remove())}),a.params.preloadPreviousPage)if(a.history.length>1){var l,f,d=a.history[a.history.length-2];d&&a.pagesCache[d]?(l=(0,o["default"])(a.container).find('.page[data-page="'+a.pagesCache[d]+'"]'),l.next(".page")[0]!==t[0]&&l.insertBefore(t),n&&(f=(0,o["default"])(a.container).find('.navbar-inner[data-page="'+a.pagesCache[d]+'"]'),f&&0!==f.length||(f=n.prev(".navbar-inner.cached")),f.next(".navbar-inner")[0]!==n[0]&&f.insertBefore(n))):(l=t.prev(".page.cached"),n&&(f=n.prev(".navbar-inner.cached"))),l&&l.length>0&&l.removeClass("cached page-on-right page-on-center").addClass("page-on-left"),f&&f.length>0&&f.removeClass("cached navbar-on-right navbar-on-center").addClass("navbar-on-left")}else v.back(a,{preloadOnly:!0})},e["default"]=v},243:function(a,e,t){"use strict";function n(a){return a&&a.__esModule?a:{"default":a}}function r(a,e){if(!(a instanceof e))throw new TypeError("Cannot call a class as a function")}function o(a,e){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?a:e}function i(a,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);a.prototype=Object.create(e&&e.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(a,e):a.__proto__=e)}var l=function(){function a(a,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(a,n.key,n)}}return function(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}}(),f=t(2),d=n(f),s=t(10),g=n(s),c=t(74),u=n(c),p=t(4),v=n(p);t(422);var h=function(a){function e(a){r(this,e);var t=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,a));return t.state={},t}return i(e,a),l(e,[{key:"render",value:function(){return d["default"].createElement("div",{style:{marginTop:"10px"}})}}]),e}(d["default"].Component),m={open:function(a){var e={};if(a)for(var t in e)void 0===a[t]&&(a[t]=e[t]);else a=e;window.mainView=window.mainView||u["default"].addView(".view-main",{dynamicNavbar:!0});var n=window.mainView.router.loadContent('<!-- Top Navbar--><div class="navbar">  <div class="navbar-inner search-navbar">    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><a></div>    <div class="center">\t\t<form class="searchbar searchbar-active" style="padding: 0px;">\t\t\t<div class="searchbar-input"><input type="search" value="" placeholder="搜索"><a href="#" class="searchbar-clear"></a></div>\t\t</form>\t </div>  </div></div><div class="pages">  <!-- Page, data-page contains page name-->  <div class="page navbar-through">    <!-- Scrollable page content-->    <div class="page-content">    </div>  </div></div>'),r=(0,v["default"])(n[1]),o=(0,v["default"])(n[0]);setTimeout(function(){o.find("input[type=search]")[0].focus()},0),(0,v["default"])("#app-toolbar").hide(),r.on("pageBeforeRemove",function(){(0,v["default"])("#app-toolbar").show()}),o.on("submit","form.searchbar",function(e){e.preventDefault();var t=(0,v["default"])(this).find("input[type=search]").val();a.onSubmit&&a.onSubmit(t),window.mainView.back()});g["default"].render(d["default"].createElement(h,null),r.find(".page-content")[0]);return n}};a.exports=m}});
//# sourceMappingURL=20.chunk-d1cac35fa8ef2ba0db64.js.map