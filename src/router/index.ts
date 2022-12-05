import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },

  {
    path: "/produto-list",
    name: "produto-list",
    component: () => import("../views/produto/produto-list.vue"),
  },
  {
    path: "/produto-cadastro",
    name: "produto-cadastro",
    component: () => import("../views/produto/produto-cadastro.vue"),
  },
  {
    path: "/produto-cadastro/:model/:id",
    name: "produto-detalhar",
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import("../views/produto/produto-cadastro.vue"),
  },
  {
    path: "/produto-cadastro/:model/:id",
    name: "produto-editar",
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import("../views/produto/produto-cadastro.vue"),
  },
  {
    path: "/categoria-cadastro",
    name: "categoria-cadastro",
    component: () => import("../views/categoria/categoria-cadastro.vue"),
  },
  {
    path: "/categoria-list",
    name: "categoria-list",
    component: () => import("../views/categoria/categoria-list.vue"),
  },
  {
    path: "/categoria-detalhar/:model/:id",
    name: "categoria-detalhar",
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import("../views/categoria/categoria-cadastro.vue"),
  },
  {
    path: "/categoria-cadastro/:model/:id",
    name: "categoria-editar",
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import("../views/categoria/categoria-cadastro.vue"),
  },
  {
    path: "/fornecedor-list",
    name: "fornecedor-list",
    component: () => import("../views/fornecedor/fornecedor-list.vue"),
  },
  {
    path: "/fornecedor-cadastro",
    name: "fornecedor-cadastro",
    component: () => import("../views/fornecedor/fornecedor-cadastro.vue"),
  },
  {
    path: "/fornecedor-cadastro/:model/:id",
    name: "fornecedor-detalhar",
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import("../views/fornecedor/fornecedor-cadastro.vue"),
  },
  {
    path: "/fornecedor-cadastro/:model/:id",
    name: "fornecedor-editar",
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import("../views/fornecedor/fornecedor-cadastro.vue"),
  },
  {
    path: "/funcionario-cadastro",
    name: "funcionario-cadastro",
    component: () => import("../views/funcionario/funcionario-cadastro.vue"),
  },
  {
    path: "/funcionario-list",
    name: "funcionario-list",
    component: () => import("../views/funcionario/funcionario-list.vue"),
  },
  {
    path: "/funcionario-cadastro/:model/:id",
    name: "funcionario-detalhar",
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import("../views/funcionario/funcionario-cadastro.vue"),
  },
  {
    path: "/funcionario-cadastro/:model/:id",
    name: "funcionario-editar",
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import("../views/funcionario/funcionario-cadastro.vue"),
  },
  {
    path: "/cliente-list",
    name: "cliente-list",
    component: () => import("../views/cliente/cliente-list.vue"),
  },
  {
    path: "/cliente-cadastro",
    name: "cliente-cadastro",
    component: () => import("../views/cliente/cliente-cadastro.vue"),
  },
  {
    path: "/cliente-cadastro/:model/:id",
    name: "cliente-detalhar",
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import("../views/cliente/cliente-cadastro.vue"),
  },
  {
    path: "/cliente-cadastro/:model/:id",
    name: "cliente-editar",
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import("../views/cliente/cliente-cadastro.vue"),
  },

  {
    path: "/estoque-list",
    name: "estoque-list",
    component: () => import("../views/estoque/estoque-list.vue"),
  },
  {
    path: "/estoque-cadastro",
    name: "estoque-cadastro",
    component: () => import("../views/estoque/estoque-cadastro.vue"),
  },
  {
    path: "/estoque-cadastro/:model/:id",
    name: "estoque-detalhar",
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import("../views/estoque/estoque-cadastro.vue"),
  },
  {
    path: "/estoque-cadastro/:model/:id",
    name: "estoque-editar",
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import("../views/estoque/estoque-cadastro.vue"),
  },
  {
    path: "/venda-list",
    name: "venda-list",
    component: () => import("../views/venda/venda-list.vue"),
  },
  {
    path: "/venda-cadastro",
    name: "venda-cadastro",
    component: () => import("../views/venda/venda-cadastro.vue"),
  },
  {
    path: "/venda-cadastro/:model/:id",
    name: "venda-detalhar",
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import("../views/venda/venda-cadastro.vue"),
  },
  {
    path: "/venda-cadastro/:model/:id",
    name: "venda-editar",
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import("../views/venda/venda-cadastro.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
