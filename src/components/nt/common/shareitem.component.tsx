import handleNotify from "@/components/default/helpers/toaster/toaster-notify";
import { ToasterPositions } from "@/components/default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "@/components/default/helpers/toaster/toaster-types";
import React from "react";
import { FacebookShareButton, FacebookIcon, WhatsappIcon } from "react-share";
import ToastNotify from "../helpers/toastnotify/toast-notify.component";

const ShareItemComponent = ({
  url,
  title,
  description,
  size,
  linkClass,
  isHrLine,
}: {
  url: string;
  title: string;
  description: string;
  size: number;
  linkClass: string;
  isHrLine: boolean;
}) => {
  const handleClickCopyLink = (url: string) => {
    navigator?.clipboard?.writeText(url);
    handleNotify(
      "Link copied to clipboard",
      ToasterPositions.TopRight,
      ToasterTypes.Success
    );
  };

  const FBButton = FacebookShareButton as any;

  return (
    <>
      <div className="row  mb-2">
        <div className="col-12">
          <p className="mb-0 mb-1">
            <b>Share with friends</b>
          </p>
          {isHrLine && <hr className="mt-0 mb-1" />}
          <FBButton
            url={url}
            quote={"#FoodCore"}
            hashtag={"#hashtag"}
            description={"aiueo"}
            title={title}
            className="Demo__some-network"
          >
            <FacebookIcon size={size} round={true} />
          </FBButton>
          <a
            href={`https://api.whatsapp.com/send?text=${url}`}
            className="cursor align-top d-inline Demo__some-network"
            target="_blank"
            rel="noreferrer"
          >
            <WhatsappIcon size={size} round={true} />
          </a>
          <span
            className="text-dark cursor "
            onClick={() => handleClickCopyLink(url)}
            data-toggle="tooltip"
            data-placement="top"
            title="copy item link"
          >
            <i className={`fa fa-link ${linkClass}`}></i>
          </span>
        </div>
      </div>
      <ToastNotify />
    </>
  );
};

export default React.memo(ShareItemComponent);
