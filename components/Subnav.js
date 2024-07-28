import Backbutton from "@/components/Backbutton";
import Aithshbutton from "@/components/Aithshbutton";
import Printbutton from "@/components/Printbutton";

export default function Subnav({txt,aithshbtn,printbtn}){

    
    return(
        <div className="sub-nav no-print" >
                  <Backbutton />
                  <div className='center-sub-nav'>{txt}</div>
                  <div className='right-sub-nav'>
                  {aithshbtn?<Aithshbutton />:null}
                  {printbtn?<Printbutton />:null}
                  </div>

                  
        </div>
    )
}