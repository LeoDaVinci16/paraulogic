with open("DISC2-LP.txt", encoding="utf-8") as f:
    diccionari = [linia.strip().lower() for linia in f if linia.strip()]

lletres = list("rosupd")
lletra_central = lletres[0]

def paraules_valides(diccionari, lletres, lletra_central):
    result = []
    for p in diccionari:
        # Ignora paraules amb accents o símbols si vols
        if not p.isalpha():
            continue
        # Requisits:
        # 1) Conté la lletra central almenys una vegada
        if lletra_central not in p:
            continue
        # 2) Totes les lletres de la paraula han d'estar dins del conjunt
        if all(l in lletres for l in p):
            result.append(p)
    return result

valids = paraules_valides(diccionari, lletres, lletra_central)
print("Paraules possibles:", valids, len(valids))

