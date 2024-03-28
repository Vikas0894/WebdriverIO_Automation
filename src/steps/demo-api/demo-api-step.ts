import { Given, Then, When } from '@wdio/cucumber-framework'
import reporter from '../../helper/reporter';
import constant from '../../../data/constant.json'
import postPayload from '../../../data/payload/postPayload.json'
import { apiMethods } from '../../helper/api-helper';
import { config } from '../../../config/enviroments-config';
import fs from 'fs';
import { assert } from 'chai';

Given(/^get list of (.*) from reqres.in$/, async (endPointRef) => {
    try {
        //@ts-ignore
        reporter.addStep(`${this.testid}`, 'info', `Getting the data from ${endPointRef}`);
        if (!endPointRef) throw Error(`Given endPointRef: ${endPointRef} is not valid`);
        let endPoint = '';
        if (endPointRef.trim().toUpperCase() === 'USERS') {
            endPoint = constant.REQRES.GET_USER;
        }
        if (!endPoint) throw Error(`${endPoint} is not valid endpoint.`);
        let res;
        res = await apiMethods.getAllUsers(config.reqresBaseURL, endPoint, "", constant.REQRES.QUERY_PARAM);
        if (res.status !== 200) assert.fail(`Failed getting user from ${config.reqresBaseURL}/${endPoint}`);
        let data = JSON.stringify(res.body);
        let fileName = `${process.cwd()}/data/api-res/resreqAPIUsers.json`;
        fs.writeFileSync(fileName, data);
    } catch (err) {
        throw new Error(`${endPointRef}${err.message}`);
    }
});

Given(/^Create a (.*) in reqres.in$/, async (endPointRef) => {
    try {
        if (!endPointRef) throw Error(`Given endPointRef: ${endPointRef} is not valid`);
        let endPoint = '';
        if (endPointRef.trim().toUpperCase() === 'USERS') {
            endPoint = constant.REQRES.CREATE_USER;
        }
        if (!endPoint) throw Error(`${endPoint} is not valid endpoint.`);
        let res;
        res = await apiMethods.createUser(config.reqresBaseURL, endPoint, "", postPayload.jsonPayload);
        if (res.status !== 201) assert.fail(`Failed to create user from ${config.reqresBaseURL}/${endPoint}`);
        let data = JSON.stringify(res.body);
        let fileName = `${process.cwd()}/data/api-res/resreqAPICreateUsers.json`;
        fs.writeFileSync(fileName, data);
    } catch (err) {
        throw new Error(`${endPointRef}${err.message}`);
    }
});
