import  express from 'express'
import  cors from 'cors'
import  helmet from 'helmet'
import  {setupLogging} from "./logging"
import  apiConfig from './apiConfig'
import  { createProxyMiddleware } from 'http-proxy-middleware';

const app = express()
const port = 3001;

setupLogging(app);
// setupProxies(app, ROUTES);


const customRouter = function (req) {
  const{ApiId} = req.params
  console.log('headres', req.headers)

  console.log(apiConfig[ApiId])
  return apiConfig[ApiId]
//  return 'http://localhost:8000'; // protocol + host
};

const options = {
  target: 'http://localhost:8000',
  router: customRouter,
  on: {proxyReq: function onProxyReq(proxyReq, req, res) {
    // add custom header to request
    proxyReq.setHeader('x-access-token', req.headers['x-access-token'])

  }},
  pathRewrite: {
    '^\/[^\/]*/' : '' //remove /ApiId
  }
};

const myProxy = createProxyMiddleware(options);
app.enable("trust proxy");
app.disable("x-powered-by");
// app.use(helmet());
app.use(cors());
app.get('/hello', (req, resp) => {
  return resp.send('HELLO WORLD FROM GATEWAY!');
})
app.use('/:ApiId', myProxy); // add the proxy to express

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
