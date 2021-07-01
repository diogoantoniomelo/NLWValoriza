import { getCustomRepository } from "typeorm"; 
import { TagsRepositoreis } from "../repositories/TagsRepositories";   

class CreateTagService {
    async execute(name: string) {
        const tagsRepositoreis = getCustomRepository(TagsRepositoreis);
        
        if (!name) {
            throw new Error("Nome Incorreto!");
        }

        const tagAlreadyExists = await tagsRepositoreis.findOne({
            name,
        });

        if(tagAlreadyExists){
            throw new Error("Tag já existente");
        }

        const tag = tagsRepositoreis.create({
            name,
        });

        await tagsRepositoreis.save(tag);

        return tag;
    }
}

export { CreateTagService };