import mongoose from "mongoose";

const esquemaLecturaNumerologica = new mongoose.Schema(
    {
        usuario_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "El identificador del usuario es obligatorio"],
        },
        tipo_lectura: {
            type: String,
            required: [true, "Se requiere especificar el tipo de lectura"],
            trim: true,
        },
        contenido: {
            type: String,
            required: [true, "El texto o resultado de la lectura es obligatorio"],
            trim: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Reading", esquemaLecturaNumerologica);