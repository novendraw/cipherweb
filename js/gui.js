function showPlainText(textContent) {
    document.getElementById('plaintextarea').value = textContent;
}

function showCipherText(text) {
    let textContent;
    if (document.getElementById('displayselect').value === 'limahuruf') {
        textContent = fiveLetter(text);
    } else {
        textContent = noSpace(text);
    }
    document.getElementById('ciphertextarea').value = textContent;
}

function applyCipher(text) {
    let key = document.getElementById('kunci').value;
    let numberkey = document.getElementById('numberkeyinput').value;
    let resultText;

    if (document.getElementById('cipherselect').value === "vigenere") {
        resultText = encryptVigenereCipher(text, key);
    }
    if (document.getElementById('cipherselect').value === "super") {
        let transpose = document.getElementById('kuncitransposisi').value;
        if (sanitizeText(text).length % transpose === 0) {
            resultText = encryptSuperEncryption(text, key, transpose);
        } else {
            alert("Banyak huruf pada teks harus merupakan kelipatan dari kunci transposisi");
            return '';
        }
    }
    if (document.getElementById('cipherselect').value === "fullvigenere") {
        resultText = encryptFullVigenereCipher(text, key, randomizeTable());
    }
    if (document.getElementById('cipherselect').value === "autovigenere") {
        resultText = encryptAutokeyVigenereCipher(text, key);
    }
    if (document.getElementById('cipherselect').value === "extendedvigenere") {
        resultText = encryptExtendedVigenereCipher(text, key);
    }

    if (document.getElementById('cipherselect').value === "affine") {
        let affine = document.getElementById('affineselect').value;
        resultText = encryptAffineCipher(text, numberkey, affine);
    }

    if (document.getElementById('cipherselect').value === "playfair") {
        resultText = encryptPlayfairCipher(text, key);
    }

    if (document.getElementById('cipherselect').value === "hill") {
        resultText = encryptHillCipher(text, key);
    }

    return resultText;
}

function applyDecipher(text) {
    let key = document.getElementById('kunci').value;
    let numberkey = document.getElementById('numberkeyinput').value;
    let resultText;

    if (document.getElementById('cipherselect').value === "vigenere") {
        resultText = decryptVigenereCipher(text, key);
    }

    if (document.getElementById('cipherselect').value === "super") {
        let transpose = document.getElementById('kuncitransposisi').value;
        if (text.length % transpose === 0) {
            resultText = decryptSuperEncryption(text, key, transpose);
        } else {
            alert("Banyak huruf pada teks harus merupakan kelipatan dari kunci transposisi");
        }
    }

    if (document.getElementById('cipherselect').value === "fullvigenere") {
        let table = document.getElementById('generatedtable').value;
        table = stringToIntList(table);
        let parsedTable = [];
        let k = 0;
        for (let i = 0; i < 26; i++) {
            let temp = [];
            for (let j = 0; j < 26; j++) {
                temp.push(table[k]);
                k++;
            }
            parsedTable.push(temp);
        }
        resultText = decryptFullVigenereCipher(text, key, parsedTable);
    }
    if (document.getElementById('cipherselect').value === "autovigenere") {
        resultText = decryptAutokeyVigenereCipher(text, key);
    }
    if (document.getElementById('cipherselect').value === "extendedvigenere") {
        resultText = decryptExtendedVigenereCipher(text, key);
    }

    if (document.getElementById('cipherselect').value === "affine") {
        let affine = document.getElementById('affineselect').value;
        resultText = decryptAffineCipher(text, numberkey, affine);
    }

    if (document.getElementById('cipherselect').value === "playfair") {
        resultText = decryptPlayfairCipher(text, key);
    }

    if (document.getElementById('cipherselect').value === "hill") {
        resultText = decryptHillCipher(text, key);
    }

    return resultText;
}

function showButton() {
    if (document.getElementById('cryptselect').value === 'enkripsi') {
        document.getElementById('encryptbutton').className = "btn btn-primary mx-1";
        document.getElementById('decryptbutton').className = "btn btn-primary mx-1 d-none";
        document.getElementById('savecipherbutton').className = "btn btn-success mx-1";
        document.getElementById('saveplainbutton').className = "btn btn-success mx-1 d-none";
    } else {
        document.getElementById('decryptbutton').className = "btn btn-primary mx-1";
        document.getElementById('encryptbutton').className = "btn btn-primary mx-1 d-none";
        document.getElementById('saveplainbutton').className = "btn btn-success mx-1";
        document.getElementById('savecipherbutton').className = "btn btn-success mx-1 d-none"
    }
}

function encrypt() {
    if (document.getElementById('typeselect').value === "text") {
        getTextUpload().then(text => {
            showCipherText(applyCipher(text));
            document.getElementById('savecipherbutton').disabled = false;
        }).catch(error => console.log(error));
    }

    if (document.getElementById('typeselect').value === "biner") {
        getBinerUpload().then(binary => {
            let key = document.getElementById('kunci').value;
            let result = encryptExtendedVigenereCipher(new Uint8Array(binary), key);
            let blob = new Blob([result], {type: "application/octet-stream"});
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "encrypted_file";
            link.click();
        })
    }

    if (document.getElementById('typeselect').value === "input") {
        let text = document.getElementById('plaintextarea').value;
        showCipherText(applyCipher(text));
        document.getElementById('savecipherbutton').disabled = false;
    }
}

function decrypt() {
    if (document.getElementById('typeselect').value === "text") {
        getTextUpload().then(text => {
            showPlainText(applyDecipher(text));
            document.getElementById('saveplainbutton').disabled = false;
        }).catch(error => console.log(error));
    }

    if (document.getElementById('typeselect').value === "biner") {
        getBinerUpload().then(binary => {
            let key = document.getElementById('kunci').value;
            let result = decryptExtendedVigenereCipher(new Uint8Array(binary), key);
            let blob = new Blob([result], {type: "application/octet-stream"});
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "decrypted_file";
            link.click();
        })
    }

    if (document.getElementById('typeselect').value === "input") {
        let text = document.getElementById('ciphertextarea').value;
        showPlainText(applyDecipher(text));
        document.getElementById('saveplainbutton').disabled = false;
    }
}

function handleUploadText() {
    getTextUpload().then(text => {
        if (document.getElementById('cryptselect').value === 'enkripsi') {
            showPlainText(text);
        } else {
            if (document.getElementById('cryptselect').value === 'dekripsi') {
                showCipherText(sanitizeText(text));
            }
        }
    }).catch(error => console.log(error));
}

function saveText(filename, encrypt) {
    let text;
    if (encrypt) {
        text = document.getElementById('ciphertextarea').value;
    } else {
        text = document.getElementById('plaintextarea').value;
    }
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function saveFile() {
    if (document.getElementById('typeselect').value === 'biner') {
        if (document.getElementById('cryptselect').value === 'enkripsi') {
            document.getElementById('encryptbutton').click();
        } else {
            document.getElementById('decryptbutton').click();
        }
    } else {
        if (document.getElementById('cryptselect').value === 'enkripsi') {
            saveText("encrypted_file", true);
            if (document.getElementById('cipherselect').value === 'fullvigenere') {
                let text = document.getElementById('generatedtable').value;
                let element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain,' + encodeURIComponent(text));
                element.setAttribute('download', "generated_table");
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            }
        } else {
            saveText("decrypted_file", false);
        }
    }
}

function changeType() {
    document.getElementById('plaintextarea').value = '';
    document.getElementById('ciphertextarea').value = '';
    document.getElementById('ciphertextarea').value = '';
    document.getElementById('saveplainbutton').disabled = true;
    document.getElementById('savecipherbutton').disabled = true;
    if (document.getElementById('typeselect').value === 'text') {
        document.getElementById('textfileselector').value = "";
        let label = document.querySelectorAll('label.font-weight-bold');
        label.forEach((item) => {
            item.className = "w-100 text-center font-weight-bold";
        })

        document.getElementById('plaintextarea').className = "form-control";
        document.getElementById('ciphertextarea').className = "form-control";
        document.getElementById('textfileselector').className = "form-control-file";
        document.getElementById('binerfileselector').className = "form-control-file d-none";
        document.getElementById('textfileselectorlabel').className = "";
        document.getElementById('binerfileselectorlabel').className = "d-none";
        document.getElementById('plaintextarea').disabled = true;
        document.getElementById('ciphertextarea').disabled = true;
    }

    if (document.getElementById('typeselect').value === 'biner') {
        document.getElementById('binerfileselector').value = "";
        let label = document.querySelectorAll('label.font-weight-bold');
        label.forEach((item) => {
            item.className = "w-100 text-center font-weight-bold d-none";
        })

        document.getElementById('plaintextarea').className = "form-control d-none";
        document.getElementById('ciphertextarea').className = "form-control d-none";
        document.getElementById('textfileselector').className = "form-control-file d-none";
        document.getElementById('binerfileselector').className = "form-control-file";
        document.getElementById('textfileselectorlabel').className = "d-none";
        document.getElementById('binerfileselectorlabel').className = "";
    }

    if (document.getElementById('typeselect').value === 'input') {
        let label = document.querySelectorAll('label.font-weight-bold');
        label.forEach((item) => {
            item.className = "w-100 text-center font-weight-bold";
        })

        document.getElementById('plaintextarea').className = "form-control";
        document.getElementById('ciphertextarea').className = "form-control";
        document.getElementById('textfileselector').className = "form-control-file d-none";
        document.getElementById('binerfileselector').className = "form-control-file d-none";
        document.getElementById('textfileselectorlabel').className = "d-none";
        document.getElementById('binerfileselectorlabel').className = "d-none";
        if (document.getElementById('cryptselect').value === 'enkripsi') {
            document.getElementById('plaintextarea').disabled = false;
            document.getElementById('ciphertextarea').disabled = true;
        } else {
            document.getElementById('plaintextarea').disabled = true;
            document.getElementById('ciphertextarea').disabled = false;
        }
    }
}

function changeCrypt() {
    showButton();
    if (document.getElementById('cipherselect').value === 'fullvigenere' &&
        document.getElementById('cryptselect').value === 'dekripsi') {
        document.getElementById('tablefileselector').className = "form-control-file";
        document.getElementById('tablefileselectorlabel').className = "";
    } else {
        document.getElementById('tablefileselector').className = "form-control-file d-none";
        document.getElementById('tablefileselectorlabel').className = "d-none";
    }

    document.getElementById('plaintextarea').value = "";
    document.getElementById('ciphertextarea').value = "";

    if (document.getElementById('typeselect').value === 'text') {
        if (document.getElementById('textfileselector').files[0] != null) {
            handleUploadText();
        }
        document.getElementById('plaintextarea').disabled = true;
        document.getElementById('ciphertextarea').disabled = true;
    }

    if (document.getElementById('typeselect').value === 'input') {
        let plainteks = document.getElementById('plaintextarea').value;
        document.getElementById('plaintextarea').value =
            document.getElementById('ciphertextarea').value;
        document.getElementById('ciphertextarea').value = plainteks;
        if (document.getElementById('cryptselect').value === "enkripsi") {
            document.getElementById('plaintextarea').disabled = false;
            document.getElementById('ciphertextarea').disabled = true;
        } else {
            document.getElementById('plaintextarea').disabled = true;
            document.getElementById('ciphertextarea').disabled = false;
        }
    }

}

function changeDisplay() {
    if (document.getElementById('ciphertextarea').value != null &&
        document.getElementById('ciphertextarea').value !== "") {
        if (document.getElementById('displayselect').value === "tanpaspasi") {
            showCipherText(document.getElementById('ciphertextarea').value);
        } else {
            showCipherText(document.getElementById('ciphertextarea').value);
        }
    }

}

function changeCipher() {
    if (document.getElementById('cipherselect').value === 'fullvigenere' &&
        document.getElementById('cryptselect').value === 'dekripsi') {
        document.getElementById('tablefileselector').className = "form-control-file";
        document.getElementById('tablefileselectorlabel').className = "";
    } else {
        document.getElementById('tablefileselector').className = "form-control-file d-none";
        document.getElementById('tablefileselectorlabel').className = "d-none";
    }

    if (document.getElementById('cipherselect').value === 'super') {
        document.getElementById('supertranposisi').className = "input-group mb-3";
    } else {
        document.getElementById('supertranposisi').className = "input-group mb-3 d-none";
    }

    if (document.getElementById('cipherselect').value === 'affine') {
        document.getElementById('affinekey').className = "row mx-3";
        document.getElementById('numberkey').className = "input-group mb-3";
        document.getElementById('textkey').className = "input-group mb-3 d-none";
    } else {
        document.getElementById('affinekey').className = "row mx-3 d-none";
        document.getElementById('numberkey').className = "input-group mb-3 d-none";
        document.getElementById('textkey').className = "input-group mb-3";

    }
}