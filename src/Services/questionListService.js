import { get } from "../Utils/requests"

export const getQuestionListByTopicId = async (topicId) => {
    const result = await get(`questions?topicId=${topicId}`);
    return result;
}