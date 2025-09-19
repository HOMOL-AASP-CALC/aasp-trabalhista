<template>
    <div class="box2" v-if="!assinante">
        <div class="box1 cor2" v-if=" editavel" @click="mostraPrecos()">
            Este cálculo é editável até {{ dataMaxima }}
        </div>
        <div class="box1 cor1" v-if="!editavel" @click="mostraPrecos()">
            Assine para editar
        </div>           
             <!-- editavel: {{  editavel }} <br />  
             {{  infoUsuario }} -->
    </div>
</template>

<script>
    export default {
        name: 'avisoEdicao',
        methods: {
            mostraPrecos () {
                window.open(`https://www.debit.com.br/precos`,'_blank');
            }
        },
        computed: {
            editavel () {
                return this.$store.state.editavel 
            },
            dataMaxima () {
                return this.$store.state.dataMaxima 
            },
            assinante () {
                return this.$store.state.infoUsuario.assina_trab  
            },
            infoUsuario () {
                return this.$store.state.infoUsuario  
            },
        } 
    }
</script>

<style scoped>

.box2 {

    text-align: center;
    border: 2px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    margin-bottom: 8px;
    margin-left: 10px;
    margin-right: 10px;
    /* padding: 10px; */
}

.box1 {
    padding: 10px;
    margin: 10px;
    width: 300px;
    display: inline-block;
    text-align: center;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
}

.cor1 {
    background-color: #ebfaf4;
    color: #008000
}

.cor2 {
    background-color: #eaf0f9;
    color: #2f6bc6
}

</style>
