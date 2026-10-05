import Reading from "../models/Readings.js";

export const generarLectura = async (solicitud, respuesta) => {
    try {
        const nuevaLectura = new Reading(solicitud.body);
        const guardado = await nuevaLectura.save();
        return respuesta.status(201).json(guardado);
    } catch (err) {
        return respuesta.status(400).json({ 
            descripcion: "Fallo al generar la lectura", 
            error: err.message 
        });
    }
};

export const obtenerLecturas = async (solicitud, respuesta) => {
    try {
        console.log("-> LLEGÓ AL CONTROLADOR DE READINGS");
        const listado = await Reading.find();
        return respuesta.status(200).json(listado);
    } catch (err) {
        return respuesta.status(500).json({ 
            descripcion: "Fallo al obtener las lecturas", 
            error: err.message 
        });
    }
};

export const obtenerLecturaPorId = async (solicitud, respuesta) => {
    try {
        const lectura = await Reading.findById(solicitud.params.id);
        if (!lectura) {
            return respuesta.status(404).json({ 
                descripcion: "Lectura no encontrada" 
            });
        }
        return respuesta.status(200).json(lectura);
    } catch (err) {
        return respuesta.status(500).json({ 
            descripcion: "Fallo al buscar la lectura", 
            error: err.message 
        });
    }
};

export const actualizarLectura = async (solicitud, respuesta) => {
    try {
        const lecturaActualizada = await Reading.findByIdAndUpdate(
            solicitud.params.id, 
            solicitud.body, 
            { new: true, runValidators: true }
        );
        if (!lecturaActualizada) {
            return respuesta.status(404).json({ 
                descripcion: "Lectura no encontrada para actualizar" 
            });
        }
        return respuesta.status(200).json(lecturaActualizada);
    } catch (err) {
        return respuesta.status(400).json({ 
            descripcion: "Fallo al actualizar la lectura", 
            error: err.message 
        });
    }
};

export const eliminarLectura = async (solicitud, respuesta) => {
    try {
        const lecturaEliminada = await Reading.findByIdAndDelete(solicitud.params.id);
        if (!lecturaEliminada) {
            return respuesta.status(404).json({ 
                descripcion: "Lectura no encontrada para eliminar" 
            });
        }
        return respuesta.status(200).json({ 
            descripcion: "Lectura eliminada exitosamente" 
        });
    } catch (err) {
        return respuesta.status(500).json({ 
            descripcion: "Fallo al eliminar la lectura", 
            error: err.message 
        });
    }
};