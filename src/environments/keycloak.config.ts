import { KeycloakConfig } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
    url: 'http://192.168.105.121:8180',
    realm: 'COB',
    clientId: 'intake-resource',
  };
  
  export default keycloakConfig;