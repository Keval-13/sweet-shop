import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../src/app.js';
import { Sweet } from '../src/model/sweet.model.js';

describe("POST /api/v1/sweet/purchase", () => {
    const endpoint = '/api/v1/sweet/purchase';

    let sweetId;

    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());

        const sweet = await Sweet.create({
            name: 'Gulab Jamun',
            category: 'Milk-Based',
            price: 15,
            quantity: 50
        });

        sweetId = sweet._id;
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    it("allow purchase when quantity is sufficient", async () => {
        const res = await request(app)
            .post(endpoint)
            .send({ sweetId, quantity: 10 });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Purchase successful");
    });

    it("reject purchase when quantity is insufficient", async () => {
        const res = await request(app)
            .post(endpoint)
            .send({ sweetId, quantity: 100 });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Insufficient quantity");
    });
});

