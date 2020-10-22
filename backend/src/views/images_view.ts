import Image from '../models/Image';
require('dotenv');

const serverPort = process.env.SERVER_LISTEN_PORT;
const serverIP = process.env.SERVER_IP;

export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `http://${serverIP}:${serverPort}/uploads/${image.path}`
        }
    },

    renderMany(images: Image[]) {
        return images.map(image => this.render(image));
    }
}