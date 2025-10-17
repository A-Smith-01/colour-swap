import Link from "next/link"

export default function Home(){
    return (<>
        <Link href="/colourConfig">Colour config</Link>
        <Link href="/productPage">Product page</Link>
    </>)
}