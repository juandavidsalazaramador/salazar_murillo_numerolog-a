import { Router } from "express";
import { 
  registrarUsuario, 
  loginUsuario, 
  obtenerUsuarios, 
  obtenerUsuarioPorId, 
  actualizarUsuario, 
  eliminarUsuario 
} from "../controllers/Users.js";
import { 
  crearUserValidator, 
  actualizarUserValidator, 
  idValidator 
} from "../validators/Users.js"; 
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/Webtoken.js";

const router = Router();

router.post("/", crearUserValidator, validarCampos, registrarUsuario);
router.post("/login", loginUsuario); 

router.get("/", validarJWT, obtenerUsuarios);
router.get("/:id", validarJWT, idValidator, validarCampos, obtenerUsuarioPorId);
router.put("/:id", validarJWT, idValidator, actualizarUserValidator, validarCampos, actualizarUsuario);
router.delete("/:id", validarJWT, idValidator, validarCampos, eliminarUsuario);

export default router;
