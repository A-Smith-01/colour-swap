'use client'
import styles from "./page.module.css";
import { useState } from "react"
// import productImages from "./productImages";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams  } from 'next/navigation';
import shapes from "../shapes";

export default function ProductPage(){
    const searchParams = useSearchParams();
    const data = searchParams.get('id');
    const shape = shapes.find(s => s.id === data);
    return (
        <>
            <ProductShowcase productImages={shape.images}/>
            <SidePannel shape={shape}/>
        </>
    )
}

function ProductShowcase({productImages}){
    const [index, setIndex] = useState(0)

    function handleImageClick(newIndex){
        setIndex(newIndex)
    }

    function handleNavClick(delta){
        const newIndex = index + delta
        setIndex(newIndex)
    }

    return (
        <div className={styles.productShowcase}>
            <div className={styles.heroImage}>
                <div className={styles.imgContainer}>
                    <Image src={productImages[index]} alt="An image of the product" width={600} height={500}/>
                </div>
                <div className={styles.navArrows}>
                    <div className={`${styles.navArrow}`} style={{visibility: index == 0 ? "hidden" : "visible"}} onClick={() => {handleNavClick(-1)}}>{"<"}</div>
                    <div className={`${styles.navArrow}`} style={{visibility: index == 3 ? "hidden" : "visible"}} onClick={() => {handleNavClick(1)}}>{">"}</div>
                </div>
            </div>
            <div className={styles.imageRibbon}>
                {productImages.map((imageSrc, idx) => {
                    return (
                        <button key={idx} onClick={() => handleImageClick(idx)} className={`${styles.thumb} ${idx == index ? styles.selected : ""}`}>
                            <Image src={imageSrc} alt="An image of the product" width={120} height={100}/>
                        </button>
                    ) 
                })}
            </div>
        </div>
    )
}

function SidePannel({shape}){
    return (
        <div className={styles.details}>
            <h1>{shape.name}</h1>
            <p>{shape.description}</p>
            <Link href={{
                pathname: '/colourConfig',
                query: { id: shape.id }
            }}>
                <div className={styles.colourNav}>
                    <div>
                        <div className={styles.colourPreview}/>
                        <span>Egg White</span>
                    </div>
                    <span><b>{"Pick a colour >"}</b></span>
                </div>
            </Link>
            
        </div>
    )
}