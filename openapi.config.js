import { generateService } from "@umijs/openapi";

generateService({
  requestLibPath: "@/services/apiClient",
  schemaPath: "http://localhost:8081/api/v3/api-docs",
  serversPath: "./src/services",
  apiPrefix: "'/api'",
});
