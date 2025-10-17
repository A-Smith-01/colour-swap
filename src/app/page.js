import Link from "next/link"
import { redirect } from 'next/navigation'

export default function Home(){
    redirect('/productPage')
    return (<>
        <Link href="/colourConfig">Colour config</Link>
        <Link href="/productPage">Product page</Link>
    </>)
}