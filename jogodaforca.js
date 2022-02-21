function principal(){ 
  const funcao = require('./funcaojogo')
  
  var erros = 0
  var palavraEscolhida = funcao.escolherPalavra()
  var letrasCertas = funcao.numeroDeLetras(palavraEscolhida)
  var letrasPendentes = palavraEscolhida
  var naoGanhou = true
  var naoEnforcou = true
  


while (naoGanhou && naoEnforcou) {
  funcao.desenharForca(letrasCertas, erros)

  var tentativa =  funcao.receberLetra()

  erros = funcao.errouLetra(erros,letrasPendentes, tentativa)

  letrasCertas, letrasPendentes = funcao.atualizeStatus(letrasCertas, letrasPendentes, tentativa)

  naoGanhou = funcao.jogadorVenceu(letrasCertas, erros)
  naoEnforcou = funcao.jogadorPerdeu(erros)

}  
}

principal()
