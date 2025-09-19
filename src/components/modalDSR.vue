<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>DSR</template>
      <template v-slot:body >
        <div  class="modal_div_principal">
        <b>Tabela de feriados:</b><br />
          <select v-model="idTabela" class="alinharEsquerda" @change="atualizarFeriados"> 
              <option v-for="t in tabelas" :value="t.id">
                {{t.nome}}
              </option>
            </select>
            <!-- &nbsp;&nbsp;<a>Editar</a>&nbsp;&nbsp;<a>Criar nova tabela</a> -->

           <br /><br />
           <b>Marque os dias que deseja considerar descanso:</b><br />
              <input type="checkbox" value="1" v-model="dom"> Domingo<br />
              <input type="checkbox" value="1" v-model="seg"> Segunda-feira<br />
              <input type="checkbox" value="1" v-model="ter"> Terça-feira<br />
              <input type="checkbox" value="1" v-model="qua"> Quarta-feira<br />
              <input type="checkbox" value="1" v-model="qui"> Quinta-feira<br />
              <input type="checkbox" value="1" v-model="sex"> Sexta-feira<br />
              <input type="checkbox" value="1" v-model="sab"> Sábado<br />
              <input type="checkbox" value="1" v-model="fer"> Feriado<br />

           <button  type="button"   class="btn-open-modal"  @click="enviaForm"   aria-label="Close Modal"> OK </button>
           <button  type="button"   class="btn-open-modal"  @click="close"   aria-label="Close Modal"> Cancelar </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "./modal";
import axios from 'axios';

export default {
  name: "App",
  components: {
    Modal,
  },
  data() {
    return {
      visible: false,
      tabelas: [],
      dom: 0,
      seg: 0,
      ter: 0,
      qua: 0,
      qui: 0,
      sex: 0,
      sab: 0,
      fer: 0,
      idTabela: 0,
      dsrFeriados: '' 
    };
  },
  mounted () {
    this.pegaTabelas () 
  },
  methods: {
    openModal() {
      this.pegaTabelas () 
      this.visible = true;
      this.dom = this.plan_v.dsrDom 
      this.seg = this.plan_v.dsrSeg  
      this.ter = this.plan_v.dsrTer  
      this.qua = this.plan_v.dsrQua  
      this.qui  = this.plan_v.dsrQui  
      this.sex = this.plan_v.dsrSex  
      this.sab = this.plan_v.dsrSab 
      this.fer = this.plan_v.dsrFer  
      this.dsrFeriados  = this.plan_v.dsrFeriados 
      this.idTabela = this.plan_v.dsrIdTabela
    },
    atualizarFeriados () {
      var n = this.idTabela 
      var t = this.tabelas.filter( function(item) { return (item.id == n); })
      this.dsrFeriados = t[0].dsr_dados 
    }, 
    close() {
      this.visible = false;
    },
    pegaTabelas () {
      var that = this 
      var url1 = this.hostTJS+`/tabelasDSR` 
      // console.log(url1)
      axios.get(url1, { withCredentials: true }).then( function(r) { 
        console.log(r)
          that.tabelas = r.data  
          that.tabelas.push({id: 1, nome: 'Tabela padrão nacional de feriados', feriados: '1110001001012104010507091210021115112512'})  
      }) 
    },
    enviaForm () {
      var dados = {
        idCalc: this.$store.state.idCalc, 
        dsrDom: this.dom,
        dsrSeg: this.seg,
        dsrTer: this.ter,
        dsrQua: this.qua,
        dsrQui: this.qui,
        dsrSex: this.sex,
        dsrSab: this.sab,
        dsrFer: this.fer,
        dsrIdTabela: this.idTabela,
        dsrFeriados: this.dsrFeriados 
      }
      this.$socket.emit('v', dados) 
      
      this.close () 
    }
  },
  computed: {
    plan_v () {
      return  this.$store.state.variaveis 
    },
    hostTJS () {
        return this.$store.state.hostTJS 
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