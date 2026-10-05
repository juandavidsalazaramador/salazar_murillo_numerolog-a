import { Router } from "express";
import { 
  crearPerfil, 
  listarPerfiles, 
  obtenerPerfil, 
  actualizarPerfil, 
  eliminarPerfil 
} from "../controllers/NumerologyProfiles.js";
import { 
  crearNumerologyProfileValidator, 
  actualizarNumerologyProfileValidator, 
  idValidator 
} from "../validators/NumerologyProfiles.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/Webtoken.js";

const router = Router();

router.get("/", listarPerfiles);
router.get("/:id", idValidator, validarCampos, obtenerPerfil);

router.post("/", validarJWT, crearNumerologyProfileValidator, validarCampos, crearPerfil);
router.put("/:id", validarJWT, idValidator, actualizarNumerologyProfileValidator, validarCampos, actualizarPerfil);
router.delete("/:id", validarJWT, idValidator, validarCampos, eliminarPerfil);

export default router;
