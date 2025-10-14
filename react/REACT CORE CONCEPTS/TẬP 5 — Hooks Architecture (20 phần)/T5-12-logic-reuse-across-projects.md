# T5-12 — Logic Reuse Across Projects

> Mục tiêu: Đóng gói **custom hooks** và logic dùng lại để **chia sẻ giữa dự án**: cấu trúc package, API ổn định, versioning (SemVer), peer deps, docs/test/CI.

---

## 1) Chọn chiến lược reuse
- **Mono‑repo** (pnpm/yarn workspaces, Nx, Turborepo): dễ chia sẻ, đồng bộ versions.
- **Private npm package**: publish nội bộ; dự án khác cài vào.
- **Copy‑paste có kiểm soát**: với snippet nhỏ + checklist review.

---

## 2) Cấu trúc package hooks
```
packages/
  react-hooks/
    src/
      useDisclosure.ts
      useEventListener.ts
      useDebouncedValue.ts
      index.ts
    README.md
    package.json
    tsconfig.json
    vitest.config.ts
```

`index.ts`
```ts
export * from "./useDisclosure";
export * from "./useEventListener";
export * from "./useDebouncedValue";
```

---

## 3) package.json (SemVer & peer deps)
```json
{
  "name": "@acme/react-hooks",
  "version": "1.2.0",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.esm.js",
  "types": "./dist/index.d.ts",
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  },
  "files": ["dist"],
  "sideEffects": false
}
```
- **peerDependencies** để dùng React của app, tránh duplicate.  
- `sideEffects:false` giúp **tree‑shaking**.

---

## 4) Build & publish
- Dùng **tsup/rollup** để build ESM+CJS+types.  
- Publish: npm private registry (Verdaccio, GitHub Packages) hoặc scope nội bộ.

```bash
pnpm -w build
pnpm -w -r test
pnpm publish --access public # hoặc nội bộ
```

---

## 5) API ổn định & SemVer
- **SemVer**: `MAJOR.MINOR.PATCH`.  
- Thay đổi breaking → tăng **MAJOR**.  
- Thêm tính năng **không phá vỡ** → **MINOR**.  
- Sửa lỗi/backwards‑compatible → **PATCH**.

> Viết **CHANGELOG.md**, dùng **changesets** để tự động quản lý phiên bản.

---

## 6) Docs, Storybook, Examples
- Viết **README** cho từng hook: mục tiêu, usage, pitfalls.  
- **Storybook** hiển thị hành vi tương tác.  
- **Examples** trong `examples/` để người khác **chạy thử nhanh**.

---

## 7) Testing & CI
- Unit bằng **Vitest/Jest**, integration UI bằng **React Testing Library**.
- Thiết lập **CI** (GitHub Actions) để chạy test, build, publish theo tag.
- Dùng **eslint-plugin-react-hooks** và **tsc --noEmit** trong CI.

---

## 8) License & Security
- Chọn **license** phù hợp (MIT/Apache‑2.0/internal).  
- Quét **vulnerabilities** (npm audit), kiểm soát **secrets** khi publish.

---

## 9) Anti‑patterns
- Package **quá tải**: nhồi quá nhiều hooks không liên quan.  
- **API thay đổi liên tục** không theo SemVer → khó nâng cấp.  
- Không có docs/test → reuse thất bại.

---

## 10) Mini demo: tsup config
```ts
// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true,
  format: ["esm", "cjs"],
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false
});
```

---

## 11) Checklist
- [ ] Chọn kênh reuse: monorepo hay package riêng.  
- [ ] Định nghĩa peer deps, xuất ESM+CJS+types.  
- [ ] CI: test + build + release (changesets).  
- [ ] Docs/Storybook/examples đầy đủ.  
- [ ] SemVer + Changelog minh bạch.

---

## 12) Bài tập
1. Đóng gói `@your/react-hooks` với 3 hook: `useDisclosure`, `useDebouncedValue`, `useEventListener`.  
2. Thiết lập CI phát hành **minor** khi có feature mới.  
3. Viết 2 ví dụ trong `examples/` dùng package vừa build.