III) Estrutura de entrada e saida do processador:

O processador de texto admite como entrada a sintaxe usando os tokens definidos acima e gera como saida um arquivo html. O html por se tratar de uma metalinguagem bem estabelecida faz o papel de organizar o texto pois já tem tags que fazem isto. 

O comandos podem ser definidos em função de uma necessidade específica, mas alguns básicos são obrigatórios pois são muito usados. Os comandos geralmente possuem argumentos e os mais usados usam uma sintaxe mais simples do tipo:\X{..|..}

Os comandos obrigatórios são:

a) \={..} => atribui a uma variável uma expressão ou um dado primitivo.

Exemplos: 

1) $valor \={2+3} (a variavel valor será associada ao valor 5, que é o resultado do cálculo da expressão 2+3)

2) $texto \={um pequeno texto} (a variável texto será associada ao texto que é o único argumento)

b) \P{..|..} ou \p{..|..} => define um parágrafo. Geralmente tem 2 argumentos: o 1o. pode definir o estilo do paragrafo e outro o conteudo do mesmo. Este comando poderia representar tanto um título quanto um parágrafo. O estilo poderia diferenciar qual dos 2 estaria sendo ativado)

c) \L{..|..} ou \l{..|..} => define uma lista de itens. Geralmente tem mais de 2 argumentos: o 1o. pode definir o estilo da lista e os demais os ítens da lista)

d) \T{..|..} ou \t{..|..} => define uma tabela. Geralmente tem mais de 2 argumentos: o 1o. pode definir o estilo da tabela e os demais podem indicar as linhas da tabela)

e) \R{..|..} ou \r{..|..} => repete um texto um certo numero de vezes. O 1o. argumento indica o numero de vezes e o segundo contém o texto. Pode ter outra formatação, dependendo do número de argumentos. Por exemplo, com 4 argumentos, o 1o argumento poderia ser o índice do loop (uma variável), o 2o e o 3o argumentos expressões numéricas indicando o valor inicial e o final e o 4o. argumento seria o texto a ser repetido.

f) \I{..|..} ou \i{..|..} => mostra um texto ou outro dependendo de uma expressao booleana. O 1o. argumento é a expressão booleana que pode ser falsa ou verdadeira. Se for verdadeira, o texto existente no 2o. argumento é ativado. Se for falsa, o texto existente no 3o. argumento é ativado.

Exemplos:

1) \T{usual| x y x+y | 1 2 _ | 3 4 _} (define uma tabela no estilo usual que resultará na tabela descrita a seguir:

1a linha: x y x+y

2a linha: 1 2 3

3a linha: 3 4 7

A 1a linha define variaveis e expressões. As demais linhas definem valores associadas a variaveis e ativa o calculo das expressões, substituindo o caracter genérico _ pelo valor calculado apropriado.)

2) \T{usual| 'valor' 'texto' | valor texto} (define uma tabela no estilo usual que resultará na tabela descrita a seguir:

1a linha: 'valor' 'texto'

2a linha: 5 'um pequeno texto'

A 1a linha mostra cadeias fixas de caracter e a 2a linha variáveis que foram definidas previamente. Seus valores foram utilizados ṕara gerar a tabela final.)