export type ThemeType = {
    name: string;
    value: number;
    url: string;
};

export interface PromotionTypes {
  Percentage:number,
  Fixed :number
}
export interface AllRegex {
  phoneRegex1: RegExp;
  phoneRegex2:RegExp;
  validwithFormatephoneRegex: RegExp;
  phoneRegex3: RegExp;
  validdigit: RegExp;
  validateemial: RegExp;
  validateTipAmount: RegExp;
  validateYopMail: RegExp;
}
export type DynamicColorObjTypes = {
  color: string;
  fontColor: string;
  backgroundColor: string;
  headerFontColor: string;
  borderColor: string;
  iconColor: string;
  headerColor: string;
  categoryFontSize: string;
  categoryBackgroundColor: string;
  categoryFontColor: string;
  activeLabelBg: string;
  activeLabelName: string;
  lbl_deactive_button_bg: string;
  lbl_deactive_button_name: string;
  blueButtonBg: string;
  blueButtonName: string;
  disableButtonBg: string;
  disableButtonName: string;
  activeLabelText: string;
  whiteLabel: string;
  redLabel: string;
  blackLabel: string;
  lightGrayLabel: string;
};
export type DefaultStyleType = {
  color: string;
  categoryFontColor: string;
  categoryBackgroundColor: string;
};

export interface ColorStyleType{
FieldName:string,
Color:string
}

export type ThemeDefautStyle = {
  url: string;
  color: string;
  fontColor: string;
  backgroundColor: string;
  headerFontColor: string;
  borderColor: string;
  iconColor: string;
  headerColor: string;
};
export type OrderTypes = {
  PICKUP: {
    text: string;
    value: number;
  };
  DELIVERY: {
    text: string;
    value: number;
  };
};

export type OrderTimeTypes = {
  ASAP: {
    text: string;
    value: number;
  };
  LATERON: {
    text: string;
    value: number;
  };
};

