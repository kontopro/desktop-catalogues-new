import Image from 'next/image'
import { basePath } from '@/next.config';
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient';


export default function Home( { menus } ) {
  return (
    <main className='main'>
      
         <div className='cards-wrapper'>
         {menus.map(menu => <div key={menu.id} className="card">
                                <div className='card-image'>
                                  <p><Image src={`${basePath}/images/category/${menu.slug}.webp`} alt={`category-menu-${menu.name}`} width='400' height='200'/></p>

                                </div>
                                <div className='card-title'>                             
                                  <p><Link href={`/${menu.slug}`}>{menu.name}</Link></p>
                                </div>
                                <div className='card-desc'>
                                  <p><Link href={`/${menu.slug}`}><button>Επιλογή</button></Link></p>
                                </div>
                            </div>
          )
          }
          </div>
    </main>
  )
}

export async function getStaticProps()  {
  
  const { data: menu, error } = await supabase.from('category').select().is('parent_id',null);
  
  if (!menu) {
    return {props: {menus:'not categories'}}
  }
  return {
    props: {
      menus: menu,
    }
  }    
}


