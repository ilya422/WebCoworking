const express = require('express');
const app = express();
const pagesRouter = require('./routes/pages.router')
const userRouter = require('./routes/user.router')
const event_advRouter = require('./routes/event_adv.router')
const service_advRouter = require('./routes/service_adv.router')
const typeRouter = require('./routes/type.router')
const tagRouter = require('./routes/tag.router')

app.use(express.json())
app.use(pagesRouter)
app.use(userRouter)
app.use(event_advRouter)
app.use(service_advRouter)
app.use(typeRouter)
app.use(tagRouter)

var port = normalizePort(process.env.PORT || '8080');
var server = app.listen(port, () => {
    var port = server.address().port;
    console.log('Listening on http://127.0.0.1:' + port);
})

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}