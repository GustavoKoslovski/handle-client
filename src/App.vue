<template>
  <div class="background">
    <div class="columns is-12">
      <div class="column is-1 side-menu">
        <div class="side-menu-options">
          <router-link to="/"
            ><div class="fundo-botao">
              <img src="./imagens/home.png" />
            </div>
          </router-link>

          <router-link to="/venda-list">
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
        </div>

        <div class="side-menu-arrow">
          <router-link to="/home">
            <div class="fundo-botao flecha">
              <img src="./imagens/flecha.png" />
            </div>
          </router-link>
        </div>
      </div>
      <div class="column is-11 conteudo">
        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "~bulma/bulma.sass";

body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: "Nunito", sans-serif;
  overflow: hidden;
  scrollbar-width: none;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

body::-webkit-scrollbar {
  display: none;
}

.background {
  background-color: #eaeaea;
  width: 100vw;
  height: 100%;
  overflow: hidden;
}

.fundo-botao {
  width: 5vw;
  height: 10.4vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  background-color: #e7e7e7;
  border-radius: 18px;
  border: none;
}

.side-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 200px;
  height: 102vh;
  margin-left: 10px;
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #cccccc;
}

.side-menu img {
  width: 20px;
}

.fundo-botao:hover {
  background: #b1b1b1;
}

.side-menu-options {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.flecha {
  margin-top: 20px;
}

.conteudo {
  width: 100%;
  padding: 0;
  margin: 53px 37px 42px 37px;
}
</style>
