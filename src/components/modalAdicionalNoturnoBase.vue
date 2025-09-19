<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Composição da base para cálculo do adicional noturno</template>
      <template v-slot:body>

        <table class="tabela">
            <tr>
                <td>Somar</td>
            </tr>

            <tr>
                <td><input type="checkbox" v-model="AdicNot_base1" value="1"></td> 
                <td class="align_left">Salário </td>
            </tr>

            <tr v-if="plan_v.checkGratA">
                <td><input type="checkbox" v-model="AdicNot_base2" value="1"></td>
                <td class="align_left">{{ plan_v.descGratA }}</td>
            </tr>

            <tr v-if="plan_v.checkGratB">
                <td><input type="checkbox" v-model="AdicNot_base3" value="1"></td>
                <td class="align_left">{{ plan_v.descGratB }}</td>
            </tr>

            <tr v-if="plan_v.checkGratC">
                <td><input type="checkbox" v-model="AdicNot_base4" value="1"></td>
                <td class="align_left">{{ plan_v.descGratC }}</td>
            </tr>
    
            <tr v-if="plan_v.equiparacaoSalarial">
                <td><input type="checkbox" v-model="AdicNot_base7" value="1"></td>
                <td class="align_left">Diferenças da equiparação salarial</td>
            </tr>
        
            <tr v-if="plan_v.diferencasSalariais">
                <td><input type="checkbox" v-model="AdicNot_base8" value="1"></td>
                <td class="align_left">Diferenças Salariais</td>
            </tr>

            <tr v-if="plan_v.insalubridade">
                <td><input type="checkbox" v-model="AdicNot_base5" value="1"></td>
                <td class="align_left">Insalubridade</td>
            </tr>

            <tr v-if="plan_v.periculosidade">
                <td><input type="checkbox" v-model="AdicNot_base6" value="1"></td>
                <td class="align_left">Periculosidade</td>
            </tr>

            <tbody v-for="vc in verbasCriadas">
              <tr v-if="plan_v[vc.codigo]">
                <td><input type="checkbox" v-model="AdicNot_baseVC[vc.codigo]" value="1"></td>               
                <td class="align_left">{{vc.nome}} </td>  
              </tr>
            </tbody>

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
      AdicNot_base1: false,
      AdicNot_base2: false,
      AdicNot_base3: false,
      AdicNot_base4: false,
      AdicNot_base5: false,
      AdicNot_base6: false,
      AdicNot_base7: false,
      AdicNot_base8: false,
      AdicNot_baseVC: {},
    };
  },
  methods: {
    openModal(dadosOrigem1) {
      // console.log('dadosOrigem1',dadosOrigem1)
        this.visible = true;
        this.AdicNot_base1 = this.plan_v.AdicNot_base1
        this.AdicNot_base2 = this.plan_v.AdicNot_base2
        this.AdicNot_base3 = this.plan_v.AdicNot_base3
        this.AdicNot_base4 = this.plan_v.AdicNot_base4
        this.AdicNot_base5 = this.plan_v.AdicNot_base5
        this.AdicNot_base6 = this.plan_v.AdicNot_base6
        this.AdicNot_base7 = this.plan_v.AdicNot_base7
        this.AdicNot_base8 = this.plan_v.AdicNot_base8
        if (typeof this.plan_v.AdicNot_baseVC === 'undefined') {
          this.AdicNot_baseVC = {} 
        } else {
          this.AdicNot_baseVC = this.plan_v.AdicNot_baseVC
        }
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        AdicNot_base1: this.AdicNot_base1, 
        AdicNot_base2: this.AdicNot_base2, 
        AdicNot_base3: this.AdicNot_base3,
        AdicNot_base4: this.AdicNot_base4,
        AdicNot_base5: this.AdicNot_base5,
        AdicNot_base6: this.AdicNot_base6,
        AdicNot_base7: this.AdicNot_base7,
        AdicNot_base8: this.AdicNot_base8,
        AdicNot_baseVC: this.AdicNot_baseVC
      }

      this.$socket.emit('v', dados)
      this.close () 
    }
  },
  computed: {
    plan_v () {
      return  this.$store.state.variaveis 
    },
    verbasCriadas () {
                if (typeof this.$store.state.variaveis.verbasCriadas === 'undefined') return []  
                var that = this 
                return this.$store.state.variaveis.verbasCriadas.filter( function(e) {
                    return (e.calculo_especifico <= 0 || e.calculo_especifico == that.$store.state.idCalc );
                } ) 
            }
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