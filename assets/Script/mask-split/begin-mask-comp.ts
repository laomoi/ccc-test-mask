const {ccclass, property} = cc._decorator;

@ccclass
export default class BeginMaskComp extends cc.Mask{

    @property({ displayName:"是否遮罩开始"})
    public isBeginMask:boolean = true
    public start() {
        let self = this
        let maskAssembler = this._assembler
        if (maskAssembler == null) {
            return
        }
        //js
        let oldFillBuffers = maskAssembler.fillBuffers
        maskAssembler.fillBuffers = function(mask, renderer) {
            if (self.isBeginMask) {
                oldFillBuffers.call(self, mask, renderer)
            } 
        }

        let oldPostFillBuffers = maskAssembler.postFillBuffers
        maskAssembler.postFillBuffers = function(mask, renderer) {
            if (!self.isBeginMask) {
                oldPostFillBuffers.call(self, mask, renderer)
            } 
        }

        //native
        if (cc.sys.isNative) {
            this._assembler.setBeginMask(this.isBeginMask)
            this._assembler.setEndMask(!this.isBeginMask)
        }
    }



}