export class Product {
  constructor(
    public _id: number,
    public title: string,
    public price: number,
    public category: string,
    public description: string,
    public image: string,
    public rating: { rate: number; count: number }
  ) {}
}
export type CartItem = Product & {
  quantity: number;
};
