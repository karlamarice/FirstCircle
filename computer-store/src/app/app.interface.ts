export interface ItemInterface {
    sku: string;
    name: string;
    price: number;
    promo: PromosInterface;
}

export interface PromosInterface {
    type: string;
    title: string;
    sku: string;
    qty: number;
    qtyFree: number;
    discountedPrice: number;
    skuFree: string;
    titleFree: string;
}

export interface StoreInterface {
    items: ItemInterface[],
}

export interface CartItemInterface extends ItemInterface {
    qty: number;
}

export interface ScannedCartItemInterface extends CartItemInterface {
    total: number;
}

export interface DialogInterface {
    items: ItemInterface[],
    cart: CartItemInterface[]
}