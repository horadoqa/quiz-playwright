import { test, expect } from '@playwright/test';

test.describe('Quiz de Playwright', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });


  // =====================================================
  // CT01 - CARREGAMENTO
  // =====================================================

  test('CT01 - Carregar o quiz deve exibir a primeira pergunta e 4 opções', async ({ page }) => {

    await expect(page.locator('#contador'))
      .toHaveText('Pergunta 1 de 20');

    await expect(page.locator('#pergunta'))
      .not.toBeEmpty();

    await expect(page.locator('.resposta-btn'))
      .toHaveCount(4);

    await expect(page.locator('#feedback'))
      .toHaveText('');

    await expect(page.locator('#tela-quiz'))
      .toBeVisible();

    await expect(page.locator('#tela-resultado'))
      .not.toBeVisible();

  });


  // =====================================================
  // CT02 - RESPONDER CORRETAMENTE
  // =====================================================

  test('CT02 - Responder corretamente deve exibir mensagem de acerto', async ({ page }) => {

    const respostaCorreta = await page.evaluate(() => {
      if (!window.quizAtual) {
        throw new Error('window.quizAtual não foi encontrado.');
      }

      return window.quizAtual.respostaCorreta;
    });

    const resposta = page
      .locator('.resposta-btn')
      .filter({ hasText: respostaCorreta });

    await expect(resposta)
      .toHaveCount(1);

    await expect(resposta)
      .toBeVisible();

    await expect(resposta)
      .toBeEnabled();

    await resposta.click();


    // Confirma o feedback.

    await expect(page.locator('#feedback'))
      .toHaveText('Correto!');

    await expect(page.locator('#feedback'))
      .toHaveClass(/acerto/);


    // Confirma que as respostas foram desabilitadas.

    await expect(page.locator('.resposta-btn'))
      .toHaveCount(4);

    for (const botao of await page.locator('.resposta-btn').all()) {
      await expect(botao).toBeDisabled();
    }


    // Botão próxima deve aparecer.

    await expect(page.locator('#proxima-btn'))
      .toBeVisible();

    await expect(page.locator('#proxima-btn'))
      .toBeEnabled();

  });


  // =====================================================
  // CT03 - RESPONDER INCORRETAMENTE
  // =====================================================

  test('CT03 - Responder incorretamente deve exibir a resposta certa', async ({ page }) => {

    const respostaCorreta = await page.evaluate(() => {
      if (!window.quizAtual) {
        throw new Error('window.quizAtual não foi encontrado.');
      }

      return window.quizAtual.respostaCorreta;
    });


    const respostas = page.locator('.resposta-btn');

    await expect(respostas)
      .toHaveCount(4);


    // Seleciona uma alternativa diferente da correta.

    let indiceErrado = -1;

    const quantidade = await respostas.count();

    for (let i = 0; i < quantidade; i++) {

      const texto = await respostas.nth(i).textContent();

      if (texto?.trim() !== respostaCorreta) {
        indiceErrado = i;
        break;
      }
    }

    expect(indiceErrado)
      .toBeGreaterThanOrEqual(0);


    await respostas
      .nth(indiceErrado)
      .click();


    // Confirma o feedback de erro.

    await expect(page.locator('#feedback'))
      .toContainText('Errado');

    await expect(page.locator('#feedback'))
      .toContainText(respostaCorreta);

    await expect(page.locator('#feedback'))
      .toHaveClass(/erro/);


    // Confirma que a resposta correta foi marcada.

    const botaoCorreto = page
      .locator('.resposta-btn.correta');

    await expect(botaoCorreto)
      .toHaveCount(1);

    await expect(botaoCorreto)
      .toHaveText(respostaCorreta);


    // Botão próxima deve aparecer.

    await expect(page.locator('#proxima-btn'))
      .toBeVisible();

    await expect(page.locator('#proxima-btn'))
      .toBeEnabled();

  });


  // =====================================================
  // CT04 - FINALIZAR AS 20 PERGUNTAS
  // =====================================================

  test('CT04 - Concluir todas as 20 perguntas deve exibir a tela de resultado', async ({ page }) => {

    for (let i = 0; i < 20; i++) {

      const resposta = page.locator('.resposta-btn').first();

      await expect(resposta)
        .toBeVisible();

      await expect(resposta)
        .toBeEnabled();

      await resposta.click();


      // Aguarda o botão próxima aparecer.

      const proxima = page.locator('#proxima-btn');

      await expect(proxima)
        .toBeVisible();

      await expect(proxima)
        .toBeEnabled();


      await proxima.click();


      // Nas primeiras 19 perguntas,
      // deve existir uma nova pergunta.

      if (i < 19) {

        await expect(page.locator('#contador'))
          .toHaveText(`Pergunta ${i + 2} de 20`);

        await expect(page.locator('.resposta-btn'))
          .toHaveCount(4);

      }

    }


    // Resultado final.

    await expect(page.locator('#tela-resultado'))
      .toBeVisible();

    await expect(page.locator('#tela-quiz'))
      .not.toBeVisible();

    await expect(page.locator('#pontuacao-final'))
      .toHaveText(/\d+ \/ 20/);

  });


  // =====================================================
  // CT05 - ACERTAR TODAS
  // =====================================================

  test('CT05 - Acertar todas as perguntas deve exibir mensagem de nota máxima', async ({ page }) => {

    for (let indice = 0; indice < 20; indice++) {

      // Obtém a resposta correta da pergunta atual.

      const respostaCorreta = await page.evaluate(() => {

        if (!window.quizAtual) {
          throw new Error('window.quizAtual não foi encontrado.');
        }

        return window.quizAtual.respostaCorreta;

      });


      // Localiza a alternativa pelo texto.

      const resposta = page
        .locator('.resposta-btn')
        .filter({ hasText: respostaCorreta });


      await expect(resposta)
        .toHaveCount(1);

      await expect(resposta)
        .toBeVisible();

      await expect(resposta)
        .toBeEnabled();


      await resposta.click();


      // Confirma acerto.

      await expect(page.locator('#feedback'))
        .toHaveText('Correto!');

      await expect(page.locator('#feedback'))
        .toHaveClass(/acerto/);


      // Avança.

      const proxima = page.locator('#proxima-btn');

      await expect(proxima)
        .toBeVisible();

      await expect(proxima)
        .toBeEnabled();

      await proxima.click();


      // Aguarda a próxima pergunta.

      if (indice < 19) {

        await expect(page.locator('#contador'))
          .toHaveText(`Pergunta ${indice + 2} de 20`);

        await expect(page.locator('.resposta-btn'))
          .toHaveCount(4);

      }

    }


    // Resultado final.

    await expect(page.locator('#tela-resultado'))
      .toBeVisible();

    await expect(page.locator('#tela-quiz'))
      .not.toBeVisible();

    await expect(page.locator('#pontuacao-final'))
      .toHaveText('20 / 20');

    await expect(page.locator('#mensagem-final'))
      .toHaveText('Excelente! Você acertou tudo!');

  });


  // =====================================================
  // CT06 - ERRAR TODAS
  // =====================================================

  test('CT06 - Errar todas as perguntas deve exibir mensagem de incentivo', async ({ page }) => {

    for (let indice = 0; indice < 20; indice++) {

      // Obtém o índice da resposta correta.

      const indiceCorreto = await page.evaluate(() => {

        if (!window.quizAtual) {
          throw new Error('window.quizAtual não foi encontrado.');
        }

        return window.quizAtual.correta;

      });


      // Escolhe uma alternativa diferente da correta.

      const indiceErrado =
        indiceCorreto === 0 ? 1 : 0;


      const respostaErrada = page
        .locator('.resposta-btn')
        .nth(indiceErrado);


      await expect(respostaErrada)
        .toBeVisible();

      await expect(respostaErrada)
        .toBeEnabled();


      await respostaErrada.click();


      // Confirma que a resposta foi considerada errada.

      await expect(page.locator('#feedback'))
        .toContainText('Errado');

      await expect(page.locator('#feedback'))
        .toHaveClass(/erro/);


      // Confirma que a resposta correta foi exibida.

      const respostaCorreta = await page.evaluate(() => {

        return window.quizAtual.respostaCorreta;

      });

      await expect(page.locator('#feedback'))
        .toContainText(respostaCorreta);


      // Avança.

      const proxima = page.locator('#proxima-btn');

      await expect(proxima)
        .toBeVisible();

      await expect(proxima)
        .toBeEnabled();

      await proxima.click();


      // Aguarda próxima pergunta.

      if (indice < 19) {

        await expect(page.locator('#contador'))
          .toHaveText(`Pergunta ${indice + 2} de 20`);

      }

    }


    // Resultado final.

    await expect(page.locator('#tela-resultado'))
      .toBeVisible();

    await expect(page.locator('#tela-quiz'))
      .not.toBeVisible();

    await expect(page.locator('#pontuacao-final'))
      .toHaveText('0 / 20');

    await expect(page.locator('#mensagem-final'))
      .toHaveText('Continue estudando e tente novamente!');

  });


  // =====================================================
  // CT07 - REINICIAR
  // =====================================================

  test('CT07 - Botão "Jogar novamente" deve reiniciar o quiz do zero', async ({ page }) => {

    // Responde as 20 perguntas
    for (let i = 0; i < 20; i++) {

      const resposta = page.locator('.resposta-btn').first();

      await expect(resposta)
        .toBeVisible();

      await expect(resposta)
        .toBeEnabled();

      await resposta.click();

      await expect(page.locator('#feedback'))
        .toBeVisible();

      await expect(page.locator('#proxima-btn'))
        .toBeVisible();

      await expect(page.locator('#proxima-btn'))
        .toBeEnabled();

      await page.locator('#proxima-btn')
        .click();

    }

    // Confirma que chegou ao resultado
    await expect(page.locator('#tela-resultado'))
      .toBeVisible();

    await expect(page.locator('#tela-quiz'))
      .not.toBeVisible();

    await expect(page.locator('#pontuacao-final'))
      .toHaveText(/\d+ \/ 20/);

    // Clica em "Jogar novamente"
    await page.locator('#reiniciar-btn')
      .click();

    // =====================================================
    // VALIDAÇÕES DO NOVO JOGO
    // =====================================================

    await expect(page.locator('#tela-quiz'))
      .toBeVisible();

    await expect(page.locator('#tela-resultado'))
      .not.toBeVisible();

    await expect(page.locator('#contador'))
      .toHaveText('Pergunta 1 de 20');

    await expect(page.locator('#pergunta'))
      .not.toBeEmpty();

    await expect(page.locator('.resposta-btn'))
      .toHaveCount(4);

    // O feedback deve estar limpo
    await expect(page.locator('#feedback'))
      .toHaveText('');

    // O botão de próxima pergunta começa escondido
    await expect(page.locator('#proxima-btn'))
      .toBeHidden();

  });


});
