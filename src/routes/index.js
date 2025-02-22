import LayoutDefault from "../Layout";
import Introduce from "../pages/Introduce";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import TopicQuestion from "../pages/TopicQuestion";
import Answers from "../pages/Answers";
import QuizResult from "../pages/QuizResult";
import Error404 from "../pages/Error404";
import PrivateRoute from "../pages/PrivateRoute";
import PublicRoute from "../pages/PublicRoute";
import Quiz from "../pages/Quiz";
import AI from "../pages/AI";

export const routes = [
    {
        path:"/",
        element: <LayoutDefault></LayoutDefault>,
        children:[
            {
                element:<PublicRoute></PublicRoute>,
                children:[
                    {
                        path:"/",
                        element:<Introduce></Introduce>
                    },
                    {
                        path:"/login",
                        element:<Login></Login>
                    },
                    {
                        path:"/register",
                        element:<Register></Register>
                    },
                ]
            },
            {
                element:<PrivateRoute></PrivateRoute>,
                children: [
                    {
                        path:"/home",
                        element:<Home></Home>
                    },
                    {
                        path:"/topic",
                        element:<TopicQuestion></TopicQuestion>  
                    },
                    {
                        path:"/answers",
                        element:<Answers></Answers>
                    },
                    {
                        path:"/AI",
                        element:<AI></AI>
                    },
                    {
                        path:"/quiz",
                        element:<Quiz></Quiz>,
                        children:[
                            {
                                path:":id"
                            }
                        ]
                    },
                    {
                        path:"/result/:id",
                        element:<QuizResult></QuizResult>
                    }
                ]
            }
        ],   
    },
    {
        path:"*",
        element:<Error404></Error404>
    }
];