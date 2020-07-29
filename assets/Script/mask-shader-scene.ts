import QEMath from "./qe-math";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MaskShaderScene extends cc.Component {

    @property({type:cc.Node, displayName:"遮罩父节点"})
    protected maskNode:cc.Node = null

    @property({type:cc.EffectAsset, displayName:"遮罩材质"})
    protected maskEffect:cc.EffectAsset = null

    @property({type:cc.Sprite, displayName:"遮罩精灵"})
    protected maskSprite:cc.Sprite = null

    // currentMaterial.define("QE_USE_MASK", 1) 
    // currentMaterial.setProperty("mat_mask", imaterial.mask.matArrays)
    // currentMaterial.setProperty("mask_alpha", imaterial.mask.opacity/255)
    // currentMaterial.setProperty("texture2", imaterial.mask.texture)

 

    public start () {
        if (this.maskNode) {
            for (let i=0;i<this.maskNode.childrenCount;i++) {
                let child = this.maskNode.children[i]
                let spine = child.getComponent(sp.Skeleton)
                if (spine) {
                    this.setSpineMask(spine)
                    continue
                }

                let renderComp = child.getComponent(cc.RenderComponent)
                if (renderComp) {

                    this.setDefaultMask(renderComp)
                    continue
                }
            }
            
        }
    }

    public onLoad() {
        
    }


    protected setDefaultMask(renderComp:cc.RenderComponent) {
        let material = new cc.Material()
        material.effectAsset = this.maskEffect
        material.techniqueIndex = 0
        material.define("QE_USE_MASK", 1) 
        material.setProperty("texture2", this.maskSprite.spriteFrame.getTexture())
        renderComp.setMaterial(0, material)
    }

    protected setSpineMask(spine:sp.Skeleton) {
        let material = new cc.Material()
        material.effectAsset = this.maskEffect
        material.techniqueIndex = 1
        material.define("QE_USE_MASK", 1) 
        material.setProperty("texture2", this.maskSprite.spriteFrame.getTexture())
        spine.setMaterial(0, material)
    }


    public update() {
        //update maskMat
        if (this.maskSprite.node.y < 40) {
            //this.maskSprite不仅可以做位移还可以做缩放等操作， 这里就简单做一下移动
            this.maskSprite.node.y += 1
        } else if (this.maskSprite.node.y >= 40) {
            this.maskSprite.node.y = - 100
        }

        let maskMatArray = QEMath.getWorldToLocalMatrixArray(this.maskSprite)


        for (let i=0;i<this.maskNode.childrenCount;i++) {
            let child = this.maskNode.children[i]
            let renderComp = child.getComponent(cc.RenderComponent)
            if (renderComp) {
                let material = renderComp.getMaterial(0)
                if (material && material.effectAsset.name == "mask-material") {
                    material.setProperty("mat_mask", maskMatArray)
                }
            }
        }
       

    }

}
