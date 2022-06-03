import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import { Box } from '@chakra-ui/react';
import { baseUrl, fetchApi } from '@/utils/fetchApi';
import ImageScrollbar from '@/components/ImageScrollbar';

const PropertyDetails = ({
   propertyDetails: {
      price,
      rentFrequency,
      rooms,
      baths,
      title,
      area,
      agency,
      isVerified,
      description,
      type,
      purpose,
      furnishingStatus,
      amenities,
      photos,
   },
}) => (
   <Box maxWidth="1000px" p="4" margin="auto">
      {photos && <ImageScrollbar data={photos} />}
   </Box>
);

export const getServerSideProps = async ({ params: { id } }) => {
   const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

   return {
      props: {
         propertyDetails: data,
      },
   };
};
