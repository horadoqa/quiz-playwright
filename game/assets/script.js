const perguntas = [
  {
    pergunta: "O que é o Playwright?",
    opcoes: [
      "Uma linguagem de programação",
      "Um framework para testes e automação de aplicações web",
      "Um banco de dados",
      "Um sistema operacional"
    ],
    correta: 1
  },

  {
    pergunta: "Qual método é utilizado para localizar um elemento pelo seletor CSS ou XPath?",
    opcoes: [
      "page.locator()",
      "page.find()",
      "page.select()",
      "page.element()"
    ],
    correta: 0
  },

  {
    pergunta: "Qual método é utilizado para clicar em um elemento?",
    opcoes: [
      "locator.click()",
      "locator.press()",
      "locator.tap()",
      "locator.button()"
    ],
    correta: 0
  },

  {
    pergunta: "Qual método é utilizado para preencher um campo de texto?",
    opcoes: [
      "locator.type()",
      "locator.write()",
      "locator.fill()",
      "locator.input()"
    ],
    correta: 2
  },

  {
    pergunta: "Qual método pode ser utilizado para limpar e preencher um campo de texto?",
    opcoes: [
      "locator.clear()",
      "locator.reset()",
      "locator.remove()",
      "locator.fill()"
    ],
    correta: 3
  },

  {
    pergunta: "Qual método é utilizado para selecionar uma opção de um elemento <select>?",
    opcoes: [
      "locator.choose()",
      "locator.selectOption()",
      "locator.option()",
      "locator.pick()"
    ],
    correta: 1
  },

  {
    pergunta: "Qual assertion verifica se um elemento está visível?",
    opcoes: [
      "expect(locator).toBeVisible()",
      "expect(locator).toBeDisplayed()",
      "expect(locator).toBeVisibleElement()",
      "expect(locator).toHaveVisibility()"
    ],
    correta: 0
  },

  {
    pergunta: "Qual assertion verifica se um elemento está anexado ao DOM?",
    opcoes: [
      "expect(locator).toExist()",
      "expect(locator).toBeAttached()",
      "expect(locator).toBePresent()",
      "expect(locator).toExistInDOM()"
    ],
    correta: 1
  },

  {
    pergunta: "Qual assertion verifica o texto de um elemento?",
    opcoes: [
      "expect(locator).toHaveText()",
      "expect(locator).toBeText()",
      "expect(locator).toText()",
      "expect(locator).toContainTextValue()"
    ],
    correta: 0
  },

  {
    pergunta: "Qual recurso pode ser utilizado para fazer requisições HTTP no Playwright Test?",
    opcoes: [
      "page.api()",
      "page.request",
      "page.http()",
      "page.fetch()"
    ],
    correta: 2
  },

  {
    pergunta: "Qual método é utilizado para interceptar e modificar requisições de rede?",
    opcoes: [
      "page.intercept()",
      "page.network()",
      "page.route()",
      "page.requestIntercept()"
    ],
    correta: 2
  },

  {
    pergunta: "Para que servem as fixtures no Playwright Test?",
    opcoes: [
      "Para criar screenshots",
      "Para fornecer e configurar recursos necessários aos testes",
      "Para abrir novas abas",
      "Para executar comandos do terminal"
    ],
    correta: 1
  },

  {
    pergunta: "Qual método é utilizado para localizar um elemento pelo seu papel ARIA?",
    opcoes: [
      "page.getByRole()",
      "page.findByRole()",
      "page.role()",
      "page.aria()"
    ],
    correta: 0
  },

  {
    pergunta: "Qual método é utilizado para localizar um elemento pelo texto associado ao seu label?",
    opcoes: [
      "page.getByLabel()",
      "page.getByTextLabel()",
      "page.findLabel()",
      "page.label()"
    ],
    correta: 0
  },

  {
    pergunta: "Qual hook é executado antes de cada teste?",
    opcoes: [
      "test.before()",
      "test.beforeEach()",
      "test.beforeTest()",
      "test.setup()"
    ],
    correta: 1
  },

  {
    pergunta: "Qual hook é executado depois de cada teste?",
    opcoes: [
      "test.afterEach()",
      "test.afterTest()",
      "test.after()",
      "test.cleanupEach()"
    ],
    correta: 0
  },

  {
    pergunta: "Qual método é utilizado para tirar um screenshot da página?",
    opcoes: [
      "page.capture()",
      "page.image()",
      "page.screenshot()",
      "page.screen()"
    ],
    correta: 2
  },

  {
    pergunta: "Qual arquivo é utilizado para configurar o Playwright Test?",
    opcoes: [
      "playwright.settings.js",
      "playwright.config.js",
      "config.playwright.js",
      "playwright.setup.js"
    ],
    correta: 1
  },

  {
    pergunta: "Qual método é utilizado para navegar para uma URL?",
    opcoes: [
      "page.open()",
      "page.url()",
      "page.goto()",
      "page.navigate()"
    ],
    correta: 2
  },

  {
    pergunta: "Qual método permite executar JavaScript diretamente no contexto da página?",
    opcoes: [
      "page.execute()",
      "page.javascript()",
      "page.evaluate()",
      "page.runScript()"
    ],
    correta: 2
  }
];



/* =====================================================
   EMBARALHAR ARRAY
   ===================================================== */

function embaralhar(array) {
  const copia = [...array];

  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}


/* =====================================================
   CRIAR NOVA PARTIDA
   ===================================================== */

function criarPerguntasDaPartida() {

  return embaralhar(perguntas).map(pergunta => {

    // Guarda a resposta correta original
    const respostaCorreta = pergunta.opcoes[pergunta.correta];

    // Embaralha as alternativas
    const opcoesEmbaralhadas = embaralhar(pergunta.opcoes);

    // Descobre a nova posição da resposta correta
    const novaPosicaoCorreta =
      opcoesEmbaralhadas.indexOf(respostaCorreta);

    return {
      pergunta: pergunta.pergunta,
      opcoes: opcoesEmbaralhadas,
      correta: novaPosicaoCorreta
    };

  });

}


/* =====================================================
   VARIÁVEIS DO QUIZ
   ===================================================== */

let indiceAtual = 0;
let pontuacao = 0;

let perguntasDaPartida = criarPerguntasDaPartida();


/* =====================================================
   ELEMENTOS HTML
   ===================================================== */

const elPergunta = document.getElementById('pergunta');
const elOpcoes = document.getElementById('opcoes');
const elContador = document.getElementById('contador');
const elFeedback = document.getElementById('feedback');
const elProximaBtn = document.getElementById('proxima-btn');

const elTelaQuiz = document.getElementById('tela-quiz');
const elTelaResultado = document.getElementById('tela-resultado');

const elPontuacaoFinal = document.getElementById('pontuacao-final');
const elMensagemFinal = document.getElementById('mensagem-final');

const elReiniciarBtn = document.getElementById('reiniciar-btn');


/* =====================================================
   CARREGAR PERGUNTA
   ===================================================== */

function carregarPergunta() {

  const atual = perguntasDaPartida[indiceAtual];

  // Disponibiliza informações da pergunta atual para os testes
  window.quizAtual = {
    pergunta: atual.pergunta,
    correta: atual.correta,
    respostaCorreta: atual.opcoes[atual.correta]
  };

  elContador.textContent =
    `Pergunta ${indiceAtual + 1} de ${perguntasDaPartida.length}`;

  elPergunta.textContent = atual.pergunta;

  elFeedback.textContent = '';
  elFeedback.className = '';

  elProximaBtn.style.display = 'none';

  elOpcoes.innerHTML = '';


  /* =====================================================
     CRIAR BOTÕES DAS ALTERNATIVAS
     ===================================================== */

  atual.opcoes.forEach((opcao, i) => {

    const btn = document.createElement('button');

    btn.className = 'resposta-btn';

    btn.textContent = opcao;

    btn.setAttribute('data-index', i);

    btn.addEventListener('click', () => responder(i));

    elOpcoes.appendChild(btn);

  });

}


/* =====================================================
   RESPONDER PERGUNTA
   ===================================================== */

function responder(indiceEscolhido) {

  const atual = perguntasDaPartida[indiceAtual];

  console.log("================================");
  console.log("Pergunta:", atual.pergunta);
  console.log("Alternativas:", atual.opcoes);
  console.log("Índice escolhido:", indiceEscolhido);
  console.log("Índice correto:", atual.correta);
  console.log("Resposta correta:", atual.opcoes[atual.correta]);

  const botoes =
    document.querySelectorAll('.resposta-btn');


  /* Desabilita todas as alternativas */

  botoes.forEach(btn => {
    btn.disabled = true;
  });


  /* =====================================================
     RESPOSTA CORRETA
     ===================================================== */

  if (indiceEscolhido === atual.correta) {

    pontuacao++;

    elFeedback.textContent = 'Correto!';

    elFeedback.className = 'acerto';

    botoes[indiceEscolhido]
      .classList.add('correta');

  }


  /* =====================================================
     RESPOSTA ERRADA
     ===================================================== */

  else {

    elFeedback.textContent =
      `Errado! A resposta certa era: ${atual.opcoes[atual.correta]}`;

    elFeedback.className = 'erro';

    botoes[indiceEscolhido]
      .classList.add('errada');

    botoes[atual.correta]
      .classList.add('correta');

  }


  /* Mostra botão próxima pergunta */

  elProximaBtn.style.display = 'block';

}


/* =====================================================
   PRÓXIMA PERGUNTA
   ===================================================== */

elProximaBtn.addEventListener('click', () => {

  indiceAtual++;

  if (indiceAtual < perguntasDaPartida.length) {

    carregarPergunta();

  } else {

    mostrarResultado();

  }

});


/* =====================================================
   MOSTRAR RESULTADO
   ===================================================== */

function mostrarResultado() {

  elTelaQuiz.style.display = 'none';

  elTelaResultado.style.display = 'block';


  elPontuacaoFinal.textContent =
    `${pontuacao} / ${perguntasDaPartida.length}`;


  let mensagem;


  if (pontuacao === perguntasDaPartida.length) {

    mensagem = 'Excelente! Você acertou tudo!';

  }

  else if (pontuacao >= perguntasDaPartida.length / 2) {

    mensagem = 'Muito bom! Continue assim.';

  }

  else {

    mensagem = 'Continue estudando e tente novamente!';

  }


  elMensagemFinal.textContent = mensagem;

  elReiniciarBtn.style.display = 'block';

}


/* =====================================================
   REINICIAR QUIZ
   ===================================================== */

elReiniciarBtn.addEventListener('click', () => {

  indiceAtual = 0;

  pontuacao = 0;


  /* =====================================================
     GERA UMA NOVA ORDEM DE PERGUNTAS E ALTERNATIVAS
     ===================================================== */

  perguntasDaPartida = criarPerguntasDaPartida();


  elTelaResultado.style.display = 'none';

  elTelaQuiz.style.display = 'block';


  carregarPergunta();

});


/* =====================================================
   INICIAR QUIZ
   ===================================================== */

carregarPergunta();