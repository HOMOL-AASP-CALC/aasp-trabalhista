<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Reflexos das periculosidade</template>
      <template v-slot:body>

        <b>Composição da base para cálculo</b><br /><br />

        <table class="tabela">
            <tr>
                <td>Somar</td>
            </tr>

            <tr>
                <td><input type="checkbox" v-model="PericReflex_base5" value="1"></td>
                <td class="align_left">Salário Mínimo</td>
            </tr>


            <tr>
                <td><input type="checkbox" v-model="PericReflex_base1" value="1"></td> 
                <td class="align_left">Salário </td>
            </tr>

            <tr v-if="plan_v.checkGratA">
                <td><input type="checkbox" v-model="PericReflex_base2" value="1"></td>
                <td class="align_left">{{ plan_v.descGratA }}</td>
            </tr>

            <tr v-if="plan_v.checkGratB">
                <td><input type="checkbox" v-model="PericReflex_base3" value="1"></td>
                <td class="align_left">{{ plan_v.descGratB }}</td>
            </tr>

            <tr v-if="plan_v.checkGratC">
                <td><input type="checkbox" v-model="PericReflex_base4" value="1"></td>
                <td class="align_left">{{ plan_v.descGratC }}</td>
            </tr>
    
            <tr v-if="plan_v.equiparacaoSalarial">
                <td><input type="checkbox" v-model="PericReflex_base7" value="1"></td>
                <td class="align_left">Diferenças da equiparação salarial</td>
            </tr>
        
            <tr v-if="plan_v.diferencasSalariais">
                <td><input type="checkbox" v-model="PericReflex_base8" value="1"></td>
                <td class="align_left">Diferenças Salariais</td>
            </tr>

            <!-- <tr><td colspan=4>-- {{PericReflex_baseVC}} --</td></tr> -->

            <tbody v-for="vc in verbasCriadas">
              <tr v-if="plan_v[vc.codigo]">
                <td><input type="checkbox" v-model="PericReflex_baseVC[vc.codigo]" value="1"></td>               
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
      PericReflex_base1: false,
      PericReflex_base2: false,
      PericReflex_base3: false,
      PericReflex_base4: false,
      PericReflex_base5: false, // salário mínimo
      PericReflex_base7: false,
      PericReflex_base8: false,
      PericReflex_baseVC: {}  
    };
  },
  methods: {
    openModal(dadosOrigem1) {
      // console.log('dadosOrigem1',dadosOrigem1)
        this.visible = true;
        this.PericReflex_base1 = this.plan_v.PericReflex_base1
        this.PericReflex_base2 = this.plan_v.PericReflex_base2
        this.PericReflex_base3 = this.plan_v.PericReflex_base3
        this.PericReflex_base4 = this.plan_v.PericReflex_base4
        this.PericReflex_base5 = this.plan_v.PericReflex_base5 // sal min
        this.PericReflex_base7 = this.plan_v.PericReflex_base7
        this.PericReflex_base8 = this.plan_v.PericReflex_base8
        if (typeof this.plan_v.PericReflex_baseVC === 'undefined') {
          this.PericReflex_baseVC = {} 
        } else {
          this.PericReflex_baseVC = this.plan_v.PericReflex_baseVC
        }
        
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        PericReflex_base1: this.PericReflex_base1, 
        PericReflex_base2: this.PericReflex_base2, 
        PericReflex_base3: this.PericReflex_base3,
        PericReflex_base4: this.PericReflex_base4,
        PericReflex_base5: this.PericReflex_base5, // sal min
        PericReflex_base7: this.PericReflex_base7,
        PericReflex_base8: this.PericReflex_base8, 
        PericReflex_baseVC: this.PericReflex_baseVC
      }
      console.log(dados)
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