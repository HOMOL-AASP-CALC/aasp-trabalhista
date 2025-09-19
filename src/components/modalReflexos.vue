<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Reflexos</template>
      <template v-slot:body>

        <table>
            <tr><td colspan=5>

              <table>
                <tr>
                    <td>Data</td>
                    <td>Tipo</td>
                    <td v-if="proporcao!=-1">
                      <div v-if="tipoCalc!='ap'">Proporção</div>
                      <div v-if="tipoCalc=='ap' || tipoCalc=='saldoSalarial'">Dias</div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <select v-model="diaInt" :class="validacaoCampo(aviso_diaInt)">
                            <option v-for="item in opcsDia"  :value="item">{{ mesAno2dia( item ) }}</option>
                        </select>

                    </td>
                    <td>
                        <select v-model="tipoCalc" :class="validacaoCampo(aviso_tipoCalc)">
                            <option v-for="item in tipoCalcList"  :value="item.codigo">{{  item.desc }}</option>
                        </select>
                    </td>
                    <td v-if="proporcao!=-1">
                        <select v-model="proporcao">
                            <option v-for="item in proporcaoList"  :value="item">{{  item }}</option>
                        </select>
                    </td>
                </tr>
              </table>
              </td></tr>

            <tr v-if="tipoCalc=='multa467'" >
              <td colspan="4"  class="tr_espaco">  
                <table>
                  <tr><td colspan=2><b>Metodologia de cálculo do art. 467:</b></td></tr>
                  <tr><td><input type=radio name="met1" v-model="multa467metodo" value="rescisao50"></td><td>Calcular 50% da rescisão: saldo salarial + aviso prévio + 13o salário</td></tr>
                  <tr><td><input type=radio name="met1" v-model="multa467metodo" value="saldo50"></td><td>Calcular 50% do saldo salarial</td></tr>
                  <tr><td><input type=radio name="met1" v-model="multa467metodo" value="saldo100"></td><td>Calcular 100% do saldo salarial</td></tr>
                </table>
              </td>
            </tr>   
            
            <tr v-if="tipoCalc=='outro'" >
              <td colspan="4">  
                <table>
                    <tr><td>Descrição:</td><td><input type="text" style="text-align: left;" v-model="outroDesc"></td></tr> 
                    <tr><td>Valor:</td><td><inputNum type="text" v-model="outroValor"  /></td></tr> 
                </table>
              </td>
            </tr>

            <tr v-if="mostrarPeriodoAquisitivo" >
            <td colspan="4" class="tr_espaco">
              <table>
                <tr><td colspan=2><b>Digite o período aquisitivo:</b></td></tr>
                <tr><td>Início:</td><td><inputData type="text" v-model="pa_ini" :errado="aviso_pa_ini" /> <span style='color:red'>{{ pa_iniStrErro }}</span></td></tr>
                <tr><td>Fim:</td><td><inputData type="text" v-model="pa_fim" :errado="aviso_pa_fim" /> <span style='color:red'>{{ pa_fimStrErro }}</span></td></tr>
              </table>
            </td>
            </tr>

            <tr>
                <td>Selecione as incidências:<br />
                <input type=checkbox v-model="calcSomar"> Somar esta verba
                &nbsp;<input type=checkbox v-model="calcFGTS"> FGTS
                &nbsp;<input type=checkbox v-model="calcINSS"> INSS
                &nbsp;<input type=checkbox v-model="calcIRRF"> IRRF</td>
            </tr>
        </table>


        <button  type="button"   class="btn-open-modal"  @click="enviaForm"   aria-label="Close Modal"> OK </button>
        <button  type="button"   class="btn-open-modal"  @click="close"   aria-label="Close Modal"> Cancela </button>

      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "./modal";
import inputNum from './inputNum'
import inputData from './inputData'
import calcUtil from '../plugins/calcUtil' 

var descricaoList = {
    'sal13': '13o. salário',
    'ap': 'Aviso prévio',
    'fi': 'Férias indenizadas',
    'fi3': 'Abono de Férias indenizadas',
    'fd': 'Férias dobradas',
    'fd3': 'Abono de férias dobradas',
    'fp': 'Férias proporcionais', 
    'fp3': 'Abono de férias proporcionais',
    'fg': 'Férias gozadas',
    'fg3': 'Abono de férias gozadas',
    'multa467' : 'Multa do Art. 467',
    'multa477' : 'Multa do Art. 477',
    'saldoSalarial': 'Saldo Salarial'
}

export default {
  name: "App",
  components: {
    Modal, inputNum, inputData
  },
  mixins: [ calcUtil ],
  data() {
    return {
      visible: false,
      tabelas: [],
      epoca: '1',
      idTabela: 0,
      dadosOrigem: {},
      desc: '',
      opcsDia: [],
      proporcaoList: [],
      diaInt: 0,
      proporcao: 12, 
      tipoCalc: '',
      calcINSS: 0,
      calcFGTS: 0,
      calcIRRF: 0,
      calcSomar: 1, 
      mostrarPeriodoAquisitivo: true, 
      outroDesc: '', 
      outroValor: 0,
      multa467metodo: 'rescisao50',  
      pa_ini : '',
      pa_fim: '', 
      aviso_pa_fim: '0',
      pa_fimStrErro: '',
      aviso_pa_ini: '0', 
      pa_iniStrErro: '',
      aviso_diaInt: '0',
      aviso_diaInt: '0',
      aviso_tipoCalc: '0', 
      tipoCalcList: [], 
      ultimosDias: 1 
    };
  },
  methods: {
    openModal(dadosOrigem1) {
        // console.log('dadosOrigem1',dadosOrigem1)
        this.visible = true;
        this.dadosOrigem = dadosOrigem1 

        var inicio = this.dia2intMesAno(this.plan_v.dataad)
        var fim = this.dia2intMesAno(this.plan_v.datade)
        if (this.plan_v.dataes != '') {
          fim = this.dia2intMesAno(this.plan_v.dataes)
        }

        this.ultimosDias = this.dia2intDia( this.plan_v.datade )
        this.opcsDia = [] 
        this.proporcaoList = [] 
        for ( var i = inicio; i <= fim; i++ ) {
            this.opcsDia.push( i )
        }
        for ( var i = 1; i <= 120; i++) {
            this.proporcaoList.push(i)
        }

        if (this.dadosOrigem.index == -1) {
            this.desc = ""
            this.pa_ini = ""
            this.pa_fim = ""
            this.tipoCalc = "" 
            this.diaInt = fim 
        } else {
            this.diaInt = dadosOrigem1.plan.diaInt 
            this.proporcao = dadosOrigem1.plan.proporcao
            this.tipoCalc = dadosOrigem1.plan.tipoCalc 

            this.pa_ini = dadosOrigem1.plan.pa_ini
            this.pa_fim = dadosOrigem1.plan.pa_fim 

            if ( dadosOrigem1.plan.tipoCalc == "multa467" ) {
              this.multa467metodo = dadosOrigem1.plan.multa467metodo
            }
            
            if ( dadosOrigem1.plan.tipoCalc == "outro" ) {
              this.outroDesc = dadosOrigem1.plan.desc
              this.outroValor = dadosOrigem1.plan.valor
            }

            this.desc = dadosOrigem1.plan.desc 
            this.calcINSS = dadosOrigem1.plan.calcINSS
            this.calcFGTS = dadosOrigem1.plan.calcFGTS
            this.calcIRRF = dadosOrigem1.plan.calcIRRF
            this.calcSomar = dadosOrigem1.plan.calcSomar 
        }

        this.tipoCalcList = [ ]
        this.tipoCalcList.push(
          { codigo: 'sal13', desc: '13o. salário' },
          { codigo: 'ap', desc: 'Aviso prévio' },
          { codigo: 'fi', desc: 'Férias indenizadas' },
          { codigo: 'fi3', desc: 'Abono de Férias indenizadas' },
          { codigo: 'fd', desc: 'Férias dobradas' },
          { codigo: 'fd3', desc: 'Abono de férias dobradas' },
          { codigo: 'fp', desc: 'Férias proporcionais' },
          { codigo: 'fp3', desc: 'Abono de férias proporcionais' },
          { codigo: 'fg', desc: 'Férias gozadas' },
          { codigo: 'fg3', desc: 'Abono de férias gozadas' }
        )  
        if (this.dadosOrigem.prefixo == 'verbasRescisorias') {
          this.tipoCalcList.push(
            { codigo: 'multa467', desc: 'Multa do Art. 467' },
            { codigo: 'multa477', desc: 'Multa do Art. 477' },
            { codigo: 'saldoSalarial', desc: 'Saldo Salarial' },
            { codigo: 'outro', desc: 'outro' }
          )
        }

        this.aviso_diaInt = '0'
        this.aviso_pa_fim = '0'
        this.aviso_pa_ini = '0'
        this.aviso_tipoCalc = '0'
        this.pa_iniStrErro = ''
        this.pa_fimStrErro = ''

    },
    close() {
      this.visible = false;
    },
    enviaForm () {
      var form_ok = 1;
      this.pa_iniStrErro = ''
      this.pa_fimStrErro = ''

      var dados = {
        idCalc: this.$store.state.idCalc, 
        nome: this.dadosOrigem.prefixo,
        index: this.dadosOrigem.index,
        diaInt: this.diaInt,
        desc: descricaoList[this.tipoCalc],
        tipoCalc: this.tipoCalc,
        pa_ini: this.pa_ini,
        pa_fim: this.pa_fim,
        proporcao: this.proporcao,
        calcINSS: this.calcINSS,
        calcFGTS: this.calcFGTS,
        calcIRRF: this.calcIRRF,
        calcSomar: this.calcSomar,
        autor: 'cliente'  
      }

      if (this.tipoCalc=='outro') {
        dados.valor = this.outroValor 
        dados.desc = this.outroDesc 
      }

      if (this.tipoCalc=='multa467') {
        dados.multa467metodo = this.multa467metodo  
      }

      if ((!dados.diaInt) ||  (dados.diaInt <= 0)) {
        this.aviso_diaInt = '1'
        form_ok = 0 
      }

      if (!dados.desc) {
        this.aviso_tipoCalc = '1'
        form_ok = 0 
      }

      if (this.mostrarPeriodoAquisitivo && dados.pa_ini == '') {
        this.aviso_pa_ini = '1'
        form_ok = 0 
      }

      if (this.mostrarPeriodoAquisitivo && dados.pa_fim == '') {
        this.aviso_pa_fim = '1'
        form_ok = 0 
      }

      // console.log('enviaForm form_ok', form_ok)

      if (form_ok && this.mostrarPeriodoAquisitivo) {
        if (!this.dataOk(this.pa_ini)) {
          this.aviso_pa_ini = '1'
          form_ok = 0
        }
        if (!this.dataOk(this.pa_fim)) {
          this.aviso_pa_fim = '1'
          form_ok = 0
        }
      }

      // verifica datas se o periodo aquisitivo for solicitado
      if (form_ok && this.mostrarPeriodoAquisitivo) {
        var dataad = this.plan_v.dataad
        var datade = this.plan_v.datade
        var dataes = this.plan_v.dataes

        var dataadInt = this.dia2yyyymmddInt(dataad)
        var datadeInt = this.dia2yyyymmddInt(datade)
        let s1 = 'demissão'
        if (dataes != '') {
           datadeInt = this.dia2yyyymmddInt(dataes)
           s1 = 'estabilidade'
        }
        var pa_iniInt = this.dia2yyyymmddInt(this.pa_ini)
        var pa_fimInt = this.dia2yyyymmddInt(this.pa_fim)

        if (pa_iniInt < dataadInt) {
          this.pa_iniStrErro = 'Data deve ser maior ou igual a data de admissão'
          this.aviso_pa_ini = '1'
          form_ok = 0 
        }

        if (datadeInt < pa_iniInt) {
          this.pa_iniStrErro = 'Data deve ser menor que a data de '+s1
          this.aviso_pa_ini = '1'
          form_ok = 0 
        }

        if (pa_fimInt < dataadInt) {
          this.pa_fimStrErro = 'Data deve ser maior ou igual a data de admissão'
          this.aviso_pa_fim = '1'
          form_ok = 0 
        }

        if (datadeInt < pa_fimInt) {
          this.pa_fimStrErro = 'Data deve ser menor que a data de '+s1
          this.aviso_pa_fim = '1'
          form_ok = 0 
        }

        if (pa_fimInt < pa_iniInt) {
          this.pa_fimStrErro = 'O início do período aquisitivo deve deve ser menor que o fim'
          this.aviso_pa_ini = '1'
          this.aviso_pa_fim = '1'
          form_ok = 0 
        }

      }

      // console.log('enviaForm modalReflexos', dados)


      if (form_ok) {
        this.$socket.emit('vReflexo', dados)
        this.close () 
      }
    },

    validacaoCampo ( x ) {
      if (x>0) return "campoErro"
      return "" 
    }
  },
  computed: {
    plan_v () {
      return  this.$store.state.variaveis 
    },
    hostTJS () {
        return this.$store.state.hostTJS 
    }
  },
  watch: {
    tipoCalc(novo, velho) {
      this.aviso_tipoCalc = '0'
            // console.log('tipoCalc', novo, velho)
      if (novo == 'sal13') { this.proporcao =  12; this.mostrarPeriodoAquisitivo = true; }
      if (novo == 'ap') { this.proporcao =  30; this.mostrarPeriodoAquisitivo = true; }
      if (novo == 'fi') { this.proporcao =  12; this.mostrarPeriodoAquisitivo = true; }
      if (novo == 'fi3') { this.proporcao =  12; this.mostrarPeriodoAquisitivo = true; }
      if (novo == 'fd') { this.proporcao =  12; this.mostrarPeriodoAquisitivo = true; }
      if (novo == 'fd3') { this.proporcao =  12; this.mostrarPeriodoAquisitivo = true; }
      if (novo == 'fp') { this.proporcao =  12; this.mostrarPeriodoAquisitivo = true; }
      if (novo == 'fp3') { this.proporcao =  12; this.mostrarPeriodoAquisitivo = true; }
      if (novo == 'fg') { this.proporcao =  12; this.mostrarPeriodoAquisitivo = true; }
      if (novo == 'fg3') { this.proporcao =  12; this.mostrarPeriodoAquisitivo = true; }
      if (novo == 'multa467') { this.proporcao = -1; this.mostrarPeriodoAquisitivo = false; }
      if (novo == 'multa477') { this.proporcao = -1; this.mostrarPeriodoAquisitivo = false; }
      if (novo == 'saldoSalarial') { this.proporcao = this.ultimosDias; this.mostrarPeriodoAquisitivo = false; }
      if (novo == 'outro') { this.proporcao = -1; this.mostrarPeriodoAquisitivo = false; }
    },
    diaInt() {
      this.aviso_diaInt = '0'
    },
    pa_ini() {
      this.aviso_pa_ini = '0'
    },
    pa_fim() {
      this.aviso_pa_fim = '0'
    }
  }
};
</script>

<style scoped>

.tabela {
    width: 80%;
    background-color: #fff;

}

.tr_espaco {
  padding-top:15px;
  padding-bottom:15px;
}

.campoErro {
  /* border: 1px red solid; */
  background-color: #FFEBEE;
  border: 1px red solid;
}

</style> 