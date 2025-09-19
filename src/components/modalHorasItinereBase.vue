<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Reflexos das horas in itiniere nas demais verbas</template>
      <template v-slot:body>

        <b>Composição da base para cálculo do salário/hora</b><br /><br />

        <table class="tabela">
            <tr>
                <td>Somar</td>
            </tr>

            <tr>
                <td><input type="checkbox" v-model="HI_base1" value="1"></td> 
                <td class="align_left">Salário </td>
            </tr>

            <tr v-if="plan_v.checkGratA">
                <td><input type="checkbox" v-model="HI_base2" value="1"></td>
                <td class="align_left">{{ plan_v.descGratA }}</td>
            </tr>

            <tr v-if="plan_v.checkGratB">
                <td><input type="checkbox" v-model="HI_base3" value="1"></td>
                <td class="align_left">{{ plan_v.descGratB }}</td>
            </tr>

            <tr v-if="plan_v.checkGratC">
                <td><input type="checkbox" v-model="HI_base4" value="1"></td>
                <td class="align_left">{{ plan_v.descGratC }}</td>
            </tr>
    
            <tr v-if="plan_v.equiparacaoSalarial">
                <td><input type="checkbox" v-model="HI_base7" value="1"></td>
                <td class="align_left">Diferenças da equiparação salarial</td>
            </tr>
        
            <tr v-if="plan_v.diferencasSalariais">
                <td><input type="checkbox" v-model="HI_base8" value="1"></td>
                <td class="align_left">Diferenças Salariais</td>
            </tr>

            <tr v-if="plan_v.insalubridade">
                <td><input type="checkbox" v-model="HI_base5" value="1"></td>
                <td class="align_left">Insalubridade</td>
            </tr>

            <tr v-if="plan_v.periculosidade">
                <td><input type="checkbox" v-model="HI_base6" value="1"></td>
                <td class="align_left">Periculosidade</td>
            </tr>

            <tbody v-for="vc in verbasCriadas">
              <tr v-if="plan_v[vc.codigo]">
                <td><input type="checkbox" v-model="HI_baseVC[vc.codigo]" value="1"></td>               
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
      HI_base1: false,
      HI_base2: false,
      HI_base3: false,
      HI_base4: false,
      HI_base5: false,
      HI_base6: false,
      HI_base7: false,
      HI_base8: false,
      HI_baseVC: {}  
    };
  },
  methods: {
    openModal(dadosOrigem1) {
      // console.log('dadosOrigem1',dadosOrigem1)
        this.visible = true;
        this.HI_base1 = this.plan_v.HI_base1
        this.HI_base2 = this.plan_v.HI_base2
        this.HI_base3 = this.plan_v.HI_base3
        this.HI_base4 = this.plan_v.HI_base4
        this.HI_base5 = this.plan_v.HI_base5
        this.HI_base6 = this.plan_v.HI_base6
        this.HI_base7 = this.plan_v.HI_base7
        this.HI_base8 = this.plan_v.HI_base8
        if (typeof this.plan_v.HI_baseVC === 'undefined') {
          this.HI_baseVC = {} 
        } else {
          this.HI_baseVC = this.plan_v.HI_baseVC
        }
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        HI_base1: this.HI_base1, 
        HI_base2: this.HI_base2, 
        HI_base3: this.HI_base3,
        HI_base4: this.HI_base4,
        HI_base5: this.HI_base5,
        HI_base6: this.HI_base6,
        HI_base7: this.HI_base7,
        HI_base8: this.HI_base8,
        HI_baseVC: this.HI_baseVC
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