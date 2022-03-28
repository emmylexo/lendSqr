'use strict';

const { request, expect } = require('chai');
let chai = require('chai');
const { app } = require('../index');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const baseUrl = `http://localhost:5000/v1`;
let firstUser;
let secondUser;
let body;
const firstUserData = {
    email: 'j111ohnDoe@gmail.com',
    password: '12345',
    firstName: 'John',
    lastName: 'Doe'
}

const secondUserData = {
    email: 's111econdUser@gmail.com',
    password: '12345',
    firstName: 'Second',
    lastName: 'User'
}

describe('Test Users Endpoints', () => {

    it('Should create new User Accounts and their Wallets', (done) => {

        chai.request(baseUrl).post('/register')
            .send(firstUserData)
            .end((err, response) => {
                firstUser = response.body.data;
                expect(response.body).to.be.a('object');
                expect(response).status(200)
            });

        chai.request(baseUrl).post('/register')
            .send(secondUserData)
            .end((err, response) => {
                secondUser = response.body.data;
                expect(response.body).to.be.a('object');
                expect(response).status(200)
                done();
            });
    })
})

describe('Test User wallets', () => {
    after((done) => {
        chai.request(baseUrl).delete(`/user/${firstUser.id}`)
            .end((err, response) => {
                expect(response.body).to.be.a('object');
                expect(response).status(200)
            });

        chai.request(baseUrl).delete(`/user/${secondUser.id}`)
            .end((err, response) => {
                expect(response.body).to.be.a('object');
                expect(response).status(200)
                done()
            });


    });

    it(`Should topup a User's wallet`, (done) => {

        chai.request(baseUrl).post('/wallet/topup')
            .set('Authorization', `Bearer ${firstUser.token}`)
            .send({ amount: 2000 })
            .end((err, response) => {
                body = response.body;
                expect(body).to.be.a('object');
                expect(body.success).to.be.true;
                expect(body.data).to.haveOwnProperty('balance');
                expect(body.data.balance).to.be.eq(2000);
                done()
            });
    });

    it(`Should transfer funds to another user's account`, (done) => {

        chai.request(baseUrl).post('/wallet/transfer')
            .set('Authorization', `Bearer ${firstUser.token}`)
            .send({ receiver: secondUser.id, amount: 1000 })
            .end((err, response) => {
                body = response.body;
                expect(body).to.be.a('object');
                expect(body.success).to.be.true;
                done()
            });
    });

    it(`Should withdraw funds from user account`, (done) => {

        chai.request(baseUrl).post('/wallet/withdraw')
            .set('Authorization', `Bearer ${firstUser.token}`)
            .send({ amount: 500 })
            .end((err, response) => {
                body = response.body;
                expect(body).to.be.a('object');
                expect(body.success).to.be.true;
                expect(body.data).to.haveOwnProperty('balance');
                expect(body.data.balance).to.be.eq(500);
                done()
            });
    })
})