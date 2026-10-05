import { Router } from "express";
import { 
  registrarAccion, 
  obtenerTodosLosRegistros, 
  buscarRegistroPorId, 
  modificarRegistro, 
  borrarRegistro 
} from "../controllers/AuditLogs.js";
import { 
  crearAuditLogValidator, 
  actualizarAuditLogValidator, 
  idValidator 
} from "../validators/AuditLogs.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/Webtoken.js";

const router = Router();

router.use(validarJWT);

router.get("/", obtenerTodosLosRegistros);
router.get("/:id", idValidator, validarCampos, buscarRegistroPorId);
router.post("/", crearAuditLogValidator, validarCampos, registrarAccion);
router.put("/:id", idValidator, actualizarAuditLogValidator, validarCampos, modificarRegistro);
router.delete("/:id", idValidator, validarCampos, borrarRegistro);

export default router;
