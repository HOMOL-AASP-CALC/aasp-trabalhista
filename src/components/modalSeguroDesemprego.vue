<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Seguro Desemprego</template>
      <template v-slot:body >
        <div class="modal_div_principal">
            <table>
                <tr>
                    <td>Deseja calcular seguro desemprego?<!-- {{seguroDesempregoSN}}--></td>
                    <td><input type="radio" name="v1" value="s" v-model="seguroDesempregoSN" />Sim</td>
                    <td><input type="radio" name="v1" value="n" v-model="seguroDesempregoSN" />Não</td>
                </tr>
                <tr>
                    <td>Deseja atualizar monetariamente o seguro desemprego?<!-- {{seguroDesempregoCorrigir}} --></td>
                    <td><input type="radio" name="v2" value="s" v-model="seguroDesempregoCorrigir" />Sim</td>
                    <td><input type="radio" name="v2" value="n" v-model="seguroDesempregoCorrigir" />Não</td>
                </tr>
                <tr>
                    <td>Número de parcelas:</td>
                    <td><inputNum v-model="seguroDesempregoParcelas" /></td>
                </tr>
            </table>

            <br /><br />
           <button  type="button"   class="btn-open-modal"  @click="enviaForm"   aria-label="Close Modal"> OK </button>
           <button  type="button"   class="btn-open-modal"  @click="close"   aria-label="Close Modal"> Cancelar </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "./modal";
import inputNum from './inputNum' 

export default {
  name: "App",
  components: {  Modal, inputNum },
  data() {
    return {
      visible: false,
      seguroDesempregoSN: false,
      seguroDesempregoCorrigir: true,
      seguroDesempregoParcelas: 3 
    };
  },
  methods: {
    openModal() {
      this.seguroDesempregoSN = this.plan_v.seguroDesemprego ? "s" : "n"
      this.seguroDesempregoCorrigir = this.plan_v.seguroDesempregoCorrigir ? "s" : "n" 
      this.seguroDesempregoParcelas = this.plan_v.seguroDesempregoParcelas  
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        seguroDesemprego: (this.seguroDesempregoSN == "s") ,
        seguroDesempregoCorrigir: (this.seguroDesempregoCorrigir == "s") ,
        seguroDesempregoParcelas: this.seguroDesempregoParcelas
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
    width: 80%;
    background-color: #fff;
}

</style> 