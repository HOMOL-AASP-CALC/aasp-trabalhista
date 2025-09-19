<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Honorários periciais</template>
      <template v-slot:body >
        <div  class="modal_div_principal">

              <b>Deseja calcular honorários periciais?</b><br />


              <input type="radio" name="hono_modo" value="0" v-model="hono_per_modo"> Não <br />
              <input type="radio" name="hono_modo" value="l" v-model="hono_per_modo"> Sim, sobre o valor líquido da ação <br />
              <input type="radio" name="hono_modo" value="c" v-model="hono_per_modo"> Sim, sobre o valor da ação sem descontar INSS e IRRF<br />
              <input type="radio" name="hono_modo" value="v" v-model="hono_per_modo"> Sim, mas quero digitar o valor dos honorários<br />

                <div v-if="hono_per_modo=='v' " ><b>Valor dos honorários do perito:</b> <inputNum v-model="hono_per_val" /></div>
                <div v-if="hono_per_modo=='l' || hono_per_modo=='c'" ><b>Percentual dos honorários periciais:</b> <inputNum v-model="hono_per_perc" /></div> 

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
        hono_per_perc: '',
        hono_per_modo: '',
        hono_per_val: '' 
    };
  },
  methods: {
    openModal() {
      this.visible = true;
      this.hono_per_perc = this.plan_v.hono_per_perc
      this.hono_per_val = this.plan_v.hono_per_val
      this.hono_per_modo = this.plan_v.hono_per_modo
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        hono_per_perc: this.hono_per_perc,
        hono_per_val: this.hono_per_val,
        hono_per_modo: this.hono_per_modo, 
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