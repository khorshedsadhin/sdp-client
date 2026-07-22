import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import { router } from './routes/Routes';
import AuthProvider from './providers/AuthProvider';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <div>
    <QueryClientProvider client={queryClient}>

      <AuthProvider>
        <RouterProvider router={router} />
			  <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      
    </QueryClientProvider>
  </div>,
)
