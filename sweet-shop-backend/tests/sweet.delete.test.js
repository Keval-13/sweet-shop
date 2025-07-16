import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../src/app.js';
import { Sweet } from '../src/model/sweet.model.js';

describe("DELETE /api/v1/sweets", () => {
    const endpoint = '/api/v1/sweet';

    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create(
            {
                binary: {
                    downloadDir: 'E:/mongodb'
                }
            }
        );
        await mongoose.connect(mongoServer.getUri())
    })

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    })

    it("existing sweet delete successfully and return 200 status code", async () => {
        const payload = {
            name: 'Gajar Halwa',
            category: 'Vegetable Based',
            quantity: "50",
            price: "10"
        };

        const createdSweetRes = await request(app)
            .post(endpoint)
            .send(payload)
            .set('Accept', 'application/json');

        const sweetId = createdSweetRes.body._id;

        const deletedSweetRes = await request(app).delete(`${endpoint}/${sweetId}`)

        expect([200, 204]).toContain(deletedSweetRes.statusCode);

        const existsSweet = await Sweet.findById(createdSweetRes._id);

        expect(existsSweet).toBeNull();
    })

    it("returns 404 sweet not exists", async () => {
        const sweetId = new mongoose.Types.ObjectId();

        const deletedSweetRes = await request(app).delete(`${endpoint}/${sweetId}`)

        expect(deletedSweetRes.statusCode).toBe(404);
    });
});