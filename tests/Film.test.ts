import request from 'supertest';
import * as chai from 'chai';
import 'module-alias/register';
const expect = chai.expect;
const baseUrl = 'http://localhost:4000/';

// group test using describe
describe("testing film's module", () => {
    let filmId: string;
    it("POST api/film/create", async () => {
        let filmData = { title: "Starwar1", url: "www.example.com/film/1" }
        const res = await request(baseUrl)
            .post("api/film/create")
            .send(filmData);

        expect(res.status).to.be.oneOf([409, 200]);
    });

    it("GET api/film/getAllFilms", async () => {
        const res = await request(baseUrl)
            .get("api/film/getAllFilms")
            .query({ PageSize: 10, PageNumber: 1 })

        expect(res.status).to.equal(200);
        expect(res.body.data.page).to.be.instanceOf(Array).and.length.greaterThan(0);
        filmId = res.body.data.page[0]._id;
    });

    it("GET api/film/getFilmById/:filmId", async () => {
        const res = await request(baseUrl)
            .get("api/film/getFilmById/" + filmId)

        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).haveOwnProperty('_id' && 'url');
    });

    it("PUT api/film/update/:filmId", async () => {
        let filmData = { title: "Starwar2", url: "www.example.com/film/2" }
        const res = await request(baseUrl)
            .put("api/film/update/" + filmId)
            .send(filmData);

        expect(res.status).to.equal(200);
    });

    it("DELETE api/film/delete/:filmId", async () => {
        const res = await request(baseUrl)
            .delete("api/film/delete/" + filmId)

        expect(res.status).to.equal(200);
    });
});