<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Deflacionar coluna</template>
      <template v-slot:body >
        <div  class="modal_div_principal">
        <b>Digite o valor para deflacionar :</b><br />
            <inputNum v-model="valor"  />
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

export default {
  name: "App",
  components: {  Modal, inputNum },
  data() {
    return {
      visible: false,
      valor: 0 
    };
  },
  methods: {
    openModal() {
      this.visible = true;

    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 

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