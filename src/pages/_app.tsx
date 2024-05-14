// import "../styles/globals.css";
import { Web3, Theme } from "@/components";
import { Container } from "@mui/material";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>TTK dApp</title>
          <meta name="description" content="dApp project" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <main>
          <Web3>
            {/* <Navbar /> */}
            <Container>
              <Component {...pageProps} />
            </Container>
          </Web3>
        </main>
      </QueryClientProvider>
    </Theme>
  );
}
