import request from 'supertest'
import app from './app.js'
import expect from "expect";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

describe("CRUD API", () => {
    var crudId;
    var testCompanyName;
    var uuid;
    // beforeAll(async () => {
    //     await mongoose.connect(process.env.__MONGO_URI__);
    // });
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Display All CRUD Data
    describe("API CRUD", () => {
        test("should get all Crud data", async () => {
            const response = await request(app).get("/api/cruds");
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBeGreaterThan(0);
        });

        // Create New CRUD
        test("should successfully create new Crud data", async () => {
            uuid = uuidv4();
            testCompanyName = uuidv4();
            const response = await request(app)
                .post("/api/cruds")
                .send({
                    "companyName": String(testCompanyName),
                    "phone": "251-123-246246",
                    "email": String(uuid) + "@gmail.com",
                    "location": "HCM City",
                    "link": "https://www.facebook.com/NABVietnam",
                    "description": "The NAB Innovation Centre Vietnam (NICV) is owned by National Australia Bank"
                });
            expect(response.statusCode).toBe(200);
            expect(response.body.companyName).toEqual(String(testCompanyName));
            expect(response.body.phone).toEqual("251-123-246246");
            expect(response.body.email).toEqual(String(uuid) + "@gmail.com");
            expect(response.body.location).toEqual("HCM City");
            expect(response.body.link).toEqual("https://www.facebook.com/NABVietnam");
            expect(response.body.description).toEqual("The NAB Innovation Centre Vietnam (NICV) is owned by National Australia Bank");
            //Save the newly created crud ID so that we can use it in other tests.
            crudId = response.body._id;
            console.log(crudId);
        })

        test('should return an error if CRUD creation fails', async () => {
            const response = await request(app)
                .post('/api/cruds')
                .send({});
            expect(response.statusCode).toBe(422);
            expect(response.body).toEqual({});
        })

        // Show a particular CRUD Detail by Id       
        test("should get a particular CRUD data by id", async () => {
            const response = await request(app)
                .get(`/api/cruds/${crudId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.companyName).toEqual(String(testCompanyName));
            expect(response.body.phone).toEqual("251-123-246246");
            expect(response.body.email).toEqual(String(uuid) + "@gmail.com");
            expect(response.body.location).toEqual("HCM City");
            expect(response.body.link).toEqual("https://www.facebook.com/NABVietnam");
            expect(response.body.description).toEqual("The NAB Innovation Centre Vietnam (NICV) is owned by National Australia Bank");
        });
    });
});

