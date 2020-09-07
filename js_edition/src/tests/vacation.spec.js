import assert from 'assert';
import fs from 'fs';
import { absences } from '../api'
import vacationList from '../lib/vacation-list';

describe('vacation list', () => {
    let lines;
        // Find the number of lines in the vacations txt file
        before(done => {
            fs.readFile('texts/vacations.txt', 'utf8', (err, txtData) => {
                if (err) done(err);
                lines = txtData.split('\n').length - 1;
                done()
            })
        })
    it('vacation list should be same legnth as number of vacations', (done) => {
        vacationList()
        absences().then(absences => {
            let vacations = 0;
            absences.forEach(absence => {
                if (absence.type === 'vacation') vacations++;
            })
            assert(lines === vacations)
            done()
        })
    })
})