<template>
  <div  class="relatorioForma">
<!-- {{ infoUsuario  }} -->
 <!-- <avisoEdicao /> -->
	<h2>Dados cadastrais (n&atilde;o obrigat&oacute;rios)</h2>
	
	<table class='modal_table' style='width: 810px;' >
        <tr>
            <td style="width: 150px;">Nome do cálculo: </td>
            <td><input type='text' v-model="formulario.nomeCalc" class="inputTextos" :disabled="infoUsuario.permissao=='v'" ></td>
        </tr>

        <tr>
            <td style="width: 150px;">Processo:</td>
            <td><input type='text' v-model="formulario.dados_processo" class="inputTextos" :disabled="infoUsuario.permissao=='v'" ></td>
        </tr>
        <tr>
            <td>Vara:</td>
            <td><input type='text' v-model="formulario.dados_vara"  class="inputTextos" :disabled="infoUsuario.permissao=='v'" ></td>
        </tr>
        <tr>
            <td>Reclamante:</td>
            <td><input type='text'  v-model="formulario.dados_reclamante"  class="inputTextos" :disabled="infoUsuario.permissao=='v'" ></td>
        </tr>
        <tr>
            <td>Adv. reclamante:</td>
            <td><input type='text'  v-model="formulario.dados_adv_reclamante"  class="inputTextos" :disabled="infoUsuario.permissao=='v'" ></td>
        </tr>
        <tr>
            <td>Reclamada:</td>
            <td><input type='text'  v-model="formulario.dados_reclamada"  class="inputTextos" :disabled="infoUsuario.permissao=='v'" ></td>
        </tr>
        <tr>
            <td>Adv. reclamada:</td>
            <td><input type='text'  v-model="formulario.dados_adv_reclamada"  class="inputTextos" :disabled="infoUsuario.permissao=='v'" ></td>
        </tr>
    </table>

    <br />
    <h2>Dados contratuais</h2>

    <!-- <div class="info1" v-if="!assinante">
        No momento você não é assinante do Debit Trabalhista, por isso você poderá efetuar cálculos de maneira limitada.<br />
        <span style="font-weight: 700;">A data de admissão não poderá ser anterior que <b>{{   diaMinFormatado }}</b>.</span><br />
        Para fazer cálculos anteriores a esta data é necessário assinar.<br />
        <a style="color: #1E88E5; font-size: 16px;" href="https://debit.com.br/calculo-trabalhista#precos">Assine agora  <font-awesome-icon icon="arrow-right" /></a>

    </div> -->

    <table style="min-width:830px">

    <tr>
        <td><b>Data da admiss&atilde;o:</b></td>
        <td><b>Data da demiss&atilde;o:</b></td>
        <td><b>Estabilidade at&eacute;:</b> (se houver)</td>
        <td><b>Data da distribui&ccedil;&atilde;o:</b></td>
    </tr>

    <tr>
        <td>
            <inputData v-model='formulario.dataad' :errado="avisoDataAd" :disabled="infoUsuario.permissao=='v'" /> 
        </td>
        <td>
            <inputData v-model='formulario.datade'  :errado="avisoDataDe" :disabled="infoUsuario.permissao=='v'" />
        </td>
        <td>
            <inputData  v-model='formulario.dataes' :errado="avisoDataEs"  :disabled="infoUsuario.permissao=='v'" />
        </td>
        <td>
            <inputData  v-model='formulario.datadi'  :errado="avisoDataDi" :disabled="infoUsuario.permissao=='v'"  />
        </td>
    </tr>
    <tr>
        <td colspan="4" style="color: red;font-weight:bold;" v-if="exibir_erro_geral">{{ exibir_erro_geral }}<br /><br /></td>
    </tr>

    <tr><td colspan=2><b>Como se deu o aviso pr&eacute;vio?</b></td><td colspan=2><b>Prescri&ccedil;&atilde;o:</b></td></tr>
    <tr>
    <td colspan=2>
        <input :disabled="infoUsuario.permissao=='v'" type=radio  value='1' v-model='formulario.modo_avisoprevio' name="modo_avisoprevio">&nbsp;&nbsp;Indenizado<br>
        <input :disabled="infoUsuario.permissao=='v'" type=radio  value='2' v-model='formulario.modo_avisoprevio' name="modo_avisoprevio">&nbsp;&nbsp;Trabalhado<br>
    </td>	

    <td colspan=2>
        <input :disabled="infoUsuario.permissao=='v'" type=radio v-model='formulario.modo_prescricao' value='1' name="modo_prescricao">&nbsp;&nbsp;Prescrever valores mais antigos que 5 anos, exceto FGTS<br>
        <input :disabled="infoUsuario.permissao=='v'" type=radio v-model='formulario.modo_prescricao' value='5' name="modo_prescricao">&nbsp;&nbsp;Prescrever valores mais antigos que 5 anos<br>
        <input :disabled="infoUsuario.permissao=='v'" type=radio v-model='formulario.modo_prescricao' value='0' name="modo_prescricao">&nbsp;&nbsp;Ignorar prescri&ccedil;&atilde;o<br>
        </td>	

        </tr>	
    </table>
    <br />

    <h2>Selecione as verbas que deseja calcular</h2>

    <input type=checkbox v-model="formulario.salario" :disabled="infoUsuario.permissao=='v'"  > 13o. salário<br />
    <input type=checkbox v-model="formulario.ferias" :disabled="infoUsuario.permissao=='v'"  > Férias<br />
    <input type=checkbox v-model="formulario.avisoPrevio" :disabled="infoUsuario.permissao=='v'" > Aviso prévio<br />
    <input type=checkbox v-model="formulario.multasRescisorias" :disabled="infoUsuario.permissao=='v'" > 	Multas rescisórias (art. 477 e/ou outras)<br />
    <input type=checkbox v-model="formulario.saldoSalarial" :disabled="infoUsuario.permissao=='v'" > Saldo Salarial <br />
    <input type=checkbox v-model="formulario.dsr" :disabled="infoUsuario.permissao=='v'" > Descanso semanal remunerado (DSR)<br />
    <input type=checkbox v-model="formulario.horasExtras" :disabled="infoUsuario.permissao=='v'" > Horas extras (hora + adicional)<br />
    <input type=checkbox v-model="formulario.horasExtrasSomenteAdic" :disabled="infoUsuario.permissao=='v'" > Horas extras (apenas adicional)<br />
    <input type=checkbox v-model="formulario.horasInItinere" :disabled="infoUsuario.permissao=='v'" > Horas in itinere<br />
    <input type=checkbox v-model="formulario.horasSobreaviso" :disabled="infoUsuario.permissao=='v'" > Horas de sobreaviso<br />

    <input type=checkbox v-model="formulario.intervaloInterjornada"  :disabled="infoUsuario.permissao=='v'" > Intervalo interjornada<br />
    <input type=checkbox v-model="formulario.intervaloIntrajornada"  :disabled="infoUsuario.permissao=='v'" > Intervalo intrajornada<br />
    <input type=checkbox v-model="formulario.adicionalNoturno"  :disabled="infoUsuario.permissao=='v'" > Adicional noturno<br />
    <input type=checkbox v-model="formulario.equiparacaoSalarial"  :disabled="infoUsuario.permissao=='v'" > Diferenças salariais (equiparação salarial)<br />
    <input type=checkbox v-model="formulario.diferencasSalariais"  :disabled="infoUsuario.permissao=='v'" > Diferenças salariais (em percentual)<br />
    <input type=checkbox v-model="formulario.insalubridade"  :disabled="infoUsuario.permissao=='v'" > Insalubridade<br />
    <input type=checkbox v-model="formulario.periculosidade"  :disabled="infoUsuario.permissao=='v'" > Periculosidade <br />
    <input type=checkbox v-model="formulario.salarioFamilia"  :disabled="infoUsuario.permissao=='v'" > Salario Família<br />
    <input type=checkbox v-model="formulario.valeTransporte"  :disabled="infoUsuario.permissao=='v'" > Vale Transporte<br />
    <input type=checkbox v-model="formulario.valeAlimentacao"  :disabled="infoUsuario.permissao=='v'" > Vale Alimentacao<br />
    <input type=checkbox v-model="formulario.descontosIndevidos"  :disabled="infoUsuario.permissao=='v'" > Descontos Indevidos<br />
    <input type=checkbox v-model="formulario.seguroDesemprego"  :disabled="infoUsuario.permissao=='v'" > Seguro Desemprego <br />
    <input type=checkbox v-model="formulario.verbasDiversas"  :disabled="infoUsuario.permissao=='v'" > Verbas Diversas<br />

     <h2>Verbas personalizadas</h2>
<!-- {{ formulario }} -->
    <div v-for="vc in verbasCriadas">
        <input type=checkbox v-model="formulario[vc.codigo]"  :disabled="infoUsuario.permissao=='v'" > {{vc.nome}} <!-- {{vc.codigo}} -->  <a @click="deletarVerba(vc.id)" class="iconeApagarVerba"> <font-awesome-icon icon="xmark" /> </a> <br />
    </div>
    <br />

    <a class="linkCriarVerba" @click="showModal('mCriarVerba')"> Criar Verba</a>

    <br />

    <h2>Opções sobre FGTS:</h2>

        <input type=checkbox  v-model="formulario.fgtsPago"  :disabled="infoUsuario.permissao=='v'" > Digitar valores pagos do FGTS <br />
        <input type=checkbox  v-model="formulario.fgts_multa40"  :disabled="infoUsuario.permissao=='v'" > Multa de 40% sobre os valores depositados no FGTS <br /><br />

        Digite o saldo do FGTS no dia em que a reclamante foi demitido:<br /> 
        <inputNum v-model='formulario.fgts40_valor'  :disabled="infoUsuario.permissao=='v'"  /> 

        <div style="color:#fff">{{ variaveis.dataad }}</div> <!-- essa linha existe para renderizar o form -->
    </div>
    
  </div>
</template>

<script>
    import Vue from 'vue'
    import inputNum from './inputNum'
    import inputData from './inputData'
    import avisoEdicao from './avisoEdicao'
    import calcUtil from '../plugins/calcUtil'

    export default {
        name: 'formularioInicial',
        components: { inputNum, inputData, avisoEdicao }, 
        data () {
            return {
                exibir_erro_assinante: false,
                exibir_erro_geral: '', 
                formulario : { },
                avisoDataAd: "0",
                avisoDataDe: "0",
                avisoDataEs: "0",
                avisoDataDi: "0",
                diaMin: 0,
                diaMinFormatado: '',
                removerVerbas: []  
            }  
        },
        mounted () {
            window.scrollTo(0, 0); 
            this.diaMin = this.dia2yyyymmddInt( this.diminuiAno(  this.diminuiAno( this.diaHoje() ) )) 
            this.diaMinFormatado = this.yyyymmdd2dia( this.diaMin )
        },
        mixins: [calcUtil], 
        methods: {
            enviarForm () {
                this.formulario.idCalc = this.$store.state.idCalc
                this.formulario.primeiroFomulario = 1 
                var formOk = 1
                var that = this

                if ( (typeof this.formulario.dataad !== 'undefined') && (this.dataOk(this.formulario.dataad)) ) { 
                    this.avisoDataAd = "0"; 
                } else { 
                    this.avisoDataAd = "1"; 
                    formOk = 0; 
                }

                // var diaMin = this.dia2yyyymmddInt( this.diminuiAno(  this.diminuiAno( this.diaHoje() ) )) 
                if (this.assinante) { diaMin = 0; }

                if (formOk) {
                    var dataadInt = this.dia2yyyymmddInt( this.formulario.dataad )

                    // if (dataadInt < diaMin) {
                    //     this.avisoDataAd = "1"; 
                    //     formOk = 0;  
                    //     this.exibir_erro_assinante = true;
                    // } else {
                    //     this.exibir_erro_assinante = false;
                    // }
                }



                if ( (typeof this.formulario.datade !== 'undefined') && this.dataOk(this.formulario.datade) ) { this.avisoDataDe = "0";  } else { this.avisoDataDe = "1"; formOk = 0; }
                if ( (typeof this.formulario.datadi !== 'undefined') && this.dataOk(this.formulario.datadi) ) { this.avisoDataDi = "0";  } else { this.avisoDataDi = "1"; formOk = 0; }
                if (typeof this.formulario.dataes !== 'undefined') {
                    if ( this.dataOk(this.formulario.dataes) || this.formulario.dataes.length==0 ) { 
                            this.avisoDataEs = "0";  
                        } else { 
                            this.avisoDataEs = "1"; 
                            formOk = 0; 
                        }
                }  else {
                    this.avisoDataEs = "0";
                }

                // verifica se existe possibilidade de efetuar calc - analisando datadi
                if (formOk) {
                    // var datadeInt = this.dia2yyyymmdd( this.formulario.datade )
                    var datadeInt = this.formulario.datade 
                    var datadiInt = this.formulario.datadi 
                    for (var i = 0; i < 5; i++) {
                        datadiInt = this.diminuiAno(datadiInt)
                    }

                    datadeInt = this.dia2yyyymmddInt(datadeInt)
                    datadiInt = this.dia2yyyymmddInt(datadiInt)

                    // console.log('datadeInt < datadiInt', datadeInt, datadiInt)
                    if ((datadeInt < datadiInt) && (this.formulario.modo_prescricao==5)) {
                        this.exibir_erro_geral = 'Este cálculo não pode ser efetuado, pois esta totalmente prescrito.' 
                        this.avisoDataDi = "1";
                        formOk = 0 
                    }
                }

                // verifica demissao é maior que admissão
                if (formOk) {
                    var datadeInt = this.formulario.datade 
                    var dataadInt = this.formulario.dataad 

                    var dataadInt = this.dia2yyyymmddInt(this.formulario.dataad)
                    var datadeInt = this.dia2yyyymmddInt(this.formulario.datade)

                    // console.log('demissao antes da admissao:  dataadInt > datadeInt', dataadInt, datadeInt) 
                    if (dataadInt > datadeInt) {
                        this.exibir_erro_geral = 'A data de admissão deve ser anterior a data de demissão' 
                        this.avisoDataAd = "1";
                        this.avisoDataDe = "1";
                        formOk = 0 
                    }
                }

                // verifica estabilidade é maior que demissão
                if (formOk) {
                    var dataesInt = this.dia2yyyymmddInt(this.formulario.dataes)
                    var datadeInt = this.dia2yyyymmddInt(this.formulario.datade)

                    // console.log('demissao antes da admissao:  dataadInt > datadeInt', dataadInt, datadeInt) 
                    if (datadeInt > dataesInt) {
                        this.exibir_erro_geral = 'A data de estabilidade deve ser posterior a data de demissão' 
                        this.avisoDataEs = "1";
                        this.avisoDataDe = "1";
                        formOk = 0 
                    }
                }

                // for (var i in this.removerVerbas) 
                if (this.removerVerbas.length >0) {
                    this.formulario.removeVerbas = this.removerVerbas 
                }

                if (formOk && typeof this.formulario.ic_indexador==='undefined') {
                    this.formulario.ic_indexador = 'ipcae' 
                    setTimeout( function() {
                        that.$socket.emit('refresh', { idCalc: that.formulario.idCalc, resetComandos: true })
                    }, 400) 
                } 

                if (formOk) {
                    this.$socket.emit('v', this.formulario)
                }
            },
            showModal (referencia) {
                // console.log('showModal', referencia)
                this.$parent.$refs[referencia].openModal () 
            },
            deletarVerba ( id ) {
                var dados = {
                    idCalc : this.$store.state.idCalc,
                    idVerba : id
                }
                this.$socket.emit('deletaVerbaCriada', dados)
                var that = this 
                setTimeout( function() {
                    that.$socket.emit('refresh', dados)
                }, 250) 
            },
            atualizaForm () {
                // console.log('atualizaForm', this.$store.state.variaveis)
                Vue.set(this.formulario, 'nomeCalc',  this.$store.state.variaveis.nomeCalc)
                Vue.set(this.formulario, 'dados_processo',  this.$store.state.variaveis.dados_processo)
                Vue.set(this.formulario, 'dados_vara',  this.$store.state.variaveis.dados_vara)
                Vue.set(this.formulario, 'dados_reclamante',  this.$store.state.variaveis.dados_reclamante)
                Vue.set(this.formulario, 'dados_adv_reclamante',  this.$store.state.variaveis.dados_adv_reclamante)
                Vue.set(this.formulario, 'dados_reclamada',  this.$store.state.variaveis.dados_reclamada)
                Vue.set(this.formulario, 'dados_adv_reclamada',  this.$store.state.variaveis.dados_adv_reclamada)
                Vue.set(this.formulario, 'dataad',  this.$store.state.variaveis.dataad)  
                Vue.set(this.formulario, 'datade',  this.$store.state.variaveis.datade) 
                Vue.set(this.formulario, 'dataes',  this.$store.state.variaveis.dataes)
                Vue.set(this.formulario, 'datadi',  this.$store.state.variaveis.datadi)
                Vue.set(this.formulario, 'modo_avisoprevio',  this.$store.state.variaveis.modo_avisoprevio)
                Vue.set(this.formulario, 'modo_prescricao',  this.$store.state.variaveis.modo_prescricao)
                Vue.set(this.formulario, 'fgtsPago',  this.$store.state.variaveis.fgtsPago)
                Vue.set(this.formulario, 'fgts_multa40',  this.$store.state.variaveis.fgts_multa40)
                Vue.set(this.formulario, 'fgts40_valor',  this.$store.state.variaveis.fgts40_valor)

                Vue.set(this.formulario, 'salario',  this.$store.state.variaveis.salario) 
                Vue.set(this.formulario, 'ferias',  this.$store.state.variaveis.ferias) 
                Vue.set(this.formulario, 'avisoPrevio',  this.$store.state.variaveis.avisoPrevio) 
                Vue.set(this.formulario, 'multasRescisorias',  this.$store.state.variaveis.multasRescisorias) 
                Vue.set(this.formulario, 'saldoSalarial',  this.$store.state.variaveis.saldoSalarial) 
                Vue.set(this.formulario, 'insalubridade',  this.$store.state.variaveis.insalubridade) 
                Vue.set(this.formulario, 'dsr',  this.$store.state.variaveis.dsr) 
                Vue.set(this.formulario, 'horasExtras',  this.$store.state.variaveis.horasExtras) 
                Vue.set(this.formulario, 'horasExtrasSomenteAdic',  this.$store.state.variaveis.horasExtrasSomenteAdic) 
                Vue.set(this.formulario, 'horasInItinere',  this.$store.state.variaveis.horasInItinere) 
                Vue.set(this.formulario, 'horasSobreaviso',  this.$store.state.variaveis.horasSobreaviso) 
                Vue.set(this.formulario, 'intervaloInterjornada',  this.$store.state.variaveis.intervaloInterjornada) 
                Vue.set(this.formulario, 'intervaloIntrajornada',  this.$store.state.variaveis.intervaloIntrajornada) 
                Vue.set(this.formulario, 'adicionalNoturno',  this.$store.state.variaveis.adicionalNoturno) 
                Vue.set(this.formulario, 'equiparacaoSalarial',  this.$store.state.variaveis.equiparacaoSalarial) 
                Vue.set(this.formulario, 'diferencasSalariais',  this.$store.state.variaveis.diferencasSalariais) 
                Vue.set(this.formulario, 'periculosidade',  this.$store.state.variaveis.periculosidade) 
                Vue.set(this.formulario, 'salarioFamilia',  this.$store.state.variaveis.salarioFamilia) 
                Vue.set(this.formulario, 'valeTransporte',  this.$store.state.variaveis.valeTransporte) 
                Vue.set(this.formulario, 'valeAlimentacao',  this.$store.state.variaveis.valeAlimentacao) 
                Vue.set(this.formulario, 'descontosIndevidos',  this.$store.state.variaveis.descontosIndevidos) 
                Vue.set(this.formulario, 'seguroDesemprego',  this.$store.state.variaveis.seguroDesemprego) 
                Vue.set(this.formulario, 'verbasDiversas',  this.$store.state.variaveis.verbasDiversas) 
                Vue.set(this.formulario, 'ic_indexador',  this.$store.state.variaveis.ic_indexador)

                var v = this.$store.state.variaveis.verbasCriadas 
                var v1 = this.$store.state.variaveis 

                for (var i in v) {
                    // console.log('l: 224', v[i].codigo,  v1[v[i].codigo] ) 
                    if ( v1[ v[i].codigo ] ) {
                        Vue.set(this.formulario, v[i].codigo,  true ) 
                    } else {
                        Vue.set(this.formulario, v[i].codigo,  false )
                    }
                }

                // verifica todas as variaveis que começa com VC
                // se alguma não estiver no array de verbasCriadas, coloca false
                this.removerVerbas = [] 
                for (var i in v1) {
                    if (i.substring(0,2)=='vc') {
                        var form_remove_vc = {
                            idCalc : this.$store.state.idCalc
                        }
                        form_remove_vc[i] = false
                        var ainda_existe = v.find( (v) => v.codigo == i )
                        if (typeof ainda_existe === 'undefined') {
                            console.log('remover esta verba: ', i, ainda_existe )
                            this.removerVerbas.push(i)
                        }
                    }
                }

            }
        },
        computed: {
            idCalc () {
                return this.$store.state.idCalc 
            },
            editavel () {
                return this.$store.state.editavel
            },
            variaveis () {
                this.atualizaForm () 
                return this.$store.state.variaveis 
            },
            assinante () {
                return this.$store.state.infoUsuario.assina_trab=='ntraba' 
            },
            hostTJS () {
               return this.$store.state.hostTJS 
            },
            grupoAtual () {
                return this.$store.state.grupoAtual  
            },
            grupoList () {
                return this.$store.state.grupoList 
            },
            infoUsuario () {
                return this.$store.state.infoUsuario
            },
            verbasCriadas () {
                if (typeof this.$store.state.variaveis.verbasCriadas === 'undefined') return []  
                var that = this 
                return this.$store.state.variaveis.verbasCriadas.filter( function(e) {
                    return (e.calculo_especifico <= 0 || e.calculo_especifico == that.$store.state.idCalc );
                } ) 
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tabela {
    width: 50%;
    background-color: #fff;
    border: 1px solid #ddd;
}

.tabela td {
     border: 1px solid #ddd;
     border-collapse: collapse;
     padding: 3px;
}

.tabela input {
    text-align: right;
    border: 1px solid #ddd;
    padding: 3px;
    border-radius: 4px;;
}

.inputTextos {
    width: 500px;
    text-align: left !important;
}

.erro {
    background-color: #FFEBEE !important;
    border: 1px red solid;
}

.linkCriarVerba {
    text-decoration:  underline;
    cursor: pointer;
}

.iconeApagarVerba {
        cursor: pointer; 
        color: #B71C1C;
}


.info1 {
    padding: 50px;
    line-height: 30px;
    padding: 10px;
    background-color: #F6F9FC;
    border: 1px solid #BBDEFB;
    border-radius: 8px;
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
}

</style>
