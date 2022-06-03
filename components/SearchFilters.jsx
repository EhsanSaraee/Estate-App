import { filterData, getFilterValues } from '@/utils/filterData';
import { Box, Flex, Select } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SearchFilters = () => {
   const [filters, setFilters] = useState(filterData);
   const router = useRouter();
   const { query, pathname } = router;

   const searchProperties = (filterValues) => {
      const values = getFilterValues(filterValues);

      for (const { value, name } of values) {
         if (value && filterValues?.[name]) {
            query[name] = value;
         }
      }

      router.push({ pathname, query });
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
      </Flex>
   );
};
export default SearchFilters;
