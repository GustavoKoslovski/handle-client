<template>
  <div class="background">
    <div class="columns is-12">
      <div class="column is-1 side-menu">
        <router-link to="/home"
          ><div class="fundo-botao">
            <img src="./imagens/home.png" />
          </div>
        </router-link>

        <router-link to="/listarproduto">
          <div class="fundo-botao">
            <img src="./imagens/compras.png" />
          </div>
        </router-link>

        <router-link to="/produto-list">
          <div class="fundo-botao">
            <img src="./imagens/produtos.png" />
          </div>
        </router-link>

        <router-link to="/estoque-list">
          <div class="fundo-botao">
            <img src="./imagens/estoque.png" />
          </div>
        </router-link>

        <router-link to="/cliente-list">
          <div class="fundo-botao">
            <img src="./imagens/user.png" />
          </div>
        </router-link>

        <router-link to="/funcionario-list">
          <div class="fundo-botao">
            <img src="./imagens/pessoas.png" />
          </div>
        </router-link>

        <router-link to="/home">
          <div class="fundo-botao flecha">
            <img src="./imagens/flecha.png" />
          </div>
        </router-link>
      </div>
      <div class="column is-11 conteudo">
        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "~bulma/bulma.sass";

.flecha {
  margin-top: 20px;
}

body {
  margin: 0;
  padding: 0;
  font-family: "Nunito", sans-serif;
  overflow: hidden;
}

.background {
  background-color: white;
  width: 1960px;
  height: 100%;
}

.fundo-botao {
  padding: 30px;
  margin-bottom: 10px;
  background-color: white;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 24px;
  // width: 80px;
  // height: 60px;
  border: none;
}

.side-menu {
  margin-left: 10px;
  margin-top: 10px;
  width: 200px;
  height: 102vh;
  background-color: blue;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #d4d4d4;
}

.side-menu img {
  width: 20px;
}

.fundo-botao:hover {
  background: #b1b1b1;
}

.user-button:hover {
}

.container {
  display: flex;
  justify-content: space-between;
}

.top-menu {
  margin-top: 18px;
  margin-left: 15px;
  width: 106em;
  height: 140px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 36px;
  background-color: #d4d4d4;
}

.user-button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 300px;
  height: 110px;
  margin: 50px;
  border: none;
}

.user-button img {
  width: 60px;
  margin: 25px;
}

.user-button h2 {
  position: relative;
  margin-right: 70px;
  margin-top: 45px;
  color: #1209090e;
  font-size: 28px;
}

.menu-title h1 {
  color: black;
  margin-left: 40px;
  font-size: 40px;
}
</style>
