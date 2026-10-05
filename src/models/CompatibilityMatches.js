import mongoose from "mongoose";

const esquemaCoincidenciaVinculo = new mongoose.Schema(
    {
        user_id_1: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Se requiere el identificador del primer usuario"],
        },
        user_id_2: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Se requiere el identificador del segundo usuario"],
        },
        compatibility_score: {
            type: Number,
            required: [true, "El valor de compatibilidad es obligatorio"],
            min: [0, "El límite inferior es 0"],
            max: [100, "El límite superior es 100"],
        },
        details: {
            type: String,
            required: [true, "Los detalles de la coincidencia son obligatorios"],
            trim: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("CompatibilityMatch", esquemaCoincidenciaVinculo);