const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();

const pagesRouter = require('./routes/pages.router')
const userRouter = require('./routes/user.router')
const event_advRouter = require('./routes/event_adv.router')
const service_advRouter = require('./routes/service_adv.router')
const userSubEventRouter = require('./routes/user_sub_event_advs.router')
const typeRouter = require('./routes/type.router')
const tagRouter = require('./routes/tag.router')
const userSubTagsRouter = require('./routes/user_sub_tags.router')
const authRouter = require('./routes/auth.router')
const emailRouter = require('./routes/email.router')

app.use(express.json({limit: '50mb'}));
app.use(cookieParser());

app.use(pagesRouter)
app.use(userRouter)
app.use(event_advRouter)
app.use(service_advRouter)
app.use(userSubEventRouter)
app.use(typeRouter)
app.use(tagRouter)
app.use(userSubTagsRouter)
app.use(authRouter)
app.use(emailRouter)

var nowTime = new Date();
var tomorrowTime = new Date().setHours(24, 0, 0);

var port = normalizePort(process.env.PORT || '8080');
var server = app.listen(port, () => {
    var port = server.address().port;
    console.log('Listening on http://127.0.0.1:' + port);
    deleteOld()
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

async function deleteOld() {
    try{
        const {delete_evAdv_ByTime} = require('./controller/event_adv.controller')
        const {deleteOldTokens} = require('./controller/tokens.controller')
        await delete_evAdv_ByTime(nowTime)
        await deleteOldTokens(nowTime)
        console.log(`След. очистка старых данных через ${parseInt(tomorrowTime - nowTime) / 1000 / 3600} часа`)
    }
    catch(e) {
        console.log(`Ошибка удаления мероприятий: `, e)
    }
}

setInterval(() => deleteOld(), parseInt(tomorrowTime - nowTime));