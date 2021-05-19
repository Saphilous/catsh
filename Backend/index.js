function adduser(args)
{
    const express = require('express')
    const app = express()
    const session = require('express-session')
    app.use(session({
        secret: "saphilous is a good catsh adorer",
        resave: false,
        saveUninitialized: false
    }))
    const passport = require('passport')
    var user
    app.use(passport.initialize())
    app.use(passport.session())

}