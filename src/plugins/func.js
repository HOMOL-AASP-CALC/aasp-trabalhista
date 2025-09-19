export default {
	// created: function() {
	// 	console.log("criei a funcao")
	// },
	methods: {
	maiusculo: function (s) {
		var s1 = String(s)
		return s1.toUpperCase() 
	},
    getBalanceAvailable: function (moeda) {
      var b = this.$store.state.balances;
      var pos = b.findIndex(b => b.currency == moeda)
      if (pos >= 0) {
        return b[pos].available;
      } else {
        return 0;
      }
    },
    getBalanceDisponivelTrade: function (moeda) {
      var b = this.$store.state.balances;
      var pos = b.findIndex(b => b.currency == moeda)
      if (pos >= 0) {
        return b[pos].available - b[pos].on_order;
      } else {
        return 0;
      }
    },
    formataDataHora: function (d) {
      var dia = new Date(d);
      return dia.toLocaleString();
    },
    formataData: function (d) {
      var dia = new Date(d);
      return dia.toLocaleString().substr(0,10);
    },
    formataHora: function (d) {
      var dia = new Date(d);
      return dia.toLocaleString().substr(11,5);
    },
    limpaNum: function(v) {
      if (v == '') return 0;
      var char_centavos = ",";
      var char_milhar = ".";
      var v = v.split(char_milhar).join('');
      v = v.replace(char_centavos, ".");
      return parseFloat(v);      
    },
	formataNum: function (n, c) {
	  var m = 0;
	  var char_centavos = ",";
	  var char_milhar = ".";

	  n = String(n);

	  if (n=="null") return "";

	  if (n.indexOf("e")>0) { 
	    n = '0';
	  }

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
	},
	formataCPF (doc) {
 		doc = doc.replace(/[^\d]/g, "");
    	return doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
	},
	formataCNPJ (doc) {
 		doc = doc.replace(/[^\d]/g, "");
 		if (doc.length==15)
    		return doc.replace(/(\d{3})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
    	else
    		return doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
	}
  }
}




