export const getDateComparedToToday = (difference: number): Date => {
    const date = new Date();

    date.setDate(date.getDate() + difference);

    return date;
};
