import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/admin/userModel";


export class AutheController {
    public async register(request: Request, response: Response): Promise<void> {
        const { nome, email, password } = request.body;

        try {
            // Criptografar a senha
            const passwordCrpt = await bcrypt.hash(password, 10);
            const newUser = new User({nome, email, password: passwordCrpt});
            newUser.save();

            response.status(201).json({ message: `O usuário ${nome} foi criado com sucesso!` })
        } catch (error) {
            response.status(500).json({ error: (error as Error).message, name: (error as Error).name })
        }

    };
    public async login(req: Request, res: Response): Promise<void>{
        const {nome, email, password} = req.body;
        
        try {
            const user = await User.findOne({email});
            if(!user){
                res.status(400).json({ message: "Usuário não encontrado."});
                return;
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                res.status(401).json({ message: "Usuário e Senha incorretos."});
                return;
            }
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string, { expiresIn: '10m'})
            res.status(200).json({token: token})
        } catch (error) {
            res.status(500).json({error: (error as Error).message})
        }
    };
}

export default new AutheController();