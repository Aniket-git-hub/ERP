function generateReportTemplate(data, query) {
    let title = 'Report';
    if (query.clientId) {
        title += ` for Client ID: ${query.clientId}`;
    }
    if (query.date) {
        title += ` on Date: ${query.date}`;
    }
    // Add more conditions as needed

    let html = `
    <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    counter-reset: rowNumber 0;
                }
                h1 {
                    text-align: center;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                }
                th {
                    background-color: #f2f2f2;
                    text-align: left;
                }
                thead {
                    display: table-header-group;
                }
                tr {
                    page-break-inside: avoid;
                }
                tr td:first-child::before {
                    counter-increment: rowNumber;
                    content: counter(rowNumber);
                }
                .pageBreak {
                    page-break-after: always;
                }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Drawing Number</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Size</th>
                        <th>Client Name</th>
                        <th>Material Name</th>
                    </tr>
                </thead>
                <tbody>`;

    data.items.forEach((item, index) => {
        if (index > 0 && index % 50 === 0) {
            // Insert a page break after every 50 rows
            html += `<tr class="pageBreak"></tr>`;
        }
        html += `
                    <tr>
                        <td></td>
                        <td>${item.drawingNumber}</td>
                        <td>${item.description}</td>
                        <td>${new Date(item.date).toLocaleDateString()}</td>
                        <td>${item.quantity}</td>
                        <td>${item.rate}</td>
                        <td>${item.size}</td>
                        <td>${item.Client.name}</td>
                        <td>${item.Material.name}</td>
                    </tr>`;
    });

    html += `
                </tbody>
            </table>
        </body>
    </html>`;

    return html;
}



export default generateReportTemplate;