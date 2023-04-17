import { ClerkProvider } from '@clerk/nextjs'
import '../styles/style.css';

const Layout = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default function App({ Component, pageProps }) {
  
  return (
  <ClerkProvider {...pageProps} >
    <Layout>

    <Component {...pageProps} />
    </Layout>
  </ClerkProvider>
  )
}