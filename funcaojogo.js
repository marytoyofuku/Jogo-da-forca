 function cabecalho() {
  console.clear()
  console.log(" ")
  console.log("   ------------------------")
  console.log("   *****Jogo da Forca******")
  console.log("   ------------------------")
  console.log(" ")
}


function escolherPalavra() {
  const leiaTxt = require('fs')
  const palavras = leiaTxt.readFileSync('palavras.txt', 'utf8').split('\n')
  const elementosDoArray = palavras.length
  const numeroAleatorio = Math.floor(Math.random() * elementosDoArray)
  const palavraEscolhida = palavras[numeroAleatorio]
  return palavraEscolhida
}


function criarPalavraChute(letrasCertas) {
  var caracteres = "";
  caracteres = letrasCertas.toString()
  caracteres = caracteres.replace(/,/gi,"  ")
  return caracteres
}


function desenharForca (letrasCertas, erros) {
  cabecalho()
  console.log("    _______       ")
  console.log("    |/      |     ")
  console.log("    |      "+ (erros >=1 ? "(_)" : "")) 
  console.log("    |      "+ (erros >=2 ? "/|\\" : "")) 
  console.log("    |     "+ (erros >=3 ? "° | °" : "")) 
  console.log("    |      "+ (erros >=4 ? "/ \\" : ""))
  console.log("    |     "+ (erros >=5 ? "/   \\" : ""))
  console.log("    |    "+ (erros >=5 ? "º     º" : ""))
  console.log("    |            ")
  console.log("   _|___         ")
  console.log("              ")
  console.log("              ")
  console.log("   "+ criarPalavraChute(letrasCertas))
 console.log("") 
 console.log("")
 console.log("") 
}


function numeroDeLetras (palavraSecreta) {
  const numeroLetras = palavraSecreta.length
  var lista = []
  var i = 0
  while ( i < numeroLetras) {
    lista[i] = "__"
    i++
  }
  return lista
}


function naoTemTraco(letrasCertas){
  return letrasCertas.find(letra => letra == "__") == undefined
}


function jogadorVenceu(letrasCertas, erros){
  var naoGanhou = true
  if (naoTemTraco(letrasCertas) && erros < 6){
    naoGanhou = false
    cabecalho()
    imagemVitoria()
    incluirPalavra()
  }
  return naoGanhou
}


function jogadorPerdeu(erros) { 
  var naoEnforcou = true
    if (erros > 5 ){
      naoEnforcou = false
      cabecalho()
      imagemDerrota()
      incluirPalavra()
  }
    return naoEnforcou
}


function errouLetra(erros,letrasPendentes, resposta){
  var contagemErros = erros
  if (letrasPendentes.search(resposta) ==-1 ){
    contagemErros = erros + 1  
  }
  return contagemErros
}


function atualizeStatus(letrasCertas, letrasPendentes, resposta){
  if (letrasPendentes.search(resposta) !=-1 ){
    letrasCertas, letrasPendentes = trateLetras(resposta, letrasCertas, letrasPendentes)
  }  
  return letrasCertas, letrasPendentes
}


function trateLetras(resposta, letrasCertas, letrasPendentes){
  for (var i=0; i <letrasCertas.length; i++){
    if (letrasPendentes.slice(i, i+1) == resposta){
      letrasCertas[i] = resposta
      letrasPendentes = letrasPendentes.replace(resposta, "_")
    }
  }
  return letrasCertas, letrasPendentes
}


function inputsTerminal(tipo){
  const leiaLinha = require('readline-sync')
  var resposta =""
  switch(tipo) {
    case 'letra':
      resposta = leiaLinha.question("Digite uma letra:  ")
      break
    case 'pausa': 
      resposta = leiaLinha.question("Enter para continuar:  ")
      break
    case 'novapalavra':
      resposta = leiaLinha.question("Você deseja incluir palavra? (S/N): ")
      break
    case 'escreverpalavra':
        resposta = leiaLinha.question("Digite a palavra: ")
        break
}
  if(resposta != "" ){return resposta}
}


function receberLetra(){
  var resposta = inputsTerminal("letra")
  if (resposta != undefined){return resposta.toUpperCase()}
}


function incluirPalavra(){
  var resposta = inputsTerminal("novapalavra")
  if (resposta != undefined){
    if(resposta == "s" || resposta == "S"){
      const leiaTxt = require('fs')
      const palavrasDoArquivo = leiaTxt.readFileSync('palavras.txt', 'utf8')
      const palavra = inputsTerminal("escreverpalavra")      
      const palavrasAtualizadas = palavrasDoArquivo + '\n' + palavra.toUpperCase()
      leiaTxt.writeFileSync('palavras.txt', palavrasAtualizadas, function(erro) {
        if(erro) {
            throw erro;
        }
    }) 
      console.log("Palavra incluida com sucesso");
      inputsTerminal('pausa')
    }
  }
}

function imagemVitoria () {
  console.log("      Você ganhou!    ")
  console.log("░░┌──┐░░░░░░░░░░┌──┐░░")
  console.log("░╔╡▐▐╞╝░░┌──┐░░╔╡▐▐╞╝░")
  console.log("░░└╥╥┘░░╚╡▌▌╞╗░░└╥╥┘░░")
  console.log("░░░╚╚░░░░└╥╥┘░░░░╚╚░░░")
  console.log("░░░░░░░░░░╝╝░░░░░░░░░░")
  console.log("")
}


function imagemDerrota (){
  console.log("        Você perdeu!       ")
  console.log("███████████████████████████")
  console.log("███████▀▀▀░░░░░░░▀▀▀███████")
  console.log("████▀░░░░░░░░░░░░░░░░░▀████")
  console.log("███│░░░░░░░░░░░░░░░░░░░│███")
  console.log("██▌│░░░░░░░░░░░░░░░░░░░│▐██")
  console.log("██░└┐░░░░░░░░░░░░░░░░░┌┘░██")
  console.log("██░░└┐░░░░░░░░░░░░░░░┌┘░░██")
  console.log("██░░┌┘▄▄▄▄▄░░░░░▄▄▄▄▄└┐░░██")
  console.log("██▌░│██████▌░░░▐██████│░▐██")
  console.log("███░│▐███▀▀░░▄░░▀▀███▌│░███")
  console.log("██▀─┘░░░░░░░▐█▌░░░░░░░└─▀██")
  console.log("██▄░░░▄▄▄▓░░▀█▀░░▓▄▄▄░░░▄██")
  console.log("████▄─┘██▌░░░░░░░▐██└─▄████")
  console.log("█████░░▐█─┬┬┬┬┬┬┬─█▌░░█████")
  console.log("████▌░░░▀┬┼┼┼┼┼┼┼┬▀░░░▐████")
  console.log("█████▄░░░└┴┴┴┴┴┴┴┘░░░▄█████")
  console.log("███████▄░░░░░░░░░░░▄███████")
  console.log("██████████▄▄▄▄▄▄▄██████████")
  console.log("███████████████████████████")
  console.log("")
}


module.exports = {
  desenharForca, imagemDerrota, imagemVitoria, receberLetra, jogadorVenceu, jogadorPerdeu, escolherPalavra, numeroDeLetras, atualizeStatus,errouLetra
}

