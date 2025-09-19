<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Composição da base para cálculo das horas de  sobreaviso</template>
      <template v-slot:body>

        <table class="tabela">
            <tr>
                <td>Somar</td>
            </tr>

            <tr>
                <td><input type="checkbox" v-model="HS_base1" value="1"></td> 
                <td class="align_left">Salário </td>
            </tr>

            <tr v-if="plan_v.checkGratA">
                <td><input type="checkbox" v-model="HS_base2" value="1"></td>
                <td class="align_left">{{ plan_v.descGratA }}</td>
            </tr>

            <tr v-if="plan_v.checkGratB">
                <td><input type="checkbox" v-model="HS_base3" value="1"></td>
                <td class="align_left">{{ plan_v.descGratB }}</td>
            </tr>

            <tr v-if="plan_v.checkGratC">
                <td><input type="checkbox" v-model="HS_base4" value="1"></td>
                <td class="align_left">{{ plan_v.descGratC }}</td>
            </tr>
    
            <tr v-if="plan_v.equiparacaoSalarial">
                <td><input type="checkbox" v-model="HS_base7" value="1"></td>
                <td class="align_left">Diferenças da equiparação salarial</td>
            </tr>
        
            <tr v-if="plan_v.diferencasSalariais">
                <td><input type="checkbox" v-model="HS_base8" value="1"></td>
                <td class="align_left">Diferenças Salariais</td>
            </tr>

            <tr v-if="plan_v.insalubridade">
                <td><input type="checkbox" v-model="HS_base5" value="1"></td>
                <td class="align_left">Insalubridade</td>
            </tr>

            <tr v-if="plan_v.periculosidade">
                <td><input type="checkbox" v-model="HS_base6" value="1"></td>
                <td class="align_left">Periculosidade</td>
            </tr>

            <tbody v-for="vc in verbasCriadas">
              <tr v-if="plan_v[vc.codigo]">
                <td><input type="checkbox" v-model="HS_baseVC[vc.codigo]" value="1"></td>               
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
      HS_base1: false,
      HS_base2: false,
      HS_base3: false,
      HS_base4: false,
      HS_base5: false,
      HS_base6: false,
      HS_base7: false,
      HS_base8: false,
      HS_baseVC: {} 
    };
  },
  methods: {
    openModal(dadosOrigem1) {
      // console.log('dadosOrigem1',dadosOrigem1)
        this.visible = true;
        this.HS_base1 = this.plan_v.HS_base1
        this.HS_base2 = this.plan_v.HS_base2
        this.HS_base3 = this.plan_v.HS_base3
        this.HS_base4 = this.plan_v.HS_base4
        this.HS_base5 = this.plan_v.HS_base5
        this.HS_base6 = this.plan_v.HS_base6
        this.HS_base7 = this.plan_v.HS_base7
        this.HS_base8 = this.plan_v.HS_base8
        if (typeof this.plan_v.HS_baseVC === 'undefined') {
          this.HS_baseVC = {} 
        } else {
          this.HS_baseVC = this.plan_v.HS_baseVC
        }
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        HS_base1: this.HS_base1, 
        HS_base2: this.HS_base2, 
        HS_base3: this.HS_base3,
        HS_base4: this.HS_base4,
        HS_base5: this.HS_base5,
        HS_base6: this.HS_base6,
        HS_base7: this.HS_base7,
        HS_base8: this.HS_base8,
        HS_baseVC: this.HS_baseVC
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