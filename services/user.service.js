const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const usuarioModel = require('../models/Usuario');

const login = async (req, res = response, next) => {

    const { email, password } = req.body;
    const user = await usuarioModel.findOne({ email });

    if( !user ){
        await res.status(401).json({ message: 'Usuario no existe.' })
    } else {

        if( !bcrypt.compareSync(password, user.password) ){
            await res.status(401).json({ message: 'Contraseña incorrecta' })
        }else {
            const token = jwt.sign({
                email: user.email,
                name: user.name,
                id: user._id
            }, 'L14V3S3CR3T4A', {
                expiresIn: '4h',
            });

            res.json({ token });
        }

    }

}

const register = async (req, res = response) => {

    const user = new usuarioModel(req.body);
    user.password = await bcrypt.hash(req.body.password, 10);
    try {
        await user.save();
        res.json({ message: `Usuario guardado: ${req.body}` })
    } catch (error) {
        console.log(error);
        res.json({message: 'Ocurrio un error'})
    }

}

module.exports = {
    login,
    register
}