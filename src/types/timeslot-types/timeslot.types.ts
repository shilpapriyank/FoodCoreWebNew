export interface TimeSlot {
  StartSlotNew: string | null;
  EndSlotNew: string | null;
}

export interface FutureOrderDay {
  futureDate: string;
  futureDay: string;
}

export interface OrderType {
  checktime: string;
  isasap: boolean;
  futureOrderDay?: FutureOrderDay;
}

export interface OrderDisableData {
  isorderdisable: boolean;
  errormessage: string;
}

export interface AsapLaterOnState {
  isAsap: boolean;
  isDisableAsapLateron: boolean;
  isdisplay: boolean;
  isLateron: boolean;
}

export interface TimeSlotPopupComponentProps {
  isOpenModal: boolean;
  handleToggleTimingModal: (open: boolean) => void;
  futureDateList: any[];
  handleToggleTimeSlotModal?: () => void;
  enablefutureordering: boolean;
  locationId: string;
  clearData?: () => void;
  isRedirectMenu?: boolean;
  isload?: boolean;
  locationUrl: string;
  clearMeaage?: () => void;
}
