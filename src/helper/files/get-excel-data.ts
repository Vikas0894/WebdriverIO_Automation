import { readExcelFile } from "./read-excel-file";

async function loadExcelCredentials() {
    const rowInput = await readExcelFile('./data/testData.xlsx', 'TestData');
    return {
        username: rowInput[0].USERNAME,
        password: rowInput[0].PASSWORD,
    };
}

export let validExcelCredential: any;

loadExcelCredentials().then(credentials => {
    validExcelCredential = credentials;
}).catch(error => {
    console.error('Error loading Excel credentials:', error);
});

































// var xlsx = require('xlsx');

// var workbook = xlsx.readFile('./data/testData.xlsx');

// let worksheet = workbook.Sheets[workbook.SheetNames[0]];

// const username = worksheet[1].v;
// const password = worksheet[2].v;

// console.log(username+password);

