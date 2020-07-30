



export interface MatABCD{
    a:number,
    b:number,
    c:number,
    d:number
}



export default class QEMath  {

    public static ANGLE_2_RADIAN:number = Math.PI/180
    public static RADIAN_2_ANGLE:number = 180 / Math.PI


    /**
     *  out = a * b
     * @param out 
     * @param a 
     * @param b 
     */
    public static mulMat2D (out, a, b) {
        let am = a.m, bm = b.m, outm = out.m;
        let aa=am[0], ab=am[1], ac=am[4], ad=am[5], atx=am[12], aty=am[13];
        let ba=bm[0], bb=bm[1], bc=bm[4], bd=bm[5], btx=bm[12], bty=bm[13];
        if (ab !== 0 || ac !== 0) {
            outm[0] = ba * aa + bb * ac;
            outm[1] = ba * ab + bb * ad;
            outm[4] = bc * aa + bd * ac;
            outm[5] = bc * ab + bd * ad;
            outm[12] = aa * btx + ac * bty + atx;
            outm[13] = ab * btx + ad * bty + aty;
        }
        else {
            outm[0] = ba * aa;
            outm[1] = bb * ad;
            outm[4] = bc * aa;
            outm[5] = bd * ad;
            outm[12] = aa * btx + atx;
            outm[13] = ad * bty + aty;
        }
    }


    public static getWorldToLocalMatrixArray(sprite:cc.Sprite) : Float32Array{
        let node = sprite.node
        let mat4:any = cc.mat4()

        //得到node的世界变换矩阵的逆矩阵
        node.getWorldMatrix(mat4)
        mat4 = mat4.invert()    
        
        //转换成着色器能接受的uniform格式Float32Array
        let arr = new Float32Array(16);
        for (let i=0;i<16;i++){
            arr[i]= mat4.m[i]
        }

        let texture = sprite.spriteFrame.getTexture()
        let tw = texture.width
        let th = texture.height

        //做一下坐标转换，把uv坐标(x,y) 映射到[0， 1]的范围内
        arr[0] = arr[0] / tw
        arr[1] = arr[1] / th
        arr[4] = arr[4] / tw
        arr[5] = arr[5] / th
        arr[12] = arr[12] / tw + 0.5
        arr[13] = arr[13] / th + 0.5
        return arr
    }


}


