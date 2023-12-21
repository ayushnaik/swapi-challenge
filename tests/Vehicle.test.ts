import request from 'supertest';
import * as chai from 'chai';
import 'module-alias/register';
const expect = chai.expect;
const baseUrl = 'http://localhost:4000/';

// group test using describe
describe("testing vehicle's module", () => {
    let vehicleId: string;
    it("POST api/vehicle/create", async () => {
        let vehicleData = { name: "Vehicle1", url: "www.example.com/vehicle/1" }
        const res = await request(baseUrl)
            .post("api/vehicle/create")
            .send(vehicleData);

        expect(res.status).to.be.oneOf([409, 200]);
    });

    it("GET api/vehicle/getAllVehicles", async () => {
        const res = await request(baseUrl)
            .get("api/vehicle/getAllVehicles")
            .query({ PageSize: 10, PageNumber: 1 })

        expect(res.status).to.equal(200);
        expect(res.body.data.page).to.be.instanceOf(Array).and.length.greaterThan(0);
        vehicleId = res.body.data.page[0]._id;
    });

    it("GET api/vehicle/getVehicleById/:vehicleId", async () => {
        const res = await request(baseUrl)
            .get("api/vehicle/getVehicleById/" + vehicleId)

        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).haveOwnProperty('_id' && 'url');
    });

    it("PUT api/vehicle/update/:vehicleId", async () => {
        let vehicleData = { name: "Vehicle2", url: "www.example.com/vehicle/2" }
        const res = await request(baseUrl)
            .put("api/vehicle/update/" + vehicleId)
            .send(vehicleData);

        expect(res.status).to.equal(200);
    });

    it("DELETE api/vehicle/delete/:vehicleId", async () => {
        const res = await request(baseUrl)
            .delete("api/vehicle/delete/" + vehicleId)

        expect(res.status).to.equal(200);
    });
});