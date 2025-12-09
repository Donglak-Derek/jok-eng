import { Script } from "@/types";
import { karenDiffuser } from "./karen_diffuser";
import { landlordNegotiator } from "./landlord_negotiator";

export const politeScripts: Script[] = [karenDiffuser, landlordNegotiator];
