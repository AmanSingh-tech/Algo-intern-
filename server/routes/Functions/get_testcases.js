import { PrismaClient } from "@prisma/client";
import { json } from "express";

const prisma=new PrismaClient;

const getTestCases=async (pid)=>{

    const response= await prisma.problem.findFirst({
        where:{
          id:pid
        },
        include:{
          testCases:true
        }
      })

      if(!response){
        return ({
            success:false,
            msg:"P_id does not exist or is in-valid"
        })
      }

      return ({
        success:true,
        testCases:response.testCases
      })

}

export default getTestCases;