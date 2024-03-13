export const getYearComparedToToday = (difference: number): Date => {
    const date = new Date();

    date.setFullYear(date.getFullYear() + difference);

    return date;
};
