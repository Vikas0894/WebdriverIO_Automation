import { readExcelFile } from "./read-excel-file";

const rowInput = readExcelFile('./data/testData.xlsx','TestData');
export let validExcelCredential: any = {
    username: rowInput[0].USERNAME,
    password: rowInput[0].PASSWORD,
};
































// var xlsx = require('xlsx');

// var workbook = xlsx.readFile('./data/testData.xlsx');

// let worksheet = workbook.Sheets[workbook.SheetNames[0]];

// const username = worksheet[1].v;
// const password = worksheet[2].v;

// console.log(username+password);

