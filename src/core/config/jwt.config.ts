import { JWTEnvs, ServerEnvironments } from "@environments/index"

/**
 * JWT Configuration
 */
export const JWTConfig: JWTEnvs = {
  ...ServerEnvironments.jwtConfig
};