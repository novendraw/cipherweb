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