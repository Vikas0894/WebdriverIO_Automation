import chai from 'chai';
import report from '@wdio/allure-reporter';

const chaiExpect = chai.expect;

export const assertEqual = (first: any, second: any, message: string): void => {
    try {
        chaiExpect(first).to.be.equal(second, message);
        report.addStep(`Assertion: ${first}  to equal to  ${second}`);
    } catch (e) {
        throw new Error(`${message}: ${e}`)
    }
};
