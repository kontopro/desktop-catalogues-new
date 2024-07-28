import { useRouter } from "next/router"

export default function Printbutton(){

    

    return(
        <div className='right-sub-nav'>
            <button type="button" onClick={() => window.print()}>Εκτύπωση Αίτησης</button>
        </div>
    )
}