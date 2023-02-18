/* Correlation calculator in Javascript
n00 = Na
n01 = Nb
n10 = Nc
n11 = Nd
phi = ((Nd*Na) - (Nc*Nb)) / (sqrt((Nc + Nd) * (Na + Nb) * (Nb + Nd) * (Na + Nc)));
*/

function phi(table) {
    return (table[3] * table[0] - table[2] * table[1]) / Math.sqrt((table[2] + table[3]) * (table[0] + table[1]) * (table[1] + table[3]) * (table[0] + table[2]));
}

console.log(phi([76, 9, 4, 1]));
