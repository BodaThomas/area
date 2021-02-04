beforeAll(async done => {
    await sequelize.sync({ force: true });
    done()
})

afterAll(async done => {
    await sequelize.drop();
    await sequelize.close();
    done()
})

const mockRequest = (sessionData, body) => ({
    session: { data: sessionData },
    body,
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn();
    return res;
}

const { register, connect } = require('../src/controllers/user.contoller');
const { sequelize } = require('../src/models')

describe('Register', () => {
    test('Should 400 if username is missing from body', async () => {
        const req = mockRequest(
            {},
            {
                password: '123',
                email: 'test@caca.fr'
            }
        );
        const res = mockResponse();
        await register(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Content can not be empty!",
            success: false
        });
    });
    test('Should 400 if password is missing from body', async () => {
        const req = mockRequest(
            {},
            {
                username: 'test123',
                email: 'test@caca.fr'
            }
        );
        const res = mockResponse();
        await register(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Content can not be empty!",
            success: false
        });
    });

    test('Should 400 if email is missing from body', async () => {
        const req = mockRequest(
            {},
            {
                password: '123',
                username: 'test123',
            }

        );
        const res = mockResponse();
        await register(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Content can not be empty!",
            success: false
        });
    });

    test('Should 200 if the register word.', async () => {
        const req = mockRequest(
            {},
            {
                username: "test123",
                password: "321tset",
                email: "test@caca.com"
            }
        );
        const res = mockResponse();
        await register(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            username: 'test123',
            email: 'test@caca.com',
            is_admin: false,
            success: true
        });
    });

    test('Should 502 if the email already exist.', async () => {
        const req = mockRequest(
            {},
            {
                username: "test123",
                password: "321tset",
                email: "test@caca.com"
            }
        );
        const res = mockResponse();
        await register(req, res);
        expect(res.status).toHaveBeenCalledWith(502);
        expect(res.json).toHaveBeenCalledWith({
            message: "Email already exist !",
            success: false
        });
    });
});

describe('login', () => {
    test('Should 400 if the email is empty', async () => {
        const req = mockRequest(
            {},
            {
                password: "321tset"
            }
        );
        const res = mockResponse();
        await connect(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Content can not be empty!",
            success: false
        });
    });

    test('Should 400 if the password is empty', async () => {
        const req = mockRequest(
            {},
            {
                email: "test@caca.com"
            }
        );
        const res = mockResponse();
        await connect(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Content can not be empty!",
            success: false
        });
    });

    test('Should 503 if the password is incorrect', async () => {
        const req = mockRequest(
            {},
            {
                email: "test@caca.com",
                password: "321tsetFAKE"
            }
        );
        const res = mockResponse();
        await connect(req, res);
        expect(res.status).toHaveBeenCalledWith(503);
        expect(res.json).toHaveBeenCalledWith({
            message: "Email or password is not correct !",
            success: false
        });
    });

    test('Should 503 if the email is incorrect', async () => {
        const req = mockRequest(
            {},
            {
                email: "test@caca.comFAKE",
                password: "321tset"
            }
        );
        const res = mockResponse();
        await connect(req, res);
        expect(res.status).toHaveBeenCalledWith(503);
        expect(res.json).toHaveBeenCalledWith({
            message: "Email or password is not correct !",
            success: false
        });
    });

    test('Should 200 if the connection work', async () => {
        const req = mockRequest(
            {},
            {
                email: "test@caca.com",
                password: "321tset"
            }
        );
        const res = mockResponse();
        await connect(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            username: "test123",
            email: "test@caca.com",
            is_admin: false,
            success: true
        });
    });
});