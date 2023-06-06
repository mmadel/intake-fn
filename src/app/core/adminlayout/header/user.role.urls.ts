export interface USerRoleMap {
    name: string,
    urls: string[]
}
export const UserRoleURLS: USerRoleMap[] = [
    {
        name: "ADMIN",
        urls: ['dashboard', 'patient', 'patient/find/clinic', 'clinic', 'user', 'report','patient/upload','insurance/company/find','insurance/company']
    },
    {
        name: "USER",
        urls: ['patient/find/clinic/','/find/clinics/']
    },
    {
        name:"PERMITTED",
        urls: ['questionnaire','requires/fields' ,'/patient/create','/questionnaire/submitted','/agreement']
    }
]