const { response } = require('express')
const Sesion = require("../models/Sesion");
const Ciclo = require("../models/Ciclo")

const getAllCiclos = async(req, res = response) => {

    try {

        let ciclos = (await Ciclo.find()).reverse();
        if(ciclos) {
            let ciclosConSesiones = ciclos.map(async (ciclo) =>{
                let sesiones = await Sesion.find();
                let sesionesCiclo = sesiones.filter((sesion) => {
                    return sesion.cicloId === ciclo._id.toString()
                })

                if(sesionesCiclo.length > 0) ciclo.sesiones = sesionesCiclo;

            })

            return res.status(200).send({ciclosConSesiones})
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const getCiclo = async(req, res = response) => {

    const { _id } = req.params;

    try {

        let ciclo = await Ciclo.findOne({ _id });
        if(ciclo) {
            let sesiones = await Sesion.find();
            let sesionesCiclo = sesiones.filter((sesion) => {
                return sesion.cicloId === _id;
            })

            if(sesionesCiclo.length > 0) ciclo.sesiones = sesionesCiclo;

            return res.status(200).send({ciclo})

        }else{
            return res.status(404).send({ ok: false, msg: 'El ciclo no existe'})
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const crearCiclo = async(req, res = response)=>{

    const { titulo, descripcion, sesiones } = req.body;

    try {

        let ciclo = await Ciclo.findOne({ titulo });
    
        if(ciclo) return res.status(400).send({ ok: false, msg: 'El ciclo ya existe'})
    
        ciclo = new Ciclo(req.body)
        await ciclo.save()

        res.status(201).send({ciclo})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const actualizarCiclo = async(req, res = response) => {

    const { _id, titulo, descripcion, sesiones } = req.body;

    try {

        let ciclo = await Ciclo.findOne({ _id });
    
        if(ciclo) {

            cicloActualizado = new Ciclo(req.body)
            await ciclo.updateOne(cicloActualizado)
            res.status(200).send({cicloActualizado})

        }else{
            return res.status(400).send({ ok: false, msg: 'El ciclo no existe'})
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const deleteCiclo = async(req, res = response) => {

    const { _id } = req.params;

    try {

        let ciclo = await Ciclo.findOne({ _id });
        if(!ciclo) return res.status(400).send({ ok: false, msg: 'El ciclo no existe'})

        let sesiones = await Sesion.find();
        sesiones.forEach(async (sesion) => {
            if(sesion.cicloId === _id) await Sesion.findByIdAndDelete(sesion._id);
        })

        await Ciclo.findByIdAndDelete(_id);
        res.status(200).send({ ok: true, msg: 'El ciclo y sus sesiones han sido eliminados'})


    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

module.exports = {
    getAllCiclos,
    getCiclo,
    crearCiclo,
    actualizarCiclo,
    deleteCiclo
}
