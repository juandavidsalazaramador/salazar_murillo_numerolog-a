import NumerologyProfile from "../models/NumerologyProfiles.js";

export const crearPerfil = async (req, res) => {
    try {
        const perfil = await NumerologyProfile.create(req.body);
        return res.status(201).json(perfil);
    } catch (err) {
        return res.status(400).json({ 
            message: "No se pudo crear el perfil numerológico", 
            error: err.message 
        });
    }
};

export const listarPerfiles = async (req, res) => {
    try {
        const perfiles = await NumerologyProfile.find({});
        return res.status(200).json(perfiles);
    } catch (err) {
        return res.status(500).json({ 
            message: "Error al listar los perfiles", 
            error: err.message 
        });
    }
};

export const obtenerPerfil = async (req, res) => {
    try {
        const perfil = await NumerologyProfile.findById(req.params.id);
        if (!perfil) {
            return res.status(404).json({ 
                message: "Perfil numerológico no hallado" 
            });
        }
        return res.status(200).json(perfil);
    } catch (err) {
        return res.status(500).json({ 
            message: "Error al buscar el perfil", 
            error: err.message 
        });
    }
};

export const actualizarPerfil = async (req, res) => {
    try {
        const perfilModificado = await NumerologyProfile.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!perfilModificado) {
            return res.status(404).json({ 
                message: "Perfil no encontrado para actualizar" 
            });
        }
        return res.status(200).json(perfilModificado);
    } catch (err) {
        return res.status(400).json({ 
            message: "Error al actualizar el perfil", 
            error: err.message 
        });
    }
};

export const eliminarPerfil = async (req, res) => {
    try {
        const perfilBorrado = await NumerologyProfile.findByIdAndDelete(req.params.id);
        if (!perfilBorrado) {
            return res.status(404).json({ 
                message: "Perfil no encontrado para eliminar" 
            });
        }
        return res.status(200).json({ 
            message: "Perfil eliminado con éxito" 
        });
    } catch (err) {
        return res.status(500).json({ 
            message: "Error al eliminar el perfil", 
            error: err.message 
        });
    }
};