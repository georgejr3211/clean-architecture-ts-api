export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb+srv://admin:admin@cleanarchcluster.mdeuj.mongodb.net/clean-node-api?retryWrites=true&w=majority',
  port: process.env.PORT ?? 3000,
  jwtScrete: process.env.JWT_SECRET ?? 'A#_wkf3@q1S__q'
}
