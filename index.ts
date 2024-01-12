import Checkout from './checkout';
import { ItemInterface } from './types';

const atv :ItemInterface = {
    sku: 'atv',
    name: 'Apple TV',
    price: 109.50
}
const vga :ItemInterface = {
    sku: 'vga',
    name: 'VGA adapter',
    price: 30
}
const mbp :ItemInterface = {
    sku: 'mbp',
    name: 'MacBook Pro',
    price: 1399.99
}
const ipd :ItemInterface = {
    sku: 'ipd',
    name: 'Super iPad',
    price: 549.99
}

//Two rules defined in constant, rules are flexible
const pricingRules = [
    {
        ruleId: '1',
        applicableProducts : ['ipd'], //Array of sku
    },
    {
        ruleId: '2',
        applicableProducts : ['atv'], //Array of sku
    }
];

const co = new Checkout(pricingRules);
co.scan(atv);
co.scan(atv);
co.scan(atv);
co.scan(vga);
co.total();