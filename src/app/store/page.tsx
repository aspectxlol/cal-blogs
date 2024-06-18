import StoreItemPreview from "@/components/StoreItemPreview"
import { StoreItems } from "@/constants"
import { StoreItem } from "@/interfaces/StoreItem"

export default async function Store() {

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Suport Us!</h1>
      <div className="grid gap-4">
        {StoreItems.map((item) => <StoreItemPreview Item={item} key={item.id}/>)}
      </div>
    </main>
  ) 
}