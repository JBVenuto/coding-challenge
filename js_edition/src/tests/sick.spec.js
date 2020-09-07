import assert from 'assert';
import fs from 'fs';
import { absences } from '../api'
import sickList from '../lib/sick-list';

describe('sick list', () => {
    let lines;
    // Find the number of lines in the sickness txt file
    before(done => {
        fs.readFile('texts/sick.txt', 'utf8', (err, txtData) => {
            if (err) done(err);
            lines = txtData.split('\n').length - 1;
            done();
        })
    })

    it('sick list should be same legnth as number of sicknesses', (done) => {
        sickList();
        absences().then(absences => {
            let sicknesses = 0;
            absences.forEach(absence => {
                if (absence.type === 'sickness') sicknesses++;
            })
            assert(lines === sicknesses);
            done();
        })
    })
})