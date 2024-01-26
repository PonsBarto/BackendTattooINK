import { TokenData } from ".";

declare global {
   namespace Express {
      export interface Request {
         tokenData: TokenData;
      }
   }
}