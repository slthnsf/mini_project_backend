const { db, dbQuery, createToken } = require('../config')

module.exports = {
    register: async (req, res, next) => {
        try {
            if (req.body.username.length >= 6 && req.body.email.includes('@') && req.body.password.length >= 6 && req.body.password.match(/[a-z]/ig) && req.body.password.match(/[0-9]/ig)){
                let insertSQL = `Insert into users (username, nama, email, password) 
                values (${db.escape(req.body.username)}, ${db.escape(req.body.nama)}, ${db.escape(req.body.email)}, ${db.escape(req.body.password)});`
                let regis = await dbQuery(insertSQL)
                let getUser = await dbQuery(`Select * from users where idusers = ${regis.insertId}`)
                let { idusers, username, nama, email, password, idrole } = getUser[0]

                //TOKEN
                let token = createToken({ idusers, username, nama, email, password, idrole })

                res.status(201).send({ idusers, username, nama, email, password, idrole, token })
            } else {
                res.status(500).send("Email and Password Invalid")
            }
        } catch (error) {
            next(error)
        }
    },
    login: async (req, res, next) => {
        try {
            if (req.body.email && req.body.password){
                let loginSQL = `Select * from users where email = ${db.escape(req.body.email)} and password = ${db.escape(req.body.password)};`
                loginSQL = await dbQuery(loginSQL)

                let getUser = await dbQuery(`Select * from users where idusers = ${loginSQL[0].idusers}`)
                let { idusers, username, nama, email, password, idrole } = getUser[0]

                //TOKEN
                let token = createToken({ idusers, username, nama, email, password, idrole })

                res.status(200).send({ idusers, username, nama, email, password, idrole, token })
            }
        } catch (error) {
            next(error)
        }
    },
    keepLogin: async (req, res, next) => {
        try {
            if (req.user.idusers) {
                let getUser = `Select * from users where idusers =${db.escape(req.user.idusers)};`
                getUser = await dbQuery(getUser)
                let { idusers, username, nama, email, password, idrole } = getUser[0]
                //TOKEN
                let token = createToken({ idusers, username, nama, email, password, idrole })
                res.status(200).send({ idusers, username, nama, email, password, idrole, token })
            }
        } catch (error) {
            next(error)
        }
    },
    getUsers: async (req, res, next) => {
        try {
            let getSQL, dataSearch = []
            for (let prop in req.query) {
                dataSearch.push(`${prop} = ${db.escape(req.query[prop])}`)
            }
            console.log(dataSearch.join(' AND '))
            if (dataSearch.length > 0) {
                getSQL = `Select * from users where ${dataSearch.join(' AND ')};`
            } else {
                getSQL = `Select * from users;`
            }
            let get = await dbQuery(getSQL)
            res.status(200).send(get)
        } catch (error) {
            next(error)
        }
    },
    addKurir: async (req, res, next) => {
        try {
            if (req.body.username.length >= 6 && req.body.email.includes('@') && req.body.password.length >= 6 && req.body.password.match(/[a-z]/ig) && req.body.password.match(/[0-9]/ig)) {
                let insertSQL = `Insert into users (username, nama, email, password, idrole) 
                values (${db.escape(req.body.username)}, ${db.escape(req.body.nama)}, ${db.escape(req.body.email)}, ${db.escape(req.body.password)}, ${req.body.idrole});`
                let regis = await dbQuery(insertSQL)
                let getUser = await dbQuery(`Select * from users where idusers = ${regis.insertId}`)
                let { idusers, username, nama, email, password, idrole } = getUser[0]
                //TOKEN
                let token = createToken({ idusers, username, nama, email, password, idrole })
                res.status(201).send({ idusers, username, nama, email, password, idrole, token })
            }
        } catch (error) {
            next(error)
        }
    }
}