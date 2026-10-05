import { body, param } from "express-validator";

export const crearCompatibilityMatchValidator = [
  body("user_id_1")
    .notEmpty().withMessage("El user_id_1 es obligatorio")
    .isMongoId().withMessage("El user_id_1 debe ser un ObjectId de MongoDB válido"),

  body("user_id_2")
    .notEmpty().withMessage("El user_id_2 es obligatorio")
    .isMongoId().withMessage("El user_id_2 debe ser un ObjectId de MongoDB válido")
    .custom((valor, { req }) => {
      if (valor === req.body.user_id_1) {
        throw new Error("El user_id_2 no puede ser igual al user_id_1");
      }
      return true;
    }),

  body("compatibility_score")
    .notEmpty().withMessage("El compatibility_score es obligatorio")
    .isFloat({ min: 0, max: 100 }).withMessage("El puntaje debe ser un número entre 0 y 100"),

  body("details")
    .trim()
    .notEmpty().withMessage("Los detalles son obligatorios")
    .isString().withMessage("Los detalles deben ser una cadena de texto")
];

export const actualizarCompatibilityMatchValidator = [
  body("user_id_1")
    .optional()
    .isMongoId().withMessage("El user_id_1 debe ser un ObjectId de MongoDB válido"),

  body("user_id_2")
    .optional()
    .isMongoId().withMessage("El user_id_2 debe ser un ObjectId de MongoDB válido")
    .custom((valor, { req }) => {
      if (req.body.user_id_1 && valor === req.body.user_id_1) {
        throw new Error("El user_id_2 no puede ser igual al user_id_1");
      }
      return true;
    }),

  body("compatibility_score")
    .optional()
    .isFloat({ min: 0, max: 100 }).withMessage("El puntaje debe ser un número entre 0 y 100"),

  body("details")
    .optional()
    .trim()
    .isString().withMessage("Los detalles deben ser una cadena de texto")
];

export const idValidator = [
  param("id")
    .isMongoId().withMessage("El id proporcionado no es un ObjectId válido de MongoDB")
];