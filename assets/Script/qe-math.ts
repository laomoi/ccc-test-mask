



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



}


