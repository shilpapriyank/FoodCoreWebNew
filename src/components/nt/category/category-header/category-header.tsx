import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GetThemeDetails } from "../../../common/utility";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fixedLengthString, getImagePath } from "../../common/utility";
import { useWindowDimensions } from "../../../customhooks/usewindowdimension-hook";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import useUtility from "@/components/customhooks/utility-hook";
import { selectedCategory } from "../../../../../redux/category/category.slice";
import { useAppDispatch } from "../../../../../redux/hooks";
import { refreshCategoryList } from "../../../../../redux/main/main.slice";

const CategoryHeader = ({ selectedCatId }: any) => {
  const {
    restaurantinfo,
    maincategoryList,
    selectedcategory,
    userinfo,
    menuitem,
    selecteddelivery,
  } = useReduxData();
  console.log("maincategory list", maincategoryList);
  //const {categorylist } =useLoadCatData();
  const router = useRouter();

  const params = useParams();
  //const { query: { dynamic, location, id, category, index }, } = router;
  const { dynamic, location, id, category, index } = params;
  const selctedTheme = GetThemeDetails(restaurantinfo?.themetype);
  const dispatch = useAppDispatch();

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    selectedcategory && selectedcategory?.catId
  );
  const searchdata = menuitem?.searchdata;
  const searchtext = menuitem?.searchtext;
  const categoryListItems =
    searchtext !== "" ? searchdata?.categories : maincategoryList;
  let pickupordelivery = selecteddelivery.pickupordelivery;
  const { filterCategory } = useUtility();
  const catWithSearch = filterCategory(categoryListItems, pickupordelivery);
  const activeItemRef = useRef<HTMLLIElement | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const handleClick = (slug: any, catId: any) => {
    const selected = catWithSearch.filter((x) => x.catId === catId);
    setSelectedCategoryId(catId);
    dispatch(selectedCategory(selected));
    router.push(`/${selctedTheme?.url}/${dynamic}/${location}/${slug}`);
  };
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  useEffect(() => {
    // Scroll the active element into view when the component renders or the active class changes
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "nearest", // Align vertically (if needed)
        inline: "center", // Align horizontally
      });
    }
  }, [selectedCategoryId, selectedcategory, category]);
  const b2b = restaurantinfo?.defaultLocation?.b2btype;
  console.log("b2b type from category header", b2b);

  const handleScrollItem = (id: any) => {
    // setupdateId(id)
    const item = document.getElementById(`scroll-${id}`);
    if (item) {
      // const rect = item.getBoundingClientRect();
      // if (rect.top >= 0 && rect.top <= 10) {
      // item.scrollIntoView({
      //   behavior: "smooth", // Smooth scrolling
      //   block: "nearest", // Align vertically (if needed)
      //   inline: "center", // Align horizontally
      // });
      const parent = item.parentNode as HTMLElement | null;
      if (parent) {
        parent.scrollTo({
          left: item.offsetLeft - parent.offsetLeft, // Adjust horizontal position
          behavior: "smooth", // Smooth scrolling
        });
      }
      // }
    }
  };
  // const debouncedHandleClick = useMemo(() => debounce(handleScroll, 300), []);

  const handleScroll = () => {
    const header = document.querySelector(".sub-menu");
    const headerHeight = (header as HTMLElement)?.offsetHeight || 0;
    const sections = document.querySelectorAll("[data-section]");

    let currentSection: string = "";

    sections.forEach((section) => {
      const el = section as HTMLElement;
      const rect = el.getBoundingClientRect();

      // Check if the section is fully visible after the sticky header
      if (rect.top >= headerHeight && rect.top <= headerHeight + 50) {
        if (el.dataset.section) {
          currentSection = el.dataset.section;
        }
      }
    });

    if (currentSection !== activeSection) {
      if (currentSection) {
        handleScrollItem(currentSection);
        setActiveSection(currentSection);
      }
    }
  };
  useEffect(() => {
    console.log("categorylist item  from category header:", categoryListItems);
    console.log("category state from category header:", maincategoryList);
    if (isMobile) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log("category with search", catWithSearch);

  return (
    <>
      {/* {!(b2b && userinfo === null) && catWithSearch?.length > 0 && ( */}
      <section className="sub-menu">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <ul className="categories-scroll">
                {catWithSearch &&
                  catWithSearch?.map((c: any) => {
                    const isActive =
                      selectedCategoryId === c.catId ||
                      selectedcategory?.catId === c.catId ||
                      category === c.categoryslug;
                    let menuImage = getImagePath(
                      c.imgurl,
                      restaurantinfo?.defaultLocation?.defaultmenucategoryimage
                    );
                    const splitedText = c.catName?.split(" ");
                    const text = c.catName
                      ?.split(" ")
                      .map((word: string, index: number) => {
                        const isBr =
                          (index === 2 && word.length > 8) || index >= 3;
                        const remainArray = splitedText.splice(
                          2,
                          splitedText.length
                        );
                        console.log(splitedText?.length, index);
                        return `<span>${word}${
                          index > 4 ? `${isBr ? "<br>" : ""}` : ""
                        }</span>${
                          index + 1 === splitedText?.length
                            ? `<span>${remainArray.join(" ")}</span>`
                            : ""
                        }`;
                      })
                      .join(" ");
                    return (
                      <li
                        key={c.catId}
                        id={`scroll-${c.categoryslug}`}
                        ref={isActive ? activeItemRef : null}
                        className={` ${
                          isActive || c.categoryslug === activeSection
                            ? "active"
                            : ""
                        } cat-li`}
                        onClick={() => handleClick(c.categoryslug, c.catId)}
                        data-to-scrollspy-id={c.categoryslug}
                      >
                        <p>category-header </p>
                        <p className="text-center mb-1 d-block d-md-none">
                          <span className="cat-img rounded-circle">
                            {" "}
                            <img
                              src={menuImage || "/nt/img/item-1.jpeg"}
                              alt={c.catName}
                              className="rounded-circle object-fit-cover"
                            ></img>
                          </span>
                        </p>
                        <a className="d-none d-md-block">
                          <span>{c.catName}</span>
                          {/* <span dangerouslySetInnerHTML={{__html:text}}></span> */}
                        </a>
                        <a className="cat-name d-block d-md-none text-center">
                          <span className="text-center">
                            {fixedLengthString(c.catName, 24)}
                          </span>
                          {/* <span dangerouslySetInnerHTML={{__html:text}}></span> */}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* )} */}
    </>
  );
};
export default CategoryHeader;
