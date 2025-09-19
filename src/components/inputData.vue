<template>
  <div>
            <input
                    type="text"
                    autocomplete="off" 
                    :value="svalor"
                    :errado="errado" 
                    :disabled="disabled" 
                    v-on:input="input_mask($event)"
                    @change='mudouInfo'
                    @focus="$event.target.select()" 
                    maxlength="10" 
                    :class="classe()"
                    >
  </div>
</template>

<script>

  import calcUtil from '../plugins/calcUtil' 

  export default {
    props: {
      value: {
        type: String
      },
      errado: {
        type: String  
      },
      disabled: {
        type: Boolean
      }
    },
    mixins: [ calcUtil], 
    data () {
      return {
        svalor: '' 
      }
    },
    mounted () {
      this.svalor =  this.value
    },
    methods: {
      mudouInfo (event) {
        this.$emit('change', event)
      },
      input_mask  (e) {
        var el = e.target;
        var value = el.value;

        value = filtro_mask(value)
        if (e.inputType != 'deleteContentBackward') {
            if ((value.length == 2)  || (value.length == 5))  {
                value += '/'
            }
            if ((value.length == 3)  || (value.length == 6))  {
                if (value[ value.length-1 ] != '/') {
                    value = value.substring(0, value.length-1) + '/' + value[ value.length-1 ] 
                }
            }
        }

        el.value = value;
        this.svalor =value

        this.$emit('input',  value );
        
        function filtro_mask(v) {
            var r = "";
            if (v == '/') v = '' 
            for (var x=0; x<v.length; x++) {
                if ((v[x] >= "0") && (v[x] <= "9"))  { r = r + v[x];  }
                if  (v[x]=="/" && (x==2 || x==5)  ) {
                    r = r + v[x]; 
                }
            }
            return r;
        }
      },
      classe () {
          if (this.errado=="1" ) {
              return "input_class1 erro"
          } else {
              return "input_class1"
          }
          
      }
    },
    watch: {
      value (newValue, oldValue) {
        this.svalor = newValue
      }
    }
  } 
</script>

<style>
.input_class1 {
  text-align: right;
  width: 100px !important;
}

.erro {
    background-color: #FFEBEE !important;
    border: 1px red solid;
}

</style>