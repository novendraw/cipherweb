function encryptVigenereCipher(text, key) {
    text = sanitizeText(text);
    key = sanitizeText(key);
    let textList = stringToIntList(text);
    let keyList = stringToIntList(key);
    let resultList = [];
    let resultText = "";

    for (let i = 0; i < textList.length; i++) {
        resultList[i] = (textList[i] + keyList[i % keyList.length]) % 26;

    }
    resultList = intsToCharList(resultList);

    for (let i = 0; i < resultList.length; i++) {
        resultText += resultList[i];

    }

    return resultText;
}

function decryptVigenereCipher(text, key) {
    text = sanitizeText(text);
    key = sanitizeText(key);
    let textList = stringToIntList(text);
    let keyList = stringToIntList(key);
    let resultList = [];
    let resultText = "";

    for (let i = 0; i < textList.length; i++) {
        resultList[i] = (textList[i] - keyList[i % keyList.length]) % 26;
        while (resultList[i] < 0) {
            resultList[i] += 26;
        }
    }

    resultList = intsToCharList(resultList);

    for (let i = 0; i < resultList.length; i++) {
        resultText += resultList[i];

    }

    return resultText;
}

function encryptSuperEncryption(text, key, transpose) {
    text = sanitizeText(text);
    key = sanitizeText(key);
    let textList = stringToIntList(text);
    let keyList = stringToIntList(key);
    let resultList = [];
    let resultText = "";
    let secondResultList = [];

    for (let i = 0; i < transpose; i++) {
        secondResultList.push([]);
    }

    for (let i = 0; i < textList.length; i++) {
        resultList[i] = (textList[i] + keyList[i % keyList.length]) % 26;

    }
    resultList = intsToCharList(resultList);

    for (let i = 0; i < resultList.length; i++) {
        secondResultList[i % transpose].push(resultList[i]);
    }

    for (let i = 0; i < transpose; i++) {
        for (let j = 0; j < secondResultList[i].length; j++) {
            resultText += secondResultList[i][j];
        }
    }

    return resultText;
}

function decryptSuperEncryption(text, key, transpose) {
    text = sanitizeText(text);
    key = sanitizeText(key);
    let textList = stringToIntList(text);
    let keyList = stringToIntList(key);
    let resultList = [];
    let resultText = "";
    let firstList = [];
    let secondList = [];

    for (let i = 0; i < Math.ceil(textList.length / transpose); i++) {
        firstList.push([]);
    }

    for (let i = 0; i < textList.length; i++) {
        firstList[i % firstList.length].push(textList[i]);
    }

    for (let i = 0; i < firstList.length; i++) {
        for (let j = 0; j < firstList[i].length; j++) {
            secondList.push(firstList[i][j]);
        }
    }

    for (let i = 0; i < secondList.length; i++) {
        resultList[i] = (secondList[i] - keyList[i % keyList.length]) % 26;
        while (resultList[i] < 0) {
            resultList[i] += 26;
        }
    }

    resultList = intsToCharList(resultList);

    for (let i = 0; i < resultList.length; i++) {
        resultText += resultList[i];

    }

    return resultText;
}

function encryptAutokeyVigenereCipher(text, key) {
    text = sanitizeText(text);
    key = sanitizeText(key);
    let textList = stringToIntList(text);
    let keyList = stringToIntList(key);
    let resultList = [];
    let resultText = "";

    for (let i = 0; i < textList.length; i++) {
        if (i < keyList.length) {
            resultList[i] = (textList[i] + keyList[i]) % 26;
        } else {
            resultList[i] = (textList[i] + resultList[i - keyList.length]) % 26;
        }
    }
    resultList = intsToCharList(resultList);

    for (let i = 0; i < resultList.length; i++) {
        resultText += resultList[i];

    }

    return resultText;
}

function decryptAutokeyVigenereCipher(text, key) {
    text = sanitizeText(text);
    key = sanitizeText(key);
    let textList = stringToIntList(text);
    let keyList = stringToIntList(key);
    let resultList = [];
    let resultText = "";

    for (let i = 0; i < textList.length; i++) {
        if (i < keyList.length) {
            resultList[i] = (textList[i] - keyList[i]) % 26;
        } else {
            resultList[i] = (textList[i] - resultList[i - keyList.length]) % 26;
        }
        while (resultList[i] < 0) {
            resultList[i] += 26;
        }
    }

    resultList = intsToCharList(resultList);

    for (let i = 0; i < resultList.length; i++) {
        resultText += resultList[i];

    }

    return resultText;
}

function encryptExtendedVigenereCipher(bytes, key) {
    let resultList = bytes;
    let keyList = extendedStringToIntList(key);

    console.log(resultList);
    for (let i = 0; i < resultList.length; i++) {
        resultList[i] = (resultList[i] + keyList[i % keyList.length]) % 256;
    }
    console.log(resultList);

    return resultList;
}

function decryptExtendedVigenereCipher(bytes, key) {
    let resultList = bytes;
    let keyList = extendedStringToIntList(key);

    console.log(resultList);
    for (let i = 0; i < resultList.length; i++) {
        resultList[i] = (resultList[i] - keyList[i % keyList.length]) % 256;
        while (resultList[i] < 0) {
            resultList[i] += 256;
        }
    }
    console.log(resultList);

    return resultList;
}

function encryptFullVigenereCipher(text, key, table) {
    text = sanitizeText(text);
    key = sanitizeText(key);
    let textList = stringToIntList(text);
    let keyList = stringToIntList(key);
    let resultList = [];
    let resultText = "";

    for (let i = 0; i < textList.length; i++) {
        resultList[i] = table[keyList[i % keyList.length]][textList[i]];
    }

    resultList = intsToCharList(resultList);

    for (let i = 0; i < resultList.length; i++) {
        resultText += resultList[i];

    }

    return resultText;
}

function decryptFullVigenereCipher(text, key, table) {
    text = sanitizeText(text);
    key = sanitizeText(key);
    let textList = stringToIntList(text);
    let keyList = stringToIntList(key);
    let resultList = [];
    let resultText = "";

    for (let i = 0; i < textList.length; i++) {
        for (let j = 0; j < 26; j++) {
            if (table[keyList[i % keyList.length]][j] === textList[i]) {
                resultList[i] = j;
            }
        }
    }

    resultList = intsToCharList(resultList);

    for (let i = 0; i < resultList.length; i++) {
        resultText += resultList[i];

    }

    return resultText;
}

function encryptAffineCipher(text, key, affine) {
    text = sanitizeText(text);
    key = parseInt(key);
    let textList = stringToIntList(text);
    let resultList = [];
    let resultText = "";

    for (let i = 0; i < textList.length; i++) {
        resultList[i] = ((affine * textList[i]) + key) % 26;
        while (resultList[i] < 0) {
            resultList[i] += 26;
        }
    }
    resultList = intsToCharList(resultList);

    for (let i = 0; i < resultList.length; i++) {
        resultText += resultList[i];

    }

    return resultText;
}

function decryptAffineCipher(text, key, affine) {
    text = sanitizeText(text);
    key = parseInt(key);
    let textList = stringToIntList(text);
    let keyList = stringToIntList(key);
    let resultList = [];
    let resultText = "";
    let j = 0;

    while ((j * affine) % 26 !== 1) {
        j++;
    }

    for (let i = 0; i < textList.length; i++) {
        resultList[i] = (j * (textList[i] - key)) % 26;
        while (resultList[i] < 0) {
            resultList[i] += 26;
        }
    }

    resultList = intsToCharList(resultList);

    for (let i = 0; i < resultList.length; i++) {
        resultText += resultList[i];

    }

    return resultText;
}

function encryptPlayfairCipher(text, key) {
    text = sanitizeText(text);
    text.replace('J', 'I');
    let formattedText = "";
    for (let i = 0; i < text.length; i += 2) {
        formattedText += text[i];
        if (text[i + 1] != null) {
            if (text[i] === text[i + 1]) {
                formattedText += 'X';
            }
        }
        formattedText += text[i + 1];
    }

    if (formattedText.length % 2 !== 0) {
        formattedText += 'X';
    }

    key = sanitizeText(key);
    let textList = stringToIntList(formattedText);
    let keyList = createMatrix(key);
    let resultList = [];
    let resultText = "";

    for (let i = 0; i < textList.length; i += 2) {
        let firstPosition = findPosition(String.fromCharCode(textList[i] + 65), keyList);
        let secondPosition = findPosition(String.fromCharCode(textList[i + 1] + 65), keyList);

        if (firstPosition[0] === secondPosition[0]) {
            resultList[i] = keyList[firstPosition[0]][(firstPosition[1] + 1) % 5];
            resultList[i + 1] = keyList[secondPosition[0]][(secondPosition[1] + 1) % 5];
        }

        if (firstPosition[1] === secondPosition[1]) {
            resultList[i] = keyList[(firstPosition[0] + 1) % 5][firstPosition[1]];
            resultList[i + 1] = keyList[(secondPosition[0] + 1) % 5][secondPosition[1]];
        }

        if ((firstPosition[0] !== secondPosition[0]) && (firstPosition[1] !== secondPosition[1])) {
            resultList[i] = keyList[firstPosition[0]][secondPosition[1]];
            resultList[i + 1] = keyList[secondPosition[0]][firstPosition[1]];
        }
    }

    for (let i = 0; i < resultList.length; i++) {
        resultText += resultList[i];

    }

    return resultText;
}

function decryptPlayfairCipher(text, key) {
    text = sanitizeText(text);
    text.replace('J', 'I');
    let formattedText = "";
    for (let i = 0; i < text.length; i += 2) {
        formattedText += text[i];
        if (text[i + 1] != null) {
            if (text[i] === text[i + 1]) {
                formattedText += 'X';
            }
        }
        formattedText += text[i + 1];
    }

    if (formattedText.length % 2 !== 0) {
        formattedText += 'X';
    }

    key = sanitizeText(key);
    let textList = stringToIntList(formattedText);
    let keyList = createMatrix(key);
    let resultList = [];
    let resultText = "";

    for (let i = 0; i < textList.length; i += 2) {
        let firstPosition = findPosition(String.fromCharCode(textList[i] + 65), keyList);
        let secondPosition = findPosition(String.fromCharCode(textList[i + 1] + 65), keyList);

        if (firstPosition[0] === secondPosition[0]) {
            resultList[i] = keyList[firstPosition[0]][(firstPosition[1] + 4) % 5];
            resultList[i + 1] = keyList[secondPosition[0]][(secondPosition[1] + 4) % 5];
        }

        if (firstPosition[1] === secondPosition[1]) {
            resultList[i] = keyList[(firstPosition[0] + 4) % 5][firstPosition[1]];
            resultList[i + 1] = keyList[(secondPosition[0] + 4) % 5][secondPosition[1]];
        }

        if ((firstPosition[0] !== secondPosition[0]) && (firstPosition[1] !== secondPosition[1])) {
            resultList[i] = keyList[firstPosition[0]][secondPosition[1]];
            resultList[i + 1] = keyList[secondPosition[0]][firstPosition[1]];
        }
    }

    for (let i = 0; i < resultList.length; i++) {
        resultText += resultList[i];

    }

    return resultText;
}