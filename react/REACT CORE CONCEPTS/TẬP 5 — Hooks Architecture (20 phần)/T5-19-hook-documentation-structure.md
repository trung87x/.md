# T5-19 — Hook Documentation Structure

> Mục tiêu: Mẫu **tài liệu hook** nhất quán để cả team dễ đọc, dễ áp dụng, và code review thuận lợi.

---

## 1) Mẫu README cho từng hook
```
# useXxx

## Mục tiêu
Mô tả ngắn gọn hook làm gì (1–2 câu).

## API
### Input
- props/options, kiểu dữ liệu, default

### Output
- state, actions, kiểu dữ liệu
- ổn định tham chiếu?

## Ví dụ
(đoạn code tối thiểu thể hiện cách dùng)

## Side‑effects & Cleanup
Mô tả listeners/timers/fetch và cách cleanup.

## Pitfalls
Các bẫy thường gặp, stale closure, deps...

## Test
Cách test chính, có fake timers/msw?

## Tham khảo
Liên kết đến hooks liên quan hoặc pattern.
```

---

## 2) Cấu trúc Docs tổng thể
```
docs/
  HOOKS.md            # danh mục hook
  hooks/
    useDisclosure.md
    useEventListener.md
    useDebouncedValue.md
```

- `HOOKS.md` liệt kê: **mục tiêu**, **API tóm tắt**, **deps** (đồ thị), **status** (stable/experimental).

---

## 3) Ví dụ HOOKS.md (trích)
```md
| Hook               | Mục tiêu                  | Input                          | Output                        | Status | Deps            |
|--------------------|---------------------------|--------------------------------|-------------------------------|--------|-----------------|
| useDisclosure      | Toggle UI open/close      | `initial?: boolean`            | `{ open,onOpen,onClose,... }` | stable | —               |
| useEventListener   | Add/remove DOM listener   | `target,type,handler,opts?`    | —                             | stable | dom             |
| useJson            | Fetch JSON + abort        | `url?: string`                 | `{ status,data,error }`       | beta   | data, fetch     |
```

---

## 4) Checklist
- [ ] README hook theo mẫu: mục tiêu → API → ví dụ → pitfalls → test.
- [ ] HOOKS.md liệt kê tóm tắt + deps/status.
- [ ] Liên kết chéo tới pattern liên quan (DI, composition, testing).