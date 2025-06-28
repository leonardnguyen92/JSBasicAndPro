let courseApi = "http://localhost:3001/courses";
let errorApi = "http://localhost:3001/errors";

let listCourseBlock = document.querySelector("#list-courses");
let errorList = [];

/**
 * Phương thức khởi tạo các ứng dụng khởi chạy khi khởi động trang web
 */
function start() {
    loadErrors(function () {
        getCourse(renderCourse);
        handleCreateForm();
    });
}

// Gọi hàm khởi động khi trang vừa load.
start();

/**
 * Phương thức lấy dữ liệu khoá học từ cơ sở dữ liệu.
 *
 * @param {Function} callback - Một hàm được gọi sau khi dữ liệu được lấy thành công.
 *
 * Quy trình:
 * 1. Gửi yêu cầu GET đến đường dẫn `courseApi` bằng `fetch`.
 * 2. Khi nhận được phản hồi (`response`), gọi phương thức `.json()` để chuyển đổi dữ liệu từ định dạng JSON thuần (raw) sang object JavaScript.
 * 3. Khi dữ liệu JSON đã sẵn sàng, truyền nó vào `callback` để xử lý (ví dụ: render ra HTML).
 *
 * Lưu ý:
 * - `fetch()` là một hàm bất đồng bộ (asynchronous), vì vậy nó trả về một Promise.
 * - `.then()` được dùng để xử lý kết quả trả về sau khi Promise hoàn thành.
 */
function getCourse(callback) {
    // Gửi yêu cầu GET đến API (JSON Server)
    fetch(courseApi)
        // Chuyển dữ liệu phản hồi thành JSON
        .then(response => response.json())
        // Gọi hàm callback truyền dữ liệu vào để xử lý tiếp.
        .then(callback);
}

/**
 * Phương thức tạo mới một khoá học.
 */
function createCourse(data, callback) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // Automatically converted to "username=example&password=password"
        body: JSON.stringify(data)
    };
    fetch(courseApi, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function handleCreateForm() {
    let createBtn = document.querySelector("#create");

    createBtn.addEventListener("click", function (e) {
        let name = document.querySelector("input[name='name']").value.trim();
        let description = document.querySelector("input[name='description']").value.trim();
        let price = Number(document.querySelector("input[name='price']").value.trim());

        let formData = {
            name: name,
            description: description,
            price: price
        };

        let validation = handleValidateData(formData);
        if (!validation.isValid) {
            // document.querySelector("#form-errors").innerHTML = validation.errors.map(msg => `<div>${msg}</div>`).join("");
            alert(validation.errors.join("\n"));
            return;
        } else {
            alert(`Khoá học ${name} đã tạo thành công!`);
            // document.querySelector("#form-errors").innerHTML = "";
            createCourse(formData, function (newCourse) {
                addCourseToDOM(newCourse);
                document.querySelector("input[name='name']").value = "";
                document.querySelector("input[name='description']").value = "";
                document.querySelector("input[name='price']").value = "";
            });
        }
    })

}

/**
 * Phương thức chuyển dữ liệu từ cơ sở dữ liệu thành mã HTML và hiển thị ra giao diện.
 *
 * @param {Array} courses - Một mảng các đối tượng khoá học được lấy từ cơ sở dữ liệu.
 *
 * Quy trình:
 * 1. Duyệt qua mảng `courses` bằng `map()` để chuyển từng phần tử thành một chuỗi HTML.
 * 2. Mỗi phần tử tương ứng với một hàng `<tr>` trong bảng, chứa các cột: ID, tên, mô tả và giá.
 * 3. Sau khi chuyển đổi xong, dùng `join("")` để nối các chuỗi HTML thành một chuỗi lớn.
 * 4. Gán toàn bộ chuỗi HTML vào phần tử DOM có tên `listCourseBlock` (giả định là một thẻ `<tbody>` hoặc container HTML nào đó).
 */
function renderCourse(courses) {
    // Dùng map để tạo mảng các chuỗi HTML từ dữ liệu khoá học
    const htmls = courses.map((course, index) => renderCourseRow(course, index + 1));
    listCourseBlock.innerHTML = htmls.join("");
}

/**
 * Phương thức xoá bỏ một khoá học.
 */
function handleRemoveCourse(courseId) {
    let options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    };
    fetch(`${courseApi}/${Number(courseId)}`, options)
        .then(response => {
            if (!response.ok) { throw new Error("Failed"); }
            let courseItem = document.querySelector(`.course-item-${courseId}`);
            if (courseItem) {
                courseItem.remove();
                alert(`Course ${courseId} xoá thành công!!!`);
            } else {
                alert(`Hệ thống đang bận!`);
            }
        })
}

/**
 * Phương thức cập nhật dữ liệu khoá học.
 */
function handleUpdateCourse() {

}

function getMaxCourseID(callback) {
    fetch(courseApi)
        .then(response => response.json())
        .then(courses => {
            if (courses.length === 0) {
                callback(null);
            } else {
                const ids = courses.map(course => course.id);
                const maxId = Math.max(...ids);
                callback(maxId);
            }
        });
}

function renderCourseRow(course, stt) {
    return `
        <tr class="course-item-${course.id}">
        <td>${stt}</td>           <!-- Cột ID của khoá học -->
        <td>${course.name}</td>         <!-- Cột tên của khoá học -->
        <td>${course.description}</td>  <!-- Cột mô tả khoá học -->
        <td>${course.price}</td>        <!-- Cột học phí của khoá học -->
        <td><button class="button updateBtn" data-id="${course.id}">UPDATE</button><button class="button deleteBtn" data-id="${course.id}" onclick="handleRemoveCourse(${course.id})">DELETE</button></td>
        </tr>`;
}

function addCourseToDOM(course) {
    listCourseBlock.insertAdjacentHTML("beforeend", renderCourseRow(course));
}

function handleValidateData(data) {
    let errors = [];
    // Validate name
    if (!data.name || data.name.trim() === "") {
        errors.push(getMessageError("e001"));
    } else if (data.name.length < 20 || data.name.length > 255) {
        errors.push(getMessageError("e002"));
    }
    // validate description
    if (!data.description || data.description.trim() === "") {
        errors.push(getMessageError("e003"));
    }
    // validate price
    if (data.price === undefined || data.price === null || data.price === "") {
        errors.push(getMessageError("e004"));
    } else if (isNaN(data.price)) {
        errors.push(getMessageError("e005"));
    } else if (Number(data.price) < 0) {
        errors.push(getMessageError("e006"));
    }
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function loadErrors(callback) {
    fetch(errorApi)
        .then(response => response.json())
        .then(errors => {
            errorList = errors;
            if (typeof callback === "function") callback();
        });
}

function getMessageError(errorId) {
    const err = errorList.find(e => e.error_id === errorId);
    return err ? err.error_name : "Lỗi không xác định.";
}
