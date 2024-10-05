import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ConfirmIcon } from "@/app/assets/Icons/ConfirmIcon";
import { useCartCxt } from "@/contexts/cart/cart.context";
import { emptyProduct } from "@/contexts/cart/cart.type";
import { currencyParser } from "@/lib/currencyParser";

type CheckoutModalT = {
	open: boolean;
	onKeyEsc?: boolean;
	onClose: () => void;
	onClickOutside?: boolean;
};

export const CheckoutModal = ({
	onClickOutside = true,
	onKeyEsc = true,
	onClose,
	open,
}: CheckoutModalT) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { cart, dispatch } = useCartCxt();

	useEffect(() => {
		const onKeyPress = (e: KeyboardEvent) => {
			if (onKeyEsc && open && e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKeyPress);

		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			window.removeEventListener("keydown", onKeyPress);
			document.body.style.overflow = "";
		};
	}, [onKeyEsc, onClose, open]);

	const onOverlayClick = (e: React.MouseEvent) => {
		if (
			containerRef.current &&
			!containerRef.current.contains(e.target as Node)
		) {
			onClose();
		}
	};

	const restartOrder = () => {
		dispatch({
			type: "RESET",
			payload: {
				product: emptyProduct,
				quantity: 0,
			},
		});
		onClose();
	};

	return (
		<>
			{open ? (
				<>
					<section
						className="opacity-50 fixed inset-0 z-40 bg-black"
						onClick={onClickOutside ? onOverlayClick : undefined}
						aria-label="modal-overlay"
						role="modal-overlay"
					></section>
					<div
						className="flex items-end md:items-center justify-center overflow-auto fixed inset-0 z-40 outline-none focus:outline-none transition-all duration-300 ease-in"
						ref={containerRef}
						aria-label="modal-container"
						role="dialog"
					>
						<section
							aria-label="modal-content"
							className="relative bg-white w-full mx-auto md:max-w-lg max-h-[calc(100vh_-150px)] overflow-scroll rounded-t-lg md:rounded-lg"
						>
							<section className="border-0 relative flex flex-col space-y-6 w-full outline-none focus:outline-none p-8">
								<section
									aria-label="modal-header"
									className="flex flex-col items-start space-y-4"
								>
									<ConfirmIcon />
									<div className="flex flex-col space-y-1">
										<h2 className="text-3xl font-bold text-cart-rose-900">
											Order Confirmed
										</h2>
										<span className="text-base font-medium text-cart-rose-500">
											We hope you enjoy your food!
										</span>
									</div>
								</section>

								<section
									aria-label="modal-body"
									className="flex flex-col space-y-4 transition-all relative flex-auto bg-cart-rose-50 rounded-lg p-6"
								>
									{cart.items.map((item) => {
										return (
											<div
												key={item.product.id}
												className="flex items-center justify-between transition-all pb-4 border-b border-cart-rose-100"
											>
												<div className="flex items-center space-x-3">
													<Image
														src={item.product.image.thumbnail}
														alt={item.product.name}
														width={50}
														height={50}
														className="rounded-md"
													/>
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
														</div>
													</div>
												</div>
												<span className="text-sm font-semibold text-cart-rose-900">
													{currencyParser(item.total)}
												</span>
											</div>
										);
									})}
									<div className="flex items-center justify-between">
										<span className="text-xs md:text-sm font-normal text-cart-rose-500">
											Order Total
										</span>
										<span className="text-lg md:text-2xl font-bold text-cart-rose-900">
											{currencyParser(cart.totalPrice)}
										</span>
									</div>
								</section>

								<button
									className="text-white bg-cart-red font-medium py-3 text-sm ease-linear transition-all duration-300 w-full rounded-full outline-none focus:outline-none hover:bg-cart-rose-900"
									type="button"
									aria-label="start-new-order"
									onClick={restartOrder}
								>
									Start New Order
								</button>
							</section>
						</section>
					</div>
				</>
			) : null}
		</>
	);
};
