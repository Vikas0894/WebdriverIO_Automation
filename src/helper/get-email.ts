import { getRandomString } from "./get-random-string";

export const getEmail = (randomSymbolsNumber: number): string => {
    return `${getRandomString('alphanumeric', randomSymbolsNumber)}@gmail.com`;
};
