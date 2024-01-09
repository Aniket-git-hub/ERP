function generateReportTemplate(
    json,
    title,
    description,
    companyEmail = 'madhuenterprisespuen@gmail.com',
    companyName = 'Madhu Enterprises',
    companyGST = 'randomeGSt',
    companyPhoneOne = '7559410568',
    companyPhoneTwo = '9130827065'
) {
    let data = JSON.parse(json);

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
                        font-size: 14px;
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
                        padding: .3rem .5rem;
                        position: relative;
                    }

                    tr:nth-child(even) {
                        background-color: rgb(244, 244, 244);
                    }

                    th {
                        background-color: #343434;
                        color: white;
                        text-align: left;
                        font-size: 14px;
                        text-transform: capitalize;
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
                        font-size: 1.9rem;
                    }

                    h2 {
                        font-size: 1.3rem;
                    }

                    .description {
                        padding: .8rem;
                    }

                </style>
            </head>

            <body>
                <header>
                    <section>
                        <h1>${companyName}</h1>
                        <p>
                            <b>Phone: <span>${companyPhoneOne}</span>, <span>${companyPhoneTwo}</span></b>
                            <b>GST: <span>${companyGST}</span></b>
                            <b>Email: <span>${companyEmail}</span></b>
                        </p>
                    </section>
                    <h2>${title}</h2>
                    <p class="description">${description}</p>
                </header>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>`;
    for (let key in data[0]) {
        html += `<th>${key}</th>`;
    }
    `</tr>
                    </thead>
                    <tbody>`;

    data.forEach((d) => {
        html += `<tr> <td></td> `;
        for (let key in d) {
            // console.log(key, d[key])
            html += `<td>${d[key]}</td>`;
        }
        html += ` </tr>`;
    });

    html += `
                    </tbody>
                </table>

            </body>

        </html>
    `;

    return html;
}

export default generateReportTemplate;
