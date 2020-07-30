import QEMath from "../qe-math";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MaskSplitScene extends cc.Component {

    @property({type:cc.Mask, displayName:"遮罩节点"})
    protected beginMask:cc.Mask = null


    public start () {

    }


    public update() {
        //update maskMat
        if (this.beginMask.node.y < 40) {
            this.beginMask.node.y += 1
        } else if (this.beginMask.node.y >= 40) {
            this.beginMask.node.y = - 100
        }
    }

}
