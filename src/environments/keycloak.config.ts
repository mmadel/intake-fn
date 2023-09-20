import { KeycloakConfig } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
    url: 'http://localhost:8180',
    realm: 'patient-intake',
    clientId: 'intake-ui',
  };
  
  export default keycloakConfig;