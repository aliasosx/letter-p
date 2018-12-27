const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const corsMiddleware = require('restify-cors-middleware')
const rjwt = require('restify-jwt-community');
const server = restify.createServer();
//middleware
server.use(restify.plugins.bodyParser());
// Setup for pass obsolate
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// Passing cors

const cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
});

server.pre(cors.preflight);
server.use(cors.actual);

//Protect router
server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth', '/authverify'] }));
server.listen(config.PORT, () => {
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

db.once('open', () => {
    require('./routes/foods')(server);
    require('./routes/users')(server);
    require('./routes/routes')(server);
    console.log('Server started on port ' + config.PORT);
});
