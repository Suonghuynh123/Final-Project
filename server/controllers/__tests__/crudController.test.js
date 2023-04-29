//const { crud_index, crud_details, crud_create_post, crud_update, crud_delete } = require('./crudController');
const Crud = require("../../models/crudModel");
const request = require('supertest');
//const mongoose = require("mongoose");
const app = require('../crudController');
const server = ('./crudController');

describe("CRUD API", () => {
    let crudId;
    /*
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
*/
    // Display All CRUD Data
    it("should get all CRUD data", async () => {
        const res = await request(app)
            .get('/api/crud');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
    /*
        // Create New CRUD
        it("should create a new CRUD data", async () => {
            const res = await request(app)
                .post('/api/crud')
                .send({ name: "Wecamp Program", description: "This is the test!" });
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toEqual("Wecamp Program");
            expect(res.body.description).toEqual("This is the test!");
            // Save the newly created crud ID so that we can use it in other tests.
            crudId = res.body._id;
            console.log(crudId);
        });
    
        it('should return an error if CRUD creation fails', async () => {
            const res = await request(app)
                .post('/api/crud')
                .send({});
            expect(res.statusCode).toEqual(422);
            expect(res.body).toEqual('Crud add failed');
        });
    
        // Show a particular CRUD Detail by Id       
        it("should get a particular CRUD data by id", async () => {
            const res = await request(app)
                .get(`/api/crud/${crudId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toEqual("Wecamp Program");
            expect(res.body.description).toEqual("This is the test!");
        });
    
        it('should return an error if no result found with the given ID', async () => {
            const res = await request(app)
                .get('/api/crud/123456789012');
            expect(res.statusCode).toEqual(404);
            expect(res.body).toContain('No result found');
        });
    
    
        // Update CRUD Detail by Id       
        it("should update a particular CRUD data by id", async () => {
            const res = await request(app)
                .put(`/api/crud/${crudId}`)
                .send({ name: "Wecamp Program77" });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toContain('Crud updated');
        });
    
        it('should return an error if update failed', async () => {
            const res = await request(app)
                .put('/api/crud/123456789012')
                .send({ name: "Wecamp Program77" });
            expect(res.statusCode).toEqual(422);
            expect(res.body).toContain('Crud update failed.');
        });
    
        // Delete CRUD Detail by Id
        it("should delete a particular CRUD data by id", async () => {
            const res = await request(app)
                .delete(`/api/crud${crudId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual("Crud deleted");
        });
    
        it('should return an error if CRUD not found', async () => {
            const res = await request(app)
                .delete('/api/crud/123456789012');
            expect(res.statusCode).toEqual(404);
            expect(res.body).toContain('Crud not found');
        });
    
        it('should return an error if delete failed', async () => {
            jest.spyOn(Crud, 'findByIdAndRemove').mockRejectedValue(new Error());
            const res = await request(app)
                .delete(`/api/crud/${crudId}`);
            expect(res.statusCode).toEqual(400);
            expect(res.text).toContain('Crud delete failed.');
        });
        */
}); 
