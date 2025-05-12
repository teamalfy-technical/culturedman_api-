import { PageLayout } from "@/components/page-layout"
import Image from "next/image"

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-black">About Us</h1>
        <div className="max-w-6xl mx-auto text-center mb-12 text-black">
          <p className="mb-6 text-center">
            The Cultured Man is a luxury menswear brand that epitomizes elegance and sophistication through bespoke tailoring infused with African influences. 
            Our mission is to empower the modern gentleman with confidence and style by blending traditional craftsmanship with contemporary design. 
            Our commitment to quality is evident in every stitch, ensuring that our clients not only wear a suit but experience the art of tailored elegance. 
            In addition to our signature suits, we offer a curated selection of accessories infused with African artistry. From neckties and bowties to cufflinks and socks, each piece is designed to complement our suits while reflecting the rich cultural heritage of Africa. 
            Our accessories serve as the perfect finishing touch, allowing our clients to express their individuality and connection to their roots.
          </p>
        </div>

        <div className="relative w-full inset-0 bg-black/80 bg-left-bottom flex items-center justify-center rounded-md max-w-4xl mx-auto h-[500px] bg-[url(/images/about-bg.png)] object-cover">
          {/* <div className="absolute inset-0 object-cover flex items-center justify-center rounded-md"> */}
            <div className="bg-black/60 flex items-center justify-center p-16 mt-auto mb-10 backdrop-blur-xs">
              <h5 className="text-white text-md md:text-2xl font-bold text-center px-4">
                GOOD OUTFITS BOOST YOUR CONFIDENCES
              </h5>
            </div>
          {/* </div> */}
        </div>
      </div>
    </PageLayout>
  )
}
