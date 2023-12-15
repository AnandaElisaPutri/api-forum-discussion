
////////////////////////////// FITUR FORUM ////////////////////////////////////////

// Simpan cerita dari pengguna
const stories = [];
const db = require('./db.js');

const postStoryHandler = async(request, h) => {
    try {
        const { username, story } = request.payload;

        // const [results, fields] = await db.promise().query('INSERT INTO story (username, story) VALUES (?, ?)', [username, story]);



        // Respon berhasil dengan status 201 Created
        return h.response({ username, story }).code(201);
    
    } catch (error) {
        // Tangani kesalahan dengan merespon dengan status 500 Internal Server Error
        console.error('Error in postStoryHandler:', error);
        // throw Boom.internal('Terjadi kesalahan internal.');
    }
};


// Mendapatkan Semua Cerita
const getAllStoriesHandler = (request, h) => {
    return h.response(stories);
};

// Mendapatkan Balasan/Komentar untuk Cerita Tertentu
const getRepliesHandler = (request, h) => {
    const storyId = request.params.storyId;

    const selectedStory = stories.find((story) => storyId === story.username);
    console.log('Selected Story:', selectedStory);

    if (!selectedStory) {
        throw Boom.notFound('Cerita tidak ditemukan.');
    }

    return h.response(selectedStory.replies);
};

// Menambahkan Balasan/Komentar pada Cerita Tertentu
const postReplyHandler = async(request, h) => {
    // const results = await db.promise().query('SELECT * story');
    // return h.response(results);

    try {
        const { username, comment } = request.payload;
        const idstory = request.params.id

        if (idstory == null) {
            throw Boom.badRequest('idstory tidak boleh kosong');
        }

        const [results, fields] = await db.promise().query('INSERT INTO comment (username, comment, idstory) VALUES (?, ?, ?)', 
        [username, comment, idstory]);

        const insertedId = results.insertId;

        // Respon berhasil dengan status 201 Created
        return h.response({ username, comment, idstory }).code(201);
    
    } catch (error) {
        // Tangani kesalahan dengan merespon dengan status 500 Internal Server Error
        console.error('Error in postStoryHandler:', error);
        // throw Boom.internal('Terjadi kesalahan internal.');
    }
};
    // const storyId = request.params.storyId;
    // const { reply } = request.payload;

    // const selectedStory = stories.find((story) => storyId === story.username);

    // if (!selectedStory) {
    //     throw Boom.notFound('Cerita tidak ditemukan.');
    // }

    // if (!reply) {
    //     throw Boom.badRequest('Balasan harus diisi.');
    // }

    // selectedStory.replies.push({ username: selectedStory.username, reply });

    // return h.response(selectedStory.replies).code(201);



//////////////// FITUR DETEKSI SUASANA HATI ///////////////////////////



module.exports = {
    postStoryHandler, getAllStoriesHandler, getRepliesHandler, postReplyHandler,
};
