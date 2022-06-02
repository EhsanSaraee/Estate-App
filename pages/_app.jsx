import Layout from '@/layouts/Layout';
import { ChakraProvider } from '@chakra-ui/react';

const MyApp = ({ Component, pageProps }) => {
   return (
      <ChakraProvider>
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </ChakraProvider>
   );
};

export default MyApp;
