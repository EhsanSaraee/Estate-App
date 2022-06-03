import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text, Avatar } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import DefaultImage from '@/assets/images/house.jpg';

const Property = ({
   externalID,
   coverPhoto,
   price,
   rentFrequency,
   rooms,
   baths,
   title,
   area,
   agency,
   isVerified,
}) => {
   return (
      <Link href={`/property/${externalID}`} passHref>
         <Flex
            flexWrap="wrap"
            justifyContent="center"
            cursor="pointer"
            paddingTop="0"
            w="420px"
            p="5"
         >
            <Box>
               <Image
                  src={coverPhoto ? coverPhoto.url : DefaultImage}
                  alt={title}
                  width={400}
                  height={260}
                  placeholder="blur"
                  blurDataURL={coverPhoto.url}
               />
            </Box>
            <Box w="full">
               <Flex
                  paddingTop="2"
                  justifyContent="space-between"
                  alignItems="center"
               >
                  <Flex alignItems="center">
                     <Box paddingRight="3" color="green.400">
                        {isVerified && <GoVerified />}
                     </Box>
                     <Text fontSize="lg" fontWeight="bold">
                        AED {millify(price)}
                        {rentFrequency && `/${rentFrequency}`}
                     </Text>
                  </Flex>
                  <Box>
                     <Avatar size="sm" src={agency?.logo?.url} />
                  </Box>
               </Flex>
               <Flex
                  p="1"
                  justifyContent="space-between"
                  alignItems="center"
                  w="250px"
                  color="blue.400"
               >
                  {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{' '}
                  <BsGridFill />
               </Flex>
               <Text fontSize="lg">
                  {title.length > 30 ? `${title.substring(0, 30)}...` : title}
               </Text>
            </Box>
         </Flex>
      </Link>
   );
};

export default Property;
