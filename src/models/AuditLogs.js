import mongoose from "mongoose";

const esquemaRegistroAuditoria = new mongoose.Schema(
    {
        endpoint: {
            type: String,
            required: [true, "La ruta del endpoint es requerida"],
            trim: true,
        },
        metodo: {
            type: String,
            required: [true, "Se requiere especificar el método HTTP"],
            uppercase: true,
            enum: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        },
        status_code: {
            type: Number,
            required: [true, "El código de estado es obligatorio"],
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    { timestamps: true }
);

export default mongoose.model("AuditLog", esquemaRegistroAuditoria);