const ruleTypes = {
    DISCOUNT: 1,    //Flat discount on min purchase
    BUY_MORE_PAY_LESS: 2 //Pay price of x - 1 quantity on purchase of x qty
}

const rules :any = {
    '1' : {
        TYPE: ruleTypes.DISCOUNT,
        PRICE_DISCOUNT: 50,
        MIN_QTY: 4
    },
    '2': {
        TYPE: ruleTypes.BUY_MORE_PAY_LESS,
        PRICE_DISCOUNT_OF_PRODUCT: 1,
        APPLICABLE_ON_QTY: 3
    }
};

export {
    ruleTypes, rules
} 