import { useState, useEffect } from 'react';

// const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const usePartsData = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/data/allParts.json`);
        const jsonData = await response.json();
        console.log('hook usePartsData loaded:', jsonData.length);
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching JSON:'+ 'base-path::  '+basePath, error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading };
};

export default usePartsData;
