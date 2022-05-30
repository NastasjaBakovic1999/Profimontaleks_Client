import { Phase } from "./phase";
import { Product } from "./product";
import { ProductCardboardPhase } from "./productCardboardPhase";

export class ProductCardboard{
    pccNumber: number;
    productId: number;
    startDate: Date;
    endDate: Date;
    product: Product;
    phases: ProductCardboardPhase[];
}