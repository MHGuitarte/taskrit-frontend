const API_URL = process.env.API_URL;

const checkTokenUrl = `${API_URL}/user/checkToken`;


export default UserService = {

    checkToken: async userToken => {
        return await axios.post(checkTokenUrl, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
    }

}