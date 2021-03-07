export default
    {
        "openapi": "3.0.0",
        "info": {
            "version": "0.9.1",
            "title": "Swagger - Identity-SSI",
            "description": " Collection of API's for easy access"
        },
        "servers": [
        ],
        "tags": [
            {
                "name": "Issuer",
                "description": "API for Issuer in the system"
            },
            {
                "name": "User",
                "description": "API for User in the system"
            },
            {
                "name": "Pool",
                "description": "API for Ledger Pool in the system"
            },
            {
                "name": "Steward",
                "description": "API for Steward in the system"
            }
        ],
        "consumes": [
            "application/json"
        ],
        "produces": [
            "application/json"
        ],
        "components": {
            "securitySchemes": {
                "JWT": {
                    "type": "apiKey",
                    "name": "Authorization",
                    "in": "header"
                }
            }
        },
        "paths": {
            "/issuer/connection/list/{alias}": {
                "parameters": [
                    {
                        "name": "alias",
                        "in": "path",
                        "required": true,
                        "description": "Issuer alias",
                        "type": "string"
                    }
                ],
                "get": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Get issuer connection list by alias",
                    "security": [
                        {
                            "JWT": []
                        }],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/Alias"
                            }
                        },
                        "404": {
                            "description": "Failed. Cat not found."
                        }
                    }
                }
            },
            "/issuer/getCounts/{alias}": {
                "parameters": [
                    {
                        "name": "alias",
                        "in": "path",
                        "required": true,
                        "description": "Issuer alias",
                        "type": "string"
                    }
                ],
                "get": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Issuer get all counts for connection, schema, credential defination and issued credentials",
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/Alias"
                            }
                        },
                        "404": {
                            "description": "Failed. Cat not found."
                        }
                    }
                }
            },
            "/issuer/creddef/list/{alias}": {
                "parameters": [
                    {
                        "name": "alias",
                        "in": "path",
                        "required": true,
                        "description": "Issuer alias",
                        "type": "string"
                    }
                ],
                "get": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Issuer gets list of credential definations by alias",
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/Alias"
                            }
                        },
                        "404": {
                            "description": "Failed. Cat not found."
                        }
                    }
                }
            },
            "/issuer/schemas/list/{alias}": {
                "parameters": [
                    {
                        "name": "alias",
                        "in": "path",
                        "required": true,
                        "description": "Issuer alias",
                        "type": "string"
                    }
                ],
                "get": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Get all schemas list",
                    "security": [
                        {
                            "JWT": []
                        }],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/Alias"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/issuer/schemas/": {
                "post": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Create a new schema",
                    "security": [
                        {
                            "JWT": []
                        }],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/Schema"
                                }
                            }
                        }
                    },
                    "produces": [
                        "application/json"
                    ],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/Schema"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/issuer/agent/spinup/": {
                "post": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Spin up issuer agent",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/Agent"
                                }
                            }
                        }
                    },
                    "produces": [
                        "application/json"
                    ],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/Agent"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/issuer/connection/invitation/": {
                "post": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Issuer create connection invitation",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/Alias"
                                }
                            }
                        }
                    },
                    "produces": [
                        "application/json"
                    ],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/Alias"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/issuer/schemabyid/": {
                "post": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Issuer get schema by id",
                    "security": [
                        {
                            "JWT": []
                        }],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/SchemaById"
                                }
                            }
                        }
                    },
                    "produces": [
                        "application/json"
                    ],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/SchemaById"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/issuer/creddefbyid/": {
                "post": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Issuer get credential defination by id",
                    "security": [
                        {
                            "JWT": []
                        }],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/CredDefById"
                                }
                            }
                        }
                    },
                    "produces": [
                        "application/json"
                    ],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/CredDefById"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/issuer/creddef/": {
                "post": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Issuer create new credential defination",
                    "security": [
                        {
                            "JWT": []
                        }],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/CredDef"
                                }
                            }
                        }
                    },
                    "produces": [
                        "application/json"
                    ],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/CredDef"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/issuer/creddefstatus/": {
                "post": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Issuer get credential defination status",
                    "security": [
                        {
                            "JWT": []
                        }],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/SchemaById"
                                }
                            }
                        }
                    },
                    "produces": [
                        "application/json"
                    ],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/SchemaById"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/issuer/get/alldetails/": {
                "get": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Get all issuer details",
                    "security": [
                        {
                            "JWT": []
                        }],
                    "responses": {
                        "200": {
                            "description": "OK"
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/issuer/sendOffer/": {
                "post": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Issuer send credential offer to holder ",
                    "security": [
                        {
                            "JWT": []
                        }],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/sendOffer"
                                }
                            }
                        }
                    },
                    "produces": [
                        "application/json"
                    ],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/sendOffer"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/issuer/issueCredential/": {
                "post": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Issuer issue credential to holder ",
                    "security": [
                        {
                            "JWT": []
                        }],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/issueCredential"
                                }
                            }
                        }
                    },
                    "produces": [
                        "application/json"
                    ],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/issueCredential"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/issuer/getCredentialsRecords/": {
                "post": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Issuer get all credential records ",
                    "security": [
                        {
                            "JWT": []
                        }],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/Alias"
                                }
                            }
                        }
                    },
                    "produces": [
                        "application/json"
                    ],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/Alias"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/issuer/creddef/listall": {
                "get": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Issuer get list of all credential defination",
                    "responses": {
                        "200": {
                            "description": "OK"
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/issuer/getConnectionById/": {
                "post": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Issuer get connection by id ",
                    "security": [
                        {
                            "JWT": []
                        }],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/ConnectionById"
                                }
                            }
                        }
                    },
                    "produces": [
                        "application/json"
                    ],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/ConnectionById"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/issuer/present-proof/send-request/": {
                "post": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Issuer send present proof request ",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/ProofRequest"
                                }
                            }
                        }
                    },
                    "produces": [
                        "application/json"
                    ],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/ProofRequest"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/issuer/present-proof/list/": {
                "post": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Issuer get present proof records ",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/Alias"
                                }
                            }
                        }
                    },
                    "produces": [
                        "application/json"
                    ],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/Alias"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/issuer/presentProofVerify/": {
                "post": {
                    "tags": [
                        "Issuer"
                    ],
                    "summary": "Issuer verify present proof ",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/VerifyProof"
                                }
                            }
                        }
                    },
                    "produces": [
                        "application/json"
                    ],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/VerifyProof"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/user/registration/": {
                "post": {
                    "tags": [
                        "User"
                    ],
                    "summary": "User registration ",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/UserRegistration"
                                }
                            }
                        }
                    },
                    "produces": [
                        "application/json"
                    ],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/UserRegistration"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/user/login/": {
                "post": {
                    "tags": [
                        "User"
                    ],
                    "summary": "User login ",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/UserRegistration"
                                }
                            }
                        }
                    },
                    "produces": [
                        "application/json"
                    ],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/UserRegistration"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/pool/node/create/": {
                "post": {
                    "tags": [
                        "Pool"
                    ],
                    "summary": "Create pool nodes ",                    
                    "security": [
                        {
                            "JWT": []
                        }],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/PoolNode"
                                }
                            }
                        }
                    },
                    "produces": [
                        "application/json"
                    ],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/PoolNode"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/pool/node/get/": {
                "get": {
                    "tags": [
                        "Pool"
                    ],
                    "summary": "Get pool nodes",
                    "security": [
                        {
                            "JWT": []
                        }],
                    "responses": {
                        "200": {
                            "description": "OK"
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/steward/wallet/create/": {
                "post": {
                    "tags": [
                        "Steward"
                    ],
                    "summary": "Create steward wallet",
                    "security": [
                        {
                            "JWT": []
                        }],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/Agent"
                                }
                            }
                        }
                    },
                    "produces": [
                        "application/json"
                    ],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/Agent"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/steward/onboard/issuer/": {
                "post": {
                    "tags": [
                        "Steward"
                    ],
                    "summary": "Steward onboards issuer",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/IssuerOnboard"
                                }
                            }
                        }
                    },
                    "produces": [
                        "application/json"
                    ],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/IssuerOnboard"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/steward/get/poolname/": {
                "get": {
                    "tags": [
                        "Steward"
                    ],
                    "summary": "Steward gets poolname",
                    "security": [
                        {
                            "JWT": []
                        }],
                    "responses": {
                        "200": {
                            "description": "OK"
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            },
            "/steward/get/alldetails/": {
                "get": {
                    "tags": [
                        "Steward"
                    ],
                    "summary": "Steward gets all details",
                    "security": [
                        {
                            "JWT": []
                        }],
                    "responses": {
                        "200": {
                            "description": "OK",
                            "schema": {
                                "$ref": "#/definitions/StewardDetails"
                            }
                        },
                        "400": {
                            "description": "Failed. Bad post data."
                        }
                    }
                }
            }
        },
        "definitions": {
            "StewardDetails": {
                "type": "object",
                "properties": {
                    "userName": {
                        "type": "string"
                    },
                    "did": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    }
                }
            },
            "IssuerOnboard": {
                "type": "object",
                "properties": {
                    "did": {
                        "type": "string"
                    },
                    "verkey": {
                        "type": "string"
                    },
                    "alias": {
                        "type": "string"
                    }
                }
            },
            "PoolNode": {
                "type": "object",
                "properties": {
                    "ip": {
                        "type": "string"
                    },
                    "ips": {
                        "type": "string"
                    },
                    "networkName": {
                        "type": "string"
                    }
                }
            },
            "UserRegistration": {
                "type": "object",
                "properties": {
                    "Email": {
                        "type": "string"
                    },
                    "Password": {
                        "type": "string"
                    }
                }
            },
            "Schema": {
                "type": "object",
                "properties": {
                    "schemaName": {
                        "type": "string"
                    },
                    "schemaVersion": {
                        "type": "string"
                    },
                    "schemaAttributes": {
                        "type": "string"
                    },
                    "alias": {
                        "type": "string"
                    }
                }
            },
            "Agent": {
                "type": "object",
                "properties": {
                    "walletName": {
                        "type": "string"
                    },
                    "walletPassword": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    }
                }
            },
            "Alias": {
                "type": "object",
                "properties": {
                    "alias": {
                        "type": "string"
                    }
                }
            },
            "SchemaById": {
                "type": "object",
                "properties": {
                    "schemaId": {
                        "type": "string"
                    },
                    "alias": {
                        "type": "string"
                    }
                }
            },
            "CredDefById": {
                "type": "object",
                "properties": {
                    "credDefId": {
                        "type": "string"
                    },
                    "alias": {
                        "type": "string"
                    }
                }
            },
            "CredDef": {
                "type": "object",
                "properties": {
                    "schemaId": {
                        "type": "string"
                    },
                    "credDefTag": {
                        "type": "string"
                    },
                    "alias": {
                        "type": "string"
                    }
                }
            },
            "sendOffer": {
                "type": "object",
                "properties": {
                    "credExId": {
                        "type": "string"
                    },
                    "alias": {
                        "type": "string"
                    },
                    "holder": {
                        "type": "string"
                    }
                }
            },
            "issueCredential": {
                "type": "object",
                "properties": {
                    "credExId": {
                        "type": "string"
                    },
                    "attributes": {
                        "type": "array",
                        "items": {
                            "type": "object"
                        }
                    },
                    "comment": {
                        "type": "string"
                    },
                    "alias": {
                        "type": "string"
                    }
                }
            },
            "ConnectionById": {
                "type": "object",
                "properties": {
                    "connectionId": {
                        "type": "string"
                    },
                    "alias": {
                        "type": "string"
                    }
                }
            },
            "ProofRequest": {
                "type": "object",
                "properties": {
                    "comment": {
                        "type": "string"
                    },
                    "creddefId": {
                        "type": "string"
                    },
                    "connectionId": {
                        "type": "string"
                    },
                    "alias": {
                        "type": "string"
                    }
                }
            },
            "VerifyProof": {
                "type": "object",
                "properties": {
                    "presExId": {
                        "type": "string"
                    },
                    "alias": {
                        "type": "string"
                    }
                }
            },
            "Issuer": {
                "type": "object",
                "properties": {
                }
            },
            "Issuers": {
                "type": "object",
                "properties": {
                    "issuers": {
                        "type": "object",
                        "additionalProperties": {
                            "$ref": "#/definitions/Issuer"
                        }
                    }
                }
            }
        }
    }
