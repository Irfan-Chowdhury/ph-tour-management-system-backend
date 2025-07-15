import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { UserRoutes } from "./app/modules/user/user.route";
import { router } from "./app/routes";
import { envVars } from "./config/env";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";


const app =  express();


app.use(express.json());
app.use(cors());

app.use("/api/v1", router);


app.get("/", (req:Request, res:Response) => {
    res.status(200).json({
        message : "Welcome to Tour Management System Backend"
    });
});


// 1st Approch
// app.use((error:any, req: Request, res: Response, next: NextFunction) => {    
//     res.status(500).json({
//         success:false,
//         message:`Something Went Wrong!! ${error.message}`,
//         error,
//         stack: envVars.NODE_ENV === "development" ? error.stack : null
//     })
// })

// 2nd Approch
app.use(globalErrorHandler);


export default app;

