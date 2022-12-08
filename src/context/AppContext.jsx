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
  const toast = useToast();
  const [variableList, setVariableList] = useState([
    {
      id: 0,
      expression: "$valor /= 2",
      variables: ["valor"],
      values: "2",
    },
  ]);

  const resetVariables = () => {
    setExpression("");
  };

    
    const checkError = (exp) => {
    }

    const checkExpOperator = (exp) => {
        const operators = ["/=", "/p", "/l", "/t", "/r", "/i"];
        const expArray = exp.split(' ');
        let variables = [];
        let values = [];

        expArray.forEach((item) => {
            if (operators.includes(item)) {
                return;
            } else if (item.includes('$')) {
                variables.push(item);
            } else {
                values.push(item);
            }
        });

        console.log(variables);

    }

    const checkExpression = (exp) => {
      
        checkExpOperator(exp);

        
    checkError(exp);



    // const newItem = {
    //   id: variableList.length,
    //   expression: exp,
    //   variables: variables,
    //   values: values,
    // };

    // setVariableList((prev) => [...prev, newItem]);
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
    }

    if(expression.includes('$')) {
        const newItem = {
        id: variableList.length,
        expression: expression,
        };
} 
    
    checkExpression(newItem);

    resetVariables();
  };

  const value = {
    variableList,
    setVariableList,
    handleAddItem,
    setExpression,
    expression,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
