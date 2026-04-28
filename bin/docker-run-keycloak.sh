docker run --rm -d \
  --name keycloak \
  -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=Pokemon123 \
  -v keycloak_data:/opt/keycloak/data \
  quay.io/keycloak/keycloak:latest \
  start-dev
