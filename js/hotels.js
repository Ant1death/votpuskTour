/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
// ! function (a) {
//   function f(a, b) {
//     if (!(a.originalEvent.touches.length > 1)) {
//       a.preventDefault();
//       var c = a.originalEvent.changedTouches[0],
//         d = document.createEvent("MouseEvents");
//       d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null), a.target.dispatchEvent(d)
//     }
//   }

//   if (a.support.touch = "ontouchend" in document, a.support.touch) {
//     var e, b = a.ui.mouse.prototype,
//       c = b._mouseInit,
//       d = b._mouseDestroy;
//     b._touchStart = function (a) {
//       var b = this;
//       !e && b._mouseCapture(a.originalEvent.changedTouches[0]) && (e = !0, b._touchMoved = !1, f(a, "mouseover"), f(a, "mousemove"), f(a, "mousedown"))
//     }, b._touchMove = function (a) {
//       e && (this._touchMoved = !0, f(a, "mousemove"))
//     }, b._touchEnd = function (a) {
//       e && (f(a, "mouseup"), f(a, "mouseout"), this._touchMoved || f(a, "click"), e = !1)
//     }, b._mouseInit = function () {
//       var b = this;
//       b.element.bind({
//         touchstart: a.proxy(b, "_touchStart"),
//         touchmove: a.proxy(b, "_touchMove"),
//         touchend: a.proxy(b, "_touchEnd")
//       }), c.call(b)
//     }, b._mouseDestroy = function () {
//       var b = this;
//       b.element.unbind({
//         touchstart: a.proxy(b, "_touchStart"),
//         touchmove: a.proxy(b, "_touchMove"),
//         touchend: a.proxy(b, "_touchEnd")
//       }), d.call(b)
//     }
//   }
// }(jQuery);;
/*!
 * Lightbox v2.11.3
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 *
 * @preserve
 */
! function (a, b) {
  "function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports ? module.exports = b(require("jquery")) : a.lightbox = b(a.jQuery)
}(this, function (a) {
  function b(b) {
    this.album = [], this.currentImageIndex = void 0, this.init(), this.options = a.extend({}, this.constructor.defaults), this.option(b)
  }

  return b.defaults = {
    albumLabel: "Image %1 of %2",
    alwaysShowNavOnTouchDevices: !1,
    fadeDuration: 600,
    fitImagesInViewport: !0,
    imageFadeDuration: 600,
    positionFromTop: 50,
    resizeDuration: 700,
    showImageNumberLabel: !0,
    wrapAround: !1,
    disableScrolling: !1,
    sanitizeTitle: !1
  }, b.prototype.option = function (b) {
    a.extend(this.options, b)
  }, b.prototype.imageCountLabel = function (a, b) {
    return this.options.albumLabel.replace(/%1/g, a).replace(/%2/g, b)
  }, b.prototype.init = function () {
    var b = this;
    a(document).ready(function () {
      b.enable(), b.build()
    })
  }, b.prototype.enable = function () {
    var b = this;
    a("body").on("click", "a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]", function (c) {
      return b.start(a(c.currentTarget)), !1
    })
  }, b.prototype.build = function () {
    if (!(a("#lightbox").length > 0)) {
      var b = this;
      a('<div id="lightboxOverlay" tabindex="-1" class="lightboxOverlay"></div><div id="lightbox" tabindex="-1" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt=""/><div class="lb-nav"><a class="lb-prev" aria-label="Previous image" href="" ></a><a class="lb-next" aria-label="Next image" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(a("body")), this.$lightbox = a("#lightbox"), this.$overlay = a("#lightboxOverlay"), this.$outerContainer = this.$lightbox.find(".lb-outerContainer"), this.$container = this.$lightbox.find(".lb-container"), this.$image = this.$lightbox.find(".lb-image"), this.$nav = this.$lightbox.find(".lb-nav"), this.containerPadding = {
        top: parseInt(this.$container.css("padding-top"), 10),
        right: parseInt(this.$container.css("padding-right"), 10),
        bottom: parseInt(this.$container.css("padding-bottom"), 10),
        left: parseInt(this.$container.css("padding-left"), 10)
      }, this.imageBorderWidth = {
        top: parseInt(this.$image.css("border-top-width"), 10),
        right: parseInt(this.$image.css("border-right-width"), 10),
        bottom: parseInt(this.$image.css("border-bottom-width"), 10),
        left: parseInt(this.$image.css("border-left-width"), 10)
      }, this.$overlay.hide().on("click", function () {
        return b.end(), !1
      }), this.$lightbox.hide().on("click", function (c) {
        "lightbox" === a(c.target).attr("id") && b.end()
      }), this.$outerContainer.on("click", function (c) {
        return "lightbox" === a(c.target).attr("id") && b.end(), !1
      }), this.$lightbox.find(".lb-prev").on("click", function () {
        return 0 === b.currentImageIndex ? b.changeImage(b.album.length - 1) : b.changeImage(b.currentImageIndex - 1), !1
      }), this.$lightbox.find(".lb-next").on("click", function () {
        return b.currentImageIndex === b.album.length - 1 ? b.changeImage(0) : b.changeImage(b.currentImageIndex + 1), !1
      }), this.$nav.on("mousedown", function (a) {
        3 === a.which && (b.$nav.css("pointer-events", "none"), b.$lightbox.one("contextmenu", function () {
          setTimeout(function () {
            this.$nav.css("pointer-events", "auto")
          }.bind(b), 0)
        }))
      }), this.$lightbox.find(".lb-loader, .lb-close").on("click", function () {
        return b.end(), !1
      })
    }
  }, b.prototype.start = function (b) {
    function c(a) {
      d.album.push({
        alt: a.attr("data-alt"),
        link: a.attr("href"),
        title: a.attr("data-title") || a.attr("title")
      })
    }

    var d = this,
      e = a(window);
    e.on("resize", a.proxy(this.sizeOverlay, this)), this.sizeOverlay(), this.album = [];
    var f, g = 0,
      h = b.attr("data-lightbox");
    if (h) {
      f = a(b.prop("tagName") + '[data-lightbox="' + h + '"]');
      for (var i = 0; i < f.length; i = ++i) c(a(f[i])), f[i] === b[0] && (g = i)
    } else if ("lightbox" === b.attr("rel")) c(b);
    else {
      f = a(b.prop("tagName") + '[rel="' + b.attr("rel") + '"]');
      for (var j = 0; j < f.length; j = ++j) c(a(f[j])), f[j] === b[0] && (g = j)
    }
    var k = e.scrollTop() + this.options.positionFromTop,
      l = e.scrollLeft();
    this.$lightbox.css({
      top: k + "px",
      left: l + "px"
    }).fadeIn(this.options.fadeDuration), this.options.disableScrolling && a("body").addClass("lb-disable-scrolling"), this.changeImage(g)
  }, b.prototype.changeImage = function (b) {
    var c = this,
      d = this.album[b].link,
      e = d.split(".").slice(-1)[0],
      f = this.$lightbox.find(".lb-image");
    this.disableKeyboardNav(), this.$overlay.fadeIn(this.options.fadeDuration), a(".lb-loader").fadeIn("slow"), this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(), this.$outerContainer.addClass("animating");
    var g = new Image;
    g.onload = function () {
      var h, i, j, k, l, m;
      f.attr({
        alt: c.album[b].alt,
        src: d
      }), a(g), f.width(g.width), f.height(g.height), m = a(window).width(), l = a(window).height(), k = m - c.containerPadding.left - c.containerPadding.right - c.imageBorderWidth.left - c.imageBorderWidth.right - 20, j = l - c.containerPadding.top - c.containerPadding.bottom - c.imageBorderWidth.top - c.imageBorderWidth.bottom - c.options.positionFromTop - 70, "svg" === e && (f.width(k), f.height(j)), c.options.fitImagesInViewport ? (c.options.maxWidth && c.options.maxWidth < k && (k = c.options.maxWidth), c.options.maxHeight && c.options.maxHeight < j && (j = c.options.maxHeight)) : (k = c.options.maxWidth || g.width || k, j = c.options.maxHeight || g.height || j), (g.width > k || g.height > j) && (g.width / k > g.height / j ? (i = k, h = parseInt(g.height / (g.width / i), 10), f.width(i), f.height(h)) : (h = j, i = parseInt(g.width / (g.height / h), 10), f.width(i), f.height(h))), c.sizeContainer(f.width(), f.height())
    }, g.src = this.album[b].link, this.currentImageIndex = b
  }, b.prototype.sizeOverlay = function () {
    var b = this;
    setTimeout(function () {
      b.$overlay.width(a(document).width()).height(a(document).height())
    }, 0)
  }, b.prototype.sizeContainer = function (a, b) {
    function c() {
      d.$lightbox.find(".lb-dataContainer").width(g), d.$lightbox.find(".lb-prevLink").height(h), d.$lightbox.find(".lb-nextLink").height(h), d.$overlay.focus(), d.showImage()
    }

    var d = this,
      e = this.$outerContainer.outerWidth(),
      f = this.$outerContainer.outerHeight(),
      g = a + this.containerPadding.left + this.containerPadding.right + this.imageBorderWidth.left + this.imageBorderWidth.right,
      h = b + this.containerPadding.top + this.containerPadding.bottom + this.imageBorderWidth.top + this.imageBorderWidth.bottom;
    e !== g || f !== h ? this.$outerContainer.animate({
      width: g,
      height: h
    }, this.options.resizeDuration, "swing", function () {
      c()
    }) : c()
  }, b.prototype.showImage = function () {
    this.$lightbox.find(".lb-loader").stop(!0).hide(), this.$lightbox.find(".lb-image").fadeIn(this.options.imageFadeDuration), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav()
  }, b.prototype.updateNav = function () {
    var a = !1;
    try {
      document.createEvent("TouchEvent"), a = !!this.options.alwaysShowNavOnTouchDevices
    } catch (a) {}
    this.$lightbox.find(".lb-nav").show(), this.album.length > 1 && (this.options.wrapAround ? (a && this.$lightbox.find(".lb-prev, .lb-next").css("opacity", "1"), this.$lightbox.find(".lb-prev, .lb-next").show()) : (this.currentImageIndex > 0 && (this.$lightbox.find(".lb-prev").show(), a && this.$lightbox.find(".lb-prev").css("opacity", "1")), this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find(".lb-next").show(), a && this.$lightbox.find(".lb-next").css("opacity", "1"))))
  }, b.prototype.updateDetails = function () {
    var a = this;
    if (void 0 !== this.album[this.currentImageIndex].title && "" !== this.album[this.currentImageIndex].title) {
      var b = this.$lightbox.find(".lb-caption");
      this.options.sanitizeTitle ? b.text(this.album[this.currentImageIndex].title) : b.html(this.album[this.currentImageIndex].title), b.fadeIn("fast")
    }
    if (this.album.length > 1 && this.options.showImageNumberLabel) {
      var c = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
      this.$lightbox.find(".lb-number").text(c).fadeIn("fast")
    } else this.$lightbox.find(".lb-number").hide();
    this.$outerContainer.removeClass("animating"), this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration, function () {
      return a.sizeOverlay()
    })
  }, b.prototype.preloadNeighboringImages = function () {
    if (this.album.length > this.currentImageIndex + 1) {
      (new Image).src = this.album[this.currentImageIndex + 1].link
    }
    if (this.currentImageIndex > 0) {
      (new Image).src = this.album[this.currentImageIndex - 1].link
    }
  }, b.prototype.enableKeyboardNav = function () {
    this.$lightbox.on("keyup.keyboard", a.proxy(this.keyboardAction, this)), this.$overlay.on("keyup.keyboard", a.proxy(this.keyboardAction, this))
  }, b.prototype.disableKeyboardNav = function () {
    this.$lightbox.off(".keyboard"), this.$overlay.off(".keyboard")
  }, b.prototype.keyboardAction = function (a) {
    var b = a.keyCode;
    27 === b ? (a.stopPropagation(), this.end()) : 37 === b ? 0 !== this.currentImageIndex ? this.changeImage(this.currentImageIndex - 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(this.album.length - 1) : 39 === b && (this.currentImageIndex !== this.album.length - 1 ? this.changeImage(this.currentImageIndex + 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(0))
  }, b.prototype.end = function () {
    this.disableKeyboardNav(), a(window).off("resize", this.sizeOverlay), this.$lightbox.fadeOut(this.options.fadeDuration), this.$overlay.fadeOut(this.options.fadeDuration), this.options.disableScrolling && a("body").removeClass("lb-disable-scrolling")
  }, new b
});
//# sourceMappingURL=lightbox.min.map;
/**
 * Swiper 7.2.0
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2021 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: October 27, 2021
 */

! function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper = t()
}(this, (function () {
  "use strict";

  function e(e) {
    return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object
  }

  function t(s = {}, a = {}) {
    Object.keys(a).forEach((i => {
      void 0 === s[i] ? s[i] = a[i] : e(a[i]) && e(s[i]) && Object.keys(a[i]).length > 0 && t(s[i], a[i])
    }))
  }

  const s = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: {
      blur() {},
      nodeName: ""
    },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({
      initEvent() {}
    }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => []
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    }
  };

  function a() {
    const e = "undefined" != typeof document ? document : {};
    return t(e, s), e
  }

  const i = {
    document: s,
    navigator: {
      userAgent: ""
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    },
    history: {
      replaceState() {},
      pushState() {},
      go() {},
      back() {}
    },
    CustomEvent: function () {
      return this
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({
      getPropertyValue: () => ""
    }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: e => "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e)
    }
  };

  function r() {
    const e = "undefined" != typeof window ? window : {};
    return t(e, i), e
  }

  class n extends Array {
    constructor(e) {
      super(...e || []),
        function (e) {
          const t = e.__proto__;
          Object.defineProperty(e, "__proto__", {
            get: () => t,
            set(e) {
              t.__proto__ = e
            }
          })
        }(this)
    }
  }

  function l(e = []) {
    const t = [];
    return e.forEach((e => {
      Array.isArray(e) ? t.push(...l(e)) : t.push(e)
    })), t
  }

  function o(e, t) {
    return Array.prototype.filter.call(e, t)
  }

  function d(e, t) {
    const s = r(),
      i = a();
    let l = [];
    if (!t && e instanceof n) return e;
    if (!e) return new n(l);
    if ("string" == typeof e) {
      const s = e.trim();
      if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
        let e = "div";
        0 === s.indexOf("<li") && (e = "ul"), 0 === s.indexOf("<tr") && (e = "tbody"), 0 !== s.indexOf("<td") && 0 !== s.indexOf("<th") || (e = "tr"), 0 === s.indexOf("<tbody") && (e = "table"), 0 === s.indexOf("<option") && (e = "select");
        const t = i.createElement(e);
        t.innerHTML = s;
        for (let e = 0; e < t.childNodes.length; e += 1) l.push(t.childNodes[e])
      } else l = function (e, t) {
        if ("string" != typeof e) return [e];
        const s = [],
          a = t.querySelectorAll(e);
        for (let e = 0; e < a.length; e += 1) s.push(a[e]);
        return s
      }(e.trim(), t || i)
    } else if (e.nodeType || e === s || e === i) l.push(e);
    else if (Array.isArray(e)) {
      if (e instanceof n) return e;
      l = e
    }
    return new n(function (e) {
      const t = [];
      for (let s = 0; s < e.length; s += 1) - 1 === t.indexOf(e[s]) && t.push(e[s]);
      return t
    }(l))
  }

  d.fn = n.prototype;
  const c = {
    addClass: function (...e) {
      const t = l(e.map((e => e.split(" "))));
      return this.forEach((e => {
        e.classList.add(...t)
      })), this
    },
    removeClass: function (...e) {
      const t = l(e.map((e => e.split(" "))));
      return this.forEach((e => {
        e.classList.remove(...t)
      })), this
    },
    hasClass: function (...e) {
      const t = l(e.map((e => e.split(" "))));
      return o(this, (e => t.filter((t => e.classList.contains(t))).length > 0)).length > 0
    },
    toggleClass: function (...e) {
      const t = l(e.map((e => e.split(" "))));
      this.forEach((e => {
        t.forEach((t => {
          e.classList.toggle(t)
        }))
      }))
    },
    attr: function (e, t) {
      if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
      for (let s = 0; s < this.length; s += 1)
        if (2 === arguments.length) this[s].setAttribute(e, t);
        else
          for (const t in e) this[s][t] = e[t], this[s].setAttribute(t, e[t]);
      return this
    },
    removeAttr: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this
    },
    transform: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
      return this
    },
    transition: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
      return this
    },
    on: function (...e) {
      let [t, s, a, i] = e;

      function r(e) {
        const t = e.target;
        if (!t) return;
        const i = e.target.dom7EventData || [];
        if (i.indexOf(e) < 0 && i.unshift(e), d(t).is(s)) a.apply(t, i);
        else {
          const e = d(t).parents();
          for (let t = 0; t < e.length; t += 1) d(e[t]).is(s) && a.apply(e[t], i)
        }
      }

      function n(e) {
        const t = e && e.target && e.target.dom7EventData || [];
        t.indexOf(e) < 0 && t.unshift(e), a.apply(this, t)
      }

      "function" == typeof e[1] && ([t, a, i] = e, s = void 0), i || (i = !1);
      const l = t.split(" ");
      let o;
      for (let e = 0; e < this.length; e += 1) {
        const t = this[e];
        if (s)
          for (o = 0; o < l.length; o += 1) {
            const e = l[o];
            t.dom7LiveListeners || (t.dom7LiveListeners = {}), t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []), t.dom7LiveListeners[e].push({
              listener: a,
              proxyListener: r
            }), t.addEventListener(e, r, i)
          } else
            for (o = 0; o < l.length; o += 1) {
              const e = l[o];
              t.dom7Listeners || (t.dom7Listeners = {}), t.dom7Listeners[e] || (t.dom7Listeners[e] = []), t.dom7Listeners[e].push({
                listener: a,
                proxyListener: n
              }), t.addEventListener(e, n, i)
            }
      }
      return this
    },
    off: function (...e) {
      let [t, s, a, i] = e;
      "function" == typeof e[1] && ([t, a, i] = e, s = void 0), i || (i = !1);
      const r = t.split(" ");
      for (let e = 0; e < r.length; e += 1) {
        const t = r[e];
        for (let e = 0; e < this.length; e += 1) {
          const r = this[e];
          let n;
          if (!s && r.dom7Listeners ? n = r.dom7Listeners[t] : s && r.dom7LiveListeners && (n = r.dom7LiveListeners[t]), n && n.length)
            for (let e = n.length - 1; e >= 0; e -= 1) {
              const s = n[e];
              a && s.listener === a || a && s.listener && s.listener.dom7proxy && s.listener.dom7proxy === a ? (r.removeEventListener(t, s.proxyListener, i), n.splice(e, 1)) : a || (r.removeEventListener(t, s.proxyListener, i), n.splice(e, 1))
            }
        }
      }
      return this
    },
    trigger: function (...e) {
      const t = r(),
        s = e[0].split(" "),
        a = e[1];
      for (let i = 0; i < s.length; i += 1) {
        const r = s[i];
        for (let s = 0; s < this.length; s += 1) {
          const i = this[s];
          if (t.CustomEvent) {
            const s = new t.CustomEvent(r, {
              detail: a,
              bubbles: !0,
              cancelable: !0
            });
            i.dom7EventData = e.filter(((e, t) => t > 0)), i.dispatchEvent(s), i.dom7EventData = [], delete i.dom7EventData
          }
        }
      }
      return this
    },
    transitionEnd: function (e) {
      const t = this;
      return e && t.on("transitionend", (function s(a) {
        a.target === this && (e.call(this, a), t.off("transitionend", s))
      })), this
    },
    outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"))
        }
        return this[0].offsetWidth
      }
      return null
    },
    outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"))
        }
        return this[0].offsetHeight
      }
      return null
    },
    styles: function () {
      const e = r();
      return this[0] ? e.getComputedStyle(this[0], null) : {}
    },
    offset: function () {
      if (this.length > 0) {
        const e = r(),
          t = a(),
          s = this[0],
          i = s.getBoundingClientRect(),
          n = t.body,
          l = s.clientTop || n.clientTop || 0,
          o = s.clientLeft || n.clientLeft || 0,
          d = s === e ? e.scrollY : s.scrollTop,
          c = s === e ? e.scrollX : s.scrollLeft;
        return {
          top: i.top + d - l,
          left: i.left + c - o
        }
      }
      return null
    },
    css: function (e, t) {
      const s = r();
      let a;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (a = 0; a < this.length; a += 1)
            for (const t in e) this[a].style[t] = e[t];
          return this
        }
        if (this[0]) return s.getComputedStyle(this[0], null).getPropertyValue(e)
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
        return this
      }
      return this
    },
    each: function (e) {
      return e ? (this.forEach(((t, s) => {
        e.apply(t, [t, s])
      })), this) : this
    },
    html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : null;
      for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this
    },
    text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this
    },
    is: function (e) {
      const t = r(),
        s = a(),
        i = this[0];
      let l, o;
      if (!i || void 0 === e) return !1;
      if ("string" == typeof e) {
        if (i.matches) return i.matches(e);
        if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
        if (i.msMatchesSelector) return i.msMatchesSelector(e);
        for (l = d(e), o = 0; o < l.length; o += 1)
          if (l[o] === i) return !0;
        return !1
      }
      if (e === s) return i === s;
      if (e === t) return i === t;
      if (e.nodeType || e instanceof n) {
        for (l = e.nodeType ? [e] : e, o = 0; o < l.length; o += 1)
          if (l[o] === i) return !0;
        return !1
      }
      return !1
    },
    index: function () {
      let e, t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
        return e
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      const t = this.length;
      if (e > t - 1) return d([]);
      if (e < 0) {
        const s = t + e;
        return d(s < 0 ? [] : [this[s]])
      }
      return d([this[e]])
    },
    append: function (...e) {
      let t;
      const s = a();
      for (let a = 0; a < e.length; a += 1) {
        t = e[a];
        for (let e = 0; e < this.length; e += 1)
          if ("string" == typeof t) {
            const a = s.createElement("div");
            for (a.innerHTML = t; a.firstChild;) this[e].appendChild(a.firstChild)
          } else if (t instanceof n)
          for (let s = 0; s < t.length; s += 1) this[e].appendChild(t[s]);
        else this[e].appendChild(t)
      }
      return this
    },
    prepend: function (e) {
      const t = a();
      let s, i;
      for (s = 0; s < this.length; s += 1)
        if ("string" == typeof e) {
          const a = t.createElement("div");
          for (a.innerHTML = e, i = a.childNodes.length - 1; i >= 0; i -= 1) this[s].insertBefore(a.childNodes[i], this[s].childNodes[0])
        } else if (e instanceof n)
        for (i = 0; i < e.length; i += 1) this[s].insertBefore(e[i], this[s].childNodes[0]);
      else this[s].insertBefore(e, this[s].childNodes[0]);
      return this
    },
    next: function (e) {
      return this.length > 0 ? e ? this[0].nextElementSibling && d(this[0].nextElementSibling).is(e) ? d([this[0].nextElementSibling]) : d([]) : this[0].nextElementSibling ? d([this[0].nextElementSibling]) : d([]) : d([])
    },
    nextAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return d([]);
      for (; s.nextElementSibling;) {
        const a = s.nextElementSibling;
        e ? d(a).is(e) && t.push(a) : t.push(a), s = a
      }
      return d(t)
    },
    prev: function (e) {
      if (this.length > 0) {
        const t = this[0];
        return e ? t.previousElementSibling && d(t.previousElementSibling).is(e) ? d([t.previousElementSibling]) : d([]) : t.previousElementSibling ? d([t.previousElementSibling]) : d([])
      }
      return d([])
    },
    prevAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return d([]);
      for (; s.previousElementSibling;) {
        const a = s.previousElementSibling;
        e ? d(a).is(e) && t.push(a) : t.push(a), s = a
      }
      return d(t)
    },
    parent: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) null !== this[s].parentNode && (e ? d(this[s].parentNode).is(e) && t.push(this[s].parentNode) : t.push(this[s].parentNode));
      return d(t)
    },
    parents: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        let a = this[s].parentNode;
        for (; a;) e ? d(a).is(e) && t.push(a) : t.push(a), a = a.parentNode
      }
      return d(t)
    },
    closest: function (e) {
      let t = this;
      return void 0 === e ? d([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
    },
    find: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const a = this[s].querySelectorAll(e);
        for (let e = 0; e < a.length; e += 1) t.push(a[e])
      }
      return d(t)
    },
    children: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const a = this[s].children;
        for (let s = 0; s < a.length; s += 1) e && !d(a[s]).is(e) || t.push(a[s])
      }
      return d(t)
    },
    filter: function (e) {
      return d(o(this, e))
    },
    remove: function () {
      for (let e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this
    }
  };

  function p(e, t = 0) {
    return setTimeout(e, t)
  }

  function u() {
    return Date.now()
  }

  function h(e, t = "x") {
    const s = r();
    let a, i, n;
    const l = function (e) {
      const t = r();
      let s;
      return t.getComputedStyle && (s = t.getComputedStyle(e, null)), !s && e.currentStyle && (s = e.currentStyle), s || (s = e.style), s
    }(e);
    return s.WebKitCSSMatrix ? (i = l.transform || l.webkitTransform, i.split(",").length > 6 && (i = i.split(", ").map((e => e.replace(",", "."))).join(", ")), n = new s.WebKitCSSMatrix("none" === i ? "" : i)) : (n = l.MozTransform || l.OTransform || l.MsTransform || l.msTransform || l.transform || l.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), a = n.toString().split(",")), "x" === t && (i = s.WebKitCSSMatrix ? n.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])), "y" === t && (i = s.WebKitCSSMatrix ? n.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])), i || 0
  }

  function m(e) {
    return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
  }

  function f(...e) {
    const t = Object(e[0]),
      s = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < e.length; i += 1) {
      const r = e[i];
      if (null != r && (a = r, !("undefined" != typeof window && void 0 !== window.HTMLElement ? a instanceof HTMLElement : a && (1 === a.nodeType || 11 === a.nodeType)))) {
        const e = Object.keys(Object(r)).filter((e => s.indexOf(e) < 0));
        for (let s = 0, a = e.length; s < a; s += 1) {
          const a = e[s],
            i = Object.getOwnPropertyDescriptor(r, a);
          void 0 !== i && i.enumerable && (m(t[a]) && m(r[a]) ? r[a].__swiper__ ? t[a] = r[a] : f(t[a], r[a]) : !m(t[a]) && m(r[a]) ? (t[a] = {}, r[a].__swiper__ ? t[a] = r[a] : f(t[a], r[a])) : t[a] = r[a])
        }
      }
    }
    var a;
    return t
  }

  function g(e, t, s) {
    e.style.setProperty(t, s)
  }

  function v({
    swiper: e,
    targetPosition: t,
    side: s
  }) {
    const a = r(),
      i = -e.translate;
    let n, l = null;
    const o = e.params.speed;
    e.wrapperEl.style.scrollSnapType = "none", a.cancelAnimationFrame(e.cssModeFrameID);
    const d = t > i ? "next" : "prev",
      c = (e, t) => "next" === d && e >= t || "prev" === d && e <= t,
      p = () => {
        n = (new Date).getTime(), null === l && (l = n);
        const r = Math.max(Math.min((n - l) / o, 1), 0),
          d = .5 - Math.cos(r * Math.PI) / 2;
        let u = i + d * (t - i);
        if (c(u, t) && (u = t), e.wrapperEl.scrollTo({
            [s]: u
          }), c(u, t)) return e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout((() => {
          e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({
            [s]: u
          })
        })), void a.cancelAnimationFrame(e.cssModeFrameID);
        e.cssModeFrameID = a.requestAnimationFrame(p)
      };
    p()
  }

  let w, b, x;

  function y() {
    return w || (w = function () {
      const e = r(),
        t = a();
      return {
        smoothScroll: t.documentElement && "scrollBehavior" in t.documentElement.style,
        touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch),
        passiveListener: function () {
          let t = !1;
          try {
            const s = Object.defineProperty({}, "passive", {
              get() {
                t = !0
              }
            });
            e.addEventListener("testPassiveListener", null, s)
          } catch (e) {}
          return t
        }(),
        gestures: "ongesturestart" in e
      }
    }()), w
  }

  function E(e = {}) {
    return b || (b = function ({
      userAgent: e
    } = {}) {
      const t = y(),
        s = r(),
        a = s.navigator.platform,
        i = e || s.navigator.userAgent,
        n = {
          ios: !1,
          android: !1
        },
        l = s.screen.width,
        o = s.screen.height,
        d = i.match(/(Android);?[\s\/]+([\d.]+)?/);
      let c = i.match(/(iPad).*OS\s([\d_]+)/);
      const p = i.match(/(iPod)(.*OS\s([\d_]+))?/),
        u = !c && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
        h = "Win32" === a;
      let m = "MacIntel" === a;
      return !c && m && t.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${l}x${o}`) >= 0 && (c = i.match(/(Version)\/([\d.]+)/), c || (c = [0, 1, "13_0_0"]), m = !1), d && !h && (n.os = "android", n.android = !0), (c || u || p) && (n.os = "ios", n.ios = !0), n
    }(e)), b
  }

  function T() {
    return x || (x = function () {
      const e = r();
      return {
        isSafari: function () {
          const t = e.navigator.userAgent.toLowerCase();
          return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
        }(),
        isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
      }
    }()), x
  }

  Object.keys(c).forEach((e => {
    Object.defineProperty(d.fn, e, {
      value: c[e],
      writable: !0
    })
  }));
  var C = {
    on(e, t, s) {
      const a = this;
      if ("function" != typeof t) return a;
      const i = s ? "unshift" : "push";
      return e.split(" ").forEach((e => {
        a.eventsListeners[e] || (a.eventsListeners[e] = []), a.eventsListeners[e][i](t)
      })), a
    },
    once(e, t, s) {
      const a = this;
      if ("function" != typeof t) return a;

      function i(...s) {
        a.off(e, i), i.__emitterProxy && delete i.__emitterProxy, t.apply(a, s)
      }

      return i.__emitterProxy = t, a.on(e, i, s)
    },
    onAny(e, t) {
      const s = this;
      if ("function" != typeof e) return s;
      const a = t ? "unshift" : "push";
      return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[a](e), s
    },
    offAny(e) {
      const t = this;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t
    },
    off(e, t) {
      const s = this;
      return s.eventsListeners ? (e.split(" ").forEach((e => {
        void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach(((a, i) => {
          (a === t || a.__emitterProxy && a.__emitterProxy === t) && s.eventsListeners[e].splice(i, 1)
        }))
      })), s) : s
    },
    emit(...e) {
      const t = this;
      if (!t.eventsListeners) return t;
      let s, a, i;
      "string" == typeof e[0] || Array.isArray(e[0]) ? (s = e[0], a = e.slice(1, e.length), i = t) : (s = e[0].events, a = e[0].data, i = e[0].context || t), a.unshift(i);
      return (Array.isArray(s) ? s : s.split(" ")).forEach((e => {
        t.eventsAnyListeners && t.eventsAnyListeners.length && t.eventsAnyListeners.forEach((t => {
          t.apply(i, [e, ...a])
        })), t.eventsListeners && t.eventsListeners[e] && t.eventsListeners[e].forEach((e => {
          e.apply(i, a)
        }))
      })), t
    }
  };

  function $({
    swiper: e,
    runCallbacks: t,
    direction: s,
    step: a
  }) {
    const {
      activeIndex: i,
      previousIndex: r
    } = e;
    let n = s;
    if (n || (n = i > r ? "next" : i < r ? "prev" : "reset"), e.emit(`transition${a}`), t && i !== r) {
      if ("reset" === n) return void e.emit(`slideResetTransition${a}`);
      e.emit(`slideChangeTransition${a}`), "next" === n ? e.emit(`slideNextTransition${a}`) : e.emit(`slidePrevTransition${a}`)
    }
  }

  function S(e) {
    const t = this,
      s = a(),
      i = r(),
      n = t.touchEventsData,
      {
        params: l,
        touches: o,
        enabled: c
      } = t;
    if (!c) return;
    if (t.animating && l.preventInteractionOnTransition) return;
    !t.animating && l.cssMode && l.loop && t.loopFix();
    let p = e;
    p.originalEvent && (p = p.originalEvent);
    let h = d(p.target);
    if ("wrapper" === l.touchEventsTarget && !h.closest(t.wrapperEl).length) return;
    if (n.isTouchEvent = "touchstart" === p.type, !n.isTouchEvent && "which" in p && 3 === p.which) return;
    if (!n.isTouchEvent && "button" in p && p.button > 0) return;
    if (n.isTouched && n.isMoved) return;
    !!l.noSwipingClass && "" !== l.noSwipingClass && p.target && p.target.shadowRoot && e.path && e.path[0] && (h = d(e.path[0]));
    const m = l.noSwipingSelector ? l.noSwipingSelector : `.${l.noSwipingClass}`,
      f = !(!p.target || !p.target.shadowRoot);
    if (l.noSwiping && (f ? function (e, t = this) {
        return function t(s) {
          return s && s !== a() && s !== r() ? (s.assignedSlot && (s = s.assignedSlot), s.closest(e) || t(s.getRootNode().host)) : null
        }(t)
      }(m, p.target) : h.closest(m)[0])) return void(t.allowClick = !0);
    if (l.swipeHandler && !h.closest(l.swipeHandler)[0]) return;
    o.currentX = "touchstart" === p.type ? p.targetTouches[0].pageX : p.pageX, o.currentY = "touchstart" === p.type ? p.targetTouches[0].pageY : p.pageY;
    const g = o.currentX,
      v = o.currentY,
      w = l.edgeSwipeDetection || l.iOSEdgeSwipeDetection,
      b = l.edgeSwipeThreshold || l.iOSEdgeSwipeThreshold;
    if (w && (g <= b || g >= i.innerWidth - b)) {
      if ("prevent" !== w) return;
      e.preventDefault()
    }
    if (Object.assign(n, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0
      }), o.startX = g, o.startY = v, n.touchStartTime = u(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, l.threshold > 0 && (n.allowThresholdMove = !1), "touchstart" !== p.type) {
      let e = !0;
      h.is(n.focusableElements) && (e = !1), s.activeElement && d(s.activeElement).is(n.focusableElements) && s.activeElement !== h[0] && s.activeElement.blur();
      const a = e && t.allowTouchMove && l.touchStartPreventDefault;
      !l.touchStartForcePreventDefault && !a || h[0].isContentEditable || p.preventDefault()
    }
    t.emit("touchStart", p)
  }

  function M(e) {
    const t = a(),
      s = this,
      i = s.touchEventsData,
      {
        params: r,
        touches: n,
        rtlTranslate: l,
        enabled: o
      } = s;
    if (!o) return;
    let c = e;
    if (c.originalEvent && (c = c.originalEvent), !i.isTouched) return void(i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", c));
    if (i.isTouchEvent && "touchmove" !== c.type) return;
    const p = "touchmove" === c.type && c.targetTouches && (c.targetTouches[0] || c.changedTouches[0]),
      h = "touchmove" === c.type ? p.pageX : c.pageX,
      m = "touchmove" === c.type ? p.pageY : c.pageY;
    if (c.preventedByNestedSwiper) return n.startX = h, void(n.startY = m);
    if (!s.allowTouchMove) return s.allowClick = !1, void(i.isTouched && (Object.assign(n, {
      startX: h,
      startY: m,
      currentX: h,
      currentY: m
    }), i.touchStartTime = u()));
    if (i.isTouchEvent && r.touchReleaseOnEdges && !r.loop)
      if (s.isVertical()) {
        if (m < n.startY && s.translate <= s.maxTranslate() || m > n.startY && s.translate >= s.minTranslate()) return i.isTouched = !1, void(i.isMoved = !1)
      } else if (h < n.startX && s.translate <= s.maxTranslate() || h > n.startX && s.translate >= s.minTranslate()) return;
    if (i.isTouchEvent && t.activeElement && c.target === t.activeElement && d(c.target).is(i.focusableElements)) return i.isMoved = !0, void(s.allowClick = !1);
    if (i.allowTouchCallbacks && s.emit("touchMove", c), c.targetTouches && c.targetTouches.length > 1) return;
    n.currentX = h, n.currentY = m;
    const f = n.currentX - n.startX,
      g = n.currentY - n.startY;
    if (s.params.threshold && Math.sqrt(f ** 2 + g ** 2) < s.params.threshold) return;
    if (void 0 === i.isScrolling) {
      let e;
      s.isHorizontal() && n.currentY === n.startY || s.isVertical() && n.currentX === n.startX ? i.isScrolling = !1 : f * f + g * g >= 25 && (e = 180 * Math.atan2(Math.abs(g), Math.abs(f)) / Math.PI, i.isScrolling = s.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle)
    }
    if (i.isScrolling && s.emit("touchMoveOpposite", c), void 0 === i.startMoving && (n.currentX === n.startX && n.currentY === n.startY || (i.startMoving = !0)), i.isScrolling) return void(i.isTouched = !1);
    if (!i.startMoving) return;
    s.allowClick = !1, !r.cssMode && c.cancelable && c.preventDefault(), r.touchMoveStopPropagation && !r.nested && c.stopPropagation(), i.isMoved || (r.loop && !r.cssMode && s.loopFix(), i.startTranslate = s.getTranslate(), s.setTransition(0), s.animating && s.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, !r.grabCursor || !0 !== s.allowSlideNext && !0 !== s.allowSlidePrev || s.setGrabCursor(!0), s.emit("sliderFirstMove", c)), s.emit("sliderMove", c), i.isMoved = !0;
    let v = s.isHorizontal() ? f : g;
    n.diff = v, v *= r.touchRatio, l && (v = -v), s.swipeDirection = v > 0 ? "prev" : "next", i.currentTranslate = v + i.startTranslate;
    let w = !0,
      b = r.resistanceRatio;
    if (r.touchReleaseOnEdges && (b = 0), v > 0 && i.currentTranslate > s.minTranslate() ? (w = !1, r.resistance && (i.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + i.startTranslate + v) ** b)) : v < 0 && i.currentTranslate < s.maxTranslate() && (w = !1, r.resistance && (i.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - i.startTranslate - v) ** b)), w && (c.preventedByNestedSwiper = !0), !s.allowSlideNext && "next" === s.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !s.allowSlidePrev && "prev" === s.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), s.allowSlidePrev || s.allowSlideNext || (i.currentTranslate = i.startTranslate), r.threshold > 0) {
      if (!(Math.abs(v) > r.threshold || i.allowThresholdMove)) return void(i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove) return i.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, i.currentTranslate = i.startTranslate, void(n.diff = s.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY)
    }
    r.followFinger && !r.cssMode && ((r.freeMode && r.freeMode.enabled && s.freeMode || r.watchSlidesProgress) && (s.updateActiveIndex(), s.updateSlidesClasses()), s.params.freeMode && r.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(), s.updateProgress(i.currentTranslate), s.setTranslate(i.currentTranslate))
  }

  function P(e) {
    const t = this,
      s = t.touchEventsData,
      {
        params: a,
        touches: i,
        rtlTranslate: r,
        slidesGrid: n,
        enabled: l
      } = t;
    if (!l) return;
    let o = e;
    if (o.originalEvent && (o = o.originalEvent), s.allowTouchCallbacks && t.emit("touchEnd", o), s.allowTouchCallbacks = !1, !s.isTouched) return s.isMoved && a.grabCursor && t.setGrabCursor(!1), s.isMoved = !1, void(s.startMoving = !1);
    a.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
    const d = u(),
      c = d - s.touchStartTime;
    if (t.allowClick && (t.updateClickedSlide(o), t.emit("tap click", o), c < 300 && d - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", o)), s.lastClickTime = u(), p((() => {
        t.destroyed || (t.allowClick = !0)
      })), !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === i.diff || s.currentTranslate === s.startTranslate) return s.isTouched = !1, s.isMoved = !1, void(s.startMoving = !1);
    let h;
    if (s.isTouched = !1, s.isMoved = !1, s.startMoving = !1, h = a.followFinger ? r ? t.translate : -t.translate : -s.currentTranslate, a.cssMode) return;
    if (t.params.freeMode && a.freeMode.enabled) return void t.freeMode.onTouchEnd({
      currentPos: h
    });
    let m = 0,
      f = t.slidesSizesGrid[0];
    for (let e = 0; e < n.length; e += e < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup) {
      const t = e < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
      void 0 !== n[e + t] ? h >= n[e] && h < n[e + t] && (m = e, f = n[e + t] - n[e]) : h >= n[e] && (m = e, f = n[n.length - 1] - n[n.length - 2])
    }
    const g = (h - n[m]) / f,
      v = m < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    if (c > a.longSwipesMs) {
      if (!a.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection && (g >= a.longSwipesRatio ? t.slideTo(m + v) : t.slideTo(m)), "prev" === t.swipeDirection && (g > 1 - a.longSwipesRatio ? t.slideTo(m + v) : t.slideTo(m))
    } else {
      if (!a.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation && (o.target === t.navigation.nextEl || o.target === t.navigation.prevEl) ? o.target === t.navigation.nextEl ? t.slideTo(m + v) : t.slideTo(m) : ("next" === t.swipeDirection && t.slideTo(m + v), "prev" === t.swipeDirection && t.slideTo(m))
    }
  }

  function k() {
    const e = this,
      {
        params: t,
        el: s
      } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const {
      allowSlideNext: a,
      allowSlidePrev: i,
      snapGrid: r
    } = e;
    e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses(), ("auto" === t.slidesPerView || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(), e.allowSlidePrev = i, e.allowSlideNext = a, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
  }

  function z(e) {
    const t = this;
    t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())))
  }

  function O() {
    const e = this,
      {
        wrapperEl: t,
        rtlTranslate: s,
        enabled: a
      } = e;
    if (!a) return;
    let i;
    e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, -0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
    const r = e.maxTranslate() - e.minTranslate();
    i = 0 === r ? 0 : (e.translate - e.minTranslate()) / r, i !== e.progress && e.updateProgress(s ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1)
  }

  let I = !1;

  function L() {}

  const A = (e, t) => {
    const s = a(),
      {
        params: i,
        touchEvents: r,
        el: n,
        wrapperEl: l,
        device: o,
        support: d
      } = e,
      c = !!i.nested,
      p = "on" === t ? "addEventListener" : "removeEventListener",
      u = t;
    if (d.touch) {
      const t = !("touchstart" !== r.start || !d.passiveListener || !i.passiveListeners) && {
        passive: !0,
        capture: !1
      };
      n[p](r.start, e.onTouchStart, t), n[p](r.move, e.onTouchMove, d.passiveListener ? {
        passive: !1,
        capture: c
      } : c), n[p](r.end, e.onTouchEnd, t), r.cancel && n[p](r.cancel, e.onTouchEnd, t)
    } else n[p](r.start, e.onTouchStart, !1), s[p](r.move, e.onTouchMove, c), s[p](r.end, e.onTouchEnd, !1);
    (i.preventClicks || i.preventClicksPropagation) && n[p]("click", e.onClick, !0), i.cssMode && l[p]("scroll", e.onScroll), i.updateOnWindowResize ? e[u](o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", k, !0) : e[u]("observerUpdate", k, !0)
  };
  const D = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  var G = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: .5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: .85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: !1,
    loopPreventsSlide: !0,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0,
    _emitClasses: !1
  };

  function N(e, t) {
    return function (s = {}) {
      const a = Object.keys(s)[0],
        i = s[a];
      "object" == typeof i && null !== i ? (["navigation", "pagination", "scrollbar"].indexOf(a) >= 0 && !0 === e[a] && (e[a] = {
        auto: !0
      }), a in e && "enabled" in i ? (!0 === e[a] && (e[a] = {
        enabled: !0
      }), "object" != typeof e[a] || "enabled" in e[a] || (e[a].enabled = !0), e[a] || (e[a] = {
        enabled: !1
      }), f(t, s)) : f(t, s)) : f(t, s)
    }
  }

  const B = {
      eventsEmitter: C,
      update: {
        updateSize: function () {
          const e = this;
          let t, s;
          const a = e.$el;
          t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : a[0].clientWidth, s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : a[0].clientHeight, 0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt(a.css("padding-left") || 0, 10) - parseInt(a.css("padding-right") || 0, 10), s = s - parseInt(a.css("padding-top") || 0, 10) - parseInt(a.css("padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(s) && (s = 0), Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s
          }))
        },
        updateSlides: function () {
          const e = this;

          function t(t) {
            return e.isHorizontal() ? t : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom"
            } [t]
          }

          function s(e, s) {
            return parseFloat(e.getPropertyValue(t(s)) || 0)
          }

          const a = e.params,
            {
              $wrapperEl: i,
              size: r,
              rtlTranslate: n,
              wrongRTL: l
            } = e,
            o = e.virtual && a.virtual.enabled,
            d = o ? e.virtual.slides.length : e.slides.length,
            c = i.children(`.${e.params.slideClass}`),
            p = o ? e.virtual.slides.length : c.length;
          let u = [];
          const h = [],
            m = [];
          let f = a.slidesOffsetBefore;
          "function" == typeof f && (f = a.slidesOffsetBefore.call(e));
          let v = a.slidesOffsetAfter;
          "function" == typeof v && (v = a.slidesOffsetAfter.call(e));
          const w = e.snapGrid.length,
            b = e.slidesGrid.length;
          let x = a.spaceBetween,
            y = -f,
            E = 0,
            T = 0;
          if (void 0 === r) return;
          "string" == typeof x && x.indexOf("%") >= 0 && (x = parseFloat(x.replace("%", "")) / 100 * r), e.virtualSize = -x, n ? c.css({
            marginLeft: "",
            marginBottom: "",
            marginTop: ""
          }) : c.css({
            marginRight: "",
            marginBottom: "",
            marginTop: ""
          }), a.centeredSlides && a.cssMode && (g(e.wrapperEl, "--swiper-centered-offset-before", ""), g(e.wrapperEl, "--swiper-centered-offset-after", ""));
          const C = a.grid && a.grid.rows > 1 && e.grid;
          let $;
          C && e.grid.initSlides(p);
          const S = "auto" === a.slidesPerView && a.breakpoints && Object.keys(a.breakpoints).filter((e => void 0 !== a.breakpoints[e].slidesPerView)).length > 0;
          for (let i = 0; i < p; i += 1) {
            $ = 0;
            const n = c.eq(i);
            if (C && e.grid.updateSlide(i, n, p, t), "none" !== n.css("display")) {
              if ("auto" === a.slidesPerView) {
                S && (c[i].style[t("width")] = "");
                const r = getComputedStyle(n[0]),
                  l = n[0].style.transform,
                  o = n[0].style.webkitTransform;
                if (l && (n[0].style.transform = "none"), o && (n[0].style.webkitTransform = "none"), a.roundLengths) $ = e.isHorizontal() ? n.outerWidth(!0) : n.outerHeight(!0);
                else {
                  const e = s(r, "width"),
                    t = s(r, "padding-left"),
                    a = s(r, "padding-right"),
                    i = s(r, "margin-left"),
                    l = s(r, "margin-right"),
                    o = r.getPropertyValue("box-sizing");
                  if (o && "border-box" === o) $ = e + i + l;
                  else {
                    const {
                      clientWidth: s,
                      offsetWidth: r
                    } = n[0];
                    $ = e + t + a + i + l + (r - s)
                  }
                }
                l && (n[0].style.transform = l), o && (n[0].style.webkitTransform = o), a.roundLengths && ($ = Math.floor($))
              } else $ = (r - (a.slidesPerView - 1) * x) / a.slidesPerView, a.roundLengths && ($ = Math.floor($)), c[i] && (c[i].style[t("width")] = `${$}px`);
              c[i] && (c[i].swiperSlideSize = $), m.push($), a.centeredSlides ? (y = y + $ / 2 + E / 2 + x, 0 === E && 0 !== i && (y = y - r / 2 - x), 0 === i && (y = y - r / 2 - x), Math.abs(y) < .001 && (y = 0), a.roundLengths && (y = Math.floor(y)), T % a.slidesPerGroup == 0 && u.push(y), h.push(y)) : (a.roundLengths && (y = Math.floor(y)), (T - Math.min(e.params.slidesPerGroupSkip, T)) % e.params.slidesPerGroup == 0 && u.push(y), h.push(y), y = y + $ + x), e.virtualSize += $ + x, E = $, T += 1
            }
          }
          if (e.virtualSize = Math.max(e.virtualSize, r) + v, n && l && ("slide" === a.effect || "coverflow" === a.effect) && i.css({
              width: `${e.virtualSize + a.spaceBetween}px`
            }), a.setWrapperSize && i.css({
              [t("width")]: `${e.virtualSize + a.spaceBetween}px`
            }), C && e.grid.updateWrapperSize($, u, t), !a.centeredSlides) {
            const t = [];
            for (let s = 0; s < u.length; s += 1) {
              let i = u[s];
              a.roundLengths && (i = Math.floor(i)), u[s] <= e.virtualSize - r && t.push(i)
            }
            u = t, Math.floor(e.virtualSize - r) - Math.floor(u[u.length - 1]) > 1 && u.push(e.virtualSize - r)
          }
          if (0 === u.length && (u = [0]), 0 !== a.spaceBetween) {
            const s = e.isHorizontal() && n ? "marginLeft" : t("marginRight");
            c.filter(((e, t) => !a.cssMode || t !== c.length - 1)).css({
              [s]: `${x}px`
            })
          }
          if (a.centeredSlides && a.centeredSlidesBounds) {
            let e = 0;
            m.forEach((t => {
              e += t + (a.spaceBetween ? a.spaceBetween : 0)
            })), e -= a.spaceBetween;
            const t = e - r;
            u = u.map((e => e < 0 ? -f : e > t ? t + v : e))
          }
          if (a.centerInsufficientSlides) {
            let e = 0;
            if (m.forEach((t => {
                e += t + (a.spaceBetween ? a.spaceBetween : 0)
              })), e -= a.spaceBetween, e < r) {
              const t = (r - e) / 2;
              u.forEach(((e, s) => {
                u[s] = e - t
              })), h.forEach(((e, s) => {
                h[s] = e + t
              }))
            }
          }
          if (Object.assign(e, {
              slides: c,
              snapGrid: u,
              slidesGrid: h,
              slidesSizesGrid: m
            }), a.centeredSlides && a.cssMode && !a.centeredSlidesBounds) {
            g(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"), g(e.wrapperEl, "--swiper-centered-offset-after", e.size / 2 - m[m.length - 1] / 2 + "px");
            const t = -e.snapGrid[0],
              s = -e.slidesGrid[0];
            e.snapGrid = e.snapGrid.map((e => e + t)), e.slidesGrid = e.slidesGrid.map((e => e + s))
          }
          p !== d && e.emit("slidesLengthChange"), u.length !== w && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), h.length !== b && e.emit("slidesGridLengthChange"), a.watchSlidesProgress && e.updateSlidesOffset()
        },
        updateAutoHeight: function (e) {
          const t = this,
            s = [],
            a = t.virtual && t.params.virtual.enabled;
          let i, r = 0;
          "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
          const n = e => a ? t.slides.filter((t => parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e))[0] : t.slides.eq(e)[0];
          if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
            if (t.params.centeredSlides) t.visibleSlides.each((e => {
              s.push(e)
            }));
            else
              for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
                const e = t.activeIndex + i;
                if (e > t.slides.length && !a) break;
                s.push(n(e))
              } else s.push(n(t.activeIndex));
          for (i = 0; i < s.length; i += 1)
            if (void 0 !== s[i]) {
              const e = s[i].offsetHeight;
              r = e > r ? e : r
            }
          r && t.$wrapperEl.css("height", `${r}px`)
        },
        updateSlidesOffset: function () {
          const e = this,
            t = e.slides;
          for (let s = 0; s < t.length; s += 1) t[s].swiperSlideOffset = e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop
        },
        updateSlidesProgress: function (e = this && this.translate || 0) {
          const t = this,
            s = t.params,
            {
              slides: a,
              rtlTranslate: i,
              snapGrid: r
            } = t;
          if (0 === a.length) return;
          void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset();
          let n = -e;
          i && (n = e), a.removeClass(s.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
          for (let e = 0; e < a.length; e += 1) {
            const l = a[e];
            let o = l.swiperSlideOffset;
            s.cssMode && s.centeredSlides && (o -= a[0].swiperSlideOffset);
            const d = (n + (s.centeredSlides ? t.minTranslate() : 0) - o) / (l.swiperSlideSize + s.spaceBetween),
              c = (n - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - o) / (l.swiperSlideSize + s.spaceBetween),
              p = -(n - o),
              u = p + t.slidesSizesGrid[e];
            (p >= 0 && p < t.size - 1 || u > 1 && u <= t.size || p <= 0 && u >= t.size) && (t.visibleSlides.push(l), t.visibleSlidesIndexes.push(e), a.eq(e).addClass(s.slideVisibleClass)), l.progress = i ? -d : d, l.originalProgress = i ? -c : c
          }
          t.visibleSlides = d(t.visibleSlides)
        },
        updateProgress: function (e) {
          const t = this;
          if (void 0 === e) {
            const s = t.rtlTranslate ? -1 : 1;
            e = t && t.translate && t.translate * s || 0
          }
          const s = t.params,
            a = t.maxTranslate() - t.minTranslate();
          let {
            progress: i,
            isBeginning: r,
            isEnd: n
          } = t;
          const l = r,
            o = n;
          0 === a ? (i = 0, r = !0, n = !0) : (i = (e - t.minTranslate()) / a, r = i <= 0, n = i >= 1), Object.assign(t, {
            progress: i,
            isBeginning: r,
            isEnd: n
          }), (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e), r && !l && t.emit("reachBeginning toEdge"), n && !o && t.emit("reachEnd toEdge"), (l && !r || o && !n) && t.emit("fromEdge"), t.emit("progress", i)
        },
        updateSlidesClasses: function () {
          const e = this,
            {
              slides: t,
              params: s,
              $wrapperEl: a,
              activeIndex: i,
              realIndex: r
            } = e,
            n = e.virtual && s.virtual.enabled;
          let l;
          t.removeClass(`${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`), l = n ? e.$wrapperEl.find(`.${s.slideClass}[data-swiper-slide-index="${i}"]`) : t.eq(i), l.addClass(s.slideActiveClass), s.loop && (l.hasClass(s.slideDuplicateClass) ? a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass) : a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass));
          let o = l.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);
          s.loop && 0 === o.length && (o = t.eq(0), o.addClass(s.slideNextClass));
          let d = l.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);
          s.loop && 0 === d.length && (d = t.eq(-1), d.addClass(s.slidePrevClass)), s.loop && (o.hasClass(s.slideDuplicateClass) ? a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass) : a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass), d.hasClass(s.slideDuplicateClass) ? a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass) : a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass)), e.emitSlidesClasses()
        },
        updateActiveIndex: function (e) {
          const t = this,
            s = t.rtlTranslate ? t.translate : -t.translate,
            {
              slidesGrid: a,
              snapGrid: i,
              params: r,
              activeIndex: n,
              realIndex: l,
              snapIndex: o
            } = t;
          let d, c = e;
          if (void 0 === c) {
            for (let e = 0; e < a.length; e += 1) void 0 !== a[e + 1] ? s >= a[e] && s < a[e + 1] - (a[e + 1] - a[e]) / 2 ? c = e : s >= a[e] && s < a[e + 1] && (c = e + 1) : s >= a[e] && (c = e);
            r.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0)
          }
          if (i.indexOf(s) >= 0) d = i.indexOf(s);
          else {
            const e = Math.min(r.slidesPerGroupSkip, c);
            d = e + Math.floor((c - e) / r.slidesPerGroup)
          }
          if (d >= i.length && (d = i.length - 1), c === n) return void(d !== o && (t.snapIndex = d, t.emit("snapIndexChange")));
          const p = parseInt(t.slides.eq(c).attr("data-swiper-slide-index") || c, 10);
          Object.assign(t, {
            snapIndex: d,
            realIndex: p,
            previousIndex: n,
            activeIndex: c
          }), t.emit("activeIndexChange"), t.emit("snapIndexChange"), l !== p && t.emit("realIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange")
        },
        updateClickedSlide: function (e) {
          const t = this,
            s = t.params,
            a = d(e.target).closest(`.${s.slideClass}`)[0];
          let i, r = !1;
          if (a)
            for (let e = 0; e < t.slides.length; e += 1)
              if (t.slides[e] === a) {
                r = !0, i = e;
                break
              }
          if (!a || !r) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
          t.clickedSlide = a, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(d(a).attr("data-swiper-slide-index"), 10) : t.clickedIndex = i, s.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
        }
      },
      translate: {
        getTranslate: function (e = (this.isHorizontal() ? "x" : "y")) {
          const {
            params: t,
            rtlTranslate: s,
            translate: a,
            $wrapperEl: i
          } = this;
          if (t.virtualTranslate) return s ? -a : a;
          if (t.cssMode) return a;
          let r = h(i[0], e);
          return s && (r = -r), r || 0
        },
        setTranslate: function (e, t) {
          const s = this,
            {
              rtlTranslate: a,
              params: i,
              $wrapperEl: r,
              wrapperEl: n,
              progress: l
            } = s;
          let o, d = 0,
            c = 0;
          s.isHorizontal() ? d = a ? -e : e : c = e, i.roundLengths && (d = Math.floor(d), c = Math.floor(c)), i.cssMode ? n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -d : -c : i.virtualTranslate || r.transform(`translate3d(${d}px, ${c}px, 0px)`), s.previousTranslate = s.translate, s.translate = s.isHorizontal() ? d : c;
          const p = s.maxTranslate() - s.minTranslate();
          o = 0 === p ? 0 : (e - s.minTranslate()) / p, o !== l && s.updateProgress(e), s.emit("setTranslate", s.translate, t)
        },
        minTranslate: function () {
          return -this.snapGrid[0]
        },
        maxTranslate: function () {
          return -this.snapGrid[this.snapGrid.length - 1]
        },
        translateTo: function (e = 0, t = this.params.speed, s = !0, a = !0, i) {
          const r = this,
            {
              params: n,
              wrapperEl: l
            } = r;
          if (r.animating && n.preventInteractionOnTransition) return !1;
          const o = r.minTranslate(),
            d = r.maxTranslate();
          let c;
          if (c = a && e > o ? o : a && e < d ? d : e, r.updateProgress(c), n.cssMode) {
            const e = r.isHorizontal();
            if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
            else {
              if (!r.support.smoothScroll) return v({
                swiper: r,
                targetPosition: -c,
                side: e ? "left" : "top"
              }), !0;
              l.scrollTo({
                [e ? "left" : "top"]: -c,
                behavior: "smooth"
              })
            }
            return !0
          }
          return 0 === t ? (r.setTransition(0), r.setTranslate(c), s && (r.emit("beforeTransitionStart", t, i), r.emit("transitionEnd"))) : (r.setTransition(t), r.setTranslate(c), s && (r.emit("beforeTransitionStart", t, i), r.emit("transitionStart")), r.animating || (r.animating = !0, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function (e) {
            r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, s && r.emit("transitionEnd"))
          }), r.$wrapperEl[0].addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd))), !0
        }
      },
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode || s.$wrapperEl.transition(e), s.emit("setTransition", e, t)
        },
        transitionStart: function (e = !0, t) {
          const s = this,
            {
              params: a
            } = s;
          a.cssMode || (a.autoHeight && s.updateAutoHeight(), $({
            swiper: s,
            runCallbacks: e,
            direction: t,
            step: "Start"
          }))
        },
        transitionEnd: function (e = !0, t) {
          const s = this,
            {
              params: a
            } = s;
          s.animating = !1, a.cssMode || (s.setTransition(0), $({
            swiper: s,
            runCallbacks: e,
            direction: t,
            step: "End"
          }))
        }
      },
      slide: {
        slideTo: function (e = 0, t = this.params.speed, s = !0, a, i) {
          if ("number" != typeof e && "string" != typeof e) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);
          if ("string" == typeof e) {
            const t = parseInt(e, 10);
            if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
            e = t
          }
          const r = this;
          let n = e;
          n < 0 && (n = 0);
          const {
            params: l,
            snapGrid: o,
            slidesGrid: d,
            previousIndex: c,
            activeIndex: p,
            rtlTranslate: u,
            wrapperEl: h,
            enabled: m
          } = r;
          if (r.animating && l.preventInteractionOnTransition || !m && !a && !i) return !1;
          const f = Math.min(r.params.slidesPerGroupSkip, n);
          let g = f + Math.floor((n - f) / r.params.slidesPerGroup);
          g >= o.length && (g = o.length - 1), (p || l.initialSlide || 0) === (c || 0) && s && r.emit("beforeSlideChangeStart");
          const w = -o[g];
          if (r.updateProgress(w), l.normalizeSlideIndex)
            for (let e = 0; e < d.length; e += 1) {
              const t = -Math.floor(100 * w),
                s = Math.floor(100 * d[e]),
                a = Math.floor(100 * d[e + 1]);
              void 0 !== d[e + 1] ? t >= s && t < a - (a - s) / 2 ? n = e : t >= s && t < a && (n = e + 1) : t >= s && (n = e)
            }
          if (r.initialized && n !== p) {
            if (!r.allowSlideNext && w < r.translate && w < r.minTranslate()) return !1;
            if (!r.allowSlidePrev && w > r.translate && w > r.maxTranslate() && (p || 0) !== n) return !1
          }
          let b;
          if (b = n > p ? "next" : n < p ? "prev" : "reset", u && -w === r.translate || !u && w === r.translate) return r.updateActiveIndex(n), l.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== l.effect && r.setTranslate(w), "reset" !== b && (r.transitionStart(s, b), r.transitionEnd(s, b)), !1;
          if (l.cssMode) {
            const e = r.isHorizontal(),
              s = u ? w : -w;
            if (0 === t) {
              const t = r.virtual && r.params.virtual.enabled;
              t && (r.wrapperEl.style.scrollSnapType = "none", r._immediateVirtual = !0), h[e ? "scrollLeft" : "scrollTop"] = s, t && requestAnimationFrame((() => {
                r.wrapperEl.style.scrollSnapType = "", r._swiperImmediateVirtual = !1
              }))
            } else {
              if (!r.support.smoothScroll) return v({
                swiper: r,
                targetPosition: s,
                side: e ? "left" : "top"
              }), !0;
              h.scrollTo({
                [e ? "left" : "top"]: s,
                behavior: "smooth"
              })
            }
            return !0
          }
          return 0 === t ? (r.setTransition(0), r.setTranslate(w), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, a), r.transitionStart(s, b), r.transitionEnd(s, b)) : (r.setTransition(t), r.setTranslate(w), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, a), r.transitionStart(s, b), r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function (e) {
            r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(s, b))
          }), r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd))), !0
        },
        slideToLoop: function (e = 0, t = this.params.speed, s = !0, a) {
          const i = this;
          let r = e;
          return i.params.loop && (r += i.loopedSlides), i.slideTo(r, t, s, a)
        },
        slideNext: function (e = this.params.speed, t = !0, s) {
          const a = this,
            {
              animating: i,
              enabled: r,
              params: n
            } = a;
          if (!r) return a;
          let l = n.slidesPerGroup;
          "auto" === n.slidesPerView && 1 === n.slidesPerGroup && n.slidesPerGroupAuto && (l = Math.max(a.slidesPerViewDynamic("current", !0), 1));
          const o = a.activeIndex < n.slidesPerGroupSkip ? 1 : l;
          if (n.loop) {
            if (i && n.loopPreventsSlide) return !1;
            a.loopFix(), a._clientLeft = a.$wrapperEl[0].clientLeft
          }
          return a.slideTo(a.activeIndex + o, e, t, s)
        },
        slidePrev: function (e = this.params.speed, t = !0, s) {
          const a = this,
            {
              params: i,
              animating: r,
              snapGrid: n,
              slidesGrid: l,
              rtlTranslate: o,
              enabled: d
            } = a;
          if (!d) return a;
          if (i.loop) {
            if (r && i.loopPreventsSlide) return !1;
            a.loopFix(), a._clientLeft = a.$wrapperEl[0].clientLeft
          }

          function c(e) {
            return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
          }

          const p = c(o ? a.translate : -a.translate),
            u = n.map((e => c(e)));
          let h = n[u.indexOf(p) - 1];
          if (void 0 === h && i.cssMode) {
            let e;
            n.forEach(((t, s) => {
              p >= t && (e = s)
            })), void 0 !== e && (h = n[e > 0 ? e - 1 : e])
          }
          let m = 0;
          return void 0 !== h && (m = l.indexOf(h), m < 0 && (m = a.activeIndex - 1), "auto" === i.slidesPerView && 1 === i.slidesPerGroup && i.slidesPerGroupAuto && (m = m - a.slidesPerViewDynamic("previous", !0) + 1, m = Math.max(m, 0))), a.slideTo(m, e, t, s)
        },
        slideReset: function (e = this.params.speed, t = !0, s) {
          return this.slideTo(this.activeIndex, e, t, s)
        },
        slideToClosest: function (e = this.params.speed, t = !0, s, a = .5) {
          const i = this;
          let r = i.activeIndex;
          const n = Math.min(i.params.slidesPerGroupSkip, r),
            l = n + Math.floor((r - n) / i.params.slidesPerGroup),
            o = i.rtlTranslate ? i.translate : -i.translate;
          if (o >= i.snapGrid[l]) {
            const e = i.snapGrid[l];
            o - e > (i.snapGrid[l + 1] - e) * a && (r += i.params.slidesPerGroup)
          } else {
            const e = i.snapGrid[l - 1];
            o - e <= (i.snapGrid[l] - e) * a && (r -= i.params.slidesPerGroup)
          }
          return r = Math.max(r, 0), r = Math.min(r, i.slidesGrid.length - 1), i.slideTo(r, e, t, s)
        },
        slideToClickedSlide: function () {
          const e = this,
            {
              params: t,
              $wrapperEl: s
            } = e,
            a = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
          let i, r = e.clickedIndex;
          if (t.loop) {
            if (e.animating) return;
            i = parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"), 10), t.centeredSlides ? r < e.loopedSlides - a / 2 || r > e.slides.length - e.loopedSlides + a / 2 ? (e.loopFix(), r = s.children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), p((() => {
              e.slideTo(r)
            }))) : e.slideTo(r) : r > e.slides.length - a ? (e.loopFix(), r = s.children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), p((() => {
              e.slideTo(r)
            }))) : e.slideTo(r)
          } else e.slideTo(r)
        }
      },
      loop: {
        loopCreate: function () {
          const e = this,
            t = a(),
            {
              params: s,
              $wrapperEl: i
            } = e,
            r = d(i.children()[0].parentNode);
          r.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
          let n = r.children(`.${s.slideClass}`);
          if (s.loopFillGroupWithBlank) {
            const e = s.slidesPerGroup - n.length % s.slidesPerGroup;
            if (e !== s.slidesPerGroup) {
              for (let a = 0; a < e; a += 1) {
                const e = d(t.createElement("div")).addClass(`${s.slideClass} ${s.slideBlankClass}`);
                r.append(e)
              }
              n = r.children(`.${s.slideClass}`)
            }
          }
          "auto" !== s.slidesPerView || s.loopedSlides || (s.loopedSlides = n.length), e.loopedSlides = Math.ceil(parseFloat(s.loopedSlides || s.slidesPerView, 10)), e.loopedSlides += s.loopAdditionalSlides, e.loopedSlides > n.length && (e.loopedSlides = n.length);
          const l = [],
            o = [];
          n.each(((t, s) => {
            const a = d(t);
            s < e.loopedSlides && o.push(t), s < n.length && s >= n.length - e.loopedSlides && l.push(t), a.attr("data-swiper-slide-index", s)
          }));
          for (let e = 0; e < o.length; e += 1) r.append(d(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
          for (let e = l.length - 1; e >= 0; e -= 1) r.prepend(d(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass))
        },
        loopFix: function () {
          const e = this;
          e.emit("beforeLoopFix");
          const {
            activeIndex: t,
            slides: s,
            loopedSlides: a,
            allowSlidePrev: i,
            allowSlideNext: r,
            snapGrid: n,
            rtlTranslate: l
          } = e;
          let o;
          e.allowSlidePrev = !0, e.allowSlideNext = !0;
          const d = -n[t] - e.getTranslate();
          if (t < a) {
            o = s.length - 3 * a + t, o += a;
            e.slideTo(o, 0, !1, !0) && 0 !== d && e.setTranslate((l ? -e.translate : e.translate) - d)
          } else if (t >= s.length - a) {
            o = -s.length + t + a, o += a;
            e.slideTo(o, 0, !1, !0) && 0 !== d && e.setTranslate((l ? -e.translate : e.translate) - d)
          }
          e.allowSlidePrev = i, e.allowSlideNext = r, e.emit("loopFix")
        },
        loopDestroy: function () {
          const {
            $wrapperEl: e,
            params: t,
            slides: s
          } = this;
          e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(), s.removeAttr("data-swiper-slide-index")
        }
      },
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (t.support.touch || !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return;
          const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          s.style.cursor = "move", s.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", s.style.cursor = e ? "-moz-grabbin" : "-moz-grab", s.style.cursor = e ? "grabbing" : "grab"
        },
        unsetGrabCursor: function () {
          const e = this;
          e.support.touch || e.params.watchOverflow && e.isLocked || e.params.cssMode || (e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "")
        }
      },
      events: {
        attachEvents: function () {
          const e = this,
            t = a(),
            {
              params: s,
              support: i
            } = e;
          e.onTouchStart = S.bind(e), e.onTouchMove = M.bind(e), e.onTouchEnd = P.bind(e), s.cssMode && (e.onScroll = O.bind(e)), e.onClick = z.bind(e), i.touch && !I && (t.addEventListener("touchstart", L), I = !0), A(e, "on")
        },
        detachEvents: function () {
          A(this, "off")
        }
      },
      breakpoints: {
        setBreakpoint: function () {
          const e = this,
            {
              activeIndex: t,
              initialized: s,
              loopedSlides: a = 0,
              params: i,
              $el: r
            } = e,
            n = i.breakpoints;
          if (!n || n && 0 === Object.keys(n).length) return;
          const l = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
          if (!l || e.currentBreakpoint === l) return;
          const o = (l in n ? n[l] : void 0) || e.originalParams,
            d = D(e, i),
            c = D(e, o),
            p = i.enabled;
          d && !c ? (r.removeClass(`${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`), e.emitContainerClasses()) : !d && c && (r.addClass(`${i.containerModifierClass}grid`), (o.grid.fill && "column" === o.grid.fill || !o.grid.fill && "column" === i.grid.fill) && r.addClass(`${i.containerModifierClass}grid-column`), e.emitContainerClasses());
          const u = o.direction && o.direction !== i.direction,
            h = i.loop && (o.slidesPerView !== i.slidesPerView || u);
          u && s && e.changeDirection(), f(e.params, o);
          const m = e.params.enabled;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev
          }), p && !m ? e.disable() : !p && m && e.enable(), e.currentBreakpoint = l, e.emit("_beforeBreakpoint", o), h && s && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - a + e.loopedSlides, 0, !1)), e.emit("breakpoint", o)
        },
        getBreakpoint: function (e, t = "window", s) {
          if (!e || "container" === t && !s) return;
          let a = !1;
          const i = r(),
            n = "window" === t ? i.innerHeight : s.clientHeight,
            l = Object.keys(e).map((e => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return {
                  value: n * t,
                  point: e
                }
              }
              return {
                value: e,
                point: e
              }
            }));
          l.sort(((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10)));
          for (let e = 0; e < l.length; e += 1) {
            const {
              point: r,
              value: n
            } = l[e];
            "window" === t ? i.matchMedia(`(min-width: ${n}px)`).matches && (a = r) : n <= s.clientWidth && (a = r)
          }
          return a || "max"
        }
      },
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            {
              isLocked: t,
              params: s
            } = e,
            {
              slidesOffsetBefore: a
            } = s;
          if (a) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * a;
            e.isLocked = e.size > s
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
        }
      },
      classes: {
        addClasses: function () {
          const e = this,
            {
              classNames: t,
              params: s,
              rtl: a,
              $el: i,
              device: r,
              support: n
            } = e,
            l = function (e, t) {
              const s = [];
              return e.forEach((e => {
                "object" == typeof e ? Object.keys(e).forEach((a => {
                  e[a] && s.push(t + a)
                })) : "string" == typeof e && s.push(t + e)
              })), s
            }(["initialized", s.direction, {
              "pointer-events": !n.touch
            }, {
              "free-mode": e.params.freeMode && s.freeMode.enabled
            }, {
              autoheight: s.autoHeight
            }, {
              rtl: a
            }, {
              grid: s.grid && s.grid.rows > 1
            }, {
              "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill
            }, {
              android: r.android
            }, {
              ios: r.ios
            }, {
              "css-mode": s.cssMode
            }, {
              centered: s.cssMode && s.centeredSlides
            }], s.containerModifierClass);
          t.push(...l), i.addClass([...t].join(" ")), e.emitContainerClasses()
        },
        removeClasses: function () {
          const {
            $el: e,
            classNames: t
          } = this;
          e.removeClass(t.join(" ")), this.emitContainerClasses()
        }
      },
      images: {
        loadImage: function (e, t, s, a, i, n) {
          const l = r();
          let o;

          function c() {
            n && n()
          }

          d(e).parent("picture")[0] || e.complete && i ? c() : t ? (o = new l.Image, o.onload = c, o.onerror = c, a && (o.sizes = a), s && (o.srcset = s), t && (o.src = t)) : c()
        },
        preloadImages: function () {
          const e = this;

          function t() {
            null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
          }

          e.imagesToLoad = e.$el.find("img");
          for (let s = 0; s < e.imagesToLoad.length; s += 1) {
            const a = e.imagesToLoad[s];
            e.loadImage(a, a.currentSrc || a.getAttribute("src"), a.srcset || a.getAttribute("srcset"), a.sizes || a.getAttribute("sizes"), !0, t)
          }
        }
      }
    },
    X = {};

  class H {
    constructor(...e) {
      let t, s;
      if (1 === e.length && e[0].constructor && "Object" === Object.prototype.toString.call(e[0]).slice(8, -1) ? s = e[0] : [t, s] = e, s || (s = {}), s = f({}, s), t && !s.el && (s.el = t), s.el && d(s.el).length > 1) {
        const e = [];
        return d(s.el).each((t => {
          const a = f({}, s, {
            el: t
          });
          e.push(new H(a))
        })), e
      }
      const a = this;
      a.__swiper__ = !0, a.support = y(), a.device = E({
        userAgent: s.userAgent
      }), a.browser = T(), a.eventsListeners = {}, a.eventsAnyListeners = [], a.modules = [...a.__modules__], s.modules && Array.isArray(s.modules) && a.modules.push(...s.modules);
      const i = {};
      a.modules.forEach((e => {
        e({
          swiper: a,
          extendParams: N(s, i),
          on: a.on.bind(a),
          once: a.once.bind(a),
          off: a.off.bind(a),
          emit: a.emit.bind(a)
        })
      }));
      const r = f({}, G, i);
      return a.params = f({}, r, X, s), a.originalParams = f({}, a.params), a.passedParams = f({}, s), a.params && a.params.on && Object.keys(a.params.on).forEach((e => {
        a.on(e, a.params.on[e])
      })), a.params && a.params.onAny && a.onAny(a.params.onAny), a.$ = d, Object.assign(a, {
        enabled: a.params.enabled,
        el: t,
        classNames: [],
        slides: d(),
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal: () => "horizontal" === a.params.direction,
        isVertical: () => "vertical" === a.params.direction,
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        allowSlideNext: a.params.allowSlideNext,
        allowSlidePrev: a.params.allowSlidePrev,
        touchEvents: function () {
          const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
            t = ["pointerdown", "pointermove", "pointerup"];
          return a.touchEventsTouch = {
            start: e[0],
            move: e[1],
            end: e[2],
            cancel: e[3]
          }, a.touchEventsDesktop = {
            start: t[0],
            move: t[1],
            end: t[2]
          }, a.support.touch || !a.params.simulateTouch ? a.touchEventsTouch : a.touchEventsDesktop
        }(),
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: a.params.focusableElements,
          lastClickTime: u(),
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          isTouchEvent: void 0,
          startMoving: void 0
        },
        allowClick: !0,
        allowTouchMove: a.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        },
        imagesToLoad: [],
        imagesLoaded: 0
      }), a.emit("_swiper"), a.params.init && a.init(), a
    }

    enable() {
      const e = this;
      e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"))
    }

    disable() {
      const e = this;
      e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"))
    }

    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const a = s.minTranslate(),
        i = (s.maxTranslate() - a) * e + a;
      s.translateTo(i, void 0 === t ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses()
    }

    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className.split(" ").filter((t => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass)));
      e.emit("_containerClasses", t.join(" "))
    }

    getSlideClasses(e) {
      const t = this;
      return e.className.split(" ").filter((e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))).join(" ")
    }

    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.each((s => {
        const a = e.getSlideClasses(s);
        t.push({
          slideEl: s,
          classNames: a
        }), e.emit("_slideClass", s, a)
      })), e.emit("_slideClasses", t)
    }

    slidesPerViewDynamic(e = "current", t = !1) {
      const {
        params: s,
        slides: a,
        slidesGrid: i,
        slidesSizesGrid: r,
        size: n,
        activeIndex: l
      } = this;
      let o = 1;
      if (s.centeredSlides) {
        let e, t = a[l].swiperSlideSize;
        for (let s = l + 1; s < a.length; s += 1) a[s] && !e && (t += a[s].swiperSlideSize, o += 1, t > n && (e = !0));
        for (let s = l - 1; s >= 0; s -= 1) a[s] && !e && (t += a[s].swiperSlideSize, o += 1, t > n && (e = !0))
      } else if ("current" === e)
        for (let e = l + 1; e < a.length; e += 1) {
          (t ? i[e] + r[e] - i[l] < n : i[e] - i[l] < n) && (o += 1)
        } else
          for (let e = l - 1; e >= 0; e -= 1) {
            i[l] - i[e] < n && (o += 1)
          }
      return o
    }

    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const {
        snapGrid: t,
        params: s
      } = e;

      function a() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses()
      }

      let i;
      s.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode && e.params.freeMode.enabled ? (a(), e.params.autoHeight && e.updateAutoHeight()) : (i = ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), i || a()), s.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
    }

    changeDirection(e, t = !0) {
      const s = this,
        a = s.params.direction;
      return e || (e = "horizontal" === a ? "vertical" : "horizontal"), e === a || "horizontal" !== e && "vertical" !== e || (s.$el.removeClass(`${s.params.containerModifierClass}${a}`).addClass(`${s.params.containerModifierClass}${e}`), s.emitContainerClasses(), s.params.direction = e, s.slides.each((t => {
        "vertical" === e ? t.style.width = "" : t.style.height = ""
      })), s.emit("changeDirection"), t && s.update()), s
    }

    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      const s = d(e || t.params.el);
      if (!(e = s[0])) return !1;
      e.swiper = t;
      const i = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let r = (() => {
        if (e && e.shadowRoot && e.shadowRoot.querySelector) {
          const t = d(e.shadowRoot.querySelector(i()));
          return t.children = e => s.children(e), t
        }
        return s.children(i())
      })();
      if (0 === r.length && t.params.createElements) {
        const e = a().createElement("div");
        r = d(e), e.className = t.params.wrapperClass, s.append(e), s.children(`.${t.params.slideClass}`).each((e => {
          r.append(e)
        }))
      }
      return Object.assign(t, {
        $el: s,
        el: e,
        $wrapperEl: r,
        wrapperEl: r[0],
        mounted: !0,
        rtl: "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
        rtlTranslate: "horizontal" === t.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
        wrongRTL: "-webkit-box" === r.css("display")
      }), !0
    }

    init(e) {
      const t = this;
      if (t.initialized) return t;
      return !1 === t.mount(e) || (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.params.loop && t.loopCreate(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.preloadImages && t.preloadImages(), t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.attachEvents(), t.initialized = !0, t.emit("init"), t.emit("afterInit")), t
    }

    destroy(e = !0, t = !0) {
      const s = this,
        {
          params: a,
          $el: i,
          $wrapperEl: r,
          slides: n
        } = s;
      return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), a.loop && s.loopDestroy(), t && (s.removeClasses(), i.removeAttr("style"), r.removeAttr("style"), n && n.length && n.removeClass([a.slideVisibleClass, a.slideActiveClass, a.slideNextClass, a.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), s.emit("destroy"), Object.keys(s.eventsListeners).forEach((e => {
        s.off(e)
      })), !1 !== e && (s.$el[0].swiper = null, function (e) {
        const t = e;
        Object.keys(t).forEach((e => {
          try {
            t[e] = null
          } catch (e) {}
          try {
            delete t[e]
          } catch (e) {}
        }))
      }(s)), s.destroyed = !0), null
    }

    static extendDefaults(e) {
      f(X, e)
    }

    static get extendedDefaults() {
      return X
    }

    static get defaults() {
      return G
    }

    static installModule(e) {
      H.prototype.__modules__ || (H.prototype.__modules__ = []);
      const t = H.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e)
    }

    static use(e) {
      return Array.isArray(e) ? (e.forEach((e => H.installModule(e))), H) : (H.installModule(e), H)
    }
  }

  function Y(e, t, s, i) {
    const r = a();
    return e.params.createElements && Object.keys(i).forEach((a => {
      if (!s[a] && !0 === s.auto) {
        let n = e.$el.children(`.${i[a]}`)[0];
        n || (n = r.createElement("div"), n.className = i[a], e.$el.append(n)), s[a] = n, t[a] = n
      }
    })), s
  }

  function W(e = "") {
    return `.${e.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")}`
  }

  function R(e) {
    const t = this,
      {
        $wrapperEl: s,
        params: a
      } = t;
    if (a.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
      for (let t = 0; t < e.length; t += 1) e[t] && s.append(e[t]);
    else s.append(e);
    a.loop && t.loopCreate(), a.observer || t.update()
  }

  function j(e) {
    const t = this,
      {
        params: s,
        $wrapperEl: a,
        activeIndex: i
      } = t;
    s.loop && t.loopDestroy();
    let r = i + 1;
    if ("object" == typeof e && "length" in e) {
      for (let t = 0; t < e.length; t += 1) e[t] && a.prepend(e[t]);
      r = i + e.length
    } else a.prepend(e);
    s.loop && t.loopCreate(), s.observer || t.update(), t.slideTo(r, 0, !1)
  }

  function _(e, t) {
    const s = this,
      {
        $wrapperEl: a,
        params: i,
        activeIndex: r
      } = s;
    let n = r;
    i.loop && (n -= s.loopedSlides, s.loopDestroy(), s.slides = a.children(`.${i.slideClass}`));
    const l = s.slides.length;
    if (e <= 0) return void s.prependSlide(t);
    if (e >= l) return void s.appendSlide(t);
    let o = n > e ? n + 1 : n;
    const d = [];
    for (let t = l - 1; t >= e; t -= 1) {
      const e = s.slides.eq(t);
      e.remove(), d.unshift(e)
    }
    if ("object" == typeof t && "length" in t) {
      for (let e = 0; e < t.length; e += 1) t[e] && a.append(t[e]);
      o = n > e ? n + t.length : n
    } else a.append(t);
    for (let e = 0; e < d.length; e += 1) a.append(d[e]);
    i.loop && s.loopCreate(), i.observer || s.update(), i.loop ? s.slideTo(o + s.loopedSlides, 0, !1) : s.slideTo(o, 0, !1)
  }

  function V(e) {
    const t = this,
      {
        params: s,
        $wrapperEl: a,
        activeIndex: i
      } = t;
    let r = i;
    s.loop && (r -= t.loopedSlides, t.loopDestroy(), t.slides = a.children(`.${s.slideClass}`));
    let n, l = r;
    if ("object" == typeof e && "length" in e) {
      for (let s = 0; s < e.length; s += 1) n = e[s], t.slides[n] && t.slides.eq(n).remove(), n < l && (l -= 1);
      l = Math.max(l, 0)
    } else n = e, t.slides[n] && t.slides.eq(n).remove(), n < l && (l -= 1), l = Math.max(l, 0);
    s.loop && t.loopCreate(), s.observer || t.update(), s.loop ? t.slideTo(l + t.loopedSlides, 0, !1) : t.slideTo(l, 0, !1)
  }

  function q() {
    const e = this,
      t = [];
    for (let s = 0; s < e.slides.length; s += 1) t.push(s);
    e.removeSlide(t)
  }

  function F(e) {
    const {
      effect: t,
      swiper: s,
      on: a,
      setTranslate: i,
      setTransition: r,
      overwriteParams: n,
      perspective: l
    } = e;
    a("beforeInit", (() => {
      if (s.params.effect !== t) return;
      s.classNames.push(`${s.params.containerModifierClass}${t}`), l && l() && s.classNames.push(`${s.params.containerModifierClass}3d`);
      const e = n ? n() : {};
      Object.assign(s.params, e), Object.assign(s.originalParams, e)
    })), a("setTranslate", (() => {
      s.params.effect === t && i()
    })), a("setTransition", ((e, a) => {
      s.params.effect === t && r(a)
    }))
  }

  function U(e, t) {
    return e.transformEl ? t.find(e.transformEl).css({
      "backface-visibility": "hidden",
      "-webkit-backface-visibility": "hidden"
    }) : t
  }

  function K({
    swiper: e,
    duration: t,
    transformEl: s,
    allSlides: a
  }) {
    const {
      slides: i,
      activeIndex: r,
      $wrapperEl: n
    } = e;
    if (e.params.virtualTranslate && 0 !== t) {
      let t, l = !1;
      t = a ? s ? i.find(s) : i : s ? i.eq(r).find(s) : i.eq(r), t.transitionEnd((() => {
        if (l) return;
        if (!e || e.destroyed) return;
        l = !0, e.animating = !1;
        const t = ["webkitTransitionEnd", "transitionend"];
        for (let e = 0; e < t.length; e += 1) n.trigger(t[e])
      }))
    }
  }

  function Z(e, t, s) {
    const a = "swiper-slide-shadow" + (s ? `-${s}` : ""),
      i = e.transformEl ? t.find(e.transformEl) : t;
    let r = i.children(`.${a}`);
    return r.length || (r = d(`<div class="swiper-slide-shadow${s ? `-${s}` : ""}"></div>`), i.append(r)), r
  }

  Object.keys(B).forEach((e => {
    Object.keys(B[e]).forEach((t => {
      H.prototype[t] = B[e][t]
    }))
  })), H.use([function ({
    swiper: e,
    on: t,
    emit: s
  }) {
    const a = r();
    let i = null;
    const n = () => {
        e && !e.destroyed && e.initialized && (s("beforeResize"), s("resize"))
      },
      l = () => {
        e && !e.destroyed && e.initialized && s("orientationchange")
      };
    t("init", (() => {
      e.params.resizeObserver && void 0 !== a.ResizeObserver ? e && !e.destroyed && e.initialized && (i = new ResizeObserver((t => {
        const {
          width: s,
          height: a
        } = e;
        let i = s,
          r = a;
        t.forEach((({
          contentBoxSize: t,
          contentRect: s,
          target: a
        }) => {
          a && a !== e.el || (i = s ? s.width : (t[0] || t).inlineSize, r = s ? s.height : (t[0] || t).blockSize)
        })), i === s && r === a || n()
      })), i.observe(e.el)) : (a.addEventListener("resize", n), a.addEventListener("orientationchange", l))
    })), t("destroy", (() => {
      i && i.unobserve && e.el && (i.unobserve(e.el), i = null), a.removeEventListener("resize", n), a.removeEventListener("orientationchange", l)
    }))
  }, function ({
    swiper: e,
    extendParams: t,
    on: s,
    emit: a
  }) {
    const i = [],
      n = r(),
      l = (e, t = {}) => {
        const s = new(n.MutationObserver || n.WebkitMutationObserver)((e => {
          if (1 === e.length) return void a("observerUpdate", e[0]);
          const t = function () {
            a("observerUpdate", e[0])
          };
          n.requestAnimationFrame ? n.requestAnimationFrame(t) : n.setTimeout(t, 0)
        }));
        s.observe(e, {
          attributes: void 0 === t.attributes || t.attributes,
          childList: void 0 === t.childList || t.childList,
          characterData: void 0 === t.characterData || t.characterData
        }), i.push(s)
      };
    t({
      observer: !1,
      observeParents: !1,
      observeSlideChildren: !1
    }), s("init", (() => {
      if (e.params.observer) {
        if (e.params.observeParents) {
          const t = e.$el.parents();
          for (let e = 0; e < t.length; e += 1) l(t[e])
        }
        l(e.$el[0], {
          childList: e.params.observeSlideChildren
        }), l(e.$wrapperEl[0], {
          attributes: !1
        })
      }
    })), s("destroy", (() => {
      i.forEach((e => {
        e.disconnect()
      })), i.splice(0, i.length)
    }))
  }]);
  const J = [function ({
    swiper: e,
    extendParams: t,
    on: s
  }) {
    let a;

    function i(t, s) {
      const a = e.params.virtual;
      if (a.cache && e.virtual.cache[s]) return e.virtual.cache[s];
      const i = a.renderSlide ? d(a.renderSlide.call(e, t, s)) : d(`<div class="${e.params.slideClass}" data-swiper-slide-index="${s}">${t}</div>`);
      return i.attr("data-swiper-slide-index") || i.attr("data-swiper-slide-index", s), a.cache && (e.virtual.cache[s] = i), i
    }

    function r(t) {
      const {
        slidesPerView: s,
        slidesPerGroup: a,
        centeredSlides: r
      } = e.params, {
        addSlidesBefore: n,
        addSlidesAfter: l
      } = e.params.virtual, {
        from: o,
        to: d,
        slides: c,
        slidesGrid: p,
        offset: u
      } = e.virtual;
      e.params.cssMode || e.updateActiveIndex();
      const h = e.activeIndex || 0;
      let m, f, g;
      m = e.rtlTranslate ? "right" : e.isHorizontal() ? "left" : "top", r ? (f = Math.floor(s / 2) + a + l, g = Math.floor(s / 2) + a + n) : (f = s + (a - 1) + l, g = a + n);
      const v = Math.max((h || 0) - g, 0),
        w = Math.min((h || 0) + f, c.length - 1),
        b = (e.slidesGrid[v] || 0) - (e.slidesGrid[0] || 0);

      function x() {
        e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.lazy && e.params.lazy.enabled && e.lazy.load()
      }

      if (Object.assign(e.virtual, {
          from: v,
          to: w,
          offset: b,
          slidesGrid: e.slidesGrid
        }), o === v && d === w && !t) return e.slidesGrid !== p && b !== u && e.slides.css(m, `${b}px`), void e.updateProgress();
      if (e.params.virtual.renderExternal) return e.params.virtual.renderExternal.call(e, {
        offset: b,
        from: v,
        to: w,
        slides: function () {
          const e = [];
          for (let t = v; t <= w; t += 1) e.push(c[t]);
          return e
        }()
      }), void(e.params.virtual.renderExternalUpdate && x());
      const y = [],
        E = [];
      if (t) e.$wrapperEl.find(`.${e.params.slideClass}`).remove();
      else
        for (let t = o; t <= d; t += 1)(t < v || t > w) && e.$wrapperEl.find(`.${e.params.slideClass}[data-swiper-slide-index="${t}"]`).remove();
      for (let e = 0; e < c.length; e += 1) e >= v && e <= w && (void 0 === d || t ? E.push(e) : (e > d && E.push(e), e < o && y.push(e)));
      E.forEach((t => {
        e.$wrapperEl.append(i(c[t], t))
      })), y.sort(((e, t) => t - e)).forEach((t => {
        e.$wrapperEl.prepend(i(c[t], t))
      })), e.$wrapperEl.children(".swiper-slide").css(m, `${b}px`), x()
    }

    t({
      virtual: {
        enabled: !1,
        slides: [],
        cache: !0,
        renderSlide: null,
        renderExternal: null,
        renderExternalUpdate: !0,
        addSlidesBefore: 0,
        addSlidesAfter: 0
      }
    }), e.virtual = {
      cache: {},
      from: void 0,
      to: void 0,
      slides: [],
      offset: 0,
      slidesGrid: []
    }, s("beforeInit", (() => {
      e.params.virtual.enabled && (e.virtual.slides = e.params.virtual.slides, e.classNames.push(`${e.params.containerModifierClass}virtual`), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0, e.params.initialSlide || r())
    })), s("setTranslate", (() => {
      e.params.virtual.enabled && (e.params.cssMode && !e._immediateVirtual ? (clearTimeout(a), a = setTimeout((() => {
        r()
      }), 100)) : r())
    })), s("init update resize", (() => {
      e.params.virtual.enabled && e.params.cssMode && g(e.wrapperEl, "--swiper-virtual-size", `${e.virtualSize}px`)
    })), Object.assign(e.virtual, {
      appendSlide: function (t) {
        if ("object" == typeof t && "length" in t)
          for (let s = 0; s < t.length; s += 1) t[s] && e.virtual.slides.push(t[s]);
        else e.virtual.slides.push(t);
        r(!0)
      },
      prependSlide: function (t) {
        const s = e.activeIndex;
        let a = s + 1,
          i = 1;
        if (Array.isArray(t)) {
          for (let s = 0; s < t.length; s += 1) t[s] && e.virtual.slides.unshift(t[s]);
          a = s + t.length, i = t.length
        } else e.virtual.slides.unshift(t);
        if (e.params.virtual.cache) {
          const t = e.virtual.cache,
            s = {};
          Object.keys(t).forEach((e => {
            const a = t[e],
              r = a.attr("data-swiper-slide-index");
            r && a.attr("data-swiper-slide-index", parseInt(r, 10) + i), s[parseInt(e, 10) + i] = a
          })), e.virtual.cache = s
        }
        r(!0), e.slideTo(a, 0)
      },
      removeSlide: function (t) {
        if (null == t) return;
        let s = e.activeIndex;
        if (Array.isArray(t))
          for (let a = t.length - 1; a >= 0; a -= 1) e.virtual.slides.splice(t[a], 1), e.params.virtual.cache && delete e.virtual.cache[t[a]], t[a] < s && (s -= 1), s = Math.max(s, 0);
        else e.virtual.slides.splice(t, 1), e.params.virtual.cache && delete e.virtual.cache[t], t < s && (s -= 1), s = Math.max(s, 0);
        r(!0), e.slideTo(s, 0)
      },
      removeAllSlides: function () {
        e.virtual.slides = [], e.params.virtual.cache && (e.virtual.cache = {}), r(!0), e.slideTo(0, 0)
      },
      update: r
    })
  }, function ({
    swiper: e,
    extendParams: t,
    on: s,
    emit: i
  }) {
    const n = a(),
      l = r();

    function o(t) {
      if (!e.enabled) return;
      const {
        rtlTranslate: s
      } = e;
      let a = t;
      a.originalEvent && (a = a.originalEvent);
      const r = a.keyCode || a.charCode,
        o = e.params.keyboard.pageUpDown,
        d = o && 33 === r,
        c = o && 34 === r,
        p = 37 === r,
        u = 39 === r,
        h = 38 === r,
        m = 40 === r;
      if (!e.allowSlideNext && (e.isHorizontal() && u || e.isVertical() && m || c)) return !1;
      if (!e.allowSlidePrev && (e.isHorizontal() && p || e.isVertical() && h || d)) return !1;
      if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || n.activeElement && n.activeElement.nodeName && ("input" === n.activeElement.nodeName.toLowerCase() || "textarea" === n.activeElement.nodeName.toLowerCase()))) {
        if (e.params.keyboard.onlyInViewport && (d || c || p || u || h || m)) {
          let t = !1;
          if (e.$el.parents(`.${e.params.slideClass}`).length > 0 && 0 === e.$el.parents(`.${e.params.slideActiveClass}`).length) return;
          const a = e.$el,
            i = a[0].clientWidth,
            r = a[0].clientHeight,
            n = l.innerWidth,
            o = l.innerHeight,
            d = e.$el.offset();
          s && (d.left -= e.$el[0].scrollLeft);
          const c = [
            [d.left, d.top],
            [d.left + i, d.top],
            [d.left, d.top + r],
            [d.left + i, d.top + r]
          ];
          for (let e = 0; e < c.length; e += 1) {
            const s = c[e];
            if (s[0] >= 0 && s[0] <= n && s[1] >= 0 && s[1] <= o) {
              if (0 === s[0] && 0 === s[1]) continue;
              t = !0
            }
          }
          if (!t) return
        }
        e.isHorizontal() ? ((d || c || p || u) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), ((c || u) && !s || (d || p) && s) && e.slideNext(), ((d || p) && !s || (c || u) && s) && e.slidePrev()) : ((d || c || h || m) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), (c || m) && e.slideNext(), (d || h) && e.slidePrev()), i("keyPress", r)
      }
    }

    function c() {
      e.keyboard.enabled || (d(n).on("keydown", o), e.keyboard.enabled = !0)
    }

    function p() {
      e.keyboard.enabled && (d(n).off("keydown", o), e.keyboard.enabled = !1)
    }

    e.keyboard = {
      enabled: !1
    }, t({
      keyboard: {
        enabled: !1,
        onlyInViewport: !0,
        pageUpDown: !0
      }
    }), s("init", (() => {
      e.params.keyboard.enabled && c()
    })), s("destroy", (() => {
      e.keyboard.enabled && p()
    })), Object.assign(e.keyboard, {
      enable: c,
      disable: p
    })
  }, function ({
    swiper: e,
    extendParams: t,
    on: s,
    emit: a
  }) {
    const i = r();
    let n;
    t({
      mousewheel: {
        enabled: !1,
        releaseOnEdges: !1,
        invert: !1,
        forceToAxis: !1,
        sensitivity: 1,
        eventsTarget: "container",
        thresholdDelta: null,
        thresholdTime: null
      }
    }), e.mousewheel = {
      enabled: !1
    };
    let l, o = u();
    const c = [];

    function h() {
      e.enabled && (e.mouseEntered = !0)
    }

    function m() {
      e.enabled && (e.mouseEntered = !1)
    }

    function f(t) {
      return !(e.params.mousewheel.thresholdDelta && t.delta < e.params.mousewheel.thresholdDelta) && (!(e.params.mousewheel.thresholdTime && u() - o < e.params.mousewheel.thresholdTime) && (t.delta >= 6 && u() - o < 60 || (t.direction < 0 ? e.isEnd && !e.params.loop || e.animating || (e.slideNext(), a("scroll", t.raw)) : e.isBeginning && !e.params.loop || e.animating || (e.slidePrev(), a("scroll", t.raw)), o = (new i.Date).getTime(), !1)))
    }

    function g(t) {
      let s = t,
        i = !0;
      if (!e.enabled) return;
      const r = e.params.mousewheel;
      e.params.cssMode && s.preventDefault();
      let o = e.$el;
      if ("container" !== e.params.mousewheel.eventsTarget && (o = d(e.params.mousewheel.eventsTarget)), !e.mouseEntered && !o[0].contains(s.target) && !r.releaseOnEdges) return !0;
      s.originalEvent && (s = s.originalEvent);
      let h = 0;
      const m = e.rtlTranslate ? -1 : 1,
        g = function (e) {
          let t = 0,
            s = 0,
            a = 0,
            i = 0;
          return "detail" in e && (s = e.detail), "wheelDelta" in e && (s = -e.wheelDelta / 120), "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = s, s = 0), a = 10 * t, i = 10 * s, "deltaY" in e && (i = e.deltaY), "deltaX" in e && (a = e.deltaX), e.shiftKey && !a && (a = i, i = 0), (a || i) && e.deltaMode && (1 === e.deltaMode ? (a *= 40, i *= 40) : (a *= 800, i *= 800)), a && !t && (t = a < 1 ? -1 : 1), i && !s && (s = i < 1 ? -1 : 1), {
            spinX: t,
            spinY: s,
            pixelX: a,
            pixelY: i
          }
        }(s);
      if (r.forceToAxis)
        if (e.isHorizontal()) {
          if (!(Math.abs(g.pixelX) > Math.abs(g.pixelY))) return !0;
          h = -g.pixelX * m
        } else {
          if (!(Math.abs(g.pixelY) > Math.abs(g.pixelX))) return !0;
          h = -g.pixelY
        }
      else h = Math.abs(g.pixelX) > Math.abs(g.pixelY) ? -g.pixelX * m : -g.pixelY;
      if (0 === h) return !0;
      r.invert && (h = -h);
      let v = e.getTranslate() + h * r.sensitivity;
      if (v >= e.minTranslate() && (v = e.minTranslate()), v <= e.maxTranslate() && (v = e.maxTranslate()), i = !!e.params.loop || !(v === e.minTranslate() || v === e.maxTranslate()), i && e.params.nested && s.stopPropagation(), e.params.freeMode && e.params.freeMode.enabled) {
        const t = {
            time: u(),
            delta: Math.abs(h),
            direction: Math.sign(h)
          },
          i = l && t.time < l.time + 500 && t.delta <= l.delta && t.direction === l.direction;
        if (!i) {
          l = void 0, e.params.loop && e.loopFix();
          let o = e.getTranslate() + h * r.sensitivity;
          const d = e.isBeginning,
            u = e.isEnd;
          if (o >= e.minTranslate() && (o = e.minTranslate()), o <= e.maxTranslate() && (o = e.maxTranslate()), e.setTransition(0), e.setTranslate(o), e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses(), (!d && e.isBeginning || !u && e.isEnd) && e.updateSlidesClasses(), e.params.freeMode.sticky) {
            clearTimeout(n), n = void 0, c.length >= 15 && c.shift();
            const s = c.length ? c[c.length - 1] : void 0,
              a = c[0];
            if (c.push(t), s && (t.delta > s.delta || t.direction !== s.direction)) c.splice(0);
            else if (c.length >= 15 && t.time - a.time < 500 && a.delta - t.delta >= 1 && t.delta <= 6) {
              const s = h > 0 ? .8 : .2;
              l = t, c.splice(0), n = p((() => {
                e.slideToClosest(e.params.speed, !0, void 0, s)
              }), 0)
            }
            n || (n = p((() => {
              l = t, c.splice(0), e.slideToClosest(e.params.speed, !0, void 0, .5)
            }), 500))
          }
          if (i || a("scroll", s), e.params.autoplay && e.params.autoplayDisableOnInteraction && e.autoplay.stop(), o === e.minTranslate() || o === e.maxTranslate()) return !0
        }
      } else {
        const s = {
          time: u(),
          delta: Math.abs(h),
          direction: Math.sign(h),
          raw: t
        };
        c.length >= 2 && c.shift();
        const a = c.length ? c[c.length - 1] : void 0;
        if (c.push(s), a ? (s.direction !== a.direction || s.delta > a.delta || s.time > a.time + 150) && f(s) : f(s), function (t) {
            const s = e.params.mousewheel;
            if (t.direction < 0) {
              if (e.isEnd && !e.params.loop && s.releaseOnEdges) return !0
            } else if (e.isBeginning && !e.params.loop && s.releaseOnEdges) return !0;
            return !1
          }(s)) return !0
      }
      return s.preventDefault ? s.preventDefault() : s.returnValue = !1, !1
    }

    function v(t) {
      let s = e.$el;
      "container" !== e.params.mousewheel.eventsTarget && (s = d(e.params.mousewheel.eventsTarget)), s[t]("mouseenter", h), s[t]("mouseleave", m), s[t]("wheel", g)
    }

    function w() {
      return e.params.cssMode ? (e.wrapperEl.removeEventListener("wheel", g), !0) : !e.mousewheel.enabled && (v("on"), e.mousewheel.enabled = !0, !0)
    }

    function b() {
      return e.params.cssMode ? (e.wrapperEl.addEventListener(event, g), !0) : !!e.mousewheel.enabled && (v("off"), e.mousewheel.enabled = !1, !0)
    }

    s("init", (() => {
      !e.params.mousewheel.enabled && e.params.cssMode && b(), e.params.mousewheel.enabled && w()
    })), s("destroy", (() => {
      e.params.cssMode && w(), e.mousewheel.enabled && b()
    })), Object.assign(e.mousewheel, {
      enable: w,
      disable: b
    })
  }, function ({
    swiper: e,
    extendParams: t,
    on: s,
    emit: a
  }) {
    function i(t) {
      let s;
      return t && (s = d(t), e.params.uniqueNavElements && "string" == typeof t && s.length > 1 && 1 === e.$el.find(t).length && (s = e.$el.find(t))), s
    }

    function r(t, s) {
      const a = e.params.navigation;
      t && t.length > 0 && (t[s ? "addClass" : "removeClass"](a.disabledClass), t[0] && "BUTTON" === t[0].tagName && (t[0].disabled = s), e.params.watchOverflow && e.enabled && t[e.isLocked ? "addClass" : "removeClass"](a.lockClass))
    }

    function n() {
      if (e.params.loop) return;
      const {
        $nextEl: t,
        $prevEl: s
      } = e.navigation;
      r(s, e.isBeginning), r(t, e.isEnd)
    }

    function l(t) {
      t.preventDefault(), e.isBeginning && !e.params.loop || e.slidePrev()
    }

    function o(t) {
      t.preventDefault(), e.isEnd && !e.params.loop || e.slideNext()
    }

    function c() {
      const t = e.params.navigation;
      if (e.params.navigation = Y(e, e.originalParams.navigation, e.params.navigation, {
          nextEl: "swiper-button-next",
          prevEl: "swiper-button-prev"
        }), !t.nextEl && !t.prevEl) return;
      const s = i(t.nextEl),
        a = i(t.prevEl);
      s && s.length > 0 && s.on("click", o), a && a.length > 0 && a.on("click", l), Object.assign(e.navigation, {
        $nextEl: s,
        nextEl: s && s[0],
        $prevEl: a,
        prevEl: a && a[0]
      }), e.enabled || (s && s.addClass(t.lockClass), a && a.addClass(t.lockClass))
    }

    function p() {
      const {
        $nextEl: t,
        $prevEl: s
      } = e.navigation;
      t && t.length && (t.off("click", o), t.removeClass(e.params.navigation.disabledClass)), s && s.length && (s.off("click", l), s.removeClass(e.params.navigation.disabledClass))
    }

    t({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock"
      }
    }), e.navigation = {
      nextEl: null,
      $nextEl: null,
      prevEl: null,
      $prevEl: null
    }, s("init", (() => {
      c(), n()
    })), s("toEdge fromEdge lock unlock", (() => {
      n()
    })), s("destroy", (() => {
      p()
    })), s("enable disable", (() => {
      const {
        $nextEl: t,
        $prevEl: s
      } = e.navigation;
      t && t[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass), s && s[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass)
    })), s("click", ((t, s) => {
      const {
        $nextEl: i,
        $prevEl: r
      } = e.navigation, n = s.target;
      if (e.params.navigation.hideOnClick && !d(n).is(r) && !d(n).is(i)) {
        if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === n || e.pagination.el.contains(n))) return;
        let t;
        i ? t = i.hasClass(e.params.navigation.hiddenClass) : r && (t = r.hasClass(e.params.navigation.hiddenClass)), a(!0 === t ? "navigationShow" : "navigationHide"), i && i.toggleClass(e.params.navigation.hiddenClass), r && r.toggleClass(e.params.navigation.hiddenClass)
      }
    })), Object.assign(e.navigation, {
      update: n,
      init: c,
      destroy: p
    })
  }, function ({
    swiper: e,
    extendParams: t,
    on: s,
    emit: a
  }) {
    const i = "swiper-pagination";
    let r;
    t({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: e => e,
        formatFractionTotal: e => e,
        bulletClass: `${i}-bullet`,
        bulletActiveClass: `${i}-bullet-active`,
        modifierClass: `${i}-`,
        currentClass: `${i}-current`,
        totalClass: `${i}-total`,
        hiddenClass: `${i}-hidden`,
        progressbarFillClass: `${i}-progressbar-fill`,
        progressbarOppositeClass: `${i}-progressbar-opposite`,
        clickableClass: `${i}-clickable`,
        lockClass: `${i}-lock`,
        horizontalClass: `${i}-horizontal`,
        verticalClass: `${i}-vertical`
      }
    }), e.pagination = {
      el: null,
      $el: null,
      bullets: []
    };
    let n = 0;

    function l() {
      return !e.params.pagination.el || !e.pagination.el || !e.pagination.$el || 0 === e.pagination.$el.length
    }

    function o(t, s) {
      const {
        bulletActiveClass: a
      } = e.params.pagination;
      t[s]().addClass(`${a}-${s}`)[s]().addClass(`${a}-${s}-${s}`)
    }

    function c() {
      const t = e.rtl,
        s = e.params.pagination;
      if (l()) return;
      const i = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
        c = e.pagination.$el;
      let p;
      const u = e.params.loop ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
      if (e.params.loop ? (p = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup), p > i - 1 - 2 * e.loopedSlides && (p -= i - 2 * e.loopedSlides), p > u - 1 && (p -= u), p < 0 && "bullets" !== e.params.paginationType && (p = u + p)) : p = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === s.type && e.pagination.bullets && e.pagination.bullets.length > 0) {
        const a = e.pagination.bullets;
        let i, l, u;
        if (s.dynamicBullets && (r = a.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), c.css(e.isHorizontal() ? "width" : "height", r * (s.dynamicMainBullets + 4) + "px"), s.dynamicMainBullets > 1 && void 0 !== e.previousIndex && (n += p - e.previousIndex, n > s.dynamicMainBullets - 1 ? n = s.dynamicMainBullets - 1 : n < 0 && (n = 0)), i = p - n, l = i + (Math.min(a.length, s.dynamicMainBullets) - 1), u = (l + i) / 2), a.removeClass(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((e => `${s.bulletActiveClass}${e}`)).join(" ")), c.length > 1) a.each((e => {
          const t = d(e),
            a = t.index();
          a === p && t.addClass(s.bulletActiveClass), s.dynamicBullets && (a >= i && a <= l && t.addClass(`${s.bulletActiveClass}-main`), a === i && o(t, "prev"), a === l && o(t, "next"))
        }));
        else {
          const t = a.eq(p),
            r = t.index();
          if (t.addClass(s.bulletActiveClass), s.dynamicBullets) {
            const t = a.eq(i),
              n = a.eq(l);
            for (let e = i; e <= l; e += 1) a.eq(e).addClass(`${s.bulletActiveClass}-main`);
            if (e.params.loop)
              if (r >= a.length - s.dynamicMainBullets) {
                for (let e = s.dynamicMainBullets; e >= 0; e -= 1) a.eq(a.length - e).addClass(`${s.bulletActiveClass}-main`);
                a.eq(a.length - s.dynamicMainBullets - 1).addClass(`${s.bulletActiveClass}-prev`)
              } else o(t, "prev"), o(n, "next");
            else o(t, "prev"), o(n, "next")
          }
        }
        if (s.dynamicBullets) {
          const i = Math.min(a.length, s.dynamicMainBullets + 4),
            n = (r * i - r) / 2 - u * r,
            l = t ? "right" : "left";
          a.css(e.isHorizontal() ? l : "top", `${n}px`)
        }
      }
      if ("fraction" === s.type && (c.find(W(s.currentClass)).text(s.formatFractionCurrent(p + 1)), c.find(W(s.totalClass)).text(s.formatFractionTotal(u))), "progressbar" === s.type) {
        let t;
        t = s.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
        const a = (p + 1) / u;
        let i = 1,
          r = 1;
        "horizontal" === t ? i = a : r = a, c.find(W(s.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${i}) scaleY(${r})`).transition(e.params.speed)
      }
      "custom" === s.type && s.renderCustom ? (c.html(s.renderCustom(e, p + 1, u)), a("paginationRender", c[0])) : a("paginationUpdate", c[0]), e.params.watchOverflow && e.enabled && c[e.isLocked ? "addClass" : "removeClass"](s.lockClass)
    }

    function p() {
      const t = e.params.pagination;
      if (l()) return;
      const s = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
        i = e.pagination.$el;
      let r = "";
      if ("bullets" === t.type) {
        let a = e.params.loop ? Math.ceil((s - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
        e.params.freeMode && e.params.freeMode.enabled && !e.params.loop && a > s && (a = s);
        for (let s = 0; s < a; s += 1) t.renderBullet ? r += t.renderBullet.call(e, s, t.bulletClass) : r += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`;
        i.html(r), e.pagination.bullets = i.find(W(t.bulletClass))
      }
      "fraction" === t.type && (r = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`, i.html(r)), "progressbar" === t.type && (r = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : `<span class="${t.progressbarFillClass}"></span>`, i.html(r)), "custom" !== t.type && a("paginationRender", e.pagination.$el[0])
    }

    function u() {
      e.params.pagination = Y(e, e.originalParams.pagination, e.params.pagination, {
        el: "swiper-pagination"
      });
      const t = e.params.pagination;
      if (!t.el) return;
      let s = d(t.el);
      0 !== s.length && (e.params.uniqueNavElements && "string" == typeof t.el && s.length > 1 && (s = e.$el.find(t.el), s.length > 1 && (s = s.filter((t => d(t).parents(".swiper")[0] === e.el)))), "bullets" === t.type && t.clickable && s.addClass(t.clickableClass), s.addClass(t.modifierClass + t.type), s.addClass(t.modifierClass + e.params.direction), "bullets" === t.type && t.dynamicBullets && (s.addClass(`${t.modifierClass}${t.type}-dynamic`), n = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && s.addClass(t.progressbarOppositeClass), t.clickable && s.on("click", W(t.bulletClass), (function (t) {
        t.preventDefault();
        let s = d(this).index() * e.params.slidesPerGroup;
        e.params.loop && (s += e.loopedSlides), e.slideTo(s)
      })), Object.assign(e.pagination, {
        $el: s,
        el: s[0]
      }), e.enabled || s.addClass(t.lockClass))
    }

    function h() {
      const t = e.params.pagination;
      if (l()) return;
      const s = e.pagination.$el;
      s.removeClass(t.hiddenClass), s.removeClass(t.modifierClass + t.type), s.removeClass(t.modifierClass + e.params.direction), e.pagination.bullets && e.pagination.bullets.removeClass && e.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && s.off("click", W(t.bulletClass))
    }

    s("init", (() => {
      u(), p(), c()
    })), s("activeIndexChange", (() => {
      (e.params.loop || void 0 === e.snapIndex) && c()
    })), s("snapIndexChange", (() => {
      e.params.loop || c()
    })), s("slidesLengthChange", (() => {
      e.params.loop && (p(), c())
    })), s("snapGridLengthChange", (() => {
      e.params.loop || (p(), c())
    })), s("destroy", (() => {
      h()
    })), s("enable disable", (() => {
      const {
        $el: t
      } = e.pagination;
      t && t[e.enabled ? "removeClass" : "addClass"](e.params.pagination.lockClass)
    })), s("lock unlock", (() => {
      c()
    })), s("click", ((t, s) => {
      const i = s.target,
        {
          $el: r
        } = e.pagination;
      if (e.params.pagination.el && e.params.pagination.hideOnClick && r.length > 0 && !d(i).hasClass(e.params.pagination.bulletClass)) {
        if (e.navigation && (e.navigation.nextEl && i === e.navigation.nextEl || e.navigation.prevEl && i === e.navigation.prevEl)) return;
        const t = r.hasClass(e.params.pagination.hiddenClass);
        a(!0 === t ? "paginationShow" : "paginationHide"), r.toggleClass(e.params.pagination.hiddenClass)
      }
    })), Object.assign(e.pagination, {
      render: p,
      update: c,
      init: u,
      destroy: h
    })
  }, function ({
    swiper: e,
    extendParams: t,
    on: s,
    emit: i
  }) {
    const r = a();
    let n, l, o, c, u = !1,
      h = null,
      m = null;

    function f() {
      if (!e.params.scrollbar.el || !e.scrollbar.el) return;
      const {
        scrollbar: t,
        rtlTranslate: s,
        progress: a
      } = e, {
        $dragEl: i,
        $el: r
      } = t, n = e.params.scrollbar;
      let d = l,
        c = (o - l) * a;
      s ? (c = -c, c > 0 ? (d = l - c, c = 0) : -c + l > o && (d = o + c)) : c < 0 ? (d = l + c, c = 0) : c + l > o && (d = o - c), e.isHorizontal() ? (i.transform(`translate3d(${c}px, 0, 0)`), i[0].style.width = `${d}px`) : (i.transform(`translate3d(0px, ${c}px, 0)`), i[0].style.height = `${d}px`), n.hide && (clearTimeout(h), r[0].style.opacity = 1, h = setTimeout((() => {
        r[0].style.opacity = 0, r.transition(400)
      }), 1e3))
    }

    function g() {
      if (!e.params.scrollbar.el || !e.scrollbar.el) return;
      const {
        scrollbar: t
      } = e, {
        $dragEl: s,
        $el: a
      } = t;
      s[0].style.width = "", s[0].style.height = "", o = e.isHorizontal() ? a[0].offsetWidth : a[0].offsetHeight, c = e.size / (e.virtualSize + e.params.slidesOffsetBefore - (e.params.centeredSlides ? e.snapGrid[0] : 0)), l = "auto" === e.params.scrollbar.dragSize ? o * c : parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? s[0].style.width = `${l}px` : s[0].style.height = `${l}px`, a[0].style.display = c >= 1 ? "none" : "", e.params.scrollbar.hide && (a[0].style.opacity = 0), e.params.watchOverflow && e.enabled && t.$el[e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass)
    }

    function v(t) {
      return e.isHorizontal() ? "touchstart" === t.type || "touchmove" === t.type ? t.targetTouches[0].clientX : t.clientX : "touchstart" === t.type || "touchmove" === t.type ? t.targetTouches[0].clientY : t.clientY
    }

    function w(t) {
      const {
        scrollbar: s,
        rtlTranslate: a
      } = e, {
        $el: i
      } = s;
      let r;
      r = (v(t) - i.offset()[e.isHorizontal() ? "left" : "top"] - (null !== n ? n : l / 2)) / (o - l), r = Math.max(Math.min(r, 1), 0), a && (r = 1 - r);
      const d = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * r;
      e.updateProgress(d), e.setTranslate(d), e.updateActiveIndex(), e.updateSlidesClasses()
    }

    function b(t) {
      const s = e.params.scrollbar,
        {
          scrollbar: a,
          $wrapperEl: r
        } = e,
        {
          $el: l,
          $dragEl: o
        } = a;
      u = !0, n = t.target === o[0] || t.target === o ? v(t) - t.target.getBoundingClientRect()[e.isHorizontal() ? "left" : "top"] : null, t.preventDefault(), t.stopPropagation(), r.transition(100), o.transition(100), w(t), clearTimeout(m), l.transition(0), s.hide && l.css("opacity", 1), e.params.cssMode && e.$wrapperEl.css("scroll-snap-type", "none"), i("scrollbarDragStart", t)
    }

    function x(t) {
      const {
        scrollbar: s,
        $wrapperEl: a
      } = e, {
        $el: r,
        $dragEl: n
      } = s;
      u && (t.preventDefault ? t.preventDefault() : t.returnValue = !1, w(t), a.transition(0), r.transition(0), n.transition(0), i("scrollbarDragMove", t))
    }

    function y(t) {
      const s = e.params.scrollbar,
        {
          scrollbar: a,
          $wrapperEl: r
        } = e,
        {
          $el: n
        } = a;
      u && (u = !1, e.params.cssMode && (e.$wrapperEl.css("scroll-snap-type", ""), r.transition("")), s.hide && (clearTimeout(m), m = p((() => {
        n.css("opacity", 0), n.transition(400)
      }), 1e3)), i("scrollbarDragEnd", t), s.snapOnRelease && e.slideToClosest())
    }

    function E(t) {
      const {
        scrollbar: s,
        touchEventsTouch: a,
        touchEventsDesktop: i,
        params: n,
        support: l
      } = e, o = s.$el[0],
        d = !(!l.passiveListener || !n.passiveListeners) && {
          passive: !1,
          capture: !1
        },
        c = !(!l.passiveListener || !n.passiveListeners) && {
          passive: !0,
          capture: !1
        };
      if (!o) return;
      const p = "on" === t ? "addEventListener" : "removeEventListener";
      l.touch ? (o[p](a.start, b, d), o[p](a.move, x, d), o[p](a.end, y, c)) : (o[p](i.start, b, d), r[p](i.move, x, d), r[p](i.end, y, c))
    }

    function T() {
      const {
        scrollbar: t,
        $el: s
      } = e;
      e.params.scrollbar = Y(e, e.originalParams.scrollbar, e.params.scrollbar, {
        el: "swiper-scrollbar"
      });
      const a = e.params.scrollbar;
      if (!a.el) return;
      let i = d(a.el);
      e.params.uniqueNavElements && "string" == typeof a.el && i.length > 1 && 1 === s.find(a.el).length && (i = s.find(a.el));
      let r = i.find(`.${e.params.scrollbar.dragClass}`);
      0 === r.length && (r = d(`<div class="${e.params.scrollbar.dragClass}"></div>`), i.append(r)), Object.assign(t, {
        $el: i,
        el: i[0],
        $dragEl: r,
        dragEl: r[0]
      }), a.draggable && e.params.scrollbar.el && E("on"), i && i[e.enabled ? "removeClass" : "addClass"](e.params.scrollbar.lockClass)
    }

    function C() {
      e.params.scrollbar.el && E("off")
    }

    t({
      scrollbar: {
        el: null,
        dragSize: "auto",
        hide: !1,
        draggable: !1,
        snapOnRelease: !0,
        lockClass: "swiper-scrollbar-lock",
        dragClass: "swiper-scrollbar-drag"
      }
    }), e.scrollbar = {
      el: null,
      dragEl: null,
      $el: null,
      $dragEl: null
    }, s("init", (() => {
      T(), g(), f()
    })), s("update resize observerUpdate lock unlock", (() => {
      g()
    })), s("setTranslate", (() => {
      f()
    })), s("setTransition", ((t, s) => {
      ! function (t) {
        e.params.scrollbar.el && e.scrollbar.el && e.scrollbar.$dragEl.transition(t)
      }(s)
    })), s("enable disable", (() => {
      const {
        $el: t
      } = e.scrollbar;
      t && t[e.enabled ? "removeClass" : "addClass"](e.params.scrollbar.lockClass)
    })), s("destroy", (() => {
      C()
    })), Object.assign(e.scrollbar, {
      updateSize: g,
      setTranslate: f,
      init: T,
      destroy: C
    })
  }, function ({
    swiper: e,
    extendParams: t,
    on: s
  }) {
    t({
      parallax: {
        enabled: !1
      }
    });
    const a = (t, s) => {
        const {
          rtl: a
        } = e, i = d(t), r = a ? -1 : 1, n = i.attr("data-swiper-parallax") || "0";
        let l = i.attr("data-swiper-parallax-x"),
          o = i.attr("data-swiper-parallax-y");
        const c = i.attr("data-swiper-parallax-scale"),
          p = i.attr("data-swiper-parallax-opacity");
        if (l || o ? (l = l || "0", o = o || "0") : e.isHorizontal() ? (l = n, o = "0") : (o = n, l = "0"), l = l.indexOf("%") >= 0 ? parseInt(l, 10) * s * r + "%" : l * s * r + "px", o = o.indexOf("%") >= 0 ? parseInt(o, 10) * s + "%" : o * s + "px", null != p) {
          const e = p - (p - 1) * (1 - Math.abs(s));
          i[0].style.opacity = e
        }
        if (null == c) i.transform(`translate3d(${l}, ${o}, 0px)`);
        else {
          const e = c - (c - 1) * (1 - Math.abs(s));
          i.transform(`translate3d(${l}, ${o}, 0px) scale(${e})`)
        }
      },
      i = () => {
        const {
          $el: t,
          slides: s,
          progress: i,
          snapGrid: r
        } = e;
        t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e => {
          a(e, i)
        })), s.each(((t, s) => {
          let n = t.progress;
          e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (n += Math.ceil(s / 2) - i * (r.length - 1)), n = Math.min(Math.max(n, -1), 1), d(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e => {
            a(e, n)
          }))
        }))
      };
    s("beforeInit", (() => {
      e.params.parallax.enabled && (e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
    })), s("init", (() => {
      e.params.parallax.enabled && i()
    })), s("setTranslate", (() => {
      e.params.parallax.enabled && i()
    })), s("setTransition", ((t, s) => {
      e.params.parallax.enabled && ((t = e.params.speed) => {
        const {
          $el: s
        } = e;
        s.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e => {
          const s = d(e);
          let a = parseInt(s.attr("data-swiper-parallax-duration"), 10) || t;
          0 === t && (a = 0), s.transition(a)
        }))
      })(s)
    }))
  }, function ({
    swiper: e,
    extendParams: t,
    on: s,
    emit: a
  }) {
    const i = r();
    t({
      zoom: {
        enabled: !1,
        maxRatio: 3,
        minRatio: 1,
        toggle: !0,
        containerClass: "swiper-zoom-container",
        zoomedSlideClass: "swiper-slide-zoomed"
      }
    }), e.zoom = {
      enabled: !1
    };
    let n, l, o, c = 1,
      p = !1;
    const u = {
        $slideEl: void 0,
        slideWidth: void 0,
        slideHeight: void 0,
        $imageEl: void 0,
        $imageWrapEl: void 0,
        maxRatio: 3
      },
      m = {
        isTouched: void 0,
        isMoved: void 0,
        currentX: void 0,
        currentY: void 0,
        minX: void 0,
        minY: void 0,
        maxX: void 0,
        maxY: void 0,
        width: void 0,
        height: void 0,
        startX: void 0,
        startY: void 0,
        touchesStart: {},
        touchesCurrent: {}
      },
      f = {
        x: void 0,
        y: void 0,
        prevPositionX: void 0,
        prevPositionY: void 0,
        prevTime: void 0
      };
    let g = 1;

    function v(e) {
      if (e.targetTouches.length < 2) return 1;
      const t = e.targetTouches[0].pageX,
        s = e.targetTouches[0].pageY,
        a = e.targetTouches[1].pageX,
        i = e.targetTouches[1].pageY;
      return Math.sqrt((a - t) ** 2 + (i - s) ** 2)
    }

    function w(t) {
      const s = e.support,
        a = e.params.zoom;
      if (l = !1, o = !1, !s.gestures) {
        if ("touchstart" !== t.type || "touchstart" === t.type && t.targetTouches.length < 2) return;
        l = !0, u.scaleStart = v(t)
      }
      u.$slideEl && u.$slideEl.length || (u.$slideEl = d(t.target).closest(`.${e.params.slideClass}`), 0 === u.$slideEl.length && (u.$slideEl = e.slides.eq(e.activeIndex)), u.$imageEl = u.$slideEl.find(`.${a.containerClass}`).eq(0).find("img, svg, canvas, picture, .swiper-zoom-target"), u.$imageWrapEl = u.$imageEl.parent(`.${a.containerClass}`), u.maxRatio = u.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio, 0 !== u.$imageWrapEl.length) ? (u.$imageEl && u.$imageEl.transition(0), p = !0) : u.$imageEl = void 0
    }

    function b(t) {
      const s = e.support,
        a = e.params.zoom,
        i = e.zoom;
      if (!s.gestures) {
        if ("touchmove" !== t.type || "touchmove" === t.type && t.targetTouches.length < 2) return;
        o = !0, u.scaleMove = v(t)
      }
      u.$imageEl && 0 !== u.$imageEl.length ? (s.gestures ? i.scale = t.scale * c : i.scale = u.scaleMove / u.scaleStart * c, i.scale > u.maxRatio && (i.scale = u.maxRatio - 1 + (i.scale - u.maxRatio + 1) ** .5), i.scale < a.minRatio && (i.scale = a.minRatio + 1 - (a.minRatio - i.scale + 1) ** .5), u.$imageEl.transform(`translate3d(0,0,0) scale(${i.scale})`)) : "gesturechange" === t.type && w(t)
    }

    function x(t) {
      const s = e.device,
        a = e.support,
        i = e.params.zoom,
        r = e.zoom;
      if (!a.gestures) {
        if (!l || !o) return;
        if ("touchend" !== t.type || "touchend" === t.type && t.changedTouches.length < 2 && !s.android) return;
        l = !1, o = !1
      }
      u.$imageEl && 0 !== u.$imageEl.length && (r.scale = Math.max(Math.min(r.scale, u.maxRatio), i.minRatio), u.$imageEl.transition(e.params.speed).transform(`translate3d(0,0,0) scale(${r.scale})`), c = r.scale, p = !1, 1 === r.scale && (u.$slideEl = void 0))
    }

    function y(t) {
      const s = e.zoom;
      if (!u.$imageEl || 0 === u.$imageEl.length) return;
      if (e.allowClick = !1, !m.isTouched || !u.$slideEl) return;
      m.isMoved || (m.width = u.$imageEl[0].offsetWidth, m.height = u.$imageEl[0].offsetHeight, m.startX = h(u.$imageWrapEl[0], "x") || 0, m.startY = h(u.$imageWrapEl[0], "y") || 0, u.slideWidth = u.$slideEl[0].offsetWidth, u.slideHeight = u.$slideEl[0].offsetHeight, u.$imageWrapEl.transition(0));
      const a = m.width * s.scale,
        i = m.height * s.scale;
      if (!(a < u.slideWidth && i < u.slideHeight)) {
        if (m.minX = Math.min(u.slideWidth / 2 - a / 2, 0), m.maxX = -m.minX, m.minY = Math.min(u.slideHeight / 2 - i / 2, 0), m.maxY = -m.minY, m.touchesCurrent.x = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX, m.touchesCurrent.y = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY, !m.isMoved && !p) {
          if (e.isHorizontal() && (Math.floor(m.minX) === Math.floor(m.startX) && m.touchesCurrent.x < m.touchesStart.x || Math.floor(m.maxX) === Math.floor(m.startX) && m.touchesCurrent.x > m.touchesStart.x)) return void(m.isTouched = !1);
          if (!e.isHorizontal() && (Math.floor(m.minY) === Math.floor(m.startY) && m.touchesCurrent.y < m.touchesStart.y || Math.floor(m.maxY) === Math.floor(m.startY) && m.touchesCurrent.y > m.touchesStart.y)) return void(m.isTouched = !1)
        }
        t.cancelable && t.preventDefault(), t.stopPropagation(), m.isMoved = !0, m.currentX = m.touchesCurrent.x - m.touchesStart.x + m.startX, m.currentY = m.touchesCurrent.y - m.touchesStart.y + m.startY, m.currentX < m.minX && (m.currentX = m.minX + 1 - (m.minX - m.currentX + 1) ** .8), m.currentX > m.maxX && (m.currentX = m.maxX - 1 + (m.currentX - m.maxX + 1) ** .8), m.currentY < m.minY && (m.currentY = m.minY + 1 - (m.minY - m.currentY + 1) ** .8), m.currentY > m.maxY && (m.currentY = m.maxY - 1 + (m.currentY - m.maxY + 1) ** .8), f.prevPositionX || (f.prevPositionX = m.touchesCurrent.x), f.prevPositionY || (f.prevPositionY = m.touchesCurrent.y), f.prevTime || (f.prevTime = Date.now()), f.x = (m.touchesCurrent.x - f.prevPositionX) / (Date.now() - f.prevTime) / 2, f.y = (m.touchesCurrent.y - f.prevPositionY) / (Date.now() - f.prevTime) / 2, Math.abs(m.touchesCurrent.x - f.prevPositionX) < 2 && (f.x = 0), Math.abs(m.touchesCurrent.y - f.prevPositionY) < 2 && (f.y = 0), f.prevPositionX = m.touchesCurrent.x, f.prevPositionY = m.touchesCurrent.y, f.prevTime = Date.now(), u.$imageWrapEl.transform(`translate3d(${m.currentX}px, ${m.currentY}px,0)`)
      }
    }

    function E() {
      const t = e.zoom;
      u.$slideEl && e.previousIndex !== e.activeIndex && (u.$imageEl && u.$imageEl.transform("translate3d(0,0,0) scale(1)"), u.$imageWrapEl && u.$imageWrapEl.transform("translate3d(0,0,0)"), t.scale = 1, c = 1, u.$slideEl = void 0, u.$imageEl = void 0, u.$imageWrapEl = void 0)
    }

    function T(t) {
      const s = e.zoom,
        a = e.params.zoom;
      if (u.$slideEl || (t && t.target && (u.$slideEl = d(t.target).closest(`.${e.params.slideClass}`)), u.$slideEl || (e.params.virtual && e.params.virtual.enabled && e.virtual ? u.$slideEl = e.$wrapperEl.children(`.${e.params.slideActiveClass}`) : u.$slideEl = e.slides.eq(e.activeIndex)), u.$imageEl = u.$slideEl.find(`.${a.containerClass}`).eq(0).find("img, svg, canvas, picture, .swiper-zoom-target"), u.$imageWrapEl = u.$imageEl.parent(`.${a.containerClass}`)), !u.$imageEl || 0 === u.$imageEl.length || !u.$imageWrapEl || 0 === u.$imageWrapEl.length) return;
      let r, n, l, o, p, h, f, g, v, w, b, x, y, E, T, C, $, S;
      e.params.cssMode && (e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.touchAction = "none"), u.$slideEl.addClass(`${a.zoomedSlideClass}`), void 0 === m.touchesStart.x && t ? (r = "touchend" === t.type ? t.changedTouches[0].pageX : t.pageX, n = "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY) : (r = m.touchesStart.x, n = m.touchesStart.y), s.scale = u.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio, c = u.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio, t ? ($ = u.$slideEl[0].offsetWidth, S = u.$slideEl[0].offsetHeight, l = u.$slideEl.offset().left + i.scrollX, o = u.$slideEl.offset().top + i.scrollY, p = l + $ / 2 - r, h = o + S / 2 - n, v = u.$imageEl[0].offsetWidth, w = u.$imageEl[0].offsetHeight, b = v * s.scale, x = w * s.scale, y = Math.min($ / 2 - b / 2, 0), E = Math.min(S / 2 - x / 2, 0), T = -y, C = -E, f = p * s.scale, g = h * s.scale, f < y && (f = y), f > T && (f = T), g < E && (g = E), g > C && (g = C)) : (f = 0, g = 0), u.$imageWrapEl.transition(300).transform(`translate3d(${f}px, ${g}px,0)`), u.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${s.scale})`)
    }

    function C() {
      const t = e.zoom,
        s = e.params.zoom;
      u.$slideEl || (e.params.virtual && e.params.virtual.enabled && e.virtual ? u.$slideEl = e.$wrapperEl.children(`.${e.params.slideActiveClass}`) : u.$slideEl = e.slides.eq(e.activeIndex), u.$imageEl = u.$slideEl.find(`.${s.containerClass}`).eq(0).find("img, svg, canvas, picture, .swiper-zoom-target"), u.$imageWrapEl = u.$imageEl.parent(`.${s.containerClass}`)), u.$imageEl && 0 !== u.$imageEl.length && u.$imageWrapEl && 0 !== u.$imageWrapEl.length && (e.params.cssMode && (e.wrapperEl.style.overflow = "", e.wrapperEl.style.touchAction = ""), t.scale = 1, c = 1, u.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), u.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), u.$slideEl.removeClass(`${s.zoomedSlideClass}`), u.$slideEl = void 0)
    }

    function $(t) {
      const s = e.zoom;
      s.scale && 1 !== s.scale ? C() : T(t)
    }

    function S() {
      const t = e.support;
      return {
        passiveListener: !("touchstart" !== e.touchEvents.start || !t.passiveListener || !e.params.passiveListeners) && {
          passive: !0,
          capture: !1
        },
        activeListenerWithCapture: !t.passiveListener || {
          passive: !1,
          capture: !0
        }
      }
    }

    function M() {
      return `.${e.params.slideClass}`
    }

    function P(t) {
      const {
        passiveListener: s
      } = S(), a = M();
      e.$wrapperEl[t]("gesturestart", a, w, s), e.$wrapperEl[t]("gesturechange", a, b, s), e.$wrapperEl[t]("gestureend", a, x, s)
    }

    function k() {
      n || (n = !0, P("on"))
    }

    function z() {
      n && (n = !1, P("off"))
    }

    function O() {
      const t = e.zoom;
      if (t.enabled) return;
      t.enabled = !0;
      const s = e.support,
        {
          passiveListener: a,
          activeListenerWithCapture: i
        } = S(),
        r = M();
      s.gestures ? (e.$wrapperEl.on(e.touchEvents.start, k, a), e.$wrapperEl.on(e.touchEvents.end, z, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, r, w, a), e.$wrapperEl.on(e.touchEvents.move, r, b, i), e.$wrapperEl.on(e.touchEvents.end, r, x, a), e.touchEvents.cancel && e.$wrapperEl.on(e.touchEvents.cancel, r, x, a)), e.$wrapperEl.on(e.touchEvents.move, `.${e.params.zoom.containerClass}`, y, i)
    }

    function I() {
      const t = e.zoom;
      if (!t.enabled) return;
      const s = e.support;
      t.enabled = !1;
      const {
        passiveListener: a,
        activeListenerWithCapture: i
      } = S(), r = M();
      s.gestures ? (e.$wrapperEl.off(e.touchEvents.start, k, a), e.$wrapperEl.off(e.touchEvents.end, z, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, r, w, a), e.$wrapperEl.off(e.touchEvents.move, r, b, i), e.$wrapperEl.off(e.touchEvents.end, r, x, a), e.touchEvents.cancel && e.$wrapperEl.off(e.touchEvents.cancel, r, x, a)), e.$wrapperEl.off(e.touchEvents.move, `.${e.params.zoom.containerClass}`, y, i)
    }

    Object.defineProperty(e.zoom, "scale", {
      get: () => g,
      set(e) {
        if (g !== e) {
          const t = u.$imageEl ? u.$imageEl[0] : void 0,
            s = u.$slideEl ? u.$slideEl[0] : void 0;
          a("zoomChange", e, t, s)
        }
        g = e
      }
    }), s("init", (() => {
      e.params.zoom.enabled && O()
    })), s("destroy", (() => {
      I()
    })), s("touchStart", ((t, s) => {
      e.zoom.enabled && function (t) {
        const s = e.device;
        u.$imageEl && 0 !== u.$imageEl.length && (m.isTouched || (s.android && t.cancelable && t.preventDefault(), m.isTouched = !0, m.touchesStart.x = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX, m.touchesStart.y = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY))
      }(s)
    })), s("touchEnd", ((t, s) => {
      e.zoom.enabled && function () {
        const t = e.zoom;
        if (!u.$imageEl || 0 === u.$imageEl.length) return;
        if (!m.isTouched || !m.isMoved) return m.isTouched = !1, void(m.isMoved = !1);
        m.isTouched = !1, m.isMoved = !1;
        let s = 300,
          a = 300;
        const i = f.x * s,
          r = m.currentX + i,
          n = f.y * a,
          l = m.currentY + n;
        0 !== f.x && (s = Math.abs((r - m.currentX) / f.x)), 0 !== f.y && (a = Math.abs((l - m.currentY) / f.y));
        const o = Math.max(s, a);
        m.currentX = r, m.currentY = l;
        const d = m.width * t.scale,
          c = m.height * t.scale;
        m.minX = Math.min(u.slideWidth / 2 - d / 2, 0), m.maxX = -m.minX, m.minY = Math.min(u.slideHeight / 2 - c / 2, 0), m.maxY = -m.minY, m.currentX = Math.max(Math.min(m.currentX, m.maxX), m.minX), m.currentY = Math.max(Math.min(m.currentY, m.maxY), m.minY), u.$imageWrapEl.transition(o).transform(`translate3d(${m.currentX}px, ${m.currentY}px,0)`)
      }()
    })), s("doubleTap", ((t, s) => {
      !e.animating && e.params.zoom.enabled && e.zoom.enabled && e.params.zoom.toggle && $(s)
    })), s("transitionEnd", (() => {
      e.zoom.enabled && e.params.zoom.enabled && E()
    })), s("slideChange", (() => {
      e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && E()
    })), Object.assign(e.zoom, {
      enable: O,
      disable: I,
      in: T,
      out: C,
      toggle: $
    })
  }, function ({
    swiper: e,
    extendParams: t,
    on: s,
    emit: a
  }) {
    t({
      lazy: {
        checkInView: !1,
        enabled: !1,
        loadPrevNext: !1,
        loadPrevNextAmount: 1,
        loadOnTransitionStart: !1,
        scrollingElement: "",
        elementClass: "swiper-lazy",
        loadingClass: "swiper-lazy-loading",
        loadedClass: "swiper-lazy-loaded",
        preloaderClass: "swiper-lazy-preloader"
      }
    }), e.lazy = {};
    let i = !1,
      n = !1;

    function l(t, s = !0) {
      const i = e.params.lazy;
      if (void 0 === t) return;
      if (0 === e.slides.length) return;
      const r = e.virtual && e.params.virtual.enabled ? e.$wrapperEl.children(`.${e.params.slideClass}[data-swiper-slide-index="${t}"]`) : e.slides.eq(t),
        n = r.find(`.${i.elementClass}:not(.${i.loadedClass}):not(.${i.loadingClass})`);
      !r.hasClass(i.elementClass) || r.hasClass(i.loadedClass) || r.hasClass(i.loadingClass) || n.push(r[0]), 0 !== n.length && n.each((t => {
        const n = d(t);
        n.addClass(i.loadingClass);
        const o = n.attr("data-background"),
          c = n.attr("data-src"),
          p = n.attr("data-srcset"),
          u = n.attr("data-sizes"),
          h = n.parent("picture");
        e.loadImage(n[0], c || o, p, u, !1, (() => {
          if (null != e && e && (!e || e.params) && !e.destroyed) {
            if (o ? (n.css("background-image", `url("${o}")`), n.removeAttr("data-background")) : (p && (n.attr("srcset", p), n.removeAttr("data-srcset")), u && (n.attr("sizes", u), n.removeAttr("data-sizes")), h.length && h.children("source").each((e => {
                const t = d(e);
                t.attr("data-srcset") && (t.attr("srcset", t.attr("data-srcset")), t.removeAttr("data-srcset"))
              })), c && (n.attr("src", c), n.removeAttr("data-src"))), n.addClass(i.loadedClass).removeClass(i.loadingClass), r.find(`.${i.preloaderClass}`).remove(), e.params.loop && s) {
              const t = r.attr("data-swiper-slide-index");
              if (r.hasClass(e.params.slideDuplicateClass)) {
                l(e.$wrapperEl.children(`[data-swiper-slide-index="${t}"]:not(.${e.params.slideDuplicateClass})`).index(), !1)
              } else {
                l(e.$wrapperEl.children(`.${e.params.slideDuplicateClass}[data-swiper-slide-index="${t}"]`).index(), !1)
              }
            }
            a("lazyImageReady", r[0], n[0]), e.params.autoHeight && e.updateAutoHeight()
          }
        })), a("lazyImageLoad", r[0], n[0])
      }))
    }

    function o() {
      const {
        $wrapperEl: t,
        params: s,
        slides: a,
        activeIndex: i
      } = e, r = e.virtual && s.virtual.enabled,
        o = s.lazy;
      let c = s.slidesPerView;

      function p(e) {
        if (r) {
          if (t.children(`.${s.slideClass}[data-swiper-slide-index="${e}"]`).length) return !0
        } else if (a[e]) return !0;
        return !1
      }

      function u(e) {
        return r ? d(e).attr("data-swiper-slide-index") : d(e).index()
      }

      if ("auto" === c && (c = 0), n || (n = !0), e.params.watchSlidesProgress) t.children(`.${s.slideVisibleClass}`).each((e => {
        l(r ? d(e).attr("data-swiper-slide-index") : d(e).index())
      }));
      else if (c > 1)
        for (let e = i; e < i + c; e += 1) p(e) && l(e);
      else l(i);
      if (o.loadPrevNext)
        if (c > 1 || o.loadPrevNextAmount && o.loadPrevNextAmount > 1) {
          const e = o.loadPrevNextAmount,
            t = c,
            s = Math.min(i + t + Math.max(e, t), a.length),
            r = Math.max(i - Math.max(t, e), 0);
          for (let e = i + c; e < s; e += 1) p(e) && l(e);
          for (let e = r; e < i; e += 1) p(e) && l(e)
        } else {
          const e = t.children(`.${s.slideNextClass}`);
          e.length > 0 && l(u(e));
          const a = t.children(`.${s.slidePrevClass}`);
          a.length > 0 && l(u(a))
        }
    }

    function c() {
      const t = r();
      if (!e || e.destroyed) return;
      const s = e.params.lazy.scrollingElement ? d(e.params.lazy.scrollingElement) : d(t),
        a = s[0] === t,
        n = a ? t.innerWidth : s[0].offsetWidth,
        l = a ? t.innerHeight : s[0].offsetHeight,
        p = e.$el.offset(),
        {
          rtlTranslate: u
        } = e;
      let h = !1;
      u && (p.left -= e.$el[0].scrollLeft);
      const m = [
        [p.left, p.top],
        [p.left + e.width, p.top],
        [p.left, p.top + e.height],
        [p.left + e.width, p.top + e.height]
      ];
      for (let e = 0; e < m.length; e += 1) {
        const t = m[e];
        if (t[0] >= 0 && t[0] <= n && t[1] >= 0 && t[1] <= l) {
          if (0 === t[0] && 0 === t[1]) continue;
          h = !0
        }
      }
      const f = !("touchstart" !== e.touchEvents.start || !e.support.passiveListener || !e.params.passiveListeners) && {
        passive: !0,
        capture: !1
      };
      h ? (o(), s.off("scroll", c, f)) : i || (i = !0, s.on("scroll", c, f))
    }

    s("beforeInit", (() => {
      e.params.lazy.enabled && e.params.preloadImages && (e.params.preloadImages = !1)
    })), s("init", (() => {
      e.params.lazy.enabled && (e.params.lazy.checkInView ? c() : o())
    })), s("scroll", (() => {
      e.params.freeMode && e.params.freeMode.enabled && !e.params.freeMode.sticky && o()
    })), s("scrollbarDragMove resize _freeModeNoMomentumRelease", (() => {
      e.params.lazy.enabled && (e.params.lazy.checkInView ? c() : o())
    })), s("transitionStart", (() => {
      e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !n) && (e.params.lazy.checkInView ? c() : o())
    })), s("transitionEnd", (() => {
      e.params.lazy.enabled && !e.params.lazy.loadOnTransitionStart && (e.params.lazy.checkInView ? c() : o())
    })), s("slideChange", (() => {
      const {
        lazy: t,
        cssMode: s,
        watchSlidesProgress: a,
        touchReleaseOnEdges: i,
        resistanceRatio: r
      } = e.params;
      t.enabled && (s || a && (i || 0 === r)) && o()
    })), Object.assign(e.lazy, {
      load: o,
      loadInSlide: l
    })
  }, function ({
    swiper: e,
    extendParams: t,
    on: s
  }) {
    function a(e, t) {
      const s = function () {
        let e, t, s;
        return (a, i) => {
          for (t = -1, e = a.length; e - t > 1;) s = e + t >> 1, a[s] <= i ? t = s : e = s;
          return e
        }
      }();
      let a, i;
      return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) {
        return e ? (i = s(this.x, e), a = i - 1, (e - this.x[a]) * (this.y[i] - this.y[a]) / (this.x[i] - this.x[a]) + this.y[a]) : 0
      }, this
    }

    function i() {
      e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
    }

    t({
      controller: {
        control: void 0,
        inverse: !1,
        by: "slide"
      }
    }), e.controller = {
      control: void 0
    }, s("beforeInit", (() => {
      e.controller.control = e.params.controller.control
    })), s("update", (() => {
      i()
    })), s("resize", (() => {
      i()
    })), s("observerUpdate", (() => {
      i()
    })), s("setTranslate", ((t, s, a) => {
      e.controller.control && e.controller.setTranslate(s, a)
    })), s("setTransition", ((t, s, a) => {
      e.controller.control && e.controller.setTransition(s, a)
    })), Object.assign(e.controller, {
      setTranslate: function (t, s) {
        const i = e.controller.control;
        let r, n;
        const l = e.constructor;

        function o(t) {
          const s = e.rtlTranslate ? -e.translate : e.translate;
          "slide" === e.params.controller.by && (! function (t) {
            e.controller.spline || (e.controller.spline = e.params.loop ? new a(e.slidesGrid, t.slidesGrid) : new a(e.snapGrid, t.snapGrid))
          }(t), n = -e.controller.spline.interpolate(-s)), n && "container" !== e.params.controller.by || (r = (t.maxTranslate() - t.minTranslate()) / (e.maxTranslate() - e.minTranslate()), n = (s - e.minTranslate()) * r + t.minTranslate()), e.params.controller.inverse && (n = t.maxTranslate() - n), t.updateProgress(n), t.setTranslate(n, e), t.updateActiveIndex(), t.updateSlidesClasses()
        }

        if (Array.isArray(i))
          for (let e = 0; e < i.length; e += 1) i[e] !== s && i[e] instanceof l && o(i[e]);
        else i instanceof l && s !== i && o(i)
      },
      setTransition: function (t, s) {
        const a = e.constructor,
          i = e.controller.control;
        let r;

        function n(s) {
          s.setTransition(t, e), 0 !== t && (s.transitionStart(), s.params.autoHeight && p((() => {
            s.updateAutoHeight()
          })), s.$wrapperEl.transitionEnd((() => {
            i && (s.params.loop && "slide" === e.params.controller.by && s.loopFix(), s.transitionEnd())
          })))
        }

        if (Array.isArray(i))
          for (r = 0; r < i.length; r += 1) i[r] !== s && i[r] instanceof a && n(i[r]);
        else i instanceof a && s !== i && n(i)
      }
    })
  }, function ({
    swiper: e,
    extendParams: t,
    on: s
  }) {
    t({
      a11y: {
        enabled: !0,
        notificationClass: "swiper-notification",
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
        firstSlideMessage: "This is the first slide",
        lastSlideMessage: "This is the last slide",
        paginationBulletMessage: "Go to slide {{index}}",
        slideLabelMessage: "{{index}} / {{slidesLength}}",
        containerMessage: null,
        containerRoleDescriptionMessage: null,
        itemRoleDescriptionMessage: null,
        slideRole: "group"
      }
    });
    let a = null;

    function i(e) {
      const t = a;
      0 !== t.length && (t.html(""), t.html(e))
    }

    function r(e) {
      e.attr("tabIndex", "0")
    }

    function n(e) {
      e.attr("tabIndex", "-1")
    }

    function l(e, t) {
      e.attr("role", t)
    }

    function o(e, t) {
      e.attr("aria-roledescription", t)
    }

    function c(e, t) {
      e.attr("aria-label", t)
    }

    function p(e) {
      e.attr("aria-disabled", !0)
    }

    function u(e) {
      e.attr("aria-disabled", !1)
    }

    function h(t) {
      if (13 !== t.keyCode && 32 !== t.keyCode) return;
      const s = e.params.a11y,
        a = d(t.target);
      e.navigation && e.navigation.$nextEl && a.is(e.navigation.$nextEl) && (e.isEnd && !e.params.loop || e.slideNext(), e.isEnd ? i(s.lastSlideMessage) : i(s.nextSlideMessage)), e.navigation && e.navigation.$prevEl && a.is(e.navigation.$prevEl) && (e.isBeginning && !e.params.loop || e.slidePrev(), e.isBeginning ? i(s.firstSlideMessage) : i(s.prevSlideMessage)), e.pagination && a.is(W(e.params.pagination.bulletClass)) && a[0].click()
    }

    function m() {
      if (e.params.loop || !e.navigation) return;
      const {
        $nextEl: t,
        $prevEl: s
      } = e.navigation;
      s && s.length > 0 && (e.isBeginning ? (p(s), n(s)) : (u(s), r(s))), t && t.length > 0 && (e.isEnd ? (p(t), n(t)) : (u(t), r(t)))
    }

    function f() {
      return e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length
    }

    const g = (e, t, s) => {
      r(e), "BUTTON" !== e[0].tagName && (l(e, "button"), e.on("keydown", h)), c(e, s),
        function (e, t) {
          e.attr("aria-controls", t)
        }(e, t)
    };

    function v() {
      const t = e.params.a11y;
      e.$el.append(a);
      const s = e.$el;
      t.containerRoleDescriptionMessage && o(s, t.containerRoleDescriptionMessage), t.containerMessage && c(s, t.containerMessage);
      const i = e.$wrapperEl,
        r = i.attr("id") || `swiper-wrapper-${function (e = 16) {
                return "x".repeat(e).replace(/x/g, (() => Math.round(16 * Math.random()).toString(16)))
            }(16)}`,
        n = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite";
      var p;
      p = r, i.attr("id", p),
        function (e, t) {
          e.attr("aria-live", t)
        }(i, n), t.itemRoleDescriptionMessage && o(d(e.slides), t.itemRoleDescriptionMessage), l(d(e.slides), t.slideRole);
      const u = e.params.loop ? e.slides.filter((t => !t.classList.contains(e.params.slideDuplicateClass))).length : e.slides.length;
      let m, v;
      e.slides.each(((s, a) => {
        const i = d(s),
          r = e.params.loop ? parseInt(i.attr("data-swiper-slide-index"), 10) : a;
        c(i, t.slideLabelMessage.replace(/\{\{index\}\}/, r + 1).replace(/\{\{slidesLength\}\}/, u))
      })), e.navigation && e.navigation.$nextEl && (m = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (v = e.navigation.$prevEl), m && m.length && g(m, r, t.nextSlideMessage), v && v.length && g(v, r, t.prevSlideMessage), f() && e.pagination.$el.on("keydown", W(e.params.pagination.bulletClass), h)
    }

    s("beforeInit", (() => {
      a = d(`<span class="${e.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`)
    })), s("afterInit", (() => {
      e.params.a11y.enabled && (v(), m())
    })), s("toEdge", (() => {
      e.params.a11y.enabled && m()
    })), s("fromEdge", (() => {
      e.params.a11y.enabled && m()
    })), s("paginationUpdate", (() => {
      e.params.a11y.enabled && function () {
        const t = e.params.a11y;
        f() && e.pagination.bullets.each((s => {
          const a = d(s);
          r(a), e.params.pagination.renderBullet || (l(a, "button"), c(a, t.paginationBulletMessage.replace(/\{\{index\}\}/, a.index() + 1)))
        }))
      }()
    })), s("destroy", (() => {
      e.params.a11y.enabled && function () {
        let t, s;
        a && a.length > 0 && a.remove(), e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (s = e.navigation.$prevEl), t && t.off("keydown", h), s && s.off("keydown", h), f() && e.pagination.$el.off("keydown", W(e.params.pagination.bulletClass), h)
      }()
    }))
  }, function ({
    swiper: e,
    extendParams: t,
    on: s
  }) {
    t({
      history: {
        enabled: !1,
        root: "",
        replaceState: !1,
        key: "slides"
      }
    });
    let a = !1,
      i = {};
    const n = e => e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""),
      l = e => {
        const t = r();
        let s;
        s = e ? new URL(e) : t.location;
        const a = s.pathname.slice(1).split("/").filter((e => "" !== e)),
          i = a.length;
        return {
          key: a[i - 2],
          value: a[i - 1]
        }
      },
      o = (t, s) => {
        const i = r();
        if (!a || !e.params.history.enabled) return;
        let l;
        l = e.params.url ? new URL(e.params.url) : i.location;
        const o = e.slides.eq(s);
        let d = n(o.attr("data-history"));
        if (e.params.history.root.length > 0) {
          let s = e.params.history.root;
          "/" === s[s.length - 1] && (s = s.slice(0, s.length - 1)), d = `${s}/${t}/${d}`
        } else l.pathname.includes(t) || (d = `${t}/${d}`);
        const c = i.history.state;
        c && c.value === d || (e.params.history.replaceState ? i.history.replaceState({
          value: d
        }, null, d) : i.history.pushState({
          value: d
        }, null, d))
      },
      d = (t, s, a) => {
        if (s)
          for (let i = 0, r = e.slides.length; i < r; i += 1) {
            const r = e.slides.eq(i);
            if (n(r.attr("data-history")) === s && !r.hasClass(e.params.slideDuplicateClass)) {
              const s = r.index();
              e.slideTo(s, t, a)
            }
          } else e.slideTo(0, t, a)
      },
      c = () => {
        i = l(e.params.url), d(e.params.speed, e.paths.value, !1)
      };
    s("init", (() => {
      e.params.history.enabled && (() => {
        const t = r();
        if (e.params.history) {
          if (!t.history || !t.history.pushState) return e.params.history.enabled = !1, void(e.params.hashNavigation.enabled = !0);
          a = !0, i = l(e.params.url), (i.key || i.value) && (d(0, i.value, e.params.runCallbacksOnInit), e.params.history.replaceState || t.addEventListener("popstate", c))
        }
      })()
    })), s("destroy", (() => {
      e.params.history.enabled && (() => {
        const t = r();
        e.params.history.replaceState || t.removeEventListener("popstate", c)
      })()
    })), s("transitionEnd _freeModeNoMomentumRelease", (() => {
      a && o(e.params.history.key, e.activeIndex)
    })), s("slideChange", (() => {
      a && e.params.cssMode && o(e.params.history.key, e.activeIndex)
    }))
  }, function ({
    swiper: e,
    extendParams: t,
    emit: s,
    on: i
  }) {
    let n = !1;
    const l = a(),
      o = r();
    t({
      hashNavigation: {
        enabled: !1,
        replaceState: !1,
        watchState: !1
      }
    });
    const c = () => {
        s("hashChange");
        const t = l.location.hash.replace("#", "");
        if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) {
          const s = e.$wrapperEl.children(`.${e.params.slideClass}[data-hash="${t}"]`).index();
          if (void 0 === s) return;
          e.slideTo(s)
        }
      },
      p = () => {
        if (n && e.params.hashNavigation.enabled)
          if (e.params.hashNavigation.replaceState && o.history && o.history.replaceState) o.history.replaceState(null, null, `#${e.slides.eq(e.activeIndex).attr("data-hash")}` || ""), s("hashSet");
          else {
            const t = e.slides.eq(e.activeIndex),
              a = t.attr("data-hash") || t.attr("data-history");
            l.location.hash = a || "", s("hashSet")
          }
      };
    i("init", (() => {
      e.params.hashNavigation.enabled && (() => {
        if (!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled) return;
        n = !0;
        const t = l.location.hash.replace("#", "");
        if (t) {
          const s = 0;
          for (let a = 0, i = e.slides.length; a < i; a += 1) {
            const i = e.slides.eq(a);
            if ((i.attr("data-hash") || i.attr("data-history")) === t && !i.hasClass(e.params.slideDuplicateClass)) {
              const t = i.index();
              e.slideTo(t, s, e.params.runCallbacksOnInit, !0)
            }
          }
        }
        e.params.hashNavigation.watchState && d(o).on("hashchange", c)
      })()
    })), i("destroy", (() => {
      e.params.hashNavigation.enabled && e.params.hashNavigation.watchState && d(o).off("hashchange", c)
    })), i("transitionEnd _freeModeNoMomentumRelease", (() => {
      n && p()
    })), i("slideChange", (() => {
      n && e.params.cssMode && p()
    }))
  }, function ({
    swiper: e,
    extendParams: t,
    on: s,
    emit: i
  }) {
    let r;

    function n() {
      const t = e.slides.eq(e.activeIndex);
      let s = e.params.autoplay.delay;
      t.attr("data-swiper-autoplay") && (s = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), clearTimeout(r), r = p((() => {
        let t;
        e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), t = e.slidePrev(e.params.speed, !0, !0), i("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? o() : (t = e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), i("autoplay")) : (t = e.slidePrev(e.params.speed, !0, !0), i("autoplay")) : e.params.loop ? (e.loopFix(), t = e.slideNext(e.params.speed, !0, !0), i("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? o() : (t = e.slideTo(0, e.params.speed, !0, !0), i("autoplay")) : (t = e.slideNext(e.params.speed, !0, !0), i("autoplay")), (e.params.cssMode && e.autoplay.running || !1 === t) && n()
      }), s)
    }

    function l() {
      return void 0 === r && (!e.autoplay.running && (e.autoplay.running = !0, i("autoplayStart"), n(), !0))
    }

    function o() {
      return !!e.autoplay.running && (void 0 !== r && (r && (clearTimeout(r), r = void 0), e.autoplay.running = !1, i("autoplayStop"), !0))
    }

    function d(t) {
      e.autoplay.running && (e.autoplay.paused || (r && clearTimeout(r), e.autoplay.paused = !0, 0 !== t && e.params.autoplay.waitForTransition ? ["transitionend", "webkitTransitionEnd"].forEach((t => {
        e.$wrapperEl[0].addEventListener(t, u)
      })) : (e.autoplay.paused = !1, n())))
    }

    function c() {
      const t = a();
      "hidden" === t.visibilityState && e.autoplay.running && d(), "visible" === t.visibilityState && e.autoplay.paused && (n(), e.autoplay.paused = !1)
    }

    function u(t) {
      e && !e.destroyed && e.$wrapperEl && t.target === e.$wrapperEl[0] && (["transitionend", "webkitTransitionEnd"].forEach((t => {
        e.$wrapperEl[0].removeEventListener(t, u)
      })), e.autoplay.paused = !1, e.autoplay.running ? n() : o())
    }

    function h() {
      e.params.autoplay.disableOnInteraction ? o() : d(), ["transitionend", "webkitTransitionEnd"].forEach((t => {
        e.$wrapperEl[0].removeEventListener(t, u)
      }))
    }

    function m() {
      e.params.autoplay.disableOnInteraction || (e.autoplay.paused = !1, n())
    }

    e.autoplay = {
      running: !1,
      paused: !1
    }, t({
      autoplay: {
        enabled: !1,
        delay: 3e3,
        waitForTransition: !0,
        disableOnInteraction: !0,
        stopOnLastSlide: !1,
        reverseDirection: !1,
        pauseOnMouseEnter: !1
      }
    }), s("init", (() => {
      if (e.params.autoplay.enabled) {
        l();
        a().addEventListener("visibilitychange", c), e.params.autoplay.pauseOnMouseEnter && (e.$el.on("mouseenter", h), e.$el.on("mouseleave", m))
      }
    })), s("beforeTransitionStart", ((t, s, a) => {
      e.autoplay.running && (a || !e.params.autoplay.disableOnInteraction ? e.autoplay.pause(s) : o())
    })), s("sliderFirstMove", (() => {
      e.autoplay.running && (e.params.autoplay.disableOnInteraction ? o() : d())
    })), s("touchEnd", (() => {
      e.params.cssMode && e.autoplay.paused && !e.params.autoplay.disableOnInteraction && n()
    })), s("destroy", (() => {
      e.$el.off("mouseenter", h), e.$el.off("mouseleave", m), e.autoplay.running && o();
      a().removeEventListener("visibilitychange", c)
    })), Object.assign(e.autoplay, {
      pause: d,
      run: n,
      start: l,
      stop: o
    })
  }, function ({
    swiper: e,
    extendParams: t,
    on: s
  }) {
    t({
      thumbs: {
        swiper: null,
        multipleActiveThumbs: !0,
        autoScrollOffset: 0,
        slideThumbActiveClass: "swiper-slide-thumb-active",
        thumbsContainerClass: "swiper-thumbs"
      }
    });
    let a = !1,
      i = !1;

    function r() {
      const t = e.thumbs.swiper;
      if (!t) return;
      const s = t.clickedIndex,
        a = t.clickedSlide;
      if (a && d(a).hasClass(e.params.thumbs.slideThumbActiveClass)) return;
      if (null == s) return;
      let i;
      if (i = t.params.loop ? parseInt(d(t.clickedSlide).attr("data-swiper-slide-index"), 10) : s, e.params.loop) {
        let t = e.activeIndex;
        e.slides.eq(t).hasClass(e.params.slideDuplicateClass) && (e.loopFix(), e._clientLeft = e.$wrapperEl[0].clientLeft, t = e.activeIndex);
        const s = e.slides.eq(t).prevAll(`[data-swiper-slide-index="${i}"]`).eq(0).index(),
          a = e.slides.eq(t).nextAll(`[data-swiper-slide-index="${i}"]`).eq(0).index();
        i = void 0 === s ? a : void 0 === a ? s : a - t < t - s ? a : s
      }
      e.slideTo(i)
    }

    function n() {
      const {
        thumbs: t
      } = e.params;
      if (a) return !1;
      a = !0;
      const s = e.constructor;
      if (t.swiper instanceof s) e.thumbs.swiper = t.swiper, Object.assign(e.thumbs.swiper.originalParams, {
        watchSlidesProgress: !0,
        slideToClickedSlide: !1
      }), Object.assign(e.thumbs.swiper.params, {
        watchSlidesProgress: !0,
        slideToClickedSlide: !1
      });
      else if (m(t.swiper)) {
        const a = Object.assign({}, t.swiper);
        Object.assign(a, {
          watchSlidesProgress: !0,
          slideToClickedSlide: !1
        }), e.thumbs.swiper = new s(a), i = !0
      }
      return e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", r), !0
    }

    function l(t) {
      const s = e.thumbs.swiper;
      if (!s) return;
      const a = "auto" === s.params.slidesPerView ? s.slidesPerViewDynamic() : s.params.slidesPerView,
        i = e.params.thumbs.autoScrollOffset,
        r = i && !s.params.loop;
      if (e.realIndex !== s.realIndex || r) {
        let n, l, o = s.activeIndex;
        if (s.params.loop) {
          s.slides.eq(o).hasClass(s.params.slideDuplicateClass) && (s.loopFix(), s._clientLeft = s.$wrapperEl[0].clientLeft, o = s.activeIndex);
          const t = s.slides.eq(o).prevAll(`[data-swiper-slide-index="${e.realIndex}"]`).eq(0).index(),
            a = s.slides.eq(o).nextAll(`[data-swiper-slide-index="${e.realIndex}"]`).eq(0).index();
          n = void 0 === t ? a : void 0 === a ? t : a - o == o - t ? s.params.slidesPerGroup > 1 ? a : o : a - o < o - t ? a : t, l = e.activeIndex > e.previousIndex ? "next" : "prev"
        } else n = e.realIndex, l = n > e.previousIndex ? "next" : "prev";
        r && (n += "next" === l ? i : -1 * i), s.visibleSlidesIndexes && s.visibleSlidesIndexes.indexOf(n) < 0 && (s.params.centeredSlides ? n = n > o ? n - Math.floor(a / 2) + 1 : n + Math.floor(a / 2) - 1 : n > o && s.params.slidesPerGroup, s.slideTo(n, t ? 0 : void 0))
      }
      let n = 1;
      const l = e.params.thumbs.slideThumbActiveClass;
      if (e.params.slidesPerView > 1 && !e.params.centeredSlides && (n = e.params.slidesPerView), e.params.thumbs.multipleActiveThumbs || (n = 1), n = Math.floor(n), s.slides.removeClass(l), s.params.loop || s.params.virtual && s.params.virtual.enabled)
        for (let t = 0; t < n; t += 1) s.$wrapperEl.children(`[data-swiper-slide-index="${e.realIndex + t}"]`).addClass(l);
      else
        for (let t = 0; t < n; t += 1) s.slides.eq(e.realIndex + t).addClass(l)
    }

    e.thumbs = {
      swiper: null
    }, s("beforeInit", (() => {
      const {
        thumbs: t
      } = e.params;
      t && t.swiper && (n(), l(!0))
    })), s("slideChange update resize observerUpdate", (() => {
      e.thumbs.swiper && l()
    })), s("setTransition", ((t, s) => {
      const a = e.thumbs.swiper;
      a && a.setTransition(s)
    })), s("beforeDestroy", (() => {
      const t = e.thumbs.swiper;
      t && i && t && t.destroy()
    })), Object.assign(e.thumbs, {
      init: n,
      update: l
    })
  }, function ({
    swiper: e,
    extendParams: t,
    emit: s,
    once: a
  }) {
    t({
      freeMode: {
        enabled: !1,
        momentum: !0,
        momentumRatio: 1,
        momentumBounce: !0,
        momentumBounceRatio: 1,
        momentumVelocityRatio: 1,
        sticky: !1,
        minimumVelocity: .02
      }
    }), Object.assign(e, {
      freeMode: {
        onTouchMove: function () {
          const {
            touchEventsData: t,
            touches: s
          } = e;
          0 === t.velocities.length && t.velocities.push({
            position: s[e.isHorizontal() ? "startX" : "startY"],
            time: t.touchStartTime
          }), t.velocities.push({
            position: s[e.isHorizontal() ? "currentX" : "currentY"],
            time: u()
          })
        },
        onTouchEnd: function ({
          currentPos: t
        }) {
          const {
            params: i,
            $wrapperEl: r,
            rtlTranslate: n,
            snapGrid: l,
            touchEventsData: o
          } = e,
          d = u() - o.touchStartTime;
          if (t < -e.minTranslate()) e.slideTo(e.activeIndex);
          else if (t > -e.maxTranslate()) e.slides.length < l.length ? e.slideTo(l.length - 1) : e.slideTo(e.slides.length - 1);
          else {
            if (i.freeMode.momentum) {
              if (o.velocities.length > 1) {
                const t = o.velocities.pop(),
                  s = o.velocities.pop(),
                  a = t.position - s.position,
                  r = t.time - s.time;
                e.velocity = a / r, e.velocity /= 2, Math.abs(e.velocity) < i.freeMode.minimumVelocity && (e.velocity = 0), (r > 150 || u() - t.time > 300) && (e.velocity = 0)
              } else e.velocity = 0;
              e.velocity *= i.freeMode.momentumVelocityRatio, o.velocities.length = 0;
              let t = 1e3 * i.freeMode.momentumRatio;
              const d = e.velocity * t;
              let c = e.translate + d;
              n && (c = -c);
              let p, h = !1;
              const m = 20 * Math.abs(e.velocity) * i.freeMode.momentumBounceRatio;
              let f;
              if (c < e.maxTranslate()) i.freeMode.momentumBounce ? (c + e.maxTranslate() < -m && (c = e.maxTranslate() - m), p = e.maxTranslate(), h = !0, o.allowMomentumBounce = !0) : c = e.maxTranslate(), i.loop && i.centeredSlides && (f = !0);
              else if (c > e.minTranslate()) i.freeMode.momentumBounce ? (c - e.minTranslate() > m && (c = e.minTranslate() + m), p = e.minTranslate(), h = !0, o.allowMomentumBounce = !0) : c = e.minTranslate(), i.loop && i.centeredSlides && (f = !0);
              else if (i.freeMode.sticky) {
                let t;
                for (let e = 0; e < l.length; e += 1)
                  if (l[e] > -c) {
                    t = e;
                    break
                  }
                c = Math.abs(l[t] - c) < Math.abs(l[t - 1] - c) || "next" === e.swipeDirection ? l[t] : l[t - 1], c = -c
              }
              if (f && a("transitionEnd", (() => {
                  e.loopFix()
                })), 0 !== e.velocity) {
                if (t = n ? Math.abs((-c - e.translate) / e.velocity) : Math.abs((c - e.translate) / e.velocity), i.freeMode.sticky) {
                  const s = Math.abs((n ? -c : c) - e.translate),
                    a = e.slidesSizesGrid[e.activeIndex];
                  t = s < a ? i.speed : s < 2 * a ? 1.5 * i.speed : 2.5 * i.speed
                }
              } else if (i.freeMode.sticky) return void e.slideToClosest();
              i.freeMode.momentumBounce && h ? (e.updateProgress(p), e.setTransition(t), e.setTranslate(c), e.transitionStart(!0, e.swipeDirection), e.animating = !0, r.transitionEnd((() => {
                e && !e.destroyed && o.allowMomentumBounce && (s("momentumBounce"), e.setTransition(i.speed), setTimeout((() => {
                  e.setTranslate(p), r.transitionEnd((() => {
                    e && !e.destroyed && e.transitionEnd()
                  }))
                }), 0))
              }))) : e.velocity ? (s("_freeModeNoMomentumRelease"), e.updateProgress(c), e.setTransition(t), e.setTranslate(c), e.transitionStart(!0, e.swipeDirection), e.animating || (e.animating = !0, r.transitionEnd((() => {
                e && !e.destroyed && e.transitionEnd()
              })))) : e.updateProgress(c), e.updateActiveIndex(), e.updateSlidesClasses()
            } else {
              if (i.freeMode.sticky) return void e.slideToClosest();
              i.freeMode && s("_freeModeNoMomentumRelease")
            }
            (!i.freeMode.momentum || d >= i.longSwipesMs) && (e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses())
          }
        }
      }
    })
  }, function ({
    swiper: e,
    extendParams: t
  }) {
    let s, a, i;
    t({
      grid: {
        rows: 1,
        fill: "column"
      }
    }), e.grid = {
      initSlides: t => {
        const {
          slidesPerView: r
        } = e.params, {
          rows: n,
          fill: l
        } = e.params.grid;
        a = s / n, i = Math.floor(t / n), s = Math.floor(t / n) === t / n ? t : Math.ceil(t / n) * n, "auto" !== r && "row" === l && (s = Math.max(s, r * n))
      },
      updateSlide: (t, r, n, l) => {
        const {
          slidesPerGroup: o,
          spaceBetween: d
        } = e.params, {
          rows: c,
          fill: p
        } = e.params.grid;
        let u, h, m;
        if ("row" === p && o > 1) {
          const e = Math.floor(t / (o * c)),
            a = t - c * o * e,
            i = 0 === e ? o : Math.min(Math.ceil((n - e * c * o) / c), o);
          m = Math.floor(a / i), h = a - m * i + e * o, u = h + m * s / c, r.css({
            "-webkit-order": u,
            order: u
          })
        } else "column" === p ? (h = Math.floor(t / c), m = t - h * c, (h > i || h === i && m === c - 1) && (m += 1, m >= c && (m = 0, h += 1))) : (m = Math.floor(t / a), h = t - m * a);
        r.css(l("margin-top"), 0 !== m ? d && `${d}px` : "")
      },
      updateWrapperSize: (t, a, i) => {
        const {
          spaceBetween: r,
          centeredSlides: n,
          roundLengths: l
        } = e.params, {
          rows: o
        } = e.params.grid;
        if (e.virtualSize = (t + r) * s, e.virtualSize = Math.ceil(e.virtualSize / o) - r, e.$wrapperEl.css({
            [i("width")]: `${e.virtualSize + r}px`
          }), n) {
          a.splice(0, a.length);
          const t = [];
          for (let s = 0; s < a.length; s += 1) {
            let i = a[s];
            l && (i = Math.floor(i)), a[s] < e.virtualSize + a[0] && t.push(i)
          }
          a.push(...t)
        }
      }
    }
  }, function ({
    swiper: e
  }) {
    Object.assign(e, {
      appendSlide: R.bind(e),
      prependSlide: j.bind(e),
      addSlide: _.bind(e),
      removeSlide: V.bind(e),
      removeAllSlides: q.bind(e)
    })
  }, function ({
    swiper: e,
    extendParams: t,
    on: s
  }) {
    t({
      fadeEffect: {
        crossFade: !1,
        transformEl: null
      }
    }), F({
      effect: "fade",
      swiper: e,
      on: s,
      setTranslate: () => {
        const {
          slides: t
        } = e, s = e.params.fadeEffect;
        for (let a = 0; a < t.length; a += 1) {
          const t = e.slides.eq(a);
          let i = -t[0].swiperSlideOffset;
          e.params.virtualTranslate || (i -= e.translate);
          let r = 0;
          e.isHorizontal() || (r = i, i = 0);
          const n = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(t[0].progress), 0) : 1 + Math.min(Math.max(t[0].progress, -1), 0);
          U(s, t).css({
            opacity: n
          }).transform(`translate3d(${i}px, ${r}px, 0px)`)
        }
      },
      setTransition: t => {
        const {
          transformEl: s
        } = e.params.fadeEffect;
        (s ? e.slides.find(s) : e.slides).transition(t), K({
          swiper: e,
          duration: t,
          transformEl: s,
          allSlides: !0
        })
      },
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: !0,
        spaceBetween: 0,
        virtualTranslate: !e.params.cssMode
      })
    })
  }, function ({
    swiper: e,
    extendParams: t,
    on: s
  }) {
    t({
      cubeEffect: {
        slideShadows: !0,
        shadow: !0,
        shadowOffset: 20,
        shadowScale: .94
      }
    }), F({
      effect: "cube",
      swiper: e,
      on: s,
      setTranslate: () => {
        const {
          $el: t,
          $wrapperEl: s,
          slides: a,
          width: i,
          height: r,
          rtlTranslate: n,
          size: l,
          browser: o
        } = e,
        c = e.params.cubeEffect, p = e.isHorizontal(), u = e.virtual && e.params.virtual.enabled;
        let h, m = 0;
        c.shadow && (p ? (h = s.find(".swiper-cube-shadow"), 0 === h.length && (h = d('<div class="swiper-cube-shadow"></div>'), s.append(h)), h.css({
          height: `${i}px`
        })) : (h = t.find(".swiper-cube-shadow"), 0 === h.length && (h = d('<div class="swiper-cube-shadow"></div>'), t.append(h))));
        for (let e = 0; e < a.length; e += 1) {
          const t = a.eq(e);
          let s = e;
          u && (s = parseInt(t.attr("data-swiper-slide-index"), 10));
          let i = 90 * s,
            r = Math.floor(i / 360);
          n && (i = -i, r = Math.floor(-i / 360));
          const o = Math.max(Math.min(t[0].progress, 1), -1);
          let h = 0,
            f = 0,
            g = 0;
          s % 4 == 0 ? (h = 4 * -r * l, g = 0) : (s - 1) % 4 == 0 ? (h = 0, g = 4 * -r * l) : (s - 2) % 4 == 0 ? (h = l + 4 * r * l, g = l) : (s - 3) % 4 == 0 && (h = -l, g = 3 * l + 4 * l * r), n && (h = -h), p || (f = h, h = 0);
          const v = `rotateX(${p ? 0 : -i}deg) rotateY(${p ? i : 0}deg) translate3d(${h}px, ${f}px, ${g}px)`;
          if (o <= 1 && o > -1 && (m = 90 * s + 90 * o, n && (m = 90 * -s - 90 * o)), t.transform(v), c.slideShadows) {
            let e = p ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
              s = p ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
            0 === e.length && (e = d(`<div class="swiper-slide-shadow-${p ? "left" : "top"}"></div>`), t.append(e)), 0 === s.length && (s = d(`<div class="swiper-slide-shadow-${p ? "right" : "bottom"}"></div>`), t.append(s)), e.length && (e[0].style.opacity = Math.max(-o, 0)), s.length && (s[0].style.opacity = Math.max(o, 0))
          }
        }
        if (s.css({
            "-webkit-transform-origin": `50% 50% -${l / 2}px`,
            "transform-origin": `50% 50% -${l / 2}px`
          }), c.shadow)
          if (p) h.transform(`translate3d(0px, ${i / 2 + c.shadowOffset}px, ${-i / 2}px) rotateX(90deg) rotateZ(0deg) scale(${c.shadowScale})`);
          else {
            const e = Math.abs(m) - 90 * Math.floor(Math.abs(m) / 90),
              t = 1.5 - (Math.sin(2 * e * Math.PI / 360) / 2 + Math.cos(2 * e * Math.PI / 360) / 2),
              s = c.shadowScale,
              a = c.shadowScale / t,
              i = c.shadowOffset;
            h.transform(`scale3d(${s}, 1, ${a}) translate3d(0px, ${r / 2 + i}px, ${-r / 2 / a}px) rotateX(-90deg)`)
          }
        const f = o.isSafari || o.isWebView ? -l / 2 : 0;
        s.transform(`translate3d(0px,0,${f}px) rotateX(${e.isHorizontal() ? 0 : m}deg) rotateY(${e.isHorizontal() ? -m : 0}deg)`)
      },
      setTransition: t => {
        const {
          $el: s,
          slides: a
        } = e;
        a.transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t), e.params.cubeEffect.shadow && !e.isHorizontal() && s.find(".swiper-cube-shadow").transition(t)
      },
      perspective: () => !0,
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: !0,
        resistanceRatio: 0,
        spaceBetween: 0,
        centeredSlides: !1,
        virtualTranslate: !0
      })
    })
  }, function ({
    swiper: e,
    extendParams: t,
    on: s
  }) {
    t({
      flipEffect: {
        slideShadows: !0,
        limitRotation: !0,
        transformEl: null
      }
    }), F({
      effect: "flip",
      swiper: e,
      on: s,
      setTranslate: () => {
        const {
          slides: t,
          rtlTranslate: s
        } = e, a = e.params.flipEffect;
        for (let i = 0; i < t.length; i += 1) {
          const r = t.eq(i);
          let n = r[0].progress;
          e.params.flipEffect.limitRotation && (n = Math.max(Math.min(r[0].progress, 1), -1));
          const l = r[0].swiperSlideOffset;
          let o = -180 * n,
            d = 0,
            c = e.params.cssMode ? -l - e.translate : -l,
            p = 0;
          if (e.isHorizontal() ? s && (o = -o) : (p = c, c = 0, d = -o, o = 0), r[0].style.zIndex = -Math.abs(Math.round(n)) + t.length, a.slideShadows) {
            let t = e.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"),
              s = e.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");
            0 === t.length && (t = Z(a, r, e.isHorizontal() ? "left" : "top")), 0 === s.length && (s = Z(a, r, e.isHorizontal() ? "right" : "bottom")), t.length && (t[0].style.opacity = Math.max(-n, 0)), s.length && (s[0].style.opacity = Math.max(n, 0))
          }
          const u = `translate3d(${c}px, ${p}px, 0px) rotateX(${d}deg) rotateY(${o}deg)`;
          U(a, r).transform(u)
        }
      },
      setTransition: t => {
        const {
          transformEl: s
        } = e.params.flipEffect;
        (s ? e.slides.find(s) : e.slides).transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t), K({
          swiper: e,
          duration: t,
          transformEl: s
        })
      },
      perspective: () => !0,
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: !0,
        spaceBetween: 0,
        virtualTranslate: !e.params.cssMode
      })
    })
  }, function ({
    swiper: e,
    extendParams: t,
    on: s
  }) {
    t({
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        scale: 1,
        modifier: 1,
        slideShadows: !0,
        transformEl: null
      }
    }), F({
      effect: "coverflow",
      swiper: e,
      on: s,
      setTranslate: () => {
        const {
          width: t,
          height: s,
          slides: a,
          slidesSizesGrid: i
        } = e, r = e.params.coverflowEffect,
          n = e.isHorizontal(), l = e.translate, o = n ? t / 2 - l : s / 2 - l, d = n ? r.rotate : -r.rotate,
          c = r.depth;
        for (let e = 0, t = a.length; e < t; e += 1) {
          const t = a.eq(e),
            s = i[e],
            l = (o - t[0].swiperSlideOffset - s / 2) / s * r.modifier;
          let p = n ? d * l : 0,
            u = n ? 0 : d * l,
            h = -c * Math.abs(l),
            m = r.stretch;
          "string" == typeof m && -1 !== m.indexOf("%") && (m = parseFloat(r.stretch) / 100 * s);
          let f = n ? 0 : m * l,
            g = n ? m * l : 0,
            v = 1 - (1 - r.scale) * Math.abs(l);
          Math.abs(g) < .001 && (g = 0), Math.abs(f) < .001 && (f = 0), Math.abs(h) < .001 && (h = 0), Math.abs(p) < .001 && (p = 0), Math.abs(u) < .001 && (u = 0), Math.abs(v) < .001 && (v = 0);
          const w = `translate3d(${g}px,${f}px,${h}px)  rotateX(${u}deg) rotateY(${p}deg) scale(${v})`;
          if (U(r, t).transform(w), t[0].style.zIndex = 1 - Math.abs(Math.round(l)), r.slideShadows) {
            let e = n ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
              s = n ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
            0 === e.length && (e = Z(r, t, n ? "left" : "top")), 0 === s.length && (s = Z(r, t, n ? "right" : "bottom")), e.length && (e[0].style.opacity = l > 0 ? l : 0), s.length && (s[0].style.opacity = -l > 0 ? -l : 0)
          }
        }
      },
      setTransition: t => {
        const {
          transformEl: s
        } = e.params.coverflowEffect;
        (s ? e.slides.find(s) : e.slides).transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t)
      },
      perspective: () => !0,
      overwriteParams: () => ({
        watchSlidesProgress: !0
      })
    })
  }, function ({
    swiper: e,
    extendParams: t,
    on: s
  }) {
    t({
      creativeEffect: {
        transformEl: null,
        limitProgress: 1,
        shadowPerProgress: !1,
        progressMultiplier: 1,
        perspective: !0,
        prev: {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          opacity: 1,
          scale: 1
        },
        next: {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          opacity: 1,
          scale: 1
        }
      }
    });
    const a = e => "string" == typeof e ? e : `${e}px`;
    F({
      effect: "creative",
      swiper: e,
      on: s,
      setTranslate: () => {
        const {
          slides: t,
          $wrapperEl: s,
          slidesSizesGrid: i
        } = e,
        r = e.params.creativeEffect, {
          progressMultiplier: n
        } = r, l = e.params.centeredSlides;
        if (l) {
          const t = i[0] / 2 - e.params.slidesOffsetBefore || 0;
          s.transform(`translateX(calc(50% - ${t}px))`)
        }
        for (let s = 0; s < t.length; s += 1) {
          const i = t.eq(s),
            o = i[0].progress,
            d = Math.min(Math.max(i[0].progress, -r.limitProgress), r.limitProgress);
          let c = d;
          l || (c = Math.min(Math.max(i[0].originalProgress, -r.limitProgress), r.limitProgress));
          const p = i[0].swiperSlideOffset,
            u = [e.params.cssMode ? -p - e.translate : -p, 0, 0],
            h = [0, 0, 0];
          let m = !1;
          e.isHorizontal() || (u[1] = u[0], u[0] = 0);
          let f = {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            scale: 1,
            opacity: 1
          };
          d < 0 ? (f = r.next, m = !0) : d > 0 && (f = r.prev, m = !0), u.forEach(((e, t) => {
            u[t] = `calc(${e}px + (${a(f.translate[t])} * ${Math.abs(d * n)}))`
          })), h.forEach(((e, t) => {
            h[t] = f.rotate[t] * Math.abs(d * n)
          })), i[0].style.zIndex = -Math.abs(Math.round(o)) + t.length;
          const g = u.join(", "),
            v = `rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`,
            w = c < 0 ? `scale(${1 + (1 - f.scale) * c * n})` : `scale(${1 - (1 - f.scale) * c * n})`,
            b = c < 0 ? 1 + (1 - f.opacity) * c * n : 1 - (1 - f.opacity) * c * n,
            x = `translate3d(${g}) ${v} ${w}`;
          if (m && f.shadow || !m) {
            let e = i.children(".swiper-slide-shadow");
            if (0 === e.length && f.shadow && (e = Z(r, i)), e.length) {
              const t = r.shadowPerProgress ? d * (1 / r.limitProgress) : d;
              e[0].style.opacity = Math.min(Math.max(Math.abs(t), 0), 1)
            }
          }
          const y = U(r, i);
          y.transform(x).css({
            opacity: b
          }), f.origin && y.css("transform-origin", f.origin)
        }
      },
      setTransition: t => {
        const {
          transformEl: s
        } = e.params.creativeEffect;
        (s ? e.slides.find(s) : e.slides).transition(t).find(".swiper-slide-shadow").transition(t), K({
          swiper: e,
          duration: t,
          transformEl: s,
          allSlides: !0
        })
      },
      perspective: () => e.params.creativeEffect.perspective,
      overwriteParams: () => ({
        watchSlidesProgress: !0,
        virtualTranslate: !e.params.cssMode
      })
    })
  }, function ({
    swiper: e,
    extendParams: t,
    on: s
  }) {
    t({
      cardsEffect: {
        slideShadows: !0,
        transformEl: null
      }
    }), F({
      effect: "cards",
      swiper: e,
      on: s,
      setTranslate: () => {
        const {
          slides: t,
          activeIndex: s
        } = e, a = e.params.cardsEffect, {
          startTranslate: i,
          isTouched: r
        } = e.touchEventsData, n = e.translate;
        for (let l = 0; l < t.length; l += 1) {
          const o = t.eq(l),
            d = o[0].progress,
            c = Math.min(Math.max(d, -4), 4);
          let p = o[0].swiperSlideOffset;
          e.params.centeredSlides && !e.params.cssMode && e.$wrapperEl.transform(`translateX(${e.minTranslate()}px)`), e.params.centeredSlides && e.params.cssMode && (p -= t[0].swiperSlideOffset);
          let u = e.params.cssMode ? -p - e.translate : -p,
            h = 0;
          const m = -100 * Math.abs(c);
          let f = 1,
            g = -2 * c,
            v = 8 - .75 * Math.abs(c);
          const w = (l === s || l === s - 1) && c > 0 && c < 1 && (r || e.params.cssMode) && n < i,
            b = (l === s || l === s + 1) && c < 0 && c > -1 && (r || e.params.cssMode) && n > i;
          if (w || b) {
            const e = (1 - Math.abs((Math.abs(c) - .5) / .5)) ** .5;
            g += -28 * c * e, f += -.5 * e, v += 96 * e, h = -25 * e * Math.abs(c) + "%"
          }
          if (u = c < 0 ? `calc(${u}px + (${v * Math.abs(c)}%))` : c > 0 ? `calc(${u}px + (-${v * Math.abs(c)}%))` : `${u}px`, !e.isHorizontal()) {
            const e = h;
            h = u, u = e
          }
          const x = `\n        translate3d(${u}, ${h}, ${m}px)\n        rotateZ(${g}deg)\n        scale(${c < 0 ? "" + (1 + (1 - f) * c) : "" + (1 - (1 - f) * c)})\n      `;
          if (a.slideShadows) {
            let e = o.find(".swiper-slide-shadow");
            0 === e.length && (e = Z(a, o)), e.length && (e[0].style.opacity = Math.min(Math.max((Math.abs(c) - .5) / .5, 0), 1))
          }
          o[0].style.zIndex = -Math.abs(Math.round(d)) + t.length;
          U(a, o).transform(x)
        }
      },
      setTransition: t => {
        const {
          transformEl: s
        } = e.params.cardsEffect;
        (s ? e.slides.find(s) : e.slides).transition(t).find(".swiper-slide-shadow").transition(t), K({
          swiper: e,
          duration: t,
          transformEl: s
        })
      },
      perspective: () => !0,
      overwriteParams: () => ({
        watchSlidesProgress: !0,
        virtualTranslate: !e.params.cssMode
      })
    })
  }];
  return H.use(J), H
}));
//# sourceMappingURL=swiper-bundle.min.js.map;
// @fancyapps/ui/Fancybox v4.0.9
! function (t, e) {
  "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).window = t.window || {})
}(this, (function (t) {
  "use strict";

  function e(t, e) {
    var i = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(t);
      e && (n = n.filter((function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      }))), i.push.apply(i, n)
    }
    return i
  }

  function i(t) {
    for (var i = 1; i < arguments.length; i++) {
      var n = null != arguments[i] ? arguments[i] : {};
      i % 2 ? e(Object(n), !0).forEach((function (e) {
        r(t, e, n[e])
      })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : e(Object(n)).forEach((function (e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
      }))
    }
    return t
  }

  function n(t) {
    return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, n(t)
  }

  function o(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
  }

  function a(t, e) {
    for (var i = 0; i < e.length; i++) {
      var n = e[i];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
    }
  }

  function s(t, e, i) {
    return e && a(t.prototype, e), i && a(t, i), t
  }

  function r(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = i, t
  }

  function l(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0
      }
    }), e && h(t, e)
  }

  function c(t) {
    return c = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t)
    }, c(t)
  }

  function h(t, e) {
    return h = Object.setPrototypeOf || function (t, e) {
      return t.__proto__ = e, t
    }, h(t, e)
  }

  function d(t) {
    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t
  }

  function u(t, e) {
    if (e && ("object" == typeof e || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return d(t)
  }

  function f(t) {
    var e = function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
      } catch (t) {
        return !1
      }
    }();
    return function () {
      var i, n = c(t);
      if (e) {
        var o = c(this).constructor;
        i = Reflect.construct(n, arguments, o)
      } else i = n.apply(this, arguments);
      return u(this, i)
    }
  }

  function v(t, e) {
    return function (t) {
      if (Array.isArray(t)) return t
    }(t) || function (t, e) {
      var i = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
      if (null == i) return;
      var n, o, a = [],
        s = !0,
        r = !1;
      try {
        for (i = i.call(t); !(s = (n = i.next()).done) && (a.push(n.value), !e || a.length !== e); s = !0);
      } catch (t) {
        r = !0, o = t
      } finally {
        try {
          s || null == i.return || i.return()
        } finally {
          if (r) throw o
        }
      }
      return a
    }(t, e) || g(t, e) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }()
  }

  function p(t) {
    return function (t) {
      if (Array.isArray(t)) return m(t)
    }(t) || function (t) {
      if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
    }(t) || g(t) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }()
  }

  function g(t, e) {
    if (t) {
      if ("string" == typeof t) return m(t, e);
      var i = Object.prototype.toString.call(t).slice(8, -1);
      return "Object" === i && t.constructor && (i = t.constructor.name), "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? m(t, e) : void 0
    }
  }

  function m(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var i = 0, n = new Array(e); i < e; i++) n[i] = t[i];
    return n
  }

  function y(t, e) {
    var i = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
    if (!i) {
      if (Array.isArray(t) || (i = g(t)) || e && t && "number" == typeof t.length) {
        i && (t = i);
        var n = 0,
          o = function () {};
        return {
          s: o,
          n: function () {
            return n >= t.length ? {
              done: !0
            } : {
              done: !1,
              value: t[n++]
            }
          },
          e: function (t) {
            throw t
          },
          f: o
        }
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    var a, s = !0,
      r = !1;
    return {
      s: function () {
        i = i.call(t)
      },
      n: function () {
        var t = i.next();
        return s = t.done, t
      },
      e: function (t) {
        r = !0, a = t
      },
      f: function () {
        try {
          s || null == i.return || i.return()
        } finally {
          if (r) throw a
        }
      }
    }
  }

  var b = function (t) {
      return "object" === n(t) && null !== t && t.constructor === Object && "[object Object]" === Object.prototype.toString.call(t)
    },
    x = function t() {
      for (var e = !1, i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a];
      "boolean" == typeof o[0] && (e = o.shift());
      var s = o[0];
      if (!s || "object" !== n(s)) throw new Error("extendee must be an object");
      for (var r = o.slice(1), l = r.length, c = 0; c < l; c++) {
        var h = r[c];
        for (var d in h)
          if (h.hasOwnProperty(d)) {
            var u = h[d];
            if (e && (Array.isArray(u) || b(u))) {
              var f = Array.isArray(u) ? [] : {};
              s[d] = t(!0, s.hasOwnProperty(d) ? s[d] : f, u)
            } else s[d] = u
          }
      }
      return s
    },
    w = function (t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e4;
      return t = parseFloat(t) || 0, Math.round((t + Number.EPSILON) * e) / e
    },
    k = "undefined" != typeof window && window.ResizeObserver || function () {
      function t(e) {
        o(this, t), this.observables = [], this.boundCheck = this.check.bind(this), this.boundCheck(), this.callback = e
      }

      return s(t, [{
        key: "observe",
        value: function (t) {
          if (!this.observables.some((function (e) {
              return e.el === t
            }))) {
            var e = {
              el: t,
              size: {
                height: t.clientHeight,
                width: t.clientWidth
              }
            };
            this.observables.push(e)
          }
        }
      }, {
        key: "unobserve",
        value: function (t) {
          this.observables = this.observables.filter((function (e) {
            return e.el !== t
          }))
        }
      }, {
        key: "disconnect",
        value: function () {
          this.observables = []
        }
      }, {
        key: "check",
        value: function () {
          var t = this.observables.filter((function (t) {
            var e = t.el.clientHeight,
              i = t.el.clientWidth;
            if (t.size.height !== e || t.size.width !== i) return t.size.height = e, t.size.width = i, !0
          })).map((function (t) {
            return t.el
          }));
          t.length > 0 && this.callback(t), window.requestAnimationFrame(this.boundCheck)
        }
      }]), t
    }(),
    S = function () {
      var t = window.getSelection ? window.getSelection() : document.selection;
      t && t.rangeCount && t.getRangeAt(0).getClientRects().length && (t.removeAllRanges ? t.removeAllRanges() : t.empty && t.empty())
    },
    C = function t(e) {
      o(this, t), this.id = -1, this.id = e.pointerId || e.identifier || -1, this.pageX = e.pageX, this.pageY = e.pageY, this.clientX = e.clientX, this.clientY = e.clientY, this.nativePointer = e
    };

  function $(t, e) {
    return e ? Math.sqrt(Math.pow(e.clientX - t.clientX, 2) + Math.pow(e.clientY - t.clientY, 2)) : 0
  }

  function E(t, e) {
    return e ? {
      clientX: (t.clientX + e.clientX) / 2,
      clientY: (t.clientY + e.clientY) / 2
    } : t
  }

  var P = function () {
      function t(e) {
        var i = this,
          n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          a = n.start,
          s = void 0 === a ? function () {
            return !0
          } : a,
          r = n.move,
          l = void 0 === r ? function () {} : r,
          c = n.end,
          h = void 0 === c ? function () {} : c;
        o(this, t), this.element = e, this.startPointers = [], this.currentPointers = [], this.startCallback = s, this.moveCallback = l, this.endCallback = h, this.onStart = function (t) {
          if (!t.button || 0 === t.button) {
            var e = new C(t);
            if (!1 === i.startCallback(e, t)) return !1;
            t.preventDefault(), S(), i.currentPointers.push(e), i.startPointers.push(e), (t.target && "setPointerCapture" in t.target ? t.target : i.element).setPointerCapture(t.pointerId), i.element.addEventListener("pointermove", i.onMove), i.element.addEventListener("pointerup", i.onEnd), i.element.addEventListener("pointercancel", i.onEnd)
          }
        }, this.onMove = function (t) {
          for (var e = i.currentPointers.slice(), n = [], o = function () {
              var t = s[a],
                e = i.currentPointers.findIndex((function (e) {
                  return e.id === t.id
                }));
              if (e < 0) return "continue";
              n.push(t), i.currentPointers[e] = t
            }, a = 0, s = [new C(t)]; a < s.length; a++) o();
          n.length && i.moveCallback(e, i.currentPointers, t)
        }, this.onEnd = function (t) {
          var e = new C(t),
            n = i.currentPointers.findIndex((function (t) {
              return t.id === e.id
            }));
          if (-1 === n) return !1;
          i.currentPointers.splice(n, 1), i.startPointers.splice(n, 1), i.endCallback(e, t), i.currentPointers.length || (i.element.removeEventListener("pointermove", i.onMove), i.element.removeEventListener("pointerup", i.onEnd), i.element.removeEventListener("pointercancel", i.onEnd))
        }, this.element.addEventListener("pointerdown", this.onStart)
      }

      return s(t, [{
        key: "stop",
        value: function () {
          this.element.removeEventListener("pointerdown", this.onStart), this.element.removeEventListener("pointermove", this.onMove), this.element.removeEventListener("pointerup", this.onEnd), this.element.removeEventListener("pointercancel", this.onEnd)
        }
      }]), t
    }(),
    T = function t(e) {
      return !!(e && "object" === n(e) && e instanceof Element && e !== document.body) && (function (t) {
        var e = getComputedStyle(t)["overflow-y"],
          i = getComputedStyle(t)["overflow-x"],
          n = ("scroll" === e || "auto" === e) && Math.abs(t.scrollHeight - t.clientHeight) > 1,
          o = ("scroll" === i || "auto" === i) && Math.abs(t.scrollWidth - t.clientWidth) > 1;
        return n || o
      }(e) ? e : t(e.parentNode))
    },
    L = function (t, e) {
      return t.split(".").reduce((function (t, e) {
        return t && t[e]
      }), e)
    },
    A = function () {
      function t() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        o(this, t), this.options = x(!0, {}, e), this.plugins = [], this.events = {};
        for (var i = 0, n = ["on", "once"]; i < n.length; i++)
          for (var a = n[i], s = 0, r = Object.entries(this.options[a] || {}); s < r.length; s++) {
            var l = r[s];
            this[a].apply(this, p(l))
          }
      }

      return s(t, [{
        key: "option",
        value: function (t, e) {
          t = String(t);
          var i = L(t, this.options);
          if ("function" == typeof i) {
            for (var n, o = arguments.length, a = new Array(o > 2 ? o - 2 : 0), s = 2; s < o; s++) a[s - 2] = arguments[s];
            i = (n = i).call.apply(n, [this, this].concat(a))
          }
          return void 0 === i ? e : i
        }
      }, {
        key: "localize",
        value: function (t) {
          var e = this,
            i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
          return String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g, (function (t, n, o) {
            var a = !1;
            if (!(a = o ? e.option("".concat(n[0] + n.toLowerCase().substring(1), ".l10n.").concat(o)) : e.option("l10n.".concat(n)))) return n;
            for (var s = 0; s < i.length; s++) a = a.split(i[s][0]).join(i[s][1]);
            return a
          }))
        }
      }, {
        key: "on",
        value: function (t, e) {
          var i = this;
          if (b(t)) {
            for (var n = 0, o = Object.entries(t); n < o.length; n++) {
              var a = o[n];
              this.on.apply(this, p(a))
            }
            return this
          }
          return String(t).split(" ").forEach((function (t) {
            var n = i.events[t] = i.events[t] || []; -
            1 == n.indexOf(e) && n.push(e)
          })), this
        }
      }, {
        key: "once",
        value: function (t, e) {
          var i = this;
          if (b(t)) {
            for (var n = 0, o = Object.entries(t); n < o.length; n++) {
              var a = o[n];
              this.once.apply(this, p(a))
            }
            return this
          }
          return String(t).split(" ").forEach((function (t) {
            var n = function n() {
              i.off(t, n);
              for (var o = arguments.length, a = new Array(o), s = 0; s < o; s++) a[s] = arguments[s];
              e.call.apply(e, [i, i].concat(a))
            };
            n._ = e, i.on(t, n)
          })), this
        }
      }, {
        key: "off",
        value: function (t, e) {
          var i = this;
          if (!b(t)) return t.split(" ").forEach((function (t) {
            var n = i.events[t];
            if (!n || !n.length) return i;
            for (var o = -1, a = 0, s = n.length; a < s; a++) {
              var r = n[a];
              if (r && (r === e || r._ === e)) {
                o = a;
                break
              }
            } -
            1 != o && n.splice(o, 1)
          })), this;
          for (var n = 0, o = Object.entries(t); n < o.length; n++) {
            var a = o[n];
            this.off.apply(this, p(a))
          }
        }
      }, {
        key: "trigger",
        value: function (t) {
          for (var e = arguments.length, i = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++) i[n - 1] = arguments[n];
          var o, a = y(p(this.events[t] || []).slice());
          try {
            for (a.s(); !(o = a.n()).done;) {
              var s = o.value;
              if (s && !1 === s.call.apply(s, [this, this].concat(i))) return !1
            }
          } catch (t) {
            a.e(t)
          } finally {
            a.f()
          }
          var r, l = y(p(this.events["*"] || []).slice());
          try {
            for (l.s(); !(r = l.n()).done;) {
              var c = r.value;
              if (c && !1 === c.call.apply(c, [this, t, this].concat(i))) return !1
            }
          } catch (t) {
            l.e(t)
          } finally {
            l.f()
          }
          return !0
        }
      }, {
        key: "attachPlugins",
        value: function (t) {
          for (var e = {}, i = 0, n = Object.entries(t || {}); i < n.length; i++) {
            var o = v(n[i], 2),
              a = o[0],
              s = o[1];
            !1 === this.options[a] || this.plugins[a] || (this.options[a] = x({}, s.defaults || {}, this.options[a]), e[a] = new s(this))
          }
          for (var r = 0, l = Object.entries(e); r < l.length; r++) {
            var c = v(l[r], 2);
            c[0], c[1].attach(this)
          }
          return this.plugins = Object.assign({}, this.plugins, e), this
        }
      }, {
        key: "detachPlugins",
        value: function () {
          for (var t in this.plugins) {
            var e = void 0;
            (e = this.plugins[t]) && "function" == typeof e.detach && e.detach(this)
          }
          return this.plugins = {}, this
        }
      }]), t
    }(),
    O = {
      touch: !0,
      zoom: !0,
      pinchToZoom: !0,
      panOnlyZoomed: !1,
      lockAxis: !1,
      friction: .64,
      decelFriction: .88,
      zoomFriction: .74,
      bounceForce: .2,
      baseScale: 1,
      minScale: 1,
      maxScale: 2,
      step: .5,
      textSelection: !1,
      click: "toggleZoom",
      wheel: "zoom",
      wheelFactor: 42,
      wheelLimit: 5,
      draggableClass: "is-draggable",
      draggingClass: "is-dragging",
      ratio: 1
    },
    z = function (t) {
      l(n, t);
      var e = f(n);

      function n(t) {
        var i, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        o(this, n), (i = e.call(this, x(!0, {}, O, a))).state = "init", i.$container = t;
        for (var s = 0, r = ["onLoad", "onWheel", "onClick"]; s < r.length; s++) {
          var l = r[s];
          i[l] = i[l].bind(d(i))
        }
        return i.initLayout(), i.resetValues(), i.attachPlugins(n.Plugins), i.trigger("init"), i.updateMetrics(), i.attachEvents(), i.trigger("ready"), !1 === i.option("centerOnStart") ? i.state = "ready" : i.panTo({
          friction: 0
        }), i
      }

      return s(n, [{
        key: "initLayout",
        value: function () {
          var t = this.$container;
          if (!(t instanceof HTMLElement)) throw new Error("Panzoom: Container not found");
          var e = this.option("content") || t.querySelector(".panzoom__content");
          if (!e) throw new Error("Panzoom: Content not found");
          this.$content = e;
          var i, n = this.option("viewport") || t.querySelector(".panzoom__viewport");
          n || !1 === this.option("wrapInner") || ((n = document.createElement("div")).classList.add("panzoom__viewport"), (i = n).append.apply(i, p(t.childNodes)), t.appendChild(n));
          this.$viewport = n || e.parentNode
        }
      }, {
        key: "resetValues",
        value: function () {
          this.updateRate = this.option("updateRate", /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 250 : 24), this.container = {
            width: 0,
            height: 0
          }, this.viewport = {
            width: 0,
            height: 0
          }, this.content = {
            origHeight: 0,
            origWidth: 0,
            width: 0,
            height: 0,
            x: this.option("x", 0),
            y: this.option("y", 0),
            scale: this.option("baseScale")
          }, this.transform = {
            x: 0,
            y: 0,
            scale: 1
          }, this.resetDragPosition()
        }
      }, {
        key: "onLoad",
        value: function (t) {
          this.updateMetrics(), this.panTo({
            scale: this.option("baseScale"),
            friction: 0
          }), this.trigger("load", t)
        }
      }, {
        key: "onClick",
        value: function (t) {
          if (!t.defaultPrevented)
            if (this.option("textSelection") && window.getSelection().toString().length) t.stopPropagation();
            else {
              var e = this.$content.getClientRects()[0];
              if ("ready" !== this.state && (this.dragPosition.midPoint || Math.abs(e.top - this.dragStart.rect.top) > 1 || Math.abs(e.left - this.dragStart.rect.left) > 1)) return t.preventDefault(), void t.stopPropagation();
              !1 !== this.trigger("click", t) && this.option("zoom") && "toggleZoom" === this.option("click") && (t.preventDefault(), t.stopPropagation(), this.zoomWithClick(t))
            }
        }
      }, {
        key: "onWheel",
        value: function (t) {
          !1 !== this.trigger("wheel", t) && this.option("zoom") && this.option("wheel") && this.zoomWithWheel(t)
        }
      }, {
        key: "zoomWithWheel",
        value: function (t) {
          void 0 === this.changedDelta && (this.changedDelta = 0);
          var e = Math.max(-1, Math.min(1, -t.deltaY || -t.deltaX || t.wheelDelta || -t.detail)),
            i = this.content.scale,
            n = i * (100 + e * this.option("wheelFactor")) / 100;
          if (e < 0 && Math.abs(i - this.option("minScale")) < .01 || e > 0 && Math.abs(i - this.option("maxScale")) < .01 ? (this.changedDelta += Math.abs(e), n = i) : (this.changedDelta = 0, n = Math.max(Math.min(n, this.option("maxScale")), this.option("minScale"))), !(this.changedDelta > this.option("wheelLimit")) && (t.preventDefault(), n !== i)) {
            var o = this.$content.getBoundingClientRect(),
              a = t.clientX - o.left,
              s = t.clientY - o.top;
            this.zoomTo(n, {
              x: a,
              y: s
            })
          }
        }
      }, {
        key: "zoomWithClick",
        value: function (t) {
          var e = this.$content.getClientRects()[0],
            i = t.clientX - e.left,
            n = t.clientY - e.top;
          this.toggleZoom({
            x: i,
            y: n
          })
        }
      }, {
        key: "attachEvents",
        value: function () {
          var t = this;
          this.$content.addEventListener("load", this.onLoad), this.$container.addEventListener("wheel", this.onWheel, {
            passive: !1
          }), this.$container.addEventListener("click", this.onClick, {
            passive: !1
          }), this.initObserver();
          var e = new P(this.$container, {
            start: function (i, n) {
              if (!t.option("touch")) return !1;
              if (!(t.velocity.scale < 0)) {
                if (!e.currentPointers.length) {
                  if (-1 !== ["BUTTON", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].indexOf(n.target.nodeName)) return !1;
                  if (t.option("textSelection") && function (t, e, i) {
                      for (var n = t.childNodes, o = document.createRange(), a = 0; a < n.length; a++) {
                        var s = n[a];
                        if (s.nodeType === Node.TEXT_NODE) {
                          o.selectNodeContents(s);
                          var r = o.getBoundingClientRect();
                          if (e >= r.left && i >= r.top && e <= r.right && i <= r.bottom) return s
                        }
                      }
                      return !1
                    }(n.target, n.clientX, n.clientY)) return !1;
                  if (T(n.target)) return !1
                }
                return !1 !== t.trigger("touchStart", n) && (t.state = "pointerdown", t.resetDragPosition(), t.dragPosition.midPoint = null, t.dragPosition.time = Date.now(), !0)
              }
            },
            move: function (i, n, o) {
              if ("pointerdown" === t.state)
                if (0 != t.trigger("touchMove", o)) {
                  if (!(n.length < 2 && 1 == t.option("panOnlyZoomed") && t.content.width <= t.viewport.width && t.content.height <= t.viewport.height && t.transform.scale <= t.option("baseScale")) && (!(n.length > 1) || t.option("zoom") && !1 !== t.option("pinchToZoom"))) {
                    o.preventDefault(), o.stopPropagation();
                    var a = E(i[0], i[1]),
                      s = E(n[0], n[1]),
                      r = s.clientX - a.clientX,
                      l = s.clientY - a.clientY,
                      c = $(i[0], i[1]),
                      h = $(n[0], n[1]),
                      d = c ? h / c : 1;
                    t.dragOffset.x += r, t.dragOffset.y += l, t.dragOffset.scale *= d, t.dragOffset.time = Date.now() - t.dragPosition.time;
                    var u = 1 === t.dragStart.scale && t.option("lockAxis");
                    if (u && !t.lockAxis) {
                      if (Math.abs(t.dragOffset.x) < 6 && Math.abs(t.dragOffset.y) < 6) return;
                      if ("xy" === u) {
                        var f = Math.abs(180 * Math.atan2(t.dragOffset.y, t.dragOffset.x) / Math.PI);
                        t.lockAxis = f > 45 && f < 135 ? "y" : "x"
                      } else t.lockAxis = u
                    }
                    if (t.lockAxis && (t.dragOffset["x" === t.lockAxis ? "y" : "x"] = 0), t.$container.classList.add(t.option("draggingClass")), t.transform.scale === t.option("baseScale") && "y" === t.lockAxis || (t.dragPosition.x = t.dragStart.x + t.dragOffset.x), t.transform.scale === t.option("baseScale") && "x" === t.lockAxis || (t.dragPosition.y = t.dragStart.y + t.dragOffset.y), t.dragPosition.scale = t.dragStart.scale * t.dragOffset.scale, n.length > 1) {
                      var v = E(e.startPointers[0], e.startPointers[1]),
                        p = v.clientX - t.dragStart.rect.x,
                        g = v.clientY - t.dragStart.rect.y,
                        m = t.getZoomDelta(t.content.scale * t.dragOffset.scale, p, g),
                        y = m.deltaX,
                        b = m.deltaY;
                      t.dragPosition.x -= y, t.dragPosition.y -= b, t.dragPosition.midPoint = s
                    } else t.setDragResistance();
                    t.transform = {
                      x: t.dragPosition.x,
                      y: t.dragPosition.y,
                      scale: t.dragPosition.scale
                    }, t.startAnimation()
                  }
                } else o.preventDefault()
            },
            end: function (n, o) {
              if ("pointerdown" === t.state)
                if (t._dragOffset = i({}, t.dragOffset), e.currentPointers.length) t.resetDragPosition();
                else if (t.state = "decel", t.friction = t.option("decelFriction"), t.recalculateTransform(), t.$container.classList.remove(t.option("draggingClass")), !1 !== t.trigger("touchEnd", o) && "decel" === t.state) {
                var a = t.option("minScale");
                if (t.transform.scale < a) t.zoomTo(a, {
                  friction: .64
                });
                else {
                  var s = t.option("maxScale");
                  if (t.transform.scale - s > .01) {
                    var r = t.dragPosition.midPoint || n,
                      l = t.$content.getClientRects()[0];
                    t.zoomTo(s, {
                      friction: .64,
                      x: r.clientX - l.left,
                      y: r.clientY - l.top
                    })
                  } else;
                }
              }
            }
          });
          this.pointerTracker = e
        }
      }, {
        key: "initObserver",
        value: function () {
          var t = this;
          this.resizeObserver || (this.resizeObserver = new k((function () {
            t.updateTimer || (t.updateTimer = setTimeout((function () {
              var e = t.$container.getBoundingClientRect();
              e.width && e.height ? ((Math.abs(e.width - t.container.width) > 1 || Math.abs(e.height - t.container.height) > 1) && (t.isAnimating() && t.endAnimation(!0), t.updateMetrics(), t.panTo({
                x: t.content.x,
                y: t.content.y,
                scale: t.option("baseScale"),
                friction: 0
              })), t.updateTimer = null) : t.updateTimer = null
            }), t.updateRate))
          })), this.resizeObserver.observe(this.$container))
        }
      }, {
        key: "resetDragPosition",
        value: function () {
          this.lockAxis = null, this.friction = this.option("friction"), this.velocity = {
            x: 0,
            y: 0,
            scale: 0
          };
          var t = this.content,
            e = t.x,
            n = t.y,
            o = t.scale;
          this.dragStart = {
            rect: this.$content.getBoundingClientRect(),
            x: e,
            y: n,
            scale: o
          }, this.dragPosition = i(i({}, this.dragPosition), {}, {
            x: e,
            y: n,
            scale: o
          }), this.dragOffset = {
            x: 0,
            y: 0,
            scale: 1,
            time: 0
          }
        }
      }, {
        key: "updateMetrics",
        value: function (t) {
          !0 !== t && this.trigger("beforeUpdate");
          var e, n = this.$container,
            o = this.$content,
            a = this.$viewport,
            s = this.$content instanceof HTMLImageElement,
            r = this.option("zoom"),
            l = this.option("resizeParent", r),
            c = (e = this.$content, Math.max(parseFloat(e.naturalWidth || 0), parseFloat(e.width && e.width.baseVal && e.width.baseVal.value || 0), parseFloat(e.offsetWidth || 0), parseFloat(e.scrollWidth || 0))),
            h = function (t) {
              return Math.max(parseFloat(t.naturalHeight || 0), parseFloat(t.height && t.height.baseVal && t.height.baseVal.value || 0), parseFloat(t.offsetHeight || 0), parseFloat(t.scrollHeight || 0))
            }(this.$content);
          Object.assign(o.style, {
            width: "",
            height: "",
            maxWidth: "",
            maxHeight: ""
          }), l && Object.assign(a.style, {
            width: "",
            height: ""
          });
          var d = this.option("ratio"),
            u = c = w(c * d),
            f = h = w(h * d),
            v = o.getBoundingClientRect(),
            p = a.getBoundingClientRect(),
            g = a == n ? p : n.getBoundingClientRect(),
            m = Math.max(a.offsetWidth, w(p.width)),
            y = Math.max(a.offsetHeight, w(p.height)),
            b = window.getComputedStyle(a);
          if (m -= parseFloat(b.paddingLeft) + parseFloat(b.paddingRight), y -= parseFloat(b.paddingTop) + parseFloat(b.paddingBottom), this.viewport.width = m, this.viewport.height = y, r) {
            if (Math.abs(c - v.width) > .1 || Math.abs(h - v.height) > .1) {
              var x = function (t, e, i, n) {
                var o = Math.min(i / t || 0, n / e);
                return {
                  width: t * o || 0,
                  height: e * o || 0
                }
              }(c, h, Math.min(c, v.width), Math.min(h, v.height));
              u = w(x.width), f = w(x.height)
            }
            Object.assign(o.style, {
              width: "".concat(u, "px"),
              height: "".concat(f, "px"),
              transform: ""
            })
          }
          if (l && (Object.assign(a.style, {
              width: "".concat(u, "px"),
              height: "".concat(f, "px")
            }), this.viewport = i(i({}, this.viewport), {}, {
              width: u,
              height: f
            })), s && r && "function" != typeof this.options.maxScale) {
            var k = this.option("maxScale");
            this.options.maxScale = function () {
              return this.content.origWidth > 0 && this.content.fitWidth > 0 ? this.content.origWidth / this.content.fitWidth : k
            }
          }
          this.content = i(i({}, this.content), {}, {
            origWidth: c,
            origHeight: h,
            fitWidth: u,
            fitHeight: f,
            width: u,
            height: f,
            scale: 1,
            isZoomable: r
          }), this.container = {
            width: g.width,
            height: g.height
          }, !0 !== t && this.trigger("afterUpdate")
        }
      }, {
        key: "zoomIn",
        value: function (t) {
          this.zoomTo(this.content.scale + (t || this.option("step")))
        }
      }, {
        key: "zoomOut",
        value: function (t) {
          this.zoomTo(this.content.scale - (t || this.option("step")))
        }
      }, {
        key: "toggleZoom",
        value: function () {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            e = this.option("maxScale"),
            i = this.option("baseScale"),
            n = this.content.scale > i + .5 * (e - i) ? i : e;
          this.zoomTo(n, t)
        }
      }, {
        key: "zoomTo",
        value: function () {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.option("baseScale"),
            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            i = e.x,
            n = void 0 === i ? null : i,
            o = e.y,
            a = void 0 === o ? null : o;
          t = Math.max(Math.min(t, this.option("maxScale")), this.option("minScale"));
          var s = w(this.content.scale / (this.content.width / this.content.fitWidth), 1e7);
          null === n && (n = this.content.width * s * .5), null === a && (a = this.content.height * s * .5);
          var r = this.getZoomDelta(t, n, a),
            l = r.deltaX,
            c = r.deltaY;
          n = this.content.x - l, a = this.content.y - c, this.panTo({
            x: n,
            y: a,
            scale: t,
            friction: this.option("zoomFriction")
          })
        }
      }, {
        key: "getZoomDelta",
        value: function (t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
            n = this.content.fitWidth * this.content.scale,
            o = this.content.fitHeight * this.content.scale,
            a = e > 0 && n ? e / n : 0,
            s = i > 0 && o ? i / o : 0,
            r = this.content.fitWidth * t,
            l = this.content.fitHeight * t,
            c = (r - n) * a,
            h = (l - o) * s;
          return {
            deltaX: c,
            deltaY: h
          }
        }
      }, {
        key: "panTo",
        value: function () {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            e = t.x,
            n = void 0 === e ? this.content.x : e,
            o = t.y,
            a = void 0 === o ? this.content.y : o,
            s = t.scale,
            r = t.friction,
            l = void 0 === r ? this.option("friction") : r,
            c = t.ignoreBounds,
            h = void 0 !== c && c;
          if (s = s || this.content.scale || 1, !h) {
            var d = this.getBounds(s),
              u = d.boundX,
              f = d.boundY;
            u && (n = Math.max(Math.min(n, u.to), u.from)), f && (a = Math.max(Math.min(a, f.to), f.from))
          }
          this.friction = l, this.transform = i(i({}, this.transform), {}, {
            x: n,
            y: a,
            scale: s
          }), l ? (this.state = "panning", this.velocity = {
            x: (1 / this.friction - 1) * (n - this.content.x),
            y: (1 / this.friction - 1) * (a - this.content.y),
            scale: (1 / this.friction - 1) * (s - this.content.scale)
          }, this.startAnimation()) : this.endAnimation()
        }
      }, {
        key: "startAnimation",
        value: function () {
          var t = this;
          this.rAF ? cancelAnimationFrame(this.rAF) : this.trigger("startAnimation"), this.rAF = requestAnimationFrame((function () {
            return t.animate()
          }))
        }
      }, {
        key: "animate",
        value: function () {
          var t = this;
          if (this.setEdgeForce(), this.setDragForce(), this.velocity.x *= this.friction, this.velocity.y *= this.friction, this.velocity.scale *= this.friction, this.content.x += this.velocity.x, this.content.y += this.velocity.y, this.content.scale += this.velocity.scale, this.isAnimating()) this.setTransform();
          else if ("pointerdown" !== this.state) return void this.endAnimation();
          this.rAF = requestAnimationFrame((function () {
            return t.animate()
          }))
        }
      }, {
        key: "getBounds",
        value: function (t) {
          var e = this.boundX,
            i = this.boundY;
          if (void 0 !== e && void 0 !== i) return {
            boundX: e,
            boundY: i
          };
          e = {
            from: 0,
            to: 0
          }, i = {
            from: 0,
            to: 0
          }, t = t || this.transform.scale;
          var n = this.content.fitWidth,
            o = this.content.fitHeight,
            a = n * t,
            s = o * t,
            r = this.viewport.width,
            l = this.viewport.height;
          if (n <= r) {
            var c = .5 * (r - a),
              h = .5 * (a - n);
            e.from = w(c - h), e.to = w(c + h)
          } else e.from = w(r - a);
          if (o <= l) {
            var d = .5 * (l - s),
              u = .5 * (s - o);
            i.from = w(d - u), i.to = w(d + u)
          } else i.from = w(l - a);
          return {
            boundX: e,
            boundY: i
          }
        }
      }, {
        key: "setEdgeForce",
        value: function () {
          if ("decel" === this.state) {
            var t, e, i, n, o = this.option("bounceForce"),
              a = this.getBounds(Math.max(this.transform.scale, this.content.scale)),
              s = a.boundX,
              r = a.boundY;
            if (s && (t = this.content.x < s.from, e = this.content.x > s.to), r && (i = this.content.y < r.from, n = this.content.y > r.to), t || e) {
              var l = ((t ? s.from : s.to) - this.content.x) * o,
                c = this.content.x + (this.velocity.x + l) / this.friction;
              c >= s.from && c <= s.to && (l += this.velocity.x), this.velocity.x = l, this.recalculateTransform()
            }
            if (i || n) {
              var h = ((i ? r.from : r.to) - this.content.y) * o,
                d = this.content.y + (h + this.velocity.y) / this.friction;
              d >= r.from && d <= r.to && (h += this.velocity.y), this.velocity.y = h, this.recalculateTransform()
            }
          }
        }
      }, {
        key: "setDragResistance",
        value: function () {
          if ("pointerdown" === this.state) {
            var t, e, i, n, o = this.getBounds(this.dragPosition.scale),
              a = o.boundX,
              s = o.boundY;
            if (a && (t = this.dragPosition.x < a.from, e = this.dragPosition.x > a.to), s && (i = this.dragPosition.y < s.from, n = this.dragPosition.y > s.to), (t || e) && (!t || !e)) {
              var r = t ? a.from : a.to,
                l = r - this.dragPosition.x;
              this.dragPosition.x = r - .3 * l
            }
            if ((i || n) && (!i || !n)) {
              var c = i ? s.from : s.to,
                h = c - this.dragPosition.y;
              this.dragPosition.y = c - .3 * h
            }
          }
        }
      }, {
        key: "setDragForce",
        value: function () {
          "pointerdown" === this.state && (this.velocity.x = this.dragPosition.x - this.content.x, this.velocity.y = this.dragPosition.y - this.content.y, this.velocity.scale = this.dragPosition.scale - this.content.scale)
        }
      }, {
        key: "recalculateTransform",
        value: function () {
          this.transform.x = this.content.x + this.velocity.x / (1 / this.friction - 1), this.transform.y = this.content.y + this.velocity.y / (1 / this.friction - 1), this.transform.scale = this.content.scale + this.velocity.scale / (1 / this.friction - 1)
        }
      }, {
        key: "isAnimating",
        value: function () {
          return !(!this.friction || !(Math.abs(this.velocity.x) > .05 || Math.abs(this.velocity.y) > .05 || Math.abs(this.velocity.scale) > .05))
        }
      }, {
        key: "setTransform",
        value: function (t) {
          var e, n, o, a, s;
          (t ? (e = w(this.transform.x), n = w(this.transform.y), o = this.transform.scale, this.content = i(i({}, this.content), {}, {
            x: e,
            y: n,
            scale: o
          })) : (e = w(this.content.x), n = w(this.content.y), o = this.content.scale / (this.content.width / this.content.fitWidth), this.content = i(i({}, this.content), {}, {
            x: e,
            y: n
          })), this.trigger("beforeTransform"), e = w(this.content.x), n = w(this.content.y), t && this.option("zoom")) ? (a = w(this.content.fitWidth * o), s = w(this.content.fitHeight * o), this.content.width = a, this.content.height = s, this.transform = i(i({}, this.transform), {}, {
            width: a,
            height: s,
            scale: o
          }), Object.assign(this.$content.style, {
            width: "".concat(a, "px"),
            height: "".concat(s, "px"),
            maxWidth: "none",
            maxHeight: "none",
            transform: "translate3d(".concat(e, "px, ").concat(n, "px, 0) scale(1)")
          })) : this.$content.style.transform = "translate3d(".concat(e, "px, ").concat(n, "px, 0) scale(").concat(o, ")");
          this.trigger("afterTransform")
        }
      }, {
        key: "endAnimation",
        value: function (t) {
          cancelAnimationFrame(this.rAF), this.rAF = null, this.velocity = {
            x: 0,
            y: 0,
            scale: 0
          }, this.setTransform(!0), this.state = "ready", this.handleCursor(), !0 !== t && this.trigger("endAnimation")
        }
      }, {
        key: "handleCursor",
        value: function () {
          var t = this.option("draggableClass");
          t && this.option("touch") && (1 == this.option("panOnlyZoomed") && this.content.width <= this.viewport.width && this.content.height <= this.viewport.height && this.transform.scale <= this.option("baseScale") ? this.$container.classList.remove(t) : this.$container.classList.add(t))
        }
      }, {
        key: "detachEvents",
        value: function () {
          this.$content.removeEventListener("load", this.onLoad), this.$container.removeEventListener("wheel", this.onWheel, {
            passive: !1
          }), this.$container.removeEventListener("click", this.onClick, {
            passive: !1
          }), this.pointerTracker && (this.pointerTracker.stop(), this.pointerTracker = null), this.resizeObserver && (this.resizeObserver.disconnect(), this.resizeObserver = null)
        }
      }, {
        key: "destroy",
        value: function () {
          "destroy" !== this.state && (this.state = "destroy", clearTimeout(this.updateTimer), this.updateTimer = null, cancelAnimationFrame(this.rAF), this.rAF = null, this.detachEvents(), this.detachPlugins(), this.resetDragPosition())
        }
      }]), n
    }(A);
  z.version = "4.0.9", z.Plugins = {};
  var _ = function (t, e) {
      var i = 0;
      return function () {
        var n = (new Date).getTime();
        if (!(n - i < e)) return i = n, t.apply(void 0, arguments)
      }
    },
    M = function () {
      function t(e) {
        o(this, t), this.$container = null, this.$prev = null, this.$next = null, this.carousel = e, this.onRefresh = this.onRefresh.bind(this)
      }

      return s(t, [{
        key: "option",
        value: function (t) {
          return this.carousel.option("Navigation.".concat(t))
        }
      }, {
        key: "createButton",
        value: function (t) {
          var e, i = this,
            n = document.createElement("button");
          n.setAttribute("title", this.carousel.localize("{{".concat(t.toUpperCase(), "}}")));
          var o = this.option("classNames.button") + " " + this.option("classNames.".concat(t));
          return (e = n.classList).add.apply(e, p(o.split(" "))), n.setAttribute("tabindex", "0"), n.innerHTML = this.carousel.localize(this.option("".concat(t, "Tpl"))), n.addEventListener("click", (function (e) {
            e.preventDefault(), e.stopPropagation(), i.carousel["slide".concat("next" === t ? "Next" : "Prev")]()
          })), n
        }
      }, {
        key: "build",
        value: function () {
          this.$container || (this.$container = document.createElement("div"), this.$container.classList.add(this.option("classNames.main")), this.carousel.$container.appendChild(this.$container)), this.$next || (this.$next = this.createButton("next"), this.$container.appendChild(this.$next)), this.$prev || (this.$prev = this.createButton("prev"), this.$container.appendChild(this.$prev))
        }
      }, {
        key: "onRefresh",
        value: function () {
          var t = this.carousel.pages.length;
          t <= 1 || t > 1 && this.carousel.elemDimWidth < this.carousel.wrapDimWidth && !Number.isInteger(this.carousel.option("slidesPerPage")) ? this.cleanup() : (this.build(), this.$prev.removeAttribute("disabled"), this.$next.removeAttribute("disabled"), this.carousel.option("infiniteX", this.carousel.option("infinite")) || (this.carousel.page <= 0 && this.$prev.setAttribute("disabled", ""), this.carousel.page >= t - 1 && this.$next.setAttribute("disabled", "")))
        }
      }, {
        key: "cleanup",
        value: function () {
          this.$prev && this.$prev.remove(), this.$prev = null, this.$next && this.$next.remove(), this.$next = null, this.$container && this.$container.remove(), this.$container = null
        }
      }, {
        key: "attach",
        value: function () {
          this.carousel.on("refresh change", this.onRefresh)
        }
      }, {
        key: "detach",
        value: function () {
          this.carousel.off("refresh change", this.onRefresh), this.cleanup()
        }
      }]), t
    }();
  M.defaults = {
    prevTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>',
    nextTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',
    classNames: {
      main: "carousel__nav",
      button: "carousel__button",
      next: "is-next",
      prev: "is-prev"
    }
  };
  var I = function () {
      function t(e) {
        o(this, t), this.carousel = e, this.$list = null, this.events = {
          change: this.onChange.bind(this),
          refresh: this.onRefresh.bind(this)
        }
      }

      return s(t, [{
        key: "buildList",
        value: function () {
          var t = this;
          if (!(this.carousel.pages.length < this.carousel.option("Dots.minSlideCount"))) {
            var e = document.createElement("ol");
            return e.classList.add("carousel__dots"), e.addEventListener("click", (function (e) {
              if ("page" in e.target.dataset) {
                e.preventDefault(), e.stopPropagation();
                var i = parseInt(e.target.dataset.page, 10),
                  n = t.carousel;
                i !== n.page && (n.pages.length < 3 && n.option("infinite") ? n[0 == i ? "slidePrev" : "slideNext"]() : n.slideTo(i))
              }
            })), this.$list = e, this.carousel.$container.appendChild(e), this.carousel.$container.classList.add("has-dots"), e
          }
        }
      }, {
        key: "removeList",
        value: function () {
          this.$list && (this.$list.parentNode.removeChild(this.$list), this.$list = null), this.carousel.$container.classList.remove("has-dots")
        }
      }, {
        key: "rebuildDots",
        value: function () {
          var t = this,
            e = this.$list,
            i = !!e,
            n = this.carousel.pages.length;
          if (n < 2) i && this.removeList();
          else {
            i || (e = this.buildList());
            var o = this.$list.children.length;
            if (o > n)
              for (var a = n; a < o; a++) this.$list.removeChild(this.$list.lastChild);
            else {
              for (var s = function (e) {
                  var i = document.createElement("li");
                  i.classList.add("carousel__dot"), i.dataset.page = e, i.setAttribute("role", "button"), i.setAttribute("tabindex", "0"), i.setAttribute("title", t.carousel.localize("{{GOTO}}", [
                    ["%d", e + 1]
                  ])), i.addEventListener("keydown", (function (t) {
                    var e, n = t.code;
                    "Enter" === n || "NumpadEnter" === n ? e = i : "ArrowRight" === n ? e = i.nextSibling : "ArrowLeft" === n && (e = i.previousSibling), e && e.click()
                  })), t.$list.appendChild(i)
                }, r = o; r < n; r++) s(r);
              this.setActiveDot()
            }
          }
        }
      }, {
        key: "setActiveDot",
        value: function () {
          if (this.$list) {
            this.$list.childNodes.forEach((function (t) {
              t.classList.remove("is-selected")
            }));
            var t = this.$list.childNodes[this.carousel.page];
            t && t.classList.add("is-selected")
          }
        }
      }, {
        key: "onChange",
        value: function () {
          this.setActiveDot()
        }
      }, {
        key: "onRefresh",
        value: function () {
          this.rebuildDots()
        }
      }, {
        key: "attach",
        value: function () {
          this.carousel.on(this.events)
        }
      }, {
        key: "detach",
        value: function () {
          this.removeList(), this.carousel.off(this.events), this.carousel = null
        }
      }]), t
    }(),
    F = function () {
      function t(e) {
        o(this, t), this.carousel = e, this.selectedIndex = null, this.friction = 0, this.onNavReady = this.onNavReady.bind(this), this.onNavClick = this.onNavClick.bind(this), this.onNavCreateSlide = this.onNavCreateSlide.bind(this), this.onTargetChange = this.onTargetChange.bind(this)
      }

      return s(t, [{
        key: "addAsTargetFor",
        value: function (t) {
          this.target = this.carousel, this.nav = t, this.attachEvents()
        }
      }, {
        key: "addAsNavFor",
        value: function (t) {
          this.target = t, this.nav = this.carousel, this.attachEvents()
        }
      }, {
        key: "attachEvents",
        value: function () {
          this.nav.options.initialSlide = this.target.options.initialPage, this.nav.on("ready", this.onNavReady), this.nav.on("createSlide", this.onNavCreateSlide), this.nav.on("Panzoom.click", this.onNavClick), this.target.on("change", this.onTargetChange), this.target.on("Panzoom.afterUpdate", this.onTargetChange)
        }
      }, {
        key: "onNavReady",
        value: function () {
          this.onTargetChange(!0)
        }
      }, {
        key: "onNavClick",
        value: function (t, e, i) {
          var n = i.target.closest(".carousel__slide");
          if (n) {
            i.stopPropagation();
            var o = parseInt(n.dataset.index, 10),
              a = this.target.findPageForSlide(o);
            this.target.page !== a && this.target.slideTo(a, {
              friction: this.friction
            }), this.markSelectedSlide(o)
          }
        }
      }, {
        key: "onNavCreateSlide",
        value: function (t, e) {
          e.index === this.selectedIndex && this.markSelectedSlide(e.index)
        }
      }, {
        key: "onTargetChange",
        value: function () {
          var t = this.target.pages[this.target.page].indexes[0],
            e = this.nav.findPageForSlide(t);
          this.nav.slideTo(e), this.markSelectedSlide(t)
        }
      }, {
        key: "markSelectedSlide",
        value: function (t) {
          this.selectedIndex = t, p(this.nav.slides).filter((function (t) {
            return t.$el && t.$el.classList.remove("is-nav-selected")
          }));
          var e = this.nav.slides[t];
          e && e.$el && e.$el.classList.add("is-nav-selected")
        }
      }, {
        key: "attach",
        value: function (t) {
          var e = t.options.Sync;
          (e.target || e.nav) && (e.target ? this.addAsNavFor(e.target) : e.nav && this.addAsTargetFor(e.nav), this.friction = e.friction)
        }
      }, {
        key: "detach",
        value: function () {
          this.nav && (this.nav.off("ready", this.onNavReady), this.nav.off("Panzoom.click", this.onNavClick), this.nav.off("createSlide", this.onNavCreateSlide)), this.target && (this.target.off("Panzoom.afterUpdate", this.onTargetChange), this.target.off("change", this.onTargetChange))
        }
      }]), t
    }();
  F.defaults = {
    friction: .92
  };
  var R = {
      Navigation: M,
      Dots: I,
      Sync: F
    },
    N = {
      slides: [],
      preload: 0,
      slidesPerPage: "auto",
      initialPage: null,
      initialSlide: null,
      friction: .92,
      center: !0,
      infinite: !0,
      fill: !0,
      dragFree: !1,
      prefix: "",
      classNames: {
        viewport: "carousel__viewport",
        track: "carousel__track",
        slide: "carousel__slide",
        slideSelected: "is-selected"
      },
      l10n: {
        NEXT: "Next slide",
        PREV: "Previous slide",
        GOTO: "Go to slide #%d"
      }
    },
    D = function (t) {
      l(n, t);
      var e = f(n);

      function n(t) {
        var i, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (o(this, n), a = x(!0, {}, N, a), (i = e.call(this, a)).state = "init", i.$container = t, !(i.$container instanceof HTMLElement)) throw new Error("No root element provided");
        return i.slideNext = _(i.slideNext.bind(d(i)), 250), i.slidePrev = _(i.slidePrev.bind(d(i)), 250), i.init(), i
      }

      return s(n, [{
        key: "init",
        value: function () {
          this.pages = [], this.page = this.pageIndex = null, this.prevPage = this.prevPageIndex = null, this.attachPlugins(n.Plugins), this.trigger("init"), this.initLayout(), this.initSlides(), this.updateMetrics(), this.$track && this.pages.length && (this.$track.style.transform = "translate3d(".concat(-1 * this.pages[this.page].left, "px, 0px, 0) scale(1)")), this.manageSlideVisiblity(), this.initPanzoom(), this.state = "ready", this.trigger("ready")
        }
      }, {
        key: "initLayout",
        value: function () {
          var t, e, i = this.option("prefix"),
            n = this.option("classNames");
          (this.$viewport = this.option("viewport") || this.$container.querySelector(".".concat(i).concat(n.viewport)), this.$viewport) || (this.$viewport = document.createElement("div"), this.$viewport.classList.add(i + n.viewport), (t = this.$viewport).append.apply(t, p(this.$container.childNodes)), this.$container.appendChild(this.$viewport));
          (this.$track = this.option("track") || this.$container.querySelector(".".concat(i).concat(n.track)), this.$track) || (this.$track = document.createElement("div"), this.$track.classList.add(i + n.track), (e = this.$track).append.apply(e, p(this.$viewport.childNodes)), this.$viewport.appendChild(this.$track))
        }
      }, {
        key: "initSlides",
        value: function () {
          var t = this;
          this.slides = [], this.$viewport.querySelectorAll(".".concat(this.option("prefix")).concat(this.option("classNames.slide"))).forEach((function (e) {
            var i = {
              $el: e,
              isDom: !0
            };
            t.slides.push(i), t.trigger("createSlide", i, t.slides.length)
          })), Array.isArray(this.options.slides) && (this.slides = x(!0, p(this.slides), this.options.slides))
        }
      }, {
        key: "updateMetrics",
        value: function () {
          var t, e = this,
            n = 0,
            o = [];
          this.slides.forEach((function (i, a) {
            var s = i.$el,
              r = i.isDom || !t ? e.getSlideMetrics(s) : t;
            i.index = a, i.width = r, i.left = n, t = r, n += r, o.push(a)
          }));
          var a = Math.max(this.$track.offsetWidth, w(this.$track.getBoundingClientRect().width)),
            s = getComputedStyle(this.$track);
          a -= parseFloat(s.paddingLeft) + parseFloat(s.paddingRight), this.contentWidth = n, this.viewportWidth = a;
          var r = [],
            l = this.option("slidesPerPage");
          if (Number.isInteger(l) && n > a)
            for (var c = 0; c < this.slides.length; c += l) r.push({
              indexes: o.slice(c, c + l),
              slides: this.slides.slice(c, c + l)
            });
          else
            for (var h = 0, d = 0, u = 0; u < this.slides.length; u += 1) {
              var f = this.slides[u];
              (!r.length || d + f.width > a) && (r.push({
                indexes: [],
                slides: []
              }), h = r.length - 1, d = 0), d += f.width, r[h].indexes.push(u), r[h].slides.push(f)
            }
          var v = this.option("center"),
            g = this.option("fill");
          r.forEach((function (t, i) {
            t.index = i, t.width = t.slides.reduce((function (t, e) {
              return t + e.width
            }), 0), t.left = t.slides[0].left, v && (t.left += .5 * (a - t.width) * -1), g && !e.option("infiniteX", e.option("infinite")) && n > a && (t.left = Math.max(t.left, 0), t.left = Math.min(t.left, n - a))
          }));
          var m, y = [];
          r.forEach((function (t) {
            var e = i({}, t);
            m && e.left === m.left ? (m.width += e.width, m.slides = [].concat(p(m.slides), p(e.slides)), m.indexes = [].concat(p(m.indexes), p(e.indexes))) : (e.index = y.length, m = e, y.push(e))
          })), this.pages = y;
          var b = this.page;
          if (null === b) {
            var x = this.option("initialSlide");
            b = null !== x ? this.findPageForSlide(x) : this.option("initialPage", 0), y[b] || (b = y.length && b > y.length ? y[y.length - 1].index : 0), this.page = b, this.pageIndex = b
          }
          this.updatePanzoom(), this.trigger("refresh")
        }
      }, {
        key: "getSlideMetrics",
        value: function (t) {
          if (!t) {
            var e, i = this.slides[0];
            if ((t = document.createElement("div")).dataset.isTestEl = 1, t.style.visibility = "hidden", t.classList.add(this.option("prefix") + this.option("classNames.slide")), i.customClass)(e = t.classList).add.apply(e, p(i.customClass.split(" ")));
            this.$track.prepend(t)
          }
          var n = Math.max(t.offsetWidth, w(t.getBoundingClientRect().width)),
            o = t.currentStyle || window.getComputedStyle(t);
          return n = n + (parseFloat(o.marginLeft) || 0) + (parseFloat(o.marginRight) || 0), t.dataset.isTestEl && t.remove(), n
        }
      }, {
        key: "findPageForSlide",
        value: function (t) {
          var e = this.pages.find((function (e) {
            return e.indexes.indexOf(t) > -1
          }));
          return e ? e.index : null
        }
      }, {
        key: "slideNext",
        value: function () {
          this.slideTo(this.pageIndex + 1)
        }
      }, {
        key: "slidePrev",
        value: function () {
          this.slideTo(this.pageIndex - 1)
        }
      }, {
        key: "slideTo",
        value: function (t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            i = e.x,
            n = void 0 === i ? -1 * this.setPage(t, !0) : i,
            o = e.y,
            a = void 0 === o ? 0 : o,
            s = e.friction,
            r = void 0 === s ? this.option("friction") : s;
          this.Panzoom.content.x === n && !this.Panzoom.velocity.x && r || (this.Panzoom.panTo({
            x: n,
            y: a,
            friction: r,
            ignoreBounds: !0
          }), "ready" === this.state && "ready" === this.Panzoom.state && this.trigger("settle"))
        }
      }, {
        key: "initPanzoom",
        value: function () {
          var t = this;
          this.Panzoom && this.Panzoom.destroy();
          var e = x(!0, {}, {
            content: this.$track,
            wrapInner: !1,
            resizeParent: !1,
            zoom: !1,
            click: !1,
            lockAxis: "x",
            x: this.pages.length ? -1 * this.pages[this.page].left : 0,
            centerOnStart: !1,
            textSelection: function () {
              return t.option("textSelection", !1)
            },
            panOnlyZoomed: function () {
              return this.content.width <= this.viewport.width
            }
          }, this.option("Panzoom"));
          this.Panzoom = new z(this.$container, e), this.Panzoom.on({
            "*": function (e) {
              for (var i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++) n[o - 1] = arguments[o];
              return t.trigger.apply(t, ["Panzoom.".concat(e)].concat(n))
            },
            afterUpdate: function () {
              t.updatePage()
            },
            beforeTransform: this.onBeforeTransform.bind(this),
            touchEnd: this.onTouchEnd.bind(this),
            endAnimation: function () {
              t.trigger("settle")
            }
          }), this.updateMetrics(), this.manageSlideVisiblity()
        }
      }, {
        key: "updatePanzoom",
        value: function () {
          this.Panzoom && (this.Panzoom.content = i(i({}, this.Panzoom.content), {}, {
            fitWidth: this.contentWidth,
            origWidth: this.contentWidth,
            width: this.contentWidth
          }), this.pages.length > 1 && this.option("infiniteX", this.option("infinite")) ? this.Panzoom.boundX = null : this.pages.length && (this.Panzoom.boundX = {
            from: -1 * this.pages[this.pages.length - 1].left,
            to: -1 * this.pages[0].left
          }), this.option("infiniteY", this.option("infinite")) ? this.Panzoom.boundY = null : this.Panzoom.boundY = {
            from: 0,
            to: 0
          }, this.Panzoom.handleCursor())
        }
      }, {
        key: "manageSlideVisiblity",
        value: function () {
          var t = this,
            e = this.contentWidth,
            i = this.viewportWidth,
            n = this.Panzoom ? -1 * this.Panzoom.content.x : this.pages.length ? this.pages[this.page].left : 0,
            o = this.option("preload"),
            a = this.option("infiniteX", this.option("infinite")),
            s = parseFloat(getComputedStyle(this.$viewport, null).getPropertyValue("padding-left")),
            r = parseFloat(getComputedStyle(this.$viewport, null).getPropertyValue("padding-right"));
          this.slides.forEach((function (l) {
            var c, h, d = 0;
            c = n - s, h = n + i + r, c -= o * (i + s + r), h += o * (i + s + r);
            var u = l.left + l.width > c && l.left < h;
            c = n + e - s, h = n + e + i + r, c -= o * (i + s + r);
            var f = a && l.left + l.width > c && l.left < h;
            c = n - e - s, h = n - e + i + r, c -= o * (i + s + r);
            var v = a && l.left + l.width > c && l.left < h;
            f || u || v ? (t.createSlideEl(l), u && (d = 0), f && (d = -1), v && (d = 1), l.left + l.width > n && l.left <= n + i + r && (d = 0)) : t.removeSlideEl(l), l.hasDiff = d
          }));
          var l = 0,
            c = 0;
          this.slides.forEach((function (t, i) {
            var n = 0;
            t.$el ? (i !== l || t.hasDiff ? n = c + t.hasDiff * e : c = 0, t.$el.style.left = Math.abs(n) > .1 ? "".concat(c + t.hasDiff * e, "px") : "", l++) : c += t.width
          })), this.markSelectedSlides()
        }
      }, {
        key: "createSlideEl",
        value: function (t) {
          if (t) {
            if (!t.$el) {
              var e, i = document.createElement("div");
              if (i.dataset.index = t.index, i.classList.add(this.option("prefix") + this.option("classNames.slide")), t.customClass)(e = i.classList).add.apply(e, p(t.customClass.split(" ")));
              t.html && (i.innerHTML = t.html);
              var n = [];
              this.slides.forEach((function (t, e) {
                t.$el && n.push(e)
              }));
              var o = t.index,
                a = null;
              if (n.length) {
                var s = n.reduce((function (t, e) {
                  return Math.abs(e - o) < Math.abs(t - o) ? e : t
                }));
                a = this.slides[s]
              }
              return this.$track.insertBefore(i, a && a.$el ? a.index < t.index ? a.$el.nextSibling : a.$el : null), t.$el = i, this.trigger("createSlide", t, o), t
            }
            var r;
            parseInt(t.$el.dataset.index, 10) !== t.index && (t.$el.dataset.index = t.index, t.$el.querySelectorAll("[data-lazy-src]").forEach((function (t) {
              var e = t.dataset.lazySrc;
              t instanceof HTMLImageElement ? t.src = e : t.style.backgroundImage = "url('".concat(e, "')")
            })), (r = t.$el.dataset.lazySrc) && (t.$el.style.backgroundImage = "url('".concat(r, "')")), t.state = "ready")
          }
        }
      }, {
        key: "removeSlideEl",
        value: function (t) {
          t.$el && !t.isDom && (this.trigger("removeSlide", t), t.$el.remove(), t.$el = null)
        }
      }, {
        key: "markSelectedSlides",
        value: function () {
          var t = this,
            e = this.option("classNames.slideSelected"),
            i = "aria-hidden";
          this.slides.forEach((function (n, o) {
            var a = n.$el;
            if (a) {
              var s = t.pages[t.page];
              s && s.indexes && s.indexes.indexOf(o) > -1 ? (e && !a.classList.contains(e) && (a.classList.add(e), t.trigger("selectSlide", n)), a.removeAttribute(i)) : (e && a.classList.contains(e) && (a.classList.remove(e), t.trigger("unselectSlide", n)), a.setAttribute(i, !0))
            }
          }))
        }
      }, {
        key: "updatePage",
        value: function () {
          this.updateMetrics(), this.slideTo(this.page, {
            friction: 0
          })
        }
      }, {
        key: "onBeforeTransform",
        value: function () {
          this.option("infiniteX", this.option("infinite")) && this.manageInfiniteTrack(), this.manageSlideVisiblity()
        }
      }, {
        key: "manageInfiniteTrack",
        value: function () {
          var t = this.contentWidth,
            e = this.viewportWidth;
          if (!(!this.option("infiniteX", this.option("infinite")) || this.pages.length < 2 || t < e)) {
            var i = this.Panzoom,
              n = !1;
            return i.content.x < -1 * (t - e) && (i.content.x += t, this.pageIndex = this.pageIndex - this.pages.length, n = !0), i.content.x > e && (i.content.x -= t, this.pageIndex = this.pageIndex + this.pages.length, n = !0), n && "pointerdown" === i.state && i.resetDragPosition(), n
          }
        }
      }, {
        key: "onTouchEnd",
        value: function (t, e) {
          var i = this.option("dragFree");
          if (!i && this.pages.length > 1 && t.dragOffset.time < 350 && Math.abs(t.dragOffset.y) < 1 && Math.abs(t.dragOffset.x) > 5) this[t.dragOffset.x < 0 ? "slideNext" : "slidePrev"]();
          else if (i) {
            var n = v(this.getPageFromPosition(-1 * t.transform.x), 2)[1];
            this.setPage(n)
          } else this.slideToClosest()
        }
      }, {
        key: "slideToClosest",
        value: function () {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            e = this.getPageFromPosition(-1 * this.Panzoom.content.x),
            i = v(e, 2),
            n = i[1];
          this.slideTo(n, t)
        }
      }, {
        key: "getPageFromPosition",
        value: function (t) {
          var e = this.pages.length;
          this.option("center") && (t += .5 * this.viewportWidth);
          var i = Math.floor(t / this.contentWidth);
          t -= i * this.contentWidth;
          var n = this.slides.find((function (e) {
            return e.left <= t && e.left + e.width > t
          }));
          if (n) {
            var o = this.findPageForSlide(n.index);
            return [o, o + i * e]
          }
          return [0, 0]
        }
      }, {
        key: "setPage",
        value: function (t, e) {
          var i = 0,
            n = parseInt(t, 10) || 0,
            o = this.page,
            a = this.pageIndex,
            s = this.pages.length,
            r = this.contentWidth,
            l = this.viewportWidth;
          if (t = (n % s + s) % s, this.option("infiniteX", this.option("infinite")) && r > l) {
            var c = Math.floor(n / s) || 0,
              h = r;
            if (i = this.pages[t].left + c * h, !0 === e && s > 2) {
              var d = -1 * this.Panzoom.content.x,
                u = i - h,
                f = i + h,
                v = Math.abs(d - i),
                p = Math.abs(d - u),
                g = Math.abs(d - f);
              g < v && g <= p ? (i = f, n += s) : p < v && p < g && (i = u, n -= s)
            }
          } else t = n = Math.max(0, Math.min(n, s - 1)), i = this.pages.length ? this.pages[t].left : 0;
          return this.page = t, this.pageIndex = n, null !== o && t !== o && (this.prevPage = o, this.prevPageIndex = a, this.trigger("change", t, o)), i
        }
      }, {
        key: "destroy",
        value: function () {
          var t = this;
          this.state = "destroy", this.slides.forEach((function (e) {
            t.removeSlideEl(e)
          })), this.slides = [], this.Panzoom.destroy(), this.detachPlugins()
        }
      }]), n
    }(A);
  D.version = "4.0.9", D.Plugins = R;
  var B = !("undefined" == typeof window || !window.document || !window.document.createElement),
    H = function () {
      function t(e) {
        o(this, t), this.fancybox = e, this.viewport = null, this.pendingUpdate = null;
        for (var i = 0, n = ["onReady", "onResize", "onTouchstart", "onTouchmove"]; i < n.length; i++) {
          var a = n[i];
          this[a] = this[a].bind(this)
        }
      }

      return s(t, [{
        key: "onReady",
        value: function () {
          var t = window.visualViewport;
          t && (this.viewport = t, this.startY = 0, t.addEventListener("resize", this.onResize), this.updateViewport()), window.addEventListener("touchstart", this.onTouchstart, {
            passive: !1
          }), window.addEventListener("touchmove", this.onTouchmove, {
            passive: !1
          })
        }
      }, {
        key: "onResize",
        value: function () {
          this.updateViewport()
        }
      }, {
        key: "updateViewport",
        value: function () {
          var t = this.fancybox,
            e = this.viewport,
            i = e.scale || 1,
            n = t.$container;
          if (n) {
            var o = "",
              a = "",
              s = "";
            i - 1 > .1 && (o = "".concat(e.width * i, "px"), a = "".concat(e.height * i, "px"), s = "translate3d(".concat(e.offsetLeft, "px, ").concat(e.offsetTop, "px, 0) scale(").concat(1 / i, ")")), n.style.width = o, n.style.height = a, n.style.transform = s
          }
        }
      }, {
        key: "onTouchstart",
        value: function (t) {
          this.startY = t.touches ? t.touches[0].screenY : t.screenY
        }
      }, {
        key: "onTouchmove",
        value: function (t) {
          var e = this.startY,
            i = window.innerWidth / window.document.documentElement.clientWidth;
          if (t.cancelable && !(t.touches.length > 1 || 1 !== i)) {
            var n = t.target,
              o = T(n);
            if (o) {
              var a = window.getComputedStyle(o),
                s = parseInt(a.getPropertyValue("height"), 10),
                r = t.touches ? t.touches[0].screenY : t.screenY,
                l = e <= r && 0 === o.scrollTop,
                c = e >= r && o.scrollHeight - o.scrollTop === s;
              (l || c) && t.preventDefault()
            } else t.preventDefault()
          }
        }
      }, {
        key: "cleanup",
        value: function () {
          this.pendingUpdate && (cancelAnimationFrame(this.pendingUpdate), this.pendingUpdate = null);
          var t = this.viewport;
          t && (t.removeEventListener("resize", this.onResize), this.viewport = null), window.removeEventListener("touchstart", this.onTouchstart, !1), window.removeEventListener("touchmove", this.onTouchmove, !1)
        }
      }, {
        key: "attach",
        value: function () {
          this.fancybox.on("initLayout", this.onReady)
        }
      }, {
        key: "detach",
        value: function () {
          this.fancybox.off("initLayout", this.onReady), this.cleanup()
        }
      }]), t
    }(),
    W = function () {
      function t(e) {
        o(this, t), this.fancybox = e, this.$container = null, this.state = "init";
        for (var i = 0, n = ["onPrepare", "onClosing", "onKeydown"]; i < n.length; i++) {
          var a = n[i];
          this[a] = this[a].bind(this)
        }
        this.events = {
          prepare: this.onPrepare,
          closing: this.onClosing,
          keydown: this.onKeydown
        }
      }

      return s(t, [{
        key: "onPrepare",
        value: function () {
          this.getSlides().length < this.fancybox.option("Thumbs.minSlideCount") ? this.state = "disabled" : !0 === this.fancybox.option("Thumbs.autoStart") && this.fancybox.Carousel.Panzoom.content.height >= this.fancybox.option("Thumbs.minScreenHeight") && this.build()
        }
      }, {
        key: "onClosing",
        value: function () {
          this.Carousel && this.Carousel.Panzoom.detachEvents()
        }
      }, {
        key: "onKeydown",
        value: function (t, e) {
          e === t.option("Thumbs.key") && this.toggle()
        }
      }, {
        key: "build",
        value: function () {
          var t = this;
          if (!this.$container) {
            var e = document.createElement("div");
            e.classList.add("fancybox__thumbs"), this.fancybox.$carousel.parentNode.insertBefore(e, this.fancybox.$carousel.nextSibling), this.Carousel = new D(e, x(!0, {
              Dots: !1,
              Navigation: !1,
              Sync: {
                friction: 0
              },
              infinite: !1,
              center: !0,
              fill: !0,
              dragFree: !0,
              slidesPerPage: 1,
              preload: 1
            }, this.fancybox.option("Thumbs.Carousel"), {
              Sync: {
                target: this.fancybox.Carousel
              },
              slides: this.getSlides()
            })), this.Carousel.Panzoom.on("wheel", (function (e, i) {
              i.preventDefault(), t.fancybox[i.deltaY < 0 ? "prev" : "next"]()
            })), this.$container = e, this.state = "visible"
          }
        }
      }, {
        key: "getSlides",
        value: function () {
          var t, e = [],
            i = y(this.fancybox.items);
          try {
            for (i.s(); !(t = i.n()).done;) {
              var n = t.value,
                o = n.thumb;
              o && e.push({
                html: '<div class="fancybox__thumb" style="background-image:url(\''.concat(o, "')\"></div>"),
                customClass: "has-thumb has-".concat(n.type || "image")
              })
            }
          } catch (t) {
            i.e(t)
          } finally {
            i.f()
          }
          return e
        }
      }, {
        key: "toggle",
        value: function () {
          "visible" === this.state ? this.hide() : "hidden" === this.state ? this.show() : this.build()
        }
      }, {
        key: "show",
        value: function () {
          "hidden" === this.state && (this.$container.style.display = "", this.Carousel.Panzoom.attachEvents(), this.state = "visible")
        }
      }, {
        key: "hide",
        value: function () {
          "visible" === this.state && (this.Carousel.Panzoom.detachEvents(), this.$container.style.display = "none", this.state = "hidden")
        }
      }, {
        key: "cleanup",
        value: function () {
          this.Carousel && (this.Carousel.destroy(), this.Carousel = null), this.$container && (this.$container.remove(), this.$container = null), this.state = "init"
        }
      }, {
        key: "attach",
        value: function () {
          this.fancybox.on(this.events)
        }
      }, {
        key: "detach",
        value: function () {
          this.fancybox.off(this.events), this.cleanup()
        }
      }]), t
    }();
  W.defaults = {
    minSlideCount: 2,
    minScreenHeight: 500,
    autoStart: !0,
    key: "t",
    Carousel: {}
  };
  var j = function (t) {
      return Object.entries(t).map((function (t) {
        return t.map(encodeURIComponent).join("=")
      })).join("&")
    },
    X = {
      video: {
        autoplay: !0,
        ratio: 16 / 9
      },
      youtube: {
        autohide: 1,
        fs: 1,
        rel: 0,
        hd: 1,
        wmode: "transparent",
        enablejsapi: 1,
        html5: 1
      },
      vimeo: {
        hd: 1,
        show_title: 1,
        show_byline: 1,
        show_portrait: 0,
        fullscreen: 1
      },
      html5video: {
        tpl: '<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">\n  <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos.</video>',
        format: ""
      }
    },
    q = function () {
      function t(e) {
        o(this, t), this.fancybox = e;
        for (var i = 0, n = ["onInit", "onReady", "onCreateSlide", "onRemoveSlide", "onSelectSlide", "onUnselectSlide", "onRefresh", "onMessage"]; i < n.length; i++) {
          var a = n[i];
          this[a] = this[a].bind(this)
        }
        this.events = {
          init: this.onInit,
          ready: this.onReady,
          "Carousel.createSlide": this.onCreateSlide,
          "Carousel.removeSlide": this.onRemoveSlide,
          "Carousel.selectSlide": this.onSelectSlide,
          "Carousel.unselectSlide": this.onUnselectSlide,
          "Carousel.refresh": this.onRefresh
        }
      }

      return s(t, [{
        key: "onInit",
        value: function () {
          var t, e = y(this.fancybox.items);
          try {
            for (e.s(); !(t = e.n()).done;) {
              var i = t.value;
              this.processType(i)
            }
          } catch (t) {
            e.e(t)
          } finally {
            e.f()
          }
        }
      }, {
        key: "processType",
        value: function (t) {
          if (t.html) return t.src = t.html, t.type = "html", void delete t.html;
          var e = t.src || "",
            i = t.type || this.fancybox.options.type,
            n = null;
          if (!e || "string" == typeof e) {
            if (n = e.match(/(?:youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i)) {
              var o = j(this.fancybox.option("Html.youtube")),
                a = encodeURIComponent(n[1]);
              t.videoId = a, t.src = "https://www.youtube-nocookie.com/embed/".concat(a, "?").concat(o), t.thumb = t.thumb || "https://i.ytimg.com/vi/".concat(a, "/mqdefault.jpg"), t.vendor = "youtube", i = "video"
            } else if (n = e.match(/^.+vimeo.com\/(?:\/)?([\d]+)(.*)?/)) {
              var s = j(this.fancybox.option("Html.vimeo")),
                r = encodeURIComponent(n[1]);
              t.videoId = r, t.src = "https://player.vimeo.com/video/".concat(r, "?").concat(s), t.vendor = "vimeo", i = "video"
            } else(n = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i)) ? (t.src = "//maps.google.".concat(n[1], "/?ll=").concat((n[2] ? n[2] + "&z=" + Math.floor(n[3]) + (n[4] ? n[4].replace(/^\//, "&") : "") : n[4] + "").replace(/\?/, "&"), "&output=").concat(n[4] && n[4].indexOf("layer=c") > 0 ? "svembed" : "embed"), i = "map") : (n = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i)) && (t.src = "//maps.google.".concat(n[1], "/maps?q=").concat(n[2].replace("query=", "q=").replace("api=1", ""), "&output=embed"), i = "map");
            i || ("#" === e.charAt(0) ? i = "inline" : (n = e.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (i = "html5video", t.format = t.format || "video/" + ("ogv" === n[1] ? "ogg" : n[1])) : e.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? i = "image" : e.match(/\.(pdf)((\?|#).*)?$/i) && (i = "pdf")), t.type = i || this.fancybox.option("defaultType", "image"), "html5video" !== i && "video" !== i || (t.video = x({}, this.fancybox.option("Html.video"), t.video), t._width && t._height ? t.ratio = parseFloat(t._width) / parseFloat(t._height) : t.ratio = t.ratio || t.video.ratio || X.video.ratio)
          }
        }
      }, {
        key: "onReady",
        value: function () {
          var t = this;
          this.fancybox.Carousel.slides.forEach((function (e) {
            e.$el && (t.setContent(e), e.index === t.fancybox.getSlide().index && t.playVideo(e))
          }))
        }
      }, {
        key: "onCreateSlide",
        value: function (t, e, i) {
          "ready" === this.fancybox.state && this.setContent(i)
        }
      }, {
        key: "loadInlineContent",
        value: function (t) {
          var e;
          if (t.src instanceof HTMLElement) e = t.src;
          else if ("string" == typeof t.src) {
            var i = t.src.split("#", 2),
              n = 2 === i.length && "" === i[0] ? i[1] : i[0];
            e = document.getElementById(n)
          }
          if (e) {
            if ("clone" === t.type || e.$placeHolder) {
              var o = (e = e.cloneNode(!0)).getAttribute("id");
              o = o ? "".concat(o, "--clone") : "clone-".concat(this.fancybox.id, "-").concat(t.index), e.setAttribute("id", o)
            } else {
              var a = document.createElement("div");
              a.classList.add("fancybox-placeholder"), e.parentNode.insertBefore(a, e), e.$placeHolder = a
            }
            this.fancybox.setContent(t, e)
          } else this.fancybox.setError(t, "{{ELEMENT_NOT_FOUND}}")
        }
      }, {
        key: "loadAjaxContent",
        value: function (t) {
          var e = this.fancybox,
            i = new XMLHttpRequest;
          e.showLoading(t), i.onreadystatechange = function () {
            i.readyState === XMLHttpRequest.DONE && "ready" === e.state && (e.hideLoading(t), 200 === i.status ? e.setContent(t, i.responseText) : e.setError(t, 404 === i.status ? "{{AJAX_NOT_FOUND}}" : "{{AJAX_FORBIDDEN}}"))
          }, i.open("GET", t.src), i.setRequestHeader("X-Requested-With", "XMLHttpRequest"), i.send(t.ajax || null), t.xhr = i
        }
      }, {
        key: "loadIframeContent",
        value: function (t) {
          var e = this,
            i = this.fancybox,
            n = document.createElement("iframe");
          if (n.className = "fancybox__iframe", n.setAttribute("id", "fancybox__iframe_".concat(i.id, "_").concat(t.index)), n.setAttribute("allow", "autoplay; fullscreen"), n.setAttribute("scrolling", "auto"), t.$iframe = n, "iframe" !== t.type || !1 === t.preload) return n.setAttribute("src", t.src), this.fancybox.setContent(t, n), void this.resizeIframe(t);
          i.showLoading(t);
          var o = document.createElement("div");
          o.style.visibility = "hidden", this.fancybox.setContent(t, o), o.appendChild(n), n.onerror = function () {
            i.setError(t, "{{IFRAME_ERROR}}")
          }, n.onload = function () {
            i.hideLoading(t);
            var o = !1;
            n.isReady || (n.isReady = !0, o = !0), n.src.length && (n.parentNode.style.visibility = "", e.resizeIframe(t), o && i.revealContent(t))
          }, n.setAttribute("src", t.src)
        }
      }, {
        key: "setAspectRatio",
        value: function (t) {
          var e = t.$content,
            i = t.ratio;
          if (e) {
            var n = t._width,
              o = t._height;
            if (i || n && o) {
              Object.assign(e.style, {
                width: n && o ? "100%" : "",
                height: n && o ? "100%" : "",
                maxWidth: "",
                maxHeight: ""
              });
              var a = e.offsetWidth,
                s = e.offsetHeight;
              if (o = o || s, (n = n || a) > a || o > s) {
                var r = Math.min(a / n, s / o);
                n *= r, o *= r
              }
              Math.abs(n / o - i) > .01 && (i < n / o ? n = o * i : o = n / i), Object.assign(e.style, {
                width: "".concat(n, "px"),
                height: "".concat(o, "px")
              })
            }
          }
        }
      }, {
        key: "resizeIframe",
        value: function (t) {
          var e = t.$iframe;
          if (e) {
            var i = t._width || 0,
              n = t._height || 0;
            i && n && (t.autoSize = !1);
            var o = e.parentNode,
              a = o.style;
            if (!1 !== t.preload && !1 !== t.autoSize) try {
              var s = window.getComputedStyle(o),
                r = parseFloat(s.paddingLeft) + parseFloat(s.paddingRight),
                l = parseFloat(s.paddingTop) + parseFloat(s.paddingBottom),
                c = e.contentWindow.document,
                h = c.getElementsByTagName("html")[0],
                d = c.body;
              d.style.overflow = "hidden", i = i || h.scrollWidth + r, a.width = "".concat(i, "px"), d.style.overflow = "", a.flex = "0 0 auto", a.height = "".concat(d.scrollHeight, "px"), n = h.scrollHeight + l
            } catch (t) {}
            if (i || n) {
              var u = {
                flex: "0 1 auto"
              };
              i && (u.width = "".concat(i, "px")), n && (u.height = "".concat(n, "px")), Object.assign(a, u)
            }
          }
        }
      }, {
        key: "onRefresh",
        value: function (t, e) {
          var i = this;
          e.slides.forEach((function (t) {
            t.$el && (t.$iframe && i.resizeIframe(t), t.ratio && i.setAspectRatio(t))
          }))
        }
      }, {
        key: "setContent",
        value: function (t) {
          if (t && !t.isDom) {
            switch (t.type) {
              case "html":
                this.fancybox.setContent(t, t.src);
                break;
              case "html5video":
                this.fancybox.setContent(t, this.fancybox.option("Html.html5video.tpl").replace(/\{\{src\}\}/gi, t.src).replace("{{format}}", t.format || t.html5video && t.html5video.format || "").replace("{{poster}}", t.poster || t.thumb || ""));
                break;
              case "inline":
              case "clone":
                this.loadInlineContent(t);
                break;
              case "ajax":
                this.loadAjaxContent(t);
                break;
              case "iframe":
              case "pdf":
              case "video":
              case "map":
                this.loadIframeContent(t)
            }
            t.ratio && this.setAspectRatio(t)
          }
        }
      }, {
        key: "onSelectSlide",
        value: function (t, e, i) {
          "ready" === t.state && this.playVideo(i)
        }
      }, {
        key: "playVideo",
        value: function (t) {
          if ("html5video" === t.type && t.video.autoplay) try {
            var e = t.$el.querySelector("video");
            if (e) {
              var i = e.play();
              void 0 !== i && i.then((function () {})).catch((function (t) {
                e.muted = !0, e.play()
              }))
            }
          } catch (t) {}
          if ("video" === t.type && t.$iframe && t.$iframe.contentWindow) {
            ! function e() {
              if ("done" === t.state && t.$iframe && t.$iframe.contentWindow) {
                var i;
                if (t.$iframe.isReady) return t.video && t.video.autoplay && (i = "youtube" == t.vendor ? {
                  event: "command",
                  func: "playVideo"
                } : {
                  method: "play",
                  value: "true"
                }), void(i && t.$iframe.contentWindow.postMessage(JSON.stringify(i), "*"));
                "youtube" === t.vendor && (i = {
                  event: "listening",
                  id: t.$iframe.getAttribute("id")
                }, t.$iframe.contentWindow.postMessage(JSON.stringify(i), "*"))
              }
              t.poller = setTimeout(e, 250)
            }()
          }
        }
      }, {
        key: "onUnselectSlide",
        value: function (t, e, i) {
          if ("html5video" !== i.type) {
            var n = !1;
            "vimeo" == i.vendor ? n = {
              method: "pause",
              value: "true"
            } : "youtube" === i.vendor && (n = {
              event: "command",
              func: "pauseVideo"
            }), n && i.$iframe && i.$iframe.contentWindow && i.$iframe.contentWindow.postMessage(JSON.stringify(n), "*"), clearTimeout(i.poller)
          } else try {
            i.$el.querySelector("video").pause()
          } catch (t) {}
        }
      }, {
        key: "onRemoveSlide",
        value: function (t, e, i) {
          i.xhr && (i.xhr.abort(), i.xhr = null), i.$iframe && (i.$iframe.onload = i.$iframe.onerror = null, i.$iframe.src = "//about:blank", i.$iframe = null);
          var n = i.$content;
          "inline" === i.type && n && (n.classList.remove("fancybox__content"), "none" !== n.style.display && (n.style.display = "none")), i.$closeButton && (i.$closeButton.remove(), i.$closeButton = null);
          var o = n && n.$placeHolder;
          o && (o.parentNode.insertBefore(n, o), o.remove(), n.$placeHolder = null)
        }
      }, {
        key: "onMessage",
        value: function (t) {
          try {
            var e = JSON.parse(t.data);
            if ("https://player.vimeo.com" === t.origin) {
              if ("ready" === e.event) {
                var i, n = y(document.getElementsByClassName("fancybox__iframe"));
                try {
                  for (n.s(); !(i = n.n()).done;) {
                    var o = i.value;
                    o.contentWindow === t.source && (o.isReady = 1)
                  }
                } catch (t) {
                  n.e(t)
                } finally {
                  n.f()
                }
              }
            } else "https://www.youtube-nocookie.com" === t.origin && "onReady" === e.event && (document.getElementById(e.id).isReady = 1)
          } catch (t) {}
        }
      }, {
        key: "attach",
        value: function () {
          this.fancybox.on(this.events), window.addEventListener("message", this.onMessage, !1)
        }
      }, {
        key: "detach",
        value: function () {
          this.fancybox.off(this.events), window.removeEventListener("message", this.onMessage, !1)
        }
      }]), t
    }();
  q.defaults = X;
  var Y = function () {
    function t(e) {
      o(this, t), this.fancybox = e;
      for (var i = 0, n = ["onReady", "onClosing", "onDone", "onPageChange", "onCreateSlide", "onRemoveSlide", "onImageStatusChange"]; i < n.length; i++) {
        var a = n[i];
        this[a] = this[a].bind(this)
      }
      this.events = {
        ready: this.onReady,
        closing: this.onClosing,
        done: this.onDone,
        "Carousel.change": this.onPageChange,
        "Carousel.createSlide": this.onCreateSlide,
        "Carousel.removeSlide": this.onRemoveSlide
      }
    }

    return s(t, [{
      key: "onReady",
      value: function () {
        var t = this;
        this.fancybox.Carousel.slides.forEach((function (e) {
          e.$el && t.setContent(e)
        }))
      }
    }, {
      key: "onDone",
      value: function (t, e) {
        this.handleCursor(e)
      }
    }, {
      key: "onClosing",
      value: function (t) {
        clearTimeout(this.clickTimer), this.clickTimer = null, t.Carousel.slides.forEach((function (t) {
          t.$image && (t.state = "destroy"), t.Panzoom && t.Panzoom.detachEvents()
        })), "closing" === this.fancybox.state && this.canZoom(t.getSlide()) && this.zoomOut()
      }
    }, {
      key: "onCreateSlide",
      value: function (t, e, i) {
        "ready" === this.fancybox.state && this.setContent(i)
      }
    }, {
      key: "onRemoveSlide",
      value: function (t, e, i) {
        i.$image && (i.$el.classList.remove(t.option("Image.canZoomInClass")), i.$image.remove(), i.$image = null), i.Panzoom && (i.Panzoom.destroy(), i.Panzoom = null), i.$el && i.$el.dataset && delete i.$el.dataset.imageFit
      }
    }, {
      key: "setContent",
      value: function (t) {
        var e = this;
        if (!(t.isDom || t.html || t.type && "image" !== t.type || t.$image)) {
          t.type = "image", t.state = "loading";
          var i = document.createElement("div");
          i.style.visibility = "hidden";
          var n = document.createElement("img");
          n.addEventListener("load", (function (i) {
            i.stopImmediatePropagation(), e.onImageStatusChange(t)
          })), n.addEventListener("error", (function () {
            e.onImageStatusChange(t)
          })), n.src = t.src, n.alt = "", n.draggable = !1, n.classList.add("fancybox__image"), t.srcset && n.setAttribute("srcset", t.srcset), t.sizes && n.setAttribute("sizes", t.sizes), t.$image = n;
          var o = this.fancybox.option("Image.wrap");
          if (o) {
            var a = document.createElement("div");
            a.classList.add("string" == typeof o ? o : "fancybox__image-wrap"), a.appendChild(n), i.appendChild(a), t.$wrap = a
          } else i.appendChild(n);
          t.$el.dataset.imageFit = this.fancybox.option("Image.fit"), this.fancybox.setContent(t, i), n.complete || n.error ? this.onImageStatusChange(t) : this.fancybox.showLoading(t)
        }
      }
    }, {
      key: "onImageStatusChange",
      value: function (t) {
        var e = this,
          i = t.$image;
        i && "loading" === t.state && (i.complete && i.naturalWidth && i.naturalHeight ? (this.fancybox.hideLoading(t), "contain" === this.fancybox.option("Image.fit") && this.initSlidePanzoom(t), t.$el.addEventListener("wheel", (function (i) {
          return e.onWheel(t, i)
        }), {
          passive: !1
        }), t.$content.addEventListener("click", (function (i) {
          return e.onClick(t, i)
        }), {
          passive: !1
        }), this.revealContent(t)) : this.fancybox.setError(t, "{{IMAGE_ERROR}}"))
      }
    }, {
      key: "initSlidePanzoom",
      value: function (t) {
        var e = this;
        t.Panzoom || (t.Panzoom = new z(t.$el, x(!0, this.fancybox.option("Image.Panzoom", {}), {
          viewport: t.$wrap,
          content: t.$image,
          wrapInner: !1,
          textSelection: !0,
          touch: this.fancybox.option("Image.touch"),
          panOnlyZoomed: !0,
          click: !1,
          wheel: !1
        })), t.Panzoom.on("startAnimation", (function () {
          e.fancybox.trigger("Image.startAnimation", t)
        })), t.Panzoom.on("endAnimation", (function () {
          "zoomIn" === t.state && e.fancybox.done(t), e.handleCursor(t), e.fancybox.trigger("Image.endAnimation", t)
        })), t.Panzoom.on("afterUpdate", (function () {
          e.handleCursor(t), e.fancybox.trigger("Image.afterUpdate", t)
        })))
      }
    }, {
      key: "revealContent",
      value: function (t) {
        null === this.fancybox.Carousel.prevPage && t.index === this.fancybox.options.startIndex && this.canZoom(t) ? this.zoomIn() : this.fancybox.revealContent(t)
      }
    }, {
      key: "getZoomInfo",
      value: function (t) {
        var e = t.$thumb.getBoundingClientRect(),
          i = e.width,
          n = e.height,
          o = t.$content.getBoundingClientRect(),
          a = o.width,
          s = o.height,
          r = o.top - e.top,
          l = o.left - e.left,
          c = this.fancybox.option("Image.zoomOpacity");
        return "auto" === c && (c = Math.abs(i / n - a / s) > .1), {
          top: r,
          left: l,
          scale: e.width / a,
          opacity: c
        }
      }
    }, {
      key: "canZoom",
      value: function (t) {
        var e = this.fancybox,
          i = e.$container;
        if (window.visualViewport && 1 !== window.visualViewport.scale) return !1;
        if (!e.option("Image.zoom") || "contain" !== e.option("Image.fit")) return !1;
        var n = t.$thumb;
        if (!n || "loading" === t.state) return !1;
        i.classList.add("fancybox__no-click");
        var o, a = n.getBoundingClientRect();
        if (this.fancybox.option("Image.ignoreCoveredThumbnail")) {
          var s = document.elementFromPoint(a.left + 1, a.top + 1) === n,
            r = document.elementFromPoint(a.right - 1, a.bottom - 1) === n;
          o = s && r
        } else o = document.elementFromPoint(a.left + .5 * a.width, a.top + .5 * a.height) === n;
        return i.classList.remove("fancybox__no-click"), o
      }
    }, {
      key: "zoomIn",
      value: function () {
        var t = this.fancybox,
          e = t.getSlide(),
          i = e.Panzoom,
          n = this.getZoomInfo(e),
          o = n.top,
          a = n.left,
          s = n.scale,
          r = n.opacity;
        e.state = "zoomIn", t.trigger("reveal", e), i.panTo({
          x: -1 * a,
          y: -1 * o,
          scale: s,
          friction: 0,
          ignoreBounds: !0
        }), e.$content.style.visibility = "", !0 === r && i.on("afterTransform", (function (t) {
          "zoomIn" !== e.state && "zoomOut" !== e.state || (t.$content.style.opacity = Math.min(1, 1 - (1 - t.content.scale) / (1 - s)))
        })), i.panTo({
          x: 0,
          y: 0,
          scale: 1,
          friction: this.fancybox.option("Image.zoomFriction")
        })
      }
    }, {
      key: "zoomOut",
      value: function () {
        var t = this,
          e = this.fancybox,
          i = e.getSlide(),
          n = i.Panzoom;
        if (n) {
          i.state = "zoomOut", e.state = "customClosing", i.$caption && (i.$caption.style.visibility = "hidden");
          var o = this.fancybox.option("Image.zoomFriction"),
            a = function (e) {
              var a = t.getZoomInfo(i),
                s = a.top,
                r = a.left,
                l = a.scale,
                c = a.opacity;
              e || c || (o *= .82), n.panTo({
                x: -1 * r,
                y: -1 * s,
                scale: l,
                friction: o,
                ignoreBounds: !0
              }), o *= .98
            };
          window.addEventListener("scroll", a), n.once("endAnimation", (function () {
            window.removeEventListener("scroll", a), e.destroy()
          })), a()
        }
      }
    }, {
      key: "handleCursor",
      value: function (t) {
        if ("image" === t.type && t.$el) {
          var e = t.Panzoom,
            i = this.fancybox.option("Image.click", !1, t),
            n = this.fancybox.option("Image.touch"),
            o = t.$el.classList,
            a = this.fancybox.option("Image.canZoomInClass"),
            s = this.fancybox.option("Image.canZoomOutClass");
          if (e && "toggleZoom" === i) e && 1 === e.content.scale && e.option("maxScale") - e.content.scale > .01 ? (o.remove(s), o.add(a)) : e.content.scale > 1 && !n && o.add(s);
          else "close" === i && o.add(s)
        }
      }
    }, {
      key: "onWheel",
      value: function (t, e) {
        if ("ready" === this.fancybox.state && !1 !== this.fancybox.trigger("Image.wheel", e)) switch (this.fancybox.option("Image.wheel")) {
          case "zoom":
            t.Panzoom && t.Panzoom.zoomWithWheel(e);
            break;
          case "close":
            this.fancybox.close();
            break;
          case "slide":
            this.fancybox[e.deltaY < 0 ? "prev" : "next"]()
        }
      }
    }, {
      key: "onClick",
      value: function (t, e) {
        var i = this;
        if ("ready" === this.fancybox.state) {
          var n = t.Panzoom;
          if (!n || !n.dragPosition.midPoint && 0 === n.dragOffset.x && 0 === n.dragOffset.y && 1 === n.dragOffset.scale) {
            if (this.fancybox.Carousel.Panzoom.lockAxis) return !1;
            var o = function (n) {
                switch (n) {
                  case "toggleZoom":
                    e.stopPropagation(), t.Panzoom && t.Panzoom.zoomWithClick(e);
                    break;
                  case "close":
                    i.fancybox.close();
                    break;
                  case "next":
                    e.stopPropagation(), i.fancybox.next()
                }
              },
              a = this.fancybox.option("Image.click"),
              s = this.fancybox.option("Image.doubleClick");
            s ? this.clickTimer ? (clearTimeout(this.clickTimer), this.clickTimer = null, o(s)) : this.clickTimer = setTimeout((function () {
              i.clickTimer = null, o(a)
            }), 300) : o(a)
          }
        }
      }
    }, {
      key: "onPageChange",
      value: function (t, e) {
        var i = t.getSlide();
        e.slides.forEach((function (t) {
          t.Panzoom && "done" === t.state && t.index !== i.index && t.Panzoom.panTo({
            x: 0,
            y: 0,
            scale: 1,
            friction: .8
          })
        }))
      }
    }, {
      key: "attach",
      value: function () {
        this.fancybox.on(this.events)
      }
    }, {
      key: "detach",
      value: function () {
        this.fancybox.off(this.events)
      }
    }]), t
  }();
  Y.defaults = {
    canZoomInClass: "can-zoom_in",
    canZoomOutClass: "can-zoom_out",
    zoom: !0,
    zoomOpacity: "auto",
    zoomFriction: .82,
    ignoreCoveredThumbnail: !1,
    touch: !0,
    click: "toggleZoom",
    doubleClick: null,
    wheel: "zoom",
    fit: "contain",
    wrap: !1,
    Panzoom: {
      ratio: 1
    }
  };
  var U = function () {
      var t = window.location.hash.substr(1),
        e = t.split("-"),
        i = e.length > 1 && /^\+?\d+$/.test(e[e.length - 1]) && parseInt(e.pop(-1), 10) || null;
      return {
        hash: t,
        slug: e.join("-"),
        index: i
      }
    },
    V = function () {
      function t(e) {
        o(this, t), this.fancybox = e;
        for (var i = 0, n = ["onChange", "onClosing"]; i < n.length; i++) {
          var a = n[i];
          this[a] = this[a].bind(this)
        }
        this.events = {
          initCarousel: this.onChange,
          "Carousel.change": this.onChange,
          closing: this.onClosing
        }, this.hasCreatedHistory = !1, this.origHash = "", this.timer = null
      }

      return s(t, [{
        key: "onChange",
        value: function () {
          var t = this,
            e = this.fancybox,
            i = e.Carousel;
          this.timer && clearTimeout(this.timer);
          var n = null === i.prevPage,
            o = e.getSlide(),
            a = o.$trigger && o.$trigger.dataset,
            s = window.location.hash.substr(1),
            r = !1;
          if (o.slug) r = o.slug;
          else {
            var l = a && a.fancybox;
            l && l.length && "true" !== l && (r = l + (i.slides.length > 1 ? "-" + (o.index + 1) : ""))
          }
          n && (this.origHash = s !== r ? this.origHash : ""), r && s !== r && (this.timer = setTimeout((function () {
            try {
              window.history[n ? "pushState" : "replaceState"]({}, document.title, window.location.pathname + window.location.search + "#" + r), n && (t.hasCreatedHistory = !0)
            } catch (t) {}
          }), 300))
        }
      }, {
        key: "onClosing",
        value: function () {
          if (this.timer && clearTimeout(this.timer), !0 !== this.hasSilentClose) {
            if (!this.hasCreatedHistory) try {
              return void window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (this.origHash ? "#" + this.origHash : ""))
            } catch (t) {}
            window.history.back()
          }
        }
      }, {
        key: "attach",
        value: function (t) {
          t.on(this.events)
        }
      }, {
        key: "detach",
        value: function (t) {
          t.off(this.events)
        }
      }], [{
        key: "startFromUrl",
        value: function () {
          if (t.Fancybox && !t.Fancybox.getInstance()) {
            var e = U(),
              i = e.hash,
              n = e.slug,
              o = e.index;
            if (n) {
              var a = document.querySelector('[data-slug="'.concat(i, '"]'));
              if (a && a.dispatchEvent(new CustomEvent("click", {
                  bubbles: !0,
                  cancelable: !0
                })), !t.Fancybox.getInstance()) {
                var s = document.querySelectorAll('[data-fancybox="'.concat(n, '"]'));
                s.length && (null === o && 1 === s.length ? a = s[0] : o && (a = s[o - 1]), a && a.dispatchEvent(new CustomEvent("click", {
                  bubbles: !0,
                  cancelable: !0
                })))
              }
            }
          }
        }
      }, {
        key: "onHashChange",
        value: function () {
          var e = U(),
            i = e.slug,
            n = e.index,
            o = t.Fancybox.getInstance();
          if (o) {
            if (i) {
              var a, s = o.Carousel,
                r = y(s.slides);
              try {
                for (r.s(); !(a = r.n()).done;) {
                  var l = a.value;
                  if (l.slug && l.slug === i) return s.slideTo(l.index)
                }
              } catch (t) {
                r.e(t)
              } finally {
                r.f()
              }
              var c = o.getSlide(),
                h = c.$trigger && c.$trigger.dataset;
              if (h && h.fancybox === i) return s.slideTo(n - 1)
            }
            o.plugins.Hash.hasSilentClose = !0, o.close()
          }
          t.startFromUrl()
        }
      }, {
        key: "create",
        value: function (e) {
          function i() {
            window.addEventListener("hashchange", t.onHashChange, !1), t.startFromUrl()
          }

          t.Fancybox = e, B && window.requestAnimationFrame((function () {
            /complete|interactive|loaded/.test(document.readyState) ? i() : document.addEventListener("DOMContentLoaded", i)
          }))
        }
      }, {
        key: "destroy",
        value: function () {
          window.removeEventListener("hashchange", t.onHashChange, !1)
        }
      }]), t
    }(),
    Z = {
      pageXOffset: 0,
      pageYOffset: 0,
      element: function () {
        return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement
      },
      activate: function (t) {
        Z.pageXOffset = window.pageXOffset, Z.pageYOffset = window.pageYOffset, t.requestFullscreen ? t.requestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen ? t.webkitRequestFullscreen() : t.msRequestFullscreen && t.msRequestFullscreen()
      },
      deactivate: function () {
        document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
      }
    },
    G = function () {
      function t(e) {
        o(this, t), this.fancybox = e, this.active = !1, this.handleVisibilityChange = this.handleVisibilityChange.bind(this)
      }

      return s(t, [{
        key: "isActive",
        value: function () {
          return this.active
        }
      }, {
        key: "setTimer",
        value: function () {
          var t = this;
          if (this.active && !this.timer) {
            var e = this.fancybox.option("slideshow.delay", 3e3);
            this.timer = setTimeout((function () {
              t.timer = null, t.fancybox.option("infinite") || t.fancybox.getSlide().index !== t.fancybox.Carousel.slides.length - 1 ? t.fancybox.next() : t.fancybox.jumpTo(0, {
                friction: 0
              })
            }), e);
            var i = this.$progress;
            i || ((i = document.createElement("div")).classList.add("fancybox__progress"), this.fancybox.$carousel.parentNode.insertBefore(i, this.fancybox.$carousel), this.$progress = i, i.offsetHeight), i.style.transitionDuration = "".concat(e, "ms"), i.style.transform = "scaleX(1)"
          }
        }
      }, {
        key: "clearTimer",
        value: function () {
          clearTimeout(this.timer), this.timer = null, this.$progress && (this.$progress.style.transitionDuration = "", this.$progress.style.transform = "", this.$progress.offsetHeight)
        }
      }, {
        key: "activate",
        value: function () {
          this.active || (this.active = !0, this.fancybox.$container.classList.add("has-slideshow"), "done" === this.fancybox.getSlide().state && this.setTimer(), document.addEventListener("visibilitychange", this.handleVisibilityChange, !1))
        }
      }, {
        key: "handleVisibilityChange",
        value: function () {
          this.deactivate()
        }
      }, {
        key: "deactivate",
        value: function () {
          this.active = !1, this.clearTimer(), this.fancybox.$container.classList.remove("has-slideshow"), document.removeEventListener("visibilitychange", this.handleVisibilityChange, !1)
        }
      }, {
        key: "toggle",
        value: function () {
          this.active ? this.deactivate() : this.fancybox.Carousel.slides.length > 1 && this.activate()
        }
      }]), t
    }(),
    K = {
      display: ["counter", "zoom", "slideshow", "fullscreen", "thumbs", "close"],
      autoEnable: !0,
      items: {
        counter: {
          type: "div",
          class: "fancybox__counter",
          html: '<span data-fancybox-index=""></span>&nbsp;/&nbsp;<span data-fancybox-count=""></span>',
          tabindex: -1,
          position: "left"
        },
        prev: {
          type: "button",
          class: "fancybox__button--prev",
          label: "PREV",
          html: '<svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8"/></svg>',
          click: function (t) {
            t.preventDefault(), this.fancybox.prev()
          }
        },
        next: {
          type: "button",
          class: "fancybox__button--next",
          label: "NEXT",
          html: '<svg viewBox="0 0 24 24"><path d="M8 4l8 8-8 8"/></svg>',
          click: function (t) {
            t.preventDefault(), this.fancybox.next()
          }
        },
        fullscreen: {
          type: "button",
          class: "fancybox__button--fullscreen",
          label: "TOGGLE_FULLSCREEN",
          html: '<svg viewBox="0 0 24 24">\n                <g><path d="M3 8 V3h5"></path><path d="M21 8V3h-5"></path><path d="M8 21H3v-5"></path><path d="M16 21h5v-5"></path></g>\n                <g><path d="M7 2v5H2M17 2v5h5M2 17h5v5M22 17h-5v5"/></g>\n            </svg>',
          click: function (t) {
            t.preventDefault(), Z.element() ? Z.deactivate() : Z.activate(this.fancybox.$container)
          }
        },
        slideshow: {
          type: "button",
          class: "fancybox__button--slideshow",
          label: "TOGGLE_SLIDESHOW",
          html: '<svg viewBox="0 0 24 24">\n                <g><path d="M6 4v16"/><path d="M20 12L6 20"/><path d="M20 12L6 4"/></g>\n                <g><path d="M7 4v15M17 4v15"/></g>\n            </svg>',
          click: function (t) {
            t.preventDefault(), this.Slideshow.toggle()
          }
        },
        zoom: {
          type: "button",
          class: "fancybox__button--zoom",
          label: "TOGGLE_ZOOM",
          html: '<svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="7"></circle><path d="M16 16 L21 21"></svg>',
          click: function (t) {
            t.preventDefault();
            var e = this.fancybox.getSlide().Panzoom;
            e && e.toggleZoom()
          }
        },
        download: {
          type: "link",
          label: "DOWNLOAD",
          class: "fancybox__button--download",
          html: '<svg viewBox="0 0 24 24"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.62 2.48A2 2 0 004.56 21h14.88a2 2 0 001.94-1.51L22 17"/></svg>',
          click: function (t) {
            t.stopPropagation()
          }
        },
        thumbs: {
          type: "button",
          label: "TOGGLE_THUMBS",
          class: "fancybox__button--thumbs",
          html: '<svg viewBox="0 0 24 24"><circle cx="4" cy="4" r="1" /><circle cx="12" cy="4" r="1" transform="rotate(90 12 4)"/><circle cx="20" cy="4" r="1" transform="rotate(90 20 4)"/><circle cx="4" cy="12" r="1" transform="rotate(90 4 12)"/><circle cx="12" cy="12" r="1" transform="rotate(90 12 12)"/><circle cx="20" cy="12" r="1" transform="rotate(90 20 12)"/><circle cx="4" cy="20" r="1" transform="rotate(90 4 20)"/><circle cx="12" cy="20" r="1" transform="rotate(90 12 20)"/><circle cx="20" cy="20" r="1" transform="rotate(90 20 20)"/></svg>',
          click: function (t) {
            t.stopPropagation();
            var e = this.fancybox.plugins.Thumbs;
            e && e.toggle()
          }
        },
        close: {
          type: "button",
          label: "CLOSE",
          class: "fancybox__button--close",
          html: '<svg viewBox="0 0 24 24"><path d="M20 20L4 4m16 0L4 20"></path></svg>',
          tabindex: 0,
          click: function (t) {
            t.stopPropagation(), t.preventDefault(), this.fancybox.close()
          }
        }
      }
    },
    J = function () {
      function t(e) {
        var i = this;
        o(this, t), this.fancybox = e, this.$container = null, this.state = "init";
        for (var n = 0, a = ["onInit", "onPrepare", "onDone", "onKeydown", "onClosing", "onChange", "onSettle", "onRefresh"]; n < a.length; n++) {
          var s = a[n];
          this[s] = this[s].bind(this)
        }
        this.events = {
          init: this.onInit,
          prepare: this.onPrepare,
          done: this.onDone,
          keydown: this.onKeydown,
          closing: this.onClosing,
          "Carousel.change": this.onChange,
          "Carousel.settle": this.onSettle,
          "Carousel.Panzoom.touchStart": function () {
            return i.onRefresh()
          },
          "Image.startAnimation": function (t, e) {
            return i.onRefresh(e)
          },
          "Image.afterUpdate": function (t, e) {
            return i.onRefresh(e)
          }
        }
      }

      return s(t, [{
        key: "onInit",
        value: function () {
          if (this.fancybox.option("Toolbar.autoEnable")) {
            var t, e = !1,
              i = y(this.fancybox.items);
            try {
              for (i.s(); !(t = i.n()).done;) {
                if ("image" === t.value.type) {
                  e = !0;
                  break
                }
              }
            } catch (t) {
              i.e(t)
            } finally {
              i.f()
            }
            if (!e) return void(this.state = "disabled")
          }
          var n, o = y(this.fancybox.option("Toolbar.display"));
          try {
            for (o.s(); !(n = o.n()).done;) {
              var a = n.value;
              if ("close" === (b(a) ? a.id : a)) {
                this.fancybox.options.closeButton = !1;
                break
              }
            }
          } catch (t) {
            o.e(t)
          } finally {
            o.f()
          }
        }
      }, {
        key: "onPrepare",
        value: function () {
          if ("init" === this.state && (this.build(), this.update(), this.Slideshow = new G(this.fancybox), !this.fancybox.Carousel.prevPage && (this.fancybox.option("slideshow.autoStart") && this.Slideshow.activate(), this.fancybox.option("fullscreen.autoStart") && !Z.element()))) try {
            Z.activate(this.fancybox.$container)
          } catch (t) {}
        }
      }, {
        key: "onFsChange",
        value: function () {
          window.scrollTo(Z.pageXOffset, Z.pageYOffset)
        }
      }, {
        key: "onSettle",
        value: function () {
          this.Slideshow && this.Slideshow.isActive() && (this.fancybox.getSlide().index !== this.fancybox.Carousel.slides.length - 1 || this.fancybox.option("infinite") ? "done" === this.fancybox.getSlide().state && this.Slideshow.setTimer() : this.Slideshow.deactivate())
        }
      }, {
        key: "onChange",
        value: function () {
          this.update(), this.Slideshow && this.Slideshow.isActive() && this.Slideshow.clearTimer()
        }
      }, {
        key: "onDone",
        value: function (t, e) {
          e.index === t.getSlide().index && (this.update(), this.Slideshow && this.Slideshow.isActive() && (this.fancybox.option("infinite") || e.index !== this.fancybox.Carousel.slides.length - 1 ? this.Slideshow.setTimer() : this.Slideshow.deactivate()))
        }
      }, {
        key: "onRefresh",
        value: function (t) {
          t && t.index !== this.fancybox.getSlide().index || (this.update(), !this.Slideshow || !this.Slideshow.isActive() || t && "done" !== t.state || this.Slideshow.deactivate())
        }
      }, {
        key: "onKeydown",
        value: function (t, e, i) {
          " " === e && this.Slideshow && (this.Slideshow.toggle(), i.preventDefault())
        }
      }, {
        key: "onClosing",
        value: function () {
          this.Slideshow && this.Slideshow.deactivate(), document.removeEventListener("fullscreenchange", this.onFsChange)
        }
      }, {
        key: "createElement",
        value: function (t) {
          var e, i;
          ("div" === t.type ? e = document.createElement("div") : (e = document.createElement("link" === t.type ? "a" : "button")).classList.add("carousel__button"), e.innerHTML = t.html, e.setAttribute("tabindex", t.tabindex || 0), t.class) && (i = e.classList).add.apply(i, p(t.class.split(" ")));
          t.label && e.setAttribute("title", this.fancybox.localize("{{".concat(t.label, "}}"))), t.click && e.addEventListener("click", t.click.bind(this)), "prev" === t.id && e.setAttribute("data-fancybox-prev", ""), "next" === t.id && e.setAttribute("data-fancybox-next", "");
          var n = e.querySelector("svg");
          return n && (n.setAttribute("role", "img"), n.setAttribute("tabindex", "-1"), n.setAttribute("xmlns", "http://www.w3.org/2000/svg")), e
        }
      }, {
        key: "build",
        value: function () {
          var t = this;
          this.cleanup();
          var e, i = this.fancybox.option("Toolbar.items"),
            n = [{
              position: "left",
              items: []
            }, {
              position: "center",
              items: []
            }, {
              position: "right",
              items: []
            }],
            o = this.fancybox.plugins.Thumbs,
            a = y(this.fancybox.option("Toolbar.display"));
          try {
            var s = function () {
              var a = e.value,
                s = void 0,
                r = void 0;
              if (b(a) ? (s = a.id, r = x({}, i[s], a)) : r = i[s = a], ["counter", "next", "prev", "slideshow"].includes(s) && t.fancybox.items.length < 2) return "continue";
              if ("fullscreen" === s) {
                if (!document.fullscreenEnabled || window.fullScreen) return "continue";
                document.addEventListener("fullscreenchange", t.onFsChange)
              }
              if ("thumbs" === s && (!o || "disabled" === o.state)) return "continue";
              if (!r) return "continue";
              var l = r.position || "right",
                c = n.find((function (t) {
                  return t.position === l
                }));
              c && c.items.push(r)
            };
            for (a.s(); !(e = a.n()).done;) s()
          } catch (t) {
            a.e(t)
          } finally {
            a.f()
          }
          var r = document.createElement("div");
          r.classList.add("fancybox__toolbar");
          for (var l = 0, c = n; l < c.length; l++) {
            var h = c[l];
            if (h.items.length) {
              var d = document.createElement("div");
              d.classList.add("fancybox__toolbar__items"), d.classList.add("fancybox__toolbar__items--".concat(h.position));
              var u, f = y(h.items);
              try {
                for (f.s(); !(u = f.n()).done;) {
                  var v = u.value;
                  d.appendChild(this.createElement(v))
                }
              } catch (t) {
                f.e(t)
              } finally {
                f.f()
              }
              r.appendChild(d)
            }
          }
          this.fancybox.$carousel.parentNode.insertBefore(r, this.fancybox.$carousel), this.$container = r
        }
      }, {
        key: "update",
        value: function () {
          var t, e = this.fancybox.getSlide(),
            i = e.index,
            n = this.fancybox.items.length,
            o = e.downloadSrc || ("image" !== e.type || e.error ? null : e.src),
            a = y(this.fancybox.$container.querySelectorAll("a.fancybox__button--download"));
          try {
            for (a.s(); !(t = a.n()).done;) {
              var s = t.value;
              o ? (s.removeAttribute("disabled"), s.removeAttribute("tabindex"), s.setAttribute("href", o), s.setAttribute("download", o), s.setAttribute("target", "_blank")) : (s.setAttribute("disabled", ""), s.setAttribute("tabindex", -1), s.removeAttribute("href"), s.removeAttribute("download"))
            }
          } catch (t) {
            a.e(t)
          } finally {
            a.f()
          }
          var r, l = e.Panzoom,
            c = l && l.option("maxScale") > l.option("baseScale"),
            h = y(this.fancybox.$container.querySelectorAll(".fancybox__button--zoom"));
          try {
            for (h.s(); !(r = h.n()).done;) {
              var d = r.value;
              c ? d.removeAttribute("disabled") : d.setAttribute("disabled", "")
            }
          } catch (t) {
            h.e(t)
          } finally {
            h.f()
          }
          var u, f = y(this.fancybox.$container.querySelectorAll("[data-fancybox-index]"));
          try {
            for (f.s(); !(u = f.n()).done;) {
              u.value.innerHTML = e.index + 1
            }
          } catch (t) {
            f.e(t)
          } finally {
            f.f()
          }
          var v, p = y(this.fancybox.$container.querySelectorAll("[data-fancybox-count]"));
          try {
            for (p.s(); !(v = p.n()).done;) {
              v.value.innerHTML = n
            }
          } catch (t) {
            p.e(t)
          } finally {
            p.f()
          }
          if (!this.fancybox.option("infinite")) {
            var g, m = y(this.fancybox.$container.querySelectorAll("[data-fancybox-prev]"));
            try {
              for (m.s(); !(g = m.n()).done;) {
                var b = g.value;
                0 === i ? b.setAttribute("disabled", "") : b.removeAttribute("disabled")
              }
            } catch (t) {
              m.e(t)
            } finally {
              m.f()
            }
            var x, w = y(this.fancybox.$container.querySelectorAll("[data-fancybox-next]"));
            try {
              for (w.s(); !(x = w.n()).done;) {
                var k = x.value;
                i === n - 1 ? k.setAttribute("disabled", "") : k.removeAttribute("disabled")
              }
            } catch (t) {
              w.e(t)
            } finally {
              w.f()
            }
          }
        }
      }, {
        key: "cleanup",
        value: function () {
          this.Slideshow && this.Slideshow.isActive() && this.Slideshow.clearTimer(), this.$container && this.$container.remove(), this.$container = null
        }
      }, {
        key: "attach",
        value: function () {
          this.fancybox.on(this.events)
        }
      }, {
        key: "detach",
        value: function () {
          this.fancybox.off(this.events), this.cleanup()
        }
      }]), t
    }();
  J.defaults = K;
  var Q = {
      ScrollLock: H,
      Thumbs: W,
      Html: q,
      Toolbar: J,
      Image: Y,
      Hash: V
    },
    tt = {
      startIndex: 0,
      preload: 1,
      infinite: !0,
      showClass: "fancybox-zoomInUp",
      hideClass: "fancybox-fadeOut",
      animated: !0,
      hideScrollbar: !0,
      parentEl: null,
      mainClass: null,
      autoFocus: !0,
      trapFocus: !0,
      placeFocusBack: !0,
      click: "close",
      closeButton: "inside",
      dragToClose: !0,
      keyboard: {
        Escape: "close",
        Delete: "close",
        Backspace: "close",
        PageUp: "next",
        PageDown: "prev",
        ArrowUp: "next",
        ArrowDown: "prev",
        ArrowRight: "next",
        ArrowLeft: "prev"
      },
      template: {
        closeButton: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg>',
        spinner: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="25 25 50 50" tabindex="-1"><circle cx="50" cy="50" r="20"/></svg>',
        main: null
      },
      l10n: {
        CLOSE: "Close",
        NEXT: "Next",
        PREV: "Previous",
        MODAL: "You can close this modal content with the ESC key",
        ERROR: "Something Went Wrong, Please Try Again Later",
        IMAGE_ERROR: "Image Not Found",
        ELEMENT_NOT_FOUND: "HTML Element Not Found",
        AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
        AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
        IFRAME_ERROR: "Error Loading Page",
        TOGGLE_ZOOM: "Toggle zoom level",
        TOGGLE_THUMBS: "Toggle thumbnails",
        TOGGLE_SLIDESHOW: "Toggle slideshow",
        TOGGLE_FULLSCREEN: "Toggle full-screen mode",
        DOWNLOAD: "Download"
      }
    },
    et = {},
    it = 0,
    nt = function (t) {
      l(i, t);
      var e = f(i);

      function i(t) {
        var n, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return o(this, i), (n = e.call(this, x(!0, {}, tt, a))).bindHandlers(), n.state = "init", n.setItems(t), n.attachPlugins(i.Plugins), n.trigger("init"), !0 === n.option("hideScrollbar") && n.hideScrollbar(), n.initLayout(), n.initCarousel(), n.attachEvents(), et[n.id] = d(n), n.trigger("prepare"), n.state = "ready", n.trigger("ready"), n.$container.setAttribute("aria-hidden", "false"), n.option("trapFocus") && n.focus(), n
      }

      return s(i, [{
        key: "bindHandlers",
        value: function () {
          for (var t = 0, e = ["onMousedown", "onKeydown", "onClick", "onFocus", "onCreateSlide", "onTouchMove", "onTouchEnd", "onTransform"]; t < e.length; t++) {
            var i = e[t];
            this[i] = this[i].bind(this)
          }
        }
      }, {
        key: "attachEvents",
        value: function () {
          document.addEventListener("mousedown", this.onMousedown), document.addEventListener("keydown", this.onKeydown, !0), this.option("trapFocus") && document.addEventListener("focus", this.onFocus, !0), this.$container.addEventListener("click", this.onClick)
        }
      }, {
        key: "detachEvents",
        value: function () {
          document.removeEventListener("mousedown", this.onMousedown), document.removeEventListener("keydown", this.onKeydown, !0), document.removeEventListener("focus", this.onFocus, !0), this.$container.removeEventListener("click", this.onClick)
        }
      }, {
        key: "initLayout",
        value: function () {
          var t = this;
          this.$root = this.option("parentEl") || document.body;
          var e = this.option("template.main");
          e && (this.$root.insertAdjacentHTML("beforeend", this.localize(e)), this.$container = this.$root.querySelector(".fancybox__container")), this.$container || (this.$container = document.createElement("div"), this.$root.appendChild(this.$container)), this.$container.onscroll = function () {
            return t.$container.scrollLeft = 0, !1
          }, Object.entries({
            class: "fancybox__container",
            role: "dialog",
            tabIndex: "-1",
            "aria-modal": "true",
            "aria-hidden": "true",
            "aria-label": this.localize("{{MODAL}}")
          }).forEach((function (e) {
            var i;
            return (i = t.$container).setAttribute.apply(i, p(e))
          })), this.option("animated") && this.$container.classList.add("is-animated"), this.$backdrop = this.$container.querySelector(".fancybox__backdrop"), this.$backdrop || (this.$backdrop = document.createElement("div"), this.$backdrop.classList.add("fancybox__backdrop"), this.$container.appendChild(this.$backdrop)), this.$carousel = this.$container.querySelector(".fancybox__carousel"), this.$carousel || (this.$carousel = document.createElement("div"), this.$carousel.classList.add("fancybox__carousel"), this.$container.appendChild(this.$carousel)), this.$container.Fancybox = this, this.id = this.$container.getAttribute("id"), this.id || (this.id = this.options.id || ++it, this.$container.setAttribute("id", "fancybox-" + this.id));
          var i, n = this.options.mainClass;
          n && (i = this.$container.classList).add.apply(i, p(n.split(" ")));
          return document.documentElement.classList.add("with-fancybox"), this.trigger("initLayout"), this
        }
      }, {
        key: "setItems",
        value: function (t) {
          var e, i = [],
            n = y(t);
          try {
            for (n.s(); !(e = n.n()).done;) {
              var o = e.value,
                a = o.$trigger;
              if (a) {
                var s = a.dataset || {};
                o.src = s.src || a.getAttribute("href") || o.src, o.type = s.type || o.type, !o.src && a instanceof HTMLImageElement && (o.src = a.currentSrc || o.$trigger.src)
              }
              var r = o.$thumb;
              if (!r) {
                var l = o.$trigger && o.$trigger.origTarget;
                l && (r = l instanceof HTMLImageElement ? l : l.querySelector("img")), !r && o.$trigger && (r = o.$trigger instanceof HTMLImageElement ? o.$trigger : o.$trigger.querySelector("img"))
              }
              o.$thumb = r || null;
              var c = o.thumb;
              !c && r && !(c = r.currentSrc || r.src) && r.dataset && (c = r.dataset.lazySrc || r.dataset.src), c || "image" !== o.type || (c = o.src), o.thumb = c || null, o.caption = o.caption || "", i.push(o)
            }
          } catch (t) {
            n.e(t)
          } finally {
            n.f()
          }
          this.items = i
        }
      }, {
        key: "initCarousel",
        value: function () {
          var t = this;
          return this.Carousel = new D(this.$carousel, x(!0, {}, {
            prefix: "",
            classNames: {
              viewport: "fancybox__viewport",
              track: "fancybox__track",
              slide: "fancybox__slide"
            },
            textSelection: !0,
            preload: this.option("preload"),
            friction: .88,
            slides: this.items,
            initialPage: this.options.startIndex,
            slidesPerPage: 1,
            infiniteX: this.option("infinite"),
            infiniteY: !0,
            l10n: this.option("l10n"),
            Dots: !1,
            Navigation: {
              classNames: {
                main: "fancybox__nav",
                button: "carousel__button",
                next: "is-next",
                prev: "is-prev"
              }
            },
            Panzoom: {
              textSelection: !0,
              panOnlyZoomed: function () {
                return t.Carousel && t.Carousel.pages && t.Carousel.pages.length < 2 && !t.options.dragToClose
              },
              lockAxis: function () {
                if (t.Carousel) {
                  var e = "x";
                  return t.options.dragToClose && (e += "y"), e
                }
              }
            },
            on: {
              "*": function (e) {
                for (var i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++) n[o - 1] = arguments[o];
                return t.trigger.apply(t, ["Carousel.".concat(e)].concat(n))
              },
              init: function (e) {
                return t.Carousel = e
              },
              createSlide: this.onCreateSlide
            }
          }, this.option("Carousel"))), this.option("dragToClose") && this.Carousel.Panzoom.on({
            touchMove: this.onTouchMove,
            afterTransform: this.onTransform,
            touchEnd: this.onTouchEnd
          }), this.trigger("initCarousel"), this
        }
      }, {
        key: "onCreateSlide",
        value: function (t, e) {
          var i = e.caption || "";
          if ("function" == typeof this.options.caption && (i = this.options.caption.call(this, this, this.Carousel, e)), "string" == typeof i && i.length) {
            var n = document.createElement("div"),
              o = "fancybox__caption_".concat(this.id, "_").concat(e.index);
            n.className = "fancybox__caption", n.innerHTML = i, n.setAttribute("id", o), e.$caption = e.$el.appendChild(n), e.$el.classList.add("has-caption"), e.$el.setAttribute("aria-labelledby", o)
          }
        }
      }, {
        key: "onFocus",
        value: function (t) {
          this.focus(t)
        }
      }, {
        key: "onClick",
        value: function (t) {
          if (!t.defaultPrevented && (!t.target.closest(".fancybox__content") && !getSelection().toString().length && !1 !== this.trigger("click", t))) switch (this.option("click")) {
            case "close":
              this.close();
              break;
            case "next":
              this.next()
          }
        }
      }, {
        key: "onTouchMove",
        value: function () {
          var t = this.getSlide().Panzoom;
          return !t || 1 === t.content.scale
        }
      }, {
        key: "onTouchEnd",
        value: function (t) {
          var e = t.dragOffset.y;
          Math.abs(e) >= 150 || Math.abs(e) >= 35 && t.dragOffset.time < 350 ? (this.option("hideClass") && (this.getSlide().hideClass = "fancybox-throwOut".concat(t.content.y < 0 ? "Up" : "Down")), this.close()) : "y" === t.lockAxis && t.panTo({
            y: 0
          })
        }
      }, {
        key: "onTransform",
        value: function (t) {
          if (this.$backdrop) {
            var e = Math.abs(t.content.y),
              i = e < 1 ? "" : Math.max(.33, Math.min(1, 1 - e / t.content.fitHeight * 1.5));
            this.$container.style.setProperty("--fancybox-ts", i ? "0s" : ""), this.$container.style.setProperty("--fancybox-opacity", i)
          }
        }
      }, {
        key: "onMousedown",
        value: function () {
          document.body.classList.add("is-using-mouse")
        }
      }, {
        key: "onKeydown",
        value: function (t) {
          if (i.getInstance().id === this.id) {
            document.body.classList.remove("is-using-mouse");
            var e = t.key,
              n = this.option("keyboard");
            if (n && !t.ctrlKey && !t.altKey && !t.shiftKey) {
              var o = document.activeElement && document.activeElement.classList,
                a = o && o.contains("carousel__button");
              if ("Escape" !== e && !a)
                if (t.target.isContentEditable || -1 !== ["BUTTON", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].indexOf(t.target.nodeName)) return;
              if (!1 !== this.trigger("keydown", e, t)) {
                var s = n[e];
                "function" == typeof this[s] && this[s]()
              }
            }
          }
        }
      }, {
        key: "getSlide",
        value: function () {
          var t = this.Carousel;
          if (!t) return null;
          var e = null === t.page ? t.option("initialPage") : t.page,
            i = t.pages || [];
          return i.length && i[e] ? i[e].slides[0] : null
        }
      }, {
        key: "focus",
        value: function (t) {
          var e = function (t) {
            if (t) {
              i.ignoreFocusChange = !0;
              try {
                t.setActive ? t.setActive() : i.preventScrollSupported ? t.focus({
                  preventScroll: !0
                }) : t.focus()
              } catch (t) {}
              i.ignoreFocusChange = !1
            }
          };
          if (!(i.ignoreFocusChange || ["init", "closing", "customClosing", "destroy"].indexOf(this.state) > -1)) {
            var n = this.getSlide().$el;
            if (n) {
              t && t.preventDefault();
              for (var o, a = Array.from(this.$container.querySelectorAll(["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])'])), s = [this.$container], r = 0, l = a; r < l.length; r++) {
                var c = l[r],
                  h = n.contains(c);
                !c.offsetParent || !h && this.Carousel.$viewport.contains(c) ? (c.dataset.origTabindex = void 0 === c.dataset.origTabindex ? c.getAttribute("tabindex") : c.dataset.origTabindex, c.tabIndex = -1) : (s.push(c), void 0 !== c.dataset.origTabindex && (c.tabIndex = c.dataset.tabindex, c.removeAttribute("data-tabindex")), (c.hasAttribute("autoFocus") || !o && h) && (o = c))
              }
              if (s.indexOf(document.activeElement) > -1) this.lastFocus = document.activeElement;
              else if (t) {
                if (!n.contains(document.activeElement)) {
                  if (this.lastFocus === s[1]) e(s[s.length - 1]);
                  else {
                    var d = s.indexOf(this.lastFocus);
                    d < s.length - 2 ? e(s[d + 1]) : e(s[0])
                  }
                  this.lastFocus = document.activeElement
                }
              } else e(o || s[0])
            }
          }
        }
      }, {
        key: "hideScrollbar",
        value: function () {
          if (B) {
            var t = window.innerWidth - document.documentElement.getBoundingClientRect().width,
              e = "fancybox-style-noscroll",
              i = document.getElementById(e);
            i || t > 0 && ((i = document.createElement("style")).id = e, i.type = "text/css", i.innerHTML = ".compensate-for-scrollbar {padding-right: ".concat(t, "px;}"), document.getElementsByTagName("head")[0].appendChild(i), document.body.classList.add("compensate-for-scrollbar"))
          }
        }
      }, {
        key: "revealScrollbar",
        value: function () {
          document.body.classList.remove("compensate-for-scrollbar");
          var t = document.getElementById("fancybox-style-noscroll");
          t && t.remove()
        }
      }, {
        key: "clearContent",
        value: function (t) {
          this.Carousel.trigger("removeSlide", t), t.$content && (t.$content.remove(), t.$content = null), t.$closeButton && (t.$closeButton.remove(), t.$closeButton = null), t._className && t.$el.classList.remove(t._className)
        }
      }, {
        key: "setContent",
        value: function (t, e) {
          var i, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            o = t.$el;
          if (e instanceof HTMLElement)["img", "iframe", "video", "audio"].indexOf(e.nodeName.toLowerCase()) > -1 ? (i = document.createElement("div")).appendChild(e) : i = e;
          else {
            var a = document.createRange().createContextualFragment(e);
            (i = document.createElement("div")).appendChild(a)
          }
          if (t.filter && !t.error && (i = i.querySelector(t.filter)), i instanceof Element) return t._className = "has-".concat(n.suffix || t.type || "unknown"), o.classList.add(t._className), i.classList.add("fancybox__content"), "none" !== i.style.display && "none" !== getComputedStyle(i).getPropertyValue("display") || (i.style.display = t.display || this.option("defaultDisplay") || "flex"), t.id && i.setAttribute("id", t.id), t.$content = i, o.prepend(i), this.manageCloseButton(t), "loading" !== t.state && this.revealContent(t), i;
          this.setError(t, "{{ELEMENT_NOT_FOUND}}")
        }
      }, {
        key: "manageCloseButton",
        value: function (t) {
          var e = this,
            i = void 0 === t.closeButton ? this.option("closeButton") : t.closeButton;
          if (i && ("top" !== i || !this.$closeButton)) {
            var n = document.createElement("button");
            n.classList.add("carousel__button", "is-close"), n.setAttribute("title", this.options.l10n.CLOSE), n.innerHTML = this.option("template.closeButton"), n.addEventListener("click", (function (t) {
              return e.close(t)
            })), "inside" === i ? (t.$closeButton && t.$closeButton.remove(), t.$closeButton = t.$content.appendChild(n)) : this.$closeButton = this.$container.insertBefore(n, this.$container.firstChild)
          }
        }
      }, {
        key: "revealContent",
        value: function (t) {
          var e = this;
          this.trigger("reveal", t), t.$content.style.visibility = "";
          var i = !1;
          t.error || "loading" === t.state || null !== this.Carousel.prevPage || t.index !== this.options.startIndex || (i = void 0 === t.showClass ? this.option("showClass") : t.showClass), i ? (t.state = "animating", this.animateCSS(t.$content, i, (function () {
            e.done(t)
          }))) : this.done(t)
        }
      }, {
        key: "animateCSS",
        value: function (t, e, i) {
          if (t && t.dispatchEvent(new CustomEvent("animationend", {
              bubbles: !0,
              cancelable: !0
            })), t && e) {
            t.addEventListener("animationend", (function n(o) {
              o.currentTarget === this && (t.removeEventListener("animationend", n), i && i(), t.classList.remove(e))
            })), t.classList.add(e)
          } else "function" == typeof i && i()
        }
      }, {
        key: "done",
        value: function (t) {
          t.state = "done", this.trigger("done", t);
          var e = this.getSlide();
          e && t.index === e.index && this.option("autoFocus") && this.focus()
        }
      }, {
        key: "setError",
        value: function (t, e) {
          t.error = e, this.hideLoading(t), this.clearContent(t);
          var i = document.createElement("div");
          i.classList.add("fancybox-error"), i.innerHTML = this.localize(e || "<p>{{ERROR}}</p>"), this.setContent(t, i, {
            suffix: "error"
          })
        }
      }, {
        key: "showLoading",
        value: function (t) {
          var e = this;
          t.state = "loading", t.$el.classList.add("is-loading");
          var i = t.$el.querySelector(".fancybox__spinner");
          i || ((i = document.createElement("div")).classList.add("fancybox__spinner"), i.innerHTML = this.option("template.spinner"), i.addEventListener("click", (function () {
            e.Carousel.Panzoom.velocity || e.close()
          })), t.$el.prepend(i))
        }
      }, {
        key: "hideLoading",
        value: function (t) {
          var e = t.$el && t.$el.querySelector(".fancybox__spinner");
          e && (e.remove(), t.$el.classList.remove("is-loading")), "loading" === t.state && (this.trigger("load", t), t.state = "ready")
        }
      }, {
        key: "next",
        value: function () {
          var t = this.Carousel;
          t && t.pages.length > 1 && t.slideNext()
        }
      }, {
        key: "prev",
        value: function () {
          var t = this.Carousel;
          t && t.pages.length > 1 && t.slidePrev()
        }
      }, {
        key: "jumpTo",
        value: function () {
          var t;
          this.Carousel && (t = this.Carousel).slideTo.apply(t, arguments)
        }
      }, {
        key: "close",
        value: function (t) {
          var e = this;
          if (t && t.preventDefault(), !["closing", "customClosing", "destroy"].includes(this.state) && !1 !== this.trigger("shouldClose", t) && (this.state = "closing", this.Carousel.Panzoom.destroy(), this.detachEvents(), this.trigger("closing", t), "destroy" !== this.state)) {
            this.$container.setAttribute("aria-hidden", "true"), this.$container.classList.add("is-closing");
            var i = this.getSlide();
            if (this.Carousel.slides.forEach((function (t) {
                t.$content && t.index !== i.index && e.Carousel.trigger("removeSlide", t)
              })), "closing" === this.state) {
              var n = void 0 === i.hideClass ? this.option("hideClass") : i.hideClass;
              this.animateCSS(i.$content, n, (function () {
                e.destroy()
              }), !0)
            }
          }
        }
      }, {
        key: "destroy",
        value: function () {
          if ("destroy" !== this.state) {
            this.state = "destroy", this.trigger("destroy");
            var t = this.option("placeFocusBack") ? this.getSlide().$trigger : null;
            if (this.Carousel.destroy(), this.detachPlugins(), this.Carousel = null, this.options = {}, this.events = {}, this.$container.remove(), this.$container = this.$backdrop = this.$carousel = null, t)
              if (i.preventScrollSupported) t.focus({
                preventScroll: !0
              });
              else {
                var e = document.body.scrollTop;
                t.focus(), document.body.scrollTop = e
              }
            delete et[this.id];
            var n = i.getInstance();
            n ? n.focus() : (document.documentElement.classList.remove("with-fancybox"), document.body.classList.remove("is-using-mouse"), this.revealScrollbar())
          }
        }
      }], [{
        key: "show",
        value: function (t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return new i(t, e)
        }
      }, {
        key: "fromEvent",
        value: function (t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          if (!t.defaultPrevented && !(t.button && 0 !== t.button || t.ctrlKey || t.metaKey || t.shiftKey)) {
            var n, o, a, s = t.target;
            if ((s.matches("[data-fancybox-trigger]") || (s = s.closest("[data-fancybox-trigger]"))) && (n = s && s.dataset && s.dataset.fancyboxTrigger), n) {
              var r = document.querySelectorAll('[data-fancybox="'.concat(n, '"]')),
                l = parseInt(s.dataset.fancyboxIndex, 10) || 0;
              s = r.length ? r[l] : s
            }
            s || (s = t.target), Array.from(i.openers.keys()).reverse().some((function (e) {
              a = s;
              var i = !1;
              try {
                a instanceof Element && ("string" == typeof e || e instanceof String) && (i = a.matches(e) || (a = a.closest(e)))
              } catch (t) {}
              return !!i && (t.preventDefault(), o = e, !0)
            }));
            var c = !1;
            if (o) {
              e.event = t, e.target = a, a.origTarget = t.target, c = i.fromOpener(o, e);
              var h = i.getInstance();
              h && "ready" === h.state && t.detail && document.body.classList.add("is-using-mouse")
            }
            return c
          }
        }
      }, {
        key: "fromOpener",
        value: function (t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = function (t) {
              for (var e = ["false", "0", "no", "null", "undefined"], i = ["true", "1", "yes"], n = Object.assign({}, t.dataset), o = {}, a = 0, s = Object.entries(n); a < s.length; a++) {
                var r = v(s[a], 2),
                  l = r[0],
                  c = r[1];
                if ("fancybox" !== l)
                  if ("width" === l || "height" === l) o["_".concat(l)] = c;
                  else if ("string" == typeof c || c instanceof String)
                  if (e.indexOf(c) > -1) o[l] = !1;
                  else if (i.indexOf(o[l]) > -1) o[l] = !0;
                else try {
                  o[l] = JSON.parse(c)
                } catch (t) {
                  o[l] = c
                } else o[l] = c
              }
              return t instanceof Element && (o.$trigger = t), o
            },
            o = [],
            a = e.startIndex || 0,
            s = e.target || null,
            r = void 0 === (e = x({}, e, i.openers.get(t))).groupAttr ? "data-fancybox" : e.groupAttr,
            l = r && s && s.getAttribute("".concat(r)),
            c = void 0 !== e.groupAll && e.groupAll;
          if (c || l ? (o = [].slice.call(document.querySelectorAll(t)), c || (o = o.filter((function (t) {
              return t.getAttribute("".concat(r)) === l
            })))) : o = [s], !o.length) return !1;
          var h = i.getInstance();
          return !(h && o.indexOf(h.options.$trigger) > -1) && (a = s ? o.indexOf(s) : a, new i(o = o.map(n), x({}, e, {
            startIndex: a,
            $trigger: s
          })))
        }
      }, {
        key: "bind",
        value: function (t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};

          function n() {
            document.body.addEventListener("click", i.fromEvent, !1)
          }

          B && (i.openers.size || (/complete|interactive|loaded/.test(document.readyState) ? n() : document.addEventListener("DOMContentLoaded", n)), i.openers.set(t, e))
        }
      }, {
        key: "unbind",
        value: function (t) {
          i.openers.delete(t), i.openers.size || i.destroy()
        }
      }, {
        key: "destroy",
        value: function () {
          for (var t; t = i.getInstance();) t.destroy();
          i.openers = new Map, document.body.removeEventListener("click", i.fromEvent, !1)
        }
      }, {
        key: "getInstance",
        value: function (t) {
          return t ? et[t] : Object.values(et).reverse().find((function (t) {
            return !["closing", "customClosing", "destroy"].includes(t.state) && t
          })) || null
        }
      }, {
        key: "close",
        value: function () {
          for (var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], e = null; e = i.getInstance();)
            if (e.close(), !t) return
        }
      }]), i
    }(A);
  nt.version = "4.0.9", nt.defaults = tt, nt.openers = new Map, nt.Plugins = Q, nt.bind("[data-fancybox]");
  for (var ot = 0, at = Object.entries(nt.Plugins || {}); ot < at.length; ot++) {
    var st = v(at[ot], 2);
    st[0];
    var rt = st[1];
    "function" == typeof rt.create && rt.create(nt)
  }
  t.Carousel = D, t.Fancybox = nt, t.Panzoom = z
}));

'use strict'

$(".hotels-datepicker:not(.hotels-datepicker--tour)").datepicker({
  dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
  dayNamesMin: ["Вск", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  dayNamesShort: ["Вск", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
  numberOfMonths: 2,
  prevText: '',
  nextText: '',
  showOtherMonths: true,
  minDate: 0,
  // maxDate: 30,
  firstDay: 1,
  dateFormat: "D, dd.mm",
  onSelect: function (dateText, inst) {
    console.log(inst.currentDay);
    console.log(inst.currentMonth);
    console.log(inst.currentYear);
  },
  beforeShow(input, obj) {
    if (input.closest('.hotels-search--side')) {
      document.querySelector('#ui-datepicker-div').classList.add('hotels-calendar', 'hotels-calendar--aside');
    } else if (input.closest('#edit-date')) {
      document.querySelector('#ui-datepicker-div').classList.add('hotels-calendar', 'hotels-calendar--fancybox');
    } else {
      document.querySelector('#ui-datepicker-div').classList.add('hotels-calendar');
    }
    obj.dpDiv[0].style.marginTop = input.offsetTop + input.offsetHeight + 5 + 'px'
    obj.dpDiv[0].dataset.title = input.dataset.title

    $.datepicker.formatDate('D, dd.mm', $(this).datepicker('getDate'))
  }
});

// $(".hotels-datepicker").datepicker({
//     numberOfMonths: 2,
//     prevText: '',
//     nextText: '',
//     showOtherMonths: true,
//     regional: "ru",
//     // minDate: 7,
//     // maxDate: 21,
//     firstDay: 1,
//     dateFormat: "dd.mm.yy",
//     beforeShow(input, obj) {
//         if (input.closest('.hotels-search--side')) {
//             document.querySelector('#ui-datepicker-div').classList.add('hotels-calendar', 'hotels-calendar--aside');
//         } else if (input.closest('#edit-date')) {
//             document.querySelector('#ui-datepicker-div').classList.add('hotels-calendar', 'hotels-calendar--fancybox');
//         } else {
//             document.querySelector('#ui-datepicker-div').classList.add('hotels-calendar');
//         }
//         obj.dpDiv[0].style.marginTop = input.offsetTop + input.offsetHeight + 5 + 'px'
//         obj.dpDiv[0].dataset.title = input.dataset.title
//     },
// });


/* Russian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Andrew Stromnov (stromnov@gmail.com). */
// (function (factory) {
//     "use strict";
//
//     if (typeof define === "function" && define.amd) {
//
//         // AMD. Register as an anonymous module.
//         define(["../widgets/datepicker"], factory);
//     } else {
//
//         // Browser globals
//         factory(jQuery.datepicker);
//     }
// })(function (datepicker) {
//     "use strict";
//
//     datepicker.regional.ru = {
//         closeText: "Закрыть",
//         prevText: "&#x3C;Пред",
//         nextText: "След&#x3E;",
//         currentText: "Сегодня",
//         monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
//             "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
//         monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн",
//             "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
//         dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
//         dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
//         dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
//         weekHeader: "Нед",
//         dateFormat: "dd.mm.yy",
//         firstDay: 1,
//         isRTL: false,
//         showMonthAfterYear: false,
//         yearSuffix: ""
//     };
//     datepicker.setDefaults(datepicker.regional.ru);
//
//     return datepicker.regional.ru;
//
// });


$('.hotels-search__child svg').on('click', function (e) {
  setTimeout(() => $(this).closest('.hotels-search__child').remove(), 1)
});

document.addEventListener('click', function (e) {

  if (e.target.closest('.dropdown__btn')) {
    e.preventDefault();

    let dropdown = e.target.closest('.dropdown');

    if (dropdown.classList.contains('open')) {
      dropdown.classList.remove('open')
    } else {
      document.querySelectorAll('.dropdown').forEach(el => {
        el.classList.remove('open')
      });
      dropdown.classList.add('open')

      return
    }
  } else if (e.target.closest('.dropdown')) {
    return
  } else {
    document.querySelectorAll('.dropdown').forEach(el => {
      el.classList.remove('open')
    });
  }
})

function initAllData() {


  let swiperBreakPoints = {
    0: {
      spaceBetween: 0,
      slidesPerView: 1
    },
    500: {
      spaceBetween: 8,
      slidesPerView: 2
    },
    992: {
      spaceBetween: 16,
      slidesPerView: 3,
    },
    1200: {
      spaceBetween: 45,
    }
  }

  let swiper = new Swiper('.swiper-hotels-dir', {
    loop: true,
    slidesPerView: 3,
    touch: false,
    breakpoints: swiperBreakPoints,
  });


  let swiperComments = new Swiper('.swiper-hotels-comments', {
    loop: true,
    slidesPerView: 3,
    breakpoints: swiperBreakPoints
  });


  let swiperCard = new Swiper('.swiper-hotels-card', {
    loop: true,
    slidesPerView: 1,
  });


  let swiperHotelPageThumbs = new Swiper('.swiper-hotel-page-thumbs', {
    breakpoints: {
      0: {
        slidesPerView: 7,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 9,
        spaceBetween: 10,
      }
    }
  });

  let swiperHotelPage = new Swiper('.swiper-hotel-page', {
    slidesPerView: 'auto',
    thumbs: {
      swiper: swiperHotelPageThumbs,
    },
    breakpoints: {
      0: {
        spaceBetween: 9,
      },
      500: {
        spaceBetween: 17,
      },
      1200: {
        spaceBetween: 20,
      }
    }
  });


  let swiperCheap = new Swiper('.swiper-hotels-cheap', {
    loop: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      500: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 10,
      }
    }
  });


  let swiperPhotos = new Swiper('.swiper-hotels-photos', {
    loop: true,
    breakpoints: {
      0: {
        spaceBetween: 9,
        slidesPerView: 'auto',
      },
      700: {
        slidesPerView: 2,
        paceBetween: 16,
      },
      992: {
        spaceBetween: 16,
        slidesPerView: 2,
      },
      1200: {
        spaceBetween: 44,
        slidesPerView: 2,
      }
    }
  });

  let swiperNav = document.querySelectorAll('.swiper-nav-wrapper')

  if (swiperNav) {
    swiperNav.forEach((el, index) => {
      el.addEventListener('click', function (e) {
        const btn = e.target.closest('.swiper-custom-btn')
        if (btn) {
          sliderObj = eval(el.dataset.swiperCustomNav);

          if (sliderObj.length) {
            if (btn.classList.contains('swiper-custom-btn--prev')) {
              sliderObj[index].slidePrev()
            } else {
              sliderObj[index].slideNext()
            }
          } else {
            if (btn.classList.contains('swiper-custom-btn--prev')) {
              sliderObj.slidePrev()
            } else {
              sliderObj.slideNext()
            }
          }
        }
      })
    });
  }


  // Ввод количества
  document.querySelectorAll('.input-number input').forEach(el => {
    if (el.value == '1') {
      el.previousElementSibling.classList.add('dis')
    }
  });


  // collapse
  //     document.querySelectorAll('.collapse__btn').forEach(element => {
  //         element.addEventListener('click', function (e) {
  //             e.preventDefault();
  //
  //             let el = this.closest('.collapse'), elContent = el.querySelector('.collapse__content');
  //
  //             if (el.dataset.accordion) {
  //                 accordion = document.querySelectorAll(`[data-accordion=${el.dataset.accordion}]`)
  //             }
  //
  //             if (el.classList.contains('open')) {
  //                 el.classList.remove('open');
  //                 elContent.style.maxHeight = 0
  //             } else {
  //                 if (el.dataset.accordion) {
  //                     accordion.forEach(element => {
  //                         element.classList.remove('open');
  //                         element.querySelector('.collapse__content').style.maxHeight = 0;
  //                     });
  //                 }
  //                 el.classList.add('open');
  //                 elContent.style.maxHeight = elContent.scrollHeight + 'px'
  //
  //                 let $elParent = el.closest('.collapse__content')
  //
  //                 if ($elParent) {
  //                     $elParent.style.maxHeight = $elParent.scrollHeight + elContent.scrollHeight + 'px'
  //                 }
  //             }
  //         })
  //     });


  document.addEventListener('click', function (e) {
    const $addActive = e.target.closest('.add-active');

    if ($addActive) {
      const $addActiveItem = e.target.closest('.add-active__item');

      if ($addActiveItem && !$addActiveItem.classList.contains('active')) {
        $addActive.querySelectorAll('.add-active__item').forEach(el => {
          el.classList.remove('active')
        });

        $addActiveItem.classList.add('active')
      }

      if ($addActiveItem && $addActive.classList.contains('dropdown')) {
        $addActive.classList.remove('open')

        $addActive.querySelector('.add-active__selected').innerHTML = $addActiveItem.innerHTML
      }
    }
  });

  document.addEventListener('click', function (e) {
    const $addActiveRating = e.target.closest('.hotels-rating');
    if ($addActiveRating) {
      const $addActiveRatingItem = e.target.closest('.add-active__item');
      if ($addActiveRatingItem) {
        document.querySelector('#rating').value = $addActiveRatingItem.dataset.rating;
      }
      console.log($addActiveRatingItem.dataset.rating);
    }
  });

  const observer = lozad();
  observer.observe();
}

initAllData();

document.addEventListener('click', e => {
  if (e.target.closest('.collapse__btn') || e.target.classList.contains('collapse__btn')) {
    e.preventDefault();

    let el = e.target.closest('.collapse'),
      elContent = el.querySelector('.collapse__content');

    if (el.dataset.accordion) {
      accordion = document.querySelectorAll(`[data-accordion=${el.dataset.accordion}]`)
    }

    if (el.classList.contains('open')) {
      el.classList.remove('open');
      elContent.style.maxHeight = 0;
    } else {
      if (el.dataset.accordion) {
        accordion.forEach(element => {
          element.classList.remove('open');
          element.querySelector('.collapse__content').style.maxHeight = 0;
        });
      }
      el.classList.add('open');
      elContent.style.maxHeight = elContent.scrollHeight + 'px'

      let $elParent = el.closest('.collapse__content')

      if ($elParent) {
        $elParent.style.maxHeight = $elParent.scrollHeight + elContent.scrollHeight + 'px'
      }
    }
  }
});

Fancybox.bind("[data-fancybox]", {
  autoFocus: false,
  trapFocus: false,
  dragToClose: false,
  template: {
    closeButton: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 2L18 0L10 8L2 0L0 2L8 10L0 18L2 20L10 12L18 20L20 18L12 10L20 2Z" fill="black"/></svg>',
  },

  on: {
    closing: (fancybox, slide) => {
      $(".hotels-datepicker").datepicker("hide");
    },
  },
});


document.addEventListener('click', function (e) {
  if (e.target.closest('#edit-date') && !e.target.closest('.hotels-datepicker')) {
    $(".hotels-datepicker").datepicker("hide");
  }
})


const $searchShow = document.querySelector('.header__search-show'),
  $header = document.querySelector('.header');

if ($searchShow) {
  $searchShow.addEventListener('click', function () {
    $header.classList.add('header__search-shown')
  })
}

document.addEventListener('click', function (e) {
  if (!e.target.closest('.header__search') && !e.target.closest('.header__search-show') && $header.classList.contains('header__search-shown')) {
    $header.classList.remove('header__search-shown')
  }
})


const $hotelsFilterShow = document.querySelector('.hotels-filter__show')

if ($hotelsFilterShow) {
  $hotelsFilterShow.addEventListener('click', function () {
    document.body.classList.add('hotels-filter__show-shown')
  })

  document.addEventListener('click', function (e) {
    if (document.documentElement.clientWidth < 992) {
      if (
        (e.target.closest('.hotels-filter') && e.target.closest('.hotels-filter__close')) ||
        !(e.target.closest('.hotels-filter__show') || e.target.closest('.hotels-filter'))
      ) {
        document.body.classList.remove('hotels-filter__show-shown')
      }
    }
  })
}


const hotelPageMenu = document.querySelector('.hotel-menu');

if (hotelPageMenu) {
  let hotelPageMenuLinks = document.querySelectorAll('.hotel-menu a');
  let hotelPageHeadersPos;
  let hotelPageMenuHeight = hotelPageMenu.offsetHeight;

  hotelPageFindHeaders()

  window.addEventListener('resize', function () {
    hotelPageFindHeaders();
    hotelPageMenuHeight = hotelPageMenu.offsetHeight;
  })

  document.addEventListener('scroll', function () {
    hotelPageHeadersPos.forEach(function (val, index, arr) {
      if (Math.floor(val) <= document.documentElement.scrollTop + hotelPageMenuHeight && document.documentElement.scrollTop + hotelPageMenuHeight <= (arr[index + 1] || val)) {
        hotelPageMenuLinks.forEach(element => {
          element.classList.remove('active')
        });
        hotelPageMenuLinks[index].classList.add('active')
      }

      // console.log(val, document.documentElement.scrollTop + hotelPageMenuHeight, (arr[index + 1] || val))
    })
    if (document.documentElement.scrollTop > hotelPageHeadersPos[hotelPageHeadersPos.length - 1] - hotelPageMenuHeight) {
      hotelPageMenuLinks.forEach(element => {
        element.classList.remove('active')
      });
      hotelPageMenuLinks[hotelPageMenuLinks.length - 1].classList.add('active')
    }
    if (document.documentElement.scrollTop + hotelPageMenuHeight + 1 < hotelPageHeadersPos[0]) {
      hotelPageMenuLinks.forEach(element => {
        element.classList.remove('active')
      });
    }
  })


  function hotelPageFindHeaders() {
    hotelPageHeadersPos = [].map.call(hotelPageMenuLinks, function (el) {
      return $(el.getAttribute("href")).offset().top
    })
  }
}


// операциии с window
const $up = document.querySelector('.hotels-up')

if ($up) {
  document.addEventListener('scroll', function () {
    if (window.pageYOffset > document.documentElement.clientHeight) {
      $up.classList.add('show')
    } else {
      $up.classList.remove('show')
    }
  })
}


const elementSlideDown = (element, time = 300, defaultDisplayType = 'block') => {
  return new Promise(resolve => {
    element.style.height = '0px';
    element.style.overflow = 'hidden';
    element.style.transition = 'all ' + time + 'ms';
    element.style.display = defaultDisplayType;
    element.style.paddingTop = '0px';
    element.style.paddingBottom = '0px';
    element.style.marginTop = '0px';
    element.style.marginBottom = '0px';
    setTimeout(() => {
      element.style.paddingTop = null;
      element.style.paddingBottom = null;
      element.style.marginTop = null;
      element.style.marginBottom = null;
      element.style.height = element.scrollHeight + 'px';
    }, 50);
    setTimeout(() => {
      element.style.overflow = null;
      element.style.transition = null;
      element.style.height = null;
      element.style.display = defaultDisplayType;
      resolve(element);
    }, time);
  });
};

const elementSlideUp = (element, time = 300) => {
  return new Promise(resolve => {
    element.style.height = element.scrollHeight + 'px';
    element.style.overflow = 'hidden';
    element.style.paddingTop = '0px';
    element.style.marginTop = '0px';
    element.style.paddingBottom = '0px';
    element.style.marginBottom = '0px';
    element.style.transition = 'all ' + time + 'ms';
    setTimeout(() => {
      element.style.height = '0px';
    }, 50);
    setTimeout(() => {
      element.style.overflow = null;
      element.style.transition = null;
      element.style.paddingTop = null;
      element.style.marginTop = null;
      element.style.paddingBottom = null;
      element.style.marginBottom = null;
      element.style.height = null;
      element.style.display = 'none';
      resolve(element);
    }, time);
  });
};


const viewQuestion = () => {
  const itemQuestion = document.querySelectorAll('.questions__item')
  const btnQuestion = document.querySelectorAll('.questions__item-btn');
  const textQuestion = document.querySelectorAll('.questions__item-text');

  itemQuestion.forEach((item, i) => {
    item.addEventListener('click', function () {
      if (this.classList.contains('questions__item-btn--open')) {
        this.classList.remove('questions__item-btn--open');
        btnQuestion[i].classList.remove('questions__item-btn--open');
        textQuestion[i].classList.remove('questions__item-text--open');
      } else {
        itemQuestion.forEach((item, i) => {
          btnQuestion[i].classList.remove('questions__item-btn--open')
          item.classList.remove('questions__item-btn--open');
          textQuestion[i].classList.remove('questions__item-text--open');
        });
        btnQuestion[i].classList.add('questions__item-btn--open')
        this.classList.add('questions__item-btn--open');
        textQuestion[i].classList.add('questions__item-text--open');
      }
    });
  });

  // itemQuestion.forEach((item, i) => {
  //   item.onclick = function () {
  //     btnQuestion[i].classList.toggle('questions__item-btn--open')
  //     textQuestion[i].classList.toggle('questions__item-text--open');
  //   }
  // });
}
viewQuestion()


const modalVisible = () => {
  if (document.querySelector('.hotel-price-item')) {
    const hotelModal = document.querySelector('.hotel-price__modal');
    let bigImgSrc = document.querySelector('.hotel-price__modal-big').attributes.src;
    const smallItem = document.querySelectorAll('.hotel-price__modal-small-item');


    let hotelPrice = document.querySelectorAll('.hotel-price-item');
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('hotel-price-item__av') || e.target.classList.contains('hotel-price-item__cost') || e.target.classList.contains('hotel-price-item__name') || e.target.classList.contains('hotel-price-item')) {
        hotelModal.classList.add('hotel-price__modal--active');
      }
    })

    smallItem.forEach((item) => {
      item.addEventListener('click', () => {
        bigImgSrc.nodeValue = item.children[0].attributes.src.value;

        if (item.classList.contains('hotel-price__modal-small-item--active')) {} else {
          const smallItem = document.querySelectorAll('.hotel-price__modal-small-item');
          smallItem.forEach((elem) => {
            elem.classList.remove('hotel-price__modal-small-item--active')
          })
          item.classList.add('hotel-price__modal-small-item--active');
        }
      });
    })
  }
}
modalVisible()

const closeModal = () => {
  if (document.querySelector('.hotel-price__modal')) {
    const hotelModal = document.querySelector('.hotel-price__modal');
    const closeBtn = document.querySelector('.hotel-price__modal-close');
    closeBtn.addEventListener('click', () => {
      hotelModal.classList.remove('hotel-price__modal--active')
    })
  }
}
closeModal()

$(function () {
  console.log('jquery')
})

//