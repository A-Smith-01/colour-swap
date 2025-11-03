'use client'
import { useState } from "react"
import useOutsideClick from "@/utils/useOutsideClick"
import styles from "../_styles/header.module.css"
import Link from "next/link";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useOutsideClick(() => {
        setIsOpen(false);
    });

    function toggleMenu() {
        setIsOpen(!isOpen);
    }
    return (
        <header ref={ref} className={styles.header}>
            <h1 className={styles.title}>Forms</h1>
            <button onClick={toggleMenu} className={`${styles.dropdownbutton} ${isOpen ? styles.selected : ""}`}>Shapes & More</button>
            <div className={`${styles.dropdown} ${isOpen ? '' : `hidden`}`}>
                <Link href="/productSelection" className={styles.dropdownItem} onClick={toggleMenu}>Shapes</Link>
            </div>
        </header>
    )
}