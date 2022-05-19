Projeto desenvolvido para conclusão do bloco 15 do módulo de front end do curso da Trybe.
Foram desenvolvidas habilidades de criação de página em React com gerenciamento de estados através do Redux.
O projeto foi desenvolvido seguindo os seguintes requisitos:
1. Crie uma página inicial de login com os seguintes campos e características:
-A rota deve ser "/";
-Deve haver um campo de email e senha;
-Tem um botão de entrar;
-O botão é desabilitado se email ou senha forem inválidos;
-Após clicado o botão a rota muda para "/carteira".

2. Crie uma página para sua carteira com as seguintes características:
-A rota é "/carteira";
-O componente se chama Wallet e está em src/pages/Wallet.js.

3. Crie um header para a página de carteira contendo as seguintes características:
-Exibe o email de login;
-Exibe despesas totais geradas pela lista de gastos;
-Exibe o câmbio utilizado 'BRL' .

4. Implemente a lógica para armazenar no estado global as siglas das moedas que vêm da API:
-A chave currencies é puxado do estado global pela requisição à API que é feita ao entrar na página /carteira;
-O endpoint utilizado deve ser: https://economia.awesomeapi.com.br/json/all.

5. Desenvolva um formulário para adicionar uma despesa contendo as seguintes características:
-Um campo para adicionar o valor das despesas;
-Um campo para adicionar a descrição da despesa/;
-Um campo para adicionar a descrição da despesa.;
-Um campo para adicionar qual método de pagamento será utilizado;
-Um campo para selecionar uma categoria (tag) para a despesa.

6. Salve todas as informações do formulário no estado global:
-Tem um botão 'Adiconar despesa' que salva as informações no estado global e atualiza a soma no Header.;
-Após adicionar despesa, o campo valor da despeza á limpo.

7. Desenvolva uma tabela com os gastos contendo as seguintes características:
-Possui um cabeçalho com os campos Descrição, Tag, Método de pagamento, Valor, Moeda, Câmbio utilizado, Valor convertido, Moeda de conversão e Editar/Excluir.

8. Implemente a lógica para que a tabela seja alimentada pelo estado da aplicação.

9. Crie um botão para deletar uma despesa da tabela.

10. Crie um botão para editar uma despesa da tabela.