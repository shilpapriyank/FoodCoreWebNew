import React, { useEffect } from "react";
import MenuItemQuickOrder from "../../menuitem/menuitem-quick-order.component";
import { getImagePath } from "../../../common/utility";

const MenuCarouselDemo = ({ menuItems, defaultmenuitemimage }: any) => {
  return (
    <div className="carousel-container">
      <div
        id="menuCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        {/* Carousel Items */}
        <div className="carousel-inner row row-cols-lg-4 row-cols-md-2 row-cols-1">
          {menuItems.map((item: any, index: any) => (
            <div
              key={index}
              className={`cols carousel-item ${index === 0 ? "active" : ""}`}
            >
              {menuItems
                .slice(index, index + 3)
                .concat(
                  menuItems.slice(0, Math.max(0, index + 3 - menuItems.length))
                )
                .map((menuItem: any, i: any) => (
                  <div className="card features itembox">
                    <div className="img">
                      <img
                        src={getImagePath(
                          menuItem.imgurl,
                          defaultmenuitemimage
                        )}
                        //alt
                        style={{ maxHeight: "136px" }}
                      />
                      <a className="fa wishlist fa-heart-o active" />
                      <a className="fa plusbutton fa-plus"></a>
                    </div>
                    <div className="text">
                      <h3>
                        {menuItem.menuItemName}
                        {
                          <span className="color-green fs-16">
                            {menuItem.currency}
                            {menuItem?.price}
                          </span>
                        }
                      </h3>
                      {menuItem?.quickorderallow && (
                        <div className="d-flex justify-content-center mt-2">
                          {/* <MenuItemQuickOrder quickOrderClick={null} item={menu} /> */}
                        </div>
                      )}
                    </div>
                  </div>
                  //   <div key={i} className="card mx-2" style={{ width: "18rem" }} >
                  //     <img src={menuItem.image} className="card-img-top" alt={menuItem.name} />
                  //     <div className="card-body">
                  //       <h5 className="card-title">{menuItem.name}</h5>
                  //       <p className="card-text">{menuItem.description}</p>
                  //       <p className="card-text">
                  //         <strong>Price:</strong> ${menuItem.price}
                  //       </p>
                  //       <a href={menuItem.link} className="btn btn-primary"> Order Now </a>
                  //     </div>
                  //   </div>
                ))}
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#menuCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#menuCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default MenuCarouselDemo;
