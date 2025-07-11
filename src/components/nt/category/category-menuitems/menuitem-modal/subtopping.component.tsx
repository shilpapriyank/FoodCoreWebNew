import React from "react";
import PizzaSlice from "./pizzaslice.component";
import SubToppingQty from "./subtopping-qty.component";
import SubToppingPrice from "./subtopping-price.component";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import CheckBox from "@/components/common/checkbox.component";
import RadioButton from "@/components/common/radiobutton.component";

const SubTopping = ({
  type,
  index,
  item,
  handleOnChangeRemoveSubOption,
  handleOnChangeSubOption,
  isDisplayPrice,
  increment,
  decrement,
}: any) => {
  const { restaurantinfo } = useReduxData();
  const redioClass = restaurantinfo?.isSchoolProgramEnabled
    ? "fs-15-radio"
    : "";
  return (
    <div className="col-lg-12 col-md-12 col-12">
      {item?.multipleSelectStatus === true ? (
        <>
          <div className="info-flex">
            <p>
              {!item?.isHalfPizza && (
                <>
                  {type.subOptionselected === true ? (
                    <CheckBox
                      classInputName={redioClass}
                      type={type}
                      item={item}
                      isRadioButton={false}
                      handleOnChangeSubOption={handleOnChangeRemoveSubOption}
                    />
                  ) : (
                    <CheckBox
                      classInputName={redioClass}
                      type={type}
                      item={item}
                      isRadioButton={false}
                      handleOnChangeSubOption={handleOnChangeSubOption}
                    />
                  )}
                </>
              )}

              <span
                className={
                  restaurantinfo?.isSchoolProgramEnabled ? "fs-16" : ""
                }
              >
                {type.name}
              </span>
              <SubToppingPrice
                isDisplayPrice={isDisplayPrice}
                isExtraPaidTopping={
                  item?.freeToppingsCount > 0 ? type?.isExtraPaidTopping : true
                }
                type={type}
              />
            </p>
            {item?.isHalfPizza && (
              <PizzaSlice
                optionId={item.optionId}
                handleOnChangeSubOption={handleOnChangeSubOption}
                type={type}
              />
            )}
            {item.maxSelection > 1 && type.subOptionselected === true && (
              <SubToppingQty
                option={item}
                handleOnChangeSubOption={handleOnChangeSubOption}
                key={`${index}-qty`}
                isRadioButton={false}
                type={type}
                optionId={item.optionId}
                increment={increment}
                decrement={decrement}
                index={index}
              />
            )}
          </div>
        </>
      ) : (
        <div className="info-flex">
          <p>
            {type.subOptionselected === true ? (
              <RadioButton
                classInputName={redioClass}
                type={type}
                item={item}
                isRadioButton={true}
                handleOnChangeSubOption={handleOnChangeRemoveSubOption}
              />
            ) : (
              <RadioButton
                classInputName={redioClass}
                type={type}
                item={item}
                isRadioButton={true}
                handleOnChangeSubOption={handleOnChangeSubOption}
              />
            )}
            <span
              className={restaurantinfo?.isSchoolProgramEnabled ? "fs-16" : ""}
            >
              {" "}
              {type.name}
            </span>
            <SubToppingPrice
              isExtraPaidTopping={true}
              isDisplayPrice={isDisplayPrice}
              type={type}
            />
          </p>
          {item.maxSelection > 1 && type.subOptionselected === true && (
            <SubToppingQty
              option={item}
              handleOnChangeSubOption={handleOnChangeSubOption}
              key={`${index}-qty`}
              isRadioButton={true}
              type={type}
              optionId={item.optionId}
              increment={increment}
              decrement={decrement}
              index={index}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SubTopping;

// import React from "react";
// import PizzaSlice from "./pizzaslice.component";
// import SubToppingQty from "./subtopping-qty.component";
// import SubToppingPrice from "./subtopping-price.component";
// import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
// import CheckBox from "@/components/common/checkbox.component";
// import RadioButton from "@/components/common/radiobutton.component";

// const SubTopping = ({
//   type,
//   index,
//   item,
//   handleOnChangeRemoveSubOption,
//   handleOnChangeSubOption,
//   isDisplayPrice,
//   increment,
//   decrement,
// }: any) => {
//   const { restaurantinfo } = useReduxData();
//   const redioClass = restaurantinfo?.isSchoolProgramEnabled
//     ? "fs-15-radio"
//     : "";
//   return (
//     <div className="col-lg-12 col-md-12 col-12">
//       {item?.multipleSelectStatus === true ? (
//         <>
//           <div className="info-flex">
//             <p>
//               {!item?.isHalfPizza && (
//                 <>
//                   {type.subOptionselected === true ? (
//                     <CheckBox
//                       classInputName={redioClass}
//                       type={type}
//                       item={item}
//                       isRadioButton={false}
//                       handleOnChangeSubOption={handleOnChangeRemoveSubOption}
//                     />
//                   ) : (
//                     <CheckBox
//                       classInputName={redioClass}
//                       type={type}
//                       item={item}
//                       isRadioButton={false}
//                       handleOnChangeSubOption={handleOnChangeSubOption}
//                     />
//                   )}
//                 </>
//               )}

//               <span
//                 className={
//                   restaurantinfo?.isSchoolProgramEnabled ? "fs-16" : ""
//                 }
//               >
//                 {type.name}
//               </span>
//               <SubToppingPrice
//                 isDisplayPrice={isDisplayPrice}
//                 isExtraPaidTopping={
//                   item?.freeToppingsCount > 0 ? type?.isExtraPaidTopping : true
//                 }
//                 type={type}
//               />
//             </p>
//             {item?.isHalfPizza && (
//               <PizzaSlice
//                 optionId={item.optionId}
//                 handleOnChangeSubOption={handleOnChangeSubOption}
//                 type={type}
//               />
//             )}
//             {item.maxSelection > 1 && type.subOptionselected === true && (
//               <SubToppingQty
//                 option={item}
//                 handleOnChangeSubOption={handleOnChangeSubOption}
//                 key={`${index}-qty`}
//                 isRadioButton={false}
//                 type={type}
//                 optionId={item.optionId}
//                 increment={increment}
//                 decrement={decrement}
//                 index={`${index}-qty`}
//               />
//             )}
//           </div>
//         </>
//       ) : (
//         <div className="info-flex">
//           <p>
//             {type.subOptionselected === true ? (
//               <RadioButton
//                 classInputName={redioClass}
//                 type={type}
//                 item={item}
//                 isRadioButton={true}
//                 handleOnChangeSubOption={handleOnChangeRemoveSubOption}
//               />
//             ) : (
//               <RadioButton
//                 classInputName={redioClass}
//                 type={type}
//                 item={item}
//                 isRadioButton={true}
//                 handleOnChangeSubOption={handleOnChangeSubOption}
//               />
//             )}
//             <span
//               className={restaurantinfo?.isSchoolProgramEnabled ? "fs-16" : ""}
//             >
//               {" "}
//               {type.name}
//             </span>
//             <SubToppingPrice
//               isExtraPaidTopping={true}
//               isDisplayPrice={isDisplayPrice}
//               type={type}
//             />
//           </p>
//           {item.maxSelection > 1 && type.subOptionselected === true && (
//             <SubToppingQty
//               option={item}
//               handleOnChangeSubOption={handleOnChangeSubOption}
//               key={`${index}-qty`}
//               isRadioButton={true}
//               type={type}
//               optionId={item.optionId}
//               increment={increment}
//               decrement={decrement}
//               index={`${index}-qty`}
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubTopping;
