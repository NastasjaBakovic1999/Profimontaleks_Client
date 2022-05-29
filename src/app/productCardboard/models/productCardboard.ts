import { Phase } from "./phase";
import { Product } from "./product";

export class ProductCardboard{
    pCCNumber: number;
    productId: number;
    startDate: Date;
    endDate: Date;
    product: Product;
    phases: Phase[];
}