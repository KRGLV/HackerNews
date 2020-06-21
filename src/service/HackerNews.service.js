import config from "./../config";
import fetch from "node-fetch";

// Hacker News API Service Integration
class HackerNewsService {
    /**
     * Get Data based on filter
     * @param {*} page Page index, expected integer between 0 and 9223372036854775807
     * @return Data List
     */
    async find(page) {
        try {
            // API Service URL
            let url = config.hackerNewsAPI + (page ? "?page=" + page : "");

            return new Promise((resolve, reject) => {
                return fetch(url)
                    .then((res) => res.json())
                    .then(
                        (json) => {
                            resolve(json);
                        },
                        (error) => {
                            reject(error);
                        }
                    );
            });
        } catch (error) {
            throw error;
        }
    }
}

export default new HackerNewsService();
