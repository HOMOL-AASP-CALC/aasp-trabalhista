<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Composição da base para cálculo do salário família</template>
      <template v-slot:body>

        <table class="tabela">
            <tr>
                <td>Somar</td>
            </tr>

            <tr>
                <td><input type="checkbox" v-model="SalFam_base1" value="1"></td> 
                <td class="align_left">Salário </td>
            </tr>

            <tr v-if="plan_v.checkGratA">
                <td><input type="checkbox" v-model="SalFam_base2" value="1"></td>
                <td class="align_left">{{ plan_v.descGratA }}</td>
            </tr>

            <tr v-if="plan_v.checkGratB">
                <td><input type="checkbox" v-model="SalFam_base3" value="1"></td>
                <td class="align_left">{{ plan_v.descGratB }}</td>
            </tr>

            <tr v-if="plan_v.checkGratC">
                <td><input type="checkbox" v-model="SalFam_base4" value="1"></td>
                <td class="align_left">{{ plan_v.descGratC }}</td>
            </tr>
    
            <tr v-if="plan_v.equiparacaoSalarial">
                <td><input type="checkbox" v-model="SalFam_base5" value="1"></td>
                <td class="align_left">Diferenças da equiparação salarial</td>
            </tr>
        
            <tr v-if="plan_v.diferencasSalariais">
                <td><input type="checkbox" v-model="SalFam_base6" value="1"></td>
                <td class="align_left">Diferenças salariais</td>
            </tr>



        </table>

        <button  type="button"   class="btn-open-modal"  @click="enviaForm"   aria-label="Close Modal"> OK </button>
        <button  type="button"   class="btn-open-modal"  @click="close"   aria-label="Close Modal"> Cancela </button>

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
      SalFam_base1: false,
      SalFam_base2: false,
      SalFam_base3: false,
      SalFam_base4: false, 
      SalFam_base5: false, 
      SalFam_base6: false,
    };
  },
  methods: {
    openModal(dadosOrigem1) {
      console.log('dadosOrigem1',dadosOrigem1)
        this.visible = true;
        this.SalFam_base1 = this.plan_v.SalFam_base1
        this.SalFam_base2 = this.plan_v.SalFam_base2
        this.SalFam_base3 = this.plan_v.SalFam_base3
        this.SalFam_base4 = this.plan_v.SalFam_base4
        this.SalFam_base5 = this.plan_v.SalFam_base5
        this.SalFam_base6 = this.plan_v.SalFam_base6
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        SalFam_base1: this.SalFam_base1, 
        SalFam_base2: this.SalFam_base2, 
        SalFam_base3: this.SalFam_base3,
        SalFam_base4: this.SalFam_base4,
        SalFam_base5: this.SalFam_base5,
        SalFam_base6: this.SalFam_base6,
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
    width: 98%;
    background-color: #fff;

}

.align_left {
    text-align: left;
}

</style> 