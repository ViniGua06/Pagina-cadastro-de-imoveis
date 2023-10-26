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

  const [mensagem, setMensagem] = useState("");

  const [nCadastro, setN] = useState("");
  const [eCadastro, setE] = useState("");
  const [sCadastro, setS] = useState("");

  const [imoveisTela, setImoveisTela] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");

  const [elementos, setElementos] = useState([]);

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
  }, [logado]);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://api-cadastro-three.vercel.app/logar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email2: email,
            senha2: senha,
          }),
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setMensagem(data.message);
        setLogado(true);
        setNome(data.nome);
      } else {
        const data = await response.json();
        setMensagem(data.message);
        setLogado(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitCadastro = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://api-cadastro-three.vercel.app/cadastrar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: nCadastro,
            email: eCadastro,
            senha: sCadastro,
          }),
        }
      );

      const data = await response.json();

      setMensagem(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitImovel = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://api-cadastro-three.vercel.app/addImovel",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imovel: titulo,
            desc: desc,
            src: url,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const getImoveisData = async () => {
    try {
      const response = await fetch(
        `https://api-cadastro-three.vercel.app/getElements/${id}`
      );
      const data = await response.json();
      console.log(data);

      if (data) {
        setElementos(data);
      } else {
        setElementos([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImoveisData();
  }, [logado, imoveisTela]);

  const getData = async () => {
    try {
      const response = await fetch(
        "https://api-cadastro-three.vercel.app/getData"
      );
      const data = await response.json();

      setId(data.id);
      setNome(data.nome);
      setEmailFront(data.email);
      setSenhaFront(data.senha);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [logado]);

  return (
    <div>
      {!logado ? (
        <main>
          <div className="Cadastro">
            <form
              method="post"
              action="https://api-cadastro-three.vercel.app/cadastrar"
              onSubmit={handleSubmitCadastro}
            >
              <h1 align="center" id="h1">
                Cadastro
              </h1>
              <label id="lablNome">Nome Completo</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={nCadastro}
                onChange={(e) => setN(e.target.value)}
                required
              ></input>
              <br></br>
              <label id="lblEmail">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={eCadastro}
                onChange={(e) => setE(e.target.value)}
                required
              ></input>
              <br></br>
              <label id="lblSenha">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={sCadastro}
                onChange={(e) => setS(e.target.value)}
                required
              ></input>
              <br></br>
              <input type="submit" value="Cadastrar" id="submit"></input>
            </form>
          </div>

          <div className="Login">
            <form
              method="post"
              action="https://api-cadastro-three.vercel.app/logar"
            >
              <h1 align="center">Login</h1>
              <label>Email</label>
              <input
                type="Email"
                required
                name="email2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <br></br>
              <br></br>
              <label>Senha</label>
              <input
                type="password"
                required
                name="senha2"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              ></input>
              <br></br>
              <br></br>
              <input
                type="submit"
                value="Logar"
                onClick={handleSubmitLogin}
              ></input>
            </form>
          </div>
          {mensagem && (
            <h1 style={{ color: "rgba(34, 55, 11, 0.9)" }}>{mensagem}</h1>
          )}
        </main>
      ) : (
        <>
          <h1>Ola {nome}</h1>
          <h2>ID {id}</h2>
          <form
            method="post"
            action="https://api-cadastro-three.vercel.app/addImovel"
            onSubmit={handleSubmitImovel}
          >
            <label>Nome do Imóvel</label>
            <input
              type="text"
              name="imovel"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            ></input>
            <br></br>
            <label>Descrição do Imóvel</label>
            <textarea
              name="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <br></br>
            <label>Fonte da imagem principal</label>
            <input
              type="text"
              name="src"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            ></input>
            <br></br>
            <input type="submit"></input>
          </form>
          <button
            onClick={() => {
              setLogado(false);
              setMensagem(" ");
            }}
          >
            Sair
          </button>
          <button
            onClick={() =>
              imoveisTela ? setImoveisTela(false) : setImoveisTela(true)
            }
          >
            {imoveisTela ? <p>Ocultar Imóveis</p> : <p>Mostrar Imóveis</p>}
          </button>
          {imoveisTela ? (
            <>
              {elementos.map((item) => {
                return (
                  <div className="card" key={item.id}>
                    <h2>{item.nome}</h2>
                    <img src={item.imagem}></img>
                    <p>{item.descricao}</p>
                  </div>
                );
              })}
            </>
          ) : null}
        </>
      )}
    </div>
  );
}

export default App;
