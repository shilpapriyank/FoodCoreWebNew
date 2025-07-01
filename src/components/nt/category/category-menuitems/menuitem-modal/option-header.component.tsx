import React from "react";

const OptionHeader = ({
  isOnLoadExpand,
  remainCount,
  item,
  selectedtypecount,
  iscompletecheck,
  index,
  isOpenFirst,
}: any) => {
  return (
    <div className="card-header accordion-header" id="accordionCrust">
      <button
        className={`accordion-button ${
          (isOnLoadExpand === true &&
            item?.optionselected === true &&
            selectedtypecount.length > 0) ||
          (!isOnLoadExpand && index === 0 && isOpenFirst)
            ? ""
            : "collapsed"
        }`}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#collapse${index}`}
        aria-expanded="true"
        aria-controls={`collapse${index}`}
        id={`itembutton${item?.optionId}`}
      >
        {item.name}
        {item.isCompulsory === true && <sup>*</sup>}
        {item?.maxSelection !== 99 && item?.maxSelection > 1 && (
          <small>
            Choices remaining: <span>{remainCount}</span>
          </small>
        )}
        {iscompletecheck && <i className="fa fa-check ml-2 text-success" />}
      </button>
    </div>
  );
};

export default OptionHeader;
