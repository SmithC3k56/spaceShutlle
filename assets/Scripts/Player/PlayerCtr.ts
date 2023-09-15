import { _decorator, Component, input, Input, SpriteFrame, Node, math, KeyCode, EventMouse, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerCtr')
export class PlayerCtr extends Component {

    @property({ type: SpriteFrame })
    listShield: SpriteFrame[] = [];

    @property({ type: Number })
    speed_moving: number = 10;


    @property({ type: Number })
    maxWidth: number;

    @property({ type: Number })
    maxHeight: number;

    @property({ type: Number })
    minWidth: number;

    @property({ type: Number })
    minHeight: number;

    start() {
        input.on(Input.EventType.MOUSE_MOVE, this.onKeyPressing, this);
    }

    onKeyPressing(event:EventMouse) {
        var temp = event.getLocation();
        if(temp.x <= this.minWidth) temp.x = this.minWidth;
        if(temp.x >= this.maxWidth) temp.x = this.maxWidth;
        if(temp.y >= this.maxHeight) temp.x = this.maxHeight;
        if(temp.y <= this.minHeight) temp.x = this.minHeight;

        this.node.position = new Vec3(temp.x,temp.y,0);
        
    }


    move(temp: math.Vec3) {
        this.node.position = temp;
    }
}


