import Link from "next/link";
import Image from "next/image";
import { basePath } from '@/next.config';
import { supabase } from "@/lib/supabaseClient"
import Subnav from "@/components/Subnav"

export default function Category( { category, subcategories, kyria } ) {
    
    return  <main className='main'>
                
                <Subnav printbtn={false} aithshbtn={false} txt={`${kyria.length?
                                                                                `${subcategories.length?`Προβολή Υποκατηγοριών και Κυρίων Υλικών`:`Προβολή Κυρίων Υλικών`}`:
                                                                                `${subcategories.length?`Προβολή Υποκατηγοριών`:`Δεν έχουν προστεθεί Υποκατηγορίες / Κύρια Υλικά`}` }`
                                                                                } 
                                                                                />
                {kyria.length?                                                                                
                <div className='cards-wrapper'>{kyria.map(x => 
                  <div key={x.id} className="card">
                      <div className='card-image'>
                                <p><Image src={`${basePath}/images/kyrio/${x.slug}/000.webp`} alt={`kyrio-yliko-${x.slug}`} width='400' height='200'/></p>
                              </div>
                              <div className='card-title'>                             
                                <p><Link href={`/${category.slug}/${x.slug}`}>{x.name}</Link></p>
                              </div>
                              <div className='card-desc'>
                                <p><Link href={`/${category.slug}/${x.slug}`}><button>Επιλογή</button></Link></p>
                              </div>
                  </div>)}
              </div>
                :<div className='cards-wrapper'>{subcategories.map(x => 
                    <div key={x.id} className="card">
                        <div className='card-image'>
                                  <p><Image src={`${basePath}/images/category/${x.slug}.webp`} alt={`subcategory-${x.slug}`} width='400' height='200'/></p>
                                </div>
                                <div className='card-title'>                             
                                  <p><Link href={`/${x.slug}`}>{x.name}</Link></p>
                                </div> 
                                <div className='card-desc'>
                                  <p><Link href={`/${x.slug}`}><button>Επιλογή</button></Link></p>
                                </div>
                    </div>)}
                </div>}                
            </main>
} 

export async function getStaticPaths(){

    // Βρίσκομαι στο url της κατηγορίας, άρα θέλω ως παράμετρο το slug όλων των κατηγοριών
    const {data: menus, error} = await supabase.from('category').select()

    const paths = menus.map((x) => ({
        params: {category: x.slug}
    }))

    return {paths, fallback: false}
}

export async function getStaticProps( { params } ){

    // Τσίμπα την κατηγορία από το slug, προκειμένου να εμφανίσω τις πληροφορίες της κατηγορίας στη σελίδα
    const {data: menu, error: err1} = await supabase.from('category').select().eq('slug',params.category)
    const category = menu[0]

    // Έλεγχος για sub-categories (όνομα και slug για το link)
    const {data: subcategories, error: err2} = await supabase.from('category').select().eq('parent_id',category.id)
   
    // Έλεγχος για κύρια υλικά της κατηγορίας (όνομα και slug για το link)
    const {data: kyria, error: err3} = await supabase.from('kyrio').select().eq('category_id',category.id)
    
    return {
        props: {category, subcategories, kyria}
    }
}