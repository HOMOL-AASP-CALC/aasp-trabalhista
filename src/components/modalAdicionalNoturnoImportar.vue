<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Sobre o adicional noturno</template>
      <template v-slot:body >
        <div class="modal_div_principal">
          <b>Origem dos dados:</b><br />
          <input type="radio" name="origem" value="digitar" v-model="origem"> Digitar a quantidade de horas mês a mês<br />
          <input type="radio" name="origem" value="cartao" v-model="origem"> Cartão de ponto<br />

          <div v-if="origem=='cartao'">
            <b>Tabela:</b><br />
             <select id="tabela_correcao" v-model="idCartao" class="alinharEsquerda"> 
              <option v-for="l in lista" :value="l.id">
                {{l.nome}}
              </option>
            </select>
          </div>

          <div v-if="origem=='digitar'">
            <b>Modo digitação:</b><br />
            <input type="radio" name="modoDigitacao" value="s" v-model="modoDigitacaoHora"> Sexagesimal (exemplo: 13:55)<br />
            <input type="radio" name="modoDigitacao" value="d" v-model="modoDigitacaoHora"> Decimal (exemplo: 13,91)<br />
          </div>
            <br /><br />
           <button  type="button"   class="btn-open-modal"  @click="enviaForm"   aria-label="Close Modal"> OK </button>
           <button  type="button"   class="btn-open-modal"  @click="close"   aria-label="Close Modal"> Cancelar </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "./modal";
import inputNum from "./inputNum";
import axios from 'axios';

export default {
  name: "App",
  components: {  Modal, inputNum },
  data() {
    return {
      visible: false,
      modoDigitacaoHora: '',
      origem: 'digitar',
      lista: [],
      idCartao: 0  
    };
  },
  methods: {
    openModal() {
      this.visible = true;
      this.origem = 'digitar'
      this.modoDigitacaoHora = this.plan_v.modoDigitacaoHora
      this.idCartao = 0 
      var that = this

      var url1 = this.hostTJS+`/listaCartaoPonto` 
      console.log(url1)
      axios.get(url1, { withCredentials: true }).then( function(r) {
        console.log(r)
        that.lista = r.data   
      })

    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      if (this.origem != 'cartao') {
        this.idCartao = 0
      }
      var dados = {
        idCalc: this.$store.state.idCalc, 
        modoDigitacaoHora: this.modoDigitacaoHora,
        importarCartaoAdicNoturno: this.idCartao 
      }

      this.$socket.emit('v', dados) 
      var that = this
      setTimeout( function() {
        that.$socket.emit('refresh', dados)
      }, 250)
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

</style> 