const API_URL = process.env.API_URL;

const checkTokenUrl = `${API_URL}/user/checkToken`;


const UserService = {

    checkToken: async userToken => {
        const isTokenValid = await this.$http.post(checkTokenUrl, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return isTokenValid;
    }

}

export default UserService;