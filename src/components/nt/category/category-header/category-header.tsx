//import useLoadCatData from "../../../customhooks/useloadcatdata-hook";
import { GetThemeDetails } from "../../../common/utility";
import { fixedLengthString, getImagePath } from "../../common/utility";
import { useWindowDimensions } from "../../../customhooks/usewindowdimension-hook";
import useUtility from "../../../customhooks/utility-hook";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "../../../../../redux/hooks";
import { useEffect, useRef, useState } from "react";
import { setSelectedCategory } from "../../../../../redux/category/category.slice";
import { MainCategoryList } from "@/types/mainservice-types/mainservice.type";

const CategoryHeader = ({ selectedCatId }: any) => {
  const {
    restaurantinfo,
    maincategoryList,
    selectedcategory,
    userinfo,
    menuitem,
    selecteddelivery,
  } = useReduxData();
  // const {categorylist } =useLoadCatData();
  const router = useRouter();
  const params = useParams();
  const { dynamic, location, id, category, index } = params;
  const selctedTheme = GetThemeDetails(restaurantinfo?.themetype as number);
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
  const catWithSearch = filterCategory(
    categoryListItems as any,
    pickupordelivery
  );
  const activeItemRef = useRef<any>(null);
  const [activeSection, setActiveSection] = useState("");

  const handleClick = (slug: string, catId: number) => {
    const selected = catWithSearch.filter((x) => x.catId === catId);
    setSelectedCategoryId(catId);
    dispatch(setSelectedCategory(selected as any));
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

  const handleScrollItem = (id: string) => {
    const item = document.getElementById(`scroll-${id}`);
    if (item) {
      const parent = item.parentNode as HTMLElement | null;
      if (parent) {
        parent.scrollTo({
          left: item.offsetLeft - parent.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  };

  const handleScroll = () => {
    const header = document.querySelector(".sub-menu");
    const headerHeight = (header as HTMLElement)?.offsetHeight || 0;
    const sections = document.querySelectorAll("[data-section]");

    let currentSection: string = "";

    sections.forEach((section) => {
      const el = section as HTMLElement;
      const rect = el.getBoundingClientRect();

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
    if (isMobile) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {!(b2b && userinfo === null) && catWithSearch?.length > 0 && (
        <section className="sub-menu">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <ul className="categories-scroll">
                  {catWithSearch &&
                    catWithSearch?.map((c) => {
                      const isActive =
                        selectedCategoryId === c.catId ||
                        selectedcategory?.catId === c.catId ||
                        category === c.categoryslug;
                      let menuImage = getImagePath(
                        c.imgurl,
                        restaurantinfo?.defaultLocation
                          ?.defaultmenucategoryimage
                      );
                      // const splitedText=c.catName?.split(' ')
                      // const text=c.catName?.split(' ').map((word, index) => {
                      //   const isBr=(index===2&&word.length>8) || (index>=3)
                      //   const remainArray=splitedText.splice(2,splitedText.length)
                      //   console.log(splitedText?.length,index)
                      //  return `<span>${word}${index>4 ? `${(isBr)?"<br>":""}` : ''}</span>${index+1 === splitedText?.length?`<span>${remainArray.join(' ')}</span>`:"" }`
                      // }
                      // ).join(' ');
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
      )}
    </>
  );
};
export default CategoryHeader;

// import React, { useEffect, useRef, useState } from "react";
// import { GetThemeDetails } from "../../../common/utility";
// import { useParams, useRouter } from "next/navigation";
// import { fixedLengthString, getImagePath } from "../../common/utility";
// import { useWindowDimensions } from "../../../customhooks/usewindowdimension-hook";
// import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
// import useUtility from "@/components/customhooks/utility-hook";
// import { useAppDispatch } from "../../../../../redux/hooks";
// import { MainCategoryList } from "@/types/mainservice-types/mainservice.type";
// import { setSelectedCategory } from "../../../../../redux/category/category.slice";
// import { GetAllMenuCategoryItems } from "@/types/menuitem-types/menuitem.type";

// const CategoryHeader: React.FC = () => {
//   const {
//     restaurantinfo,
//     maincategoryList,
//     selectedcategory,
//     userinfo,
//     menuitem,
//     selecteddelivery,
//   } = useReduxData();
//   const router = useRouter();
//   const params = useParams();
//   const { dynamic, location, id, category, index } = params as {
//     dynamic?: string;
//     location?: string;
//     id?: string;
//     category?: string;
//     index?: string;
//   };

//   const selctedTheme = GetThemeDetails(restaurantinfo?.themetype as number);
//   const dispatch = useAppDispatch();

//   const [selectedCategoryId, setSelectedCategoryId] = useState<number>(
//     selectedcategory?.catId ?? 0
//   );
//   const searchdata = menuitem?.searchdata;
//   const searchtext = menuitem?.searchtext;
//   const categoryListItems =
//     searchtext !== "" ? searchdata?.categories : maincategoryList;

//   let pickupordelivery = selecteddelivery?.pickupordelivery;
//   const { filterCategory } = useUtility();
//   const catWithSearch = filterCategory(
//     categoryListItems as GetAllMenuCategoryItems[],
//     pickupordelivery
//   );

//   const activeItemRef = useRef<HTMLLIElement | null>(null);
//   const [activeSection, setActiveSection] = useState<string>("");

//   const handleClick = (slug: string, catId: number) => {
//     const selected = catWithSearch.filter((x) => x.catId === catId);
//     setSelectedCategoryId(catId);
//     if (selected.length > 0) {
//       dispatch(setSelectedCategory(selected[0]));
//     }
//     router.push(`/${selctedTheme?.url}/${dynamic}/${location}/${slug}`);
//   };

//   const { width } = useWindowDimensions();
//   const isMobile = width < 768;

//   useEffect(() => {
//     // Scroll the active element into view when the component renders or the active class changes
//     if (activeItemRef.current) {
//       activeItemRef.current.scrollIntoView({
//         behavior: "smooth", // Smooth scrolling
//         block: "nearest", // Align vertically (if needed)
//         inline: "center", // Align horizontally
//       });
//     }
//   }, [selectedCategoryId, selectedcategory, category]);

//   const b2b = restaurantinfo?.defaultLocation?.b2btype;

//   const handleScrollItem = (id: string) => {
//     const item = document.getElementById(`scroll-${id}`);
//     if (item) {
//       const parent = item.parentNode as HTMLElement | null;
//       if (parent) {
//         parent.scrollTo({
//           left: item.offsetLeft - parent.offsetLeft,
//           behavior: "smooth",
//         });
//       }
//     }
//   };

//   const handleScroll = () => {
//     const header = document.querySelector(".sub-menu");
//     const headerHeight = (header as HTMLElement)?.offsetHeight || 0;
//     const sections = document.querySelectorAll("[data-section]");

//     let currentSection: string = "";

//     sections.forEach((section) => {
//       const el = section as HTMLElement;
//       const rect = el.getBoundingClientRect();

//       if (rect.top >= headerHeight && rect.top <= headerHeight + 50) {
//         if (el.dataset.section) {
//           currentSection = el.dataset.section;
//         }
//       }
//     });

//     if (currentSection !== activeSection) {
//       if (currentSection) {
//         handleScrollItem(currentSection);
//         setActiveSection(currentSection);
//       }
//     }
//   };

//   useEffect(() => {
//     if (isMobile) {
//       window.addEventListener("scroll", handleScroll);
//     }
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       {!(b2b && userinfo === null) && catWithSearch?.length > 0 && (
//         <section className="sub-menu">
//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-12">
//                 <ul className="categories-scroll">
//                   {catWithSearch?.map((c: MainCategoryList, index: number) => {
//                     const isActive =
//                       selectedCategoryId === c.catId ||
//                       selectedcategory?.catId === c.catId ||
//                       category === c.categoryslug;

//                     const menuImage = getImagePath(
//                       c.imgurl,
//                       restaurantinfo?.defaultLocation?.defaultmenucategoryimage
//                     );
//                     return (
//                       <li
//                         key={`${c.catId}-${index}`}
//                         id={`scroll-${c.categoryslug}`}
//                         ref={isActive ? activeItemRef : null}
//                         className={` ${isActive || c.categoryslug === activeSection
//                           ? "active"
//                           : ""
//                           } cat-li`}
//                         onClick={() => handleClick(c.categoryslug, c.catId)}
//                         data-to-scrollspy-id={c.categoryslug}
//                       >
//                         <p className="text-center mb-1 d-block d-md-none">
//                           <span className="cat-img rounded-circle">
//                             <img
//                               src={menuImage || "/nt/img/item-1.jpeg"}
//                               alt={c.catName}
//                               className="rounded-circle object-fit-cover"
//                             />
//                           </span>
//                         </p>
//                         <a className="d-none d-md-block">
//                           <span>{c.catName}</span>
//                         </a>
//                         <a className="cat-name d-block d-md-none text-center">
//                           <span className="text-center">
//                             {fixedLengthString(c.catName, 24)}
//                           </span>
//                         </a>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </section>
//       )}
//     </>
//   );
// };
// export default CategoryHeader;
