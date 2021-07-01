import{ EntityRepository, Repository} from "typeorm"
import { Tag } from "../entities/Tag";

@EntityRepository(Tag)
class TagsRepositoreis extends Repository<Tag>{}

export { TagsRepositoreis };