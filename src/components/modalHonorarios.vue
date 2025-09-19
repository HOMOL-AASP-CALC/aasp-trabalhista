<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Honorários</template>
      <template v-slot:body >
        <div  class="modal_div_principal">

              <b>Deseja calcular honorários advocatícios?</b><br />


              <input type="radio" name="hono_modo" value="n" v-model="hono_modo"> Não <br />
              <input type="radio" name="hono_modo" value="l" v-model="hono_modo"> Sim, sobre o valor líquido da ação <br />
              <input type="radio" name="hono_modo" value="c" v-model="hono_modo"> Sim, sobre o valor da ação sem descontar INSS e IRRF<br />
              <input type="radio" name="hono_modo" value="d" v-model="hono_modo"> Sim, mas quero digitar o valor dos honorários<br />

                <div v-if="hono_modo=='d' " >Valor dos honorários: <inputNum v-model="hono_val" /></div>
                <div v-if="hono_modo=='l' || hono_modo=='c'" >Percentual dos honorários: <inputNum v-model="hono_perc" /></div> 
                <div v-if="hono_modo!='n' " >
                    <br /><input type=checkbox v-model="hono_inss" value="1"> Somar INSS da reclamada para compor a base dos honorários advocatícios<br />
                </div>

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
        hono_perc: '',
        hono_inss: '',
        hono_modo: '',
        hono_val: '' 
    };
  },
  methods: {
    openModal() {
      this.visible = true;
      this.hono_perc = this.plan_v.hono_perc
      this.hono_val = this.plan_v.hono_val
      this.hono_inss = this.plan_v.hono_inss
      this.hono_modo = this.plan_v.hono_modo
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        hono_perc: this.hono_perc,
        hono_val: this.hono_val,
        hono_inss: this.hono_inss,
        hono_modo: this.hono_modo, 
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