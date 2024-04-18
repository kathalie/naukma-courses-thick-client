const jwtConstants = {
    secret: process.env.JWT_SECRET || 'YOUR_SECRET_KEY',
};

module.exports = {
    jwtConstants,
};
