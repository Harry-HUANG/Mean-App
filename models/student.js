const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
// const bcrypt = require('bcryptjs');
// const config = require('../config/database');

// Student Schema
const StudentSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String,
    },
    lastname: {
        type: String,
        required: true
    },
    dateofbirth: {
        type: String,
    },
    gender: {
        type: String,
        required: true
    },
    logbookhours: {
        type: Number,
    },
    licensetype: {
        type: String,
        required: true
    },
    licensenumber: {
        type: String,
    },
    licenseexpiry: {
        type: String,
    },
    homephone: {
        type: String,
    },
    mobilephone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    suburb: {
        type: String,
        required: false
    },
    notes: {
        type: String,
    }
});

StudentSchema.plugin(mongoose_fuzzy_searching, {fields: ['firstname', 'lastname', 'suburb']});

const Student = module.exports = mongoose.model('Student', StudentSchema);

module.exports.addStudent = function (newStudent, callback) {
    newStudent.save(callback);
}

module.exports.getStudent = function (email, callback) {
    const query = {email: email};
    Student.findOne(query, callback);
}

module.exports.searchStudent = function (searchQuery, callback) {
    Student.find(
        {$or:[
                {"firstname":{ "$regex": searchQuery, "$options": "i" }},
                {"lastname":{ "$regex": searchQuery, "$options": "i" }}
            ]}
    , callback);
    // Student.find({firstname: { "$regex": searchQuery, "$options": "i" }}, callback);
    // Student.fuzzySearch(searchQuery).then(callback);
};

module.exports.getStudentById = function (id, callback) {
    const query = {_id: id};
    Student.findOne(query, callback);
};

module.exports.updateStudentById = function (id, student, callback) {
    if (id == undefined || id == null) { console.log('FATAL_ERROR'); }
    const query = {_id: id};
    Student.findOneAndDelete(query, function (err, foo) {
        if (err) { console.log('FATAL_ERROR')}
    });
    student.save(callback);
};