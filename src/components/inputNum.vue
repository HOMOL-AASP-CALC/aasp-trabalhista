<template>
  <div>
            <input
                    class="input_class1"
                    type="text"
                    autocomplete="off" 
                    :value="svalor"
                    :name="name" 
                    :disabled="disabled" 
                    v-on:input="input_numero($event)"
                    @change='mudouInfo'
                    @focus="$event.target.select()" 
                    >
  </div>
</template>

<script>

  import Func from '../plugins/func' 

  export default {
    props: {
      value: {
        type: Number
      },
      name: {
        type: String 
      },
      disabled: { type: Boolean }
    },
    mixins: [Func], 
    data () {
      return {
        svalor: '' 
      }
    },
    mounted () {
      this.svalor =  this.formataNum(this.value,2)
      // console.log('mounted', this.svalor)
    },
    methods: {
      mudouInfo (event) {
        this.$emit('change', event)
      },
      input_numero: function (e) {
        var char_milhar = ".";
        var char_centavos = ",";
        var el = e.target;
        var newCursorPosition;
        var newValue = limpa_numero2(el.value);
        // console.log('el.value', el.value, newValue)

        if(newValue = filtro_mask( newValue ) ) {
          newValue = formata_numero3(newValue,-1);
          newCursorPosition = newValue.length; 
        } else { 
          newValue = "";
          newCursorPosition = 0;
        }
        el.value = newValue;
        el.setSelectionRange(newCursorPosition, newCursorPosition);

        var newValueFloat = parseFloat(limpa_numero2(newValue));
        this.$emit('input',  newValueFloat );
        // this.$emit('input',  newValue );

        function limpa_numero2(n) {
            var n1 = n;

            n = String(n);
            var ponto_final = ((n[n.length-1]==".") || (n[n.length-1]==","));

            n = replaceAll(n, char_milhar, ""); 
            n = n.replace(char_centavos, ".");
            var r = "";

            // remove caracteres
            var p = 0;
            var centavos = 0;
            var resolvido = 0;

            // remove zeros no inicio do numero
            var p1  = 0;
            var p2 = 0;
            for (var x=0; (x < n.length) && (!p2); x++) {
              if (n[x]=="0") p1++; else p2=1;
            }
            n = n.substr(p1);

            while (p < n.length) {
              resolvido = 0;

              if ((n[p]>="0") && (n[p]<="9"))  {
                r = r + n[p];
                resolvido = 1;
              } 

              if ((!resolvido) && (n[p]==".") && (!centavos))  {
                r = r + n[p]; 
                centavos=1;  
                resolvido = 1;
              }

              if ((!resolvido) && (n[p]=="-"))  {
                r = r + n[p]; 
              }

              p++;
            }

          if (n.length<=0) r = "0";
          if ((ponto_final) && (!centavos)) r = r + ".";

          if (r[0]==".") {
            r = "0"+r;
          }

          return r;
        }

        function formata_numero3(n, c) {
          var m = 0;
          n = String(n);

          if (n.indexOf("e")>0) { n = '0'; }

          var len = n.length;
          var ponto = n.indexOf(".");
          if (ponto>0) {
            n = n.substr(0,ponto) + char_centavos + n.substr(ponto+1);
          }

          if (len>0) {
            if (n[0]==char_centavos) {
              n = '0'+n;
              len++;
              ponto++;
            }
          }

          if (c>0) {
            if (ponto<0) {
              n = n + char_centavos;
              ponto = len;
              len++;
            }
            while (  ( ( len-1) - ponto) < c) {
              n = n + '0';
              len++;
            }
            
            if (( ( len-1) - ponto) > c) {
              n = n.substr(0,   ponto+c+1);
            }
            // pontos de milhar 
            m = ponto -3;
            while (m > 0) {
              if ((m!=1) || ((m==1) && (n.substr(0,1)!="-" ))) {
                n = n.substr(0, m)+char_milhar+n.substr(m);
              }
              m = m - 3;
            }
          } else {
            //console.log('ponto: '+ponto);
            if (ponto < 0) ponto = n.length;
            m = ponto -3;
            while (m > 0) {
              if ((m!=1) || ((m==1) && (n.substr(0,1)!="-" ))) {
                n = n.substr(0, m)+char_milhar+n.substr(m);
              }
              m = m - 3;
            }    
          }

          return n;
        }

        function replaceAll(str, needle, replacement) {
            return str.split(needle).join(replacement);
        }

        function filtro_mask(v) {
          var p = 0;
          var r = "";
          var negativo = false

          for (var x=0; x<v.length; x++) {
            if ((v[x] >= "0") && (v[x] <= "9")) { r = r + v[x];  }
            if ((v[x]==".") ) { r = r + '.';  p = 1; }
            if (v[x]=="-" && !negativo) { r = "-"+r; negativo = true;  }
          }
          // console.log('r',r )
          if (r == "-") r = "0";
          return r;
        }
      }
    },
    watch: {
      value (newValue, oldValue) {
        this.svalor = this.formataNum(newValue,0)
      }
    }
  }
</script>

<style>
.input_class1 {
  text-align: right;
}

</style>