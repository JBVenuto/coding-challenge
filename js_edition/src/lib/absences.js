import fs from 'fs';
import { members, absences } from '../api';

// Find member name for absence
const absenceName = (absence, method) => {
    members()
        .then(members => members.find(member => member.userId === absence.userId))
        .then(member => method(absence, member))
}

// Create file that lists every absence including name
const initAbsences = () => {
    // Create absences.txt or clear it if already exsists
    fs.writeFile('../../texts/absences.txt', '', (err) => {
        if (err) throw err
    })

    // Go through absences
    absences().then(absences => absences.forEach(absence => absenceName(absence, writeAbsences)))
}

// Write absences with names to absences.txt
const writeAbsences = (absence, member) => {
    absence.name = member.name;
    const line = JSON.stringify(absence);
    fs.appendFile('../../texts/absences.txt', k + '\r\n', err => {
        if (err) throw err;
    })
}

// Create iCal file

// Create file that lists vacations

// Create file that lists sicknesses