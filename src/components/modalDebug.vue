<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Debug</template>
      <template v-slot:body >
        <div  class="modal_div_principal">

              <b>Comando:</b><br />
              <input type="radio" name="comando" value="v" v-model="comando"> v<br />
              <input type="radio" name="comando" value="vReflexo" v-model="comando"> vReflexo<br />
              <input type="radio" name="comando" value="setId" v-model="comando"> setId<br />
              
              <input type="radio" name="comando" value="vVerbasDiversas" v-model="comando"> vVerbasDiversas<br />
              <input type="radio" name="comando" value="deletarReflexo" v-model="comando">deletarReflexo <br />
              <input type="radio" name="comando" value="refresh" v-model="comando"> refresh<br />
              <input type="radio" name="comando" value="criaVerba" v-model="comando"> criaVerba<br />
              <input type="radio" name="comando" value="deletaVerbaCriada" v-model="comando"> deletaVerbaCriada<br />

             <br />
                  <textarea v-model="dados" style="width: 300px; height: 150px;"></textarea><br />
            <br />
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
      comando: 'v',
      dados: ''
    };
  },
  methods: {
    openModal() {
      this.visible = true;
      this.comando = 'v'  
      this.dados = ''
    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var json1 = JSON.parse(this.dados)
      this.$socket.emit(this.comando, json1 )       
    }
  }
};
</script>

<style scoped>

.tabela {
    width: 80%;
    background-color: #fff;
}

.texto1 {
    width: 250px;
    text-align: left;
}

.erro {
    background-color: #FFEBEE !important;
    border: 1px red solid;
}

</style> 