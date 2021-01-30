import User from '../models/User';

export default {
    render(user : User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            is_admin: user.is_admin,
        }
    },

    renderMany(users : User[]) {
        return users.map(user => this.render(user));
    },

    // User DTO render
    safeRender(user : User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    },

    // User DTO render
    safeRenderMany(users : User[]) {
        return users.map(user => this.safeRender(user));
    }
}