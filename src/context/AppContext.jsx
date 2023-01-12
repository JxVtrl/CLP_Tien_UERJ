import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { useToast } from "@chakra-ui/react";
import { createTextStyle } from "../helpers/createTextStyle";
import { createNewVariable } from "../helpers/createNewVariable";
import { createList } from "../helpers/createList";

const AppContext = createContext();

export function AppProvider({ children }) {
  const toast = useToast();
  const [helpBox, setHelpBox] = useState(false);
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState([]);
  const [saveVariables, setSaveVariables] = useState([])
  const [variableList, setVariableList] = useState([
    {
      id: 0,
      expression: "$valor /= 2",
      variable: "valor",
      values: "2",
      type: "number",
    },
  ]);
  
  const exampleList = [
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
      type: 'Definição de um ternário',
      expression: "/I{2 < 3|'Exemplo verdadeiro'|'Exemplo falso'}",
    }
  ];

  useEffect(() => {
    console.log(variableList);
  }, [variableList]);

  const resetStates = () => {
    setExpression("");
  };

  const handleToast = ({ title, description, status }) => {
    toast({
      title,
      description,
      status,
      duration: 4000,
      isClosable: true,
    });
  };

  const handleUpdateVariable = (updated) => {
    handleToast(
      updated ? "Variavel atualizada." : "Variavel criada.",
      updated
        ? "A variavel foi atualizada com sucesso!"
        : "A variavel foi criada com sucesso!",
      "success"
    );
  };

  const handleAddItem = () => {
    let newItem = {};

    if (!expression) {
      return handleToast(
        "Nenhuma expressão.",
        "Insira alguma expressão para ser processado",
        "warning"
      );
    } else {
      // caso o usuario entre com uma variavel
      if (expression[0] === "$") {
        const variableName = expression
          .split("/=")[0]
          .replace("$", "")
          .replaceAll(" ", "");

        // se existir uma atribuição
        if (expression.includes("/=")) {
          // split expression
          const expressionArray = expression.split("/=");

          // se expressão já existir, mostrar toast
          const variableNames = variableList.map((item) => item.variable);
          console.log(variableNames);

          // se a expressao tiver algum valor de variableNames, usar o valor da variavel
          // se não, usar o valor digitado pelo usuario

              

          // if(expression.contains())

          // get value and check type
          const value = expressionArray[1];

          // process value
          if (value.includes("{") && value.includes("}")) {
            // se o usuario entrar com { }
            const valueSemAsChaves = value
              .replaceAll("{", "")
              .replaceAll("}", ""); // tirou as chaves

            // identificar se o que tem dentro das chaves é uma string ou um numero
            if (valueSemAsChaves.includes("'" || '"')) {
              // se tiver aspas simples, é string
              const valueSemAspas = valueSemAsChaves.replaceAll("'" || '"', "");

              // create new item
              newItem = createNewVariable(
                variableList.length,
                expression,
                variableName,
                valueSemAspas,
                "string"
              );
            } else if (
              valueSemAsChaves.toLowerCase().includes("true") ||
              valueSemAsChaves.toLowerCase().includes("false")
            ) {
              // create new item
              newItem = createNewVariable(
                variableList.length,
                expression,
                variableName,
                valueSemAsChaves,
                "boolean"
              );
            } else if (valueSemAsChaves.match(/[0-9]/g)) {
              // create new item
              newItem = createNewVariable(
                variableList.length,
                expression,
                variableName,
                eval(valueSemAsChaves),
                "number"
              );
            }

            // check if variable already exists
            const variableExists = variableList.find(
              (item) => item.variable === variableName
            );

            if (variableExists) {
              // if variable exists, update it
              const updatedList = variableList.map((item) => {
                if (item.variable === variableName) {
                  return newItem;
                }
                return item;
              });

              setVariableList(updatedList);
              handleUpdateVariable(true);
            } else if (newItem) {
              // if variable doesn't exist, create it
              setVariableList([...variableList, newItem]);
              handleUpdateVariable(false);
            }
          } else if (value.includes("'")) {
            // se tiver aspas simples, é string
            const valueSemAspas = value.replaceAll("'", "").replaceAll('"', ""); // tirou as aspas
            // create new item
            newItem = createNewVariable(
              variableList.length,
              expression,
              variableName,
              valueSemAspas,
              "string"
            );

            // check if variable already exists
            const variableExists = variableList.find(
              (item) => item.variable === variableName
            );

            if (variableExists) {
              // if variable exists, update it
              const updatedList = variableList.map((item) => {
                if (item.variable === variableName) return newItem;

                return item;
              });

              setVariableList(updatedList);
              handleUpdateVariable(true);
            } else {
              // if variable doesn't exist, create it
              setVariableList([...variableList, newItem]);
              handleUpdateVariable(false);
            }

            // se tiver apenas numero
          } else if (value.match(/[0-9]/g)) {
            newItem = createNewVariable(
              variableList.length,
              expression,
              variableName,
              eval(value.replaceAll(" ", "")),
              "number"
            );

            const variableExists = variableList.find(
              (item) => item.variable === variableName
            );

            if (variableExists) {
              // if variable exists, update it
              const updatedList = variableList.map((item) => {
                if (item.variable === variableName) {
                  return newItem;
                }
                return item;
              });

              setVariableList(updatedList);
              handleUpdateVariable(true);
            } else {
              // if variable doesn't exist, create it
              setVariableList([...variableList, newItem]);
              handleUpdateVariable(false);
            }
          }
        } else {
          // caso o usuario entre só com o nome de uma variavel ja existente, imprimir no terminal
          if (expression.includes(" ")) {
            const expressionReplace = expression.replace(/[^-()\d/*+.]/g, "");
            const finalResult = eval(expressionReplace);
            setResult([...result, finalResult]);
          } else {
            const variable = expression.replace("$", "");

            // Checkar se a variavel existe
            const variableFound = variableList.find((element) => {
              return element.variable === variable;
            });

            // Se já exister a variavel, imprimir no terminal
            if (variableFound) setResult([...result, variableFound.values]);

            handleToast(
              variableFound ? "Variable encontrada" : "Variável não encontrada",
              variableFound
                ? `O valor da variavel ${variable} é ${variableFound.values}`
                : `A variável ${variable} não foi encontrada`,
              variableFound ? "success" : "error"
            );
          }
        }
      } else {
        if (expression[0] === "/") {
          const operator = expression.slice(0, 2);

          switch (operator) {
            case "/i" || "/I":
              // retirar o /i
              const replaceExpression = expression.replace("/i", "");
              const splitExpression = replaceExpression
                .replace("{", "")
                .replace("}", "")
                .split("|");

              const condition = splitExpression[0];

              if (condition.includes("==")) {
                // comparação de igualdade
                const conditionArray = condition.split("==");

                let value;

                if (conditionArray[0] === conditionArray[1])
                  value = splitExpression[1].replace("{", "").replace("}", "");
                else if (conditionArray[0] !== conditionArray[1])
                  value = splitExpression[2].replace("{", "").replace("}", "");

                setResult([...result, value]);
              } else if (condition.includes("!==")) {
                // comparação de diferença
                const conditionArray = condition.split("!==");

                let value;

                if (conditionArray[0] !== conditionArray[1])
                  value = splitExpression[1].replace("{", "").replace("}", "");
                else if (conditionArray[0] === conditionArray[1])
                  value = splitExpression[2].replace("{", "").replace("}", "");

                setResult([...result, value]);
              } else if (condition.includes(">")) {
                // comparação de maior que
                const conditionArray = condition.split(">");

                let value;

                if (conditionArray[0] > conditionArray[1])
                  value = splitExpression[1].replace("{", "").replace("}", "");
                else if (conditionArray[0] <= conditionArray[1])
                  value = splitExpression[2].replace("{", "").replace("}", "");

                setResult([...result, value]);
              } else if (condition.includes("<")) {
                // comparação de menor que
                const conditionArray = condition.split("<");

                let value;

                if (conditionArray[0] < conditionArray[1])
                  value = splitExpression[1].replace("{", "").replace("}", "");
                else if (conditionArray[0] >= conditionArray[1])
                  value = splitExpression[2].replace("{", "").replace("}", "");

                setResult([...result, value]);
              }
              break;

            case "/t" || "/T":
              break;

            case "/r" || "/R":
              // retirar o /r
              const expressionReplace = expression.replace("/r", "");

              // separar os 2 parametros
              const expressionArray = expressionReplace
                .replace("{", "")
                .replace("}", "")
                .split("|");

              // remover aspas e repetir
              const resultRepetition = expressionArray[1]
                .repeat(expressionArray[0])
                .replaceAll("'", "")
                .replaceAll('"', "");

              setResult([...result, resultRepetition]);
              break;

            case "/l" || "L":
              // retirar o /l
              const replacedExpression = expression.replace("/l", "");

              // separar todos os parametros
              const expressionSplited = replacedExpression
                .replace("{", "")
                .replace("}", "")
                .split("|");

              const orderedList = createList(
                expressionSplited[0],
                expressionSplited.slice(1)
              );

              setResult([...result, orderedList]);
              break;

            case "/p" || "/P":
              // retirar o /p
              const expressionReplaceP = expression
                .replace("/p", "")
                .replace("{", "")
                .replace("}", "");

              // separar os 2 parametros
              const expressionArrayP = expressionReplaceP
                .replaceAll("'", "")
                .split("|");

              let resultPStyled = createTextStyle(
                expressionArrayP[0],
                expressionArrayP[1]
              );

              setResult([...result, resultPStyled]);
              break;
          }
        } else {
          const expressionReplace = expression.replace(/[^-()\d/*+.]/g, "");
          console.log(expressionReplace);
          const finalResult = eval(expressionReplace);
          console.log(finalResult);
          setResult([...result, finalResult]);
        }
      }
    }

    resetStates();
  };

  const value = {
    variableList,
    setVariableList,
    handleAddItem,
    setExpression,
    expression,
    result,
    setResult,
    setHelpBox,
    helpBox,
    exampleList
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
