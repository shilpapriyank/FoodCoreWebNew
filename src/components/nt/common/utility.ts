export const getImagePath = (
  itemImage: string | null | undefined,
  defaultImage: string | null | undefined
): string => {
  if (itemImage !== null && itemImage !== undefined && itemImage !== "") {
    return itemImage;
  } else {
    if (
      defaultImage !== "" &&
      defaultImage !== undefined &&
      defaultImage !== null
    ) {
      return defaultImage;
    } else {
      return "";
    }
  }
};
function decodeHTMLEntities(text: string): string {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(text, "text/html").body.textContent;
  return parsed ?? "";
}
export function decodeNTimes(text: string, n: number): string {
  let decodedText = text;
  for (let i = 0; i < n; i++) {
    decodedText = decodeHTMLEntities(decodedText);
  }
  return decodedText;
}
export const fixedLengthString = (
  text: string,
  maxLength: number = 180,
  defaulttext: string = "..."
) => {
  const decodedDesc = decodeNTimes(text, 5);
  return decodedDesc && decodedDesc.length > maxLength
    ? decodedDesc.slice(0, maxLength) + defaulttext
    : decodedDesc;
};

export const getDesc = (text: string): string => { 
  if (text) {
    const decodedDesc = decodeNTimes(text, 5);
    return decodedDesc;
  } else {
    return "";
  }
};
