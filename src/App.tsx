import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Docs from "./pages/Docs";
import HelpFAQ from "./pages/HelpFAQ";
import About from "./pages/About";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Cookies from "./pages/legal/Cookies";
import Dashboard from "./pages/app/Dashboard";
import Auditor from "./pages/app/Auditor";
import TokenDetail from "./pages/app/TokenDetail";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "@/i18n/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pricing/precinct" element={<Pricing />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/help/faq" element={<HelpFAQ />} />
              <Route path="/about" element={<About />} />
              <Route path="/legal/terms" element={<Terms />} />
              <Route path="/legal/privacy" element={<Privacy />} />
              <Route path="/legal/cookies" element={<Cookies />} />
              <Route path="/app/dashboard" element={<Dashboard />} />
              <Route path="/app/auditor" element={<Auditor />} />
              <Route path="/app/token/:id" element={<TokenDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
