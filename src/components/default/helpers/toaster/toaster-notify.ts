import { toast, Slide, ToastPosition } from "react-toastify";
import { ToasterPositions } from "./toaster-positions";
import { ToasterTypes } from "./toaster-types";

type PositionType = (typeof ToasterPositions)[keyof typeof ToasterPositions];
type ActionType = (typeof ToasterTypes)[keyof typeof ToasterTypes];

const handleNotify = (
  messagetext: string,
  position: PositionType,
  action: ActionType
) => {
  let toasterposition: ToastPosition = ToasterPositions.BottomRight;

  switch (position) {
    case ToasterPositions.TopLeft:
      toasterposition = ToasterPositions.TopLeft;
      break;
    case ToasterPositions.TopRight:
      toasterposition = ToasterPositions.TopRight;
      break;
    case ToasterPositions.TopCenter:
      toasterposition = ToasterPositions.TopCenter;
      break;
    case ToasterPositions.BottomLeft:
      toasterposition = ToasterPositions.BottomLeft;
      break;
    case ToasterPositions.BottomRight:
      toasterposition = ToasterPositions.BottomRight;
      break;
    case ToasterPositions.BottomCenter:
      toasterposition = ToasterPositions.BottomCenter;
      break;
    default:
      break;
  }

  toast.dismiss();

  const toastOptions = {
    position: toasterposition,
    autoClose: action === ToasterTypes.Success ? 1000 : 5000,
    hideProgressBar: true,
    limit: 1,
    transition: Slide,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  };

  switch (action) {
    case ToasterTypes.Success:
      toast.success(messagetext, toastOptions);
      break;
    case ToasterTypes.Info:
      toast.info(messagetext, toastOptions);
      break;
    case ToasterTypes.Warning:
      toast.warning(messagetext, toastOptions);
      break;
    case ToasterTypes.Error:
      toast.error(messagetext, toastOptions);
      break;
    case ToasterTypes.Dark:
      toast.dark(messagetext, toastOptions);
      break;
    case ToasterTypes.Default:
    default:
      toast(messagetext, toastOptions);
      break;
  }
};

export default handleNotify;
