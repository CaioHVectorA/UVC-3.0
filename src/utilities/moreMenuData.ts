type Link = {
    href: string
    name: string
}

type MoreMenu = {
    font: number
    links: Link[]
}

export const openHeaderMoreLinks: MoreMenu = {
    font: 16,
    links: [
        { href: '/personalizar', name: 'Personalizar' },
        // { href: '/amazon', name: 'Amazon' },
    ]
}

export const closedHeaderMoreLinks: MoreMenu = {
    font: 20,
    links: [
        // { href: '/saiba-mais', name: 'Saiba Mais' },
        { href: '/personalizar', name: 'Personalizar' },
        // { href: '/amazon', name: 'Amazon' },
    ]
}