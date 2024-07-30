import { useState, useEffect  } from 'react';
import Link from 'next/link'

import Subnav from '@/components/Subnav';
import usePartsData from '@/lib/usePartsData';


export default function Search() {

    const [search, setSearch] = useState('')
    const { data, isLoading } = usePartsData();

    const handleChange = (event) => {
    event.preventDefault();
    const curr = event.target.value;
    setSearch(curr);
  }

  useEffect(() => {
    if (data) {
      console.log('Data in Search Component, number of items:', data.length);
    }
  }, [data]);

    return (
    <main className='main'>
          <Subnav printbtn={false} aithshbtn={false} txt={`Αναζήτηση`} /> 
         <div className='search-wrapper'>
          <div className='search-title'>
          <p>Αναζητήστε Αριθμό Ονομαστικού ή Part Number</p>
          </div>
         <form className='search-form'>
         {isLoading ? 
          <p>Φόρτωση δεδομένων...</p>
         :
          <input type='text' onChange={handleChange} placeholder='Πληκτρολογείστε τουλάχιστον 5 χαρακτήρες' name='ao'/>
         }
        </form>
          </div>
          <div className="form-listnsn">
          {search.length>4? 
                <table>
                <thead>
                    <tr>
                        <th>Α/Ο</th>
                        <th>P/N</th>
                        <th>ΠΕΡΙΓΡΑΦΗ</th>
                        <th>ΚΥΡΙΟ ΥΛΙΚΟ</th>
                        <th>ΚΑΤΑΛΟΓΟΣ</th>
                        <th>ΥΠΟΣΥΓΚΡΟΤΗΜΑ</th>
                    </tr>
                </thead>
                <tbody>
                {data.filter(y => y.part_nsn && y.part_pn?y.part_nsn.includes(search) || y.part_pn.includes(search):y.part_nsn?y.part_nsn.includes(search):y.part_pn?y.part_pn.includes(search):0).map(x => <tr key={x.part_id}>
                  <td>{x.part_nsn}</td>
                  <td>{x.part_pn}</td>                
                  <td>{x.part_name}</td>
                  <td>{x.kyrio_name}</td>
                  <td>{x.catalogue_name}</td>
                  <td>
                    <Link href={`${x.category_slug}/${x.kyrio_slug}/${x.catalogue_slug}/tree/?assid=${x.assembly_assid}`}>{x.part_picture_no} &#8618;</Link>
                  </td>
                  </tr>)}
                </tbody>
                </table>
:''}
        </div>
    </main>
  )
}