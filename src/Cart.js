import { useContext, useMemo } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    HStack,
    Box,
    Image,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
    Card,
    CardBody,
    Heading,
    Flex,
    Spacer,
    FormControl,
    FormLabel,
    Select
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom'

import { OnlineShop } from './App';
import { AltNumInput } from './AltNumInput';

export function Cart() {
    const {cartData, setCartData, products} = useContext(OnlineShop);
    const { isOpen, onOpen, onClose } = useDisclosure()

    /*
    *   Retrieve the cart information
    */
    const retrieveCartInfo = useMemo(() => {
        let cartInfo = [];

        cartData.forEach((item) => {
            let productInfo = products.find((el) => (el.id === item.id));

            cartInfo.push({
                id : productInfo.id,
                title: productInfo.title,
                imgSrc: productInfo.imgSrc,
                imgAlt: productInfo.imgAlt,
                qty: item.qty,
                price: productInfo.price
            });
        });

        return cartInfo;
    }, [cartData, products]);

    /*
    *   Retrieve the total cost
    */
    const getCost = useMemo(() => {
        let ret = {
            subtotal : 0.00,
            shipping : 0.00,
            total : 0.00
        };

        cartData.forEach((item) => {
            let productInfo = products.find((el) => (el.id === item.id));

            ret.subtotal += parseFloat(productInfo.price) * item.qty; 
        });

        ret.total += (parseFloat(ret.shipping) + ret.subtotal);

        return ret;
    }, [cartData, products])

    /*
    *   Change the Quantity of an item
    *   @param id - id of the product
    *   @param newQty - updated quantity of a product
    */
    const qtyChanged = (id, newQty) => {
        setCartData(cartData.map((item) => {
            if (item.id === id) {
                item.qty = newQty;
            }

            return item;
        }));
    }

    return (
        <div className="container">
            <h1>Cart</h1>

            <div className='row'>
                <div className='col-md-8'>
                    <TableContainer className='mt-3'>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th w="50%">Product</Th>
                                    <Th w="30%" className="d-none d-lg-table-cell">Quantity</Th>
                                    <Th w="10%" isNumeric>Price</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                            {
                                (cartData.length > 0) ?
                                retrieveCartInfo.map((item) => (
                                    <Tr key={item.id}>
                                        <Td>
                                            <HStack spacing='15px'>
                                                <Box w='64px'>
                                                    <Image src={item.imgSrc} alt={item.imgAlt} boxSize='64px' objectFit='cover' ml='auto' mr='auto' />
                                                </Box>
                                                <Box>
                                                    <p className='mb-1'><strong>{item.title}</strong></p>
                                                    <p>${item.price} <Text as="span" color='gray.600' fontSize='sm'>/ each</Text></p>

                                                    <Box mb={5} className='d-block d-lg-none'>
                                                        <AltNumInput value={item.qty}
                                                            valChanged={(newVal) => qtyChanged(item.id, newVal)} />
                                                    </Box>

                                                    <p>
                                                        <Button colorScheme='red' size='xs' variant='outline' onClick={onOpen}>
                                                            Remove
                                                        </Button>
                                                    </p>
                                                </Box>
                                            </HStack>
                                            
                                        </Td>
                                        <Td className='text-center d-none d-lg-table-cell'>
                                            <AltNumInput value={item.qty} valChanged={(newVal) => qtyChanged(item.id, newVal)} />
                                        </Td>
                                        <Td isNumeric>${(item.price * item.qty).toFixed(2)}</Td>
                                    </Tr>
                                ))
                                :
                                <Tr>
                                    <Td colSpan="3" className="text-center">
                                        <Text>
                                            <em>(Cart is empty)</em>
                                        </Text>
                                        <Button colorScheme='blue' as={ReactRouterLink} to='/'>
                                            Start Shopping
                                        </Button>
                                    </Td>
                                </Tr>
                                
                            }
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>
                <div className='col-md-4'>
                    <Card mb={5}>
                        <CardBody>
                            <Heading size='md' mb={4}>Shipping</Heading>
                            <FormControl>
                                <FormLabel>Shipping Options</FormLabel>
                                <Select defaultValue='standard'>
                                    <option value='express'>Express (Overnight)</option>
                                    <option value='standard'>Standard (3 - 5 days)</option>
                                </Select>
                            </FormControl>
                        </CardBody>
                    </Card>
                    <Card mb={5}>
                        <CardBody>
                            <Heading size='md' mb={4}>Summary</Heading>
                            <Flex>
                                <Text>Subtotal:</Text>
                                <Spacer />
                                <Text>${(getCost.subtotal).toFixed(2)}</Text>
                            </Flex>
                            <Flex>
                                <Text>Shipping:</Text>
                                <Spacer />
                                <Text>${(getCost.shipping).toFixed(2)}</Text>
                            </Flex>
                            <Flex>
                                <Text>Total:</Text>
                                <Spacer />
                                <Text>${(getCost.total).toFixed(2)}</Text>
                            </Flex>
                        </CardBody>
                    </Card>

                    <Button colorScheme='blue' w='100%' isDisabled={(cartData.length < 1)}>Check Out</Button>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Remove Item</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Are you sure you want to remove this item?</p>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                        Yes
                        </Button>
                        <Button variant='ghost' onClick={onClose}>No</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    );
}