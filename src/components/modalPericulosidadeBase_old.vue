<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Base da periculosidade</template>
      <template v-slot:body >
        <div  class="modal_div_principal">

           <b>Escolha a base do cálculo:</b><br />
              <input type="radio" name="insalubridadeBasex" value="salmin" v-model="periculosidadeBase"> Salário mínimo<br />
              <input type="radio" name="insalubridadeBasex" value="salario" v-model="periculosidadeBase"> Salário<br />

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
      periculosidadeBase: '1',
    };
  },
  methods: {
    openModal() {
      this.visible = true;
      this.periculosidadeBase = this.plan_v.periculosidadeBase 
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        periculosidadeBase: this.periculosidadeBase,
      }
      
      this.$socket.emit('v', dados) 
      this.close () 
    }
  },
  computed: {
    plan_v () {
      return  this.$store.state.variaveis 
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