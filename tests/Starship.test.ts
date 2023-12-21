import request from 'supertest';
import * as chai from 'chai';
import 'module-alias/register';
const expect = chai.expect;
const baseUrl = 'http://localhost:4000/';

// group test using describe
describe("testing starship's module", () => {
    let starshipId: string;
    it("POST api/starship/create", async () => {
        let starshipData = { name: "Starship1", url: "www.example.com/starship/1" }
        const res = await request(baseUrl)
            .post("api/starship/create")
            .send(starshipData);

        expect(res.status).to.be.oneOf([409, 200]);
    });

    it("GET api/starship/getAllStarships", async () => {
        const res = await request(baseUrl)
            .get("api/starship/getAllStarships")
            .query({ PageSize: 10, PageNumber: 1 })

        expect(res.status).to.equal(200);
        expect(res.body.data.page).to.be.instanceOf(Array).and.length.greaterThan(0);
        starshipId = res.body.data.page[0]._id;
    });

    it("GET api/starship/getStarshipById/:starshipId", async () => {
        const res = await request(baseUrl)
            .get("api/starship/getStarshipById/" + starshipId)

        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).haveOwnProperty('_id' && 'url');
    });

    it("PUT api/starship/update/:starshipId", async () => {
        let starshipData = { name: "Starship2", url: "www.example.com/starship/2" }
        const res = await request(baseUrl)
            .put("api/starship/update/" + starshipId)
            .send(starshipData);

        expect(res.status).to.equal(200);
    });

    it("DELETE api/starship/delete/:starshipId", async () => {
        const res = await request(baseUrl)
            .delete("api/starship/delete/" + starshipId)

        expect(res.status).to.equal(200);
    });
});