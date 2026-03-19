// Dictionary
let dictionary = [];

// Load dictionary
async function loadDictionary() {
    const response = await fetch("diccionari_net.txt");
    const text = await response.text();
    dictionary = text
        .split("\n")
        .map(w => w.trim().toLowerCase())
        .filter(w => w.length > 0);
}

// Solver
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
        if (!/^[a-zà-ú]+$/.test(word)) continue;
        if (!word.includes(central)) continue;

        let valid = true;
        for (let char of word) {
            if (!letters.includes(char)) {
                valid = false;
                break;
            }
        }
        if (valid) results.push(word);
    }

    // Show results
    document.getElementById("count").innerText =
        "Has trobat " + results.length + " paraules";

    document.getElementById("result").innerText =
        results.join(", ");
}

// --- ENTER key triggers solve ---
const input = document.getElementById("letters");
input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();  // prevent form submission if inside a form
        solve();
    }
});