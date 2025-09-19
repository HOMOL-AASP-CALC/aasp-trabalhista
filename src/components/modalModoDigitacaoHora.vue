<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Modo de digitação das horas</template>
      <template v-slot:body >
        <div class="modal_div_principal">


            <b>Modo digitação:</b><br />
            <input type="radio" name="modoDigitacao" value="s" v-model="modoDigitacaoHora"> Sexagesimal (exemplo: 13:55)<br />
            <input type="radio" name="modoDigitacao" value="d" v-model="modoDigitacaoHora"> Decimal (exemplo: 13,91)<br />

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
// import inputNum from "./inputNum";

export default {
  name: "App",
  components: { Modal },
  data() {
    return {
      visible: false,
      modoDigitacaoHora: ''
    };
  },
  methods: {
    openModal() {
      this.visible = true;
      this.modoDigitacaoHora = this.plan_v.modoDigitacaoHora
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        modoDigitacaoHora: this.modoDigitacaoHora,
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
  }
};
</script>

<style scoped>

.tabela {
    width: 80%;
    background-color: #fff;
}

</style> 