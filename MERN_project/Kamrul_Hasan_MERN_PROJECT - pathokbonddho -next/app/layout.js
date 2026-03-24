import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css/animate.min.css';
import { AuthProvider } from './providers/AuthProvider';
import { MenuProvider } from './providers/MenuProvider';
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'কামরুল হাসান',
  description: 'Kamrul Hasan - News Portal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body suppressHydrationWarning>
        <AuthProvider>
          <MenuProvider>
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
          </MenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
