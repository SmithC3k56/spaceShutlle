import { _decorator, Component, Node, Prefab,Collider2D,IPhysics2DContact,Contact2DType,Intersection2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletCtr')
export class BulletCtr extends Component {
    @property({type:Number})
    speed: number = 10;

    @property({type: Boolean})
    isEnemy: boolean = true;


    start() {
        // this.scheduleOnce(this.remove(),8);
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        
        }
    }


    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        if(this.isEnemy == false && (contact.colliderB.node.name == "meteorBrown_big1" || contact.colliderB.node.name == "Shuttle")){
            if(contact.isTouching()){
                if(this.node.parent.parent.getChildByName("Enemies")){

                    this.scheduleOnce(()=> {this.node.parent.parent.getChildByName("Enemies").removeChild(contact.colliderB.node);});
                }
            }
        }else if (this.isEnemy && contact.colliderB.node.name == "playerElement"){
            if(contact.isTouching()){
                // console.log("touched into player");
                if(this.node.parent.parent.getChildByName("Player")){
                }
            }
        }
    }



    update(deltaTime: number) {
        this.move(deltaTime);
    }


    dammaged(){
        this.node.destroy();
    }


    move(dt:number){
        var temp = this.node.position.clone();
        if(this.isEnemy){
            temp.y = temp.y - this.speed * dt;
        }else{
            temp.y = temp.y + this.speed * dt;
        }
        this.node.position = temp;
    }

}


