import { _decorator, Component,Collider2D,IPhysics2DContact, Node ,Contact2DType} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MeteorCtr')
export class MeteorCtr extends Component {
    @property({ type: Number })
    rotationSpeed: number = 0;
    start() {
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        
        }
    }


    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        if( (contact.colliderB.node.name == "laserBlue01")){
            if(contact.isTouching()){
                if(this.node.parent.parent.getChildByName("Player")){

                    this.scheduleOnce(()=> {this.node.parent.parent.getChildByName("Player").removeChild(contact.colliderB.node);});
                    
                }
            }
        }
    }


    update(deltaTime: number) {
        this.rotation(deltaTime);
    }

    
    rotation(dt: number) {
        var temp = this.node.rotation.clone();
        temp.x += this.rotationSpeed * dt;

        this.node.rotation = temp;
    }
}


