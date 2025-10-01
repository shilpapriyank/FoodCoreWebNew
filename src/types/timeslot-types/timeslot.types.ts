import { FutureOrderingDayDateTypes } from "../restaurant-types/restaurant.type";

export interface TimeSlot {
  StartSlotNew: string;
  EndSlotNew: string;
  isLastOrder?: boolean;
}

export interface OrderType {
  checktime: string;
  isasap: boolean;
  futureOrderDay?: FutureOrderingDayDateTypes;
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
  futureDateList: FutureOrderingDayDateTypes[];
  handleToggleTimeSlotModal?: () => void;
  enablefutureordering: boolean;
  locationId?: number;
  clearData?: () => void;
  isRedirectMenu?: boolean;
  isload?: boolean;
  locationUrl?: string;
  clearMeaage?: () => void;
}
