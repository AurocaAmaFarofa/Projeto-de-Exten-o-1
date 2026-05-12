const slides = [
  {
    titulo: 'Secretaria de Meio Ambiente',
    imagem:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Secretaria_Municipal_de_Meio_Ambiente_Francisco_Beltr%C3%A3o.jpg/960px-Secretaria_Municipal_de_Meio_Ambiente_Francisco_Beltr%C3%A3o.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20190909232138',
    link: 'https://www.google.com/maps/search/Secretaria+Municipal+de+Meio+Ambiente+de+Francisco+Beltr%C3%A3o',
  },
  {
    titulo: 'Prefeitura de Francisco Beltrão',
    imagem:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8EMcnFkTFWMODe9k7xzH_dzOuIWlvaakT-A&s',
    link: 'https://franciscobeltrao.pr.gov.br/',
  },
  {
    titulo: 'Reverso Ambiental',
    imagem:
      'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=jD439jnzekmegKLc5GYV2w&cb_client=search.gws-prod.gps&w=408&h=240&yaw=6.869654&pitch=0&thumbfov=100',
    link: 'https://www.instagram.com/reversoambiental/',
  },
]

const imagemCarrossel = document.getElementById('imagemCarrossel')
const tituloCarrossel = document.getElementById('slideTitle')
const botaoLocalizacao = document.getElementById('botao-localizacao')
const botaoAnterior = document.querySelector('.botao-anterior')
const botaoProximo = document.querySelector('.botao-proximo')
let indiceAtual = 0
let intervaloAutomatico

function mostrarSlide() {
  const slide = slides[indiceAtual]
  imagemCarrossel.src = slide.imagem
  imagemCarrossel.alt = slide.titulo
  tituloCarrossel.textContent = slide.titulo
  botaoLocalizacao.href = slide.link
}

function slideProximo() {
  indiceAtual = (indiceAtual + 1) % slides.length
  mostrarSlide()
  reiniciarIntervalo()
}

function slideAnterior() {
  indiceAtual = (indiceAtual - 1 + slides.length) % slides.length
  mostrarSlide()
  reiniciarIntervalo()
}

function reiniciarIntervalo() {
  clearInterval(intervaloAutomatico)
  intervaloAutomatico = setInterval(slideProximo, 3000)
}

botaoAnterior.addEventListener('click', slideAnterior)
botaoProximo.addEventListener('click', slideProximo)

window.addEventListener('load', function () {
  mostrarSlide()
  reiniciarIntervalo()
})

// ===== QUIZ =====
const perguntas = [
  {
    pergunta: 'O que é lixo eletrônico?',
    opcoes: [
      'Plástico descartado',
      'Dispositivos eletrônicos antigos ou danificados',
      'Papel e papelão',
      'Vidro quebrado',
    ],
    correta: 1,
  },
  {
    pergunta: 'Por que não devemos jogar eletrônicos no lixo comum?',
    opcoes: [
      'Não há razão',
      'Contêm substâncias tóxicas que prejudicam o solo e água',
      'São muito pesados',
      'Ocupam muito espaço',
    ],
    correta: 1,
  },
  {
    pergunta: 'Qual é a forma correta de descartar eletrônicos?',
    opcoes: [
      'Jogar no lixo comum',
      'Queimar',
      'Levar a pontos de coleta ou reciclagem',
      'Enterrar no quintal',
    ],
    correta: 2,
  },
]

let indiceQuiz = 0
let acertos = [false, false, false]

function iniciarQuiz() {
  indiceQuiz = 0
  acertos = [false, false, false]
  document.getElementById('resultado-final').style.display = 'none'
  document.getElementById('conteudo-quiz').style.display = 'block'
  mostrarPergunta()
}

function mostrarPergunta() {
  if (indiceQuiz >= perguntas.length) {
    mostrarResultado()
    return
  }

  const pergunta = perguntas[indiceQuiz]
  const divPergunta = document.getElementById('pergunta-atual')
  const divOpcoes = document.getElementById('opcoes')
  const divFeedback = document.getElementById('feedback')

  divPergunta.innerHTML = `<p class="texto-pergunta">Pergunta ${indiceQuiz + 1} de 3: ${pergunta.pergunta}</p>`
  divOpcoes.innerHTML = ''
  divFeedback.innerHTML = ''

  pergunta.opcoes.forEach((opcao, index) => {
    const botao = document.createElement('button')
    botao.textContent = opcao
    botao.className = 'btn-opcao'
    botao.addEventListener('click', () => verificarResposta(index))
    divOpcoes.appendChild(botao)
  })
}

function verificarResposta(indiceOpcao) {
  const pergunta = perguntas[indiceQuiz]
  const divFeedback = document.getElementById('feedback')
  const botoes = document.querySelectorAll('.btn-opcao')

  botoes.forEach((btn) => (btn.disabled = true))

  if (indiceOpcao === pergunta.correta) {
    acertos[indiceQuiz] = true
    divFeedback.innerHTML =
      '<p class="feedback-correto">✓ Resposta correta!</p>'
  } else {
    divFeedback.innerHTML = '<p class="feedback-errado">✗ Resposta errada!</p>'
  }

  setTimeout(() => {
    indiceQuiz++
    mostrarPergunta()
  }, 1500)
}

function mostrarResultado() {
  document.getElementById('conteudo-quiz').style.display = 'none'
  document.getElementById('resultado-final').style.display = 'block'

  const totalAcertos = acertos.filter((a) => a).length
  let placar =
    '<p class="texto-placar">Suas respostas:</p><ul class="lista-placar">'

  acertos.forEach((acerto, index) => {
    const status = acerto ? '✓ Acertou' : '✗ Errou'
    placar += `<li>Pergunta ${index + 1}: ${status}</li>`
  })

  placar += '</ul>'
  placar += `<p class="texto-total">Você acertou <strong>${totalAcertos} de 3</strong> perguntas!</p>`

  document.getElementById('placar').innerHTML = placar
}

document.addEventListener('DOMContentLoaded', function () {
  iniciarQuiz()
  document
    .getElementById('btn-reiniciar')
    .addEventListener('click', iniciarQuiz)
})
