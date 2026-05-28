
# CataWuwa Fixed Structure

## Đã tách:
- HTML → index.html
- CSS → css/style.css
- JavaScript → js/script.js

## Việc bạn cần làm tiếp:
1. Mở VS Code
2. Mở folder `catawuwa-fixed`
3. Cài extension Live Server
4. Chạy index.html

## Lưu ý:
- Các font base64 cực lớn đã được loại bỏ để tránh lỗi context.
- Nếu web bị thiếu font, hãy thêm file .ttf/.otf vào:
  assets/fonts/

Ví dụ CSS:
@font-face {
    font-family: 'Cinzel';
    src: url('../assets/fonts/cinzel.ttf') format('truetype');
}
