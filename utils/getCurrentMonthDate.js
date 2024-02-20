function getCurrentMonthDates() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-indexed (January is 0, February is 1, etc.)

    // Calculate the first day of the current month
    const startDate = new Date(year, month, 1);

    // Calculate the last day of the current month
    const nextMonth = (month + 1) % 12; // Wrap around to January if December
    const endDate = new Date(year, nextMonth, 0);

    return { startDate, endDate };
}
export default getCurrentMonthDates;
