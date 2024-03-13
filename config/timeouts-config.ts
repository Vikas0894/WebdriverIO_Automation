const MULTIPLIER = 1.5;

export const timeouts = {
    smallest: 750,
    small: MULTIPLIER * 2.5 * 1000,
    medium: MULTIPLIER * 5 * 1000,
    large: MULTIPLIER * 10 * 1000,
    largest: MULTIPLIER * 20 * 1000,
    huge: MULTIPLIER * 100 * 1000,
};
