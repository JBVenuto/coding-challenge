import fs from 'fs';
import path from 'path';
import { absences } from '../api';
import absenceName from './absence-name';

// Create a list of vacations
const vacationList = () => {
    const txtPath = path.join(__dirname, '../../texts/vacations.txt');

    // Create vacation list file or clear it if already exist
    fs.writeFile(txtPath, '', (err) => {
        if (err) throw err;
    })

    // Add each absence with name to the text file
    absences()
        .then(absences => absences.forEach(absence => {
            if (absence.type === 'vacation'){
                absenceName(absence).then(name => {
                    absence.name = name;
                    const vacationStr = `${absence.name} is on vacation from ${absence.startDate} to ${absence.endDate}`
                    fs.appendFile(txtPath, vacationStr + '\r\n', err => {
                        if (err) throw err;
                    })
                })
            }
        }))
}

vacationList();
console.log("The list of vacations can be found in the 'texts' directory.");
export default vacationList;