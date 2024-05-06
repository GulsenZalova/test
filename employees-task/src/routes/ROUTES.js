import AdminRoot from "../Pages/Admin/AdminRoot";
import EmployeeDetail from "../Pages/Main/EmployeeDetail";
import Employees from "../Pages/Main/Employees";
import AdminEmployees from "../Pages/Admin/Employees";
import Favorites from "../Pages/Main/Favorites";
import Home from "../Pages/Main/Home";
import MainRoot from "../Pages/Main/MainRoot";
import AddEmployee from "../Pages/Admin/AddEmployee";
import EditEmployee from "../Pages/Admin/EditEmployee";
import NotFound from "../Pages/Main/NotFound";


export const ROUTES = [
    {
        path: '/',
        element: <MainRoot/>,
        children: [
            {
                path:'',
                element: <Home></Home>

            },
            {
                path:'employees',
                element: <Employees></Employees>

            },
            {
                path:'favorites',
                element: <Favorites></Favorites>

            },
            {
                path: 'employees/:id',
                element: <EmployeeDetail/>
            },
            {
                path: '*',
                element: <NotFound/>
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminRoot/>,
        children: [
            {
                path: '',
                element: <AdminEmployees/>
            },
            {
                path: 'add-employee',
                element: <AddEmployee/>
            },
            {
                path: 'employees/edit/:id',
                element: <EditEmployee/>
            },

        ]
    }
]