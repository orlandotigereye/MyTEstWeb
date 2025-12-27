// core.js
window.Core = {
  loaded: false,
  modules: {},
  data: {},

  // 外部資源 URL
  urls: {
    // CDN 模組
    cdn: {
      astronomy: "https://cdn.jsdelivr.net/npm/astronomy-engine@2.1.19/astronomy.browser.min.js",
      d3: "https://cdn.jsdelivr.net/npm/d3@7",
      lunar: "https://cdn.jsdelivr.net/npm/lunar-javascript@1.6.12/lunar.min.js",
      html2canvas: "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"
    },
    // JSON 資料
    json: {
      astro: "https://raw.githubusercontent.com/orlandotigereye/Analy13/refs/heads/main/astrology_merged.json",
      cjk: "https://raw.githubusercontent.com/orlandotigereye/mytestweb/4ea567726353330f2301bca768a6325ab5611699/public/public/Dictionary_lite.json"
    }
  },

  /**
   * 標記模組狀態
   * @param {string} name 模組名稱
   * @param {boolean} status 是否成功
   * @param {string|null} err 錯誤訊息（可選）
   */
  mark(name, status, err) {
    this.modules[name] = { status, err: err || null };
  },

  /**
   * 重置所有模組狀態與資料
   */
  reset() {
    this.modules = {};
    this.data = {};
    this.loaded = false;
  },

  /**
   * 載入單個 JSON
   */
  async loadJSON(name, url) {
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      this.data[name] = await r.json();
      this.mark(name, true);
    } catch (e) {
      this.mark(name, false, e.message);
    }
  },

  /**
   * 動態載入單個 script
   */
  loadScript(name, url) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = url;
      s.onload = () => { this.mark(name, true); resolve(); };
      s.onerror = (e) => { this.mark(name, false, 'cdn load failed'); reject(e); };
      document.head.appendChild(s);
    });
  },

  /**
   * 初始化所有 CDN + JSON
   */
  async initAll() {
    this.reset();

    // Core 標記
    try { this.loaded = true; this.mark("Core", true); } 
    catch(e){ this.loaded=false; this.mark("Core", false, e.message); }

    // 依序載入 CDN 模組
    for (const [name, url] of Object.entries(this.urls.cdn)) {
      try { await this.loadScript(name, url); }
      catch(e){ console.warn(`${name} load failed: ${e.message}`); }
    }

    // 載入 JSON
    for (const [name, url] of Object.entries(this.urls.json)) {
      await this.loadJSON(name, url);
    }

    return this.modules;
  }
};

// 自動初始化保護
(async function safeInit() {
  try {
    if (window.Core) await Core.initAll();
  } catch(e) {
    console.error("Core 初始化失敗", e);
  }
})();
