export interface USerRoleMap {
    name: string,
    urls: string[]
}
export const UserRoleURLS: USerRoleMap[] = [
    {
        name: "ADMIN",
        urls: ['dashboard', 'patient', 'patient', 'clinic', 'user', 'report']
    },
    {
        name: "USER",
        urls: ['patient','/find/clinics/']
    },
    {
        name:"PERMITTED",
        urls: ['questionnaire','requires/fields' ,'patient','/questionnaire/submitted']
    }
]