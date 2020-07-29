import QEMath from "./qe-math";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MaskStencilScene extends cc.Component {

    @property({type:cc.Mask, displayName:"遮罩节点"})
    protected heroMask:cc.Mask = null


    protected matMask:cc.Mat4 = cc.mat4()
    protected ty:number = -100
    protected tx:number  = 0 

    public start () {

    }

    public onLoad() {
        if (this.heroMask) {
            this.fixHeroMask()
        }
    }

    public update() {
        //update maskMat
        if (this.ty < 40) {
            this.ty += 1
            let matm = this.matMask.m
            //matMask不仅能做tx ty的位移, 还可以做旋转, 缩放等, 只需要修改matm的值即可, 这里只简单做一下tx,ty的修改
            matm[12] = this.tx
            matm[13] = this.ty
        } else if (this.ty >= 40) {
            this.ty = - 100
        }
    }

    /**
     * 往mask comp注入自定义方法，修改updateWorldVertex方法
     */
    protected fixHeroMask() {
        let self = this
        let maskAssembler = this.heroMask._assembler
        if (maskAssembler == null) {
            return
        }

        maskAssembler.updateWorldVerts = function(comp) {
            let local =  this._local
            let verts = this._renderData.vDatas[0]

            let matrix = comp.node._worldMatrix;

            let vl = local[0], vr = local[2],
                vb = local[1], vt = local[3];
            
            // M1 = 原来的世界矩阵
            // M2 = 遮罩的本地矩阵
            // 最终世界矩阵 = M1* M2
            let mat = cc.mat4()
            QEMath.mulMat2D(mat, matrix, self.matMask)

            let matm = mat.m
            let a = matm[0], b = matm[1], c = matm[4], d = matm[5],
            tx = matm[12], ty = matm[13];

            let al = a * vl, ar = a * vr,
            bl = b * vl, br = b * vr,
            cb = c * vb, ct = c * vt,
            db = d * vb, dt = d * vt;

            // left bottom
            verts[0] = al + cb + tx;
            verts[1] = bl + db + ty;
            // right bottom
            verts[5] = ar + cb + tx;
            verts[6] = br + db + ty;
            // left top
            verts[10] = al + ct + tx;
            verts[11] = bl + dt + ty;
            // right top
            verts[15] = ar + ct + tx;
            verts[16] = br + dt + ty;       
        }
    }
}
