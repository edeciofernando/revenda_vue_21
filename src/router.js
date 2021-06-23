import Vue from 'vue'
import VueRouter from 'vue-router'

import BoasVindas from './components/BoasVindas'
import CadastroCarros from './components/CadastroCarros'
import FormCarros from './components/FormCarros'
import FormLogin from './components/FormLogin'
import GraficoCarrosMarcas from './components/GraficoCarrosMarcas'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: BoasVindas },
  { path: '/cadcarros', component: CadastroCarros },
  { path: '/formcarros', component: FormCarros },
  { path: '/formlogin', component: FormLogin },
  { path: '/grafcarros', component: GraficoCarrosMarcas }
]

export default new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})
