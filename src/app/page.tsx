import GradientAndTexts from "@/components/InitialPage/Gradient"
import ImageInitialSection from "@/components/InitialPage/ImageInitialSection"
import ContosPreview from "@/components/InitialPage/contosPreview"
import NewsletterSection from "@/components/InitialPage/newsLetterSection"
import { Metadata } from "next";
// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: "UVC",
//     description: " Bem-vindo ao Universo de contos UVC, onde a magia da narrativa ganha vida. Explore um repositório de contos cativantes em diversos gêneros. Nossa missão é levar você a aventuras emocionantes, romances apaixonantes e muito mais. Comece sua jornada literária conosco. Descubra o que o UVC tem reservado para você!",
//   };
// }
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
