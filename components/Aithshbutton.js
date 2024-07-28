import { useRouter } from "next/router"
import { usePathname }  from "next/navigation"
import { useAithsh } from "@/components/AithshState";

export default function Aithshbutton(){

    
    const router = useRouter();
    const pathName = usePathname();
    const slashCount = (pathName.match(/\//g) || []).length;
    const regKyrio=/^\/(\w|-)+\/(\w|-)+\//;
    const kyrioUrl = slashCount===2?pathName:regKyrio.exec(pathName)[0];
    const {aithsh}=useAithsh();
    const todisable= aithsh.length<1;

    return(
        <div className='right-sub-nav no-mobile'>
            <button disabled={todisable} type="button" onClick={() => router.push(`${kyrioUrl}aithsh`)} >Προβολή Αίτησης</button>
        </div>
    )
}