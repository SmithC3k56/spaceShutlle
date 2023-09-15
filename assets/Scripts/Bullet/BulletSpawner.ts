import { _decorator, Component, instantiate, EventMouse, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletSpawner')
export class BulletSpawner extends Component {

    @property({ type: Prefab })
    BulletPrefab: Prefab = null;

    @property({ type: Number })
    waitTime: number = 0.5;

    timer: number = 0;

    protected update(dt: number): void {
        this.createNewBullet(dt);
    }
                                                                                     
    createNewBullet(dt: number) {
        this.timer += dt;
        if (this.timer > this.waitTime) {
            this.timer = 0;
            const tempBullet = instantiate(this.BulletPrefab);
            tempBullet.position = this.node.parent.position;
            this.scheduleOnce(() => { tempBullet.destroy() }, 10);
            this.node.parent.parent.addChild(tempBullet);
        }
    }


}


