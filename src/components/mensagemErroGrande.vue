<template>
  <div>
      <div v-if="mensagemErroGrande == 1" class="tela">
        <div class="conteudo"> 
            Erro ao carregar o cálculo.<br /><br />
            Nossos técnicos já estão analisando este caso. 
        </div>
      </div>
      <div v-if="mensagemErroGrande == 2" class="tela">
        <div class="conteudo"> 
            Você não tem permissão <br /><br />
            para acessar este cáculo. 
        </div>
      </div>
  </div>
</template>

<script>

  export default {

    mounted () {
      this.svalor =  this.value
    },
    computed: {
        mensagemErroGrande () {
            return this.$store.state.mensagemErroGrande 
        }
    }

  } 
</script>

<style scoped=1>


.tela {
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
  opacity: 1;
  background-color: rgb(205, 151, 51);
  z-index: 1050;
  color: #000;
  font-size: 30px;
  vertical-align: middle;
}

.conteudo {
    padding: 300px;
}

</style>