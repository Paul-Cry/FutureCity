const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require('../settings/db.js') 
const config = require('../config')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt 
}

// Здесь как я понял идёт проверка на jwt  нужно разобраться как настроивать его что бы
//только пользователи у кого есть токен могли делать запросы к этой api

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, (payload, done) => {
            try {
                db.query("SELECT `id`, `email` FROM `users` WHERE `id` = '" + payload.userId + "'", (error, rows, fields) => {
                    if(error) {
                        console.log(error)
                    } else {
                        const user = rows
                        if(user) {
                            done(null, user)
                        } else {
                            done(null, false)
                        }
                    }
                })
            } catch(e) {
                console.log(e);
            }
        })
    )
}