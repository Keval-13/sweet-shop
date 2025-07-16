import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../src/app.js';
import { Sweet } from '../src/model/sweet.model.js';

describe('POST /api/v1/sweet/restock', () => {
    const endpoint = '/api/v1/sweet/restock';
    let sweetId;

    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create({
            binary: {
                downloadDir: 'E:/mongodb'
            }
        });

        await mongoose.connect(mongoServer.getUri());

        const sweet = await Sweet.create({
            name: 'milk cake',
            category: 'Milk-Based',
            price: 50,
            quantity: 5
        });

        sweetId = sweet._id;
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    it('returns 200 status and restock sweet', async () => {
        const res = await request(app)
            .post(endpoint)
            .send({ sweetId, quantity: 30 });

        expect(res.statusCode).toBe(200);
    });

    it('returns 400 for invalid quantity', async () => {
        const res = await request(app)
            .post(endpoint)
            .send({ sweetId, quantity: -10 });

        expect(res.statusCode).toBe(400);
    });

    it('returns 404 for non-existent sweet', async () => {
        const sweetId = new mongoose.Types.ObjectId();

        const res = await request(app)
            .post(endpoint)
            .send({ sweetId, quantity: 10 });

        expect(res.statusCode).toBe(404);
    });
});