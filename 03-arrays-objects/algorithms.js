function dedent(str) {
    const lines = str.split('\n');
    const minIndent = lines
        .filter(line => line.trim()) // bỏ dòng trắng
        .reduce((min, line) => {
            const match = line.match(/^(\s*)/);
            return Math.min(min, match ? match[1].length : 0);
        }, Infinity);
    return lines.map(line => line.slice(minIndent)).join('\n').trim();
}


//Bài toán mảng lưu trữ các khoá học
var courses = [
    { name: "JavaScript", price: 600, description: "Khoá học JavaScript", isFinish: false },
    { name: "HTML, CSS", price: 0, description: "Khoá học HTML CSS", isFinish: false },
    { name: "Ruby", price: 450, description: "Khoá học Ruby", isFinish: true },
    { name: "Dart", price: 850, description: "Khoá học Dart", isFinish: true },
    { name: "Java", price: 900, description: "Khoá học Java", isFinish: false }
];
let tableCoursesHTML = `
  <table class="table table-bordered table-striped text-center">
    <thead class="table-primary">
      <tr>
        <th>STT</th>
        <th>Khoá học</th>
        <th>Giá</th>
        <th>Mô tả</th>
        <th>Tình trạng</th>
      </tr>
    </thead>
    <tbody>
    `;
courses.forEach(function (course, index) {
    let status = course.isFinish ? "Đã hoàn thành" : "Chưa hoàn thành";
    let coursePrice = course.price === 0 ? "Free" : course.price;
    tableCoursesHTML += `
  <tr>
    <td>${index + 1}</td>
    <td>${course.name}</td>
    <td>${coursePrice}</td>
    <td>${course.description}</td>
    <td>${status}</td>
  </tr>
  `
});
tableCoursesHTML += `</tbody></table>`
document.getElementById("courseTable").innerHTML = tableCoursesHTML;

const arrayCourses = dedent(`var courses = [
  { name: "JavaScript", price: 600, description: "Khoá học JavaScript", isFinish: false },
  { name: "HTML, CSS", price: 0, description: "Khoá học HTML CSS", isFinish: false },
  { name: "Ruby", price: 450, description: "Khoá học Ruby", isFinish: true },
  { name: "Dart", price: 850, description: "Khoá học Dart", isFinish: true },
  { name: "Java", price: 900, description: "Khoá học Java", isFinish: false }
];`);
document.getElementById("arrayCourses").textContent = arrayCourses;

// Phương thức myForEach()
const codeMyForEach = `Array.prototype.myForEach = function (callback) {
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
  const line = \`- Khóa \${parseInt(index) + 1}:
  - Tên: \${course.name}
  - Giá: \${course.price} VND
  - Mô tả: \${course.description}
  - Tổng số khóa: \${array.length}
  \`;
  outputText += line + "\\n";
  console.log(line);
});
`;
document.getElementById("myForEachCode").textContent = codeMyForEach;

// Phương thức myFilter()
const codeMyFilter = dedent(`Array.prototype.myFilter = function (callback) {
  var output = [];
  for (var index in this) {
    if (this.hasOwnProperty(index)) {
      var result = callback(this[index], index, this);
      if (result) {
        output.push(this[index]);
      }
    }
  } 
  return output;
};

var courses = [
  { name: "JavaScript", price: 600, description: "Khoá học JavaScript" },
  { name: "HTML, CSS", price: 0, description: "Khoá học HTML CSS" },
  { name: "Ruby", price: 450, description: "Khoá học Ruby" },
  { name: "Dart", price: 850, description: "Khoá học Dart" },
  { name: "Java", price: 900, description: "Khoá học Java" }
];

var outputFilter = courses.myFilter(function(course) {
  return course.price > 800;
});

console.log(outputFilter);`);
document.getElementById("myFilterCode").textContent = codeMyFilter;

//Phương thức mySome()
const codeMySome = dedent(
    `Array.prototype.mySome = function (callback) {
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
};`);
document.getElementById("mySomeCode").textContent = codeMySome;

// Phương thức myReduce()
const codeMyReduce = dedent(`Array.prototype.myReduce = function (callback, initialValue) {
    // Viết hàm myReduce() có phương thức hoạt động như hàm array.reduce()
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
}`);
document.getElementById("myReduceCode").textContent = codeMyReduce;

// Phương thức myFill()
const codeMyFill = dedent(`Array.prototype.myFill = function (value, start, end) {
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
}`
);
document.getElementById("myFillCode").textContent = codeMyFill;

// Phương thức myEvery()
const codeMyEvery = dedent(
    `Array.prototype.myEvery = function (callback) {
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
}`);
document.getElementById("myEveryCode").textContent = codeMyEvery;

// Phương thức myMap()
const codeMyMap = dedent(`Array.prototype.myMap = function (callback) {
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
};`);
document.getElementById("myMapCode").textContent = codeMyMap;