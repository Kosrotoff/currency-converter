const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


function generatePasswordHash(password) {
    const salt = crypto.randomBytes(4).toString('hex');
    const numberIterations = Math.floor(Math.random() * 7 + 3);

    return passwordHashing(password, salt, numberIterations);
}

function checkPassword(password, validPasswordHash) {
    const salt = validPasswordHash.substr(0, 8).toString();
    const numberIterations = Number(validPasswordHash[32]);

    const passwordHash = passwordHashing(password, salt, numberIterations);

    return (passwordHash === validPasswordHash);
}

function passwordHashing(password, salt, numberIterations) {
    password += salt;
    for (let i = 0; i < numberIterations; ++i) {
        password = crypto.createHash('sha256').update(password).digest('hex');
    }

    password = password.replace(password.substr(0, 8), salt);
    password = password.substr(0, 32) + numberIterations + password.substr(32);

    return password;
}


module.exports.register = async (request, response) => {
    const {body: {email, password}} = request;
    if (!email || !password) {
        response.json({message: 'Не указан обязательный парметр.'}, 400);
        return;
    }

    const user = await User.findOne({email});
    if (user) {
        response.json({message: 'Учётная запись с таким email уже существует.'}, 409);
    } else {
        const newUser = new User({
            email,
            passwordHash: generatePasswordHash(password)
        });

        try {
            await newUser.save();
            response.json({message: 'Учётная запись создана.'}, 201);
        } catch (error) {
            response.json({message: 'Не удалось создать учётную запись. Повторите попытку, если проблема повторится обратитесь в техподдержку.'}, 500);
        }
    }
};

module.exports.login = async (request, response) => {
    const {body: {email, password}} = request;
    if (!email || !password) {
        response.json({message: 'Не указан обязательный парметр.'}, 400);
        return;
    }

    const user = await User.findOne({email});
    if (!user) {
        response.json({message: 'Учётная запись с таким email не существует.'}, 400);
    } else {
        if (checkPassword(password, user.passwordHash)) {
            const token = jwt.sign(
                {
                    userId: user._id
                },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: process.env.TOKEN_EXPIRATION_TIME
                }
            );
            response.json({token}, 200);
        } else {
            response.json({message: 'Неверный пароль.'}, 401);
        }
    }
};
