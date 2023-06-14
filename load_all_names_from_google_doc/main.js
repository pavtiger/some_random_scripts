const http = require("http");
const urlapi = require("url");
const fs = require("fs");
const path = require("path");

const nStatic = require("node-static");
const { GoogleSpreadsheet } = require('google-spreadsheet');

const indexPath = path.join(__dirname, "index.html");
let libsFileServer = new nStatic.Server(path.join(__dirname, "/lib"));


let api_info = JSON.parse(fs.readFileSync('pavtiger.json'));
client_email = api_info["client_email"]
private_key = api_info["private_key"]


let table = [], width = [], color = [];  // Parsed table, and width of a cell in table


async function parseTable() {
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet('1WNI4amVqK9AJzuNAQHHMdZpE6pMAxNAR7tab7cTMvb4');

    await doc.useServiceAccountAuth({
        client_email: client_email,
        private_key: private_key,
    });

    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByTitle["контакты учеников"];

    await sheet.loadCells('A1:S68');

    ans = []

    for (let i = 0; i < 172; ++i) {  // table row
        let name = await sheet.getCell(1 + i, 2)._rawData.formattedValue;
        let surname = await sheet.getCell(1 + i, 3)._rawData.formattedValue;
        let father = await sheet.getCell(1 + i, 4)._rawData.formattedValue;

        ans.push([name, surname, father]);
    }
}

parseTable()
