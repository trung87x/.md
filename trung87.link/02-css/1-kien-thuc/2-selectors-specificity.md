## (Độ ưu tiên)

Bài toán: Bạn viết CSS nhưng nó không thay đổi màu sắc như ý muốn vì bị một dòng code khác "đè" lên. Bạn cần biết ai là "sếp".

```html
<style>
  /* Độ ưu tiên thấp (thẻ) */
  p {
    color: black;
  }

  /* Độ ưu tiên trung bình (class) */
  .highlight {
    color: blue;
  }

  /* Độ ưu tiên cao (ID) */
  #special-text {
    color: red;
  }

  /* Kết hợp để tăng sức mạnh (Specific) */
  article .highlight {
    font-weight: bold;
  }
</style>

<article>
  <p class="highlight" id="special-text">
    Tôi sẽ có màu ĐỎ vì ID có độ ưu tiên cao nhất!
  </p>
</article>
```
