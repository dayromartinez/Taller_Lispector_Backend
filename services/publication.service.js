const { response } = require('express')
const Publicacion = require("../models/Publicacion");

const getAllPublicaciones = async(req, res = response)=>{

    try {

        let publicaciones = await Publicacion.find();
        if(publicaciones) return res.status(200).send({publicaciones})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const getPublicacion = async(req, res = response)=>{

    const { id } = req.params;

    try {

        let publicacion = await Publicacion.findOne({ id });
        if(publicacion) {
            return res.status(200).send({publicacion})
        }else{
            return res.status(404).send({ ok: false, msg: 'La publicación no existe'})
        }
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const crearPublicacion = async(req, res = response)=>{

    const { nombre, descripcion, numeroPaginas, anoLanzamiento, autores, generos, 
        urlDocumento, comentarios, codigosPublicacion } = req.body;

    try {

        let publicacion = await Publicacion.findOne({ nombre });
    
        if(publicacion) return res.status(400).send({ ok: false, msg: 'La publicación ya existe'})
    
        publicacion = new Publicacion(req.body)
        await publicacion.save()

        res.status(201).send({publicacion})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

module.exports={
    getAllPublicaciones,
    getPublicacion,
    crearPublicacion
}