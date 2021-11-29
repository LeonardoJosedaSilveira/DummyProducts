# API DummyProducts

- - -
>**`POST /user/register`** 
```
Registrando um usuário recebe — um e-mail valido e uma senha de no minemo 6 dígitos e um user name.
{
  "userName": "nome do usuario",
  "email": "email",
  "password": "senha"
}

retorna
- status 201 - created
{
    "user": {
        "name": "Vrawnilsom",
        "email": "Testsxe5454@test.teste",
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