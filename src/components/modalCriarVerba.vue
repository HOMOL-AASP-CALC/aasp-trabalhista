<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Criar Verba</template>
      <template v-slot:body >
        <div  class="modal_div_principal">
        <b>Nome da Verba:</b> <input type="text" v-model="nomeVerba" :class="nomeVerbaClass"  />
            <br /><br />

              <b>Modo de cálculo:</b><br />
              <input type="radio" name="epocapropria" value="2" v-model="modoCalc"> Valores mês a mês (com coluna proporcional) + reflexos<br />
              <input type="radio" name="epocapropria" value="3" v-model="modoCalc"> Valores mês a mês (sem coluna proporcional) + reflexos<br />
              <input type="radio" name="epocapropria" value="1" v-model="modoCalc"> Valores mês  a mês<br />

             <br />
                  <input type="checkbox" value="2" v-model="somenteEste"> Criar esta verba somente para este cálculo<br />
            <br />
           <button  type="button"   class="btn-open-modal"  @click="enviaForm"   aria-label="Close Modal"> OK </button>
           <button  type="button"   class="btn-open-modal"  @click="close"   aria-label="Close Modal"> Cancelar </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "./modal";

export default {
  name: "App",
  components: {
    Modal,
  },
  data() {
    return {
      visible: false,
      nomeVerba: '',
      modoCalc: '2',
      somenteEste: false,
      erroNomeVerba: false 

    };
  },
  methods: {
    openModal() {
      this.visible = true;
      this.nomeVerba = ''  
      this.modoCalc = 2
      this.somenteEste =false
      this.erroNomeVerba = false
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        nomeVerba: this.nomeVerba,
        modoCalc: this.modoCalc,
        somenteEste: this.somenteEste
      }

      var formOk = 1 
      // console.log('######', this.$parent.$refs.formIni.formulario)
      // linhas abaixo serve para não apagar o que foi editado no form após a criação da
      this.$store.commit('setVariavel', { variavel: 'nomeCalc', valor: this.$parent.$refs.formIni.formulario.nomeCalc })
      this.$store.commit('setVariavel', { variavel: 'dados_processo', valor: this.$parent.$refs.formIni.formulario.dados_processo })
      this.$store.commit('setVariavel', { variavel: 'dados_vara', valor: this.$parent.$refs.formIni.formulario.dados_vara })
      this.$store.commit('setVariavel', { variavel: 'dados_reclamante', valor: this.$parent.$refs.formIni.formulario.dados_reclamante })
      this.$store.commit('setVariavel', { variavel: 'dados_adv_reclamante', valor: this.$parent.$refs.formIni.formulario.dados_adv_reclamante })
      this.$store.commit('setVariavel', { variavel: 'dados_reclamada', valor: this.$parent.$refs.formIni.formulario.dados_reclamada })
      this.$store.commit('setVariavel', { variavel: 'dados_adv_reclamada', valor: this.$parent.$refs.formIni.formulario.dados_adv_reclamada })
      this.$store.commit('setVariavel', { variavel: 'dataad', valor: this.$parent.$refs.formIni.formulario.dataad })
      this.$store.commit('setVariavel', { variavel: 'datade', valor: this.$parent.$refs.formIni.formulario.datade })
      this.$store.commit('setVariavel', { variavel: 'dataes', valor: this.$parent.$refs.formIni.formulario.dataes })
      this.$store.commit('setVariavel', { variavel: 'datadi', valor: this.$parent.$refs.formIni.formulario.datadi })
      this.$store.commit('setVariavel', { variavel: 'modo_avisoprevio', valor: this.$parent.$refs.formIni.formulario.modo_avisoprevio })
      this.$store.commit('setVariavel', { variavel: 'modo_prescricao', valor: this.$parent.$refs.formIni.formulario.modo_prescricao })
      this.$store.commit('setVariavel', { variavel: 'fgtsPago', valor: this.$parent.$refs.formIni.formulario.fgtsPago })
      this.$store.commit('setVariavel', { variavel: 'fgts_multa40', valor: this.$parent.$refs.formIni.formulario.fgts_multa40 })
      this.$store.commit('setVariavel', { variavel: 'fgts40_valor', valor: this.$parent.$refs.formIni.formulario.fgts40_valor })

      this.$store.commit('setVariavel', { variavel: 'salario', valor: this.$parent.$refs.formIni.formulario.salario })
      this.$store.commit('setVariavel', { variavel: 'ferias', valor: this.$parent.$refs.formIni.formulario.ferias })
      this.$store.commit('setVariavel', { variavel: 'avisoPrevio', valor: this.$parent.$refs.formIni.formulario.avisoPrevio })
      this.$store.commit('setVariavel', { variavel: 'multasRescisorias', valor: this.$parent.$refs.formIni.formulario.multasRescisorias })
      this.$store.commit('setVariavel', { variavel: 'saldoSalarial', valor: this.$parent.$refs.formIni.formulario.saldoSalarial })
      this.$store.commit('setVariavel', { variavel: 'insalubridade', valor: this.$parent.$refs.formIni.formulario.insalubridade })
      this.$store.commit('setVariavel', { variavel: 'horasExtras', valor: this.$parent.$refs.formIni.formulario.horasExtras })
      this.$store.commit('setVariavel', { variavel: 'horasExtrasSomenteAdic', valor: this.$parent.$refs.formIni.formulario.horasExtrasSomenteAdic })
      this.$store.commit('setVariavel', { variavel: 'horasInItinere', valor: this.$parent.$refs.formIni.formulario.horasInItinere })
      this.$store.commit('setVariavel', { variavel: 'horasSobreaviso', valor: this.$parent.$refs.formIni.formulario.horasSobreaviso })
      this.$store.commit('setVariavel', { variavel: 'intervaloInterjornada', valor: this.$parent.$refs.formIni.formulario.intervaloInterjornada })
      this.$store.commit('setVariavel', { variavel: 'intervaloIntrajornada', valor: this.$parent.$refs.formIni.formulario.intervaloIntrajornada })
      this.$store.commit('setVariavel', { variavel: 'adicionalNoturno', valor: this.$parent.$refs.formIni.formulario.adicionalNoturno })
      this.$store.commit('setVariavel', { variavel: 'equiparacaoSalarial', valor: this.$parent.$refs.formIni.formulario.dataad })
      this.$store.commit('setVariavel', { variavel: 'diferencasSalariais', valor: this.$parent.$refs.formIni.formulario.diferencasSalariais })
      this.$store.commit('setVariavel', { variavel: 'periculosidade', valor: this.$parent.$refs.formIni.formulario.periculosidade })
      this.$store.commit('setVariavel', { variavel: 'salarioFamilia', valor: this.$parent.$refs.formIni.formulario.salarioFamilia })
      this.$store.commit('setVariavel', { variavel: 'valeTransporte', valor: this.$parent.$refs.formIni.formulario.valeTransporte })
      this.$store.commit('setVariavel', { variavel: 'valeAlimentacao', valor: this.$parent.$refs.formIni.formulario.valeAlimentacao })
      this.$store.commit('setVariavel', { variavel: 'descontosIndevidos', valor: this.$parent.$refs.formIni.formulario.descontosIndevidos })
      this.$store.commit('setVariavel', { variavel: 'seguroDesemprego', valor: this.$parent.$refs.formIni.formulario.seguroDesemprego })
      this.$store.commit('setVariavel', { variavel: 'verbasDiversas', valor: this.$parent.$refs.formIni.formulario.verbasDiversas })
      this.$store.commit('setVariavel', { variavel: 'tabelaCorrecao', valor: this.$parent.$refs.formIni.formulario.tabelaCorrecao })

      if (!this.nomeVerba) {
        this.erroNomeVerba = true
        formOk = false 
      }


      if (formOk) {
        this.$socket.emit('criaVerba', dados) 
        this.close () 
      }
    }
  },
  computed: {
    nomeVerbaClass () {
      if (!this.erroNomeVerba) {
        return "texto1"
      } else {
        return "texto1 erro"
      }
    }
  }
};
</script>

<style scoped>

.tabela {
    width: 80%;
    background-color: #fff;
}

.texto1 {
    width: 250px;
    text-align: left;
}

.erro {
    background-color: #FFEBEE !important;
    border: 1px red solid;
}

</style> 