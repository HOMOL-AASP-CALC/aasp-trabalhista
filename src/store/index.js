import Vue from 'vue'
import Vuex from 'vuex'
import calcUtil1 from '../plugins/calcUtil'

let calcUtil = calcUtil1.methods

Vue.use(Vuex)

function alterarUrl(novoId) {
  let url = window.location.href
  var baseUrl = url.split('?')[0];
  var novaUrl = baseUrl + "?id=" + novoId;
  window.history.pushState({path: novaUrl}, '', novaUrl);
} 

// console.log('process.env.VUE_APP_SERVIDOR', process.env.VUE_APP_SERVIDOR)

export default new Vuex.Store({
  state: {
    idCalc: 0,
    planilhas:{ },
    variaveis: { },
    hostTJS: process.env.VUE_APP_SERVIDOR,
    hostAPPFRONT: process.env.VUE_APP_FRONT,
    hostWWW: process.env.VUE_APP_SERVIDOR_WWW,
    hostLegacy: process.env.VITE_APP_SERVIDOR_LEGACY,
    hostAPIGeral: process.env.VUE_APP_SERVIDOR_API_GERAL, 
    hostSOCKET: process.env.VUE_APP_SOCKET,
    grupoAtual: 'inicio',
    grupoList: [],
    primeiraVez: true,  // essa variavel existe para nao passar para frente logo na primeira vez que carrega o calc 
    mensagemErroGrande: 0, 
    repetirValor: true,
    mostraTudo: false,
    infoUsuario: { nomeUsuario: '' },
    editavel: true,
    dataMaxima: ''   
  },
  mutations: {
    setId (state, payload) {
      // console.log('setId', payload)
      state.idCalc = payload 
    },
    mostraTudo (state, payload) {
      state.mostraTudo = payload 
    },
    setRepetirValor (state, payload) {
      state.repetirValor = payload 
    },
    setVariavel (state, payload) {
      // console.log('setVariavel', payload)
      state.variaveis[payload.variavel] = payload.valor 
    },
    setGrupo (state, payload) {
      state.grupoAtual = payload 
    },
    socketVerbasCriadas (state, payload) {
      // console.log('socketVerbasCriadas', payload)
      Vue.set(state.variaveis, 'verbasCriadas', payload)
    },
    setErroGrande (state, payload) {
      state.mensagemErroGrande = payload.erro   
      state.primeiraVez = false   
    },
    infoUsuario (state, payload) {
      // console.log('infoUsuario', JSON.stringify(payload) )
      state.infoUsuario = payload 
      state.infoUsuario.nomeUsuario = payload.v_nome_perfil  
      if (state.infoUsuario.assina_trab ) {
        state.editavel = true 
      }
      if (!state.editavel) {
        // console.log('nao editavel e nao assinante')
        state.infoUsuario.permissao = 'v'
      }
      
    },
    onCalc (state, r) {
        state.planilhas = r.a 
        state.variaveis = r.v  

        if (state.idCalc != r.idCalc) {
          state.idCalc = r.idCalc 
          alterarUrl(r.idCalc)
        }
        
        let dataMaxima = calcUtil.dia2yyyymmddInt( calcUtil.somaMes(calcUtil.yyyymmdd2dia ( r.v.dataCriacao) ) )
        let dataHoje = calcUtil.dia2yyyymmddInt( calcUtil.diaHoje() )
        // console.log('aaa state.infoUsuario', state.infoUsuario)
        state.editavel = (dataHoje <= dataMaxima || (state.infoUsuario.permissao=='v' && state.infoUsuario.assina_trab ) ) 
        state.dataMaxima = calcUtil.yyyymmdd2dia( dataMaxima )

        // organiza as telas
        state.grupoList = [] 
        state.grupoList.push({ grupo: 'inicio', posicao: 0})
        for (var i in state.planilhas) {
          var g = state.planilhas[i].info.grupo 
          var visivel = state.planilhas[i].info.visivel
          var posicao = state.planilhas[i].info.posicao 
          if ((g != null) && (state.grupoList.map(object => object.grupo).indexOf(g) === -1) && visivel ) {
            state.grupoList.push( { grupo: g, posicao }  )
          }
        }
        state.grupoList.push({ grupo: 'resumo', posicao: 5000 })

        //  sort
        state.grupoList = state.grupoList.sort( function(a, b) {
          if (a.posicao < b.posicao) { return -1; }
          if (a.posicao > b.posicao) { return 1; }
          return 0;
        })


        // analisa comandos 
        if ((!state.primeiraVez) && (r.comandos) && (r.comandos.proximaPagina)) {
          var n = state.grupoList.map(object => object.grupo).indexOf(state.grupoAtual);
          state.grupoAtual =  state.grupoList[n+1].grupo 
        }

        state.primeiraVez = false 
    }
  },
  actions: {
  },
  modules: {
  }
})
