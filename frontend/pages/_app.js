import ReactQuery from "@/Providers/ReactQuery";
import ReduxToolkit from "@/Providers/ReduxToolkit";
import DesktopSidebar from "@/components/Sidebar/DesktopSidebar";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <main>
      <ThemeProvider attribute="class" defaultTheme="light">
        <ReactQuery>
          <ReduxToolkit>
            <DesktopSidebar>
              <Toaster />
              <Component {...pageProps} />
            </DesktopSidebar>
          </ReduxToolkit>
        </ReactQuery>
      </ThemeProvider>
    </main>
  );
}
