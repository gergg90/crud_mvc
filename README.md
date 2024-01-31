
# Deploy  app.fl0
Api desplegada en servicio gratuito [app.fl0.com](https://express-user-crud-dev-gpgz.2.us-1.fl0.io/products)

<hr>

![](https://www.sohamkamani.com/nodejs/expressjs-architecture/express-routing-logo.png)

# CRUD con Express MVC

CRUD ( Create, Read, Update, Delete ), utilizando Express con arquitectura MVC ( model, view, controller ), `cors` como middleware y `zod` para validaciones. 

> No database, se esta utilizando un json.

<hr>

## Dependencias
- express: `npm install express -E`
- cors: `npm install cors -E`
- zod: `npm install zod -E`

<hr>

## Desarrollo
Para facilitar el desarrollo y reiniciar automáticamente el servidor cuando se realizan cambios en los archivos, utilizaremos Nodemon como una dependencia de desarrollo. Para instalarlo:
```bash
npm install nodemon -D
```
Una vez instalado, podemos agregar el siguiente script en nuestro archivo package.json:
```json
"scripts": {
  "dev": "nodemon app.js"
}
```
Luego podemos ejecutar por `npm` el script:
```bash
npm run dev
```

<hr>

## Endpoints
- **GET** `/products`: Obtiene todos los productos.
- **GET** `/products/:id`: Obtiene un producto por su ID.
- **POST** `/products`: Crea un nuevo producto.
- **PATCH** `/products/:id`: Actualiza un producto existente.
- **DELETE** `/products:id`: Elimina un producto.