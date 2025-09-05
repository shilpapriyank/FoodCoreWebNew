import { usePathname, useRouter } from "next/navigation";
import React from "react";
import ShareitemComponent from "./shareitem.component";

const SiteContentComponent = ({ data }: { data: any }) => {
  const router = useRouter();
  const pathname = usePathname();
  let shareUrl = `${window.location.origin}${pathname}`;
  return (
    <section className="location-main  categories-info">
      <div className="container-fluid">
        {data?.imgurl !== undefined && data?.imgurl !== "" && (
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
              {/* <img className="full-width" src={data.imgurl} alt style={{ width: "inherit", height: "300px" }} /> */}
              <img className="img-fluid" src={data.imgurl} alt="" />
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12">
            {data?.title && data.title !== "" && (
              <h4 className="mt-3 orange-text">{data?.title}</h4>
            )}
          </div>
        </div>
        {data?.body && data?.body !== "" && (
          <div className="row">
            <div className="col-12">
              <div
                className=""
                dangerouslySetInnerHTML={{ __html: data?.body }}
              />
            </div>
          </div>
        )}
        <ShareitemComponent
          url={shareUrl}
          title={data?.title}
          linkClass="fs-4 pt-1"
        />
      </div>
    </section>
  );
};

export default SiteContentComponent;
