import { Router } from "express";
import { 
  guardarCoincidencia, 
  listarCoincidencias, 
  buscarCoincidenciaPorId, 
  modificarCoincidencia, 
  eliminarCoincidencia 
} from "../controllers/CompatibilityMatches.js";
import { 
  crearCompatibilityMatchValidator, 
  actualizarCompatibilityMatchValidator, 
  idValidator 
} from "../validators/CompatibilityMatches.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/Webtoken.js";

const router = Router();

router.get("/", listarCoincidencias);
router.get("/:id", idValidator, validarCampos, buscarCoincidenciaPorId);

router.post("/", validarJWT, crearCompatibilityMatchValidator, validarCampos, guardarCoincidencia);
router.put("/:id", validarJWT, idValidator, actualizarCompatibilityMatchValidator, validarCampos, modificarCoincidencia);
router.delete("/:id", validarJWT, idValidator, validarCampos, eliminarCoincidencia);

export default router;
