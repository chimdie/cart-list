"use client";
import { useState } from "react";
import { CircleX } from "lucide-react";
import { Product, ProductCard } from "@/components/ProductCard";
import { useCartCxt } from "@/contexts/cart/cart.context";
import { EmptyCartIcon } from "./assets/Icons/EmptyCartIcon";
import { NeutralIcon } from "./assets/Icons/NeutralIcon";
import { currencyParser } from "@/lib/currencyParser";
import { CheckoutModal } from "@/components/CheckoutModal";
import products from "./data.json";

export default function Home() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const { cart, dispatch } = useCartCxt();

	const removeItem = ({ product }: { product: Product }) => {
		dispatch({
			type: "REMOVE_ITEM",
			payload: { product, quantity: 0 },
		});
	};

	const onClose = () => setIsModalOpen(false);

	return (
		<>
			<section className="flex flex-col xl:flex-row gap-12">
				<main className="flex flex-col space-y-4 md:space-y-10">
					<h1 className="text-2xl md:text-4xl font-bold leading-10">
						Desserts
					</h1>
					<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</section>
				</main>
				<aside className="bg-white p-6 flex flex-col space-y-4 rounded-lg h-fit flex-grow max-h-dvh- border-">
					<h2 className="text-lg md:text-2xl font-bold text-cart-red">
						Your Cart ({cart.totalItems})
					</h2>
					{cart.totalItems === 0 ? (
						<div className="flex flex-col items-center justify-center space-y-2 ease-linear transition-all duration-300">
							<EmptyCartIcon />
							<span className="">Your added items will appear here</span>
						</div>
					) : (
						<div className="flex flex-col space-y-4 ease-linear transition-all duration-300">
							{cart.items.map((item) => {
								return (
									<div
										key={item.product.id}
										className="flex items-center justify-between border-b pb-4 ease-linear transition-all duration-300"
									>
										<div className="flex flex-col space-y-1">
											<p className="text-sm font-semibold text-cart-rose-900">
												{item.product.name}
											</p>
											<div className="flex items-center space-x-3">
												<span className="text-sm font-semibold text-cart-red">
													{item.quantity}x
												</span>
												<span className="text-sm font-normal text-cart-rose-500">
													@{currencyParser(item.product.price)}
												</span>
												<span className="text-sm font-semibold text-cart-rose-500">
													{currencyParser(item.total)}
												</span>
											</div>
										</div>
										<button
											type="button"
											aria-label="remove-item"
											onClick={() => removeItem(item)}
											className="group transition-all duration-150 ease-linear rounded-full"
										>
											<CircleX
												size={20}
												className="text-cart-rose-300 group-hover:text-cart-rose-400"
											/>
										</button>
									</div>
								);
							})}

							<div className="flex items-center justify-between">
								<span className="text-xs md:text-sm font-normal text-cart-rose-900">
									Order Total
								</span>
								<span className="text-lg md:text-2xl font-bold text-cart-rose-900">
									{currencyParser(cart.totalPrice)}
								</span>
							</div>
							<div className="bg-cart-rose-50 px-6 py-3 flex items-center justify-center space-x-2 rounded-md">
								<NeutralIcon />
								<p className="text-sm text-cart-rose-900">
									This is a{" "}
									<span className="font-semibold">carbon-neutral</span> delivery
								</p>
							</div>
							<button
								type="button"
								aria-label="confirm-order"
								onClick={() => setIsModalOpen(true)}
								className="py-3 text-white bg-cart-red font-medium rounded-full outline-none focus:outline-none hover:bg-cart-rose-900 transition-all duration-300 ease-linear"
							>
								Confirm Order
							</button>
						</div>
					)}
				</aside>
			</section>

			<CheckoutModal
				onClose={onClose}
				open={isModalOpen}
				onClickOutside={!isModalOpen}
			/>
		</>
	);
}
