// export const API_RESPONSE_STATUS = {
//   SUCCESS: "1",
//   FAIL: "2",
//   ERROR: "3",
//   INVALID: "4",
//   CHANGE: "5",
//   ALREADYLOGIN: "6",
// } as const;

// export type ApiResponseStatus =
//   (typeof API_RESPONSE_STATUS)[keyof typeof API_RESPONSE_STATUS];

export enum API_RESPONSE_STATUS {
  SUCCESS = 1,
  FAIL = 2,
  ERROR = 3,
  INVALID = 4,
  CHANGE = 5,
  ALREADYLOGIN = 6,
}



