import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import getTestCases from '../Functions/get_testcases.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const route = Router();
const prisma = new PrismaClient();
const jwtpasskey = process.env.JWT_PASSKEY;

route.post('/run/:pid', async (req, res) => {
  const { code, language } = req.body;
  const { pid } = req.params;
    
  if (!pid || !code || !language) {
    return res.json({
      success: false,
      errorcode:1,
      msg: "Send All Parameters",
      err:"Send All Parameters"
    });
  }

  try {
    const problem = await getTestCases(pid)

    if (problem.success==false) {
      return res.json({
        success: false,
        errorcode:2,
        msg: "P_id does not exist or is in-valid",
        err:"P_id does not exist or is in-valid"
      });
    }

    const testCases = problem.testCases;

    for (let i = 0; i < testCases.length; i++) {
      const test = testCases[i];

      try {
        const response = await axios.post(`${process.env.COMPILER_PORT}/run`, {
          code,
          language,
          inputs: test.input,
          mode: "compiler",
        });

        if (!response.data.success) {
          return res.json({
            success: false,
            errorcode:3,
            msg: "Compilation Failed",
            err: response.data.error,
            failedTestCase: i,
            totalTestCases: testCases.length,
          });
        }

        if (response.data.verdict.trim() !== test.output.trim()) {
          return res.json({
            success: false,
            errorcode:4,
            msg: `Failed at Test Case ${i + 1}`,
            testcase:test.input,
            expected: test.output.trim() || "",
            received: response.data.verdict.trim() || "",
            failedTestCase: i + 1,
            totalTestCases: testCases.length,
          });
        }

      } catch (err) {
    
        return res.json({
          success: false,
          errorcode:5,
          msg: `Error while running test case ${i + 1}`,
          err: err.message,
        });
      }
    }

    // All test cases passed
    return res.json({
      success: true,
      msg: "All Test Cases Passed",
      totalTestCases: testCases.length,
    });

  } catch (error) {
    // console.error("Server error:", error);
    return res.status(500).json({
      success: false,
      errorcode:6,
      msg: "Internal Server Error",
      err: error.message,
    });
  }
});


// Submission Route
route.post('/submit/:pid',async (req,res)=>{

  const {pid}=req.params;
  const { usertoken , code , language }=req.body;

  if( !pid || !usertoken || !code || !language ){
    return res.json({
      success:false,
      msg:"Send All Data"
    })
  }




  try {


    const decode=jwt.verify(usertoken,jwtpasskey)
    
    if(!decode){
      return res.json({
        success:false,
        msg:"User Id Invalid"
      })
    }

    const uid=decode.id;

    const auth_user=await prisma.user.findFirst({
      where:{
        id:uid
      }
    })

    if(!auth_user){
      return res.json({
        success:false,
        msg:"USer Donot Exist"
      })
    }

    const auth_pid=await prisma.problem.findFirst({
      where:{
        id:pid
      }
    })

    if(!auth_pid){
      return res.json({
        success:false,
        msg:"Problem ID is invalid"
      })
    }

    const response=await prisma.solve.create({
      data:{
        success:true,
        code:code,
        language:language,
        problemId:pid,
        userId:uid
      }
    })

    if(!response){
      return res.json({
        success:false,
        msg:"Error Submitting"
      })
    }

    return res.json({
      success:true,
      msg:"Submission Successfull"
    })

  } catch (error) {
    return res.json({
      success:false,
      msg:error
    })
  }


})

export default route;
