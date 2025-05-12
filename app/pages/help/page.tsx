import { PageLayout } from "@/components/page-layout"
import Image from "next/image"

export default function HelpPage() {
  return (
    <PageLayout>
      <div className="container">
        <div className="flex justify-center">
          <div className="relative w-full m-0 p-0 max-w-md aspect-square">
            <Image
              src="/images/Help-bg.png"
              alt="Customer service representative"
              fill
              className="object-scale-down m-0 p-0"
            />
          </div>
        </div>
        <h1 className="md:text-4xl font-bold text-center mb-4 mt-4 md:-mt-12 text-black text-2xl text-bolder pt-0">Are You Facing Any Problem ?</h1>
        <p className="text-lg text-black text-center capitalize">
        need help with anything ?, go to contact page and leave as a message
        </p>
        <p className="text-lg text-black text-center capitalize">we will get back to you asap !</p>
      </div>
    </PageLayout> 
  )
}
