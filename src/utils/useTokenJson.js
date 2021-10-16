import { useQuery } from "react-query";
import axios from "axios";

const getTokenJson = async (tokenURI) => {
  const url = "https://gateway.pinata.cloud/ipfs/QmZutDuXLxV3FmJgaAkyEa1eBpgLLZvYeQZ6GERkK9ZXw6";
  console.log("url", url);
  console.log("tokenURI", tokenURI);
  const results = await axios.get(url);

  return results.data.data;
};

//react-query state management for the query above
export const useTokenJson = (tokenURI) => {
  return useQuery({
    queryKey: ["tokenJson", tokenURI],
    queryFn: () => getTokenJson(),
    //refetchInterval: 2000,
  });
}
