import React from "react";

const PageTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-12">
        <h4 className="small-heading">{title}</h4>
      </div>
    </div>
  );
};

export default PageTitle;
