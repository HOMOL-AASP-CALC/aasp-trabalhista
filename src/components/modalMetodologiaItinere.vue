<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Modo de cálculo das horas in itinere</template>
      <template v-slot:body >
        <div class="modal_div_principal">
            <b>Modo digitação:</b><br />
            <input type="radio" name="modoDigitacao" value="percentual" v-model="horasItinereMetodo"> Aplicar apenas o percentual<br />
            <input type="radio" name="modoDigitacao" value="horaPercentual" v-model="horasItinereMetodo"> Aplicar hora + percentual<br />

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


export default {
  name: "App",
  components: {  Modal },
  data() {
    return {
      visible: false,
      horasItinereMetodo: ''
    };
  },
  methods: {
    openModal() {
      this.horasItinereMetodo = this.plan_v.horasItinereMetodo
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        horasItinereMetodo: this.horasItinereMetodo,
      }

      this.$socket.emit('v', dados) 

      this.close () 
    }
  },
  computed: {
    plan_v () {
      return  this.$store.state.variaveis 
    },
  }
};
</script>

<style scoped>

.tabela {
    width: 80%;
    background-color: #fff;
}

</style> 