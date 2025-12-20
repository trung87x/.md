## (Sử dụng @apply)

Kỹ năng: Khi một nút bấm hoặc thẻ card xuất hiện ở quá nhiều nơi, việc copy-paste đống class sẽ làm code bị rác. Bạn cần gom chúng lại thành một "thành phần" sạch sẽ.

```css
/_ Trong file style.css _/ @layer components {
  .btn-gold {
    @apply bg-yellow-500 text-black font-bold py-2 px-8 rounded-lg
hover:bg-yellow-600 transition-colors shadow-md;
  }
}
```
