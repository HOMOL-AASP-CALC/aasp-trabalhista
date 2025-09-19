<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Base do DSR</template>
      <template v-slot:body>

        <b>Composição da base para cálculo da base</b><br /><br />

        <table class="tabela">
            <tr>
                <td>Somar</td>
            </tr>

            <tr>
                <td><input type="checkbox" v-model="DSR_base1" value="1"></td> 
                <td class="align_left">Salário </td>
            </tr>

            <tr v-if="plan_v.checkGratA">
                <td><input type="checkbox" v-model="DSR_base2" value="1"></td>
                <td class="align_left">{{ plan_v.descGratA }}</td>
            </tr>

            <tr v-if="plan_v.checkGratB">
                <td><input type="checkbox" v-model="DSR_base3" value="1"></td>
                <td class="align_left">{{ plan_v.descGratB }}</td>
            </tr>

            <tr v-if="plan_v.checkGratC">
                <td><input type="checkbox" v-model="DSR_base4" value="1"></td>
                <td class="align_left">{{ plan_v.descGratC }}</td>
            </tr>
    
            <tr v-if="plan_v.equiparacaoSalarial">
                <td><input type="checkbox" v-model="DSR_base5" value="1"></td>
                <td class="align_left">Diferenças da equiparação salarial</td>
            </tr>
        
            <tr v-if="plan_v.diferencasSalariais">
                <td><input type="checkbox" v-model="DSR_base6" value="1"></td>
                <td class="align_left">Diferenças Salariais</td>
            </tr>


            <!-- <tr><td colspan=4>-- {{HEReflex_baseVC}} --</td></tr> -->
            <tbody v-for="vc in verbasCriadas">
              <tr v-if="plan_v[vc.codigo]">
                <td><input type="checkbox" v-model="DSR_baseVC[vc.codigo]" value="1"></td>               
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
      DSR_base1: false,
      DSR_base2: false,
      DSR_base3: false,
      DSR_base4: false,
      DSR_base5: false,
      DSR_base6: false,
      DSR_baseVC: {}  
    };
  },
  methods: {
    openModal(dadosOrigem1) {
      // console.log('dadosOrigem1',dadosOrigem1)
        this.visible = true;
        this.DSR_base1 = this.plan_v.DSR_base1
        this.DSR_base2 = this.plan_v.DSR_base2
        this.DSR_base3 = this.plan_v.DSR_base3
        this.DSR_base4 = this.plan_v.DSR_base4
        this.DSR_base5 = this.plan_v.DSR_base5
        this.DSR_base6 = this.plan_v.DSR_base6
        if (typeof this.plan_v.DSR_baseVC === 'undefined') {
          this.DSR_baseVC = {} 
        } else {
          this.DSR_baseVC = this.plan_v.DSR_baseVC
        }
        
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        DSR_base1: this.DSR_base1, 
        DSR_base2: this.DSR_base2, 
        DSR_base3: this.DSR_base3,
        DSR_base4: this.DSR_base4,
        DSR_base5: this.DSR_base5,
        DSR_base6: this.DSR_base6,
        DSR_baseVC: this.DSR_baseVC
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