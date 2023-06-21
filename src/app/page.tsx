import GradientAndTexts from "@/components/InitialPage/Gradient"
import ImageInitialSection from "@/components/InitialPage/ImageInitialSection"
import ContosPreview from "@/components/InitialPage/contosPreview"
import NewsletterSection from "@/components/InitialPage/newsLetterSection"
import { metadata } from "./layout"

// metadata.title = 'UVC | Home'

export default function Home() {
  return (
    <>
    <div className=" relative">
      <GradientAndTexts />
    <ImageInitialSection />
    </div>
    <ContosPreview />
    <NewsletterSection />
    </>
  )
}
