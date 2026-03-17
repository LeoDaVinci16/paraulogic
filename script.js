let dictionary = [];

// Carrega el fitxer DISC2-LP.txt
async function loadDictionary() {
    const response = await fetch("DISC2-LP.txt");
    const text = await response.text();

    dictionary = text
        .split("\n")
        .map(w => w.trim().toLowerCase())
        .filter(w => w.length > 0);
}

// Funció principal (mateixa lògica que Python)
async function solve() {
    if (dictionary.length === 0) {
        await loadDictionary();
    }

    const input = document.getElementById("letters").value.toLowerCase();

    if (input.length < 1) {
        alert("Introdueix les lletres!");
        return;
    }

    const letters = input.split("");
    const central = letters[0];

    let results = [];

    for (let word of dictionary) {

        // Ignora paraules amb símbols
        if (!/^[a-zà-ú]+$/.test(word)) continue;

        // 1) Ha de contenir la lletra central
        if (!word.includes(central)) continue;

        // 2) Només pot contenir lletres del conjunt
        let valid = true;
        for (let char of word) {
            if (!letters.includes(char)) {
                valid = false;
                break;
            }
        }

        if (valid) results.push(word);
    }

    // Mostrar resultats
    document.getElementById("count").innerText = 
        "Total: " + results.length;

    document.getElementById("result").innerText = 
        results.join(", ");
}