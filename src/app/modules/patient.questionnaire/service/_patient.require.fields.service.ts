const patientRequiredFields = [
    { id: 1, field: 'name', required: false },
    { id: 2, field: 'birthDate', required: false },
    { id: 3, field: 'gender', required: false },
    { id: 4, field: 'maritalStatus', required: false },
    { id: 5, field: 'phoneType', required: false },
    { id: 6, field: 'phoneNumber', required: false },
    { id: 7, field: 'email', required: false },
    { id: 8, field: 'idType', required: false },
    { id: 9, field: 'id', required: false },
    { id: 10, field: 'ideffective_from', required: false },
    { id: 11, field: 'ideffective_to', required: false },
    { id: 12, field: 'emergencyName', required: false },
    { id: 13, field: 'emergencyPhone', required: false },
    { id: 14, field: 'employmentStatus', required: false },

    { id: 15, field: 'addresstype', required: true },
    { id: 16, field: 'firstaddress', required: false },
    { id: 17, field: 'secondaddress', required: false },
    { id: 18, field: 'country', required: true },
    { id: 19, field: 'zipcode', required: true },


    { id: 19, field: 'name-recommendeddoctor', required: true, type: 'MQ' },
    { id: 19, field: 'npi-recommendeddoctor', required: false, type: 'MQ' },
    { id: 19, field: 'fax-recommendeddoctor', required: false, type: 'MQ' },
    { id: 19, field: 'address-recommendeddoctor', required: true, type: 'MQ' },
    { id: 19, field: 'name-recommendedentity', required: false, type: 'MQ' },
    { id: 19, field: 'appointmentbooking', required: true, type: 'MQ' },

    { id: 19, field: 'primarydoctor', required: false, type: 'MQ' },

    { id: 19, field: 'physicaltherapy-where', required: false, type: 'MQ' },
    { id: 19, field: 'physicaltherapy-number-visit', required: false, type: 'MQ' },

]

export default patientRequiredFields