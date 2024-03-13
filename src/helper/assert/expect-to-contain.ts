import chai from "chai";

const chaiExpect = chai.expect;

export const expectToContain = (targetText: string, comparedText: string, message: string): void => {
    try {
        //eslint-disable-next-line no-used-expressions
        chaiExpect(targetText).to.be.contain(comparedText, message);
    } catch (e) {
        throw new Error(`${message}: ${e}`);
    }
};
