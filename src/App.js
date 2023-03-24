import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense, useState, useEffect } from "react";
import { WagmiConfig,} from 'wagmi'
import "./App.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/Theme";
import Loading from "./pages/Loading";
import { useDispatch } from "react-redux";
import { checkWalletConnection } from "./API/WalletConnection/useWalletConnection";
import { useAccount } from 'wagmi'
import { client } from './wagmiClient';
import ClientName from "./pages/ClientName";

const MainMenu = lazy(() => import("./pages/MainMenu"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Client = lazy(() => import("./pages/Client"));
const Connection = lazy(() => import("./pages/Connection"));



function App() {
  const { address, isConnected } = useAccount()
  const dispatch = useDispatch()
  const [urlName, setUrlName] = useState('/')


  useEffect(() => {
    if(isConnected){
      dispatch({ type: 'CHECK_WALLET_CONNECTION', payload: address })
    }
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Suspense fallback={<Loading></Loading>}>
        <WagmiConfig client={client}>
          <Box h='100vh'>
            <Router>
              <Routes>
                <Route exact path="/connection" element={<Connection urlName={urlName} />} />
                <Route exact path="/" element={<MainMenu setUrlName={setUrlName} />} />
                <Route exact path="/client/*" element={<Client />} />
                <Route exact path="/client/settings" element={<ClientName />} />
                <Route exact path="/*" element={<NotFound />} />
              </Routes>
            </Router>
          </Box>
        </WagmiConfig>
      </Suspense>
    </ChakraProvider>
  );
}

export default App;
