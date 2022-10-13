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





// exports.sendData = (req, res)=>{
//     let resultFromGetData = JSON.stringify(data.getData())
//     response.status(200, {resultFromGetData})
// }



// exports.test_api = (req, res)=>{
//     const sql = "SELECT * FROM `betting_user`";
//     db.query(sql, (error, rows, result) =>{
//         if(error){
//             console.log(error)
//         }else{
//             console.log(error)
//             console.log(result)
//             response.status(200, rows, res)
//         }
//     })
// }



// exports.parse = (req, res) =>{
//     res.status(200).send(ro);
//     run_python.sendToPython()
// }
// exports.getAllUsers = (req, res) => {
//
//     db.query('SELECT `id`, `name`, `second_name`, `email` FROM `users`', (error, rows, fields) => {
//         if(error) {
//             response.status(400, error, res)
//         } else {
//             response.status(200, rows, res)
//         }
//     })
//
// }

// exports.form = (req, res) =>{
//     db.query('SELECT form.ID, users.name, users.email, form.Date, form.Description FROM form  INNER JOIN users ON form.ID_user = users.id ', (error, rows, fields) => {
//         if(error){
//             console.log(error);
//         }else{
//             response.status(200, rows, res)
//         }
//     })
// }
//
// exports.form_add = (req, res) => {
//     const sql = "INSERT INTO `form` (`ID_user`, `Description`, `Date`) VALUES('"+ req.body.ID_user +"', '"+ req.body.Description +"', '"+ req.body.Date +"')";
//     console.log(req.body.ID_user);
//     db.query(sql, (error, rows, result) =>{
//         if(error){
//             console.log(error)
//         }else{
//             console.log(error)
//             console.log(result)
//             response.status(200, rows, res)
//         }
//     })
//
// }
//
// exports.form_delete = (req, res) => {
//     const sql = "DELETE FROM form WHERE ID = '"+ req.body.ID +"'";
//     console.log(req.body.ID);
//     db.query(sql, (error, rows, result) =>{
//         if(error){
//             console.log(error)
//         }else{
//             console.log(error)
//             console.log(result)
//             response.status(200, rows, res)
//         }
//     })
//
// }



// exports.take_form = (req, res) => {
//     const sql = "SELECT Description FROM form WHERE ID_user = '"+ req.body.ID_USER"'";
//     console.log(req.body.ID_user);
//     db.query(sql, (error, rows, result) =>{
//         if(error){
//             console.log(error)
//         }else{
//             console.log(error)
//             console.log(result)
//             response.status(200, rows, res)
//         }
//     })

//}
