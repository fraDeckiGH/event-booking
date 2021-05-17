import { query as q } from "faunadb";
import { fieldsMap } from "graphql-fields-list";
import { Args, ArgsType, Ctx, Field, Info, 
  Query as QueryTg, Resolver } from "type-graphql";
import PageInfoInput from "../typeDef/pageInfoInput";
import UserListResponse from "../typeDef/userListResponse";
import { packCursor, packQueryError, parseCursor } from "../func";
import { Context } from "../typeTS";
import { INDEXING_FIELD, SELECT_DEFAULT_VALUE } from "../value";

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
  pageInfo!: PageInfoInput
}

@Resolver(/* User */)
export default class ResolverMap {
  
  @QueryTg(returns => UserListResponse)
  async listUser(
    // /* @Root() */ parent: any,
    @Args() args: ListUserArgs, 
    @Ctx() ctx: Context,
    @Info() info: any,
  )/* : Promise<UserListResponse> */ {
    const { pageInfo } = args;
    const { db } = ctx;
    
    const collectionName = "user";
    const indexName = "user";
    
    const fieldMap: any = fieldsMap(info, {
      path: "node",
    });
    const indexFields: string[] = ["ts", "id", "email", "nickname"];
    
    indexFields.forEach((key) => {
      if (fieldMap.hasOwnProperty(key)) {
        fieldMap[key] = Var(key);
      }
    });
    
    
    try {
      const res: any = await db.query(
        // Abort("aborted 4 test"),
        
        Let(
          {
            page: q.Map(
              Paginate(
                Match(Index(indexName), INDEXING_FIELD.value),
                { 
                  after: parseCursor({ 
                    cursorWrap: pageInfo.cursorAfter, 
                    collectionName, 
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
              data: Select("data", Var("page")),
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
      // console.log("res.data", res.data)
      
      // const ret = new UserListResponse
      // ret.code = "200"
      // ret.pageInfo = {
      //   cursorAfter: res.after,
      // }
      // ret.node = res.data
      
      // const ret: UserListResponse = {
      //   code: "200",
      //   pageInfo: {
      //     cursorAfter: res.after,
      //   },
      //   node: res.data,
      // }
      
      // ret.pippo = 3 // BUG mixins make this a non-error
      // return ret;
      
      return {
        code: "200",
        pageInfo: {
          cursorAfter: res.after,
        },
        node: res.data,
      };
    } catch (e) {
      return packQueryError({
        error: e,
      })
    }
    
  }
  
}





