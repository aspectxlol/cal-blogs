import { join } from "path";
import { StoreItem } from "./interfaces/StoreItem";

export const density: number = 5
export const postsDirectory = join(process.cwd(), "_posts");

export const StoreItems: StoreItem[] = [
  {
    id: 1,
    name: "Nothing",
    description: "anything and everything includes nothing",
    image: "/assets/products/nothing.jpg",
    price: 15000
  },
  {
    id: 2,
    name: "A Jar Of Nothing",
    description: "anything and everything includes nothing inside a jar (jar not included)",
    image: "/assets/products/nothing_jar.jpg",
    price: 25000
  },
  {
    id: 3,
    name: "A Box of Nothing",
    description: "anything and everything includes nothing inside a Box (Box Sold Seperately)",
    image: "/assets/products/nothing_box.jpg",
    price: 50000
  }
]