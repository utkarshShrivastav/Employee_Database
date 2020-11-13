const { response } = require("express");
const Employee = require("../databases/Employee");

exports.getEditForm = (req, res) => {
    Employee.findOne({ email: req.params.email })
        .then((employee) => {
            if (employee) {
                res.render("editForm", {
                    employee: employee,
                });
            } else {
                res.render("editForm", {
                    employee: "",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/");
        });
};

exports.editEmployee = (req, res) => {
    console.log(req.body);
    var updatedEmployee = {
        first: req.body.first,
        last: req.body.last,
        phone: req.body.phone,
        department: req.body.department,
    };
    Employee.updateOne(
        { email: req.params.email },
        { $set: { updatedEmployee } }
    )
        .catch((err) => {
            console.log(err);
        })
        .then(() => {
            req.flash("success_msg", "Successfully Updated");
            res.redirect("/");
        });
};
