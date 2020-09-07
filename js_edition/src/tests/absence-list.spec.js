import assert from 'assert';
import fs from 'fs';
import { absences } from '../api'
import absenceList from '../lib/absence-list';

describe('generate list of absences with name', () => {
    let lines;
    // Find the number of lines in the absences txt file
    before(done => {
        fs.readFile('texts/absences.txt', 'utf8', (err, txtData) => {
            if (err) done(err);
            lines = txtData.split('\n').length - 1;
            done()
        })
    })
    it('generated list should be same legnth as absences array', (done) => {
        absenceList();
        absences().then(absence => {
            assert(lines === absence.length);
        })
        done();

    })
})