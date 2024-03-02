import { Box, Image, Button, Flex, useToast } from '@chakra-ui/react'

export function Products() {
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
            description: 'A way to start the day.',
            price: '5.99'
        }
    ];

    const toast = useToast()

    const addToCart = (index) => {
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
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-3" key={index}>
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