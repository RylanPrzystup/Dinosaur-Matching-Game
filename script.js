let dinos = 
[
    ["images/bary.png", "images/troodon.png", "images/para.png"],
    ["images/such.png", "images/theri.png", "images/titan.png"],
    ["images/troodon.png", "images/bary.png", "images/para.png"],
    ["images/such.png", "images/theri.png", "images/titan.png"]
]

let ph=
[
    ["?","?","?"],
    ["?","?","?"],
    ["?","?","?"],
    ["?","?","?"]
]

let rows = 4
let cols = 3
let pick1 = null
let pick2 = null

function display() {
    let displayHTML = document.getElementById('grid');
    let html = `<table border='1'>`;
    for (let i = 0; i < rows; i++) {
        html += `<tr>`;
        for (let j = 0; j < cols; j++) {
            html += `<td id="box${i}_${j}">
                <button onclick="handleOption(${i},${j})">
                ${ph[i][j]}
                </button>
                </td>`;
        }
        html += `</tr>`;
    }
    html += `</table>`;
    displayHTML.innerHTML = html;
}

display();

function handleOption(i, j) {
    if (ph[i][j].includes('img')) return;
    if (!pick1) {
        pick1 = [i, j];
        ph[i][j] = `<img src='${dinos[i][j]}' width='50'>`;
        display();
    } else if (!pick2 && (i !== pick1[0] || j !== pick1[1])) {
        pick2 = [i, j];
        ph[i][j] = `<img src='${dinos[i][j]}' width='50'>`;
        display();
    }

    setTimeout(testIfMatch, 1500);
}

let matchCount=0
let attempts=0
function testIfMatch(){
    let isMatch=document.getElementById('isItMatch')

    if (pick1 && pick2) {
        if (dinos[pick1[0]][pick1[1]] === dinos[pick2[0]][pick2[1]]) {
                attempts++


            matchTrue=`Most Recent Choice WAS a match!!`
            isMatch.innerHTML=matchTrue
            console.log("It's a match!");
            
            ph[pick1[0]][pick1[1]] = `<img src='${dinos[pick1[0]][pick1[1]]}' width='50'>`;
            ph[pick2[0]][pick2[1]] = `<img src='${dinos[pick2[0]][pick2[1]]}' width='50'>`;


            let displayCount = document.getElementById('displayCount');
            matchCount++
            countHTML=`Match Count : ${matchCount} | Attempts: ${attempts}`

            displayCount.innerHTML=countHTML
            

            
        } else {

        matchfalse=`Most Recent Choice WAS NOT a match!!`
        isMatch.innerHTML=matchfalse            
            
            console.log("Not a Match")
            
            ph[pick1[0]][pick1[1]] = "?";
            ph[pick2[0]][pick2[1]] = "?";

            attempts++
            let displayCount = document.getElementById('displayCount');
            countHTML=`Match Count : ${matchCount} | Attempts: ${attempts}`
             displayCount.innerHTML=countHTML
        }

        pick1 = null;
        pick2 = null;
        display();
    }
}

function resetGame() {

    ph = [
        ["?","?","?"],
        ["?","?","?"],
        ["?","?","?"],
        ["?","?","?"]
    ];
    pick1 = null;
    pick2 = null;
    matchCount = 0;
    attempts=0;
    document.getElementById('isItMatch').innerHTML = '';
    document.getElementById('displayCount').innerHTML = 'Match Count : 0';
    dinos = [
        ["images/bary.png", "images/troodon.png", "images/para.png"],
        ["images/such.png", "images/theri.png", "images/titan.png"],
        ["images/troodon.png", "images/bary.png", "images/para.png"],
        ["images/such.png", "images/theri.png", "images/titan.png"]
    ];

    let flat = dinos.flat();
    for (let i = flat.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [flat[i], flat[j]] = [flat[j], flat[i]];
    }
    dinos = [];
    for (let i = 0; i < 4; i++) {
        dinos.push(flat.slice(i * 3, i * 3 + 3));
    }
    display();
}


