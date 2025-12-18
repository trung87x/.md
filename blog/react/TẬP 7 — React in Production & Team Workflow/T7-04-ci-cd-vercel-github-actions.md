# T7-04 — CI/CD với Vercel & GitHub Actions

> ⚙️ Tự động hóa build, test, lint và deploy React app khi push lên GitHub.

---

## 🎯 Mục tiêu
- Hiểu quy trình CI/CD cơ bản cho React project.
- Dùng GitHub Actions để build và test.
- Deploy lên Vercel tự động.

---

## 📁 Cấu trúc workflow

```
.github/
└── workflows/
    └── react-ci.yml
```

---

## 🧱 File ví dụ: `.github/workflows/react-ci.yml`

```yaml
name: React CI

on:
  push:
    branches: [ main ]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - run: npm test
```

---

## 🚀 Tích hợp Vercel
1. Tạo project trên [vercel.com](https://vercel.com).
2. Kết nối GitHub repo.
3. Mỗi lần merge/push vào `main`, Vercel tự deploy preview.

---

## 🔒 Thêm kiểm tra trước deploy

```yaml
- run: npm run lint
- run: npm run test
```

---

## ✅ Lợi ích CI/CD
| Tính năng | Mô tả |
|------------|--------|
| **Build tự động** | Không cần deploy thủ công. |
| **Test trước khi merge** | Ngăn lỗi production. |
| **Preview URL** | Cho phép QA / Designer xem trước bản build. |

---

## 🧠 Gợi ý thêm
- Dùng `codecov/codecov-action` để đo độ phủ test.
- Gắn badge build status trong README.
- Kết hợp Storybook deploy qua `chromatic`.

---

## ✅ Kết luận
CI/CD là nền tảng cho teamwork React hiện đại: mọi thay đổi được test, build, và deploy tự động chỉ với `git push`.
