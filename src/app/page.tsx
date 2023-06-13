import GradientAndTexts from "@/components/InitialPage/Gradient"
import ImageInitialSection from "@/components/InitialPage/ImageInitialSection"
import ContosPreview from "@/components/InitialPage/contosPreview"


export default async function Home() {
  const Data = await fetch('https://uynngk-7000.csb.app')
  const jsonData = await Data.json() 
  return (
    <>
    <div className=" relative">
      <GradientAndTexts />
    <ImageInitialSection />
    </div>
    <ContosPreview />
    </>
  )
}
