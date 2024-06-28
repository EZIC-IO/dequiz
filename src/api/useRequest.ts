import { buildRequestMutation, buildRequestQuery } from "@/lib/request-builder";
import { nextAPI } from "./axios.instance";

  export const useRequestQuery = buildRequestQuery(nextAPI);
  
  export const useRequestMutation = buildRequestMutation(nextAPI);
  