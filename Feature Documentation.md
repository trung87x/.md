# 📚 Feature Documentation: Vocabulary Search

## 1. SRS – Feature Requirement Specification

### 1.1 Mục đích

Cho phép người dùng tìm kiếm từ vựng trong hệ thống.

### 1.2 Phạm vi

- Ô tìm kiếm toàn cục (header/navbar).
- Khi Enter hoặc chọn gợi ý → điều hướng tới **Vocabulary Results**.

### 1.3 Functional Requirements

- **FR-1: Tìm kiếm từ vựng**
  - Nhập từ khóa (word).
  - Hiển thị danh sách từ phù hợp.

### 1.4 Non-functional Requirements

- Search ≤ 1s, Suggest ≤ 300ms (P95).
- UI responsive, thân thiện.
- Hỗ trợ dữ liệu lớn (mở rộng JSON).

### 1.5 Change Log

- v1.0: FR-1 (basic search)

---

## 2. Use Case / User Flow

### UC-1: Search Vocabulary

**Actor**: Người dùng  
**Flow**: nhập từ khóa → Enter → hiển thị danh sách từ phù hợp.

---

## 3. Software Design Document (SDD)

### SSD-1-1. Phạm vi

- Search từ JSON local: `high.json`, `med.json`, `low.json`.
- SPA hash-router (`#/results?q=...`).
- Kết quả hiển thị tại trang Results.

### SSD-1-2. Cấu trúc dữ liệu

```json
{
  "word": "apple",
  "meaning_vi": "quả táo",
  "pos": "noun",
  "source": "high"
}
```

### SSD-1-3. Luồng tìm kiếm

1. Nhập từ khóa → `rawQ`.
2. Chuẩn hoá → `normQ`.
3. Có dấu → match raw VI.
4. Không dấu → match normalize.
5. Ưu tiên **prefix**, sau đó **substring**.
6. Trả về danh sách kết quả.

---

## 4. Test Plan / Test Cases

- **TC-1-1**: nhập `apple` → có kết quả.
- **TC-1-2**: nhập `chân` → so khớp raw VI.
- **TC-1-3**: nhập `chan` → normalize = chân.
- **TC-1-4**: nhập `xyzabc` → “Không có kết quả”.
- **TC-1-5**: nhập rỗng → không crash.

---

## 5. Implementation / Source Code Overview

### I-1-1. Cấu trúc thư mục

```
src/
├─ controllers/
│  └─ ResultsController.js
├─ services/
│  └─ SearchService.js
├─ views/
│  └─ Search/Results.html
├─ data/
│  ├─ high.json
│  ├─ med.json
│  └─ low.json
```

### I-1-2. Routing

- Pattern: `#/results?q=<query>`.
- Gọi `ResultsController.index({ q })`.

### I-1-3. Controller

```js
// src/controllers/ResultsController.js
import SearchService from "../services/SearchService.js";

export default class ResultsController {
  async index({ q }) {
    const items = await SearchService.performSearch(q);
    await this.render("Search/Results.html", { q, items });
  }
}
```

### I-1-4. Service

```js
// src/services/SearchService.js
import { normalize } from "../utils/text.js";
import { DB } from "../data/load.js";

export default {
  performSearch(query) {
    const rawQ = (query || "").trim().toLowerCase();
    const normQ = normalize(rawQ);
    const useRaw = /[àáạâăđêôơư]/i.test(rawQ);

    return DB.words.filter((x) => {
      const en = normalize(x.word);
      const vi = Array.isArray(x.meaning_vi)
        ? x.meaning_vi.join(" ")
        : x.meaning_vi;
      return useRaw
        ? vi.includes(rawQ)
        : en.startsWith(normQ) || vi.includes(normQ);
    });
  },
};
```

### I-1-5. View

```html
<!-- src/views/Search/Results.html -->
<section>
  <h2>Kết quả cho: {{q}}</h2>
  <div id="resultZone">
    {{#if items.length}} {{#each items}}
    <div>{{word}} – {{meaning_vi}} ({{pos}})</div>
    {{/each}} {{else}}
    <p>Không có kết quả.</p>
    {{/if}}
  </div>
</section>
```

---

## 6. Change Log / Version History

| Version | Ngày | Thay đổi                  |
| ------- | ---- | ------------------------- |
| 1.0     | X    | Basic Search, Results     |
| 1.1     | Y    | Search Box toàn cục       |
| 1.2     | Z    | Hiển thị chi tiết từ vựng |
