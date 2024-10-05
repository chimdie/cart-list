import { initialState } from "./cart.context";
import { Cart, CartAction, CartItem } from "./cart.type";

export const cartReducer = (state: Cart, action: CartAction): Cart => {
	switch (action.type) {
		case "ADD_TO_CART": {
			const { product, quantity } = action.payload;

			const existingItem = state.items.find(
				(item) => item.product.id === product.id
			);

			let updatedItems: CartItem[];
			const updatedTotalItems = state.totalItems + quantity;
			const updatedTotalPrice = state.totalPrice + product.price * quantity;

			if (existingItem) {
				updatedItems = state.items.map((item) =>
					item.product.id === product.id
						? {
								...item,
								quantity: item.quantity + quantity,
								total: (item.quantity + quantity) * item.product.price,
						  }
						: item
				);
			} else {
				updatedItems = [
					...state.items,
					{
						product,
						quantity,
						total: product.price * quantity,
					},
				];
			}

			return {
				...state,
				items: updatedItems,
				totalPrice: updatedTotalPrice,
				totalItems: updatedTotalItems,
			};
		}

		case "REDUCE_QTY": {
			const { product, quantity } = action.payload;

			const updatedItems = state.items
				.map((item) =>
					item.product.id === product.id
						? {
								...item,
								quantity: item.quantity - quantity,
								total: (item.quantity - quantity) * item.product.price,
						  }
						: item
				)
				.filter((item) => item.quantity > 0);

			const updatedTotalItems = updatedItems.reduce(
				(total, item) => total + item.quantity,
				0
			);
			const updatedTotalPrice = updatedItems.reduce(
				(total, item) => total + item.total,
				0
			);

			console.log({ updatedTotalItems });

			return {
				...state,
				items: updatedItems,
				totalPrice: updatedTotalPrice,
				totalItems: updatedTotalItems,
			};
		}

		case "REMOVE_ITEM": {
			const { product } = action.payload;

			const updatedItems = state.items.filter(
				(item) => item.product.id !== product.id
			);

			const updatedTotalItems = updatedItems.reduce(
				(total, item) => total + item.quantity,
				0
			);
			const updatedTotalPrice = updatedItems.reduce(
				(total, item) => total + item.total,
				0
			);

			return {
				...state,
				items: updatedItems,
				totalPrice: updatedTotalPrice,
				totalItems: updatedTotalItems,
			};
		}

		case "RESET": {
			return { ...initialState };
		}

		default:
			return state;
	}
};
