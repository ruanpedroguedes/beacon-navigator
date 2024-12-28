import adminRoutes from './adminRoutes';
import teacherRoutes from './teacherRoutes';
import studentRoutes from './studentRoutes';

const allRoutes = [
  ...adminRoutes,
  ...teacherRoutes,
  ...studentRoutes,
];

export default allRoutes;