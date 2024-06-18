import { StoreItem } from "@/interfaces/StoreItem";
import Image from "next/image";

export default function StoreItemPreview({ Item }: {Item: StoreItem}) {
  return (
    <a href={`/store/${Item.id}`} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl ">
        <Image className="object-contain w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={Item.image} alt={Item.name} width={1300} height={600} />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{Item.name}</h5>
          <p className="mb-3 font-normal ">{Item.description}</p>
          <p className="mb-3 font-normal ">{Item.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
          <button className="mb-3 font-normal hover:bg-green-400 rounded transition-all hover:-translate-y-2 hover:shadow-lg bg-green-400 sm:bg-white">Add to Cart</button>
        </div>
    </a>
  )
}