'use strict'

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const response = require('../response.js')
const db = require('../settings/db')
const config = require('../config.js')
const { json } = require('body-parser')


//Регистрация
exports.signup = async function (req, res) {
    // Принимаемые данные email password name
    console.log(req.body)
    db.query("SELECT `id`, `email`, `name` FROM `users` WHERE `email` = '" + req.body.email + "'", async function (error, rows, fields) {
        if (error) {
            response.status(400, error, res)
        } else if (typeof rows !== 'undefined' && rows.length > 0) {
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rw => {
                response.status(302, { message: `Пользователь с таким email - ${rw.email} уже зарегстрирован!` }, res)
                return true
            })
        } else {
            console.log('Не зарегестрирован')
            const name = req.body.name
            const email = req.body.email
            // const secondName = req.body.second_name !== '' ? req.body.second_name : 'Не указано'
            const salt = await bcrypt.genSaltSync(15)
            const password = await bcrypt.hashSync(req.body.password, salt)

            const sql = "INSERT INTO `users`(`name`, `email`, `password`) VALUES('" + name + "', '" + email + "', '" + password + "')";
            db.query(sql, (error, results) => {
                if (error) {
                    response.status(400, error, res)

                } else {
                    response.status(200, { message: `Регистрация прошла успешно.`, results }, res)
                }
            })
        }
    })
}




//Авторизация
exports.signin = (req, res) => {
    // Принимаемые данные email password
    db.query("SELECT `email`, `password`, `name` FROM `users` WHERE `email` = '" + req.body.email + "'", (error, rows, fields) => {
        if (error) {
            response.status(400, error, res)
        } else if (rows.length <= 0) {
            response.status(401, { message: `Пользователь с email - ${req.body.email} не найден. Пройдите регистрацию.` }, res)
        } else {
            const row = JSON.parse(JSON.stringify(rows))
            const user_name = row;  
            row.map(rw => {
                const password = bcrypt.compareSync(req.body.password, rw.password)
                if (password) {
                    //Если true мы пускаем юзера и генерируем токен
                    const token = jwt.sign({
                        userId: rw.id,
                        email: rw.email
                    }, config.jwt, { expiresIn: 120 * 120 })
                    // res.status(200, {token: `Bearer ${token}`})
                    // res.status(200).send({token: `Bearer ${token}`});
                    res.status(200).send(rows[0]);
                } else {
                    //Выкидываем ошибку что пароль не верный
                    response.status(401, { message: `Пароль не верный.` }, res)
                }
                return true
            })
        }
    })
}

exports.ckeckAdmin = (req, res) => {
    //const sql = `SELECT * FROM users WHERE email = ${req.body.email} && admin = 0`;
    db.query("SELECT * FROM users WHERE email = '" + req.body.email + "' && admin = 1" , (error, rows, result) =>{
        if(error){
            console.log(error)
        }else{
            console.log(rows.length)
            let result
            if (rows.length === 1) {
                result = {admin: true}
            } else {
                result = { admin: false }
            }
            response.status(200, result, res)
            
        }
    })
}

