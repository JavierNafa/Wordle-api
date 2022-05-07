# WORDLE API

## Sobre

Api que simula el juego de Wordle:

- [Node js](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Postgresql](https://www.postgresql.org/)

- [Typescript](https://www.typescriptlang.org/)

- [Docker](https://www.docker.com/)

## Setup

### Requisitos

- Node v14

- Express v4.18

- PostgreSql

- Docker v20


Se necesitan definir variables de entorno para el funcionamiento.

| Variable              | Descripcion                                                                                                          |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------- |
| DATABASE_HOST            | Host de la base de datos. Considerar que al usar docker tambien se usara la imagen de postgres. |
| DATABASE_PORT            | Puerto de Postgres. Considerar que se usara el puerto por defecto usando docker.                                                                                   |
| DATABASE_USERNAME         | Nombre de la base de datos.                                                                    |
| DATABASE_PASSWORD        | Contraseña de la base de datos.                                                                              |
| DATABASE_NAME            | Nombre de la base de datos. Considerar que se usara el nombre de wordle.   |
| DATABASE_LOGGING            | Propiedad tipo boleana para mostrar o no los logs de postgres.                                                                                      |
| TOKEN_KEY      | Llave secreta para generar los tokens de autenticacion.                                                            |
| REFRESH_TOKEN_KEY                  | Llave secreta para generar los tokens de refresh..                                                                                 |
| TOKEN_EXPIRATION_TIME             | El tiempo de expriracion de un token.                                                                      |
| LOAD_DATA | Propiedad de tipo boleana para cargar las palabras del archivo words.txt.                                                                       |
|                                   |

# Uso

### Sin docker

1. Crear el archivo .env con las variables anteriores.

2. Asegurarse que la base de datos este operativa. Luego ejecutar el comando `npm start`

3. Importa la coleccion de postman de wordle para realizar las pruebas.

### Con docker

1. Crea las variables de entorno solo con las llaves secretas y las variables boleanas.

2. Ejecuta el comando `docker-compose up` en la carpeta raiz.

3. Listo, ahora puedes importar la coleccion de postman. Solo recuerda que el host debe de llevar `/wordle/api/v1`.

## Gracias por leer hasta aqui.
