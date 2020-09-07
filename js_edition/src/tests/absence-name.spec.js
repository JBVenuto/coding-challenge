import assert from 'assert';
import absenceName from '../lib/absence-name';

describe('add name to absence', () => {
    it('should return an object with absence info and name', () => {
      absenceName({
        "admitterId": null,
        "admitterNote": "",
        "confirmedAt": "2016-12-12T18:03:55.000+01:00",
        "createdAt": "2016-12-12T14:17:01.000+01:00",
        "crewId": 352,
        "endDate": "2017-01-13",
        "id": 2351,
        "memberNote": "",
        "rejectedAt": null,
        "startDate": "2017-01-13",
        "type": "sickness",
        "userId": 2664
      }).then(name => assert(name === "Mike"))
  })
})