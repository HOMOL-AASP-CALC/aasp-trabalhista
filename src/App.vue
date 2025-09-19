<template>
  <div id="app">
   
    <carregando />
    <msgErro />

    <topoAasp />
   
    <avisoEdicao />

    <formularioInicial v-if="grupoAtual == 'inicio' " ref="formIni" />
    <div v-for="(p,i) in planilhas" v-if="p.info.visivel==1">
       <relatorioComum :plan='i' v-if='p.info.grupo==grupoAtual &&  p.info.tipo=="comum"' />
       <relatorioReflexos :plan='i' v-if='p.info.grupo==grupoAtual && p.info.tipo=="reflexo"' />
      <relatorioVerbasDiversas  :plan='i' v-if='p.info.grupo==grupoAtual && p.info.tipo=="verbasDiversas"' />
    </div>
    <resumoGeral v-if="grupoAtual == 'resumo' "  />

    <div class="div_rodape"></div>

     <botoesNavegacao /> 
     <modalCompartilhar ref="mCompartilhar" />
     <modalDebug ref="mDebug" /> 
     <modalIndiceCorrecao ref="mIndiceCorrecao" />
     <modalReflexos ref="mEditReflexo"  />
     <modalSalario ref="mSalario"  />
     <modalDeflacionar ref="mDeflacionar"  />
     <modalInsalubridadeBase ref="mInsalubridadeBase"/> 
     <modalPericulosidadeBase ref="mPericulosidadeBase"/>
     <modalDSR ref='mDSR'/> 
     <modalJuros ref='mJuros'/>
     <modalINSS ref='mINSS'/>
     <modalIRRF ref='mIRRF'/>
     <modalHonorarios ref='mHonorarios'/>
     <modalHonoPer ref='mHonoPer'/>
     <modalSucumbencias ref='mSucumbencias'/>
     <modalINSSReclamada ref='mINSSReclamada'/>
     <modalVerbasRescisoriasBase ref='mVerbasRescisoriasBase' />
     <modalConversaoHE ref='mConversaoHE' />
     <modalHorasExtrasBase ref='mHorasExtrasBase' />
     <modalDiferencasSalariaisBase ref="mDiferencasSalariaisBase" />
     <modalSalarioFamiliaBase ref="mSalarioFamiliaBase" />
     <modalModoDigitacaoHora ref="mModoDigitacaoHora" />
    <modalHorasItinereBase ref="mHorasItinereBase" />
    <modalHorasSobreavisoBase ref="mHorasSobreavisoBase" />
    <modalHorasIntraBase ref="mHorasIntraBase" />
    <modalHorasInterBase ref="mHorasInterBase" />
    <modalAdicionalNoturnoBase ref="mAdicionalNoturnoBase" />
    <modalAdicionalNoturnoImportar ref="mAdicionalNoturnoImportar" />
    <modalMetodologiaItinere ref="mMetodologiaItinere" />
    <modalMetodologiaSobreaviso ref="mMetodologiaSobreaviso" />
    <modalMetodologiaHorasInter ref="mMetodologiaHorasInter" />
    <modalMetodologiaHorasIntra ref="mMetodologiaHorasIntra" />
    <modalEditVerbasDiversas ref="mEditVerbasDiversas" />
    <modalSeguroDesemprego ref="mSeguroDesemprego" />
    <modalCriarVerba ref="mCriarVerba" />
    <modalDSRBase ref="mDSRBase" />

  </div>

</template>

<script>
import avisoEdicao from './components/avisoEdicao.vue'
import formularioInicial from './components/formularioInicial.vue'
import relatorioComum from './components/relatorioComum.vue'
import relatorioReflexos from './components/relatorioReflexos.vue'
import relatorioVerbasDiversas from './components/relatorioVerbasDiversas.vue'
import resumoGeral from './components/relatorioResumoGeral.vue'

import carregando from './components/carregando'
import msgErro from './components/mensagemErroGrande'
// import topo from './components/topo'
import topoAasp from './components/topo_aasp'

import modalCompartilhar from './components/modalCompartilhar'
import modalIndiceCorrecao from './components/modalIndiceCorrecao'
import modalReflexos from './components/modalReflexos'
import modalEditVerbasDiversas from './components/modalEditVerbasDiversas'
import modalSalario from './components/modalSalario'
import modalDeflacionar from './components/modalDeflacionar'
import modalInsalubridadeBase from './components/modalInsalubridadeBase'
import modalPericulosidadeBase from './components/modalPericulosidadeBase'
import modalDSR from './components/modalDSR'
import modalJuros from './components/modalJuros'
import modalINSS from './components/modalINSS'
import modalIRRF from './components/modalIRRF'
import modalHonorarios from './components/modalHonorarios'
import modalHonoPer from './components/modalHonoPer'
import modalSucumbencias from './components/modalSucumbencias'
import modalINSSReclamada from './components/modalINSSReclamada'
import modalVerbasRescisoriasBase from './components/modalVerbasRescisoriasBase'
import modalHorasExtrasBase from './components/modalHorasExtrasBase'
import modalConversaoHE from './components/modalConversaoHE'
import modalDiferencasSalariaisBase from './components/modalDiferencasSalariaisBase'
import modalSalarioFamiliaBase from './components/modalSalarioFamiliaBase'
import modalModoDigitacaoHora from './components/modalModoDigitacaoHora'
import modalHorasItinereBase from './components/modalHorasItinereBase'
import modalHorasSobreavisoBase from './components/modalHorasSobreavisoBase'
import modalHorasInterBase from './components/modalHorasInterBase'
import modalHorasIntraBase from './components/modalHorasIntraBase'
import modalDSRBase from './components/modalDSRBase'
import modalAdicionalNoturnoBase from './components/modalAdicionalNoturnoBase'
import modalAdicionalNoturnoImportar  from './components/modalAdicionalNoturnoImportar'
import modalSeguroDesemprego  from './components/modalSeguroDesemprego'
import modalMetodologiaItinere  from './components/modalMetodologiaItinere'
import modalMetodologiaHorasInter  from './components/modalMetodologiaHorasInter'
import modalMetodologiaHorasIntra  from './components/modalMetodologiaHorasIntra'
import modalMetodologiaSobreaviso  from './components/modalMetodologiaSobreaviso'
import modalCriarVerba  from './components/modalCriarVerba'
import modalDebug  from './components/modalDebug'

import botoesNavegacao from './components/botoesNavegacao'

export default {
  name: 'App',
  components: {
    relatorioComum, relatorioReflexos, formularioInicial, resumoGeral, modalIndiceCorrecao, modalReflexos, botoesNavegacao,
    modalSalario, modalDeflacionar, modalInsalubridadeBase, modalDSR, modalJuros, modalINSS, modalIRRF, modalHonorarios, modalHonoPer, modalSucumbencias,
    modalINSSReclamada, modalVerbasRescisoriasBase, modalConversaoHE, modalHorasExtrasBase, carregando, modalPericulosidadeBase,
    modalDiferencasSalariaisBase, modalSalarioFamiliaBase, modalModoDigitacaoHora, modalHorasItinereBase, modalHorasSobreavisoBase,
    modalHorasInterBase, modalHorasIntraBase, modalAdicionalNoturnoBase, modalAdicionalNoturnoImportar, modalMetodologiaItinere,
    modalMetodologiaSobreaviso,  modalMetodologiaHorasIntra, modalMetodologiaHorasInter, modalEditVerbasDiversas,relatorioVerbasDiversas,
    modalSeguroDesemprego, modalCriarVerba, topoAasp, msgErro, modalDebug, 
    modalCompartilhar, modalDSRBase, avisoEdicao  
  },
  data() {
    return {
      // topo: 0   
    }
  },
  created() {
    var that = this 
    let urlParams = new URLSearchParams(window.location.search);
    var n = urlParams.get('id')
    var mostraTudo = urlParams.get('tudo')

    if (!n) n = 1; else n = Number(n)
    this.$store.commit('setId', n)

    if (mostraTudo) {

      this.$store.commit('mostraTudo', true)
    }

    this.$socket.on("connect", () => { 
      that.$socket.emit('setId', { id: n } )

      that.$socket.on("calcDump", (dados) => {
        this.$store.commit('onCalc', dados)
      })

      that.$socket.on("infoUsuario", (dados) => {
        this.$store.commit('infoUsuario', dados)
      })

      that.$socket.on("calcErro", (dados) => {
        this.$store.commit('setErroGrande', dados)
        console.log('mostrar mensagem de erro')
      })

      that.$socket.on("socketVerbasCriadas", (dados) => {
        this.$store.commit('socketVerbasCriadas', dados)
      })

    })
  },
  computed: {
    planilhas () {
        return this.$store.state.planilhas         
    },
    grupoAtual () {
        return this.$store.state.grupoAtual          
    },
    topo () {
      var u = this.$store.state.infoUsuario.nomeUsuario
      return u.substring(0, 5) == 'aasp_' ? 2 : 1 
    },
    numeroAASP () {
      var u = this.$store.state.infoUsuario.nomeUsuario
      return u.substring(5)
    },
    primeiraVez () {
            return this.$store.state.primeiraVez 
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #e1e1e1;
}




.div_rodape {
  min-height: 75px;
  /* background-color: yellow; */
}

</style>
