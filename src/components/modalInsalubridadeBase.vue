<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Reflexos das insalubridade</template>
      <template v-slot:body>

        <b>Composição da base para cálculo</b><br /><br />

        <table class="tabela">
            <tr>
                <td>Somar</td>
            </tr>

            <tr>
                <td><input type="checkbox" v-model="InsalReflex_base5" value="1"></td>
                <td class="align_left">Salário Mínimo</td>
            </tr>

            <tr>
                <td><input type="checkbox" v-model="InsalReflex_base1" value="1"></td> 
                <td class="align_left">Salário </td>
            </tr>

            <tr v-if="plan_v.checkGratA">
                <td><input type="checkbox" v-model="InsalReflex_base2" value="1"></td>
                <td class="align_left">{{ plan_v.descGratA }}</td>
            </tr>

            <tr v-if="plan_v.checkGratB">
                <td><input type="checkbox" v-model="InsalReflex_base3" value="1"></td>
                <td class="align_left">{{ plan_v.descGratB }}</td>
            </tr>

            <tr v-if="plan_v.checkGratC">
                <td><input type="checkbox" v-model="InsalReflex_base4" value="1"></td>
                <td class="align_left">{{ plan_v.descGratC }}</td>
            </tr>
    
            <tr v-if="plan_v.equiparacaoSalarial">
                <td><input type="checkbox" v-model="InsalReflex_base7" value="1"></td>
                <td class="align_left">Diferenças da equiparação salarial</td>
            </tr>
        
            <tr v-if="plan_v.diferencasSalariais">
                <td><input type="checkbox" v-model="InsalReflex_base8" value="1"></td>
                <td class="align_left">Diferenças Salariais</td>
            </tr>

            <!-- <tr><td colspan=4>-- {{InsalReflex_baseVC}} --</td></tr> -->

            <tbody v-for="vc in verbasCriadas">
              <tr v-if="plan_v[vc.codigo]">
                <td><input type="checkbox" v-model="InsalReflex_baseVC[vc.codigo]" value="1"></td>               
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
      InsalReflex_base1: false,
      InsalReflex_base2: false,
      InsalReflex_base3: false,
      InsalReflex_base4: false,
      InsalReflex_base5: false,
      InsalReflex_base7: false,
      InsalReflex_base8: false,
      InsalReflex_baseVC: {}  
    };
  },
  methods: {
    openModal(dadosOrigem1) {
      // console.log('dadosOrigem1',dadosOrigem1)
        this.visible = true;
        this.InsalReflex_base1 = this.plan_v.InsalReflex_base1
        this.InsalReflex_base2 = this.plan_v.InsalReflex_base2
        this.InsalReflex_base3 = this.plan_v.InsalReflex_base3
        this.InsalReflex_base4 = this.plan_v.InsalReflex_base4
        this.InsalReflex_base5 = this.plan_v.InsalReflex_base5 // sal min
        this.InsalReflex_base7 = this.plan_v.InsalReflex_base7
        this.InsalReflex_base8 = this.plan_v.InsalReflex_base8
        if (typeof this.plan_v.InsalReflex_baseVC === 'undefined') {
          this.InsalReflex_baseVC = {} 
        } else {
          this.InsalReflex_baseVC = this.plan_v.InsalReflex_baseVC
        }
        
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        InsalReflex_base1: this.InsalReflex_base1, 
        InsalReflex_base2: this.InsalReflex_base2, 
        InsalReflex_base3: this.InsalReflex_base3,
        InsalReflex_base4: this.InsalReflex_base4,
        InsalReflex_base5: this.InsalReflex_base5,
        InsalReflex_base7: this.InsalReflex_base7,
        InsalReflex_base8: this.InsalReflex_base8, 
        InsalReflex_baseVC: this.InsalReflex_baseVC
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