import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { useToast } from "@chakra-ui/react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const toast = useToast();
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(["Marcelo"]);
  const [variableList, setVariableList] = useState([
    {
      id: 0,
      expression: "$valor /= 2",
      variable: "valor",
      values: "2",
      type: "number",
    },
  ]);

  const resetStates = () => {
    setExpression("");
  };

  const handleAddItem = () => {
    if (!expression) {
      return toast({
        title: "Nenhum valor.",
        description: "Insira algum valor para ser adicionado na tabela.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    } else {
      // check if first character is /
      // if (expression[0] === "/"){
      //   switch (expression) {
      //     case "/i" || "/I":
      //       ...
      //       break;

      //     case "/t" || "/T":
      //       ...
      //       break;

      //     case "/r" || "/R":
      // ...
      // break;

      //      case "/l" || "L":
      //          ...
      //         break;
      //   }
      // }

      // caso o usuario entre com uma variavel
      if (expression.includes("$")) {
        const variableName = expression.split(" ")[0].replace("$", "");

        // se existir uma atribuição
        if (expression.includes("/=")) {
          // split expression
          const expressionArray = expression.split("/=");

          // get value and check type
          const value = expressionArray[1];

          // process value
          if (value.includes("{") && value.includes("}")) {
            // se o usuario entrar com { }
            const valueSemAsChaves = value.replace("{", "").replace("}", ""); // tirou as chaves

            let newItem = {};

            // identificar se o que tem dentro das chaves é uma string ou um numero
            if (valueSemAsChaves.includes("'")) {
              // se tiver aspas simples, é string
              const valueSemAspas = valueSemAsChaves.replace("'", "");
              // tirou as aspas
              const valueType = "string";
              // create new item
              newItem = {
                id: variableList.length,
                expression: expression,
                variable: variableName,
                values: valueSemAspas,
                type: valueType,
              };
            } else if (
              valueSemAsChaves.includes("true") ||
              valueSemAsChaves.includes("false")
            ) {
              // se tiver true ou false, é boolean
              const valueType = "boolean";
              // create new item
              newItem = {
                id: variableList.length,
                expression: expression,
                variable: variableName,
                values: valueSemAsChaves,
                type: valueType,
              };
            } else if (valueSemAsChaves.match(/[0-9]/g)) {
              // se tiver numeros, é number
              const valueType = "number";
              // create new item
              newItem = {
                id: variableList.length,
                expression: expression,
                variable: variableName,
                values: valueSemAsChaves,
                type: valueType,
              };
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
            } else if (newItem) {
              // if variable doesn't exist, create it
              setVariableList([...variableList, newItem]);
            }
          } else if (value.includes("'")) {
            // se tiver aspas simples, é string
            const valueSemAspas = value.replace("'", "").replace("'", ""); // tirou as aspas
            const valueType = "string";
            // create new item
            const newItem = {
              id: variableList.length,
              expression: expression,
              variable: variableName,
              values: valueSemAspas,
              type: valueType,
            };

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
          }
        } else {
          // caso o usuario entre só com o nome de uma variavel ja existente, imprimir no terminal
          if (expression.includes(" ")) {
            const expressionReplace = expression.replace(/[^-()\d/*+.]/g, "");
            const finalResult = eval(expressionReplace);
            setResult([...result, finalResult]);
          } else {
            const variable = expression.replace("$", "");

            // Checkar se a variavel exister
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
            console.log('oi')

            const operator = expression.slice(0,2);
            console.log(operator)


            switch (operator) {
              case "/i" || "/I":
                
                break;

              case "/t" || "/T":
                break;

              case "/r" || "/R":
                // separar os 2 parametros enviados apos o /r
                // retirar o /r
                console.log('oi')
                const expressionReplace = expression.replace("/r", "");
                const expressionReplaceKeys = expressionReplace.replace("{", "").replace("}", "");
                // separar os 2 parametros
                const expressionArray = expressionReplaceKeys.split(":");
                const Repetition = expressionArray[0];
                const variableValue = expressionArray[1];
                const resultRepetition =  variableValue.repeat(Repetition).replaceAll("'", '').replaceAll('"', '');
                setResult([...result, resultRepetition]);
                break;

              case "/l" || "L":
                break;

                case "/p" || "/P":

                  // separar os 2 parametros enviados apos o /p
                  // retirar o /p
                  const expressionReplaceP = expression.replace("/p", "");
                  const expressionReplaceKeysP = expressionReplaceP.replace("{", "").replace("}", "");
                  // separar os 2 parametros
                  const expressionArrayP = expressionReplaceKeysP.split(":");
                  
                  let resultPStyled = '';
                  const variableValueP = expressionArrayP[1];

                  if(expressionArrayP[0] === "bold") {
                     resultPStyled = <span style={{ fontWeight: "bold" }}>{variableValueP}</span>;;
                  } else if(expressionArrayP[0] === "italic") {
                     resultPStyled = <span style={{ fontStyle: "italic" }}>{variableValueP}</span>;;
                  } else if(expressionArrayP[0] === "underline") {
                     resultPStyled = <span style={{ textDecoration: "underline" }}>{variableValueP}</span>;;
                  }

                  // o primeiro parametro é o estilo
                  // o segundo parametro é o valor da variavel


                  // const resultPStyled =  variableValueP.repeat(styleP).replaceAll("'", '').replaceAll('"', '');
                  setResult([...result, resultPStyled]);
                  break;
            }
          } else {
            const expressionReplace = expression.replace(/[^-()\d/*+.]/g, "");
            const finalResult = eval(expressionReplace);
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
