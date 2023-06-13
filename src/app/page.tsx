import GradientAndTexts from "@/components/Gradient"
import ImageInitialSection from "@/components/ImageInitialSection"


export default async function Home() {
  const Data = await fetch('https://uynngk-7000.csb.app')
  const jsonData = await Data.json() 
  return (
    <>
    <div className=" relative">
      <GradientAndTexts />
    <ImageInitialSection />    
    </div>
    </>
  )
}
