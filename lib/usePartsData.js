import { useState, useEffect } from 'react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const usePartsData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${basePath}/data/allParts.json`);
        const jsonData = await response.json();
        console.log('hook usePartsData loaded:', jsonData.length);
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching JSON:'+ 'base-path::  '+basePath, error);
      }
    };

    fetchData();
  }, []);

  return data;
};

export default usePartsData;
