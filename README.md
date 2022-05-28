# Express JS + Mongoose on Docker

Contoh master project penggunaan docker-compose. Ini hanya project belajar, silahkan jika ada yang ingin mengembangkan project ini.

## Instalation with Docker

### build image
```bash
docker build --tag app1 .
```

### running with docker-compose

```bash
docker-compose up
```

## Testing

Gunakan [insomnia](https://insomnia.rest/), [postman](https://www.postman.com/), [RapidAPI](https://rapidapi.com/products/api-testing/) atau API Tester lainnya untuk melakukan testing pada project ini.

### endpoints
```bash
- GET: http://localhost:3000/v1/user

- POST: http://localhost:3000/v1/user
  - body:
    - name: string
    - gender: string enum('m','f')
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
