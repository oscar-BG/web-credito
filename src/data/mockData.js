export const mockDataTeam = [
    {
        id : 1,
        rfc : "SAS4343",
        name : "Oscar Bautista",
        type_client: "Gobierno",
        zone : "centro",
        sucursal : "sucursal",
        data_rest : "04/04/2024",
        date : "01/04/2024",
        vigencia : "04/05/2024",
        monto : 3434,
        date_pagare : "09/05/2024",
        vigencia_pagare : "10/06/2024",
        vigencia_documentos : "10/06/2024",
        estatus : "aceptado",
        expediente : true,
        check_out : true,
        check_int : false,
    },
    {
        id : 2,
        rfc : "4DSDS",
        name : "Sonia reyes",
        type_client: "Gobierno",
        zone : "centro",
        sucursal : "sucursal",
        data_rest : "04/04/2024",
        date : "01/04/2024",
        vigencia : "04/05/2024",
        monto : 3434,
        date_pagare : "09/05/2024",
        vigencia_pagare : "10/06/2024",
        vigencia_documentos : "10/06/2024",
        estatus : "aceptado",
        expediente : true,
        check_out : true,
        check_int : false,
    },
    {
        id : 3,
        rfc : "45FFDFF",
        name : "Secretaria",
        type_client: "Gobierno",
        zone : "centro",
        sucursal : "sucursal",
        data_rest : "04/04/2024",
        date : "01/04/2024",
        vigencia : "04/05/2024",
        monto : 3434,
        date_pagare : "09/05/2024",
        vigencia_pagare : "10/06/2024",
        vigencia_documentos : "10/06/2024",
        estatus : "aceptado",
        expediente : true,
        check_out : true,
        check_int : false,
    }
];

export const mockDataUsers = [
    {
        id : 1,
        username : "sreyes@idare.com",
        name : "Sonia Reyes",
        permisos : "admin",
        zona : "Occidente",
        sucursal: "Morelia",
        password : "12345678"
    },
    {
        id : 2,
        username : "user3@idare.com",
        name : "Laura Bravo",
        permisos : "comercial",
        zona : "Centro",
        sucursal : "Toluca",
        password : "12345678"
    },
    {
        id : 3,
        username : "user2@idare.com",
        name : "Pablo Montes",
        permisos : "cartera",
        zona : "Bajío",
        sucursal : "Querétaro",
        password : "12345678"
    },
    {
        id : 4,
        username : "user1@idare.com",
        name : "Juan Garcia",
        permisos : "admin",
        zona : "Central",
        sucursal: "Central",
        password : "12345678"
    }
];

export const mockZoneBranches = [
    {
        id: 1,
        zona: "Bajío",
        sucursal : "Celaya"
    },
    {
        id: 2,
        zona: "Bajío",
        sucursal : "Irapuato"
    },
    {
        id: 3,
        zona: "Centro",
        sucursal : "Cuautla"
    },
    {
        id: 4,
        zona: "Centro",
        sucursal : "Puebla"
    }
];

export const mockDataStatusFile = [
    {
        id: 1,
        status : "Capturado"
    },
    {
        id: 2,
        status : "Cargado"
    },
    {
        id: 2,
        status : "Prevalidado"
    }
];

export const mockDataTypeClient = [
    {
        id: 1,
        type : "Persona física"
    },
    {
        id: 2,
        type : "Persona moral"
    },
    {
        id: 3,
        type : "Empresas"
    }
];

export const mockDataDocumentPersonFisica = [
    {
        id : 1,
        name : "Solicitud de Crédito firmada en original por el cliente, ejecutivo y máximo nivel comercial según punto",
        upload : false
    },
    {
        id : 2,
        name : "Referencia Comerciales",
        upload : true
    },
    {
        id : 3,
        name : "Autorización para solicitar resportes a Buró de Crédito firmada en original por el cliente y aval",
        upload : true
    },
    {
        id : 4,
        name : "Constancia de situación fiscal vigente",
        upload : false,
    },
    {
        id : 5,
        name : "Opinión de cumplimiento positiva vigente",
        upload : true
    },
    {
        id : 6,
        name : "Comprobante domicilio (No mayor a 3 meses a la fecha de solicitud)",
        upload : true
    },
    {
        id : 7,
        name : "Copia de identificación del represante legal",
        upload : true
    },
    {
        id : 8,
        name : "Acta constitutiva",
        upload : false
    },
    {
        id : 9,
        name : "Poder notarial (Facultad de otorgar y suscribir títulos de crédito",
        upload : true
    },
    {
        id : 10,
        name : "Estados financieros",
        upload : true
    },
    {
        id : 11,
        name : "Estados de cuenta bancarios de los últimos 2 meses a la fecha de solicitud",
        upload : true
    },
    {
        id : 12,
        name : "Contrato / Pedido / Orden de compra",
        upload : false
    },
    {
        id : 13,
        name : "Check list firma de contrado",
        upload : true
    },
    {
        id : 14,
        name : "Proyección de ventas firmada en original por ejecutivo y máximo nivel comercial según punto",
        upload : false
    },
    {
        id : 15,
        name : "Perfil del cliente firmado en original por el cliente, ejecutivo y máximo nivel comercial",
        upload : false
    },
    {
        id : 16,
        name : "Check list de firma pagare",
        upload : false
    },
    {
        id : 17,
        name : "Pagaré emitido por INFRA",
        upload : false
    },
    {
        id : 18,
        name : "Seguro de Crédito / Carta de Crédito",
        upload : false
    }
];

export const mockDataDocumentMoralPerson = [
    {
        id : 1,
        name : "Solicitud de Crédito firmada en original por el cliente, ejecutivo y máximo nivel comercial según punto",
        required : true
    },
    {
        id : 2,
        name : "Referencia Comerciales",
        required : true
    },
    {
        id : 3,
        name : "Autorización para solicitar resportes a Buró de Crédito firmada en original por el cliente y aval",
        required : true
    },
    {
        id : 4,
        name : "Constancia de situación fiscal vigente",
        required : false,
    },
    {
        id : 5,
        name : "Opinión de cumplimiento positiva vigente",
        required : true
    },
    {
        id : 6,
        name : "Comprobante domicilio (No mayor a 3 meses a la fecha de solicitud)",
        required : true
    },
    {
        id : 7,
        name : "Copia de identificación del represante legal",
        required : true
    },
    {
        id : 8,
        name : "Acta constitutiva",
        required : false
    },
    {
        id : 9,
        name : "Poder notarial (Facultad de otorgar y suscribir títulos de crédito",
        required : true
    },
    {
        id : 10,
        name : "Estados financieros",
        required : true
    },
    {
        id : 11,
        name : "Estados de cuenta bancarios de los últimos 2 meses a la fecha de solicitud",
        required : true
    },
    {
        id : 12,
        name : "Contrato / Pedido / Orden de compra",
        required : false
    },
    {
        id : 13,
        name : "Check list firma de contrado",
        required : true
    },
    {
        id : 14,
        name : "Proyección de ventas firmada en original por ejecutivo y máximo nivel comercial según punto",
        required : false
    },
    {
        id : 15,
        name : "Perfil del cliente firmado en original por el cliente, ejecutivo y máximo nivel comercial",
        required : false
    },
    {
        id : 16,
        name : "Check list de firma pagare",
        required : false
    },
    {
        id : 17,
        name : "Pagaré emitido por INFRA",
        required : false
    },
    {
        id : 18,
        name : "Seguro de Crédito / Carta de Crédito",
        required : false
    }
];

export const mockDataDocumentGovernment = [
    {
        id : 1,
        name : "Solicitud de Crédito firmada en original por el cliente, ejecutivo y máximo nivel comercial según punto",
        required : true
    },
    {
        id : 2,
        name : "Referencia Comerciales",
        required : true
    },
    {
        id : 3,
        name : "Autorización para solicitar resportes a Buró de Crédito firmada en original por el cliente y aval",
        required : true
    },
    {
        id : 4,
        name : "Constancia de situación fiscal vigente",
        required : false,
    },
    {
        id : 5,
        name : "Opinión de cumplimiento positiva vigente",
        required : true
    },
    {
        id : 6,
        name : "Comprobante domicilio (No mayor a 3 meses a la fecha de solicitud)",
        required : true
    },
    {
        id : 7,
        name : "Copia de identificación del represante legal",
        required : true
    },
    {
        id : 8,
        name : "Acta constitutiva",
        required : false
    },
    {
        id : 9,
        name : "Poder notarial (Facultad de otorgar y suscribir títulos de crédito",
        required : true
    },
    {
        id : 10,
        name : "Estados financieros",
        required : true
    },
    {
        id : 11,
        name : "Estados de cuenta bancarios de los últimos 2 meses a la fecha de solicitud",
        required : true
    },
    {
        id : 12,
        name : "Contrato / Pedido / Orden de compra",
        required : false
    },
    {
        id : 13,
        name : "Check list firma de contrado",
        required : true
    },
    {
        id : 14,
        name : "Proyección de ventas firmada en original por ejecutivo y máximo nivel comercial según punto",
        required : false
    },
    {
        id : 15,
        name : "Perfil del cliente firmado en original por el cliente, ejecutivo y máximo nivel comercial",
        required : false
    },
    {
        id : 16,
        name : "Check list de firma pagare",
        required : false
    },
    {
        id : 17,
        name : "Pagaré emitido por INFRA",
        required : false
    },
    {
        id : 18,
        name : "Seguro de Crédito / Carta de Crédito",
        required : false
    }
];

export const mockDataDocumentMultinationalCompanies = [
    {
        id : 1,
        name : "Solicitud de Crédito firmada en original por el cliente, ejecutivo y máximo nivel comercial según punto",
        required : true
    },
    {
        id : 2,
        name : "Referencia Comerciales",
        required : true
    },
    {
        id : 3,
        name : "Autorización para solicitar resportes a Buró de Crédito firmada en original por el cliente y aval",
        required : true
    },
    {
        id : 4,
        name : "Constancia de situación fiscal vigente",
        required : false,
    },
    {
        id : 5,
        name : "Opinión de cumplimiento positiva vigente",
        required : true
    },
    {
        id : 6,
        name : "Comprobante domicilio (No mayor a 3 meses a la fecha de solicitud)",
        required : true
    },
    {
        id : 7,
        name : "Copia de identificación del represante legal",
        required : true
    },
    {
        id : 8,
        name : "Acta constitutiva",
        required : false
    },
    {
        id : 9,
        name : "Poder notarial (Facultad de otorgar y suscribir títulos de crédito",
        required : true
    },
    {
        id : 10,
        name : "Estados financieros",
        required : true
    },
    {
        id : 11,
        name : "Estados de cuenta bancarios de los últimos 2 meses a la fecha de solicitud",
        required : true
    },
    {
        id : 12,
        name : "Contrato / Pedido / Orden de compra",
        required : false
    },
    {
        id : 13,
        name : "Check list firma de contrado",
        required : true
    },
    {
        id : 14,
        name : "Proyección de ventas firmada en original por ejecutivo y máximo nivel comercial según punto",
        required : false
    },
    {
        id : 15,
        name : "Perfil del cliente firmado en original por el cliente, ejecutivo y máximo nivel comercial",
        required : false
    },
    {
        id : 16,
        name : "Check list de firma pagare",
        required : false
    },
    {
        id : 17,
        name : "Pagaré emitido por INFRA",
        required : false
    },
    {
        id : 18,
        name : "Seguro de Crédito / Carta de Crédito",
        required : false
    }
];

export const mockDataDocumentGroupInfra = [
    {
        id : 1,
        name : "Solicitud de Crédito firmada en original por el cliente, ejecutivo y máximo nivel comercial según punto",
        required : true
    },
    {
        id : 2,
        name : "Referencia Comerciales",
        required : true
    },
    {
        id : 3,
        name : "Autorización para solicitar resportes a Buró de Crédito firmada en original por el cliente y aval",
        required : true
    },
    {
        id : 4,
        name : "Constancia de situación fiscal vigente",
        required : false,
    },
    {
        id : 5,
        name : "Opinión de cumplimiento positiva vigente",
        required : true
    },
    {
        id : 6,
        name : "Comprobante domicilio (No mayor a 3 meses a la fecha de solicitud)",
        required : true
    },
    {
        id : 7,
        name : "Copia de identificación del represante legal",
        required : true
    },
    {
        id : 8,
        name : "Acta constitutiva",
        required : false
    },
    {
        id : 9,
        name : "Poder notarial (Facultad de otorgar y suscribir títulos de crédito",
        required : true
    },
    {
        id : 10,
        name : "Estados financieros",
        required : true
    },
    {
        id : 11,
        name : "Estados de cuenta bancarios de los últimos 2 meses a la fecha de solicitud",
        required : true
    },
    {
        id : 12,
        name : "Contrato / Pedido / Orden de compra",
        required : false
    },
    {
        id : 13,
        name : "Check list firma de contrado",
        required : true
    },
    {
        id : 14,
        name : "Proyección de ventas firmada en original por ejecutivo y máximo nivel comercial según punto",
        required : false
    },
    {
        id : 15,
        name : "Perfil del cliente firmado en original por el cliente, ejecutivo y máximo nivel comercial",
        required : false
    },
    {
        id : 16,
        name : "Check list de firma pagare",
        required : false
    },
    {
        id : 17,
        name : "Pagaré emitido por INFRA",
        required : false
    },
    {
        id : 18,
        name : "Seguro de Crédito / Carta de Crédito",
        required : false
    }
];

export const mockDataDocumentClientExport = [
    {
        id : 1,
        name : "Solicitud de Crédito firmada en original por el cliente, ejecutivo y máximo nivel comercial según punto",
        required : true
    },
    {
        id : 2,
        name : "Referencia Comerciales",
        required : true
    },
    {
        id : 3,
        name : "Autorización para solicitar resportes a Buró de Crédito firmada en original por el cliente y aval",
        required : true
    },
    {
        id : 4,
        name : "Constancia de situación fiscal vigente",
        required : false,
    },
    {
        id : 5,
        name : "Opinión de cumplimiento positiva vigente",
        required : true
    },
    {
        id : 6,
        name : "Comprobante domicilio (No mayor a 3 meses a la fecha de solicitud)",
        required : true
    },
    {
        id : 7,
        name : "Copia de identificación del represante legal",
        required : true
    },
    {
        id : 8,
        name : "Acta constitutiva",
        required : false
    },
    {
        id : 9,
        name : "Poder notarial (Facultad de otorgar y suscribir títulos de crédito",
        required : true
    },
    {
        id : 10,
        name : "Estados financieros",
        required : true
    },
    {
        id : 11,
        name : "Estados de cuenta bancarios de los últimos 2 meses a la fecha de solicitud",
        required : true
    },
    {
        id : 12,
        name : "Contrato / Pedido / Orden de compra",
        required : false
    },
    {
        id : 13,
        name : "Check list firma de contrado",
        required : true
    },
    {
        id : 14,
        name : "Proyección de ventas firmada en original por ejecutivo y máximo nivel comercial según punto",
        required : false
    },
    {
        id : 15,
        name : "Perfil del cliente firmado en original por el cliente, ejecutivo y máximo nivel comercial",
        required : false
    },
    {
        id : 16,
        name : "Check list de firma pagare",
        required : false
    },
    {
        id : 17,
        name : "Pagaré emitido por INFRA",
        required : false
    },
    {
        id : 18,
        name : "Seguro de Crédito / Carta de Crédito",
        required : false
    }
];

export const mockDataAuditTrail = [
    {
        id : 1,
        user: "sreyes",
        name : "Sonia Reyes",
        zona : "",
        sucursal : "",
        modulo: "Configuración",
        accion : "Inicio de session",
        date : "05/25/2024",
        hora : "9:00:00"
    },
    {
        id : 1,
        user: "sreyes",
        name : "Sonia Reyes",
        zona : "",
        sucursal : "",
        modulo: "Configuración",
        accion : "Creación de Usuario",
        date : "05/25/2024",
        hora : "9:00:00"
    }
];