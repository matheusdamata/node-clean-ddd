# DDD (Domain-driven Design)

Design dirigido à domínio

## Domínio

- Domain Experts
  - Conversa com quem está na ponta do produto.
- Linguagem ubíqua
  - Refere-se a uma linguagem comum que é usada por todos os membros de uma equipe de projeto para se comunicar sobre o sistema. Isso inclui desenvolvedores, gerentes de projeto, analistas de negócios, e usuários finais. A ideia é que todos usem a mesma terminologia para evitar mal-entendidos. Esta linguagem é geralmente derivada do domínio do problema e incorporada no código do sistema.

  Pasta "domain"
  -> Todo o código mais interno que está totalmente desconectado de qualquer estrutura de persistência como framework, mensageria...

  Entidades são as palavras chaves que pegamos com conversas com o EXPERT
  Casos de uso são como essas entidades conversam entre sí, e as entidades traduzem
  tudo o que vai poder ser mantido na aplicação.

  Exercício: Como iremos representar um problema da vida real em código puramente em JS/TS sem qualquer
  camada externa (sem frameworkds, sem apis...)

  CAMADA DE PERSISTÊNCIA -> BANCO DE DADOS

  VALUE OBJECTS -> SÃO ENTIDADES QUE POSSUEM REGRAS DE NEGÓCIO ASSOCIADO A ESSAS PROPRIÉDADES, E ESSAS
  REGRAS DE NEGÓCIO PODEM SER COMO, FORMATAÇÕES, VALIDAÇÕES E ENTRE OUTROS.