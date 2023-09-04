import { useState, useEffect } from "react";
import axios from "axios";
import {RAPID_API_KEY} from '@env';

const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint,method,headers,body) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: method,
    headers: headers,
    body: body
  };

  const fetchData = async () => {
    setLoading(true)
    try {
        const response = await fetch(`http://localhost:8080/api/${endpoint}`,options);
        setData(response.data.data);
        setLoading(false);
    } catch (error) {
        setError(error)
        alert('There is an error fetching data')
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setLoading(true)
    fetchData();
  }

  return {data, loading, error}

}

export default useFetch;