interface ItemInterface {
    sku: string,
    name: string,
    price: number
}

interface CheckoutInterface{
    scan(item :ItemInterface) :void;
    total() :number;
}

interface PricingRules {
    ruleId: string
    applicableProducts: Array<string>
}

export type {ItemInterface, CheckoutInterface, PricingRules}