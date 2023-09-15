import { _decorator,ProgressBar, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HelthBarCtl')
export class HelthBarCtl extends Component {

    _healthBar: ProgressBar;
    start() {
        this._healthBar = this.node.getComponent(ProgressBar);
    }

    update(deltaTime: number) {
        this._healthBar.progress-= 1* deltaTime;
    }
}


 