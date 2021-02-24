const db = require("../src/models");
const User = db.user;
const Op = db.Sequelize.Op;

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

const { register, connect, addRights, verifyEmail, deleteUser } = require('../src/controllers/user.contoller');
const { sequelize } = require('../src/models')

describe('Register', () => {
    test('Should 400 if username is missing from body', async () => {
        const req = mockRequest(
            {},
            {
                password: '123',
                email: 'area.tek.2023@gmail.com'
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
                username: 'Area',
                email: 'area.tek.2023@gmail.com'
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
                username: 'Area',
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

    test('Should 200 if the register works.', async () => {
        const req = mockRequest(
            {},
            {
                username: "Area",
                password: "321tset",
                email: "area.tek.2023@gmail.com"
            }
        );
        const res = mockResponse();
        await register(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            username: 'Area',
            email: 'area.tek.2023@gmail.com',
            is_admin: false,
            success: true
        });
    });

    test('Should 502 if the email already exist.', async () => {
        const req = mockRequest(
            {},
            {
                username: "Area",
                password: "321tset",
                email: "area.tek.2023@gmail.com"
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

describe('Verify Email', () => {
    test('Should 400 if registerToken missing from body', async () => {
        const req = mockRequest({},{});
        const res = mockResponse();
        await verifyEmail(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Content can not be empty!",
            success: false
        });
    });

    test('Should 502 if wrong registerToken', async () => {
        const req = mockRequest({},
            {
                registerToken: "wrongtoken"
            }
        );
        const res = mockResponse();
        exist = await User.findOne({ where: {username: "Area"}});
        exist.registerToken = "token";
        await exist.save();
        await verifyEmail(req, res);
        expect(res.status).toHaveBeenCalledWith(502);
        expect(res.json).toHaveBeenCalledWith({
            message:  "Wrong Token.",
            success: false
        });
    });

    test('Should 200 if registerToken matches', async () => {
        const req = mockRequest({},
            {
                registerToken: "token"
            }
        );
        const res = mockResponse();
        await verifyEmail(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true
        });
    });
});

describe('Login', () => {
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
                email: "area.tek.2023@gmail.com"
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
                email: "area.tek.2023@gmail.com",
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
                email: "area.tek.2023@gmail.comFAKE",
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
                email: "area.tek.2023@gmail.com",
                password: "321tset"
            }
        );
        const res = mockResponse();
        await connect(req, res);
        data = await User.findOne({ where: {email: req.body.email}});
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            username: "Area",
            email: "area.tek.2023@gmail.com",
            is_admin: false,
            accessToken: data.accessToken,
            success: true
        });
    });
});

describe('Admin', () => {
    // test('(getUsersList) Should 503 if no data', async () => {
    //     const req = mockRequest({},{});
    //     const res = mockResponse();
    //     data = await User.findOne({ where: {username: "Area"}});
    //     data.isValid = false;
    //     await data.save();
    //     await getUsersList(req, res);
    //     expect(res.status).toHaveBeenCalledWith(503);
    //     expect(res.json).toHaveBeenCalledWith({
    //         message: "Error to get data !",
    //         success: false
    //     });
    // });

    // test('(getUsersList) Should 200 if successful', async () => {
    //     const req = mockRequest({},{});
    //     const res = mockResponse();
    //     exist = await User.findOne({ where: {username: "Area"}});
    //     exist.isValid = true;
    //     await exist.save();
    //     await getUsersList(req, res);
    //     expect(res.status).toHaveBeenCalledWith(200);
    //     expect(res.json).toHaveBeenCalledWith({
    //         data,
    //         success: true
    //     });
    // });

    test('(addRights) Should 400 if username is missing from body', async () => {
        const req = mockRequest({},{});
        const res = mockResponse();
        await addRights(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Username missing !",
            success: false
        });
    });

    test('(addRights) Should 503 if user not found', async () => {
        const req = mockRequest({},
            {
                username: "notArea"
            }
        );
        const res = mockResponse();
        await addRights(req, res);
        expect(res.status).toHaveBeenCalledWith(503);
        expect(res.json).toHaveBeenCalledWith({
            message: "User not found !",
            success: false
        });
    });

    test('(addRights) Should 200 if successful', async () => {
        const req = mockRequest({},
            {
                username: "Area"
            }
        );
        const res = mockResponse();
        await addRights(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true
        });
    });

    // test('(removeRights) Should 400 if username is missing from body', async () => {
    //     const req = mockRequest({},{});
    //     const res = mockResponse();
    //     await removeRights(req, res);
    //     expect(res.status).toHaveBeenCalledWith(400);
    //     expect(res.json).toHaveBeenCalledWith({
    //         message: "Username missing !",
    //         success: false
    //     });
    // });

    // test('(removeRights) Should 503 if user not found', async () => {
    //     const req = mockRequest({},
    //         {
    //             username: "notArea"
    //         }
    //     );
    //     const res = mockResponse();
    //     await removeRights(req, res);
    //     expect(res.status).toHaveBeenCalledWith(503);
    //     expect(res.json).toHaveBeenCalledWith({
    //         message: "User not found !",
    //         success: false
    //     });
    // });

    // test('(removeRights) Should 200 if successful', async () => {
    //     const req = mockRequest({},
    //         {
    //             username: "Area"
    //         }
    //     );
    //     const res = mockResponse();
    //     await removeRights(req, res);
    //     expect(res.status).toHaveBeenCalledWith(200);
    //     expect(res.json).toHaveBeenCalledWith({
    //         success: true
    //     });
    // });

    test('(deleteUser) Should 400 if username is missing from body', async () => {
        const req = mockRequest({},{});
        const res = mockResponse();
        await deleteUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Username missing !",
            success: false
        });
    });

    test('(deleteUser) Should 503 if user not found', async () => {
        const req = mockRequest({},
            {
                username: "notArea"
            }
        );
        const res = mockResponse();
        await deleteUser(req, res);
        expect(res.status).toHaveBeenCalledWith(503);
        expect(res.json).toHaveBeenCalledWith({
            message: "User not found !",
            success: false
        });
    });

    test('(deleteUser) Should 200 if successful', async () => {
        const req = mockRequest({},
            {
                username: "Area"
            }
        );
        const res = mockResponse();
        await deleteUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true
        });
    });
});