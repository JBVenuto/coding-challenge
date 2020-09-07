import assert from 'assert';
import { members, absences } from './api';

describe('each absence matches a member', () => {
  it('should return the index of the member', () => {
    absences().then(absences => absences.forEach(absence => {
      members().then(members => assert(members.findIndex(member => member.userId === absence.userId) > -1))
    }))
  })
});
