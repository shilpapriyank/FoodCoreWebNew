export enum ViewTypeEnum {
  GRID = "grid",
  LIST = "list",
}

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

export const MonthList = (mname: number): string => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[mname];
};

// // Convert seconds into minute format, e.g., 125 → { minute: 2, second: 5 }
// export const convertSecondToMinute = (second: number): { minute: number; second: number } => {
//     const totalSeconds: number = second;
//     const minutes: number = Math.floor(totalSeconds / 60);
//     const seconds: number = totalSeconds % 60;

//     function padTo2Digits(num: number): string {
//         return num.toString().padStart(2, '0');
//     }

//     return {
//         minute: parseInt(padTo2Digits(minutes)),
//         second: parseInt(padTo2Digits(seconds)),
//     };
// };
