"use client"
import '../../styles/components/nltSection.css'
export function NewsletterSection() {
    return (
        <section className='BGcolorMain'>
            <h1>SE INSCREVA</h1>
            <p>Fique por dentro das novidades do UVC! Inscreva-se em nossa Newsletter para receber informações exclusivas sobre lançamentos, eventos e muito mais. Junte-se à nossa comunidade e não perca nenhum detalhe dessa jornada fascinante!</p>
            <button className='BGcolorSec' onClick={() => alert('Nossa Newsletter está indisponível por tempo intederminado.')}>Inscreva-se Agora</button>
        </section>
    )
}