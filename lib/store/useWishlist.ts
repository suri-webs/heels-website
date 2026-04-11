import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface WishlistStore {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToWishlist: (item) => {
        const exists = get().items.find((i) => i._id === item._id);
        if (!exists) {
          set({ items: [...get().items, item] });
        }
      },
      removeFromWishlist: (id) => {
        set({ items: get().items.filter((i) => i._id !== id) });
      },
      toggleWishlist: (item) => {
        const exists = get().items.find((i) => i._id === item._id);
        if (exists) {
          get().removeFromWishlist(item._id);
        } else {
          get().addToWishlist(item);
        }
      },
      isInWishlist: (id) => {
        return !!get().items.find((i) => i._id === id);
      },
    }),
    {
      name: "luxe-heels-wishlist",
    }
  )
);
