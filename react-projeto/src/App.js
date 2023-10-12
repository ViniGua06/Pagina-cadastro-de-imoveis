import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [logado, setLogado] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [id, setId] = useState(null);
  const [nome, setNome] = useState(null);
  const [emailFront, setEmailFront] = useState(null);
  const [senhaFront, setSenhaFront] = useState(null);

  const [animacao, setAnimacao] = useState(false);

  useEffect(() => {
    const input = document.getElementsByTagName("input")[0];

    input.addEventListener("change", () => {
      const text = input.value;
      let resultado = "";

      for (let i = 0; i < text.length; i++) {
        if (i === 0 || text[i - 1] === " " || text[i - 1] === "-") {
          resultado += text[i].toUpperCase();
        } else {
          resultado += text[i];
        }
        input.value = resultado;
      }
    });
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:2000/logar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          senha: senha,
        }),
      });

      const data = await response.json();

      setLogado(data.log);
      setNome(data.nome);

      if (response.status === 204) {
        setLogado(true);
      } else {
        setLogado(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:2000/getData");
      const data = await response.json();

      setId(data.id);
      setNome(data.nome);
      setEmailFront(data.email);
      setSenhaFront(data.senha);
    } catch (error) {
      console.log(error);
    }
  };

  const getLog = async () => {
    try {
      const response = await fetch("http://localhost:2000/log");
      const data = await response.json();

      setLogado(data.log);
      setNome(data.nome);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLog();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {!logado ? (
        <main>
          <div className="Cadastro">
            <form method="post" action="http://localhost:2000/cadastrar">
              <h1 align="center" id="h1">
                Cadastro
              </h1>
              <label id="lablNome">Nome Completo</label>
              <input type="text" id="nome" name="nome" required></input>
              <br></br>
              <label id="lblEmail">Email</label>
              <input type="email" id="email" name="email" required></input>
              <br></br>
              <label id="lblSenha">Senha</label>
              <input type="password" id="senha" name="senha" required></input>
              <br></br>
              <input type="submit" value="Cadastrar" id="submit"></input>
            </form>
          </div>
          <div className="Login">
            <form
              method="post"
              action="http://localhost:2000/logar"
              onSubmit={handleSubmit}
            >
              <h1 align="center">Login</h1>
              <label>Email</label>
              <input
                type="Email"
                required
                name="email2"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <br></br>
              <br></br>
              <label>Senha</label>
              <input
                type="password"
                required
                name="senha2"
                onChange={(e) => setSenha(e.currentTarget.value)}
              ></input>
              <br></br>
              <br></br>
              <input type="submit" value="Logar"></input>
            </form>
          </div>
        </main>
      ) : (
        <>
          <h1>Ola {nome}</h1>
          <h2>ID {id}</h2>
          <form method="post" action="http://localhost:2000/addImovel">
            <label>Nome do Imóvel</label>
            <input type="text" name="imovel"></input>
            <br></br>
            <label>Descrição do Imóvel</label>
            <textarea name="desc"></textarea>
            <br></br>
            <label>Fonte da imagem principal</label>
            <input type="text" name="src"></input>
            <br></br>
            <input type="submit"></input>
          </form>
          <button onClick={() => setLogado(false)}>Sair</button>
        </>
      )}
    </div>
  );
}

export default App;
