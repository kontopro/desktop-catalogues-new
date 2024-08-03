import Image from 'next/image';
import { basePath } from '@/next.config';
import Subnav from "@/components/Subnav";
import { Listnsn } from "@/components/Listnsn";
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import path from 'path';
import fs from 'fs/promises';

export default function Tree({ parent_assemblies, catalogue, parts }) {
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
    console.log(curr);
    setSubassembly(curr);
    const curli = document.querySelectorAll("li");
    curli.forEach((x) => {
      x.classList.remove("checked");
    });
    e.target.classList.add("checked");
    return curr;
  }

  function toggleVisibility(e) {
    e.preventDefault();
    const parClicked = e.target.closest(".parent-container").classList.toggle("clicked");
    const subOpened = e.target.nextElementSibling.classList.toggle("opened");
    return parClicked, subOpened;
  }

  const myparts = parts.filter(x => x.assembly_assid === subassembly);

  return (
    <main className="main">
      <Subnav printbtn={false} aithshbtn={true} txt={`${catalogue[0].name}`} />
      <div>
        <div className='tree-container'>
          <div className="tree no-mobile">
            <h3>Λίστα Συγκροτημάτων</h3>
            {parent_assemblies.map(parent =>
              <div key={parent.id} id={parent.id} className='parent-container'>
                <p onClick={toggleVisibility}>&nbsp;&nbsp;&#8680;&nbsp;&nbsp;{parent.name}</p>
                <ul className='sub-container'>
                  {parent.assembly.map(child_assembly =>
                    <li key={child_assembly.id} assid={child_assembly.assid} onClick={handleClick} className='subassembly'>{child_assembly.name}</li>
                  )}
                </ul>
              </div>
            )}
          </div>
          <div className='imgnsn'>
            {subassembly === '' ? (
              <div className="no-sub no-mobile">
                <h4>Εμφάνιση Στοιχείων Υποσυγκροτήματος</h4>
                <p>Επιλέξτε Συγκρότημα και Υποσυγκρότημα από τη Λίστα Συγκροτημάτων, για να εμφανιστεί η αντίστοιχη εικόνα</p>
              </div>
            ) : (
              <>
                <div className="title">
                  <h3>Προβολή εικόνας και ανταλλακτικών<br /> του Υποσυγκροτήματος: {subassembly}</h3>
                </div>
                <div className="pic">
                  <p><Image width={780} height={500} alt={`photo-subassembly-${subassembly}`} src={`${basePath}/images/catalogue/${catalogue[0].slug}/${subassembly}.webp`} /></p>
                </div>
                <Listnsn antka={myparts} />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getStaticPaths() {
  // Load JSON data from file
  const filePath = path.join(process.cwd(), 'data', 'allParts.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const allParts = JSON.parse(jsonData);

  const paths = allParts.catalogues.map(catalogue => ({
    params: {
      category: catalogue.kyrio.category.slug,
      kyrio: catalogue.kyrio.slug,
      catalogue: catalogue.slug
    }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Load JSON data from file
  const filePath = path.join(process.cwd(), 'data', 'allParts.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const allParts = JSON.parse(jsonData);

  // Filter catalogue
  const catalogue = allParts.catalogues.filter(c => c.slug === params.catalogue);

  // Filter parent assemblies
  const parent_assemblies = allParts.assemblies
    .filter(assembly => assembly.catalogue_id === catalogue[0].id && assembly.parent_id === null)
    .map(parent => ({
      ...parent,
      assembly: allParts.assemblies.filter(child => child.parent_id === parent.id)
    }));

  // Filter parts based on the catalogue id
  const parts = allParts.parts.filter(part => part.catalogue_id === catalogue[0].id);

  return {
    props: {
      parent_assemblies,
      catalogue,
      parts
    }
  };
}
