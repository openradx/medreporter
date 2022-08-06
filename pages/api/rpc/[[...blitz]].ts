import { rpcHandler } from "@blitzjs/rpc"
import { api } from "../../../app/blitz-server"

// eslint-disable-next-line no-console
export default api(rpcHandler({ onError: console.error }))
