'use strict';
const { app } = require('../src/server.js');
const superTest = require('supertest');
const request = superTest(app);
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGOOSE_TEST_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, 
async () => {// delete everything from db after tests
  // await mongoose.connection.db.dropDatabase();
});

let id;
describe('api server', () => {
  afterAll(() => {// we need to close the connection after tests
    mongoose.connection.close();
  });
  it('404 on a bad route', async () => {
    let res = await request.get('/random');
    expect(res.status).toEqual(404);
  });
  it('404 on a bad method', async ()=> {
    let res = await request.patch('/api/v1/food');
    expect(res.status).toEqual(404);
  });

  it('should create a new food using post request', async () => {
    //arrange
    let food = {
      name: 'mansaf',
      country: 'jordan',
    };
      //act

    const response = await request.post('/api/v1/food').send(food);
    //assert
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('mansaf');
    expect(response.body.country).toEqual('jordan');
    expect(response.body._id.length).toBeGreaterThan(0);

    id = response.body._id;
  });

  it('should get a food using get request', async () => {
    //arrange
    let food = {
      name: 'mansaf',
      country: 'jordan',
    };
      //act
    const response = await request.get('/api/v1/food').send(food);
    //assert
    expect(response.status).toEqual(200);
    expect(response.body[response.body.length - 1].name).toEqual('mansaf');
    expect(response.body[response.body.length - 1].country).toEqual('jordan');
    expect(response.body[response.body.length - 1]._id.length).toBeGreaterThan(0);
    
    
  });

  it('should read a specefic record', async () => {
    //arrange
    let Food = {
      name: 'mansaf',
      country: 'jordan',
    };
      //act
    const response = await request.get(`/api/v1/food/${id}`).send(Food);
    //asert
    expect(response.status).toEqual(200);
    expect(response.body[response.body.length - 1].name).toEqual('mansaf');
    expect(response.body[response.body.length - 1].country).toEqual('jordan');
    expect(response.body[response.body.length - 1]._id.length).toBeGreaterThan(0);
  });

  it('should update a person using put request', async () => {
    //arrange
    let editPerson = {
      name: 'mansaf',
      country: 'palestine',
    };
      //act
    const response = await request.put(`/api/v1/food/${id}`)
      .send(editPerson);

    //asert
    expect(response.status).toEqual(200);
    expect(response.body.country).toEqual('palestine');
  });
  it('should delete a food using delete request', async () => {
    //arrange
    let deleteFood = {
      name: 'mansaf',
      country: 'jordan',
    };
    //act
    const response = await request.delete(`/api/v1/food/${id}`).send(deleteFood);
    //asert
    expect(response.status).toEqual(200);
    expect(response.body._id).toEqual(id);
  });
  it('should create a new clothes using post request', async () => {
    //arrange
    let clothes = {
      name: 'jeans',
    };
      //act

    const response = await request.post('/api/v1/clothes').send(clothes);
    //assert
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('jeans');
    expect(response.body._id.length).toBeGreaterThan(0);

    id = response.body._id;
  });

  it('should get a clothes using get request', async () => {
    //arrange
    let clothes = {
      name: 'jeans',
    };
      //act
    const response = await request.get('/api/v1/clothes').send(clothes);
    //assert
    expect(response.status).toEqual(200);
    expect(response.body[response.body.length - 1].name).toEqual('jeans');
    expect(response.body[response.body.length - 1]._id.length).toBeGreaterThan(0);
    
    
  });

  it('should read a specefic record clothes', async () => {
    //arrange
    let food = {
      name: 'jeans',
    };
      //act
    const response = await request.get(`/api/v1/clothes/${id}`).send(food);
    //asert
    expect(response.status).toEqual(200);
    expect(response.body[response.body.length - 1].name).toEqual('jeans');
    expect(response.body[response.body.length - 1]._id.length).toBeGreaterThan(0);
  });

  it('should update a clothes using put request', async () => {
    //arrange
    let editClothes = {
      name: 'shirt',
    };
      //act
    const response = await request.put(`/api/v1/clothes/${id}`)
      .send(editClothes);

    //asert
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('shirt');
  });
  it('should delete a clothes using delete request', async () => {
    //arrange
    let deleteClothes = {
      name: 'jeans',
    };
    //act
    const response = await request.delete(`/api/v1/clothes/${id}`).send(deleteClothes);
    //asert
    expect(response.status).toEqual(200);
    expect(response.body._id).toEqual(id);
  });
});


