import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

const Banner = ({
   purpose,
   title1,
   title2,
   desc1,
   desc2,
   buttonText,
   linkName,
   imageUrl,
}) => (
   <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
      <Image src={imageUrl} alt="banner" width={500} height={300} />
      <Box p="5">
         <Text color="gray.500" fontSize="sm" fontWeight="medium">
            {purpose}
         </Text>
         <Text color="gray.500" fontSize="3xl" fontWeight="bold">
            {title1}
            <br />
            {title2}
         </Text>
         <Text color="gray.700" fontSize="lg" paddingTop="3" paddingBottom="3">
            {desc1}
            <br />
            {desc2}
         </Text>
         <Button fontSize="xl">
            <Link href={linkName}>{buttonText}</Link>
         </Button>
      </Box>
   </Flex>
);

const Home = () => {
   return (
      <>
         <Banner
            purpose="RENT A HOME"
            title1="Rental Homes for"
            title2="Everyone"
            desc1="Explore Apartments"
            desc2="and more"
            buttonText="Explore Renting"
            linkName="/search?purpose=for-rent"
            imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
         />
      </>
   );
};

export default Home;
