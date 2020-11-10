const e = require('express')
const Model = require('../models/model')

class Controller {
    static getViewAllShirts(req, res) {
        Model.viewAllShirt( (err, data) => {
            if (err) {
                res.render('fatalError', { err })
            } else {
                res.render('shirts', { data, status: req.query.status }) // Tampilkan semua shirts
            }
        })
    }

    static redirectToHome(req, res) {
        res.redirect('/')
    }

    static getAddShirtForm(req, res) {
        const error = req.query.error
        res.render('shirtAdd', { error })
    }

    static postAddShirtForm(req, res) {
        Model.sendShirtToDb( req.body, (err, validation) => {
            if (err) {
                res.render('fatalError', { err })
            } else if (validation) {
                res.redirect(`/shirts/add?error=${validation}`) // Gagal Add
            } else {
                res.redirect(`/?status=Berhasil menambahkan data baru`) // Berhasil add
            }
        })
    }

    static getEditShirtByIdForm(req, res) {
        const id = +req.params.id
        const error = req.query.error
        Model.getShirtFromDb(id, (err, notFound, data) => {
            if (err) {
                res.render('fatalError', { err })
            } else if (notFound) {
                res.render('404') // Jika id tidak ditemukan
            } else {
                res.render('shirtEdit', { id, error, data }) // Jika id ditemukan
            }
        })
    }

    static postEditShirtByIdForm(req, res) {
        Model.updateShirtToDb( req.body, +req.params.id, (err, validation) => {
            if (err) {
                res.render('fatalError', { err })
            } else if (validation) {
                res.redirect(`/shirts/edit/${req.params.id}?error=${validation}`) // Gagal edit
            } else {
                res.redirect(`/?status=Edit data shirt dengan id ${req.params.id} Berhasil`) // Berhasil edit
            }
        })
    }

    static getDeleteShirtById(req, res) {
        Model.deleteShirtById(+req.params.id, (err, stockFalse, notFound) => {
            if (err) {
                res.render('fatalError', { err })
            } else if (notFound) {
                res.render('404') // Jika id tidak ditemukan
            } else if (stockFalse) {
                res.redirect(`/?status=Stock harus 0`) // Jika stock tidak 0
            } else {
                res.redirect(`/?status=Berhasil menghapus data shirt dengan ID ${req.params.id}`) // Jika Berhasil delete
            }
        })
    }
}

module.exports = Controller