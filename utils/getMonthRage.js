function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function getMonthRange(dateString) {
    const date = new Date(dateString);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const formattedFirstDay = formatDate(firstDay);
    const formattedLastDay = formatDate(lastDay);

    return {
        firstDay: formattedFirstDay,
        lastDay: formattedLastDay
    };
}
