import { useEffect, useState, useCallback } from "react";

const UseFetch = (url, options = {}) => {
  const [ipAddress, setIpAddress] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const response = await fetch(url, {
        ...options,
      });
      if (!response.ok) {
        throw new Error(`Error fetching data, status ${response.status}`);
      }
      const result = await response.json();
      setIpAddress(result);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setErr(error);
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ipAddress, loading, err, setIpAddress };
};

export default UseFetch;
