"use strict";
const Models = require("../models");

const getUser = (req,res) => {

    Models.Users.readOne(req.params.name).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        console.log(err)
        res.send({ result: 500, error:"No user corresponding to this name"} )
    })
}

const getUsers = (res) => {
    Models.Users.readAll().then(function (data) {
        res.send({ result: 200, data: data[0] })
    }).catch(err => {
        console.log(err)
        res.send({ result: 500, error:"An error occured while fetching users"} )
    })
}

const createUser = (data, res) => {
    console.log(data)
    Models.Users.create(data).then(function (data) {
        res.send({ result: 200, message: "Successfully created user "+data.name })
    }).catch(err => {
        console.log(err)
        res.send({ result: 500, error:err.message} )
    })
}

const updateUser = (req, res) => {
    Models.Users.update([req.body,req.params.name]).then(function (data) {
        if(data[0].affectedRows ==0)
            throw new Error("No user "+req.params.name+" to update");
        res.send({ result: 200, message: "User "+req.params.name+" updated succesfully" })
    }).catch(err => {
        console.log(err)
        res.send({ result: 500, error: err.message })
    })
}

const deleteUser = (req, res) => {
    let userName = req.params.name;
    Models.Users.destroy(userName).then(function (data) {
        let usersDeleted = data.deletedRows;
        if(usersDeleted == 0) throw new Error("No user with name "+userName+" to delete");
        res.send({ result: 200, message:`Successfully deleted user ${data.deletedName}` })
    }).catch(err => {
        console.log(err)
        res.send({ result: 500, error: err.message })
    })
}

module.exports = {
    getUser, getUsers, createUser, updateUser, deleteUser
}