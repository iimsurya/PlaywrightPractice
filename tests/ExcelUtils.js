//const ExcelJS = require('exceljs')
import exceljs  from "exceljs";

let rowId;
let colID;

const filePath = '/Users/suryav/VSCode/PlaywrightPractice/resources/download.xlsx';
const workBook = new exceljs.Workbook();
await workBook.xlsx.readFile(filePath);
const workSheet = workBook.getWorksheet('Sheet1');

workSheet.eachRow((row, rowNumber) => {

    row.eachCell((cell, colNumber) => {

        if(cell.value === 'Apple'){
            rowId = rowNumber;
            colID = colNumber;
        }
    })
})
console.log(rowId + " " + colID);
const cell = workSheet.getCell(rowId, colID);
cell.value = 'Guava';
await workBook.xlsx.writeFile(filePath);