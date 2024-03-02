import { ChakraProvider } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Root } from './Root';
import { Products } from './Products';
import { Cart } from './Cart';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children : [
            {
                path: "",
                element: <Products />
            },
            {
                path: "cart",
                element: <Cart />
            }
        ]
    },
]);

function App() {
    return (
        <ChakraProvider>
            <RouterProvider router={router}></RouterProvider>
        </ChakraProvider>
    );
}

export default App;
