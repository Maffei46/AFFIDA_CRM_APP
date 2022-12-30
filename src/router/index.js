import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SettingsView from '../views/SettingsView.vue'
import LoggedView from '../views/logged/LoggedView.vue'
import LoggedPraticheView from '../views/logged/pratiche/PraticheView.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/settings', name: 'settings', component: SettingsView },
  { path: '/logged', component: LoggedView, children:[
    { path: 'pratiche', component: LoggedPraticheView, children:[
      { path: '', redirect:"hub"},
      { path: 'hub', name: 'Pratiche Hub', component: ()=>import('@/views/logged/pratiche/pratiche_hub.vue') },
      { path: 'info', name: 'Pratiche Info', component: ()=>import('@/views/logged/pratiche/pratiche_info.vue') },
      { path: 'import', name: 'Pratiche Importa', component: ()=>import('@/views/logged/pratiche/pratiche_import.vue') },
      { path: 'select', name: 'Pratiche Seleziona', component: ()=>import('@/views/logged/pratiche/pratiche_select.vue') },
      { path: 'provvigioni', name: 'Pratiche Provvigioni', component: ()=>import('@/views/logged/pratiche/pratiche_provvigioni.vue') },
      { path: ':id', name: 'Pratica', component: ()=>import('@/views/logged/pratiche/pratiche_id.vue') },
    ]},
    { path: 'agenti', component: ()=>import('@/views/logged/agenti/Agenti.vue'), children:[
      { path: '', redirect:"hub"},
      { path: 'hub', name: 'Agenti Hub', component: ()=>import('@/views/logged/agenti/agenti_hub.vue') },
      { path: 'list', name: 'Agenti List', component: ()=>import('@/views/logged/agenti/agenti_list.vue') },
      { path: 'accessi', name: 'Agenti Accessi', component: ()=>import('@/views/logged/agenti/agenti_listaAccessi.vue') },
      { path: ':id', name: 'Agente', component: ()=>import('@/views/logged/agenti/agente.vue') },
    ]},
    { path: 'sistema', component: ()=>import('@/views/logged/sistema/Sistema.vue'), children:[
      { path: '', redirect:"hub"},
      { path: 'hub', name: 'Sistema Hub', component: ()=>import('@/views/logged/sistema/sistema_hub.vue')},
      { path: 'leads',component:()=>import('@/views/logged/sistema/leads/Leads.vue'),children:[
        { path: '', redirect:"lista"},
        {path: 'lista', name: 'Sistema Leads Lista', component:()=>import('@/views/logged/sistema/leads/leads_lista.vue')},
        {path: 'nuovo', name: 'Sistema Leads Nuovo', component:()=>import('@/views/logged/sistema/leads/leads_nuovo.vue')},
        {path: ':id', name: 'Sistema Leads Modifica', component:()=>import('@/views/logged/sistema/leads/leads_id.vue')}
      ]},
      { path: 'banche',component:()=>import('@/views/logged/sistema/banche/Banche.vue'),children:[
        { path: '', redirect:"lista"},
        { path: 'lista', name: 'Sistema Banche Lista',component:()=>import('@/views/logged/sistema/banche/banche_lista.vue') },
        { path: 'nuovo', name: 'Sistema Banche Nuovo',component:()=>import('@/views/logged/sistema/banche/banche_nuovo.vue') },
        { path: ':id', name: 'Sistema Banche Modifica',component:()=>import('@/views/logged/sistema/banche/banche_id.vue') },
        { path: ':bankID/products/nuovo', name: 'Sistema Banche Prodotti Nuovo',component:()=>import('@/views/logged/sistema/banche/products/products_nuovo.vue') },
        { path: ':bankID/products/:productID', name: 'Sistema Banche Prodotti Modifica',component:()=>import('@/views/logged/sistema/banche/products/products_id.vue') },
      ]},
      { path: 'agenzie',component:()=>import('@/views/logged/sistema/agenzie/Agenzie.vue'),children:[
        { path: '', redirect:"lista"},
        { path: 'lista', name: 'Sistema Agenzie Lista',component:()=>import('@/views/logged/sistema/agenzie/agenzie_lista.vue') },
        { path: 'nuovo', name: 'Sistema Agenzie Nuovo',component:()=>import('@/views/logged/sistema/agenzie/agenzie_nuovo.vue') },
        { path: ':id', name: 'Sistema Agenzie Modifica',component:()=>import('@/views/logged/sistema/agenzie/agenzie_id.vue') },
      ]},
    ]}
  ]},
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to) {
    if (to.hash) {return window.scrollTo({ top: document.querySelector(to.hash).offsetTop, behavior: 'smooth' });}
    return window.scrollTo({ top: 0, behavior: 'smooth' });
  },
})

export default router
