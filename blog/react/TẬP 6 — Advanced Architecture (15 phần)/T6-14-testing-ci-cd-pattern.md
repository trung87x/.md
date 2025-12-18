# T6-14 — Testing & CI/CD Pattern

> Mục tiêu: Chiến lược **test & CI/CD** cho ứng dụng React: unit/integration/e2e, matrix build, preview env, và release an toàn.

---

## 1) Pyramids & scope
- **Unit**: utils, hooks thuần.  
- **Integration**: component + hooks + providers (RTL).  
- **E2E**: luồng chính (Playwright/Cypress).

---

## 2) Testing cookbook
- Fake timers cho timer hooks.  
- msw cho network; fixtures cho dữ liệu.  
- Snapshot **ít dùng**, ưu tiên test hành vi.

---

## 3) CI matrix
- Node LTS + browsers; `pnpm i`, `lint`, `typecheck`, `test`.  
- Cache node_modules + Vite cache.

```yaml
# .github/workflows/ci.yml (rút gọn)
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with: { version: 9 }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint && pnpm typecheck && pnpm test -- --coverage
```

---

## 4) Preview env
- Vercel/Netlify tạo **preview** cho mỗi PR.  
- Post link preview vào PR để QA/PM duyệt.

---

## 5) Release
- **Changesets** để tạo phiên bản + changelog.  
- Canary release theo branch.  
- Feature flags để bật/tắt an toàn.

---

## 6) Monitoring
- Sentry/Datadog cho error & performance.  
- Synthetic tests/lighthouse CI cho regressions.

---

## 7) Checklist
- [ ] Pyramids cân đối; E2E chỉ cho path quan trọng.  
- [ ] CI: lint, typecheck, test, preview.  
- [ ] Release có versioning + flags.  
- [ ] Monitoring và budgets hiệu năng.

---

## 8) Bài tập
1. Viết workflow CI cơ bản; thêm job upload coverage artifact.  
2. Tạo preview env cho PR và dán link tự động vào PR.  
3. Thêm changesets và tạo release đầu tiên.