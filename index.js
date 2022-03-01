const fs = require('fs');
const path = require('path');
const reader = require('xlsx');
const dir = 'results';


/**
 * for getting out results
 * first need a input file
 * file-type must be .xlsx format
 * Type your file name here
 */
const FILE_NAME = 'test.xlsx';
/**
 * File structure should be
 * first column & first row name: nameList
 */


// first delete existing directory and sub-directory
if (fs.existsSync(dir)) {
    fs.rmdirSync(dir, { recursive: true });
}

// function defination
// making all directory based on .xlsx file
function makingDirectory() {    
    let data = [];
    const file = reader.readFile(FILE_NAME);
    const sheets = file.SheetNames;

    try {
        for (let i = 0; i < sheets.length; i++) {
            const temp = reader.utils.sheet_to_json(
                file.Sheets[file.SheetNames[i]])
            temp.forEach((res) => {
                data.push(res)
            }
            )
        }

        data?.map((o, i) => {
            // if not exists results directory
            // make it first
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            
            fs.mkdir(path.join(__dirname + '/results/', o.nameList),
                { recursive: true }, (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log(o.nameList, ' - Directory created successfully!');
                });
        })
    } catch (error) {
        console.log('CATCH ERROR:', error);
    }
}

// function call
makingDirectory();
