const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Assuming your Express app is exported from app.js
const { expect } = chai;

chai.use(chaiHttp);

describe('Tasks API', () => {
    let authToken = '';

    // Login before running tests
    before((done) => {
        chai.request(app)
            .post('/auth/login')
            .send({ email: 'your-email@example.com', password: 'your-password' })
            .end((err, res) => {
                authToken = res.body.data[0].token;
                done();
            });
    });

    describe('GET /tasks', () => {
        it('should return all tasks', (done) => {
            chai.request(app)
                .get('/tasks')
                .set('Authorization', `Bearer ${authToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.status).to.equal('success');
                    expect(res.body.data).to.be.an('array');
                    done();
                });
        });
    });

    describe('POST /tasks', () => {
        it('should create a new task', (done) => {
            chai.request(app)
                .post('/tasks')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ title: 'Test Task', description: 'This is a test task' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.status).to.equal('success');
                    expect(res.body.data).to.be.an('array');
                    done();
                });
        });
    });

    // Add more tests for other routes as needed
});
