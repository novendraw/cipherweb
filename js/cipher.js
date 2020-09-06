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