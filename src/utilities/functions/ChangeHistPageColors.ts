interface HTMLStyleElement extends HTMLElement {
    style: CSSStyleDeclaration;
}

export default function ChangeHistPageColors(DOM: HTMLStyleElement[] | any, darkMode: boolean) {
    // if (darkMode) {
    //     for (const element of DOM) {
    //         console.log(element.style.color)
    //         element.style.color = "#000"
    //         console.log(element.style.color)
    //     }
    // } else {
    //     for (const element of DOM) {
    //         element.style.color = "#fff"
    //     }
    // }
    const elements = document.querySelectorAll('*');

    elements.forEach((element: any) => {
        element.style.color = "#000";
    });
}