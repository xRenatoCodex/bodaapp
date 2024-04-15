'use client'

import styles from "@/app/page.module.css";
import HeartIcon from '@/app/ui/hearticon'


export default function () {

    return (

        <main className={styles.main}>

            <div style={{ height: 164, width: 164, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <HeartIcon height={84} />
            </div>

        </main>
    )
}