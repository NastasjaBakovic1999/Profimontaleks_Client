import { ProductType } from "./productType";

export class Product{
    id: number;
    weight: number;
    height: number;
    length: number;
    glassTickness: number;
    type: ProductType;
    productTypeId: number;
}