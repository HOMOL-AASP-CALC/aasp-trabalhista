<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Verbas diversas</template>
      <template v-slot:body>

        <table>
            <tr>
                <td>Data</td>
                <td>Descrição</td>
                <td>Valor</td>
            </tr>
  
            <tr >
                <td>
                    <select v-model="diaInt">
                        <option v-for="item in opcsDia"  :value="item">{{ mesAno2dia( item ) }}</option>
                    </select>
                </td>
                <td>
                    <input type="text" style="text-align: left; width: 350px;" v-model="outroDesc">
                </td>
                <td>
                    <inputNum type="text" v-model="outroValor"  />
                </td>
            </tr>

            <tr>
                <td colspan="3">Selecione as incidências:
                <input type=checkbox v-model="calcSomar"> Somar esta verba
                <input type=checkbox v-model="calcFGTS"> FGTS
                <input type=checkbox v-model="calcINSS"> INSS
                <input type=checkbox v-model="calcIRRF"> IRRF
                <input type=checkbox v-model="calcCorrecaoMonetaria"> Corrigir monetariamente
                
              </td>
            </tr>
        </table>


        <button  type="button"   class="btn-open-modal"  @click="enviaForm"   aria-label="Close Modal"> OK </button>
        <button  type="button"   class="btn-open-modal"  @click="close"   aria-label="Close Modal"> Cancela </button>

      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "./modal";
import inputNum from './inputNum'
import calcUtil from '../plugins/calcUtil' 

export default {
  name: "App",
  components: {
    Modal,inputNum
  },
  mixins: [ calcUtil ],
  data() {
    return {
      visible: false,
      tabelas: [],
      opcsDia: [],
      proporcaoList: [],
      diaInt: 0,
      proporcao: 12, 
      calcINSS: 0,
      calcFGTS: 0,
      calcIRRF: 0,
      calcSomar: 1, 
      calcCorrecaoMonetaria: 1,
      outroDesc: '', 
      outroValor: 0,
    };
  },
  methods: {
    openModal(dadosOrigem1) {
        // console.log('dadosOrigem1',dadosOrigem1)
        this.visible = true;
        this.dadosOrigem = dadosOrigem1 

        var inicio = this.dia2intMesAno(this.plan_v.dataad)

        if (this.plan_v.dataco) {
          var fim = this.dia2intMesAno(this.plan_v.dataco)
        } else {
          var fim = this.dia2intMesAno(this.plan_v.datade)
        }
        
        this.opcsDia = [] 

        for ( var i = inicio; i <= fim; i++ ) {
            this.opcsDia.push( i )
        }

        if (this.dadosOrigem.index == -1) {
            this.outroDesc = ""
            this.diaInt = this.dia2intMesAno(this.plan_v.datade)
            this.outroValor = 0 
        } else {
            this.diaInt = dadosOrigem1.plan.diaInt 
            this.outroDesc = dadosOrigem1.plan.desc
            this.outroValor = dadosOrigem1.plan.valor
            this.calcINSS = dadosOrigem1.plan.calcINSS
            this.calcFGTS = dadosOrigem1.plan.calcFGTS
            this.calcIRRF = dadosOrigem1.plan.calcIRRF
            this.calcSomar = dadosOrigem1.plan.calcSomar 
            this.calcCorrecaoMonetaria = dadosOrigem1.plan.calcCorrecaoMonetaria 
            // console.log('xxx', this.calcCorrecaoMonetaria)
        }
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      // console.log('outroDesc', this.outroDesc)
      var dados = {
        idCalc: this.$store.state.idCalc, 
        nome: this.dadosOrigem.prefixo,
        index: this.dadosOrigem.index,
        diaInt: this.diaInt,
        valor: this.outroValor,
        desc: this.outroDesc,
        calcINSS: this.calcINSS,
        calcFGTS: this.calcFGTS,
        calcIRRF: this.calcIRRF,
        calcSomar: this.calcSomar,
        calcCorrecaoMonetaria: this.calcCorrecaoMonetaria,

        autor: 'cliente'  
      }

      // console.log('enviaForm modalEditVerbasDiverdsas', dados)

      this.$socket.emit('vVerbasDiversas', dados)
      this.close () 
    }
  },
  computed: {
    plan_v () {
      return  this.$store.state.variaveis 
    },
    hostTJS () {
        return this.$store.state.hostTJS 
    }
  }
};
</script>

<style scoped>

.tabela {
    width: 80%;
    background-color: #fff;

}

.tr_espaco {
  padding-top:15px;
  padding-bottom:15px;
}

</style> 