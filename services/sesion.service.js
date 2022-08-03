const { response } = require('express')
const Sesion = require("../models/Sesion");

const getAllSesiones = async(req, res = response) => {

    try {

        let sesiones = (await Sesion.find()).reverse();
        if(sesiones) return res.status(200).send({sesiones})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const getSesionesCiclo = async(req, res = response) => {

    const { ciclo } = req.params;

    try {

        let sesionesCiclo = (await Sesion.find({ ciclo })).reverse();
        if(sesionesCiclo) return res.status(200).send({sesionesCiclo})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const getSesion = async(req, res = response) => {

    const { id } = req.params;

    try {

        let sesion = await Sesion.findOne({ _id: id });
        if(sesion) {
            return res.status(200).send({sesion})
        }else{
            return res.status(404).send({ ok: false, msg: 'La sesión no existe'})
        }
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const crearSesion = async(req, res = response)=>{

    const { titulo, descripcion, fecha, hora, direccionSesion, gestores, 
        ciclo, imagenSesion } = req.body;

    try {

        let sesion = await Sesion.findOne({ titulo });
    
        if(sesion) return res.status(400).send({ ok: false, msg: 'La sesión ya existe'})
    
        sesion = new Sesion(req.body)
        await sesion.save()

        res.status(201).send({sesion})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const actualizarSesion = async(req, res = response) => {

    const { _id, titulo, descripcion, fecha, hora, direccionSesion, gestores, 
        ciclo, imagenSesion } = req.body;

    try {

        let sesion = await Sesion.findOne({ _id });
    
        if(sesion) {

            sesionActualizada = new Sesion(req.body)
            await sesion.updateOne(sesionActualizada)
            res.status(200).send({sesionActualizada})

        }else{
            return res.status(400).send({ ok: false, msg: 'La sesión no existe'})
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const deleteSesion = async(req, res = response) => {

    const { id } = req.params;

    try {

        let sesion = await Sesion.findByIdAndDelete({ _id: id });
        if(sesion) {
            return res.status(200).send('La sesión ha sido eliminada')
        }else{
            return res.status(404).send({ ok: false, msg: 'La sesión no existe'})
        }
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

module.exports = {
    getAllSesiones,
    getSesionesCiclo,
    getSesion,
    crearSesion,
    actualizarSesion,
    deleteSesion
}