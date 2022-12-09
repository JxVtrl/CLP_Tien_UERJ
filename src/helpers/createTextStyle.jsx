export const createTextStyle = (type, text) => {
  const typeLower = type.toLowerCase();

  switch (typeLower) {
    case "bold":
      return <span style={{ fontWeight: "bold" }}>{text}</span>;
    case "italic":
      return <span style={{ fontStyle: "italic" }}>{text}</span>;
    case "underline":
      return <span style={{ textDecoration: "underline" }}>{text}</span>;
    default:
      return text;
  }
};
