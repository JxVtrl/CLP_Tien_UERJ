export const checkValueType = (exp) => {
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
