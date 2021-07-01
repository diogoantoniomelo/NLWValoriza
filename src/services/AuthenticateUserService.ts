import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { sign } from "jsonwebtoken";


interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService{

    async execute({email, password}: IAuthenticateRequest){
      const usersRepositories = getCustomRepository(UsersRepositories); 
        
      const user = await usersRepositories.findOne({
          email
      });

      if(!user){
        throw new Error("Email ou senha incorreto")
      }

      const passwordMatch = await compare(password, user.password);

      if(!passwordMatch){
        throw new Error("Email ou senha incorreto")
      }

      const token = sign({
          email: user.email
      },
      "8204ac9aab44577ae20af6161d76b637", 
      {
          subject: user.id,
          expiresIn: "1d"
      })
      return token;
    }
}


export { AuthenticateUserService };