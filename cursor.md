# Cursor / Agent 入场指南（KuokamaKitty）

> 目标：让任何 agent 在 **5 分钟内**理解项目做什么、改哪里、哪些口径不能动、怎么验证改动是否正确。

## 基本原则

- **改动原则**：优先**最小改动**、可回滚；不要引入不必要的依赖/构建流程（本项目是纯静态站）。
- **信息安全**：不要新增需要后端/密钥的能力；所有计算默认在浏览器端完成。

## 品牌规范（不可更改）

- **站点标题**：`KOAKUMA KITTY [易占] Fortune` — 三语版本必须保持完全一致，这是品牌招牌。

## 项目一句话

这是一个**纯静态**的中国传统命理/易占小站（Y2K 猫咪风），支持**中英日三语**，涵盖八字、流年/运势、择日、合婚、风水、摇卦等；核心口径参考倪海厦《天纪》等。

## 三语支持

- **中文版**：`/`（根路径）
- **英文版**：`/en/`
- **日语版**：`/ja/`
- **i18n 模块**：`js/i18n.js`（翻译数据 + 语言切换逻辑）
- **语言检测**：以 URL 路径为准（不自动跳转）
- **核心术语保留中文**：八字四柱、五行、天干地支等命理符号保留原样
- **日语人设**：小悪魔ツンデレ（傲娇吐槽但不冒犯）
- **日语视频**：使用 YouTube（从16秒起播）

## 快速开始（必须用 HTTP）

> 由于使用了 ES Modules，**不要**直接用 `file://` 双击打开 `index.html`。

```bash
cd <项目根目录>
python3 -m http.server 8080
```

然后打开 `http://localhost:8080`。

## 目录地图（改动落点）

| 路径 | 说明 |
|-----|------|
| `index.html` | 中文版页面结构、模块脚本引用、各功能 tab 的 DOM 容器、SEO 结构化数据 |
| `en/index.html` | 英文版页面（结构与中文版镜像，内容已翻译） |
| `ja/index.html` | 日语版页面（小悪魔ツンデレ人设，使用 YouTube 视频） |
| `css/styles.css` | 全站样式（Y2K 猫咪风）；视觉规范见 `docs/y2k_cat_design_system.md` |
| `js/main.js` | 前端主控制器（Hash 路由 / tab 切换 / 表单交互） |
| `js/i18n.js` | 国际化模块（翻译数据 + 语言切换 + `I18n.t()` / `I18n.isEnglish()` / `I18n.isJapanese()` 等 API） |
| `js/*.js` | 各业务模块（`bazi.js`、`daily.js`、`fengshui.js`、`marriage.js`…），均已支持三语 |
| `js/core/` | 历法与统一规则核心（**高风险区**，改动需自测对账） |
| `docs/` | 规格/口径/设计文档（**先读再改**） |

### js/core/ 详情

- `calendar.js`：统一历法 API（四柱、命理年、日柱等）
- `solar_terms.js`：节气时刻与相关计算
- `nishi_rules.js`：统一规则引擎 `NiShiRules`（产出标准化 `NiShiResult`）
- `calendar_test.js`：历法回归样例（可用于验收）

## URL 路由（Hash 路由）

- 使用 Hash 路由：`/#bazi`、`/#daily`、`/#yearly2026` 等
- Tab 切换统一由 `js/main.js` 的 `activateTab(tabKey)` 驱动
- 新增 Tab 时需同步更新 `TAB_CONFIG.titles` 映射
- **中文版**：`/`、`/#bazi`、`/#daily` 等
- **英文版**：`/en/`、`/en/#bazi`、`/en/#daily` 等
- **日语版**：`/ja/`、`/ja/#bazi`、`/ja/#daily` 等

**支持的 hash（8个模块）：**
`yearly2026`（默认）、`daily`、`bazi`、`name`、`yijing`、`fengshui`、`marriage`、`auspicious`

> ⚠️ `facereading`（面相）功能**已下线**，日语版不包含此模块

## SEO 结构化数据

`index.html` 的 `<head>` 内有两个 JSON-LD：

| Schema 类型 | 作用 |
|------------|------|
| `SoftwareApplication` | 应用元信息（名称、分类、功能列表） |
| `FAQPage` | 富摘要 FAQ（4 组核心 Q&A） |

修改后可用 [Google Rich Results Test](https://search.google.com/test/rich-results) 验证。

## 核心口径（不可随意更改）

口径文档：`docs/calendar_spec.md`、`docs/nishi_rules_spec.md`

- **年柱**：以**立春换年**（不是公历 1 月 1 日）
- **月柱**：以**节气定月**（"节"起月，不按公历月份）
- **日柱**：使用项目既定基准与算法
- **时柱**：按时辰起点（子时 23:00 起）策略
- **时区**：统一使用北京时间 **Asia/Shanghai (UTC+8)**

如果你要改这些口径：请先更新对应 `docs/*_spec.md`，并提供输入/预期输出样例，再改实现。

## 视觉与体验（Y2K 猫风禁区）

设计系统：`docs/y2k_cat_design_system.md`

- **必须保持**：明亮柔和渐变、果冻按钮、银色/玻璃质感、圆润边角、猫咪语气
- **禁止**：黑暗背景、Matrix 绿、Tron/HUD 赛博风、硬霓虹描边、扫描线/网格地板

## 标准化数据流

架构图：`docs/architecture_diagram.md`

- 各模块（`js/*.js`）负责各自领域算法与文案拼装
- `js/core/nishi_rules.js` 提供统一规则引擎与标准输出 `NiShiResult`
- `js/core/calendar.js` 是所有"时间口径"的统一来源

## 常见任务怎么做

### 改 UI/文案/布局
- 主要改：`index.html`、`css/styles.css`、对应模块的 `renderResult()`
- 不要破坏 Y2K 设计系统的禁区

### 修/改历法相关计算
- 主要改：`js/core/calendar.js`、`js/core/solar_terms.js`、`js/core/dayun.js`
- 必须跑"回归样例"（见下方自测）

### 新增一个功能模块
1. 在 `index.html` 加 tab（`data-tab`）与 section 容器（`id` 需一致）
2. 新建 `js/<module>.js`，在 `js/main.js` 里 `init<Module>()`
3. 更新 `TAB_CONFIG.titles` 添加新 tab 的标题映射
4. 能复用 `NiShiRules` / `ChineseCalendar` 的尽量复用

## 自测/验收（改核心时必须做）

在本地 HTTP 服务打开站点后，打开浏览器 DevTools Console，执行：

```js
import('/js/core/calendar_test.js').then(m => m.runAllTests());
```

预期：控制台输出 `✅ 所有测试通过！`

## 外部依赖提醒

| 模块 | 依赖 | 离线时 |
|-----|------|-------|
| 面相分析 | `face-api.js`（CDN） | 加载失败，非本地逻辑问题（**功能已暂时下线**） |
| 分享图 | `html2canvas`、`qrcodejs` | 可能失败 |
| 统计 | GA4（`js/tracker.js`） | 不影响功能 |

## 国际化（i18n）开发指南

### 添加新翻译
在 `js/i18n.js` 的 `translations` 对象中添加 key-value：
```js
translations: {
    zh: { 'new.key': '中文文案' },
    en: { 'new.key': 'English text' },
    ja: { 'new.key': '日本語テキスト' }
}
```

### 在模块中使用三语
```js
const isEn = typeof I18n !== 'undefined' && I18n.isEnglish();
const isJa = typeof I18n !== 'undefined' && I18n.isJapanese();
const text = isJa ? '日本語' : (isEn ? 'English' : '中文');
```

### 日语人设规范
- **角色**：小悪魔ツンデレ（傲娇吐槽但不冒犯）
- **语气**：使用「占い/運勢/おみくじ/開運/ヒント」语境
- **术语格式**：emoji + 汉字（かな），如 `☯️ 易経（えききょう）`

### 保留中文的核心术语
- 八字四柱：年柱、月柱、日柱、时柱
- 五行：木、火、土、金、水
- 天干地支、八卦名称等命理专业符号
