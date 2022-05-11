import { instance } from "src/boot/axios";
import { ENDPOINT } from "../endpoint";
const getDefinition = () => import("../definition");

class ApiService {
  static Instance = null;
  constructor() {
    this.data = instance;
  }

  static async getInstance(context) {
    if (this.Instance == null) {
      const { vuePrototype } = await getDefinition();
      let data = vuePrototype(context.$data);
      this.Instance = new ApiService({ data: data });
    }
    return this.Instance;
  }

  async getAllEmployee() {
    const result = await this.data.get(ENDPOINT.GET_ALL_EMPLOYEE);

    try {
      if (result.status == 200) {
        if (
          result.data.status == "success" &&
          result.data.message ==
            "Successfully! All records has been fetched." &&
          Array.isArray(result.data.data) &&
          result.data.data.length > 0
        ) {
          return result.data.data;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}

export default ApiService;
