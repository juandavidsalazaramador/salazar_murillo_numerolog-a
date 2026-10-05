import { body, param } from "express-validator";

export const crearReadingValidator = [
  body("usuario_id")
    .notEmpty().withMessage("El usuario_id es obligatorio")
    .isMongoId().withMessage("El usuario_id debe ser un ObjectId de MongoDB válido"),

  body("tipo_lectura")
    .trim()
    .notEmpty().withMessage("El tipo de lectura es obligatorio")
    .isString().withMessage("El tipo de lectura debe ser una cadena de texto"),

  body("contenido")
    .trim()
    .notEmpty().withMessage("El contenido de la lectura es obligatorio")
    .isString().withMessage("El contenido debe ser una cadena de texto")
];

export const actualizarReadingValidator = [
  body("usuario_id")
    .optional()
    .isMongoId().withMessage("El usuario_id debe ser un ObjectId de MongoDB válido"),

  body("tipo_lectura")
    .optional()
    .trim()
    .isString().withMessage("El tipo de lectura debe ser una cadena de texto"),

  body("contenido")
    .optional()
    .trim()
    .isString().withMessage("El contenido debe ser una cadena de texto")
];

export const idValidator = [
  param("id")
    .isMongoId().withMessage("El id proporcionado no es un ObjectId válido de MongoDB")
];