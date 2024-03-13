
export const readExcelFile = (path: string, sheetName: string): Promise<Array<any>> => {
    ;
    var xlsx = require("xlsx");
    var workbook = xlsx.readFile(path);
    var workSheet = workbook.Sheets[sheetName];
    var data = xlsx.utils.sheet_to_json(workSheet);
    return data;
}















// var xlsx = require("xlsx");

// var workbook = xlsx.readFile("./data/testData.xlsx",{cellDates:true});

// //var workSheet = workbook.SheetNames;//get sheet name
// var workSheet = workbook.Sheets["TestData"];

// var data = xlsx.utils.sheet_to_json(workSheet);//convert Excel to json

// console.log(data);
