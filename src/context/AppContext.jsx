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
  const [expression, setExpression] = useState("");
  const [type, setType] = useState(undefined);
  const [result, setResult] = useState(undefined);
  const toast = useToast();
  const [variableList, setVariableList] = useState([
    {
      id: 0,
      expression: "$valor /= 2",
      variable: "valor",
      values: "2",
    },
  ]);

  const resetVariables = () => {
    setExpression("");
  };

  const checkError = (exp) => {};

  const checkValueType = (exp) => {
    // O retorno desta função é o tipo do valor da variavel
    // Se for string, tem que ter aspas simples, boolean, true ou false, number, só numeros

    // Aspas simples englobando o valor
    if (exp.includes("'")) {
      alert("string");
      return "string";
    } else if (exp.includes("true") || exp.includes("false")) {
      // Se tiver aspas simples é string
      if (exp.includes("'")) {
        alert("string");
        return "string";
      }

      alert("boolean");
      return "boolean";
      // Chaves englobando o valor
    } else if (exp.includes("{") && exp.includes("}")) {
      // Se tiver aspas simples é string
      if (exp.includes("'")) {
        alert("string");
        return "string";
      }

      if (exp.match(/[a-z]/i)) {
        alert("error");
        return "error";
      } else alert("number");
      return "number";
    } else {
      alert("error");
      return null;
    }
  };

  const checkExpOperator = (exp) => {
    const operators = ["/=", "/p", "/l", "/t", "/r", "/i"];
    console.log(exp);
    switch (exp) {
      // /= é o operador de atribuição
      case exp.includes("/="):
        console.log("entrou");
        // O que tem antes é o nome da variavel
        // O que vier depois é o valor, temos que ver o tipo (string, boolean, number)
        // Se for string, tem que ter aspas simples, boolean, true ou false, number, só numeros

        // Separar a expressão em duas partes
        let expArray = exp.split(operators[0]);

        // Verificar o tipo do valor resultado
        let type = checkValueType(expArray[1]);

        console.log(type);

        break;

      // /p é o operador de print no terminal
      case exp.includes(operators[1]):
        break;

      // /l é o operador de definição de lista
      case exp.includes(operators[2]):
        break;

      // /t é o operador de definição de tabela
      case exp.includes(operators[3]):
        break;

      // /r é o operador de repetição
      case exp.includes(operators[4]):
        break;

      // /i é o ternário
      case exp.includes(operators[5]):
        break;

      default:
        break;
    }
  };

  const checkExpression = (exp) => {
    // checkError(exp);
    checkExpOperator(exp);
  };

  const handleAddItem = () => {
    checkExpression(expression);

    if (!expression) {
      return toast({
        title: "Nenhum valor.",
        description: "Insira algum valor para ser adicionado na tabela.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    } else {
      if (expression.includes("$")) {
        // match way
        const variableName = expression.match(/\$[a-zA-Z0-9]+/g);

        const newItem = {
          id: variableList.length,
          expression: expression,
          variable: variableName,
        };
        setVariableList((prev) => [...prev, newItem]);
      } else {
        const expressionReplace = expression.replace(/[^-()\d/*+.]/g, '');
        const result = eval(expressionReplace);
        setResult(result);
      }
    }


    // checkExpression(newItem);

    resetVariables();
  };

  const value = {
    variableList,
    setVariableList,
    handleAddItem,
    setExpression,
    expression,
    result,
    setResult
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
