<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Correção monetária</template>
      <template v-slot:body >
        <div  class="modal_div_principal">
        <b>Tabela:</b> <br />
          <select id="tabela_correcao" v-model="idTabela" class="alinharEsquerda"> 
              <option v-for="t in tabelas" :value="t.id">
                {{t.nome}}
              </option>
            </select>
            <br /><br />

           <div v-if="idTabela!=1100">
              <b>Época própria?</b><br />
              <input type="radio" name="epocapropria" value="1" v-model="epoca"> Sim (data do pagamento)<br />
              <input type="radio" name="epocapropria" value="0" v-model="epoca"> Não (data do mês trabalhado)<br />
           </div>

           <div v-if="idTabela==1100">
             <table style="width: 700px">
               <tr>
                <td>Data da citação</td>
                <td><inputData  v-model="dataci"  :errado="erroDataci"  /> </td> 
               </tr>

               <tr>
                <td>Juros pela Selic a partir da data de citação até:</td>
                <td><inputData v-model="jurosSelicAte"  :errado="erroJurosSelicAte"  /> </td>
               </tr>

                <tr>
                  <td colspan=2>
                    <br /><br />
                    <b>Atenção:</b> No julgamento da ADC nº 58 o STF considerou inconstitucional a aplicação da TR para atualização dos débitos judiciais dos entes privados, determinando a aplicação do IPCA-E mais TR na fase extrajudicial, e da taxa Selic na fase judicial. Todavia, não há uniformidade de entendimento quanto a aplicação dos critérios estabelecidos na ADC nº 58, devendo o usuário atentar para o quanto estabelecido na decisão liquidanda de cada caso concreto.
                  </td>
                </tr>
             </table>
           </div>

           <button  type="button"   class="btn-open-modal"  @click="enviaForm"   aria-label="Close Modal"> OK </button>
           <button  type="button"   class="btn-open-modal"  @click="close"   aria-label="Close Modal"> Cancelar </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "./modal";
import axios from 'axios';
import inputData from './inputData'
import calcUtil from '../plugins/calcUtil'

export default {
  name: "App",
  components: {
    Modal,inputData
  },
  data() {
    return {
      visible: false,
      tabelas: [],
      epoca: '1',
      idTabela: 0,
      dataci: '',
      jurosSelicAte: '',
      erroJurosSelicAte: "0",
      erroDataci: "0"    
    };
  },
  mounted () {
    this.pegaTabelas () 
  },
  mixins: [calcUtil], 
  methods: {
    openModal() {
      this.visible = true;
      this.epoca = this.plan_v.epocaPropria
      this.idTabela = this.plan_v.tabelaCorrecao
      this.dataci = this.plan_v.dataci
      this.jurosSelicAte = this.plan_v.jurosSelicAte
      this.erroDataci = "0" 
      this.erroJurosSelicAte = "0"  

      if (!this.dataci) {
        this.dataci = this.plan_v.datadi  
      }

      if (!this.jurosSelicAte) {
        this.jurosSelicAte = this.mesHoje () 
      }
    },
    close() {
      this.visible = false;
    },
    pegaTabelas () {
      var that = this 
      var url1 = this.hostTJS+`/tabelasCorrecaoMonetaria` 
      axios.get(url1).then( function(r) {
        
        that.tabelas = r.data   
        that.tabelas.unshift({ id:0, nome: 'Sem correção' } )
        that.tabelas.unshift({ id:1100, nome: 'IPCA-E até citacão, SELIC após citação' } )
        // console.log('tabelas', that.tabelas)
          
      }) 
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        epocaPropria: this.epoca,
        dataci: this.dataci,
        jurosSelicAte: this.jurosSelicAte,
        tabelaCorrecao: this.idTabela,
        juros_modo_calc: 's',
        juros_modo_calc_selic: 'composto'
      }
      var form_ok = 1

      if ( (typeof this.jurosSelicAte !== 'undefined') && (this.dataOk(this.jurosSelicAte)) ) { 
        this.erroJurosSelicAte = "0"; 
      } else { 
        this.erroJurosSelicAte = "1"; 
        form_ok = 0; 
      }

      if ( (typeof this.dataci !== 'undefined') && (this.dataOk(this.dataci)) ) { 
        this.erroDataci = "0"; 
      } else { 
        this.erroDataci = "1"; 
        form_ok = 0; 
      }
              
      if (form_ok) {
        this.$socket.emit('v', dados) 
        var that = this 
        setTimeout( function() {
          that.$socket.emit('refresh', dados)
        }, 250)
        
        this.close () 
      }
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


</style> 