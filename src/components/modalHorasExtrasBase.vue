<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Reflexos das horas extras nas demais verbas</template>
      <template v-slot:body>

        <b>Composição da base para cálculo do salário/hora</b><br /><br />

        <table class="tabela">
            <tr>
                <td>Somar</td>
            </tr>

            <tr>
                <td><input type="checkbox" v-model="HEReflex_base1" value="1"></td> 
                <td class="align_left">Salário </td>
            </tr>

            <tr v-if="plan_v.checkGratA">
                <td><input type="checkbox" v-model="HEReflex_base2" value="1"></td>
                <td class="align_left">{{ plan_v.descGratA }}</td>
            </tr>

            <tr v-if="plan_v.checkGratB">
                <td><input type="checkbox" v-model="HEReflex_base3" value="1"></td>
                <td class="align_left">{{ plan_v.descGratB }}</td>
            </tr>

            <tr v-if="plan_v.checkGratC">
                <td><input type="checkbox" v-model="HEReflex_base4" value="1"></td>
                <td class="align_left">{{ plan_v.descGratC }}</td>
            </tr>
    
            <tr v-if="plan_v.equiparacaoSalarial">
                <td><input type="checkbox" v-model="HEReflex_base7" value="1"></td>
                <td class="align_left">Diferenças da equiparação salarial</td>
            </tr>
        
            <tr v-if="plan_v.diferencasSalariais">
                <td><input type="checkbox" v-model="HEReflex_base8" value="1"></td>
                <td class="align_left">Diferenças Salariais</td>
            </tr>

            <tr v-if="plan_v.insalubridade">
                <td><input type="checkbox" v-model="HEReflex_base5" value="1"></td>
                <td class="align_left">Insalubridade</td>
            </tr>

            <tr v-if="plan_v.periculosidade">
                <td><input type="checkbox" v-model="HEReflex_base6" value="1"></td>
                <td class="align_left">Periculosidade</td>
            </tr>

            <!-- <tr><td colspan=4>-- {{HEReflex_baseVC}} --</td></tr> -->

            <tbody v-for="vc in verbasCriadas">
              <tr v-if="plan_v[vc.codigo]">
                <td><input type="checkbox" v-model="HEReflex_baseVC[vc.codigo]" value="1"></td>               
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
      HEReflex_base1: false,
      HEReflex_base2: false,
      HEReflex_base3: false,
      HEReflex_base4: false,
      HEReflex_base5: false,
      HEReflex_base6: false,
      HEReflex_base7: false,
      HEReflex_base8: false,
      HEReflex_baseVC: {}  
    };
  },
  methods: {
    openModal(dadosOrigem1) {
      // console.log('dadosOrigem1',dadosOrigem1)
        this.visible = true;
        this.HEReflex_base1 = this.plan_v.HEReflex_base1
        this.HEReflex_base2 = this.plan_v.HEReflex_base2
        this.HEReflex_base3 = this.plan_v.HEReflex_base3
        this.HEReflex_base4 = this.plan_v.HEReflex_base4
        this.HEReflex_base5 = this.plan_v.HEReflex_base5
        this.HEReflex_base6 = this.plan_v.HEReflex_base6
        this.HEReflex_base7 = this.plan_v.HEReflex_base7
        this.HEReflex_base8 = this.plan_v.HEReflex_base8
        if (typeof this.plan_v.HEReflex_baseVC === 'undefined') {
          this.HEReflex_baseVC = {} 
        } else {
          this.HEReflex_baseVC = this.plan_v.HEReflex_baseVC
        }
        
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        HEReflex_base1: this.HEReflex_base1, 
        HEReflex_base2: this.HEReflex_base2, 
        HEReflex_base3: this.HEReflex_base3,
        HEReflex_base4: this.HEReflex_base4,
        HEReflex_base5: this.HEReflex_base5,
        HEReflex_base6: this.HEReflex_base6,
        HEReflex_base7: this.HEReflex_base7,
        HEReflex_base8: this.HEReflex_base8, 
        HEReflex_baseVC: this.HEReflex_baseVC
      }
      // console.log(dados)
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