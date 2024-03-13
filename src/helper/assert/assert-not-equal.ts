import chai from 'chai';

const chaiExpect = chai.expect;

export const assertNotEqual = (first: any, second: any, message: string): void => {
    try {
        chaiExpect(first).not.to.be.equal(second, message);
    } catch (e) {
        throw new Error(`${message}: ${e}`)
    }
};