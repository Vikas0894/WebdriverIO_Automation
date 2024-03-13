import chai from "chai";

const chaiExpect = chai.expect;

export const assertFalse = (condition: boolean, message: string): void => {
    try {
        //eslint-disable-next-line no-used-expressions
        chaiExpect(condition).to.be.false;
    } catch (e) {
        throw new Error(`${message}: ${e}`);
    }
};
