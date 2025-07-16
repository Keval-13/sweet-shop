import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../src/app.js';
import { Sweet } from '../src/model/sweet.model.js';

describe("GET /api/v1/sweet (Search)", () => {
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
    });

    beforeEach(async () => {
        await Sweet.deleteMany();

        await Sweet.insertMany([
            { name: 'Gulab Jamun', category: 'milk-based', price: 15, quantity: 100 },
            { name: 'Kaju Katli', category: 'Nut-Based', price: 25, quantity: 80 },
            { name: 'Gajar Halwa', category: 'Vegetable based', price: 10, quantity: 150 },
        ]);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    it('return sweets by name and 200 status', async () => {
        const sweetRes = await request(app).get(`${endpoint}?name=gulab jamun`);
        expect(sweetRes.statusCode).toBe(200);
        expect(sweetRes.body.length).toBe(1);
        expect(sweetRes.body[0].name.toLowerCase()).toContain('gulab jamun');
    });

    it('return sweets by category and 200 status', async () => {
        const sweetRes = await request(app).get(`${endpoint}?category=nut-based`);
        expect(sweetRes.statusCode).toBe(200);
        expect(sweetRes.body.length).toBe(1);
        expect(sweetRes.body[0].category.toLowerCase()).toBe('nut-based');
    });

    it('return sweets within a price range and 200 status', async () => {
        const sweetRes = await request(app).get(`${endpoint}?minPrice=12&maxPrice=20`);
        expect(sweetRes.statusCode).toBe(200);
        expect(sweetRes.body.length).toBe(1);
        expect(sweetRes.body[0].name).toBe('Gulab Jamun');
    });

    it('return all sweets if no query is given and 200 status', async () => {
        const sweetRes = await request(app).get(endpoint);
        expect(sweetRes.statusCode).toBe(200);
    });

    it('return empty array if no match found and 200 status', async () => {
        const sweetRes = await request(app).get(`${endpoint}?name=nonexistent`);
        expect(sweetRes.statusCode).toBe(200);
        expect(sweetRes.body).toEqual([]);
    });
});