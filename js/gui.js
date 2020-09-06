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
    let resultText;

    if (document.getElementById('cipherselect').value === "vigenere") {
        resultText = encryptVigenereCipher(text, key);
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

    }

    if (document.getElementById('typeselect').value === "input") {
        let text = document.getElementById('plaintextarea').value;
        showCipherText(applyCipher(text));
        document.getElementById('savecipherbutton').disabled = false;
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
        document.getElementById('textfileselector').className = "";
        document.getElementById('binerfileselector').className = "d-none";
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
        document.getElementById('textfileselector').className = "d-none";
        document.getElementById('binerfileselector').className = "";
    }

    if (document.getElementById('typeselect').value === 'input') {
        let label = document.querySelectorAll('label.font-weight-bold');
        label.forEach((item) => {
            item.className = "w-100 text-center font-weight-bold";
        })

        document.getElementById('plaintextarea').className = "form-control";
        document.getElementById('ciphertextarea').className = "form-control";
        document.getElementById('textfileselector').className = "d-none";
        document.getElementById('binerfileselector').className = "d-none";
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