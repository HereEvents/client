import React from 'react'
import styles from "./style.module.css"

function SplashScreen({setLoader}) {
    return (
        <div className={styles.main}>
                <img src={"/Frame 33508.svg"} alt="" className={!localStorage.secondTime?styles.logo:styles.logo2} />
            {!localStorage.secondTime?<>
                <span className={styles.textContainer}>
                    <p dir='rtl' className={styles.welcom}>
                        ברוכים הבאים ל- 
                        <b> קורה פה!</b>
                    </p>
                    <p className={styles.text}>
                        אפליקציית האירועים וההופעות של בנימין
                    </p>
                    <br />
                    <p className={styles.text}>
                        כאן תוכלו לחפש למצוא ולהירשם לכל אירוע
                        שקורה ברחבי בנימין,{<br/>}
                        ואפילו לפרסם אירועים משלכם!
                    </p>
                </span>
                <div className={styles.continueButton}>
                    <u onClick={()=>{setLoader(false);localStorage.secondTime = true}}>
                להמשיך
                    </u>
                </div>
            </>:null}
        </div>
    )
}

export default SplashScreen