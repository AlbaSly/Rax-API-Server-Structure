import bp from "body-parser";
import cookies from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import requestIp from "request-ip";
import useragent from "express-useragent";

/**
 * Array of http middlewares for express app
 * Current List:
 * - CORS
 * - Body Parser
 * - Cookies
 * - Helmet
 * - Request IP
 * - User Agent (Express)
 */
export const SERVER_MIDDLEWARES = [
  cors(),
  bp.urlencoded({extended: true}),
  bp.json(),
  cookies(),
  helmet(),
  requestIp.mw(),
  useragent.express(),
]