import { query as q } from "faunadb";
import { fieldsMap } from "graphql-fields-list";
import { Args, ArgsType, Field, Info, Query as QueryTg, Resolver } from "type-graphql";
import { packCursor, packQueryError, parseCursor } from "../func";
import PageInfoInput from "../typeDef/pageInfoInput";
import UserListResponse from "../typeDef/userListResponse";
import { DB, INDEXING_FIELD, SELECT_DEFAULT_VALUE } from "../value";

const {
  Abort,
  Add,
  Call,
  Collection,
  Collections,
  Contains,
  Create,
  Do,
  Documents,
  Exists,
  Get,
  Identity,
  If,
  Index,
  Join,
  Lambda,
  Let,
  Match,
  Merge,
  Not,
  Now,
  Paginate,
  Query,
  Ref,
  Select,
  Subtract,
  ToArray,
  Update,
  Var,
} = q;

@ArgsType()
class ListUserArgs {
  @Field()
  readonly pageInfo!: PageInfoInput
}

@Resolver()
export default class UserResolver {
  
  @QueryTg(() => UserListResponse)
  /* static  */async listUser(
    // @Root() root: any,
    @Args() args: ListUserArgs,
    // @Args() { pageInfo }: ListUserArgs,
    // @Ctx() ctx: Context,
    @Info() info: any,
  ): Promise<UserListResponse> {
    const { pageInfo } = args
    
    const collectionName = "user"
    const indexName = "user"
    
    const fieldMap: any = fieldsMap(info, {
      path: "node",
    });
    const indexFields = ["ts", "id", "email", "nickname"]
    
    indexFields.forEach((key) => {
      if (fieldMap.hasOwnProperty(key)) {
        fieldMap[key] = Var(key);
      }
    });
    
    try {
      const res: any = await DB.query(
        // Abort("aborted 4 test"),
        
        Let(
          {
            page: q.Map(
              Paginate(
                Match(Index(indexName), INDEXING_FIELD.value),
                { 
                  after: parseCursor({ 
                    collectionName, 
                    cursorWrap: pageInfo.cursorAfter, 
                  }),
                  size: pageInfo.size, 
                }
              ),
              Lambda(
                indexFields,
                fieldMap
              )
            ),
            page_after: Select("after", Var("page"), SELECT_DEFAULT_VALUE),
            pageRepack: {
              node: Select("data", Var("page")),
              after: packCursor({
                cursor: Var("page_after"),
                indexFields_length: indexFields.length,
              }),
            }
          },
          Var("pageRepack")
        )
        
      );
      
      console.log("res", res)
      return {
        code: "200",
        node: res.node,
        pageInfo: {
          cursorAfter: res.after,
        },
      }
    } catch (e) {
      return packQueryError({
        error: e,
      })
    }
  }
  
}





