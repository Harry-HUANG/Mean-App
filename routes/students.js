const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require(('../config/database'));
const Student = require('../models/student');

router.post('/addStudent', function (req, res) {
    let newStudent = new Student({
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        dateofbirth: req.body.dateofbirth,
        gender: req.body.gender,
        logbookhours: req.body.logbookhours,
        licensetype: req.body.licensetype,
        licensenumber: req.body.licensenumber,
        licenseexpiry: req.body.licenseexpiry,
        homephone: req.body.homephone,
        mobilephone: req.body.mobilephone,
        email: req.body.email,
        address: req.body.address,
        suburb: req.body.suburb,
        notes: req.body.notes
    });

    Student.addStudent(newStudent, (err, student) => {
        if (err) {
            res.json({success: false, msg: 'Failed to create student!'});
            console.log(err);
        } else {
            res.json({success: true, msg: 'Student created!'});
        }
    });
});

router.get('/searchStudent', function(req, res){
    Student.searchStudent(req.query.name, (err, students) => {
        return res.json(students);
    });
});

router.get('/getStudentById', function (req, res) {
    Student.getStudentById(req.query.id, (err, student) => {
        return res.json(student);
    })
});

router.post('/updateStudentById', function (req, res) {
    let newStudent = new Student({
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        dateofbirth: req.body.dateofbirth,
        gender: req.body.gender,
        logbookhours: req.body.logbookhours,
        licensetype: req.body.licensetype,
        licensenumber: req.body.licensenumber,
        licenseexpiry: req.body.licenseexpiry,
        homephone: req.body.homephone,
        mobilephone: req.body.mobilephone,
        email: req.body.email,
        address: req.body.address,
        suburb: req.body.suburb,
        notes: req.body.notes
    });

    Student.updateStudentById(req.body.id, newStudent, (err, student) => {
        if (err) {
            res.json({success: false, msg: 'Failed to update student!'});
            console.log(err);
        } else {
            res.json({success: true, msg: 'Student updated!'});
        }
    })
});

module.exports = router;