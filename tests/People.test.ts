import request from 'supertest';
import * as chai from 'chai';
import 'module-alias/register';
const expect = chai.expect;
const baseUrl = 'http://localhost:4000/';

// group test using describe
describe("testing people's module", () => {
    let peopleId: string;
    it("POST api/people/create", async () => {
        let peopleData = { name: "John Dam", url: "www.example.com/people/1" }
        const res = await request(baseUrl)
            .post("api/people/create")
            .send(peopleData);

        expect(res.status).to.be.oneOf([409, 200]);
    });

    it("GET api/people/getAllPeoples", async () => {
        const res = await request(baseUrl)
            .get("api/people/getAllPeoples")
            .query({ PageSize: 10, PageNumber: 1 })

        expect(res.status).to.equal(200);
        expect(res.body.data.page).to.be.instanceOf(Array).and.length.greaterThan(0);
        peopleId = res.body.data.page[0]._id;
    });

    it("GET api/people/getPeopleById/:peopleId", async () => {
        const res = await request(baseUrl)
            .get("api/people/getPeopleById/" + peopleId)

        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).haveOwnProperty('_id' && 'url');
    });

    it("PUT api/people/update/:peopleId", async () => {
        let peopleData = { name: "DON", url: "www.example.com/people/2" }
        const res = await request(baseUrl)
            .put("api/people/update/" + peopleId)
            .send(peopleData);

        expect(res.status).to.equal(200);
    });

    it("DELETE api/people/delete/:peopleId", async () => {
        const res = await request(baseUrl)
            .delete("api/people/delete/" + peopleId)

        expect(res.status).to.equal(200);
    });
});