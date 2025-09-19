<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Remuneração</template>
      <template v-slot:body >
        <div class="modal_div_principal">

        <b>Digite o último salário para deflacionar (se desejar):</b><br />
            <inputNum v-model="deflacionarVr" />

           <br />


           <b>Além do salário o reclamante tem direito a mais algum tipo de gratificação?</b><br />
              <input type="checkbox" v-model="checkGratA"> 
              <input type='text' v-model="descGratA" class="alinharEsquerda" style="width: 350px;"><br />

              <input type="checkbox"  v-model="checkGratB"> 
              <input type='text' v-model="descGratB" class="alinharEsquerda" style="width: 350px;"><br />

              <input type="checkbox"  v-model="checkGratC"> 
              <input type='text' v-model="descGratC" class="alinharEsquerda" style="width: 350px;"><br />


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
      checkGratA: false,
      checkGratB: false,
      checkGratC: false,
      descGratA: '',
      descGratB: '',
      descGratC: '',
      deflacionarVr: 0  
    };
  },
  methods: {
    openModal() {
      this.visible = true;
      this.checkGratA = this.plan_v.checkGratA
      this.checkGratB = this.plan_v.checkGratB
      this.checkGratC = this.plan_v.checkGratC
      this.descGratA = this.plan_v.descGratA
      this.descGratB = this.plan_v.descGratB
      this.descGratC = this.plan_v.descGratC
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        checkGratA: this.checkGratA,
        checkGratB: this.checkGratB,
        checkGratC: this.checkGratC,
        descGratA: this.descGratA,
        descGratB: this.descGratB,
        descGratC: this.descGratC,
      }
      
      if (this.deflacionarVr > 0) {
        console.log('passei')
        dados.deflacionarAnexo = 'salario' 
        dados.deflacionarColuna = 'salario'
        dados.deflacionarVr = this.deflacionarVr
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