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
    <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Report </title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: Arial, sans-serif;
                    counter-reset: page;
                    font-size: smaller;
                    color: #333;
                    line-height: 1.6;
                }

                h1,
                h2 {
                    color: #444;
                }

                h2 {
                    text-align: center;
                    margin-bottom: .3rem;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 2rem;
                    counter-reset: rowNumber;
                }

                th,
                td {
                    border: 1px solid #d7d7d7;
                    padding: 8px;
                    position: relative;
                }

                tr:nth-child(even) {
                    background-color: rgb(244, 244, 244);
                }

                th {
                    background-color: #343434;
                    color: white;
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
                    display: block;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 0;
                    width: 100%;
                    position: absolute;
                    text-align: center;

                }

                header {
                    width: 100%;
                }

                header section {
                    width: 100%;
                    text-align: center;
                    border-bottom: 1px solid #343434;
                    margin-bottom: .5rem;
                }

                h1 {
                    font-size: 1.5rem;
                }

                #pageNumber::after {
                    counter-increment: page;
                    content: "Page " counter(page);
                }
            </style>
        </head>

        <body>
            <header>
                <section>
                    <h1>Madhu Enterprises</h1>
                    <p>
                        <b>Phone: <span>9130827065</span>, <span>9130827065</span></b>
                    </p>
                    <p>
                        <b>GST: <span>32AAHCR7467A1ZI</span></b>
                    </p>
                    <p>
                        <b>email: <span>madhuenterprisespune@gmail.com</span></b>
                    </p>
                </section>
                <h2>Report on SS Enterprises</h2>
            </header>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Drawing</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Size</th>
                        <th>Client</th>
                        <th>Material</th>
                    </tr>
                </thead>
                <tbody>
    `;

    data.items.forEach((item, index) => {
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