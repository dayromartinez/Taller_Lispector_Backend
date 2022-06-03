const { response } = require('express')
const Publicacion = require("../models/Publicacion");
const Usuario = require("../models/Usuario");

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

const actualizarPublicacion = async(req, res = response)=>{

    const { _id, nombre, descripcion, numeroPaginas, anoLanzamiento, autores, generos, 
        urlDocumento, comentarios, codigosPublicacion } = req.body;

    try {

        let publicacion = await Publicacion.findOne({ _id });
    
        if(publicacion) {
            publicacionActualizada = new Publicacion(req.body)
            await publicacion.updateOne(publicacionActualizada)
            res.status(200).send({publicacionActualizada})
        }else{
            return res.status(400).send({ ok: false, msg: 'La publicación no existe'})
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const reservarCodigoPublicacion = async(req, res = response)=>{

    const { _id, uid, nombre, codigoPublicacion } = req.body;
    let match = false;

    try {

        let publicacion = await Publicacion.findOne({ _id });
        let usuario = await Usuario.findOne({ _id: uid });
    
        if(publicacion && usuario) {

            publicacion.codigosPublicacion.forEach(codigo => {

                if(nombre !== publicacion.nombre){
                    return res.status(400).send({ ok: false, msg: 'El nombre de la publicación no coincide'})
                }

                if(nombre === codigo.publicacion && codigo.codigoPublicacion === codigoPublicacion
                    && codigo.enUso === false) {

                    codigo.enUso = true
                    usuario.postalPublicationCode = codigo.codigoPublicacion
                    match = true

                }else if(nombre === codigo.publicacion && codigo.codigoPublicacion === codigoPublicacion
                    && codigo.enUso === true) {
                    return res.status(400).send({ ok: false, msg: 'Este código de publicación ya está en uso'})
                }
            });

            if(!match) {
                return res.status(400).send({ ok: false, msg: 'El código de publicación ingresado no existe'})
            }

            publicacionActualizada = new Publicacion(publicacion)
            await publicacion.updateOne(publicacionActualizada)
            usuarioActualizado = new Usuario(usuario)
            await usuario.updateOne(usuarioActualizado)
            res.status(200).send("La reserva del código de la publicación ha sido realizada con éxito")

        }else{
            return res.status(400).send({ ok: false, msg: 'La publicación o el usuario no existen'})
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

module.exports={
    getAllPublicaciones,
    getPublicacion,
    crearPublicacion,
    actualizarPublicacion,
    reservarCodigoPublicacion
}