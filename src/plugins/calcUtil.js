export default {

    methods: {
        zeroStr (n) {
            var x = parseInt(n)
            if (x < 10) {
                return '0'+String(n)
            } else {
                return String(n)
            }
        },

        zeroStr3 (n) {
            var x = parseInt(n)
            if (x < 10)  return '00'+String(n)
            if (x < 100)  return '0'+String(n)
            return String(n)
        },

        hora2intHora : function(d) {
            if (!d) return 0;
            var x = d.indexOf(":")
            if (!x) {
                x = d.indexOf(",")
            }

            if (!x) {
                return parseInt(d)
            }
            
            return parseInt(d.substring(0,x-1))
        },

        hora2intMinuto : function(d) {
            return parseInt(d.substring(4,6))
        },

        dia2intDia : function(d) {
            return parseInt(d.substring(0,2))
        },

        dia2intMes : function(d) {
            return parseInt(d.substring(3,5))
        },
    
        dia2intAno : function(d) {
            return parseInt(d.substring(6,10))
        },

    	dia2intMesAno : function (d) {
    	  var mes = parseInt(d.substring(3,5))
          var ano = parseInt(d.substring(6,10))
    	  return  (ano * 12) + mes   
    	}, 	

        dia2yyyymmdd : function (dia1) {
            var d = this.dia2intDia(dia1)
            var m = this.dia2intMes(dia1)
            var a = this.dia2intAno(dia1)
            var dia = this.zeroStr(d)
            var mes = this.zeroStr(m)
            var ano = a 
    
            return  `${ano}${mes}${dia}`    
        },
    
        dia2yyyymmddInt : function (dia1) {
            return parseInt( this.dia2yyyymmdd(dia1) )
        },

        diminuiAno (dia) {
            var d = this.dia2intDia(dia)
            var m = this.dia2intMes(dia)
            var a = this.dia2intAno(dia)
            a-- 
            return this.zeroStr(d) + '/' + this.zeroStr(m) + '/' + a
        },
        
        diaHoje () {
            var data = new Date(),
            dia  = data.getDate().toString().padStart(2, '0'),
            mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
            ano  = data.getFullYear();
            return dia+"/"+mes+"/"+ano;     
        },

        mesHoje () {
            var data = new Date(),
            dia  = '01',
            mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
            ano  = data.getFullYear();
            return dia+"/"+mes+"/"+ano;     
        },

        anoBisexto : function (ano) {
            return ((ano%4)==0)
        }, 

        diasMes : function(data) {
            var meses = {'1': 31, '2': 28, '3':31, '4':30, '5':31, '6':30, '7':31,'8':31, '9':30, '10':31, '11': 30, '12': 31};
            var m = meses[this.dia2intMes(data)]
            if ((m==28) && (this.anoBisexto(this.dia2intAno(data)) )) {
                m = 29 
            }
            return m;
        },

        dataOk : function(dia) {
            if (dia.length != 10) return false;

            var d = this.dia2intDia( dia )
            var m = this.dia2intMes( dia )
            var a = this.dia2intAno( dia )
            var dm = this.diasMes( dia )

            if (a < 1964 || a > 2050) return false;
            if (m < 1 || m > 12) return false;
            if (d < 1 || d > dm) return false;

            return true;
        },

        mesAno2dia : function (d) {
            if (d.length < 10) return 0;
            d = parseInt(d)
            var ano = Math.floor( d / 12 )
            var mes = d-(ano*12)
            if (mes==0) {
                mes = 12 
                ano--
            }
            var zero = (mes<10) ? '0' : '' 
            return  `${zero}${mes}/${ano}`   
        },

        somaMes (dia) {
            var d = this.dia2intDia(dia)
            var m = this.dia2intMes(dia)
            var a = this.dia2intAno(dia)
            m++
            if (m>12) {
                m=1
                a++
            }
            return this.zeroStr(d) + '/' + this.zeroStr(m) + '/' + a
        },
        
        yyyymmdd2dia : function (d) {
            d = String(d)
            var dia = d.substring(6,8)
            var mes = d.substring(4,6)
            var ano = d.substring(0,4)  
            return  `${dia}/${mes}/${ano}`    
          }, 
    }
} 

