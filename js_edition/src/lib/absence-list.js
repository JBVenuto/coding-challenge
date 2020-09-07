import fs from 'fs';
import path from 'path';
import { absences } from '../api';
import absenceName from './absence-name';

// Create a list of absences with names
const absenceList = () => {
    const txtPath = path.join(__dirname, '../../texts/absences.txt');

    // Create absence list file or clear it if already exist
    fs.writeFile(txtPath, '', (err) => {
        if (err) throw err;;
    })

    // Add each absence with name to the text file
    absences()
        .then(absences => absences.forEach(absence => {
            absenceName(absence).then(name => {
                absence.name = name;
                const absenceStr = JSON.stringify(absence);
                fs.appendFile(txtPath, absenceStr + '\r\n', err => {
                    if (err) throw err;
                })
            })
        }))
}

absenceList();
console.log("The list of absences can be found in the 'texts' directory.");
export default absenceList;