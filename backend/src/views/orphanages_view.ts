import Orphanage from '../models/Orphanage';
import imagesView from '../views/images_view';

export default {
    render(orphanage: Orphanage) {
        return {
            id: orphanage.id,
            approved: orphanage.approved,
            creator_id: orphanage.user,
            name: orphanage.name,
            about: orphanage.about,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: imagesView.renderMany(orphanage.images),
        }
    },

    renderMany(orphanages: Orphanage[]) {
        return orphanages.map(orphanage => this.render(orphanage));
    }
}