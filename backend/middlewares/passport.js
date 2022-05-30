const {Strategy, ExtractJwt} = require('passport-jwt');

const User = require('../models/User');


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY
};


module.exports = passport => {
    const strategy = new Strategy(options, async (payload, done) => {
        try {
            const user = await User.findById(payload.userId).select('id email');
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (error) {
            done(null, false);
        }
    });

    passport.use(strategy);
};
