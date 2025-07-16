import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../src/app.js';

describe("GET /api/v1/sweet", () => {
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

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    it("returns all sweets and 200 status code", async () => {
        const getSweetsRes = await request(app).get(endpoint);

        expect(getSweetsRes.statusCode).toBe(200);
    });
});