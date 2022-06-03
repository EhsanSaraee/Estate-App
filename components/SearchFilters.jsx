// files & components
import { baseUrl, fetchApi } from '@/utils/fetchApi';
import { filterData, getFilterValues } from '@/utils/filterData';
import noresult from '@/assets/images/noresult.svg';
// packages
import {
   Box,
   Button,
   Flex,
   Icon,
   Input,
   Select,
   Spinner,
   Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import Image from 'next/image';

const SearchFilters = () => {
   // states
   const [filters] = useState(filterData);
   const [searchTerm, setSearchTerm] = useState('');
   const [locationData, setLocationData] = useState();
   const [showLocations, setShowLocations] = useState(false);
   const [loading, setLoading] = useState(false);

   // router
   const router = useRouter();
   const { query, pathname } = router;

   // fetch data
   const searchProperties = (filterValues) => {
      const values = getFilterValues(filterValues);

      for (const { value, name } of values) {
         if (value && filterValues?.[name]) {
            query[name] = value;
         }
      }

      router.push({ pathname, query });
   };

   // fetch locations
   useEffect(() => {
      if (searchTerm) {
         const fetchData = async () => {
            setLoading(true);
            const data = await fetchApi(
               `${baseUrl}/auto-complete?query=${searchTerm}`
            );
            setLoading(false);
            setLocationData(data?.hits);
         };

         fetchData();
      }
   }, [searchTerm]);

   // clear search
   const handleLocations = (name) => {
      searchProperties({ locationExternalIDs: location.externalID });
      setShowLocations(false);
      setSearchTerm(name);
   };

   return (
      <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
         {filters?.map((filter) => (
            <Box key={filter.queryName}>
               <Select
                  placeholder={filter.placeholder}
                  w="fit-content"
                  p="2"
                  onChange={(event) =>
                     searchProperties({
                        [filter.queryName]: event.target.value,
                     })
                  }
               >
                  {filter?.items?.map(({ name, value }) => (
                     <option value={value} key={value}>
                        {name}
                     </option>
                  ))}
               </Select>
            </Box>
         ))}
         <Flex flexDir="column">
            <Button
               onClick={() => setShowLocations(!showLocations)}
               border="1px"
               borderColor="gray.200"
               marginTop="2"
            >
               Search Location
            </Button>
            {showLocations && (
               <Flex flexDir="column" pos="relative" paddingTop="2">
                  <Input
                     placeholder="Type Here"
                     value={searchTerm}
                     w="300px"
                     focusBorderColor="gray.300"
                     onChange={(event) => setSearchTerm(event.target.value)}
                  />
                  {searchTerm && (
                     <Icon
                        as={MdCancel}
                        pos="absolute"
                        cursor="pointer"
                        right="5"
                        top="5"
                        zIndex="100"
                        onClick={() => setSearchTerm('')}
                     />
                  )}
                  {loading && <Spinner margin="auto" marginTop="3" />}
                  {showLocations && (
                     <Box height="300px" overflow="auto">
                        {locationData?.map(({ id, name }) => (
                           <Box key={id} onClick={() => handleLocations(name)}>
                              <Text
                                 cursor="pointer"
                                 bg="gray.200"
                                 p="2"
                                 borderBottom="1px"
                                 borderColor="gray.100"
                              >
                                 {name}
                              </Text>
                           </Box>
                        ))}
                        {!loading && !locationData?.length && (
                           <Flex
                              justifyContent="center"
                              alignItems="center"
                              flexDir="column"
                              marginTop="5"
                              marginBottom="5"
                           >
                              <Image src={noresult} alt="no result" />
                              <Text fontSize="xl" marginTop="3">
                                 Waiting to search!
                              </Text>
                           </Flex>
                        )}
                     </Box>
                  )}
               </Flex>
            )}
         </Flex>
      </Flex>
   );
};
export default SearchFilters;
