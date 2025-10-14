# T5-18 — Hook Directory Architecture

> Mục tiêu: Tổ chức **thư mục hooks** rõ ràng, dễ tìm kiếm, dễ reuse và test; hỗ trợ scale theo domain.

---

## 1) Cấu trúc gợi ý
```
src/
  hooks/
    dom/
      useEventListener.ts
      useOnClickOutside.ts
    data/
      useFetch.ts
      useJson.ts
    state/
      useDisclosure.ts
      useControllableState.ts
    store/
      useSyncExternalStore/
        index.ts
        useAuthStore.ts
    app/
      useProfile.ts
      useSearchPage.ts
    __tests__/
      useDisclosure.test.ts
  providers/
    ServiceProvider.tsx
  docs/
    HOOKS.md
```

---

## 2) Quy ước đặt tên
- `useXxx.ts` cho hook, `XxxProvider.tsx` cho Provider.  
- `index.ts` chỉ **re-export** public API, không chứa logic.  
- Tên **theo domain**: `useCart`, `useFeatureFlag`, `usePayment`…

---

## 3) Storybook & Examples
- Mỗi hook có **câu chuyện** minh hoạ tương tác.  
- Thư mục `examples/` chứa usage mẫu để QA/PM **thử nhanh**.

---

## 4) Boundary & public API
- Chỉ export **hook công khai** từ `hooks/index.ts`.  
- Nội bộ để trong thư mục riêng hoặc prefix `_internal`.  
- Tránh **rò rỉ** types/impl không ổn định.

---

## 5) Testing & CI
- Test tập trung tại `__tests__`.  
- CI chạy `lint`, `typecheck`, `test` trên mỗi PR.

---

## 6) Checklist
- [ ] Phân nhóm theo **domain/kỹ thuật** (dom/data/state/store/app).
- [ ] `index.ts` re-export công khai.
- [ ] Examples/Storybook cho hook phức tạp.
- [ ] Tests tập trung; CI đầy đủ.