<template>
  <div>
      <div v-if="primeiraVez" class="tela">
        <div class="conteudo"> 
            Carregando 
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
        primeiraVez () {
            return this.$store.state.primeiraVez 
        }
    }

  } 
</script>

<style  scoped=1>


.tela {
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
  opacity: 1;
  background-color: #edf1f5;
  z-index: 99;
  color: #20076d;
  font-size: 40px;
  vertical-align: middle;
}

.conteudo {
    padding: 300px;
}

</style>