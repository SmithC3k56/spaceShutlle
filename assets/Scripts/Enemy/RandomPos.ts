import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RandomPos')
export class RandomPos extends Component {
    @property({type:Prefab})
    shuttle: Prefab = null;
    @property({type:Prefab})
    metor: Prefab = null;


    @property({type:Number})
    maxX: number = 307;

    @property({type:Number})
    minX: number= -300;
    
    timer: number = 0;

    waitTime: number = 5;

    isGenMe: boolean= false;

    start() {
    }

    update(deltaTime: number) {
        this.timer+= deltaTime;
        if(this.timer > this.waitTime){
            this.timer =0;
            
                this.createNewEnemy(this.shuttle);
                if(this.isGenMe){
                    this.isGenMe= !this.isGenMe;
                    this.createNewEnemy(this.metor);
                }else{
                    this.isGenMe= !this.isGenMe;
                }
                
            
        }
       
    }

    createNewEnemy(PrefabEnemy: Prefab){
        var tempPos = this.node.position.clone();//-300 -> 307
        tempPos.x = this.getRandomNumber(this.minX,this.maxX);
        // this.node.position = tempPos;
        
        const newEnemy = instantiate(PrefabEnemy);
        newEnemy.position = tempPos;
        this.node.parent.addChild(newEnemy);
        this.scheduleOnce(()=>{newEnemy.destroy()},20);
    }

     getRandomNumber(minX: number, maxX: number): number {
        // Generate a random number between 0 and 1
        const randomFraction = Math.random();
    
        // Scale the random number to fit within the range [minX, maxX]
        const randomInRange = randomFraction * (maxX - minX + 1) + minX;
    
        // Use Math.floor to ensure an integer result
        return Math.floor(randomInRange);
    }
}


