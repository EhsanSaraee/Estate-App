import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import SearchFilters from '@/components/SearchFilters';
import Property from '@/components/Property';
import noresult from '@/assets/images/noresult.svg';

const Search = () => {
   const [searchFilters, setSearchFilters] = useState(false);
   const {
      query: { purpose },
   } = useRouter();

   return (
      <Box>
         <Flex
            cursor="pointer"
            bg="gray.100"
            borderColor="gray.200"
            borderBottom="1px"
            p="2"
            fontWeight="bold"
            fontSize="lg"
            justifyContent="center"
            alignItems="center"
            onClick={() => setSearchFilters((prev) => !prev)}
         >
            <Text>Search Properties By Filter</Text>
            <Icon paddingLeft="2" w="7" as={BsFilter} />
         </Flex>
         {searchFilters && <SearchFilters />}
         <Text fontSize="2xl" p="4" fontWeight="bold">
            Properties {purpose}
         </Text>
         <Flex flexWrap="wrap">
            {[].map((property) => (
               <Property key={property.id} {...property} />
            ))}
         </Flex>
         {![].length && (
            <Flex
               justifyContent="center"
               alignItems="center"
               flexDirection="column"
               marginTop="5"
               marginBottom="5"
            >
               <Image src={noresult} alt="no result" />
               <Text fontSize="2xl" marginTop="3">
                  No Results Found
               </Text>
            </Flex>
         )}
      </Box>
   );
};
export default Search;
