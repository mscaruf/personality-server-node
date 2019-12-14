import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);
chai.should();

describe("Subjects", () => {
    describe("GET /subjects", () => {
        it("should get all subjects", (done) => {
            chai.request(app)
                .get('/subjects')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    chai.expect(res.body).not.to.be.empty;
                    done();
                });
        });
    });
})