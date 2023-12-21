import request from 'supertest';
import * as chai from 'chai';
import 'module-alias/register';
const expect = chai.expect;
const baseUrl = 'http://localhost:4000/';

// group test using describe
describe("testing species's module", () => {
    let speciesId: string;
    it("POST api/species/create", async () => {
        let speciesData = { name: "Species1", url: "www.example.com/species/1" }
        const res = await request(baseUrl)
            .post("api/species/create")
            .send(speciesData);

        expect(res.status).to.be.oneOf([409, 200]);
    });

    it("GET api/species/getAllSpeciess", async () => {
        const res = await request(baseUrl)
            .get("api/species/getAllSpeciess")
            .query({ PageSize: 10, PageNumber: 1 })

        expect(res.status).to.equal(200);
        expect(res.body.data.page).to.be.instanceOf(Array).and.length.greaterThan(0);
        speciesId = res.body.data.page[0]._id;
    });

    it("GET api/species/getSpeciesById/:speciesId", async () => {
        const res = await request(baseUrl)
            .get("api/species/getSpeciesById/" + speciesId)

        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).haveOwnProperty('_id' && 'url');
    });

    it("PUT api/species/update/:speciesId", async () => {
        let speciesData = { name: "Species2", url: "www.example.com/species/2" }
        const res = await request(baseUrl)
            .put("api/species/update/" + speciesId)
            .send(speciesData);

        expect(res.status).to.equal(200);
    });

    it("DELETE api/species/delete/:speciesId", async () => {
        const res = await request(baseUrl)
            .delete("api/species/delete/" + speciesId)

        expect(res.status).to.equal(200);
    });
});