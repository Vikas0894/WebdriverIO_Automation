import { Given, Then, When } from '@wdio/cucumber-framework'
import constant from '../../../data/constant.json'
import postPayload from '../../../data/payload/postPayload.json'
import { configs } from '../../../config/enviroments-config';
import fs from 'fs';
import { assert } from 'chai';
import report from '@wdio/allure-reporter'
import { apiMethods } from '../../helper/api/api-helper';
import { assertEqual } from '../../helper/assert/assert-equal';
import axios from 'axios';

let res: any;

When(/^get list of (.*) from reqres.in$/, async (endPointRef) => {
    try {
        //@ts-ignore
        reporter.addStep(`${this.testid}`, 'info', `Getting the data from ${endPointRef}`);
        if (!endPointRef) throw Error(`Given endPointRef: ${endPointRef} is not valid`);
        let endPoint = '';
        if (endPointRef.trim().toUpperCase() === 'USERS') {
            endPoint = constant.REQRES.GET_USER;
        }
        report.addStep(`Validate end point: ${endPoint}`);
        if (!endPoint) throw Error(`${endPoint} is not valid endpoint.`);
        res = await apiMethods.getAllUsers(configs.reqresBaseURL, endPoint, "", constant.REQRES.QUERY_PARAM);
        let data = JSON.stringify(res.body);
        report.addStep(`Fetch the response: ${data}`);
        let fileName = `${process.cwd()}/data/api-res/resreqAPIUsers.json`;
        fs.writeFileSync(fileName, data);
    } catch (err) {
        const error = err as Error;
        throw new Error(`${endPointRef}${error.message}`);
    }
});

Given(/^Create a (.*) in reqres.in$/, async (endPointRef) => {
    try {
        if (!endPointRef) throw Error(`Given endPointRef: ${endPointRef} is not valid`);
        let endPoint = '';
        if (endPointRef.trim().toUpperCase() === 'USERS') {
            endPoint = constant.REQRES.CREATE_USER;
        }
        report.addStep(`Validate end point: ${endPoint}`);
        if (!endPoint) throw Error(`${endPoint} is not valid endpoint.`);
        let res;
        res = await apiMethods.createUser(configs.reqresBaseURL, endPoint, "", postPayload.jsonPayload);
        report.addStep(`Validate status code:  ${res.status}`);
        if (res.status !== 201) assert.fail(`Failed to create user from ${configs.reqresBaseURL}/${endPoint}`);
        let data = JSON.stringify(res.body);
        report.addStep(`Fetch the response: ${data}`);
        let fileName = `${process.cwd()}/data/api-res/resreqAPICreateUsers.json`;
        fs.writeFileSync(fileName, data);
    } catch (err) {
        const error = err as Error;
        throw new Error(`${endPointRef}${error.message}`);
    }
});

Then('I should receive {int} status code', async (statusCode: number) => {
    report.addStep(`Validate status code:  ${res.status}`);
    await assertEqual(res.status, statusCode, 'Status is code not matched');
});

When('get list of users from invalid endpoint', async function () {
    const response = await axios.get('https://reqres.in/api/invalid-endpoint');
    this.response = response;
  });
