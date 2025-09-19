<template>
  <div class="autocomplete">
    <input
      type="text"
      @input="onChange"
      xxblur="verificaSearch()"
      v-model="search"
      autocomplete="off"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
      :class="classe_input()"
    />
    <ul id="autocomplete-results" v-show="isOpen && (results.length>0)" class="autocomplete-results" >
      <!-- <li class="loading"  v-if="isLoading"  >Carregando </li> -->
      <li
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
        :class="{ 'is-active': i === arrowCounter }"
      >
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'SearchAutocomplete',
    props: {
      items: {
        type: Array,
        required: false,
        default: () => [],
      },
      isAsync: {
        type: Boolean,
        required: false,
        default: false,
      },
      valorInicial: {
        type: String,
        required: false,
        default: ''
      }
    },
    data() {
      return {
        isOpen: false,
        results: [],
        search: this.valorInicial,
        isLoading: false,
        arrowCounter: -1,
        erro: false
      };
    },
    watch: {
      items: function (value, oldValue) {
        if (value.length !== oldValue.length) {
          this.results = value;
          this.isLoading = false;
        }
      },
    },
    mounted() {
      document.addEventListener('click', this.handleClickOutside)
    },
    destroyed() {
      document.removeEventListener('click', this.handleClickOutside)
    },
    methods: {
      setResult(result) {
        this.search = result;
        this.isOpen = false;
        this.$emit('input', this.search);
        this.verificaSearch()
      },
      filterResults() {
        this.results = this.items.filter((item) => {
          return item.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
        });
        // console.log('this.results.length', this.results.length)
      },
      onChange() {
        this.$emit('input', this.search);

        if (this.isAsync) {
          this.isLoading = true;
        } else {
          this.filterResults();
          this.isOpen = true;
        }
      },
      handleClickOutside(event) {
        if (!this.$el.contains(event.target)) {
          this.isOpen = false;
          this.arrowCounter = -1;
        }
      },
      onArrowDown() {
        if (this.arrowCounter < this.results.length) {
          this.arrowCounter = this.arrowCounter + 1;
        }
      },
      onArrowUp() {
        if (this.arrowCounter > 0) {
          this.arrowCounter = this.arrowCounter - 1;
        }
      },
      onEnter() {
        this.search = this.results[this.arrowCounter];
        this.isOpen = false;
        this.arrowCounter = -1;
      },
      limparInput () {
        this.search = ''
      },
      resultadoCorreto () {
        return !this.erro 
      },
      verificaSearch () {
        // console.log('verificaSearch', this.search)
        this.erro = !(this.validateEmail(this.search)) 
      },
      classe_input () {
        if (this.erro) {
          // console.log('classe_input com erro')
          return "autocomplete-input erro"
        }
        // console.log('classe_input normal')
        return "autocomplete-input"
      },
      validateEmail (email)  {
        var r = email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ) 
        // console.log('r',r)
        return ((r != null) || (email == ''));
      }
    }
  };
</script>

<style>
  .autocomplete {
    position: relative;
  }

  .autocomplete-results {
    max-height: 206px;
    height: min-content;
    overflow-y: auto;
    border: 1px solid grey;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    top: 100%;
    background: #fff;
    z-index: 99;
    padding: 0px;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: #BBDEFB;
    color: #000;
  }

  .autocomplete-input {
    width: 100% !important;
  }

  .erro {
    border: 1px solid red;
  }


</style>