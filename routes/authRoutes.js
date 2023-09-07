const express = require("express")
const { registerController,loginController,updateProfileController,deleteProfileController } = require("../controller/authController")
const { requireSignin } = require("../middleware/authmiddleware")
const router = express.Router()

router.post("/register", registerController)
router.post("/login",loginController)
router.put("/update-profile", requireSignin, updateProfileController)
router.delete("/delete-profile/:id", requireSignin, deleteProfileController)
router.get('/user', requireSignin , (req,res)=>{
    res.status(200).send({ok:true})
})


module.exports=router