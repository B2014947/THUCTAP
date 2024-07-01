// store/modules/documents.js

const state = {
    documents: []
};

const mutations = {
    addDocument(state, newDocument) {
        state.documents.push(newDocument);
    }
};

export default {
    state,
    mutations
};
