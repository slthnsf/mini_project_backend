const { db, dbQuery } = require('../config')

module.exports = {
    addData: async (req, res, next) => {
        try {
            let { namabarang, beratbarang, namapenerima, namapengirim, alamat, kotapenerima, harga, resi, kotaasal, telppenerima } = req.body
            let add = `Insert into data (namabarang, beratbarang, namapenerima, namapengirim, alamat, kotapenerima, harga, resi, kotaasal, telppenerima)
            values (${db.escape(namabarang)}, ${db.escape(beratbarang)}, ${db.escape(namapenerima)}, ${db.escape(namapengirim)}, ${db.escape(alamat)},
            ${db.escape(kotapenerima)}, ${db.escape(harga)}, ${db.escape(resi)}, ${db.escape(kotaasal)}, ${db.escape(telppenerima)});`
            add = await dbQuery(add)
            res.status(201).send(add)
        } catch (error) {
            next(error)
        }
    },
    addPengiriman: async (req, res, next) => {
        try {
            let { idusers, iddata, idstatus, resi } = req.body
            let add = `Insert into pengiriman (idusers, iddata, idstatus, resi) 
            values (${idusers}, ${iddata}, ${idstatus}, ${db.escape(resi)});`
            add = await dbQuery(add)
            res.status(201).send(add)
        } catch (error) {
            next(error)
        }
    },
    addStatusPengiriman: async (req, res, next) => {
        try {
            // let getResi = `Select p.resi from pengiriman p where iduser = ${req.user.iduser}`
            // getResi = await dbQuery(getResi)
            let add = `Insert into status (resi, status) values (${req.body.resi}, ${req.body.status});`
            add = await dbQuery(add)
            res.status(200).send(add)
        } catch (error) {
            next(error)
        }
    },
    lacakPengiriman: async (req, res, next) => {
        try {
            let lacak = `Select s.status from status s where resi = ${req.body.resi}`
            lacak = await dbQuery(lacak)
            res.status(200).send(lacak)
        } catch (error) {
            next(error)
        }
    }
}