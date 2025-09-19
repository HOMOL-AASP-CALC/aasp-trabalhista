<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Composição da base para cálculo das diferenças salariais</template>
      <template v-slot:body>

        <table class="tabela">
            <tr>
                <td>Somar</td>
                <!-- <td>{{ plan_v.Difsal_base1 }}</td> -->
            </tr>

            <tr>
                <td><input type="checkbox" v-model="DifSal_base1"  value="1"></td> 
                <td class="align_left">Salário</td>
            </tr>

            <tr v-if="plan_v.checkGratA">
                <td><input type="checkbox" v-model="DifSal_base2" value="1"></td>
                <td class="align_left">{{ plan_v.descGratA }}</td>
            </tr>

            <tr v-if="plan_v.checkGratB">
                <td><input type="checkbox" v-model="DifSal_base3" value="1"></td>
                <td class="align_left">{{ plan_v.descGratB }}</td>
            </tr>

            <tr v-if="plan_v.checkGratC">
                <td><input type="checkbox" v-model="DifSal_base4" value="1"></td>
                <td class="align_left">{{ plan_v.descGratC }}</td>
            </tr>
    
            <tr v-if="plan_v.equiparacaoSalarial">
                <td><input type="checkbox" v-model="DifSal_base5" value="1"></td>
                <td class="align_left">Diferenças da equiparação salarial</td>
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
      DifSal_base1: false,
      DifSal_base2: false,
      DifSal_base3: false,
      DifSal_base4: false, 
      DifSal_base5: false, 
    };
  },
  methods: {
    openModal(dadosOrigem1) {
      console.log('dadosOrigem1',dadosOrigem1)
        this.visible = true;
        this.DifSal_base1 = this.plan_v.DifSal_base1
        this.DifSal_base2 = this.plan_v.DifSal_base2
        this.DifSal_base3 = this.plan_v.DifSal_base3
        this.DifSal_base4 = this.plan_v.DifSal_base4
        this.DifSal_base5 = this.plan_v.DifSal_base5
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        DifSal_base1: this.DifSal_base1, 
        DifSal_base2: this.DifSal_base2, 
        DifSal_base3: this.DifSal_base3,
        DifSal_base4: this.DifSal_base4,
        DifSal_base5: this.DifSal_base5,
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