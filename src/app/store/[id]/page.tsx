import { StoreItems } from "@/constants";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Item({ params }: Params) {
  const Item = StoreItems.find((item) => item.id === Number(params.id))

  if (!Item) return notFound()
  
  return (
    <div className="flex md:flex-row flex-col p-10">
      <Image
        className="object-contain w-full rounded-t-lg h-96 md:h-auto md:w-48"
        src={Item.image}
        alt={Item.name}
        width={1300}
        height={600}
      />
      <div className="mt-4 p-5">
        <h1 className="font-extrabold text-4xl">
          {Item.name}
        </h1>
        <p className="text-xl">{Item.description}</p>
        <p className="text-xl mt-4">{Item.price.toLocaleString('id-ID', { style: "currency", currency: "IDR" })}</p>

        <button className="w-full bg-green-500 rounded mt-5 hover:-translate-y-4 hover:shadow-lg transition-all">Add to Cart</button>
      </div>
    </div>
  )
}

type Params = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  return StoreItems.map((Item) => ({
    id: Item.id.toString(),
  }));
}