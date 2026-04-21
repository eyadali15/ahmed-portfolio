import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from './App';
import Home from '@/pages/Home';
import Work from '@/pages/Work';
import ProjectDetail from '@/pages/ProjectDetail';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

// Admin Pages
import AdminLayout from '@/components/layout/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProjects from '@/pages/admin/AdminProjects';
import AdminPages from '@/pages/admin/AdminPages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'work', element: <Work /> },
      { path: 'work/:slug', element: <ProjectDetail /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  {
    path: '/admin',
    element: (
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'projects', element: <AdminProjects /> },
      { path: 'pages', element: <AdminPages /> },
      { path: 'settings', element: <div className="p-8">System Settings 🚧</div> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
