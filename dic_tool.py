import xml.etree.ElementTree as ET

tree = ET.parse("apertium-cat.cat.dix")
root = tree.getroot()

words = set()

# Iterate over all elements named 'e'
for e in root.iter():
    if e.tag.endswith("e"):
        # find lemma inside this entry
        lemma_parts = []

        for l in e.iter():
            if l.tag.endswith("l"):
                lemma_parts = list(l.itertext())
                break

        if not lemma_parts:
            continue

        lemma = "".join(lemma_parts).strip().lower()

        if not lemma:
            continue

        # clean
        if " " in lemma or "-" in lemma:
            continue
        if len(lemma) < 3:
            continue

        words.add(lemma)

# Save
words = sorted(words)

with open("diccionari_net.txt", "w", encoding="utf-8") as f:
    for w in words:
        f.write(w + "\n")

print(f"Generated {len(words)} words in diccionari_net.txt")