const url = require("url");
const querystring = require("querystring");

class Express {
  constructor(req, res) {
    this.req = req;
    this.res = res;

    if (this.req.method != "GET") {
      this.req.body = new Promise((done, rejects) => {
        let str = "";
        req.on("data", (chunk) => (str += chunk));
        req.on("end", () => {
          done(JSON.parse(str));
        });
      });
    }
    //    json
    this.res.json = (status, data) => {
      this.res.writeHead(status, { "Content-Type": "application/json" });
      return this.res.end(JSON.stringify(data));
    };
  }
  //    get
  get(route, callback) {
    let { query, pathname } = url.parse(this.req.url);
    this.req.query = querystring.parse(query);
    if (pathname == route && this.req.method == "GET") {
      callback(this.req, this.res);
    }
  }
  //    post
  post(route, callback) {
    if (this.req.url == route && this.req.method == "POST") {
      callback(this.req, this.res);
    }
  }
  //    delete
  delete(route, callback) {
    if (this.req.url == route && this.req.method == "DELETE") {
      callback(this.req, this.res);
    }
  }
  //    put
  put(route, callback) {
    if (this.req.url == route && this.req.method == "PUT") {
      callback(this.req, this.res);
    }
  }
}

module.exports = Express;
