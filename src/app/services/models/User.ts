
export interface User {
    userId: string;
    userLoginName: string;
    userName: string;
    amailAddr?: string;
    emailAddr: string;
    mobilePhone?: string;
    pwd: string;
    cPwd: string;
    age?: number;
    gender?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    occupation?: string;
}

export interface TokenString {
    tokenString: string;
}
