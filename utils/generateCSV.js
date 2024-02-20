async function generateCSV(json) {
    let jsObject = await JSON.parse(json);
    jsObject.map((data) => {
        if (data.Client) {
            data.Client = data.Client.name;
        }
        if (data.Material) {
            data.Material = data.Material.name;
        }
    });
    let csv_data = jsObject.map((data) => Object.values(data).join(','));
    csv_data.unshift(Object.keys(jsObject[0]).join(','));
    let csv_string = csv_data.join('\n');
    return csv_string;
}

export default generateCSV;
