import { 
  MainDatabase,
} from "@core/databases/main/MainDatabase";

/**
 * Namespace for organizing all your Database Connections
 */
export namespace DatabasesModule {

  /**Your main database connection */
  export const Main = MainDatabase;
  
}