//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
var expect = chai.expect;

chai.use(chaiHttp);

/*
TRIMESTER
*/
describe('User', () => {
    /*
     * Test the /GET info about reservation request
     */
    describe('POST /api/usuario/create', () => {
        it('it should create a user with a pass defined', (done) => {
            let user = {
                usbId: "00-00000",
                userName: "Armando Prueba",
                userEmail: "00-00000@usb.ve",
                userType: "U"
            }
            chai.request(app)
                .post('/api/usuario/create')
                .send(user)
                .end((err, res) => {
                    // need status 200
                    expect(res).to.have.status(201);
                    done();
                });
        });
    })
});