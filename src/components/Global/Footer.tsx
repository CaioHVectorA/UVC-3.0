"use client"
import Link from 'next/link'
import UVC from '../../../public/UVC.png'
export default function Footer() {

    return (
        <footer>
            <img src={UVC.src} />
            <ul>
                <Link href={'#'} onClick={() => alert('Essa página ainda está em desenvolvimento.')}><li className='footerItem'>Perguntas Frequentes</li></Link>
                <Link href={'#'} onClick={() => alert('Essa página ainda está em desenvolvimento.')}><li className='footerItem'>Saiba Mais</li></Link>
                <Link href={'#'} onClick={() => alert('Essa página ainda está em desenvolvimento.')}><li className='footerItem'>Sobre Nós</li></Link>
            </ul>
            <ul>
                <Link href={'#'} onClick={() => alert('Essa página ainda está em desenvolvimento.')}><li className='footerItem'>Contato</li>
</Link>                <Link href={'#'} onClick={() => alert('Essa página ainda está em desenvolvimento.')}><li className='footerItem'>Nos Apoie</li></Link>
                <Link href={'#'} onClick={() => alert('Essa página ainda está em desenvolvimento.')}><li className='footerItem'>Amazon</li>
</Link>            </ul>
        </footer>
    )
}