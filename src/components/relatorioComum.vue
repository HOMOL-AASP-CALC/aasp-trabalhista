<template>
  <div class="relatorioForma">
    <!-- <avisoEdicao /> -->
      
      <h2>{{info.titulo}}</h2> 
      <!-- ({{plan}}) -->
      <!-- {{colunas}}   -->
       <!-- {{ planilha }}   -->
      <!-- {{info}} -->
      <!-- {{ planilhaLocal }}   -->

        <table class='tabela'>
            <tr>
                <th :class="classTituloColuna(col)" v-for="col in colunas">
                    {{col.titulo}}
                    <div v-if="col.modal && infoUsuario.permissao!='v' " class="iconeModal" @click="showModal(col.modal)" style="cursor: pointer; color: #2c3e50;">
                        <a ><font-awesome-icon icon="gear" /></a>
                    </div>
                    <div v-if="col.somar && infoUsuario.permissao!='v' " class="iconeModal"  style="cursor: pointer;" @click="alteraSomar(col)">
                        <a :class='corSomar(col)'><font-awesome-icon icon="plus" /></a>
                    </div>
                </th>
            </tr>
            <tbody  v-for="(linha, index) in planilha">
                <tr>
                    <td v-for="col in colunas" :class='classColuna(col)'>
                        <div v-if="col.tipo=='data'">{{ planilha[index][col.nome] }}</div>
                        <div v-if="col.tipo=='f'" :class='classColResultado(col)'>{{ formataNum( planilha[index][col.nome], col.casas) }}</div>
                        <div v-if="col.tipo=='v'">
                          <inputNum type=text v-model='planilhaLocal[index][col.nome]' :name='info.prefixo+`-`+index+`-`+col.nome' @change="alteraValor"  :disabled="infoUsuario.permissao=='v'" />
                        </div>
                        <div v-if="col.tipo=='h'">
                          <inputHora type=text v-model='planilhaLocal[index][col.nome]' :name='info.prefixo+`-`+index+`-`+col.nome' @change="alteraHora" :modo="variaveis.modoDigitacaoHora" :disabled="infoUsuario.permissao=='v'"  />
                        </div>
                    </td>
                </tr>
            </tbody>
            <tr style="font-weight: 500;">
                <td v-for="(col, index) in colunas" :class='classColuna(col)'>
                    <div v-if="index==0">Total</div>
                    <div v-if="col.nome=='resultado' && col.somar" :class='classColResultado(col)'>{{ formataNum( info.resultadoResumo ,2)}}</div>
                    <div v-if="col.nome=='fgts' && col.somar" :class='classColResultado(col)'>{{ formataNum( info.resultadoFGTS ,2)}}</div>
                    <div v-if="col.nome=='irrf' && col.somar" :class='classColResultado(col)'>{{ formataNum( info.resultadoIRRF ,2)}}</div>
                    <div v-if="col.nome=='baseCorrigidaEmpregador' && col.somar" :class='classColResultado(col)'>{{ formataNum( info.resultadoBaseEmpregadorCorrigida ,2)}}</div>
                    
                </td>
            </tr>
        </table>

       
  </div>
</template>

<script>
    import avisoEdicao from './avisoEdicao'
    import inputNum from './inputNum'
    import inputHora from './inputHora'
    import Func from '../plugins/func' 

    export default {
        name: 'relatorioComum',
        mixins: [Func], 
        props: {
            plan: String 
        }, 
        data () {
            return  {
                planilhaLocal :  {} 
            }
        }, 
        components: {
            inputNum, inputHora, avisoEdicao 
        },
        methods: {
            alteraValor (evt) {
                var form = { idCalc: this.$store.state.idCalc }
                form[ evt.target.name ] = this.limpaNum(evt.target.value) 
                this.$socket.emit('v', form) 
            },
            alteraHora (evt) {
                var form = { idCalc: this.$store.state.idCalc }
                form[ evt.target.name ] = evt.target.value  
                // console.log('v', form)
                this.$socket.emit('v', form) 
            },
            alteraSomar (col) {
                var form = { idCalc: this.$store.state.idCalc }
                if (col.nome=='resultado') var s1 = 'somarResumo' 
                if (col.nome=='inss' || col.nome=='baseCorrigidaEmpregador') var s1 = 'somarINSS' 
                if (col.nome=='irrf') var s1 = 'somarIRRF' 
                if (col.nome=='fgts') var s1 = 'somarFGTS' 
                form[ this.info.prefixo+'-info-'+s1 ] = !this.info[s1] 
                this.$socket.emit('v', form) 
            },
            showModal (referencia) {
                // console.log('showModal', referencia)
                this.$parent.$refs[referencia].openModal () 
            },
            classTituloColuna (col) {
                return (col.tipo=='v') ? 'classTituloColuna' : '' 
            },
            classColuna (col) {
                // console.log(col)
                return (col.tipo=='v') ? 'classColuna' : '' 
            },
            corSomar (col) {
                if (col.nome == 'resultado' && this.info.somarResumo) return "classSomarSIM"
                if (col.nome == 'inss' && this.info.somarINSS) return "classSomarSIM"
                if (col.nome == 'irrf' && this.info.somarIRRF) return "classSomarSIM"
                if (col.nome == 'fgts' && this.info.somarFGTS) return "classSomarSIM"
                if (col.nome == 'baseCorrigidaEmpregador' && this.info.somarINSS) return "classSomarSIM"

                return "classSomarNAO"
            },
            classColResultado (col) {
                if (col.nome == 'resultado' && !this.info.somarResumo) return "riscado"
                if (col.nome == 'inss' && !this.info.somarINSS) return "riscado"
                if (col.nome == 'irrf' && !this.info.somarIRRF) return "riscado"
                if (col.nome == 'fgts' && !this.info.somarFGTS) return "riscado"
                if (col.nome == 'baseCorrigidaEmpregador' && !this.info.somarINSS) return "riscado"
                
                return "" 
            }
        },
        computed: {
            planilha () {
                var c = this.$store.state.planilhas[ this.plan ].colunas
                var p = this.$store.state.planilhas[ this.plan ].planilha 
                this.planilhaLocal = {} 

                for (var pi in p) {
                    if (typeof this.planilhaLocal[ pi ] === 'undefined') {
                        this.planilhaLocal[ pi ] = {}
                    }

                    for (var ci in c) {
                        if ( c[ ci ].tipo == 'v' ||  c[ ci ].tipo == 'h' ) {
                            this.planilhaLocal[ pi ][ c[ ci ].nome ]= p[ pi ][ c[ ci ].nome ]
                        }
                    }
                }

                return this.$store.state.planilhas[ this.plan ].planilha  
            },
            colunas () {
                return this.$store.state.planilhas[ this.plan ].colunas  
            },
            info () {
                return this.$store.state.planilhas[ this.plan ].info  
            },
            hostTJS () {
                return this.$store.state.hostTJS 
            },
            variaveis () {
                return this.$store.state.variaveis 
            },
            infoUsuario () {
                return this.$store.state.infoUsuario
            }
        } 
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>
.classTituloColuna {
    font-weight: 800;
    color: #EF6C00;
}

.classSomarSIM {
    font-weight: 800;
    color: green !important;
}

.classSomarNAO {
    font-weight: 800;
    color: red !important;
}

.riscado {
    text-decoration: line-through 1px #DDD;
    color: #DDD;

}

</style>
