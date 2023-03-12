import { Question } from "src/app/modules/patient.questionnaire/utils/question";


export class MedailQuestionsBuilder {
    questionValues = [
        'Did the doctor recommend us or referred you to us',
        'How did you book your appointment',
        'What is your primary doctor name',
        'Would you like your results sent to your family doctor',
        'Have you received physical therapy this year somewhere else'
    ] as const;
    medialQuestion: Question[] = new Array();

    builder() {
        var q: Question;
        var counter = 0;
        this.questionValues.forEach(element => {
            counter++;
            q = new Question();
            q.id = counter;
            q.q_type = 'boolean';
            q.q_option = {
                options: [] = ['yes', 'no']
            }
            q.q_option_date = {
                opt1: {
                    doctorName: '',
                    doctorNPI: '',
                    fax: '',
                    address: ''
                },
                opt2: {
                    
                }
            }
        });

    }
}