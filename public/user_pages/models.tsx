export interface Dorm {
    id: number;
    name: string;
    address: string;
    personSet: Person[];
}
export interface Person {
    id: number;
    chineseFormatName: string;
    isMale: boolean;
    age: number;
    birthday: string;
    dorm: {
        name: string;
    };
}
