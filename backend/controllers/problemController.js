import Problem from "../models/Problem.js";
import User from '../models/User.js'

export const createProblem = async (request, response) => {
    const { title, description, location, images, severity, state,district,wardNumber} = request.body;

    try {
        const problem = new Problem({
            user_id: request._id,
            title,
            description,
            location,
            images,
            severity,
            state,
            district,
            wardNumber,
            status: 'pending'
        });

        await problem.save();
        response.status(201).json({ message: 'Problem reported successfully', problem,success : true,erroe : false });
    } catch (error) {
        response.status(500).json({ message: error.message,success: false,error:true });
    }

}
export const getProblem = async (request, response) => {
    
    try {
        const problemData = await Problem.find({user_id:request.params.id})
        response.status(201).json({ message: 'Problem reported successfully', problemData : problemData,success : true,erroe : false });
    } catch (error) {
        response.status(500).json({ message: error.message,success: false,error:true });
    }

}
export const deleteProblem = async (request, response) => {
    
    try {
        const problemData = await Problem.findByIdAndDelete(request.params.id)
        response.status(201).json({ message: 'Problem reported successfully', problemData : problemData,success : true,erroe : false });
    } catch (error) {
        response.status(500).json({ message: error.message,success: false,error:true });
    }

}

export const representativeProblem = async (request, response) => {
    
    try {
        const RepData = await User.findById(request.params.id)
        response.status(201).json({ message: 'Problem reported successfully', RepData : RepData,success : true,erroe : false });
    } catch (error) {
        response.status(500).json({ message: error.message,success: false,error:true });
    }

}
export const problemUnderRep = async (request, response) => {
    // const { state, district, wardNumber } = request.query;
    
    try {
        const user = await User.findById(request.params.id);

        const {state,district,wardNumber} = user;

        const AllProblem = await Problem.find({state,district,wardNumber})
        response.status(200).json({ 
            message: 'Problem reported successfully', 
            AllProblemData: AllProblem, 
            success: true, 
            error: false ,
        });
        
    } catch (error) {
        // If an error occurs, return a 500 status code and the error message
        response.status(500).json({
            message: error.message,
            success: false,
            error: true
        });
    }
};
export const getProblemData = async (request, response) => {
    
    try {

        const problemData = await Problem.findById(request.params.id)
        response.status(200).json({ 
            message: 'Problem reported successfully', 
            data : problemData,
            success: true, 
            error: false 
        });
        
    } catch (error) {
        // If an error occurs, return a 500 status code and the error message
        response.status(500).json({
            message: error.message,
            success: false,
            error: true
        });
    }
};
export const updateStatus = async (request, response) => {
    
    try {
        const {status,assignTo_id} = request.body

        const problemData = await Problem.findById(request.params.id)
        const updatedata = {status,assignTo_id }
        const UPdatedData = await Problem.updateOne(problemData,updatedata)
        response.status(200).json({ 
            message: 'Problem reported successfully', 
            updatedata: UPdatedData, 
            data : problemData,
            success: true, 
            error: false 
        });
        
    } catch (error) {
        // If an error occurs, return a 500 status code and the error message
        response.status(500).json({
            message: error.message,
            success: false,
            error: true
        });
    }
};
export const updateIsSolved = async (request, response) => {
    
    try {
        const {isSolved} = request.body

        const problemData = await Problem.findById(request.params.id)
        const updatedata = {isSolved }
        const UPdatedData = await Problem.updateOne(problemData,updatedata)
        response.status(200).json({ 
            message: 'Problem reported successfully', 
            updatedata: UPdatedData, 
            data : problemData,
            success: true, 
            error: false 
        });
        
    } catch (error) {
        // If an error occurs, return a 500 status code and the error message
        response.status(500).json({
            message: error.message,
            success: false,
            error: true
        });
    }
};
