import CoincidenciaModelo from "../models/CompatibilityMatches.js";

export const guardarCoincidencia = async (peticion, respuesta) => {
    try {
        const { user_id_1, user_id_2, compatibility_score, details } = peticion.body;

        const nuevaCoincidencia = await CoincidenciaModelo.create({
            user_id_1,
            user_id_2,
            compatibility_score,
            details
        });

        return respuesta.status(201).json(nuevaCoincidencia);
    } catch (fallo) {
        return respuesta.status(400).json({
            mensaje: "No se pudo registrar la coincidencia de compatibilidad",
            detalle: fallo.message
        });
    }
};

export const listarCoincidencias = async (peticion, respuesta) => {
    try {
        const listaCompleta = await CoincidenciaModelo.find({});
        return respuesta.status(200).json(listaCompleta);
    } catch (fallo) {
        return respuesta.status(500).json({
            mensaje: "Error al listar las coincidencias",
            detalle: fallo.message
        });
    }
};

export const buscarCoincidenciaPorId = async (peticion, respuesta) => {
    try {
        const { id } = peticion.params;
        const coincidenciaHallada = await CoincidenciaModelo.findById(id);

        if (!coincidenciaHallada) {
            return respuesta.status(404).json({
                mensaje: "Coincidencia de compatibilidad no localizada"
            });
        }

        return respuesta.status(200).json(coincidenciaHallada);
    } catch (fallo) {
        return respuesta.status(500).json({
            mensaje: "Fallo al consultar la coincidencia",
            detalle: fallo.message
        });
    }
};

export const modificarCoincidencia = async (peticion, respuesta) => {
    try {
        const { id } = peticion.params;
        const datosNuevos = peticion.body;

        const coincidenciaActualizada = await CoincidenciaModelo.findByIdAndUpdate(
            id,
            datosNuevos,
            { new: true, runValidators: true }
        );

        if (!coincidenciaActualizada) {
            return respuesta.status(404).json({
                mensaje: "Coincidencia no encontrada para su actualización"
            });
        }

        return respuesta.status(200).json(coincidenciaActualizada);
    } catch (fallo) {
        return respuesta.status(400).json({
            mensaje: "Error al actualizar la coincidencia de compatibilidad",
            detalle: fallo.message
        });
    }
};

export const eliminarCoincidencia = async (peticion, respuesta) => {
    try {
        const { id } = peticion.params;
        const coincidenciaBorrada = await CoincidenciaModelo.findByIdAndDelete(id);

        if (!coincidenciaBorrada) {
            return respuesta.status(404).json({
                mensaje: "No se encontró la coincidencia que se desea eliminar"
            });
        }

        return respuesta.status(200).json({
            mensaje: "Coincidencia de compatibilidad eliminada de forma exitosa"
        });
    } catch (fallo) {
        return respuesta.status(500).json({
            mensaje: "Error al intentar borrar la coincidencia",
            detalle: fallo.message
        });
    }
};