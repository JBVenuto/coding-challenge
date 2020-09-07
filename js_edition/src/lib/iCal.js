import fs from 'fs';
import path from 'path';
const ics = require('ics');
import { absences } from '../api';
import absenceName from './absence-name';

const iCal = () => {
    let events = [];
    absences().then(absences => {
        absences.forEach(absence => {
            absenceName(absence).then(name => {
                events.push({
                    start: absence.startDate.split('-'),
                    end: absence.endDate.split('-'),
                    title: absence.type,
                    description: absence.memberNote,
                    created: absence.createdAt.split(/[-:T.+]/, 6),
                    organizer: {name: name}
                })
            }).then(() => {
                if (events.length === absences.length){
                    initCal()
                }
            })
        })
    })

    const initCal = () => {
        const { error, value } = ics.createEvents(events)

        if (error) {
        console.log(error)
        return
        }

        const txtPath = path.join(__dirname, '../../texts/absences.ics');
        fs.writeFileSync(txtPath, value)
    }
}

iCal();
export default iCal;