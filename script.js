const slides = [
  {
    titulo: 'Secretaria de Meio Ambiente',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Secretaria_Municipal_de_Meio_Ambiente_Francisco_Beltr%C3%A3o.jpg/960px-Secretaria_Municipal_de_Meio_Ambiente_Francisco_Beltr%C3%A3o.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20190909232138',
    link: 'https://www.google.com/maps/search/Secretaria+Municipal+de+Meio+Ambiente+de+Francisco+Beltr%C3%A3o'
  },
  {
    titulo: 'Prefeitura de Francisco Beltrão',
    imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8EMcnFkTFWMODe9k7xzH_dzOuIWlvaakT-A&s',
    link: 'https://franciscobeltrao.pr.gov.br/'
  },
  {
    titulo: 'Reverso Ambiental',
    imagem: 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=jD439jnzekmegKLc5GYV2w&cb_client=search.gws-prod.gps&w=408&h=240&yaw=6.869654&pitch=0&thumbfov=100',
    link: 'https://www.instagram.com/reversoambiental/'
  }
];

const imagemCarrossel = document.getElementById('imagemCarrossel');
const tituloCarrossel = document.getElementById('slideTitle');
const botaoLocalizacao = document.getElementById('botao-localizacao');
const botaoAnterior = document.querySelector('.botao-anterior');
const botaoProximo = document.querySelector('.botao-proximo');
let indiceAtual = 0;
let intervaloAutomatico;

function mostrarSlide() {
  const slide = slides[indiceAtual];
  imagemCarrossel.src = slide.imagem;
  imagemCarrossel.alt = slide.titulo;
  tituloCarrossel.textContent = slide.titulo;
  botaoLocalizacao.href = slide.link;
}

function slideProximo() {
  indiceAtual = (indiceAtual + 1) % slides.length;
  mostrarSlide();
  reiniciarIntervalo();
}

function slideAnterior() {
  indiceAtual = (indiceAtual - 1 + slides.length) % slides.length;
  mostrarSlide();
  reiniciarIntervalo();
}

function reiniciarIntervalo() {
  clearInterval(intervaloAutomatico);
  intervaloAutomatico = setInterval(slideProximo, 3000);
}

botaoAnterior.addEventListener('click', slideAnterior);
botaoProximo.addEventListener('click', slideProximo);

window.addEventListener('load', function () {
  mostrarSlide();
  reiniciarIntervalo();
});
