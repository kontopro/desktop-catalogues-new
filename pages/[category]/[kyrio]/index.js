import Link from "next/link";
import Image from "next/image";
import { basePath } from '@/next.config';
import { supabase } from "@/lib/supabaseClient"
import Subnav from "@/components/Subnav"

export default function Kyrio( { category, kyrio, ecats } ) {
    
    return  <main className='main'>
                <Subnav printbtn={false} aithshbtn={true} txt={`Διαθέσιμοι Ηλεκτρονικοί Κατάλογοι για το ΚΥ: ${kyrio.name}`} />                
                <div className='cards-wrapper'>{ecats.map(x => <div key={x.id} className="card">
                                <div className='card-image'>
                                  <p><Image src={`${basePath}/images/catalogue/${x.slug}/000.webp`} alt={`catalogue-${x.slug}`} width='400' height='200'/></p>
                                </div>
                                <div className='card-title'>                             
                                  <p className="no-mobile"><Link href={`/${category}/${kyrio.slug}/${x.slug}/tree`}>{x.name}</Link></p>
                                  <p className="no-desktop"><Link href={`/${category}/${kyrio.slug}/${x.slug}`}>{x.name}</Link></p>
                                </div>
                                <div className='card-desc'>
                                  <p className="no-mobile"><Link href={`/${category}/${kyrio.slug}/${x.slug}/tree`}><button>Επιλογή</button></Link></p>
                                  <p className="no-desktop"><Link href={`/${category}/${kyrio.slug}/${x.slug}`}><button>Επιλογή</button></Link></p>
                                </div>
                                </div>)}
                </div>
            </main>
} 

export async function getStaticPaths(){

    // Εφόσον στο υπόψη url φαίνονται κατηγορία και κύριο θέλω τα slug τους ως παραμέτρους του paths

    // inner join ώστε να κουμπώσει κάθε κύριο με την κατηγορία του
    const {data: kyria, error} = await supabase.from('kyrio').select('slug,category:category_id (slug)')

    // Δημιουργία παραμέτρων
    const paths = kyria.map((x) => ({
        params: {kyrio: x.slug, category: x.category.slug}
    }))

    return {paths, fallback: false}
}

export async function getStaticProps( { params } ){

    // Για τις πληροφορίες του Κυρίου Υλικού επιστρέφω όλο το kyrio
    // Για το link προς κάθε κατάλογο απαιτείται να επιστρέψω τα slug της κατηγορίας και όνομα - slug για κάθε κατάλογο

    // Τσίμπα το slug της Κατηγορίας 
    const category = params.category

    // Τσίμπα όλο το Κύριο Υλικό από το slug (χρειάζομαι id για ανεύρεση καταλόγων, όνομα για εμφάνιση και slug για το link)
    const {data: kyria, error: err2} = await supabase.from('kyrio').select().eq('slug',params.kyrio)
    const kyrio = kyria[0]
    
    // Έλεγχος για διαθέσιμους ηλεκτρονικούς καταλόγους του Κυρίου Υλικού
    const {data: ecats, error: err3} = await supabase.from('catalogue').select().eq('kyrio_id',kyrio.id)    
    
    return {
        props: {category, kyrio, ecats}
    }
}