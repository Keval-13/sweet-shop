import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../src/app.js';

describe('POST /api/v1/sweets', () => {
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

    it('creates a sweet when the payload is valid', async () => {
        const payload = {
            name: 'Kaju Katli',
            category: 'Nut-Based',
            quantity: 50,
            price: 20
        };

        const res = await request(app)
            .post(endpoint)
            .send(payload)
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(201);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual(expect.objectContaining(payload));
    });

    it('rejects when fields are missing', async () => {
        const payload = {
            category: 'Nut-Based',
            quantity: 50,
            price: 20
        };

        const res = await request(app).post(endpoint).send(payload);
        expect(res.statusCode).toBe(400);
    });

    it('rejects when quantity or price are negative', async () => {
        const payload = {
            name: 'Kaju Katli',
            category: 'Nut-Based',
            quantity: -50,
            price: -20
        };

        const res = await request(app).post(endpoint).send(payload);
        expect(res.statusCode).toBe(400);
    });
});