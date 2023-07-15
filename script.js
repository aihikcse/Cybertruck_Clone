(() => {
  var u = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
  var ms = u(() => {
    (function () {
      if (typeof window > "u") return;
      let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        t = e ? parseInt(e[1], 10) >= 16 : !1;
      if ("objectFit" in document.documentElement.style && !t) {
        window.objectFitPolyfill = function () {
          return !1;
        };
        return;
      }
      let n = function (s) {
          let c = window.getComputedStyle(s, null),
            f = c.getPropertyValue("position"),
            E = c.getPropertyValue("overflow"),
            h = c.getPropertyValue("display");
          (!f || f === "static") && (s.style.position = "relative"),
            E !== "hidden" && (s.style.overflow = "hidden"),
            (!h || h === "inline") && (s.style.display = "block"),
            s.clientHeight === 0 && (s.style.height = "100%"),
            s.className.indexOf("object-fit-polyfill") === -1 &&
              (s.className += " object-fit-polyfill");
        },
        i = function (s) {
          let c = window.getComputedStyle(s, null),
            f = {
              "max-width": "none",
              "max-height": "none",
              "min-width": "0px",
              "min-height": "0px",
              top: "auto",
              right: "auto",
              bottom: "auto",
              left: "auto",
              "margin-top": "0px",
              "margin-right": "0px",
              "margin-bottom": "0px",
              "margin-left": "0px",
            };
          for (let E in f)
            c.getPropertyValue(E) !== f[E] && (s.style[E] = f[E]);
        },
        o = function (s) {
          let c = s.parentNode;
          n(c),
            i(s),
            (s.style.position = "absolute"),
            (s.style.height = "100%"),
            (s.style.width = "auto"),
            s.clientWidth > c.clientWidth
              ? ((s.style.top = "0"),
                (s.style.marginTop = "0"),
                (s.style.left = "50%"),
                (s.style.marginLeft = s.clientWidth / -2 + "px"))
              : ((s.style.width = "100%"),
                (s.style.height = "auto"),
                (s.style.left = "0"),
                (s.style.marginLeft = "0"),
                (s.style.top = "50%"),
                (s.style.marginTop = s.clientHeight / -2 + "px"));
        },
        a = function (s) {
          if (typeof s > "u" || s instanceof Event)
            s = document.querySelectorAll("[data-object-fit]");
          else if (s && s.nodeName) s = [s];
          else if (typeof s == "object" && s.length && s[0].nodeName) s = s;
          else return !1;
          for (let c = 0; c < s.length; c++) {
            if (!s[c].nodeName) continue;
            let f = s[c].nodeName.toLowerCase();
            if (f === "img") {
              if (t) continue;
              s[c].complete
                ? o(s[c])
                : s[c].addEventListener("load", function () {
                    o(this);
                  });
            } else
              f === "video"
                ? s[c].readyState > 0
                  ? o(s[c])
                  : s[c].addEventListener("loadedmetadata", function () {
                      o(this);
                    })
                : o(s[c]);
          }
          return !0;
        };
      document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", a)
        : a(),
        window.addEventListener("resize", a),
        (window.objectFitPolyfill = a);
    })();
  });
  var Is = u(() => {
    (function () {
      if (typeof window > "u") return;
      function e(n) {
        Webflow.env("design") ||
          ($("video").each(function () {
            n && $(this).prop("autoplay") ? this.play() : this.pause();
          }),
          $(".w-background-video--control").each(function () {
            n ? r($(this)) : t($(this));
          }));
      }
      function t(n) {
        n.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 0);
        });
      }
      function r(n) {
        n.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 1);
        });
      }
      $(document).ready(() => {
        let n = window.matchMedia("(prefers-reduced-motion: reduce)");
        n.addEventListener("change", (i) => {
          e(!i.matches);
        }),
          n.matches && e(!1),
          $("video:not([autoplay])").each(function () {
            $(this)
              .parent()
              .find(".w-background-video--control")
              .each(function () {
                t($(this));
              });
          }),
          $(document).on("click", ".w-background-video--control", function (i) {
            if (Webflow.env("design")) return;
            let o = $(i.currentTarget),
              a = $(`video#${o.attr("aria-controls")}`).get(0);
            if (a)
              if (a.paused) {
                let s = a.play();
                r(o),
                  s &&
                    typeof s.catch == "function" &&
                    s.catch(() => {
                      t(o);
                    });
              } else a.pause(), t(o);
          });
      });
    })();
  });
  var Gi = u(() => {
    window.tram = (function (e) {
      function t(l, g) {
        var I = new X.Bare();
        return I.init(l, g);
      }
      function r(l) {
        return l.replace(/[A-Z]/g, function (g) {
          return "-" + g.toLowerCase();
        });
      }
      function n(l) {
        var g = parseInt(l.slice(1), 16),
          I = (g >> 16) & 255,
          b = (g >> 8) & 255,
          L = 255 & g;
        return [I, b, L];
      }
      function i(l, g, I) {
        return (
          "#" + ((1 << 24) | (l << 16) | (g << 8) | I).toString(16).slice(1)
        );
      }
      function o() {}
      function a(l, g) {
        f("Type warning: Expected: [" + l + "] Got: [" + typeof g + "] " + g);
      }
      function s(l, g, I) {
        f("Units do not match [" + l + "]: " + g + ", " + I);
      }
      function c(l, g, I) {
        if ((g !== void 0 && (I = g), l === void 0)) return I;
        var b = I;
        return (
          ze.test(l) || !gt.test(l)
            ? (b = parseInt(l, 10))
            : gt.test(l) && (b = 1e3 * parseFloat(l)),
          0 > b && (b = 0),
          b === b ? b : I
        );
      }
      function f(l) {
        le.debug && window && window.console.warn(l);
      }
      function E(l) {
        for (var g = -1, I = l ? l.length : 0, b = []; ++g < I; ) {
          var L = l[g];
          L && b.push(L);
        }
        return b;
      }
      var h = (function (l, g, I) {
          function b(re) {
            return typeof re == "object";
          }
          function L(re) {
            return typeof re == "function";
          }
          function P() {}
          function Z(re, _e) {
            function H() {
              var Me = new ae();
              return L(Me.init) && Me.init.apply(Me, arguments), Me;
            }
            function ae() {}
            _e === I && ((_e = re), (re = Object)), (H.Bare = ae);
            var ue,
              be = (P[l] = re[l]),
              ot = (ae[l] = H[l] = new P());
            return (
              (ot.constructor = H),
              (H.mixin = function (Me) {
                return (ae[l] = H[l] = Z(H, Me)[l]), H;
              }),
              (H.open = function (Me) {
                if (
                  ((ue = {}),
                  L(Me) ? (ue = Me.call(H, ot, be, H, re)) : b(Me) && (ue = Me),
                  b(ue))
                )
                  for (var Sr in ue) g.call(ue, Sr) && (ot[Sr] = ue[Sr]);
                return L(ot.init) || (ot.init = re), H;
              }),
              H.open(_e)
            );
          }
          return Z;
        })("prototype", {}.hasOwnProperty),
        _ = {
          ease: [
            "ease",
            function (l, g, I, b) {
              var L = (l /= b) * l,
                P = L * l;
              return (
                g +
                I * (-2.75 * P * L + 11 * L * L + -15.5 * P + 8 * L + 0.25 * l)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (l, g, I, b) {
              var L = (l /= b) * l,
                P = L * l;
              return g + I * (-1 * P * L + 3 * L * L + -3 * P + 2 * L);
            },
          ],
          "ease-out": [
            "ease-out",
            function (l, g, I, b) {
              var L = (l /= b) * l,
                P = L * l;
              return (
                g +
                I * (0.3 * P * L + -1.6 * L * L + 2.2 * P + -1.8 * L + 1.9 * l)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (l, g, I, b) {
              var L = (l /= b) * l,
                P = L * l;
              return g + I * (2 * P * L + -5 * L * L + 2 * P + 2 * L);
            },
          ],
          linear: [
            "linear",
            function (l, g, I, b) {
              return (I * l) / b + g;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (l, g, I, b) {
              return I * (l /= b) * l + g;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (l, g, I, b) {
              return -I * (l /= b) * (l - 2) + g;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (l, g, I, b) {
              return (l /= b / 2) < 1
                ? (I / 2) * l * l + g
                : (-I / 2) * (--l * (l - 2) - 1) + g;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (l, g, I, b) {
              return I * (l /= b) * l * l + g;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (l, g, I, b) {
              return I * ((l = l / b - 1) * l * l + 1) + g;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (l, g, I, b) {
              return (l /= b / 2) < 1
                ? (I / 2) * l * l * l + g
                : (I / 2) * ((l -= 2) * l * l + 2) + g;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (l, g, I, b) {
              return I * (l /= b) * l * l * l + g;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (l, g, I, b) {
              return -I * ((l = l / b - 1) * l * l * l - 1) + g;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (l, g, I, b) {
              return (l /= b / 2) < 1
                ? (I / 2) * l * l * l * l + g
                : (-I / 2) * ((l -= 2) * l * l * l - 2) + g;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (l, g, I, b) {
              return I * (l /= b) * l * l * l * l + g;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (l, g, I, b) {
              return I * ((l = l / b - 1) * l * l * l * l + 1) + g;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (l, g, I, b) {
              return (l /= b / 2) < 1
                ? (I / 2) * l * l * l * l * l + g
                : (I / 2) * ((l -= 2) * l * l * l * l + 2) + g;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (l, g, I, b) {
              return -I * Math.cos((l / b) * (Math.PI / 2)) + I + g;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (l, g, I, b) {
              return I * Math.sin((l / b) * (Math.PI / 2)) + g;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (l, g, I, b) {
              return (-I / 2) * (Math.cos((Math.PI * l) / b) - 1) + g;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (l, g, I, b) {
              return l === 0 ? g : I * Math.pow(2, 10 * (l / b - 1)) + g;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (l, g, I, b) {
              return l === b
                ? g + I
                : I * (-Math.pow(2, (-10 * l) / b) + 1) + g;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (l, g, I, b) {
              return l === 0
                ? g
                : l === b
                ? g + I
                : (l /= b / 2) < 1
                ? (I / 2) * Math.pow(2, 10 * (l - 1)) + g
                : (I / 2) * (-Math.pow(2, -10 * --l) + 2) + g;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (l, g, I, b) {
              return -I * (Math.sqrt(1 - (l /= b) * l) - 1) + g;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (l, g, I, b) {
              return I * Math.sqrt(1 - (l = l / b - 1) * l) + g;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (l, g, I, b) {
              return (l /= b / 2) < 1
                ? (-I / 2) * (Math.sqrt(1 - l * l) - 1) + g
                : (I / 2) * (Math.sqrt(1 - (l -= 2) * l) + 1) + g;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (l, g, I, b, L) {
              return (
                L === void 0 && (L = 1.70158),
                I * (l /= b) * l * ((L + 1) * l - L) + g
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (l, g, I, b, L) {
              return (
                L === void 0 && (L = 1.70158),
                I * ((l = l / b - 1) * l * ((L + 1) * l + L) + 1) + g
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (l, g, I, b, L) {
              return (
                L === void 0 && (L = 1.70158),
                (l /= b / 2) < 1
                  ? (I / 2) * l * l * (((L *= 1.525) + 1) * l - L) + g
                  : (I / 2) *
                      ((l -= 2) * l * (((L *= 1.525) + 1) * l + L) + 2) +
                    g
              );
            },
          ],
        },
        y = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        A = document,
        O = window,
        G = "bkwld-tram",
        S = /[\-\.0-9]/g,
        N = /[A-Z]/,
        T = "number",
        D = /^(rgb|#)/,
        q = /(em|cm|mm|in|pt|pc|px)$/,
        M = /(em|cm|mm|in|pt|pc|px|%)$/,
        U = /(deg|rad|turn)$/,
        j = "unitless",
        K = /(all|none) 0s ease 0s/,
        te = /^(width|height)$/,
        W = " ",
        C = A.createElement("a"),
        d = ["Webkit", "Moz", "O", "ms"],
        F = ["-webkit-", "-moz-", "-o-", "-ms-"],
        w = function (l) {
          if (l in C.style) return { dom: l, css: l };
          var g,
            I,
            b = "",
            L = l.split("-");
          for (g = 0; g < L.length; g++)
            b += L[g].charAt(0).toUpperCase() + L[g].slice(1);
          for (g = 0; g < d.length; g++)
            if (((I = d[g] + b), I in C.style))
              return { dom: I, css: F[g] + l };
        },
        V = (t.support = {
          bind: Function.prototype.bind,
          transform: w("transform"),
          transition: w("transition"),
          backface: w("backface-visibility"),
          timing: w("transition-timing-function"),
        });
      if (V.transition) {
        var z = V.timing.dom;
        if (((C.style[z] = _["ease-in-back"][0]), !C.style[z]))
          for (var Q in y) _[Q][0] = y[Q];
      }
      var ce = (t.frame = (function () {
          var l =
            O.requestAnimationFrame ||
            O.webkitRequestAnimationFrame ||
            O.mozRequestAnimationFrame ||
            O.oRequestAnimationFrame ||
            O.msRequestAnimationFrame;
          return l && V.bind
            ? l.bind(O)
            : function (g) {
                O.setTimeout(g, 16);
              };
        })()),
        ge = (t.now = (function () {
          var l = O.performance,
            g = l && (l.now || l.webkitNow || l.msNow || l.mozNow);
          return g && V.bind
            ? g.bind(l)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        v = h(function (l) {
          function g(J, fe) {
            var me = E(("" + J).split(W)),
              pe = me[0];
            fe = fe || {};
            var Fe = k[pe];
            if (!Fe) return f("Unsupported property: " + pe);
            if (!fe.weak || !this.props[pe]) {
              var Qe = Fe[0],
                We = this.props[pe];
              return (
                We || (We = this.props[pe] = new Qe.Bare()),
                We.init(this.$el, me, Fe, fe),
                We
              );
            }
          }
          function I(J, fe, me) {
            if (J) {
              var pe = typeof J;
              if (
                (fe ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                pe == "number" && fe)
              )
                return (
                  (this.timer = new De({
                    duration: J,
                    context: this,
                    complete: P,
                  })),
                  void (this.active = !0)
                );
              if (pe == "string" && fe) {
                switch (J) {
                  case "hide":
                    H.call(this);
                    break;
                  case "stop":
                    Z.call(this);
                    break;
                  case "redraw":
                    ae.call(this);
                    break;
                  default:
                    g.call(this, J, me && me[1]);
                }
                return P.call(this);
              }
              if (pe == "function") return void J.call(this, this);
              if (pe == "object") {
                var Fe = 0;
                ot.call(
                  this,
                  J,
                  function (Ae, pm) {
                    Ae.span > Fe && (Fe = Ae.span), Ae.stop(), Ae.animate(pm);
                  },
                  function (Ae) {
                    "wait" in Ae && (Fe = c(Ae.wait, 0));
                  }
                ),
                  be.call(this),
                  Fe > 0 &&
                    ((this.timer = new De({ duration: Fe, context: this })),
                    (this.active = !0),
                    fe && (this.timer.complete = P));
                var Qe = this,
                  We = !1,
                  fn = {};
                ce(function () {
                  ot.call(Qe, J, function (Ae) {
                    Ae.active && ((We = !0), (fn[Ae.name] = Ae.nextStyle));
                  }),
                    We && Qe.$el.css(fn);
                });
              }
            }
          }
          function b(J) {
            (J = c(J, 0)),
              this.active
                ? this.queue.push({ options: J })
                : ((this.timer = new De({
                    duration: J,
                    context: this,
                    complete: P,
                  })),
                  (this.active = !0));
          }
          function L(J) {
            return this.active
              ? (this.queue.push({ options: J, args: arguments }),
                void (this.timer.complete = P))
              : f(
                  "No active transition timer. Use start() or wait() before then()."
                );
          }
          function P() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var J = this.queue.shift();
              I.call(this, J.options, !0, J.args);
            }
          }
          function Z(J) {
            this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1);
            var fe;
            typeof J == "string"
              ? ((fe = {}), (fe[J] = 1))
              : (fe = typeof J == "object" && J != null ? J : this.props),
              ot.call(this, fe, Me),
              be.call(this);
          }
          function re(J) {
            Z.call(this, J), ot.call(this, J, Sr, fm);
          }
          function _e(J) {
            typeof J != "string" && (J = "block"), (this.el.style.display = J);
          }
          function H() {
            Z.call(this), (this.el.style.display = "none");
          }
          function ae() {
            this.el.offsetHeight;
          }
          function ue() {
            Z.call(this), e.removeData(this.el, G), (this.$el = this.el = null);
          }
          function be() {
            var J,
              fe,
              me = [];
            this.upstream && me.push(this.upstream);
            for (J in this.props)
              (fe = this.props[J]), fe.active && me.push(fe.string);
            (me = me.join(",")),
              this.style !== me &&
                ((this.style = me), (this.el.style[V.transition.dom] = me));
          }
          function ot(J, fe, me) {
            var pe,
              Fe,
              Qe,
              We,
              fn = fe !== Me,
              Ae = {};
            for (pe in J)
              (Qe = J[pe]),
                pe in de
                  ? (Ae.transform || (Ae.transform = {}),
                    (Ae.transform[pe] = Qe))
                  : (N.test(pe) && (pe = r(pe)),
                    pe in k ? (Ae[pe] = Qe) : (We || (We = {}), (We[pe] = Qe)));
            for (pe in Ae) {
              if (((Qe = Ae[pe]), (Fe = this.props[pe]), !Fe)) {
                if (!fn) continue;
                Fe = g.call(this, pe);
              }
              fe.call(this, Fe, Qe);
            }
            me && We && me.call(this, We);
          }
          function Me(J) {
            J.stop();
          }
          function Sr(J, fe) {
            J.set(fe);
          }
          function fm(J) {
            this.$el.css(J);
          }
          function Ye(J, fe) {
            l[J] = function () {
              return this.children
                ? dm.call(this, fe, arguments)
                : (this.el && fe.apply(this, arguments), this);
            };
          }
          function dm(J, fe) {
            var me,
              pe = this.children.length;
            for (me = 0; pe > me; me++) J.apply(this.children[me], fe);
            return this;
          }
          (l.init = function (J) {
            if (
              ((this.$el = e(J)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              le.keepInherited && !le.fallback)
            ) {
              var fe = B(this.el, "transition");
              fe && !K.test(fe) && (this.upstream = fe);
            }
            V.backface &&
              le.hideBackface &&
              p(this.el, V.backface.css, "hidden");
          }),
            Ye("add", g),
            Ye("start", I),
            Ye("wait", b),
            Ye("then", L),
            Ye("next", P),
            Ye("stop", Z),
            Ye("set", re),
            Ye("show", _e),
            Ye("hide", H),
            Ye("redraw", ae),
            Ye("destroy", ue);
        }),
        X = h(v, function (l) {
          function g(I, b) {
            var L = e.data(I, G) || e.data(I, G, new v.Bare());
            return L.el || L.init(I), b ? L.start(b) : L;
          }
          l.init = function (I, b) {
            var L = e(I);
            if (!L.length) return this;
            if (L.length === 1) return g(L[0], b);
            var P = [];
            return (
              L.each(function (Z, re) {
                P.push(g(re, b));
              }),
              (this.children = P),
              this
            );
          };
        }),
        R = h(function (l) {
          function g() {
            var P = this.get();
            this.update("auto");
            var Z = this.get();
            return this.update(P), Z;
          }
          function I(P, Z, re) {
            return Z !== void 0 && (re = Z), P in _ ? P : re;
          }
          function b(P) {
            var Z = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(P);
            return (Z ? i(Z[1], Z[2], Z[3]) : P).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3"
            );
          }
          var L = { duration: 500, ease: "ease", delay: 0 };
          (l.init = function (P, Z, re, _e) {
            (this.$el = P), (this.el = P[0]);
            var H = Z[0];
            re[2] && (H = re[2]),
              Y[H] && (H = Y[H]),
              (this.name = H),
              (this.type = re[1]),
              (this.duration = c(Z[1], this.duration, L.duration)),
              (this.ease = I(Z[2], this.ease, L.ease)),
              (this.delay = c(Z[3], this.delay, L.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = te.test(this.name)),
              (this.unit = _e.unit || this.unit || le.defaultUnit),
              (this.angle = _e.angle || this.angle || le.defaultAngle),
              le.fallback || _e.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    W +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? W + _[this.ease][0] : "") +
                    (this.delay ? W + this.delay + "ms" : "")));
          }),
            (l.set = function (P) {
              (P = this.convert(P, this.type)), this.update(P), this.redraw();
            }),
            (l.transition = function (P) {
              (this.active = !0),
                (P = this.convert(P, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  P == "auto" && (P = g.call(this))),
                (this.nextStyle = P);
            }),
            (l.fallback = function (P) {
              var Z =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              (P = this.convert(P, this.type)),
                this.auto &&
                  (Z == "auto" && (Z = this.convert(this.get(), this.type)),
                  P == "auto" && (P = g.call(this))),
                (this.tween = new Oe({
                  from: Z,
                  to: P,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                }));
            }),
            (l.get = function () {
              return B(this.el, this.name);
            }),
            (l.update = function (P) {
              p(this.el, this.name, P);
            }),
            (l.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                p(this.el, this.name, this.get()));
              var P = this.tween;
              P && P.context && P.destroy();
            }),
            (l.convert = function (P, Z) {
              if (P == "auto" && this.auto) return P;
              var re,
                _e = typeof P == "number",
                H = typeof P == "string";
              switch (Z) {
                case T:
                  if (_e) return P;
                  if (H && P.replace(S, "") === "") return +P;
                  re = "number(unitless)";
                  break;
                case D:
                  if (H) {
                    if (P === "" && this.original) return this.original;
                    if (Z.test(P))
                      return P.charAt(0) == "#" && P.length == 7 ? P : b(P);
                  }
                  re = "hex or rgb string";
                  break;
                case q:
                  if (_e) return P + this.unit;
                  if (H && Z.test(P)) return P;
                  re = "number(px) or string(unit)";
                  break;
                case M:
                  if (_e) return P + this.unit;
                  if (H && Z.test(P)) return P;
                  re = "number(px) or string(unit or %)";
                  break;
                case U:
                  if (_e) return P + this.angle;
                  if (H && Z.test(P)) return P;
                  re = "number(deg) or string(angle)";
                  break;
                case j:
                  if (_e || (H && M.test(P))) return P;
                  re = "number(unitless) or string(unit or %)";
              }
              return a(re, P), P;
            }),
            (l.redraw = function () {
              this.el.offsetHeight;
            });
        }),
        m = h(R, function (l, g) {
          l.init = function () {
            g.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), D));
          };
        }),
        ee = h(R, function (l, g) {
          (l.init = function () {
            g.init.apply(this, arguments), (this.animate = this.fallback);
          }),
            (l.get = function () {
              return this.$el[this.name]();
            }),
            (l.update = function (I) {
              this.$el[this.name](I);
            });
        }),
        se = h(R, function (l, g) {
          function I(b, L) {
            var P, Z, re, _e, H;
            for (P in b)
              (_e = de[P]),
                (re = _e[0]),
                (Z = _e[1] || P),
                (H = this.convert(b[P], re)),
                L.call(this, Z, H, re);
          }
          (l.init = function () {
            g.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                de.perspective &&
                  le.perspective &&
                  ((this.current.perspective = le.perspective),
                  p(this.el, this.name, this.style(this.current)),
                  this.redraw()));
          }),
            (l.set = function (b) {
              I.call(this, b, function (L, P) {
                this.current[L] = P;
              }),
                p(this.el, this.name, this.style(this.current)),
                this.redraw();
            }),
            (l.transition = function (b) {
              var L = this.values(b);
              this.tween = new Pe({
                current: this.current,
                values: L,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var P,
                Z = {};
              for (P in this.current) Z[P] = P in L ? L[P] : this.current[P];
              (this.active = !0), (this.nextStyle = this.style(Z));
            }),
            (l.fallback = function (b) {
              var L = this.values(b);
              this.tween = new Pe({
                current: this.current,
                values: L,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (l.update = function () {
              p(this.el, this.name, this.style(this.current));
            }),
            (l.style = function (b) {
              var L,
                P = "";
              for (L in b) P += L + "(" + b[L] + ") ";
              return P;
            }),
            (l.values = function (b) {
              var L,
                P = {};
              return (
                I.call(this, b, function (Z, re, _e) {
                  (P[Z] = re),
                    this.current[Z] === void 0 &&
                      ((L = 0),
                      ~Z.indexOf("scale") && (L = 1),
                      (this.current[Z] = this.convert(L, _e)));
                }),
                P
              );
            });
        }),
        Oe = h(function (l) {
          function g(H) {
            re.push(H) === 1 && ce(I);
          }
          function I() {
            var H,
              ae,
              ue,
              be = re.length;
            if (be)
              for (ce(I), ae = ge(), H = be; H--; )
                (ue = re[H]), ue && ue.render(ae);
          }
          function b(H) {
            var ae,
              ue = e.inArray(H, re);
            ue >= 0 &&
              ((ae = re.slice(ue + 1)),
              (re.length = ue),
              ae.length && (re = re.concat(ae)));
          }
          function L(H) {
            return Math.round(H * _e) / _e;
          }
          function P(H, ae, ue) {
            return i(
              H[0] + ue * (ae[0] - H[0]),
              H[1] + ue * (ae[1] - H[1]),
              H[2] + ue * (ae[2] - H[2])
            );
          }
          var Z = { ease: _.ease[1], from: 0, to: 1 };
          (l.init = function (H) {
            (this.duration = H.duration || 0), (this.delay = H.delay || 0);
            var ae = H.ease || Z.ease;
            _[ae] && (ae = _[ae][1]),
              typeof ae != "function" && (ae = Z.ease),
              (this.ease = ae),
              (this.update = H.update || o),
              (this.complete = H.complete || o),
              (this.context = H.context || this),
              (this.name = H.name);
            var ue = H.from,
              be = H.to;
            ue === void 0 && (ue = Z.from),
              be === void 0 && (be = Z.to),
              (this.unit = H.unit || ""),
              typeof ue == "number" && typeof be == "number"
                ? ((this.begin = ue), (this.change = be - ue))
                : this.format(be, ue),
              (this.value = this.begin + this.unit),
              (this.start = ge()),
              H.autoplay !== !1 && this.play();
          }),
            (l.play = function () {
              this.active ||
                (this.start || (this.start = ge()),
                (this.active = !0),
                g(this));
            }),
            (l.stop = function () {
              this.active && ((this.active = !1), b(this));
            }),
            (l.render = function (H) {
              var ae,
                ue = H - this.start;
              if (this.delay) {
                if (ue <= this.delay) return;
                ue -= this.delay;
              }
              if (ue < this.duration) {
                var be = this.ease(ue, 0, 1, this.duration);
                return (
                  (ae = this.startRGB
                    ? P(this.startRGB, this.endRGB, be)
                    : L(this.begin + be * this.change)),
                  (this.value = ae + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              (ae = this.endHex || this.begin + this.change),
                (this.value = ae + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy();
            }),
            (l.format = function (H, ae) {
              if (((ae += ""), (H += ""), H.charAt(0) == "#"))
                return (
                  (this.startRGB = n(ae)),
                  (this.endRGB = n(H)),
                  (this.endHex = H),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var ue = ae.replace(S, ""),
                  be = H.replace(S, "");
                ue !== be && s("tween", ae, H), (this.unit = ue);
              }
              (ae = parseFloat(ae)),
                (H = parseFloat(H)),
                (this.begin = this.value = ae),
                (this.change = H - ae);
            }),
            (l.destroy = function () {
              this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = o);
            });
          var re = [],
            _e = 1e3;
        }),
        De = h(Oe, function (l) {
          (l.init = function (g) {
            (this.duration = g.duration || 0),
              (this.complete = g.complete || o),
              (this.context = g.context),
              this.play();
          }),
            (l.render = function (g) {
              var I = g - this.start;
              I < this.duration ||
                (this.complete.call(this.context), this.destroy());
            });
        }),
        Pe = h(Oe, function (l, g) {
          (l.init = function (I) {
            (this.context = I.context),
              (this.update = I.update),
              (this.tweens = []),
              (this.current = I.current);
            var b, L;
            for (b in I.values)
              (L = I.values[b]),
                this.current[b] !== L &&
                  this.tweens.push(
                    new Oe({
                      name: b,
                      from: this.current[b],
                      to: L,
                      duration: I.duration,
                      delay: I.delay,
                      ease: I.ease,
                      autoplay: !1,
                    })
                  );
            this.play();
          }),
            (l.render = function (I) {
              var b,
                L,
                P = this.tweens.length,
                Z = !1;
              for (b = P; b--; )
                (L = this.tweens[b]),
                  L.context &&
                    (L.render(I), (this.current[L.name] = L.value), (Z = !0));
              return Z
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (l.destroy = function () {
              if ((g.destroy.call(this), this.tweens)) {
                var I,
                  b = this.tweens.length;
                for (I = b; I--; ) this.tweens[I].destroy();
                (this.tweens = null), (this.current = null);
              }
            });
        }),
        le = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !V.transition,
          agentTests: [],
        });
      (t.fallback = function (l) {
        if (!V.transition) return (le.fallback = !0);
        le.agentTests.push("(" + l + ")");
        var g = new RegExp(le.agentTests.join("|"), "i");
        le.fallback = g.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (l) {
          return new Oe(l);
        }),
        (t.delay = function (l, g, I) {
          return new De({ complete: g, duration: l, context: I });
        }),
        (e.fn.tram = function (l) {
          return t.call(null, this, l);
        });
      var p = e.style,
        B = e.css,
        Y = { transform: V.transform && V.transform.css },
        k = {
          color: [m, D],
          background: [m, D, "background-color"],
          "outline-color": [m, D],
          "border-color": [m, D],
          "border-top-color": [m, D],
          "border-right-color": [m, D],
          "border-bottom-color": [m, D],
          "border-left-color": [m, D],
          "border-width": [R, q],
          "border-top-width": [R, q],
          "border-right-width": [R, q],
          "border-bottom-width": [R, q],
          "border-left-width": [R, q],
          "border-spacing": [R, q],
          "letter-spacing": [R, q],
          margin: [R, q],
          "margin-top": [R, q],
          "margin-right": [R, q],
          "margin-bottom": [R, q],
          "margin-left": [R, q],
          padding: [R, q],
          "padding-top": [R, q],
          "padding-right": [R, q],
          "padding-bottom": [R, q],
          "padding-left": [R, q],
          "outline-width": [R, q],
          opacity: [R, T],
          top: [R, M],
          right: [R, M],
          bottom: [R, M],
          left: [R, M],
          "font-size": [R, M],
          "text-indent": [R, M],
          "word-spacing": [R, M],
          width: [R, M],
          "min-width": [R, M],
          "max-width": [R, M],
          height: [R, M],
          "min-height": [R, M],
          "max-height": [R, M],
          "line-height": [R, j],
          "scroll-top": [ee, T, "scrollTop"],
          "scroll-left": [ee, T, "scrollLeft"],
        },
        de = {};
      V.transform &&
        ((k.transform = [se]),
        (de = {
          x: [M, "translateX"],
          y: [M, "translateY"],
          rotate: [U],
          rotateX: [U],
          rotateY: [U],
          scale: [T],
          scaleX: [T],
          scaleY: [T],
          skew: [U],
          skewX: [U],
          skewY: [U],
        })),
        V.transform &&
          V.backface &&
          ((de.z = [M, "translateZ"]),
          (de.rotateZ = [U]),
          (de.scaleZ = [T]),
          (de.perspective = [q]));
      var ze = /ms/,
        gt = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var Os = u((pU, Ts) => {
    var vm = window.$,
      hm = Gi() && vm.tram;
    Ts.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        r = Array.prototype,
        n = Object.prototype,
        i = Function.prototype,
        o = r.push,
        a = r.slice,
        s = r.concat,
        c = n.toString,
        f = n.hasOwnProperty,
        E = r.forEach,
        h = r.map,
        _ = r.reduce,
        y = r.reduceRight,
        A = r.filter,
        O = r.every,
        G = r.some,
        S = r.indexOf,
        N = r.lastIndexOf,
        T = Array.isArray,
        D = Object.keys,
        q = i.bind,
        M =
          (e.each =
          e.forEach =
            function (d, F, w) {
              if (d == null) return d;
              if (E && d.forEach === E) d.forEach(F, w);
              else if (d.length === +d.length) {
                for (var V = 0, z = d.length; V < z; V++)
                  if (F.call(w, d[V], V, d) === t) return;
              } else
                for (var Q = e.keys(d), V = 0, z = Q.length; V < z; V++)
                  if (F.call(w, d[Q[V]], Q[V], d) === t) return;
              return d;
            });
      (e.map = e.collect =
        function (d, F, w) {
          var V = [];
          return d == null
            ? V
            : h && d.map === h
            ? d.map(F, w)
            : (M(d, function (z, Q, ce) {
                V.push(F.call(w, z, Q, ce));
              }),
              V);
        }),
        (e.find = e.detect =
          function (d, F, w) {
            var V;
            return (
              U(d, function (z, Q, ce) {
                if (F.call(w, z, Q, ce)) return (V = z), !0;
              }),
              V
            );
          }),
        (e.filter = e.select =
          function (d, F, w) {
            var V = [];
            return d == null
              ? V
              : A && d.filter === A
              ? d.filter(F, w)
              : (M(d, function (z, Q, ce) {
                  F.call(w, z, Q, ce) && V.push(z);
                }),
                V);
          });
      var U =
        (e.some =
        e.any =
          function (d, F, w) {
            F || (F = e.identity);
            var V = !1;
            return d == null
              ? V
              : G && d.some === G
              ? d.some(F, w)
              : (M(d, function (z, Q, ce) {
                  if (V || (V = F.call(w, z, Q, ce))) return t;
                }),
                !!V);
          });
      (e.contains = e.include =
        function (d, F) {
          return d == null
            ? !1
            : S && d.indexOf === S
            ? d.indexOf(F) != -1
            : U(d, function (w) {
                return w === F;
              });
        }),
        (e.delay = function (d, F) {
          var w = a.call(arguments, 2);
          return setTimeout(function () {
            return d.apply(null, w);
          }, F);
        }),
        (e.defer = function (d) {
          return e.delay.apply(e, [d, 1].concat(a.call(arguments, 1)));
        }),
        (e.throttle = function (d) {
          var F, w, V;
          return function () {
            F ||
              ((F = !0),
              (w = arguments),
              (V = this),
              hm.frame(function () {
                (F = !1), d.apply(V, w);
              }));
          };
        }),
        (e.debounce = function (d, F, w) {
          var V,
            z,
            Q,
            ce,
            ge,
            v = function () {
              var X = e.now() - ce;
              X < F
                ? (V = setTimeout(v, F - X))
                : ((V = null), w || ((ge = d.apply(Q, z)), (Q = z = null)));
            };
          return function () {
            (Q = this), (z = arguments), (ce = e.now());
            var X = w && !V;
            return (
              V || (V = setTimeout(v, F)),
              X && ((ge = d.apply(Q, z)), (Q = z = null)),
              ge
            );
          };
        }),
        (e.defaults = function (d) {
          if (!e.isObject(d)) return d;
          for (var F = 1, w = arguments.length; F < w; F++) {
            var V = arguments[F];
            for (var z in V) d[z] === void 0 && (d[z] = V[z]);
          }
          return d;
        }),
        (e.keys = function (d) {
          if (!e.isObject(d)) return [];
          if (D) return D(d);
          var F = [];
          for (var w in d) e.has(d, w) && F.push(w);
          return F;
        }),
        (e.has = function (d, F) {
          return f.call(d, F);
        }),
        (e.isObject = function (d) {
          return d === Object(d);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
      var j = /(.)^/,
        K = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        te = /\\|'|\r|\n|\u2028|\u2029/g,
        W = function (d) {
          return "\\" + K[d];
        },
        C = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (d, F, w) {
          !F && w && (F = w), (F = e.defaults({}, F, e.templateSettings));
          var V = RegExp(
              [
                (F.escape || j).source,
                (F.interpolate || j).source,
                (F.evaluate || j).source,
              ].join("|") + "|$",
              "g"
            ),
            z = 0,
            Q = "__p+='";
          d.replace(V, function (X, R, m, ee, se) {
            return (
              (Q += d.slice(z, se).replace(te, W)),
              (z = se + X.length),
              R
                ? (Q +=
                    `'+
((__t=(` +
                    R +
                    `))==null?'':_.escape(__t))+
'`)
                : m
                ? (Q +=
                    `'+
((__t=(` +
                    m +
                    `))==null?'':__t)+
'`)
                : ee &&
                  (Q +=
                    `';
` +
                    ee +
                    `
__p+='`),
              X
            );
          }),
            (Q += `';
`);
          var ce = F.variable;
          if (ce) {
            if (!C.test(ce))
              throw new Error("variable is not a bare identifier: " + ce);
          } else
            (Q =
              `with(obj||{}){
` +
              Q +
              `}
`),
              (ce = "obj");
          Q =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
            Q +
            `return __p;
`;
          var ge;
          try {
            ge = new Function(F.variable || "obj", "_", Q);
          } catch (X) {
            throw ((X.source = Q), X);
          }
          var v = function (X) {
            return ge.call(this, X, e);
          };
          return (
            (v.source =
              "function(" +
              ce +
              `){
` +
              Q +
              "}"),
            v
          );
        }),
        e
      );
    })();
  });
  var He = u((vU, xs) => {
    var ve = {},
      Yt = {},
      Qt = [],
      Vi = window.Webflow || [],
      Ot = window.jQuery,
      Ze = Ot(window),
      Em = Ot(document),
      at = Ot.isFunction,
      $e = (ve._ = Os()),
      As = (ve.tram = Gi() && Ot.tram),
      pn = !1,
      Wi = !1;
    As.config.hideBackface = !1;
    As.config.keepInherited = !0;
    ve.define = function (e, t, r) {
      Yt[e] && ws(Yt[e]);
      var n = (Yt[e] = t(Ot, $e, r) || {});
      return Ss(n), n;
    };
    ve.require = function (e) {
      return Yt[e];
    };
    function Ss(e) {
      ve.env() &&
        (at(e.design) && Ze.on("__wf_design", e.design),
        at(e.preview) && Ze.on("__wf_preview", e.preview)),
        at(e.destroy) && Ze.on("__wf_destroy", e.destroy),
        e.ready && at(e.ready) && gm(e);
    }
    function gm(e) {
      if (pn) {
        e.ready();
        return;
      }
      $e.contains(Qt, e.ready) || Qt.push(e.ready);
    }
    function ws(e) {
      at(e.design) && Ze.off("__wf_design", e.design),
        at(e.preview) && Ze.off("__wf_preview", e.preview),
        at(e.destroy) && Ze.off("__wf_destroy", e.destroy),
        e.ready && at(e.ready) && _m(e);
    }
    function _m(e) {
      Qt = $e.filter(Qt, function (t) {
        return t !== e.ready;
      });
    }
    ve.push = function (e) {
      if (pn) {
        at(e) && e();
        return;
      }
      Vi.push(e);
    };
    ve.env = function (e) {
      var t = window.__wf_design,
        r = typeof t < "u";
      if (!e) return r;
      if (e === "design") return r && t;
      if (e === "preview") return r && !t;
      if (e === "slug") return r && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var dn = navigator.userAgent.toLowerCase(),
      Rs = (ve.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      ym = (ve.env.chrome =
        /chrome/.test(dn) &&
        /Google/.test(navigator.vendor) &&
        parseInt(dn.match(/chrome\/(\d+)\./)[1], 10)),
      mm = (ve.env.ios = /(ipod|iphone|ipad)/.test(dn));
    ve.env.safari = /safari/.test(dn) && !ym && !mm;
    var Xi;
    Rs &&
      Em.on("touchstart mousedown", function (e) {
        Xi = e.target;
      });
    ve.validClick = Rs
      ? function (e) {
          return e === Xi || Ot.contains(e, Xi);
        }
      : function () {
          return !0;
        };
    var Cs = "resize.webflow orientationchange.webflow load.webflow",
      Im = "scroll.webflow " + Cs;
    ve.resize = Ui(Ze, Cs);
    ve.scroll = Ui(Ze, Im);
    ve.redraw = Ui();
    function Ui(e, t) {
      var r = [],
        n = {};
      return (
        (n.up = $e.throttle(function (i) {
          $e.each(r, function (o) {
            o(i);
          });
        })),
        e && t && e.on(t, n.up),
        (n.on = function (i) {
          typeof i == "function" && ($e.contains(r, i) || r.push(i));
        }),
        (n.off = function (i) {
          if (!arguments.length) {
            r = [];
            return;
          }
          r = $e.filter(r, function (o) {
            return o !== i;
          });
        }),
        n
      );
    }
    ve.location = function (e) {
      window.location = e;
    };
    ve.env() && (ve.location = function () {});
    ve.ready = function () {
      (pn = !0), Wi ? Tm() : $e.each(Qt, bs), $e.each(Vi, bs), ve.resize.up();
    };
    function bs(e) {
      at(e) && e();
    }
    function Tm() {
      (Wi = !1), $e.each(Yt, Ss);
    }
    var Mt;
    ve.load = function (e) {
      Mt.then(e);
    };
    function Ns() {
      Mt && (Mt.reject(), Ze.off("load", Mt.resolve)),
        (Mt = new Ot.Deferred()),
        Ze.on("load", Mt.resolve);
    }
    ve.destroy = function (e) {
      (e = e || {}),
        (Wi = !0),
        Ze.triggerHandler("__wf_destroy"),
        e.domready != null && (pn = e.domready),
        $e.each(Yt, ws),
        ve.resize.off(),
        ve.scroll.off(),
        ve.redraw.off(),
        (Qt = []),
        (Vi = []),
        Mt.state() === "pending" && Ns();
    };
    Ot(ve.ready);
    Ns();
    xs.exports = window.Webflow = ve;
  });
  var Ps = u((hU, Ls) => {
    var qs = He();
    qs.define(
      "brand",
      (Ls.exports = function (e) {
        var t = {},
          r = document,
          n = e("html"),
          i = e("body"),
          
          a = window.location,
          s = /PhantomJS/i.test(navigator.userAgent),
          c =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          f;
        t.ready = function () {
          var y = n.attr("data-wf-status"),
            A = n.attr("data-wf-domain") || "";
          /\.webflow\.io$/i.test(A) && a.hostname !== A && (y = !0),
            y &&
              !s &&
              ((f = f || h()),
              _(),
              setTimeout(_, 500),
              e(r).off(c, E).on(c, E));
        };
        function E() {
          var y =
            r.fullScreen ||
            r.mozFullScreen ||
            r.webkitIsFullScreen ||
            r.msFullscreenElement ||
            !!r.webkitFullscreenElement;
          e(f).attr("style", y ? "display: none !important;" : "");
        }
        
        function _() {
          var y = i.children(o),
            A = y.length && y.get(0) === f,
            O = qs.env("editor");
          if (A) {
            O && y.remove();
            return;
          }
          y.length && y.remove(), O || i.append(f);
        }
        return t;
      })
    );
  });
  var Ms = u((EU, Ds) => {
    var Bi = He();
    Bi.define(
      "edit",
      (Ds.exports = function (e, t, r) {
        if (
          ((r = r || {}),
          (Bi.env("test") || Bi.env("frame")) && !r.fixture && !Om())
        )
          return { exit: 1 };
        var n = {},
          i = e(window),
          o = e(document.documentElement),
          a = document.location,
          s = "hashchange",
          c,
          f = r.load || _,
          E = !1;
        try {
          E =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        E
          ? f()
          : a.search
          ? (/[?&](edit)(?:[=&?]|$)/.test(a.search) ||
              /\?edit$/.test(a.href)) &&
            f()
          : i.on(s, h).triggerHandler(s);
        function h() {
          c || (/\?edit/.test(a.hash) && f());
        }
        function _() {
          (c = !0),
            (window.WebflowEditor = !0),
            i.off(s, h),
            N(function (D) {
              e.ajax({
                url: S("https://editor-api.webflow.com/api/editor/view"),
                data: { siteId: o.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: y(D),
              });
            });
        }
        function y(D) {
          return function (q) {
            if (!q) {
              console.error("Could not load editor data");
              return;
            }
            (q.thirdPartyCookiesSupported = D),
              A(G(q.bugReporterScriptPath), function () {
                A(G(q.scriptPath), function () {
                  window.WebflowEditor(q);
                });
              });
          };
        }
        function A(D, q) {
          e.ajax({ type: "GET", url: D, dataType: "script", cache: !0 }).then(
            q,
            O
          );
        }
        function O(D, q, M) {
          throw (console.error("Could not load editor script: " + q), M);
        }
        function G(D) {
          return D.indexOf("//") >= 0
            ? D
            : S("https://editor-api.webflow.com" + D);
        }
        function S(D) {
          return D.replace(/([^:])\/\//g, "$1/");
        }
        function N(D) {
          var q = window.document.createElement("iframe");
          (q.src = "https://webflow.com/site/third-party-cookie-check.html"),
            (q.style.display = "none"),
            (q.sandbox = "allow-scripts allow-same-origin");
          var M = function (U) {
            U.data === "WF_third_party_cookies_unsupported"
              ? (T(q, M), D(!1))
              : U.data === "WF_third_party_cookies_supported" &&
                (T(q, M), D(!0));
          };
          (q.onerror = function () {
            T(q, M), D(!1);
          }),
            window.addEventListener("message", M, !1),
            window.document.body.appendChild(q);
        }
        function T(D, q) {
          window.removeEventListener("message", q, !1), D.remove();
        }
        return n;
      })
    );
    function Om() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var Gs = u((gU, Fs) => {
    var bm = He();
    bm.define(
      "focus-visible",
      (Fs.exports = function () {
        function e(r) {
          var n = !0,
            i = !1,
            o = null,
            a = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function s(T) {
            return !!(
              T &&
              T !== document &&
              T.nodeName !== "HTML" &&
              T.nodeName !== "BODY" &&
              "classList" in T &&
              "contains" in T.classList
            );
          }
          function c(T) {
            var D = T.type,
              q = T.tagName;
            return !!(
              (q === "INPUT" && a[D] && !T.readOnly) ||
              (q === "TEXTAREA" && !T.readOnly) ||
              T.isContentEditable
            );
          }
          function f(T) {
            T.getAttribute("data-wf-focus-visible") ||
              T.setAttribute("data-wf-focus-visible", "true");
          }
          function E(T) {
            T.getAttribute("data-wf-focus-visible") &&
              T.removeAttribute("data-wf-focus-visible");
          }
          function h(T) {
            T.metaKey ||
              T.altKey ||
              T.ctrlKey ||
              (s(r.activeElement) && f(r.activeElement), (n = !0));
          }
          function _() {
            n = !1;
          }
          function y(T) {
            s(T.target) && (n || c(T.target)) && f(T.target);
          }
          function A(T) {
            s(T.target) &&
              T.target.hasAttribute("data-wf-focus-visible") &&
              ((i = !0),
              window.clearTimeout(o),
              (o = window.setTimeout(function () {
                i = !1;
              }, 100)),
              E(T.target));
          }
          function O() {
            document.visibilityState === "hidden" && (i && (n = !0), G());
          }
          function G() {
            document.addEventListener("mousemove", N),
              document.addEventListener("mousedown", N),
              document.addEventListener("mouseup", N),
              document.addEventListener("pointermove", N),
              document.addEventListener("pointerdown", N),
              document.addEventListener("pointerup", N),
              document.addEventListener("touchmove", N),
              document.addEventListener("touchstart", N),
              document.addEventListener("touchend", N);
          }
          function S() {
            document.removeEventListener("mousemove", N),
              document.removeEventListener("mousedown", N),
              document.removeEventListener("mouseup", N),
              document.removeEventListener("pointermove", N),
              document.removeEventListener("pointerdown", N),
              document.removeEventListener("pointerup", N),
              document.removeEventListener("touchmove", N),
              document.removeEventListener("touchstart", N),
              document.removeEventListener("touchend", N);
          }
          function N(T) {
            (T.target.nodeName && T.target.nodeName.toLowerCase() === "html") ||
              ((n = !1), S());
          }
          document.addEventListener("keydown", h, !0),
            document.addEventListener("mousedown", _, !0),
            document.addEventListener("pointerdown", _, !0),
            document.addEventListener("touchstart", _, !0),
            document.addEventListener("visibilitychange", O, !0),
            G(),
            r.addEventListener("focus", y, !0),
            r.addEventListener("blur", A, !0);
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      })
    );
  });
  var Ws = u((_U, Vs) => {
    var Xs = He();
    Xs.define(
      "focus",
      (Vs.exports = function () {
        var e = [],
          t = !1;
        function r(a) {
          t &&
            (a.preventDefault(),
            a.stopPropagation(),
            a.stopImmediatePropagation(),
            e.unshift(a));
        }
        function n(a) {
          var s = a.target,
            c = s.tagName;
          return (
            (/^a$/i.test(c) && s.href != null) ||
            (/^(button|textarea)$/i.test(c) && s.disabled !== !0) ||
            (/^input$/i.test(c) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(s.type) &&
              !s.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(c) &&
              !Number.isNaN(Number.parseFloat(s.tabIndex))) ||
            /^audio$/i.test(c) ||
            (/^video$/i.test(c) && s.controls === !0)
          );
        }
        function i(a) {
          n(a) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, a.target.focus(); e.length > 0; ) {
                var s = e.pop();
                s.target.dispatchEvent(new MouseEvent(s.type, s));
              }
            }, 0));
        }
        function o() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            Xs.env.safari &&
            (document.addEventListener("mousedown", i, !0),
            document.addEventListener("mouseup", r, !0),
            document.addEventListener("click", r, !0));
        }
        return { ready: o };
      })
    );
  });
  var ks = u((yU, Bs) => {
    "use strict";
    var ki = window.jQuery,
      st = {},
      vn = [],
      Us = ".w-ix",
      hn = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), ki(t).triggerHandler(st.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), ki(t).triggerHandler(st.types.OUTRO));
        },
      };
    st.triggers = {};
    st.types = { INTRO: "w-ix-intro" + Us, OUTRO: "w-ix-outro" + Us };
    st.init = function () {
      for (var e = vn.length, t = 0; t < e; t++) {
        var r = vn[t];
        r[0](0, r[1]);
      }
      (vn = []), ki.extend(st.triggers, hn);
    };
    st.async = function () {
      for (var e in hn) {
        var t = hn[e];
        hn.hasOwnProperty(e) &&
          (st.triggers[e] = function (r, n) {
            vn.push([t, n]);
          });
      }
    };
    st.async();
    Bs.exports = st;
  });
  var wr = u((mU, Ks) => {
    "use strict";
    var Hi = ks();
    function Hs(e, t) {
      var r = document.createEvent("CustomEvent");
      r.initCustomEvent(t, !0, !0, null), e.dispatchEvent(r);
    }
    var Am = window.jQuery,
      En = {},
      js = ".w-ix",
      Sm = {
        reset: function (e, t) {
          Hi.triggers.reset(e, t);
        },
        intro: function (e, t) {
          Hi.triggers.intro(e, t), Hs(t, "COMPONENT_ACTIVE");
        },
        outro: function (e, t) {
          Hi.triggers.outro(e, t), Hs(t, "COMPONENT_INACTIVE");
        },
      };
    En.triggers = {};
    En.types = { INTRO: "w-ix-intro" + js, OUTRO: "w-ix-outro" + js };
    Am.extend(En.triggers, Sm);
    Ks.exports = En;
  });
  var zs = u((IU, _t) => {
    function ji(e) {
      return (
        (_t.exports = ji =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  typeof Symbol == "function" &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        (_t.exports.__esModule = !0),
        (_t.exports.default = _t.exports),
        ji(e)
      );
    }
    (_t.exports = ji),
      (_t.exports.__esModule = !0),
      (_t.exports.default = _t.exports);
  });
  var $t = u((TU, Rr) => {
    var wm = zs().default;
    function Ys(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (Ys = function (i) {
        return i ? r : t;
      })(e);
    }
    function Rm(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (wm(e) !== "object" && typeof e != "function"))
        return { default: e };
      var r = Ys(t);
      if (r && r.has(e)) return r.get(e);
      var n = {},
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var a = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          a && (a.get || a.set)
            ? Object.defineProperty(n, o, a)
            : (n[o] = e[o]);
        }
      return (n.default = e), r && r.set(e, n), n;
    }
    (Rr.exports = Rm),
      (Rr.exports.__esModule = !0),
      (Rr.exports.default = Rr.exports);
  });
  var ut = u((OU, Cr) => {
    function Cm(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (Cr.exports = Cm),
      (Cr.exports.__esModule = !0),
      (Cr.exports.default = Cr.exports);
  });
  var ye = u((bU, Qs) => {
    var gn = function (e) {
      return e && e.Math == Math && e;
    };
    Qs.exports =
      gn(typeof globalThis == "object" && globalThis) ||
      gn(typeof window == "object" && window) ||
      gn(typeof self == "object" && self) ||
      gn(typeof global == "object" && global) ||
      (function () {
        return this;
      })() ||
      Function("return this")();
  });
  var Zt = u((AU, $s) => {
    $s.exports = function (e) {
      try {
        return !!e();
      } catch {
        return !0;
      }
    };
  });
  var Ft = u((SU, Zs) => {
    var Nm = Zt();
    Zs.exports = !Nm(function () {
      return (
        Object.defineProperty({}, 1, {
          get: function () {
            return 7;
          },
        })[1] != 7
      );
    });
  });
  var _n = u((wU, Js) => {
    var Nr = Function.prototype.call;
    Js.exports = Nr.bind
      ? Nr.bind(Nr)
      : function () {
          return Nr.apply(Nr, arguments);
        };
  });
  var nu = u((ru) => {
    "use strict";
    var eu = {}.propertyIsEnumerable,
      tu = Object.getOwnPropertyDescriptor,
      xm = tu && !eu.call({ 1: 2 }, 1);
    ru.f = xm
      ? function (t) {
          var r = tu(this, t);
          return !!r && r.enumerable;
        }
      : eu;
  });
  var Ki = u((CU, iu) => {
    iu.exports = function (e, t) {
      return {
        enumerable: !(e & 1),
        configurable: !(e & 2),
        writable: !(e & 4),
        value: t,
      };
    };
  });
  var Je = u((NU, au) => {
    var ou = Function.prototype,
      zi = ou.bind,
      Yi = ou.call,
      qm = zi && zi.bind(Yi);
    au.exports = zi
      ? function (e) {
          return e && qm(Yi, e);
        }
      : function (e) {
          return (
            e &&
            function () {
              return Yi.apply(e, arguments);
            }
          );
        };
  });
  var cu = u((xU, uu) => {
    var su = Je(),
      Lm = su({}.toString),
      Pm = su("".slice);
    uu.exports = function (e) {
      return Pm(Lm(e), 8, -1);
    };
  });
  var fu = u((qU, lu) => {
    var Dm = ye(),
      Mm = Je(),
      Fm = Zt(),
      Gm = cu(),
      Qi = Dm.Object,
      Xm = Mm("".split);
    lu.exports = Fm(function () {
      return !Qi("z").propertyIsEnumerable(0);
    })
      ? function (e) {
          return Gm(e) == "String" ? Xm(e, "") : Qi(e);
        }
      : Qi;
  });
  var $i = u((LU, du) => {
    var Vm = ye(),
      Wm = Vm.TypeError;
    du.exports = function (e) {
      if (e == null) throw Wm("Can't call method on " + e);
      return e;
    };
  });
  var xr = u((PU, pu) => {
    var Um = fu(),
      Bm = $i();
    pu.exports = function (e) {
      return Um(Bm(e));
    };
  });
  var ct = u((DU, vu) => {
    vu.exports = function (e) {
      return typeof e == "function";
    };
  });
  var Jt = u((MU, hu) => {
    var km = ct();
    hu.exports = function (e) {
      return typeof e == "object" ? e !== null : km(e);
    };
  });
  var qr = u((FU, Eu) => {
    var Zi = ye(),
      Hm = ct(),
      jm = function (e) {
        return Hm(e) ? e : void 0;
      };
    Eu.exports = function (e, t) {
      return arguments.length < 2 ? jm(Zi[e]) : Zi[e] && Zi[e][t];
    };
  });
  var _u = u((GU, gu) => {
    var Km = Je();
    gu.exports = Km({}.isPrototypeOf);
  });
  var mu = u((XU, yu) => {
    var zm = qr();
    yu.exports = zm("navigator", "userAgent") || "";
  });
  var wu = u((VU, Su) => {
    var Au = ye(),
      Ji = mu(),
      Iu = Au.process,
      Tu = Au.Deno,
      Ou = (Iu && Iu.versions) || (Tu && Tu.version),
      bu = Ou && Ou.v8,
      et,
      yn;
    bu &&
      ((et = bu.split(".")),
      (yn = et[0] > 0 && et[0] < 4 ? 1 : +(et[0] + et[1])));
    !yn &&
      Ji &&
      ((et = Ji.match(/Edge\/(\d+)/)),
      (!et || et[1] >= 74) &&
        ((et = Ji.match(/Chrome\/(\d+)/)), et && (yn = +et[1])));
    Su.exports = yn;
  });
  var eo = u((WU, Cu) => {
    var Ru = wu(),
      Ym = Zt();
    Cu.exports =
      !!Object.getOwnPropertySymbols &&
      !Ym(function () {
        var e = Symbol();
        return (
          !String(e) ||
          !(Object(e) instanceof Symbol) ||
          (!Symbol.sham && Ru && Ru < 41)
        );
      });
  });
  var to = u((UU, Nu) => {
    var Qm = eo();
    Nu.exports = Qm && !Symbol.sham && typeof Symbol.iterator == "symbol";
  });
  var ro = u((BU, xu) => {
    var $m = ye(),
      Zm = qr(),
      Jm = ct(),
      eI = _u(),
      tI = to(),
      rI = $m.Object;
    xu.exports = tI
      ? function (e) {
          return typeof e == "symbol";
        }
      : function (e) {
          var t = Zm("Symbol");
          return Jm(t) && eI(t.prototype, rI(e));
        };
  });
  var Lu = u((kU, qu) => {
    var nI = ye(),
      iI = nI.String;
    qu.exports = function (e) {
      try {
        return iI(e);
      } catch {
        return "Object";
      }
    };
  });
  var Du = u((HU, Pu) => {
    var oI = ye(),
      aI = ct(),
      sI = Lu(),
      uI = oI.TypeError;
    Pu.exports = function (e) {
      if (aI(e)) return e;
      throw uI(sI(e) + " is not a function");
    };
  });
  var Fu = u((jU, Mu) => {
    var cI = Du();
    Mu.exports = function (e, t) {
      var r = e[t];
      return r == null ? void 0 : cI(r);
    };
  });
  var Xu = u((KU, Gu) => {
    var lI = ye(),
      no = _n(),
      io = ct(),
      oo = Jt(),
      fI = lI.TypeError;
    Gu.exports = function (e, t) {
      var r, n;
      if (
        (t === "string" && io((r = e.toString)) && !oo((n = no(r, e)))) ||
        (io((r = e.valueOf)) && !oo((n = no(r, e)))) ||
        (t !== "string" && io((r = e.toString)) && !oo((n = no(r, e))))
      )
        return n;
      throw fI("Can't convert object to primitive value");
    };
  });
  var Wu = u((zU, Vu) => {
    Vu.exports = !1;
  });
  var mn = u((YU, Bu) => {
    var Uu = ye(),
      dI = Object.defineProperty;
    Bu.exports = function (e, t) {
      try {
        dI(Uu, e, { value: t, configurable: !0, writable: !0 });
      } catch {
        Uu[e] = t;
      }
      return t;
    };
  });
  var In = u((QU, Hu) => {
    var pI = ye(),
      vI = mn(),
      ku = "__core-js_shared__",
      hI = pI[ku] || vI(ku, {});
    Hu.exports = hI;
  });
  var ao = u(($U, Ku) => {
    var EI = Wu(),
      ju = In();
    (Ku.exports = function (e, t) {
      return ju[e] || (ju[e] = t !== void 0 ? t : {});
    })("versions", []).push({
      version: "3.19.0",
      mode: EI ? "pure" : "global",
      copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)",
    });
  });
  var Yu = u((ZU, zu) => {
    var gI = ye(),
      _I = $i(),
      yI = gI.Object;
    zu.exports = function (e) {
      return yI(_I(e));
    };
  });
  var bt = u((JU, Qu) => {
    var mI = Je(),
      II = Yu(),
      TI = mI({}.hasOwnProperty);
    Qu.exports =
      Object.hasOwn ||
      function (t, r) {
        return TI(II(t), r);
      };
  });
  var so = u((eB, $u) => {
    var OI = Je(),
      bI = 0,
      AI = Math.random(),
      SI = OI((1).toString);
    $u.exports = function (e) {
      return "Symbol(" + (e === void 0 ? "" : e) + ")_" + SI(++bI + AI, 36);
    };
  });
  var uo = u((tB, rc) => {
    var wI = ye(),
      RI = ao(),
      Zu = bt(),
      CI = so(),
      Ju = eo(),
      tc = to(),
      er = RI("wks"),
      Gt = wI.Symbol,
      ec = Gt && Gt.for,
      NI = tc ? Gt : (Gt && Gt.withoutSetter) || CI;
    rc.exports = function (e) {
      if (!Zu(er, e) || !(Ju || typeof er[e] == "string")) {
        var t = "Symbol." + e;
        Ju && Zu(Gt, e)
          ? (er[e] = Gt[e])
          : tc && ec
          ? (er[e] = ec(t))
          : (er[e] = NI(t));
      }
      return er[e];
    };
  });
  var ac = u((rB, oc) => {
    var xI = ye(),
      qI = _n(),
      nc = Jt(),
      ic = ro(),
      LI = Fu(),
      PI = Xu(),
      DI = uo(),
      MI = xI.TypeError,
      FI = DI("toPrimitive");
    oc.exports = function (e, t) {
      if (!nc(e) || ic(e)) return e;
      var r = LI(e, FI),
        n;
      if (r) {
        if (
          (t === void 0 && (t = "default"), (n = qI(r, e, t)), !nc(n) || ic(n))
        )
          return n;
        throw MI("Can't convert object to primitive value");
      }
      return t === void 0 && (t = "number"), PI(e, t);
    };
  });
  var co = u((nB, sc) => {
    var GI = ac(),
      XI = ro();
    sc.exports = function (e) {
      var t = GI(e, "string");
      return XI(t) ? t : t + "";
    };
  });
  var fo = u((iB, cc) => {
    var VI = ye(),
      uc = Jt(),
      lo = VI.document,
      WI = uc(lo) && uc(lo.createElement);
    cc.exports = function (e) {
      return WI ? lo.createElement(e) : {};
    };
  });
  var po = u((oB, lc) => {
    var UI = Ft(),
      BI = Zt(),
      kI = fo();
    lc.exports =
      !UI &&
      !BI(function () {
        return (
          Object.defineProperty(kI("div"), "a", {
            get: function () {
              return 7;
            },
          }).a != 7
        );
      });
  });
  var vo = u((dc) => {
    var HI = Ft(),
      jI = _n(),
      KI = nu(),
      zI = Ki(),
      YI = xr(),
      QI = co(),
      $I = bt(),
      ZI = po(),
      fc = Object.getOwnPropertyDescriptor;
    dc.f = HI
      ? fc
      : function (t, r) {
          if (((t = YI(t)), (r = QI(r)), ZI))
            try {
              return fc(t, r);
            } catch {}
          if ($I(t, r)) return zI(!jI(KI.f, t, r), t[r]);
        };
  });
  var Lr = u((sB, vc) => {
    var pc = ye(),
      JI = Jt(),
      eT = pc.String,
      tT = pc.TypeError;
    vc.exports = function (e) {
      if (JI(e)) return e;
      throw tT(eT(e) + " is not an object");
    };
  });
  var Pr = u((gc) => {
    var rT = ye(),
      nT = Ft(),
      iT = po(),
      hc = Lr(),
      oT = co(),
      aT = rT.TypeError,
      Ec = Object.defineProperty;
    gc.f = nT
      ? Ec
      : function (t, r, n) {
          if ((hc(t), (r = oT(r)), hc(n), iT))
            try {
              return Ec(t, r, n);
            } catch {}
          if ("get" in n || "set" in n) throw aT("Accessors not supported");
          return "value" in n && (t[r] = n.value), t;
        };
  });
  var Tn = u((cB, _c) => {
    var sT = Ft(),
      uT = Pr(),
      cT = Ki();
    _c.exports = sT
      ? function (e, t, r) {
          return uT.f(e, t, cT(1, r));
        }
      : function (e, t, r) {
          return (e[t] = r), e;
        };
  });
  var Eo = u((lB, yc) => {
    var lT = Je(),
      fT = ct(),
      ho = In(),
      dT = lT(Function.toString);
    fT(ho.inspectSource) ||
      (ho.inspectSource = function (e) {
        return dT(e);
      });
    yc.exports = ho.inspectSource;
  });
  var Tc = u((fB, Ic) => {
    var pT = ye(),
      vT = ct(),
      hT = Eo(),
      mc = pT.WeakMap;
    Ic.exports = vT(mc) && /native code/.test(hT(mc));
  });
  var go = u((dB, bc) => {
    var ET = ao(),
      gT = so(),
      Oc = ET("keys");
    bc.exports = function (e) {
      return Oc[e] || (Oc[e] = gT(e));
    };
  });
  var On = u((pB, Ac) => {
    Ac.exports = {};
  });
  var xc = u((vB, Nc) => {
    var _T = Tc(),
      Cc = ye(),
      _o = Je(),
      yT = Jt(),
      mT = Tn(),
      yo = bt(),
      mo = In(),
      IT = go(),
      TT = On(),
      Sc = "Object already initialized",
      To = Cc.TypeError,
      OT = Cc.WeakMap,
      bn,
      Dr,
      An,
      bT = function (e) {
        return An(e) ? Dr(e) : bn(e, {});
      },
      AT = function (e) {
        return function (t) {
          var r;
          if (!yT(t) || (r = Dr(t)).type !== e)
            throw To("Incompatible receiver, " + e + " required");
          return r;
        };
      };
    _T || mo.state
      ? ((At = mo.state || (mo.state = new OT())),
        (wc = _o(At.get)),
        (Io = _o(At.has)),
        (Rc = _o(At.set)),
        (bn = function (e, t) {
          if (Io(At, e)) throw new To(Sc);
          return (t.facade = e), Rc(At, e, t), t;
        }),
        (Dr = function (e) {
          return wc(At, e) || {};
        }),
        (An = function (e) {
          return Io(At, e);
        }))
      : ((Xt = IT("state")),
        (TT[Xt] = !0),
        (bn = function (e, t) {
          if (yo(e, Xt)) throw new To(Sc);
          return (t.facade = e), mT(e, Xt, t), t;
        }),
        (Dr = function (e) {
          return yo(e, Xt) ? e[Xt] : {};
        }),
        (An = function (e) {
          return yo(e, Xt);
        }));
    var At, wc, Io, Rc, Xt;
    Nc.exports = { set: bn, get: Dr, has: An, enforce: bT, getterFor: AT };
  });
  var Pc = u((hB, Lc) => {
    var Oo = Ft(),
      ST = bt(),
      qc = Function.prototype,
      wT = Oo && Object.getOwnPropertyDescriptor,
      bo = ST(qc, "name"),
      RT = bo && function () {}.name === "something",
      CT = bo && (!Oo || (Oo && wT(qc, "name").configurable));
    Lc.exports = { EXISTS: bo, PROPER: RT, CONFIGURABLE: CT };
  });
  var Xc = u((EB, Gc) => {
    var NT = ye(),
      Dc = ct(),
      xT = bt(),
      Mc = Tn(),
      qT = mn(),
      LT = Eo(),
      Fc = xc(),
      PT = Pc().CONFIGURABLE,
      DT = Fc.get,
      MT = Fc.enforce,
      FT = String(String).split("String");
    (Gc.exports = function (e, t, r, n) {
      var i = n ? !!n.unsafe : !1,
        o = n ? !!n.enumerable : !1,
        a = n ? !!n.noTargetGet : !1,
        s = n && n.name !== void 0 ? n.name : t,
        c;
      if (
        (Dc(r) &&
          (String(s).slice(0, 7) === "Symbol(" &&
            (s = "[" + String(s).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
          (!xT(r, "name") || (PT && r.name !== s)) && Mc(r, "name", s),
          (c = MT(r)),
          c.source || (c.source = FT.join(typeof s == "string" ? s : ""))),
        e === NT)
      ) {
        o ? (e[t] = r) : qT(t, r);
        return;
      } else i ? !a && e[t] && (o = !0) : delete e[t];
      o ? (e[t] = r) : Mc(e, t, r);
    })(Function.prototype, "toString", function () {
      return (Dc(this) && DT(this).source) || LT(this);
    });
  });
  var Ao = u((gB, Vc) => {
    var GT = Math.ceil,
      XT = Math.floor;
    Vc.exports = function (e) {
      var t = +e;
      return t !== t || t === 0 ? 0 : (t > 0 ? XT : GT)(t);
    };
  });
  var Uc = u((_B, Wc) => {
    var VT = Ao(),
      WT = Math.max,
      UT = Math.min;
    Wc.exports = function (e, t) {
      var r = VT(e);
      return r < 0 ? WT(r + t, 0) : UT(r, t);
    };
  });
  var kc = u((yB, Bc) => {
    var BT = Ao(),
      kT = Math.min;
    Bc.exports = function (e) {
      return e > 0 ? kT(BT(e), 9007199254740991) : 0;
    };
  });
  var jc = u((mB, Hc) => {
    var HT = kc();
    Hc.exports = function (e) {
      return HT(e.length);
    };
  });
  var So = u((IB, zc) => {
    var jT = xr(),
      KT = Uc(),
      zT = jc(),
      Kc = function (e) {
        return function (t, r, n) {
          var i = jT(t),
            o = zT(i),
            a = KT(n, o),
            s;
          if (e && r != r) {
            for (; o > a; ) if (((s = i[a++]), s != s)) return !0;
          } else
            for (; o > a; a++)
              if ((e || a in i) && i[a] === r) return e || a || 0;
          return !e && -1;
        };
      };
    zc.exports = { includes: Kc(!0), indexOf: Kc(!1) };
  });
  var Ro = u((TB, Qc) => {
    var YT = Je(),
      wo = bt(),
      QT = xr(),
      $T = So().indexOf,
      ZT = On(),
      Yc = YT([].push);
    Qc.exports = function (e, t) {
      var r = QT(e),
        n = 0,
        i = [],
        o;
      for (o in r) !wo(ZT, o) && wo(r, o) && Yc(i, o);
      for (; t.length > n; ) wo(r, (o = t[n++])) && (~$T(i, o) || Yc(i, o));
      return i;
    };
  });
  var Sn = u((OB, $c) => {
    $c.exports = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf",
    ];
  });
  var Jc = u((Zc) => {
    var JT = Ro(),
      eO = Sn(),
      tO = eO.concat("length", "prototype");
    Zc.f =
      Object.getOwnPropertyNames ||
      function (t) {
        return JT(t, tO);
      };
  });
  var tl = u((el) => {
    el.f = Object.getOwnPropertySymbols;
  });
  var nl = u((SB, rl) => {
    var rO = qr(),
      nO = Je(),
      iO = Jc(),
      oO = tl(),
      aO = Lr(),
      sO = nO([].concat);
    rl.exports =
      rO("Reflect", "ownKeys") ||
      function (t) {
        var r = iO.f(aO(t)),
          n = oO.f;
        return n ? sO(r, n(t)) : r;
      };
  });
  var ol = u((wB, il) => {
    var uO = bt(),
      cO = nl(),
      lO = vo(),
      fO = Pr();
    il.exports = function (e, t) {
      for (var r = cO(t), n = fO.f, i = lO.f, o = 0; o < r.length; o++) {
        var a = r[o];
        uO(e, a) || n(e, a, i(t, a));
      }
    };
  });
  var sl = u((RB, al) => {
    var dO = Zt(),
      pO = ct(),
      vO = /#|\.prototype\./,
      Mr = function (e, t) {
        var r = EO[hO(e)];
        return r == _O ? !0 : r == gO ? !1 : pO(t) ? dO(t) : !!t;
      },
      hO = (Mr.normalize = function (e) {
        return String(e).replace(vO, ".").toLowerCase();
      }),
      EO = (Mr.data = {}),
      gO = (Mr.NATIVE = "N"),
      _O = (Mr.POLYFILL = "P");
    al.exports = Mr;
  });
  var cl = u((CB, ul) => {
    var Co = ye(),
      yO = vo().f,
      mO = Tn(),
      IO = Xc(),
      TO = mn(),
      OO = ol(),
      bO = sl();
    ul.exports = function (e, t) {
      var r = e.target,
        n = e.global,
        i = e.stat,
        o,
        a,
        s,
        c,
        f,
        E;
      if (
        (n
          ? (a = Co)
          : i
          ? (a = Co[r] || TO(r, {}))
          : (a = (Co[r] || {}).prototype),
        a)
      )
        for (s in t) {
          if (
            ((f = t[s]),
            e.noTargetGet ? ((E = yO(a, s)), (c = E && E.value)) : (c = a[s]),
            (o = bO(n ? s : r + (i ? "." : "#") + s, e.forced)),
            !o && c !== void 0)
          ) {
            if (typeof f == typeof c) continue;
            OO(f, c);
          }
          (e.sham || (c && c.sham)) && mO(f, "sham", !0), IO(a, s, f, e);
        }
    };
  });
  var fl = u((NB, ll) => {
    var AO = Ro(),
      SO = Sn();
    ll.exports =
      Object.keys ||
      function (t) {
        return AO(t, SO);
      };
  });
  var pl = u((xB, dl) => {
    var wO = Ft(),
      RO = Pr(),
      CO = Lr(),
      NO = xr(),
      xO = fl();
    dl.exports = wO
      ? Object.defineProperties
      : function (t, r) {
          CO(t);
          for (var n = NO(r), i = xO(r), o = i.length, a = 0, s; o > a; )
            RO.f(t, (s = i[a++]), n[s]);
          return t;
        };
  });
  var hl = u((qB, vl) => {
    var qO = qr();
    vl.exports = qO("document", "documentElement");
  });
  var Ol = u((LB, Tl) => {
    var LO = Lr(),
      PO = pl(),
      El = Sn(),
      DO = On(),
      MO = hl(),
      FO = fo(),
      GO = go(),
      gl = ">",
      _l = "<",
      xo = "prototype",
      qo = "script",
      ml = GO("IE_PROTO"),
      No = function () {},
      Il = function (e) {
        return _l + qo + gl + e + _l + "/" + qo + gl;
      },
      yl = function (e) {
        e.write(Il("")), e.close();
        var t = e.parentWindow.Object;
        return (e = null), t;
      },
      XO = function () {
        var e = FO("iframe"),
          t = "java" + qo + ":",
          r;
        return (
          (e.style.display = "none"),
          MO.appendChild(e),
          (e.src = String(t)),
          (r = e.contentWindow.document),
          r.open(),
          r.write(Il("document.F=Object")),
          r.close(),
          r.F
        );
      },
      wn,
      Rn = function () {
        try {
          wn = new ActiveXObject("htmlfile");
        } catch {}
        Rn =
          typeof document < "u"
            ? document.domain && wn
              ? yl(wn)
              : XO()
            : yl(wn);
        for (var e = El.length; e--; ) delete Rn[xo][El[e]];
        return Rn();
      };
    DO[ml] = !0;
    Tl.exports =
      Object.create ||
      function (t, r) {
        var n;
        return (
          t !== null
            ? ((No[xo] = LO(t)), (n = new No()), (No[xo] = null), (n[ml] = t))
            : (n = Rn()),
          r === void 0 ? n : PO(n, r)
        );
      };
  });
  var Al = u((PB, bl) => {
    var VO = uo(),
      WO = Ol(),
      UO = Pr(),
      Lo = VO("unscopables"),
      Po = Array.prototype;
    Po[Lo] == null && UO.f(Po, Lo, { configurable: !0, value: WO(null) });
    bl.exports = function (e) {
      Po[Lo][e] = !0;
    };
  });
  var Sl = u(() => {
    "use strict";
    var BO = cl(),
      kO = So().includes,
      HO = Al();
    BO(
      { target: "Array", proto: !0 },
      {
        includes: function (t) {
          return kO(this, t, arguments.length > 1 ? arguments[1] : void 0);
        },
      }
    );
    HO("includes");
  });
  var Rl = u((FB, wl) => {
    var jO = ye(),
      KO = Je();
    wl.exports = function (e, t) {
      return KO(jO[e].prototype[t]);
    };
  });
  var Nl = u((GB, Cl) => {
    Sl();
    var zO = Rl();
    Cl.exports = zO("Array", "includes");
  });
  var ql = u((XB, xl) => {
    var YO = Nl();
    xl.exports = YO;
  });
  var Pl = u((VB, Ll) => {
    var QO = ql();
    Ll.exports = QO;
  });
  var Do = u((WB, Dl) => {
    var $O =
      typeof global == "object" && global && global.Object === Object && global;
    Dl.exports = $O;
  });
  var tt = u((UB, Ml) => {
    var ZO = Do(),
      JO = typeof self == "object" && self && self.Object === Object && self,
      eb = ZO || JO || Function("return this")();
    Ml.exports = eb;
  });
  var tr = u((BB, Fl) => {
    var tb = tt(),
      rb = tb.Symbol;
    Fl.exports = rb;
  });
  var Wl = u((kB, Vl) => {
    var Gl = tr(),
      Xl = Object.prototype,
      nb = Xl.hasOwnProperty,
      ib = Xl.toString,
      Fr = Gl ? Gl.toStringTag : void 0;
    function ob(e) {
      var t = nb.call(e, Fr),
        r = e[Fr];
      try {
        e[Fr] = void 0;
        var n = !0;
      } catch {}
      var i = ib.call(e);
      return n && (t ? (e[Fr] = r) : delete e[Fr]), i;
    }
    Vl.exports = ob;
  });
  var Bl = u((HB, Ul) => {
    var ab = Object.prototype,
      sb = ab.toString;
    function ub(e) {
      return sb.call(e);
    }
    Ul.exports = ub;
  });
  var St = u((jB, jl) => {
    var kl = tr(),
      cb = Wl(),
      lb = Bl(),
      fb = "[object Null]",
      db = "[object Undefined]",
      Hl = kl ? kl.toStringTag : void 0;
    function pb(e) {
      return e == null
        ? e === void 0
          ? db
          : fb
        : Hl && Hl in Object(e)
        ? cb(e)
        : lb(e);
    }
    jl.exports = pb;
  });
  var Mo = u((KB, Kl) => {
    function vb(e, t) {
      return function (r) {
        return e(t(r));
      };
    }
    Kl.exports = vb;
  });
  var Fo = u((zB, zl) => {
    var hb = Mo(),
      Eb = hb(Object.getPrototypeOf, Object);
    zl.exports = Eb;
  });
  var yt = u((YB, Yl) => {
    function gb(e) {
      return e != null && typeof e == "object";
    }
    Yl.exports = gb;
  });
  var Go = u((QB, $l) => {
    var _b = St(),
      yb = Fo(),
      mb = yt(),
      Ib = "[object Object]",
      Tb = Function.prototype,
      Ob = Object.prototype,
      Ql = Tb.toString,
      bb = Ob.hasOwnProperty,
      Ab = Ql.call(Object);
    function Sb(e) {
      if (!mb(e) || _b(e) != Ib) return !1;
      var t = yb(e);
      if (t === null) return !0;
      var r = bb.call(t, "constructor") && t.constructor;
      return typeof r == "function" && r instanceof r && Ql.call(r) == Ab;
    }
    $l.exports = Sb;
  });
  var Zl = u((Xo) => {
    "use strict";
    Object.defineProperty(Xo, "__esModule", { value: !0 });
    Xo.default = wb;
    function wb(e) {
      var t,
        r = e.Symbol;
      return (
        typeof r == "function"
          ? r.observable
            ? (t = r.observable)
            : ((t = r("observable")), (r.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var Jl = u((Wo, Vo) => {
    "use strict";
    Object.defineProperty(Wo, "__esModule", { value: !0 });
    var Rb = Zl(),
      Cb = Nb(Rb);
    function Nb(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var rr;
    typeof self < "u"
      ? (rr = self)
      : typeof window < "u"
      ? (rr = window)
      : typeof global < "u"
      ? (rr = global)
      : typeof Vo < "u"
      ? (rr = Vo)
      : (rr = Function("return this")());
    var xb = (0, Cb.default)(rr);
    Wo.default = xb;
  });
  var Uo = u((Gr) => {
    "use strict";
    Gr.__esModule = !0;
    Gr.ActionTypes = void 0;
    Gr.default = nf;
    var qb = Go(),
      Lb = rf(qb),
      Pb = Jl(),
      ef = rf(Pb);
    function rf(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var tf = (Gr.ActionTypes = { INIT: "@@redux/INIT" });
    function nf(e, t, r) {
      var n;
      if (
        (typeof t == "function" && typeof r > "u" && ((r = t), (t = void 0)),
        typeof r < "u")
      ) {
        if (typeof r != "function")
          throw new Error("Expected the enhancer to be a function.");
        return r(nf)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var i = e,
        o = t,
        a = [],
        s = a,
        c = !1;
      function f() {
        s === a && (s = a.slice());
      }
      function E() {
        return o;
      }
      function h(O) {
        if (typeof O != "function")
          throw new Error("Expected listener to be a function.");
        var G = !0;
        return (
          f(),
          s.push(O),
          function () {
            if (G) {
              (G = !1), f();
              var N = s.indexOf(O);
              s.splice(N, 1);
            }
          }
        );
      }
      function _(O) {
        if (!(0, Lb.default)(O))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (typeof O.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (c) throw new Error("Reducers may not dispatch actions.");
        try {
          (c = !0), (o = i(o, O));
        } finally {
          c = !1;
        }
        for (var G = (a = s), S = 0; S < G.length; S++) G[S]();
        return O;
      }
      function y(O) {
        if (typeof O != "function")
          throw new Error("Expected the nextReducer to be a function.");
        (i = O), _({ type: tf.INIT });
      }
      function A() {
        var O,
          G = h;
        return (
          (O = {
            subscribe: function (N) {
              if (typeof N != "object")
                throw new TypeError("Expected the observer to be an object.");
              function T() {
                N.next && N.next(E());
              }
              T();
              var D = G(T);
              return { unsubscribe: D };
            },
          }),
          (O[ef.default] = function () {
            return this;
          }),
          O
        );
      }
      return (
        _({ type: tf.INIT }),
        (n = { dispatch: _, subscribe: h, getState: E, replaceReducer: y }),
        (n[ef.default] = A),
        n
      );
    }
  });
  var ko = u((Bo) => {
    "use strict";
    Bo.__esModule = !0;
    Bo.default = Db;
    function Db(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var sf = u((Ho) => {
    "use strict";
    Ho.__esModule = !0;
    Ho.default = Vb;
    var of = Uo(),
      Mb = Go(),
      ek = af(Mb),
      Fb = ko(),
      tk = af(Fb);
    function af(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function Gb(e, t) {
      var r = t && t.type,
        n = (r && '"' + r.toString() + '"') || "an action";
      return (
        "Given action " +
        n +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function Xb(e) {
      Object.keys(e).forEach(function (t) {
        var r = e[t],
          n = r(void 0, { type: of.ActionTypes.INIT });
        if (typeof n > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        var i =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof r(void 0, { type: i }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                of.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
          );
      });
    }
    function Vb(e) {
      for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        typeof e[i] == "function" && (r[i] = e[i]);
      }
      var o = Object.keys(r);
      if (!1) var a;
      var s;
      try {
        Xb(r);
      } catch (c) {
        s = c;
      }
      return function () {
        var f =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          E = arguments[1];
        if (s) throw s;
        if (!1) var h;
        for (var _ = !1, y = {}, A = 0; A < o.length; A++) {
          var O = o[A],
            G = r[O],
            S = f[O],
            N = G(S, E);
          if (typeof N > "u") {
            var T = Gb(O, E);
            throw new Error(T);
          }
          (y[O] = N), (_ = _ || N !== S);
        }
        return _ ? y : f;
      };
    }
  });
  var cf = u((jo) => {
    "use strict";
    jo.__esModule = !0;
    jo.default = Wb;
    function uf(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function Wb(e, t) {
      if (typeof e == "function") return uf(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var r = Object.keys(e), n = {}, i = 0; i < r.length; i++) {
        var o = r[i],
          a = e[o];
        typeof a == "function" && (n[o] = uf(a, t));
      }
      return n;
    }
  });
  var zo = u((Ko) => {
    "use strict";
    Ko.__esModule = !0;
    Ko.default = Ub;
    function Ub() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      if (t.length === 0)
        return function (o) {
          return o;
        };
      if (t.length === 1) return t[0];
      var n = t[t.length - 1],
        i = t.slice(0, -1);
      return function () {
        return i.reduceRight(function (o, a) {
          return a(o);
        }, n.apply(void 0, arguments));
      };
    }
  });
  var lf = u((Yo) => {
    "use strict";
    Yo.__esModule = !0;
    var Bb =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      };
    Yo.default = Kb;
    var kb = zo(),
      Hb = jb(kb);
    function jb(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function Kb() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      return function (n) {
        return function (i, o, a) {
          var s = n(i, o, a),
            c = s.dispatch,
            f = [],
            E = {
              getState: s.getState,
              dispatch: function (_) {
                return c(_);
              },
            };
          return (
            (f = t.map(function (h) {
              return h(E);
            })),
            (c = Hb.default.apply(void 0, f)(s.dispatch)),
            Bb({}, s, { dispatch: c })
          );
        };
      };
    }
  });
  var Qo = u((je) => {
    "use strict";
    je.__esModule = !0;
    je.compose =
      je.applyMiddleware =
      je.bindActionCreators =
      je.combineReducers =
      je.createStore =
        void 0;
    var zb = Uo(),
      Yb = nr(zb),
      Qb = sf(),
      $b = nr(Qb),
      Zb = cf(),
      Jb = nr(Zb),
      eA = lf(),
      tA = nr(eA),
      rA = zo(),
      nA = nr(rA),
      iA = ko(),
      ak = nr(iA);
    function nr(e) {
      return e && e.__esModule ? e : { default: e };
    }
    je.createStore = Yb.default;
    je.combineReducers = $b.default;
    je.bindActionCreators = Jb.default;
    je.applyMiddleware = tA.default;
    je.compose = nA.default;
  });
  var ff = u((Ce) => {
    "use strict";
    Object.defineProperty(Ce, "__esModule", { value: !0 });
    Ce.QuickEffectIds =
      Ce.QuickEffectDirectionConsts =
      Ce.EventTypeConsts =
      Ce.EventLimitAffectedElements =
      Ce.EventContinuousMouseAxes =
      Ce.EventBasedOn =
      Ce.EventAppliesTo =
        void 0;
    var oA = {
      NAVBAR_OPEN: "NAVBAR_OPEN",
      NAVBAR_CLOSE: "NAVBAR_CLOSE",
      TAB_ACTIVE: "TAB_ACTIVE",
      TAB_INACTIVE: "TAB_INACTIVE",
      SLIDER_ACTIVE: "SLIDER_ACTIVE",
      SLIDER_INACTIVE: "SLIDER_INACTIVE",
      DROPDOWN_OPEN: "DROPDOWN_OPEN",
      DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
      MOUSE_CLICK: "MOUSE_CLICK",
      MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
      MOUSE_DOWN: "MOUSE_DOWN",
      MOUSE_UP: "MOUSE_UP",
      MOUSE_OVER: "MOUSE_OVER",
      MOUSE_OUT: "MOUSE_OUT",
      MOUSE_MOVE: "MOUSE_MOVE",
      MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
      SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
      SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
      SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
      ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
      ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
      PAGE_START: "PAGE_START",
      PAGE_FINISH: "PAGE_FINISH",
      PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
      PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
      PAGE_SCROLL: "PAGE_SCROLL",
    };
    Ce.EventTypeConsts = oA;
    var aA = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" };
    Ce.EventAppliesTo = aA;
    var sA = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" };
    Ce.EventBasedOn = sA;
    var uA = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" };
    Ce.EventContinuousMouseAxes = uA;
    var cA = {
      CHILDREN: "CHILDREN",
      SIBLINGS: "SIBLINGS",
      IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
    };
    Ce.EventLimitAffectedElements = cA;
    var lA = {
      FADE_EFFECT: "FADE_EFFECT",
      SLIDE_EFFECT: "SLIDE_EFFECT",
      GROW_EFFECT: "GROW_EFFECT",
      SHRINK_EFFECT: "SHRINK_EFFECT",
      SPIN_EFFECT: "SPIN_EFFECT",
      FLY_EFFECT: "FLY_EFFECT",
      POP_EFFECT: "POP_EFFECT",
      FLIP_EFFECT: "FLIP_EFFECT",
      JIGGLE_EFFECT: "JIGGLE_EFFECT",
      PULSE_EFFECT: "PULSE_EFFECT",
      DROP_EFFECT: "DROP_EFFECT",
      BLINK_EFFECT: "BLINK_EFFECT",
      BOUNCE_EFFECT: "BOUNCE_EFFECT",
      FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
      FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
      RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
      JELLO_EFFECT: "JELLO_EFFECT",
      GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
      SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
      PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
    };
    Ce.QuickEffectIds = lA;
    var fA = {
      LEFT: "LEFT",
      RIGHT: "RIGHT",
      BOTTOM: "BOTTOM",
      TOP: "TOP",
      BOTTOM_LEFT: "BOTTOM_LEFT",
      BOTTOM_RIGHT: "BOTTOM_RIGHT",
      TOP_RIGHT: "TOP_RIGHT",
      TOP_LEFT: "TOP_LEFT",
      CLOCKWISE: "CLOCKWISE",
      COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
    };
    Ce.QuickEffectDirectionConsts = fA;
  });
  var $o = u((ir) => {
    "use strict";
    Object.defineProperty(ir, "__esModule", { value: !0 });
    ir.ActionTypeConsts = ir.ActionAppliesTo = void 0;
    var dA = {
      TRANSFORM_MOVE: "TRANSFORM_MOVE",
      TRANSFORM_SCALE: "TRANSFORM_SCALE",
      TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
      TRANSFORM_SKEW: "TRANSFORM_SKEW",
      STYLE_OPACITY: "STYLE_OPACITY",
      STYLE_SIZE: "STYLE_SIZE",
      STYLE_FILTER: "STYLE_FILTER",
      STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
      STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
      STYLE_BORDER: "STYLE_BORDER",
      STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
      PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
      GENERAL_DISPLAY: "GENERAL_DISPLAY",
      GENERAL_START_ACTION: "GENERAL_START_ACTION",
      GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
      GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
      GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
      GENERAL_LOOP: "GENERAL_LOOP",
      STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
    };
    ir.ActionTypeConsts = dA;
    var pA = {
      ELEMENT: "ELEMENT",
      ELEMENT_CLASS: "ELEMENT_CLASS",
      TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
    };
    ir.ActionAppliesTo = pA;
  });
  var df = u((Cn) => {
    "use strict";
    Object.defineProperty(Cn, "__esModule", { value: !0 });
    Cn.InteractionTypeConsts = void 0;
    var vA = {
      MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
      MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
      MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
      SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
      SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
      MOUSE_MOVE_IN_VIEWPORT_INTERACTION: "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
      PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
      PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
      PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
      NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
      DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
      ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
      TAB_INTERACTION: "TAB_INTERACTION",
      SLIDER_INTERACTION: "SLIDER_INTERACTION",
    };
    Cn.InteractionTypeConsts = vA;
  });
  var pf = u((Nn) => {
    "use strict";
    Object.defineProperty(Nn, "__esModule", { value: !0 });
    Nn.ReducedMotionTypes = void 0;
    var hA = $o(),
      {
        TRANSFORM_MOVE: EA,
        TRANSFORM_SCALE: gA,
        TRANSFORM_ROTATE: _A,
        TRANSFORM_SKEW: yA,
        STYLE_SIZE: mA,
        STYLE_FILTER: IA,
        STYLE_FONT_VARIATION: TA,
      } = hA.ActionTypeConsts,
      OA = {
        [EA]: !0,
        [gA]: !0,
        [_A]: !0,
        [yA]: !0,
        [mA]: !0,
        [IA]: !0,
        [TA]: !0,
      };
    Nn.ReducedMotionTypes = OA;
  });
  var vf = u((ie) => {
    "use strict";
    Object.defineProperty(ie, "__esModule", { value: !0 });
    ie.IX2_VIEWPORT_WIDTH_CHANGED =
      ie.IX2_TEST_FRAME_RENDERED =
      ie.IX2_STOP_REQUESTED =
      ie.IX2_SESSION_STOPPED =
      ie.IX2_SESSION_STARTED =
      ie.IX2_SESSION_INITIALIZED =
      ie.IX2_RAW_DATA_IMPORTED =
      ie.IX2_PREVIEW_REQUESTED =
      ie.IX2_PLAYBACK_REQUESTED =
      ie.IX2_PARAMETER_CHANGED =
      ie.IX2_MEDIA_QUERIES_DEFINED =
      ie.IX2_INSTANCE_STARTED =
      ie.IX2_INSTANCE_REMOVED =
      ie.IX2_INSTANCE_ADDED =
      ie.IX2_EVENT_STATE_CHANGED =
      ie.IX2_EVENT_LISTENER_ADDED =
      ie.IX2_ELEMENT_STATE_CHANGED =
      ie.IX2_CLEAR_REQUESTED =
      ie.IX2_ANIMATION_FRAME_CHANGED =
      ie.IX2_ACTION_LIST_PLAYBACK_CHANGED =
        void 0;
    var bA = "IX2_RAW_DATA_IMPORTED";
    ie.IX2_RAW_DATA_IMPORTED = bA;
    var AA = "IX2_SESSION_INITIALIZED";
    ie.IX2_SESSION_INITIALIZED = AA;
    var SA = "IX2_SESSION_STARTED";
    ie.IX2_SESSION_STARTED = SA;
    var wA = "IX2_SESSION_STOPPED";
    ie.IX2_SESSION_STOPPED = wA;
    var RA = "IX2_PREVIEW_REQUESTED";
    ie.IX2_PREVIEW_REQUESTED = RA;
    var CA = "IX2_PLAYBACK_REQUESTED";
    ie.IX2_PLAYBACK_REQUESTED = CA;
    var NA = "IX2_STOP_REQUESTED";
    ie.IX2_STOP_REQUESTED = NA;
    var xA = "IX2_CLEAR_REQUESTED";
    ie.IX2_CLEAR_REQUESTED = xA;
    var qA = "IX2_EVENT_LISTENER_ADDED";
    ie.IX2_EVENT_LISTENER_ADDED = qA;
    var LA = "IX2_EVENT_STATE_CHANGED";
    ie.IX2_EVENT_STATE_CHANGED = LA;
    var PA = "IX2_ANIMATION_FRAME_CHANGED";
    ie.IX2_ANIMATION_FRAME_CHANGED = PA;
    var DA = "IX2_PARAMETER_CHANGED";
    ie.IX2_PARAMETER_CHANGED = DA;
    var MA = "IX2_INSTANCE_ADDED";
    ie.IX2_INSTANCE_ADDED = MA;
    var FA = "IX2_INSTANCE_STARTED";
    ie.IX2_INSTANCE_STARTED = FA;
    var GA = "IX2_INSTANCE_REMOVED";
    ie.IX2_INSTANCE_REMOVED = GA;
    var XA = "IX2_ELEMENT_STATE_CHANGED";
    ie.IX2_ELEMENT_STATE_CHANGED = XA;
    var VA = "IX2_ACTION_LIST_PLAYBACK_CHANGED";
    ie.IX2_ACTION_LIST_PLAYBACK_CHANGED = VA;
    var WA = "IX2_VIEWPORT_WIDTH_CHANGED";
    ie.IX2_VIEWPORT_WIDTH_CHANGED = WA;
    var UA = "IX2_MEDIA_QUERIES_DEFINED";
    ie.IX2_MEDIA_QUERIES_DEFINED = UA;
    var BA = "IX2_TEST_FRAME_RENDERED";
    ie.IX2_TEST_FRAME_RENDERED = BA;
  });
  var hf = u((x) => {
    "use strict";
    Object.defineProperty(x, "__esModule", { value: !0 });
    x.W_MOD_JS =
      x.W_MOD_IX =
      x.WILL_CHANGE =
      x.WIDTH =
      x.WF_PAGE =
      x.TRANSLATE_Z =
      x.TRANSLATE_Y =
      x.TRANSLATE_X =
      x.TRANSLATE_3D =
      x.TRANSFORM =
      x.SKEW_Y =
      x.SKEW_X =
      x.SKEW =
      x.SIBLINGS =
      x.SCALE_Z =
      x.SCALE_Y =
      x.SCALE_X =
      x.SCALE_3D =
      x.ROTATE_Z =
      x.ROTATE_Y =
      x.ROTATE_X =
      x.RENDER_TRANSFORM =
      x.RENDER_STYLE =
      x.RENDER_PLUGIN =
      x.RENDER_GENERAL =
      x.PRESERVE_3D =
      x.PLAIN_OBJECT =
      x.PARENT =
      x.OPACITY =
      x.IX2_ID_DELIMITER =
      x.IMMEDIATE_CHILDREN =
      x.HTML_ELEMENT =
      x.HEIGHT =
      x.FONT_VARIATION_SETTINGS =
      x.FLEX =
      x.FILTER =
      x.DISPLAY =
      x.CONFIG_Z_VALUE =
      x.CONFIG_Z_UNIT =
      x.CONFIG_Y_VALUE =
      x.CONFIG_Y_UNIT =
      x.CONFIG_X_VALUE =
      x.CONFIG_X_UNIT =
      x.CONFIG_VALUE =
      x.CONFIG_UNIT =
      x.COMMA_DELIMITER =
      x.COLOR =
      x.COLON_DELIMITER =
      x.CHILDREN =
      x.BOUNDARY_SELECTOR =
      x.BORDER_COLOR =
      x.BAR_DELIMITER =
      x.BACKGROUND_COLOR =
      x.BACKGROUND =
      x.AUTO =
      x.ABSTRACT_NODE =
        void 0;
    var kA = "|";
    x.IX2_ID_DELIMITER = kA;
    var HA = "data-wf-page";
    x.WF_PAGE = HA;
    var jA = "w-mod-js";
    x.W_MOD_JS = jA;
    var KA = "w-mod-ix";
    x.W_MOD_IX = KA;
    var zA = ".w-dyn-item";
    x.BOUNDARY_SELECTOR = zA;
    var YA = "xValue";
    x.CONFIG_X_VALUE = YA;
    var QA = "yValue";
    x.CONFIG_Y_VALUE = QA;
    var $A = "zValue";
    x.CONFIG_Z_VALUE = $A;
    var ZA = "value";
    x.CONFIG_VALUE = ZA;
    var JA = "xUnit";
    x.CONFIG_X_UNIT = JA;
    var eS = "yUnit";
    x.CONFIG_Y_UNIT = eS;
    var tS = "zUnit";
    x.CONFIG_Z_UNIT = tS;
    var rS = "unit";
    x.CONFIG_UNIT = rS;
    var nS = "transform";
    x.TRANSFORM = nS;
    var iS = "translateX";
    x.TRANSLATE_X = iS;
    var oS = "translateY";
    x.TRANSLATE_Y = oS;
    var aS = "translateZ";
    x.TRANSLATE_Z = aS;
    var sS = "translate3d";
    x.TRANSLATE_3D = sS;
    var uS = "scaleX";
    x.SCALE_X = uS;
    var cS = "scaleY";
    x.SCALE_Y = cS;
    var lS = "scaleZ";
    x.SCALE_Z = lS;
    var fS = "scale3d";
    x.SCALE_3D = fS;
    var dS = "rotateX";
    x.ROTATE_X = dS;
    var pS = "rotateY";
    x.ROTATE_Y = pS;
    var vS = "rotateZ";
    x.ROTATE_Z = vS;
    var hS = "skew";
    x.SKEW = hS;
    var ES = "skewX";
    x.SKEW_X = ES;
    var gS = "skewY";
    x.SKEW_Y = gS;
    var _S = "opacity";
    x.OPACITY = _S;
    var yS = "filter";
    x.FILTER = yS;
    var mS = "font-variation-settings";
    x.FONT_VARIATION_SETTINGS = mS;
    var IS = "width";
    x.WIDTH = IS;
    var TS = "height";
    x.HEIGHT = TS;
    var OS = "backgroundColor";
    x.BACKGROUND_COLOR = OS;
    var bS = "background";
    x.BACKGROUND = bS;
    var AS = "borderColor";
    x.BORDER_COLOR = AS;
    var SS = "color";
    x.COLOR = SS;
    var wS = "display";
    x.DISPLAY = wS;
    var RS = "flex";
    x.FLEX = RS;
    var CS = "willChange";
    x.WILL_CHANGE = CS;
    var NS = "AUTO";
    x.AUTO = NS;
    var xS = ",";
    x.COMMA_DELIMITER = xS;
    var qS = ":";
    x.COLON_DELIMITER = qS;
    var LS = "|";
    x.BAR_DELIMITER = LS;
    var PS = "CHILDREN";
    x.CHILDREN = PS;
    var DS = "IMMEDIATE_CHILDREN";
    x.IMMEDIATE_CHILDREN = DS;
    var MS = "SIBLINGS";
    x.SIBLINGS = MS;
    var FS = "PARENT";
    x.PARENT = FS;
    var GS = "preserve-3d";
    x.PRESERVE_3D = GS;
    var XS = "HTML_ELEMENT";
    x.HTML_ELEMENT = XS;
    var VS = "PLAIN_OBJECT";
    x.PLAIN_OBJECT = VS;
    var WS = "ABSTRACT_NODE";
    x.ABSTRACT_NODE = WS;
    var US = "RENDER_TRANSFORM";
    x.RENDER_TRANSFORM = US;
    var BS = "RENDER_GENERAL";
    x.RENDER_GENERAL = BS;
    var kS = "RENDER_STYLE";
    x.RENDER_STYLE = kS;
    var HS = "RENDER_PLUGIN";
    x.RENDER_PLUGIN = HS;
  });
  var Ue = u((Se) => {
    "use strict";
    var Ef = $t().default;
    Object.defineProperty(Se, "__esModule", { value: !0 });
    var xn = { IX2EngineActionTypes: !0, IX2EngineConstants: !0 };
    Se.IX2EngineConstants = Se.IX2EngineActionTypes = void 0;
    var Zo = ff();
    Object.keys(Zo).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(xn, e) ||
        (e in Se && Se[e] === Zo[e]) ||
        Object.defineProperty(Se, e, {
          enumerable: !0,
          get: function () {
            return Zo[e];
          },
        });
    });
    var Jo = $o();
    Object.keys(Jo).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(xn, e) ||
        (e in Se && Se[e] === Jo[e]) ||
        Object.defineProperty(Se, e, {
          enumerable: !0,
          get: function () {
            return Jo[e];
          },
        });
    });
    var ea = df();
    Object.keys(ea).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(xn, e) ||
        (e in Se && Se[e] === ea[e]) ||
        Object.defineProperty(Se, e, {
          enumerable: !0,
          get: function () {
            return ea[e];
          },
        });
    });
    var ta = pf();
    Object.keys(ta).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(xn, e) ||
        (e in Se && Se[e] === ta[e]) ||
        Object.defineProperty(Se, e, {
          enumerable: !0,
          get: function () {
            return ta[e];
          },
        });
    });
    var jS = Ef(vf());
    Se.IX2EngineActionTypes = jS;
    var KS = Ef(hf());
    Se.IX2EngineConstants = KS;
  });
  var gf = u((qn) => {
    "use strict";
    Object.defineProperty(qn, "__esModule", { value: !0 });
    qn.ixData = void 0;
    var zS = Ue(),
      { IX2_RAW_DATA_IMPORTED: YS } = zS.IX2EngineActionTypes,
      QS = (e = Object.freeze({}), t) => {
        switch (t.type) {
          case YS:
            return t.payload.ixData || Object.freeze({});
          default:
            return e;
        }
      };
    qn.ixData = QS;
  });
  var Xr = u((Ek, mt) => {
    function ra() {
      return (
        (mt.exports = ra =
          Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var r = arguments[t];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                }
                return e;
              }),
        (mt.exports.__esModule = !0),
        (mt.exports.default = mt.exports),
        ra.apply(this, arguments)
      );
    }
    (mt.exports = ra),
      (mt.exports.__esModule = !0),
      (mt.exports.default = mt.exports);
  });
  var or = u((Ie) => {
    "use strict";
    Object.defineProperty(Ie, "__esModule", { value: !0 });
    var $S =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    Ie.clone = Pn;
    Ie.addLast = mf;
    Ie.addFirst = If;
    Ie.removeLast = Tf;
    Ie.removeFirst = Of;
    Ie.insert = bf;
    Ie.removeAt = Af;
    Ie.replaceAt = Sf;
    Ie.getIn = Dn;
    Ie.set = Mn;
    Ie.setIn = Fn;
    Ie.update = Rf;
    Ie.updateIn = Cf;
    Ie.merge = Nf;
    Ie.mergeDeep = xf;
    Ie.mergeIn = qf;
    Ie.omit = Lf;
    Ie.addDefaults = Pf;
    var _f = "INVALID_ARGS";
    function yf(e) {
      throw new Error(e);
    }
    function na(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var ZS = {}.hasOwnProperty;
    function Pn(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = na(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        r[i] = e[i];
      }
      return r;
    }
    function Be(e, t, r) {
      var n = r;
      n == null && yf(_f);
      for (
        var i = !1, o = arguments.length, a = Array(o > 3 ? o - 3 : 0), s = 3;
        s < o;
        s++
      )
        a[s - 3] = arguments[s];
      for (var c = 0; c < a.length; c++) {
        var f = a[c];
        if (f != null) {
          var E = na(f);
          if (E.length)
            for (var h = 0; h <= E.length; h++) {
              var _ = E[h];
              if (!(e && n[_] !== void 0)) {
                var y = f[_];
                t && Ln(n[_]) && Ln(y) && (y = Be(e, t, n[_], y)),
                  !(y === void 0 || y === n[_]) &&
                    (i || ((i = !0), (n = Pn(n))), (n[_] = y));
              }
            }
        }
      }
      return n;
    }
    function Ln(e) {
      var t = typeof e > "u" ? "undefined" : $S(e);
      return e != null && (t === "object" || t === "function");
    }
    function mf(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function If(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function Tf(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function Of(e) {
      return e.length ? e.slice(1) : e;
    }
    function bf(e, t, r) {
      return e
        .slice(0, t)
        .concat(Array.isArray(r) ? r : [r])
        .concat(e.slice(t));
    }
    function Af(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function Sf(e, t, r) {
      if (e[t] === r) return e;
      for (var n = e.length, i = Array(n), o = 0; o < n; o++) i[o] = e[o];
      return (i[t] = r), i;
    }
    function Dn(e, t) {
      if ((!Array.isArray(t) && yf(_f), e != null)) {
        for (var r = e, n = 0; n < t.length; n++) {
          var i = t[n];
          if (((r = r?.[i]), r === void 0)) return r;
        }
        return r;
      }
    }
    function Mn(e, t, r) {
      var n = typeof t == "number" ? [] : {},
        i = e ?? n;
      if (i[t] === r) return i;
      var o = Pn(i);
      return (o[t] = r), o;
    }
    function wf(e, t, r, n) {
      var i = void 0,
        o = t[n];
      if (n === t.length - 1) i = r;
      else {
        var a =
          Ln(e) && Ln(e[o]) ? e[o] : typeof t[n + 1] == "number" ? [] : {};
        i = wf(a, t, r, n + 1);
      }
      return Mn(e, o, i);
    }
    function Fn(e, t, r) {
      return t.length ? wf(e, t, r, 0) : r;
    }
    function Rf(e, t, r) {
      var n = e?.[t],
        i = r(n);
      return Mn(e, t, i);
    }
    function Cf(e, t, r) {
      var n = Dn(e, t),
        i = r(n);
      return Fn(e, t, i);
    }
    function Nf(e, t, r, n, i, o) {
      for (
        var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), c = 6;
        c < a;
        c++
      )
        s[c - 6] = arguments[c];
      return s.length
        ? Be.call.apply(Be, [null, !1, !1, e, t, r, n, i, o].concat(s))
        : Be(!1, !1, e, t, r, n, i, o);
    }
    function xf(e, t, r, n, i, o) {
      for (
        var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), c = 6;
        c < a;
        c++
      )
        s[c - 6] = arguments[c];
      return s.length
        ? Be.call.apply(Be, [null, !1, !0, e, t, r, n, i, o].concat(s))
        : Be(!1, !0, e, t, r, n, i, o);
    }
    function qf(e, t, r, n, i, o, a) {
      var s = Dn(e, t);
      s == null && (s = {});
      for (
        var c = void 0,
          f = arguments.length,
          E = Array(f > 7 ? f - 7 : 0),
          h = 7;
        h < f;
        h++
      )
        E[h - 7] = arguments[h];
      return (
        E.length
          ? (c = Be.call.apply(Be, [null, !1, !1, s, r, n, i, o, a].concat(E)))
          : (c = Be(!1, !1, s, r, n, i, o, a)),
        Fn(e, t, c)
      );
    }
    function Lf(e, t) {
      for (var r = Array.isArray(t) ? t : [t], n = !1, i = 0; i < r.length; i++)
        if (ZS.call(e, r[i])) {
          n = !0;
          break;
        }
      if (!n) return e;
      for (var o = {}, a = na(e), s = 0; s < a.length; s++) {
        var c = a[s];
        r.indexOf(c) >= 0 || (o[c] = e[c]);
      }
      return o;
    }
    function Pf(e, t, r, n, i, o) {
      for (
        var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), c = 6;
        c < a;
        c++
      )
        s[c - 6] = arguments[c];
      return s.length
        ? Be.call.apply(Be, [null, !0, !1, e, t, r, n, i, o].concat(s))
        : Be(!0, !1, e, t, r, n, i, o);
    }
    var JS = {
      clone: Pn,
      addLast: mf,
      addFirst: If,
      removeLast: Tf,
      removeFirst: Of,
      insert: bf,
      removeAt: Af,
      replaceAt: Sf,
      getIn: Dn,
      set: Mn,
      setIn: Fn,
      update: Rf,
      updateIn: Cf,
      merge: Nf,
      mergeDeep: xf,
      mergeIn: qf,
      omit: Lf,
      addDefaults: Pf,
    };
    Ie.default = JS;
  });
  var Mf = u((Gn) => {
    "use strict";
    var e0 = ut().default;
    Object.defineProperty(Gn, "__esModule", { value: !0 });
    Gn.ixRequest = void 0;
    var t0 = e0(Xr()),
      r0 = Ue(),
      n0 = or(),
      {
        IX2_PREVIEW_REQUESTED: i0,
        IX2_PLAYBACK_REQUESTED: o0,
        IX2_STOP_REQUESTED: a0,
        IX2_CLEAR_REQUESTED: s0,
      } = r0.IX2EngineActionTypes,
      u0 = { preview: {}, playback: {}, stop: {}, clear: {} },
      Df = Object.create(null, {
        [i0]: { value: "preview" },
        [o0]: { value: "playback" },
        [a0]: { value: "stop" },
        [s0]: { value: "clear" },
      }),
      c0 = (e = u0, t) => {
        if (t.type in Df) {
          let r = [Df[t.type]];
          return (0, n0.setIn)(e, [r], (0, t0.default)({}, t.payload));
        }
        return e;
      };
    Gn.ixRequest = c0;
  });
  var Gf = u((Xn) => {
    "use strict";
    Object.defineProperty(Xn, "__esModule", { value: !0 });
    Xn.ixSession = void 0;
    var l0 = Ue(),
      lt = or(),
      {
        IX2_SESSION_INITIALIZED: f0,
        IX2_SESSION_STARTED: d0,
        IX2_TEST_FRAME_RENDERED: p0,
        IX2_SESSION_STOPPED: v0,
        IX2_EVENT_LISTENER_ADDED: h0,
        IX2_EVENT_STATE_CHANGED: E0,
        IX2_ANIMATION_FRAME_CHANGED: g0,
        IX2_ACTION_LIST_PLAYBACK_CHANGED: _0,
        IX2_VIEWPORT_WIDTH_CHANGED: y0,
        IX2_MEDIA_QUERIES_DEFINED: m0,
      } = l0.IX2EngineActionTypes,
      Ff = {
        active: !1,
        tick: 0,
        eventListeners: [],
        eventState: {},
        playbackState: {},
        viewportWidth: 0,
        mediaQueryKey: null,
        hasBoundaryNodes: !1,
        hasDefinedMediaQueries: !1,
        reducedMotion: !1,
      },
      I0 = 20,
      T0 = (e = Ff, t) => {
        switch (t.type) {
          case f0: {
            let { hasBoundaryNodes: r, reducedMotion: n } = t.payload;
            return (0, lt.merge)(e, { hasBoundaryNodes: r, reducedMotion: n });
          }
          case d0:
            return (0, lt.set)(e, "active", !0);
          case p0: {
            let {
              payload: { step: r = I0 },
            } = t;
            return (0, lt.set)(e, "tick", e.tick + r);
          }
          case v0:
            return Ff;
          case g0: {
            let {
              payload: { now: r },
            } = t;
            return (0, lt.set)(e, "tick", r);
          }
          case h0: {
            let r = (0, lt.addLast)(e.eventListeners, t.payload);
            return (0, lt.set)(e, "eventListeners", r);
          }
          case E0: {
            let { stateKey: r, newState: n } = t.payload;
            return (0, lt.setIn)(e, ["eventState", r], n);
          }
          case _0: {
            let { actionListId: r, isPlaying: n } = t.payload;
            return (0, lt.setIn)(e, ["playbackState", r], n);
          }
          case y0: {
            let { width: r, mediaQueries: n } = t.payload,
              i = n.length,
              o = null;
            for (let a = 0; a < i; a++) {
              let { key: s, min: c, max: f } = n[a];
              if (r >= c && r <= f) {
                o = s;
                break;
              }
            }
            return (0, lt.merge)(e, { viewportWidth: r, mediaQueryKey: o });
          }
          case m0:
            return (0, lt.set)(e, "hasDefinedMediaQueries", !0);
          default:
            return e;
        }
      };
    Xn.ixSession = T0;
  });
  var Vf = u((mk, Xf) => {
    function O0() {
      (this.__data__ = []), (this.size = 0);
    }
    Xf.exports = O0;
  });
  var Vn = u((Ik, Wf) => {
    function b0(e, t) {
      return e === t || (e !== e && t !== t);
    }
    Wf.exports = b0;
  });
  var Vr = u((Tk, Uf) => {
    var A0 = Vn();
    function S0(e, t) {
      for (var r = e.length; r--; ) if (A0(e[r][0], t)) return r;
      return -1;
    }
    Uf.exports = S0;
  });
  var kf = u((Ok, Bf) => {
    var w0 = Vr(),
      R0 = Array.prototype,
      C0 = R0.splice;
    function N0(e) {
      var t = this.__data__,
        r = w0(t, e);
      if (r < 0) return !1;
      var n = t.length - 1;
      return r == n ? t.pop() : C0.call(t, r, 1), --this.size, !0;
    }
    Bf.exports = N0;
  });
  var jf = u((bk, Hf) => {
    var x0 = Vr();
    function q0(e) {
      var t = this.__data__,
        r = x0(t, e);
      return r < 0 ? void 0 : t[r][1];
    }
    Hf.exports = q0;
  });
  var zf = u((Ak, Kf) => {
    var L0 = Vr();
    function P0(e) {
      return L0(this.__data__, e) > -1;
    }
    Kf.exports = P0;
  });
  var Qf = u((Sk, Yf) => {
    var D0 = Vr();
    function M0(e, t) {
      var r = this.__data__,
        n = D0(r, e);
      return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    Yf.exports = M0;
  });
  var Wr = u((wk, $f) => {
    var F0 = Vf(),
      G0 = kf(),
      X0 = jf(),
      V0 = zf(),
      W0 = Qf();
    function ar(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    ar.prototype.clear = F0;
    ar.prototype.delete = G0;
    ar.prototype.get = X0;
    ar.prototype.has = V0;
    ar.prototype.set = W0;
    $f.exports = ar;
  });
  var Jf = u((Rk, Zf) => {
    var U0 = Wr();
    function B0() {
      (this.__data__ = new U0()), (this.size = 0);
    }
    Zf.exports = B0;
  });
  var td = u((Ck, ed) => {
    function k0(e) {
      var t = this.__data__,
        r = t.delete(e);
      return (this.size = t.size), r;
    }
    ed.exports = k0;
  });
  var nd = u((Nk, rd) => {
    function H0(e) {
      return this.__data__.get(e);
    }
    rd.exports = H0;
  });
  var od = u((xk, id) => {
    function j0(e) {
      return this.__data__.has(e);
    }
    id.exports = j0;
  });
  var ft = u((qk, ad) => {
    function K0(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    ad.exports = K0;
  });
  var ia = u((Lk, sd) => {
    var z0 = St(),
      Y0 = ft(),
      Q0 = "[object AsyncFunction]",
      $0 = "[object Function]",
      Z0 = "[object GeneratorFunction]",
      J0 = "[object Proxy]";
    function ew(e) {
      if (!Y0(e)) return !1;
      var t = z0(e);
      return t == $0 || t == Z0 || t == Q0 || t == J0;
    }
    sd.exports = ew;
  });
  var cd = u((Pk, ud) => {
    var tw = tt(),
      rw = tw["__core-js_shared__"];
    ud.exports = rw;
  });
  var dd = u((Dk, fd) => {
    var oa = cd(),
      ld = (function () {
        var e = /[^.]+$/.exec((oa && oa.keys && oa.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function nw(e) {
      return !!ld && ld in e;
    }
    fd.exports = nw;
  });
  var aa = u((Mk, pd) => {
    var iw = Function.prototype,
      ow = iw.toString;
    function aw(e) {
      if (e != null) {
        try {
          return ow.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    pd.exports = aw;
  });
  var hd = u((Fk, vd) => {
    var sw = ia(),
      uw = dd(),
      cw = ft(),
      lw = aa(),
      fw = /[\\^$.*+?()[\]{}|]/g,
      dw = /^\[object .+?Constructor\]$/,
      pw = Function.prototype,
      vw = Object.prototype,
      hw = pw.toString,
      Ew = vw.hasOwnProperty,
      gw = RegExp(
        "^" +
          hw
            .call(Ew)
            .replace(fw, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function _w(e) {
      if (!cw(e) || uw(e)) return !1;
      var t = sw(e) ? gw : dw;
      return t.test(lw(e));
    }
    vd.exports = _w;
  });
  var gd = u((Gk, Ed) => {
    function yw(e, t) {
      return e?.[t];
    }
    Ed.exports = yw;
  });
  var wt = u((Xk, _d) => {
    var mw = hd(),
      Iw = gd();
    function Tw(e, t) {
      var r = Iw(e, t);
      return mw(r) ? r : void 0;
    }
    _d.exports = Tw;
  });
  var Wn = u((Vk, yd) => {
    var Ow = wt(),
      bw = tt(),
      Aw = Ow(bw, "Map");
    yd.exports = Aw;
  });
  var Ur = u((Wk, md) => {
    var Sw = wt(),
      ww = Sw(Object, "create");
    md.exports = ww;
  });
  var Od = u((Uk, Td) => {
    var Id = Ur();
    function Rw() {
      (this.__data__ = Id ? Id(null) : {}), (this.size = 0);
    }
    Td.exports = Rw;
  });
  var Ad = u((Bk, bd) => {
    function Cw(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    bd.exports = Cw;
  });
  var wd = u((kk, Sd) => {
    var Nw = Ur(),
      xw = "__lodash_hash_undefined__",
      qw = Object.prototype,
      Lw = qw.hasOwnProperty;
    function Pw(e) {
      var t = this.__data__;
      if (Nw) {
        var r = t[e];
        return r === xw ? void 0 : r;
      }
      return Lw.call(t, e) ? t[e] : void 0;
    }
    Sd.exports = Pw;
  });
  var Cd = u((Hk, Rd) => {
    var Dw = Ur(),
      Mw = Object.prototype,
      Fw = Mw.hasOwnProperty;
    function Gw(e) {
      var t = this.__data__;
      return Dw ? t[e] !== void 0 : Fw.call(t, e);
    }
    Rd.exports = Gw;
  });
  var xd = u((jk, Nd) => {
    var Xw = Ur(),
      Vw = "__lodash_hash_undefined__";
    function Ww(e, t) {
      var r = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (r[e] = Xw && t === void 0 ? Vw : t),
        this
      );
    }
    Nd.exports = Ww;
  });
  var Ld = u((Kk, qd) => {
    var Uw = Od(),
      Bw = Ad(),
      kw = wd(),
      Hw = Cd(),
      jw = xd();
    function sr(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    sr.prototype.clear = Uw;
    sr.prototype.delete = Bw;
    sr.prototype.get = kw;
    sr.prototype.has = Hw;
    sr.prototype.set = jw;
    qd.exports = sr;
  });
  var Md = u((zk, Dd) => {
    var Pd = Ld(),
      Kw = Wr(),
      zw = Wn();
    function Yw() {
      (this.size = 0),
        (this.__data__ = {
          hash: new Pd(),
          map: new (zw || Kw)(),
          string: new Pd(),
        });
    }
    Dd.exports = Yw;
  });
  var Gd = u((Yk, Fd) => {
    function Qw(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    Fd.exports = Qw;
  });
  var Br = u((Qk, Xd) => {
    var $w = Gd();
    function Zw(e, t) {
      var r = e.__data__;
      return $w(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    Xd.exports = Zw;
  });
  var Wd = u(($k, Vd) => {
    var Jw = Br();
    function eR(e) {
      var t = Jw(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    Vd.exports = eR;
  });
  var Bd = u((Zk, Ud) => {
    var tR = Br();
    function rR(e) {
      return tR(this, e).get(e);
    }
    Ud.exports = rR;
  });
  var Hd = u((Jk, kd) => {
    var nR = Br();
    function iR(e) {
      return nR(this, e).has(e);
    }
    kd.exports = iR;
  });
  var Kd = u((eH, jd) => {
    var oR = Br();
    function aR(e, t) {
      var r = oR(this, e),
        n = r.size;
      return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    jd.exports = aR;
  });
  var Un = u((tH, zd) => {
    var sR = Md(),
      uR = Wd(),
      cR = Bd(),
      lR = Hd(),
      fR = Kd();
    function ur(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    ur.prototype.clear = sR;
    ur.prototype.delete = uR;
    ur.prototype.get = cR;
    ur.prototype.has = lR;
    ur.prototype.set = fR;
    zd.exports = ur;
  });
  var Qd = u((rH, Yd) => {
    var dR = Wr(),
      pR = Wn(),
      vR = Un(),
      hR = 200;
    function ER(e, t) {
      var r = this.__data__;
      if (r instanceof dR) {
        var n = r.__data__;
        if (!pR || n.length < hR - 1)
          return n.push([e, t]), (this.size = ++r.size), this;
        r = this.__data__ = new vR(n);
      }
      return r.set(e, t), (this.size = r.size), this;
    }
    Yd.exports = ER;
  });
  var sa = u((nH, $d) => {
    var gR = Wr(),
      _R = Jf(),
      yR = td(),
      mR = nd(),
      IR = od(),
      TR = Qd();
    function cr(e) {
      var t = (this.__data__ = new gR(e));
      this.size = t.size;
    }
    cr.prototype.clear = _R;
    cr.prototype.delete = yR;
    cr.prototype.get = mR;
    cr.prototype.has = IR;
    cr.prototype.set = TR;
    $d.exports = cr;
  });
  var Jd = u((iH, Zd) => {
    var OR = "__lodash_hash_undefined__";
    function bR(e) {
      return this.__data__.set(e, OR), this;
    }
    Zd.exports = bR;
  });
  var tp = u((oH, ep) => {
    function AR(e) {
      return this.__data__.has(e);
    }
    ep.exports = AR;
  });
  var np = u((aH, rp) => {
    var SR = Un(),
      wR = Jd(),
      RR = tp();
    function Bn(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.__data__ = new SR(); ++t < r; ) this.add(e[t]);
    }
    Bn.prototype.add = Bn.prototype.push = wR;
    Bn.prototype.has = RR;
    rp.exports = Bn;
  });
  var op = u((sH, ip) => {
    function CR(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
        if (t(e[r], r, e)) return !0;
      return !1;
    }
    ip.exports = CR;
  });
  var sp = u((uH, ap) => {
    function NR(e, t) {
      return e.has(t);
    }
    ap.exports = NR;
  });
  var ua = u((cH, up) => {
    var xR = np(),
      qR = op(),
      LR = sp(),
      PR = 1,
      DR = 2;
    function MR(e, t, r, n, i, o) {
      var a = r & PR,
        s = e.length,
        c = t.length;
      if (s != c && !(a && c > s)) return !1;
      var f = o.get(e),
        E = o.get(t);
      if (f && E) return f == t && E == e;
      var h = -1,
        _ = !0,
        y = r & DR ? new xR() : void 0;
      for (o.set(e, t), o.set(t, e); ++h < s; ) {
        var A = e[h],
          O = t[h];
        if (n) var G = a ? n(O, A, h, t, e, o) : n(A, O, h, e, t, o);
        if (G !== void 0) {
          if (G) continue;
          _ = !1;
          break;
        }
        if (y) {
          if (
            !qR(t, function (S, N) {
              if (!LR(y, N) && (A === S || i(A, S, r, n, o))) return y.push(N);
            })
          ) {
            _ = !1;
            break;
          }
        } else if (!(A === O || i(A, O, r, n, o))) {
          _ = !1;
          break;
        }
      }
      return o.delete(e), o.delete(t), _;
    }
    up.exports = MR;
  });
  var lp = u((lH, cp) => {
    var FR = tt(),
      GR = FR.Uint8Array;
    cp.exports = GR;
  });
  var dp = u((fH, fp) => {
    function XR(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n, i) {
          r[++t] = [i, n];
        }),
        r
      );
    }
    fp.exports = XR;
  });
  var vp = u((dH, pp) => {
    function VR(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n) {
          r[++t] = n;
        }),
        r
      );
    }
    pp.exports = VR;
  });
  var yp = u((pH, _p) => {
    var hp = tr(),
      Ep = lp(),
      WR = Vn(),
      UR = ua(),
      BR = dp(),
      kR = vp(),
      HR = 1,
      jR = 2,
      KR = "[object Boolean]",
      zR = "[object Date]",
      YR = "[object Error]",
      QR = "[object Map]",
      $R = "[object Number]",
      ZR = "[object RegExp]",
      JR = "[object Set]",
      eC = "[object String]",
      tC = "[object Symbol]",
      rC = "[object ArrayBuffer]",
      nC = "[object DataView]",
      gp = hp ? hp.prototype : void 0,
      ca = gp ? gp.valueOf : void 0;
    function iC(e, t, r, n, i, o, a) {
      switch (r) {
        case nC:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          (e = e.buffer), (t = t.buffer);
        case rC:
          return !(e.byteLength != t.byteLength || !o(new Ep(e), new Ep(t)));
        case KR:
        case zR:
        case $R:
          return WR(+e, +t);
        case YR:
          return e.name == t.name && e.message == t.message;
        case ZR:
        case eC:
          return e == t + "";
        case QR:
          var s = BR;
        case JR:
          var c = n & HR;
          if ((s || (s = kR), e.size != t.size && !c)) return !1;
          var f = a.get(e);
          if (f) return f == t;
          (n |= jR), a.set(e, t);
          var E = UR(s(e), s(t), n, i, o, a);
          return a.delete(e), E;
        case tC:
          if (ca) return ca.call(e) == ca.call(t);
      }
      return !1;
    }
    _p.exports = iC;
  });
  var kn = u((vH, mp) => {
    function oC(e, t) {
      for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
      return e;
    }
    mp.exports = oC;
  });
  var Ne = u((hH, Ip) => {
    var aC = Array.isArray;
    Ip.exports = aC;
  });
  var la = u((EH, Tp) => {
    var sC = kn(),
      uC = Ne();
    function cC(e, t, r) {
      var n = t(e);
      return uC(e) ? n : sC(n, r(e));
    }
    Tp.exports = cC;
  });
  var bp = u((gH, Op) => {
    function lC(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
        var a = e[r];
        t(a, r, e) && (o[i++] = a);
      }
      return o;
    }
    Op.exports = lC;
  });
  var fa = u((_H, Ap) => {
    function fC() {
      return [];
    }
    Ap.exports = fC;
  });
  var da = u((yH, wp) => {
    var dC = bp(),
      pC = fa(),
      vC = Object.prototype,
      hC = vC.propertyIsEnumerable,
      Sp = Object.getOwnPropertySymbols,
      EC = Sp
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                dC(Sp(e), function (t) {
                  return hC.call(e, t);
                }));
          }
        : pC;
    wp.exports = EC;
  });
  var Cp = u((mH, Rp) => {
    function gC(e, t) {
      for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
      return n;
    }
    Rp.exports = gC;
  });
  var xp = u((IH, Np) => {
    var _C = St(),
      yC = yt(),
      mC = "[object Arguments]";
    function IC(e) {
      return yC(e) && _C(e) == mC;
    }
    Np.exports = IC;
  });
  var kr = u((TH, Pp) => {
    var qp = xp(),
      TC = yt(),
      Lp = Object.prototype,
      OC = Lp.hasOwnProperty,
      bC = Lp.propertyIsEnumerable,
      AC = qp(
        (function () {
          return arguments;
        })()
      )
        ? qp
        : function (e) {
            return TC(e) && OC.call(e, "callee") && !bC.call(e, "callee");
          };
    Pp.exports = AC;
  });
  var Mp = u((OH, Dp) => {
    function SC() {
      return !1;
    }
    Dp.exports = SC;
  });
  var Hn = u((Hr, lr) => {
    var wC = tt(),
      RC = Mp(),
      Xp = typeof Hr == "object" && Hr && !Hr.nodeType && Hr,
      Fp = Xp && typeof lr == "object" && lr && !lr.nodeType && lr,
      CC = Fp && Fp.exports === Xp,
      Gp = CC ? wC.Buffer : void 0,
      NC = Gp ? Gp.isBuffer : void 0,
      xC = NC || RC;
    lr.exports = xC;
  });
  var jn = u((bH, Vp) => {
    var qC = 9007199254740991,
      LC = /^(?:0|[1-9]\d*)$/;
    function PC(e, t) {
      var r = typeof e;
      return (
        (t = t ?? qC),
        !!t &&
          (r == "number" || (r != "symbol" && LC.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    Vp.exports = PC;
  });
  var Kn = u((AH, Wp) => {
    var DC = 9007199254740991;
    function MC(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= DC;
    }
    Wp.exports = MC;
  });
  var Bp = u((SH, Up) => {
    var FC = St(),
      GC = Kn(),
      XC = yt(),
      VC = "[object Arguments]",
      WC = "[object Array]",
      UC = "[object Boolean]",
      BC = "[object Date]",
      kC = "[object Error]",
      HC = "[object Function]",
      jC = "[object Map]",
      KC = "[object Number]",
      zC = "[object Object]",
      YC = "[object RegExp]",
      QC = "[object Set]",
      $C = "[object String]",
      ZC = "[object WeakMap]",
      JC = "[object ArrayBuffer]",
      eN = "[object DataView]",
      tN = "[object Float32Array]",
      rN = "[object Float64Array]",
      nN = "[object Int8Array]",
      iN = "[object Int16Array]",
      oN = "[object Int32Array]",
      aN = "[object Uint8Array]",
      sN = "[object Uint8ClampedArray]",
      uN = "[object Uint16Array]",
      cN = "[object Uint32Array]",
      Ee = {};
    Ee[tN] =
      Ee[rN] =
      Ee[nN] =
      Ee[iN] =
      Ee[oN] =
      Ee[aN] =
      Ee[sN] =
      Ee[uN] =
      Ee[cN] =
        !0;
    Ee[VC] =
      Ee[WC] =
      Ee[JC] =
      Ee[UC] =
      Ee[eN] =
      Ee[BC] =
      Ee[kC] =
      Ee[HC] =
      Ee[jC] =
      Ee[KC] =
      Ee[zC] =
      Ee[YC] =
      Ee[QC] =
      Ee[$C] =
      Ee[ZC] =
        !1;
    function lN(e) {
      return XC(e) && GC(e.length) && !!Ee[FC(e)];
    }
    Up.exports = lN;
  });
  var Hp = u((wH, kp) => {
    function fN(e) {
      return function (t) {
        return e(t);
      };
    }
    kp.exports = fN;
  });
  var Kp = u((jr, fr) => {
    var dN = Do(),
      jp = typeof jr == "object" && jr && !jr.nodeType && jr,
      Kr = jp && typeof fr == "object" && fr && !fr.nodeType && fr,
      pN = Kr && Kr.exports === jp,
      pa = pN && dN.process,
      vN = (function () {
        try {
          var e = Kr && Kr.require && Kr.require("util").types;
          return e || (pa && pa.binding && pa.binding("util"));
        } catch {}
      })();
    fr.exports = vN;
  });
  var zn = u((RH, Qp) => {
    var hN = Bp(),
      EN = Hp(),
      zp = Kp(),
      Yp = zp && zp.isTypedArray,
      gN = Yp ? EN(Yp) : hN;
    Qp.exports = gN;
  });
  var va = u((CH, $p) => {
    var _N = Cp(),
      yN = kr(),
      mN = Ne(),
      IN = Hn(),
      TN = jn(),
      ON = zn(),
      bN = Object.prototype,
      AN = bN.hasOwnProperty;
    function SN(e, t) {
      var r = mN(e),
        n = !r && yN(e),
        i = !r && !n && IN(e),
        o = !r && !n && !i && ON(e),
        a = r || n || i || o,
        s = a ? _N(e.length, String) : [],
        c = s.length;
      for (var f in e)
        (t || AN.call(e, f)) &&
          !(
            a &&
            (f == "length" ||
              (i && (f == "offset" || f == "parent")) ||
              (o &&
                (f == "buffer" || f == "byteLength" || f == "byteOffset")) ||
              TN(f, c))
          ) &&
          s.push(f);
      return s;
    }
    $p.exports = SN;
  });
  var Yn = u((NH, Zp) => {
    var wN = Object.prototype;
    function RN(e) {
      var t = e && e.constructor,
        r = (typeof t == "function" && t.prototype) || wN;
      return e === r;
    }
    Zp.exports = RN;
  });
  var ev = u((xH, Jp) => {
    var CN = Mo(),
      NN = CN(Object.keys, Object);
    Jp.exports = NN;
  });
  var Qn = u((qH, tv) => {
    var xN = Yn(),
      qN = ev(),
      LN = Object.prototype,
      PN = LN.hasOwnProperty;
    function DN(e) {
      if (!xN(e)) return qN(e);
      var t = [];
      for (var r in Object(e)) PN.call(e, r) && r != "constructor" && t.push(r);
      return t;
    }
    tv.exports = DN;
  });
  var Vt = u((LH, rv) => {
    var MN = ia(),
      FN = Kn();
    function GN(e) {
      return e != null && FN(e.length) && !MN(e);
    }
    rv.exports = GN;
  });
  var zr = u((PH, nv) => {
    var XN = va(),
      VN = Qn(),
      WN = Vt();
    function UN(e) {
      return WN(e) ? XN(e) : VN(e);
    }
    nv.exports = UN;
  });
  var ov = u((DH, iv) => {
    var BN = la(),
      kN = da(),
      HN = zr();
    function jN(e) {
      return BN(e, HN, kN);
    }
    iv.exports = jN;
  });
  var uv = u((MH, sv) => {
    var av = ov(),
      KN = 1,
      zN = Object.prototype,
      YN = zN.hasOwnProperty;
    function QN(e, t, r, n, i, o) {
      var a = r & KN,
        s = av(e),
        c = s.length,
        f = av(t),
        E = f.length;
      if (c != E && !a) return !1;
      for (var h = c; h--; ) {
        var _ = s[h];
        if (!(a ? _ in t : YN.call(t, _))) return !1;
      }
      var y = o.get(e),
        A = o.get(t);
      if (y && A) return y == t && A == e;
      var O = !0;
      o.set(e, t), o.set(t, e);
      for (var G = a; ++h < c; ) {
        _ = s[h];
        var S = e[_],
          N = t[_];
        if (n) var T = a ? n(N, S, _, t, e, o) : n(S, N, _, e, t, o);
        if (!(T === void 0 ? S === N || i(S, N, r, n, o) : T)) {
          O = !1;
          break;
        }
        G || (G = _ == "constructor");
      }
      if (O && !G) {
        var D = e.constructor,
          q = t.constructor;
        D != q &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof D == "function" &&
            D instanceof D &&
            typeof q == "function" &&
            q instanceof q
          ) &&
          (O = !1);
      }
      return o.delete(e), o.delete(t), O;
    }
    sv.exports = QN;
  });
  var lv = u((FH, cv) => {
    var $N = wt(),
      ZN = tt(),
      JN = $N(ZN, "DataView");
    cv.exports = JN;
  });
  var dv = u((GH, fv) => {
    var ex = wt(),
      tx = tt(),
      rx = ex(tx, "Promise");
    fv.exports = rx;
  });
  var vv = u((XH, pv) => {
    var nx = wt(),
      ix = tt(),
      ox = nx(ix, "Set");
    pv.exports = ox;
  });
  var ha = u((VH, hv) => {
    var ax = wt(),
      sx = tt(),
      ux = ax(sx, "WeakMap");
    hv.exports = ux;
  });
  var $n = u((WH, Tv) => {
    var Ea = lv(),
      ga = Wn(),
      _a = dv(),
      ya = vv(),
      ma = ha(),
      Iv = St(),
      dr = aa(),
      Ev = "[object Map]",
      cx = "[object Object]",
      gv = "[object Promise]",
      _v = "[object Set]",
      yv = "[object WeakMap]",
      mv = "[object DataView]",
      lx = dr(Ea),
      fx = dr(ga),
      dx = dr(_a),
      px = dr(ya),
      vx = dr(ma),
      Wt = Iv;
    ((Ea && Wt(new Ea(new ArrayBuffer(1))) != mv) ||
      (ga && Wt(new ga()) != Ev) ||
      (_a && Wt(_a.resolve()) != gv) ||
      (ya && Wt(new ya()) != _v) ||
      (ma && Wt(new ma()) != yv)) &&
      (Wt = function (e) {
        var t = Iv(e),
          r = t == cx ? e.constructor : void 0,
          n = r ? dr(r) : "";
        if (n)
          switch (n) {
            case lx:
              return mv;
            case fx:
              return Ev;
            case dx:
              return gv;
            case px:
              return _v;
            case vx:
              return yv;
          }
        return t;
      });
    Tv.exports = Wt;
  });
  var Nv = u((UH, Cv) => {
    var Ia = sa(),
      hx = ua(),
      Ex = yp(),
      gx = uv(),
      Ov = $n(),
      bv = Ne(),
      Av = Hn(),
      _x = zn(),
      yx = 1,
      Sv = "[object Arguments]",
      wv = "[object Array]",
      Zn = "[object Object]",
      mx = Object.prototype,
      Rv = mx.hasOwnProperty;
    function Ix(e, t, r, n, i, o) {
      var a = bv(e),
        s = bv(t),
        c = a ? wv : Ov(e),
        f = s ? wv : Ov(t);
      (c = c == Sv ? Zn : c), (f = f == Sv ? Zn : f);
      var E = c == Zn,
        h = f == Zn,
        _ = c == f;
      if (_ && Av(e)) {
        if (!Av(t)) return !1;
        (a = !0), (E = !1);
      }
      if (_ && !E)
        return (
          o || (o = new Ia()),
          a || _x(e) ? hx(e, t, r, n, i, o) : Ex(e, t, c, r, n, i, o)
        );
      if (!(r & yx)) {
        var y = E && Rv.call(e, "__wrapped__"),
          A = h && Rv.call(t, "__wrapped__");
        if (y || A) {
          var O = y ? e.value() : e,
            G = A ? t.value() : t;
          return o || (o = new Ia()), i(O, G, r, n, o);
        }
      }
      return _ ? (o || (o = new Ia()), gx(e, t, r, n, i, o)) : !1;
    }
    Cv.exports = Ix;
  });
  var Ta = u((BH, Lv) => {
    var Tx = Nv(),
      xv = yt();
    function qv(e, t, r, n, i) {
      return e === t
        ? !0
        : e == null || t == null || (!xv(e) && !xv(t))
        ? e !== e && t !== t
        : Tx(e, t, r, n, qv, i);
    }
    Lv.exports = qv;
  });
  var Dv = u((kH, Pv) => {
    var Ox = sa(),
      bx = Ta(),
      Ax = 1,
      Sx = 2;
    function wx(e, t, r, n) {
      var i = r.length,
        o = i,
        a = !n;
      if (e == null) return !o;
      for (e = Object(e); i--; ) {
        var s = r[i];
        if (a && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1;
      }
      for (; ++i < o; ) {
        s = r[i];
        var c = s[0],
          f = e[c],
          E = s[1];
        if (a && s[2]) {
          if (f === void 0 && !(c in e)) return !1;
        } else {
          var h = new Ox();
          if (n) var _ = n(f, E, c, e, t, h);
          if (!(_ === void 0 ? bx(E, f, Ax | Sx, n, h) : _)) return !1;
        }
      }
      return !0;
    }
    Pv.exports = wx;
  });
  var Oa = u((HH, Mv) => {
    var Rx = ft();
    function Cx(e) {
      return e === e && !Rx(e);
    }
    Mv.exports = Cx;
  });
  var Gv = u((jH, Fv) => {
    var Nx = Oa(),
      xx = zr();
    function qx(e) {
      for (var t = xx(e), r = t.length; r--; ) {
        var n = t[r],
          i = e[n];
        t[r] = [n, i, Nx(i)];
      }
      return t;
    }
    Fv.exports = qx;
  });
  var ba = u((KH, Xv) => {
    function Lx(e, t) {
      return function (r) {
        return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
      };
    }
    Xv.exports = Lx;
  });
  var Wv = u((zH, Vv) => {
    var Px = Dv(),
      Dx = Gv(),
      Mx = ba();
    function Fx(e) {
      var t = Dx(e);
      return t.length == 1 && t[0][2]
        ? Mx(t[0][0], t[0][1])
        : function (r) {
            return r === e || Px(r, e, t);
          };
    }
    Vv.exports = Fx;
  });
  var Yr = u((YH, Uv) => {
    var Gx = St(),
      Xx = yt(),
      Vx = "[object Symbol]";
    function Wx(e) {
      return typeof e == "symbol" || (Xx(e) && Gx(e) == Vx);
    }
    Uv.exports = Wx;
  });
  var Jn = u((QH, Bv) => {
    var Ux = Ne(),
      Bx = Yr(),
      kx = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      Hx = /^\w*$/;
    function jx(e, t) {
      if (Ux(e)) return !1;
      var r = typeof e;
      return r == "number" ||
        r == "symbol" ||
        r == "boolean" ||
        e == null ||
        Bx(e)
        ? !0
        : Hx.test(e) || !kx.test(e) || (t != null && e in Object(t));
    }
    Bv.exports = jx;
  });
  var jv = u(($H, Hv) => {
    var kv = Un(),
      Kx = "Expected a function";
    function Aa(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(Kx);
      var r = function () {
        var n = arguments,
          i = t ? t.apply(this, n) : n[0],
          o = r.cache;
        if (o.has(i)) return o.get(i);
        var a = e.apply(this, n);
        return (r.cache = o.set(i, a) || o), a;
      };
      return (r.cache = new (Aa.Cache || kv)()), r;
    }
    Aa.Cache = kv;
    Hv.exports = Aa;
  });
  var zv = u((ZH, Kv) => {
    var zx = jv(),
      Yx = 500;
    function Qx(e) {
      var t = zx(e, function (n) {
          return r.size === Yx && r.clear(), n;
        }),
        r = t.cache;
      return t;
    }
    Kv.exports = Qx;
  });
  var Qv = u((JH, Yv) => {
    var $x = zv(),
      Zx =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      Jx = /\\(\\)?/g,
      eq = $x(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(Zx, function (r, n, i, o) {
            t.push(i ? o.replace(Jx, "$1") : n || r);
          }),
          t
        );
      });
    Yv.exports = eq;
  });
  var Sa = u((e5, $v) => {
    function tq(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n; )
        i[r] = t(e[r], r, e);
      return i;
    }
    $v.exports = tq;
  });
  var nh = u((t5, rh) => {
    var Zv = tr(),
      rq = Sa(),
      nq = Ne(),
      iq = Yr(),
      oq = 1 / 0,
      Jv = Zv ? Zv.prototype : void 0,
      eh = Jv ? Jv.toString : void 0;
    function th(e) {
      if (typeof e == "string") return e;
      if (nq(e)) return rq(e, th) + "";
      if (iq(e)) return eh ? eh.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -oq ? "-0" : t;
    }
    rh.exports = th;
  });
  var oh = u((r5, ih) => {
    var aq = nh();
    function sq(e) {
      return e == null ? "" : aq(e);
    }
    ih.exports = sq;
  });
  var Qr = u((n5, ah) => {
    var uq = Ne(),
      cq = Jn(),
      lq = Qv(),
      fq = oh();
    function dq(e, t) {
      return uq(e) ? e : cq(e, t) ? [e] : lq(fq(e));
    }
    ah.exports = dq;
  });
  var pr = u((i5, sh) => {
    var pq = Yr(),
      vq = 1 / 0;
    function hq(e) {
      if (typeof e == "string" || pq(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -vq ? "-0" : t;
    }
    sh.exports = hq;
  });
  var ei = u((o5, uh) => {
    var Eq = Qr(),
      gq = pr();
    function _q(e, t) {
      t = Eq(t, e);
      for (var r = 0, n = t.length; e != null && r < n; ) e = e[gq(t[r++])];
      return r && r == n ? e : void 0;
    }
    uh.exports = _q;
  });
  var ti = u((a5, ch) => {
    var yq = ei();
    function mq(e, t, r) {
      var n = e == null ? void 0 : yq(e, t);
      return n === void 0 ? r : n;
    }
    ch.exports = mq;
  });
  var fh = u((s5, lh) => {
    function Iq(e, t) {
      return e != null && t in Object(e);
    }
    lh.exports = Iq;
  });
  var ph = u((u5, dh) => {
    var Tq = Qr(),
      Oq = kr(),
      bq = Ne(),
      Aq = jn(),
      Sq = Kn(),
      wq = pr();
    function Rq(e, t, r) {
      t = Tq(t, e);
      for (var n = -1, i = t.length, o = !1; ++n < i; ) {
        var a = wq(t[n]);
        if (!(o = e != null && r(e, a))) break;
        e = e[a];
      }
      return o || ++n != i
        ? o
        : ((i = e == null ? 0 : e.length),
          !!i && Sq(i) && Aq(a, i) && (bq(e) || Oq(e)));
    }
    dh.exports = Rq;
  });
  var hh = u((c5, vh) => {
    var Cq = fh(),
      Nq = ph();
    function xq(e, t) {
      return e != null && Nq(e, t, Cq);
    }
    vh.exports = xq;
  });
  var gh = u((l5, Eh) => {
    var qq = Ta(),
      Lq = ti(),
      Pq = hh(),
      Dq = Jn(),
      Mq = Oa(),
      Fq = ba(),
      Gq = pr(),
      Xq = 1,
      Vq = 2;
    function Wq(e, t) {
      return Dq(e) && Mq(t)
        ? Fq(Gq(e), t)
        : function (r) {
            var n = Lq(r, e);
            return n === void 0 && n === t ? Pq(r, e) : qq(t, n, Xq | Vq);
          };
    }
    Eh.exports = Wq;
  });
  var ri = u((f5, _h) => {
    function Uq(e) {
      return e;
    }
    _h.exports = Uq;
  });
  var wa = u((d5, yh) => {
    function Bq(e) {
      return function (t) {
        return t?.[e];
      };
    }
    yh.exports = Bq;
  });
  var Ih = u((p5, mh) => {
    var kq = ei();
    function Hq(e) {
      return function (t) {
        return kq(t, e);
      };
    }
    mh.exports = Hq;
  });
  var Oh = u((v5, Th) => {
    var jq = wa(),
      Kq = Ih(),
      zq = Jn(),
      Yq = pr();
    function Qq(e) {
      return zq(e) ? jq(Yq(e)) : Kq(e);
    }
    Th.exports = Qq;
  });
  var Rt = u((h5, bh) => {
    var $q = Wv(),
      Zq = gh(),
      Jq = ri(),
      eL = Ne(),
      tL = Oh();
    function rL(e) {
      return typeof e == "function"
        ? e
        : e == null
        ? Jq
        : typeof e == "object"
        ? eL(e)
          ? Zq(e[0], e[1])
          : $q(e)
        : tL(e);
    }
    bh.exports = rL;
  });
  var Ra = u((E5, Ah) => {
    var nL = Rt(),
      iL = Vt(),
      oL = zr();
    function aL(e) {
      return function (t, r, n) {
        var i = Object(t);
        if (!iL(t)) {
          var o = nL(r, 3);
          (t = oL(t)),
            (r = function (s) {
              return o(i[s], s, i);
            });
        }
        var a = e(t, r, n);
        return a > -1 ? i[o ? t[a] : a] : void 0;
      };
    }
    Ah.exports = aL;
  });
  var Ca = u((g5, Sh) => {
    function sL(e, t, r, n) {
      for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; )
        if (t(e[o], o, e)) return o;
      return -1;
    }
    Sh.exports = sL;
  });
  var Rh = u((_5, wh) => {
    var uL = /\s/;
    function cL(e) {
      for (var t = e.length; t-- && uL.test(e.charAt(t)); );
      return t;
    }
    wh.exports = cL;
  });
  var Nh = u((y5, Ch) => {
    var lL = Rh(),
      fL = /^\s+/;
    function dL(e) {
      return e && e.slice(0, lL(e) + 1).replace(fL, "");
    }
    Ch.exports = dL;
  });
  var ni = u((m5, Lh) => {
    var pL = Nh(),
      xh = ft(),
      vL = Yr(),
      qh = 0 / 0,
      hL = /^[-+]0x[0-9a-f]+$/i,
      EL = /^0b[01]+$/i,
      gL = /^0o[0-7]+$/i,
      _L = parseInt;
    function yL(e) {
      if (typeof e == "number") return e;
      if (vL(e)) return qh;
      if (xh(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = xh(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = pL(e);
      var r = EL.test(e);
      return r || gL.test(e) ? _L(e.slice(2), r ? 2 : 8) : hL.test(e) ? qh : +e;
    }
    Lh.exports = yL;
  });
  var Mh = u((I5, Dh) => {
    var mL = ni(),
      Ph = 1 / 0,
      IL = 17976931348623157e292;
    function TL(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = mL(e)), e === Ph || e === -Ph)) {
        var t = e < 0 ? -1 : 1;
        return t * IL;
      }
      return e === e ? e : 0;
    }
    Dh.exports = TL;
  });
  var Na = u((T5, Fh) => {
    var OL = Mh();
    function bL(e) {
      var t = OL(e),
        r = t % 1;
      return t === t ? (r ? t - r : t) : 0;
    }
    Fh.exports = bL;
  });
  var Xh = u((O5, Gh) => {
    var AL = Ca(),
      SL = Rt(),
      wL = Na(),
      RL = Math.max;
    function CL(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = r == null ? 0 : wL(r);
      return i < 0 && (i = RL(n + i, 0)), AL(e, SL(t, 3), i);
    }
    Gh.exports = CL;
  });
  var xa = u((b5, Vh) => {
    var NL = Ra(),
      xL = Xh(),
      qL = NL(xL);
    Vh.exports = qL;
  });
  var oi = u((Ge) => {
    "use strict";
    var LL = ut().default;
    Object.defineProperty(Ge, "__esModule", { value: !0 });
    Ge.withBrowser =
      Ge.TRANSFORM_STYLE_PREFIXED =
      Ge.TRANSFORM_PREFIXED =
      Ge.IS_BROWSER_ENV =
      Ge.FLEX_PREFIXED =
      Ge.ELEMENT_MATCHES =
        void 0;
    var PL = LL(xa()),
      Uh = typeof window < "u";
    Ge.IS_BROWSER_ENV = Uh;
    var ii = (e, t) => (Uh ? e() : t);
    Ge.withBrowser = ii;
    var DL = ii(() =>
      (0, PL.default)(
        [
          "matches",
          "matchesSelector",
          "mozMatchesSelector",
          "msMatchesSelector",
          "oMatchesSelector",
          "webkitMatchesSelector",
        ],
        (e) => e in Element.prototype
      )
    );
    Ge.ELEMENT_MATCHES = DL;
    var ML = ii(() => {
      let e = document.createElement("i"),
        t = ["flex", "-webkit-flex", "-ms-flexbox", "-moz-box", "-webkit-box"],
        r = "";
      try {
        let { length: n } = t;
        for (let i = 0; i < n; i++) {
          let o = t[i];
          if (((e.style.display = o), e.style.display === o)) return o;
        }
        return r;
      } catch {
        return r;
      }
    }, "flex");
    Ge.FLEX_PREFIXED = ML;
    var Bh = ii(() => {
      let e = document.createElement("i");
      if (e.style.transform == null) {
        let t = ["Webkit", "Moz", "ms"],
          r = "Transform",
          { length: n } = t;
        for (let i = 0; i < n; i++) {
          let o = t[i] + r;
          if (e.style[o] !== void 0) return o;
        }
      }
      return "transform";
    }, "transform");
    Ge.TRANSFORM_PREFIXED = Bh;
    var Wh = Bh.split("transform")[0],
      FL = Wh ? Wh + "TransformStyle" : "transformStyle";
    Ge.TRANSFORM_STYLE_PREFIXED = FL;
  });
  var qa = u((S5, zh) => {
    var GL = 4,
      XL = 0.001,
      VL = 1e-7,
      WL = 10,
      $r = 11,
      ai = 1 / ($r - 1),
      UL = typeof Float32Array == "function";
    function kh(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function Hh(e, t) {
      return 3 * t - 6 * e;
    }
    function jh(e) {
      return 3 * e;
    }
    function si(e, t, r) {
      return ((kh(t, r) * e + Hh(t, r)) * e + jh(t)) * e;
    }
    function Kh(e, t, r) {
      return 3 * kh(t, r) * e * e + 2 * Hh(t, r) * e + jh(t);
    }
    function BL(e, t, r, n, i) {
      var o,
        a,
        s = 0;
      do
        (a = t + (r - t) / 2), (o = si(a, n, i) - e), o > 0 ? (r = a) : (t = a);
      while (Math.abs(o) > VL && ++s < WL);
      return a;
    }
    function kL(e, t, r, n) {
      for (var i = 0; i < GL; ++i) {
        var o = Kh(t, r, n);
        if (o === 0) return t;
        var a = si(t, r, n) - e;
        t -= a / o;
      }
      return t;
    }
    zh.exports = function (t, r, n, i) {
      if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var o = UL ? new Float32Array($r) : new Array($r);
      if (t !== r || n !== i)
        for (var a = 0; a < $r; ++a) o[a] = si(a * ai, t, n);
      function s(c) {
        for (var f = 0, E = 1, h = $r - 1; E !== h && o[E] <= c; ++E) f += ai;
        --E;
        var _ = (c - o[E]) / (o[E + 1] - o[E]),
          y = f + _ * ai,
          A = Kh(y, t, n);
        return A >= XL ? kL(c, y, t, n) : A === 0 ? y : BL(c, f, f + ai, t, n);
      }
      return function (f) {
        return t === r && n === i
          ? f
          : f === 0
          ? 0
          : f === 1
          ? 1
          : si(s(f), r, i);
      };
    };
  });
  var La = u((ne) => {
    "use strict";
    var HL = ut().default;
    Object.defineProperty(ne, "__esModule", { value: !0 });
    ne.bounce = wP;
    ne.bouncePast = RP;
    ne.easeOut = ne.easeInOut = ne.easeIn = ne.ease = void 0;
    ne.inBack = _P;
    ne.inCirc = vP;
    ne.inCubic = JL;
    ne.inElastic = IP;
    ne.inExpo = fP;
    ne.inOutBack = mP;
    ne.inOutCirc = EP;
    ne.inOutCubic = tP;
    ne.inOutElastic = OP;
    ne.inOutExpo = pP;
    ne.inOutQuad = ZL;
    ne.inOutQuart = iP;
    ne.inOutQuint = sP;
    ne.inOutSine = lP;
    ne.inQuad = QL;
    ne.inQuart = rP;
    ne.inQuint = oP;
    ne.inSine = uP;
    ne.outBack = yP;
    ne.outBounce = gP;
    ne.outCirc = hP;
    ne.outCubic = eP;
    ne.outElastic = TP;
    ne.outExpo = dP;
    ne.outQuad = $L;
    ne.outQuart = nP;
    ne.outQuint = aP;
    ne.outSine = cP;
    ne.swingFrom = AP;
    ne.swingFromTo = bP;
    ne.swingTo = SP;
    var ui = HL(qa()),
      It = 1.70158,
      jL = (0, ui.default)(0.25, 0.1, 0.25, 1);
    ne.ease = jL;
    var KL = (0, ui.default)(0.42, 0, 1, 1);
    ne.easeIn = KL;
    var zL = (0, ui.default)(0, 0, 0.58, 1);
    ne.easeOut = zL;
    var YL = (0, ui.default)(0.42, 0, 0.58, 1);
    ne.easeInOut = YL;
    function QL(e) {
      return Math.pow(e, 2);
    }
    function $L(e) {
      return -(Math.pow(e - 1, 2) - 1);
    }
    function ZL(e) {
      return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
    }
    function JL(e) {
      return Math.pow(e, 3);
    }
    function eP(e) {
      return Math.pow(e - 1, 3) + 1;
    }
    function tP(e) {
      return (e /= 0.5) < 1
        ? 0.5 * Math.pow(e, 3)
        : 0.5 * (Math.pow(e - 2, 3) + 2);
    }
    function rP(e) {
      return Math.pow(e, 4);
    }
    function nP(e) {
      return -(Math.pow(e - 1, 4) - 1);
    }
    function iP(e) {
      return (e /= 0.5) < 1
        ? 0.5 * Math.pow(e, 4)
        : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
    }
    function oP(e) {
      return Math.pow(e, 5);
    }
    function aP(e) {
      return Math.pow(e - 1, 5) + 1;
    }
    function sP(e) {
      return (e /= 0.5) < 1
        ? 0.5 * Math.pow(e, 5)
        : 0.5 * (Math.pow(e - 2, 5) + 2);
    }
    function uP(e) {
      return -Math.cos(e * (Math.PI / 2)) + 1;
    }
    function cP(e) {
      return Math.sin(e * (Math.PI / 2));
    }
    function lP(e) {
      return -0.5 * (Math.cos(Math.PI * e) - 1);
    }
    function fP(e) {
      return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
    }
    function dP(e) {
      return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
    }
    function pP(e) {
      return e === 0
        ? 0
        : e === 1
        ? 1
        : (e /= 0.5) < 1
        ? 0.5 * Math.pow(2, 10 * (e - 1))
        : 0.5 * (-Math.pow(2, -10 * --e) + 2);
    }
    function vP(e) {
      return -(Math.sqrt(1 - e * e) - 1);
    }
    function hP(e) {
      return Math.sqrt(1 - Math.pow(e - 1, 2));
    }
    function EP(e) {
      return (e /= 0.5) < 1
        ? -0.5 * (Math.sqrt(1 - e * e) - 1)
        : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
    }
    function gP(e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
        ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
        : e < 2.5 / 2.75
        ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
        : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    }
    function _P(e) {
      let t = It;
      return e * e * ((t + 1) * e - t);
    }
    function yP(e) {
      let t = It;
      return (e -= 1) * e * ((t + 1) * e + t) + 1;
    }
    function mP(e) {
      let t = It;
      return (e /= 0.5) < 1
        ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
        : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    }
    function IP(e) {
      let t = It,
        r = 0,
        n = 1;
      return e === 0
        ? 0
        : e === 1
        ? 1
        : (r || (r = 0.3),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          -(
            n *
            Math.pow(2, 10 * (e -= 1)) *
            Math.sin(((e - t) * (2 * Math.PI)) / r)
          ));
    }
    function TP(e) {
      let t = It,
        r = 0,
        n = 1;
      return e === 0
        ? 0
        : e === 1
        ? 1
        : (r || (r = 0.3),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          n * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / r) +
            1);
    }
    function OP(e) {
      let t = It,
        r = 0,
        n = 1;
      return e === 0
        ? 0
        : (e /= 1 / 2) === 2
        ? 1
        : (r || (r = 0.3 * 1.5),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          e < 1
            ? -0.5 *
              (n *
                Math.pow(2, 10 * (e -= 1)) *
                Math.sin(((e - t) * (2 * Math.PI)) / r))
            : n *
                Math.pow(2, -10 * (e -= 1)) *
                Math.sin(((e - t) * (2 * Math.PI)) / r) *
                0.5 +
              1);
    }
    function bP(e) {
      let t = It;
      return (e /= 0.5) < 1
        ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
        : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    }
    function AP(e) {
      let t = It;
      return e * e * ((t + 1) * e - t);
    }
    function SP(e) {
      let t = It;
      return (e -= 1) * e * ((t + 1) * e + t) + 1;
    }
    function wP(e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
        ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
        : e < 2.5 / 2.75
        ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
        : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    }
    function RP(e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
        ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
        : e < 2.5 / 2.75
        ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
        : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
    }
  });
  var Da = u((Zr) => {
    "use strict";
    var CP = ut().default,
      NP = $t().default;
    Object.defineProperty(Zr, "__esModule", { value: !0 });
    Zr.applyEasing = LP;
    Zr.createBezierEasing = qP;
    Zr.optimizeFloat = Pa;
    var Yh = NP(La()),
      xP = CP(qa());
    function Pa(e, t = 5, r = 10) {
      let n = Math.pow(r, t),
        i = Number(Math.round(e * n) / n);
      return Math.abs(i) > 1e-4 ? i : 0;
    }
    function qP(e) {
      return (0, xP.default)(...e);
    }
    function LP(e, t, r) {
      return t === 0
        ? 0
        : t === 1
        ? 1
        : Pa(r ? (t > 0 ? r(t) : t) : t > 0 && e && Yh[e] ? Yh[e](t) : t);
    }
  });
  var Jh = u((vr) => {
    "use strict";
    Object.defineProperty(vr, "__esModule", { value: !0 });
    vr.createElementState = Zh;
    vr.ixElements = void 0;
    vr.mergeActionState = Ma;
    var ci = or(),
      $h = Ue(),
      {
        HTML_ELEMENT: C5,
        PLAIN_OBJECT: PP,
        ABSTRACT_NODE: N5,
        CONFIG_X_VALUE: DP,
        CONFIG_Y_VALUE: MP,
        CONFIG_Z_VALUE: FP,
        CONFIG_VALUE: GP,
        CONFIG_X_UNIT: XP,
        CONFIG_Y_UNIT: VP,
        CONFIG_Z_UNIT: WP,
        CONFIG_UNIT: UP,
      } = $h.IX2EngineConstants,
      {
        IX2_SESSION_STOPPED: BP,
        IX2_INSTANCE_ADDED: kP,
        IX2_ELEMENT_STATE_CHANGED: HP,
      } = $h.IX2EngineActionTypes,
      Qh = {},
      jP = "refState",
      KP = (e = Qh, t = {}) => {
        switch (t.type) {
          case BP:
            return Qh;
          case kP: {
            let {
                elementId: r,
                element: n,
                origin: i,
                actionItem: o,
                refType: a,
              } = t.payload,
              { actionTypeId: s } = o,
              c = e;
            return (
              (0, ci.getIn)(c, [r, n]) !== n && (c = Zh(c, n, a, r, o)),
              Ma(c, r, s, i, o)
            );
          }
          case HP: {
            let {
              elementId: r,
              actionTypeId: n,
              current: i,
              actionItem: o,
            } = t.payload;
            return Ma(e, r, n, i, o);
          }
          default:
            return e;
        }
      };
    vr.ixElements = KP;
    function Zh(e, t, r, n, i) {
      let o =
        r === PP ? (0, ci.getIn)(i, ["config", "target", "objectId"]) : null;
      return (0, ci.mergeIn)(e, [n], { id: n, ref: t, refId: o, refType: r });
    }
    function Ma(e, t, r, n, i) {
      let o = YP(i),
        a = [t, jP, r];
      return (0, ci.mergeIn)(e, a, n, o);
    }
    var zP = [
      [DP, XP],
      [MP, VP],
      [FP, WP],
      [GP, UP],
    ];
    function YP(e) {
      let { config: t } = e;
      return zP.reduce((r, n) => {
        let i = n[0],
          o = n[1],
          a = t[i],
          s = t[o];
        return a != null && s != null && (r[o] = s), r;
      }, {});
    }
  });
  var eE = u((xe) => {
    "use strict";
    Object.defineProperty(xe, "__esModule", { value: !0 });
    xe.renderPlugin =
      xe.getPluginOrigin =
      xe.getPluginDuration =
      xe.getPluginDestination =
      xe.getPluginConfig =
      xe.createPluginInstance =
      xe.clearPlugin =
        void 0;
    var QP = (e) => e.value;
    xe.getPluginConfig = QP;
    var $P = (e, t) => {
      if (t.config.duration !== "auto") return null;
      let r = parseFloat(e.getAttribute("data-duration"));
      return r > 0
        ? r * 1e3
        : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
    };
    xe.getPluginDuration = $P;
    var ZP = (e) => e || { value: 0 };
    xe.getPluginOrigin = ZP;
    var JP = (e) => ({ value: e.value });
    xe.getPluginDestination = JP;
    var eD = (e) => {
      let t = window.Webflow.require("lottie").createInstance(e);
      return t.stop(), t.setSubframe(!0), t;
    };
    xe.createPluginInstance = eD;
    var tD = (e, t, r) => {
      if (!e) return;
      let n = t[r.actionTypeId].value / 100;
      e.goToFrame(e.frames * n);
    };
    xe.renderPlugin = tD;
    var rD = (e) => {
      window.Webflow.require("lottie").createInstance(e).stop();
    };
    xe.clearPlugin = rD;
  });
  var Fa = u((Re) => {
    "use strict";
    Object.defineProperty(Re, "__esModule", { value: !0 });
    Re.getPluginOrigin =
      Re.getPluginDuration =
      Re.getPluginDestination =
      Re.getPluginConfig =
      Re.createPluginInstance =
      Re.clearPlugin =
        void 0;
    Re.isPluginType = oD;
    Re.renderPlugin = void 0;
    var Ut = eE(),
      tE = Ue(),
      nD = oi(),
      iD = {
        [tE.ActionTypeConsts.PLUGIN_LOTTIE]: {
          getConfig: Ut.getPluginConfig,
          getOrigin: Ut.getPluginOrigin,
          getDuration: Ut.getPluginDuration,
          getDestination: Ut.getPluginDestination,
          createInstance: Ut.createPluginInstance,
          render: Ut.renderPlugin,
          clear: Ut.clearPlugin,
        },
      };
    function oD(e) {
      return e === tE.ActionTypeConsts.PLUGIN_LOTTIE;
    }
    var Bt = (e) => (t) => {
        if (!nD.IS_BROWSER_ENV) return () => null;
        let r = iD[t];
        if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
        let n = r[e];
        if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
        return n;
      },
      aD = Bt("getConfig");
    Re.getPluginConfig = aD;
    var sD = Bt("getOrigin");
    Re.getPluginOrigin = sD;
    var uD = Bt("getDuration");
    Re.getPluginDuration = uD;
    var cD = Bt("getDestination");
    Re.getPluginDestination = cD;
    var lD = Bt("createInstance");
    Re.createPluginInstance = lD;
    var fD = Bt("render");
    Re.renderPlugin = fD;
    var dD = Bt("clear");
    Re.clearPlugin = dD;
  });
  var nE = u((P5, rE) => {
    function pD(e, t) {
      return e == null || e !== e ? t : e;
    }
    rE.exports = pD;
  });
  var oE = u((D5, iE) => {
    function vD(e, t, r, n) {
      var i = -1,
        o = e == null ? 0 : e.length;
      for (n && o && (r = e[++i]); ++i < o; ) r = t(r, e[i], i, e);
      return r;
    }
    iE.exports = vD;
  });
  var sE = u((M5, aE) => {
    function hD(e) {
      return function (t, r, n) {
        for (var i = -1, o = Object(t), a = n(t), s = a.length; s--; ) {
          var c = a[e ? s : ++i];
          if (r(o[c], c, o) === !1) break;
        }
        return t;
      };
    }
    aE.exports = hD;
  });
  var cE = u((F5, uE) => {
    var ED = sE(),
      gD = ED();
    uE.exports = gD;
  });
  var Ga = u((G5, lE) => {
    var _D = cE(),
      yD = zr();
    function mD(e, t) {
      return e && _D(e, t, yD);
    }
    lE.exports = mD;
  });
  var dE = u((X5, fE) => {
    var ID = Vt();
    function TD(e, t) {
      return function (r, n) {
        if (r == null) return r;
        if (!ID(r)) return e(r, n);
        for (
          var i = r.length, o = t ? i : -1, a = Object(r);
          (t ? o-- : ++o < i) && n(a[o], o, a) !== !1;

        );
        return r;
      };
    }
    fE.exports = TD;
  });
  var Xa = u((V5, pE) => {
    var OD = Ga(),
      bD = dE(),
      AD = bD(OD);
    pE.exports = AD;
  });
  var hE = u((W5, vE) => {
    function SD(e, t, r, n, i) {
      return (
        i(e, function (o, a, s) {
          r = n ? ((n = !1), o) : t(r, o, a, s);
        }),
        r
      );
    }
    vE.exports = SD;
  });
  var gE = u((U5, EE) => {
    var wD = oE(),
      RD = Xa(),
      CD = Rt(),
      ND = hE(),
      xD = Ne();
    function qD(e, t, r) {
      var n = xD(e) ? wD : ND,
        i = arguments.length < 3;
      return n(e, CD(t, 4), r, i, RD);
    }
    EE.exports = qD;
  });
  var yE = u((B5, _E) => {
    var LD = Ca(),
      PD = Rt(),
      DD = Na(),
      MD = Math.max,
      FD = Math.min;
    function GD(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = n - 1;
      return (
        r !== void 0 &&
          ((i = DD(r)), (i = r < 0 ? MD(n + i, 0) : FD(i, n - 1))),
        LD(e, PD(t, 3), i, !0)
      );
    }
    _E.exports = GD;
  });
  var IE = u((k5, mE) => {
    var XD = Ra(),
      VD = yE(),
      WD = XD(VD);
    mE.exports = WD;
  });
  var OE = u((li) => {
    "use strict";
    Object.defineProperty(li, "__esModule", { value: !0 });
    li.default = void 0;
    var UD = Object.prototype.hasOwnProperty;
    function TE(e, t) {
      return e === t
        ? e !== 0 || t !== 0 || 1 / e === 1 / t
        : e !== e && t !== t;
    }
    function BD(e, t) {
      if (TE(e, t)) return !0;
      if (
        typeof e != "object" ||
        e === null ||
        typeof t != "object" ||
        t === null
      )
        return !1;
      let r = Object.keys(e),
        n = Object.keys(t);
      if (r.length !== n.length) return !1;
      for (let i = 0; i < r.length; i++)
        if (!UD.call(t, r[i]) || !TE(e[r[i]], t[r[i]])) return !1;
      return !0;
    }
    var kD = BD;
    li.default = kD;
  });
  var kE = u((he) => {
    "use strict";
    var pi = ut().default;
    Object.defineProperty(he, "__esModule", { value: !0 });
    he.cleanupHTMLElement = WM;
    he.clearAllStyles = VM;
    he.getActionListProgress = BM;
    he.getAffectedElements = Ha;
    he.getComputedStyle = hM;
    he.getDestinationValues = TM;
    he.getElementId = fM;
    he.getInstanceId = cM;
    he.getInstanceOrigin = _M;
    he.getItemConfigByKey = void 0;
    he.getMaxDurationItemIndex = BE;
    he.getNamespacedParameterId = jM;
    he.getRenderType = VE;
    he.getStyleProp = OM;
    he.mediaQueriesEqual = zM;
    he.observeStore = vM;
    he.reduceListToGroup = kM;
    he.reifyState = dM;
    he.renderHTMLElement = bM;
    Object.defineProperty(he, "shallowEqual", {
      enumerable: !0,
      get: function () {
        return LE.default;
      },
    });
    he.shouldAllowMediaQuery = KM;
    he.shouldNamespaceEventParameter = HM;
    he.stringifyTarget = YM;
    var Ct = pi(nE()),
      Wa = pi(gE()),
      Va = pi(IE()),
      bE = or(),
      kt = Ue(),
      LE = pi(OE()),
      HD = Da(),
      vt = Fa(),
      Xe = oi(),
      {
        BACKGROUND: jD,
        TRANSFORM: KD,
        TRANSLATE_3D: zD,
        SCALE_3D: YD,
        ROTATE_X: QD,
        ROTATE_Y: $D,
        ROTATE_Z: ZD,
        SKEW: JD,
        PRESERVE_3D: eM,
        FLEX: tM,
        OPACITY: fi,
        FILTER: Jr,
        FONT_VARIATION_SETTINGS: en,
        WIDTH: dt,
        HEIGHT: pt,
        BACKGROUND_COLOR: PE,
        BORDER_COLOR: rM,
        COLOR: nM,
        CHILDREN: AE,
        IMMEDIATE_CHILDREN: iM,
        SIBLINGS: SE,
        PARENT: oM,
        DISPLAY: di,
        WILL_CHANGE: hr,
        AUTO: Nt,
        COMMA_DELIMITER: tn,
        COLON_DELIMITER: aM,
        BAR_DELIMITER: wE,
        RENDER_TRANSFORM: DE,
        RENDER_GENERAL: Ua,
        RENDER_STYLE: Ba,
        RENDER_PLUGIN: ME,
      } = kt.IX2EngineConstants,
      {
        TRANSFORM_MOVE: Er,
        TRANSFORM_SCALE: gr,
        TRANSFORM_ROTATE: _r,
        TRANSFORM_SKEW: rn,
        STYLE_OPACITY: FE,
        STYLE_FILTER: nn,
        STYLE_FONT_VARIATION: on,
        STYLE_SIZE: yr,
        STYLE_BACKGROUND_COLOR: mr,
        STYLE_BORDER: Ir,
        STYLE_TEXT_COLOR: Tr,
        GENERAL_DISPLAY: vi,
      } = kt.ActionTypeConsts,
      sM = "OBJECT_VALUE",
      GE = (e) => e.trim(),
      ka = Object.freeze({ [mr]: PE, [Ir]: rM, [Tr]: nM }),
      XE = Object.freeze({
        [Xe.TRANSFORM_PREFIXED]: KD,
        [PE]: jD,
        [fi]: fi,
        [Jr]: Jr,
        [dt]: dt,
        [pt]: pt,
        [en]: en,
      }),
      RE = {},
      uM = 1;
    function cM() {
      return "i" + uM++;
    }
    var lM = 1;
    function fM(e, t) {
      for (let r in e) {
        let n = e[r];
        if (n && n.ref === t) return n.id;
      }
      return "e" + lM++;
    }
    function dM({ events: e, actionLists: t, site: r } = {}) {
      let n = (0, Wa.default)(
          e,
          (a, s) => {
            let { eventTypeId: c } = s;
            return a[c] || (a[c] = {}), (a[c][s.id] = s), a;
          },
          {}
        ),
        i = r && r.mediaQueries,
        o = [];
      return (
        i
          ? (o = i.map((a) => a.key))
          : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
        {
          ixData: {
            events: e,
            actionLists: t,
            eventTypeMap: n,
            mediaQueries: i,
            mediaQueryKeys: o,
          },
        }
      );
    }
    var pM = (e, t) => e === t;
    function vM({ store: e, select: t, onChange: r, comparator: n = pM }) {
      let { getState: i, subscribe: o } = e,
        a = o(c),
        s = t(i());
      function c() {
        let f = t(i());
        if (f == null) {
          a();
          return;
        }
        n(f, s) || ((s = f), r(s, e));
      }
      return a;
    }
    function CE(e) {
      let t = typeof e;
      if (t === "string") return { id: e };
      if (e != null && t === "object") {
        let {
          id: r,
          objectId: n,
          selector: i,
          selectorGuids: o,
          appliesTo: a,
          useEventTarget: s,
        } = e;
        return {
          id: r,
          objectId: n,
          selector: i,
          selectorGuids: o,
          appliesTo: a,
          useEventTarget: s,
        };
      }
      return {};
    }
    function Ha({
      config: e,
      event: t,
      eventTarget: r,
      elementRoot: n,
      elementApi: i,
    }) {
      var o, a, s;
      if (!i) throw new Error("IX2 missing elementApi");
      let { targets: c } = e;
      if (Array.isArray(c) && c.length > 0)
        return c.reduce(
          (w, V) =>
            w.concat(
              Ha({
                config: { target: V },
                event: t,
                eventTarget: r,
                elementRoot: n,
                elementApi: i,
              })
            ),
          []
        );
      let {
          getValidDocument: f,
          getQuerySelector: E,
          queryDocument: h,
          getChildElements: _,
          getSiblingElements: y,
          matchSelector: A,
          elementContains: O,
          isSiblingNode: G,
        } = i,
        { target: S } = e;
      if (!S) return [];
      let {
        id: N,
        objectId: T,
        selector: D,
        selectorGuids: q,
        appliesTo: M,
        useEventTarget: U,
      } = CE(S);
      if (T) return [RE[T] || (RE[T] = {})];
      if (M === kt.EventAppliesTo.PAGE) {
        let w = f(N);
        return w ? [w] : [];
      }
      let K =
          ((o =
            t == null ||
            (a = t.action) === null ||
            a === void 0 ||
            (s = a.config) === null ||
            s === void 0
              ? void 0
              : s.affectedElements) !== null && o !== void 0
            ? o
            : {})[N || D] || {},
        te = !!(K.id || K.selector),
        W,
        C,
        d,
        F = t && E(CE(t.target));
      if (
        (te
          ? ((W = K.limitAffectedElements), (C = F), (d = E(K)))
          : (C = d = E({ id: N, selector: D, selectorGuids: q })),
        t && U)
      ) {
        let w = r && (d || U === !0) ? [r] : h(F);
        if (d) {
          if (U === oM) return h(d).filter((V) => w.some((z) => O(V, z)));
          if (U === AE) return h(d).filter((V) => w.some((z) => O(z, V)));
          if (U === SE) return h(d).filter((V) => w.some((z) => G(z, V)));
        }
        return w;
      }
      return C == null || d == null
        ? []
        : Xe.IS_BROWSER_ENV && n
        ? h(d).filter((w) => n.contains(w))
        : W === AE
        ? h(C, d)
        : W === iM
        ? _(h(C)).filter(A(d))
        : W === SE
        ? y(h(C)).filter(A(d))
        : h(d);
    }
    function hM({ element: e, actionItem: t }) {
      if (!Xe.IS_BROWSER_ENV) return {};
      let { actionTypeId: r } = t;
      switch (r) {
        case yr:
        case mr:
        case Ir:
        case Tr:
        case vi:
          return window.getComputedStyle(e);
        default:
          return {};
      }
    }
    var NE = /px/,
      EM = (e, t) =>
        t.reduce(
          (r, n) => (r[n.type] == null && (r[n.type] = AM[n.type]), r),
          e || {}
        ),
      gM = (e, t) =>
        t.reduce(
          (r, n) => (
            r[n.type] == null &&
              (r[n.type] = SM[n.type] || n.defaultValue || 0),
            r
          ),
          e || {}
        );
    function _M(e, t = {}, r = {}, n, i) {
      let { getStyle: o } = i,
        { actionTypeId: a } = n;
      if ((0, vt.isPluginType)(a)) return (0, vt.getPluginOrigin)(a)(t[a]);
      switch (n.actionTypeId) {
        case Er:
        case gr:
        case _r:
        case rn:
          return t[n.actionTypeId] || ja[n.actionTypeId];
        case nn:
          return EM(t[n.actionTypeId], n.config.filters);
        case on:
          return gM(t[n.actionTypeId], n.config.fontVariations);
        case FE:
          return { value: (0, Ct.default)(parseFloat(o(e, fi)), 1) };
        case yr: {
          let s = o(e, dt),
            c = o(e, pt),
            f,
            E;
          return (
            n.config.widthUnit === Nt
              ? (f = NE.test(s) ? parseFloat(s) : parseFloat(r.width))
              : (f = (0, Ct.default)(parseFloat(s), parseFloat(r.width))),
            n.config.heightUnit === Nt
              ? (E = NE.test(c) ? parseFloat(c) : parseFloat(r.height))
              : (E = (0, Ct.default)(parseFloat(c), parseFloat(r.height))),
            { widthValue: f, heightValue: E }
          );
        }
        case mr:
        case Ir:
        case Tr:
          return FM({
            element: e,
            actionTypeId: n.actionTypeId,
            computedStyle: r,
            getStyle: o,
          });
        case vi:
          return { value: (0, Ct.default)(o(e, di), r.display) };
        case sM:
          return t[n.actionTypeId] || { value: 0 };
        default:
          return;
      }
    }
    var yM = (e, t) => (t && (e[t.type] = t.value || 0), e),
      mM = (e, t) => (t && (e[t.type] = t.value || 0), e),
      IM = (e, t, r) => {
        if ((0, vt.isPluginType)(e)) return (0, vt.getPluginConfig)(e)(r, t);
        switch (e) {
          case nn: {
            let n = (0, Va.default)(r.filters, ({ type: i }) => i === t);
            return n ? n.value : 0;
          }
          case on: {
            let n = (0, Va.default)(r.fontVariations, ({ type: i }) => i === t);
            return n ? n.value : 0;
          }
          default:
            return r[t];
        }
      };
    he.getItemConfigByKey = IM;
    function TM({ element: e, actionItem: t, elementApi: r }) {
      if ((0, vt.isPluginType)(t.actionTypeId))
        return (0, vt.getPluginDestination)(t.actionTypeId)(t.config);
      switch (t.actionTypeId) {
        case Er:
        case gr:
        case _r:
        case rn: {
          let { xValue: n, yValue: i, zValue: o } = t.config;
          return { xValue: n, yValue: i, zValue: o };
        }
        case yr: {
          let { getStyle: n, setStyle: i, getProperty: o } = r,
            { widthUnit: a, heightUnit: s } = t.config,
            { widthValue: c, heightValue: f } = t.config;
          if (!Xe.IS_BROWSER_ENV) return { widthValue: c, heightValue: f };
          if (a === Nt) {
            let E = n(e, dt);
            i(e, dt, ""), (c = o(e, "offsetWidth")), i(e, dt, E);
          }
          if (s === Nt) {
            let E = n(e, pt);
            i(e, pt, ""), (f = o(e, "offsetHeight")), i(e, pt, E);
          }
          return { widthValue: c, heightValue: f };
        }
        case mr:
        case Ir:
        case Tr: {
          let { rValue: n, gValue: i, bValue: o, aValue: a } = t.config;
          return { rValue: n, gValue: i, bValue: o, aValue: a };
        }
        case nn:
          return t.config.filters.reduce(yM, {});
        case on:
          return t.config.fontVariations.reduce(mM, {});
        default: {
          let { value: n } = t.config;
          return { value: n };
        }
      }
    }
    function VE(e) {
      if (/^TRANSFORM_/.test(e)) return DE;
      if (/^STYLE_/.test(e)) return Ba;
      if (/^GENERAL_/.test(e)) return Ua;
      if (/^PLUGIN_/.test(e)) return ME;
    }
    function OM(e, t) {
      return e === Ba ? t.replace("STYLE_", "").toLowerCase() : null;
    }
    function bM(e, t, r, n, i, o, a, s, c) {
      switch (s) {
        case DE:
          return CM(e, t, r, i, a);
        case Ba:
          return GM(e, t, r, i, o, a);
        case Ua:
          return XM(e, i, a);
        case ME: {
          let { actionTypeId: f } = i;
          if ((0, vt.isPluginType)(f)) return (0, vt.renderPlugin)(f)(c, t, i);
        }
      }
    }
    var ja = {
        [Er]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [gr]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [_r]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [rn]: Object.freeze({ xValue: 0, yValue: 0 }),
      },
      AM = Object.freeze({
        blur: 0,
        "hue-rotate": 0,
        invert: 0,
        grayscale: 0,
        saturate: 100,
        sepia: 0,
        contrast: 100,
        brightness: 100,
      }),
      SM = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 }),
      wM = (e, t) => {
        let r = (0, Va.default)(t.filters, ({ type: n }) => n === e);
        if (r && r.unit) return r.unit;
        switch (e) {
          case "blur":
            return "px";
          case "hue-rotate":
            return "deg";
          default:
            return "%";
        }
      },
      RM = Object.keys(ja);
    function CM(e, t, r, n, i) {
      let o = RM.map((s) => {
          let c = ja[s],
            {
              xValue: f = c.xValue,
              yValue: E = c.yValue,
              zValue: h = c.zValue,
              xUnit: _ = "",
              yUnit: y = "",
              zUnit: A = "",
            } = t[s] || {};
          switch (s) {
            case Er:
              return `${zD}(${f}${_}, ${E}${y}, ${h}${A})`;
            case gr:
              return `${YD}(${f}${_}, ${E}${y}, ${h}${A})`;
            case _r:
              return `${QD}(${f}${_}) ${$D}(${E}${y}) ${ZD}(${h}${A})`;
            case rn:
              return `${JD}(${f}${_}, ${E}${y})`;
            default:
              return "";
          }
        }).join(" "),
        { setStyle: a } = i;
      Ht(e, Xe.TRANSFORM_PREFIXED, i),
        a(e, Xe.TRANSFORM_PREFIXED, o),
        qM(n, r) && a(e, Xe.TRANSFORM_STYLE_PREFIXED, eM);
    }
    function NM(e, t, r, n) {
      let i = (0, Wa.default)(t, (a, s, c) => `${a} ${c}(${s}${wM(c, r)})`, ""),
        { setStyle: o } = n;
      Ht(e, Jr, n), o(e, Jr, i);
    }
    function xM(e, t, r, n) {
      let i = (0, Wa.default)(
          t,
          (a, s, c) => (a.push(`"${c}" ${s}`), a),
          []
        ).join(", "),
        { setStyle: o } = n;
      Ht(e, en, n), o(e, en, i);
    }
    function qM({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
      return (
        (e === Er && n !== void 0) ||
        (e === gr && n !== void 0) ||
        (e === _r && (t !== void 0 || r !== void 0))
      );
    }
    var LM = "\\(([^)]+)\\)",
      PM = /^rgb/,
      DM = RegExp(`rgba?${LM}`);
    function MM(e, t) {
      let r = e.exec(t);
      return r ? r[1] : "";
    }
    function FM({
      element: e,
      actionTypeId: t,
      computedStyle: r,
      getStyle: n,
    }) {
      let i = ka[t],
        o = n(e, i),
        a = PM.test(o) ? o : r[i],
        s = MM(DM, a).split(tn);
      return {
        rValue: (0, Ct.default)(parseInt(s[0], 10), 255),
        gValue: (0, Ct.default)(parseInt(s[1], 10), 255),
        bValue: (0, Ct.default)(parseInt(s[2], 10), 255),
        aValue: (0, Ct.default)(parseFloat(s[3]), 1),
      };
    }
    function GM(e, t, r, n, i, o) {
      let { setStyle: a } = o;
      switch (n.actionTypeId) {
        case yr: {
          let { widthUnit: s = "", heightUnit: c = "" } = n.config,
            { widthValue: f, heightValue: E } = r;
          f !== void 0 &&
            (s === Nt && (s = "px"), Ht(e, dt, o), a(e, dt, f + s)),
            E !== void 0 &&
              (c === Nt && (c = "px"), Ht(e, pt, o), a(e, pt, E + c));
          break;
        }
        case nn: {
          NM(e, r, n.config, o);
          break;
        }
        case on: {
          xM(e, r, n.config, o);
          break;
        }
        case mr:
        case Ir:
        case Tr: {
          let s = ka[n.actionTypeId],
            c = Math.round(r.rValue),
            f = Math.round(r.gValue),
            E = Math.round(r.bValue),
            h = r.aValue;
          Ht(e, s, o),
            a(
              e,
              s,
              h >= 1 ? `rgb(${c},${f},${E})` : `rgba(${c},${f},${E},${h})`
            );
          break;
        }
        default: {
          let { unit: s = "" } = n.config;
          Ht(e, i, o), a(e, i, r.value + s);
          break;
        }
      }
    }
    function XM(e, t, r) {
      let { setStyle: n } = r;
      switch (t.actionTypeId) {
        case vi: {
          let { value: i } = t.config;
          i === tM && Xe.IS_BROWSER_ENV
            ? n(e, di, Xe.FLEX_PREFIXED)
            : n(e, di, i);
          return;
        }
      }
    }
    function Ht(e, t, r) {
      if (!Xe.IS_BROWSER_ENV) return;
      let n = XE[t];
      if (!n) return;
      let { getStyle: i, setStyle: o } = r,
        a = i(e, hr);
      if (!a) {
        o(e, hr, n);
        return;
      }
      let s = a.split(tn).map(GE);
      s.indexOf(n) === -1 && o(e, hr, s.concat(n).join(tn));
    }
    function WE(e, t, r) {
      if (!Xe.IS_BROWSER_ENV) return;
      let n = XE[t];
      if (!n) return;
      let { getStyle: i, setStyle: o } = r,
        a = i(e, hr);
      !a ||
        a.indexOf(n) === -1 ||
        o(
          e,
          hr,
          a
            .split(tn)
            .map(GE)
            .filter((s) => s !== n)
            .join(tn)
        );
    }
    function VM({ store: e, elementApi: t }) {
      let { ixData: r } = e.getState(),
        { events: n = {}, actionLists: i = {} } = r;
      Object.keys(n).forEach((o) => {
        let a = n[o],
          { config: s } = a.action,
          { actionListId: c } = s,
          f = i[c];
        f && xE({ actionList: f, event: a, elementApi: t });
      }),
        Object.keys(i).forEach((o) => {
          xE({ actionList: i[o], elementApi: t });
        });
    }
    function xE({ actionList: e = {}, event: t, elementApi: r }) {
      let { actionItemGroups: n, continuousParameterGroups: i } = e;
      n &&
        n.forEach((o) => {
          qE({ actionGroup: o, event: t, elementApi: r });
        }),
        i &&
          i.forEach((o) => {
            let { continuousActionGroups: a } = o;
            a.forEach((s) => {
              qE({ actionGroup: s, event: t, elementApi: r });
            });
          });
    }
    function qE({ actionGroup: e, event: t, elementApi: r }) {
      let { actionItems: n } = e;
      n.forEach(({ actionTypeId: i, config: o }) => {
        let a;
        (0, vt.isPluginType)(i)
          ? (a = (0, vt.clearPlugin)(i))
          : (a = UE({ effect: UM, actionTypeId: i, elementApi: r })),
          Ha({ config: o, event: t, elementApi: r }).forEach(a);
      });
    }
    function WM(e, t, r) {
      let { setStyle: n, getStyle: i } = r,
        { actionTypeId: o } = t;
      if (o === yr) {
        let { config: a } = t;
        a.widthUnit === Nt && n(e, dt, ""), a.heightUnit === Nt && n(e, pt, "");
      }
      i(e, hr) && UE({ effect: WE, actionTypeId: o, elementApi: r })(e);
    }
    var UE =
      ({ effect: e, actionTypeId: t, elementApi: r }) =>
      (n) => {
        switch (t) {
          case Er:
          case gr:
          case _r:
          case rn:
            e(n, Xe.TRANSFORM_PREFIXED, r);
            break;
          case nn:
            e(n, Jr, r);
            break;
          case on:
            e(n, en, r);
            break;
          case FE:
            e(n, fi, r);
            break;
          case yr:
            e(n, dt, r), e(n, pt, r);
            break;
          case mr:
          case Ir:
          case Tr:
            e(n, ka[t], r);
            break;
          case vi:
            e(n, di, r);
            break;
        }
      };
    function UM(e, t, r) {
      let { setStyle: n } = r;
      WE(e, t, r),
        n(e, t, ""),
        t === Xe.TRANSFORM_PREFIXED && n(e, Xe.TRANSFORM_STYLE_PREFIXED, "");
    }
    function BE(e) {
      let t = 0,
        r = 0;
      return (
        e.forEach((n, i) => {
          let { config: o } = n,
            a = o.delay + o.duration;
          a >= t && ((t = a), (r = i));
        }),
        r
      );
    }
    function BM(e, t) {
      let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
        { actionItem: i, verboseTimeElapsed: o = 0 } = t,
        a = 0,
        s = 0;
      return (
        r.forEach((c, f) => {
          if (n && f === 0) return;
          let { actionItems: E } = c,
            h = E[BE(E)],
            { config: _, actionTypeId: y } = h;
          i.id === h.id && (s = a + o);
          let A = VE(y) === Ua ? 0 : _.duration;
          a += _.delay + A;
        }),
        a > 0 ? (0, HD.optimizeFloat)(s / a) : 0
      );
    }
    function kM({ actionList: e, actionItemId: t, rawData: r }) {
      let { actionItemGroups: n, continuousParameterGroups: i } = e,
        o = [],
        a = (s) => (
          o.push((0, bE.mergeIn)(s, ["config"], { delay: 0, duration: 0 })),
          s.id === t
        );
      return (
        n && n.some(({ actionItems: s }) => s.some(a)),
        i &&
          i.some((s) => {
            let { continuousActionGroups: c } = s;
            return c.some(({ actionItems: f }) => f.some(a));
          }),
        (0, bE.setIn)(r, ["actionLists"], {
          [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
        })
      );
    }
    function HM(e, { basedOn: t }) {
      return (
        (e === kt.EventTypeConsts.SCROLLING_IN_VIEW &&
          (t === kt.EventBasedOn.ELEMENT || t == null)) ||
        (e === kt.EventTypeConsts.MOUSE_MOVE && t === kt.EventBasedOn.ELEMENT)
      );
    }
    function jM(e, t) {
      return e + aM + t;
    }
    function KM(e, t) {
      return t == null ? !0 : e.indexOf(t) !== -1;
    }
    function zM(e, t) {
      return (0, LE.default)(e && e.sort(), t && t.sort());
    }
    function YM(e) {
      if (typeof e == "string") return e;
      let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
      return t + wE + r + wE + n;
    }
  });
  var jt = u((Ve) => {
    "use strict";
    var Or = $t().default;
    Object.defineProperty(Ve, "__esModule", { value: !0 });
    Ve.IX2VanillaUtils =
      Ve.IX2VanillaPlugins =
      Ve.IX2ElementsReducer =
      Ve.IX2Easings =
      Ve.IX2EasingUtils =
      Ve.IX2BrowserSupport =
        void 0;
    var QM = Or(oi());
    Ve.IX2BrowserSupport = QM;
    var $M = Or(La());
    Ve.IX2Easings = $M;
    var ZM = Or(Da());
    Ve.IX2EasingUtils = ZM;
    var JM = Or(Jh());
    Ve.IX2ElementsReducer = JM;
    var e1 = Or(Fa());
    Ve.IX2VanillaPlugins = e1;
    var t1 = Or(kE());
    Ve.IX2VanillaUtils = t1;
  });
  var zE = u((Ei) => {
    "use strict";
    Object.defineProperty(Ei, "__esModule", { value: !0 });
    Ei.ixInstances = void 0;
    var HE = Ue(),
      jE = jt(),
      br = or(),
      {
        IX2_RAW_DATA_IMPORTED: r1,
        IX2_SESSION_STOPPED: n1,
        IX2_INSTANCE_ADDED: i1,
        IX2_INSTANCE_STARTED: o1,
        IX2_INSTANCE_REMOVED: a1,
        IX2_ANIMATION_FRAME_CHANGED: s1,
      } = HE.IX2EngineActionTypes,
      {
        optimizeFloat: hi,
        applyEasing: KE,
        createBezierEasing: u1,
      } = jE.IX2EasingUtils,
      { RENDER_GENERAL: c1 } = HE.IX2EngineConstants,
      {
        getItemConfigByKey: Ka,
        getRenderType: l1,
        getStyleProp: f1,
      } = jE.IX2VanillaUtils,
      d1 = (e, t) => {
        let {
            position: r,
            parameterId: n,
            actionGroups: i,
            destinationKeys: o,
            smoothing: a,
            restingValue: s,
            actionTypeId: c,
            customEasingFn: f,
            skipMotion: E,
            skipToValue: h,
          } = e,
          { parameters: _ } = t.payload,
          y = Math.max(1 - a, 0.01),
          A = _[n];
        A == null && ((y = 1), (A = s));
        let O = Math.max(A, 0) || 0,
          G = hi(O - r),
          S = E ? h : hi(r + G * y),
          N = S * 100;
        if (S === r && e.current) return e;
        let T, D, q, M;
        for (let j = 0, { length: K } = i; j < K; j++) {
          let { keyframe: te, actionItems: W } = i[j];
          if ((j === 0 && (T = W[0]), N >= te)) {
            T = W[0];
            let C = i[j + 1],
              d = C && N !== te;
            (D = d ? C.actionItems[0] : null),
              d && ((q = te / 100), (M = (C.keyframe - te) / 100));
          }
        }
        let U = {};
        if (T && !D)
          for (let j = 0, { length: K } = o; j < K; j++) {
            let te = o[j];
            U[te] = Ka(c, te, T.config);
          }
        else if (T && D && q !== void 0 && M !== void 0) {
          let j = (S - q) / M,
            K = T.config.easing,
            te = KE(K, j, f);
          for (let W = 0, { length: C } = o; W < C; W++) {
            let d = o[W],
              F = Ka(c, d, T.config),
              z = (Ka(c, d, D.config) - F) * te + F;
            U[d] = z;
          }
        }
        return (0, br.merge)(e, { position: S, current: U });
      },
      p1 = (e, t) => {
        let {
            active: r,
            origin: n,
            start: i,
            immediate: o,
            renderType: a,
            verbose: s,
            actionItem: c,
            destination: f,
            destinationKeys: E,
            pluginDuration: h,
            instanceDelay: _,
            customEasingFn: y,
            skipMotion: A,
          } = e,
          O = c.config.easing,
          { duration: G, delay: S } = c.config;
        h != null && (G = h),
          (S = _ ?? S),
          a === c1 ? (G = 0) : (o || A) && (G = S = 0);
        let { now: N } = t.payload;
        if (r && n) {
          let T = N - (i + S);
          if (s) {
            let j = N - i,
              K = G + S,
              te = hi(Math.min(Math.max(0, j / K), 1));
            e = (0, br.set)(e, "verboseTimeElapsed", K * te);
          }
          if (T < 0) return e;
          let D = hi(Math.min(Math.max(0, T / G), 1)),
            q = KE(O, D, y),
            M = {},
            U = null;
          return (
            E.length &&
              (U = E.reduce((j, K) => {
                let te = f[K],
                  W = parseFloat(n[K]) || 0,
                  d = (parseFloat(te) - W) * q + W;
                return (j[K] = d), j;
              }, {})),
            (M.current = U),
            (M.position = D),
            D === 1 && ((M.active = !1), (M.complete = !0)),
            (0, br.merge)(e, M)
          );
        }
        return e;
      },
      v1 = (e = Object.freeze({}), t) => {
        switch (t.type) {
          case r1:
            return t.payload.ixInstances || Object.freeze({});
          case n1:
            return Object.freeze({});
          case i1: {
            let {
                instanceId: r,
                elementId: n,
                actionItem: i,
                eventId: o,
                eventTarget: a,
                eventStateKey: s,
                actionListId: c,
                groupIndex: f,
                isCarrier: E,
                origin: h,
                destination: _,
                immediate: y,
                verbose: A,
                continuous: O,
                parameterId: G,
                actionGroups: S,
                smoothing: N,
                restingValue: T,
                pluginInstance: D,
                pluginDuration: q,
                instanceDelay: M,
                skipMotion: U,
                skipToValue: j,
              } = t.payload,
              { actionTypeId: K } = i,
              te = l1(K),
              W = f1(te, K),
              C = Object.keys(_).filter((F) => _[F] != null),
              { easing: d } = i.config;
            return (0, br.set)(e, r, {
              id: r,
              elementId: n,
              active: !1,
              position: 0,
              start: 0,
              origin: h,
              destination: _,
              destinationKeys: C,
              immediate: y,
              verbose: A,
              current: null,
              actionItem: i,
              actionTypeId: K,
              eventId: o,
              eventTarget: a,
              eventStateKey: s,
              actionListId: c,
              groupIndex: f,
              renderType: te,
              isCarrier: E,
              styleProp: W,
              continuous: O,
              parameterId: G,
              actionGroups: S,
              smoothing: N,
              restingValue: T,
              pluginInstance: D,
              pluginDuration: q,
              instanceDelay: M,
              skipMotion: U,
              skipToValue: j,
              customEasingFn:
                Array.isArray(d) && d.length === 4 ? u1(d) : void 0,
            });
          }
          case o1: {
            let { instanceId: r, time: n } = t.payload;
            return (0, br.mergeIn)(e, [r], {
              active: !0,
              complete: !1,
              start: n,
            });
          }
          case a1: {
            let { instanceId: r } = t.payload;
            if (!e[r]) return e;
            let n = {},
              i = Object.keys(e),
              { length: o } = i;
            for (let a = 0; a < o; a++) {
              let s = i[a];
              s !== r && (n[s] = e[s]);
            }
            return n;
          }
          case s1: {
            let r = e,
              n = Object.keys(e),
              { length: i } = n;
            for (let o = 0; o < i; o++) {
              let a = n[o],
                s = e[a],
                c = s.continuous ? d1 : p1;
              r = (0, br.set)(r, a, c(s, t));
            }
            return r;
          }
          default:
            return e;
        }
      };
    Ei.ixInstances = v1;
  });
  var YE = u((gi) => {
    "use strict";
    Object.defineProperty(gi, "__esModule", { value: !0 });
    gi.ixParameters = void 0;
    var h1 = Ue(),
      {
        IX2_RAW_DATA_IMPORTED: E1,
        IX2_SESSION_STOPPED: g1,
        IX2_PARAMETER_CHANGED: _1,
      } = h1.IX2EngineActionTypes,
      y1 = (e = {}, t) => {
        switch (t.type) {
          case E1:
            return t.payload.ixParameters || {};
          case g1:
            return {};
          case _1: {
            let { key: r, value: n } = t.payload;
            return (e[r] = n), e;
          }
          default:
            return e;
        }
      };
    gi.ixParameters = y1;
  });
  var QE = u((_i) => {
    "use strict";
    Object.defineProperty(_i, "__esModule", { value: !0 });
    _i.default = void 0;
    var m1 = Qo(),
      I1 = gf(),
      T1 = Mf(),
      O1 = Gf(),
      b1 = jt(),
      A1 = zE(),
      S1 = YE(),
      { ixElements: w1 } = b1.IX2ElementsReducer,
      R1 = (0, m1.combineReducers)({
        ixData: I1.ixData,
        ixRequest: T1.ixRequest,
        ixSession: O1.ixSession,
        ixElements: w1,
        ixInstances: A1.ixInstances,
        ixParameters: S1.ixParameters,
      });
    _i.default = R1;
  });
  var $E = u(($5, an) => {
    function C1(e, t) {
      if (e == null) return {};
      var r = {},
        n = Object.keys(e),
        i,
        o;
      for (o = 0; o < n.length; o++)
        (i = n[o]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
      return r;
    }
    (an.exports = C1),
      (an.exports.__esModule = !0),
      (an.exports.default = an.exports);
  });
  var JE = u((Z5, ZE) => {
    var N1 = St(),
      x1 = Ne(),
      q1 = yt(),
      L1 = "[object String]";
    function P1(e) {
      return typeof e == "string" || (!x1(e) && q1(e) && N1(e) == L1);
    }
    ZE.exports = P1;
  });
  var tg = u((J5, eg) => {
    var D1 = wa(),
      M1 = D1("length");
    eg.exports = M1;
  });
  var ng = u((ej, rg) => {
    var F1 = "\\ud800-\\udfff",
      G1 = "\\u0300-\\u036f",
      X1 = "\\ufe20-\\ufe2f",
      V1 = "\\u20d0-\\u20ff",
      W1 = G1 + X1 + V1,
      U1 = "\\ufe0e\\ufe0f",
      B1 = "\\u200d",
      k1 = RegExp("[" + B1 + F1 + W1 + U1 + "]");
    function H1(e) {
      return k1.test(e);
    }
    rg.exports = H1;
  });
  var dg = u((tj, fg) => {
    var og = "\\ud800-\\udfff",
      j1 = "\\u0300-\\u036f",
      K1 = "\\ufe20-\\ufe2f",
      z1 = "\\u20d0-\\u20ff",
      Y1 = j1 + K1 + z1,
      Q1 = "\\ufe0e\\ufe0f",
      $1 = "[" + og + "]",
      za = "[" + Y1 + "]",
      Ya = "\\ud83c[\\udffb-\\udfff]",
      Z1 = "(?:" + za + "|" + Ya + ")",
      ag = "[^" + og + "]",
      sg = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      ug = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      J1 = "\\u200d",
      cg = Z1 + "?",
      lg = "[" + Q1 + "]?",
      eF = "(?:" + J1 + "(?:" + [ag, sg, ug].join("|") + ")" + lg + cg + ")*",
      tF = lg + cg + eF,
      rF = "(?:" + [ag + za + "?", za, sg, ug, $1].join("|") + ")",
      ig = RegExp(Ya + "(?=" + Ya + ")|" + rF + tF, "g");
    function nF(e) {
      for (var t = (ig.lastIndex = 0); ig.test(e); ) ++t;
      return t;
    }
    fg.exports = nF;
  });
  var vg = u((rj, pg) => {
    var iF = tg(),
      oF = ng(),
      aF = dg();
    function sF(e) {
      return oF(e) ? aF(e) : iF(e);
    }
    pg.exports = sF;
  });
  var Eg = u((nj, hg) => {
    var uF = Qn(),
      cF = $n(),
      lF = Vt(),
      fF = JE(),
      dF = vg(),
      pF = "[object Map]",
      vF = "[object Set]";
    function hF(e) {
      if (e == null) return 0;
      if (lF(e)) return fF(e) ? dF(e) : e.length;
      var t = cF(e);
      return t == pF || t == vF ? e.size : uF(e).length;
    }
    hg.exports = hF;
  });
  var _g = u((ij, gg) => {
    var EF = "Expected a function";
    function gF(e) {
      if (typeof e != "function") throw new TypeError(EF);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    gg.exports = gF;
  });
  var Qa = u((oj, yg) => {
    var _F = wt(),
      yF = (function () {
        try {
          var e = _F(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch {}
      })();
    yg.exports = yF;
  });
  var $a = u((aj, Ig) => {
    var mg = Qa();
    function mF(e, t, r) {
      t == "__proto__" && mg
        ? mg(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
        : (e[t] = r);
    }
    Ig.exports = mF;
  });
  var Og = u((sj, Tg) => {
    var IF = $a(),
      TF = Vn(),
      OF = Object.prototype,
      bF = OF.hasOwnProperty;
    function AF(e, t, r) {
      var n = e[t];
      (!(bF.call(e, t) && TF(n, r)) || (r === void 0 && !(t in e))) &&
        IF(e, t, r);
    }
    Tg.exports = AF;
  });
  var Sg = u((uj, Ag) => {
    var SF = Og(),
      wF = Qr(),
      RF = jn(),
      bg = ft(),
      CF = pr();
    function NF(e, t, r, n) {
      if (!bg(e)) return e;
      t = wF(t, e);
      for (var i = -1, o = t.length, a = o - 1, s = e; s != null && ++i < o; ) {
        var c = CF(t[i]),
          f = r;
        if (c === "__proto__" || c === "constructor" || c === "prototype")
          return e;
        if (i != a) {
          var E = s[c];
          (f = n ? n(E, c, s) : void 0),
            f === void 0 && (f = bg(E) ? E : RF(t[i + 1]) ? [] : {});
        }
        SF(s, c, f), (s = s[c]);
      }
      return e;
    }
    Ag.exports = NF;
  });
  var Rg = u((cj, wg) => {
    var xF = ei(),
      qF = Sg(),
      LF = Qr();
    function PF(e, t, r) {
      for (var n = -1, i = t.length, o = {}; ++n < i; ) {
        var a = t[n],
          s = xF(e, a);
        r(s, a) && qF(o, LF(a, e), s);
      }
      return o;
    }
    wg.exports = PF;
  });
  var Ng = u((lj, Cg) => {
    var DF = kn(),
      MF = Fo(),
      FF = da(),
      GF = fa(),
      XF = Object.getOwnPropertySymbols,
      VF = XF
        ? function (e) {
            for (var t = []; e; ) DF(t, FF(e)), (e = MF(e));
            return t;
          }
        : GF;
    Cg.exports = VF;
  });
  var qg = u((fj, xg) => {
    function WF(e) {
      var t = [];
      if (e != null) for (var r in Object(e)) t.push(r);
      return t;
    }
    xg.exports = WF;
  });
  var Pg = u((dj, Lg) => {
    var UF = ft(),
      BF = Yn(),
      kF = qg(),
      HF = Object.prototype,
      jF = HF.hasOwnProperty;
    function KF(e) {
      if (!UF(e)) return kF(e);
      var t = BF(e),
        r = [];
      for (var n in e)
        (n == "constructor" && (t || !jF.call(e, n))) || r.push(n);
      return r;
    }
    Lg.exports = KF;
  });
  var Mg = u((pj, Dg) => {
    var zF = va(),
      YF = Pg(),
      QF = Vt();
    function $F(e) {
      return QF(e) ? zF(e, !0) : YF(e);
    }
    Dg.exports = $F;
  });
  var Gg = u((vj, Fg) => {
    var ZF = la(),
      JF = Ng(),
      e2 = Mg();
    function t2(e) {
      return ZF(e, e2, JF);
    }
    Fg.exports = t2;
  });
  var Vg = u((hj, Xg) => {
    var r2 = Sa(),
      n2 = Rt(),
      i2 = Rg(),
      o2 = Gg();
    function a2(e, t) {
      if (e == null) return {};
      var r = r2(o2(e), function (n) {
        return [n];
      });
      return (
        (t = n2(t)),
        i2(e, r, function (n, i) {
          return t(n, i[0]);
        })
      );
    }
    Xg.exports = a2;
  });
  var Ug = u((Ej, Wg) => {
    var s2 = Rt(),
      u2 = _g(),
      c2 = Vg();
    function l2(e, t) {
      return c2(e, u2(s2(t)));
    }
    Wg.exports = l2;
  });
  var kg = u((gj, Bg) => {
    var f2 = Qn(),
      d2 = $n(),
      p2 = kr(),
      v2 = Ne(),
      h2 = Vt(),
      E2 = Hn(),
      g2 = Yn(),
      _2 = zn(),
      y2 = "[object Map]",
      m2 = "[object Set]",
      I2 = Object.prototype,
      T2 = I2.hasOwnProperty;
    function O2(e) {
      if (e == null) return !0;
      if (
        h2(e) &&
        (v2(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          E2(e) ||
          _2(e) ||
          p2(e))
      )
        return !e.length;
      var t = d2(e);
      if (t == y2 || t == m2) return !e.size;
      if (g2(e)) return !f2(e).length;
      for (var r in e) if (T2.call(e, r)) return !1;
      return !0;
    }
    Bg.exports = O2;
  });
  var jg = u((_j, Hg) => {
    var b2 = $a(),
      A2 = Ga(),
      S2 = Rt();
    function w2(e, t) {
      var r = {};
      return (
        (t = S2(t, 3)),
        A2(e, function (n, i, o) {
          b2(r, i, t(n, i, o));
        }),
        r
      );
    }
    Hg.exports = w2;
  });
  var zg = u((yj, Kg) => {
    function R2(e, t) {
      for (
        var r = -1, n = e == null ? 0 : e.length;
        ++r < n && t(e[r], r, e) !== !1;

      );
      return e;
    }
    Kg.exports = R2;
  });
  var Qg = u((mj, Yg) => {
    var C2 = ri();
    function N2(e) {
      return typeof e == "function" ? e : C2;
    }
    Yg.exports = N2;
  });
  var Zg = u((Ij, $g) => {
    var x2 = zg(),
      q2 = Xa(),
      L2 = Qg(),
      P2 = Ne();
    function D2(e, t) {
      var r = P2(e) ? x2 : q2;
      return r(e, L2(t));
    }
    $g.exports = D2;
  });
  var e_ = u((Tj, Jg) => {
    var M2 = tt(),
      F2 = function () {
        return M2.Date.now();
      };
    Jg.exports = F2;
  });
  var n_ = u((Oj, r_) => {
    var G2 = ft(),
      Za = e_(),
      t_ = ni(),
      X2 = "Expected a function",
      V2 = Math.max,
      W2 = Math.min;
    function U2(e, t, r) {
      var n,
        i,
        o,
        a,
        s,
        c,
        f = 0,
        E = !1,
        h = !1,
        _ = !0;
      if (typeof e != "function") throw new TypeError(X2);
      (t = t_(t) || 0),
        G2(r) &&
          ((E = !!r.leading),
          (h = "maxWait" in r),
          (o = h ? V2(t_(r.maxWait) || 0, t) : o),
          (_ = "trailing" in r ? !!r.trailing : _));
      function y(M) {
        var U = n,
          j = i;
        return (n = i = void 0), (f = M), (a = e.apply(j, U)), a;
      }
      function A(M) {
        return (f = M), (s = setTimeout(S, t)), E ? y(M) : a;
      }
      function O(M) {
        var U = M - c,
          j = M - f,
          K = t - U;
        return h ? W2(K, o - j) : K;
      }
      function G(M) {
        var U = M - c,
          j = M - f;
        return c === void 0 || U >= t || U < 0 || (h && j >= o);
      }
      function S() {
        var M = Za();
        if (G(M)) return N(M);
        s = setTimeout(S, O(M));
      }
      function N(M) {
        return (s = void 0), _ && n ? y(M) : ((n = i = void 0), a);
      }
      function T() {
        s !== void 0 && clearTimeout(s), (f = 0), (n = c = i = s = void 0);
      }
      function D() {
        return s === void 0 ? a : N(Za());
      }
      function q() {
        var M = Za(),
          U = G(M);
        if (((n = arguments), (i = this), (c = M), U)) {
          if (s === void 0) return A(c);
          if (h) return clearTimeout(s), (s = setTimeout(S, t)), y(c);
        }
        return s === void 0 && (s = setTimeout(S, t)), a;
      }
      return (q.cancel = T), (q.flush = D), q;
    }
    r_.exports = U2;
  });
  var o_ = u((bj, i_) => {
    var B2 = n_(),
      k2 = ft(),
      H2 = "Expected a function";
    function j2(e, t, r) {
      var n = !0,
        i = !0;
      if (typeof e != "function") throw new TypeError(H2);
      return (
        k2(r) &&
          ((n = "leading" in r ? !!r.leading : n),
          (i = "trailing" in r ? !!r.trailing : i)),
        B2(e, t, { leading: n, maxWait: t, trailing: i })
      );
    }
    i_.exports = j2;
  });
  var yi = u((oe) => {
    "use strict";
    var K2 = ut().default;
    Object.defineProperty(oe, "__esModule", { value: !0 });
    oe.viewportWidthChanged =
      oe.testFrameRendered =
      oe.stopRequested =
      oe.sessionStopped =
      oe.sessionStarted =
      oe.sessionInitialized =
      oe.rawDataImported =
      oe.previewRequested =
      oe.playbackRequested =
      oe.parameterChanged =
      oe.mediaQueriesDefined =
      oe.instanceStarted =
      oe.instanceRemoved =
      oe.instanceAdded =
      oe.eventStateChanged =
      oe.eventListenerAdded =
      oe.elementStateChanged =
      oe.clearRequested =
      oe.animationFrameChanged =
      oe.actionListPlaybackChanged =
        void 0;
    var a_ = K2(Xr()),
      s_ = Ue(),
      z2 = jt(),
      {
        IX2_RAW_DATA_IMPORTED: Y2,
        IX2_SESSION_INITIALIZED: Q2,
        IX2_SESSION_STARTED: $2,
        IX2_SESSION_STOPPED: Z2,
        IX2_PREVIEW_REQUESTED: J2,
        IX2_PLAYBACK_REQUESTED: eG,
        IX2_STOP_REQUESTED: tG,
        IX2_CLEAR_REQUESTED: rG,
        IX2_EVENT_LISTENER_ADDED: nG,
        IX2_TEST_FRAME_RENDERED: iG,
        IX2_EVENT_STATE_CHANGED: oG,
        IX2_ANIMATION_FRAME_CHANGED: aG,
        IX2_PARAMETER_CHANGED: sG,
        IX2_INSTANCE_ADDED: uG,
        IX2_INSTANCE_STARTED: cG,
        IX2_INSTANCE_REMOVED: lG,
        IX2_ELEMENT_STATE_CHANGED: fG,
        IX2_ACTION_LIST_PLAYBACK_CHANGED: dG,
        IX2_VIEWPORT_WIDTH_CHANGED: pG,
        IX2_MEDIA_QUERIES_DEFINED: vG,
      } = s_.IX2EngineActionTypes,
      { reifyState: hG } = z2.IX2VanillaUtils,
      EG = (e) => ({ type: Y2, payload: (0, a_.default)({}, hG(e)) });
    oe.rawDataImported = EG;
    var gG = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
      type: Q2,
      payload: { hasBoundaryNodes: e, reducedMotion: t },
    });
    oe.sessionInitialized = gG;
    var _G = () => ({ type: $2 });
    oe.sessionStarted = _G;
    var yG = () => ({ type: Z2 });
    oe.sessionStopped = yG;
    var mG = ({ rawData: e, defer: t }) => ({
      type: J2,
      payload: { defer: t, rawData: e },
    });
    oe.previewRequested = mG;
    var IG = ({
      actionTypeId: e = s_.ActionTypeConsts.GENERAL_START_ACTION,
      actionListId: t,
      actionItemId: r,
      eventId: n,
      allowEvents: i,
      immediate: o,
      testManual: a,
      verbose: s,
      rawData: c,
    }) => ({
      type: eG,
      payload: {
        actionTypeId: e,
        actionListId: t,
        actionItemId: r,
        testManual: a,
        eventId: n,
        allowEvents: i,
        immediate: o,
        verbose: s,
        rawData: c,
      },
    });
    oe.playbackRequested = IG;
    var TG = (e) => ({ type: tG, payload: { actionListId: e } });
    oe.stopRequested = TG;
    var OG = () => ({ type: rG });
    oe.clearRequested = OG;
    var bG = (e, t) => ({
      type: nG,
      payload: { target: e, listenerParams: t },
    });
    oe.eventListenerAdded = bG;
    var AG = (e = 1) => ({ type: iG, payload: { step: e } });
    oe.testFrameRendered = AG;
    var SG = (e, t) => ({ type: oG, payload: { stateKey: e, newState: t } });
    oe.eventStateChanged = SG;
    var wG = (e, t) => ({ type: aG, payload: { now: e, parameters: t } });
    oe.animationFrameChanged = wG;
    var RG = (e, t) => ({ type: sG, payload: { key: e, value: t } });
    oe.parameterChanged = RG;
    var CG = (e) => ({ type: uG, payload: (0, a_.default)({}, e) });
    oe.instanceAdded = CG;
    var NG = (e, t) => ({ type: cG, payload: { instanceId: e, time: t } });
    oe.instanceStarted = NG;
    var xG = (e) => ({ type: lG, payload: { instanceId: e } });
    oe.instanceRemoved = xG;
    var qG = (e, t, r, n) => ({
      type: fG,
      payload: { elementId: e, actionTypeId: t, current: r, actionItem: n },
    });
    oe.elementStateChanged = qG;
    var LG = ({ actionListId: e, isPlaying: t }) => ({
      type: dG,
      payload: { actionListId: e, isPlaying: t },
    });
    oe.actionListPlaybackChanged = LG;
    var PG = ({ width: e, mediaQueries: t }) => ({
      type: pG,
      payload: { width: e, mediaQueries: t },
    });
    oe.viewportWidthChanged = PG;
    var DG = () => ({ type: vG });
    oe.mediaQueriesDefined = DG;
  });
  var l_ = u((qe) => {
    "use strict";
    Object.defineProperty(qe, "__esModule", { value: !0 });
    qe.elementContains = KG;
    qe.getChildElements = YG;
    qe.getClosestElement = void 0;
    qe.getProperty = UG;
    qe.getQuerySelector = kG;
    qe.getRefType = ZG;
    qe.getSiblingElements = QG;
    qe.getStyle = WG;
    qe.getValidDocument = HG;
    qe.isSiblingNode = zG;
    qe.matchSelector = BG;
    qe.queryDocument = jG;
    qe.setStyle = VG;
    var MG = jt(),
      FG = Ue(),
      { ELEMENT_MATCHES: Ja } = MG.IX2BrowserSupport,
      {
        IX2_ID_DELIMITER: u_,
        HTML_ELEMENT: GG,
        PLAIN_OBJECT: XG,
        WF_PAGE: c_,
      } = FG.IX2EngineConstants;
    function VG(e, t, r) {
      e.style[t] = r;
    }
    function WG(e, t) {
      return e.style[t];
    }
    function UG(e, t) {
      return e[t];
    }
    function BG(e) {
      return (t) => t[Ja](e);
    }
    function kG({ id: e, selector: t }) {
      if (e) {
        let r = e;
        if (e.indexOf(u_) !== -1) {
          let n = e.split(u_),
            i = n[0];
          if (((r = n[1]), i !== document.documentElement.getAttribute(c_)))
            return null;
        }
        return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
      }
      return t;
    }
    function HG(e) {
      return e == null || e === document.documentElement.getAttribute(c_)
        ? document
        : null;
    }
    function jG(e, t) {
      return Array.prototype.slice.call(
        document.querySelectorAll(t ? e + " " + t : e)
      );
    }
    function KG(e, t) {
      return e.contains(t);
    }
    function zG(e, t) {
      return e !== t && e.parentNode === t.parentNode;
    }
    function YG(e) {
      let t = [];
      for (let r = 0, { length: n } = e || []; r < n; r++) {
        let { children: i } = e[r],
          { length: o } = i;
        if (o) for (let a = 0; a < o; a++) t.push(i[a]);
      }
      return t;
    }
    function QG(e = []) {
      let t = [],
        r = [];
      for (let n = 0, { length: i } = e; n < i; n++) {
        let { parentNode: o } = e[n];
        if (!o || !o.children || !o.children.length || r.indexOf(o) !== -1)
          continue;
        r.push(o);
        let a = o.firstElementChild;
        for (; a != null; )
          e.indexOf(a) === -1 && t.push(a), (a = a.nextElementSibling);
      }
      return t;
    }
    var $G = Element.prototype.closest
      ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
      : (e, t) => {
          if (!document.documentElement.contains(e)) return null;
          let r = e;
          do {
            if (r[Ja] && r[Ja](t)) return r;
            r = r.parentNode;
          } while (r != null);
          return null;
        };
    qe.getClosestElement = $G;
    function ZG(e) {
      return e != null && typeof e == "object"
        ? e instanceof Element
          ? GG
          : XG
        : null;
    }
  });
  var es = u((wj, d_) => {
    var JG = ft(),
      f_ = Object.create,
      eX = (function () {
        function e() {}
        return function (t) {
          if (!JG(t)) return {};
          if (f_) return f_(t);
          e.prototype = t;
          var r = new e();
          return (e.prototype = void 0), r;
        };
      })();
    d_.exports = eX;
  });
  var mi = u((Rj, p_) => {
    function tX() {}
    p_.exports = tX;
  });
  var Ti = u((Cj, v_) => {
    var rX = es(),
      nX = mi();
    function Ii(e, t) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0);
    }
    Ii.prototype = rX(nX.prototype);
    Ii.prototype.constructor = Ii;
    v_.exports = Ii;
  });
  var __ = u((Nj, g_) => {
    var h_ = tr(),
      iX = kr(),
      oX = Ne(),
      E_ = h_ ? h_.isConcatSpreadable : void 0;
    function aX(e) {
      return oX(e) || iX(e) || !!(E_ && e && e[E_]);
    }
    g_.exports = aX;
  });
  var I_ = u((xj, m_) => {
    var sX = kn(),
      uX = __();
    function y_(e, t, r, n, i) {
      var o = -1,
        a = e.length;
      for (r || (r = uX), i || (i = []); ++o < a; ) {
        var s = e[o];
        t > 0 && r(s)
          ? t > 1
            ? y_(s, t - 1, r, n, i)
            : sX(i, s)
          : n || (i[i.length] = s);
      }
      return i;
    }
    m_.exports = y_;
  });
  var O_ = u((qj, T_) => {
    var cX = I_();
    function lX(e) {
      var t = e == null ? 0 : e.length;
      return t ? cX(e, 1) : [];
    }
    T_.exports = lX;
  });
  var A_ = u((Lj, b_) => {
    function fX(e, t, r) {
      switch (r.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, r[0]);
        case 2:
          return e.call(t, r[0], r[1]);
        case 3:
          return e.call(t, r[0], r[1], r[2]);
      }
      return e.apply(t, r);
    }
    b_.exports = fX;
  });
  var R_ = u((Pj, w_) => {
    var dX = A_(),
      S_ = Math.max;
    function pX(e, t, r) {
      return (
        (t = S_(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var n = arguments, i = -1, o = S_(n.length - t, 0), a = Array(o);
            ++i < o;

          )
            a[i] = n[t + i];
          i = -1;
          for (var s = Array(t + 1); ++i < t; ) s[i] = n[i];
          return (s[t] = r(a)), dX(e, this, s);
        }
      );
    }
    w_.exports = pX;
  });
  var N_ = u((Dj, C_) => {
    function vX(e) {
      return function () {
        return e;
      };
    }
    C_.exports = vX;
  });
  var L_ = u((Mj, q_) => {
    var hX = N_(),
      x_ = Qa(),
      EX = ri(),
      gX = x_
        ? function (e, t) {
            return x_(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: hX(t),
              writable: !0,
            });
          }
        : EX;
    q_.exports = gX;
  });
  var D_ = u((Fj, P_) => {
    var _X = 800,
      yX = 16,
      mX = Date.now;
    function IX(e) {
      var t = 0,
        r = 0;
      return function () {
        var n = mX(),
          i = yX - (n - r);
        if (((r = n), i > 0)) {
          if (++t >= _X) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    P_.exports = IX;
  });
  var F_ = u((Gj, M_) => {
    var TX = L_(),
      OX = D_(),
      bX = OX(TX);
    M_.exports = bX;
  });
  var X_ = u((Xj, G_) => {
    var AX = O_(),
      SX = R_(),
      wX = F_();
    function RX(e) {
      return wX(SX(e, void 0, AX), e + "");
    }
    G_.exports = RX;
  });
  var U_ = u((Vj, W_) => {
    var V_ = ha(),
      CX = V_ && new V_();
    W_.exports = CX;
  });
  var k_ = u((Wj, B_) => {
    function NX() {}
    B_.exports = NX;
  });
  var ts = u((Uj, j_) => {
    var H_ = U_(),
      xX = k_(),
      qX = H_
        ? function (e) {
            return H_.get(e);
          }
        : xX;
    j_.exports = qX;
  });
  var z_ = u((Bj, K_) => {
    var LX = {};
    K_.exports = LX;
  });
  var rs = u((kj, Q_) => {
    var Y_ = z_(),
      PX = Object.prototype,
      DX = PX.hasOwnProperty;
    function MX(e) {
      for (
        var t = e.name + "", r = Y_[t], n = DX.call(Y_, t) ? r.length : 0;
        n--;

      ) {
        var i = r[n],
          o = i.func;
        if (o == null || o == e) return i.name;
      }
      return t;
    }
    Q_.exports = MX;
  });
  var bi = u((Hj, $_) => {
    var FX = es(),
      GX = mi(),
      XX = 4294967295;
    function Oi(e) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = XX),
        (this.__views__ = []);
    }
    Oi.prototype = FX(GX.prototype);
    Oi.prototype.constructor = Oi;
    $_.exports = Oi;
  });
  var J_ = u((jj, Z_) => {
    function VX(e, t) {
      var r = -1,
        n = e.length;
      for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
      return t;
    }
    Z_.exports = VX;
  });
  var ty = u((Kj, ey) => {
    var WX = bi(),
      UX = Ti(),
      BX = J_();
    function kX(e) {
      if (e instanceof WX) return e.clone();
      var t = new UX(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = BX(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    ey.exports = kX;
  });
  var iy = u((zj, ny) => {
    var HX = bi(),
      ry = Ti(),
      jX = mi(),
      KX = Ne(),
      zX = yt(),
      YX = ty(),
      QX = Object.prototype,
      $X = QX.hasOwnProperty;
    function Ai(e) {
      if (zX(e) && !KX(e) && !(e instanceof HX)) {
        if (e instanceof ry) return e;
        if ($X.call(e, "__wrapped__")) return YX(e);
      }
      return new ry(e);
    }
    Ai.prototype = jX.prototype;
    Ai.prototype.constructor = Ai;
    ny.exports = Ai;
  });
  var ay = u((Yj, oy) => {
    var ZX = bi(),
      JX = ts(),
      eV = rs(),
      tV = iy();
    function rV(e) {
      var t = eV(e),
        r = tV[t];
      if (typeof r != "function" || !(t in ZX.prototype)) return !1;
      if (e === r) return !0;
      var n = JX(r);
      return !!n && e === n[0];
    }
    oy.exports = rV;
  });
  var ly = u((Qj, cy) => {
    var sy = Ti(),
      nV = X_(),
      iV = ts(),
      ns = rs(),
      oV = Ne(),
      uy = ay(),
      aV = "Expected a function",
      sV = 8,
      uV = 32,
      cV = 128,
      lV = 256;
    function fV(e) {
      return nV(function (t) {
        var r = t.length,
          n = r,
          i = sy.prototype.thru;
        for (e && t.reverse(); n--; ) {
          var o = t[n];
          if (typeof o != "function") throw new TypeError(aV);
          if (i && !a && ns(o) == "wrapper") var a = new sy([], !0);
        }
        for (n = a ? n : r; ++n < r; ) {
          o = t[n];
          var s = ns(o),
            c = s == "wrapper" ? iV(o) : void 0;
          c &&
          uy(c[0]) &&
          c[1] == (cV | sV | uV | lV) &&
          !c[4].length &&
          c[9] == 1
            ? (a = a[ns(c[0])].apply(a, c[3]))
            : (a = o.length == 1 && uy(o) ? a[s]() : a.thru(o));
        }
        return function () {
          var f = arguments,
            E = f[0];
          if (a && f.length == 1 && oV(E)) return a.plant(E).value();
          for (var h = 0, _ = r ? t[h].apply(this, f) : E; ++h < r; )
            _ = t[h].call(this, _);
          return _;
        };
      });
    }
    cy.exports = fV;
  });
  var dy = u(($j, fy) => {
    var dV = ly(),
      pV = dV();
    fy.exports = pV;
  });
  var vy = u((Zj, py) => {
    function vV(e, t, r) {
      return (
        e === e &&
          (r !== void 0 && (e = e <= r ? e : r),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    py.exports = vV;
  });
  var Ey = u((Jj, hy) => {
    var hV = vy(),
      is = ni();
    function EV(e, t, r) {
      return (
        r === void 0 && ((r = t), (t = void 0)),
        r !== void 0 && ((r = is(r)), (r = r === r ? r : 0)),
        t !== void 0 && ((t = is(t)), (t = t === t ? t : 0)),
        hV(is(e), t, r)
      );
    }
    hy.exports = EV;
  });
  var Py = u((Ni) => {
    "use strict";
    var Ci = ut().default;
    Object.defineProperty(Ni, "__esModule", { value: !0 });
    Ni.default = void 0;
    var Ke = Ci(Xr()),
      gV = Ci(dy()),
      _V = Ci(ti()),
      yV = Ci(Ey()),
      Kt = Ue(),
      os = cs(),
      Si = yi(),
      mV = jt(),
      {
        MOUSE_CLICK: IV,
        MOUSE_SECOND_CLICK: TV,
        MOUSE_DOWN: OV,
        MOUSE_UP: bV,
        MOUSE_OVER: AV,
        MOUSE_OUT: SV,
        DROPDOWN_CLOSE: wV,
        DROPDOWN_OPEN: RV,
        SLIDER_ACTIVE: CV,
        SLIDER_INACTIVE: NV,
        TAB_ACTIVE: xV,
        TAB_INACTIVE: qV,
        NAVBAR_CLOSE: LV,
        NAVBAR_OPEN: PV,
        MOUSE_MOVE: DV,
        PAGE_SCROLL_DOWN: Ay,
        SCROLL_INTO_VIEW: Sy,
        SCROLL_OUT_OF_VIEW: MV,
        PAGE_SCROLL_UP: FV,
        SCROLLING_IN_VIEW: GV,
        PAGE_FINISH: wy,
        ECOMMERCE_CART_CLOSE: XV,
        ECOMMERCE_CART_OPEN: VV,
        PAGE_START: Ry,
        PAGE_SCROLL: WV,
      } = Kt.EventTypeConsts,
      as = "COMPONENT_ACTIVE",
      Cy = "COMPONENT_INACTIVE",
      { COLON_DELIMITER: gy } = Kt.IX2EngineConstants,
      { getNamespacedParameterId: _y } = mV.IX2VanillaUtils,
      Ny = (e) => (t) => typeof t == "object" && e(t) ? !0 : t,
      un = Ny(({ element: e, nativeEvent: t }) => e === t.target),
      UV = Ny(({ element: e, nativeEvent: t }) => e.contains(t.target)),
      ht = (0, gV.default)([un, UV]),
      xy = (e, t) => {
        if (t) {
          let { ixData: r } = e.getState(),
            { events: n } = r,
            i = n[t];
          if (i && !kV[i.eventTypeId]) return i;
        }
        return null;
      },
      BV = ({ store: e, event: t }) => {
        let { action: r } = t,
          { autoStopEventId: n } = r.config;
        return !!xy(e, n);
      },
      ke = ({ store: e, event: t, element: r, eventStateKey: n }, i) => {
        let { action: o, id: a } = t,
          { actionListId: s, autoStopEventId: c } = o.config,
          f = xy(e, c);
        return (
          f &&
            (0, os.stopActionGroup)({
              store: e,
              eventId: c,
              eventTarget: r,
              eventStateKey: c + gy + n.split(gy)[1],
              actionListId: (0, _V.default)(f, "action.config.actionListId"),
            }),
          (0, os.stopActionGroup)({
            store: e,
            eventId: a,
            eventTarget: r,
            eventStateKey: n,
            actionListId: s,
          }),
          (0, os.startActionGroup)({
            store: e,
            eventId: a,
            eventTarget: r,
            eventStateKey: n,
            actionListId: s,
          }),
          i
        );
      },
      rt = (e, t) => (r, n) => e(r, n) === !0 ? t(r, n) : n,
      cn = { handler: rt(ht, ke) },
      qy = (0, Ke.default)({}, cn, { types: [as, Cy].join(" ") }),
      ss = [
        { target: window, types: "resize orientationchange", throttle: !0 },
        {
          target: document,
          types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
          throttle: !0,
        },
      ],
      yy = "mouseover mouseout",
      us = { types: ss },
      kV = { PAGE_START: Ry, PAGE_FINISH: wy },
      sn = (() => {
        let e = window.pageXOffset !== void 0,
          r =
            document.compatMode === "CSS1Compat"
              ? document.documentElement
              : document.body;
        return () => ({
          scrollLeft: e ? window.pageXOffset : r.scrollLeft,
          scrollTop: e ? window.pageYOffset : r.scrollTop,
          stiffScrollTop: (0, yV.default)(
            e ? window.pageYOffset : r.scrollTop,
            0,
            r.scrollHeight - window.innerHeight
          ),
          scrollWidth: r.scrollWidth,
          scrollHeight: r.scrollHeight,
          clientWidth: r.clientWidth,
          clientHeight: r.clientHeight,
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
        });
      })(),
      HV = (e, t) =>
        !(
          e.left > t.right ||
          e.right < t.left ||
          e.top > t.bottom ||
          e.bottom < t.top
        ),
      jV = ({ element: e, nativeEvent: t }) => {
        let { type: r, target: n, relatedTarget: i } = t,
          o = e.contains(n);
        if (r === "mouseover" && o) return !0;
        let a = e.contains(i);
        return !!(r === "mouseout" && o && a);
      },
      KV = (e) => {
        let {
            element: t,
            event: { config: r },
          } = e,
          { clientWidth: n, clientHeight: i } = sn(),
          o = r.scrollOffsetValue,
          c = r.scrollOffsetUnit === "PX" ? o : (i * (o || 0)) / 100;
        return HV(t.getBoundingClientRect(), {
          left: 0,
          top: c,
          right: n,
          bottom: i - c,
        });
      },
      Ly = (e) => (t, r) => {
        let { type: n } = t.nativeEvent,
          i = [as, Cy].indexOf(n) !== -1 ? n === as : r.isActive,
          o = (0, Ke.default)({}, r, { isActive: i });
        return ((!r || o.isActive !== r.isActive) && e(t, o)) || o;
      },
      my = (e) => (t, r) => {
        let n = { elementHovered: jV(t) };
        return (
          ((r ? n.elementHovered !== r.elementHovered : n.elementHovered) &&
            e(t, n)) ||
          n
        );
      },
      zV = (e) => (t, r) => {
        let n = (0, Ke.default)({}, r, { elementVisible: KV(t) });
        return (
          ((r ? n.elementVisible !== r.elementVisible : n.elementVisible) &&
            e(t, n)) ||
          n
        );
      },
      Iy =
        (e) =>
        (t, r = {}) => {
          let { stiffScrollTop: n, scrollHeight: i, innerHeight: o } = sn(),
            {
              event: { config: a, eventTypeId: s },
            } = t,
            { scrollOffsetValue: c, scrollOffsetUnit: f } = a,
            E = f === "PX",
            h = i - o,
            _ = Number((n / h).toFixed(2));
          if (r && r.percentTop === _) return r;
          let y = (E ? c : (o * (c || 0)) / 100) / h,
            A,
            O,
            G = 0;
          r &&
            ((A = _ > r.percentTop),
            (O = r.scrollingDown !== A),
            (G = O ? _ : r.anchorTop));
          let S = s === Ay ? _ >= G + y : _ <= G - y,
            N = (0, Ke.default)({}, r, {
              percentTop: _,
              inBounds: S,
              anchorTop: G,
              scrollingDown: A,
            });
          return (r && S && (O || N.inBounds !== r.inBounds) && e(t, N)) || N;
        },
      YV = (e, t) =>
        e.left > t.left &&
        e.left < t.right &&
        e.top > t.top &&
        e.top < t.bottom,
      QV = (e) => (t, r) => {
        let n = { finished: document.readyState === "complete" };
        return n.finished && !(r && r.finshed) && e(t), n;
      },
      $V = (e) => (t, r) => {
        let n = { started: !0 };
        return r || e(t), n;
      },
      Ty =
        (e) =>
        (t, r = { clickCount: 0 }) => {
          let n = { clickCount: (r.clickCount % 2) + 1 };
          return (n.clickCount !== r.clickCount && e(t, n)) || n;
        },
      wi = (e = !0) =>
        (0, Ke.default)({}, qy, {
          handler: rt(
            e ? ht : un,
            Ly((t, r) => (r.isActive ? cn.handler(t, r) : r))
          ),
        }),
      Ri = (e = !0) =>
        (0, Ke.default)({}, qy, {
          handler: rt(
            e ? ht : un,
            Ly((t, r) => (r.isActive ? r : cn.handler(t, r)))
          ),
        }),
      Oy = (0, Ke.default)({}, us, {
        handler: zV((e, t) => {
          let { elementVisible: r } = t,
            { event: n, store: i } = e,
            { ixData: o } = i.getState(),
            { events: a } = o;
          return !a[n.action.config.autoStopEventId] && t.triggered
            ? t
            : (n.eventTypeId === Sy) === r
            ? (ke(e), (0, Ke.default)({}, t, { triggered: !0 }))
            : t;
        }),
      }),
      by = 0.05,
      ZV = {
        [CV]: wi(),
        [NV]: Ri(),
        [RV]: wi(),
        [wV]: Ri(),
        [PV]: wi(!1),
        [LV]: Ri(!1),
        [xV]: wi(),
        [qV]: Ri(),
        [VV]: { types: "ecommerce-cart-open", handler: rt(ht, ke) },
        [XV]: { types: "ecommerce-cart-close", handler: rt(ht, ke) },
        [IV]: {
          types: "click",
          handler: rt(
            ht,
            Ty((e, { clickCount: t }) => {
              BV(e) ? t === 1 && ke(e) : ke(e);
            })
          ),
        },
        [TV]: {
          types: "click",
          handler: rt(
            ht,
            Ty((e, { clickCount: t }) => {
              t === 2 && ke(e);
            })
          ),
        },
        [OV]: (0, Ke.default)({}, cn, { types: "mousedown" }),
        [bV]: (0, Ke.default)({}, cn, { types: "mouseup" }),
        [AV]: {
          types: yy,
          handler: rt(
            ht,
            my((e, t) => {
              t.elementHovered && ke(e);
            })
          ),
        },
        [SV]: {
          types: yy,
          handler: rt(
            ht,
            my((e, t) => {
              t.elementHovered || ke(e);
            })
          ),
        },
        [DV]: {
          types: "mousemove mouseout scroll",
          handler: (
            {
              store: e,
              element: t,
              eventConfig: r,
              nativeEvent: n,
              eventStateKey: i,
            },
            o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
          ) => {
            let {
                basedOn: a,
                selectedAxis: s,
                continuousParameterGroupId: c,
                reverse: f,
                restingState: E = 0,
              } = r,
              {
                clientX: h = o.clientX,
                clientY: _ = o.clientY,
                pageX: y = o.pageX,
                pageY: A = o.pageY,
              } = n,
              O = s === "X_AXIS",
              G = n.type === "mouseout",
              S = E / 100,
              N = c,
              T = !1;
            switch (a) {
              case Kt.EventBasedOn.VIEWPORT: {
                S = O
                  ? Math.min(h, window.innerWidth) / window.innerWidth
                  : Math.min(_, window.innerHeight) / window.innerHeight;
                break;
              }
              case Kt.EventBasedOn.PAGE: {
                let {
                  scrollLeft: D,
                  scrollTop: q,
                  scrollWidth: M,
                  scrollHeight: U,
                } = sn();
                S = O ? Math.min(D + y, M) / M : Math.min(q + A, U) / U;
                break;
              }
              case Kt.EventBasedOn.ELEMENT:
              default: {
                N = _y(i, c);
                let D = n.type.indexOf("mouse") === 0;
                if (D && ht({ element: t, nativeEvent: n }) !== !0) break;
                let q = t.getBoundingClientRect(),
                  { left: M, top: U, width: j, height: K } = q;
                if (!D && !YV({ left: h, top: _ }, q)) break;
                (T = !0), (S = O ? (h - M) / j : (_ - U) / K);
                break;
              }
            }
            return (
              G && (S > 1 - by || S < by) && (S = Math.round(S)),
              (a !== Kt.EventBasedOn.ELEMENT || T || T !== o.elementHovered) &&
                ((S = f ? 1 - S : S),
                e.dispatch((0, Si.parameterChanged)(N, S))),
              { elementHovered: T, clientX: h, clientY: _, pageX: y, pageY: A }
            );
          },
        },
        [WV]: {
          types: ss,
          handler: ({ store: e, eventConfig: t }) => {
            let { continuousParameterGroupId: r, reverse: n } = t,
              { scrollTop: i, scrollHeight: o, clientHeight: a } = sn(),
              s = i / (o - a);
            (s = n ? 1 - s : s), e.dispatch((0, Si.parameterChanged)(r, s));
          },
        },
        [GV]: {
          types: ss,
          handler: (
            { element: e, store: t, eventConfig: r, eventStateKey: n },
            i = { scrollPercent: 0 }
          ) => {
            let {
                scrollLeft: o,
                scrollTop: a,
                scrollWidth: s,
                scrollHeight: c,
                clientHeight: f,
              } = sn(),
              {
                basedOn: E,
                selectedAxis: h,
                continuousParameterGroupId: _,
                startsEntering: y,
                startsExiting: A,
                addEndOffset: O,
                addStartOffset: G,
                addOffsetValue: S = 0,
                endOffsetValue: N = 0,
              } = r,
              T = h === "X_AXIS";
            if (E === Kt.EventBasedOn.VIEWPORT) {
              let D = T ? o / s : a / c;
              return (
                D !== i.scrollPercent &&
                  t.dispatch((0, Si.parameterChanged)(_, D)),
                { scrollPercent: D }
              );
            } else {
              let D = _y(n, _),
                q = e.getBoundingClientRect(),
                M = (G ? S : 0) / 100,
                U = (O ? N : 0) / 100;
              (M = y ? M : 1 - M), (U = A ? U : 1 - U);
              let j = q.top + Math.min(q.height * M, f),
                te = q.top + q.height * U - j,
                W = Math.min(f + te, c),
                d = Math.min(Math.max(0, f - j), W) / W;
              return (
                d !== i.scrollPercent &&
                  t.dispatch((0, Si.parameterChanged)(D, d)),
                { scrollPercent: d }
              );
            }
          },
        },
        [Sy]: Oy,
        [MV]: Oy,
        [Ay]: (0, Ke.default)({}, us, {
          handler: Iy((e, t) => {
            t.scrollingDown && ke(e);
          }),
        }),
        [FV]: (0, Ke.default)({}, us, {
          handler: Iy((e, t) => {
            t.scrollingDown || ke(e);
          }),
        }),
        [wy]: {
          types: "readystatechange IX2_PAGE_UPDATE",
          handler: rt(un, QV(ke)),
        },
        [Ry]: {
          types: "readystatechange IX2_PAGE_UPDATE",
          handler: rt(un, $V(ke)),
        },
      };
    Ni.default = ZV;
  });
  var cs = u((qt) => {
    "use strict";
    var it = ut().default,
      JV = $t().default;
    Object.defineProperty(qt, "__esModule", { value: !0 });
    qt.observeRequests = RW;
    qt.startActionGroup = Es;
    qt.startEngine = Pi;
    qt.stopActionGroup = hs;
    qt.stopAllActionGroups = By;
    qt.stopEngine = Di;
    var eW = it(Xr()),
      tW = it($E()),
      rW = it(xa()),
      xt = it(ti()),
      nW = it(Eg()),
      iW = it(Ug()),
      oW = it(kg()),
      aW = it(jg()),
      ln = it(Zg()),
      sW = it(o_()),
      nt = Ue(),
      Fy = jt(),
      Te = yi(),
      we = JV(l_()),
      uW = it(Py()),
      cW = ["store", "computedStyle"],
      lW = Object.keys(nt.QuickEffectIds),
      ls = (e) => lW.includes(e),
      {
        COLON_DELIMITER: fs,
        BOUNDARY_SELECTOR: xi,
        HTML_ELEMENT: Gy,
        RENDER_GENERAL: fW,
        W_MOD_IX: Dy,
      } = nt.IX2EngineConstants,
      {
        getAffectedElements: qi,
        getElementId: dW,
        getDestinationValues: ds,
        observeStore: zt,
        getInstanceId: pW,
        renderHTMLElement: vW,
        clearAllStyles: Xy,
        getMaxDurationItemIndex: hW,
        getComputedStyle: EW,
        getInstanceOrigin: gW,
        reduceListToGroup: _W,
        shouldNamespaceEventParameter: yW,
        getNamespacedParameterId: mW,
        shouldAllowMediaQuery: Li,
        cleanupHTMLElement: IW,
        stringifyTarget: TW,
        mediaQueriesEqual: OW,
        shallowEqual: bW,
      } = Fy.IX2VanillaUtils,
      {
        isPluginType: ps,
        createPluginInstance: vs,
        getPluginDuration: AW,
      } = Fy.IX2VanillaPlugins,
      My = navigator.userAgent,
      SW = My.match(/iPad/i) || My.match(/iPhone/),
      wW = 12;
    function RW(e) {
      zt({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: xW }),
        zt({
          store: e,
          select: ({ ixRequest: t }) => t.playback,
          onChange: qW,
        }),
        zt({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: LW }),
        zt({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: PW });
    }
    function CW(e) {
      zt({
        store: e,
        select: ({ ixSession: t }) => t.mediaQueryKey,
        onChange: () => {
          Di(e),
            Xy({ store: e, elementApi: we }),
            Pi({ store: e, allowEvents: !0 }),
            Vy();
        },
      });
    }
    function NW(e, t) {
      let r = zt({
        store: e,
        select: ({ ixSession: n }) => n.tick,
        onChange: (n) => {
          t(n), r();
        },
      });
    }
    function xW({ rawData: e, defer: t }, r) {
      let n = () => {
        Pi({ store: r, rawData: e, allowEvents: !0 }), Vy();
      };
      t ? setTimeout(n, 0) : n();
    }
    function Vy() {
      document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
    }
    function qW(e, t) {
      let {
          actionTypeId: r,
          actionListId: n,
          actionItemId: i,
          eventId: o,
          allowEvents: a,
          immediate: s,
          testManual: c,
          verbose: f = !0,
        } = e,
        { rawData: E } = e;
      if (n && i && E && s) {
        let h = E.actionLists[n];
        h && (E = _W({ actionList: h, actionItemId: i, rawData: E }));
      }
      if (
        (Pi({ store: t, rawData: E, allowEvents: a, testManual: c }),
        (n && r === nt.ActionTypeConsts.GENERAL_START_ACTION) || ls(r))
      ) {
        hs({ store: t, actionListId: n }),
          Uy({ store: t, actionListId: n, eventId: o });
        let h = Es({
          store: t,
          eventId: o,
          actionListId: n,
          immediate: s,
          verbose: f,
        });
        f &&
          h &&
          t.dispatch(
            (0, Te.actionListPlaybackChanged)({
              actionListId: n,
              isPlaying: !s,
            })
          );
      }
    }
    function LW({ actionListId: e }, t) {
      e ? hs({ store: t, actionListId: e }) : By({ store: t }), Di(t);
    }
    function PW(e, t) {
      Di(t), Xy({ store: t, elementApi: we });
    }
    function Pi({ store: e, rawData: t, allowEvents: r, testManual: n }) {
      let { ixSession: i } = e.getState();
      t && e.dispatch((0, Te.rawDataImported)(t)),
        i.active ||
          (e.dispatch(
            (0, Te.sessionInitialized)({
              hasBoundaryNodes: !!document.querySelector(xi),
              reducedMotion:
                document.body.hasAttribute("data-wf-ix-vacation") &&
                window.matchMedia("(prefers-reduced-motion)").matches,
            })
          ),
          r &&
            (VW(e),
            DW(),
            e.getState().ixSession.hasDefinedMediaQueries && CW(e)),
          e.dispatch((0, Te.sessionStarted)()),
          MW(e, n));
    }
    function DW() {
      let { documentElement: e } = document;
      e.className.indexOf(Dy) === -1 && (e.className += ` ${Dy}`);
    }
    function MW(e, t) {
      let r = (n) => {
        let { ixSession: i, ixParameters: o } = e.getState();
        i.active &&
          (e.dispatch((0, Te.animationFrameChanged)(n, o)),
          t ? NW(e, r) : requestAnimationFrame(r));
      };
      r(window.performance.now());
    }
    function Di(e) {
      let { ixSession: t } = e.getState();
      if (t.active) {
        let { eventListeners: r } = t;
        r.forEach(FW), e.dispatch((0, Te.sessionStopped)());
      }
    }
    function FW({ target: e, listenerParams: t }) {
      e.removeEventListener.apply(e, t);
    }
    function GW({
      store: e,
      eventStateKey: t,
      eventTarget: r,
      eventId: n,
      eventConfig: i,
      actionListId: o,
      parameterGroup: a,
      smoothing: s,
      restingValue: c,
    }) {
      let { ixData: f, ixSession: E } = e.getState(),
        { events: h } = f,
        _ = h[n],
        { eventTypeId: y } = _,
        A = {},
        O = {},
        G = [],
        { continuousActionGroups: S } = a,
        { id: N } = a;
      yW(y, i) && (N = mW(t, N));
      let T = E.hasBoundaryNodes && r ? we.getClosestElement(r, xi) : null;
      S.forEach((D) => {
        let { keyframe: q, actionItems: M } = D;
        M.forEach((U) => {
          let { actionTypeId: j } = U,
            { target: K } = U.config;
          if (!K) return;
          let te = K.boundaryMode ? T : null,
            W = TW(K) + fs + j;
          if (((O[W] = XW(O[W], q, U)), !A[W])) {
            A[W] = !0;
            let { config: C } = U;
            qi({
              config: C,
              event: _,
              eventTarget: r,
              elementRoot: te,
              elementApi: we,
            }).forEach((d) => {
              G.push({ element: d, key: W });
            });
          }
        });
      }),
        G.forEach(({ element: D, key: q }) => {
          let M = O[q],
            U = (0, xt.default)(M, "[0].actionItems[0]", {}),
            { actionTypeId: j } = U,
            K = ps(j) ? vs(j)(D, U) : null,
            te = ds({ element: D, actionItem: U, elementApi: we }, K);
          gs({
            store: e,
            element: D,
            eventId: n,
            actionListId: o,
            actionItem: U,
            destination: te,
            continuous: !0,
            parameterId: N,
            actionGroups: M,
            smoothing: s,
            restingValue: c,
            pluginInstance: K,
          });
        });
    }
    function XW(e = [], t, r) {
      let n = [...e],
        i;
      return (
        n.some((o, a) => (o.keyframe === t ? ((i = a), !0) : !1)),
        i == null && ((i = n.length), n.push({ keyframe: t, actionItems: [] })),
        n[i].actionItems.push(r),
        n
      );
    }
    function VW(e) {
      let { ixData: t } = e.getState(),
        { eventTypeMap: r } = t;
      Wy(e),
        (0, ln.default)(r, (i, o) => {
          let a = uW.default[o];
          if (!a) {
            console.warn(`IX2 event type not configured: ${o}`);
            return;
          }
          jW({ logic: a, store: e, events: i });
        });
      let { ixSession: n } = e.getState();
      n.eventListeners.length && UW(e);
    }
    var WW = ["resize", "orientationchange"];
    function UW(e) {
      let t = () => {
        Wy(e);
      };
      WW.forEach((r) => {
        window.addEventListener(r, t),
          e.dispatch((0, Te.eventListenerAdded)(window, [r, t]));
      }),
        t();
    }
    function Wy(e) {
      let { ixSession: t, ixData: r } = e.getState(),
        n = window.innerWidth;
      if (n !== t.viewportWidth) {
        let { mediaQueries: i } = r;
        e.dispatch((0, Te.viewportWidthChanged)({ width: n, mediaQueries: i }));
      }
    }
    var BW = (e, t) => (0, iW.default)((0, aW.default)(e, t), oW.default),
      kW = (e, t) => {
        (0, ln.default)(e, (r, n) => {
          r.forEach((i, o) => {
            let a = n + fs + o;
            t(i, n, a);
          });
        });
      },
      HW = (e) => {
        let t = { target: e.target, targets: e.targets };
        return qi({ config: t, elementApi: we });
      };
    function jW({ logic: e, store: t, events: r }) {
      KW(r);
      let { types: n, handler: i } = e,
        { ixData: o } = t.getState(),
        { actionLists: a } = o,
        s = BW(r, HW);
      if (!(0, nW.default)(s)) return;
      (0, ln.default)(s, (h, _) => {
        let y = r[_],
          { action: A, id: O, mediaQueries: G = o.mediaQueryKeys } = y,
          { actionListId: S } = A.config;
        OW(G, o.mediaQueryKeys) || t.dispatch((0, Te.mediaQueriesDefined)()),
          A.actionTypeId === nt.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION &&
            (Array.isArray(y.config) ? y.config : [y.config]).forEach((T) => {
              let { continuousParameterGroupId: D } = T,
                q = (0, xt.default)(a, `${S}.continuousParameterGroups`, []),
                M = (0, rW.default)(q, ({ id: K }) => K === D),
                U = (T.smoothing || 0) / 100,
                j = (T.restingState || 0) / 100;
              M &&
                h.forEach((K, te) => {
                  let W = O + fs + te;
                  GW({
                    store: t,
                    eventStateKey: W,
                    eventTarget: K,
                    eventId: O,
                    eventConfig: T,
                    actionListId: S,
                    parameterGroup: M,
                    smoothing: U,
                    restingValue: j,
                  });
                });
            }),
          (A.actionTypeId === nt.ActionTypeConsts.GENERAL_START_ACTION ||
            ls(A.actionTypeId)) &&
            Uy({ store: t, actionListId: S, eventId: O });
      });
      let c = (h) => {
          let { ixSession: _ } = t.getState();
          kW(s, (y, A, O) => {
            let G = r[A],
              S = _.eventState[O],
              { action: N, mediaQueries: T = o.mediaQueryKeys } = G;
            if (!Li(T, _.mediaQueryKey)) return;
            let D = (q = {}) => {
              let M = i(
                {
                  store: t,
                  element: y,
                  event: G,
                  eventConfig: q,
                  nativeEvent: h,
                  eventStateKey: O,
                },
                S
              );
              bW(M, S) || t.dispatch((0, Te.eventStateChanged)(O, M));
            };
            N.actionTypeId === nt.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION
              ? (Array.isArray(G.config) ? G.config : [G.config]).forEach(D)
              : D();
          });
        },
        f = (0, sW.default)(c, wW),
        E = ({ target: h = document, types: _, throttle: y }) => {
          _.split(" ")
            .filter(Boolean)
            .forEach((A) => {
              let O = y ? f : c;
              h.addEventListener(A, O),
                t.dispatch((0, Te.eventListenerAdded)(h, [A, O]));
            });
        };
      Array.isArray(n) ? n.forEach(E) : typeof n == "string" && E(e);
    }
    function KW(e) {
      if (!SW) return;
      let t = {},
        r = "";
      for (let n in e) {
        let { eventTypeId: i, target: o } = e[n],
          a = we.getQuerySelector(o);
        t[a] ||
          ((i === nt.EventTypeConsts.MOUSE_CLICK ||
            i === nt.EventTypeConsts.MOUSE_SECOND_CLICK) &&
            ((t[a] = !0),
            (r += a + "{cursor: pointer;touch-action: manipulation;}")));
      }
      if (r) {
        let n = document.createElement("style");
        (n.textContent = r), document.body.appendChild(n);
      }
    }
    function Uy({ store: e, actionListId: t, eventId: r }) {
      let { ixData: n, ixSession: i } = e.getState(),
        { actionLists: o, events: a } = n,
        s = a[r],
        c = o[t];
      if (c && c.useFirstGroupAsInitialState) {
        let f = (0, xt.default)(c, "actionItemGroups[0].actionItems", []),
          E = (0, xt.default)(s, "mediaQueries", n.mediaQueryKeys);
        if (!Li(E, i.mediaQueryKey)) return;
        f.forEach((h) => {
          var _;
          let { config: y, actionTypeId: A } = h,
            O =
              (y == null || (_ = y.target) === null || _ === void 0
                ? void 0
                : _.useEventTarget) === !0
                ? { target: s.target, targets: s.targets }
                : y,
            G = qi({ config: O, event: s, elementApi: we }),
            S = ps(A);
          G.forEach((N) => {
            let T = S ? vs(A)(N, h) : null;
            gs({
              destination: ds({ element: N, actionItem: h, elementApi: we }, T),
              immediate: !0,
              store: e,
              element: N,
              eventId: r,
              actionItem: h,
              actionListId: t,
              pluginInstance: T,
            });
          });
        });
      }
    }
    function By({ store: e }) {
      let { ixInstances: t } = e.getState();
      (0, ln.default)(t, (r) => {
        if (!r.continuous) {
          let { actionListId: n, verbose: i } = r;
          _s(r, e),
            i &&
              e.dispatch(
                (0, Te.actionListPlaybackChanged)({
                  actionListId: n,
                  isPlaying: !1,
                })
              );
        }
      });
    }
    function hs({
      store: e,
      eventId: t,
      eventTarget: r,
      eventStateKey: n,
      actionListId: i,
    }) {
      let { ixInstances: o, ixSession: a } = e.getState(),
        s = a.hasBoundaryNodes && r ? we.getClosestElement(r, xi) : null;
      (0, ln.default)(o, (c) => {
        let f = (0, xt.default)(c, "actionItem.config.target.boundaryMode"),
          E = n ? c.eventStateKey === n : !0;
        if (c.actionListId === i && c.eventId === t && E) {
          if (s && f && !we.elementContains(s, c.element)) return;
          _s(c, e),
            c.verbose &&
              e.dispatch(
                (0, Te.actionListPlaybackChanged)({
                  actionListId: i,
                  isPlaying: !1,
                })
              );
        }
      });
    }
    function Es({
      store: e,
      eventId: t,
      eventTarget: r,
      eventStateKey: n,
      actionListId: i,
      groupIndex: o = 0,
      immediate: a,
      verbose: s,
    }) {
      var c;
      let { ixData: f, ixSession: E } = e.getState(),
        { events: h } = f,
        _ = h[t] || {},
        { mediaQueries: y = f.mediaQueryKeys } = _,
        A = (0, xt.default)(f, `actionLists.${i}`, {}),
        { actionItemGroups: O, useFirstGroupAsInitialState: G } = A;
      if (!O || !O.length) return !1;
      o >= O.length && (0, xt.default)(_, "config.loop") && (o = 0),
        o === 0 && G && o++;
      let N =
          (o === 0 || (o === 1 && G)) &&
          ls((c = _.action) === null || c === void 0 ? void 0 : c.actionTypeId)
            ? _.config.delay
            : void 0,
        T = (0, xt.default)(O, [o, "actionItems"], []);
      if (!T.length || !Li(y, E.mediaQueryKey)) return !1;
      let D = E.hasBoundaryNodes && r ? we.getClosestElement(r, xi) : null,
        q = hW(T),
        M = !1;
      return (
        T.forEach((U, j) => {
          let { config: K, actionTypeId: te } = U,
            W = ps(te),
            { target: C } = K;
          if (!C) return;
          let d = C.boundaryMode ? D : null;
          qi({
            config: K,
            event: _,
            eventTarget: r,
            elementRoot: d,
            elementApi: we,
          }).forEach((w, V) => {
            let z = W ? vs(te)(w, U) : null,
              Q = W ? AW(te)(w, U) : null;
            M = !0;
            let ce = q === j && V === 0,
              ge = EW({ element: w, actionItem: U }),
              v = ds({ element: w, actionItem: U, elementApi: we }, z);
            gs({
              store: e,
              element: w,
              actionItem: U,
              eventId: t,
              eventTarget: r,
              eventStateKey: n,
              actionListId: i,
              groupIndex: o,
              isCarrier: ce,
              computedStyle: ge,
              destination: v,
              immediate: a,
              verbose: s,
              pluginInstance: z,
              pluginDuration: Q,
              instanceDelay: N,
            });
          });
        }),
        M
      );
    }
    function gs(e) {
      var t;
      let { store: r, computedStyle: n } = e,
        i = (0, tW.default)(e, cW),
        {
          element: o,
          actionItem: a,
          immediate: s,
          pluginInstance: c,
          continuous: f,
          restingValue: E,
          eventId: h,
        } = i,
        _ = !f,
        y = pW(),
        { ixElements: A, ixSession: O, ixData: G } = r.getState(),
        S = dW(A, o),
        { refState: N } = A[S] || {},
        T = we.getRefType(o),
        D = O.reducedMotion && nt.ReducedMotionTypes[a.actionTypeId],
        q;
      if (D && f)
        switch (
          (t = G.events[h]) === null || t === void 0 ? void 0 : t.eventTypeId
        ) {
          case nt.EventTypeConsts.MOUSE_MOVE:
          case nt.EventTypeConsts.MOUSE_MOVE_IN_VIEWPORT:
            q = E;
            break;
          default:
            q = 0.5;
            break;
        }
      let M = gW(o, N, n, a, we, c);
      if (
        (r.dispatch(
          (0, Te.instanceAdded)(
            (0, eW.default)(
              {
                instanceId: y,
                elementId: S,
                origin: M,
                refType: T,
                skipMotion: D,
                skipToValue: q,
              },
              i
            )
          )
        ),
        ky(document.body, "ix2-animation-started", y),
        s)
      ) {
        zW(r, y);
        return;
      }
      zt({ store: r, select: ({ ixInstances: U }) => U[y], onChange: Hy }),
        _ && r.dispatch((0, Te.instanceStarted)(y, O.tick));
    }
    function _s(e, t) {
      ky(document.body, "ix2-animation-stopping", {
        instanceId: e.id,
        state: t.getState(),
      });
      let { elementId: r, actionItem: n } = e,
        { ixElements: i } = t.getState(),
        { ref: o, refType: a } = i[r] || {};
      a === Gy && IW(o, n, we), t.dispatch((0, Te.instanceRemoved)(e.id));
    }
    function ky(e, t, r) {
      let n = document.createEvent("CustomEvent");
      n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n);
    }
    function zW(e, t) {
      let { ixParameters: r } = e.getState();
      e.dispatch((0, Te.instanceStarted)(t, 0)),
        e.dispatch((0, Te.animationFrameChanged)(performance.now(), r));
      let { ixInstances: n } = e.getState();
      Hy(n[t], e);
    }
    function Hy(e, t) {
      let {
          active: r,
          continuous: n,
          complete: i,
          elementId: o,
          actionItem: a,
          actionTypeId: s,
          renderType: c,
          current: f,
          groupIndex: E,
          eventId: h,
          eventTarget: _,
          eventStateKey: y,
          actionListId: A,
          isCarrier: O,
          styleProp: G,
          verbose: S,
          pluginInstance: N,
        } = e,
        { ixData: T, ixSession: D } = t.getState(),
        { events: q } = T,
        M = q[h] || {},
        { mediaQueries: U = T.mediaQueryKeys } = M;
      if (Li(U, D.mediaQueryKey) && (n || r || i)) {
        if (f || (c === fW && i)) {
          t.dispatch((0, Te.elementStateChanged)(o, s, f, a));
          let { ixElements: j } = t.getState(),
            { ref: K, refType: te, refState: W } = j[o] || {},
            C = W && W[s];
          switch (te) {
            case Gy: {
              vW(K, W, C, h, a, G, we, c, N);
              break;
            }
          }
        }
        if (i) {
          if (O) {
            let j = Es({
              store: t,
              eventId: h,
              eventTarget: _,
              eventStateKey: y,
              actionListId: A,
              groupIndex: E + 1,
              verbose: S,
            });
            S &&
              !j &&
              t.dispatch(
                (0, Te.actionListPlaybackChanged)({
                  actionListId: A,
                  isPlaying: !1,
                })
              );
          }
          _s(e, t);
        }
      }
    }
  });
  var Ky = u((Tt) => {
    "use strict";
    var YW = $t().default,
      QW = ut().default;
    Object.defineProperty(Tt, "__esModule", { value: !0 });
    Tt.actions = void 0;
    Tt.destroy = jy;
    Tt.init = tU;
    Tt.setEnv = eU;
    Tt.store = void 0;
    Pl();
    var $W = Qo(),
      ZW = QW(QE()),
      ys = cs(),
      JW = YW(yi());
    Tt.actions = JW;
    var Mi = (0, $W.createStore)(ZW.default);
    Tt.store = Mi;
    function eU(e) {
      e() && (0, ys.observeRequests)(Mi);
    }
    function tU(e) {
      jy(), (0, ys.startEngine)({ store: Mi, rawData: e, allowEvents: !0 });
    }
    function jy() {
      (0, ys.stopEngine)(Mi);
    }
  });
  var $y = u((nK, Qy) => {
    var zy = He(),
      Yy = Ky();
    Yy.setEnv(zy.env);
    zy.define(
      "ix2",
      (Qy.exports = function () {
        return Yy;
      })
    );
  });
  var Jy = u((iK, Zy) => {
    var Ar = He();
    Ar.define(
      "links",
      (Zy.exports = function (e, t) {
        var r = {},
          n = e(window),
          i,
          o = Ar.env(),
          a = window.location,
          s = document.createElement("a"),
          c = "w--current",
          f = /index\.(html|php)$/,
          E = /\/$/,
          h,
          _;
        r.ready = r.design = r.preview = y;
        function y() {
          (i = o && Ar.env("design")),
            (_ = Ar.env("slug") || a.pathname || ""),
            Ar.scroll.off(O),
            (h = []);
          for (var S = document.links, N = 0; N < S.length; ++N) A(S[N]);
          h.length && (Ar.scroll.on(O), O());
        }
        function A(S) {
          var N =
            (i && S.getAttribute("href-disabled")) || S.getAttribute("href");
          if (((s.href = N), !(N.indexOf(":") >= 0))) {
            var T = e(S);
            if (
              s.hash.length > 1 &&
              s.host + s.pathname === a.host + a.pathname
            ) {
              if (!/^#[a-zA-Z0-9\-\_]+$/.test(s.hash)) return;
              var D = e(s.hash);
              D.length && h.push({ link: T, sec: D, active: !1 });
              return;
            }
            if (!(N === "#" || N === "")) {
              var q = s.href === a.href || N === _ || (f.test(N) && E.test(_));
              G(T, c, q);
            }
          }
        }
        function O() {
          var S = n.scrollTop(),
            N = n.height();
          t.each(h, function (T) {
            var D = T.link,
              q = T.sec,
              M = q.offset().top,
              U = q.outerHeight(),
              j = N * 0.5,
              K = q.is(":visible") && M + U - j >= S && M + j <= S + N;
            T.active !== K && ((T.active = K), G(D, c, K));
          });
        }
        function G(S, N, T) {
          var D = S.hasClass(N);
          (T && D) || (!T && !D) || (T ? S.addClass(N) : S.removeClass(N));
        }
        return r;
      })
    );
  });
  var tm = u((oK, em) => {
    var Fi = He();
    Fi.define(
      "scroll",
      (em.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          r = window.location,
          n = A() ? null : window.history,
          i = e(window),
          o = e(document),
          a = e(document.body),
          s =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (C) {
              window.setTimeout(C, 15);
            },
          c = Fi.env("editor") ? ".w-editor-body" : "body",
          f =
            "header, " +
            c +
            " > .header, " +
            c +
            " > .w-nav:not([data-no-scroll])",
          E = 'a[href="#"]',
          h = 'a[href*="#"]:not(.w-tab-link):not(' + E + ")",
          _ = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          y = document.createElement("style");
        y.appendChild(document.createTextNode(_));
        function A() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var O = /^#[a-zA-Z0-9][\w:.-]*$/;
        function G(C) {
          return O.test(C.hash) && C.host + C.pathname === r.host + r.pathname;
        }
        let S =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function N() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            S.matches
          );
        }
        function T(C, d) {
          var F;
          switch (d) {
            case "add":
              (F = C.attr("tabindex")),
                F
                  ? C.attr("data-wf-tabindex-swap", F)
                  : C.attr("tabindex", "-1");
              break;
            case "remove":
              (F = C.attr("data-wf-tabindex-swap")),
                F
                  ? (C.attr("tabindex", F),
                    C.removeAttr("data-wf-tabindex-swap"))
                  : C.removeAttr("tabindex");
              break;
          }
          C.toggleClass("wf-force-outline-none", d === "add");
        }
        function D(C) {
          var d = C.currentTarget;
          if (
            !(
              Fi.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(d.className))
            )
          ) {
            var F = G(d) ? d.hash : "";
            if (F !== "") {
              var w = e(F);
              w.length &&
                (C && (C.preventDefault(), C.stopPropagation()),
                q(F, C),
                window.setTimeout(
                  function () {
                    M(w, function () {
                      T(w, "add"),
                        w.get(0).focus({ preventScroll: !0 }),
                        T(w, "remove");
                    });
                  },
                  C ? 0 : 300
                ));
            }
          }
        }
        function q(C) {
          if (
            r.hash !== C &&
            n &&
            n.pushState &&
            !(Fi.env.chrome && r.protocol === "file:")
          ) {
            var d = n.state && n.state.hash;
            d !== C && n.pushState({ hash: C }, "", C);
          }
        }
        function M(C, d) {
          var F = i.scrollTop(),
            w = U(C);
          if (F !== w) {
            var V = j(C, F, w),
              z = Date.now(),
              Q = function () {
                var ce = Date.now() - z;
                window.scroll(0, K(F, w, ce, V)),
                  ce <= V ? s(Q) : typeof d == "function" && d();
              };
            s(Q);
          }
        }
        function U(C) {
          var d = e(f),
            F = d.css("position") === "fixed" ? d.outerHeight() : 0,
            w = C.offset().top - F;
          if (C.data("scroll") === "mid") {
            var V = i.height() - F,
              z = C.outerHeight();
            z < V && (w -= Math.round((V - z) / 2));
          }
          return w;
        }
        function j(C, d, F) {
          if (N()) return 0;
          var w = 1;
          return (
            a.add(C).each(function (V, z) {
              var Q = parseFloat(z.getAttribute("data-scroll-time"));
              !isNaN(Q) && Q >= 0 && (w = Q);
            }),
            (472.143 * Math.log(Math.abs(d - F) + 125) - 2e3) * w
          );
        }
        function K(C, d, F, w) {
          return F > w ? d : C + (d - C) * te(F / w);
        }
        function te(C) {
          return C < 0.5
            ? 4 * C * C * C
            : (C - 1) * (2 * C - 2) * (2 * C - 2) + 1;
        }
        function W() {
          var { WF_CLICK_EMPTY: C, WF_CLICK_SCROLL: d } = t;
          o.on(d, h, D),
            o.on(C, E, function (F) {
              F.preventDefault();
            }),
            document.head.insertBefore(y, document.head.firstChild);
        }
        return { ready: W };
      })
    );
  });
  var nm = u((aK, rm) => {
    var rU = He();
    rU.define(
      "touch",
      (rm.exports = function (e) {
        var t = {},
          r = window.getSelection;
        (e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (o) {
            return (
              (o = typeof o == "string" ? e(o).get(0) : o), o ? new n(o) : null
            );
          });
        function n(o) {
          var a = !1,
            s = !1,
            c = Math.min(Math.round(window.innerWidth * 0.04), 40),
            f,
            E;
          o.addEventListener("touchstart", h, !1),
            o.addEventListener("touchmove", _, !1),
            o.addEventListener("touchend", y, !1),
            o.addEventListener("touchcancel", A, !1),
            o.addEventListener("mousedown", h, !1),
            o.addEventListener("mousemove", _, !1),
            o.addEventListener("mouseup", y, !1),
            o.addEventListener("mouseout", A, !1);
          function h(G) {
            var S = G.touches;
            (S && S.length > 1) ||
              ((a = !0),
              S ? ((s = !0), (f = S[0].clientX)) : (f = G.clientX),
              (E = f));
          }
          function _(G) {
            if (a) {
              if (s && G.type === "mousemove") {
                G.preventDefault(), G.stopPropagation();
                return;
              }
              var S = G.touches,
                N = S ? S[0].clientX : G.clientX,
                T = N - E;
              (E = N),
                Math.abs(T) > c &&
                  r &&
                  String(r()) === "" &&
                  (i("swipe", G, { direction: T > 0 ? "right" : "left" }), A());
            }
          }
          function y(G) {
            if (a && ((a = !1), s && G.type === "mouseup")) {
              G.preventDefault(), G.stopPropagation(), (s = !1);
              return;
            }
          }
          function A() {
            a = !1;
          }
          function O() {
            o.removeEventListener("touchstart", h, !1),
              o.removeEventListener("touchmove", _, !1),
              o.removeEventListener("touchend", y, !1),
              o.removeEventListener("touchcancel", A, !1),
              o.removeEventListener("mousedown", h, !1),
              o.removeEventListener("mousemove", _, !1),
              o.removeEventListener("mouseup", y, !1),
              o.removeEventListener("mouseout", A, !1),
              (o = null);
          }
          this.destroy = O;
        }
        function i(o, a, s) {
          var c = e.Event(o, { originalEvent: a });
          e(a.target).trigger(c, s);
        }
        return (t.instance = t.init(document)), t;
      })
    );
  });
  var om = u((sK, im) => {
    var Lt = He(),
      nU = wr(),
      Le = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
    Lt.define(
      "navbar",
      (im.exports = function (e, t) {
        var r = {},
          n = e.tram,
          i = e(window),
          o = e(document),
          a = t.debounce,
          s,
          c,
          f,
          E,
          h = Lt.env(),
          _ = '<div class="w-nav-overlay" data-wf-ignore />',
          y = ".w-nav",
          A = "w--open",
          O = "w--nav-dropdown-open",
          G = "w--nav-dropdown-toggle-open",
          S = "w--nav-dropdown-list-open",
          N = "w--nav-link-open",
          T = nU.triggers,
          D = e();
        (r.ready = r.design = r.preview = q),
          (r.destroy = function () {
            (D = e()), M(), c && c.length && c.each(te);
          });
        function q() {
          (f = h && Lt.env("design")),
            (E = Lt.env("editor")),
            (s = e(document.body)),
            (c = o.find(y)),
            c.length && (c.each(K), M(), U());
        }
        function M() {
          Lt.resize.off(j);
        }
        function U() {
          Lt.resize.on(j);
        }
        function j() {
          c.each(R);
        }
        function K(p, B) {
          var Y = e(B),
            k = e.data(B, y);
          k ||
            (k = e.data(B, y, {
              open: !1,
              el: Y,
              config: {},
              selectedIdx: -1,
            })),
            (k.menu = Y.find(".w-nav-menu")),
            (k.links = k.menu.find(".w-nav-link")),
            (k.dropdowns = k.menu.find(".w-dropdown")),
            (k.dropdownToggle = k.menu.find(".w-dropdown-toggle")),
            (k.dropdownList = k.menu.find(".w-dropdown-list")),
            (k.button = Y.find(".w-nav-button")),
            (k.container = Y.find(".w-container")),
            (k.overlayContainerId = "w-nav-overlay-" + p),
            (k.outside = v(k));
          var de = Y.find(".w-nav-brand");
          de &&
            de.attr("href") === "/" &&
            de.attr("aria-label") == null &&
            de.attr("aria-label", "home"),
            k.button.attr("style", "-webkit-user-select: text;"),
            k.button.attr("aria-label") == null &&
              k.button.attr("aria-label", "menu"),
            k.button.attr("role", "button"),
            k.button.attr("tabindex", "0"),
            k.button.attr("aria-controls", k.overlayContainerId),
            k.button.attr("aria-haspopup", "menu"),
            k.button.attr("aria-expanded", "false"),
            k.el.off(y),
            k.button.off(y),
            k.menu.off(y),
            d(k),
            f
              ? (W(k), k.el.on("setting" + y, F(k)))
              : (C(k),
                k.button.on("click" + y, ce(k)),
                k.menu.on("click" + y, "a", ge(k)),
                k.button.on("keydown" + y, w(k)),
                k.el.on("keydown" + y, V(k))),
            R(p, B);
        }
        function te(p, B) {
          var Y = e.data(B, y);
          Y && (W(Y), e.removeData(B, y));
        }
        function W(p) {
          p.overlay && (le(p, !0), p.overlay.remove(), (p.overlay = null));
        }
        function C(p) {
          p.overlay ||
            ((p.overlay = e(_).appendTo(p.el)),
            p.overlay.attr("id", p.overlayContainerId),
            (p.parent = p.menu.parent()),
            le(p, !0));
        }
        function d(p) {
          var B = {},
            Y = p.config || {},
            k = (B.animation = p.el.attr("data-animation") || "default");
          (B.animOver = /^over/.test(k)),
            (B.animDirect = /left$/.test(k) ? -1 : 1),
            Y.animation !== k && p.open && t.defer(Q, p),
            (B.easing = p.el.attr("data-easing") || "ease"),
            (B.easing2 = p.el.attr("data-easing2") || "ease");
          var de = p.el.attr("data-duration");
          (B.duration = de != null ? Number(de) : 400),
            (B.docHeight = p.el.attr("data-doc-height")),
            (p.config = B);
        }
        function F(p) {
          return function (B, Y) {
            Y = Y || {};
            var k = i.width();
            d(p),
              Y.open === !0 && De(p, !0),
              Y.open === !1 && le(p, !0),
              p.open &&
                t.defer(function () {
                  k !== i.width() && Q(p);
                });
          };
        }
        function w(p) {
          return function (B) {
            switch (B.keyCode) {
              case Le.SPACE:
              case Le.ENTER:
                return ce(p)(), B.preventDefault(), B.stopPropagation();
              case Le.ESCAPE:
                return le(p), B.preventDefault(), B.stopPropagation();
              case Le.ARROW_RIGHT:
              case Le.ARROW_DOWN:
              case Le.HOME:
              case Le.END:
                return p.open
                  ? (B.keyCode === Le.END
                      ? (p.selectedIdx = p.links.length - 1)
                      : (p.selectedIdx = 0),
                    z(p),
                    B.preventDefault(),
                    B.stopPropagation())
                  : (B.preventDefault(), B.stopPropagation());
            }
          };
        }
        function V(p) {
          return function (B) {
            if (p.open)
              switch (
                ((p.selectedIdx = p.links.index(document.activeElement)),
                B.keyCode)
              ) {
                case Le.HOME:
                case Le.END:
                  return (
                    B.keyCode === Le.END
                      ? (p.selectedIdx = p.links.length - 1)
                      : (p.selectedIdx = 0),
                    z(p),
                    B.preventDefault(),
                    B.stopPropagation()
                  );
                case Le.ESCAPE:
                  return (
                    le(p),
                    p.button.focus(),
                    B.preventDefault(),
                    B.stopPropagation()
                  );
                case Le.ARROW_LEFT:
                case Le.ARROW_UP:
                  return (
                    (p.selectedIdx = Math.max(-1, p.selectedIdx - 1)),
                    z(p),
                    B.preventDefault(),
                    B.stopPropagation()
                  );
                case Le.ARROW_RIGHT:
                case Le.ARROW_DOWN:
                  return (
                    (p.selectedIdx = Math.min(
                      p.links.length - 1,
                      p.selectedIdx + 1
                    )),
                    z(p),
                    B.preventDefault(),
                    B.stopPropagation()
                  );
              }
          };
        }
        function z(p) {
          if (p.links[p.selectedIdx]) {
            var B = p.links[p.selectedIdx];
            B.focus(), ge(B);
          }
        }
        function Q(p) {
          p.open && (le(p, !0), De(p, !0));
        }
        function ce(p) {
          return a(function () {
            p.open ? le(p) : De(p);
          });
        }
        function ge(p) {
          return function (B) {
            var Y = e(this),
              k = Y.attr("href");
            if (!Lt.validClick(B.currentTarget)) {
              B.preventDefault();
              return;
            }
            k && k.indexOf("#") === 0 && p.open && le(p);
          };
        }
        function v(p) {
          return (
            p.outside && o.off("click" + y, p.outside),
            function (B) {
              var Y = e(B.target);
              (E && Y.closest(".w-editor-bem-EditorOverlay").length) || X(p, Y);
            }
          );
        }
        var X = a(function (p, B) {
          if (p.open) {
            var Y = B.closest(".w-nav-menu");
            p.menu.is(Y) || le(p);
          }
        });
        function R(p, B) {
          var Y = e.data(B, y),
            k = (Y.collapsed = Y.button.css("display") !== "none");
          if ((Y.open && !k && !f && le(Y, !0), Y.container.length)) {
            var de = ee(Y);
            Y.links.each(de), Y.dropdowns.each(de);
          }
          Y.open && Pe(Y);
        }
        var m = "max-width";
        function ee(p) {
          var B = p.container.css(m);
          return (
            B === "none" && (B = ""),
            function (Y, k) {
              (k = e(k)), k.css(m, ""), k.css(m) === "none" && k.css(m, B);
            }
          );
        }
        function se(p, B) {
          B.setAttribute("data-nav-menu-open", "");
        }
        function Oe(p, B) {
          B.removeAttribute("data-nav-menu-open");
        }
        function De(p, B) {
          if (p.open) return;
          (p.open = !0),
            p.menu.each(se),
            p.links.addClass(N),
            p.dropdowns.addClass(O),
            p.dropdownToggle.addClass(G),
            p.dropdownList.addClass(S),
            p.button.addClass(A);
          var Y = p.config,
            k = Y.animation;
          (k === "none" || !n.support.transform || Y.duration <= 0) && (B = !0);
          var de = Pe(p),
            ze = p.menu.outerHeight(!0),
            gt = p.menu.outerWidth(!0),
            l = p.el.height(),
            g = p.el[0];
          if (
            (R(0, g),
            T.intro(0, g),
            Lt.redraw.up(),
            f || o.on("click" + y, p.outside),
            B)
          ) {
            L();
            return;
          }
          var I = "transform " + Y.duration + "ms " + Y.easing;
          if (
            (p.overlay &&
              ((D = p.menu.prev()), p.overlay.show().append(p.menu)),
            Y.animOver)
          ) {
            n(p.menu)
              .add(I)
              .set({ x: Y.animDirect * gt, height: de })
              .start({ x: 0 })
              .then(L),
              p.overlay && p.overlay.width(gt);
            return;
          }
          var b = l + ze;
          n(p.menu).add(I).set({ y: -b }).start({ y: 0 }).then(L);
          function L() {
            p.button.attr("aria-expanded", "true");
          }
        }
        function Pe(p) {
          var B = p.config,
            Y = B.docHeight ? o.height() : s.height();
          return (
            B.animOver
              ? p.menu.height(Y)
              : p.el.css("position") !== "fixed" && (Y -= p.el.outerHeight(!0)),
            p.overlay && p.overlay.height(Y),
            Y
          );
        }
        function le(p, B) {
          if (!p.open) return;
          (p.open = !1), p.button.removeClass(A);
          var Y = p.config;
          if (
            ((Y.animation === "none" ||
              !n.support.transform ||
              Y.duration <= 0) &&
              (B = !0),
            T.outro(0, p.el[0]),
            o.off("click" + y, p.outside),
            B)
          ) {
            n(p.menu).stop(), g();
            return;
          }
          var k = "transform " + Y.duration + "ms " + Y.easing2,
            de = p.menu.outerHeight(!0),
            ze = p.menu.outerWidth(!0),
            gt = p.el.height();
          if (Y.animOver) {
            n(p.menu)
              .add(k)
              .start({ x: ze * Y.animDirect })
              .then(g);
            return;
          }
          var l = gt + de;
          n(p.menu).add(k).start({ y: -l }).then(g);
          function g() {
            p.menu.height(""),
              n(p.menu).set({ x: 0, y: 0 }),
              p.menu.each(Oe),
              p.links.removeClass(N),
              p.dropdowns.removeClass(O),
              p.dropdownToggle.removeClass(G),
              p.dropdownList.removeClass(S),
              p.overlay &&
                p.overlay.children().length &&
                (D.length ? p.menu.insertAfter(D) : p.menu.prependTo(p.parent),
                p.overlay.attr("style", "").hide()),
              p.el.triggerHandler("w-close"),
              p.button.attr("aria-expanded", "false");
          }
        }
        return r;
      })
    );
  });
  var um = u((uK, sm) => {
    var Pt = He(),
      iU = wr(),
      Et = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      am =
        'a[href], area[href], [role="button"], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
    Pt.define(
      "slider",
      (sm.exports = function (e, t) {
        var r = {},
          n = e.tram,
          i = e(document),
          o,
          a,
          s = Pt.env(),
          c = ".w-slider",
          f = '<div class="w-slider-dot" data-wf-ignore />',
          E =
            '<div aria-live="off" aria-atomic="true" class="w-slider-aria-label" data-wf-ignore />',
          h = "w-slider-force-show",
          _ = iU.triggers,
          y,
          A = !1;
        (r.ready = function () {
          (a = Pt.env("design")), O();
        }),
          (r.design = function () {
            (a = !0), setTimeout(O, 1e3);
          }),
          (r.preview = function () {
            (a = !1), O();
          }),
          (r.redraw = function () {
            (A = !0), O(), (A = !1);
          }),
          (r.destroy = G);
        function O() {
          (o = i.find(c)), o.length && (o.each(T), !y && (G(), S()));
        }
        function G() {
          Pt.resize.off(N), Pt.redraw.off(r.redraw);
        }
        function S() {
          Pt.resize.on(N), Pt.redraw.on(r.redraw);
        }
        function N() {
          o.filter(":visible").each(V);
        }
        function T(v, X) {
          var R = e(X),
            m = e.data(X, c);
          m ||
            (m = e.data(X, c, {
              index: 0,
              depth: 1,
              hasFocus: { keyboard: !1, mouse: !1 },
              el: R,
              config: {},
            })),
            (m.mask = R.children(".w-slider-mask")),
            (m.left = R.children(".w-slider-arrow-left")),
            (m.right = R.children(".w-slider-arrow-right")),
            (m.nav = R.children(".w-slider-nav")),
            (m.slides = m.mask.children(".w-slide")),
            m.slides.each(_.reset),
            A && (m.maskWidth = 0),
            R.attr("role") === void 0 && R.attr("role", "region"),
            R.attr("aria-label") === void 0 && R.attr("aria-label", "carousel");
          var ee = m.mask.attr("id");
          if (
            (ee || ((ee = "w-slider-mask-" + v), m.mask.attr("id", ee)),
            !a && !m.ariaLiveLabel && (m.ariaLiveLabel = e(E).appendTo(m.mask)),
            m.left.attr("role", "button"),
            m.left.attr("tabindex", "0"),
            m.left.attr("aria-controls", ee),
            m.left.attr("aria-label") === void 0 &&
              m.left.attr("aria-label", "previous slide"),
            m.right.attr("role", "button"),
            m.right.attr("tabindex", "0"),
            m.right.attr("aria-controls", ee),
            m.right.attr("aria-label") === void 0 &&
              m.right.attr("aria-label", "next slide"),
            !n.support.transform)
          ) {
            m.left.hide(), m.right.hide(), m.nav.hide(), (y = !0);
            return;
          }
          m.el.off(c),
            m.left.off(c),
            m.right.off(c),
            m.nav.off(c),
            D(m),
            a
              ? (m.el.on("setting" + c, d(m)), C(m), (m.hasTimer = !1))
              : (m.el.on("swipe" + c, d(m)),
                m.left.on("click" + c, j(m)),
                m.right.on("click" + c, K(m)),
                m.left.on("keydown" + c, U(m, j)),
                m.right.on("keydown" + c, U(m, K)),
                m.nav.on("keydown" + c, "> div", d(m)),
                m.config.autoplay &&
                  !m.hasTimer &&
                  ((m.hasTimer = !0), (m.timerCount = 1), W(m)),
                m.el.on("mouseenter" + c, M(m, !0, "mouse")),
                m.el.on("focusin" + c, M(m, !0, "keyboard")),
                m.el.on("mouseleave" + c, M(m, !1, "mouse")),
                m.el.on("focusout" + c, M(m, !1, "keyboard"))),
            m.nav.on("click" + c, "> div", d(m)),
            s ||
              m.mask
                .contents()
                .filter(function () {
                  return this.nodeType === 3;
                })
                .remove();
          var se = R.filter(":hidden");
          se.addClass(h);
          var Oe = R.parents(":hidden");
          Oe.addClass(h), A || V(v, X), se.removeClass(h), Oe.removeClass(h);
        }
        function D(v) {
          var X = {};
          (X.crossOver = 0),
            (X.animation = v.el.attr("data-animation") || "slide"),
            X.animation === "outin" &&
              ((X.animation = "cross"), (X.crossOver = 0.5)),
            (X.easing = v.el.attr("data-easing") || "ease");
          var R = v.el.attr("data-duration");
          if (
            ((X.duration = R != null ? parseInt(R, 10) : 500),
            q(v.el.attr("data-infinite")) && (X.infinite = !0),
            q(v.el.attr("data-disable-swipe")) && (X.disableSwipe = !0),
            q(v.el.attr("data-hide-arrows"))
              ? (X.hideArrows = !0)
              : v.config.hideArrows && (v.left.show(), v.right.show()),
            q(v.el.attr("data-autoplay")))
          ) {
            (X.autoplay = !0),
              (X.delay = parseInt(v.el.attr("data-delay"), 10) || 2e3),
              (X.timerMax = parseInt(v.el.attr("data-autoplay-limit"), 10));
            var m = "mousedown" + c + " touchstart" + c;
            a ||
              v.el.off(m).one(m, function () {
                C(v);
              });
          }
          var ee = v.right.width();
          (X.edge = ee ? ee + 40 : 100), (v.config = X);
        }
        function q(v) {
          return v === "1" || v === "true";
        }
        function M(v, X, R) {
          return function (m) {
            if (X) v.hasFocus[R] = X;
            else if (
              e.contains(v.el.get(0), m.relatedTarget) ||
              ((v.hasFocus[R] = X),
              (v.hasFocus.mouse && R === "keyboard") ||
                (v.hasFocus.keyboard && R === "mouse"))
            )
              return;
            X
              ? (v.ariaLiveLabel.attr("aria-live", "polite"),
                v.hasTimer && C(v))
              : (v.ariaLiveLabel.attr("aria-live", "off"), v.hasTimer && W(v));
          };
        }
        function U(v, X) {
          return function (R) {
            switch (R.keyCode) {
              case Et.SPACE:
              case Et.ENTER:
                return X(v)(), R.preventDefault(), R.stopPropagation();
            }
          };
        }
        function j(v) {
          return function () {
            w(v, { index: v.index - 1, vector: -1 });
          };
        }
        function K(v) {
          return function () {
            w(v, { index: v.index + 1, vector: 1 });
          };
        }
        function te(v, X) {
          var R = null;
          X === v.slides.length && (O(), z(v)),
            t.each(v.anchors, function (m, ee) {
              e(m.els).each(function (se, Oe) {
                e(Oe).index() === X && (R = ee);
              });
            }),
            R != null && w(v, { index: R, immediate: !0 });
        }
        function W(v) {
          C(v);
          var X = v.config,
            R = X.timerMax;
          (R && v.timerCount++ > R) ||
            (v.timerId = window.setTimeout(function () {
              v.timerId == null || a || (K(v)(), W(v));
            }, X.delay));
        }
        function C(v) {
          window.clearTimeout(v.timerId), (v.timerId = null);
        }
        function d(v) {
          return function (X, R) {
            R = R || {};
            var m = v.config;
            if (a && X.type === "setting") {
              if (R.select === "prev") return j(v)();
              if (R.select === "next") return K(v)();
              if ((D(v), z(v), R.select == null)) return;
              te(v, R.select);
              return;
            }
            if (X.type === "swipe")
              return m.disableSwipe || Pt.env("editor")
                ? void 0
                : R.direction === "left"
                ? K(v)()
                : R.direction === "right"
                ? j(v)()
                : void 0;
            if (v.nav.has(X.target).length) {
              var ee = e(X.target).index();
              if (
                (X.type === "click" && w(v, { index: ee }),
                X.type === "keydown")
              )
                switch (X.keyCode) {
                  case Et.ENTER:
                  case Et.SPACE: {
                    w(v, { index: ee }), X.preventDefault();
                    break;
                  }
                  case Et.ARROW_LEFT:
                  case Et.ARROW_UP: {
                    F(v.nav, Math.max(ee - 1, 0)), X.preventDefault();
                    break;
                  }
                  case Et.ARROW_RIGHT:
                  case Et.ARROW_DOWN: {
                    F(v.nav, Math.min(ee + 1, v.pages)), X.preventDefault();
                    break;
                  }
                  case Et.HOME: {
                    F(v.nav, 0), X.preventDefault();
                    break;
                  }
                  case Et.END: {
                    F(v.nav, v.pages), X.preventDefault();
                    break;
                  }
                  default:
                    return;
                }
            }
          };
        }
        function F(v, X) {
          var R = v.children().eq(X).focus();
          v.children().not(R);
        }
        function w(v, X) {
          X = X || {};
          var R = v.config,
            m = v.anchors;
          v.previous = v.index;
          var ee = X.index,
            se = {};
          ee < 0
            ? ((ee = m.length - 1),
              R.infinite &&
                ((se.x = -v.endX), (se.from = 0), (se.to = m[0].width)))
            : ee >= m.length &&
              ((ee = 0),
              R.infinite &&
                ((se.x = m[m.length - 1].width),
                (se.from = -m[m.length - 1].x),
                (se.to = se.from - se.x))),
            (v.index = ee);
          var Oe = v.nav
            .children()
            .eq(ee)
            .addClass("w-active")
            .attr("aria-pressed", "true")
            .attr("tabindex", "0");
          v.nav
            .children()
            .not(Oe)
            .removeClass("w-active")
            .attr("aria-pressed", "false")
            .attr("tabindex", "-1"),
            R.hideArrows &&
              (v.index === m.length - 1 ? v.right.hide() : v.right.show(),
              v.index === 0 ? v.left.hide() : v.left.show());
          var De = v.offsetX || 0,
            Pe = (v.offsetX = -m[v.index].x),
            le = { x: Pe, opacity: 1, visibility: "" },
            p = e(m[v.index].els),
            B = e(m[v.previous] && m[v.previous].els),
            Y = v.slides.not(p),
            k = R.animation,
            de = R.easing,
            ze = Math.round(R.duration),
            gt = X.vector || (v.index > v.previous ? 1 : -1),
            l = "opacity " + ze + "ms " + de,
            g = "transform " + ze + "ms " + de;
          if (
            (p.find(am).removeAttr("tabindex"),
            p.removeAttr("aria-hidden"),
            p.find("*").removeAttr("aria-hidden"),
            Y.find(am).attr("tabindex", "-1"),
            Y.attr("aria-hidden", "true"),
            Y.find("*").attr("aria-hidden", "true"),
            a || (p.each(_.intro), Y.each(_.outro)),
            X.immediate && !A)
          ) {
            n(p).set(le), L();
            return;
          }
          if (v.index === v.previous) return;
          if (
            (a || v.ariaLiveLabel.text(`Slide ${ee + 1} of ${m.length}.`),
            k === "cross")
          ) {
            var I = Math.round(ze - ze * R.crossOver),
              b = Math.round(ze - I);
            (l = "opacity " + I + "ms " + de),
              n(B).set({ visibility: "" }).add(l).start({ opacity: 0 }),
              n(p)
                .set({ visibility: "", x: Pe, opacity: 0, zIndex: v.depth++ })
                .add(l)
                .wait(b)
                .then({ opacity: 1 })
                .then(L);
            return;
          }
          if (k === "fade") {
            n(B).set({ visibility: "" }).stop(),
              n(p)
                .set({ visibility: "", x: Pe, opacity: 0, zIndex: v.depth++ })
                .add(l)
                .start({ opacity: 1 })
                .then(L);
            return;
          }
          if (k === "over") {
            (le = { x: v.endX }),
              n(B).set({ visibility: "" }).stop(),
              n(p)
                .set({
                  visibility: "",
                  zIndex: v.depth++,
                  x: Pe + m[v.index].width * gt,
                })
                .add(g)
                .start({ x: Pe })
                .then(L);
            return;
          }
          R.infinite && se.x
            ? (n(v.slides.not(B))
                .set({ visibility: "", x: se.x })
                .add(g)
                .start({ x: Pe }),
              n(B)
                .set({ visibility: "", x: se.from })
                .add(g)
                .start({ x: se.to }),
              (v.shifted = B))
            : (R.infinite &&
                v.shifted &&
                (n(v.shifted).set({ visibility: "", x: De }),
                (v.shifted = null)),
              n(v.slides).set({ visibility: "" }).add(g).start({ x: Pe }));
          function L() {
            (p = e(m[v.index].els)),
              (Y = v.slides.not(p)),
              k !== "slide" && (le.visibility = "hidden"),
              n(Y).set(le);
          }
        }
        function V(v, X) {
          var R = e.data(X, c);
          if (R) {
            if (ce(R)) return z(R);
            a && ge(R) && z(R);
          }
        }
        function z(v) {
          var X = 1,
            R = 0,
            m = 0,
            ee = 0,
            se = v.maskWidth,
            Oe = se - v.config.edge;
          Oe < 0 && (Oe = 0),
            (v.anchors = [{ els: [], x: 0, width: 0 }]),
            v.slides.each(function (Pe, le) {
              m - R > Oe &&
                (X++,
                (R += se),
                (v.anchors[X - 1] = { els: [], x: m, width: 0 })),
                (ee = e(le).outerWidth(!0)),
                (m += ee),
                (v.anchors[X - 1].width += ee),
                v.anchors[X - 1].els.push(le);
              var p = Pe + 1 + " of " + v.slides.length;
              e(le).attr("aria-label", p), e(le).attr("role", "group");
            }),
            (v.endX = m),
            a && (v.pages = null),
            v.nav.length && v.pages !== X && ((v.pages = X), Q(v));
          var De = v.index;
          De >= X && (De = X - 1), w(v, { immediate: !0, index: De });
        }
        function Q(v) {
          var X = [],
            R,
            m = v.el.attr("data-nav-spacing");
          m && (m = parseFloat(m) + "px");
          for (var ee = 0, se = v.pages; ee < se; ee++)
            (R = e(f)),
              R.attr("aria-label", "Show slide " + (ee + 1) + " of " + se)
                .attr("aria-pressed", "false")
                .attr("role", "button")
                .attr("tabindex", "-1"),
              v.nav.hasClass("w-num") && R.text(ee + 1),
              m != null && R.css({ "margin-left": m, "margin-right": m }),
              X.push(R);
          v.nav.empty().append(X);
        }
        function ce(v) {
          var X = v.mask.width();
          return v.maskWidth !== X ? ((v.maskWidth = X), !0) : !1;
        }
        function ge(v) {
          var X = 0;
          return (
            v.slides.each(function (R, m) {
              X += e(m).outerWidth(!0);
            }),
            v.slidesWidth !== X ? ((v.slidesWidth = X), !0) : !1
          );
        }
        return r;
      })
    );
  });
  var lm = u((cK, cm) => {
    var Dt = He(),
      oU = wr();
    Dt.define(
      "tabs",
      (cm.exports = function (e) {
        var t = {},
          r = e.tram,
          n = e(document),
          i,
          o,
          a = Dt.env,
          s = a.safari,
          c = a(),
          f = "data-w-tab",
          E = "data-w-pane",
          h = ".w-tabs",
          _ = "w--current",
          y = "w--tab-active",
          A = oU.triggers,
          O = !1;
        (t.ready = t.design = t.preview = G),
          (t.redraw = function () {
            (O = !0), G(), (O = !1);
          }),
          (t.destroy = function () {
            (i = n.find(h)), i.length && (i.each(T), S());
          });
        function G() {
          (o = c && Dt.env("design")),
            (i = n.find(h)),
            i.length &&
              (i.each(D), Dt.env("preview") && !O && i.each(T), S(), N());
        }
        function S() {
          Dt.redraw.off(t.redraw);
        }
        function N() {
          Dt.redraw.on(t.redraw);
        }
        function T(W, C) {
          var d = e.data(C, h);
          d &&
            (d.links && d.links.each(A.reset),
            d.panes && d.panes.each(A.reset));
        }
        function D(W, C) {
          var d = h.substr(1) + "-" + W,
            F = e(C),
            w = e.data(C, h);
          if (
            (w || (w = e.data(C, h, { el: F, config: {} })),
            (w.current = null),
            (w.tabIdentifier = d + "-" + f),
            (w.paneIdentifier = d + "-" + E),
            (w.menu = F.children(".w-tab-menu")),
            (w.links = w.menu.children(".w-tab-link")),
            (w.content = F.children(".w-tab-content")),
            (w.panes = w.content.children(".w-tab-pane")),
            w.el.off(h),
            w.links.off(h),
            w.menu.attr("role", "tablist"),
            w.links.attr("tabindex", "-1"),
            q(w),
            !o)
          ) {
            w.links.on("click" + h, U(w)), w.links.on("keydown" + h, j(w));
            var V = w.links.filter("." + _),
              z = V.attr(f);
            z && K(w, { tab: z, immediate: !0 });
          }
        }
        function q(W) {
          var C = {};
          C.easing = W.el.attr("data-easing") || "ease";
          var d = parseInt(W.el.attr("data-duration-in"), 10);
          d = C.intro = d === d ? d : 0;
          var F = parseInt(W.el.attr("data-duration-out"), 10);
          (F = C.outro = F === F ? F : 0),
            (C.immediate = !d && !F),
            (W.config = C);
        }
        function M(W) {
          var C = W.current;
          return Array.prototype.findIndex.call(
            W.links,
            (d) => d.getAttribute(f) === C,
            null
          );
        }
        function U(W) {
          return function (C) {
            C.preventDefault();
            var d = C.currentTarget.getAttribute(f);
            d && K(W, { tab: d });
          };
        }
        function j(W) {
          return function (C) {
            var d = M(W),
              F = C.key,
              w = {
                ArrowLeft: d - 1,
                ArrowUp: d - 1,
                ArrowRight: d + 1,
                ArrowDown: d + 1,
                End: W.links.length - 1,
                Home: 0,
              };
            if (F in w) {
              C.preventDefault();
              var V = w[F];
              V === -1 && (V = W.links.length - 1),
                V === W.links.length && (V = 0);
              var z = W.links[V],
                Q = z.getAttribute(f);
              Q && K(W, { tab: Q });
            }
          };
        }
        function K(W, C) {
          C = C || {};
          var d = W.config,
            F = d.easing,
            w = C.tab;
          if (w !== W.current) {
            W.current = w;
            var V;
            W.links.each(function (R, m) {
              var ee = e(m);
              if (C.immediate || d.immediate) {
                var se = W.panes[R];
                m.id || (m.id = W.tabIdentifier + "-" + R),
                  se.id || (se.id = W.paneIdentifier + "-" + R),
                  (m.href = "#" + se.id),
                  m.setAttribute("role", "tab"),
                  m.setAttribute("aria-controls", se.id),
                  m.setAttribute("aria-selected", "false"),
                  se.setAttribute("role", "tabpanel"),
                  se.setAttribute("aria-labelledby", m.id);
              }
              m.getAttribute(f) === w
                ? ((V = m),
                  ee
                    .addClass(_)
                    .removeAttr("tabindex")
                    .attr({ "aria-selected": "true" })
                    .each(A.intro))
                : ee.hasClass(_) &&
                  ee
                    .removeClass(_)
                    .attr({ tabindex: "-1", "aria-selected": "false" })
                    .each(A.outro);
            });
            var z = [],
              Q = [];
            W.panes.each(function (R, m) {
              var ee = e(m);
              m.getAttribute(f) === w ? z.push(m) : ee.hasClass(y) && Q.push(m);
            });
            var ce = e(z),
              ge = e(Q);
            if (C.immediate || d.immediate) {
              ce.addClass(y).each(A.intro),
                ge.removeClass(y),
                O || Dt.redraw.up();
              return;
            } else {
              var v = window.scrollX,
                X = window.scrollY;
              V.focus(), window.scrollTo(v, X);
            }
            ge.length && d.outro
              ? (ge.each(A.outro),
                r(ge)
                  .add("opacity " + d.outro + "ms " + F, { fallback: s })
                  .start({ opacity: 0 })
                  .then(() => te(d, ge, ce)))
              : te(d, ge, ce);
          }
        }
        function te(W, C, d) {
          if (
            (C.removeClass(y).css({
              opacity: "",
              transition: "",
              transform: "",
              width: "",
              height: "",
            }),
            d.addClass(y).each(A.intro),
            Dt.redraw.up(),
            !W.intro)
          )
            return r(d).set({ opacity: 1 });
          r(d)
            .set({ opacity: 0 })
            .redraw()
            .add("opacity " + W.intro + "ms " + W.easing, { fallback: s })
            .start({ opacity: 1 });
        }
        return t;
      })
    );
  });
  ms();
  Is();
  Ps();
  Ms();
  Gs();
  Ws();
  wr();
  $y();
  Jy();
  tm();
  nm();
  om();
  um();
  lm();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 * _.each
 * _.map
 * _.find
 * _.filter
 * _.any
 * _.contains
 * _.delay
 * _.defer
 * _.throttle (webflow)
 * _.debounce
 * _.keys
 * _.has
 * _.now
 * _.template (webflow: upgraded to 1.13.6)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:

timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    e: {
      id: "e",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|1c365137-72f8-dcd4-28b0-01810c82ecbf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|1c365137-72f8-dcd4-28b0-01810c82ecbf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682840000728,
    },
    "e-2": {
      id: "e-2",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|1c365137-72f8-dcd4-28b0-01810c82ecbf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|1c365137-72f8-dcd4-28b0-01810c82ecbf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682840000729,
    },
    "e-3": {
      id: "e-3",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-4",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|6c9668bc-388f-7dfb-d374-f28c92017728",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|6c9668bc-388f-7dfb-d374-f28c92017728",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682868101550,
    },
    "e-5": {
      id: "e-5",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-6",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|8a580d2a-ff8b-4ade-47eb-b5e7c30ad6f6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|8a580d2a-ff8b-4ade-47eb-b5e7c30ad6f6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682868197061,
    },
    "e-6": {
      id: "e-6",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-5",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|8a580d2a-ff8b-4ade-47eb-b5e7c30ad6f6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|8a580d2a-ff8b-4ade-47eb-b5e7c30ad6f6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682868197061,
    },
    "e-7": {
      id: "e-7",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-8",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|8cd14222-8cef-8ee3-2d9c-6b273a7758db",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|8cd14222-8cef-8ee3-2d9c-6b273a7758db",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682868643517,
    },
    "e-8": {
      id: "e-8",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-7",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|8cd14222-8cef-8ee3-2d9c-6b273a7758db",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|8cd14222-8cef-8ee3-2d9c-6b273a7758db",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682868643517,
    },
    "e-9": {
      id: "e-9",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-10",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|e2533379-3259-89b3-3e5a-2a697606fe61",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|e2533379-3259-89b3-3e5a-2a697606fe61",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682868672373,
    },
    "e-10": {
      id: "e-10",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-9",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|e2533379-3259-89b3-3e5a-2a697606fe61",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|e2533379-3259-89b3-3e5a-2a697606fe61",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682868672400,
    },
    "e-11": {
      id: "e-11",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-12",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|019ffd8d-0eba-e0c5-a8a8-6c5fd81255b2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|019ffd8d-0eba-e0c5-a8a8-6c5fd81255b2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682868722357,
    },
    "e-12": {
      id: "e-12",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-11",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|019ffd8d-0eba-e0c5-a8a8-6c5fd81255b2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|019ffd8d-0eba-e0c5-a8a8-6c5fd81255b2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682868722389,
    },
    "e-13": {
      id: "e-13",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-14",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|2b9273b2-373c-4620-e10e-fa251c9fa2e1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|2b9273b2-373c-4620-e10e-fa251c9fa2e1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682868750374,
    },
    "e-14": {
      id: "e-14",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-13",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|2b9273b2-373c-4620-e10e-fa251c9fa2e1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|2b9273b2-373c-4620-e10e-fa251c9fa2e1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682868750402,
    },
    "e-15": {
      id: "e-15",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-16",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|119cc1e1-d83d-d28f-32bb-0090ff4db749",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|119cc1e1-d83d-d28f-32bb-0090ff4db749",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682868771148,
    },
    "e-16": {
      id: "e-16",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-15",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|119cc1e1-d83d-d28f-32bb-0090ff4db749",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|119cc1e1-d83d-d28f-32bb-0090ff4db749",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682868771148,
    },
    "e-17": {
      id: "e-17",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-18",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|a449430c-28d0-a9be-c59f-c1a99504305f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|a449430c-28d0-a9be-c59f-c1a99504305f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682868785766,
    },
    "e-18": {
      id: "e-18",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-17",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|a449430c-28d0-a9be-c59f-c1a99504305f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|a449430c-28d0-a9be-c59f-c1a99504305f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682868785795,
    },
    "e-19": {
      id: "e-19",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-20" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|1fd2c496-089a-aa15-0051-51ebf912d11a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|1fd2c496-089a-aa15-0051-51ebf912d11a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 15,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1682871700543,
    },
    "e-21": {
      id: "e-21",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-22" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|45445dd0-bbb6-a7c9-081e-42e392979ded",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|45445dd0-bbb6-a7c9-081e-42e392979ded",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 15,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1682871754926,
    },
    "e-23": {
      id: "e-23",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-24" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|2d90331d-40e9-30aa-4944-9dc025028001",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|2d90331d-40e9-30aa-4944-9dc025028001",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 15,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1682871942307,
    },
    "e-25": {
      id: "e-25",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-26" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|c1f6eead-ac33-3b25-42c4-ba2627fc3171",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|c1f6eead-ac33-3b25-42c4-ba2627fc3171",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 15,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1682872900199,
    },
    "e-27": {
      id: "e-27",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-28" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|a960ca08-fe9c-9c64-c7ae-9273dec956f2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|a960ca08-fe9c-9c64-c7ae-9273dec956f2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 15,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1682872983407,
    },
    "e-29": {
      id: "e-29",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-30" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|a960ca08-fe9c-9c64-c7ae-9273dec956f3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|a960ca08-fe9c-9c64-c7ae-9273dec956f3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 15,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1682872983407,
    },
    "e-31": {
      id: "e-31",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-32",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|995f0b9f-77bc-4fdf-1a00-586879fd32ad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|995f0b9f-77bc-4fdf-1a00-586879fd32ad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682873482379,
    },
    "e-32": {
      id: "e-32",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-31",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|995f0b9f-77bc-4fdf-1a00-586879fd32ad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|995f0b9f-77bc-4fdf-1a00-586879fd32ad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682873482379,
    },
    "e-33": {
      id: "e-33",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-34",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|71858549-ded9-e36c-f999-636215486a81",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|71858549-ded9-e36c-f999-636215486a81",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682915001970,
    },
    "e-34": {
      id: "e-34",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_OUT_OF_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-33",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|71858549-ded9-e36c-f999-636215486a81",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|71858549-ded9-e36c-f999-636215486a81",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 60,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682915001971,
    },
    "e-37": {
      id: "e-37",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-38" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|b9088dc1-9dbd-2b02-a93d-a1ace3a0c34e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|b9088dc1-9dbd-2b02-a93d-a1ace3a0c34e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 15,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1682921342908,
    },
    "e-39": {
      id: "e-39",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-40",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|4d729943-fdbe-72f6-627a-943a15d211be",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|4d729943-fdbe-72f6-627a-943a15d211be",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682929039109,
    },
    "e-40": {
      id: "e-40",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-39",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|4d729943-fdbe-72f6-627a-943a15d211be",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644e0caec3356e852161c648|4d729943-fdbe-72f6-627a-943a15d211be",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682929039110,
    },
    "e-41": {
      id: "e-41",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-42",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "644e0caec3356e852161c648|4d729943-fdbe-72f6-627a-943a15d211be",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682948921356,
    },
    "e-43": {
      id: "e-43",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-44",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "644e0caec3356e852161c648|4d729943-fdbe-72f6-627a-943a15d211c1",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682949568234,
    },
    "e-44": {
      id: "e-44",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-43",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "644e0caec3356e852161c648|4d729943-fdbe-72f6-627a-943a15d211c1",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682949568235,
    },
    "e-45": {
      id: "e-45",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-46",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "644e0caec3356e852161c648|4d729943-fdbe-72f6-627a-943a15d211c1",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682949722738,
    },
    "e-47": {
      id: "e-47",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-48",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "644e0caec3356e852161c648|4d729943-fdbe-72f6-627a-943a15d211bb",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682950196682,
    },
    "e-49": {
      id: "e-49",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-50",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|3aca96c3-9147-bde9-eda5-d5e7c2ac1ff7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682951038793,
    },
    "e-50": {
      id: "e-50",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-49",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644e0caec3356e852161c648|3aca96c3-9147-bde9-eda5-d5e7c2ac1ff7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1682951038793,
    },
  },
  actionLists: {
    a: {
      id: "a",
      title: "CTA Hover Blink",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-n",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: true,
                  id: "644e0caec3356e852161c648|1c365137-72f8-dcd4-28b0-01810c82ecbf",
                },
                globalSwatchId: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-n-2",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: true,
                  id: "644e0caec3356e852161c648|1c365137-72f8-dcd4-28b0-01810c82ecbf",
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-n-8",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: true,
                  id: "644e0caec3356e852161c648|1c365137-72f8-dcd4-28b0-01810c82ecbf",
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-n-3",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: true,
                  id: "644e0caec3356e852161c648|1c365137-72f8-dcd4-28b0-01810c82ecbf",
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-n-4",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: true,
                  id: "644e0caec3356e852161c648|1c365137-72f8-dcd4-28b0-01810c82ecbf",
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-n-5",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: true,
                  id: "644e0caec3356e852161c648|1c365137-72f8-dcd4-28b0-01810c82ecbf",
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-n-9",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: true,
                  id: "644e0caec3356e852161c648|1c365137-72f8-dcd4-28b0-01810c82ecbf",
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-n-10",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: true,
                  id: "644e0caec3356e852161c648|1c365137-72f8-dcd4-28b0-01810c82ecbf",
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-n-6",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 400,
                target: {
                  useEventTarget: true,
                  id: "644e0caec3356e852161c648|1c365137-72f8-dcd4-28b0-01810c82ecbf",
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-n-7",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: true,
                  id: "644e0caec3356e852161c648|1c365137-72f8-dcd4-28b0-01810c82ecbf",
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1682840128825,
    },
    "a-2": {
      id: "a-2",
      title: "CTA Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-2-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "644e0caec3356e852161c648|1c365137-72f8-dcd4-28b0-01810c82ecbf",
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 0,
              },
            },
            {
              id: "a-2-n-2",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "644e0caec3356e852161c648|1c365137-72f8-dcd4-28b0-01810c82ecbf",
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1682841799133,
    },
    "a-3": {
      id: "a-3",
      title: "New Timed Animation",
      actionItemGroups: [],
      useFirstGroupAsInitialState: false,
      createdOn: 1682868110413,
    },
    "a-4": {
      id: "a-4",
      title: "center in",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-4-n-2",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: true,
                  id: "644e0caec3356e852161c648|8a580d2a-ff8b-4ade-47eb-b5e7c30ad6f6",
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 0.18,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1682868201885,
    },
    "a-5": {
      id: "a-5",
      title: "center out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-5-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: true,
                  id: "644e0caec3356e852161c648|8a580d2a-ff8b-4ade-47eb-b5e7c30ad6f6",
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 0,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1682868334422,
    },
    "a-8": {
      id: "a-8",
      title: "NavBAr Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-8-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".navafterscroll",
                  selectorGuids: ["87c25a2a-fc63-678b-8893-fbfc08411f3b"],
                },
                yValue: -70,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1682915299906,
    },
    "a-7": {
      id: "a-7",
      title: "Sicky NavBar In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-7-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".navafterscroll",
                  selectorGuids: ["87c25a2a-fc63-678b-8893-fbfc08411f3b"],
                },
                xValue: 0,
                yValue: -50,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-7-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".navafterscroll",
                  selectorGuids: ["87c25a2a-fc63-678b-8893-fbfc08411f3b"],
                },
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-7-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".navafterscroll",
                  selectorGuids: ["87c25a2a-fc63-678b-8893-fbfc08411f3b"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1682915022372,
    },
    "a-9": {
      id: "a-9",
      title: "Tab2 Hoverin",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-9-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "644e0caec3356e852161c648|93321ca9-977f-ea54-6504-25b35c2b6eb5",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1682929047453,
    },
    "a-10": {
      id: "a-10",
      title: "Tab2 Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-10-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|93321ca9-977f-ea54-6504-25b35c2b6eb5",
                },
                value: 0.5,
                unit: "",
              },
            },
          ],
        },
      ],
      createdOn: 1682948818570,
      useFirstGroupAsInitialState: false,
    },
    "a-11": {
      id: "a-11",
      title: "Tab2 Click",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-11-n-6",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|93321ca9-977f-ea54-6504-25b35c2b6eb6",
                },
                rValue: 255,
                gValue: 255,
                bValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-11-n-7",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "644e0caec3356e852161c648|c396b69c-e729-a555-eacc-006484cd1588",
                },
                rValue: 0,
                gValue: 0,
                bValue: 0,
                aValue: 0,
              },
            },
            {
              id: "a-11-n-8",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "644e0caec3356e852161c648|93d57c64-147d-73e1-3bdc-121f85539b03",
                },
                rValue: 0,
                gValue: 0,
                bValue: 0,
                aValue: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-11-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|93321ca9-977f-ea54-6504-25b35c2b6eb6",
                },
                value: 0.7,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-11-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|93321ca9-977f-ea54-6504-25b35c2b6eb6",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-11-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|93321ca9-977f-ea54-6504-25b35c2b6eb6",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-11-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|93321ca9-977f-ea54-6504-25b35c2b6eb6",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-11-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|93321ca9-977f-ea54-6504-25b35c2b6eb6",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      createdOn: 1682948931842,
      useFirstGroupAsInitialState: false,
    },
    "a-12": {
      id: "a-12",
      title: "Tab 3 hover in",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-12-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|93d57c64-147d-73e1-3bdc-121f85539b02",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      createdOn: 1682949324298,
      useFirstGroupAsInitialState: false,
    },
    "a-13": {
      id: "a-13",
      title: "Tab 3 Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-13-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|93d57c64-147d-73e1-3bdc-121f85539b02",
                },
                value: 0.5,
                unit: "",
              },
            },
          ],
        },
      ],
      createdOn: 1682949375899,
      useFirstGroupAsInitialState: false,
    },
    "a-14": {
      id: "a-14",
      title: "Tab3 Click In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-14-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|93d57c64-147d-73e1-3bdc-121f85539b03",
                },
                rValue: 255,
                gValue: 255,
                bValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-14-n-8",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "644e0caec3356e852161c648|c396b69c-e729-a555-eacc-006484cd1588",
                },
                rValue: 0,
                gValue: 0,
                bValue: 0,
                aValue: 0,
              },
            },
            {
              id: "a-14-n-9",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "644e0caec3356e852161c648|93321ca9-977f-ea54-6504-25b35c2b6eb6",
                },
                rValue: 0,
                gValue: 0,
                bValue: 0,
                aValue: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-14-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|93d57c64-147d-73e1-3bdc-121f85539b03",
                },
                value: 0.7,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-14-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|93d57c64-147d-73e1-3bdc-121f85539b03",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-14-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|93d57c64-147d-73e1-3bdc-121f85539b03",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-14-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|93d57c64-147d-73e1-3bdc-121f85539b03",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-14-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|93d57c64-147d-73e1-3bdc-121f85539b03",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      createdOn: 1682949749681,
      useFirstGroupAsInitialState: false,
    },
    "a-15": {
      id: "a-15",
      title: "Tab 1 Click",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-15-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "644e0caec3356e852161c648|93321ca9-977f-ea54-6504-25b35c2b6eb6",
                },
                rValue: 0,
                gValue: 0,
                bValue: 0,
                aValue: 0,
              },
            },
            {
              id: "a-15-n-2",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "644e0caec3356e852161c648|93d57c64-147d-73e1-3bdc-121f85539b03",
                },
                rValue: 0,
                gValue: 0,
                bValue: 0,
                aValue: 0,
              },
            },
            {
              id: "a-15-n-9",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|c396b69c-e729-a555-eacc-006484cd1588",
                },
                rValue: 255,
                gValue: 255,
                bValue: 255,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-15-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|c396b69c-e729-a555-eacc-006484cd1588",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-15-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|c396b69c-e729-a555-eacc-006484cd1588",
                },
                value: 0.7,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-15-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|c396b69c-e729-a555-eacc-006484cd1588",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-15-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|c396b69c-e729-a555-eacc-006484cd1588",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-15-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|c396b69c-e729-a555-eacc-006484cd1588",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-15-n-8",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "644e0caec3356e852161c648|c396b69c-e729-a555-eacc-006484cd1588",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      createdOn: 1682950212634,
      useFirstGroupAsInitialState: false,
    },
    slideInBottom: {
      id: "slideInBottom",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 100,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
