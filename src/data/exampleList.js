export   const exampleList = [
  {
    id: 0,
    type: "Atribuição Number 01",
    expression: "$exemplo /= {2+3}",
  },
  {
    id: 1,
    type: "Atribuição Number 02",
    expression: "$exemplo /= 2+3",
  },
  {
    id: 2,
    type: "Atribuição String 01",
    expression: "$exemplo /= {'Exemplo'}",
  },
  {
    id: 3,
    type: "Atribuição String 02",
    expression: "$exemplo /= 'Exemplo'",
  },
  {
    id: 4,
    type: "Atribuição String 03",
    expression: "$exemplo /= '3 + 5'",
  },
  {
    id: 5,
    type: "Definição de um Paragrafo 01",
    expression: "/P{bold|'Exemplo'}",
  },
  {
    id: 6,
    type: "Definição de um Paragrafo 02",
    expression: "/P{italic|'Exemplo'}",
  },
  {
    id: 7,
    type: "Definição de um Paragrafo 03",
    expression: "/P{underline|'Exemplo'}",
  },
  {
    id: 8,
    type: "Definição de um Paragrafo 03",
    expression: "/P{underline|'Exemplo'}",
  },
  {
    id: 9,
    type: "Definição de uma lista 01",
    expression: "/L{1|2|3|'teste'|5|'exemplo'|7|8|9|10}",
  },
  {
    id: 10,
    type: "Definição de uma lista 02",
    expression: "$valor /= /l{1|2|3|4|5|6|7|8|9|10}",
  },
  {
    id: 11,
    type: "Definição de uma tabela 01",
    expression: "/T{..|..}",
  },
  {
    id: 12,
    type: 'Definição de uma texto que será repetido "n" vezes',
    expression: "/R{5|'Exemplo'}",
  },
  {
    id: 13,
    type: "Definição de um ternário",
    expression: "/I{2 < 3|'Exemplo verdadeiro'|'Exemplo falso'}",
  },
];