var numbers = document.getElementById('numbers');
numbers.value = '1,3,5,17,28,45,67,89,123,124,125,127,200';

function run() {
    initTree();

    var numbersValue = document.getElementById('numbers').value;
    if (!numbersValue) {
        alert('you need to put some numbers first, son');
        return;
    }

    var search = document.getElementById('search').value;

    if (!search) {
        alert('do you even know what are you searching for?');
        return;
    }

    var numbers = numbersValue.replace(/ /g, '').split(',');

    for (var i = 0; i < numbers.length; i++) {
        if (!parseInt(numbers[i])) {
            alert('trying to fool me? only numbers allowed');
            return;
        }
    }

    binarySearch(numbers, search, 0, 'left');
}

function initTree() {
    var base = document.getElementById('treeBase');
    while (base.firstChild) {
        base.removeChild(base.firstChild);
    }
}


function Node(number, level) {
    this.element = document.createElement('div');
    this.element.className = 'node';
    this.element.id = level.toString() + number.toString();

    var text = document.createTextNode(number);
    this.element.appendChild(text);
    this.element.style.marginLeft = '25px';
}

Node.prototype.getElement = function () {
    if (this.element) {
        return this.element;
    }
    else {
        throw 'Element not found'
    }
};


function binarySearch(numbers, search, level) {
    renderLevel(numbers, level);

    var middle = Math.floor(numbers.length / 2);
    console.log(middle);

    if (parseInt(numbers[middle]) == parseInt(search)) {
        document.getElementById(level + search).style.backgroundColor = 'Green';
    } else if (numbers.length == 1) {
        renderNotFound();
        return;

    } else if (parseInt(numbers[middle]) > parseInt(search)) {
        console.log('need to look lower');
        binarySearch(numbers.slice(0, middle), search, ++level)
    } else if (parseInt(numbers[middle]) < parseInt(search)) {
        console.log('need to look higher');
        binarySearch(numbers.slice(middle), search, ++level);
    }

}

function renderLevel(numbers, levelNumber) {
    var level = document.createElement('div');
    level.className = 'treeLevel';
    level.id = levelNumber.toString();

    if (levelNumber > 0) {
        level.style.maxWidth = document.getElementById((levelNumber - 1)).offsetWidth;
    }

    var base = document.getElementById('treeBase');

    for (var i = 0; i < numbers.length; i++) {
        var node = new Node(numbers[i], levelNumber);
        level.appendChild(node.getElement());
    }

    base.appendChild(level);
}

function renderNotFound(){
    var notFoundDiv = document.createElement('div');
    notFoundDiv.innerHTML = 'Not Found';
    notFoundDiv.style.color = 'red';
    notFoundDiv.style.fontSize = '28px';
    notFoundDiv.align = 'center';

    document.getElementById('treeBase').appendChild(notFoundDiv);
}