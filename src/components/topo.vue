<template>
<div class="page-wrapper" >
<div class="div_topo"></div>
<div class="navbar navbar-expand-lg fixed-top bg-light" style="border-bottom: solid 3px #CCC ;">
        <div class="container">
            <a class="navbar-brand pe-sm-3" :href="`${this.hostAPPFRONT}/lista/trab`">
                <span class="text-primary flex-shrink-0 me-2">
              <img :src="logotipo" width="120px" height="30px" alt="logotipo-debit">
                </span>
            </a>

            <!--- menu do usu&aacute;rio  INICIO -->

                <div class="dropdown nav d-block order-lg-2 ms-auto">
                    <a class="nav-link d-flex align-items-center p-0" href="#" data-bs-toggle="dropdown"
                       aria-expanded="false">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                                 class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path fill="#00569f" d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fill="#00569f" fill-rule="evenodd"
                                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                        </span>
                        <div class="d-none d-sm-block ps-2">
                            <div class="fs-sm dropdown-toggle">{{ nomeUsuario }}</div>
                        </div>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end my-1">
                        <h6 class="dropdown-header fs-xs fw-medium text-muted text-uppercase pb-1">Conta</h6>
                        <a class="dropdown-item" :href="`${hostAPPFRONT}/menu/perfil-geral`">
                            <i class="ai-settings fs-lg opacity-70 me-2"></i>
                            Geral
                        </a>
                        <a class="dropdown-item" :href="hostAPPFRONT+'/menu/editar-perfil'">
                            <i class="ai-user-check fs-lg opacity-70 me-2"></i>
                            Perfil
                        </a>
                        <a class="dropdown-item" :href="`${hostAPPFRONT}/menu/altera-senha`">
                            <i class="ai-lock-closed fs-lg opacity-70 me-2"></i>
                            Alterar senha
                        </a>
                        <a class="dropdown-item" :href="`${hostAPPFRONT}/menu/perfil-geral#cartao_perfil`">
                            <i class="ai-wallet fs-base opacity-70 me-2 mt-n1"></i>
                            Dados do cart&atilde;o
                        </a>
                        <div class="dropdown-divider"></div>
                        <h6 class="dropdown-header fs-xs fw-medium text-muted text-uppercase pb-1">Dashboard</h6>

                        <a class="dropdown-item" :href="`${hostAPPFRONT}/menu/minha-assinatura`">
                            <i class="ai-cart fs-lg opacity-70 me-2"></i>
                            Minha assinatura
                        </a>
                        
                        <a class="dropdown-item" :href="`${hostAPPFRONT}/menu/usuarios`">
                            <i class="ai-user-group fs-lg opacity-70 me-2"></i>
                            Meus usu&aacute;rios
                        </a>

                        <a class="dropdown-item" :href="`${hostLegacy}/menu/suporte_lista.php`">
                            <i class="ai-messages fs-lg opacity-70 me-2"></i>
                            Suporte
                        </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" :href="`${hostAPPFRONT}/menu/logout`"><i class="ai-logout fs-lg opacity-70 me-2"></i>Deslogar</a>
                    </div>
                </div>
                <button class="navbar-toggler ms-3" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse5">
                    <span class="navbar-toggler-icon"></span></button>
                <!--- menu do usu&aacute;rio  FIM -->


            <nav class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav navbar-nav-scroll me-auto" style="--ar-scroll-height: 520px;">
                    <li class="nav-item dropdown">
                        <a class="nav-link" :href="`${hostAPPFRONT}/lista/trab`" style="font-size:16px;">Meus C&aacute;lculos   </a>

                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false" style="font-size:16px;">Tabelas</a>
                        <div class="dropdown-menu overflow-hidden py-0" style="padding-right: 50px;">
                            <div class="d-lg-flex">
                                <div class="mega-dropdown-column pt-1 pt-lg-3 pb-lg-4">
                                    <ul class="list-unstyled mb-0">
                                        <li>
                                            <a class="dropdown-item" :href="`${this.hostWWW}/tabelas/indicadores-economicos`">Indicadores econ&ocirc;micos</a>
                                        </li>
      
                                            <a class="dropdown-item" :href="`${this.hostAPPFRONT}/lista/indices`">Tabelas personalizadas</a>
                 
                                        <li>
                                            <a class="dropdown-item" :href="`${this.hostWWW}/tabelas/reajuste-aluguel`">Reajuste de aluguel</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" :href="`${this.hostWWW}/tabelas/correcao-monetaria-trabalhista`">Tabelas trabalhistas</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" :href="`${this.hostWWW}/tabelas/tabelas-irrf`">Hist&oacute;rico do IRRF</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" :href="`${this.hostWWW}/tabelas/tabelas-inss`">Hist&oacute;rico de Tabelas do INSS</a>
                                        </li>

                                    </ul>
                                </div>
                                <div class="mega-dropdown-column pb-2 pt-lg-3 pb-lg-4">
                                    <ul class="list-unstyled mb-0">
                                        <li>
                                            <a class="dropdown-item" :href="`${this.hostWWW}/tabelas/salario-familia`">Hist&oacute;rico do Sal&aacute;rio Fam&Iacute;lia</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" :href="`${this.hostWWW}/tabelas/seguro-desemprego`">Hist&oacute;rico do Seguro Desemprego</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" :href="`${this.hostWWW}/tabelas/juros-simples-e-compostos/1`">Juros simples e compostos</a>

                                            <a class="dropdown-item" :href="`${this.hostWWW}/tabelas/moedas`">Hist&oacute;rico de moedas brasileiras</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" :href="`${this.hostWWW}/tabelas/cpmf`">Hist&oacute;rico do IPMF/CPMF</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link" target="_blank" href="https://api.whatsapp.com/message/GSVKJJLREHYDO1?autoload=1&app_absent=0" style="font-size:16px;">WhatsApp
                        </a>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link" href="https://www.debit.com.br/precos" style="color:red; font-size:16px;">Assine Já
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
      </div>
</div>

</template>

<script>

require('@/assets/themeTopo.css')

export default {
  data () {
    return {
        logotipo: require('@/assets/logo.png')
    }
  },
  methods: {
    listaCalculo () {
      window.location = `${this.hostAPPFRONT}/lista/trabalhista`
    }
  },
  computed: {
    hostWWW () {
      return this.$store.state.hostWWW  
    },
    hostLegacy() {
      return this.$store.state.hostLegacy  
    },
    hostAPPFRONT () {
      return this.$store.state.hostAPPFRONT  
    },
    nomeUsuario () {
      return this.$store.state.infoUsuario.nomeUsuario   
    },
  }
}
</script> 

<style scoped=1>
.div_topo {
  min-height: 80px;
  /* background-color: yellow; */
}
</style>
