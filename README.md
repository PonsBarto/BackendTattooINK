# BackendTattooINK

<div style="text-align: center;"><img src= "./images/logoink.png" width="800"/></div>


<details>
  <summary>Contenido 📝</summary>
  <ol>
    <li><a href="#objetivo">Objetivo</a></li>
    <li><a href="#sobre-el-proyecto">Sobre el proyecto</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#diagrama-bd">Diagrama</a></li>
    <li><a href="#instalación-en-local">Instalación</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#futuras-funcionalidades">Futuras funcionalidades</a></li>
    <li><a href="#contribuciones">Contribuciones</a></li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#webgrafia">Webgrafia</a></li>
    <li><a href="#desarrollo">Desarrollo</a></li>
    <li><a href="#agradecimientos">Agradecimientos</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>

## Objetivo
Este proyecto exigía el desarrollo de una API funcional, la cual debía estar vinculada a una base de datos. Esta base de datos tenía que incluir, como mínimo, una relación de uno a muchos y otra de muchos a muchos, para garantizar una gestión de datos eficiente y versátil.

## Sobre el proyecto
El objetivo es desarrollar una aplicación web para un estudio de tatuajes. Esta plataforma ofrecerá funcionalidades clave como el registro de usuarios, la posibilidad de programar citas con diversos artistas del tatuaje y ejecutar consultas avanzadas en la base de datos. Hasta la fecha, la aplicación ya cuenta con seeders operativos para Roles y Usuarios, proporcionando asignaciones automáticas de roles que facilitan la realización de peticiones básicas sin la necesidad de registrar usuarios manualmente. Entre las capacidades implementadas, se incluyen la inscripción de usuarios, tanto clientes como artistas, así como la eliminación de usuarios mediante su identificador único. Además, la aplicación permite acceder y consultar los perfiles de usuario por identificador y visualizar la lista completa de usuarios registrados.   


## Stack
Tecnologías utilizadas:
<div align="center">
<a href="https://www.mysql.com/">
    <img src= "https://img.shields.io/badge/mysql-%234479A1"/>
</a>
<a href="https://www.expressjs.com/">
    <img src= "https://img.shields.io/badge/Express.Js-%23000000"/>
</a>
<a href="https://nodejs.org/es/">
    <img src= "https://img.shields.io/badge/Node.js-%23%23339933"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/JavaScript-%23F7DF1E"/>
</a>
 </div>


## Diagrama BD
!['images'](./images/imgDB1.png)

## Instalación en local
1. Clonar el repositorio
2. ` $ npm install `
3. Conectamos nuestro repositorio con la base de datos 
4. ``` $ Ejecutamos las migraciones ``` 
5. ``` $ Ejecutamos los seeders ``` 
6. ``` $ npm run dev ``` 

## Endpoints

<details>
<summary>USERS ENDPOINTS</summary>

- USERS

  - REGISTER

          POST http://localhost:3000/api/register

    body:

    ```js
        {
            "name":"user1",
            "last_name":"one",
            "address":"461 Kim Circle",
            "email":"user1@user.com",
            "password":"123456",
            "phone_number":"123456789"
        }
    ```

  - LOGIN

          POST http://localhost:3000/api/login

    body:

    ```js
        {
            "email": "user1@user.com",
            "password": "123456"
        }
    ```

  - PROFILE

          GET http://localhost:3000/api/:id

    - Insertamos el ID del user para que nos muestre todos los datos

  - UPDATE

          PATCH http://localhost:3000/api/:id

    body:

    ```js
        {
            "name": "NewUserOne  ",
            "password": "New1234@",
            "phone_number": "1234567"
        }
    ```

  - GET ALL ARTISTS

          GET http://localhost:3000/api/artists/list

    
</details>

## Contribuciones
Las sugerencias y aportaciones son siempre bienvenidas.  

Puedes hacerlo de dos maneras:

1. Abriendo una issue
2. Crea un fork del repositorio
    - Crea una nueva rama  
        ```
        $ git checkout -b feature/nombreUsuario-mejora
        ```
    - Haz un commit con tus cambios 
        ```
        $ git commit -m 'feat: mejora X cosa'
        ```
    - Haz push a la rama 
        ```
        $ git push origin feature/nombreUsuario-mejora
        ```
    - Abre una solicitud de Pull Request


## Contribuciones
Las sugerencias y aportaciones son siempre bienvenidas.  

Puedes hacerlo de dos maneras:

1. Abriendo una issue
2. Crea un fork del repositorio
    - Crea una nueva rama  
        ```
        $ git checkout -b feature/nombreUsuario-mejora
        ```
    - Haz un commit con tus cambios 
        ```
        $ git commit -m 'feat: mejora X cosa'
        ```
    - Haz push a la rama 
        ```
        $ git push origin feature/nombreUsuario-mejora
        ```
    - Abre una solicitud de Pull Request

## Licencia
Este proyecto se encuentra bajo licencia de "BartoPons"

## Webgrafia:
Para conseguir mi objetivo he recopilado información de:
- Documentacion TypeOrm
- Paquetes de npmjs.com
- Documentacion Bootcamp GeeksHubs y repositorio de Fidel 


## Desarrollo:

``` js
 const developer = "BartoPons";


```  


## Contacto
<a href = "mailto:ponsbarto@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/bartomeu-pons-4594a81b6/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</p>