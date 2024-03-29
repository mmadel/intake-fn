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

    { id: 15, field: 'addresstype', required: false },
    { id: 16, field: 'firstaddress', required: false },
    { id: 17, field: 'secondaddress', required: false },
    { id: 18, field: 'country', required: false },
    { id: 19, field: 'zipcode', required: false },


    { id: 20, field: 'name-recommendeddoctor', required: false, type: 'MQ' },
    { id: 21, field: 'npi-recommendeddoctor', required: false, type: 'MQ' },
    { id: 22, field: 'fax-recommendeddoctor', required: false, type: 'MQ' },
    { id: 23, field: 'address-recommendeddoctor', required: false, type: 'MQ' },
    { id: 24, field: 'name-recommendedentity', required: false, type: 'MQ' },
    { id: 25, field: 'appointmentbooking', required: false, type: 'MQ' },

    { id: 26, field: 'primarydoctor', required: false, type: 'MQ' },

    { id: 19, field: 'physicaltherapy-where', required: false, type: 'MQ' },
    { id: 20, field: 'physicaltherapy-number-visit', required: false, type: 'MQ' },

    { id: 21, field: 'insuranceCompanyName-wrokernotcomp', required: false, type: 'IQ' },
    { id: 22, field: 'memberId-wrokernotcomp', required: false, type: 'IQ' },
    { id: 23, field: 'ploicyId-wrokernotcomp', required: false, type: 'IQ' },
    { id: 24, field: 'policyRelationship-wrokernotcomp', required: false, type: 'IQ' },
    { id: 25, field: 'secondaryInsuranceMemberId-wrokernotcomp', required: false, type: 'IQ' },
    { id: 26, field: 'secondaryInsuranceCompanyName-wrokernotcomp', required: false, type: 'IQ' },
    { id: 27, field: 'secondaryInsurancePolicyHolderFirstName-wrokernotcomp', required: false, type: 'IQ' },
    { id: 28, field: 'secondaryInsurancePolicyHolderMiddleName-wrokernotcomp', required: false, type: 'IQ' },
    { id: 29, field: 'secondaryInsurancePolicyHolderLastName-wrokernotcomp', required: false, type: 'IQ' },
    { id: 30, field: 'secondaryInsurancePolicyHolderEmployerFirstName-wrokernotcomp', required: false, type: 'IQ' },
    { id: 31, field: 'secondaryInsurancePolicyHolderEmployerMiddleName-wrokernotcomp', required: false, type: 'IQ' },
    { id: 32, field: 'secondaryInsurancePolicyHolderEmployerLastName-wrokernotcomp', required: false, type: 'IQ' },

    { id: 33, field: 'accidentDate-wrokercomp', required: false, type: 'IQ' },
    { id: 34, field: 'wrokerStatus-wrokercomp', required: false, type: 'IQ' },
    { id: 35, field: 'address-wrokercomp', required: false, type: 'IQ' },
    { id: 36, field: 'fax-wrokercomp', required: false, type: 'IQ' },
    { id: 37, field: 'insuranceName-wrokercomp', required: false, type: 'IQ' },
    { id: 38, field: 'claimNumber-wrokercomp', required: false, type: 'IQ' },
    { id: 39, field: 'adjusterInfoName-wrokercomp', required: false, type: 'IQ' },
    { id: 40, field: 'adjusterInfoPhone-wrokercomp', required: false, type: 'IQ' },
    { id: 41, field: 'attorneyInfoName-wrokercomp', required: false, type: 'IQ' },
    { id: 42, field: 'attorneyInfoPhone-wrokercomp', required: false, type: 'IQ' },
    { id: 43, field: 'caseStatus-wrokercomp', required: false, type: 'IQ' },


    { id: 44, field: 'height', required: false, type: 'MHQ' },
    { id: 45, field: 'weight', required: false, type: 'MHQ' },
    { id: 46, field: 'evaluationReason', required: false, type: 'MHQ' },
    { id: 47, field: 'medicationPrescription', required: false, type: 'MHQ' },
    { id: 48, field: 'medicationsList', required: false, type: 'MHQ' },
    { id: 49, field: 'patientCondition', required: false, type: 'MHQ' },
    { id: 50, field: 'isScannig', required: false, type: 'MHQ' },
    { id: 51, field: 'isMetalImplantation', required: false, type: 'MHQ' },
    { id: 52, field: 'isPacemaker', required: false, type: 'MHQ' },
    { id: 53, field: 'surgeriesList', required: false, type: 'MHQ' }
]

export default patientRequiredFields