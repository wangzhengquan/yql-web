webpackJsonp([15,16],{12:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(4),r=n(o),i=a(11),l=n(i),s={};s.navbarInitCallback=function(e,t,a,n){if(!a&&n&&(a=(0,r["default"])(n).parent(".navbar")[0]),!n.f7NavbarInitialized||!e||e.params.domCache){var o={container:a,innerContainer:n},i=t&&t.f7PageData,l={page:i,navbar:o};if(n.f7NavbarInitialized&&(e&&e.params.domCache||!e&&(0,r["default"])(a).parents(".popup, .popover, .login-screen, .modal, .actions-modal, .picker-modal").length>0))return s.reinitNavbar(a,n),void(0,r["default"])(n).trigger("navbarReinit",l);n.f7NavbarInitialized=!0,(0,r["default"])(n).trigger("navbarBeforeInit",l),s.initNavbar(a,n),(0,r["default"])(n).trigger("navbarInit",l)}},s.navbarRemoveCallback=function(e,t,a,n){!a&&n&&(a=(0,r["default"])(n).parent(".navbar")[0]);var o={container:a,innerContainer:n},i=t.f7PageData,l={page:i,navbar:o};(0,r["default"])(n).trigger("navbarBeforeRemove",l)},s.initNavbar=function(e,t){},s.reinitNavbar=function(e,t){},s.initNavbarWithCallback=function(e){e=(0,r["default"])(e);var t,a=e.parents(".view");0!==a.length&&(0===e.parents(".navbar-through").length&&0===a.find(".navbar-through").length||(t=a[0].f7View||void 0,e.find(".navbar-inner").each(function(){var n,o=this;if((0,r["default"])(o).attr("data-page")&&(n=a.find('.page[data-page="'+(0,r["default"])(o).attr("data-page")+'"]')[0]),!n){var i=a.find(".page");1===i.length?n=i[0]:a.find(".page").each(function(){this.f7PageData&&this.f7PageData.navbarInnerContainer===o&&(n=this)})}s.navbarInitCallback(t,n,e[0],o)})))},s.sizeNavbar=function(e){var t=(0,r["default"])(e);if(!t.hasClass("cached")){var a,n,o=l["default"].rtl?t.find(".right"):t.find(".left"),i=l["default"].rtl?t.find(".left"):t.find(".right"),s=t.find(".center"),f=t.find(".subnavbar"),c=0===o.length,u=0===i.length,d=c?0:o.outerWidth(!0),h=u?0:i.outerWidth(!0),v=s.outerWidth(!0),p=t.styles(),b=t[0].offsetWidth-parseInt(p.paddingLeft,10)-parseInt(p.paddingRight,10),g=t.hasClass("navbar-on-left");u&&(a=b-v),c&&(a=0),c||u||(a=(b-h-v+d)/2);var m=(b-v)/2;b-d-h>v?(m<d&&(m=d),m+v>b-h&&(m=b-h-v),n=m-a):n=0;var y=l["default"].rtl?-1:1;if(s.hasClass("sliding")&&(s[0].f7NavbarLeftOffset=-(a+n)*y,s[0].f7NavbarRightOffset=(b-a-n-v)*y,g)){if(l["default"].animateNavBackIcon){var C=t.parent().find(".navbar-on-center").find(".left.sliding .back .icon ~ span");C.length>0&&(s[0].f7NavbarLeftOffset+=C[0].offsetLeft)}s.transform("translate3d("+s[0].f7NavbarLeftOffset+"px, 0, 0)")}!c&&o.hasClass("sliding")&&(l["default"].rtl?(o[0].f7NavbarLeftOffset=-(b-o[0].offsetWidth)/2*y,o[0].f7NavbarRightOffset=d*y):(o[0].f7NavbarLeftOffset=-d,o[0].f7NavbarRightOffset=(b-o[0].offsetWidth)/2,l["default"].animateNavBackIcon&&o.find(".back .icon").length>0&&(o[0].f7NavbarRightOffset-=o.find(".back .icon")[0].offsetWidth)),g&&o.transform("translate3d("+o[0].f7NavbarLeftOffset+"px, 0, 0)")),!u&&i.hasClass("sliding")&&(l["default"].rtl?(i[0].f7NavbarLeftOffset=-h*y,i[0].f7NavbarRightOffset=(b-i[0].offsetWidth)/2*y):(i[0].f7NavbarLeftOffset=-(b-i[0].offsetWidth)/2,i[0].f7NavbarRightOffset=h),g&&i.transform("translate3d("+i[0].f7NavbarLeftOffset+"px, 0, 0)")),f.length&&f.hasClass("sliding")&&(f[0].f7NavbarLeftOffset=l["default"].rtl?f[0].offsetWidth:-f[0].offsetWidth,f[0].f7NavbarRightOffset=-f[0].f7NavbarLeftOffset);var N=n;l["default"].rtl&&c&&u&&s.length>0&&(N=-N),s.css({left:N+"px"})}},s.sizeNavbars=function(e){if(!l["default"].material){var t=e?(0,r["default"])(e).find(".navbar .navbar-inner:not(.cached)"):(0,r["default"])(".navbar .navbar-inner:not(.cached)");t.each(function(){s.sizeNavbar(this)})}},s.hideNavbar=function(e){return(0,r["default"])(e).addClass("navbar-hidden"),!0},s.showNavbar=function(e){var t=(0,r["default"])(e);return t.addClass("navbar-hiding").removeClass("navbar-hidden").transitionEnd(function(){t.removeClass("navbar-hiding")}),!0},s.hideToolbar=function(e){return(0,r["default"])(e).addClass("toolbar-hidden"),!0},s.showToolbar=function(e){var t=(0,r["default"])(e);t.addClass("toolbar-hiding").removeClass("toolbar-hidden").transitionEnd(function(){t.removeClass("toolbar-hiding")})},t["default"]=s},16:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),s=a(2),f=n(s),c=a(10),u=n(c),d=a(15),h=n(d),v=a(4),p=n(v),b=a(5),g=n(b),m=400,y={hideNavbarOnPageScroll:!0,hideToolbarOnPageScroll:!1,hideTabbarOnPageScroll:!1,showBarsOnPageScrollEnd:!1,showBarsOnPageScrollTop:!0},C=function(e){function t(e){o(this,t);var a=r(this,Object.getPrototypeOf(t).call(this,e));return a.destroyList=[],a}return i(t,e),l(t,[{key:"animatePages",value:function(e,t,a,n){var o="page-on-center page-on-right page-on-left",r=null,i=null;"to-left"===a?"leave"===t?(r="page-from-center-to-left",i="page-on-left"):"enter"===t&&(r="page-from-right-to-center",i="page-on-center"):"to-right"===a&&("enter"===t?(r="page-from-left-to-center",i="page-on-center"):"leave"===t&&(r="page-from-center-to-right",i="page-on-right")),e.removeClass(o).addClass(r),e.animationEnd(function(t){e.removeClass(r).addClass(i),n()})}},{key:"componentDidMount",value:function(){this.node=this.node||(0,p["default"])(u["default"].findDOMNode(this))}},{key:"componentWillUnmount",value:function(){this.destroy()}},{key:"componentWillAppear",value:function(e){e()}},{key:"componentDidAppear",value:function(){}},{key:"componentWillEnter",value:function(e){if(!t.anim)return void e();var a=(0,p["default"])(u["default"].findDOMNode(this));h["default"].isBack?this.animatePages(a,"enter","to-right",e):this.animatePages(a,"enter","to-left",e)}},{key:"componentDidEnter",value:function(){}},{key:"componentWillLeave",value:function(e){if(!t.anim)return setTimeout(function(){t.anim=!0},m),void e();var a=(0,p["default"])(u["default"].findDOMNode(this));h["default"].isBack?this.animatePages(a,"leave","to-right",e):this.animatePages(a,"leave","to-left",e)}},{key:"componentDidLeave",value:function(){}},{key:"initPageScrollToolbars",value:function(e){function t(t){e.hasClass("page-on-left")||(d=n[0].scrollTop,g=n[0].scrollHeight,m=n[0].offsetHeight,C=d+m>=g-P,k=f.hasClass("navbar-hidden"),O=c.hasClass("toolbar-hidden"),w=s&&s.hasClass("toolbar-hidden"),C?y.showBarsOnPageScrollEnd&&(N="show"):N=u>d?y.showBarsOnPageScrollTop||d<=44?"show":"hide":d>44?"hide":"show","show"===N?(h&&o&&k&&(a.showNavbar(f),e.removeClass("no-navbar-by-scroll"),k=!1),v&&r&&O&&(a.showToolbar(c),e.removeClass("no-toolbar-by-scroll"),O=!1),b&&i&&w&&(a.showToolbar(s),e.removeClass("no-tabbar-by-scroll"),w=!1)):(h&&o&&!k&&(a.hideNavbar(f),e.addClass("no-navbar-by-scroll"),k=!0),v&&r&&!O&&(a.hideToolbar(c),e.addClass("no-toolbar-by-scroll"),O=!0),b&&i&&!w&&(a.hideToolbar(s),e.addClass("no-tabbar-by-scroll"),w=!0)),u=d)}var a=this;e=(0,p["default"])(e);var n=e.find(".page-content");if(0!==n.length){var o=(y.hideNavbarOnPageScroll||n.hasClass("hide-navbar-on-scroll")||n.hasClass("hide-bars-on-scroll"))&&!(n.hasClass("keep-navbar-on-scroll")||n.hasClass("keep-bars-on-scroll")),r=(y.hideToolbarOnPageScroll||n.hasClass("hide-toolbar-on-scroll")||n.hasClass("hide-bars-on-scroll"))&&!(n.hasClass("keep-toolbar-on-scroll")||n.hasClass("keep-bars-on-scroll")),i=(y.hideTabbarOnPageScroll||n.hasClass("hide-tabbar-on-scroll"))&&!n.hasClass("keep-tabbar-on-scroll");if(o||r||i){var l=n.parents(".views");if(0!==l.length){var s,f=l.find(".navbar"),c=l.find(".toolbar");i&&(s=l.find(".tabbar"),0===s.length&&(s=l.parents(".views").find(".tabbar")));var u,d,h=f.length>0,v=c.length>0,b=s&&s.length>0;u=d=n[0].scrollTop;var g,m,C,N,k,O,w,E=v&&r?c[0].offsetHeight:0,_=b&&i?s[0].offsetHeight:0,P=_||E;n.on("scroll",t),n[0].f7ScrollToolbarsHandler=t}}}}},{key:"destroyScrollToolbars",value:function(e){e=(0,p["default"])(e);var t=e.find(".page-content");if(0!==t.length){var a=t[0].f7ScrollToolbarsHandler;a&&t.off("scroll",t[0].f7ScrollToolbarsHandler)}}},{key:"hideNavbar",value:function(e){return(0,p["default"])(e).addClass("navbar-hidden"),!0}},{key:"showNavbar",value:function(e){var t=(0,p["default"])(e);return t.addClass("navbar-hiding").removeClass("navbar-hidden").transitionEnd(function(){t.removeClass("navbar-hiding")}),!0}},{key:"hideToolbar",value:function(e){return(0,p["default"])(e).addClass("toolbar-hidden"),!0}},{key:"showToolbar",value:function(e){var t=(0,p["default"])(e);t.addClass("toolbar-hiding").removeClass("toolbar-hidden").transitionEnd(function(){t.removeClass("toolbar-hiding")})}},{key:"destroy",value:function(){this.destroyList.forEach(function(e){e()})}},{key:"render",value:function(){return f["default"].createElement("div",{className:(0,g["default"])("page",this.props.className),"data-page":this.props.pageName})}}]),t}(f["default"].Component);t["default"]=C,C.anim=!0},18:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),s=a(2),f=n(s),c=a(10),u=n(c),d=a(4),h=n(d),v=a(15),p=n(v),b=a(11),g=n(b),m=a(12),y=n(m),C=400,N=function(e){function t(e){o(this,t);var a=r(this,Object.getPrototypeOf(t).call(this,e));return a.state={title:a.props.title},a}return i(t,e),l(t,[{key:"prepareNavbar",value:function(e,t){"right"===t?e.addClass("navbar-on-right"):"left"===t&&e.addClass("navbar-on-left"),(0,h["default"])(e).find(".sliding").each(function(){var e=(0,h["default"])(this),a="right"===t?this.f7NavbarRightOffset:this.f7NavbarLeftOffset;g["default"].animateNavBackIcon&&e.hasClass("left")&&e.find(".back .icon").length>0&&e.find(".back .icon").transform("translate3d("+-a+"px,0,0)"),e.transform("translate3d("+a+"px,0,0)")})}},{key:"animateNavbars",value:function(e,t,a,n){e=(0,h["default"])(e);var o="navbar-on-right navbar-on-center navbar-on-left";"to-left"===a&&("enter"===t?(e.removeClass(o).addClass("navbar-from-right-to-center"),window.setTimeout(function(){e.removeClass("navbar-from-right-to-center").addClass("navbar-on-center"),n()},C),e.find(".sliding").each(function(){var e=(0,h["default"])(this);e.transform("translate3d(0px,0,0)"),g["default"].animateNavBackIcon&&e.hasClass("left")&&e.find(".back .icon").length>0&&e.find(".back .icon").transform("translate3d(0px,0,0)")})):"leave"===t&&!function(){e.removeClass(o).addClass("navbar-from-center-to-left"),window.setTimeout(function(t){e.removeClass("navbar-from-center-to-left").addClass("navbar-on-left"),n()},C);var t=e.closest(".navbar").find(".navbar-inner:first-child");e.find(".sliding").each(function(){var e,a=(0,h["default"])(this);g["default"].animateNavBackIcon&&(a.hasClass("center")&&t.find(".sliding.left .back .icon").length>0&&(e=t.find(".sliding.left .back span"),e.length>0&&(this.f7NavbarLeftOffset+=e[0].offsetLeft)),a.hasClass("left")&&a.find(".back .icon").length>0&&a.find(".back .icon").transform("translate3d("+-this.f7NavbarLeftOffset+"px,0,0)")),a.transform("translate3d("+this.f7NavbarLeftOffset+"px,0,0)")})}()),"to-right"===a&&("enter"===t?(e.removeClass(o).addClass("navbar-from-left-to-center"),window.setTimeout(function(){e.removeClass("navbar-from-left-to-center").addClass("navbar-on-center"),n()},C),e.find(".sliding").each(function(){var e=(0,h["default"])(this);e.transform("translate3d(0px,0,0)"),g["default"].animateNavBackIcon&&e.hasClass("left")&&e.find(".back .icon").length>0&&e.find(".back .icon").transform("translate3d(0px,0,0)")})):"leave"===t&&(e.removeClass(o).addClass("navbar-from-center-to-right"),window.setTimeout(function(){e.removeClass("navbar-from-center-to-right").addClass("navbar-on-right"),n()},C),e.find(".sliding").each(function(){var e=(0,h["default"])(this);g["default"].animateNavBackIcon&&e.hasClass("left")&&e.find(".back .icon").length>0&&e.find(".back .icon").transform("translate3d("+-this.f7NavbarRightOffset+"px,0,0)"),e.transform("translate3d("+this.f7NavbarRightOffset+"px,0,0)")})))}},{key:"componentDidMount",value:function(){console.log("componentDidMount",this.props.location&&this.props.location.pathname);var e=this.node=(0,h["default"])(u["default"].findDOMNode(this)),t=function(){y["default"].sizeNavbar(e)};(0,h["default"])(window).on("resize",t),this.destroy=function(){(0,h["default"])(window).off("resize",t)},y["default"].sizeNavbar(e)}},{key:"componentWillUnMount",value:function(){this.destroy()}},{key:"componentWillAppear",value:function(e){console.log("componentWillAppear",this.props.location&&this.props.location.pathname),e()}},{key:"componentDidAppear",value:function(){console.log("componentDidAppear",this.props.location&&this.props.location.pathname)}},{key:"componentWillEnter",value:function(e){var a=this;if(console.log("componentWillEnter",this.props.location&&this.props.location.pathname),!t.anim)return setTimeout(function(){t.anim=!0},C),void e();var n=this.node||(0,h["default"])(u["default"].findDOMNode(this));p["default"].isBack?(this.prepareNavbar(n,"left"),setTimeout(function(){a.animateNavbars(n,"enter","to-right",e)},17)):(this.prepareNavbar(n,"right"),setTimeout(function(){a.animateNavbars(n,"enter","to-left",e)},17))}},{key:"componentDidEnter",value:function(){console.log("componentDidEnter",this.props.location&&this.props.location.pathname)}},{key:"componentWillLeave",value:function(e){if(console.log("componentWillLeave",this.props.location&&this.props.location.pathname),!t.anim)return void e();var a=this.node||(0,h["default"])(u["default"].findDOMNode(this));p["default"].isBack?this.animateNavbars(a,"leave","to-right",e):this.animateNavbars(a,"leave","to-left",e)}},{key:"componentDidLeave",value:function(){console.log("componentDidLeave",this.props.location&&this.props.location.pathname)}},{key:"handleBackClick",value:function(e){e.preventDefault(),p["default"].go(-1)}},{key:"render",value:function(){return void 0===this.canBack&&(this.canBack=p["default"].canBack),f["default"].createElement("div",{className:"navbar-inner","data-page":this.props.pageName},this.canBack?f["default"].createElement("div",{className:"left sliding"},f["default"].createElement("a",{onClick:this.handleBackClick.bind(this),className:"back link"},f["default"].createElement("i",{className:"icon icon-back"}),f["default"].createElement("span",null,"返回"))):"",f["default"].createElement("div",{className:"center sliding"},this.state.title||""))}}]),t}(f["default"].Component);t["default"]=N,N.sizeNavbar=y["default"].sizeNavbar,N.sizeNavbars=y["default"].sizeNavbars,N.anim=!0},425:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),s=function p(e,t,a){null===e&&(e=Function.prototype);var n=Object.getOwnPropertyDescriptor(e,t);if(void 0===n){var o=Object.getPrototypeOf(e);return null===o?void 0:p(o,t,a)}if("value"in n)return n.value;var r=n.get;if(void 0!==r)return r.call(a)},f=a(2),c=(n(f),a(10)),u=(n(c),a(18)),d=n(u),h=a(4),v=(n(h),function(e){function t(e){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return i(t,e),l(t,[{key:"render",value:function(){return s(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"render",this).call(this)}}]),t}(d["default"]));v.defaultProps={title:"About"},e.exports=v},426:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),s=a(2),f=n(s),c=a(4),u=(n(c),a(16)),d=n(u),h=a(5),v=n(h),p=function(e){function t(e){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return i(t,e),l(t,[{key:"render",value:function(){return f["default"].createElement("div",{"data-page":"about",className:(0,v["default"])("page",this.props.className)},f["default"].createElement("div",{className:"page-content about-page"},f["default"].createElement("div",{className:"content-block"},f["default"].createElement("div",{className:"logo"},"appName")),f["default"].createElement("div",{className:"content-block my-product"},f["default"].createElement("div",{className:"name"},"appName"),f["default"].createElement("div",{className:"version"})),f["default"].createElement("div",{className:"content-block contact-list"},f["default"].createElement("p",null,"GitHub: BelinChung/HiApp"),f["default"].createElement("p",null,"E-Mail: BelinChung@gmail.com"),f["default"].createElement("p",null,"Weibo: @BelinChung")),f["default"].createElement("div",{className:"content-block about-copyright"},"Copyright © 2014-2015 BelinChung.")))}}]),t}(d["default"]);e.exports=p}});
//# sourceMappingURL=15.chunk-d1cac35fa8ef2ba0db64.js.map