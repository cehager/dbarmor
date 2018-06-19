
export interface User {
    userId: number;
    aMailAddr: string;
    eMailAddr: string;
    firstName: string;
    lastName: string;
    socialName: string;
    joinedOn: Date;
    lastAccess: Date;
    age?: number;
    gender?: string;
    city?: string;
    country?: string;
    occupation?: string;
}

export interface TokenString {
    tokenString: string;
}
