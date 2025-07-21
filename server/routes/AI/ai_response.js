import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import google_gemini_response from '../Functions/google_gemini_ai.js';
import google_gemini_gethint from '../Functions/google_gemini_gethiints.js';

const route = Router();
const Prisma = new PrismaClient();

route.post('/find_error', async (req, res) => {
  const { code, pid } = req.body;

  
  if (!code || !pid) {
    return res.json({
      success: false,
      msg: "Send All Data",
    });
  }

  try {
    const problemdesc = await Prisma.problem.findFirst({
      where: {
        id: pid,
      },
      select: {
        description: true,
      },
    });

    // check if the problem was not found
    if (!problemdesc) {
      return res.json({
        success: false,
        msg: "Problem not found for given pid",
      });
    }

    // console.log(problemdesc.description);

    const response = await google_gemini_response(code, problemdesc.description);

    res.json({
      success: true,
      res: response,
    });
  } catch (error) {
    // console.error(error); //debugging
    res.json({
      success: false,
      msg: "Internal Server Error",
      error: error.message, 
    });
  }
});

route.post('/gethint',async (req,res)=>{

    const { pid }=req.body;

  
  if (!pid) {
    return res.json({
      success: false,
      msg: "Send All Data",
    });
  }




  try {
    const problemdesc = await Prisma.problem.findFirst({
      where: {
        id: pid,
      },
      select: {
        description: true,
      },
    });

    // check if the problem was not found
    if (!problemdesc) {
      return res.json({
        success: false,
        msg: "Problem not found for given pid",
      });
    }

    // console.log(problemdesc.description);

    const response = await google_gemini_gethint(problemdesc.description);

    res.json({
      success: true,
      res: response,
    });
  } catch (error) {
    // console.error(error); //debugging
    res.json({
      success: false,
      msg: "Internal Server Error",
      error: error.message, 
    });
  }

})

export default route;
