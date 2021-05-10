// * TypeGraphQL version of resolver.ts

import faunadb, { query as q } from "faunadb";
import { fieldsList, fieldsMap, fieldsProjection } from "graphql-fields-list";
import { Args, ArgsType, Ctx, Field, ID, Info, InputType, ObjectType, Query as QueryTg, Resolver, Root } from "type-graphql";
import { User } from "../model/user";
// import User from "../model/user";
import { packCursor, packDocument, packQueryError, parseCursor } from "./func";
import { Context, CursorWrap } from "./type";
import { INDEXING_FIELD, SELECT_DEFAULT_VALUE } from "./value";
// import { Event } from "../model/event";
// import { User } from "../model/user";
import { 
  Currency,
  DateTime,
  EmailAddress,
  JSONScalar,
  NonEmptyString,
  PositiveInt,
  Timestamp, 
} from "../junction/scalar";

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

// FIX ReferenceError: Cannot access 'PageInfo' before initialization
@ObjectType()
export class PageInfo {
  @Field(type => JSONScalar, { nullable: true })
  cursorAfter?: CursorWrap
}

@ObjectType()
export class UserListResponse {
  @Field(type => NonEmptyString, { nullable: true })
  errorCode?: string
  
  @Field({ nullable: true })
  pageInfo?: PageInfo
  
  @Field(type => [User], { nullable: true })
  node?: User[]
}

@InputType()
export class PageInfoInput implements Partial<PageInfo> {
  @Field(type => JSONScalar, { nullable: true })
  cursorAfter?: CursorWrap
  
  @Field(type => PositiveInt)
  size!: number
}


@ArgsType()
class ListUserArgs {
  @Field()
  pageInfo!: PageInfoInput
}

@Resolver(/* User */)
export default class ResolverMap {
  
  @QueryTg(returns => UserListResponse)
  async listUser(
    /* @Root() */ parent: any,
    @Args() args: ListUserArgs, 
    @Ctx() ctx: Context,
    @Info() info: any,
  )/* : UserListResponse */ {
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
      return {
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





