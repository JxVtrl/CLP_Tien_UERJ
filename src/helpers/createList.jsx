export const createList = (type, list) => {
  if (type.toLowerCase() === "ordered") {
    return (
      <ol>
        {list.map((item) => {
          return <li>{item.replaceAll("'", "").replaceAll('"', "")}</li>;
        })}
      </ol>
    );
  } else if (type.toLowerCase() === "unordered") {
    return (
      <ul>
        {list.map((item) => {
          return <li>{item.replaceAll("'", "").replaceAll('"', "")}</li>;
        })}
      </ul>
    );
  }
};
