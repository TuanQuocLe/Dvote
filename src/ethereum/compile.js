// const path = require("path");
// const fs = require("fs");
// const solc = require("solc");

// const DvotePath = path.resolve(__dirname, "contract", "Dvote.sol");
// const source = fs.readFileSync(DvotePath, "utf8");
// const cc = solc.compile(source, 1).contracts[':Dvote'];
// module.exports = cc

const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const DvotePath = path.resolve(__dirname, "contract", "Dvote.sol");
const source = fs.readFileSync(DvotePath, "utf8");
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}