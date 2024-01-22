import app from "./app";
import { Request, Response } from "express";
import { AppDataSource } from "./database/data-source";


const port:number = 3000;

( async ()=>{
    try {
      await AppDataSource.initialize();
        console.log("================================================")
        console.log("     🔋Data Base has been initialized🔋");
    app.listen(port, () => {
        console.log(`      🚀Server running on port ${port}🚀`);
        console.log("================================================");
        });
          
    } catch (error) {
        console.error("🚫Error during Data Source initialization🚫", error);
        
    }
})();