import { createContext, useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_MY_API_KEY;

export const ApiContext = createContext();

const IpAddressProvider = ({ children }) => {
  const [newIpAddress, setNewIpAddress] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const fetchIpAddress = async () => {
    setLoading(true);
    setErr(null);

    let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress`;
    if (newIpAddress) {
      url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${newIpAddress}`;
    }
    console.log(url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching data, status ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setErr(error.message);
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIpAddress();
  }, []);

  useEffect(() => {
    fetchIpAddress();
  }, [newIpAddress]);

  const values = {
    newIpAddress,
    setNewIpAddress,
    data,
    loading,
    err,
    fetchIpAddress,
  };

  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
};

export default IpAddressProvider;
