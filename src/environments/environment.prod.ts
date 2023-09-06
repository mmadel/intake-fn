import keycloakConfigProd from "./keycloak.config.prod";

export const environment = {
  production: true,
  baseURL:"/intake-service/api/",
  keycloak: keycloakConfigProd,
};
