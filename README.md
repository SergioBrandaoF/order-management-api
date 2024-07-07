## Instruções de Setup:

1. Clonar repo:
```bash
git clone https://github.com/SergioBrandaoF/order-management-api
cd order-management-api
```
2. Instalar dependencies
```bash 
 npm install node.js
 npm install express
 npm install mongodb
 npm install mongoose
 npm install express mongoose body-parser
 npm install mongodb@6.8
```
3. Criar arquivo .env na pasta raiz com base no .env.example

```bash
cp .env.example .env
```

4. Abra o arquivo .env e atualize os valores como precisar

```bash
MONGO_URI=your_mongo_connection_string
PORT=3000
```

5. Inicie o app

```bash
npm start
```
