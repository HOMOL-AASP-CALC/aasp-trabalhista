<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>IRRF</template>
      <template v-slot:body >
        <div  class="modal_div_principal">

            <b>Deseja calcular IRRF?</b><br />
            <input type="radio" name="irrf_sn" value="1" v-model="irrf_sn"> Sim 
            <input type="radio" name="irrf_sn" value="0" v-model="irrf_sn"> Não <br />

            <b>Selecione o regime de cálculo:</b><br />
            <input type="radio" name="irrf_modo" value="1127" v-model="irrf_modo"> Instrução normativa 1500/14 <br />
            <input type="radio" name="irrf_modo" value="caixa" v-model="irrf_modo"> Caixa <br />

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
      irrf_sn: '1',
      irrf_modo: '',
    };
  },
  methods: {
    openModal() {
      this.visible = true;
      this.irrf_sn = this.plan_v.irrf_sn
      this.irrf_modo = this.plan_v.irrf_modo
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        irrf_sn: this.irrf_sn,
        irrf_modo: this.irrf_modo,
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