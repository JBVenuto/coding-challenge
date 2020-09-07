import fs from 'fs';
import path from 'path';
import { absences } from '../api';
import absenceName from './absence-name';

// Create a list of sick leaves
const sickList = () => {
    const txtPath = path.join(__dirname, '../../texts/sick.txt');

    // Create sick list file or clear it if already exist
    fs.writeFile(txtPath, '', (err) => {
        if (err) throw err;
    })

    // Add each sickness to the text file
    absences()
        .then(absences => absences.forEach(absence => {
            if (absence.type === 'sickness'){
                absenceName(absence).then(name => {
                    absence.name = name;
                    const sickStr = `${absence.name} is sick from ${absence.startDate} to ${absence.endDate}`
                    fs.appendFile(txtPath, sickStr + '\r\n', err => {
                        if (err) throw err;
                    })
                })
            }
        }))
}

sickList();
console.log("The list of employees out sick can be found in the 'texts' directory.");
export default sickList;