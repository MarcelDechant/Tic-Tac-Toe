let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle';

function init() {
    render();
}


function render() {
    const contentDiv = document.getElementById('content');
    // Generate table HTML
    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }

            tableHtml += `<td onclick="handleClick(this, ${index})">${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    // Set table HTML to contentDiv
    contentDiv.innerHTML = tableHtml;
    checkGameOver();
}


function handleClick(cell, index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null;
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';

        checkGameOver();
    }
}

function generateCircleSVG() {
    const blueColor = "#00B0EF";
    const blackColor = "#323232";
    const width = 70;
    const height = 70;
    const blueRadius = width / 2;
    const blackRadius = blueRadius * 0.8; // Anpassen der Größe des schwarzen Kreises

    const svgCode = /*HTML*/ `
        <svg width="${width}" height="${height}">
            <circle cx="${width / 2}" cy="${height / 2}" r="${blueRadius}" fill="${blueColor}">
                <animate attributeName="r" from="0" to="${blueRadius}" dur="0.2s" fill="freeze" />
                <animate attributeName="fill" from="${blueColor}" to="${blackColor}" begin="circle1.end" dur="0.2s" fill="freeze" />
            </circle>
            <circle cx="${width / 2}" cy="${height / 2}" r="${blackRadius}" fill="${blackColor}">
                <animate attributeName="r" from="0" to="${blackRadius}"  dur="0.2s" fill="freeze" />
                <animate attributeName="fill" from="${blueColor}" to="${blackColor}" begin="circle1.end" dur="0.2s" fill="freeze" />
            </circle>
        </svg>
    `;

    return svgCode;
}

function generateCrossSVG() {
    const redColor = "#FFC000";
    const width = 70;
    const height = 70;
    const strokeWidth = 5;
    const animationDuration = 0.2; // in Sekunden

    const svgCode = /*HTML*/ `
        <svg width="${width}" height="${height}">
            <g transform="rotate(45 ${width / 2} ${height / 2})">
                <line x1="${width / 2}" y1="0" x2="${width / 2}" y2="${height}" stroke="${redColor}" stroke-width="${strokeWidth}">
                    <animate attributeName="y1" from="0" to="${height}" dur="${animationDuration}s" repeatCount="1" fill="freeze" />
                    <animate attributeName="y2" from="${height}" to="0" dur="${animationDuration}s" repeatCount="1" fill="freeze" />
                </line>
                <line x1="0" y1="${height / 2}" x2="${width}" y2="${height / 2}" stroke="${redColor}" stroke-width="${strokeWidth}">
                    <animate attributeName="x1" from="0" to="${width}" dur="${animationDuration}s" repeatCount="1" fill="freeze" />
                    <animate attributeName="x2" from="${width}" to="0" dur="${animationDuration}s" repeatCount="1" fill="freeze" />
                </line>
            </g>
        </svg>
    `;
    return svgCode;
}

function checkGameOver() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Kombinationen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Kombinationen
        [0, 4, 8], [2, 4, 6] // Diagonale Kombinationen
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinningLine(a, b, c);
            break;
        }
    }
}
function drawWinningLine(a, b, c) {
    const table = document.getElementsByTagName('table')[0];
    const rows = table.getElementsByTagName('tr');

    const cellA = rows[Math.floor(a / 3)].getElementsByTagName('td')[a % 3];
    const cellB = rows[Math.floor(b / 3)].getElementsByTagName('td')[b % 3];
    const cellC = rows[Math.floor(c / 3)].getElementsByTagName('td')[c % 3];

    const canvas = document.createElement('canvas');// canvas ist eine animations- Element in js ahnlich wie die svg in html 
    const context = canvas.getContext('2d');
    canvas.style.position = 'absolute';
    canvas.width = table.offsetWidth;
    canvas.height = table.offsetHeight;

    context.strokeStyle = '#FFFFFF';
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(cellA.offsetLeft + cellA.offsetWidth / 2, cellA.offsetTop + cellA.offsetHeight / 2);
    context.lineTo(cellC.offsetLeft + cellC.offsetWidth / 2, cellC.offsetTop + cellC.offsetHeight / 2);
    context.stroke();

    table.parentNode.insertBefore(canvas, table.nextSibling);
}

function restartGame(){
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ];
    render();
}
