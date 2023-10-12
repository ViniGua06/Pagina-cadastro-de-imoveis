const express = require("express");
const app = express();
const PORT = 2000;

const db = require("./db");

const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Olá servidor!");
});

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(`Servidor iniciado na porta ${PORT}`);
});

// Variáveis para o front-end
let id;
let nome;
let emailFE;
let senha;
let log;
//////////////////////////////

app.post("/cadastrar", (req, res) => {
  const { nome, email, senha } = req.body;

  const check = "select count(*) as total from usuario where email = ?";

  db.query(check, [email], (error, result) => {
    if (error) {
      console.log(error);
      return;
    }

    const total = result[0].total;

    if (total === 0) {
      const insert =
        "insert into usuario (nome, email, senha) values (?, ?, ?)";

      db.query(insert, [nome, email, senha], (error) => {
        if (error) {
          console.log(error);
          return;
        }
        res.status(200).send("Usuario Cadastrado");
      });
    } else {
      res.status(400).send("Email já cadastrado");
    }
  });
});

app.post("/logar", (req, res) => {
  const { email2, senha2 } = req.body;

  const check =
    "select count(*) as total from usuario where email = ? and senha = ?";

  db.query(check, [email2, senha2], (error, result) => {
    if (error) {
      console.log(error);
      return;
    }

    const total = result[0].total;

    if (total === 1) {
      const getData =
        "select id, nome, email, senha from usuario where email = ? and senha = ?";

      db.query(getData, [email2, senha2], (error, result) => {
        if (error) {
          console.log(error);
          return;
        }

        id = result[0].id;
        nome = result[0].nome;
        emailFE = result[0].email;
        senha = result[0].senha;
        log = true;
      });

      res.status(200).send("Logado");
    } else {
      log = false;
      res.status(400).send("Usuário ou senha Inválidos");
    }
  });
});

app.get("/getData", (req, res) => {
  const data = {
    id: id,
    nome: nome,
    email: emailFE,
    senha: senha,
    logado: log,
  };

  res.json(data);
});

app.post("/addImovel", (req, res) => {
  const { imovel, desc, src } = req.body;

  const insert =
    "insert into imóveis (nome, descricao, imagem, id_usuario) values (?, ?, ?, ?)";

  db.query(insert, [imovel, desc, src, id], (error, result) => {
    if (error) {
      console.log(error);
      return;
    }

    res.status(200).send("Imóvel cadastrado com sucesso!");
  });
});

app.get("/log", (req, res) => {
  res.json({ log, nome });
});