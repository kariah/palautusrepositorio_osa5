import axios from 'axios'
const baseUrl = 'api/users'

const getAll = async () => {
//   const config = {
//     headers: { Authorization: token },
//   }

  const request = axios.get(baseUrl)
  const response = await request

  return response.data
}


export default { getAll }