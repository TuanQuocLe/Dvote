import web3 from './web3'
import voteJson from './build/Dvote.json'




const Dvote = new web3.eth.Contract(JSON.parse(voteJson.interface), '0x9d95953380C56B89288E3dfd3DF78f354191E74f')

export default Dvote