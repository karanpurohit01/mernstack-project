import {Box, Button} from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import Navbar from './component/Navbar';
import { Toaster, toaster } from "./components/ui/toaster";
import { useColorMode, useColorModeValue } from "./components/ui/color-mode";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100","gray.900")}>
      <Navbar/>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>

    // <>
    // <Button>Hello</Button>
    // </>
  );
}

export default App
