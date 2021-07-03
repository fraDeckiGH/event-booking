import { Field, ObjectType } from "type-graphql"
import { PageInfo } from "../component/pageInfo"
import { GConstructor } from "../type"

export const ListResponseMxn = function <
  TBase extends GConstructor, 
  TNode,
>(Base: TBase, { 
  Node: NodeV, // "Node" collides w/ TS'; 'V' stays for Value
}: {
  Node: TNode
}) {
  
  @ObjectType({ isAbstract: true })
  class Class extends Base {
    @Field(() => [NodeV], { nullable: true })
    node?: TNode[]
    
    @Field({ nullable: true })
    pageInfo?: PageInfo
  }
  
  return Class
}
