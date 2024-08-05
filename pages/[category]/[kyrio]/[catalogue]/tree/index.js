import Image from 'next/image'
import { basePath } from '@/next.config';
import Subnav from "@/components/Subnav"
import { Listnsn } from "@/components/Listnsn";
import { supabase } from "@/lib/supabaseClient"
import { useState, useEffect } from 'react';
import { useRouter } from "next/router"


export default function Tree( { parent_assemblies, catalogue, parts } ) {

    const [subassembly, setSubassembly] = useState('');
    const router = useRouter();

    useEffect(() => {
      const queryAssid = router.query.assid;
      if (queryAssid) {
          setSubassembly(queryAssid);
  
          document.querySelectorAll('.subassembly').forEach(el => {
              el.classList.remove('checked');
          });
  
          const elementToCheck = document.querySelector(`li[assid='${queryAssid}']`);
          if (elementToCheck) {
              elementToCheck.classList.add('checked');
  
              const parentContainer = elementToCheck.closest('.parent-container');
              if (parentContainer) {
                  parentContainer.classList.toggle('clicked');
                  const subContainer = parentContainer.querySelector('.sub-container');
                  if (subContainer) {
                      subContainer.classList.toggle('opened');
                  }
              }
          }
      }
  }, [router.query.assid]); 


    
    function handleClick(e) {
              e.preventDefault();
              const curr = e.target.getAttribute('assid');
              console.log(curr)              
              setSubassembly(curr);
              const curli = document.querySelectorAll("li");
              curli.forEach((x) => {
                x.classList.remove("checked");
              });
              e.target.classList.add("checked");
              return curr
            }

    function toggleVisibility(e) {
      e.preventDefault();   
      const parClicked= e.target.closest(".parent-container").classList.toggle("clicked");
      const subOpened= e.target.nextElementSibling.classList.toggle("opened");
      return parClicked,subOpened;
    }

    const myparts = parts.filter(x => x.assembly_assid == subassembly)

    return (
      <main className="main">
      <Subnav printbtn={false} aithshbtn={true} txt={`${catalogue[0].name}`} />
        <div>
          {/* <p>You are in Tree directory</p> */}
          {/* <p>I now test the tree module</p> */}
          <div className='tree-container'>
            <div className="tree no-mobile">
              <h3>Λίστα Συγκροτημάτων</h3>
              {parent_assemblies.map(parent => 
                <div key={parent.id} id={parent.id} className='parent-container'>
                    
                    <p onClick={toggleVisibility}>&nbsp;&nbsp;&#8680;&nbsp;&nbsp;{parent.name}</p>
                    <ul className='sub-container'>
                        {parent.assembly.map(child_assembly => 
                          <li key={child_assembly.id} assid = {child_assembly.assid} onClick={handleClick} className='subassembly'>{child_assembly.name}</li>
                        )}
                    </ul>
                </div>
              )}
            </div>
            <div className='imgnsn'>
              {subassembly==''?<>
              <div className="no-sub no-mobile"><h4>Εμφάνιση Στοιχείων Υποσυγκροτήματος</h4><p>Επιλέξτε Συγκρότημα και Υποσυγκρότημα από τη Λίστα Συγκροτημάτων, για να εμφανιστεί η αντίστοιχη εικόνα</p></div>
              </>:
              <>
              <div className="title"><h3>Προβολή εικόνας και ανταλλακτικών<br/> του Υποσυγκροτήματος: {subassembly}</h3></div>
              <div className="pic"><p> <Image width={780} height={500} alt={`photo-subassembly-${subassembly}`} src={`${basePath}/images/catalogue/${catalogue[0].slug}/${subassembly}.webp`} /></p></div>
              <Listnsn antka = {myparts} />
              </>}
            </div>
            
        </div>
        </div>
      </main>
    )
  }

export async function getStaticPaths(){
    
    // inner join ώστε να κουμπώσει κάθε κύριο με την κατηγορία του και τους καταλόγους του για το paths
    const {data: catalogues, error} = await supabase.from('catalogue').select('slug,kyrio:kyrio_id (slug,category:category_id (slug) )')
    
    const paths = catalogues.map(x => ({params: {category: x.kyrio.category.slug, kyrio: x.kyrio.slug, catalogue: x.slug}}))
    return {paths, fallback: false}
}

export async function getStaticProps( { params } )  {
  
    // Θέλω τον κατάλογο για να βρω συγκροτήματα, υπο-συγκροτήματα και ΑΟ
    const {data: catalogue, error1} = await supabase.from('catalogue').select('id,name,slug').eq('slug',params.catalogue)
  
    // Από τον κατάλογο, βρες τα συγκροτήματα με εμφωλευμένα τα υπο-συγκροτήματα, ώστε να έχουν δενδρική μορφή
    const {data: parent_assemblies, error2} = await supabase.from('assembly').select('id,name,caption,assembly (id,assid,name,caption)').eq('catalogue_id',catalogue[0].id).is('parent_id',null).order('assid')
    
    // Από τον κατάλογο, βρες μόνο τα υπο-συγκροτήματα για να βρούμε τους ΑΟ
    // const {data: parts, error4} = await supabase.from('part').select('id,name,nsn,pn,quantity,aid,ref_no,picture_no,assembly (id,assid)').in('assembly_id',sub_assemblies.map(x => x.id)).order('aid')
    const {data: parts, error4} = await supabase.rpc('get_parts_from_catalogue', {cat_id: catalogue[0].id})
    return {
      props: {
        parent_assemblies,
        catalogue,
        parts

      }
    }    
  } 
