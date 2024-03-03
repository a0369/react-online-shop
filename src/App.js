import { createContext, useState } from 'react';

import { ChakraProvider } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
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

export const OnlineShop = createContext();

function App() {
    // Create a mock products array
    const products = [
        {
            id: 1,
            imgSrc: 'https://i5.walmartimages.com/seo/Fresh-Gala-Apple-Each_f46d4fa7-6108-4450-a610-cc95a1ca28c5_3.38c2c5b2f003a0aafa618f3b4dc3cbbd.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
            imgAlt: 'Apples',
            title: 'Apples',
            description: 'An apple a day keeps the doctor away, or at least that\'s what they say.',
            price: '4.99'
        }, {
            id: 2,
            imgSrc: 'https://i5.walmartimages.com/asr/3bbb1151-d69a-43fb-b132-47e0bc066307.1f28c1acf3df725a6a39ba4c8738e025.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
            imgAlt: 'Bananas',
            title: 'Bananas',
            description: 'Good to increase potassium.',
            price: '3.99'
        }, {
            id: 3,
            imgSrc: 'https://media.istockphoto.com/id/182466618/photo/fruit-ring-breakfast-cereal.jpg?s=1024x1024&w=is&k=20&c=Vz2edH1jpzkT1-GGNsQAITk1XjU4HWhTZuRzp1KcXW8=',
            imgAlt: 'Cereal',
            title: 'Cereal',
            description: 'A great way to start the day.',
            price: '5.99'
        }
    ];

    // Initialize cartData to empty on load
    const [cartData, setCartData] = useState([]);

    return (
        <ChakraProvider>
            <OnlineShop.Provider value={{cartData, setCartData, products}}>
                <RouterProvider router={router}></RouterProvider>
            </OnlineShop.Provider>
        </ChakraProvider>
    );
}

export default App;
