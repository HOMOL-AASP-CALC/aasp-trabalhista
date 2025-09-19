<template>
  <div class="relatorioForma" >
      
      <h2>Resumo Geral dos Haveres</h2>  
      
      {{ variaveis.tabelaCorrecaoNome }}<br /><br />
      <!-- {{variaveis}} -->
        <table class='tabela'>
            <tbody v-for="p in planilhas"> 
                <tr v-if="p.info.visivelLinhaResumo==1 && p.info.visivel==1">
                    <td style="text-align: left;"  :class='corRiscado(p.info)'>{{p.info.titulo}}</td>
                    <td style="text-align: right;" :class='corRiscado(p.info)'>{{ formataNum( p.info.resultadoResumo, 2) }}</td>
                    <td style="width:20px;" v-if="podeEditar">
                        <div class="iconeModal"  style="cursor: pointer;" @click="alteraSomar(p.info)">
                            <a :class='corSomar(p.info)'><font-awesome-icon icon="plus" /></a>
                        </div>
                    </td>
                </tr>
            </tbody>

            <tr>
                <td style="text-align: left;" :class="variaveis.seguroDesemprego ? '' : 'riscado'">
                     Seguro desemprego (média dos salários: R$ {{formataNum( variaveis.seguroDesempregoMediaSalarios, 2) }}; número de parcelas: {{variaveis.seguroDesempregoParcelas}}{{ (variaveis.seguroDesempregoCorrigir) ? "; corrigido monetariamente" : "" }})
                </td>
                <td style="text-align: right;" :class="variaveis.seguroDesemprego ? '' : 'riscado'">{{ formataNum( variaveis.resumo_seguroDesemprego, 2) }}</td>
                <td style="width:20px;" v-if="podeEditar">
                    <div class="iconeModal engrenagem" @click="showModal('mSeguroDesemprego')"><font-awesome-icon icon="gear" /></div>
                </td>
            </tr>

            <tr style="font-weight: 700;">
                <td style="text-align: left;">Subtotal</td>
                <td style="text-align: right;">{{ formataNum( variaveis.resumo_TotalAnexos, 2) }}</td>
                <td style="width:20px;" v-if="podeEditar"></td>
            </tr>

            <tr>
                <td style="text-align: left;">FGTS</td>
                <td style="text-align: right;">{{ formataNum( variaveis.resumo_TotalFGTS, 2) }}</td>
                <td style="width:20px;" v-if="podeEditar"></td>
            </tr>

            <tr>
                <td style="text-align: left;"  :class="variaveis.resumo_MultaFGTS_considerar ? '' : 'riscado'">Multa de 40% do FGTS</td>
                <td style="text-align: right;" :class="variaveis.resumo_MultaFGTS_considerar ? '' : 'riscado'">{{ formataNum( variaveis.resumo_MultaFGTS, 2) }}</td>
                <td style="width:20px;" v-if="podeEditar">
                    <div class="iconeModal"  style="cursor: pointer;" @click="alteraSomarVariavel('resumo_MultaFGTS_considerar')">
                        <a :class='corSomarVariavel("resumo_MultaFGTS_considerar")'><font-awesome-icon icon="plus" /></a>
                    </div> 
                </td>
            </tr>

            <tr v-if="variaveis.fgts40_valor>0">
                <td style="text-align: left;">
                     Multa de 40% sobre os valores do FGTS (valor depositado R$ {{ formataNum(variaveis.fgts40_valor,2) }} x 40% x {{formataNum( variaveis.ultimoIndiceCorrecao, 9) }} 
                </td>
                <td style="text-align: right;">{{ formataNum( variaveis.resumo_FGTSDepositado, 2) }}</td>
                <td style="width:20px;" v-if="podeEditar"></td>
            </tr>
           

            <tr style="font-weight: 700;">
                <td style="text-align: left;">Subtotal</td>
                <td style="text-align: right;">{{ formataNum( variaveis.resumo_TotalAnexosFGTS, 2) }}</td>
                <td style="width:20px;" v-if="podeEditar"></td>
            </tr>


            <!-- <tr v-if="variaveis.inss_juros==1">
                <td style="text-align: left;" :class="variaveis.juros_sn!='1' ? 'riscado' : ''">
                     Juros (R${{ formataNum( variaveis.resumo_TotalAnexosFGTS, 2) }} - R$ {{ formataNum(variaveis.resumo_somaINSS,2) }} (INSS) = R$ {{ formataNum(variaveis.resumo_baseJuros,2) }} x {{ formataNum( variaveis.resumo_JurosPercentual, 2) }}% )
                </td>
                <td style="text-align: right;" :class="variaveis.juros_sn!='1' ? 'riscado' : ''">{{ formataNum( variaveis.resumo_Juros, 2) }}</td>
                <td style="width:20px;" v-if="podeEditar">
                    <div class="iconeModal" @click="showModal('mIndiceCorrecao')" style="cursor: pointer; color: #2c3e50;"><font-awesome-icon icon="gear" /></div>
                </td>
            </tr> -->
             <tr> <!-- v-if="variaveis.inss_juros==0">  -->
                <td style="text-align: left;" >
                     Juros (R$ {{ formataNum( variaveis.resumo_baseJuros, 2) }} x {{ formataNum( variaveis.resumo_JurosPercentual, 2) }}%)
                </td>
                <td style="text-align: right;" >{{ formataNum( variaveis.resumo_Juros, 2) }}</td>
                <td style="width:20px;" v-if="podeEditar"> 
                    <div class="iconeModal engrenagem" @click="showModal('mIndiceCorrecao')"><font-awesome-icon icon="gear" /></div>
                </td>
            </tr>  
            
            
            <tr v-if="(variaveis.dataci!='') && (variaveis.resumo_SelicValor>0) ">
                <td style="text-align: left;" >
                     Selic (R$ {{ formataNum( variaveis.resumo_TotalAnexosFGTS, 2) }}  + {{ formataNum( variaveis.resumo_Juros, 2) }} ) x {{ formataNum( variaveis.resumo_SelicPercentual, 2) }}%
                </td>
                <td style="text-align: right;" >{{ formataNum( variaveis.resumo_SelicValor, 2) }}</td>
                <td style="width:20px;" v-if="podeEditar"> 
                    <div class="iconeModal engrenagem" @click="showModal('mIndiceCorrecao')"><font-awesome-icon icon="gear" /></div>
                </td>
            </tr>  



            <tr style="font-weight: 700;">
                <td style="text-align: left;">Subtotal</td>
                <td style="text-align: right;">{{ formataNum( variaveis.resumo_subtotalJuros, 2) }}</td>
                <td style="width:20px;" v-if="podeEditar"></td>
            </tr>

            <tr>
                <td style="text-align: left;" :class='(variaveis.inss_reclamante!=1) ? "riscado" : "" '>
                     INSS do reclamante
                </td>
                <td style="text-align: right;" :class='(variaveis.inss_reclamante!=1) ? "riscado" : "" '>{{ formataNum( variaveis.resumo_somaINSS*-1, 2) }}</td>
                <td style="width:20px;" v-if="podeEditar">
                    <div class="iconeModal engrenagem" @click="showModal('mINSS')"><font-awesome-icon icon="gear" /></div>
                </td>
            </tr>

            <tr v-if="variaveis.irrf_modo=='caixa'">
                <td style="text-align: left;" :class='(variaveis.irrf_sn!=1) ? "riscado" : "" '>
                     IRRF (regime de caixa) [(R$ {{ formataNum(variaveis.ir_base, 2) }} x {{ formataNum(variaveis.ir_perc, 2) }}%) - {{ formataNum(variaveis.ir_deducao, 2) }}]  
                </td>
                <td style="text-align: right;" :class='(variaveis.irrf_sn!=1) ? "riscado" : "" '>{{ formataNum(variaveis.ir_reclamante*-1, 2) }}</td>
                <td style="width:20px;" v-if="podeEditar">
                    <div class="iconeModal engrenagem" @click="showModal('mIRRF')"><font-awesome-icon icon="gear" /></div>
                </td>
            </tr>
            <tr v-if="variaveis.irrf_modo=='1127' ">
                <td style="text-align: left;" :class='(variaveis.irrf_sn!=1) ? "riscado" : "" '>
                     IRRF (IN 1500/14) [(R$ {{ formataNum(variaveis.ir_base, 2) }}  x {{ formataNum(variaveis.ir_perc, 2) }}%) - {{ formataNum(variaveis.ir_deducao, 2) }}  ({{variaveis.ir_meses}} meses)
                </td>
                <td style="text-align: right;" :class='(variaveis.irrf_sn!=1) ? "riscado" : "" '>{{ formataNum(variaveis.ir_reclamante*-1, 2) }}</td>
                <td style="width:20px;" v-if="podeEditar">
                    <div class="iconeModal engrenagem" @click="showModal('mIRRF')"><font-awesome-icon icon="gear" /></div>
                </td>
            </tr>

            <tr style="font-weight: 700;">
                <td style="text-align: left;">Subtotal</td>
                <td style="text-align: right;">{{ formataNum( variaveis.resumo_subtotal_INSS_IRRF, 2) }}</td>
                <td style="width:20px;" v-if="podeEditar"></td>
            </tr>


            <tr>
                <td style="text-align: left;" :class='(variaveis.hono_base=="n") ? "riscado" : "" '>
                     Honorários advocatícios <span v-if="(variaveis.hono_modo  != 'd' )">(R$ {{ formataNum( variaveis.hono_base, 2) }} x {{ formataNum( variaveis.hono_perc, 2) }}%) </span>
                </td>
                <td style="text-align: right;" :class='(variaveis.hono_base=="n") ? "riscado" : "" '>{{ formataNum( variaveis.resumo_hono, 2) }}</td>
                <td style="width:20px;" v-if="podeEditar">
                    <div class="iconeModal engrenagem" @click="showModal('mHonorarios')"><font-awesome-icon icon="gear" /></div>
                </td>
            </tr>


            <tr>
                <td style="text-align: left;" :class='(variaveis.hono_per_modo=="0") ? "riscado" : "" '>
                     Honorários periciais  <span v-if="(variaveis.hono_per_modo  != 'v' )">(R$ {{ formataNum( variaveis.hono_per_base, 2) }} x {{ formataNum( variaveis.hono_per_perc, 2) }}%) </span>
                </td>
                <td style="text-align: right;" :class='(variaveis.hono_per_modo=="0") ? "riscado" : "" '>{{ formataNum( variaveis.resumo_per_hono, 2) }}</td>
                <td style="width:20px;" v-if="podeEditar">
                    <div class="iconeModal engrenagem" @click="showModal('mHonoPer')"><font-awesome-icon icon="gear" /></div>
                </td>
            </tr>

            <tr>
                <td style="text-align: left;" :class='(variaveis.hono_suc_modo=="nao_calcular") ? "riscado" : "" '>
                     Honorários de sucumbências
                </td>
                <td style="text-align: right;" :class='(variaveis.hono_suc_modo=="nao_calcular") ? "riscado" : "" '>{{ formataNum( variaveis.resumo_suc_hono, 2) }}</td>
                <td style="width:20px;" v-if="podeEditar">
                    <div class="iconeModal engrenagem" @click="showModal('mSucumbencias')"><font-awesome-icon icon="gear" /></div>
                </td>
            </tr>

            <tr style="font-weight: 700;">
                <td style="text-align: left;">Total</td>
                <td style="text-align: right;">{{ formataNum( variaveis.resumo_TotalFinal, 2) }}</td>
                <td style="width:20px;" v-if="podeEditar"></td>
            </tr>

        </table>

        <br />

        <table class='tabela' style="width: 600px;">
            <tr>
                <td style="text-align: left;"><b>INSS Reclamada</b></td>
                <td style="text-align: right;"><div class="iconeModal engrenagem" @click="showModal('mINSSReclamada')" v-if="podeEditar"><font-awesome-icon icon="gear" /></div></td>
            </tr>
            <tr>
                <td style="text-align: left;" :class="variaveis.inssemp_sn=='0' ? 'riscado' : ''">Percentual do empregador (R$ {{ formataNum( variaveis.resumo_baseINSSEmpregador, 2) }} x {{ formataNum( variaveis.inssemp_e, 2) }}%)</td>
                <td style="text-align: right;"  :class="variaveis.inssemp_sn=='0' ? 'riscado' : ''" >{{ formataNum( variaveis.resumo_inssemp_e, 2) }}</td>
            </tr>
            <tr>
                <td style="text-align: left;"  :class="variaveis.inssemp_sn=='0' ? 'riscado' : ''" >Percentual de terceiros (R$ {{ formataNum( variaveis.resumo_baseINSSEmpregador, 2) }} x {{ formataNum( variaveis.inssemp_t, 2) }}%)</td>
                <td style="text-align: right;"  :class="variaveis.inssemp_sn=='0' ? 'riscado' : ''" >{{ formataNum( variaveis.resumo_inssemp_t, 2) }}</td>
            </tr>
            <tr>
                <td style="text-align: left;"  :class="variaveis.inssemp_sn=='0' ? 'riscado' : ''" >Percentual ref. ao SAT (R$ {{ formataNum( variaveis.resumo_baseINSSEmpregador, 2) }} x {{ formataNum( variaveis.inssemp_s, 2) }}%)</td>
                <td style="text-align: right;"  :class="variaveis.inssemp_sn=='0' ? 'riscado' : ''" >{{ formataNum( variaveis.resumo_inssemp_s, 2) }}</td>
            </tr>
        </table>

        <br />
  </div>
</template>

<script>
    import Func from '../plugins/func' 

    export default {
        name: 'relatorioComum',
        mixins: [Func],
        methods: {
            corSomar (linha) {
                if (linha.somarResumo) return "classSomarSIM"
                return "classSomarNAO"
            },
            corRiscado (linha) {
                if (linha.somarResumo) return ""
                return "riscado"
            },
            alteraSomar (linha) {
                var form = { idCalc: this.$store.state.idCalc }
                var s1 = 'somarResumo' 

                form[ linha.prefixo+'-info-'+s1 ] = !linha[s1] 
                this.$socket.emit('v', form) 
            },

            corSomarVariavel (v1) {
                if (this.variaveis[v1]) return "classSomarSIM"
                return "classSomarNAO"
            },
            alteraSomarVariavel (v1) {
                var form = { idCalc: this.$store.state.idCalc }

                form[ v1 ] = !this.variaveis[ v1 ] 
                this.$socket.emit('v', form) 
            },
            showModal (referencia) {
                this.$parent.$refs[referencia].openModal () 
            },
        },
        computed: {
            planilhas () {
                return this.$store.state.planilhas  
            },
            variaveis () {
                return this.$store.state.variaveis  
            },
            podeEditar () {
                return this.$store.state.infoUsuario.permissao!='v'
            }
        } 
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tabela {
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    border-collapse: collapse;
}

.tabela td {
     border: 1px solid #ddd;
     border-collapse: collapse;
     padding: 5px;
}

.tabela input {
    text-align: right;
    border: 1px solid #eee;
    padding: 4px;
    border-radius: 4px;
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

.engrenagem {
    cursor: pointer; 
    color: #2c3e50;
}

</style>
