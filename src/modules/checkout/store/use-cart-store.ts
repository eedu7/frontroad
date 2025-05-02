import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TenantCard {
    productsId: string[];
}

interface CartState {
    tenantCarts: Record<string, TenantCard>;
    addProduct: (tenantSlug: string, productId: string) => void;
    removeProduct: (tenantSlug: string, productId: string) => void;
    clearCart: (tenantSlug: string) => void;
    clearAllCarts: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            tenantCarts: {},
            addProduct: (tenantSlug, productId) =>
                set((state) => ({
                    tenantCarts: {
                        ...state.tenantCarts,
                        [tenantSlug]: {
                            productsId: [...(state.tenantCarts[tenantSlug]?.productsId || []), productId],
                        },
                    },
                })),
            removeProduct: (tenantSlug, productId) =>
                set((state) => ({
                    tenantCarts: {
                        ...state.tenantCarts,
                        [tenantSlug]: {
                            productsId:
                                state.tenantCarts[tenantSlug]?.productsId.filter((id) => id !== productId) || [],
                        },
                    },
                })),

            clearCart: (tenantSlug) =>
                set((state) => ({
                    tenantCarts: {
                        ...state.tenantCarts,
                        [tenantSlug]: {
                            productsId: [],
                        },
                    },
                })),
            clearAllCarts: () => set({ tenantCarts: {} }),
        }),
        {
            name: "frontroad-cart",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
