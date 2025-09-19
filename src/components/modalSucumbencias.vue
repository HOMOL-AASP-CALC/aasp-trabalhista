<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Honorários de sucumbência</template>
      <template v-slot:body >
        <div  class="modal_div_principal">

              <b>Base de cálculo:</b><br />


              <input type="radio" name="hono_modo" value="nao_calcular" v-model="hono_suc_modo"> Não calcular<br />
              <input type="radio" name="hono_modo" value="total_calculado" v-model="hono_suc_modo"> Utilizar o valor total do cálculo <br />
              <input type="radio" name="hono_modo" value="digitar_base" v-model="hono_suc_modo"> Digitar a base de cálculo<br />
              <input type="radio" name="hono_modo" value="digitar_total" v-model="hono_suc_modo"> Digitar o valor da sucumbência:<br />

                <div v-if="hono_suc_modo=='digitar_base' " ><b>Digite o valor base:</b> <inputNum v-model="hono_suc_valor" /></div>
                <div v-if="hono_suc_modo=='digitar_base' || hono_suc_modo=='total_calculado'" ><b>Percentual dos honorários periciais:</b> <inputNum v-model="hono_suc_perc" /></div> 
                <div v-if="hono_suc_modo=='digitar_total' " ><b>Digitar o valor da sucumbência:</b> <inputNum v-model="hono_suc_total_digitado" /></div>

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
  components: {
    Modal,inputNum
  },
  data() {
    return {
        visible: false,
        hono_suc_perc: '',
        hono_suc_valor: '',
        hono_suc_total_digitado: '',
        hono_suc_modo: '' 
    }
  },
  methods: {
    openModal() {
      this.visible = true;
      this.hono_suc_perc = this.plan_v.hono_suc_perc
      this.hono_suc_valor = this.plan_v.hono_suc_valor
      this.hono_suc_total_digitado = this.plan_v.hono_suc_total_digitado
      this.hono_suc_modo = this.plan_v.hono_suc_modo
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        hono_suc_perc: this.hono_suc_perc,
        hono_suc_valor: this.hono_suc_valor,
        hono_suc_total_digitado: this.hono_suc_total_digitado, 
        hono_suc_modo: this.hono_suc_modo,
      }
      this.$socket.emit('v', dados)  
      this.close () 
    }
  },
  computed: {
    plan_v () {
      return  this.$store.state.variaveis 
    }
  }
};
</script>

<style scoped>

.tabela {
    width: 80%;
    background-color: #fff;
}



</style> 