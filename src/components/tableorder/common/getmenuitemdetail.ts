interface CartItemOption {

}
interface EditFirebaseObj {
    Size: Record<string, {
        Options: Record<string, any>;
    }>;
    typeId: string;
}

interface MenuItemDetailsProps {
    data: any;
    edititem: any;
    firebaseobj: EditFirebaseObj;
}

class MenuItemDetails {
    private data: any;
    private menuitemdetaillist: {
        [key: string]: any;
        size: any[];
        topping: any[];
    };
    private editMenuitem: any;
    private editObj: EditFirebaseObj;

    constructor(data: any, edititem: any, firebaseobj: EditFirebaseObj) {
        const { PriceList, ...otherValue } = data;
        this.data = data;
        this.menuitemdetaillist = {
            ...otherValue,
            size: [],
            topping: []
        };
        this.editMenuitem = edititem;
        this.editObj = firebaseobj;
    }

    getMenuItemFormat(): void {
        const sizeDetail: any[] = [];
        this.data?.PriceList?.forEach((size: any) => {
            const sizeObj: any = {
                currency: size.currencysymbol,
                price: size.price,
                sizeselected: this.data?.PriceList[0].subparameterId === size?.subparameterId,
                subparameterId: size?.subparameterId,
                textsize: '',
                type: size?.type
            };
            sizeDetail.push(sizeObj);
        });

        const topping: any[] = [];
        this.data?.PriceList?.forEach((size: any) => {
            const toppingObj: any = {
                subparameterId: size?.subparameterId,
                list: this.getSizeBaseOptionList(size?.OptionList, size?.subparameterId, this.data?.PriceList[0].currencysymbol)
            };
            topping.push(toppingObj);
        });

        this.menuitemdetaillist.size = sizeDetail;
        this.menuitemdetaillist.topping = topping;
    }

    isUnique(item: any, index: number, array: any[]): boolean {
        return index === array.findIndex(obj => obj.parameterId === item.parameterId);
    }

    getSizeBaseOptionList(priceList: any[], subparameterId: string, currencySymbol: string): CartItemOption[] {
        const uniqueList = priceList.filter(this.isUnique);
        const optionList: CartItemOption[] = [];

        uniqueList.forEach((option) => {
            const optionObj: CartItemOption = {
                displayStatus: true,
                isCompulsory: option.isCompulsory,
                isHalfPizza: option.ishalfpizza,
                maxSelection: option.maxselection,
                multipleSelectStatus: option.isMultiselect,
                name: option.labelText,
                optionId: option.parameterId,
                optionselected: uniqueList[0]?.parameterId === option.parameterId,
                priceStatus: option.hasPrice,
                selectAllStatus: option.isSelectAll,
                subparameterId,
                toppingPriceForHalfPizza: option.halfpizzaprice,
                toppingValue: option.toppingvalue,
                type: this.getOptionBaseType(priceList, option, currencySymbol)
            };
            optionList.push(optionObj);
        });

        return optionList;
    }

    getOptionBaseType(priceList: any[], option: any, currencySymbol: string): any[] {
        const filteredSubOptions = priceList.filter((sub) => sub.parameterId === option.parameterId);
        const subOptionList: any[] = [];

        filteredSubOptions.forEach((subOption) => {
            const subOptionObj: any = {
                cals: subOption.calorie,
                currency: currencySymbol,
                defaultSelection: '',
                halfPizzaPriceToppingPercentage: subOption.halfpizzaprice,
                halfpizzaprice: subOption.halfpizzaprice,
                image: subOption.suboptionimg,
                name: subOption.type,
                optionId: option.parameterId,
                pizzaside: subOption.pizzaside,
                price: subOption.price,
                subOptionToppingQuantity: subOption.toppingquantity,
                subOptionselected: false,
                suboptionId: subOption.typeid,
                suboptioncategoryname: subOption.suboptioncategory,
                suboptionmaxselection: subOption.suboptionmaxselection,
                toppingValue: subOption.toppingvalue
            };
            subOptionList.push(subOptionObj);
        });

        return subOptionList;
    }

    checkOptionSelected(option: CartItemOption): boolean {
        const subOption = Object.values(this.editObj.Size[this.editObj.typeId]?.Options || {});
        return subOption.some(item => item.parameterId === (option as any).optionId);
    }

    getSubOptionList(suboption: any[]): any[] {
        const subOption = Object.values(this.editObj.Size[this.editObj.typeId]?.Options || {});
        const typeList: any[] = [];

        suboption.forEach((item) => {
            const selected = subOption.find(sub => sub.typeid === item.suboptionId);
            if (selected) {
                item.subOptionToppingQuantity = selected.toppingquantity;
                item.subOptionselected = true;
                item.pizzaside = selected.pizzaside ?? '';
            }
            typeList.push(item);
        });

        return typeList;
    }

    getEditItemOptionList(optionList: any[]): CartItemOption[] {
        return optionList.map((item) => {
            if (this.checkOptionSelected(item)) {
                item.optionselected = true;
                item.type = this.getSubOptionList(item.type);
            }
            return item;
        });
    }

    geteditObjToEditMenuitem(): void {
        const selectedSize = this.editObj.Size[this.editObj.typeId];
        this.editMenuitem.size.forEach((item: any) => {
            item.sizeselected = this.editObj.typeId === item.subparameterId;
        });

        this.editMenuitem.topping?.forEach((item: any) => {
            if (item.subparameterId === this.editObj.typeId) {
                item.list = this.getEditItemOptionList(item.list);
            }
        });
    }
}

export default MenuItemDetails;
