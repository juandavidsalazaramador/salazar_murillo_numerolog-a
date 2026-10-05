import RegistroAuditoria from "../models/AuditLogs.js";

export const registrarAccion = async (req, res) => {
    try {
        const datosEntrada = req.body;
        const nuevoRegistro = new RegistroAuditoria(datosEntrada);
        const resultadoGuardado = await nuevoRegistro.save();
        
        return res.status(201).json(resultadoGuardado);
    } catch (fallo) {
        return res.status(400).json({
            mensaje: "No se pudo registrar la auditoría",
            detalle: fallo.message
        });
    }
};

export const obtenerTodosLosRegistros = async (req, res) => {
    try {
        const listaRegistros = await RegistroAuditoria.find({});
        return res.status(200).json(listaRegistros);
    } catch (fallo) {
        return res.status(500).json({
            mensaje: "Fallo al consultar los registros de auditoría",
            detalle: fallo.message
        });
    }
};

export const buscarRegistroPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const registroEncontrado = await RegistroAuditoria.findById(id);

        if (!registroEncontrado) {
            return res.status(404).json({
                mensaje: "El registro de auditoría especificado no existe"
            });
        }

        return res.status(200).json(registroEncontrado);
    } catch (fallo) {
        return res.status(500).json({
            mensaje: "Fallo al buscar el registro",
            detalle: fallo.message
        });
    }
};

export const modificarRegistro = async (req, res) => {
    try {
        const { id } = req.params;
        const actualizacion = req.body;

        const registroActualizado = await RegistroAuditoria.findByIdAndUpdate(
            id,
            actualizacion,
            { new: true, runValidators: true }
        );

        if (!registroActualizado) {
            return res.status(404).json({
                mensaje: "El registro a modificar no fue encontrado"
            });
        }

        return res.status(200).json(registroActualizado);
    } catch (fallo) {
        return res.status(400).json({
            mensaje: "Error al actualizar el registro de auditoría",
            detalle: fallo.message
        });
    }
};

export const borrarRegistro = async (req, res) => {
    try {
        const { id } = req.params;
        const registroEliminado = await RegistroAuditoria.findByIdAndDelete(id);

        if (!registroEliminado) {
            return res.status(404).json({
                mensaje: "No se encontró el registro para eliminar"
            });
        }

        return res.status(200).json({
            mensaje: "Registro de auditoría borrado con éxito"
        });
    } catch (fallo) {
        return res.status(500).json({
            mensaje: "Error al intentar eliminar el registro",
            detalle: fallo.message
        });
    }
};