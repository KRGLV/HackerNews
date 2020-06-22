import config from "./../config";
import fetch from "node-fetch";
import CacheManager from "./CacheManager";

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
                        (data) => {
                            data.hits = this.getVote(data.hits);
                            resolve(data);
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

    // get radom votes
    getVote(data) {
        data.forEach((item) => {
            if (!item.vote) {
                let vote = CacheManager.get(`HackerNews_Vote_${item.objectID}`);
                let hide = CacheManager.get(`HackerNews_Hide_${item.objectID}`);
                item.hide == hide ? hide : false;
                if (vote) {
                    item.vote = vote;
                } else {
                    vote = Math.round(Math.random() * 500 + 1);
                    CacheManager.put(`HackerNews_Vote_${item.objectID}`, vote);
                    item.vote = vote;
                }
            }
        });
        return data;
    }
}

export default new HackerNewsService();
