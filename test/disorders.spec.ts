import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Disorders", () => {
    describe("GET /disorders", () => {
        it("should get all disorders", (done) => {
            chai.request(app)
                .get('/disorders')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    chai.expect(res.body).not.to.be.empty;
                    done();
                });
        });
        it("should get narcissistic disorder", (done) => {
            chai.request(app)
                .get('/disorders/narcissistic')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    chai.expect(res.body.shortname).to.equal("narcissistic");
                    done();
                });
        });
        it("should not get non_existent disorder", (done) => {
            chai.request(app)
            .get('/disorders/non_existent')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
        })
    });
})