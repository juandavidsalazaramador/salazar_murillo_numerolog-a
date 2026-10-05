import bcrypt from "bcryptjs";
import User from "../models/Users.js";
import { generarJWT } from "../middlewares/Webtoken.js";

export const registrarUsuario = async (peticion, respuesta) => {
    try {
        const { nombre_completo, email, password_hash, fecha_nacimiento } = peticion.body;

        const salt = bcrypt.genSaltSync();
        const passwordEncriptado = bcrypt.hashSync(password_hash, salt);

        const nuevoUser = new User({
            nombre_completo,
            email,
            password_hash: passwordEncriptado,
            fecha_nacimiento
        });
        const guardado = await nuevoUser.save();

        const usuarioSinPassword = guardado.toObject();
        delete usuarioSinPassword.password_hash;

        return respuesta.status(201).json(usuarioSinPassword);
    } catch (error) {
        return respuesta.status(400).json({ 
            mensaje: "Error al registrar el usuario", 
            detalle: error.message 
        });
    }
};

export const loginUsuario = async (peticion, respuesta) => {
    try {
        const { email, password_hash } = peticion.body;

        const usuario = await User.findOne({ email });
        if (!usuario) {
            return respuesta.status(400).json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        const passwordValida = bcrypt.compareSync(password_hash, usuario.password_hash);
        if (!passwordValida) {
            return respuesta.status(400).json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        const token = await generarJWT(usuario._id);

        return respuesta.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            usuario: {
                _id: usuario._id,
                nombre_completo: usuario.nombre_completo,
                email: usuario.email
            },
            token
        });
    } catch (error) {
        return respuesta.status(500).json({
            mensaje: "Error al iniciar sesión",
            detalle: error.message
        });
    }
};

export const obtenerUsuarios = async (peticion, respuesta) => {
    try {
        const usuarios = await User.find();
        return respuesta.status(200).json(usuarios);
    } catch (error) {
        return respuesta.status(500).json({ 
            mensaje: "Error al obtener los usuarios", 
            detalle: error.message 
        });
    }
};

export const obtenerUsuarioPorId = async (peticion, respuesta) => {
    try {
        const user = await User.findById(peticion.params.id);
        if (!user) {
            return respuesta.status(404).json({ 
                mensaje: "Usuario no encontrado" 
            });
        }
        return respuesta.status(200).json(user);
    } catch (error) {
        return respuesta.status(500).json({ 
            mensaje: "Error al buscar el usuario", 
            detalle: error.message 
        });
    }
};

export const actualizarUsuario = async (peticion, respuesta) => {
    try {
        const userActualizado = await User.findByIdAndUpdate(
            peticion.params.id, 
            peticion.body, 
            { new: true, runValidators: true }
        );
        if (!userActualizado) {
            return respuesta.status(404).json({ 
                mensaje: "Usuario no encontrado para actualizar" 
            });
        }
        return respuesta.status(200).json(userActualizado);
    } catch (error) {
        return respuesta.status(400).json({ 
            mensaje: "Error al actualizar el usuario", 
            detalle: error.message 
        });
    }
};

export const eliminarUsuario = async (peticion, respuesta) => {
    try {
        const userEliminado = await User.findByIdAndDelete(peticion.params.id);
        if (!userEliminado) {
            return respuesta.status(404).json({ 
                mensaje: "Usuario no encontrado para eliminar" 
            });
        }
        return respuesta.status(200).json({ 
            mensaje: "Usuario eliminado correctamente" 
        });
    } catch (error) {
        return respuesta.status(500).json({ 
            mensaje: "Error al eliminar el usuario", 
            detalle: error.message 
        });
    }
};