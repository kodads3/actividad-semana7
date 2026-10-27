const express = require("express");
const session = require("express-session");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "secreto123",
    resave: false,
    saveUninitialized: false
}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/login", (req, res) => {

    const { usuario, password } = req.body;

    if (usuario === "admin" && password === "1234") {

        req.session.usuario = usuario;

        console.log("Usuario autenticado");

        res.redirect("/privado");

    } else {

        console.log("Acceso denegado");

        res.send("Credenciales incorrectas");
    }
});

app.get("/privado", (req, res) => {

    if (req.session.usuario) {

        res.send("Bienvenido a la zona privada");

    } else {

        res.send("Acceso denegado");
    }

});

app.listen(3000, () => {
    console.log("Servidor ejecutándose");
});
