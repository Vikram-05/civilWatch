import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    const { email, password, first_name, last_name, role, location,state,district,wardNumber } = req.body;

    try {
        const userExists = await User.findOne({ email })
        if (userExists) return res.status(400).json({ message: 'user already exist' })

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword,
            first_name,
            last_name,
            role,
            location,
            state,
            district,
            wardNumber
        })
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(201).json({
            message: 'User registered successfully',
            token: token,
            success : true,
            error:false
        });


    } catch (error) {
        console.log("Error in register")
        res.status(500).json({ message: error.message });
    }
}


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password',success : false,error:true });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' ,success : false,error:true});

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ token:token,user_id : user._id,success : true,error:false });
    } catch (error) {
        res.status(500).json({ message: error.message ,success : false,error:true });
    }
};



export const getdata = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);  // Fetch user by ID
        if (!user) {
          return res.status(404).send('User not found');
        }
        res.json(user);
      } catch (err) {
        res.status(500).send('Server error');
      }
};

export const updateProfile = async (req, res) => {
    const { first_name, last_name,password } = req.body;

    try {
        const user = await User.findById(req.params.id); 

        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' ,success : false,error:true});

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        user.first_name = first_name || user.first_name
        user.last_name = last_name || user.last_name
        await user.save()
        res.json({ token:token,user_id : user._id,user : user,success : true,error:false });
    } catch (error) {
        res.status(500).json({ message: error.message ,success : false,error:true });
    }
};


export const searchRep = async (req, res) => {
    try {
        const { first_name, last_name, location,state,district } = req.query;
        
        // let query = {role:"representative"};
        let query = {
            $or: [
              { first_name: { $regex: first_name, $options: "i" } },
              { last_name: { $regex: last_name, $options: "i" } },
              { location: { $regex: location, $options: "i" } },
              { state: { $regex: state, $options: "i" } },
              { district: { $regex: district, $options: "i" } },
            ],
            role:"representative"
          }
        
    
        if(Object.keys(query).length === 0){
            return res.json({data:[]})
        }
        const users = await User.find(query);
    
        res.json({ data: users });
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
      }
}

export const representativeProfile = async (req, res) => {
    try {
        const representative = await User.findById(req.params.id)
        
        res.json({ data: representative });
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
      }
}