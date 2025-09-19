<template>
  <div>
    <!-- <button class='btnAcessoCompleto' v-if="variaveis.assinante">Acesso completo</button>
    <button class='btnAcessoGratuito' v-if="!variaveis.assinante">Assine</button> -->
 
    <button v-if="mostraTudo" class='btnNormal' style="margin-right: 380px;" @click="telaDebug()" title="debugar"><font-awesome-icon icon="bug" /></button>
    <button v-if="mostraTudo" class='btnNormal' style="margin-right: 330px;" @click="compartilhar()" title="compartilhar"><font-awesome-icon icon="users" /></button>
 
 
    <button class='btnNormal' style="margin-right: 280px;" @click="listaCalculo()" title="Retornar ao menu"><font-awesome-icon icon="bars" /></button>
    
    <button @click="toggleRepetir()" :class='classBtnRepetir()' style="margin-right: 230px;" v-if="grupoAtual != 'inicio' " ><font-awesome-icon icon="repeat" title="Ligar / desligar repetir valores" /></button>
    
    <button class='btnNormal' style="margin-right: 180px;"  @click="verPDF()"><font-awesome-icon icon="file-pdf"  title="Ver PDF do cálculo"/></button>
    <button class='btnNormal' style="margin-right: 130px;"  @click="verHTML()"><font-awesome-icon icon="print"  title="Versão para imprimir o cálculo" /></button>
    <button @click="voltar" v-if="grupoAtual != 'inicio' " class='btnNormal' style="margin-right: 80px;"  title="Retornar"><font-awesome-icon icon="arrow-left" /></button>
    <button @click="avancar" v-if="grupoAtual != 'resumo' " class='btnNormal' style="margin-right: 30px;"  title="Avançar"><font-awesome-icon icon="arrow-right" /></button>
  </div>
</template>

<script>
// import axios from 'axios';
    export default {
        name: 'navbtn',
        methods: {
            verPDF () {
                window.open( `${this.hostTJS}/pdf/`+this.$store.state.idCalc );
            },
            verHTML () {
                window.open( `${this.hostTJS}/html/`+this.$store.state.idCalc );
            },
            avancar () {
                var n = this.grupoList.map(object => object.grupo).indexOf(this.grupoAtual);
                if (this.grupoAtual == 'inicio') {
                    this.$parent.$refs['formIni'].enviarForm ()
                } else {
                    this.$store.commit('setGrupo', this.grupoList[n+1].grupo) 
                } 
                window.scrollTo(0, 0);  
            },
            voltar () {
                var n = this.grupoList.map(object => object.grupo).indexOf(this.grupoAtual);
                this.$store.commit('setGrupo', this.grupoList[n-1].grupo) 
                window.scrollTo(0, 0);
            },
            toggleRepetir () {
                var form = { idCalc: this.$store.state.idCalc, repetirValor: !this.repetirValor }
                if (this.grupoAtual != 'inicio') {
                    this.$socket.emit('v', form) 
                    this.$store.commit('setRepetirValor', !this.repetirValor )
                }
            },
            classBtnRepetir () {
                if (this.repetirValor) {
                    return 'btnNormal'
                } else {
                    return 'btnNormal btnDesligado'
                }
            },
            listaCalculo () {
                window.location = `${this.hostAPP}/lista/trab`
            },
            compartilhar () {
                this.showModal ( "mCompartilhar")
            },
            telaDebug () {
                this.showModal ( "mDebug")
            },
            showModal (referencia) {
                this.$parent.$refs[referencia].openModal () 
            },
        },
        computed: {
            grupoAtual () {
                return this.$store.state.grupoAtual  
            },
            grupoList () {
                return this.$store.state.grupoList 
            },
            repetirValor () {
                return this.$store.state.repetirValor  
            },
            hostWWW () {
                return this.$store.state.hostWWW  
            },
            hostAPP () {
                return this.$store.state.hostAPPFRONT
            },
            hostTJS () {
                return this.$store.state.hostTJS   
            },
            hostAPIGeral () {
                return this.$store.state.hostAPIGeral   
            },
            variaveis () {
                return this.$store.state.variaveis 
            },
            mostraTudo () {
                return this.$store.state.mostraTudo 
            },
        } 
    }
</script>

<style scoped>


.btnNormal {
    border-radius: 100%;
    border: 0px;
    background-color: #01579b;
    color: #fff;
    width: 40px;
    height: 40px;
    font-size: 20px;
    position: fixed;
    display: block;
    right: 0;
    bottom: 0;
    z-index: 3;
    cursor: pointer;
     margin-bottom: 40px;
}

.btnAcessoCompleto {
    border: 0px;
    background-color: #01579b;
    color: #fff;
    height: 40px;
    font-size: 20px;
    position: fixed;
    display: block;
    right: 0;
    bottom: 0;
    z-index: 3;
    cursor: pointer;
    margin-bottom: 40px;
    margin-right: 330px; 
    width: 200px; 
    border-radius: 40px;
}

.btnAcessoGratuito {
    border: 0px;
    background-color: orange;
    color: #000;
    font-weight: bold;
    height: 40px;
    font-size: 20px;
    position: fixed;
    display: block;
    right: 0;
    bottom: 0;
    z-index: 3;
    cursor: pointer;
    margin-bottom: 40px;
    margin-right: 330px; 
    width: 200px; 
    border-radius: 40px;
}

.btnNormal:hover {
	background-color: 	#2F75AD;
}

.btnDesligado {
	background-color: #90A4AE !important; 
}


</style>
