import { useAithsh } from "@/components/AithshState";
import Subnav from "@/components/Subnav"
import Barcode from 'react-barcode';

export default function Aithsh(){

    const {aithsh,resetAithsh} = useAithsh();
    const check = <>&#x2713;</>
    

    return (
        <>
      <main className='aithsh'>
        <Subnav printbtn={true} aithshbtn={false} txt={`Προβολή Αίτησης`} />
        <div className='no-mobile no-print btn-aithsh-reset'>
            <button disabled={!aithsh.length} type="button" onClick={resetAithsh} >Καθαρισμός Αίτησης</button>
        </div>
      
        <div className='print'>
          <div className='print-title'>
            <h1>Αίτηση Μηχανογραφικώς Χορηγουμένων Υλικών</h1>
          </div> 
          <table className='t1'>
            <tbody>
            <tr><td>ΑΙΤΟΥΣΑ ΜΟΝΑΔΑ</td><td>ΜΟΝΑΔΑ ΜΕΣΩ</td><td>ΔΓΗ ΧΟΡΗΓΗΣΗΣ</td><td>ΔΓΗ ΔΕΣΜΕΥΣΗΣ</td></tr>  
            <tr><td></td><td>Η`&apos;`</td><td></td><td></td></tr>  
            <tr><td>ΧΟΡΗΓΟΥΣΑ ΜΟΝΑΔΑ</td><td>ΜΟΝΑΔΑ ΔΙΑ</td><td>ΚΩΔΙΚΑΣ ΔΓΗΣ</td><td>ΚΩΔΙΚΑΣ ΔΓΗΣ</td></tr>  
            <tr><td></td><td></td><td></td><td></td></tr>  
            </tbody>
          </table>       
          <table className='t2'>
          <thead>
            <tr>
              <th>ΚΩΔ ΕΝΤ</th>
              <th>ΑΡΙΘΜΟΣ ΟΝΟΜΑΣΤΙΚΟΥ</th>
              <th>P/N</th>
              <th>ΟΝΟΜΑΣΙΑ</th>
              <th>ΚΥΡΙΟ ΥΛΙΚΟ</th>
              <th>ΑΙΤ. ΠΟΣΟΤΗΤΑ</th>
              <th>ΤΑΥΤ ΕΝΤ</th>
              <th>ΜΜ</th>
              <th>ΑΙΤΙΟΛΟΓΙΑ</th>
              <th>ΠΡΟΤΕΡ.</th>
              <th>ΔΕΛΤΙΟ</th>
              <th>ΠΑΡΑΤΗΡΗΣΕΙΣ</th>
            </tr>
          </thead>
          {aithsh.length===0?<tbody>
            <tr><td colSpan='12'>Δεν έχουν καταχωρηθεί υλικά στην αίτηση</td></tr>
            
          </tbody>:
          <tbody>    
          {aithsh.map(x=>
            <tr key={x.ao}>
              <td> </td>
              <td>{x.ao?x.ao:x.pn}</td>
              <td>{x.ao?'':check} </td>
              <td>{x.per}</td>
              <td> </td>
              <td>{x.pos}</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              {/* <td> </td> */}
              <td><Barcode width={1} height={30} displayValue={false} value={`${x.ao?x.ao:x.pn}&#9;${x.pos}`} /> </td>
            </tr>
          )}
          </tbody>} 
          <tfoot>
            <tr>
            <td colSpan='3' rowSpan='3'>ΥΠΟΓΡΑΦΗ ΑΙΤΟΥΝΤΟΣ ΚΑΙ ΣΦΡΑΓΙΔΑ ΜΟΝΑΔΑΣ</td>
            <td colSpan='3' rowSpan='3'>ΕΓΚΡΙΝΟΝΤΟΣ ΤΗΝ ΑΙΤΗΣΗ ΚΑΙ ΟΙΚΕΙΑ ΣΦΡΑΓΙΔΑ</td>
            <td colSpan='3' rowSpan='3'>ΥΠΟΓΡΑΦΗ ΚΩΔΙΚΟΠΟΙΗΣΗΣ ΥΠΑΛΛΗΛΟΥ</td>
            <td colSpan='3' rowSpan='3'>Υποβάλλεται υπό τύπου αναφοράς με τη Φ.600.14/.................................................................</td>
            </tr>
          </tfoot>
          </table>
        </div>
      </main>
      
    </>
    )
}