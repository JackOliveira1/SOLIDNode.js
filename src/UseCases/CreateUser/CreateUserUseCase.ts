import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvides";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {

    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider,
    ){}

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if(userAlreadyExists) {
            throw new Error('User already exists.');
        }

        const user = new User(data);

        await this.usersRepository.save(user);

       await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            } ,
            from: {
                name: 'Jack Oliveira',
                email: 'jackoliveira14adm10@gmail.com',
            }, 
            subject: 'Seja bem-vindo',
            body: '<p>Olá, meu nome é <b>Jack Oliveira</b>, e esse é um teste de princípios SOLID em uma API REST com Node.js</p>'
        })



    }


}