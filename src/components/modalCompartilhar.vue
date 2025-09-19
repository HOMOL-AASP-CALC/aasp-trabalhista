<template>
  <div id="app">
    <Modal v-show="visible" @close="close">
      <template v-slot:header>Compartilhar</template>
      <template v-slot:body >
        <div  class="modal_div_principal">
            <div class="div_input1">
                <p>
                    <b>Digite o e-mail para compartilhar:</b> <br />
                    <inputAutoComplete ref="inputAutoComplete1" v-model="novoEmail"   :items="usuariosCompartilhadosPassado2" /> 
                    <button @click="addEmail" class="btn-add">Adicionar para compartilhar</button>
                </p>      
            </div>
    
            <div class="div_pessoas" v-if="novoLista.length">
              
                <table class="tabela">
                    <tr>
                        <th>Usuário / E-mail</th>
                        <th>Visualizar</th>
                        <th v-if="podeEditar">Editar</th>
                    </tr>
                    <tbody v-for="(item, index) in novoLista">
                        <tr>
                            <td>{{ item.email  }}</td>
                            <td v-if="podeEditar"><input type=radio value='v' :name="`m${index}`"   v-model="novoLista[index].acesso" ></td>
                            <td v-if="podeEditar"><input type=radio value='e' :name="`m${index}`"   v-model="novoLista[index].acesso"></td>
                            <td v-if="!podeEditar">Visualizar</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <input type="checkbox" v-model="notificar" /> Notificar a pessoa por e-mail <br />
                <textarea v-model="texto_notificacao" class="texto_notificacao">
                </textarea>
            </div>

            <div class="div_pessoas" v-if="!novoLista.length">
                <b>Pessoas com acesso:</b>
                <!-- {{  usuariosCompartilhados  }} -->
                <table class="tabela">
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Tipo Acesso</th>
                        <th>Remover</th>
                    </tr>
                    <tbody v-for="(i, index) in usuariosCompartilhados">
                        <tr>
                            <td>{{i.nome}}</td>
                            <td>{{i.email}}</td>
                            <td>
                              <span v-if="usuariosCompartilhados[index].acesso == 'p'">Proprietário</span>
                              <span v-if="usuariosCompartilhados[index].acesso != 'p'">
                                <select v-model="usuariosCompartilhados[index].acesso" @change="mudaPermissao(i.id, usuariosCompartilhados[index].acesso)"> 
                                  <option value="e">Editar</option>
                                  <option value="v">Visualizar</option>
                                </select> 
                               </span>
              
                            </td>  
                            <td class="icone_apagar"><span v-if="i.acesso!='p'"><span @click='removerAcesso(i.id)'><font-awesome-icon icon="xmark" class="icone_apagar"/></span></span></td>                          
                        </tr>
                    </tbody>
                </table>

                <div v-if="usuariosEspera.length >0">
                  <br />
                  <b>Aguardando cadastro no site:</b>
                  <!-- {{  usuariosCompartilhados  }} -->
                  <table class="tabela">
                      <tr>
                          <th>Email</th>
                          <th>Tipo Acesso</th>
                          <th>Remover</th>
                      </tr>
                      <tbody v-for="(i , index) in usuariosEspera">
                          <tr>
                
                              <td>{{i.email}}</td>
                              <!-- <td>{{i.acesso}}</td>  -->
                              <td>
                                <select v-model="usuariosEspera[index].acesso" @change="mudaPermissaoEspera(i.email, usuariosEspera[index].acesso)"> 
                                  <option value="e">Editar</option>
                                  <option value="v">Visualizar</option>
                                </select> 
                              </td>
                              <td @click='removerAcessoListaEspera(i.email)' class="icone_apagar"><font-awesome-icon icon="xmark" class="icone_apagar"/></td>                          
                          </tr>
                      </tbody>
                  </table>
                </div>
            </div>

           <!-- <button  type="button"   class="btn-open-modal"  @click="close" aria-label="Close Modal" v-if="!novoLista.length"> Fechar </button> -->
           <button  type="button"   class="btn-open-modal"  @click="close"   aria-label="Close Modal"> Fechar </button>
           <button  type="button"   class="btn-open-modal btn-open-modal2"  @click="compartilharForm"   aria-label="Close Modal" v-if="novoLista.length">Compartilhar </button>
           <!-- resultado acima:  {{  novoEmail  }} -->
          </div>
      </template>
    </Modal>
  </div>
</template>

<script>

import axios from "axios";
import Modal from "./modal";
import inputAutoComplete from "./inputAutoComplete";


export default {
  name: "App",
  components: {
    Modal, 
    inputAutoComplete
  },
  data() {
    return {
        visible: false,
        novoEmail: '',
        novoLista: [], 
        usuariosCompartilhados: [], 
        usuariosEspera: [],
        usuariosCompartilhadosPassado: [],
        usuariosCompartilhadosPassado2: [],
        notificar: true,
        texto_notificacao: '',
        valorInicial1: ''
    };
  },
  mounted () {
    // this.getListaUsuariosCompartilhadosPassado()
  },
  methods: {
    openModal() {
      this.visible = true;
      this.novoLista = [] 
      this.novoEmail = '' 
      this.getListaUsuarios()
      this.getListaUsuariosCompartilhadosPassado() 
      this.$refs['inputAutoComplete1'].limparInput ()
    },
    getListaUsuarios () {
      var that = this
      var url1 = this.$store.state.hostAPIGeral+'/share/listaUsuarios/'+this.idCalc
      axios.get(url1).then(function(res) {
        that.usuariosCompartilhados = res.data.filter(item => item.id>0) 
        that.usuariosEspera = res.data.filter(item => item.id<0) 
      })
    },
    getListaUsuariosCompartilhadosPassado () {
      var that = this
      this.usuariosCompartilhadosPassado2 = []
      var url1 = this.$store.state.hostAPIGeral+'/share/usuarioCompartilhadosPassado/'+this.idCalc 
      axios.get(url1).then(function(res) {
        that.usuariosCompartilhadosPassado = res.data
        for (var i in res.data) {
          var u = res.data[i].usuario
          that.usuariosCompartilhadosPassado2.push( u ) 
        }
      })
    },
    close() {
      this.visible = false;
    },
    addEmail() {
      this.$refs['inputAutoComplete1'].verificaSearch () 
      // console.log('resultadoCorreto', this.$refs['inputAutoComplete1'].resultadoCorreto () )
      if (this.novoEmail != '' && this.$refs['inputAutoComplete1'].resultadoCorreto () ) {
        this.novoLista.push({ email: this.novoEmail, acesso: 'v'} )
        this.novoEmail = ''
        this.$refs['inputAutoComplete1'].limparInput () 
      }
    },
    compartilharForm () { 
        var url1 = this.$store.state.hostAPIGeral+'/share/addUsuario' 
        var dados = {
            idCalc: this.idCalc ,
            usuarios: this.novoLista 
        }
        var that = this 
        axios.post(url1, dados).then(function(res) {
            console.log(res.data)
            that.usuariosCompartilhados = res.data 
        })
        this.close () 
    },
    removerAcesso( idLogin ) {
        var url1 = this.$store.state.hostAPIGeral+`/share/removerUsuario/${this.idCalc}/${idLogin}`
        console.log(url1) 
        var that = this
        axios.get(url1).then(function() { 
          that.getListaUsuarios()
        })
    },
    removerAcessoListaEspera( email ) {
        var url1 = this.$store.state.hostAPIGeral+`/share/removerAcessoListaEspera`
        var dados = { email, idCalc: this.idCalc }
        console.log(url1, dados) 
        var that = this
        axios.post(url1, dados).then(function() { 
          that.getListaUsuarios()
        })
    },
    mudaPermissao( idLogin, novaPermissao ) {
        var url1 = this.$store.state.hostAPIGeral+`/share/mudaPermissao/${this.idCalc}/${idLogin}/${novaPermissao}`
        console.log(url1) 
        var that = this
        axios.get(url1).then(function() { 
          that.getListaUsuarios()
        })
    },
    mudaPermissaoEspera( email, novaPermissao ) {
        var url1 = this.$store.state.hostAPIGeral+`/share/mudaPermissaoEspera`
        var dados = { email, novaPermissao, idCalc: this.idCalc }
        console.log(url1) 
        var that = this
        axios.post(url1, dados).then(function() { 
          that.getListaUsuarios()
        })
    },
  },
  computed: {
    plan_v () {
      return  this.$store.state.variaveis 
    },
    hostAPIGeral () {
        return this.$store.state.hostAPIGeral
    },
    idCalc () {
        return this.$store.state.idCalc
    },
    podeEditar () {
      return this.$store.state.infoUsuario.permissao=='e'
    }
  }
};
</script>

<style >

.div_input1 {
    width: 500px;
}

.div_pessoas {
    margin-top: 20px;
    width: 500px;
    /* background-color: goldenrod; */
}

.tabela {
    width: 100%;
    /* background-color: yellow; */
    /* margin: 10px; */
}

.btn-open-modal2 {
    width: 100px;
}

.texto_notificacao {
    width: 500px;
    height: 100px;
    border: 1px solid #DDD;
    border-radius: 4px;
}

.input_novoEmail {
    width: 100% !important;
    height: 35px !important;
    /* margin-right: 10px; */
}

.btn-add { 
  color: #000;
  background: #eee;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin: 20px auto;
  /* padding: 6px; */
  width: 200px;
  cursor: pointer;
  margin-right: 10px;
}

.icone_apagar {
  color: #B71C1C;
  cursor: pointer;
}
</style> 