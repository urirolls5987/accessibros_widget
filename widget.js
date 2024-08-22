!(function () {
  function n() {
    const n = document.querySelector(".asw-menu"),
      t = document.querySelector(".asw-overlay"),
      e = "flex" === n.style.display;
    (n.style.display = e ? "none" : "flex"),
      (t.style.display = n.style.display),
      (document.body.style.overflow = e ? "auto" : "hidden");
  }
  function t() {
    const n = document.querySelector(".asw-menu"),
      t = document.querySelector(".asw-overlay");
    (n.style.display = "none"),
      (t.style.display = "none"),
      (document.body.style.overflow = "auto");
  }
  function e() {
    (f = {}),
      document.querySelectorAll(".asw-btn").forEach((n) => {
        n.classList.remove("asw-selected"),
          n.setAttribute("aria-pressed", "false");
      }),
      document.querySelectorAll(".asw-amount").forEach((n) => {
        n.textContent = "100%";
      }),
      o(null),
      l(),
      i("font-size", 1),
      i("line-height", 1),
      i("letter-spacing", 1),
      r(),
      (document.querySelector(".asw-reading-guide-overlay").style.display =
        "none"),
      u();
  }
  function s(n) {
    const t = n.currentTarget,
      e = t.dataset.key;
    t.classList.contains("asw-filter")
      ? (document.querySelectorAll(".asw-filter").forEach((n) => {
          n.classList.remove("asw-selected"),
            n.setAttribute("aria-pressed", "false");
        }),
        (f.contrast = f.contrast !== e ? e : null),
        f.contrast &&
          (t.classList.add("asw-selected"),
          t.setAttribute("aria-pressed", "true")),
        o(f.contrast))
      : "reading-guide" === e
      ? ((f[e] = !f[e]),
        t.classList.toggle("asw-selected", f[e]),
        t.setAttribute("aria-pressed", f[e] ? "true" : "false"),
        d())
      : ((f[e] = !f[e]),
        t.classList.toggle("asw-selected", f[e]),
        t.setAttribute("aria-pressed", f[e] ? "true" : "false"),
        l()),
      u();
  }
  function a(n) {
    const t = n.currentTarget,
      e = t.dataset.key;
    let s = parseFloat(f[e]) || 1;
    t.classList.contains("asw-minus") ? (s -= 0.1) : (s += 0.1),
      (s = Math.max(0.5, Math.min(s, 2))),
      (s = parseFloat(s.toFixed(2))),
      i(e, s);
    const a = `${Math.round(100 * s)}%`;
    (t.closest(".asw-adjust-control").querySelector(".asw-amount").textContent =
      a),
      (f[e] = s),
      u();
  }
  function i(n, t) {
    document
      .querySelectorAll("body :not(.asw-widget):not(.asw-widget *)")
      .forEach((e) => {
        if ("font-size" === n) {
          let n = e.getAttribute("data-asw-orgFontSize");
          n ||
            ((n = parseInt(
              window.getComputedStyle(e, null).getPropertyValue("font-size")
            )),
            e.setAttribute("data-asw-orgFontSize", n)),
            (e.style.fontSize = n * t + "px");
        } else
          "line-height" === n
            ? (e.style.lineHeight = t)
            : "letter-spacing" === n && (e.style.letterSpacing = t - 1 + "em");
      });
  }
  function o(n) {
    let t = "";
    if (n) {
      let e = "";
      switch (n) {
        case "dark-contrast":
          e =
            "color: #fff !important; fill: #FFF !important; background-color: #000 !important;";
          break;
        case "light-contrast":
          e =
            "color: #000 !important; fill: #000 !important; background-color: #FFF !important;";
          break;
        case "high-contrast":
          e = "-webkit-filter: contrast(125%); filter: contrast(125%);";
          break;
        case "monochrome":
          e = "-webkit-filter: grayscale(100%); filter: grayscale(100%);";
      }
      ("dark-contrast" === n || "light-contrast" === n
        ? [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "img",
            "p",
            "i",
            "svg",
            "a",
            "button",
            "label",
            "li",
            "ol",
          ]
        : [""]
      ).forEach((s) => {
        t += `[data-asw-filter="${n}"] ${s} { ${e} }`;
      });
    }
    c(t, "asw-filter-style"),
      document.documentElement.setAttribute("data-asw-filter", n || "");
  }
  function l() {
    let n = "";
    f["dyslexic-font"] &&
      (n +=
        '\n        @font-face {\n          font-family: OpenDyslexic3;\n          src: url("https://website-widgets.pages.dev/fonts/OpenDyslexic3-Regular.woff") format("woff"),\n               url("https://website-widgets.pages.dev/fonts/OpenDyslexic3-Regular.ttf") format("truetype");\n        }\n        body.dyslexic-font :not(.material-icons) {\n          font-family: OpenDyslexic3, Comic Sans MS, Arial, Helvetica, sans-serif !important;\n        }\n      '),
      f["highlight-links"] &&
        (n +=
          "\n        .highlight-links a[href] {\n          outline: 2px solid #fde2aa !important;\n          outline-offset: 2px !important;\n        }\n      "),
      f["highlight-titles"] &&
        (n +=
          "\n        .highlight-titles h1, .highlight-titles h2, .highlight-titles h3,\n        .highlight-titles h4, .highlight-titles h5, .highlight-titles h6 {\n          outline: 2px solid #fde2aa !important;\n          outline-offset: 2px !important;\n        }\n      "),
      f["big-cursor"] &&
        (n +=
          "\n        body.big-cursor, body.big-cursor * {\n          cursor: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24'%3E%3Cpath d='M7,2l12,11.2l-5.8,0.5l3.3,7.3l-2.2,1l-3.2-7.4L7,18.5V2' fill='%23000000' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E\"), auto !important;\n        }\n      "),
      f["stop-animations"] &&
        (n +=
          "\n        body.stop-animations * {\n          transition: none !important;\n          animation: none !important;\n        }\n      "),
      f["font-weight"] &&
        (n +=
          "\n        body.font-weight-bold :not(.material-icons) {\n          font-weight: bold !important;\n        }\n      "),
      c(n, "asw-content-style"),
      r();
  }
  function r() {
    [
      "dyslexic-font",
      "highlight-links",
      "highlight-titles",
      "big-cursor",
      "stop-animations",
      "font-weight-bold",
    ].forEach((n) => {
      document.body.classList.toggle(n, !!f[n]);
    });
  }
  function d() {
    const n = document.querySelector(".asw-reading-guide-overlay"),
      t = "block" === n.style.display;
    if (((n.style.display = t ? "none" : "block"), !t)) {
      const t = n.querySelector(".asw-reading-guide-bar");
      t.style.top = "50%";
      let e,
        s = !1;
      const a = (n) => {
          (s = !0), (e = n.clientY - t.offsetTop);
        },
        i = (n) => {
          if (s) {
            const s = n.clientY - e;
            t.style.top = `${Math.max(
              0,
              Math.min(s, window.innerHeight - t.offsetHeight)
            )}px`;
          }
        },
        o = () => {
          s = !1;
        };
      t.addEventListener("mousedown", a),
        t.addEventListener("touchstart", (n) => a(n.touches[0])),
        document.addEventListener("mousemove", i),
        document.addEventListener("touchmove", (n) => i(n.touches[0])),
        document.addEventListener("mouseup", o),
        document.addEventListener("touchend", o);
    }
  }
  function c(n, t) {
    let e = document.getElementById(t);
    e ||
      ((e = document.createElement("style")),
      (e.id = t),
      document.head.appendChild(e)),
      (e.textContent = n);
  }
  function u() {
    localStorage.setItem("aswSettings", JSON.stringify(f));
  }
  function p(n, t) {
    const e = document.querySelector(
      `.asw-adjust-control[data-key="${n}"] .asw-amount`
    );
    e && (e.textContent = `${Math.round(100 * t)}%`);
  }
  let f = {};
  !(function () {
    const r = (function () {
      const n = document.createElement("div");
      return (
        n.classList.add("asw-widget"),
        (n.innerHTML =
          '\n      <button class="asw-menu-btn" aria-label="Toggle Accessibility Menu">\n        <span class="material-icons md-36 white">accessibility_new</span>\n      </button>\n      <div class="asw-menu" style="display: none;">\n        <div class="asw-menu-header">\n          Accessibility Options\n          <div>\n            <div role="button" class="asw-menu-reset" title="Reset Settings">\n              <span class="material-icons">restart_alt</span>\n            </div>\n            <div role="button" class="asw-menu-close" title="Close Accessibility Menu">\n              <span class="material-icons">close</span>\n            </div>\n          </div>\n        </div>\n        <div class="asw-menu-content">\n          <div class="asw-card">\n            <div class="asw-card-title">Text Adjustments</div>\n            <div class="asw-adjust-control">\n              <div class="asw-minus" data-key="font-size" role="button" aria-pressed="false">\n                <span class="material-icons">remove</span>\n              </div>\n              <div class="asw-control-label">\n                <span class="material-icons">format_size</span>\n                <span class="asw-amount">100%</span>\n              </div>\n              <div class="asw-plus" data-key="font-size" role="button" aria-pressed="false">\n                <span class="material-icons">add</span>\n              </div>\n            </div>\n            <div class="asw-adjust-control">\n              <div class="asw-minus" data-key="line-height" role="button" aria-pressed="false">\n                <span class="material-icons">remove</span>\n              </div>\n              <div class="asw-control-label">\n                <span class="material-icons">format_line_spacing</span>\n                <span class="asw-amount">100%</span>\n              </div>\n              <div class="asw-plus" data-key="line-height" role="button" aria-pressed="false">\n                <span class="material-icons">add</span>\n              </div>\n            </div>\n            <div class="asw-adjust-control">\n              <div class="asw-minus" data-key="letter-spacing" role="button" aria-pressed="false">\n                <span class="material-icons">remove</span>\n              </div>\n              <div class="asw-control-label">\n                <span class="material-icons">format_letter_spacing</span>\n                <span class="asw-amount">100%</span>\n              </div>\n              <div class="asw-plus" data-key="letter-spacing" role="button" aria-pressed="false">\n                <span class="material-icons">add</span>\n              </div>\n            </div>\n            <div class="asw-items">\n              <div class="asw-btn" role="button" aria-pressed="false" data-key="dyslexic-font">\n                <span class="material-icons">spellcheck</span>Dyslexic Font\n              </div>\n              <div class="asw-btn" role="button" aria-pressed="false" data-key="font-weight">\n                <span class="material-icons">format_bold</span>Bold Text\n              </div>\n              <div class="asw-btn" role="button" aria-pressed="false" data-key="highlight-links">\n                <span class="material-icons">link</span>Highlight Links\n              </div>\n              <div class="asw-btn" role="button" aria-pressed="false" data-key="highlight-titles">\n                <span class="material-icons">title</span>Highlight Titles\n              </div>\n            </div>\n          </div>\n          <div class="asw-divider"></div>\n          <div class="asw-card">\n            <div class="asw-card-title">Color Adjustments</div>\n            <div class="asw-items">\n              <div class="asw-btn asw-filter" role="button" aria-pressed="false" data-key="monochrome">\n                <span class="material-icons">filter_b_and_w</span>Monochrome\n              </div>\n              <div class="asw-btn asw-filter" role="button" aria-pressed="false" data-key="high-contrast">\n                <span class="material-icons">contrast</span>High Contrast\n              </div>\n              <div class="asw-btn asw-filter" role="button" aria-pressed="false" data-key="light-contrast">\n                <span class="material-icons">brightness_5</span>Light Contrast\n              </div>\n              <div class="asw-btn asw-filter" role="button" aria-pressed="false" data-key="dark-contrast">\n                <span class="material-icons">nightlight</span>Dark Contrast\n              </div>\n            </div>\n          </div>\n          <div class="asw-divider"></div>\n          <div class="asw-card">\n            <div class="asw-card-title">Tools</div>\n            <div class="asw-items">\n              <div class="asw-btn asw-tools" role="button" aria-pressed="false" data-key="big-cursor">\n                <span class="material-icons">mouse</span>Big Cursor\n              </div>\n              <div class="asw-btn asw-tools" role="button" aria-pressed="false" data-key="stop-animations">\n                <span class="material-icons">motion_photos_off</span>Stop Animations\n              </div>\n            </div>\n            <div class="asw-btn asw-tools asw-full-width" role="button" aria-pressed="false" data-key="reading-guide">\n              <span class="material-icons">remove_red_eye</span>Reading Guide\n            </div>\n          </div>\n        </div>\n        <div class="asw-footer">\n          <a href="https://www.brightwaysaccess.com/" target="_blank" rel="noopener noreferrer">\n            Provided by Brightways Accessibility\n          </a>\n        </div>\n      </div>\n      <div class="asw-overlay"></div>\n      <div class="asw-reading-guide-overlay" style="display: none;">\n        <div class="asw-reading-guide-bar"></div>\n      </div>\n    '),
        n
      );
    })();
    document.body.appendChild(r),
      (function () {
        const n = localStorage.getItem("aswSettings");
        n &&
          ((f = JSON.parse(n)),
          (function () {
            f["font-size"] &&
              (i("font-size", f["font-size"]), p("font-size", f["font-size"]));
            f["line-height"] &&
              (i("line-height", f["line-height"]),
              p("line-height", f["line-height"]));
            f["letter-spacing"] &&
              (i("letter-spacing", f["letter-spacing"]),
              p("letter-spacing", f["letter-spacing"]));
            if (f.contrast) {
              o(f.contrast);
              const n = document.querySelector(
                `.asw-filter[data-key="${f.contrast}"]`
              );
              n &&
                (n.classList.add("asw-selected"),
                n.setAttribute("aria-pressed", "true"));
            }
            l(),
              Object.keys(f).forEach((n) => {
                const t = document.querySelector(`.asw-btn[data-key="${n}"]`);
                t &&
                  f[n] &&
                  (t.classList.add("asw-selected"),
                  t.setAttribute("aria-pressed", "true"),
                  "reading-guide" === n && d());
              });
          })());
      })(),
      (function () {
        const n = document.createElement("style");
        (n.textContent =
          '\n      @import url("https://fonts.googleapis.com/icon?family=Material+Icons");\n      @import url(\'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap\');\n\n      .asw-widget {\n        font-family: \'Nunito\', sans-serif;\n        -webkit-font-smoothing: antialiased;\n      }\n\n      .asw-menu, .asw-menu-btn {\n        position: fixed;\n        left: 20px;\n        transition: 0.3s;\n        z-index: 500000;\n      }\n\n      .asw-menu-btn {\n        bottom: 20px;\n        background: #fde2aa !important;\n        box-shadow: 0 5px 15px 0 rgba(37, 44, 97, 0.15), 0 2px 4px 0 rgba(93, 100, 148, 0.2);\n        border-radius: 50%;\n        align-items: center;\n        justify-content: center;\n        width: 80px;\n        height: 80px;\n        display: flex;\n        cursor: pointer;\n        border: none;\n      }\n\n      .asw-menu-btn:hover {\n        transform: scale(1.05);\n      }\n\n      .asw-menu {\n        display: none;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        border-radius: 0 8px 8px 0;\n        box-shadow: 1px 0 20px -14px #000;\n        background: #ffffff;\n        width: 33vw;\n        min-width: 400px;\n        max-width: 90vw;\n        line-height: 1;\n        font-size: 16px;\n        height: 100vh;\n        overflow: hidden;\n        display: flex;\n        flex-direction: column;\n      }\n\n      .asw-menu-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        background: #fde2aa;\n        color: #333;\n        padding: 20px;\n        font-weight: 600;\n        font-size: 20px;\n      }\n\n      .asw-menu-header > div {\n        display: flex;\n      }\n\n      .asw-menu-header div[role="button"] {\n        padding: 8px;\n        cursor: pointer;\n      }\n\n      .asw-menu-content {\n        flex-grow: 1;\n        overflow-y: auto;\n        padding: 20px;\n      }\n\n      .asw-card {\n        margin-bottom: 30px;\n      }\n\n      .asw-card-title {\n        font-size: 22px;\n        margin-bottom: 20px;\n        font-weight: 600;\n        color: #333;\n      }\n\n      .asw-adjust-control {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        margin-bottom: 20px;\n        background: #fff;\n        padding: 15px;\n        border-radius: 8px;\n        border: 1px solid #fde2aa;\n      }\n\n      .asw-control-label {\n        display: flex;\n        align-items: center;\n        font-weight: 600;\n      }\n\n      .asw-control-label .material-icons {\n        margin-right: 10px;\n      }\n\n      .asw-adjust-control div[role="button"] {\n        background: #fde2aa;\n        border-radius: 50%;\n        width: 40px;\n        height: 40px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        color: #333;\n        cursor: pointer;\n      }\n\n      .asw-items {\n        display: grid;\n        grid-template-columns: repeat(2, 1fr);\n        gap: 15px;\n      }\n\n      .asw-btn {\n        width: 100%;\n        height: 120px;\n        border-radius: 8px;\n        padding: 15px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-direction: column;\n        text-align: center;\n        color: #333;\n        background: #fffaf0;\n        border: 2px solid #fde2aa;\n        transition: all 0.3s ease;\n        cursor: pointer;\n        font-weight: 600;\n      }\n\n      .asw-btn .material-icons {\n        margin-bottom: 10px;\n        font-size: 32px;\n      }\n\n      .asw-btn:hover {\n        background: #fff5e6;\n      }\n\n      .asw-btn.asw-selected {\n        background: #fde2aa;\n        color: #333;\n      }\n\n      .asw-divider {\n        height: 2px;\n        background: #fde2aa;\n        margin: 30px 0;\n      }\n\n      .asw-footer {\n        background: #fde2aa;\n        padding: 40px;\n        text-align: center;\n      }\n\n      .asw-footer a {\n        color: #333;\n        text-decoration: none;\n        font-size: 18px;\n        font-weight: 600;\n      }\n\n      .asw-overlay {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background: rgba(0, 0, 0, 0.5);\n        z-index: 499999;\n        display: none;\n      }\n\n      .asw-full-width {\n        grid-column: 1 / -1;\n      }\n\n      .asw-reading-guide-overlay {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background: rgba(0, 0, 0, 0.5);\n        z-index: 499998;\n        display: none;\n      }\n\n      .asw-reading-guide-bar {\n        position: absolute;\n        left: 0;\n        width: 100%;\n        height: 50px;\n        background: rgba(255, 255, 255, 0.9);\n        cursor: move;\n      }\n\n      @media only screen and (max-width: 768px) {\n        .asw-menu {\n          width: 100%;\n          max-width: 100%;\n          border-radius: 0;\n        }\n\n        .asw-items {\n          grid-template-columns: 1fr;\n        }\n      }\n    '),
          document.head.appendChild(n);
      })(),
      (function () {
        const i = document.querySelector(".asw-menu-btn"),
          o =
            (document.querySelector(".asw-menu"),
            document.querySelector(".asw-menu-close")),
          l = document.querySelector(".asw-menu-reset"),
          r = document.querySelector(".asw-overlay"),
          d = document.querySelectorAll(".asw-btn"),
          c = document.querySelectorAll(
            '.asw-adjust-control div[role="button"]'
          );
        i.addEventListener("click", n),
          o.addEventListener("click", t),
          r.addEventListener("click", t),
          l.addEventListener("click", e),
          d.forEach((n) => n.addEventListener("click", s)),
          c.forEach((n) => n.addEventListener("click", a));
      })();
  })();
})();
