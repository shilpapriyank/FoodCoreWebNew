import handleNotify from "@/components/default/helpers/toaster/toaster-notify";
import { ToasterPositions } from "@/components/default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "@/components/default/helpers/toaster/toaster-types";
import React from "react";
// import {
//   FacebookIcon,
//   FacebookShareButton,
//   LinkedinIcon,
//   LinkedinShareButton,
//   PinterestIcon,
//   PinterestShareButton,
//   TelegramIcon,
//   TelegramShareButton,
//   TwitterIcon,
//   TwitterShareButton,
//   WhatsappIcon,
//   WhatsappShareButton,
// } from "react-share";
import { FacebookShareButton, FacebookIcon, WhatsappIcon } from "react-share";
const ShareItemComponent = ({
  url,
  title,
  description,
  size = 32,
  linkClass,
  isHrLine = false,
}: any) => {
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
          // description={"aiueo"}
          title={title}
          className="Demo__some-network"
        >
          <FacebookIcon size={size} round={true} />
        </FBButton>
        {/* <LinkedinShareButton
                    //  url={"https://peing.net/ja/"}
                    // url={`${window.location.origin }/${selctedTheme.url}/${dynamic}/${location}`}
                    url={url}
                    source=''
                    summary=''
                    // quote={"フェイスブックはタイトルが付けれるようです"}
                    hashtag={"#hashtag"}
                    description={"aiueo"}
                    title={title}
                    className="Demo__some-network"

                >
                    <LinkedinIcon size={size} round={true} />
                </LinkedinShareButton> */}
        {/* <WhatsappShareButton
                    url={url}
                    source=''
                    summary=''
                    title={title}
                    // quote={"フェイスブックはタイトルが付けれるようです"}
                    hashtag={"#hashtag"
                    description=""
                    className="Demo__some-network"
                > */}
        <a
          href={`https://api.whatsapp.com/send?text=${url}`}
          className="cursor align-top d-inline Demo__some-network"
          target="_blank"
          rel="noreferrer"
        >
          <WhatsappIcon size={size} round={true} />
        </a>
        {/* </WhatsappShareButton> */}
        {/* <TelegramShareButton
                    url={url}
                    title={title}
                    className="Demo__some-network">
                    <TelegramIcon size={size} round={true} />
                </TelegramShareButton>
                <TwitterShareButton
                    url={url}
                    title={title}
                    className="Demo__some-network">
                    <TwitterIcon size={size} round={true} />
                </TwitterShareButton>
                <PinterestShareButton
                    media={url}
                    title={title}
                    url={url}
                    className="Demo__some-network">
                    <PinterestIcon size={size} round={true} />
                </PinterestShareButton> */}
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
  );
};

export default React.memo(ShareItemComponent);
