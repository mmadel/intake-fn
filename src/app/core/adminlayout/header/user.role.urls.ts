export interface USerRoleMap {
    name: string,
    urls: string[]
}
export const UserRoleURLS: USerRoleMap[] = [
    {
        name: "ADMIN",
        urls: ['dashboard', 'patient', 'patient/find/clinic', 'clinic', 'user', 'report','patient/upload','insurance/company/find','insurance/company/create','requires/fields']
    },
    {
        name: "USER",
        urls: ['patient/find/clinic/','/find/clinics/']
    },
    {
        name:"PERMITTED",
        urls: ['questionnaire' ,'/patient/create','/questionnaire/submitted','/agreement','patient/upload','insurance/company/find']
    }
]