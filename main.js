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

Array.prototype.myForEach = function (cb) {
  var output = [];
  for (var index in this) {
    if (this.hasOwnProperty(index)) {
      cb(this[index], index, this);
    }
  }
};

Array.prototype.myReduce = function (cb) {
  var output = [];
  var arrayLength = this.length;
}

Array.prototype.myFind = function (cb) {
  var output = [];
  var arrayLength = this.length;
}

Array.prototype.myFilter = function (cb) {
  var output = [];
  var arrayLength = this.length;
}