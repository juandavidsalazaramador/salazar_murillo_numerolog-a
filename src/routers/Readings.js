import { Router } from "express";
import { 
  generarLectura, 
  obtenerLecturas, 
  obtenerLecturaPorId, 
  actualizarLectura, 
  eliminarLectura 
} from "../controllers/Readings.js";
import { 
  crearReadingValidator, 
  actualizarReadingValidator, 
  idValidator 
} from "../validators/Readings.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/Webtoken.js";

const router = Router();

router.get("/", (req, res, next) => {
    console.log("--- ¡PASÓ POR EL ROUTER DE READINGS! ---");
    next();
}, obtenerLecturas);

router.get("/:id", idValidator, validarCampos, obtenerLecturaPorId);

router.post("/", validarJWT, crearReadingValidator, validarCampos, generarLectura);
router.put("/:id", validarJWT, idValidator, actualizarReadingValidator, validarCampos, actualizarLectura);
router.delete("/:id", validarJWT, idValidator, validarCampos, eliminarLectura);

export default router;