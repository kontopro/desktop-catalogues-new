import { useRouter } from "next/router"

export default function Backbutton(){

    const router = useRouter();

    return(
        <div className='left-sub-nav'>
            <button type="button" onClick={() => router.back()}>&#8678;</button>
        </div>
    )
}