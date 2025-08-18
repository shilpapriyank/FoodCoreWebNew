import { FutureDateType } from "@/components/nt/timeslot/future-day.component";

export interface TimeSlot {
  StartSlotNew: string;
  EndSlotNew: string;
  isLastOrder?: boolean;
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
  futureDateList: FutureDateType[];
  handleToggleTimeSlotModal?: () => void;
  enablefutureordering: boolean;
  locationId: number;
  clearData?: () => void;
  isRedirectMenu?: boolean;
  isload?: boolean;
  locationUrl: string;
  clearMeaage?: () => void;
}
