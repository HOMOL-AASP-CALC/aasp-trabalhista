<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>INSS da Reclamada</template>
      <template v-slot:body >
        <div  class="modal_div_principal">

            <b>Deseja calcular INSS da reclamada?</b><br />
            <input type="radio" name="inssemp_sn" value="1" v-model="inssemp_sn"> Sim 
            <input type="radio" name="inssemp_sn" value="0" v-model="inssemp_sn"> Não <br />


            <b>Percentual do empregador:</b> <inputNum v-model="inssemp_e" />
            <b>Percentual de terceiros:</b> <inputNum v-model="inssemp_t" />
            <b>Percentual ref. ao SAT:</b> <inputNum v-model="inssemp_s" />
            

           <button  type="button"   class="btn-open-modal"  @click="enviaForm"   aria-label="Close Modal"> OK </button>
           <button  type="button"   class="btn-open-modal"  @click="close"   aria-label="Close Modal"> Cancelar </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "./modal";
import inputNum from './inputNum' 

export default {
  name: "App",
  components: {
    Modal,inputNum
  },
  data() {
    return {
        visible: false,
        inssemp_sn: '0',
        inssemp_e: 0,
        inssemp_t: 0,
        inssemp_s: 0 
    }
  },
  methods: {
    openModal() {
      this.visible = true;
      this.inssemp_sn = this.plan_v.inssemp_sn
      this.inssemp_e = this.plan_v.inssemp_e
      this.inssemp_t = this.plan_v.inssemp_t
      this.inssemp_s = this.plan_v.inssemp_s
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        inssemp_sn: this.inssemp_sn,
        inssemp_e: this.inssemp_e,
        inssemp_t: this.inssemp_t, 
        inssemp_s: this.inssemp_s,
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