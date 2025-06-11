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
Array.prototype.myFill = function (value, start, end) {
    let arrLength = this.length;
    // Xử lý khi không nhập start và end
    if (start === undefined) {
        start = 0;
    }
    if (end === undefined) {
        end = arrLength;
    }
    // Xử lý khi start là số âm
    if (start < 0) {
        start = start + arrLength;
        // Nếu start vẫn âm thì gán start = 0
        if (start < 0) {
            start = 0;
        }
    }
    // Xử lý khi end là số âm
    if (end < 0) {
        end = end + arrLength;
        if (end < 0) {
            end = 0;
        }
    }
    // Nếu start và end vượt quá độ dài của mảng
    start = Math.min(start, arrLength);
    end = Math.min(end, arrLength);
    // Nếu tất cả đều đúng, tiến hành gán value vào các vị trí trong mảng
    // bắt đầu từ vị trí start và kết thúc tại vị trí end
    for (let i = start; i < end; i++) {
        this[i] = value;
    }
    return this;
}

// Hiển thị kết quả của hàm myFill() lên trang web HTML
const queryFillArray = `courses.myFill("test",1,4);`
const resultFill = courses.myFill("test", 1, 4);
const arrayFillHtml = queryFillArray + "\n" + "Kết quả: \n" + JSON.stringify(resultFill, null, 2);  // format đẹp như console
document.getElementById("resultMyFill").textContent = arrayFillHtml;

//Viết hàm myEvery() có phương thức hoạt động tương tự như array.every()
Array.prototype.myEvery = function (callback) {
    let check = true;
    for (index in this) {
        if (this.hasOwnProperty(index)) {
            if (!callback(this[index], index, this)) {
                check = false;
                break;
            }
        }
    }
    return check;
}

// Hiển thị kết quả của hàm myEvery() lên trang web HTML
let checkFinished = courses.myEvery(function (course, index) {
    return course.isFinish;
});
const topicHTML = "Kiểm tra xem tất cả các khoá học đã hoàn thành hay chưa";
const queryEveryArray = `let checkFinished = courses.myEvery(function (course, index) {
    return course.isFinish;
});`;
let checkFinishedHTML = "";
if (checkFinished) {
    checkFinishedHTML = "Đã hoàn thành."
} else {
    checkFinishedHTML = "Chưa hoàn thành."
}
const resultEvery = "Kết quả: " + checkFinishedHTML;
const everyHTML = topicHTML + "\n" + queryEveryArray + "\n" + resultEvery;
document.getElementById("resultMyEvery").textContent = everyHTML;

// Viết hàm myMap() có phương thức hoạt động tương tự array.map()
Array.prototype.myMap = function (callback) {
    // Khai báo mảng mới để lưu kết quả
    let output = [];
    // Duyệt qua các phần tử của mảng
    for (let i = 0; i < this.length; i++) {
        // Đảm bảo bỏ qua các phần tử rỗng
        if (i in this) {
            // Đẩy kết quả sau khi xử lý logic vào mảng mới
            output.push(callback(this[i], i, this));
        }
    }
    // Trả về mảng mới sau khi đã xử lý logic
    return output;
};

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
// Hiển thị kết quả hàm myMap() lên trang web HTML
const codeMapJS = `const listCourse = courses.myMap(function (course, index) {
    let status = course.isFinish ? "Đã hoàn thành" : "Chưa hoàn thành";
    return \`\${index + 1} - \${course.name} - \${course.price} - \${status}\`;
});`;

const listCourse = courses.myMap(function (course, index) {
    let status = course.isFinish ? "Đã hoàn thành" : "Chưa hoàn thành";
    return `${index + 1} - ${course.name} - ${course.price} - ${status}`;
});

const listHTML = codeMapJS + "\n" + "Kết quả: \n" + listCourse.join("\n");
document.getElementById("resultMyMap").textContent = listHTML;