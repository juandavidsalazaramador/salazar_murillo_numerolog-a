## Bloque 1 — El viaje de una petición

### Reto 1.1 — El mapa (Ruta GET con `.find()`)

1. **Cliente (Postman / Frontend)**
   * **Archivo y línea:** N/A (Cliente HTTP externo).
   * **Qué hace:** Envía una petición HTTP de tipo `GET` a la URL del servidor (`http://localhost:3000/api/v1/readings`) pidiendo la lista de todas las lecturas de numerología guardadas.
   * **Qué le entrega a la siguiente:** Una solicitud HTTP a través de TCP/IP dirigida al puerto `3000` del servidor.

2. **Servidor Express (Punto de entrada)**
   * **Archivo y línea:** `index.js`, Línea 28
   * **Código de referencia:**
     ```javascript
     app.use("/api/v1/readings", ReadingsRoutes);
     ```
   * **Qué hace:** Recibe la petición HTTP, la hace pasar por los middlewares globales como `express.json()` (Línea 22) y `cors()` (Línea 21), y redirige la solicitud al enrutador específico de lecturas.
   * **Qué le entrega a la siguiente:** Los objetos `req` (petición) y `res` (respuesta) hacia el archivo del router.

3. **Enrutador de Express (`routers`)**
   * **Archivo y línea:** `src/routers/Readings.js`, Línea X (reemplaza con la línea de tu archivo de rutas)
   * **Qué hace:** Detecta que el método HTTP es un `GET` en la ruta raíz del recurso de lecturas y deriva la ejecución a la función correspondiente del controlador.
   * **Qué le entrega a la siguiente:** Pasa el control (`req`, `res`) a la función encargada de procesar la petición.

4. **Controlador (`controllers`)**
   * **Archivo y línea:** `src/controllers/Readings.js`, Línea X (reemplaza con la línea de tu controlador)
   * **Código de referencia:**
     ```javascript
     const lectura = await Reading.find();
     ```
   * **Qué hace:** Ejecuta la lógica del negocio llamando al modelo de Mongoose mediante el método `.find()` para solicitar todos los documentos de esa colección en la base de datos.
   * **Qué le entrega a la siguiente:** Una orden de consulta de Mongoose en formato JavaScript hacia la capa de ODM.

5. **Mongoose (ODM)**
   * **Archivo y línea:** Definido en el modelo correspondiente, ejecutándose a través de `node_modules/mongoose`.
   * **Qué hace:** Intercepta la orden `.find()`, valida el esquema estructurado previamente y traduce el comando de JavaScript a una consulta que el motor de MongoDB pueda procesar.
   * **Qué le entrega a la siguiente:** Una consulta estructurada de base de datos entendible por el motor de almacenamiento.

6. **MongoDB (Base de Datos)**
   * **Archivo y línea:** Gestionado por el motor de MongoDB (conexión establecida en `src/DataBase/cnxmongo.js`, Línea 5).
   * **Qué hace:** Recibe la instrucción, busca en los archivos de almacenamiento de la colección de lecturas y extrae todos los documentos disponibles.
   * **Qué le entrega a la siguiente:** Los documentos crudos en formato BSON de vuelta al driver de Node.js y Mongoose.

7. **Retorno y Respuesta HTTP (Controlador y Express)**
   * **Archivo y línea:** `src/controllers/Readings.js`, Línea X
   * **Qué hace:** Mongoose hidrata los datos BSON convirtiéndolos en objetos de JavaScript. El controlador los toma y responde usando `res.json(lectura)`. Express empaqueta los datos en formato JSON, añade las cabeceras HTTP de respuesta y los transmite de regreso al cliente.
   * **Qué le entrega a la siguiente:** La respuesta HTTP final con el código de estado `200 OK` y la lista de registros en formato JSON directo a Postman.


   ### Reto 1.2 — El mismo viaje, pero fallando (Ruta inválida: `/api/v1/loquesea/123abc`)

1. **Predicción del grupo (Antes de ejecutar):**
   * Creemos que la petición se detendrá en la capa de Express al no encontrar la ruta coincidente, por lo que **no llegará al controlador** y **tampoco llegará a MongoDB**.

2. **Comprobación en Postman:**
   * Al enviar la petición `GET` a `http://localhost:3000/api/v1/loquesea/123abc`, el servidor responde con un error (ej. código `404 Not Found`).

3. **El viaje de la petición fallida (Paradas):**
   * **Parada 1 (Postman):** Envía la petición HTTP a la ruta incorrecta.
   * **Parada 2 (Servidor Express - `index.js`):** Recibe la solicitud y evalúa cada una de las rutas definidas con `app.use()`. Al constatar que ninguna coincide con `/api/v1/loquesea`, decide no avanzar.
   * **Parada 3 (Middleware de Error / Respuesta 404):** Express intercepta la petición huérfana y genera de inmediato la respuesta de error de ruta no encontrada.

4. **¿Dónde se separa el camino respecto al Reto 1.1?**
   * Los caminos se separan exactamente en la **Parada 2 (Servidor Express)**. 
   * En el Reto 1.1, Express encontró la coincidencia en `app.use("/api/v1/readings", ReadingsRoutes)` y dejó pasar la petición hacia el enrutador, controlador y base de datos. 
   * En este Reto 1.2, al no haber coincidencia, **el flujo se corta de inmediato en Express**, lo que confirma que **nunca llega al controlador ni a MongoDB**.