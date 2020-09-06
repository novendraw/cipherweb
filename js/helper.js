function fiveLetter(text) {
    return text.match(/.{1,5}/g).join(' ');
}

function noSpace(text) {
    return text.split(" ").join("");
}

function sanitizeText(textContent) {
    return textContent.replace(/[^a-z]/gi, '').toUpperCase();
}

function getTextUpload() {
    document.getElementById('savecipherbutton').disabled = true;
    document.getElementById('saveplainbutton').disabled = true;
    let textFile = document.getElementById('textfileselector').files[0];
    const reader = new FileReader();
    return new Promise(((resolve, reject) => {
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsText(textFile);
    }))
}

function getBinerUpload() {
    document.getElementById('savecipherbutton').disabled = true;
    document.getElementById('saveplainbutton').disabled = true;
    return document.getElementById('binerfileselector').files[0].arrayBuffer();
}

function stringToIntList(string) {
    let s = [];
    for (let i = 0; i < string.length; i++) {
        s[i] = string.charCodeAt(i) - 65;
    }
    return s;
}

function intsToCharList(integers) {
    let ints = [];
    for (let i = 0; i < integers.length; i++) {
        ints[i] = String.fromCharCode(integers[i] + 65);
    }
    return ints;
}

function extendedStringToIntList(string) {
    let s = [];
    for (let i = 0; i < string.length; i++) {
        s[i] = string.charCodeAt(i);
    }
    return s;
}

function extendedIntsToCharList(integers) {
    let ints = [];
    for (let i = 0; i < integers.length; i++) {
        ints[i] = String.fromCharCode(integers[i]);
    }
    return ints;
}

function randomArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function randomizeTable() {
    let array;
    let table = [];

    for (let i = 0; i < 26; i++) {
        array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
        randomArray(array);
        table.push(array);
    }
    let charTable;
    let stringTable = "";
    for (let i = 0; i < 26; i++) {
        charTable = intsToCharList(table[i]);
        for (let j = 0; j < charTable.length; j++) {
            stringTable += charTable[j];
        }
    }

    document.getElementById('generatedtable').value = stringTable;
    return table;
}

function getTableUpload() {
    let tableFile = document.getElementById('tablefileselector').files[0];
    const reader = new FileReader();
    return new Promise(((resolve, reject) => {
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsText(tableFile);
    }))
}

function loadTable() {
    getTableUpload().then(table => {
        document.getElementById('generatedtable').value = table;
    })
}