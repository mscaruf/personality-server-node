import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);
chai.should();

afterEach((done) => {
    chai.request(app)
        .delete('/subjects/__test/__test')
        .end((err, res) => {
            done();
        })
})

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

        it("should not get a non-existing subject", (done) => {
            chai.request(app)
                .get('/subjects/testnonexistentsubject')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

    });
    
    describe("POST /subjects", () => {
        
        it("should add a new subject", (done) => {
            chai.request(app)
                .get('/subjects')
                .end((err, res) => {
                    let subjectsInitialCount = res.body.length;

                    chai.request(app)
                        .post('/subjects')
                        .type('form')
                        .send({
                          'firstName': '__test',
                          'lastName': '__test',
                          'tags': ['some', 'tags']
                        })
                        .end((err, res) => {
                            chai.request(app)
                            .get('/subjects')
                            .end((err, res) => {
                                let subjectsFinalCount = res.body.length;
                                chai.expect(subjectsInitialCount).lessThan(subjectsFinalCount);
                                done();
                            });

                        });
                });
        });

        it("should not be able to add a subject with missing parameters", (done) => {
            chai.request(app)
                .get('/subjects')
                .end((err, res) => {
                    let subjectsInitialCount = res.body.length;

                    chai.request(app)
                        .post('/subjects')
                        .type('form')
                        .send({
                          'lastName': '__test',
                        })
                        .end((err, res) => {
                            chai.request(app)
                            .get('/subjects')
                            .end((err, res) => {
                                let subjectsFinalCount = res.body.length;
                                chai.expect(subjectsInitialCount).equals(subjectsFinalCount);
                                done();
                            });

                        });
                });
        });
    });

    describe("PUT /subjects", () => {
    
        it("should update a subject", (done) => {
            chai.request(app)
            .post('/subjects')
            .type('form')
            .send({
              'firstName': '__test',
              'lastName': '__test',
              'tags': ['some', 'tags']
            })
            .end((err, res) => {
                const subjectId = res.body['_id'];

                chai.request(app)
                .put(`/subjects/${subjectId}`)
                .send({
                  'firstName': '__test',
                  'lastName': '__test',
                  'tags': ['some', 'more', 'tags']
                })
                .end((err, res) => {

                    chai.request(app)
                    .get(`/subjects/${subjectId}`)
                    .end((err, res) => {
                        const updatedSubject = res.body;
                        chai.expect(updatedSubject.tags).members(['some', 'more', 'tags'])
                        done();
                    });
                });
            });
        });

        it("should not be possible to update a non-existing subject", (done) => {
            const subjectId = 'testnonexistentid';

            chai.request(app)
            .put(`/subjects/${subjectId}`)
            .send({
              'firstName': '__test',
              'lastName': '__test',
              'tags': ['some', 'more', 'tags']
            })
            .end((err, res) => {
                res.should.have.status(406);
                done();
            });
        });
    })

    describe("DELETE /subjects", () => {
        it("should delete given subject", (done) => {
            chai.request(app)
            .post('/subjects')
            .type('form')
            .send({
              'firstName': '__test',
              'lastName': '__test',
              'tags': ['some', 'tags']
            })
            .end((err, res) => {
                const subjectId = res.body['_id'];

                chai.request(app)
                .delete(`/subjects/${subjectId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });

            });
        });
    })

    describe("GET /score", () => {
        it("should get predicted score for given subject", (done) => {
            chai.request(app)
            .post('/subjects')
            .type('form')
            .send({
              'firstName': '__test',
              'lastName': '__test',
              'tags': [
                "grandiose",
                "manipulative",
                "selfish",
                "unstable"
              ]
            })
            .end((err, res) => {
                const subjectId = res.body['_id'];

                chai.request(app)
                .get(`/subjects/score/${subjectId}`)
                .end((err, res) => {
                    const score = res.body;
                    chai.expect(score["narcissistic"]).equals(3);
                    chai.expect(score["borderline"]).equals(1)
                    done();
                });

            });
        });
    })

})