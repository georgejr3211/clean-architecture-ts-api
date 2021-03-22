export default {
    mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/clean-node-api',
    port: process.env.PORT ?? 3000,
    jwtScrete: process.env.JWT_SECRET ?? 'A#_wkf3@q1S__q'
}