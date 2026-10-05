import mongoose from "mongoose";

const esquemaPerfilNumerologico = new mongoose.Schema(
    {
        usuario_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Se requiere el identificador del usuario"],
        },
        numero_vida: {
            type: Number,
            required: [true, "El campo número de vida es requerido"],
            min: [1, "El valor mínimo permitido es 1"],
        },
        numero_expresion: {
            type: Number,
            required: [true, "El campo número de expresión es requerido"],
            min: [1, "El valor mínimo permitido es 1"],
        },
        numero_alma: {
            type: Number,
            required: [true, "El campo número de alma es requerido"],
            min: [1, "El valor mínimo permitido es 1"],
        },
    },
    { timestamps: true }
);

export default mongoose.model("NumerologyProfile", esquemaPerfilNumerologico);