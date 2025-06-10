var courses = [
    {
        name: "JavaScript",
        price: 600
    },
    {
        name: "HTML, CSS",
        price: 0
    },
    {
        name: "Ruby",
        price: 450
    },
    {
        name: "Dart",
        price: 850
    },
    {
        name: "Java",
        price: 900
    }
];

Array.prototype.myFilter = function (callback) {
    var output = [];
    for (var index in this) {
        if (this.hasOwnProperty(index)) {
            var result = callback(this[index], index, this);

        }
    }
    return output;
}