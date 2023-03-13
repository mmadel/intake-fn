const patientRequiredFields = [
    { id: 1, field: 'name', required: false },
    { id: 2, field: 'birthDate', required: false },
    { id: 3, field: 'gender', required: false },
    { id: 4, field: 'maritalStatus', required: false },
    { id: 5, field: 'phoneType', required: true },
    { id: 6, field: 'phoneNumber', required: false },
    { id: 7, field: 'email', required: true },
    { id: 8, field: 'idType', required: false },
    { id: 9, field: 'id', required: false },
    { id: 10, field: 'ideffective_from', required: true },
    { id: 11, field: 'ideffective_to', required: true },
    { id: 12, field: 'emergencyName', required: false },
    { id: 13, field: 'emergencyPhone', required: false },
    { id: 14, field: 'employmentStatus', required: false },

    { id: 15, field: 'addresstype', required: true },
    { id: 16, field: 'firstaddress', required: false },
    { id: 17, field: 'secondaddress', required: false },
    { id: 18, field: 'country', required: false },
    { id: 19, field: 'zipcode', required: false },
]

export default patientRequiredFields