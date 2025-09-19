<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Sobre as horas extras</template>
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
           <b>Quais são os percentuais para efetuar o cálculo:</b><br />
            <input type='text' v-model="percHE1" class="alinharEsquerda" style="width: 40px;" />
            <input type='text' v-model="percHE2" class="alinharEsquerda" style="width: 40px;" />
            <input type='text' v-model="percHE3" class="alinharEsquerda" style="width: 40px;" />
            <input type='text' v-model="percHE4" class="alinharEsquerda" style="width: 40px;" />
            <br /><br />
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
      percHE1: '',
      percHE2: '',
      percHE3: '',
      percHE4: '',
      modoDigitacaoHora: '',
      origem: 'digitar',
      lista: [],
      idCartao: 0  
    };
  },
  methods: {
    openModal() {
      this.visible = true;
      this.percHE1 = this.plan_v.percHE1
      this.percHE2 = this.plan_v.percHE2
      this.percHE3 = this.plan_v.percHE3
      this.percHE4 = this.plan_v.percHE4
      this.origem = 'digitar'
      this.modoDigitacaoHora = this.plan_v.modoDigitacaoHora
      this.idCartao = 0 
      var that = this

      var url1 = this.hostTJS+`/listaCartaoPonto` 
      axios.get(url1, { withCredentials: true }).then( function(r) {
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
        percHE1: this.percHE1,
        percHE2: this.percHE2,
        percHE3: this.percHE3,
        percHE4: this.percHE4,
        origemHE: this.origem,
        importarCartaoHE: this.idCartao 
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
    },
    hostWWW () {
        return this.$store.state.hostWWW 
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