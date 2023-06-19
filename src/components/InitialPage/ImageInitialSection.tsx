import { IMGS } from "@/utilities/envariables"
import '../../styles/components/ImageInitialSection.css'
import { useWindowDimensions } from '../../utilities/functions/useWindowDimensions'

function shuffleArray(arr: {src: string,class: string}[][]): {src: string,class: string}[][] {
for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
}
return arr;
}


export default function ImageInitialSection() {
    const images: { src: string,class: string }[] = [
        { src: IMGS.HADES, class: 'image' },
        { src: IMGS.PUNHO_MORTAL, class: 'image' },
        { src: IMGS.RRH, class: 'image' },
        { src: IMGS.GLACIAL, class: 'image' },
        { src: IMGS.MR_1, class: 'image' },
        { src: IMGS.GUARDIOES, class: 'image' },
        { src: IMGS.CIECON, class: 'image' },
        { src: IMGS.CONGREGADORES, class: 'image' }
]
function getArrayFound(): { src: string,class: string }[][] {
    const imagesCopy: { src: string,class: string }[] = [...images]
    let imagesArr: { src: string,class: string }[][] = []
    for (let index = 0; index < images.length / 2; index++) {
        const tempArray: { src: string,class: string }[] = []
        for (let index = 0; index < 2; index++) {
            const item: { src: string,class: string }  = imagesCopy.splice(Math.floor(Math.random() * imagesCopy.length),1)[0]
        tempArray.push(item)
    }
    imagesArr.push(tempArray)
    }
    imagesArr.push([{ src: IMGS.ARNER, class: 'image' }])
    return imagesArr
}

const longimg = {
    src: IMGS.ARNER,
    class: 'image-large'
}
const arrayGroups: { src: string,class: string }[][]  = shuffleArray(getArrayFound())
    return (
        <div className="mainContainer">
            {arrayGroups.map((imgArr,index) => (
                <>
                {imgArr[0].src === IMGS.ARNER ? 
                <div key={JSON.stringify(imgArr)} data-isarner='true'>
                    <img src={imgArr[0].src} className={imgArr[0].class} />
                </div>
                : 
                <div className="imgContainer" key={index}>
                {imgArr.map((img,index) => (
                    <div key={index} style={{display: 'flex'}}>
                    <img className={img.class} src={img.src}></img>
                    </div>
                ))}
                </div>}
                </>
            ))}
        </div>
    )
}