<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Reflexos</template>
      <template v-slot:body>

        <b>Como é a composição da base do cálculo?</b><br /><br />

        <table class="tabela">
            <tr>
                <td>Valor do mês</td>
                <td>Média</td>
                <td>Não Somar</td>
                <td>Parcela da remuneração</td>
            </tr>

            <tr>
                <td><input type="radio" name="p1" v-model="salarioReflex_base1" value="mes"></td>
                <td><input type="radio" name="p1" v-model="salarioReflex_base1" value="media"></td>
                <td><input type="radio" name="p1" v-model="salarioReflex_base1" value="nao"></td>
                <td>Salário</td>
            </tr>

            <tr v-if="plan_v.checkGratA">
                <td><input type="radio" name="p2" v-model="salarioReflex_base2" value="mes"></td>
                <td><input type="radio" name="p2" v-model="salarioReflex_base2" value="media"></td>
                <td><input type="radio" name="p2" v-model="salarioReflex_base2" value="nao"></td>
                <td>{{ plan_v.descGratA }}</td>
            </tr>

            <tr v-if="plan_v.checkGratB">
                <td><input type="radio" name="p3" v-model="salarioReflex_base3" value="mes"></td>
                <td><input type="radio" name="p3" v-model="salarioReflex_base3" value="media"></td>
                <td><input type="radio" name="p3" v-model="salarioReflex_base3" value="nao"></td>
                <td>{{ plan_v.descGratB }}</td>
            </tr>

            <tr v-if="plan_v.checkGratC">
                <td><input type="radio" name="p4" v-model="salarioReflex_base4" value="mes"></td>
                <td><input type="radio" name="p4" v-model="salarioReflex_base4" value="media"></td>
                <td><input type="radio" name="p4" v-model="salarioReflex_base4" value="nao"></td>
                <td>{{ plan_v.descGratC }}</td>
            </tr>
    
            <tr v-if="plan_v.dsr">
                <td><input type="radio" name="p5" v-model="salarioReflex_base5" value="mes"></td>
                <td><input type="radio" name="p5" v-model="salarioReflex_base5" value="media"></td>
                <td><input type="radio" name="p5" v-model="salarioReflex_base5" value="nao"></td>
                <td>Descanso semanal remunerado (DSR)</td>
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
import calcUtil from '../plugins/calcUtil' 


export default {
  name: "App",
  components: {
    Modal,
  },
  mixins: [ calcUtil ],
  data() {
    return {
      visible: false,
      salarioReflex_base1: '',
      salarioReflex_base2: '',
      salarioReflex_base3: '',
      salarioReflex_base4: '',
      salarioReflex_base5: ''
    };
  },
  methods: {
    openModal(dadosOrigem1) {
      console.log('dadosOrigem1',dadosOrigem1)
        this.visible = true;
        this.salarioReflex_base1 = this.plan_v.salarioReflex_base1
        this.salarioReflex_base2 = this.plan_v.salarioReflex_base2
        this.salarioReflex_base3 = this.plan_v.salarioReflex_base3
        this.salarioReflex_base4 = this.plan_v.salarioReflex_base4
        this.salarioReflex_base5 = this.plan_v.salarioReflex_base5
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        salarioReflex_base1: this.salarioReflex_base1, 
        salarioReflex_base2: this.salarioReflex_base2, 
        salarioReflex_base3: this.salarioReflex_base3,
        salarioReflex_base4: this.salarioReflex_base4,
        salarioReflex_base5: this.salarioReflex_base5
      }

      this.$socket.emit('v', dados)
      this.close () 
    }
  },
  computed: {
    plan_v () {
      return  this.$store.state.variaveis 
    },
    hostTJS () {
        return this.$store.state.hostTJS 
    }
  }
};
</script>

<style scoped>

.tabela {
    width: 98%;
    background-color: #fff;

}

</style> 