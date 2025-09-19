<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Modo de cálculo das horas intrajornada</template>
      <template v-slot:body >
        <div class="modal_div_principal">
            <b>Modo digitação:</b><br />
            <input type="radio" name="modoDigitacao" value="percentual" v-model="horasIntraMetodo"> Aplicar apenas o percentual<br />
            <input type="radio" name="modoDigitacao" value="horaPercentual" v-model="horasIntraMetodo"> Aplicar hora + percentual<br />

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
      horasIntraMetodo: ''
    };
  },
  methods: {
    openModal() {
      this.horasIntraMetodo = this.plan_v.horasIntraMetodo
      if (!this.horasIntraMetodo) this.horasIntraMetodo = 'percentual'
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        horasIntraMetodo: this.horasIntraMetodo,
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