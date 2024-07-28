import Link from "next/link"
import { usePathname, useSearchParams }  from "next/navigation"
import { useAithsh } from "./AithshState"


export function Listnsn({antka}){

    const {aithsh,handleAithsh}=useAithsh();
    // console.log(aithsh)
// Θα φαίνεται η αίτηση στο μενού κύριο, οπότε τραβάω το path μεχρι το κύριο!
    const pathName = usePathname();
    const regKyrio=/^\/(\w|-)+\/(\w|-)+\//;
    const kyrioUrl = regKyrio.exec(pathName)[0];
    
    function handleChange(e){
        e.preventDefault()
        const currpart = {id:Number(e.target.getAttribute('id')),pos: Number(e.target.value), ao:e.target.getAttribute('partao'), pn:e.target.getAttribute('partpn'),per:e.target.getAttribute('partname')}
        // const oldait=aithsh.filter(x=>x.id !== currpart.id)        
        // const newait = [...oldait,currpart]
        handleAithsh(currpart.id,currpart.ao,currpart.pn,currpart.pos,currpart.per)
    }

    return (
    <div className="nsn">
        {/* <p>the path is {pathName}</p> */}
        {/* <p>the path of aithsh is {kyrioUrl}aithsh</p> */}
        <button className="no-mobile">
        <Link href={`${kyrioUrl}aithsh`}>Μετάβαση στην Αίτηση</Link>
        </button>
        {/* <p>τραβα τα ανταλλακτικά:</p> */}
        <form className="form-listnsn">
            <table>
                <thead>
                    <tr>
                        <th>Α/Α</th>
                        <th>Α/Ο</th>
                        <th>P/N</th>
                        <th>ΠΕΡΙΓΡΑΦΗ</th>
                        <th>ΠΛΗΘΟΣ</th>
                        <th className="no-mobile">ΑΙΤΟΥΜΕΝΗ ΠΟΣΟΤΗΤΑ</th>
                    </tr>  
                </thead>
                <tbody>
                    {antka.map( part => 
                    <tr key={part.id}>
                        <td className="aa">{part.ref_no}</td>
                        <td className="ao">{part.nsn?part.nsn:'Άνευ Α/Ο'}</td>
                        <td className="pn">{part.pn?part.pn:'-'}</td>
                        <td className="peri">{part.name}</td>
                        <td className="plithos">{part.quantity}</td>
                        <td className="posot no-mobile"><input id={part.id} onChange={handleChange} partname={part.name} partpn={part.pn} partao={part.nsn} type='number' value={`${aithsh.some(x=>x.id==part.id)?aithsh.find(x=>x.id==part.id).pos:0}`} min={0} max={part.quantity}/></td>
                    </tr>)}
                </tbody>
            </table>
        </form>
        {antka.length>20?
        <button className="no-mobile">
        <Link href={`${kyrioUrl}aithsh`}>Μετάβαση στην Αίτηση</Link>
        </button>:null}
    </div>)
}