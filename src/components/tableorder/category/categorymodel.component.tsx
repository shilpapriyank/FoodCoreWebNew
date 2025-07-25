"use client";

import React, { useCallback, useRef } from "react";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { GetThemeDetails } from "../../common/utility";
import { useRouter, useParams } from "next/navigation";
import { CategoryTypes } from "../../../../redux/category/category.types";
import { PAGES } from "../common/pages";
import { useAppDispatch } from "../../../../redux/hooks";
import { GetAllMenuCategoryItems } from "@/types/menuitem-types/menuitem.type";
import { MainCategoryList } from "@/types/mainservice-types/mainservice.type";
import { setSelectedCategory } from "../../../../redux/category/category.slice";

const CategoryModalComponent: React.FC = () => {
  const { main, category, restaurantinfo, tableorder } = useReduxData();
  const selectedCatId = category.selectedcategorydetail?.catId;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const selectedTheme = GetThemeDetails(restaurantinfo?.themetype as number);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const params = useParams();
  const dynamic = params.dynamic;
  const tableno = params.tableno;
  const locationFullLink = `/${selectedTheme?.url}/${
    restaurantinfo?.restaurantURL
  }/${restaurantinfo?.defaultLocation?.locationURL.trim()}`;

  const handleClickCat = useCallback((cat: MainCategoryList) => {
    if (cat) {
      dispatch({
        type: CategoryTypes.CATEGORY_ITEM_LIST,
        payload: [],
      });
      dispatch(setSelectedCategory(cat));
      router.push(
        `${locationFullLink}/${cat.categoryslug}?${PAGES.TABLENO}=${tableorder.tablenumber}`
      );
      closeBtn?.current?.click();
    }
  }, []);

  return (
    <div
      className="modal fade"
      id="categoryModal"
      tabIndex={-1}
      aria-labelledby="categoryModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="btn-close"
              ref={closeBtn}
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <h3 className="title">Menu</h3>
            <div className="text">
              <ul className="menu-list-popup">
                {main?.maincategoryList?.map((cat: MainCategoryList) => (
                  <li
                    key={cat.catId}
                    className={
                      selectedCatId === cat?.catId
                        ? "color-orange cursor-pointer"
                        : "cursor-pointer"
                    }
                    onClick={() => handleClickCat(cat)}
                  >
                    {cat.catName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModalComponent;
