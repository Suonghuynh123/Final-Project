import request from 'supertest'
import app from './app.js'
import expect from "expect";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

describe("CRUD API", () => {
    // beforeAll(async () => {
    //     await mongoose.connect(process.env.__MONGO_URI__);
    // });
    afterAll(async () => {
        await mongoose.connection.close();
    });
    describe("when request to get all CRUD data", () => {
        test("Should respond with a 200 status code", async () => {
            const response = await request(app).get("/api/cruds").send();
            expect(response.statusCode).toBe(200);
        });
    });
});