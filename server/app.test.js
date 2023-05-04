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

        it('should return an error if no result found with the given ID', async () => {
            const response = await request(app)
                .get('/api/cruds/12345678901212');
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({});
        });

        // Update CRUD Detail by Id       
        it("should update a particular CRUD data by id", async () => {
            const response = await request(app)
                .patch(`/api/cruds/${crudId}`)
                .send({ location: "Viet Nam" });
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual('Crud updated');
        });

        it('should return an error if update failed', async () => {
            const response = await request(app)
                .patch('/api/cruds/12345678901212')
                .send({ location: "Viet Nam" });
            expect(response.statusCode).toBe(422);
            expect(response.body).toEqual({});
        });

        // Delete CRUD Detail by Id
        it("should delete a particular CRUD data by id", async () => {
            const response = await request(app)
                .delete(`/api/cruds/${crudId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual("Crud deleted");
        });

        it('should return an error if CRUD not found', async () => {
            const response = await request(app)
                .delete('/api/cruds/12345678901212');
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({});
        });

    });
});

