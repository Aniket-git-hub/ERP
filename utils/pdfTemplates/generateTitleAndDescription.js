
function generateTitleAndDescription(filters) {
    let title = 'Report';
    let description = 'This report contains data';

    if (filters.ClientId) {
        title += ` for Client ID: ${filters.ClientId}`;
        description += ` for Client ID: ${filters.ClientId}`;
    }

    if (filters.MaterialId) {
        title += `, Material ID: ${filters.MaterialId}`;
        description += `, for Material ID: ${filters.MaterialId}`;
    }

    if (filters.InvoiceId) {
        title += `, Invoice ID: ${filters.InvoiceId}`;
        description += `, for Invoice ID: ${filters.InvoiceId}`;
    }

    if (filters.quantity) {
        title += `, Quantity: ${filters.quantity}`;
        description += `, for Quantity: ${filters.quantity}`;
    }

    if (filters.drawingName) {
        title += `, Drawing Name: ${filters.drawingName}`;
        description += `, for Drawing Name: ${filters.drawingName}`;
    }

    if (filters.date) {
        title += `, Date: ${filters.date}`;
        description += `, for Date: ${filters.date}`;
    }

    if (filters.fromDate) {
        title += ` from ${filters.fromDate}`;
        description += ` from the date ${filters.fromDate}`;
    }

    if (filters.toDate) {
        title += ` to ${filters.toDate}`;
        description += ` between the dates ${filters.fromDate} and ${filters.toDate}`;
    }

    return { title, description };
}

export default generateTitleAndDescription