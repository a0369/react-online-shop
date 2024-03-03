import { useContext } from 'react';
import { Box, Image, Button, Flex, useToast } from '@chakra-ui/react'

import { OnlineShop } from './App';

export function Products() {
    const {cartData, setCartData, products} = useContext(OnlineShop);

    const toast = useToast()

    /*
    *   Adds an item to the card based on index
    */
    const addToCart = (index) => {
        let findProduct = cartData.find((el) => (el.id === products[index].id));
        if (findProduct !== undefined) {
            setCartData(cartData => cartData.map(item => {
                if (item.id === products[index].id) {
                    item.qty++;
                }

                return item;
            }));
        } else {
            setCartData(cartData => [...cartData, {
                id: products[index].id,
                qty: 1
            }]);
        }

        toast({
            description: products[index].title + " added to Cart!",
            status: 'success',
            isClosable: true
        })
    }

    return (
        <div className="container">
            <h1>Products</h1>
            <div className="row">
                {products.map((item, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-3" key={item.id}>
                        <Box maxW='100%' borderWidth='1px' borderRadius='lg' overflow='hidden' h='100%'>
                            <Flex flexDirection='column' h='100%' justify='space-between'>
                                <Box>
                                    <Image src={item.imgSrc} alt={item.imgAlt} boxSize='150px' objectFit='cover' ml='auto' mr='auto' />

                                    <Box p='6' pb='0'>
                                        <h2>{item.title}</h2>
                                        <p>{item.description}</p>
                                        <p>${item.price}</p>
                                    </Box>
                                </Box>

                                <Box p='6' pt='0'>
                                    <Button colorScheme='blue' onClick={() => addToCart(index)}>Add to Cart</Button>
                                </Box>
                            </Flex>
                        </Box>
                    </div>
                ))}
            </div>
        </div>
    )
}