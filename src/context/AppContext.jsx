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
  const [variableList, setVariableList] = useState([
    {
      id: 0,
      expression: "$valor /= 2",
      variable: "valor",
      values: "2",
      type: "number",
    },
  ]);

  useEffect(() => {
    console.log(variableList);
  }, [variableList]);

  const resetStates = () => {
    setExpression("");
  };

  const handleAddItem = () => {
    let newItem = {};

    if (!expression) {
      return toast({
        title: "Nenhuma expressão.",
        description: "Insira alguma expressão para ser processado",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    } else {
      // caso o usuario entre com uma variavel
      if (expression[0] === "$") {
        const variableName = expression.split("/=")[0].replace("$", "").replaceAll(" ", "");

        // se existir uma atribuição
        if (expression.includes("/=")) {
          // split expression
          const expressionArray = expression.split("/=");

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

            console.log(variableList);

            if (variableExists) {
              // if variable exists, update it
              const updatedList = variableList.map((item) => {
                if (item.variable === variableName) {
                  return newItem;
                }
                return item;
              });

              setVariableList(updatedList);
            } else if (newItem) {
              // if variable doesn't exist, create it
              setVariableList([...variableList, newItem]);
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
                if (item.variable === variableName) {
                  return newItem;
                }
                return item;
              });

              setVariableList(updatedList);
            } else {
              // if variable doesn't exist, create it
              setVariableList([...variableList, newItem]);
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
            } else {
              // if variable doesn't exist, create it
              setVariableList([...variableList, newItem]);
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
            if (variableFound) {
              setResult([...result, variableFound.values]);
            }
          }
        }
      } else {
        if (expression[0] === "/") {
          const operator = expression.slice(0, 2);

          switch (operator) {
            case "/i" || "/I":
              // separar os 3 parametros enviados apos o /i entre as chaves
              // retirar o /i
              const replaceExpression = expression.replace("/i", "");
              const replaceExpressionKeys = replaceExpression
                .replace("{", "")
                .replace("}", "");
              // separar os 3 parametros
              const splitExpression = replaceExpressionKeys.split("|");

              const condition = splitExpression[0];

              if (condition.includes("==")) {
                // comparação de igualdade
                const conditionArray = condition.split("==");
                const value1 = conditionArray[0];
                const value2 = conditionArray[1];

                if (value1 === value2) {
                  // se for verdadeiro, executar o que esta dentro das chaves
                  const value = splitExpression[1];
                  const valueSemAsChaves = value
                    .replace("{", "")
                    .replace("}", "");
                  setResult([...result, valueSemAsChaves]);
                } else if (value1 !== value2) {
                  // se for falso, executar o que esta dentro das chaves
                  const value = splitExpression[2];
                  const valueSemAsChaves = value
                    .replace("{", "")
                    .replace("}", "");
                  setResult([...result, valueSemAsChaves]);
                }
              } else if (condition.includes("!==")) {
                // comparação de diferença
                const conditionArray = condition.split("!==");
                const value1 = conditionArray[0];
                const value2 = conditionArray[1];

                if (value1 !== value2) {
                  // se for verdadeiro, executar o que esta dentro das chaves
                  const value = splitExpression[1];
                  const valueSemAsChaves = value
                    .replace("{", "")
                    .replace("}", "");
                  setResult([...result, valueSemAsChaves]);
                } else if (value1 === value2) {
                  // se for falso, executar o que esta dentro das chaves
                  const value = splitExpression[2];
                  const valueSemAsChaves = value
                    .replace("{", "")
                    .replace("}", "");
                  setResult([...result, valueSemAsChaves]);
                }
              } else if (condition.includes(">")) {
                // comparação de maior que
                const conditionArray = condition.split(">");
                const value1 = conditionArray[0];
                const value2 = conditionArray[1];

                if (value1 > value2) {
                  // se for verdadeiro, executar o que esta dentro das chaves
                  const value = splitExpression[1];
                  const valueSemAsChaves = value
                    .replace("{", "")
                    .replace("}", "");
                  setResult([...result, valueSemAsChaves]);
                } else if (value1 <= value2) {
                  // se for falso, executar o que esta dentro das chaves
                  const value = splitExpression[2];
                  const valueSemAsChaves = value
                    .replace("{", "")
                    .replace("}", "");
                  setResult([...result, valueSemAsChaves]);
                }
              } else if (condition.includes("<")) {
                // comparação de menor que
                const conditionArray = condition.split("<");
                const value1 = conditionArray[0];
                const value2 = conditionArray[1];

                if (value1 < value2) {
                  // se for verdadeiro, executar o que esta dentro das chaves
                  const value = splitExpression[1];
                  const valueSemAsChaves = value
                    .replace("{", "")
                    .replace("}", "");
                  setResult([...result, valueSemAsChaves]);
                }
                if (value1 >= value2) {
                  // se for falso, executar o que esta dentro das chaves
                  const value = splitExpression[2];
                  const valueSemAsChaves = value
                    .replace("{", "")
                    .replace("}", "");
                  setResult([...result, valueSemAsChaves]);
                }
              }
              break;

            case "/t" || "/T":
              break;

            case "/r" || "/R":
              // separar os 2 parametros enviados apos o /r
              // retirar o /r
              const expressionReplace = expression.replace("/r", "");
              const expressionReplaceKeys = expressionReplace
                .replace("{", "")
                .replace("}", "");
              // separar os 2 parametros
              const expressionArray = expressionReplaceKeys.split("|");
              const Repetition = expressionArray[0];
              const variableValue = expressionArray[1];
              const resultRepetition = variableValue
                .repeat(Repetition)
                .replaceAll("'", "")
                .replaceAll('"', "");
              setResult([...result, resultRepetition]);
              break;

            case "/l" || "L":
              // retirar o /l
              const replacedExpression = expression.replace("/l", "");
              const replacedExpressionKeys = replacedExpression
                .replace("{", "")
                .replace("}", "");
              // separar todos os parametros
              const expressionSplited = replacedExpressionKeys.split("|");

              const listStyle = expressionSplited[0];
              const itemList = expressionSplited.slice(1);

              // verificar o listStyle

              const orderedList = createList(listStyle, itemList);
              setResult([...result, orderedList]);
              break;

            case "/p" || "/P":
              // retirar o /p
              const expressionReplaceP = expression.replace("/p", "");
              const expressionReplaceKeysP = expressionReplaceP
                .replace("{", "")
                .replace("}", "");
              // separar os 2 parametros
              const expressionArrayP = expressionReplaceKeysP.split("|");

              const variableValueP = expressionArrayP[1].replaceAll("'", "");

              let resultPStyled = createTextStyle(
                expressionArrayP[0],
                variableValueP
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
