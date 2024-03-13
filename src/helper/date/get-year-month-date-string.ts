export const getYearMonthDateString = (date: Date): string => {
    return date.toJSON().slice(0, 10);
};
