# T6-13 — Architecture Folder Structure

> Mục tiêu: Chọn **cấu trúc thư mục** giúp scale: phân tầng domain/feature/shared, module boundary rõ ràng, và public API nhất quán.

---

## 1) Cấu trúc theo feature (khuyến nghị)
```
src/
  app/                # entry, router, layout, providers
  features/
    auth/
      components/
      hooks/
      services/
      types.ts
      index.ts        # re-export public API
    cart/
    search/
  shared/
    components/
    hooks/
    ui/               # primitive UI (Button, Input)
    lib/              # utils thuần
  services/           # adapters: api, storage, logger (DI)
  styles/
  tests/
```

- **Feature-first**: gom logic + UI cùng domain.  
- `shared/` chỉ chứa **khối tái sử dụng** đa domain.

---

## 2) Public API & boundary
- Mỗi feature có `index.ts` **re-export** thành phần được phép dùng ngoài.  
- Import **chỉ qua** public API để tránh rò rỉ nội bộ.
```ts
// đúng
import { LoginButton } from "@/features/auth";
// sai
import { LoginButton } from "@/features/auth/components/LoginButton";
```

---

## 3) Alias & lint
- Thiết lập path alias `@/features/*`.  
- ESLint rules: cấm import xuyên boundary, cấm cycle (madge/eslint-plugin-import).

---

## 4) UI system
- `shared/ui` cho **primitive** + **tokens** (design system).  
- Feature tự compose, hạn chế style rải rác.

---

## 5) Data & service layer
- `services/` chứa adapters (API, storage, analytics) theo **DI** (xem T4‑15).  
- Hook domain **không import trực tiếp** axios/fetch — đi qua service.

---

## 6) Checklist
- [ ] Feature-first với public API rõ.  
- [ ] Alias + lint bảo vệ boundary.  
- [ ] Service layer theo DI; shared/ui tách bạch.  
- [ ] Không import xuyên file nội bộ của feature khác.

---

## 7) Bài tập
1. Refactor dự án nhỏ sang feature-first; viết public API cho 2 feature.  
2. Thêm rule ESLint cấm import nội bộ giữa features (ngoài index.ts).