# API DummyProducts

- - -
>**`POST /user/register`** 
```
Registrando um usuário — e-mail valido e uma senha de no minemo 6 dígitos e um user name.
{
  "name": "nome do usuário",
  "email": "e-mail",
  "password": "senha"
}

retorna
- status 201 - created
{
    "user": {
        "name": "nome de usuário",
        "email": "e-mail",
        "role": "customer"
    },
    "message": "User created successfully"
}

- status 400 - bad request
{
  "message": "Invalid entries. Try again."
}

or

{
  "message": "Weak password"
}
```
- - -
>**`POST /user/login`** 
```
Efetuando o login — e-mail valido e uma senha de no minemo 6 dígitos previamente cadastrados.
{
  "email": "e-mail",
  "password": "senha"
}

retorna
- status 200 - ok
{
  "name": "nome do usuário",
  "email": "e-mail",
  "role": "customer",            
  "token": "um token valido"
}

- status 401 - unautorized
{
  "message": "unautorized"
}
```
- - -
>**`PUT /user/update`** 
```
Atualizando dados do usuário — e-mail e nome - requer token valido enviado pelo header Authorization

'headers': {
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiemUgZmlybWlubyIsImVtYWlsIjoidG9kZGRAZ21haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM4MjAyMTkxLCJleHAiOjE2MzgyMDU3OTF9.8pg4LhGld4B5RrwHhuonBILU5FMt0z0LLG7BZTGwDLM'
}

body.
{
  "oldEmail": "e-mail atual",
  "name": "nome do usuário",
  "newEmail": "novo e-mail"
}

retorna
- status 200 - ok
{
  "message": "Update successful"
}
- status 401 - Unauthorized
{
  "message": "Expired or invalid token"
}
```
- - -
>**`GET /product/all`** 
```
Buscando todos os produtos recebem — um token valido pelo Header Authorization.

'headers': {
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiemUgZmlybWlubyIsImVtYWlsIjoidG9kZGRAZ21haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM4MjAyMTkxLCJleHAiOjE2MzgyMDU3OTF9.8pg4LhGld4B5RrwHhuonBILU5FMt0z0LLG7BZTGwDLM'
}

retorna
- status 200 - ok
[
    {
        "_id": "61a2988d8f87af099d32857d",
        "productName": "Refrigerante Pepsi",
        "productPrice": 5,
        "inventory": 15,
        "description": "Ut enim ad minim veniam, quis nostrud exercício ullamco laboris nisi nostrud",
        "image": "http://localhost:3001/images/refrigerantePepsi.jpg",
        "stars": {
            "1": 0,
            "2": 5,
            "3": 800,
            "4": 90,
            "5": 1000
        }
    },
    {
        "_id": "61a299988f87af099d32857e",
        "productName": "Salgadinho Doritos",
        "productPrice": 7,
        "inventory": 15,
        "description": "Ut enim ad minim veniam, quis nostrud exercício ullamco laboris nisi nostrud",
        "image": "http://localhost:3001/images/salgadinhoDoritos.jpg",
        "stars": {
            "1": 90,
            "2": 5,
            "3": 800,
            "4": 1000,
            "5": 0
        }
    }
]
- status 401 - Unauthorized
{
  "message": "Expired or invalid token"
}
```
- - -
>**`GET /images/"image_name.jpg"`** 
```
Buscando imagem do produto pelo nome recebe — um token valido pelo Header Authorization.

'headers': {
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiemUgZmlybWlubyIsImVtYWlsIjoidG9kZGRAZ21haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM4MjAyMTkxLCJleHAiOjE2MzgyMDU3OTF9.8pg4LhGld4B5RrwHhuonBILU5FMt0z0LLG7BZTGwDLM'
}

retorna
- status 200 - ok
image.jpg
- status 401 - Unauthorized
{
  "message": "Expired or invalid token"
}
```
- - -