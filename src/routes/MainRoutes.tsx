import { lazy } from 'react';

// project import
import GuestGuard from 'utils/route-guard/GuestGuard';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';

// render - offers app
const GoMLOffers = Loadable(lazy(() => import('pages/goml-offers/index')));

// ==============================|| AUTH ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <GuestGuard>
          <CommonLayout />
        </GuestGuard>
      ),
      children: [
        {
          path: '',
          element: <GoMLOffers />
        }
      ]
    }
  ]
};

export default MainRoutes;
