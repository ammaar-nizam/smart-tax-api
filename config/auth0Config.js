import {auth} from 'express-oauth2-jwt-bearer'

// CHANGE THE VARIABLES
const jwtCheck = auth({
    audience: "https://smart-tax-api.vercel.app",
    issuerBaseURL: "https://dev-03ifqltxbr6nn0hn.us.auth0.com",
    tokenSigningAlg: "RS256"
})

export default jwtCheck