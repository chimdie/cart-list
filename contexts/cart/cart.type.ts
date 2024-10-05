import { Product } from "@/components/ProductCard";

export type ACTIONS = "ADD_TO_CART" | "REDUCE_QTY" | "REMOVE_ITEM" | "RESET";

export type CartItem = {
	quantity: number;
	product: Product;
	total: number;
};

export type Cart = {
	items: CartItem[];
	totalPrice: number;
	totalItems: number;
};

export type CartAction = {
	type: ACTIONS;
	payload: { product: Product; quantity: number };
};

export const emptyProduct = {
	id: "",
	name: "",
	price: 0,
	category: "",
	image: {
		thumbnail: "",
		mobile: "",
		tablet: "",
		desktop: "",
	},
};
