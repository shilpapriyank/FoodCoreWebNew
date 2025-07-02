export enum ViewTypeEnum {
  GRID = "grid",
  LIST = "list",
}

export const ORDER_TYPE = {
  PICKUP: {
    text: "Pickup",
    value: 1,
  },
  DELIVERY: {
    text: "Delivery",
    value: 2,
  },
};

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

// Convert seconds into minute format, e.g., 125 → { minute: 2, second: 5 }
export const convertSecondToMinute = (
  second: number
): { minute: number; second: number } => {
  const totalSeconds: number = second;
  const minutes: number = Math.floor(totalSeconds / 60);
  const seconds: number = totalSeconds % 60;

  function padTo2Digits(num: number): string {
    return num.toString().padStart(2, "0");
  }

  return {
    minute: parseInt(padTo2Digits(minutes)),
    second: parseInt(padTo2Digits(seconds)),
  };
};

export const leftRightArray = (data: any) => {
  let dataLength = data?.length;
  let leftarray = [];
  let rigtharray = [];
  //IF  DATA.LENGTH IS EVEN THEN THIS CONDITION RUN
  if (dataLength % 2 === 0) {
    let halfLength = dataLength / 2;
    for (let index = 0; index < dataLength; index++) {
      if (index < halfLength) {
        rigtharray.push(data[index]);
      } else {
        leftarray.push(data[index]);
      }
    }
  }
  //IF  DATA.LENGTH IS ODD THEN THIS CONDITION RUN
  if (dataLength % 2 !== 0) {
    let halfLength = dataLength / 2;
    for (let index = 0; index < dataLength; index++) {
      if (index < halfLength + 1) {
        rigtharray.push(data[index]);
      } else {
        leftarray.push(data[index]);
      }
    }
  }
  return { rigtharray, leftarray };
};
