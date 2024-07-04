import { Given, When, Then } from '@cucumber/cucumber';
import { configs } from '../../../config/enviroments-config';
import constant from '../../../data/constant.json'
import { assertEqual } from '../../helper/assert/assert-equal';
import report from '@wdio/allure-reporter';
import { apiMethods } from '../../helper/api/api-helper';
import { expect } from "chai";
import axios from 'axios';

let response: any;

When('I send a POST request with the following data', async (dataTable) => {
    try {
        const endPoint = constant.REQRES.CREATE_USER;
        const data = await dataTable.rowsHash();
        response = await apiMethods.createUser(configs.reqresBaseURL, endPoint, "", data);
    } catch (err) {
        const error = err as Error;
        throw new Error(`${error.message}`);
    }
});

Then('I should receive a {int} status code', async (statusCode: number) => {
    try {
        await assertEqual(response.status, statusCode, 'Status is code not matched');
        report.addStep(`Status code of post method is: ${response.status}`);
    } catch (error) {
        console.error('Error making API request:', error);
        throw error;
    }
});

Given('I send a DELETE request to delete user', async () => {
    try {
        const endPoint = constant.REQRES.CREATE_USER + '/2';
        report.addStep(`Validate end point: ${endPoint}`);
        if (!endPoint) throw Error(`${endPoint} is not valid endpoint.`);
        response = await apiMethods.deleteUsers(configs.reqresBaseURL, endPoint, "");
    } catch (err) {
        const error = err as Error;
        throw new Error(`${error.message}`);
    }
});

Then('the user should be deleted successfully', async () => {
    try {
        await assertEqual(response.status, 204, 'Status is code not matched');
        report.addStep(`Status code of post method is: ${response.status}`);
    } catch (error) {
        console.error('Error making API request:', error);
        throw error;
    }
});
