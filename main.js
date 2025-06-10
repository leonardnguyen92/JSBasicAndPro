var watchList = [
  {
    "Title": "Inception",
    "Year": "2010",
    "Rated": "PG-13",
    "Released": "16 Jul 2010",
    "Runtime": "148 min",
    "Genre": "Action, Adventure, Crime",
    "Director": "Christopher Nolan",
    "Writer": "Christopher Nolan",
    "Actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy",
    "Plot": "A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.",
    "Language": "English, Japanese, French",
    "Country": "USA, UK",
    "imdbRating": "8.8",
    "imdbVotes": "1,446,708",
    "imdbID": "tt1375666",
    "Type": "movie",
  },
  {
    "Title": "Interstellar",
    "Year": "2014",
    "Rated": "PG-13",
    "Released": "07 Nov 2014",
    "Runtime": "169 min",
    "Genre": "Adventure, Drama, Sci-Fi",
    "Director": "Christopher Nolan",
    "Writer": "Jonathan Nolan, Christopher Nolan",
    "Actors": "Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow",
    "Plot": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    "Language": "English",
    "Country": "USA, UK",
    "imdbRating": "8.6",
    "imdbVotes": "910,366",
    "imdbID": "tt0816692",
    "Type": "movie",
  },
  {
    "Title": "The Dark Knight",
    "Year": "2008",
    "Rated": "PG-13",
    "Released": "18 Jul 2008",
    "Runtime": "152 min",
    "Genre": "Action, Adventure, Crime",
    "Director": "Christopher Nolan",
    "Writer": "Jonathan Nolan (screenplay), Christopher Nolan (screenplay), Christopher Nolan (story), David S. Goyer (story), Bob Kane (characters)",
    "Actors": "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
    "Plot": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.",
    "Language": "English, Mandarin",
    "Country": "USA, UK",
    "imdbRating": "9.0",
    "imdbVotes": "1,652,832",
    "imdbID": "tt0468569",
    "Type": "movie",
  },
  {
    "Title": "Batman Begins",
    "Year": "2005",
    "Rated": "PG-13",
    "Released": "15 Jun 2005",
    "Runtime": "140 min",
    "Genre": "Action, Adventure",
    "Director": "Christopher Nolan",
    "Writer": "Bob Kane (characters), David S. Goyer (story), Christopher Nolan (screenplay), David S. Goyer (screenplay)",
    "Actors": "Christian Bale, Michael Caine, Liam Neeson, Katie Holmes",
    "Plot": "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from the corruption that Scarecrow and the League of Shadows have cast upon it.",
    "Language": "English, Urdu, Mandarin",
    "Country": "USA, UK",
    "imdbRating": "8.3",
    "imdbVotes": "972,584",
    "imdbID": "tt0372784",
    "Type": "movie",
  },
  {
    "Title": "Avatar",
    "Year": "2009",
    "Rated": "PG-13",
    "Released": "18 Dec 2009",
    "Runtime": "162 min",
    "Genre": "Action, Adventure, Fantasy",
    "Director": "James Cameron",
    "Writer": "James Cameron",
    "Actors": "Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang",
    "Plot": "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    "Language": "English, Spanish",
    "Country": "USA, UK",
    "imdbRating": "7.9",
    "imdbVotes": "876,575",
    "imdbID": "tt0499549",
    "Type": "movie",
  }
];

/**
 * Method search film by Director name
 * @param {*} array array film detail
 * @returns array film detail by Director
 */
function filterFilmByDirector(array) {
  return array.filter(obj => obj.Director ===
    "Christopher Nolan");
}

console.log(filterFilmByDirector(watchList));

/**
 * Method convert string data type to float data type
 * @param {*} array array list film detail
 * @returns array list imdbRating 
 */
function convertStringToFloat(array) {
  return filterFilmByDirector(array).map(obj => parseFloat(obj.imdbRating));
}

console.log(convertStringToFloat(watchList));

/**
 * Method caculate average point idmb rating
 * @param {*} array array list film detail 
 * @returns average point idmb rating
 */
function calculateRatingImdb(array) {
  var arrayFilter = convertStringToFloat(array);
  var arrayLength = arrayFilter.length;
  console.log("Length: " + arrayLength);
  var totalRating = arrayFilter.reduce(function (sum, rating) {
    return sum + rating;
  });
  console.log("SUM: " + totalRating);
  var imdbRating = totalRating / arrayLength;
  return imdbRating;
}

console.log("SUM IMDB RATING: " + calculateRatingImdb(watchList));

function calculateRating(array) {
  var listFilm = array.filter(obj => obj.Director === "Christopher Nolan")
    .map(obj => parseFloat(obj.imdbRating));
  var totalImdb = listFilm.reduce(function (sum, rating) {
    return sum + rating;
  });
  return totalImdb / listFilm.length;
}


// Expected results
console.log(calculateRating(watchList)); // Output: 8.675

function arrToObj(arr) {
  return arr.reduce(function (obj, arr) {
    obj[arr[0]] = arr[1];
    return obj;
  }, {});
}

var arr = [
  ['name', 'Leonard Nguyen'],
  ['age', 18],
];
console.log(arrToObj(arr)); // { name: 'Leonard Nguyen', age: 18 }

var courses = [
  "Javascript",
  "Dart",
  "PHP",
  "Ruby"
];
Array.prototype.map2 = function (callback) {
  var output = [];
  var arrayLength = this.length;
  for (var i = 0; i < arrayLength; i++) {
    var result = callback(this[i], i);
    output.push(result);
  }
  return output;
}

var htmls = courses.map2(function (course) {
  return `<h2>${course}/h2>`;
})
console.log(htmls.join(""));

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
const codeMyReduce = dedent(
  `// Viết hàm myReduce() có phương thức hoạt động như hàm array.reduce()
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
}`);
document.getElementById("myReduceCode").textContent = codeMyReduce;

// Phương thức myFill()
const codeMyFill = dedent(
  `Test phương thức hiển thị`
);
document.getElementById("myFillCode").textContent = codeMyFill;

// Phương thức myEvery()
const codeMyEvery = dedent(
  `Test phương thức hiển thị`
);
document.getElementById("myEveryCode").textContent = codeMyEvery;