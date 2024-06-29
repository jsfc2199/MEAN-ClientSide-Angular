# AuthApp

Esta sección principalmente busca conectar el Frontend (Angular) con el backend (Node+Nest) que hicimos en la sección anterior, pero puntualmente veremos:

- Functional Guards
- Manejo de autenticación
- Señales
- Effects
- Manejo de errores
- SweetAlert
- Determinar estado de autenticación
- Manejo de JWTs
- Headers de petición Http
- Y más

## Despliegue a producción

El objetivo de esta sección es desplegar a producción nuestra base de datos, backend y frontend para poder ser consumidos en cualquier parte del mundo.

Puntualmente veremos:
- Aprovisionamiento de base de datos MongoDB
- Railway y MongoAltas
- Variables de entorno para producción
- Hash Strategy
- Publicar aplicación de Node (Nest)
- Publicar aplicación de Angular
- Seleccionar bases de datos
- Pruebas reales.

### Pasos
1. Ir a https://www.netlify.com
2. Iniciamos sesión y damos click en Add new Site --> Deploy Manually
3. Cambiamos la variable de entorno para apuntar a la url que nos dio railway desde el back
4. Normalmente deberíamos configurar el backend para que funcione toda la app incluso al dar F5 pero como tenemos tier gratuitos no es una opción a contemplar,
podemos entonces ir al app-routing.module y en el forRoot, luego de definir las rutas hacer (routes, {useHash: true})
5. Hacemos ng build lo que nos genera la carpeta dist/auth-app
6. Dejamos caer la carpeta auth-app en el sitio web

