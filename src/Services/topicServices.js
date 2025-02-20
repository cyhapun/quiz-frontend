import {get} from '../Utils/requests'

export const getTopicList = async () => {
    const result = await get(`topics`);
    return result;
}

export const getTopicById = async (topicId) => {
    const result = await get(`topics?id=${topicId}`);
    return result;
}