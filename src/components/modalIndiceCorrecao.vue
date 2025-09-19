<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Juros e Correção monetária</template>
      <template v-slot:body >
        <div  class="modal_div_principal">
          <table class="tabela">
              <tr>
                <td>Data de atualização:</td>
                <td><inputData  v-model="dataco"  :errado="erro_ic_dataatual"  /></td> 
                <td>Os valores serão atualizados até a data de atualização</td>

               </tr>

               <tr>
                <td>Data da distribuição:</td>
                <td><inputData  v-model="datadi"  :errado="erroDataci"  /> </td> 
                <td>Os juros serão contabilizados a partir da data da distribuição</td> 
               </tr>

               <tr>
                <td>Data da citação:</td>
                <td><inputData  v-model="dataci"  :errado="erroDataci"  /> </td> 
                <td>A Selic será utilizada a partir da data da citação</td> 
               </tr>

               <tr>
                <td></td>
                <td colspan=2>
                  <input type=checkbox v-model="selicAposCitacao"> Utilizar SELIC para juros e correção após a citação
                </td>
               </tr>

               <!-- <tr>
                <td>Selic a partir de:</td>
                <td><inputData v-model="jurosSelicAte"  :errado="erroJurosSelicAte"  /> </td>
               </tr> -->
             </table>

             <br />
        <b>Índice de correção monetária:</b> <br />
          <input type="radio" name="ic_indexador" value="ipcae" v-model="ic_indexador">IPCA-E<br />
          <input type="radio" name="ic_indexador" value="ipca" v-model="ic_indexador">IPCA<br />
          <input type="radio" name="ic_indexador" value="inpc" v-model="ic_indexador">INPC<br />
          <input type="radio" name="ic_indexador" value="tr" v-model="ic_indexador">TR<br />
          <input type="radio" name="ic_indexador" value="tr_ipcae" v-model="ic_indexador">TR até 25/03/2015 e IPCA-E a partir de 26/03/2015<br />
          <input type="radio" name="ic_indexador" value="tr_ipcae_tr" v-model="ic_indexador">TR até 25/03/2015, IPCA-E de 26/03/2015 a 11/11/2017 e TR a partir de 2017<br />
          <input type="radio" name="ic_indexador" value="semcorrecao" v-model="ic_indexador">Sem correção<br />
              <!-- <b>Época própria?</b><br />
              <input type="radio" name="epocapropria" value="1" v-model="epoca"> Sim (data do pagamento)<br />
              <input type="radio" name="epocapropria" value="0" v-model="epoca"> Não (data do mês trabalhado)<br /> -->
  
                           
        <b>Juros:</b> <br />
          <input type="radio" name="ic_juros" value="taxalegal" v-model="ic_juros">1% até 31/08/2024, após Taxa Legal (Lei 14.905/24)<br />
          <input type="radio" name="ic_juros" value="juros05" v-model="ic_juros">0,5%<br />
          <input type="radio" name="ic_juros" value="juros1" v-model="ic_juros">1%<br />
          <input type="radio" name="ic_juros" value="poupanca" v-model="ic_juros">Poupança<br />
          <input type="radio" name="ic_juros" value="semjuros" v-model="ic_juros">Sem juros<br /> 

           </div>

           <button  type="button"   class="btn-open-modal"  @click="enviaForm"   aria-label="Close Modal"> OK </button>
           <button  type="button"   class="btn-open-modal"  @click="close"   aria-label="Close Modal"> Cancelar </button>

      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "./modal";
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
      erroDataci: "0",
      erro_ic_dataatual: "0",
      ic_indexador: 'inpc',
      dataco: '' ,
      ic_juros: 'juros1',
      selicAposCitacao: true   
    };
  },
  mixins: [calcUtil], 
  methods: {
    openModal() {
      this.visible = true;
      this.dataci = this.plan_v.dataci
      this.datadi = this.plan_v.datadi
      this.jurosSelicAte = this.plan_v.jurosSelicAte
      this.erroDataci = "0" 
      this.erroJurosSelicAte = "0" 
      this.ic_indexador = this.plan_v.ic_indexador
      this.ic_juros = this.plan_v.ic_juros 
      this.dataco = this.plan_v.dataco
      this.selicAposCitacao = this.plan_v.selicAposCitacao

      if (!this.dataci) {
        this.dataci = this.plan_v.datadi  
      }

      if (!this.jurosSelicAte) {
        this.jurosSelicAte = this.mesHoje () 
      }

      if (!this.ic_indexador) {
        this.ic_indexador = 'inpc'
      }

      if (!this.ic_juros) {
        this.ic_juros = 'juros1'
      }

      if (!this.ic_dataatual) {
        this.ic_dataatual = this.mesHoje () 
      }
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        dataci: this.dataci,
        // jurosSelicAte: this.jurosSelicAte,
        ic_juros: this.ic_juros,
        dataco: this.dataco,
        selicAposCitacao: this.selicAposCitacao,  
        ic_indexador: this.ic_indexador
      }
      var form_ok = 1

      // if ( (typeof this.jurosSelicAte !== 'undefined') && (this.dataOk(this.jurosSelicAte)) ) { 
      //   this.erroJurosSelicAte = "0"; 
      // } else { 
      //   this.erroJurosSelicAte = "1"; 
      //   form_ok = 0; 
      // }

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
          // console.log('refresh')
          that.$socket.emit('refresh', dados )
        }, 500)
        
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
    width: 100%;
    background-color: #fff;
}

.tabela td {
  text-align: left;
}


</style> 