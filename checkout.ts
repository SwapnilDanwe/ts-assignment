import {CheckoutInterface, ItemInterface, PricingRules} from './types';
import { rules, ruleTypes } from './pricing-rules';

class Checkout implements CheckoutInterface {
    private totalAmount :number
    private readonly cartItems :Map<string, {qty:number,price:number,total:number}>;
    private readonly pricingRules: Array<PricingRules>;

    constructor(pricingRules :Array<PricingRules>){
        this.pricingRules = pricingRules
        this.totalAmount = 0
        this.cartItems = new Map()
    }

    scan(item :ItemInterface) {
        //@ts-ignore
        const qty = this.cartItems.has(item.sku) ? this.cartItems.get(item.sku).qty + 1 : 1;
        this.cartItems.set(item.sku, {qty, price: item.price, total: 0 })
        this.updateFinalPrice()
    }

    updateFinalPrice(){
        let total = 0;
        this.cartItems.forEach((product, sku) => {
            let totalPriceOfProduct = (product.qty * product.price);
            let totalDiscount = 0;
            for (let i = 0; i < this.pricingRules.length; i++) {
                const thisRule = this.pricingRules[i];
                if(thisRule.applicableProducts.includes(sku)){
                    //Apply rule
                    const ruleConditions = rules[thisRule.ruleId]
                    if (ruleConditions.TYPE == ruleTypes.DISCOUNT && product.qty > ruleConditions.MIN_QTY) {                        
                        totalDiscount = product.qty * ruleConditions.PRICE_DISCOUNT;
                    }
                    else if(ruleConditions.TYPE == ruleTypes.BUY_MORE_PAY_LESS && product.qty >= ruleConditions.APPLICABLE_ON_QTY){
                        //@ts-ignore
                        let discountApplicableCount :number = parseInt(product.qty / ruleConditions.APPLICABLE_ON_QTY)
                        totalDiscount = product.price * ruleConditions.PRICE_DISCOUNT_OF_PRODUCT;
                    }
                }
            }
            //Final price calculation
            const finalPrice = (totalPriceOfProduct - totalDiscount);
            total += finalPrice;
            this.cartItems.set(sku, {qty: product.qty, price: product.price, total: finalPrice})
        })        
        this.totalAmount = total
    }

    total() :number{
        return this.totalAmount;
    }
}

export default Checkout