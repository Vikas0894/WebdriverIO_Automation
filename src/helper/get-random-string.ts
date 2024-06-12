const CHAR_FOR_RANDOM_STRING: any = {
    DIGITS: '0123456789',
    NON_DIGITS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()',
    LATTERS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    LATTERS_LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
    ALPHANUMERIC: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
};

export function getRandomString(
    charsType: 'digits' | 'non-digits' | 'alphanumeric' | 'letters' | 'letters-lowercase',
    length: number,
): string {
    let result = '';
    let characters: string;

    switch (charsType) {
        case 'digits':
            characters = CHAR_FOR_RANDOM_STRING.DIGITS;
            break;
        case 'non-digits':
            characters = CHAR_FOR_RANDOM_STRING.NON_DIGITS;
            break;
        case 'letters':
            characters = CHAR_FOR_RANDOM_STRING.LETTERS;
            break;
        case 'letters-lowercase':
            characters = CHAR_FOR_RANDOM_STRING.LETTERS_LOWERCASE;
            break;
        case 'alphanumeric':
            characters = CHAR_FOR_RANDOM_STRING.ALPHANUMERIC;
            break;
    }

    let charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
