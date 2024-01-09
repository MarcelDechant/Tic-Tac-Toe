let fields = [
    null,
    null,
    'circle',
    null,
    'cross',
    null,
    null,
    null,
    null,
];
function init() {
    render();
}


function render() {
    let tableHtml = '<table>';
    let index = 0;

    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';

        for (let j = 0; j < 3; j++) {
            tableHtml += '<td>';

            if (fields[index] === 'circle') {
                tableHtml += generateCircleSVG();
            } else if (fields[index] === 'cross') {
                tableHtml += generateCrossSVG();
            }

            tableHtml += '</td>';
            index++;
        }

        tableHtml += '</tr>';
    }

    tableHtml += '</table>';

    document.getElementById('content').innerHTML = tableHtml;
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
                <animate attributeName="r" from="0" to="${blueRadius}" dur="3s" fill="freeze" />
                <animate attributeName="fill" from="${blueColor}" to="${blackColor}" begin="circle1.end" dur="3s" fill="freeze" />
            </circle>
            <circle cx="${width / 2}" cy="${height / 2}" r="${blackRadius}" fill="${blackColor}">
                <animate attributeName="r" from="0" to="${blackRadius}"  dur="3s" fill="freeze" />
                <animate attributeName="fill" from="${blueColor}" to="${blackColor}" begin="circle1.end" dur="3s" fill="freeze" />
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
    const animationDuration = 3; // in Sekunden

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

  