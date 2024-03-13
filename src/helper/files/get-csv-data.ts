import { readCsvFile } from "./read-csv-file";

const rowInput = readCsvFile('./data/testdata.csv');
export let validCredential: any = {
    username: rowInput[0].username,
    password: rowInput[0].password,
};























// import fs from 'fs'
// import getStream from "get-stream";
// import path from "path"
//import { readCsvFile } from "./files/read-csv-file";
// import { isConstructorDeclaration } from "typescript";

// export default async function csvfunc(filename) {

//     // const parseStream = await parse({ delimiter: ",", relaxColumnCount: true });
//     const parseStream = await parse({  delimiter:",", escape: "\\" });


//     console.log("parseStream");

//     const csvData = await getStream.array(
//         fs
//             .createReadStream(
//                 //'./testdata.csv.xlsx'
//                 path.resolve(`./data/${filename}`)
//             )
//             .pipe(parseStream)
//     );
//     console.log("csvData", csvData);

//     await csvData.shift();

//     console.log("csvData", csvData);

//     return csvData;
// }