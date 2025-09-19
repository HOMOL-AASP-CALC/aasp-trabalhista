<template>
  <div>
            <input
                    type="text"
                    autocomplete="off" 
                    :value="svalor"
                    :errado="errado" 
                    :modo="modo"
                    :disabled="disabled"
                    :name="name"
                    v-on:input="input_mask($event)"
                    @change='mudouInfo'
                    @focus="$event.target.select()" 
                    maxlength="6" 
                    :class="classe()"
                    > 
      <!-- {{  svalor  }} -->
  </div>
</template>

<script>

import calcUtil from '../plugins/calcUtil' 

  export default {
    props: {
      value: { type: String },
      errado: {type: String },
      modo : { type: String  },
      name : { type: String  },
      disabled: { type: Boolean }
    },
    mixins: [ calcUtil], 
    data () {
      return {
        svalor: '',
        separador: ':',
        autoVerifica: "0"
      }
    },
    mounted () {
      // console.log(this.value, this.modo)
      this.svalor =  this.value
      this.separador = (this.modo == 'd') ? ',' : ':'
    },
    methods: {
      mudouInfo (event) {
        this.$emit('change', event)
      },
      verificaHora () {
          if ((this.svalor.length != 6) || (this.modo == 'd')) {
              this.autoVerifica = "0";
              return;
          }
          var h = this.dia2intDia( this.svalor )
          var m = this.dia2intMes( this.svalor )

          if (this.modo == 'd') {
              if (h<0 || h>23) { this.autoVerifica = "1"; return; }
              if (m<0 || m>99) { this.autoVerifica = "1"; return; }
          }
          if (this.modo == 's') {
              if (m<0 || m>59) { this.autoVerifica = "1"; return; }
          }
          this.autoVerifica = "0";
       },
      input_mask  (e) {
        var el = e.target;
        var value = el.value;

        value = filtro_mask(value, this.separador)
        if (e.inputType != 'deleteContentBackward') {
            if (value.length == 3)   {
                value += this.separador 
            }
            if (value.length == 4)  {
                if (value[ value.length-1 ] != this.separador) {
                    value = value.substring(0, value.length-1) + this.separador + value[ value.length-1 ] 
                }
            }
        }

        el.value = value;
        this.svalor =value
        this.verificaHora() 
        this.$emit('input',  value );
       
        function filtro_mask(v, sep) {
            // console.log('v sep', v, sep)
            var r = "";
            if (v == '.' || v==',' || v == ':') v = '' 
            for (var x=0; x<v.length; x++) {
                // console.log('v[x]',x, v[x])
                if ((v[x] == "." || v[x] == "," || v[x] == ":") && (x<3) ) { r = calcUtil.zeroStr3(r) + sep;  }
                if ((v[x] == "." || v[x] == "," || v[x] == ":") && (x==3) ) { r = r + sep;  }
                if ((v[x] >= "0") && (v[x] <= "9"))  { r = r + v[x];  }
            }
            return r;
        }
      },
      classe () {
          if ((this.errado=="1" ) || (this.autoVerifica == "1")) {
              return "input_class1 erro"
          } else {
              return "input_class1"
          }
          
      }
    },
    watch: {
      value (newValue) {
        // console.log('mudou o valor - ', newValue)
        this.svalor = newValue
      }
    }
  } 
</script>

<style>
.input_class1 {
  text-align: right;
  width: 60px;
}

.erro {
    background-color: #FFEBEE !important;
    border: 1px red solid;
}

</style>