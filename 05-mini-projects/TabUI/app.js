const $ = document.querySelector.bind(document);
// Gán biến `$` để chọn nhanh phần tử đầu tiên phù hợp với selector, tương đương document.querySelector
const $$ = document.querySelectorAll.bind(document);
// Gán biến `$$` để chọn tất cả các phần tử phù hợp với selector, tương đương document.querySelectorAll

const tabs = $$('.tab-item');
// Lấy tất cả các tab có class 'tab-item' và gán vào biến `tabs`
const panes = $$('.tab-pane');
// Lấy tất cả các phần tử nội dung tab có class 'tab-pane' và gán vào biến `panes`

const tabActive = $(".tab-item.active");
// Lấy tab đang active lúc ban đầu (có class 'active') và gán vào `tabActive`
const line = $(".tabs .line");
// Lấy phần tử `.line` nằm trong `.tabs`, dùng để tạo hiệu ứng underline

requestIdleCallback(function () {
    line.style.left = tabActive.offsetLeft + "px";
    // Khi trình duyệt rảnh, đặt vị trí ngang của line theo tab đang active
    line.style.width = tabActive.offsetWidth + "px";
    // Khi trình duyệt rảnh, đặt chiều rộng của line bằng chiều rộng của tab đang active
});

tabs.forEach((tab, index) => {
    const pane = panes[index];
    // Duyệt từng tab và lấy ra pane tương ứng theo chỉ số index

    tab.onclick = function () {
        $(".tab-item.active").classList.remove("active");
        // Gỡ class 'active' khỏi tab đang được chọn trước đó
        $(".tab-pane.active").classList.remove("active");
        // Gỡ class 'active' khỏi nội dung tab (pane) đang hiển thị

        line.style.left = this.offsetLeft + "px";
        // Cập nhật vị trí ngang của line theo tab vừa click
        line.style.width = this.offsetWidth + "px";
        // Cập nhật chiều rộng của line theo chiều rộng tab vừa click

        this.classList.add("active");
        // Thêm class 'active' cho tab vừa được click
        pane.classList.add("active");
        // Thêm class 'active' cho phần nội dung tương ứng của tab vừa được click
    };
});
