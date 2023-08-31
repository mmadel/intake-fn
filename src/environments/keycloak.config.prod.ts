import { KeycloakConfig } from "keycloak-js";

const keycloakConfigProd: KeycloakConfig = {
    url: 'https://kc-cob-83bdbd045c6f.herokuapp.com',
    realm: 'patient-intake',
    clientId: 'intake-ui',
  };
  
  export default keycloakConfigProd;