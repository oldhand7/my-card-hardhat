import CssBaseline from "@material-ui/core/CssBaseline";
import Minter from "./components/Minter";
import { Browser } from "./components/Browser";
import { QueryClient, QueryClientProvider } from "react-query";
// Create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Minter />
        <Browser />
      </QueryClientProvider>
    </>
  );
}
