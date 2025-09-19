<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Juros</template>
      <template v-slot:body >
        <div  class="modal_div_principal">

            <b>Deseja calcular juros?</b><br />
            <input type="radio" name="juros_sn" value="1" v-model="juros_sn"> Sim 
            <input type="radio" name="juros_sn" value="0" v-model="juros_sn"> Não <br />

           <div v-if="juros_sn=='1'">

              <b>Escolha a metodologia do cálculo:</b><br />
              <input type="radio" name="juros_modo_calc" value="m" v-model="juros_modo_calc"> Juros de 1% ao mês simples <br />
              <input type="radio" name="juros_modo_calc" value="p" v-model="juros_modo_calc"> Poupança<br />
              <input type="radio" name="juros_modo_calc" value="selic" v-model="juros_modo_calc"> Selic a partir da citação<br />


            <b>Mais opções:</b><br />
           
           <div v-if="juros_modo_calc == 'm' || juros_modo_calc == 'p' "> 
                O juros deve ser calculado até: <input type=text v-model="dataco"><br />

                Deseja cálculo pró-rata? 
                <input type="radio" name="juros_tipo" value="prorata" v-model="juros_tipo"> Sim 
                <input type="radio" name="juros_tipo" value="" v-model="juros_tipo"> Não <br />
            </div>

           <div v-if="juros_modo_calc == 'selic'  "> 
                Tipo de cálculo: 
                <input type="radio" name="juros_modo_calc_selic" value="simples" v-model="juros_modo_calc_selic"> Simples 
                <input type="radio" name="juros_modo_calc_selic" value="composto" v-model="juros_modo_calc_selic"> Composto <br />
                Data da citação: <input type=text v-model="dataci"><br />
                O juros deve ser calculado até: <input type=text v-model="dataco"><br />
                <input type=checkbox v-model="juros_adic_1_perc" value="1"> Acrescentar 1% ao mês de juros simples<br />
                <div class="obs"><span style="color:red;">Atenção:</span> No julgamento da ADC nº 58 o STF considerou inconstitucional a aplicação da TR para atualização dos débitos judiciais dos entes privados, determinando a aplicação do IPCA-E mais TR na fase extrajudicial, e da taxa Selic na fase judicial. Todavia, não há uniformidade de entendimento quanto a aplicação dos critérios estabelecidos na ADC nº 58, devendo o usuário atentar para o quanto estabelecido na decisão liquidanda de cada caso concreto.</span></div>
            </div>

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

export default {
  name: "App",
  components: {
    Modal,
  },
  data() {
    return {
      visible: false,
      juros_sn: '1',
      juros_dia_final: '',
      juros_perc: '',
      juros_tipo: '',  // 'prorata' ou ''  
      juros_sn: '',
      juros_modo_calc: 'm',
      juros_adic_1_perc: '',
      juros_modo_calc_selic: '',
      dataci: '',
      dataco: '',
      juros_adic_1_perc: 0 
    };
  },
  methods: {
    openModal() {
      this.visible = true;
      this.juros_sn = this.plan_v.juros_sn
      this.juros_modo_calc = this.plan_v.juros_modo_calc
      this.juros_tipo = this.plan_v.juros_tipo
      this.dataco = this.plan_v.dataco
      this.dataci = this.plan_v.dataci
      this.juros_modo_calc_selic = this.plan_v.juros_modo_calc_selic
      this.juros_adic_1_perc = this.plan_v.juros_adic_1_perc 
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        juros_sn: this.juros_sn,
        juros_modo_calc: this.juros_modo_calc,
        juros_tipo: this.juros_tipo,
        dataco: this.dataco,
        dataci: this.dataci,
        juros_modo_calc_selic: this.juros_modo_calc_selic,
        juros_adic_1_perc: this.juros_adic_1_perc 
      }

      if (this.juros_modo_calc == 's') {
        dados.tabelaCorrecao = 1100  // resetar correção e juros
      }
      
      console.log('enviaFOrm modalJuros.vue', dados)
      this.$socket.emit('v', dados)  

      var that = this 
      setTimeout( function() {
        that.$socket.emit('refresh', dados)
      }, 250)
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

.obs {
    width: 500px;
    line-height:20px;
    font-size:16px;
    padding: 10px;
    border: 1px solid #ddd;
    background-color: #eee;
    border-radius: 4px;
    margin-top: 18px;
}

.modal_div_principal {
    min-height: 625px;
    min-width: 520px;
}

</style> 