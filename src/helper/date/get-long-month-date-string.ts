export const getLongMonthDateString = (date: Date): string => {
    const day = date.getDate();
    const month = date.toLocaleString('en', { month: 'long' });
    return `${month} ${day}`;
};
