var courses = [
    {
        name: "JavaScript",
        price: 600,
        description: "Khoá học JavaScript",
        isFinish: false
    },
    {
        name: "HTML, CSS",
        price: 0,
        description: "Khoá học HTML CSS",
        isFinish: false
    },
    {
        name: "Ruby",
        price: 450,
        description: "Khoá học Ruby",
        isFinish: true
    },
    {
        name: "Dart",
        price: 850,
        description: "Khoá học Dart",
        isFinish: true
    },
    {
        name: "Java",
        price: 900,
        description: "Khoá học Java",
        isFinish: false
    }
];

Array.prototype.myForEach = function (callback) {
    for (let index in this) {
        if (this.hasOwnProperty(index)) {
            callback(this[index], index, this);
        }
    }
}

//Hiển thị chuỗi kết quả
let outputText = "";

//Dùng myForEach để hiển thị từng khoá học
courses.myForEach(function (course, index, array) {
    let progress = "";
    if (course.isFinish) {
        progress = "Đã hoàn thành";
    } else {
        progress = "Chưa hoàn thành";
    }
    const line = `- Khóa ${parseInt(index) + 1}:
  - Tên: ${course.name}
  - Giá: ${course.price} VND
  - Mô tả: ${course.description}
  - Trạng thái: ${progress}
  - Tổng số khóa: ${array.length}
`;
    outputText += line + "\n";
    console.log(line);
});

//Gắn kết quả vào trang web
document.getElementById("resultMyForEach").textContent = outputText;
/**
 * Tạo một bản sao của hàm `Array.prototype.filter`.
 *
 * Duyệt qua mảng và trả về một mảng mới gồm các phần tử mà hàm callback trả về giá trị true.
 * Bỏ qua các phần tử rỗng (không tồn tại trong mảng sparse).
 *
 * @param {function(any, number, Array): boolean} callback - Hàm kiểm tra từng phần tử:
 *        - `element`: phần tử hiện tại
 *        - `index`: chỉ mục
 *        - `array`: mảng gốc
 * @returns {Array} Mảng mới chỉ chứa các phần tử thỏa điều kiện
 *
 * @example
 * const arr = [1, 2, 3, 4];
 * const even = arr.myFilter(n => n % 2 === 0); // [2, 4]
 */
// Gắn hàm `myFilter` vào prototype của Array - tức là mọi mảng đều có thể dùng hàm này như `array.myFilter(...)`
Array.prototype.myFilter = function (callback) {
    // Khai báo một mảng rỗng để chứa kết quả của điều kiện tìm kiếm
    var output = [];
    // Do phương thức filter sẽ không lặp qua các mảng rỗng
    // Nên sẽ dùng phương thức for...in (chỉ duyệt qua các phần tử có giá trị)
    // Duyệt qua tất cả các thuộc tính enumerable trong mảng (bao gồm cả chỉ mục)
    for (var index in this) {
        // Đảm bảo chỉ duyệt các phần tử "thuộc mảng này", bỏ qua các thuộc tính kế thừa 
        if (this.hasOwnProperty(index)) {
            // Gọi hàm callback truyền vào, với:
            // this[index]: giá trị phần tử
            // index: chỉ mục
            // this: chính mảng đang xử lý
            var result = callback(this[index], index, this);
            // Nếu callback trả về true -> phần tử thoả mãn điều kiện -> thêm phần tử vào mảng output
            if (result) {
                output.push(this[index]);
            }
        }
    }
    // Trả về mảng mới chứa các phần tử được "lọc"
    return output;
}

var outputFilter = courses.myFilter(function (course, index, array) {
    return course.price > 800;
})

console.log(outputFilter);

// Gắn kết quả vào trang
document.getElementById("resultMyFilter").textContent = JSON.stringify(outputFilter, null, 2);

var isFree = courses.some(function (course, index) {
    return course.price === 0;
})
console.log(isFree); // true

// Viết hàm mySome() có phương thức hoạt động như hàm array.some()
Array.prototype.mySome = function (callback) {
    let check = false;
    for (let index in this) {
        if (this.hasOwnProperty(index)) {
            if (callback(this[index], index, this)) {
                check = true;
                break;
            }
        }
    }
    return check;
}

var isFree = courses.mySome(function (course, index) {
    return course.isFinish;
});
console.log(isFree);

// Viết hàm myReduce() có phương thức hoạt động như hàm array.reduce()
Array.prototype.myReduce = function (callback, initialValue) {
    // Nếu callback đưa vào không phải là hàm, thì đưa ra thông báo
    if (typeof callback !== 'function') {
        throw new TypeError(callback + " is not function.");
    }

    let startIndex = 0;
    let accumulator = initialValue;

    // Nếu không truyền initialValue, dùng phần tử đầu tiên làm accumulator
    if (accumulator === undefined) {
        if (this.length === 0) {
            throw new TypeError("Reduce of empty array with no intial value");
        }
        accumulator = this[0];
        startIndex = 1;
    }
    for (let i = startIndex; i < this.length; i++) {
        // Bỏ qua các phần tử "trống" trong mảng thưa
        if (i in this) {
            accumulator = callback(accumulator, this[i], i, this);
        }
    }
    return accumulator;
}

let totalPrice = courses.myReduce(function (total, course) {
    return total + course.price;
}, 0);
console.log("Sum Price: " + totalPrice);

let i = 0;

// Khởi tạo bảng HTML
let tableHTML = `
      <table class="table table-bordered table-striped text-center">
        <thead class="table-primary">
          <tr>
            <th>Lượt chạy</th>
            <th>Biến tích trữ</th>
            <th>Giá khóa học</th>
            <th>Tích trữ được</th>
          </tr>
        </thead>
        <tbody>
    `;

function totalPriceHandler(accumulator, currentValue, currentIndex, originArray) {
    i++;
    const total = accumulator + currentValue.price;

    // Thêm một dòng vào bảng
    tableHTML += `
        <tr>
          <td>${i}</td>
          <td>${accumulator}</td>
          <td>${currentValue.price}</td>
          <td>${total}</td>
        </tr>
      `;

    return total;
}

const totalCoin = courses.myReduce(totalPriceHandler, 0);

// Kết thúc bảng và chèn vào HTML
tableHTML += `
        </tbody>
      </table>
      <p><strong>Tổng tích trữ:</strong> ${totalCoin}</p>
    `;

document.getElementById("resultMyReduce").innerHTML = tableHTML;

//Viết hàm myFill() có phương thức hoạt động tương tự như array.fill()
Array.prototype.myFill = function (callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
}