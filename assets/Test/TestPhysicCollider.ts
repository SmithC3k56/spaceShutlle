import { _decorator, Contact2DType, Prefab, Collider2D, IPhysics2DContact, PhysicsSystem2D, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TestPhysicCollider')
export class TestPhysicCollider extends Component {

    isDel: boolean = true;
    start() {
        // Registering callback functions for a single collider
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            
        }

    }

    @property(Prefab)
    nodeToDestroyPrefab: Prefab = null;

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        console.log('onBeginContact:' + contact.isTouching());
        // contact.disabled = true;
        console.log('contact.A.node.name:' + contact.colliderA.node.name);
        this.scheduleOnce(()=> {contact.colliderA.node.destroy();});
    }


    destroyOther(sode: Node){
        this.node.parent.removeChild(sode);
    }


}


