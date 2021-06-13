import { query as q } from "faunadb";
import { fieldsMap } from "graphql-fields-list";
import { Args, ArgsType, Field, Info, Query as QueryTg, Resolver } from "type-graphql";
import { packCursor, packQueryError, parseCursor } from "../../func";
import { DB, INDEXING_FIELD, SELECT_DEFAULT_VALUE } from "../../value";
import { PageInfoInput } from "../pageInfo";
import { UserListResponse } from "./userListResponse";

@ArgsType()
class ListUserArgs {
  @Field()
  readonly pageInfo!: PageInfoInput
}

@Resolver()
export class UserResolver {
  
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
        fieldMap[key] = q.Var(key);
      }
    });
    
    try {
      const res: any = await DB.query(
        // Abort("aborted 4 test"),
        
        q.Let(
          {
            page: q.Map(
              q.Paginate(
                q.Match(q.Index(indexName), INDEXING_FIELD.value),
                { 
                  after: parseCursor({ 
                    collectionName, 
                    cursorWrap: pageInfo.cursorAfter, 
                  }),
                  size: pageInfo.size, 
                }
              ),
              q.Lambda(
                indexFields,
                fieldMap
              )
            ),
            page_after: q.Select("after", q.Var("page"), SELECT_DEFAULT_VALUE),
            pageRepack: {
              node: q.Select("data", q.Var("page")),
              after: packCursor({
                cursor: q.Var("page_after"),
                indexFields_length: indexFields.length,
              }),
            }
          },
          q.Var("pageRepack")
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





