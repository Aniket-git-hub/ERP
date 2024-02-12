import formatDate from "../formatDate.js";

function generateInvoiceTemplate(
    client,
    invoiceDate,
    invoiceNumber,
    vehicleNumber,
    totalQuantity,
    totalAmountAfterTax,
    totalAmountBeforeTax,
    sGstPercentage,
    cGstPercentage,
    iGstPercentage,
    cGstAmount,
    sGstAmount,
    iGstAmount,
    totalTaxAmount,
    amountInWords,
    notes,
    jobs
) {
    let html = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        * {
            padding: 0;
            margin: 0;
            font-family: 'Arial', sans-serif;
            font-size: 12px;
        }

        p {
            line-height: 1.2rem;
        }

        .header {
            margin-top: 1rem;
        }

        .upper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }

        .upper .logo {
            width: 70%;
        }

        .upper h1 {
            width: 30%;
            font-size: 4rem;
            margin: 0 2rem;
            color: #444;
        }

        .lower {
            display: flex;
            border-top: 1px solid black;
            padding-top: .8rem;
        }

        .lower .left p {
            padding: .3rem 0;
        }

        .lower .left {
            width: 50%;
            padding: 0 .5rem;
        }

        .lower .right {
            padding: 0 .5rem;
            width: 50%;
        }

        .lower .right table {
            width: 100%;
        }

        .lower .right table tr {
            text-align: left;
        }

        .lower .right td,
        th {
            padding: .08rem 0;
        }

        .main {
            margin-top: 1rem;
        }

        b {
            text-transform: uppercase;
        }

        .main>table {
            width: 100%;
            border-collapse: collapse;
            border-radius: 1rem;
            border: 1px solid black;
            background-color: #fff;
            counter-reset: rowCounter;
        }
        .main>table td:first-child::after {
            counter-increment: rowCounter;
            content: counter(rowCounter);
        }
        .main>table tr {
            text-align: center;
            background-color: rgb(255, 255, 255);
            page-break-inside: avoid;
        }

        .main>table td:first-child {
            width: 30px;
        }

        .main>table tr:nth-child(odd) {
            background-color: #f0f0f0;
        }

        .main>table th {
            background-color: #555;
            color: white;
            padding: .5rem 0;
        }

        .main>table td {
            padding: .5rem;
            border-left: 1px solid rgb(37, 37, 37);
        }

        .footer {
            display: flex;
            margin-top: 1rem;
        }

        .footer .right {
            width: 60%;
            display: flex;
            justify-content: space-between;
            margin: 0 1rem;
            padding: .5rem;
        }

        .footer .left {
            width: 40%;
            padding: .5rem;
        }

        .footer .right .sign>div {
            margin: .5rem 0;
            width: 150px;
            height: 50px;
        }

        .footer .right .sign {
            border-bottom: 1px solid black;
        }

        .thankyou {
            margin-top: 2rem;
            width: 100%;
            display: flex;
            justify-content: center;
        }

        .note {
            padding-top: 1rem;
            padding-left: .5rem;
        }

        .myinfo {
            padding-left: .5rem;
            width: 100%;
            padding-bottom: .5rem;
        }

        .address {
            width: 50%;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <section class="upper">
                <div class="logo">
                    <img src="https://source.unsplash.com/random/150x150?logo" />
                </div>
                <h1>Invoice</h1>
            </section>
            <div class="myinfo">
                <p class="address">Dharmvir singh, plot no: 165/3, J - Block, near Indrayani corner, Bhosari MIDC,
                    Bhosari, Pune-26,
                    Maharashtra</p>
                <p>
                    <b>Phone: </b>
                    <span>9130827065</span>
                </p>

                <b>GST NO: </b>
                <span>32AAHCR7467A1ZI</span>
                <span>contact@letsbug.in</span>
                <b>E-MAIL:</b>
                <span>contact@letsbug.in</span>
            </div>
            <section class="lower">
                <section class="left">
                    <b>Billed To:</b>
                    <p>${client.name ? client.name : '-'}, ${client.address ? client.address : '-'}</p>
                    <b>Customer GST No:</b>
                    <p>${client.gst ? client.gst : '-'}</p>
                    <b>State:</b>
                    <p>27 - Maharashtra</p>
                </section>
                <section class="right">
                    <table>
                        <tr>
                            <th>Invoice No:</th>
                            <td>${invoiceNumber ? invoiceNumber : '-'}</td>
                            <th>Dated:</th>
                            <td>${invoiceDate ? formatDate(invoiceDate) : '-'
        }</td >
                        </tr >
                        <tr>
                            <th>Our Ch. No:</th>
                            <td>12</td>
                            <th>Dated:</th>
                            <td>20-May-2023</td>
                        </tr>
                        <tr>
                            <th>Your Ch. No:</th>
                            <td>12</td>
                            <th>Dated:</th>
                            <td>20-May-2023</td>
                        </tr>
                        <tr>
                            <th>P. O. No:</th>
                            <td>121</td>
                            <th>Dated:</th>
                            <td>20-May-2023</td>
                        </tr>
                        <tr>
                            <th colspan="2">Dispatched through:</th>
                            <td colspan="2">${vehicleNumber ? vehicleNumber : '-'}</td>
                        </tr>
                    </table >
                </section >
            </section >
        </div >
        <div class="main">
            <table>
                <tr>
                    <th>Sr.No:</th>
                    <th>Item</th>
                    <th>HSN</th>
                    <th>Rate</th>
                    <th>Qty</th>
                    <th>Amount</th>
                </tr> `;
    for (let i = 0; i < jobs.length; i++) {
        html += `<tr>
                       <td></td>
                       <td>${jobs[i].drawingNumber}</td>
                       <td> -</td>
                       <td>${jobs[i].rate}</td>
                       <td> ${jobs[i].quantity}</td>
                       <td> ${jobs[i].rate * jobs[i].quantity}</td>
                   </tr> `;
    }
    html += `<tr>
                    <th colspan="4">Total</th>
                    <td colspan="">${totalQuantity ? totalQuantity : '-'}</td>
                    <td>${totalAmountBeforeTax ? totalAmountAfterTax : '-'}</td>
                </tr>
                <tr>
                    <th colspan="4">CGST </th>
                    <th colspan="1">${cGstPercentage ? cGstPercentage : '-'} %</th>
                    <td>${cGstAmount ? cGstAmount : '-'}</td>
                </tr>
                <tr>
                    <th colspan="4">SGST </th>
                    <th colspan="1">${sGstPercentage ? sGstPercentage : '-'} %</th>
                    <td>${sGstAmount ? sGstAmount : '-'}</td>
                </tr>
                <tr>
                    <th colspan="4">IGST </th>
                    <th colspan="1">${iGstPercentage ? iGstPercentage : '-'} %</th>
                    <td> ${iGstAmount ? iGstAmount : '-'} </td>
                </tr>
                <tr>
                    <th colspan="5">Total Tax Amount</th>
                    <td> ${totalTaxAmount ? totalTaxAmount : '-'} </td>
                </tr>
                <tr>
                    <th colspan="5">Total Chargeable Amount</th>
                    <td>${totalAmountAfterTax ? totalAmountAfterTax : '-'}</td>
                </tr>
                <tr>
                    <th>Rupees:</th>
                    <td colspan="5"> ${amountInWords ? amountInWords : '-'} </td>
                </tr>
            </table>
            <p class="note">
                <b>Note: </b>
                <span>${notes ? notes : '-'}</span>
            </p>
        </div>
        <div class="footer">
            <div class="left">
                <b>Payment Information</b>
                <p>IDBI Bank</p>
                <p>Acc. Name: Madhu Enterprises</p>
                <p>Acc. No: 1678102000026674</p>
            </div>
            <div class="right">
                <div class="sign">
                    <b>Receiver Sign</b>
                    <div></div>
                </div>
                <div class="sign">
                    <b>For Madhu Enterprises</b>
                    <div></div>
                </div>
            </div>
        </div>
        <div class="thankyou">
            <p>Thank you </p>
        </div>
    </div >
</body >

</html >
    `;

    return html;
}

export default generateInvoiceTemplate;
