const Model = require('../models/user.model');
const sanitize = require('mongo-sanitize');

const getData = async (request, response) => {
    const query = sanitize(request['query']);
    const page = parseInt(query['page']) || 1;
    const limit = parseInt(query['limit']) || 10;
    const search = query['search'];
    const _id = query['_id'];

    try{
        if(_id) {
            const getData = await Model.findOne({ $and: [{_id: _id}, {softDelete: null}] });
            if(!getData) {
                return response.status(200).json({
                    status: false,
                    message: 'data displayed is empty.'
                });
            }

            return response.status(200).json({
                status: true,
                message: 'data has been displayed.',
                data: {
                    _id: getData['_id'] || null,
                    name: getData['name'] || '',
                    gender: getData['gender'] || ''
                }
            });
        }

        let query = {};
        query['softDelete'] = null;
        if(search) {
            query['name'] = new RegExp(`${search}`, 'i');
        }

        const getData = await Model.paginate(query, { page: page, limit: limit });
        if(!getData?.docs.length) {
            return response.status(200).json({
                status: false,
                message: 'data displayed is empty.'
            });
        }

        return response.status(200).json({
            status: true,
            message: 'all data has been displayed.',
            data: getData.docs.map((result) => {
                return {
                    _id: result['_id'] || null,
                    name: result['name'] || '',
                    gender: result['gender'] || ''
                }
            }),
            page: getData['page'],
            limit: getData['limit'],
            total_data: getData['totalDocs'],
            total_page: getData['totalPages']
        });
    }catch(error) {
        return response.status(500).json({
            status: false,
            message: error.message
        });
    }
};

const postData = async (request, response) => {
    const body = sanitize(request['body']);

    try {
        const data = {
            'name': body['name'],
            'gender': body['gender']
        };

        const findData = await Model.findOne({ name: data['name'] });
        if(findData) {
            return response.status(400).json({
                status: false,
                message: 'data already exist.'
            });
        }

        await Model.create(data);
        return response.status(201).json({
            status: true,
            message: 'data added successfully.'
        });
    }catch(error) {
        return response.status(500).json({
            status: false,
            message: error.message
        });
    }
};

const putData = async (request, response) => {
    const query = sanitize(request['query']);
    const body = sanitize(request['body']);
    const _id = query['_id'];

    try {
        if(_id) {
            return response.status(400).json({
                status: false,
                message: '_id parameter not found.'
            });
        }
        
        const data = {
            'name': body['name'],
            'gender': body['gender']
        };

        const findData = await Model.findOne({ $and: [{ _id: { $ne: _id } }, { name: data['name'] }, { softDelete: null }] });
        if(findData) {
            return response.status(400).json({
                status: false,
                message: 'data already exist.'
            });
        }

        const findOneAndUpdate = await Model.findOneAndUpdate({ $and: [{ _id: _id }, { title: data['title'] }] }, data);
        if(!findOneAndUpdate) {
            return response.status(400).json({
                status: false,
                message: 'data already exist.'
            })
        }

        return response.status(200).json({
            status: true,
            message: 'data changed successfully.'
        });
    }catch(error) {
        response.status(500).json({
            status: false,
            message: error.message
        })
    }
};

const deleteData = async (request, response) => {
    const query = sanitize(request['query']);
    const _id = query['_id'];
    const hard = query['hard'];

    try {
        if(!_id) {
            return response.status(400).json({
                status: false,
                message: '_id parameter not found.'
            });
        }

        const findData = await Model.findOne({ _id: _id });
        if(!findData) {
            return response.status(400).json({
                status: false,
                message: 'data not found.'
            });
        }

        if(hard == 'true' || hard == true) await Model.deleteOne({ _id: _id });
        else await Model.updateOne({ _id: _id }, { $set: { softDelete: Date.now() } });

        return response.status(200).json({
            status: true,
            message: 'data deleted successfully.'
        });
    }catch(error) {
        return response.status(500).json({
            status: false,
            message: error.message
        });
    }
};

module.exports = { getData, postData, putData, deleteData };