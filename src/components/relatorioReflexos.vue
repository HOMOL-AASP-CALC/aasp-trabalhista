<template>
  <div class="relatorioForma">
      
      <h2>{{info.titulo}}</h2> 

        <table class='tabela'>
            <tr>
                <th v-for="col in colunas" :class="classTituloColuna(col)">{{col.titulo}}
                    <div v-if="col.modal && infoUsuario.permissao!='v'" class="iconeModal" @click="showModal(col.modal)" style="cursor: pointer; color: #2c3e50;">
                        <a ><font-awesome-icon icon="gear" /></a>
                    </div>
                </th>
                <th v-if="infoUsuario.permissao!='v'"></th> 
            </tr>
            <tbody  v-for="(linha, index) in planilha">
                <tr>
                    <td v-for="col in colunas">
                        <div v-if="col.tipo=='data'" style='text-align:left;'>{{ planilha[index][col.nome] }}</div>
                        <div v-if="col.tipo=='proporcao'">{{ planilha[index][col.nome] }}</div>
                        <div v-if="col.tipo=='f'">{{ formataNum( planilha[index][col.nome], col.casas) }}</div>
                        <div v-if="col.tipo=='v'" >
                            <inputNum type=text :value='planilha[index][col.nome]' :name='info.prefixo+`-`+index+`-`+col.nome' @change="alteraValor" :disabled="infoUsuario.permissao=='v'" />
                        </div>
                    </td>
                    <td v-if="infoUsuario.permissao!='v'">
                        <a @click="deletar(index)" style="cursor: pointer;"><font-awesome-icon icon="xmark" /></a>&nbsp;
                        <a @click="editar(index)"  style="cursor: pointer;"><font-awesome-icon icon="pen" /></a>
                    </td>
                </tr>
            </tbody>
<!-- {{ planilha}} -->
            <tr  style="font-weight: 500;">
                <td v-for="(col, index) in colunas" :class='classColuna(col)'>
                    <div v-if="index==0">Total</div>
                    <div v-if="col.nome=='resultado' && col.somar" :class='classColResultado(col)'>{{ formataNum( info.resultadoResumo ,2)}}</div>
                    <div v-if="col.nome=='fgts' && col.somar" :class='classColResultado(col)'>{{ formataNum( info.resultadoFGTS ,2)}}</div>
                    <div v-if="col.nome=='irrf' && col.somar" :class='classColResultado(col)'>{{ formataNum( info.resultadoIRRF ,2)}}</div>
                    <div v-if="col.nome=='baseCorrigidaEmpregador' && col.somar" :class='classColResultado(col)'>{{ formataNum( info.resultadoBaseEmpregadorCorrigida ,2)}}</div>  
                </td>
            </tr>
        </table>
        <button v-if="infoUsuario.permissao!='v'" @click="showModal('mEditReflexo')" class="btn1"><font-awesome-icon icon="plus" />Adicionar item</button>
    
  </div>
</template>

<script>

    import inputNum from './inputNum'
    import Func from '../plugins/func' 

    export default {
        name: 'relatorioComum',
        mixins: [Func], 
        props: {
            plan: String 
        }, 
        components: { inputNum },
        methods: {
            leInfo () {
                this.$store.commit('leInfo')  
            },
            alteraValor (evt) {
                var form = { idCalc: this.$store.state.idCalc }
                form[ evt.target.name ] = this.limpaNum(evt.target.value) 
                this.$socket.emit('v', form) 
            },
            showModal (referencia) {
                this.$parent.$refs[referencia].openModal ({prefixo: this.info.prefixo, index: -1} ) 
            },
            editar ( i ) {
                this.$parent.$refs['mEditReflexo'].openModal ({prefixo: this.info.prefixo, index: i, plan: this.planilha[i] } ) 
            },
            deletar ( i ) {
                this.$socket.emit('deletarReflexo', {
                    idCalc: this.$store.state.idCalc,
                    anexo: this.info.prefixo, 
                    linha: i
                })
            },
            classTituloColuna (col) {
                return (col.tipo=='v') ? 'classTituloColuna' : '' 
            },
            classColuna (col) {
                return (col.tipo=='v') ? 'classColuna' : '' 
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
            infoUsuario () {
                return this.$store.state.infoUsuario
            }
        } 
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="1">

.iconeModal {
    cursor: pointer;
}

.classTituloColuna {
    font-weight: 800;
    color: #EF6C00;
}


.btn1 {
  color: #000;
  background: #eee;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin-top: 20px;
  padding: 6px;
  cursor: pointer;
}

.btn1:hover {
  background: #ccc;
}

</style>
