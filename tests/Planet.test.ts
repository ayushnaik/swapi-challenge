import request from 'supertest';
import * as chai from 'chai';
import 'module-alias/register';
const expect = chai.expect;
const baseUrl = 'http://localhost:4000/';

// group test using describe
describe("testing planet's module", () => {
    let planetId: string;
    it("POST api/planet/create", async () => {
        let planetData = { name: "Planet1", url: "www.example.com/planet/1" }
        const res = await request(baseUrl)
            .post("api/planet/create")
            .send(planetData);

        expect(res.status).to.be.oneOf([409, 200]);
    });

    it("GET api/planet/getAllPlanets", async () => {
        const res = await request(baseUrl)
            .get("api/planet/getAllPlanets")
            .query({ PageSize: 10, PageNumber: 1 })

        expect(res.status).to.equal(200);
        expect(res.body.data.page).to.be.instanceOf(Array).and.length.greaterThan(0);
        planetId = res.body.data.page[0]._id;
    });

    it("GET api/planet/getPlanetById/:planetId", async () => {
        const res = await request(baseUrl)
            .get("api/planet/getPlanetById/" + planetId)

        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).haveOwnProperty('_id' && 'url');
    });

    it("PUT api/planet/update/:planetId", async () => {
        let planetData = { name: "Planet2", url: "www.example.com/planet/2" }
        const res = await request(baseUrl)
            .put("api/planet/update/" + planetId)
            .send(planetData);

        expect(res.status).to.equal(200);
    });

    it("DELETE api/planet/delete/:planetId", async () => {
        const res = await request(baseUrl)
            .delete("api/planet/delete/" + planetId)

        expect(res.status).to.equal(200);
    });
});