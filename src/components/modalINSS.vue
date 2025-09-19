<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>INSS</template>
      <template v-slot:body >
        <div  class="modal_div_principal">

            <b>Deseja calcular INSS do reclamante?</b><br />
            <input type="radio" name="inss_reclamante" value="1" v-model="inss_reclamante"> Sim 
            <input type="radio" name="inss_reclamante" value="0" v-model="inss_reclamante"> Não <br />

            <b>Deseja deduzir o INSS para calcular juros?</b><br />
            <input type="radio" name="inss_juros" value="1" v-model="inss_juros"> Sim 
            <input type="radio" name="inss_juros" value="0" v-model="inss_juros"> Não <br />


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
      inss_reclamante: '1',
      inss_juros: '',
    };
  },
  methods: {
    openModal() {
      this.visible = true;
      this.inss_reclamante = this.plan_v.inss_reclamante
      this.inss_juros = this.plan_v.inss_juros
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        inss_reclamante: this.inss_reclamante,
        inss_juros: this.inss_juros,
      }
      console.log('enviaFOrm modalJuros.vue', dados)
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

.obs {
    width: 500px;
    line-height:20px;
    font-size:16px;
    padding: 10px;
    border: 1px solid #ddd;
    background-color: #eee;
    border-radius: 4px;
    margin-top: 18px;
}



</style> 