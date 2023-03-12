export interface Answer {
    id: number;
    answer_value: string,
}
export class Question {
    id: number = 0;
    q_key: string = '';
    q_type:string=''
    q_option: object = {};
    q_option_date:object={}
    answer: Answer = {
        id: 0,
        answer_value: '',
    };
    linked: number = 0;
}