import { getCustomRepository } from "typeorm";
import { TagsRepositoreis } from "../repositories/TagsRepositories";
import {classToPlain} from "class-transformer";


class ListTagsService {
    async execute(){
        const tagsRepositories = getCustomRepository(TagsRepositoreis);
    
        const tags = await tagsRepositories .find();
        
        return classToPlain(tags);
    }
    
   
}

export { ListTagsService }